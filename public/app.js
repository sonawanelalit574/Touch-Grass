const $ = (id) => document.getElementById(id);

const state = {
  places: [],
  climates: [],
  place: null,
  custom: false,
  result: null,
  startedAt: null,
  timer: null,
  elapsedMinutes: null
};

const views = ["home", "card-view", "return-view", "journal-view"];

function show(name) {
  for (const id of views) $(id).hidden = id !== name;
  $("pocket").hidden = true;
  $("shell").hidden = false;
  document.body.style.background = "";
  document.querySelector('meta[name="theme-color"]').content = "#1e2b20";
  const titles = {
    home: "Touch Grass",
    "card-view": "Your card · Touch Grass",
    "return-view": "Back · Touch Grass",
    "journal-view": "Field notes · Touch Grass"
  };
  document.title = titles[name] || "Touch Grass";
}

function showPocket() {
  for (const id of views) $(id).hidden = true;
  $("shell").hidden = true;
  $("pocket").hidden = false;
  document.querySelector('meta[name="theme-color"]').content = "#121712";
  document.title = "Outside · Touch Grass";
}

function outing() {
  return document.querySelector('input[name="outing"]:checked').value;
}

function minutes() {
  return Number(document.querySelector('input[name="minutes"]:checked').value);
}

function payload() {
  const body = { outing: outing(), minutes: minutes(), note: $("note").value, vary: false };
  if (state.custom) {
    body.custom = {
      city: $("custom-city").value.trim(),
      region: "nearby",
      climate: $("custom-climate").value,
      zone: "custom",
      lastFrost: $("custom-last").value.trim(),
      firstFrost: $("custom-first").value.trim(),
      lat: $("custom-lat").value.trim(),
      lon: "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  } else if (state.place) {
    body.placeId = state.place.id;
  }
  return body;
}

function placeReady() {
  if (state.custom) return $("custom-city").value.trim().length > 0 && $("custom-climate").value;
  return Boolean(state.place);
}

function setError(message) {
  $("error").hidden = !message;
  $("error").textContent = message || "";
}

function matchPlace(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    state.places.find((place) => place.label.toLowerCase() === q) ||
    state.places.find((place) => place.city.toLowerCase() === q) ||
    state.places.find((place) => place.label.toLowerCase().startsWith(q)) ||
    null
  );
}

function haversine(lat1, lon1, lat2, lon2) {
  const r = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(a));
}

