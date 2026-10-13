import { climateInfo } from "../data/places.mjs";
import { phenology } from "../data/phenology.mjs";

const WINTER_GROWERS = new Set(["desert", "mediterranean", "tropical"]);

const STATUS_COPY = {
  before_last_frost: "Average last spring frost has not arrived.",
  last_frost_soon: "Average last spring frost is close.",
  open_season: "This is the open stretch between frosts.",
  closing_window: "Average first fall frost is close.",
  just_after_first_frost: "Average first fall frost has just passed.",
  cold_season: "The cold season is underway.",
  frost_free: "This place rarely freezes. The month sets the garden, not a frost date."
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function monthDay(dateUtc) {
  return `${pad(dateUtc.getUTCMonth() + 1)}-${pad(dateUtc.getUTCDate())}`;
}

function occurrence(md, year) {
  const [m, d] = md.split("-").map(Number);
  return Date.UTC(year, m - 1, d);
}

function zonedYmd(date, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  const parts = Object.fromEntries(dtf.formatToParts(date).map((p) => [p.type, p.value]));
  let hour = Number(parts.hour);
  if (hour === 24) hour = 0;
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour,
    minute: Number(parts.minute)
  };
}

function todayUtc(date, timeZone) {
  const p = zonedYmd(date, timeZone);
  return Date.UTC(p.year, p.month - 1, p.day);
}

function nextOccurrence(md, today) {
  const year = new Date(today).getUTCFullYear();
  let occ = occurrence(md, year);
  if (occ < today) occ = occurrence(md, year + 1);
  return occ;
}

function prevOccurrence(md, today) {
  const year = new Date(today).getUTCFullYear();
  let occ = occurrence(md, year);
  if (occ > today) occ = occurrence(md, year - 1);
  return occ;
}

function daysBetween(fromUtc, toUtc) {
  return Math.round((toUtc - fromUtc) / 86400000);
}

function formatLong(utc) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(new Date(utc));
}

export function frostStatus(place, date) {
  if (!place.lastFrost || !place.firstFrost) {
    return {
      status: "frost_free",
      summary: STATUS_COPY.frost_free,
      line: STATUS_COPY.frost_free,
      daysUntilFirstFallFrost: null,
      daysSinceLastSpringFrost: null,
      daysUntilLastSpringFrost: null,
      daysSinceFirstFallFrost: null
    };
  }

  const today = todayUtc(date, place.timeZone);
  const nextLast = nextOccurrence(place.lastFrost, today);
  const nextFirst = nextOccurrence(place.firstFrost, today);
  const prevLast = prevOccurrence(place.lastFrost, today);
  const prevFirst = prevOccurrence(place.firstFrost, today);
  const daysUntilLast = daysBetween(today, nextLast);
  const daysUntilFirst = daysBetween(today, nextFirst);
  const daysSinceLast = daysBetween(prevLast, today);
  const daysSinceFirst = daysBetween(prevFirst, today);

  let status;
  if (daysUntilLast <= 150 && daysUntilLast < daysUntilFirst) {
    status = daysUntilLast <= 14 ? "last_frost_soon" : "before_last_frost";
  } else if (prevFirst >= prevLast && daysSinceFirst <= 45) {
    status = "just_after_first_frost";
  } else if (prevFirst >= prevLast) {
    status = "cold_season";
  } else if (daysUntilFirst <= 21) {
    status = "closing_window";
  } else {
    status = "open_season";
  }

  let line;
  if (status === "before_last_frost" || status === "last_frost_soon") {
    line = `${daysUntilLast} days until the average last spring frost (${formatLong(nextLast)}).`;
  } else if (status === "just_after_first_frost" || status === "cold_season") {
    line = `${daysSinceFirst} days since the average first fall frost (${formatLong(prevFirst)}).`;
  } else {
    line = `${daysUntilFirst} days until the average first fall frost (${formatLong(nextFirst)}).`;
  }

  return {
    status,
    summary: STATUS_COPY[status],
    line: `${line} ${STATUS_COPY[status]}`,
    daysUntilFirstFallFrost: daysUntilFirst,
    daysSinceLastSpringFrost: daysSinceLast,
    daysUntilLastSpringFrost: daysUntilLast,
    daysSinceFirstFallFrost: daysSinceFirst
  };
}

