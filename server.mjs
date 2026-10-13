import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { climateInfo, placeLabel, places } from "./data/places.mjs";
import { briefToPrompt, buildBrief, factsLine } from "./lib/facts.mjs";
import { cardIsThin, fallbackCard, normalizeCard } from "./lib/card.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "public");
const journalPath = path.join(root, "data", "journal.json");
const llamaExe = path.join(root, "bin", "llama", "llama-server.exe");
const llamaLog = path.join(root, "bin", "llama.log");
const llamaPort = Number(process.env.TOUCH_GRASS_LLAMA_PORT || 9931);
const appPort = Number(process.env.PORT || 8787);
const lan = process.argv.includes("--lan");

const cardSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 8, maxLength: 72 },
    mission: { type: "string", minLength: 40, maxLength: 220 },
    notices: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          sense: { type: "string", enum: ["look", "listen", "touch"] },
          text: { type: "string", minLength: 8, maxLength: 140 }
        },
        required: ["sense", "text"]
      }
    },
    steps: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string", minLength: 12, maxLength: 140 }
    },
    pocketLine: { type: "string", minLength: 8, maxLength: 80 },
    whyNow: { type: "string", minLength: 24, maxLength: 180 }
  },
  required: ["title", "mission", "notices", "steps", "pocketLine", "whyNow"]
};

const journalSchema = {
  type: "object",
  properties: { entry: { type: "string" } },
  required: ["entry"]
};

let llamaChild = null;
let modelReady = false;
let modelError = "";
let activeModel = "";
let booting = null;

function preferredModel() {
  const dir = path.join(root, "models");
  if (!fs.existsSync(dir)) return "";
  const files = fs.readdirSync(dir).filter((name) => name.endsWith(".gguf"));
  const requested = process.env.TOUCH_GRASS_MODEL;
  if (requested && files.includes(requested)) return requested;
  const preferred = files.find((name) => name.includes("qwen2.5-1.5b"));
  return preferred || files[0] || "";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pingLlama() {
  try {
    const res = await fetch(`http://127.0.0.1:${llamaPort}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

function stopLlama() {
  if (!llamaChild) return;
  const child = llamaChild;
  llamaChild = null;
  modelReady = false;
  try {
    child.kill();
  } catch {
    /* already gone */
  }
}

async function bootLlama(file) {
  modelReady = false;
  modelError = "";
  activeModel = file;
  if (!file) {
    modelError = "No GGUF found in models/.";
    return false;
  }
  const modelPath = path.join(root, "models", file);
  const size = fs.existsSync(modelPath) ? fs.statSync(modelPath).size : 0;
  const minimum = file.includes("qwen2.5-1.5b") ? 1_000_000_000 : 50_000_000;
  if (size < minimum) {
    modelError = "The model file is missing or still downloading.";
    return false;
  }
  if (!fs.existsSync(llamaExe)) {
    modelError = "llama-server is not in bin/llama. Run setup.ps1.";
    return false;
  }
  stopLlama();
  await sleep(400);
  fs.mkdirSync(path.dirname(llamaLog), { recursive: true });
  const log = fs.createWriteStream(llamaLog, { flags: "a" });
  log.write(`\n--- boot ${new Date().toISOString()} ${file} ---\n`);
  const args = [
    "-m", modelPath,
    "-c", "4096",
    "-np", "1",
    "-t", "6",
    "-ngl", "0",
    "--fit", "off",
    "--offline",
    "--no-webui",
    "--reasoning", "off",
    "--host", "127.0.0.1",
    "--port", String(llamaPort),
    "--cache-ram", "256",
    "--alias", "touch-grass",
    "-lv", "2"
  ];
  const child = spawn(llamaExe, args, {
    cwd: path.dirname(llamaExe),
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"]
  });
  llamaChild = child;
  child.stdout.pipe(log);
  child.stderr.pipe(log);
  child.on("exit", (code) => {
    if (llamaChild !== child) return;
    modelReady = false;
    if (code) modelError = `llama.cpp exited (${code}). See bin/llama.log.`;
  });
  const started = Date.now();
  while (Date.now() - started < 180000) {
    if (await pingLlama()) {
      modelReady = true;
      modelError = "";
      return true;
    }
    if (!llamaChild) break;
    await sleep(500);
  }
  modelError = modelError || "The model did not become ready in time.";
  return false;
}

function ensureModel() {
  if (modelReady) return Promise.resolve(true);
  if (!booting) {
    booting = bootLlama(preferredModel()).finally(() => {
      booting = null;
    });
  }
  return booting;
}

function readVoice(name) {
  return fs.readFileSync(path.join(root, "prompts", name), "utf8").trim();
}

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("model did not return JSON");
  return JSON.parse(text.slice(start, end + 1));
}

async function complete(messages, schema, maxTokens) {
  const formats = [
    { type: "json_object", schema },
    { type: "json_schema", json_schema: { name: "response", strict: true, schema } },
    { type: "json_object" }
  ];
  let lastError = "model request failed";
  for (const response_format of formats) {
    const res = await fetch(`http://127.0.0.1:${llamaPort}/v1/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "touch-grass",
        messages,
        temperature: 0.4,
        max_tokens: maxTokens,
        response_format
      })
    });
    if (res.ok) {
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content || "";
      return extractJson(text);
    }
    lastError = await res.text();
    if (res.status !== 400 && res.status !== 422 && res.status !== 500) break;
  }
  throw new Error(lastError.slice(0, 400));
}

