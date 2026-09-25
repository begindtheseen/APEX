var ENV = require('./_env');
var LP = require('./_launchpad');
// Learn mode, lesson by lesson, through the real UI. For every lesson in
// every track: the starter code must NOT pass (the lesson asks for work), and
// the reference solution MUST pass every check (the lesson can be passed).
// The runtimes (Pyodide, sql.js, the TypeScript compiler and clang) are the
// same pinned packages the app downloads, served here from node_modules.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

const NM = path.join(ENV.REPO, 'node_modules');
const TYPES = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.wasm': 'application/wasm', '.tar': 'application/x-tar', '.ts': 'text/plain', '.json': 'application/json', '.zip': 'application/zip' };
const pyodideVersion = require(path.join(NM, 'pyodide', 'package.json')).version;

async function serveCdn(ctx) {
  const fulfil = async (route, file) => {
    if (!fs.existsSync(file)) return route.continue();
    await route.fulfill({ status: 200, body: fs.readFileSync(file), headers: { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'access-control-allow-origin': '*' } });
  };
  await ctx.route(/^https:\/\/cdn\.jsdelivr\.net\/pyodide\/v([^/]+)\/full\/(.+)$/, (route) => {
    const m = /\/pyodide\/v([^/]+)\/full\/([^?]+)/.exec(route.request().url());
    if (m[1] !== pyodideVersion) return route.continue();
    return fulfil(route, path.join(NM, 'pyodide', m[2]));
  });
  await ctx.route(/^https:\/\/(cdn\.jsdelivr\.net\/npm|unpkg\.com)\/((?:@[^/]+\/)?[^@/]+)@[^/]+\/(.+)$/, (route) => {
    const m = /^https:\/\/(?:cdn\.jsdelivr\.net\/npm|unpkg\.com)\/((?:@[^/]+\/)?[^@/]+)@[^/]+\/([^?]+)/.exec(route.request().url());
    return fulfil(route, path.join(NM, m[1], m[2]));
  });
}

async function setCode(p, code) {
  await p.click('.cm-content');
  await p.keyboard.press('Control+A');
  await p.evaluate((c) => {
    const dt = new DataTransfer();
    dt.setData('text/plain', c);
    document.querySelector('.cm-content').dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  }, code);
  await p.waitForTimeout(80);
}

/** Runs & checks; returns { passed, results: [status name], output } */
async function check(p) {
  await p.click('.pg__toolbar .btn--primary');
  await p.waitForFunction(() => {
    const b = document.querySelector('.pg__toolbar .btn--primary');
    return b && !b.disabled && document.querySelector('.test[data-status]');
  }, null, { timeout: 180000 });
  return p.evaluate(() => ({
    passed: !!document.querySelector('.lm-passed'),
    results: Array.from(document.querySelectorAll('.test[data-status]')).map((t) => t.dataset.status + ' ' + t.querySelector('.test__name').textContent + (t.querySelector('.lm-detail') ? ' :: ' + t.querySelector('.lm-detail').textContent.slice(0, 160) : '')),
    output: (document.querySelector('.console') || {}).innerText || '',
  }));
}

(async () => {
  const src = path.join(ENV.REPO, 'launchpad-app', 'src', 'learn');
  const { parseTrack } = await import(pathToFileURL(path.join(src, 'parse.ts')).href);
  const tracks = ['javascript', 'typescript', 'python', 'sql', 'cpp'].map((l) => parseTrack(fs.readFileSync(path.join(src, 'tracks', l + '.txt'), 'utf8'), l + '.txt'));

  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, serviceWorkers: 'block' });
  await serveCdn(ctx);
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await LP.reset(p);
  await LP.open(p, '/learn');

  const cards = await p.$$eval('.lm-track', (e) => e.map((c) => c.dataset.lang));
  ok('the course lists a track per language', cards.join(',') === 'javascript,typescript,python,sql,cpp', cards.join(','));
  const navLearn = await p.$$eval('.side .nav-item', (e) => e.some((a) => /Learn to code/.test(a.textContent)));
  ok('Learn to code is in the sidebar', navLearn);

  const only = process.env.LEARN_ONLY ? process.env.LEARN_ONLY.split(',') : null;
  for (const track of tracks) {
    if (only && !only.includes(track.lang)) continue;
    const bad = [];
    const t0 = Date.now();
    for (const lesson of track.lessons) {
      await LP.go(p, '/learn/' + lesson.id);
      await p.waitForSelector('.cm-content');
      await setCode(p, lesson.starter);
      const s = await check(p);
      if (s.passed) bad.push(lesson.id + ': the starter already passes');
      await setCode(p, lesson.solution);
      const r = await check(p);
      if (!r.passed) bad.push(lesson.id + ': the solution fails → ' + r.results.filter((x) => !x.startsWith('pass')).join(' | ') + ' || output: ' + r.output.slice(0, 200).replace(/\n/g, '⏎'));
    }
    ok(track.title + ': every starter needs work and every solution passes (' + track.lessons.length + ' lessons, ' + Math.round((Date.now() - t0) / 1000) + 's)', bad.length === 0, bad.join('\n        '));
  }

  // Progress shows on the course page, and the playground points into it.
  await LP.go(p, '/learn');
  const chips = await p.$$eval('.lm-track .chip', (e) => e.map((c) => c.textContent.trim()));
  ok('the course shows what was passed', only ? true : chips.every((c) => /^(\d+)\/\1$/.test(c)), chips.join(' '));
  await LP.go(p, '/playground?lang=cpp');
  const callout = await p.$eval('.pg-learn', (e) => e.textContent).catch(() => '');
  ok('the playground offers Learn mode for its language', /Learn mode/.test(callout) && /C\+\+/.test(callout), callout.slice(0, 120));
  const tab = await p.$eval('.seg [role=tab][aria-selected=true]', (e) => e.textContent.trim()).catch(() => '');
  ok('?lang= opens the playground on that language', tab === 'C++', tab);

  // Code carries from a lesson into the playground.
  await LP.go(p, '/learn/py-01');
  await setCode(p, 'print("carried over")\n');
  await p.click('button:has-text("Open in playground")');
  await p.waitForTimeout(600);
  const carried = await p.$$eval('.cm-content .cm-line', (ls) => ls.map((l) => l.textContent).join('\n')).catch(() => '');
  ok('Open in playground carries the code over', /carried over/.test(carried) && /#\/playground\?lang=python/.test(p.url()), carried.slice(0, 60));

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nEVERY LESSON CAN BE PASSED, AND NONE PASSES ON ITS STARTER');
  process.exit(fails ? 1 : 0);
})();