function isTender(crop) {
  if (/fava/i.test(crop)) return false;
  return /\b(tomato|tomatoes|pepper|peppers|basil|squash|cucumber|bean|beans|eggplant|okra|melon|zucchini|corn)\b/i.test(crop);
}

function isColdSowing(crop) {
  return /garlic|shallot|spinach|cover|clover|\boats\b|onion sets|fava/i.test(crop);
}

function unique(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function gardenPlan(place, monthPack, frost) {
  const sow = [...(monthPack.sow || [])];
  const harvest = [...(monthPack.harvest || [])];
  const skip = [...(monthPack.skip || [])];
  let task = monthPack.task;
  let sowNow = sow;
  let held = [];

  const winterGrower = WINTER_GROWERS.has(place.climate);
  const daysUntilFirst = frost.daysUntilFirstFallFrost;

  if (!winterGrower && (frost.status === "just_after_first_frost")) {
    held = sow.filter((crop) => !isColdSowing(crop));
    sowNow = sow.filter((crop) => isColdSowing(crop));
  } else if (!winterGrower && frost.status === "cold_season") {
    held = sow;
    sowNow = [];
    task = "Leave the soil alone if it is frozen or soaked. Walk, look, and plan.";
  } else if (
    frost.status === "before_last_frost" ||
    frost.status === "last_frost_soon" ||
    (!winterGrower && daysUntilFirst != null && daysUntilFirst < 50 && frost.status !== "frost_free")
  ) {
    held = sow.filter((crop) => isTender(crop));
    sowNow = sow.filter((crop) => !isTender(crop));
  }

  return {
    sowNow,
    doNotSow: unique([...held, ...skip]),
    harvest,
    task
  };
}

function offsetHours(date, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const p = Object.fromEntries(dtf.formatToParts(date).map((x) => [x.type, x.value]));
  let hour = Number(p.hour);
  if (hour === 24) hour = 0;
  const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, hour, +p.minute, +p.second);
  return (asUTC - date.getTime()) / 36e5;
}

function formatClock(hours) {
  const wrapped = ((hours % 24) + 24) % 24;
  const h = Math.floor(wrapped);
  const m = Math.round((wrapped - h) * 60);
  const date = new Date(Date.UTC(2026, 0, 1, h, m));
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC"
  }).format(date);
}

export function daylight(place, date) {
  const lat = place.lat;
  const lon = place.lon;
  if (lat == null) {
    return { sentence: "Daylight depends on latitude, which this card does not have." };
  }
  const ymd = zonedYmd(date, place.timeZone);
  const n = dayOfYear(ymd.year, ymd.month, ymd.day);
  const decl = 23.44 * Math.sin((2 * Math.PI / 365) * (n - 81));
  const latR = (lat * Math.PI) / 180;
  const declR = (decl * Math.PI) / 180;
  const cosH = -Math.tan(latR) * Math.tan(declR);
  if (cosH <= -1) {
    return { daylightHours: 24, sentence: "The sun stays up. You will not run out of light." };
  }
  if (cosH >= 1) {
    return { daylightHours: 0, sentence: "The sun stays down. This is a listening outing." };
  }
  const hAngle = (Math.acos(cosH) * 180) / Math.PI;
  const daylightHours = (2 * hAngle) / 15;
  const rounded = Math.round(daylightHours);
  if (lon == null) {
    return {
      daylightHours,
      sentence: `About ${rounded} hours of light at this latitude.`
    };
  }
  const b = (2 * Math.PI / 365) * (n - 81);
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const tz = offsetHours(date, place.timeZone);
  const solarNoon = 12 - lon / 15 - eot / 60 + tz;
  const sunrise = solarNoon - daylightHours / 2;
  const sunset = solarNoon + daylightHours / 2;
  const localHour = ymd.hour + ymd.minute / 60;
  let timing;
  if (localHour < sunrise - 0.25) timing = "The sun is not up yet. Listening will do more than looking.";
  else if (localHour > sunset + 0.25) timing = "The sun is down. Make this a listening outing.";
  else if (sunset - localHour < 1.5) timing = "Sunset is close. Leave now if you want the low light.";
  else if (localHour - sunrise < 1.5) timing = "The light is still new.";
  else timing = "You have time to get out before the light goes.";

  return {
    daylightHours,
    sunrise: formatClock(sunrise),
    sunset: formatClock(sunset),
    sentence: `About ${rounded} hours of light. Sunset near ${formatClock(sunset)}. ${timing}`
  };
}