async function refreshFacts() {
  $("write").disabled = !placeReady();
  if (!placeReady()) {
    $("facts").hidden = true;
    return;
  }
  try {
    const res = await fetch("/api/facts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload())
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    $("facts").hidden = false;
    $("facts").textContent = data.line;
    setError("");
  } catch (error) {
    $("facts").hidden = true;
    setError(error.message);
  }
}

function renderCard(result) {
  const { card, brief, source, model } = result;
  const stamp = `${brief.today.label} · ${brief.place.label} · ${brief.minutes} min`;
  const notices = card.notices.map((notice) => `
    <div>
      <dt>${notice.sense}</dt>
      <dd>${escapeHtml(lead(notice.text))}</dd>
    </div>`).join("");
  const steps = card.steps.map((step, index) => `
    <li><span>${index + 1}</span><span>${escapeHtml(step)}</span></li>`).join("");
  const credit = source === "model"
    ? `Written on this machine · ${escapeHtml(modelName(model))}`
    : "Written from the local frost calendar. The model did not answer.";
  $("card").innerHTML = `
    <p class="stamp">${escapeHtml(stamp)}</p>
    <h2>${escapeHtml(card.title)}</h2>
    <p class="mission">${escapeHtml(card.mission)}</p>
    <dl class="notices">${notices}</dl>
    <ol class="steps">${steps}</ol>
    <p class="why-now">${escapeHtml(card.whyNow)}</p>
    <p class="fine colophon">${credit}</p>`;
}

function modelName(file) {
  if (!file) return "local model";
  if (file.includes("qwen2.5-1.5b")) return "Qwen2.5 1.5B";
  return file.replace(/\.gguf$/i, "");
}

function lead(text) {
  const value = String(text || "");
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cardText(result) {
  const { card, brief } = result;
  return [
    `${brief.place.label} · ${brief.today.label} · ${brief.minutes} min`,
    "",
    card.title,
    card.mission,
    "",
    ...card.notices.map((notice) => `${notice.sense.toUpperCase()}  ${notice.text}`),
    "",
    ...card.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    card.whyNow
  ].join("\n");
}

async function writeCard(vary) {
  setError("");
  $("write").disabled = true;
  $("write").textContent = "Writing it here, on this machine…";
  try {
    const body = payload();
    body.vary = vary;
    const res = await fetch("/api/card", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "The card could not be written.");
    state.result = data;
    state.startedAt = null;
    renderCard(data);
    show("card-view");
  } catch (error) {
    setError(error.message);
  } finally {
    $("write").disabled = !placeReady();
    $("write").textContent = "Write my card";
  }
}

function formatElapsed(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function startPocket() {
  state.startedAt = Date.now();
  sessionStorage.setItem("touchgrass.live", JSON.stringify({
    result: state.result,
    startedAt: state.startedAt
  }));
  $("pocket-line").textContent = state.result.card.pocketLine;
  $("plan-note").textContent = `A ${state.result.brief.minutes} minute plan. No penalty for wandering.`;
  showPocket();
  tick();
  state.timer = setInterval(tick, 1000);
}

function tick() {
  if (!state.startedAt || !state.result) return;
  const elapsed = Date.now() - state.startedAt;
  $("clock").textContent = formatElapsed(elapsed);
  const planned = state.result.brief.minutes * 60 * 1000;
  const ratio = Math.min(1, elapsed / planned);
  $("meter").style.width = `${ratio * 100}%`;
  if (elapsed >= planned) {
    $("plan-note").textContent = "Past the plan. Stay, or come back in.";
  }
}

function stopTimer() {
  clearInterval(state.timer);
  state.timer = null;
}

function comeBack() {
  stopTimer();
  const elapsed = state.startedAt ? (Date.now() - state.startedAt) / 60000 : state.result.brief.minutes;
  state.elapsedMinutes = Math.max(1, Math.round(elapsed));
  sessionStorage.removeItem("touchgrass.live");
  $("return-title").textContent = "What did you notice?";
  $("return-time").textContent = `${state.elapsedMinutes} minutes outside. One line is enough.`;
  $("notice-form").hidden = false;
  $("saved").hidden = true;
  $("noticed").value = "";
  show("return-view");
  $("noticed").focus();
}

async function saveNote(event) {
  event.preventDefault();
  const button = $("save-note");
  button.disabled = true;
  button.textContent = "Writing the note here…";
  const noticed = $("noticed").value.trim();
  try {
    const res = await fetch("/api/journal", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        noticed,
        card: state.result.card,
        brief: state.result.brief,
        source: state.result.source,
        elapsedMinutes: state.elapsedMinutes
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not save.");
    $("notice-form").hidden = true;
    $("saved").hidden = false;
    $("saved-entry").textContent = data.entry.entry;
    $("saved-meta").textContent = "Saved in data/journal.json on this computer.";
  } catch (error) {
    const queue = JSON.parse(localStorage.getItem("touchgrass.queue") || "[]");
    queue.push({ noticed, title: state.result.card.title, at: new Date().toISOString() });
    localStorage.setItem("touchgrass.queue", JSON.stringify(queue));
    $("notice-form").hidden = true;
    $("saved").hidden = false;
    $("saved-entry").textContent = noticed || "Went out. Left the phone in a pocket.";
    $("saved-meta").textContent = "The station could not be reached, so this note stayed in the browser.";
  } finally {
    button.disabled = false;
    button.textContent = "Keep the note";
  }
}

async function loadJournal() {
  show("journal-view");
  const list = $("journal-list");
  list.innerHTML = "<p class='fine'>Opening the notebook…</p>";
  try {
    const res = await fetch("/api/journal");
    const data = await res.json();
    if (!data.entries.length) {
      list.innerHTML = "<p>No outings yet. The first one is the whole point.</p>";
      return;
    }
    list.innerHTML = data.entries.map((entry) => `
      <article class="note-card">
        <p class="fine">${escapeHtml(entry.createdAt.slice(0, 10))} · ${escapeHtml(entry.place)} · ${escapeHtml(entry.outing)}${entry.minutes ? ` · ${entry.minutes} min` : ""}</p>
        <h3>${escapeHtml(entry.title)}</h3>
        <p class="entry">${escapeHtml(entry.entry)}</p>
        ${entry.noticed ? `<p class="fine">You wrote: ${escapeHtml(entry.noticed)}</p>` : ""}
        <button type="button" class="text" data-remove="${escapeHtml(entry.id)}">Remove</button>
      </article>`).join("");
  } catch {
    list.innerHTML = "<p>The notebook could not be opened.</p>";
  }
}

async function pollHealth() {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    if (data.ready) {
      $("status").textContent = `${modelName(data.model)} · llama.cpp · on this machine`;
      $("write-note").textContent = "The card is written here. Then the phone goes away.";
    } else if (data.error) {
      $("status").textContent = "Frost calendar is ready. The model is still waking, or still downloading.";
    } else {
      $("status").textContent = "Waking the model on this machine…";
    }
  } catch {
    $("status").textContent = "The field station is not running.";
  }
}

async function init() {
  const res = await fetch("/api/places");
  const data = await res.json();
  state.places = data.places;
  state.climates = data.climates;
  $("place-list").innerHTML = data.places.map((place) => `<option value="${escapeHtml(place.label)}"></option>`).join("");
  $("custom-climate").innerHTML = data.climates.map((climate) => `<option value="${climate.id}">${escapeHtml(climate.label)}</option>`).join("");
  const saved = localStorage.getItem("touchgrass.place");
  if (saved) {
    const place = state.places.find((item) => item.id === saved);
    if (place) {
      state.place = place;
      $("place").value = place.label;
    }
  }
  await refreshFacts();
  await pollHealth();
  setInterval(pollHealth, 4000);

  const live = sessionStorage.getItem("touchgrass.live");
  if (live) {
    try {
      const savedLive = JSON.parse(live);
      state.result = savedLive.result;
      state.startedAt = savedLive.startedAt;
      $("pocket-line").textContent = state.result.card.pocketLine;
      showPocket();
      tick();
      state.timer = setInterval(tick, 1000);
    } catch {
      sessionStorage.removeItem("touchgrass.live");
    }
  }
}

$("plan").addEventListener("submit", (event) => {
  event.preventDefault();
  if (placeReady()) writeCard(false);
});

$("place").addEventListener("input", () => {
  state.custom = false;
  $("custom").hidden = true;
  state.place = matchPlace($("place").value);
  if (state.place) localStorage.setItem("touchgrass.place", state.place.id);
  refreshFacts();
});

document.querySelectorAll('input[name="outing"], input[name="minutes"]').forEach((input) => {
  input.addEventListener("change", refreshFacts);
});

$("toggle-custom").addEventListener("click", () => {
  state.custom = !state.custom;
  $("custom").hidden = !state.custom;
  if (state.custom) state.place = null;
  refreshFacts();
});

for (const id of ["custom-city", "custom-climate", "custom-last", "custom-first", "custom-lat"]) {
  $(id).addEventListener("input", refreshFacts);
}

$("nearest").addEventListener("click", () => {
  if (!navigator.geolocation) {
    setError("This browser cannot share a location. Type a city instead.");
    return;
  }
  navigator.geolocation.getCurrentPosition((position) => {
    let best = null;
    let bestKm = Infinity;
    for (const place of state.places) {
      const km = haversine(position.coords.latitude, position.coords.longitude, place.lat, place.lon);
      if (km < bestKm) {
        bestKm = km;
        best = place;
      }
    }
    state.custom = false;
    $("custom").hidden = true;
    state.place = best;
    $("place").value = best.label;
    localStorage.setItem("touchgrass.place", best.id);
    refreshFacts().then(() => {
      const distance = bestKm < 30 ? `${Math.round(bestKm)} km from this spot` : `${Math.round(bestKm)} km away. Use “my place” if that is the wrong town.`;
      $("facts").textContent = `${best.label}, ${distance}. ${$("facts").textContent}`;
    });
  }, () => setError("Location stayed on the device, unused. Type a city instead."));
});

$("pocket-go").addEventListener("click", startPocket);
$("im-back").addEventListener("click", comeBack);
$("again").addEventListener("click", () => writeCard(true));
$("card-home").addEventListener("click", () => show("home"));
$("print").addEventListener("click", () => window.print());
$("copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(cardText(state.result));
    $("copy").textContent = "Copied";
    setTimeout(() => { $("copy").textContent = "Copy the card"; }, 1500);
  } catch {
    $("copy").textContent = "Copy failed";
  }
});

$("notice-form").addEventListener("submit", saveNote);
$("saved-home").addEventListener("click", () => show("home"));
$("saved-journal").addEventListener("click", loadJournal);
$("open-journal").addEventListener("click", loadJournal);
$("journal-home").addEventListener("click", () => show("home"));
$("journal-list").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  await fetch(`/api/journal?id=${encodeURIComponent(button.dataset.remove)}`, { method: "DELETE" });
  loadJournal();
});

$("voice-panel").addEventListener("toggle", async () => {
  if (!$("voice-panel").open || $("voice").value) return;
  const res = await fetch("/api/voice");
  const data = await res.json();
  $("voice").value = data.text;
});

$("save-voice").addEventListener("click", async () => {
  const res = await fetch("/api/voice", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: $("voice").value })
  });
  const data = await res.json();
  $("voice-note").textContent = res.ok ? "Saved. The next card uses it." : data.error;
});

init();
