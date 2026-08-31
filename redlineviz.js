// REDLINE mechanism diagrams — Social Media Operator Masterclass.
// Compact, accessible SVGs: every color-coded state also carries a label.
(function () {
  'use strict';
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function flow(title, items, footer) {
    var w=320, gap=8, margin=8, y=36, boxW=(w-margin*2-gap*(items.length-1))/items.length, s='';
    s+='<svg viewBox="0 0 320 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">';
    s+='<text x="160" y="15" fill="#a9a9a9" font-size="10" text-anchor="middle">'+esc(title)+'</text>';
    for(var i=0;i<items.length;i++){
      var x=margin+i*(boxW+gap), col=i===items.length-1?'#00e5a0':(i===0?'#ffb020':'#ff645b');
      s+='<rect x="'+x+'" y="'+y+'" width="'+boxW+'" height="74" rx="8" fill="#150a0a" stroke="'+col+'" stroke-width="1.2"/>';
      s+='<text x="'+(x+boxW/2)+'" y="58" fill="'+col+'" font-size="9" text-anchor="middle">'+esc(items[i][0])+'</text>';
      s+='<text x="'+(x+boxW/2)+'" y="76" fill="#d8d8d8" font-size="7.5" text-anchor="middle">'+esc(items[i][1])+'</text>';
      s+='<text x="'+(x+boxW/2)+'" y="91" fill="#8f8f8f" font-size="7" text-anchor="middle">'+esc(items[i][2]||'')+'</text>';
      if(i<items.length-1){var ax=x+boxW; s+='<path d="M'+ax+' 73 L'+(ax+gap-2)+' 73" stroke="#ffb020"/><path d="M'+(ax+gap-5)+' 69 L'+(ax+gap-2)+' 73 L'+(ax+gap-5)+' 77" fill="none" stroke="#ffb020"/>';}
    }
    s+='<text x="160" y="145" fill="#ece0df" font-size="8.5" text-anchor="middle">'+esc(footer)+'</text>';
    s+='<circle r="3.5" fill="#ffb020"><animateMotion dur="4s" repeatCount="indefinite" path="M15 125 L305 125"/></circle>';
    s+='</svg>'; return s;
  }
  function stack(title, rows, footer) {
    var s='<svg viewBox="0 0 320 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">';
    s+='<text x="160" y="15" fill="#a9a9a9" font-size="10" text-anchor="middle">'+esc(title)+'</text>';
    for(var i=0;i<rows.length;i++){
      var x=22+i*10, y=30+i*30, w=276-i*20, col=i===rows.length-1?'#00e5a0':(i===0?'#ffb020':'#ff645b');
      s+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="24" rx="7" fill="#150a0a" stroke="'+col+'"/>';
      s+='<text x="160" y="'+(y+16)+'" fill="'+col+'" font-size="8.5" text-anchor="middle">'+esc(rows[i])+'</text>';
    }
    s+='<text x="160" y="190" fill="#d8d8d8" font-size="8.5" text-anchor="middle">'+esc(footer)+'</text></svg>'; return s;
  }
  window.REDLINE_VIZ = {
    b0_journey:flow('Ralston Brand Journey — work backward from the outcome',[
      ['OUTCOME','what must happen','specific result'],['KNOWN FOR','required association','market memory'],['DO','visible proof','repeated behavior'],['LEARN','missing skill','training plan']],
      'A brand strategy is a causal chain, not a mood board.'),
    w0_story:flow('Ralston story structure — attention becomes transferable value',[
      ['HOOK','open on change','earn next beat'],['PROBLEM','specific stakes','why it matters'],['JOURNEY','decision + friction','show the change'],['LESSON','usable truth','transfer value'],['ACTION','natural next step','continue value']],
      'Chronology is edited around a changed belief, decision, or capability.'),
    d0_pillar:flow('The Waterfall — one dense source, many native assets',[
      ['PILLAR','deep source','proof + stories'],['MINE','complete moments','not timestamps'],['ADAPT','native package','platform job'],['DISTRIBUTE','cadence + QA','measure']],
      'Preserve the core truth; rebuild context, hook, format, and CTA.'),
    v0_formula:stack('The viral probability stack — a weak stage constrains the system',[
      '1 · QUALIFIED DEMAND + ELIGIBILITY','2 · PACKAGE / SELECTION','3 · OPENING HOLD','4 · RETENTION / PROGRESSION','5 · SATISFACTION','6 · SHARING / SPREAD','7 · PROFILE CAPTURE + ITERATION'],
      'Diagnose the weakest plausible constraint. Change one meaningful variable.'),
    n0_tree:stack('Metric tree — trace activity to business value',[
      'OUTPUT · concepts, assets, cadence','DISTRIBUTION · qualified reach / impressions','RESPONSE · select, watch, satisfy, share','ACTION · profile, reply, click, lead','BUSINESS · close, revenue, margin, retention'],
      'Every rate has a numerator, denominator, source, and decision.'),
    ig_surfaces:flow('Instagram is multiple systems, not one algorithm',[
      ['REELS','discovery','watch + sends'],['FEED','depth + identity','save + share'],['STORIES','relationship','reply + tap'],['PROFILE/DM','conversion','follow + qualify']],
      'Match format, audience relationship, signal, and business job.'),
    tt_recommender:flow('TikTok recommendation — signals become an individual prediction',[
      ['ELIGIBLE','policy + safety','candidate set'],['INTERACTIONS','watch / skip / share','often strong weight'],['CONTENT','topic / sound / text','classification'],['RANK','viewer fit','For You']],
      'No fixed public test-pool formula: read the response curve, not folklore.'),
    yt_system:flow('YouTube performance — appeal, engagement, satisfaction',[
      ['IMPRESSION','viewer + context','opportunity'],['APPEAL','title + thumbnail','choose or ignore'],['ENGAGE','promise delivered','keep watching'],['SATISFY','value + next view','long-term trust']],
      'Traffic source, topic demand, and competition shape every comparison.'),
    f0_conversion:flow('Attention becomes a customer through explicit handoffs',[
      ['REACH','right stranger','qualified attention'],['TRUST','proof + value','belief'],['CAPTURE','profile / owned','permission'],['QUALIFY','fit + need','conversation'],['SERVE','offer + outcome','retain + advocate']],
      'The largest number is useless if the next denominator collapses.'),
    ad_foundation:stack('Paid social system — optimization cannot repair a broken chain',[
      'BUSINESS ECONOMICS + OFFER','TRACKING + CONSENTED EVENTS','OBJECTIVE + AUDIENCE','CREATIVE + DESTINATION','AUCTION DELIVERY','INCREMENTAL PROFIT'],
      'Cheap clicks are not success when the value event is wrong.'),
    s0_skillproof:flow('Proof ladder — earn larger claims through inspectable work',[
      ['LEARN','lesson artifact','knowledge'],['PRACTICE','spec / own account','execution'],['MEASURE','experiment','evidence'],['PILOT','real stakeholder','trust'],['CASE STUDY','client outcome','repeatability']],
      'Label spec work. Never manufacture access, metrics, testimonials, or results.'),
    o0_onboard:flow('Client delivery — alignment before publishing speed',[
      ['DISCOVER','business + audience','diagnosis'],['ACCESS','assets + security','chain of custody'],['STRATEGY','scope + KPI','shared plan'],['PILOT','calibrate quality','approval'],['OPERATE','ship + report','improve']],
      'Unclear owners, approvals, and baselines become expensive rework.'),
    x0_capstone:stack('Professional capstone — the evidence stack',[
      'AUDIENCE RESEARCH + BRAND JOURNEY','STRATEGY + 30-PIECE SYSTEM','6-WEEK PUBLISHING RECORD','3 CONTROLLED EXPERIMENTS','FUNNEL + CLIENT REPORT','RIGHTS / RISK / ACCESS CONTROLS','CASE STUDY + SKEPTICAL REVIEW'],
      'A polished claim without raw artifacts, failures, and limitations does not pass.')
  };
}());
