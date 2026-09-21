var ENV = require('./_env');
const { chromium } = require('playwright');
const U=ENV.BASE + '/index.html'; let fails=0;
const ok=(n,c,d)=>{console.log((c?'  PASS  ':'  FAIL  ')+n+(d?'   '+d:''));if(!c)fails++;};
(async()=>{
const b=await chromium.launch(ENV.launchOpts);
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
await p.goto(U); await p.evaluate(()=>localStorage.clear()); await p.goto(U);
await p.evaluate(()=>enterLaunchpad());
await p.waitForTimeout(400);
const home=await p.evaluate(()=>document.getElementById('launchpadApp').innerText);
ok('11 the creed quote is attributed to the creed', /— the creed/.test(home) && !/— Rule 1/.test(home));
ok('12 the chain itself is printed', /M0 → M1 [\s\S]*\[hard gate\][\s\S]*M16/.test(home), (home.match(/That chain[\s\S]{0,90}/)||[''])[0].replace(/\n/g,' '));
// Derived from the data, not hardcoded: this assertion used to pin the literal
// total and broke the moment a module gained a checkpoint, which is a stale test
// rather than a real regression.
const cpTotal = await p.evaluate(() => Object.keys(AI_CHECKPOINTS)
  .reduce((a, k) => a + (AI_CHECKPOINTS[k] ? AI_CHECKPOINTS[k].length : 0), 0));
ok('27 checkpoints are in the headline numbers',
   /Checkpoints ticked/.test(home) && new RegExp('0 / ' + cpTotal).test(home),
   'total ' + cpTotal);
ok('28 the module row states the real maximum', /The biggest is 70 hours/.test(home), (home.match(/The biggest is[^.]*\./)||[''])[0]);
ok('22 the flagship row names the modules', /M5, M6, M7/.test(home), (home.match(/later modules build on it[^.]*\./)||[''])[0].slice(0,80));
const mods=await p.evaluate(()=>{lpTab('modules');return document.getElementById('launchpadApp').innerText;});
// On a fresh install only M0 is open and it has no checkpoints, so the locked
// form is what should be visible everywhere the count exists.
ok('14 checkpoint counts show before any is ticked', /8 checkpoints/.test(mods) && /11 checkpoints/.test(mods),
   (mods.match(/\d+ (of \d+ )?checkpoints/g)||[]).slice(0,4).join(' | '));
ok('19 a trigger module is not also "Open now"', !/Open now[\s\S]{0,40}Starts at an event/.test(mods));
ok('20 the hard gate states its size', /thirteen modules and 465 of the 1,108 module hours/.test(mods));
const plan=await p.evaluate(()=>{lpTab('plan');lpSet('runwayMonths',12);lpSet('weeklyHours',18);return document.getElementById('launchpadApp').innerText;});
ok('17 no contract-role framing under a plain Spine verdict', !/in a contract role/.test(plan), (plan.match(/hurt first[^.]*\./)||[''])[0].slice(0,90));
ok('24 the Spine and the re-plan are glossed in place', /the shorter\s*program named below/.test(plan.replace(/\n/g,' ')) && /Track 8, on the Tracks tab/.test(plan));
const zero=await p.evaluate(()=>{lpSet('runwayMonths',0);lpSet('weeklyHours',18);return document.querySelector('#launchpadApp .lp-vwhy').textContent;});
ok('29 zero says why it was refused', /not a plan/.test(zero), zero.slice(0,80));
const spc=await p.evaluate(()=>{lpSet('runwayMonths',6);lpSet('weeklyHours',10);return document.getElementById('launchpadApp').innerText;});
ok('16 the ruled-out advice is suppressed', !/Raise the hours toward 18, or take the Spine\./.test(spc));
const tight=await p.evaluate(()=>{lpSet('runwayMonths',24);lpSet('weeklyHours',15);return document.querySelector('#launchpadApp .lp-vrec').textContent;});
ok('18 a six-minute gap is not "TIGHT"', !/TIGHT/.test(tight), tight.trim());
const t5=await p.evaluate(()=>{lpOpen('M3');return document.getElementById('launchpadApp').innerText;});
ok('W28 the gate panel points at the stand-in rule', /No referee available for this one\?/.test(t5));
const cpl=await p.evaluate(()=>{lpOpen('M27');return document.getElementById('launchpadApp').innerText;});
ok('13 a short module states its hours instead of "one sitting"', /It is 11 hours/.test(cpl) && !/one sitting/.test(cpl));
const lockedTab=await p.evaluate(()=>{lpOpen('M5');return Array.from(document.querySelectorAll('#launchpadApp .lx-cp')).map(e=>e.getAttribute('tabindex')).join(',');});
ok('25 locked checkpoints leave the tab order', /^(-1,)*-1$/.test(lockedTab), lockedTab);
ok('no page errors', errs.length===0, errs.slice(0,2).join(' | '));
await b.close();
console.log(fails?'\n'+fails+' FAILED':'\nALL REMAINING WALKTHROUGH FIXES VERIFIED');
process.exit(fails?1:0);})();
