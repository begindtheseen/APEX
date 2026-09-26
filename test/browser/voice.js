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
    // The one silent sample that unlocks audio on iOS is not speech.
    if (this.buffer && this.buffer.length < 240) return start.apply(this, args);
    const data = this.buffer ? this.buffer.getChannelData(0) : new Float32Array(0);
    const rate = this.buffer ? this.buffer.sampleRate : 24000;
    let peak = 0, sum = 0;
    for (let i = 0; i < data.length; i++) { const x = data[i]; peak = Math.max(peak, Math.abs(x)); sum += x * x; }
    // Dead air at each end: 5 ms windows quieter than 2% of the clip's usual
    // loudness. The fading tail of a word is sound; this is only silence.
    const win = Math.round(rate * 0.005), n = Math.floor(data.length / win), lv = [];
    for (let i = 0; i < n; i++) { let q = 0; for (let j = i * win; j < (i + 1) * win; j++) q += data[j] * data[j]; lv.push(Math.sqrt(q / win)); }
    const th = ([...lv].sort((a, b) => a - b)[Math.floor(n * 0.95)] || 0) * 0.02;
    let a = 0; while (a < n && lv[a] < th) a++;
    let z = 0; while (z < n && lv[n - 1 - z] < th) z++;
    const lead = a * win, trail = z * win;
    const ctx = window.__voice.ctx;
    window.__voice.played.push({
      seconds: this.buffer ? this.buffer.duration : 0, peak, rms: Math.sqrt(sum / Math.max(1, data.length)),
      when: typeof args[0] === 'number' && args[0] > 0 ? args[0] : (ctx ? ctx.currentTime : 0),
      scheduledAt: ctx ? ctx.currentTime : 0, lead: lead / rate, trail: trail / rate,
    });
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
    // The model starts and ends every clip with a third to half a second of
    // silence; left in, that is a stall at every join. It must be trimmed.
    ok('each clip carries no dead air at its ends', played.every((x) => x.lead < 0.06 && x.trail < 0.06), played.map((x) => (x.lead * 1000).toFixed(0) + '/' + (x.trail * 1000).toFixed(0) + 'ms').join(' '));
    // How fast this machine makes speech decides whether it keeps up the first
    // time through; a small CI runner may not, so this reports, and fails only on a stall.
    const cold = played.slice(1).map((x, i) => x.when - (played[i].when + played[i].seconds));
    // The player buffers before the first word so the opening sentences run
    // on without a stall, even on a machine this slow.
    ok('the first time through, it waits before the first word, not between sentences', cold.every((g) => g >= 0.02 && g <= 0.6), 'first sound after ' + firstSound + 's; gaps ' + cold.map((g) => g.toFixed(2) + 's').join(', '));

    // The same opening again: now every sentence is already made, so what is
    // heard is exactly what the player schedules — the fluency of the reading
    // itself, independent of how fast this machine is.
    await p.click('.raloud__btn[title="Stop reading"]');
    await p.waitForTimeout(300);
    await p.evaluate(() => { window.__voice.played = []; });
    await p.click('.raloud__btn--go');
    await p.waitForFunction(() => window.__voice.played.length >= 3, null, { timeout: 120000 });
    await p.waitForTimeout(500);
    const warm = await p.evaluate(() => window.__voice.played);
    const gaps = warm.slice(1).map((x, i) => x.when - (warm[i].when + warm[i].seconds));
    ok('read again, it flows: between clips only a reader\'s pause, never more than 0.6 s', gaps.length >= 2 && gaps.every((g) => g >= 0.02 && g <= 0.6), 'pauses ' + gaps.map((g) => g.toFixed(2) + 's').join(', '));
    ok('and the pauses are a breath, not a stall: a quarter of a second or so between sentences', gaps.filter((g) => g > 0.2 && g < 0.35).length >= 1, gaps.map((g) => g.toFixed(2)).join(', '));

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
    await p.close();

    // ── On an iPhone: one worker, short pieces, and it survives iOS ────────
    // Each worker takes about 450 MB and grows with what it says; two of them
    // ran an iPhone out of memory mid-lesson, and the reading froze. Here the
    // page believes it is on an iPhone (the model is already downloaded), and
    // the test does to it what iOS does: takes the worker away mid-reading,
    // and stops the audio behind the player's back.
    const q = await ctx.newPage();
    q.on('pageerror', (e) => errs.push(String(e)));
    await q.addInitScript(() => {
      Object.defineProperty(navigator, 'userAgent', { get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 5 });
    });
    await LP.open(q, '/module/M3?lesson=m3-the-module');
    await q.waitForSelector('.raloud');
    // Another voice, so nothing it says was made (and kept) by the reading above.
    const bella = await q.$eval('.raloud__voice', (s) => [...s.options].find((o) => /^Bella/.test(o.textContent)).value);
    await q.selectOption('.raloud__voice', bella);
    await q.click('.raloud__btn--go');
    await q.waitForFunction(() => window.__voice.played.length >= 1, null, { timeout: 300000 });
    const voiceWorkers = () => q.workers().filter((w) => /voice\.worker/.test(w.url()));
    ok('on an iPhone it runs one voice worker, not two', voiceWorkers().length === 1, voiceWorkers().length + ' workers');
    const first = await q.evaluate(() => window.__voice.played.map((x) => x.seconds));
    ok('and gives it short pieces, so its memory stays small', first.every((x) => x < 14), first.map((x) => x.toFixed(1) + 's').join(' '));

    // iOS takes the worker. Nothing tells the page; it must notice and go on.
    // Sentences already made keep playing for a while, so what counts is
    // speech made after a replacement worker has appeared.
    const lost = Date.now();
    const until = (cond, ms) => (async () => { const end = Date.now() + ms; while (Date.now() < end && !cond()) await q.waitForTimeout(500); return cond(); })();
    await Promise.all(voiceWorkers().map((w) => w.evaluate(() => self.close()).catch(() => {})));
    const gone = await until(() => voiceWorkers().length === 0, 10000);
    const replaced = await until(() => voiceWorkers().length === 1, 300000);
    const tookOver = Math.round((Date.now() - lost) / 1000);
    const before2 = await q.evaluate(() => window.__voice.played.length);
    await q.waitForFunction((n) => window.__voice.played.length >= n + 2, before2, { timeout: 300000 }).catch(() => {});
    const after2 = await q.evaluate(() => window.__voice.played.length);
    ok('when iOS takes the voice worker mid-reading, a fresh one takes over and the reading carries on', gone && replaced && after2 >= before2 + 2, 'replaced after ' + tookOver + 's; then clips ' + before2 + ' → ' + after2);

    // iOS stops the audio (a call, Siri, the screen locking): not frozen for good.
    await q.evaluate(() => window.__voice.ctx.suspend());
    await q.waitForTimeout(1200);
    const back = await q.evaluate(() => window.__voice.ctx.state);
    const st = await q.$eval('.raloud', (e) => e.dataset.state);
    ok('when the system stops the audio, it starts it again (or offers Resume), rather than hang', back === 'running' || st === 'paused', back + ' / ' + st);
    await q.click('.raloud__btn[title="Stop reading"]').catch(() => {});
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
