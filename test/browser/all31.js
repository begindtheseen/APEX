var ENV = require('./_env');
var LP = require('./_launchpad');
// Opens every module in the real app and checks its mechanism figure is there,
// sized, inside its frame, and captioned. The figures are injected as markup
// from launchpadviz.js, which is the path the app actually uses, so this is
// the only check that proves anything.
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch(ENV.launchOpts);
 let failed=false;
 for(const vp of [{width:390,height:900},{width:1280,height:1000}]){
  const p=await b.newPage({viewport:vp});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await LP.open(p,'/');
  const ids=await p.evaluate(()=>Array.from(document.querySelectorAll('.side .nav-item')).length>0);
  if(!ids) errs.push('the app did not draw');
  const all=Array.from({length:33},(_, i)=>'M'+i);
  const bad=[];
  for(const id of all){
    await LP.go(p,'/module/'+id+'?step=learn');
    await p.waitForSelector('.lp-figure svg',{timeout:4000}).catch(()=>{});
    const r=await p.evaluate(()=>{
      const v=document.querySelector('.lp-figure svg');
      if(!v) return {no:1};
      const r=v.getBoundingClientRect();
      const f=v.closest('.card').getBoundingClientRect();
      const doc=document.documentElement;
      const cap=v.closest('.card').querySelector('.card-head');
      return {w:Math.round(r.width),h:Math.round(r.height),
              over:r.right>f.right+1||r.left<f.left-1,
              hscroll:doc.scrollWidth>doc.clientWidth,
              cap:!!cap&&/Fig\. M\d+/.test(cap.textContent||''),
              named:/^Figure M\d+: how /.test(v.getAttribute('aria-label')||'')};
    });
    if(r.no) bad.push(id+':missing');
    else if(r.w<120||r.h<60) bad.push(id+':tiny '+r.w+'x'+r.h);
    else if(r.over) bad.push(id+':overflows frame');
    else if(r.hscroll) bad.push(id+':page h-scroll');
    else if(!r.cap) bad.push(id+':no caption');
    else if(!r.named) bad.push(id+':no accessible name');
  }
  if(bad.length||errs.length) failed=true;
  console.log(vp.width+'px  figures:'+all.length+'  bad:'+(bad.length?bad.join(', '):'none')+'  errors:'+(errs.join('|')||'none'));
  await p.close();
 }
 await b.close();
 process.exit(failed?1:0);
})();
