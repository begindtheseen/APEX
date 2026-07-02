/* ─────────────────────────────────────────────────────────────────────────
 * jobs.js — APEX Career Target data.
 *
 * Navy ratings grouped into 5 interest categories. Each rating carries the
 * ASVAB line-score composite it's gated on, the subtests that deserve the
 * most study attention, the training emphasis it implies, and — the part that
 * matters for life after service — where it transfers on the civilian side and
 * how the future demand looks.
 *
 * ⚠️ SCORES ARE UNOFFICIAL. Navy rating minimums change and vary by contract,
 * bonuses, and manning. Treat these as study targets, not guarantees — always
 * confirm the current line-score requirement with your recruiter (NRC / MEPS).
 * Numbers below are commonly-cited minimums, kept in one place so they're easy
 * to update.
 * ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ASVAB subtests. VE (Verbal) is itself Word Knowledge + Paragraph Comp.
  var SUBTESTS = {
    GS: { name: 'General Science',        blurb: 'Physical, life & earth science.' },
    AR: { name: 'Arithmetic Reasoning',   blurb: 'Word problems, applied math. AFQT core.' },
    WK: { name: 'Word Knowledge',         blurb: 'Vocabulary & synonyms. AFQT core.' },
    PC: { name: 'Paragraph Comprehension',blurb: 'Reading comprehension. AFQT core.' },
    MK: { name: 'Math Knowledge',         blurb: 'Algebra & geometry. AFQT core.' },
    EI: { name: 'Electronics Information', blurb: 'Circuits, current, electrical systems.' },
    MC: { name: 'Mechanical Comprehension', blurb: 'Forces, mechanisms, physical principles.' },
    AS: { name: 'Auto & Shop Information', blurb: 'Automotive systems & shop practices.' },
    AO: { name: 'Assembling Objects',     blurb: 'Spatial reasoning.' },
    VE: { name: 'Verbal (WK + PC)',       blurb: 'Combined word knowledge + reading.', parts: ['WK', 'PC'] }
  };

  // AFQT is drawn from AR, MK, WK, PC — the four that gate eligibility itself.
  var AFQT_PARTS = ['AR', 'MK', 'WK', 'PC'];

  var CATEGORIES = [
    { id: 'nuke',  label: 'Nuclear & Power',          icon: '⚛️', accent: '#ffb020', tag: 'High AR · High MK' },
    { id: 'cyber', label: 'Cyber & IT',               icon: '🛡️', accent: '#00d4ff', tag: 'High GS · High EI' },
    { id: 'av',    label: 'Aviation & Electronics',   icon: '✈️', accent: '#4db8ff', tag: 'High AR · High EI' },
    { id: 'med',   label: 'Medical & Rescue',         icon: '⚕️', accent: '#00e5a0', tag: 'High VE · High GS' },
    { id: 'intel', label: 'Intelligence & Language',  icon: '🧠', accent: '#6e8fff', tag: 'High VE · High AR' }
  ];

  // focus[] = the highest-leverage subtests for that rating (glow gold in UI
  // and drive "sections needing the most attention").
  var JOBS = [
    // ── Nuclear & Power ────────────────────────────────────────────────
    {
      id: 'nf', cat: 'nuke', rate: 'NF', name: 'Nuclear Field (Nuke)',
      composite: { formula: 'AR + MK + EI + GS', parts: ['AR', 'MK', 'EI', 'GS'], min: 290, alt: 'or VE + AR + MK + MC ≥ 290' },
      focus: ['AR', 'MK'],
      extra: 'Also requires passing the NAPT (if AR+MK+EI+GS is short) and a security clearance. The highest academic bar in the Navy — and the biggest enlistment bonus.',
      training: ['Push Arithmetic Reasoning + Math Knowledge to mastery — they carry double weight here.', 'Layer in Electronics Information and General Science.', 'This is the score that unlocks the contract; treat every practice point as leverage.'],
      civilian: ['Nuclear / reactor plant operator', 'Power-generation & grid technician', 'Instrumentation & controls tech', 'Engineering degree fast-track (NUPOC / college credit)'],
      demand: { level: 'Very High', note: 'Aging nuclear workforce + new small-modular-reactor buildout. Reactor operators are among the best-paid skilled-trade roles and can’t be offshored.' }
    },
    {
      id: 'mm', cat: 'nuke', rate: 'MM', name: "Machinist’s Mate",
      composite: { formula: 'VE + AR + MK + AS', parts: ['VE', 'AR', 'MK', 'AS'], min: 200, alt: '' },
      focus: ['MK', 'AS'],
      extra: 'Hands-on with steam, hydraulics, refrigeration and marine propulsion systems.',
      training: ['Solidify Math Knowledge and Auto & Shop.', 'Mechanical Comprehension reinforces the concepts you’ll use daily.'],
      civilian: ['HVAC / refrigeration technician', 'Industrial mechanic / millwright', 'Marine engineer / operating engineer', 'Manufacturing maintenance'],
      demand: { level: 'High', note: 'Skilled-trades shortage nationwide; industrial mechanics and HVAC techs have steady growth and strong local demand.' }
    },
    // ── Cyber & IT ─────────────────────────────────────────────────────
    {
      id: 'ctn', cat: 'cyber', rate: 'CTN', name: 'Cryptologic Tech — Networks',
      composite: { formula: 'AR + MK + EI + GS', parts: ['AR', 'MK', 'EI', 'GS'], min: 222, alt: '' },
      focus: ['MK', 'EI'],
      extra: 'The Navy’s offensive/defensive cyber operators. Requires a Top Secret / SCI clearance.',
      training: ['Math Knowledge + Electronics Information are the backbone.', 'General Science rounds out the technical composite.'],
      civilian: ['Cybersecurity analyst / SOC', 'Penetration tester / red team', 'Network security engineer', 'Cleared IT contractor (premium pay)'],
      demand: { level: 'Very High', note: 'Cybersecurity is one of the fastest-growing fields with a persistent talent gap; a clearance + Navy cyber experience is a direct on-ramp to six-figure roles.' }
    },
    {
      id: 'it', cat: 'cyber', rate: 'IT', name: 'Information Systems Technician',
      composite: { formula: 'AR + MK + EI + GS', parts: ['AR', 'MK', 'EI', 'GS'], min: 222, alt: 'or VE + AR + MK + MC ≥ 222' },
      focus: ['AR', 'EI'],
      extra: 'Runs the Navy’s networks, servers, satellite comms and help desks.',
      training: ['Arithmetic Reasoning + Electronics Information carry the load.', 'The alternate composite (VE+AR+MK+MC) gives a second path if verbal is your strength.'],
      civilian: ['Network / systems administrator', 'Cloud / IT support engineer', 'Help-desk → sysadmin → DevOps ladder', 'CompTIA / cloud certs transfer directly'],
      demand: { level: 'High', note: 'IT support and network administration remain broadly in demand across every industry; the fastest path from enlisted skills to civilian certs.' }
    },
    // ── Aviation & Electronics ─────────────────────────────────────────
    {
      id: 'at', cat: 'av', rate: 'AT', name: 'Aviation Electronics Technician',
      composite: { formula: 'AR + MK + EI + GS', parts: ['AR', 'MK', 'EI', 'GS'], min: 222, alt: '' },
      focus: ['EI', 'MC'],
      extra: 'Maintains aircraft radar, navigation and weapons electronics.',
      training: ['Electronics Information + Mechanical Comprehension are decisive.', 'Keep Arithmetic Reasoning sharp for the composite.'],
      civilian: ['Avionics technician', 'Aircraft / aerospace electronics tech', 'Electronics engineering technician', 'FAA repair certifications'],
      demand: { level: 'High', note: 'Avionics and aerospace maintenance face a technician shortage as fleets age and air travel grows; FAA-certified techs are well paid.' }
    },
    {
      id: 'et', cat: 'av', rate: 'ET', name: 'Electronics Technician',
      composite: { formula: 'AR + MK + EI + GS', parts: ['AR', 'MK', 'EI', 'GS'], min: 222, alt: '' },
      focus: ['EI', 'MK'],
      extra: 'Radar, communications and navigation systems across the fleet.',
      training: ['Electronics Information is the anchor; Math Knowledge close behind.'],
      civilian: ['Electronics / telecom technician', 'Radar & RF systems tech', 'Industrial controls / automation', 'Broadband & network hardware'],
      demand: { level: 'High', note: 'Electronics and telecom technicians stay in demand with 5G, automation and grid modernization.' }
    },
    {
      id: 'fc', cat: 'av', rate: 'FC', name: 'Fire Controlman',
      composite: { formula: 'AR + MK + EI + GS', parts: ['AR', 'MK', 'EI', 'GS'], min: 223, alt: 'strong MK weighted' },
      focus: ['MK', 'EI'],
      extra: 'Operates and maintains combat / weapons-control and Aegis systems.',
      training: ['Math Knowledge is weighted heavily — prioritize it.', 'Electronics Information supports the systems side.'],
      civilian: ['Systems / controls technician', 'Industrial automation engineer tech', 'Electro-mechanical technician', 'Defense-contractor systems roles'],
      demand: { level: 'High', note: 'Automation and controls technicians are increasingly needed in advanced manufacturing and defense.' }
    },
    // ── Medical & Rescue ───────────────────────────────────────────────
    {
      id: 'hm', cat: 'med', rate: 'HM', name: 'Hospital Corpsman',
      composite: { formula: 'VE + MK + GS', parts: ['VE', 'MK', 'GS'], min: 156, alt: '' },
      focus: ['GS', 'VE'],
      extra: 'Navy & Marine Corps medical care — from clinics to combat. Broad specialization paths (EMT, surgical, field medicine).',
      training: ['General Science and Verbal (WK+PC) drive this composite.', 'Reading comprehension pays off in medical coursework.'],
      civilian: ['EMT / paramedic', 'Registered nurse / LPN (bridge programs)', 'Surgical / medical technician', 'Physician assistant pathway'],
      demand: { level: 'Very High', note: 'Healthcare is the largest and one of the fastest-growing job sectors; Corpsman experience credits toward EMT, nursing and PA programs.' }
    },
    // ── Intelligence & Language ────────────────────────────────────────
    {
      id: 'is', cat: 'intel', rate: 'IS', name: 'Intelligence Specialist',
      composite: { formula: 'VE + AR', parts: ['VE', 'AR'], min: 107, alt: '' },
      focus: ['VE', 'AR'],
      extra: 'Analyzes and briefs intelligence. Requires a Top Secret / SCI clearance.',
      training: ['Verbal (WK+PC) and Arithmetic Reasoning are the whole composite — make both strong.'],
      civilian: ['Intelligence / all-source analyst', 'Data / GIS analyst', 'Cleared government contractor', 'Federal law-enforcement pathways'],
      demand: { level: 'Moderate–High', note: 'Analyst roles are steady; a clearance is the real differentiator and keeps you competitive for federal and contractor work.' }
    },
    {
      id: 'cti', cat: 'intel', rate: 'CTI', name: 'Cryptologic Tech — Interpretive',
      composite: { formula: 'VE + MK', parts: ['VE', 'MK'], min: 105, alt: '+ pass the DLAB (language aptitude)' },
      focus: ['VE'],
      extra: 'Navy linguists. Selection hinges on the DLAB, not just ASVAB, then a year+ at the Defense Language Institute.',
      training: ['Verbal strength helps, but the DLAB (language aptitude battery) is the real gate — prep for it separately.'],
      civilian: ['Linguist / translator / interpreter', 'Intelligence analyst (language-enabled)', 'Foreign-service / State Dept pathways', 'Cleared language contractor'],
      demand: { level: 'Moderate', note: 'Niche but valuable — certified linguists with clearances are scarce and command premium contract rates.' }
    }
  ];

  // Expand a composite's parts into concrete AFQT-level subtests (VE -> WK,PC).
  function expandParts(parts) {
    var out = [];
    parts.forEach(function (p) {
      var s = SUBTESTS[p];
      if (s && s.parts) { s.parts.forEach(function (x) { if (out.indexOf(x) < 0) out.push(x); }); }
      else if (out.indexOf(p) < 0) out.push(p);
    });
    return out;
  }

  function byId(id) { for (var i = 0; i < JOBS.length; i++) if (JOBS[i].id === id) return JOBS[i]; return null; }
  function byCat(cat) { return JOBS.filter(function (j) { return j.cat === cat; }); }
  function category(id) { for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i]; return null; }

  // What carries over when switching from job A to job B: subtests both
  // composites depend on (expanded to AFQT-level). Everything the new job
  // needs that the old one didn't is "new focus".
  function transfer(fromId, toId) {
    var to = byId(toId); if (!to) return { shared: [], fresh: [] };
    var toParts = expandParts(to.composite.parts);
    var from = byId(fromId);
    var fromParts = from ? expandParts(from.composite.parts) : [];
    var shared = toParts.filter(function (p) { return fromParts.indexOf(p) >= 0; });
    var fresh = toParts.filter(function (p) { return fromParts.indexOf(p) < 0; });
    return { shared: shared, fresh: fresh };
  }

  window.APEX_JOBS = {
    SUBTESTS: SUBTESTS,
    AFQT_PARTS: AFQT_PARTS,
    CATEGORIES: CATEGORIES,
    JOBS: JOBS,
    expandParts: expandParts,
    byId: byId,
    byCat: byCat,
    category: category,
    transfer: transfer,
    subtestName: function (k) { return (SUBTESTS[k] && SUBTESTS[k].name) || k; },
    DEFAULT_JOB: 'nf'
  };
})();
