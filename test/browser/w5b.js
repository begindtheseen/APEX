var ENV = require('./_env');
var LP = require('./_launchpad');
// The remaining walkthrough findings, numbered as they were raised, re-run
// against LAUNCHPAD as its own app at a phone width.
const { chromium } = require('playwright');
let fails=0;
const ok=(n,c,d)=>{console.log((c?'  PASS  ':'  FAIL  ')+n+(d?'   '+d:''));if(!c)fails++;};
(async()=>{
const b=await chromium.launch(ENV.launchOpts);
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
await LP.reset(p);
await LP.open(p,'/');
const home=await LP.text(p);
ok('11 the creed quote is attributed to the creed', /— the creed/.test(home) && !/— Rule 1/.test(home));
ok('12 the chain itself is printed', /M0 → M1 [\s\S]*\[hard gate\][\s\S]*M16/.test(home), (home.match(/That chain[\s\S]{0,90}/)||[''])[0].replace(/\n/g,' '));
// Derived from what the Build steps render, not hardcoded.
ok('27 checkpoints are in the headline numbers', /Checkpoints ticked\s*0 \/ 150/.test(home), (home.match(/Checkpoints ticked[^\n]*\n?[^\n]*/)||[''])[0]);
ok('28 the module row states the real maximum', /The biggest is 70 hours/.test(home), (home.match(/The biggest is[^.]*\./)||[''])[0]);
ok('22 the flagship row names the modules', /M5, M6, M7/.test(home), (home.match(/later modules build on it[^.]*\./)||[''])[0].slice(0,80));

await LP.go(p,'/learning');
const mods=await LP.text(p);
// On a fresh install only M0 is open and it has no checkpoints, so the locked
// form is what should be visible everywhere the count exists.
ok('14 checkpoint counts show before any is ticked', /8 checkpoints/.test(mods) && /11 checkpoints/.test(mods),
   (mods.match(/\d+ (of \d+ )?checkpoints/g)||[]).slice(0,4).join(' | '));
await p.getByRole('tab',{name:'Open now'}).click(); await p.waitForTimeout(250);
const open=await p.$$eval('.mcard', els=>els.map(e=>e.textContent));
ok('19 a trigger module is not also "Open now" on a fresh install', open.length===1 && /The Contract Page/.test(open[0]), open.map(t=>t.slice(0,30)).join(' | '));
await p.getByRole('tab',{name:'The ladder'}).click(); await p.waitForTimeout(250);
ok('20 the hard gate states its size', /thirteen modules and 465 of the 1,114 module hours/.test(await LP.text(p)));

await LP.go(p,'/plan');
const set=async(r,h)=>{await p.fill('#lpRunway',String(r));await p.fill('#lpHours',String(h));await p.waitForTimeout(200);return LP.text(p);};
const plan=await set(12,18);
ok('17 no contract-role framing under a plain Spine verdict', !/in a contract role/.test(plan), (plan.match(/hurt first[^.]*\./)||[''])[0].slice(0,90));
ok('24 the Spine and the re-plan are glossed in place', /the shorter\s*program named below/.test(plan.replace(/\n/g,' ')) && /Track 8, on the Parallel tracks page/.test(plan));
await set(0,18);
const zero=await p.locator('.lp-why').first().textContent();
ok('29 zero says why it was refused', /not a plan/.test(zero), zero.slice(0,80));
const spc=await set(6,10);
ok('16 the ruled-out advice is suppressed', !/Raise the hours toward 18, or take the Spine\./.test(spc));
await set(24,15);
const tight=await p.locator('.lp-verdict').textContent();
ok('18 a six-minute gap is not "TIGHT"', !/TIGHT/.test(tight), tight.trim());

await LP.go(p,'/module/M3?step=build');
ok('W28 the gate panel points at the stand-in rule', /No referee available for this one\?/.test(await LP.text(p)));
await LP.go(p,'/module/M27?step=build');
const cpl=await LP.text(p);
ok('13 a short module states its hours instead of "one sitting"', /It is 11 hours/.test(cpl) && !/one sitting/.test(cpl));
await LP.go(p,'/module/M5?step=build');
const lockedTab=(await LP.checkpoints(p).evaluateAll(els=>els.map(e=>e.getAttribute('tabindex')))).join(',');
ok('25 locked checkpoints leave the tab order', /^(-1,)*-1$/.test(lockedTab), lockedTab);
ok('no page errors', errs.length===0, errs.slice(0,2).join(' | '));
await b.close();
console.log(fails?'\n'+fails+' FAILED':'\nALL REMAINING WALKTHROUGH FIXES VERIFIED');
process.exit(fails?1:0);})();
