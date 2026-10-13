# Touch Grass

A field station for the next half hour. It writes one card — a garden job, a walk, or a sit — and then the phone is supposed to go in a pocket.

The card is not a feed. You read it at the door. Pocket mode is a clock and one sentence. When you come back, you keep a single line about what you noticed. That line stays in `data/journal.json` on this computer.

## Why open

The sentence on the card is written by **Qwen2.5 1.5B Instruct**, an open-weight model (Apache 2.0), running in **llama.cpp** (MIT) on the laptop. There is no model API in the loop.

That matters for this, specifically:

- **It still works with the network unplugged**, after the one-time download. `llama-server` is started with `--offline`. The page loads from this machine. Frost math, sunset, and the journal never leave it.
- **Place and notes are not a product.** A walk past your building, a balcony, a toddler, a half-finished garden — none of that has to sit on a server you do not control.
- **The climate is local code, not a vibe.** Average frost dates are bundled and calculated here. In October a continental town is past first frost, so the brief says garlic, not tomatoes. Phoenix is at the *start* of its vegetable year, so the brief says tomatoes now. A general closed chatbot tends to say “wait for spring” to both. The open model only phrases the brief it is given, and you can read that brief in `lib/facts.mjs`.
- **You can change the ranger.** `prompts/ranger.txt` is the voice. There is an editor on the page. The next card uses the file you saved. No vendor prompt is locked.
- **You can swap the model.** Put another `.gguf` in `models/`, set `TOUCH_GRASS_MODEL` to the filename, and restart. Same station, different weights. It costs nothing per outing.

Frost dates are climatic averages, rounded to a typical week, not a forecast and not a substitute for a local extension office.

## Run

```powershell
node server.mjs
```

Open http://127.0.0.1:8787

The first launch loads the weights. That takes a little while. After that, a card is a short local generation.

On the same Wi-Fi, a phone can open the station too:

```powershell
node server.mjs --lan
```

Make the card at the door. Hit **Phone in pocket**. The timer counts from a timestamp, so locking the screen does not reset it. **Print and leave the phone** if you would rather not take it at all.

If `node server.mjs` says the model is missing:

```powershell
powershell -ExecutionPolicy Bypass -File setup.ps1
```

That downloads llama.cpp and the Qwen GGUF (about 1 GB).

## What is open, and where

| Piece | What it is |
| --- | --- |
| `bin/llama` | llama.cpp, the inference engine |
| `models/*.gguf` | open weights |
| `prompts/ranger.txt` | the voice, editable |
| `data/phenology.mjs` | seasonal cues by climate and month |
| `lib/facts.mjs` | frost status, daylight, what may be sown |
| `data/journal.json` | your notes, created when you save one |

Mushrooms in the seasonal notes are for looking, not eating. Walks stay on public paths.
