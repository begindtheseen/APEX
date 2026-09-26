var ENV = require('./_env');
var LP = require('./_launchpad');
// The natural read-aloud voice, for real: a lesson is read by the neural
// voice (Kokoro, run on the device), and what it plays is real speech — long
// enough, loud enough — while pause, skip and stop still do what they say.
// And when the voice cannot download, the player says so and reads with the
// device's own voice instead of going silent.
//
// The runtime and the phonemiser are the pinned packages the app downloads,
// served here from node_modules. The model (92 MB) is fetched from Hugging
// Face, where its authors publish it, unless VOICE_MODEL names a local copy.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

const NM = path.join(ENV.REPO, 'node_modules');
const TYPES = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.wasm': 'application/wasm' };
const MODEL_RE = /^https:\/\/huggingface\.co\/onnx-community\/Kokoro-82M-v1\.0-ONNX\/resolve\/main\/onnx\/model_quantized\.onnx/;

async function serve(ctx, { model }) {
  await ctx.route(/^https:\/\/(cdn\.jsdelivr\.net\/npm|unpkg\.com)\/((?:@[^/]+\/)?[^@/]+)@[^/]+\/(.+)$/, async (route) => {
    const m = /^https:\/\/(?:cdn\.jsdelivr\.net\/npm|unpkg\.com)\/((?:@[^/]+\/)?[^@/]+)@[^/]+\/([^?]+)/.exec(route.request().url());
    const file = path.join(NM, m[1], m[2]);
    if (!fs.existsSync(file)) return route.continue();
    await route.fulfill({ status: 200, body: fs.readFileSync(file), headers: { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'access-control-allow-origin': '*' } });
  });
  await ctx.route(MODEL_RE, async (route) => {
    if (model === 'missing') return route.fulfill({ status: 404, body: 'not here', headers: { 'access-control-allow-origin': '*' } });
    // A 92 MB body is too big to hand over through the browser's control
    // channel, so a local copy is served over HTTP and the request redirected.
    if (!localModel) return route.continue();
    await route.fulfill({ status: 302, headers: { location: localModel, 'access-control-allow-origin': '*' } });
  });
}

// Serves VOICE_MODEL, if given, the way Hugging Face does: with its length, to anyone.
let localModel = null;
function serveLocalModel() {
  const file = process.env.VOICE_MODEL;
  if (!file || !fs.existsSync(file)) return Promise.resolve(null);
  const http = require('http');
  const size = fs.statSync(file).size;
  const srv = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/octet-stream', 'content-length': size, 'access-control-allow-origin': '*' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => { srv.unref(); r('http://127.0.0.1:' + srv.address().port + '/model_quantized.onnx'); }));
}

// Records every buffer the page plays, and the audio context's state, so the
// test can tell real speech from silence without speakers.
function instrument() {
  window.__voice = { played: [], ctx: null };
  const Ctx = window.AudioContext;
  window.AudioContext = class extends Ctx {
    constructor(opts) { super(opts); window.__voice.ctx = this; }
  };
  const start = AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start = function (...args) {
    const data = this.buffer ? this.buffer.getChannelData(0) : new Float32Array(0);
    let peak = 0, sum = 0;
    for (let i = 0; i < data.length; i++) { const x = data[i]; peak = Math.max(peak, Math.abs(x)); sum += x * x; }
    window.__voice.played.push({ seconds: this.buffer ? this.buffer.duration : 0, peak, rms: Math.sqrt(sum / Math.max(1, data.length)), at: performance.now() });
    return start.apply(this, args);
  };
}

