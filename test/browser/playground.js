var ENV = require('./_env');
var LP = require('./_launchpad');
// The playground carries the curriculum's languages plus C++, and every one
// of them really runs. The compilers normally come from a CDN on first use;
// here the same pinned packages are served from this repo's node_modules, so
// the run is deterministic and needs no network.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

const NM = path.join(ENV.REPO, 'node_modules');
const TYPES = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.wasm': 'application/wasm', '.tar': 'application/x-tar', '.ts': 'text/plain' };

/** Serves `https://<cdn>/<npm path>/pkg@ver/rest` from node_modules/pkg/rest. */
async function serveCdn(ctx) {
  await ctx.route(/^https:\/\/(cdn\.jsdelivr\.net\/npm|unpkg\.com)\/((?:@[^/]+\/)?[^@/]+)@[^/]+\/(.+)$/, async (route) => {
    const m = /^https:\/\/(?:cdn\.jsdelivr\.net\/npm|unpkg\.com)\/((?:@[^/]+\/)?[^@/]+)@[^/]+\/(.+)$/.exec(route.request().url());
    const file = path.join(NM, m[1], m[2]);
    if (!fs.existsSync(file)) return route.continue();
    await route.fulfill({
      status: 200,
      body: fs.readFileSync(file),
      headers: { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'access-control-allow-origin': '*' },
    });
  });
}

/** The editor's text, read the way it renders: one line per .cm-line. */
async function getCode(p) {
  return p.$$eval('.cm-content .cm-line', ls => ls.map(l => l.textContent).join('\n'));
}

/** Replaces the editor's text with a paste, so nothing is auto-indented or auto-closed. */
async function setCode(p, code) {
  await p.click('.cm-content');
  await p.keyboard.press('Control+A');
  await p.evaluate(c => {
    const dt = new DataTransfer();
    dt.setData('text/plain', c);
    document.querySelector('.cm-content').dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  }, code);
  await p.waitForTimeout(100);
}

async function run(p, timeout = 180000) {
  await p.click('.ide__run .ide-run');
  await p.waitForFunction(() => {
    const b = document.querySelector('.ide__run .ide-run');
    return b && !b.disabled && document.querySelector('.ide-console');
  }, null, { timeout });
  await p.waitForTimeout(150);
  return p.evaluate(() => Array.from(document.querySelectorAll('.ide-console')).map(c => c.innerText).join('\n'));
}

