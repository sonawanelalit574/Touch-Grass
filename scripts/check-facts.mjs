import { places } from "../data/places.mjs";
import { buildBrief } from "../lib/facts.mjs";

const when = new Date("2026-10-13T17:00:00.000Z");
const cases = [
  ["minneapolis", "just_after_first_frost", false],
  ["phoenix", "open_season", true],
  ["miami", "frost_free", true],
  ["bozeman", "just_after_first_frost", false],
  ["seattle", "open_season", false]
];

let failed = 0;
for (const [id, status, tomatoesOk] of cases) {
  const place = places.find((item) => item.id === id);
  const brief = buildBrief({ place, outing: "garden", minutes: 25, note: "", date: when });
  const sow = brief.garden.sowNow.join(" | ");
  const hasTomato = /tomato/i.test(sow);
  const ok = brief.frost.status === status && hasTomato === tomatoesOk;
  if (!ok) failed += 1;
  console.log(`${ok ? "ok" : "FAIL"} ${id}: ${brief.frost.status} (wanted ${status})`);
  console.log(`  ${brief.frost.line}`);
  console.log(`  sow: ${sow || "(nothing)"}`);
  console.log(`  ${brief.light.sentence}`);
}

if (failed) {
  console.error(`${failed} fact checks failed`);
  process.exit(1);
}
console.log("fact checks passed");
