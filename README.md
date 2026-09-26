# APEX — Progressive Protocol

A self-contained, installable web app that tracks a 16-week protocol for
brain recovery, Navy boot-camp physical prep, and ASVAB / Nuclear Field study.
Habits unlock one phase at a time so you are never asked to do more than you
can handle in a day.

The entire app is a single `index.html` — no build step, no backend, no
accounts. (LAUNCHPAD, one of its realms, is its own app and ships prebuilt in
`launchpad/`; see below.) **Your progress is saved automatically on the device you use it on.**

## How progress is saved

- All progress (habit checks, streaks, PRT scores, logs, phase, readiness) is
  written to the browser's `localStorage` under the key `apex_v4`. It persists
  between visits and works fully offline.
- Because that storage is per-device and per-browser, the app also has a
  **Backup & Restore** panel (bottom of the **Readiness** tab):
  - **Export backup** downloads an `apex-backup-YYYY-MM-DD.json` file with all
    your data.
  - **Restore from backup** loads that file on a new phone, a new browser, or
    after storage has been cleared.
- Keep an occasional exported backup somewhere safe (cloud drive, email). That
  file is the durable copy of your progress.

## Install it on your phone (PWA)

The app ships with a web manifest (`manifest.json`), an icon (`icon.svg`), and
a service worker (`sw.js`), so it installs to your home screen and runs offline.

1. Open the hosted URL in your phone's browser.
2. **iOS Safari:** Share → *Add to Home Screen*.
   **Android Chrome:** menu → *Install app* / *Add to Home screen*.
3. Launch it from the home-screen icon — full screen, no browser chrome.

## Run it locally

It's a static file, so any static server works. From this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

> Open it through a server (not `file://`) so the service worker and manifest
> load. Plain `file://` still tracks progress, but won't install as a PWA.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that publishes to **GitHub Pages** on every push to the default branch. To turn
it on: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire app — UI, logic, and `localStorage` persistence. |
| `launchpad/` | LAUNCHPAD — the built app (committed; served as-is). |
| `launchpad-app/` | LAUNCHPAD's source: ORBIT's learning platform carrying the LAUNCHPAD curriculum. |
| `curriculum-ai.js` / `AI_ENGINEERING_CURRICULUM.md` / `launchpadviz.js` | The LAUNCHPAD curriculum: data, prose, and mechanism figures. The app is generated from these. |
| `obsidian.js` / `obsviz.js` | Obsidian curriculum data + its animated mechanism diagrams. |
| `redline.js` / `redlineviz.js` | REDLINE social-media operator curriculum + mechanism diagrams. |
| `REDLINE_RESEARCH.md` | REDLINE source map, update policy, and curriculum coverage. |
| `manifest.json` | PWA metadata (name, colors, icon) for home-screen install. |
| `sw.js` | Service worker — caches the app shell for offline use. |
| `icon.svg` | App icon used by the manifest and home screen. |
| `.github/workflows/deploy.yml` | Publishes the app to GitHub Pages. |
| `.github/workflows/ci.yml` | The drift check, the browser suites, and the LAUNCHPAD build check. |
| `RESEARCH.md` | The evidence base — every science claim, threshold, and Navy fact mapped to its source. |

## The realm launcher — four curricula

The app opens on a **realm-select start page**: side-by-side panels —
**APEX** (blue ■, the protocol above), **LAUNCHPAD**, **OBSIDIAN** (white ◆),
and **REDLINE** (red ▲). Tapping a panel plays a full-screen warp transition in
that realm's color and drops you in. The ❖ button (or ← REALMS) returns to
the launcher. Each realm keeps fully separate progress.

## LAUNCHPAD — AI engineering, from zero to employed

**LAUNCHPAD** is a 33-module AI-engineering curriculum (nine layers, ten
parallel tracks, a hard gate before the AI layers). It runs as its own app at
**`launchpad/`**: the ORBIT learning platform — the same layout, navigation,
module pages (Learn → Build → Recall), spaced-repetition review, focus
sessions, search, and coding playground — carrying the LAUNCHPAD curriculum
exactly as written.

- **The curriculum is the source of truth.** `curriculum-ai.js` (data),
  `AI_ENGINEERING_CURRICULUM.md` (prose) and `launchpadviz.js` (figures) are
  read at build time; the module lessons are the document's own text, split at
  each module's gate. Edit those files, rebuild, and the app follows.
- **Claims work the way they always did:** delta written → every checkpoint
  ticked → artifact built → gate passed, with the hard gate before layers 4–6.
  Mastery, the review queue and the readiness ring are driven by those claims.
- **Progress** lives in the app's own IndexedDB store (`launchpad`), with a
  mirror in `localStorage` under the old realm's key, `apex_launchpad_v1`, so
  the launcher's count and any old realm backup keep working. Progress from the
  old in-page realm is adopted automatically on first launch. Settings has its
  own Export / Restore / Reset.