async function panelTab(p, name) {
  await p.click(`.ide-panel__tab:has-text("${name}")`);
  await p.waitForTimeout(120);
}

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, serviceWorkers: 'block' });
  await serveCdn(ctx);
  const p = await ctx.newPage();
  // Playwright's service-worker block reaches into the sandboxed preview
  // frame, where reading navigator.serviceWorker throws: its noise, not ours.
  const errs = []; p.on('pageerror', e => { if (!/serviceWorker/.test(String(e))) errs.push(String(e)); });
  await LP.reset(p);
  await LP.open(p, '/playground');

  const modes = await p.$$eval('.ide-modes [role=tab]', e => e.map(x => x.textContent.trim()));
  ok('the modes are Code, SQL, Web and Terminal', modes.join(',') === 'Code,SQL,Web,Terminal', modes.join(','));
  const langs = await p.$$eval('.ide__pick option', e => e.map(x => x.value));
  ok('Code mode\'s file pill offers the curriculum\'s languages plus C++', langs.join(',') === 'python,javascript,typescript,cpp', langs.join(','));
  ok('no MATLAB, Simulink or Rust', !langs.some(t => /matlab|simulink|rust/.test(t)));
  ok('the Run Code button floats over the editor', !!(await p.$('.ide__body .ide__run .ide-run')));

  // ── C++ ────────────────────────────────────────────────────────────────
  await p.selectOption('.ide__pick select', 'cpp');
  await p.waitForTimeout(250);
  const file = await p.$eval('.ide__pick-face', e => e.textContent.trim());
  ok('picking C++ names the file main.cpp', file === 'main.cpp', file);
  await panelTab(p, 'Input');
  ok('C++ has a standard-input tab', !!(await p.$('.ide-stdin')));
  const t0 = Date.now();
  let out = await run(p);
  ok('the C++ starter compiles and runs, reading its input', /5 requests, 3 users/.test(out) && /ada: 7400 tokens/.test(out), out.slice(0, 160).replace(/\n/g, ' | '));
  console.log('        first C++ run (compiler load + compile + run): ' + (Date.now() - t0) + ' ms');

  await panelTab(p, 'Input');
  await p.fill('.ide-stdin', 'zed 5\nzed 7\n');
  out = await run(p);
  ok('changing the input changes what the program reads', /2 requests, 1 users/.test(out) && /zed: 12 tokens/.test(out), out.slice(0, 120).replace(/\n/g, ' | '));

  await setCode(p, '#include <vector>\n#include <numeric>\n#include <cstdio>\nint main() {\n  std::vector<int> v(10);\n  std::iota(v.begin(), v.end(), 1);\n  std::printf("%d\\n", std::accumulate(v.begin(), v.end(), 0));\n  return 3;\n}\n');
  out = await run(p);
  ok('the standard library works and the exit code is reported', /\b55\b/.test(out) && /exit code 3/.test(out), out.replace(/\n/g, ' | '));

  await setCode(p, 'int main() {\n  int x = ;\n}\n');
  out = await run(p);
  ok('a compile error shows clang\'s own message', /did not compile/.test(out) && /main\.cpp:2:\d+: error: expected expression/.test(out), out.slice(0, 200).replace(/\n/g, ' | '));
  const bang = await p.$('.ide-panel__tab[data-active=true] .ide-bad');
  ok('and the Console tab is marked as failed', !!bang);

  await setCode(p, '#include <stdexcept>\nint main() { throw std::runtime_error("no"); }\n');
  out = await run(p);
  ok('throw is refused at compile time, and says why', /did not compile/.test(out) && /exceptions disabled/.test(out), out.slice(0, 200).replace(/\n/g, ' | '));

  await setCode(p, '#include <cstdlib>\nint main() { std::abort(); }\n');
  out = await run(p);
  ok('a crash is reported as a crash', /The program crashed/.test(out), out.slice(0, 160).replace(/\n/g, ' | '));

  await setCode(p, 'int main() { volatile int i = 0; for (;;) { i = i + 1; } }\n');
  out = await run(p, 60000);
  ok('a loop that never ends is stopped', /Still running after 10 seconds/.test(out), out.slice(0, 120).replace(/\n/g, ' | '));

  await setCode(p, '#include <iostream>\nint main() { std::cout << "again\\n"; }\n');
  out = await run(p);
  ok('and the compiler survives it for the next run', /again/.test(out), out.slice(0, 80));

  // ── TypeScript ─────────────────────────────────────────────────────────
  await p.selectOption('.ide__pick select', 'typescript');
  await p.waitForTimeout(200);
  out = await run(p);
  ok('the TypeScript starter type-checks and runs',
    /text \(34 chars\)/.test(out) && /tool search_docs\(query, limit\)/.test(out) && /refused: outside the product scope/.test(out), out.replace(/\n/g, ' | '));

  const starter = await getCode(p);
  await setCode(p, starter.replace(/    case 'refusal':\n      return `refused: \$\{reply\.reason\}`\n/, ''));
  out = await run(p);
  ok('a missing case is a type error, and nothing runs', /Type errors, so nothing ran/.test(out) && /main\.ts\(\d+,\d+\): error TS2322/.test(out) && !/text \(34 chars\)/.test(out), out.slice(0, 220).replace(/\n/g, ' | '));

  await setCode(p, 'const n: number = 2\nawait new Promise((r) => setTimeout(r, 10))\nconsole.log(n * 21)\n');
  out = await run(p);
  ok("top-level await and timers work in TypeScript", /\b42\b/.test(out), out.slice(0, 600).replace(/\n/g, " | "));

  // ── JavaScript still runs ──────────────────────────────────────────────
  await p.selectOption('.ide__pick select', 'javascript');
  await p.waitForTimeout(200);
  out = await run(p);
  ok('JavaScript still runs', /7 sync, last line/.test(out), out.slice(0, 80).replace(/\n/g, ' | '));

  // ── SQL ────────────────────────────────────────────────────────────────
  await p.click('.ide-modes [role=tab]:has-text("SQL")');
  await p.waitForTimeout(300);
  ok('SQL mode edits query.sql', (await p.$eval('.ide__name', e => e.textContent)) === 'query.sql');
  await p.click('.ide__run .ide-run');
  await p.waitForSelector('.ide-table table', { timeout: 60000 });
  const rows = await p.$$eval('.ide-table tbody tr', e => e.map(r => r.textContent));
  ok('a query shows its rows as a table', rows.length === 3 && /lin@example\.com/.test(rows[0]), rows.join(' | '));
  await panelTab(p, 'Tables');
  const schema = await p.$eval('.ide-panel__body', e => e.textContent);
  ok('the Tables tab shows the database it runs on', /CREATE TABLE users/.test(schema) && /CREATE TABLE requests/.test(schema));

  // ── Web ────────────────────────────────────────────────────────────────
  await p.click('.ide-modes [role=tab]:has-text("Web")');
  await p.waitForTimeout(600);
  const frame = p.frameLocator('.web-preview');
  const h1 = await frame.locator('h1').textContent({ timeout: 10000 }).catch(() => '');
  ok('Web mode renders the page in a live preview', h1 === 'Hello, web!', h1);
  await frame.locator('#launch').click();
  const status = await frame.locator('#status').textContent().catch(() => '');
  ok('its JavaScript runs: a click changes the page', status === 'Launched 1 time', status);
  await panelTab(p, 'Console');
  const logs = await p.$eval('.pgx-web__out .ide-console', e => e.innerText).catch(() => '');
  ok('and console.log from the page shows in its Console', /launch 1/.test(logs), logs);
  const sandbox = await p.$eval('.web-preview', e => e.getAttribute('sandbox'));
  ok('the preview is sandboxed away from the app', sandbox === 'allow-scripts allow-modals', sandbox);
  await panelTab(p, 'Preview');
  await setCode(p, '<h1 id="t">Changed</h1><script>console.log("fresh")</script>');
  await p.click('.ide__run .ide-run');
  await p.waitForTimeout(600);
  const changed = await frame.locator('#t').textContent({ timeout: 10000 }).catch(() => '');
  ok('Run Code re-renders the page from the editor', changed === 'Changed', changed);

  // ── Terminal ───────────────────────────────────────────────────────────
  await p.click('.ide-modes [role=tab]:has-text("Terminal")');
  await p.waitForSelector('#termInput');
  for (const c of ['mkdir -p notes/day1', 'cd notes', 'echo "first entry" > log.txt', 'cat log.txt', 'git init', 'git add .', 'git commit -m "Start the log"', 'git log --oneline']) {
    await p.fill('#termInput', c);
    await p.keyboard.press('Enter');
  }
  const screen = await p.$eval('.term__screen', e => e.innerText);
  ok('the terminal keeps a working directory', /~\/project\/notes \$/.test(screen), screen.slice(-300).replace(/\n/g, ' | '));
  ok('files written with > can be read back', /first entry/.test(screen));
  ok('git init, add and commit work', /Initialized empty Git repository/.test(screen) && /\[main [0-9a-f]{7}\] Start the log/.test(screen), screen.slice(-200).replace(/\n/g, ' | '));
  await p.fill('#termInput', 'rm -rf /');
  await p.keyboard.press('Enter');
  const after = await p.$eval('.term__screen', e => e.innerText);
  ok('it is a practice terminal, and refuses to wipe even its own pretend disk', /refusing/.test(after.slice(-200)), after.slice(-160).replace(/\n/g, ' | '));

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nEVERY MODE RUNS FOR REAL');
  process.exit(fails ? 1 : 0);
})();
