function unshout(text) {
  const letters = text.replace(/[^A-Za-z]/g, "");
  if (letters.length < 4 || letters !== letters.toUpperCase()) return text;
  return text.toLowerCase().replace(/(^|[\s-])[a-z]/g, (letter) => letter.toUpperCase());
}

function cleanPhrase(text) {
  const stripped = String(text)
    .replace(/^(?:first|second|third)\s+action:\s*/i, "")
    .replace(/\bbreak into the garden\b/ig, "Start where the soil is cool")
    .replace(/\bbreak into\b/ig, "Start on");
  return unshout(stripped);
}
function clampWords(text, max) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const words = clean.split(" ");
  if (words.length <= max) return clean;
  return `${words.slice(0, max).join(" ")}…`;
}

function fallbackCard(brief) {
  const { outing, minutes, garden, observations, frost } = brief;
  const note = brief.note.toLowerCase();
  const balcony = /balcony|stoop|porch|\bpots?\b/.test(note);
  const wheeled = /stroller|toddler/.test(note);
  const titles = {
    garden: garden.sowNow[0] ? garden.sowNow[0].split(",")[0] : "Walk the beds, then stop",
    walk: wheeled ? "Out and back with the stroller" : "Out and back",
    sit: "One seat, then stay"
  };
  let mission;
  if (balcony) {
    mission = garden.sowNow[0]
      ? `On the balcony, do one pot: ${garden.sowNow[0]}.`
      : "Step onto the balcony and look at the pots. Leave any job that needs a bed.";
  } else if (wheeled) {
    mission = `Walk about ${minutes} minutes with the stroller, out and back, on the sidewalk.`;
  } else if (outing === "garden") {
    mission = garden.sowNow[0]
      ? `Go to the bed and do this one job: ${garden.sowNow[0]}.`
      : garden.task;
  } else if (outing === "walk") {
    mission = `Walk for about ${minutes} minutes, out and back, with the phone in a pocket.`;
  } else {
    mission = `Sit outside for ${minutes} minutes where you can see one living thing.`;
  }
  const steps = balcony
    ? [
        "Bring pots in from the rail if the wind can tip them.",
        garden.sowNow[0] ? `If the soil crumbles, plant this in one pot: ${garden.sowNow[0]}.` : "If the soil smears, leave it alone.",
        "Stop after that one pot."
      ]
    : wheeled
      ? [
          "Stay on the sidewalk with the stroller.",
          "Pause once, where there are trees, and take the three senses.",
          "Turn around before anyone is tired."
        ]
      : outing === "garden"
        ? [
            garden.task,
            garden.sowNow[0] ? `If the soil is workable: ${garden.sowNow[0]}.` : "If the soil smears or is frozen, do not dig.",
            "Stop when the one job is done."
          ]
        : outing === "walk"
          ? [
              brief.cues.walk,
              "Pause once, at the far point, and take the three senses in order.",
              "Turn around and come back without looking at the phone."
            ]
          : [
              brief.cues.sit,
              "Look, then listen, then touch. One thing each.",
              "Stay a little past the urge to check the time."
            ];
  return {
    title: clampWords(titles[outing], 10),
    mission: clampWords(mission, 32),
    notices: ["look", "listen", "touch"].map((sense) => ({
      sense,
      text: clampWords(observations[sense][0] || "Whatever is actually in front of you.", 22)
    })),
    steps: steps.slice(0, 3).map((step) => clampWords(step, 22)),
    pocketLine: clampWords(
      balcony ? "One pot, then back inside." : wheeled ? "Sidewalk, one pause, and back." : outing === "garden" ? "One job, then the phone stays away." : outing === "walk" ? "Out, one pause, and back." : "Sit. The phone is not the view.",
      14
    ),
    whyNow: clampWords(frost.line, 32)
  };
}

function arrangeNotices(raw, observations) {
  const notices = Array.isArray(raw) ? raw : [];
  return ["look", "listen", "touch"].map((sense) => {
    const found = notices.find((item) => item && item.sense === sense && String(item.text || "").trim());
    const text = found ? found.text : observations[sense][0];
    return { sense, text: clampWords(text, 22) };
  });
}

export function normalizeCard(raw, brief) {
  if (!raw || typeof raw !== "object") return null;
  const title = clampWords(cleanPhrase(raw.title), 12);
  const mission = clampWords(raw.mission, 36);
  if (!title || !mission) return null;
  const steps = (Array.isArray(raw.steps) ? raw.steps : [])
    .map((step) => clampWords(cleanPhrase(step), 40))
    .filter(Boolean)
    .slice(0, 3);
  while (steps.length < 3) {
    const spare = brief.outing === "garden" ? brief.garden.task : brief.cues[brief.outing] || brief.cues.walk;
    steps.push(clampWords(spare, 22));
  }
  return {
    title,
    mission,
    notices: arrangeNotices(raw.notices, brief.observations),
    steps,
    pocketLine: clampWords(cleanPhrase(raw.pocketLine || mission), 16),
    whyNow: clampWords(raw.whyNow || brief.frost.line, 36)
  };
}

export function cardIsThin(card, brief) {
  if (!card) return true;
  const title = card.title.toLowerCase();
  const city = brief.place.city.toLowerCase();
  if (title.includes(city)) return true;
  if (/\b(january|february|march|april|may|june|july|august|september|october|november|december|20\d\d)\b/.test(title)) return true;
  if (card.mission.split(/\s+/).length < 6 || card.mission.split(/\s+/).length > 28) return true;
  const blob = `${card.mission} ${card.steps.join(" ")} ${card.whyNow}`.toLowerCase();
  if (/obey the note|their note|the brief|assignment|json|\bsample\b/.test(blob)) return true;
  if (/pocketline|whynow|first action|second action|third action|\bsample\b/.test(blob)) return true;
  if (card.steps.filter((step) => /^(look|listen|touch)\b/i.test(step.trim())).length >= 2) return true;
  if (brief.outing !== "garden" && /\b(plant|planting|sow|sowing|garlic|tomato|tomatoes|harvest)\b/.test(blob)) return true;
  if (/just_after_first_frost|cold_season|before_last_frost/.test(brief.frost.status) && /plant tender/.test(blob)) return true;
  const constraint = (brief.note || "").toLowerCase();
  const must = constraint.match(/balcony|stoop|porch|toddler|stroller|wheelchair/);
  if (must && !`${card.mission} ${card.steps[0] || ""}`.toLowerCase().includes(must[0])) return true;
  if (!/\b(balcony|pot|pots|rail|stoop|porch)\b/.test(constraint) && /\b(pots?|rails?|balcony)\b/.test(blob)) return true;
  return false;
}

export function cardFromModelOrCalendar(raw, brief) {
  const card = normalizeCard(raw, brief);
  if (!card || cardIsThin(card, brief)) return { ...fallbackCard(brief), fromCalendar: true };
  return card;
}

export { fallbackCard };
