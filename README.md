# APEX

APEX is a learning and habit tracking web app I built. It installs to a phone's home screen,
works offline, and keeps all progress on the device. There is no backend and no account.

It opens on a launcher with four sections (realms), each with its own progress, export and reset.

## What's in it

- **APEX (the tracker).** A daily habit and study program split into four phases. A phase
  unlocks only after you complete at least 70% of the current phase's habits for a set number of
  days, so the daily load grows slowly. It has workout and fitness test logging, a study section
  with a practice question bank (about 490 questions) and adaptive timed drills, a readiness view
  with an 8 week consistency calendar, and backup and restore to a JSON file.
- **LAUNCHPAD.** A software and AI engineering curriculum (41 modules) that runs as its own React
  app under `launchpad/`. It has spaced repetition review, focus sessions, search, and a code
  playground that runs JavaScript, TypeScript, Python, SQL, C++ and HTML in the browser. Lessons can
  be read aloud with word by word highlighting.
- **OBSIDIAN.** A markets and finance curriculum on a shared lesson engine: predict first, then
  lesson, flashcards, quiz, spaced repetition and gate drills, with animated diagrams.
- **REDLINE.** A social media operator curriculum on the same engine.

## Run it locally

The main app is static files, so any static server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Use a server rather than `file://` so the service worker loads. For LAUNCHPAD's source:

```bash
cd launchpad-app
npm ci
npm run dev      # dev server on http://localhost:5173
npm test         # unit tests
npm run build    # writes the built app to ../launchpad (the build is committed)
```

## Tests

- `npm run test:drift` checks that `AI_ENGINEERING_CURRICULUM.md` and `curriculum-ai.js` agree.
- `npm test` runs the drift check and then the browser suites in `test/browser/` with Playwright.
  It needs `npm ci` and `npx playwright install chromium` first.
- `cd launchpad-app && npm test` runs LAUNCHPAD's unit tests with Vitest.

GitHub Actions (`.github/workflows/ci.yml`) runs all of these on every push. It also rebuilds
LAUNCHPAD and fails if the committed `launchpad/` folder differs from what the source produces.

## Tech

- Main app: plain HTML, CSS and JavaScript, a service worker, a web manifest, `localStorage`.
- LAUNCHPAD: React, TypeScript, Vite, Vitest, CodeMirror, IndexedDB, Pyodide, sql.js, clang
  compiled to WebAssembly, and ONNX Runtime Web for read aloud.
- Node and Playwright for tests, GitHub Actions for CI, GitHub Pages for hosting.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The main app: UI, logic and storage |
| `curriculum.js`, `qbank.js`, `jobs.js` | Tracker study content and question bank |
| `obsidian.js`, `obsviz.js`, `redline.js`, `redlineviz.js` | OBSIDIAN and REDLINE curricula and diagrams |
| `curriculum-ai.js`, `AI_ENGINEERING_CURRICULUM.md`, `launchpadviz.js` | LAUNCHPAD curriculum sources, read at build time |
| `launchpad-app/`, `launchpad/` | LAUNCHPAD source and its committed build |
| `sw.js`, `manifest.json`, `icon.svg` | Offline support and install metadata |
| `test/` | Drift check, browser suites and test server |
| `docs/` | Research and planning notes (not loaded by the app) |

## How this project evolved

- **June 2026.** I started with one `index.html` habit tracker. Early bugs showed false "skipped"
  warnings on day one and stale skip data that only a full reset cleared. After fixing those I
  moved the derived data into one sync function and fixed two silent data bugs along the way.
- **Late June.** I added a practice test engine, then made the exams adaptive with difficulty
  tagged questions. I also wrote a source file that grades every factual claim in the app, and
  reworded the claims that said more than their evidence supported.
- **July.** I built OBSIDIAN as a second realm where the curriculum is a separate data file, so
  a new subject needs no engine changes. I found the service worker could install stale files
  from the browser cache, so it now fetches the app shell with the cache bypassed.
- **Late July to August.** I added the realm launcher. Its first animation stuttered, so I
  switched the glows to gradients and moved the moving layers onto the compositor. I later
  replaced REDLINE's first curriculum entirely with the social media one.
- **September.** I ran repeated reviews (cold reader walkthroughs, accessibility, offline
  durability) and fixed what they found. I committed the tests, added the drift check, and fixed
  browser suites that only passed on my machine because of hardcoded ports and paths.
- **Late September.** I moved LAUNCHPAD into its own React and TypeScript app, with CI proving
  the committed build matches the source. Versions 1.1 to 1.4 (see `launchpad-app/CHANGELOG.md`)
  added Learn to code, in browser runtimes, read aloud, and the Frontier layer.