function dayOfYear(year, month, day) {
  const start = Date.UTC(year, 0, 0);
  const current = Date.UTC(year, month - 1, day);
  return Math.round((current - start) / 86400000);
}

function hashSeed(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(list, count, seed) {
  const arr = [...list];
  let s = seed || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}

const OUTING_HINT = {
  garden: "One bed, one job, then stop.",
  walk: "Out and back. No turn-by-turn. The phone stays pocketed.",
  sit: "A seat, three senses, and staying past the urge to check the time."
};

export function buildBrief({ place, outing, minutes, note, date = new Date(), vary = false }) {
  const ymd = zonedYmd(date, place.timeZone);
  const pack = phenology[place.climate]?.[ymd.month];
  if (!pack) throw new Error(`No seasonal notes for ${place.climate} month ${ymd.month}`);
  const frost = frostStatus(place, date);
  const light = daylight(place, date);
  const garden = gardenPlan(place, pack, frost);
  const seed = hashSeed(`${place.city}|${ymd.year}-${ymd.month}-${ymd.day}|${outing}|${vary ? date.getTime() : "stable"}`);
  const observations = {
    look: pick(pack.look, Math.min(3, pack.look.length), seed),
    listen: pick(pack.listen, Math.min(2, pack.listen.length), seed + 3),
    touch: pick(pack.touch, Math.min(2, pack.touch.length), seed + 9)
  };
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: place.timeZone
  }).format(date);
  const clock = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: place.timeZone
  }).format(date);

  return {
    place: {
      id: place.id || "custom",
      city: place.city,
      region: place.region,
      label: `${place.city}, ${place.region}`,
      climate: place.climate,
      climateLabel: climateInfo[place.climate].label,
      climateNote: climateInfo[place.climate].note,
      zone: place.zone
    },
    today: {
      label: weekday,
      clock,
      month: ymd.month,
      hour: ymd.hour
    },
    light,
    frost,
    outing,
    minutes,
    note: (note || "").trim().slice(0, 280),
    garden,
    observations,
    outingHint: OUTING_HINT[outing],
    cues: {
      walk: pack.walk,
      sit: pack.sit
    }
  };
}

export function briefToPrompt(brief) {
  const obs = ["look", "listen", "touch"]
    .map((sense) => `- ${sense}: ${brief.observations[sense].join("; ")}`)
    .join("\n");
  const sow = brief.garden.sowNow.length ? brief.garden.sowNow.join("; ") : "nothing";
  const skip = brief.garden.doNotSow.length ? brief.garden.doNotSow.join("; ") : "nothing extra";
  const harvest = brief.garden.harvest.length ? brief.garden.harvest.join("; ") : "nothing in particular";
  const lines = [
    "Write a new card from this assignment. Do not repeat these headings.",
    `Place: ${brief.place.label}. Zone ${brief.place.zone}. ${brief.place.climate} climate (${brief.place.climateLabel}).`,
    `Do not contradict this: ${brief.place.climateNote}`,
    `Today: ${brief.today.label}, local time ${brief.today.clock}.`,
    `Light: ${brief.light.sentence}`,
    `whyNow must use this fact and no other date: ${brief.frost.line}`,
    `Outing: ${brief.outing}. Time: ${brief.minutes} minutes. ${brief.outingHint}`,
    `Constraint the mission and the first step must satisfy: ${brief.note || "none. They can go outside."}`
  ];
  if (brief.outing === "garden") {
    lines.push(
      `Plant now: ${sow}.`,
      `Do not plant: ${skip}.`,
      `Harvest if it is there: ${harvest}.`,
      `Job: ${brief.garden.task}`
    );
  } else {
    const cue = brief.outing === "walk" ? brief.cues.walk : brief.cues.sit;
    lines.push("This is not a gardening trip. Do not tell them to plant, sow, or harvest.", `Job: ${cue}`);
  }
  lines.push(
    "Senses you may shorten. Do not add species or crops that are not here:",
    obs,
    "The title is the job, in 4 to 8 words. Not the city. Not the date.",
    "The mission is one physical sentence."
  );
  return lines.join("\n");
}

export function factsLine(brief) {
  return `${brief.place.label} · zone ${brief.place.zone}. ${brief.frost.line} ${brief.light.sentence}`;
}
