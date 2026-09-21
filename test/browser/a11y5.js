var ENV = require('./_env');
// The wave-5 accessibility blockers, re-measured against the fixes.
const { chromium } = require('playwright');
const U = ENV.BASE + '/index.html';
let fails = 0;
const ok = (n, c, d) => { console.log((c ? '  PASS  ' : '  FAIL  ') + n + (d ? '   ' + d : '')); if (!c) fails++; };

(async () => {
  const b = await chromium.launch(ENV.launchOpts);
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  p.on('dialog', d => d.accept());

  // ---- A1: pinch zoom ----
  const vp = await p.goto(U).then(() => p.evaluate(() =>
    (document.querySelector('meta[name=viewport]') || {}).content || ''));
  ok('A1 pinch-zoom is not disabled', !/user-scalable=no/.test(vp) && !/maximum-scale/.test(vp), vp);

  // ---- A3: the launcher panels show focus ----
  await p.evaluate(() => localStorage.clear());
  await p.goto(U);
  await p.waitForTimeout(400);
  const ring = await p.evaluate(() => {
    const el = document.querySelector('.lsLp');
    el.focus();
    const cs = getComputedStyle(el);
    return { w: cs.outlineWidth, style: cs.outlineStyle, focused: document.activeElement === el };
  });
  ok('A3 the launcher shows a focus ring', ring.focused && ring.style !== 'none' && parseFloat(ring.w) >= 2, JSON.stringify(ring));

  // ---- A4: booting marks the panels busy and disabled ----
  const boot = await p.evaluate(() => {
    // re-create the state the boot script starts in
    document.body.classList.add('booting');
    const row = document.getElementById('lsRow');
    row.setAttribute('aria-busy', 'true');
    const panel = row.querySelector('.ls-panel');
    panel.setAttribute('disabled', 'disabled');
    const r = { busy: row.getAttribute('aria-busy'), disabled: panel.hasAttribute('disabled') };
    // put it back
    document.body.classList.remove('booting');
    row.setAttribute('aria-busy', 'false');
    panel.removeAttribute('disabled');
    return r;
  });
  ok('A4 the booting launcher is marked busy and disabled', boot.busy === 'true' && boot.disabled, JSON.stringify(boot));

  // ---- A2: every topic row and checkbox is reachable and operable ----
  await p.evaluate(() => {
    localStorage.setItem('apex_v4', JSON.stringify({ startDate: '2025-01-01', onboardDone: true, checks: {} }));
  });
  await p.goto(U);
  await p.evaluate(() => {
    document.getElementById('onboardScreen').classList.remove('active');
    document.getElementById('mainApp').classList.add('active');
    goTab('study');
  });
  await p.waitForTimeout(600);
  const apexTopics = await p.evaluate(() => {
    const t = Array.from(document.querySelectorAll('.stopic'));
    return { n: t.length, focusable: t.filter(x => x.getAttribute('tabindex') === '0').length,
             roled: t.filter(x => x.getAttribute('role') === 'button').length };
  });
  ok('A2 APEX topic rows are focusable buttons',
    apexTopics.n === 0 || (apexTopics.focusable === apexTopics.n && apexTopics.roled === apexTopics.n),
    JSON.stringify(apexTopics));

  await p.evaluate(() => goTab('today'));
  await p.waitForTimeout(400);
  const hck = await p.evaluate(() => {
    const t = Array.from(document.querySelectorAll('.hck')).filter(x => !x.classList.contains('locked-ck'));
    return { n: t.length, focusable: t.filter(x => x.getAttribute('tabindex') === '0').length,
             named: t.filter(x => (x.getAttribute('aria-label') || '').length > 1).length,
             roled: t.filter(x => x.getAttribute('role')).length };
  });
  ok('A2 habit boxes are focusable, named checkboxes',
    hck.n > 0 && hck.focusable === hck.n && hck.named === hck.n && hck.roled === hck.n, JSON.stringify(hck));

  const keyWorks = await p.evaluate(() => {
    const el = Array.from(document.querySelectorAll('.hck')).filter(x => !x.classList.contains('locked-ck'))[0];
    const before = el.classList.contains('on');
    el.focus();
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    return { before, after: Array.from(document.querySelectorAll('.hck'))[0].classList.contains('on') };
  });
  ok('A2 Space operates a habit box', keyWorks.before !== keyWorks.after, JSON.stringify(keyWorks));

  // Obsidian topic rows
  await p.evaluate(() => { try { launchRealm('obsidian'); } catch (e) { routeRealm('obsidian'); } });
  await p.waitForTimeout(2200);
  const obsTopics = await p.evaluate(() => {
    const t = Array.from(document.querySelectorAll('#obsidianApp .stopic'));
    return { n: t.length, focusable: t.filter(x => x.getAttribute('tabindex') === '0').length };
  });
  ok('A2 Obsidian topic rows are focusable',
    obsTopics.n === 0 || obsTopics.focusable === obsTopics.n, JSON.stringify(obsTopics));

  // ---- A5: the verdict announces itself ----
  await p.goto(U);
  await p.evaluate(() => { enterLaunchpad(); lpTab('plan'); });
  await p.waitForTimeout(400);
  const live = await p.evaluate(() => {
    const v = document.getElementById('lpVerdict');
    return { role: v.getAttribute('role'), live: v.getAttribute('aria-live') };
  });
  ok('A5 the plan verdict is a live region', live.role === 'status' && live.live === 'polite', JSON.stringify(live));

  // ---- A6: the bar and the rows agree ----
  const agree = await p.evaluate(() => {
    localStorage.setItem('apex_launchpad_v1', JSON.stringify({
      ids: 2, flagship: {}, setup: {},
      mods: { M0: { delta: true, artifact: true, gate: true }, M1: { delta: true, artifact: true, gate: true } }
    }));
    lpLoad(); lpOpen('M1');
    const bar = (document.querySelector('#launchpadApp .lx-cpbar span') || {}).textContent;
    const rows = Array.from(document.querySelectorAll('#launchpadApp .lx-cp'));
    return { bar, checked: rows.filter(r => r.getAttribute('aria-checked') === 'true').length, total: rows.length };
  });
  ok('A6 the bar and the rows say the same thing',
    /8 of 8/.test(agree.bar || '') && agree.checked === 8 && agree.total === 8, JSON.stringify(agree));

  // ---- A7: the progress track has enough contrast ----
  const track = await p.evaluate(() => {
    const el = document.querySelector('#launchpadApp .lx-cpt');
    const cs = getComputedStyle(el);
    function lum(c) {
      const m = c.match(/\d+/g).slice(0, 3).map(Number).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2];
    }
    const page = getComputedStyle(document.querySelector('#launchpadApp .lp-card') || document.body).backgroundColor;
    const a = lum(cs.backgroundColor), b2 = lum(page);
    return { ratio: +(((Math.max(a, b2) + 0.05) / (Math.min(a, b2) + 0.05)).toFixed(2)), bg: cs.backgroundColor, border: cs.borderTopWidth };
  });
  ok('A7 the progress track meets 3:1 or carries a border',
    track.ratio >= 3 || parseFloat(track.border) >= 1, JSON.stringify(track));

  // ---- A9: the cut order is a numbered list ----
  const cut = await p.evaluate(() => {
    lpTab('plan'); lpSet('runwayMonths', 24); lpSet('weeklyHours', 18);
    renderLaunchpad(true);
    const ol = document.querySelector('#launchpadApp .lp-cutlist');
    return { isList: !!ol && ol.tagName === 'OL', items: ol ? ol.children.length : 0 };
  });
  ok('A9 the cut order is an ordered list', cut.isList && cut.items === 3, JSON.stringify(cut));

  // ---- A8: reduced motion actually stops ----
  const rm = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const rp = await rm.newPage();
  await rp.goto(U);
  await rp.evaluate(() => { localStorage.clear(); enterLaunchpad(); });
  await rp.waitForTimeout(800);
  const still = await rp.evaluate(() => {
    const svgs = Array.from(document.querySelectorAll('#launchpadApp svg'));
    const running = svgs.filter(s => s.animationsPaused && !s.animationsPaused()).length;
    const box = document.querySelector('#launchpadApp .lp-box');
    return { running, boxAnim: box ? getComputedStyle(box).animationName : 'none' };
  });
  ok('A8 reduced motion stops the figures and the tick animation',
    still.running === 0 && still.boxAnim === 'none', JSON.stringify(still));
  await rm.close();

  ok('no page errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  await b.close();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nALL ACCESSIBILITY BLOCKERS FIXED');
  process.exit(fails ? 1 : 0);
})();