(async () => {
  localModel = await serveLocalModel();
  const b = await chromium.launch(Object.assign({}, ENV.launchOpts, { args: ['--autoplay-policy=no-user-gesture-required'] }));
  const errs = [];

  // ── The natural voice reads the lesson ──────────────────────────────────
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
    await serve(ctx, { model: 'real' });
    await ctx.addInitScript(instrument);
    const p = await ctx.newPage();
    p.on('pageerror', (e) => errs.push(String(e)));
    await LP.reset(p);
    await LP.open(p, '/module/M3?lesson=m3-the-module');
    await p.waitForSelector('.raloud');

    const groups = await p.$$eval('.raloud__voice optgroup', (g) => g.map((x) => x.label + ':' + x.querySelectorAll('option').length));
    const chosen = await p.$eval('.raloud__voice', (s) => s.options[s.selectedIndex].textContent);
    ok('the voice picker offers the natural voices first, and one is chosen by default', groups[0] === 'Natural voices:6' && /^Heart/.test(chosen), groups.join(', ') + ' · ' + chosen);
    ok('it reads with the natural voice', (await p.$eval('.raloud', (e) => e.dataset.engine)) === 'natural');

    const t0 = Date.now();
    await p.click('.raloud__btn--go');
    await p.waitForSelector('.raloud[data-state="preparing"]', { timeout: 5000 }).catch(() => {});
    const prep = await p.$eval('.raloud', (e) => e.innerText).catch(() => '');
    ok('while the voice gets ready, it says so', /Getting the voice ready|Starting the voice|Preparing/.test(prep), prep.replace(/\n/g, ' ').slice(0, 80));
    await p.waitForSelector('.raloud[data-state="speaking"]', { timeout: 300000 });
    const firstSound = Math.round((Date.now() - t0) / 1000);
    await p.waitForFunction(() => window.__voice.played.length >= 3, null, { timeout: 180000 });
    const played = await p.evaluate(() => window.__voice.played);
    const speech = played.filter((x) => x.seconds > 0.3 && x.peak > 0.05 && x.rms > 0.005);
    ok('what it plays is speech: long enough and loud enough, piece after piece', speech.length >= 3, played.map((x) => x.seconds.toFixed(1) + 's/' + x.peak.toFixed(2)).join(' '));
    // Each piece is asked for while the one before it plays. How short the
    // gaps are depends on the machine — a phone or laptop keeps up, a small
    // CI runner may not — so this fails only on a stall, and reports the rest.
    const gaps = played.slice(1).map((x, i) => (x.at - played[i].at) / 1000 - played[i].seconds);
    ok('it keeps reading, one piece after another, without stalling', gaps.every((g) => g < 30), 'first sound after ' + firstSound + 's; gaps ' + gaps.map((g) => Math.max(0, g).toFixed(1) + 's').join(', '));

    await p.click('.raloud__btn:has-text("Pause")');
    await p.waitForTimeout(400);
    ok('pause stops the sound where it is', (await p.evaluate(() => window.__voice.ctx.state)) === 'suspended' && (await p.$eval('.raloud', (e) => e.dataset.state)) === 'paused');
    await p.click('.raloud__btn:has-text("Resume")');
    await p.waitForTimeout(400);
    ok('resume carries on', (await p.evaluate(() => window.__voice.ctx.state)) === 'running');

    const before = await p.$eval('.raloud__at', (e) => Number(e.textContent.split('/')[0]));
    await p.click('.raloud__btn[title="On a sentence"]');
    await p.waitForFunction((n) => Number(document.querySelector('.raloud__at').textContent.split('/')[0]) > n, before, { timeout: 120000 });
    ok('skip moves on a sentence', true, 'from ' + before);

    await p.click('.raloud__btn[title="Stop reading"]');
    await p.waitForTimeout(300);
    ok('stop ends it', (await p.$eval('.raloud', (e) => e.dataset.state)) === 'idle');
    await ctx.close();
  }

  // ── No download: it says so, and reads with the device's voice ──────────
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
    await serve(ctx, { model: 'missing' });
    await ctx.addInitScript(instrument);
    const p = await ctx.newPage();
    p.on('pageerror', (e) => errs.push(String(e)));
    await LP.reset(p);
    await LP.open(p, '/module/M3?lesson=m3-the-module');
    await p.waitForSelector('.raloud');
    await p.click('.raloud__btn--go');
    await p.waitForSelector('.raloud__notice', { timeout: 60000 });
    const notice = await p.$eval('.raloud__notice', (e) => e.textContent);
    ok('when the natural voice cannot download, it says so and uses the device voice', /could not start/.test(notice) && (await p.$eval('.raloud', (e) => e.dataset.engine)) === 'device', notice);
    await ctx.close();
  }

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? `\n${fails} FAILED` : '\nTHE LESSON IS READ BY A NATURAL VOICE');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
