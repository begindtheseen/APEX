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
  await p.click('.pg__toolbar .btn--primary');
  await p.waitForFunction(() => {
    const b = document.querySelector('.pg__toolbar .btn--primary');
    return b && !b.disabled && document.querySelector('.console');
  }, null, { timeout });
  await p.waitForTimeout(150);
  return p.evaluate(() => Array.from(document.querySelectorAll('.console')).map(c => c.innerText).join('\n'));
}

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, serviceWorkers: 'block' });
  await serveCdn(ctx);
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await LP.reset(p);
  await LP.open(p, '/playground');

  const tabs = await p.$$eval('.seg [role=tab]', e => e.map(x => x.textContent.trim()));
  ok('the tabs are the curriculum\'s languages plus C++', tabs.join(',') === 'JavaScript,TypeScript,Python,SQL,C++', tabs.join(','));
  ok('no MATLAB, Simulink, Rust or Shell', !tabs.some(t => /MATLAB|Simulink|Rust|Shell/.test(t)));

  // ── C++ ────────────────────────────────────────────────────────────────
  await p.getByRole('tab', { name: 'C++' }).click();
  await p.waitForTimeout(200);
  ok('C++ has a standard-input box', !!(await p.$('#pgStdin')));
  const t0 = Date.now();
  let out = await run(p);
  ok('the C++ starter compiles and runs, reading its input', /5 requests, 3 users/.test(out) && /ada: 7400 tokens/.test(out), out.slice(0, 160).replace(/\n/g, ' | '));
  console.log('        first C++ run (compiler load + compile + run): ' + (Date.now() - t0) + ' ms');

  await p.fill('#pgStdin', 'zed 5\nzed 7\n');
  out = await run(p);
  ok('changing the input changes what the program reads', /2 requests, 1 users/.test(out) && /zed: 12 tokens/.test(out), out.slice(0, 120).replace(/\n/g, ' | '));

  await setCode(p, '#include <vector>\n#include <numeric>\n#include <cstdio>\nint main() {\n  std::vector<int> v(10);\n  std::iota(v.begin(), v.end(), 1);\n  std::printf("%d\\n", std::accumulate(v.begin(), v.end(), 0));\n  return 3;\n}\n');
  out = await run(p);
  ok('the standard library works and the exit code is reported', /\b55\b/.test(out) && /exit code 3/.test(out), out.replace(/\n/g, ' | '));

  await setCode(p, 'int main() {\n  int x = ;\n}\n');
  out = await run(p);
  ok('a compile error shows clang\'s own message', /did not compile/.test(out) && /main\.cpp:2:\d+: error: expected expression/.test(out), out.slice(0, 200).replace(/\n/g, ' | '));

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
  await p.getByRole('tab', { name: 'TypeScript' }).click();
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
  await p.getByRole('tab', { name: 'JavaScript' }).click();
  await p.waitForTimeout(200);
  out = await run(p);
  ok('JavaScript still runs', /7 sync, last line/.test(out), out.slice(0, 80).replace(/\n/g, ' | '));

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nC++, TYPESCRIPT AND JAVASCRIPT RUN FOR REAL');
  process.exit(fails ? 1 : 0);
})();
