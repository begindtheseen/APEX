var ENV = require('./_env');
// Opens every module detail in the real app and checks the figure is there,
// sized, and inside its frame. Injection-via-innerHTML is the path the app
// actually uses, so this is the only check that proves anything.
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch(ENV.launchOpts);
 for(const vp of [{width:390,height:900},{width:1280,height:1000}]){
  const p=await b.newPage({viewport:vp});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:8791/index.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>{const x=[...document.querySelectorAll('button,[onclick]')].find(e=>/LAUNCHPAD/i.test(e.textContent||''));if(x)x.click();});
  await p.waitForTimeout(2400);
  const bad=[];
  const ids=await p.evaluate(()=>AI_CURRICULUM.map(m=>m.id));
  for(const id of ids){
    await p.evaluate(i=>lpOpen(i), id);
    await p.waitForTimeout(90);
    const r=await p.evaluate(()=>{
      const v=document.querySelector('.lp-viz svg');
      if(!v) return {no:1};
      const r=v.getBoundingClientRect();
      const f=document.querySelector('.lp-viz').getBoundingClientRect();
      const doc=document.documentElement;
      return {w:Math.round(r.width),h:Math.round(r.height),
              over:r.right>f.right+1||r.left<f.left-1,
              hscroll:doc.scrollWidth>doc.clientWidth,
              cap:!!document.querySelector('.lp-viz .lp-artCap')};
    });
    if(r.no) bad.push(id+':missing');
    else if(r.w<120||r.h<60) bad.push(id+':tiny '+r.w+'x'+r.h);
    else if(r.over) bad.push(id+':overflows frame');
    else if(r.hscroll) bad.push(id+':page h-scroll');
    else if(!r.cap) bad.push(id+':no caption');
  }
  console.log(vp.width+'px  figures:'+ids.length+'  bad:'+(bad.length?bad.join(', '):'none')+'  errors:'+(errs.join('|')||'none'));
  await p.close();
 }
 await b.close();
})();