function resolvePlace(body) {
  if (body.custom && body.custom.city) {
    const custom = body.custom;
    const climate = climateInfo[custom.climate] ? custom.climate : "";
    if (!climate) throw new Error("Pick a climate.");
    const frost = (value) => (value && /^\d{2}-\d{2}$/.test(value) ? value : null);
    const num = (value) => (value === "" || value == null || Number.isNaN(Number(value)) ? null : Number(value));
    return {
      id: "custom",
      city: String(custom.city).trim().slice(0, 60) || "My place",
      region: String(custom.region || "nearby").trim().slice(0, 60),
      climate,
      zone: String(custom.zone || "custom").slice(0, 12),
      lastFrost: frost(custom.lastFrost),
      firstFrost: frost(custom.firstFrost),
      lat: num(custom.lat),
      lon: num(custom.lon),
      timeZone: custom.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }
  const place = places.find((item) => item.id === body.placeId);
  if (!place) throw new Error("Pick a place.");
  return place;
}

function readRequest(body) {
  const place = resolvePlace(body);
  const outing = ["garden", "walk", "sit"].includes(body.outing) ? body.outing : "walk";
  const minutes = [15, 25, 40].includes(Number(body.minutes)) ? Number(body.minutes) : 25;
  const note = String(body.note || "").slice(0, 280);
  return { place, outing, minutes, note, vary: Boolean(body.vary) };
}

function publicPlaces() {
  return places.map((place) => ({
    id: place.id,
    label: placeLabel(place),
    city: place.city,
    region: place.region,
    climate: place.climate,
    zone: place.zone,
    lat: place.lat,
    lon: place.lon,
    lastFrost: place.lastFrost,
    firstFrost: place.firstFrost
  }));
}

function readJournal() {
  try {
    const data = JSON.parse(fs.readFileSync(journalPath, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeJournal(entries) {
  fs.mkdirSync(path.dirname(journalPath), { recursive: true });
  fs.writeFileSync(journalPath, JSON.stringify(entries, null, 2));
}

async function writeCard(request) {
  const brief = buildBrief(request);
  const calendar = fallbackCard(brief);
  if (!(await ensureModel()) || !modelReady) {
    return { source: "calendar", model: null, modelError, brief, card: calendar };
  }
  try {
    const messages = [
      { role: "system", content: `${readVoice("ranger.txt")}\n\nReturn one JSON object and nothing else.` },
      { role: "user", content: briefToPrompt(brief) }
    ];
    let raw = await complete(messages, cardSchema, 420);
    let card = normalizeCard(raw, brief);
    if (!card || cardIsThin(card, brief)) {
      messages.push({ role: "assistant", content: JSON.stringify(raw) });
      messages.push({
        role: "user",
        content: "That draft was too thin, or it named the city or the date. Write the card again. The title is the job. The mission is one physical sentence that fits the person's constraint. whyNow must use the frost fact."
      });
      raw = await complete(messages, cardSchema, 500);
      card = normalizeCard(raw, brief);
    }
    if (!card || cardIsThin(card, brief)) {
      return { source: "calendar", model: activeModel, modelError: "The model reply was too thin to use.", brief, card: calendar };
    }
    return { source: "model", model: activeModel, brief, card };
  } catch (error) {
    return {
      source: "calendar",
      model: activeModel,
      modelError: error.message,
      brief,
      card: calendar
    };
  }
}

async function writeEntry(noticed, card) {
  const note = String(noticed || "").trim().slice(0, 400);
  if (!note) return "Went out. Left the phone in a pocket.";
  if (!modelReady) return note;
  try {
    const raw = await complete(
      [
        { role: "system", content: readVoice("journal.txt") },
        {
          role: "user",
          content: `Outing title: ${card?.title || "Outside"}\nWhat they noticed: ${note}\nReturn JSON with an "entry" string.`
        }
      ],
      journalSchema,
      180
    );
    const entry = String(raw.entry || "").replace(/\s+/g, " ").trim();
    return entry || note;
  } catch {
    return note;
  }
}

function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store"
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 100_000) {
        reject(new Error("Request is too large."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("Send JSON."));
      }
    });
  });
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json"
};