- **The playground** has four modes — Code, SQL, Web and Terminal — in one IDE
  window, and runs every language it offers, for real, in the browser:
  JavaScript (a throwaway worker), TypeScript (the real compiler, strict —
  a type error stops the run), Python (Pyodide), SQL (sql.js), C++ (clang++
  compiled to WebAssembly, with an Input tab for stdin; no exceptions in this
  toolchain), web pages (a sandboxed frame, `src/lib/web.ts`) and a practice
  terminal (an in-page shell with enough git to learn the loop,
  `src/lib/shell.ts`). The compilers are downloaded from a CDN on first use;
  the browser suite serves the same pinned versions from `node_modules`. An
  iPhone or iPad cannot run the 75 MB compiler module in a browser, so there
  (and wherever it fails to start) C++ is compiled and run on Compiler
  Explorer, with Wandbox as a fallback (`src/lib/cppRemote.ts`), and the
  output says so.
- **Read aloud** uses a natural neural voice, Kokoro-82M, made on the device
  (`src/lib/voice/`): ONNX Runtime and the phonemiser come from the CDN, the
  92 MB model from Hugging Face once into Cache Storage, and a small pool of
  workers makes each next piece of the lesson while the last one plays. The
  device's own voices stay in the picker and are the fallback.
- **The playground, embedded.** `components/ide/Embed.tsx` is the playground's
  window as a component: module lessons end with it (Try it here, languages
  per module in `src/lib/practice.ts`), runnable code in any lesson or Learn
  text becomes it, and Learn challenges are done in it. `src/lib/run.ts` is
  the one place that says how each language runs.
- **Learn to code** (`#/learn`) opens on roadmaps — eleven goals (Web
  Developer and AI Research Engineer among them), each a path of course tiles
  ending at a certificate — and a mastery roadmap per language. 37 courses,
  515 lessons, including a specialty course, AI from scratch: the command line, Git, HTML
  and CSS, JavaScript, TypeScript, Python, SQL and C++, each from basics
  through intermediate, advanced and expert (the terminal and git to
  advanced) to a projects course with capstones, mixing concept, debugging,
  problem-solving and design lessons. Each lesson is done in the same IDE
  window and graded as test cases. A course is one plain-text file in
  `launchpad-app/src/learn/tracks/` (`<lang>.txt` for the basics,
  `<lang>.<level>.txt` after; the format is described in `src/learn/parse.ts`
  and how to write one in `src/learn/AUTHORING.md`; `src/learn/CURRICULUM.md`
  maps what every lesson teaches). The roadmaps are in
  `src/learn/platform.ts`. `src/learn/verify.test.ts` runs every lesson's
  starter and solution in the real runtimes in Node (CI: "Every lesson can be
  passed"), and `test/browser/learn.js` does the same through the app.

### Changing LAUNCHPAD

```bash
cd launchpad-app
npm ci
npm run dev        # http://localhost:5173 — regenerates the curriculum first
npm test           # unit tests
npm run build      # writes the app to ../launchpad — commit the result
```

The build is deterministic, and CI rebuilds it and fails if the committed
`launchpad/` differs from what the source produces.

## Obsidian — the second curriculum (black side)

**Obsidian** is a black-themed realm running the same learning engine
(lesson → flashcards → quiz → spaced repetition → adaptive timed drills) on a
completely different curriculum, with completely separate progress.

- All Obsidian content lives in **`obsidian.js`** — config, subjects, topics,
  and an optional drill question bank. The app ships with placeholder content.
- To teach a new subject: give the **HANDOFF SPEC** comment at the top of
  `obsidian.js` to whoever (or whatever session) is writing your curriculum,
  then paste their output into that file and reload. Nothing else changes.
- Obsidian progress is stored under its own key (`apex_obsidian_v1`) and has
  its own Export/Restore/Reset buttons at the bottom of its dashboard — it is
  **not** included in the main APEX backup.

## REDLINE — the third curriculum (red side)

**REDLINE** is a zero-experience-to-professional social-media operator
masterclass. It teaches brand architecture, audience research, content
strategy, scripting, production, editing, distribution, a testable virality
system, analytics, Instagram, TikTok, YouTube, Facebook, Threads, LinkedIn, X,
Pinterest, community and conversion, paid social, client acquisition, agency
delivery, team leadership, legal/compliance, and a portfolio capstone. Caleb
Ralston's Brand Journey, Brand Story, Waterfall Distribution, filming,
experimentation, hiring, onboarding, 1:1, and maker/manager frameworks form a
major operating spine. Content lives in **`redline.js`** (+ `redlineviz.js`
diagrams), sources in **`REDLINE_RESEARCH.md`**, and new progress under
`apex_redline_v2` with its own Export/Restore/Reset.

## The science behind it

APEX's habits, phase thresholds, and Science tab are grounded in published research
(Lally 2010 on habit formation, BDNF/exercise studies, cannabis-recovery timelines,
Navy boot-camp standards, and more). The full source list — with DOIs, key findings,
and where each is used in the app — is in **[RESEARCH.md](RESEARCH.md)**.
