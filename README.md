# APEX — Progressive Protocol

A self-contained, installable web app that tracks a 16-week protocol for
brain recovery, Navy boot-camp physical prep, and ASVAB / Nuclear Field study.
Habits unlock one phase at a time so you are never asked to do more than you
can handle in a day.

The entire app is a single `index.html` — no build step, no backend, no
accounts. **Your progress is saved automatically on the device you use it on.**

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
| `manifest.json` | PWA metadata (name, colors, icon) for home-screen install. |
| `sw.js` | Service worker — caches the app shell for offline use. |
| `icon.svg` | App icon used by the manifest and home screen. |
| `.github/workflows/deploy.yml` | Publishes the app to GitHub Pages. |