function serveStatic(req, res) {
  const url = new URL(req.url, "http://127.0.0.1");
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(publicDir, requested));
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "content-type": types[path.extname(filePath)] || "application/octet-stream",
      "cache-control": "no-store"
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    if (req.method === "GET" && url.pathname === "/api/health") {
      send(res, 200, {
        ok: true,
        ready: modelReady,
        model: activeModel || preferredModel() || null,
        engine: "llama.cpp",
        weights: "Qwen2.5-1.5B-Instruct",
        error: modelError || null
      });
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/places") {
      send(res, 200, {
        places: publicPlaces(),
        climates: Object.entries(climateInfo).map(([id, info]) => ({ id, label: info.label }))
      });
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/voice") {
      send(res, 200, { text: readVoice("ranger.txt") });
      return;
    }
    if (req.method === "PUT" && url.pathname === "/api/voice") {
      const body = await readBody(req);
      const text = String(body.text || "").trim();
      if (text.length < 40 || text.length > 4000) {
        send(res, 400, { error: "Keep the voice between a short paragraph and a page." });
        return;
      }
      fs.writeFileSync(path.join(root, "prompts", "ranger.txt"), `${text}\n`);
      send(res, 200, { ok: true });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/facts") {
      const brief = buildBrief(readRequest(await readBody(req)));
      send(res, 200, { line: factsLine(brief), frost: brief.frost, light: brief.light, place: brief.place });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/card") {
      const result = await writeCard(readRequest(await readBody(req)));
      send(res, 200, result);
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/journal") {
      send(res, 200, { entries: readJournal() });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/journal") {
      const body = await readBody(req);
      const entryText = await writeEntry(body.noticed, body.card);
      const entry = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        place: body.brief?.place?.label || "Somewhere",
        outing: body.brief?.outing || "walk",
        minutes: Number(body.elapsedMinutes) || Number(body.brief?.minutes) || null,
        plannedMinutes: body.brief?.minutes || null,
        title: body.card?.title || "Outside",
        mission: body.card?.mission || "",
        noticed: String(body.noticed || "").slice(0, 400),
        entry: entryText,
        source: body.source || "model"
      };
      const entries = [entry, ...readJournal()].slice(0, 200);
      writeJournal(entries);
      send(res, 200, { entry });
      return;
    }
    if (req.method === "DELETE" && url.pathname === "/api/journal") {
      const id = url.searchParams.get("id");
      writeJournal(readJournal().filter((entry) => entry.id !== id));
      send(res, 200, { ok: true });
      return;
    }
    if (req.method === "GET") {
      serveStatic(req, res);
      return;
    }
    send(res, 404, { error: "Not found" });
  } catch (error) {
    send(res, 400, { error: error.message || "Something went wrong." });
  }
});

function lanAddresses() {
  const found = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const net of list || []) {
      if (net.family === "IPv4" && !net.internal) found.push(net.address);
    }
  }
  return found;
}

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${appPort} is already in use. Stop the other Touch Grass server and try again.`);
  } else {
    console.error(error);
  }
  process.exit(1);
});

server.listen(appPort, lan ? "0.0.0.0" : "127.0.0.1", () => {
  console.log(`Touch Grass  →  http://127.0.0.1:${appPort}`);
  if (lan) {
    for (const address of lanAddresses()) console.log(`On your Wi-Fi  →  http://${address}:${appPort}`);
  }
  console.log("Waking the local model…");
  ensureModel().then((ready) => {
    if (ready) console.log(`Model ready  →  ${activeModel}`);
    else console.log(`Model offline  →  ${modelError} Cards will use the frost calendar.`);
  });
});

function shutdown() {
  stopLlama();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
