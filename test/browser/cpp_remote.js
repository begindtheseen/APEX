var ENV = require('./_env');
var LP = require('./_launchpad');
// C++ on an iPhone or iPad: the compiler cannot run inside the browser there,
// so the code is compiled and run on Compiler Explorer (godbolt.org), and the
// output says so. The 105 MB in-browser compiler must not even be downloaded.
//
// When godbolt.org can be reached from here, this really compiles there, from
// a page on another origin — which is also the proof that the service lets a
// web page call it. When it cannot (a sandbox with no network), a recorded
// answer stands in, and the rest of the path is still checked.
const { chromium, devices } = require('playwright');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

async function reachable() {
  try {
    const res = await fetch('https://godbolt.org/api/compilers/c++?fields=id', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function setCode(p, code) {
  await p.click('.cm-content');
  await p.keyboard.press('Control+A');
  await p.evaluate((c) => {
    const dt = new DataTransfer();
    dt.setData('text/plain', c);
    document.querySelector('.cm-content').dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  }, code);
  await p.waitForTimeout(100);
}

async function run(p) {
  await p.click('.ide__run .ide-run');
  await p.waitForFunction(() => {
    const b = document.querySelector('.ide__run .ide-run');
    return b && !b.disabled && document.querySelector('.ide-console');
  }, null, { timeout: 120000 });
  await p.waitForTimeout(150);
  return p.evaluate(() => Array.from(document.querySelectorAll('.ide-console')).map((c) => c.innerText).join('\n'));
}

(async () => {
  const live = await reachable();
  console.log('        godbolt.org ' + (live ? 'reachable: compiling there for real' : 'not reachable from here: a recorded answer stands in'));
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ ...devices['iPhone 13'], serviceWorkers: 'block' });
  const compilerRequests = [];
  ctx.on('request', (r) => { if (/@yowasp\/clang/.test(r.url())) compilerRequests.push(r.url()); });
  if (!live) {
    await ctx.route(/^https:\/\/godbolt\.org\/api\/compilers\//, (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify([{ id: 'clang2010', semver: '20.1.0', supportsExecute: true }]) }));
    await ctx.route(/^https:\/\/godbolt\.org\/api\/compiler\/[^/]+\/compile$/, (r) => {
      const body = JSON.parse(r.request().postData() || '{}');
      const reply = /int x = ;/.test(body.source)
        ? { didExecute: false, buildResult: { code: 1, stderr: [{ text: '<source>:2:11: error: expected expression' }] } }
        : { didExecute: true, code: 0, stdout: [{ text: 'read ' + (body.options.executeParameters.stdin || '').trim().split(/\s+/).length + ' numbers, sum 12' }], stderr: [], buildResult: { code: 0 } };
      return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(reply) });
    });
  }
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => { if (!/serviceWorker/.test(String(e))) errs.push(String(e)); });
  await LP.reset(p);
  await LP.open(p, '/playground');
  await p.waitForSelector('.ide__pick select');
  await p.selectOption('.ide__pick select', 'cpp');
  await p.waitForTimeout(250);
  const note = await p.$eval('.pgx-note', (e) => e.textContent);
  ok('on an iPhone, the playground says where C++ is compiled and that the code is sent there', /godbolt\.org/.test(note) && /sent there/.test(note), note.slice(0, 120));

  await setCode(p, '#include <iostream>\nint main() {\n  int n = 0, x, sum = 0;\n  while (std::cin >> x) { sum += x; ++n; }\n  std::cout << "read " << n << " numbers, sum " << sum << "\\n";\n}\n');
  await p.click('.ide-panel__tab:has-text("Input")');
  await p.fill('.ide-stdin', '3 4 5\n');
  let out = await run(p);
  ok('C++ compiles and runs, reading its input', /read 3 numbers, sum 12/.test(out), out.replace(/\n/g, ' | ').slice(0, 200));
  ok('and the output says which service ran it', /godbolt\.org/.test(out));

  await setCode(p, 'int main() {\n  int x = ;\n}\n');
  out = await run(p);
  ok('a compile error shows the compiler\'s own message', /did not compile/.test(out) && /error: expected expression/.test(out), out.replace(/\n/g, ' | ').slice(0, 200));

  ok('the 105 MB in-browser compiler was never downloaded', compilerRequests.length === 0, compilerRequests.slice(0, 2).join(', '));
  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? `\n${fails} FAILED` : '\nC++ WORKS ON AN IPHONE');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
