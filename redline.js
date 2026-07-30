// ============================================================
// APEX — REDLINE curriculum: THE EXOTIC RENTAL OPERATOR TRACK
// ============================================================
// The third realm. Absolute zero → operator who controls cars, sources
// demand, and runs the machine — built from a broke file up. Two rails run
// through it: the INDUSTRY spine (how the exotic-rental machine actually
// works, Tiers T0–TX) and the CREDIT spine (how you finance your way in,
// Tiers C0–C4). Educational only — never financial, legal, tax, or
// insurance advice. No income claims, ever. Time-sensitive figures — rates,
// caps, statutes, platform gates, tax thresholds — are tagged [VERIFY];
// confirm them against the live source before you repeat or act on them.
// The fraud line is a WALL, not a technique: every place a shortcut crosses
// into fraud (CPNs, sweeps, straw deals, lying to a carrier), the course
// names it and stops. You win this game by learning it properly.
//
// ─────────────────────────────────────────────────────────────
// SCHEMA (the engine reads exactly this — same engine as Obsidian):
//   window.REDLINE_CONFIG = { brand, name, tagline,
//     subjects:{KEY:{name,blurb}}, order:[KEY,...],
//     drills:{n,min,gate},          // gate = % needed to pass a tier drill
//     srs:[d0,d1,d2,d3,d4,d5],      // review intervals in days, by SRS box
//     perfectTo, reps:[...] }
//   window.REDLINE_CURRICULUM = [{
//     id:'t0_slug', sub:'T0', title:'...',
//     predict:'Question shown BEFORE the lesson unlocks (predict-then-reveal).',
//     concept:'<p>HTML lesson, mechanism-first: who pays whom, who is forced
//              to act, who benefits, where the money and the risk land.</p>',
//     example:'<p><b>Ex:</b> optional worked example.</p>',
//     teach:'Teach-back prompt (explain it to a sharp friend).',
//     cards:[{f:'front',b:'back'}], quiz:[{q,c:[4],a:index,e}] }]
//   window.REDLINE_QBANK = { KEY:[{q,c,a,e,d:1|2|3}] }  // tier gate drills
// Rules: ES5 only, no template literals, ’ instead of raw apostrophes,
// unique permanent ids (renaming orphans progress), vary quiz answer index.
// ─────────────────────────────────────────────────────────────

window.REDLINE_CONFIG = {
  brand: 'REDLINE',
  name: 'REDLINE — Exotic Rental Operator Track',
  tagline: 'Absolute zero to operator. How the exotic-rental machine really runs — who owns the cars, how the money splits, why insurance rules everything — and how you finance your way from a broke file to your own fleet. Educational only, never advice.',
  subjects: {
    // ── The Industry spine ──────────────────────────────────
    T0: { name: 'Tier 0 · The Curtain', blurb: 'What the industry actually is behind the Instagram: the agency model, who really rents, why no empire exists yet, and the two doors in.' },
    T1: { name: 'Tier 1 · Three Laws &amp; the Waterfall', blurb: 'The value chain: who holds power in a deal, wholesale vs retail, and exactly who walks away with what.' },
    T2: { name: 'Tier 2 · The Insurance Spine', blurb: 'The asymmetry that rules everything — plus the forms, the carrier rules, and the SERFF fine print the free course only points at.' },
    T3: { name: 'Tier 3 · The Verification Stack', blurb: 'The exact sequence that turns documents into a yes-or-no before keys ever move — scripts, tells, and the fraud it stops.' },
    T4: { name: 'Tier 4 · The Commercial Policy', blurb: 'How the pitch, the telematics feed, and the Turo exception work — down to the garage form and the PVSP statutes.' },
    T5: { name: 'Tier 5 · Protection &amp; Enforcement', blurb: 'Background checks, telematics, the contract clause by clause, and what to do when it goes wrong.' },
    T6: { name: 'Tier 6 · The Deal Machine', blurb: 'A booking start to finish at every trust level — direct, broker, agency-to-agency — and the repeat clients that pay forever.' },
    T7: { name: 'Tier 7 · The Lead Door (no money)', blurb: 'Brokering as lead-gen: reputation as pricing, where leads live, the premium low-risk niche, and the ladder up.' },
    T8: { name: 'Tier 8 · The Vehicle Door (capital)', blurb: 'Choosing the customer not the car, the unit economics, the tax edge, placing and auditing a fleet, and the flip.' },
    TX: { name: 'Tier X · The Operator Seat', blurb: 'The empty seat: systems, data, and AI. Build the platform this industry never built and take the crown off the table.' },
    // ── The Credit spine ────────────────────────────────────
    C0: { name: 'Credit 0 · The File From Zero', blurb: 'Owning an exotic starts with your credit file. What credit really is, the bureaus, and the score a lender actually pulls.' },
    C1: { name: 'Credit 1 · The Five Levers', blurb: 'Exactly what moves a score, in order of weight — and the fastest legitimate moves on each lever.' },
    C2: { name: 'Credit 2 · Build &amp; Repair', blurb: 'From a thin or damaged file to a lender-ready one — and the fraud “repair” industry that will scam you.' },
    C3: { name: 'Credit 3 · The Business Credit Machine', blurb: 'Fundability, D-U-N-S, PAYDEX, the vendor-tier ladder — credit that buys cars without touching your personal file.' },
    C4: { name: 'Credit 4 · Financing the Exotic', blurb: 'The specialty lenders, simple-interest vs balloon vs lease, the commercial-use trap, and buying the car through the business.' },
    REPS: { name: 'The Reps Ladder &amp; The Odometer', blurb: 'Knowledge lives in lessons; edge lives in reps with a graded record. The counters that turn study into a track record.' }
  },
  order: ['T0','C0','T1','T2','T3','T4','T5','T6','T7','C1','C2','C3','C4','T8','TX','REPS'],
  drills: { n: 12, min: 15, gate: 80 },
  srs: [1, 1, 3, 7, 21, 30],
  // Ace a topic quiz (100%) and it jumps straight to box 3 = MASTERED — one
  // strong first pass is enough; reviews still schedule to keep it honest.
  perfectTo: 3,
  // ── THE REPS LADDER ──────────────────────────────────────────
  // Each rep unlocks with its tier and tracks a counter shown like a streak.
  // g:true = gradeable (logged first, graded hit/miss later — misses ARE the
  // curriculum). target = the program milestone. daily:true = streak-tracked.
  reps: [
    { k:'metro', tier:'T0', name:'Fleet Mapped',
      hint:'Map one local exotic fleet — inventory, retail pricing, socials, who they seem to serve. Ten fleets and you know your metro better than most people working in it.' },
    { k:'build', tier:'T0', name:'Build In Public', daily:true,
      hint:'Ship one piece of content about this industry, in your own voice, face attached. In a relationship business, visible reach IS qualification. Post from day zero.' },
    { k:'score', tier:'C0', name:'Score Pull',
      hint:'Pull your three reports / real scores. Log the number and the ONE thing dragging it down. What gets measured gets fixed.' },
    { k:'lever', tier:'C1', name:'Credit Move',
      hint:'One concrete file action: a pre-statement paydown, AZEO set, a dispute filed, an authorized-user line added. Log the move and the lever it pulls.' },
    { k:'decread', tier:'T2', name:'Dec-Page Read', target:25,
      hint:'Pull one real declarations page + its policy form; extract the non-owner-vehicle rule and any value cap. THE core skill — reps compound into fluency.' },
    { k:'call', tier:'T3', name:'Carrier Call',
      hint:'Run one recorded 4-question coverage call (with consent — know your state) to a carrier. The tape is your evidence and your training.' },
    { k:'verify', tier:'T3', name:'Verification Run', g:true,
      hint:'Run the full stack on a real or mock renter. Grade it: did the three layers agree, and would you have handed over the keys?' },
    { k:'lead', tier:'T7', name:'Lead Sourced', g:true, target:20,
      hint:'Assemble one qualified renter — license, insurance dec page, working contact, a car that fits. Grade hit/miss when the fleet responds.' },
    { k:'deal', tier:'T7', name:'Deal Closed', g:true, target:5,
      hint:'A brokered or placed booking that ran clean, start to finish. Five clean deals is a track record fleets price on. Misses are the curriculum.' },
    { k:'tradeline', tier:'C3', name:'Business Tradeline', target:5,
      hint:'Open one net-30 / vendor line that REPORTS to a business bureau, and pay it early. The ladder to a PAYDEX a bank will lend against.' },
    { k:'audit', tier:'T8', name:'Fleet Audit',
      hint:'Audit one operation against the checklist — verification stack, commercial-policy limit, who-drives, storage. Their answers ARE the audit.' },
    { k:'source', tier:'T8', name:'Car Sourced', g:true,
      hint:'Bring one idle-owner exotic a step toward placement. Grade it when it lands on a fleet. Sourcing cars is where the seats at the table multiply.' }
  ]
};

window.REDLINE_CURRICULUM = [

// ═══════════════════════ TIER 0 · THE CURTAIN ═══════════════════════
{ id:'t0_agency', sub:'T0', title:'The agency secret — almost no fleet owns its cars',
  predict:'You scroll a local exotic-rental company’s Instagram: a dozen Lamborghinis, a Ferrari, a Rolls. Your brain fills in “this company is rich — they own all of these.” How many of those cars does the company actually own, and why would the honest answer be a guarded business secret?',
  concept:'<p>Unlearn the first thing everyone assumes. When you see an exotic fleet’s lot or feed, you assume the company <i>owns</i> the cars. In reality, <b>almost every car you will ever see in an exotic fleet is owned by someone else.</b></p>'
    +'<p><b>Why buying breaks at this level.</b> A normal rental startup finances five or six cheap economy cars on personal credit, builds business credit, and qualifies for fleet financing. Try that with exotics and one Huracán costs more than that entire starter fleet. The debt grows so fast you can never finance enough cars to <i>be</i> a fleet. And fleet size is survival math, not ego: with three cars, one in the shop is a third of your revenue gone; with fifteen, one down barely registers.</p>'
    +'<p><b>The fix: they don’t buy, they source.</b> An exotic-rental company is an <b>agency</b>. Owners and investors place cars with it on <b>consignment</b>; the company operates them — marketing, bookings, verification, deliveries, protection — and the revenue splits. Owners fund the fleet; the operator runs it.</p>'
    +'<p><b>Who pays, who benefits, who’s exposed.</b> The owner funds the asset and eats depreciation; the agency does the work and carries the liability; both share the revenue. And the single most guarded fact in the industry is <b>the list of who owns the cars</b> — because a rival who learns your owners can go straight to them with a better split and pull your fleet out from under you without stealing a single car. The owner list <i>is</i> the business. That is why companies claim to own everything: it is defense, not vanity.</p>'
    +'<p><b>The edge under the secret.</b> Because it runs on consignment, the barrier to entry is not “be rich enough to buy ten Lamborghinis.” It is trust and relationships — and there are seats at this table (broker, car-sourcer, operator) that outsiders never see. One detail to file for Tier 2: <i>how</i> a car is consigned — leased and re-registered to the agency, versus a looser hand-shake consignment — quietly decides whose insurance actually covers it. Most owners never ask. You will.</p>',
  example:'<p><b>Ex — the survival math:</b> Three $250k cars, one in the shop for a month: you just lost ~33% of your capacity on an asset still costing you insurance, storage, and payments while it sits. Fifteen cars, one down: ~7%. Scale is not showing off; it is how you stop one repair from being an emergency.</p>',
  teach:'Explain to a friend why a fleet showing twelve supercars on Instagram might own only two of them — and why they would rather you not know that.',
  cards:[
    {f:'What is an exotic-rental company, structurally?', b:'An agency: it operates cars placed with it on consignment by owners/investors, and splits the revenue. It mostly does not own the fleet.'},
    {f:'Why can’t you just finance a fleet of exotics like economy cars?', b:'Each car costs more than a whole starter fleet, so debt outruns you — you can never finance enough to reach survival scale. Sourcing (consignment) solves it.'},
    {f:'What is the most guarded secret in the industry, and why?', b:'The list of who owns the cars. A rival who learns it can poach your owners and take your fleet without stealing a car. The owner list IS the business.'}
  ],
  quiz:[
    {q:'The single most important structural fact about the exotic-rental industry is that…', c:['Fleets buy their cars with fleet financing','Fleets mostly operate consigned cars owned by other people','Only the wealthy can enter','Turo owns most exotics'], a:1, e:'It is an agency/consignment model — owners fund the fleet, the operator runs it and splits revenue. That is what lowers the barrier to entry.'},
    {q:'Why do fleets claim to own cars they actually operate on consignment?', c:['Vanity','Tax reasons','Defense — the owner list is their most poachable asset','It is legally required'], a:2, e:'If a competitor learns your owners, they can offer a better split and pull your inventory away. Hiding ownership protects the business.'}
  ]},

{ id:'t0_customer', sub:'T0', title:'Who actually rents supercars — the image, not the car',
  predict:'You could build the coolest tuned Supra in the state — a genuine enthusiast’s dream car. Will it rent well sitting in an exotic fleet? Yes or no — and what does your answer reveal about who the customer really is?',
  concept:'<p>Get this wrong and every marketing dollar you spend is wasted. Start by ruling out who it is <b>not</b>.</p>'
    +'<p><b>Not the regular renter</b> (they are on the big platforms getting a sensible car for a trip). <b>Not the truly rich</b> (they own or lease their exotics, and when they travel they usually want the <i>opposite</i> of attention — quiet luxury). And the surprise: <b>not car enthusiasts</b> either. The person who can tell a Performante from an Evo mostly is not the person renting. Your tuned Supra sits unrented, because to the customer it reads as “a Toyota.”</p>'
    +'<p><b>Who it actually is:</b> the band in the middle — people who cannot afford to <i>own</i> a supercar but can afford to <i>rent</i> the image of one. The product is not the car. <b>The product is the image.</b> In real life: content creators and B/C-list names shooting posts; crypto and day-trading money (cash-rich, credit-poor — buying is hard, renting is easy); rich kids on a weekend; and a group outsiders forget — <b>18-to-30-year-olds the big platforms lock out on age</b>, who come to independent operators instead.</p>'
    +'<p><b>Two consequences that shape everything.</b> First, renters are <b>flexible about the car</b> in a way that shocks people from car sales — someone who asked for a Ferrari will happily leave in a Lamborghini if it is low, loud, aggressive, and photographs hard. Whole deals get saved by knowing this. Second, this customer is <b>expensive to find</b> — a small slice of the population that rents rarely and briefly — so whoever can <i>reliably produce these renters</i> holds real power. That is the foundation of the no-money door.</p>'
    +'<p><b>The edge under it.</b> Each segment lives on a different surface — creators on short-form video, crypto money in group chats and on X, event/wedding demand through concierges and planners. And the age-gap group is not a loophole to fear: it is a <b>legal, underserved niche</b> that independents can serve precisely because personal-auto coverage rules are carrier-based, not platform age-gates. You will learn exactly why in Tier 2. <i>[VERIFY platform age thresholds — they shift.]</i></p>',
  example:'<p><b>Ex — the save:</b> A client insists on “a Ferrari” for a photo shoot; your Ferrari is booked. You offer a Lamborghini that shoots just as hard. In car sales nobody swaps a Sentra for an Escalade — but here the client says yes, because they were renting a <i>look</i>, not a spec sheet. Deal saved.</p>',
  teach:'Explain to a friend why an enthusiast’s dream-build can sit unrented while a “boring-badge” Lamborghini stays booked — and who the real customer is.',
  cards:[
    {f:'Who is the core exotic-rental customer?', b:'The middle band: can’t afford to OWN, can afford to RENT the image. Content creators, crypto money, rich kids, and the 18–30 age-gap platforms lock out.'},
    {f:'What is the actual product being sold?', b:'The image — how the car makes the renter look and photograph. Not the spec sheet. Renters are flexible on the specific car if the look lands.'},
    {f:'Why is “who can find these renters” the powerful role?', b:'The customer is a small, rarely-renting slice that normal marketing misses. Reliable lead production is scarce — so it holds leverage over fleets full of idle cars.'}
  ],
  quiz:[
    {q:'A renter came in asking for a Ferrari, but yours is out. The most useful thing you know about this customer is…', c:['They will cancel if they can’t get the exact car','They are flexible — a Lamborghini that photographs as hard will save the deal','They want the best spec sheet','They are a car enthusiast'], a:1, e:'They rent the image, not the spec. Low, loud, aggressive, photogenic — the badge is interchangeable if the look lands.'},
    {q:'Why can independent operators serve 18–30 renters the big platforms turn away?', c:['They ignore the law','Personal-auto coverage is carrier-based, not the platforms’ age-gated program','They charge triple','They don’t verify anyone'], a:1, e:'The age walls belong to the platforms’ own insurance programs. Personal-policy coverage transfers by carrier rules — a real, legal gap independents can serve (full logic in Tier 2).'}
  ]},

{ id:'t0_emptyseat', sub:'T0', title:'Why no empire exists yet — and the seat that’s open',
  predict:'This is an industry of six-figure cars and four-figure daily rates, yet nobody has built a national brand — no dominant player anywhere past roughly $5–10M/year. The crown is sitting on the table. Guess why before you read.',
  concept:'<p>Every exotic-rental company is a <b>small business</b>. The owners are in the shop doing deals, not distant investors. Most came in as <b>car people first</b> — deep automotive networks, real passion, encyclopedic model knowledge, relationships all over the local scene. That relationship web is a genuine moat: it cannot be downloaded, and anyone entering ends up depending on it.</p>'
    +'<p><b>What the industry has little of is the operator half:</b> marketing systems, clean data, repeatable process, scale. The result is a landscape of well-connected, passionate companies running on referrals and gut feel. Some of the most established fleets run the entire operation on a spreadsheet. Marketing tactics are years out of date. And reliable data — utilization by car and city, real margins, seasonal demand — <b>basically does not exist</b>. Operators get their numbers by sitting down with each other and asking, because there is nothing to look up.</p>'
    +'<p><b>The gatekeeping paradox.</b> Everyone guards owner names, broker rates, processes, numbers. Individually that is smart defense (you saw why in the agency lesson). Collectively it means the industry never built a public knowledge base — every newcomer starts from zero, and insiders like it that way because it keeps the club small. Here is the twist: <b>the gatekeeping that protects each player one-by-one is exactly what has stopped anyone from scaling.</b> You cannot build an empire on information that cannot leave the room.</p>'
    +'<p><b>Who is forced to act, and who wins.</b> Nobody is forced to modernize — until someone does. The person who brings the missing half (modern marketing, systems, data, and now AI) steps onto a field where that skill set is rare and the incumbents cannot quickly copy it. The moat protecting the insiders is real; the seat next to them — the <b>operator seat</b> — is empty. Tier X is the whole playbook for sitting down in it.</p>'
    +'<p><i>[VERIFY the ~$5–10M ceiling figure — it is an operator estimate, not a published statistic.]</i></p>',
  example:'<p><b>Ex — no data to look up:</b> Want to know how often a Urus rents in your city per month? There is no report. The only source is another operator willing to tell you over coffee. That vacuum is the opportunity: whoever assembles clean data first holds something no incumbent has ever had.</p>',
  teach:'Explain why an industry full of expensive cars and high day-rates has no dominant national player — and what kind of person is positioned to change that.',
  cards:[
    {f:'What skill set does the industry mostly LACK?', b:'The operator half: marketing systems, clean data, repeatable process, scale. It is rich in car knowledge and relationships, thin on systems.'},
    {f:'What is the gatekeeping paradox?', b:'Guarding information protects each player individually but starves the whole industry of a knowledge base and data — which is exactly why nobody has scaled.'},
    {f:'Where is the open opportunity (“the empty seat”)?', b:'The operator seat: bring modern marketing, systems, data, and AI to a relationship-run industry that cannot quickly copy those skills.'}
  ],
  quiz:[
    {q:'The main reason no one has scaled exotic rental into a national brand is…', c:['The cars are too expensive to insure','Industry-wide gatekeeping starved it of shared data and systems','Demand is too small','Regulation bans it'], a:1, e:'Defensive secrecy that protects each operator individually prevents the data, systems, and scale an empire would require.'},
    {q:'The “empty seat” at the industry’s table is…', c:['A car expert','A wealthy investor','The operator: systems, data, marketing, AI','A celebrity'], a:2, e:'Insiders own cars and relationships; almost none bring the operator skill set. That is the open, hard-to-copy lane.'}
  ]},

{ id:'t0_twodoors', sub:'T0', title:'The two doors, the ladder, and where your credit file comes in',
  predict:'Two people want in. One has zero dollars. One has $100k of available credit. Do they walk through the same door — and which one can realistically start this week?',
  concept:'<p>There are exactly two ways in, and everything in this course serves one or both.</p>'
    +'<p><b>Door 1 — source leads (no money).</b> You find a renter and connect them to a car you do not control; the fleet pays you a spread. No license, no LLC on day one, no capital, no permission. Your first deal can happen this month by <b>walking in holding it</b>: “I have a verified renter who wants your Huracán this weekend — what’s your rate?” No fleet turns down a real deal because you are new. The lead <i>is</i> the introduction.</p>'
    +'<p><b>Door 2 — provide a vehicle (capital).</b> You put roughly $100k+ of car on the table, placed on consignment, and collect an owner’s split. The most passive seat — the fleet does the work — but it requires the asset.</p>'
    +'<p><b>Both doors lead to the same room.</b> The broker who keeps climbing ends up controlling cars; the owner who keeps hustling ends up sourcing demand. Control cars <i>and</i> produce renters and you are the agency. Your entry door is not your ceiling — it is just where the climb starts.</p>'
    +'<p><b>The bridge the free version skips.</b> The person with “no money” and the person with “$100k of car” are often the <i>same person</i>, a year or two apart. What carries you from one to the other is a <b>credit file</b> — and this is the piece nobody teaches. Owning an exotic starts with your credit file: you build the personal file, then a business-credit profile, then you finance the asset through the business without wrecking your personal standing. That is why REDLINE runs a second rail (Tiers C0–C4) right alongside the industry. And the fastest movers run <b>both doors at once</b> — a “dual-rail” where your own lead lands on your own car and you collect the broker spread <i>and</i> the owner split on one deal, with nobody diluting you.</p>'
    +'<p><b>Who is forced to act.</b> Nobody hands you a seat. But neither door needs anyone’s permission to start — the lead door needs a renter, the vehicle door needs an asset, and the credit rail needs only that you start your file today.</p>',
  example:'<p><b>Ex — same person, two years apart:</b> Month 1, broke: you source leads, bank the spreads into a business account, and start building business credit. Month 20: that seasoned business finances your first “attainable exotic,” you place it on consignment, point your own lead flow at it, and collect both ends. The doors were never separate — the credit file was the hallway between them.</p>',
  teach:'Explain the two doors into the industry, why they lead to the same place, and why a credit file is the bridge from the no-money door to the vehicle door.',
  cards:[
    {f:'What are the two doors into exotic rental?', b:'Door 1: source leads with no capital (broker a renter to a car you don’t control). Door 2: provide a vehicle (place ~$100k+ of car on consignment for a split).'},
    {f:'How do you get a fleet to work with you before you have a track record?', b:'Walk in holding a verified deal. The lead is the introduction — no fleet turns down a real qualified renter because you’re new.'},
    {f:'Why does REDLINE run a credit rail alongside the industry rail?', b:'Because the credit file is the bridge from the no-money door to the vehicle door — personal file → business credit → financing the exotic through the business.'}
  ],
  quiz:[
    {q:'A person with no money and no car can still start in exotic rental this week by…', c:['Buying a Lamborghini on credit','Sourcing a verified lead and walking it into a fleet for a spread','Opening a warehouse','Getting a broker license'], a:1, e:'The lead door needs no capital or permission. A qualified renter is the introduction — the fleet pays a spread for the deal.'},
    {q:'In REDLINE, the role of the credit file (Tiers C0–C4) is to…', c:['Replace the need for relationships','Bridge the no-money door to the vehicle door by financing the asset','Improve your Instagram','Lower insurance premiums'], a:1, e:'Owning an exotic starts with the file: build personal credit, then business credit, then finance the car through the business — the hallway between the two doors.'}
  ]},

// ═══════════════════════ CREDIT 0 · THE FILE FROM ZERO ═══════════════════════
{ id:'c0_whatis', sub:'C0', title:'What your credit file actually is — and why the exotic starts here',
  predict:'Two people both have a 720 credit score. One is approved to finance a $130k Aston Martin; the other is declined. Same score. What is the lender seeing that the single three-digit number hides?',
  concept:'<p>Strip the mystique off. <b>Credit is a lender’s bet on your reliability, priced.</b> Your <b>file</b> at each bureau is the evidence behind the bet: every account, its limit and balance, your payment history, public records, and recent inquiries. The three-digit <b>score</b> is just that file <i>compressed</i> into one risk number.</p>'
    +'<p><b>Why two identical scores aren’t identical bets.</b> A lender writing a $130k note does not stop at the number — it reads the file for three things the score blurs together: <b>depth</b> (how many accounts, how long they’ve been open), <b>capacity</b> (real high-limit revolving credit vs a couple of small cards), and <b>derogatories</b> (any lates, collections, or recent damage). Two 720s can differ wildly in thickness. The thin 720 — three young cards, no big limits — is a scarier bet on a six-figure car than the thick 720 with a decade of high-limit history, even though the app shows the same number.</p>'
    +'<p><b>Who is forced to act, and how it costs you.</b> The lender is <i>forced</i> to price risk on whatever it sees. A thin or scary file does not always mean “no” — more often it means a worse yes: higher rate, bigger down payment, a co-signer. On a $130k asset, one notch of rate is real money every month. So the file is not paperwork; it is your <b>terms</b>.</p>'
    +'<p><b>Why the exotic literally starts here.</b> Specialty exotic lenders (Tier C4) underwrite <i>both</i> the borrower and the asset. You cannot control the asset half yet — but the borrower half is a file you can start engineering today. Everything in C1–C4 is aimed at making that file a bet a lender wants to take.</p>'
    +'<p><b>The fraud wall, said once and plainly.</b> The moment you start reading about credit you will meet people selling “credit privacy numbers,” new SSN-like identifiers, or overnight “sweeps.” Using a CPN or a fabricated identity to apply for credit is <b>federal fraud</b> — bank fraud and identity fraud — full stop. You never need it, it collapses the instant a lender verifies, and it can end the exact future you are building. This course teaches only the legitimate machine that actually moves a real file. <i>Educational only — not financial or legal advice.</i></p>',
  example:'<p><b>Ex — the two 720s:</b> Applicant A: one 14-year-old card with a $40k limit, a paid-off auto loan, zero lates. Applicant B: three cards opened last year, $1,500 limits, one 30-day late. Same score, opposite bets. On a $130k Aston, the lender wants A — and gives B a worse rate or a no. The number was equal; the <i>files</i> were not.</p>',
  teach:'Explain to a friend why two people with the same credit score can get completely different answers on a car loan — using the words file, depth, capacity, and derogatory.',
  cards:[
    {f:'What is a credit score, relative to a credit file?', b:'A compression of the file into one risk number. Lenders on big loans read the underlying file — depth, capacity, derogatories — not just the number.'},
    {f:'What three things does a lender read past the score?', b:'Depth (how many/how old the accounts), capacity (real high-limit revolving credit), and derogatories (lates, collections, recent damage).'},
    {f:'Why does “owning an exotic start with your credit file”?', b:'Specialty exotic lenders underwrite the borrower AND the asset. The borrower half is a file you can engineer now — it sets your rate, down payment, and approval.'},
    {f:'The fraud wall in one line:', b:'CPNs / fake identifiers / overnight “sweeps” are federal fraud — never needed, they collapse on verification. Only the legitimate machine moves a real file.'}
  ],
  quiz:[
    {q:'Two applicants both score 720. Why might only one be approved for a $130k car?', c:['The score is wrong','The files differ — depth, capacity, and derogatories aren’t equal','One lied','Scores don’t matter for cars'], a:1, e:'On a big note the lender reads the file, not just the number. A thin young file is a scarier bet than a thick high-limit one at the same score.'},
    {q:'Someone offers to sell you a “CPN” to apply for credit under a fresh number. The correct move is…', c:['Use it only for small purchases','Refuse — it’s federal fraud that collapses on verification','Use it to build then switch back','Ask for a discount'], a:1, e:'CPNs / synthetic identifiers are bank and identity fraud. Never needed, and they destroy the future you’re building. Only legitimate file-building works.'}
  ]},

{ id:'c0_bureaus', sub:'C0', title:'The three bureaus, your reports, and the hidden files',
  predict:'You check your score in one app and it reads 700. A lender pulls you the same afternoon and quotes off a 660. Neither of you is lying. How can the same person have two different scores at the same moment?',
  concept:'<p>There is no single “credit report.” There are three national bureaus — <b>Equifax, Experian, and TransUnion</b> — and each holds its <i>own</i> file on you. Creditors are not required to report to all three, and many report to one or two, so the files diverge. Different file in, different score out. That is the whole answer to the 700-vs-660 mystery.</p>'
    +'<p><b>Pull all three, free.</b> The official free-report channel lets you see each bureau’s file directly <i>[VERIFY the current official free-report site and cadence]</i>. Read them for accuracy first — a surprising share contain errors, and an error on the bureau a lender happens to pull can cost you the deal.</p>'
    +'<p><b>The files most people never know exist.</b> Beyond the big three sit specialty consumer bureaus, and they matter here:</p>'
    +'<p>• <b>ChexSystems</b> — your banking history (overdrafts, closed accounts). A bad ChexSystems record can block you from opening the <i>business bank account</i> you will need in C3. Few people check it until they’re denied.<br>'
    +'• <b>LexisNexis</b> and <b>SageStream / Clarity</b> — specialty bureaus that auto and subprime lenders pull, holding data the big three may not. You have the right to request these too.</p>'
    +'<p><b>Who is forced to act, and where your leverage is.</b> The lender chooses which bureau and which score model to pull — so your job is to make <i>the file they’ll actually see</i> clean, not just the one your app shows. Auto and exotic lenders often have a bureau preference that varies by region and lender. Learn your target lender’s pull, and clean that file first.</p>'
    +'<p><b>Your rights are the tool.</b> The Fair Credit Reporting Act (FCRA) gives you the right to see these files and to <b>dispute</b> inaccurate items on all of them — the legitimate lever you’ll use in C2. <i>Educational only — not legal advice; confirm current rights and procedures.</i></p>',
  example:'<p><b>Ex — the bureau that quietly killed a deal:</b> Your file is clean at Experian and TransUnion, but an old collection still shows at Equifax. The dealer’s lender pulls Equifax. You walk in expecting your app’s 700 and get quoted like a 640. Same you — different file. Knowing which bureau they pull is half the game.</p>',
  teach:'Explain why one person can have three different credit scores at once, and name two “hidden” files (beyond Equifax/Experian/TransUnion) that can affect getting a bank account or a car loan.',
  cards:[
    {f:'Why do your scores differ across bureaus?', b:'Equifax, Experian, and TransUnion each hold their own file, and creditors don’t all report to all three. Different data in → different score out.'},
    {f:'What is ChexSystems and why does it matter to an operator?', b:'It’s your banking-history file. A bad record can block you from opening the business bank account you need to build business credit (C3).'},
    {f:'What are LexisNexis and SageStream/Clarity?', b:'Specialty consumer bureaus that auto/subprime lenders pull. You can request these files too — and clean the one your target lender uses.'}
  ],
  quiz:[
    {q:'The best explanation for a 700 app-score but a 660 lender-pull is…', c:['One is fake','Each bureau holds a different file and lenders pull different ones','The lender made an error','Your score dropped that day'], a:1, e:'Three bureaus, three files, multiple score models. Optimize the file the lender will actually pull, not just the app’s.'},
    {q:'Before building business credit, checking ChexSystems matters because…', c:['It sets your FICO','A bad banking record can block the business bank account you’ll need','It’s required by the IRS','It lists your car loans'], a:1, e:'ChexSystems is banking history. A negative record can stop you from opening the business account that the whole business-credit machine sits on.'}
  ]},

{ id:'c0_scores', sub:'C0', title:'FICO vs VantageScore — and the score an auto lender actually pulls',
  predict:'Your free app says 740. You sit at the exotic dealer’s finance desk and their screen shows 705. Which number is “real” — and which one just quietly cost or saved you thousands over the life of the loan?',
  concept:'<p>Two different companies make credit scores, and each makes many versions. Confusing them is how people walk into a finance office over-confident and walk out over-charged.</p>'
    +'<p><b>VantageScore</b> (3.0/4.0) is what most <i>free</i> apps show — Credit Karma and similar. It is a real score and a fine gauge of direction, but most lenders do not buy it. <b>FICO</b> is what most lenders actually purchase to make the decision — and FICO comes in versions tuned to the loan:</p>'
    +'<p>• <b>Mortgages</b> generally pull older versions — FICO 2, 4, and 5 — one per bureau.<br>'
    +'• <b>Most auto lenders</b> pull an <b>industry-enhanced FICO Auto Score</b> on a <b>250–900</b> scale (not the familiar 300–850) that weights your <i>auto</i> history more heavily.<br>'
    +'• <b>General/card decisions</b> lean on FICO 8, with FICO 9 and 10T newer and less universal.<br>'
    +'<i>[VERIFY exact versions and scale — score models and lender adoption change over time.]</i></p>'
    +'<p><b>Who is forced to act, and on which number.</b> Whoever is lending prices off <i>their</i> chosen model, pulled from <i>their</i> chosen bureau. So the “real” number is the one on the finance-desk screen — the app’s figure is a rough proxy, sometimes optimistically high.</p>'
    +'<p><b>The edge for the exotic.</b> Because the exotic/auto pull is usually a <b>FICO Auto Score</b>, your <i>auto</i> trade line matters more than a general score model would suggest. A single modest financed car, paid perfectly, can lift the exact number the exotic desk reads — which is why the credit-mix and auto-history moves in C1 are not generic “build credit” advice. They are aimed at the model that decides your rate on the car. <i>Educational only, never advice.</i></p>',
  example:'<p><b>Ex — the 35-point surprise:</b> App shows 740 (VantageScore). The dealer pulls a FICO Auto Score from a different bureau and sees 705. Nothing is wrong — different company, different version, different bureau, auto-weighted scale. If you had known, you might have cleaned that bureau or added a clean auto line first, and walked in matching their screen.</p>',
  teach:'Explain the difference between the free-app score and the number a car lender uses — and why a clean auto loan can matter more for an exotic than for a credit-card approval.',
  cards:[
    {f:'What score do most free apps show, and do lenders use it?', b:'VantageScore 3.0/4.0 — a real, useful gauge, but most lenders don’t buy it. They mostly buy FICO.'},
    {f:'What score do most auto lenders actually pull?', b:'An industry-enhanced FICO Auto Score, often on a 250–900 scale, weighting auto history more heavily. [VERIFY — models change.]'},
    {f:'Why does a clean auto trade line matter extra for an exotic?', b:'The exotic/auto pull is usually a FICO Auto Score. Auto history is weighted heavily, so one perfectly-paid car loan can lift the exact number the desk reads.'}
  ],
  quiz:[
    {q:'The number a car lender uses to set your rate is usually…', c:['Your Credit Karma VantageScore','A FICO Auto Score, often on a 250–900 auto-weighted scale','An average of all your scores','Whatever you tell them'], a:1, e:'Most auto lenders buy an industry-enhanced FICO Auto Score. The free-app VantageScore is a proxy, not the decision number.'},
    {q:'For someone targeting an exotic auto loan, a smart early credit move is…', c:['Open ten new cards fast','Establish/keep a clean auto trade line, since the Auto Score weights it heavily','Close all old accounts','Only use the free-app score'], a:1, e:'The exotic pull is auto-weighted, so a perfectly-paid auto line moves the exact model the desk reads — targeted, not generic.'}
  ]},

// ═══════════════════════ CREDIT 4 · FINANCING THE EXOTIC ═══════════════════════
// (Seeded ahead of C1–C3 because it answers a live question: how the multi-car
//  game actually works, and exactly where it becomes a felony.)
{ id:'c4_dti', sub:'C4', title:'DTI, PTI, and how people actually stack multiple cars',
  predict:'Someone already owes on three financed cars. How does he drive out in a fourth brand-new one the same week — before the fourth loan is paid down at all? What is each lender not seeing?',
  concept:'<p>Two ratios run every auto-approval. <b>DTI</b> (debt-to-income) is your total monthly debt payments ÷ gross monthly income. <b>PTI</b> (payment-to-income) is just the car payment ÷ income. Auto lenders decide on those two plus your score — a “manageable” DTI is roughly under ~45–50% for most, PTI often capped near ~15–20% <i>[VERIFY — varies by lender and credit tier]</i>. So the question “how do you keep getting approved while you still owe?” has four real mechanical answers.</p>'
    +'<p><b>1 — The reporting lag (the big one).</b> A new loan does not appear on your credit report the instant it funds; it posts on the lender’s <i>next monthly cycle</i>, up to ~30–45 days later. Apply to several lenders inside a tight window and each pulls a report where the <i>other</i> fresh loans have not posted yet — so your DTI looks lower to each than it truly is. That is the mechanism behind “two M cars at once.” It is legal <b>only if every application is truthful</b>; lenders now counter it with undisclosed-debt monitoring and a soft re-pull before funding, and it collapses the instant all those payments arrive together.</p>'
    +'<p><b>2 — Different desks, different appetite.</b> A captive lender (BMW Financial Services on an M car) pushes its own brand harder than a bank or credit union will. Two cars can clear two different underwriters who never compared notes.</p>'
    +'<p><b>3 — Lease vs finance.</b> A lease payment is lower — you pay depreciation plus rent, not the whole car — so it consumes less PTI per car, and more obligations fit on paper. Manufacturers push leases on M/AMG hard for exactly this reason.</p>'
    +'<p><b>4 — Rolling negative equity (“rolling his debts”).</b> When you owe more than a car is worth (upside-down), the dealer rolls that negative balance into the <i>next</i> car’s loan. You never settle the old debt — you stack it onto the new one. Repeat it and the balance snowballs. <b>That is exactly how a person reaches $290k across a handful of cars.</b> Each roll leaves you more upside-down and more fragile.</p>'
    +'<p><b>Who is forced to act — and the honest verdict.</b> The lender is forced to price risk off an incomplete, lagging snapshot; the borrower gaming the lag is borrowing against a picture he knows is stale. None of these four levers create income — they only rearrange timing and payments. Debt your income (or the car’s earnings) cannot service is a countdown, not a strategy. The operator’s real answer to “carry many cars” is not the lag shotgun — it is graduating to <b>business/commercial financing</b> (C3), where the business’s income and credit carry the vehicles and the cars <i>earn</i> on consignment to service the note. That is leverage that pays for itself; the lag game is leverage that eats you. <i>Educational only — not financial advice.</i></p>',
  example:'<p><b>Ex — the snowball:</b> Car 1: owe $60k, worth $45k → roll $15k negative equity into Car 2 ($70k) = $85k owed on a $55k car → roll $30k into Car 3 ($90k) = $120k owed. Three trades, no cash down, and the debt has outrun every car. Stack a few more and you are at $290k with nothing that could sell for close to it.</p>',
  teach:'Explain how the credit-reporting lag lets someone get two approvals at once, and why rolling negative equity makes total debt snowball instead of shrink.',
  cards:[
    {f:'DTI vs PTI', b:'DTI = all monthly debt payments ÷ gross income. PTI = just the car payment ÷ income. Auto lenders decide on both plus your score.'},
    {f:'Why can you get two car approvals in the same week?', b:'The credit-reporting lag: a new loan takes up to ~30–45 days to post, so each lender pulls a report missing the other fresh loans. Legal only if every app is truthful.'},
    {f:'What does “rolling negative equity” do to your debt?', b:'It stacks the upside-down balance of the old car onto the new loan. It snowballs — each roll leaves you more upside-down. It is how debt balloons to six figures.'},
    {f:'The operator’s legitimate way to carry many cars?', b:'Graduate to business/commercial financing (C3) where the business income/credit carries the vehicles, and the cars earn on consignment to service the note.'}
  ],
  quiz:[
    {q:'The main mechanical reason someone can get two new car loans in one week is…', c:['Lenders don’t check credit','The reporting lag — new loans take weeks to post, so each lender sees an incomplete file','It’s illegal and they got lucky','High income only'], a:1, e:'Funded loans post on the next monthly cycle. Apply in a tight window and each lender misses the other fresh debt — legal only if the applications are truthful.'},
    {q:'Rolling negative equity across trades causes total debt to…', c:['Shrink each time','Stay flat','Snowball — the old upside-down balance stacks onto each new loan','Disappear at trade-in'], a:2, e:'The negative balance is added to the next loan, so you get more upside-down every trade. It is how a stack reaches $290k.'},
    {q:'The four stacking levers (lag, captive desks, leasing, rolling equity) all share one limit:', c:['They raise your score','They create new income','They only rearrange timing and payments — none add income to service the debt','They are all illegal'], a:2, e:'They move debt around; they do not fund it. Debt your income or the car’s earnings can’t service is a countdown.'}
  ]},

{ id:'c4_fraudline', sub:'C4', title:'Manufacturing DTI: the felony line, and why it ends the operator',
  predict:'Ken quit his job and still got approved for two brand-new M cars. Only two things could make that happen — one is legal, one is a federal crime. What are they, and which one is the trap that ends a business?',
  concept:'<p>A jobless applicant gets a “yes” exactly two ways, and you must be able to tell them apart instantly.</p>'
    +'<p><b>Path A — legal.</b> He truthfully stated <i>other</i> real resources: business income, investment or rental income, documented cash reserves, or a co-signer. A lender can honestly approve on those. No job is not the same as no income, and stating real income is never the crime.</p>'
    +'<p><b>Path B — fraud.</b> He stated a job or income he no longer had, inflated the number, or produced fake pay stubs or a fake employer to “manufacture” a passing DTI. <b>That is loan-application fraud</b> — state auto-lending fraud statutes, and federal <b>bank fraud (18 U.S.C. §1344)</b> when a federally insured lender is involved. Fabricated income, a fake verification line, claiming employment you quit — all of it. Manufacturing DTI by fabrication is not a life hack; it is a felony on a document you signed.</p>'
    +'<p><b>The line sits right next to a legal move.</b> The reporting-lag shotgun from the last lesson is legal <i>if every application is truthful</i>, and fraud the instant you misstate income — or run it as a deliberate scheme to load debt you never intend to service (a “bust-out”). Same keystrokes; <b>intent and truthfulness</b> decide which side of a prison wall you are on.</p>'
    +'<p><b>Why this is disqualifying for YOU, not merely risky.</b> The entire REDLINE thesis rests on three assets a fraud flag destroys. <b>(1) Your credit file</b> — the thing all of C0–C4 exists to build — takes a default, repo, charge-off, or fraud marker, and the specialty exotic lenders in C4, who underwrite the <i>borrower</i>, slam shut. <b>(2) Your insurability</b> — commercial exotic underwriters (Tier 4) run financial and background checks; a fraud in your history is exactly what makes them decline the policy your business cannot operate a single day without. <b>(3) Your reputation</b> — in a small, talkative industry (Tier 7), fleets and owners broadcast bad actors across a metro in days, and a financing-fraud story travels the same road. The fraud path does not just risk jail; it <b>forecloses the business you are trying to build.</b></p>'
    +'<p><b>The discipline that is the actual edge.</b> Leverage into cars only when three things are all true: the debt is <i>truthfully</i> underwritten; the cars <i>earn</i> enough (consignment/rental) to service it; and you have moved the risk into a <i>business built to carry it</i>. Ken — jobless, manufactured DTI, $290k upside-down — is not the blueprint. He is the cautionary tale this whole course is engineered to keep you from becoming. This lesson exists so you can <b>recognize</b> these tactics and never sign your name to one, and never be sold them by a “credit guru.” It will never teach you to execute them, because executing them ends you. <i>Educational only — not legal or financial advice.</i></p>',
  example:'<p><b>Ex — the fork:</b> Two identical applications from a man with no job. One lists $9k/month in verifiable LLC distributions and $80k in the bank — a clean, legal approval. The other lists a job he quit last month at $9k/month — the same “approval,” now a felony waiting for the first verification call or the first missed payment. The number on the page was identical; one built a future and one detonated it.</p>',
  teach:'Explain the two ways a jobless person can get a car approved, which one is a felony, and why that felony is fatal to an exotic-rental operator specifically.',
  cards:[
    {f:'The two ways a jobless applicant gets approved:', b:'A) Truthfully stating other real income/assets/co-signer — legal. B) Misstating income/employment to manufacture DTI — loan-application fraud (a felony).'},
    {f:'When does the reporting-lag shotgun become fraud?', b:'The instant you misstate income on an application, or run it as a scheme to load debt you never intend to service. Intent + truthfulness decide it.'},
    {f:'Why is financing fraud disqualifying for an operator, not just risky?', b:'It destroys the three assets the business needs: your credit file (lenders), your insurability (commercial underwriters), and your reputation (a talkative industry).'},
    {f:'The disciplined use of leverage:', b:'Borrow only when the debt is truthfully underwritten, the cars earn enough to service it, and the risk sits in a business built to carry it.'}
  ],
  quiz:[
    {q:'A person with no job gets approved for two M cars. The LEGAL version of that is…', c:['He faked pay stubs well','He truthfully stated other real income, assets, or a co-signer','He used the reporting lag to hide income','He used a CPN'], a:1, e:'No job is not no income. Truthfully stating business/investment income, reserves, or a co-signer is a legitimate approval. Fabricating income is the crime.'},
    {q:'“Manufacturing DTI” by stating income you don’t have is…', c:['A gray area','A smart hack','Loan-application fraud — state statutes and federal bank fraud','Only a problem if you miss payments'], a:2, e:'False income/employment on a credit application is fraud on a document you signed — a felony whether or not the payments are later made.'},
    {q:'For an exotic-rental operator, a financing-fraud flag is fatal mainly because it destroys…', c:['Only your credit score','Your credit file, your insurability, and your reputation at once','Nothing important','Your Instagram following'], a:1, e:'The business runs on lender approvals, commercial-insurance underwriting, and a spotless reputation — a fraud marker takes out all three.'}
  ]}

];

// ── TIER-GATE DRILL BANKS ─────────────────────────────────────
// Adaptive timed drills per tier. d:1 easy · 2 medium · 3 hard.
window.REDLINE_QBANK = {
  T0: [
    {q:'An exotic-rental “agency” primarily…', c:['Owns its entire fleet outright','Operates consigned cars owned by others and splits revenue','Only leases from manufacturers','Sells cars'], a:1, e:'Consignment is the model: owners fund the fleet, the operator runs and splits it.', d:1},
    {q:'The most guarded information in the industry is…', c:['Daily rates','The list of who owns the cars','Delivery zones','Instagram passwords'], a:1, e:'Owner lists are poachable — learn them and you can take a fleet’s inventory. Hence the secrecy.', d:2},
    {q:'“Survival math” for fleet size means…', c:['Bigger fleets look better online','With few cars, one in the shop wipes out a large share of revenue','More cars means lower insurance','Three cars is optimal'], a:1, e:'Scale spreads the risk of any single car being down; it is survival, not ego.', d:2},
    {q:'The core exotic-rental customer is best described as…', c:['The truly wealthy','Car enthusiasts','People who can’t OWN but can rent the image','Business travelers'], a:2, e:'The product is the image; the customer rents the look, not the spec.', d:1},
    {q:'A renter asked for a Ferrari but it’s booked. Your best play relies on the fact that…', c:['They’ll always wait','They’re flexible if the replacement photographs as hard','They only want that VIN','They want the cheapest car'], a:1, e:'They rent a look, not a badge — a comparable aggressive car saves the deal.', d:2},
    {q:'Independents can serve 18–30 renters the big platforms reject because…', c:['They skip verification','Coverage on personal auto policies is carrier-based, not the platforms’ age program','They break the law','They charge cash only'], a:1, e:'Age walls are the platforms’ insurance programs; personal-policy transfer follows carrier rules.', d:3},
    {q:'Why has no national exotic-rental empire emerged?', c:['No demand','Industry-wide gatekeeping starved it of data, systems, and scale','It’s illegal to scale','Cars are uninsurable'], a:1, e:'Defensive secrecy prevents the shared data and operator systems scaling requires.', d:2},
    {q:'The “empty seat” at the table is the…', c:['Investor','Car expert','Operator: systems, data, marketing, AI','Celebrity spokesperson'], a:2, e:'Insiders have cars and relationships; the operator skill set is rare and hard to copy.', d:2},
    {q:'Door 1 into the industry (no capital) is…', c:['Buying a supercar','Sourcing/brokering a renter to a car you don’t control','Opening a warehouse','Getting licensed'], a:1, e:'Lead sourcing needs no capital or permission; the lead is the introduction.', d:1},
    {q:'The clean way to approach a fleet with no track record is to…', c:['Ask for a job','Walk in holding a verified deal','Offer to buy a car','Post about them'], a:1, e:'A qualified renter is the strongest possible introduction — fleets don’t refuse real deals.', d:2},
    {q:'In REDLINE, the credit rail exists to…', c:['Replace relationships','Bridge the no-money door to the vehicle door via financing','Improve marketing','Cut insurance costs'], a:1, e:'Personal file → business credit → finance the asset: the hallway between the two doors.', d:2},
    {q:'The “dual-rail” advantage is…', c:['Owning two warehouses','Collecting the broker spread AND the owner split on your own deal','Renting only SUVs','Using two CRMs'], a:1, e:'Your lead on your car means you’re broker and owner at once — nobody dilutes you.', d:3}
  ],
  C0: [
    {q:'A credit score is best understood as…', c:['A random number','The credit file compressed into one risk number','Your net worth','Set by the government'], a:1, e:'Lenders on big loans read the underlying file, not just the compressed score.', d:1},
    {q:'Two identical 720 scores can be different bets because of differences in…', c:['Zip code','Depth, capacity, and derogatories in the file','Score app used','Hair color'], a:1, e:'A thin young file is a scarier bet than a thick high-limit one at the same number.', d:2},
    {q:'A “CPN” offered to apply for credit is…', c:['A smart hack','Federal fraud that collapses on verification','A business EIN','A second SSN the IRS issues'], a:1, e:'CPNs / synthetic identifiers are bank and identity fraud — never needed, always destructive.', d:1},
    {q:'You have a 700 in an app but a lender pulls 660. The reason is usually…', c:['Someone lied','Different bureau and score model','A glitch','Fraud on your file'], a:1, e:'Three bureaus, multiple models — optimize the file the lender actually pulls.', d:2},
    {q:'ChexSystems tracks…', c:['Your FICO','Your banking history (overdrafts, closed accounts)','Your car loans','Your rent'], a:1, e:'A bad ChexSystems record can block the business bank account business credit sits on.', d:2},
    {q:'Most free credit apps display…', c:['FICO Auto Score','VantageScore 3.0/4.0','FICO 2/4/5','The lender’s exact pull'], a:1, e:'VantageScore is a useful gauge but usually not what lenders buy.', d:1},
    {q:'Most auto lenders decide using…', c:['VantageScore','An industry-enhanced FICO Auto Score (often 250–900)','Your bank balance','A mortgage FICO'], a:1, e:'The auto pull weights auto history and uses a different scale than 300–850.', d:2},
    {q:'Because the exotic pull is auto-weighted, a high-value early move is…', c:['Closing old cards','Keeping a clean auto trade line','Maxing a card','Ignoring your score'], a:1, e:'A perfectly-paid auto line lifts the exact model the exotic desk reads.', d:2},
    {q:'The FCRA primarily gives you the right to…', c:['Erase accurate debts','See your files and dispute inaccurate items','Demand a 0% rate','Open unlimited accounts'], a:1, e:'It’s the legitimate lever: access and dispute of inaccuracies across bureaus.', d:2},
    {q:'“The real score” at the finance desk is…', c:['Your app’s number','The model and bureau the lender actually pulls','The highest of your three','Always 850'], a:1, e:'Whoever lends prices off their chosen model and bureau — that’s the number that sets terms.', d:3}
  ]
};

// ═══════════════════════ CREDIT 1 · THE FIVE LEVERS ═══════════════════════
window.REDLINE_CURRICULUM = window.REDLINE_CURRICULUM.concat([

{ id:'c1_payment', sub:'C1', title:'Lever 1 — payment history: the 35% you can never buy back',
  predict:'One 30-day late payment on an otherwise perfect file. How many points can it cost, and how long does it legally stay on the report — even after you pay it?',
  concept:'<p>FICO’s recipe is roughly: <b>payment history ~35%</b>, amounts owed ~30%, length ~15%, new credit ~10%, mix ~10% <i>[VERIFY — weights are approximate and vary by model]</i>. Payment history is the heaviest lever, and it is asymmetric: years of on-time payments build slowly, while a single reported late detonates instantly.</p>'
    +'<p><b>The mechanics.</b> A payment only becomes reportable when it is a full <b>30 days past due</b> — a payment five days late costs you a fee, not your file. From there the ladder is 30 → 60 → 90 → 120 → charge-off, each rung worse. A fresh 30-day late on a clean file can cost roughly 60–100+ points <i>[VERIFY — depends on the file]</i>, and the mark stays for <b>seven years from the date of delinquency</b>, paying it does not remove it — it only stops the bleeding and marks it paid.</p>'
    +'<p><b>Who is forced to act.</b> The furnisher (your card issuer or lender) reports monthly; the bureaus record what they send. So your leverage is entirely <i>before</i> day 30: autopay for at least the minimum on every account, with any manual payments on top. The minimum-autopay + manual-extra pattern means a distracted month can cost you interest, never a late.</p>'
    +'<p><b>The one legitimate undo: the goodwill letter.</b> If you have a long clean history and one slip, write the creditor and ask them to delete the late as a courtesy — furnishers may adjust their own reporting. It works often enough to always be worth the stamp, especially with banks you hold other accounts with. What is never legitimate: disputing an accurate late as “not mine” — that is lying to a bureau, and it is the exact line the credit-sweep scammers in C2 push you across.</p>'
    +'<p><b>Why this lever matters double here.</b> The FICO Auto Score (C0) weights your <i>auto</i> payment lines heavily. One perfect car loan is quiet gold; one 30-day late on a car loan is exactly the wrong place to have one when an exotic lender reads your file.</p>',
  example:'<p><b>Ex:</b> Two files, both 740. File A misses one card payment by 32 days on a $40 balance. It reports; A drops to ~660 <i>[VERIFY range]</i> and carries the mark for 7 years. The $40 was never the point — the reported <i>event</i> was. Autopay would have cost nothing.</p>',
  teach:'Explain why a $40 late can cost 80 points and 7 years, why paying it doesn’t erase it, and the one honest way it sometimes comes off.',
  cards:[
    {f:'When does a late payment hit your credit file?', b:'Only at 30+ days past due. Before day 30 it costs fees, not the file. Then 30/60/90/120 → charge-off, each rung worse, 7 years from delinquency.'},
    {f:'The autopay pattern that makes lates impossible:', b:'Autopay the minimum on every account, pay extra manually. A distracted month costs interest, never a reported late.'},
    {f:'What is a goodwill letter?', b:'A request that the creditor delete an accurate late as a courtesy after a long clean history. Legitimate, often works, always worth trying.'},
    {f:'Why payment history matters extra for the exotic:', b:'FICO Auto weights auto lines heavily — a perfect car loan is gold; a late on one is poison at the exotic desk.'}
  ],
  quiz:[
    {q:'A payment 20 days past due…', c:['Reports as a 30-day late','Costs a fee but does not hit the credit file','Stays 7 years','Halves your score'], a:1, e:'Reporting starts at a full 30 days past due. Before that it is a fee problem, not a file problem.'},
    {q:'Paying off a reported 30-day late…', c:['Removes it from the file','Marks it paid but it stays up to 7 years from delinquency','Resets your score','Converts it to a soft inquiry'], a:1, e:'Payment stops the bleeding; the event remains. Only goodwill deletion (or an actual inaccuracy dispute) removes it.'},
    {q:'The legitimate move after one late on a long clean file is…', c:['Dispute it as “not mine”','A goodwill letter asking the furnisher to delete it','A credit sweep','Closing the account'], a:1, e:'Goodwill requests are honest and often work. Disputing accurate data as fraud is the scam line — never cross it.'}
  ]},

{ id:'c1_utilization', sub:'C1', title:'Lever 2 — utilization and the statement-date trick (AZEO)',
  predict:'You pay every card in full, every month, never a day late — yet your score sags. What number is the bureau seeing that you think you’ve already handled?',
  concept:'<p><b>Utilization</b> — your revolving balances as a percentage of limits — is ~30% of the score, and it has a property most people never learn: <b>it has no memory.</b> It is a snapshot, recalculated from whatever your cards most recently reported. Fix it this month and the score responds this month.</p>'
    +'<p><b>The trick is WHEN cards report.</b> Almost every issuer reports your balance on the <b>statement closing date</b>, not the due date. Pay in full by the due date and the bureau still saw the balance that closed on the statement. Heavy card users look maxed to the bureau while never paying a cent of interest. The move: <b>pay down before the statement closes</b>, so the number that reports is the number you chose.</p>'
    +'<p><b>AZEO — All Zero Except One.</b> For a maximum-polish snapshot (before an important application): let every card report <b>$0</b> except one, which reports a small balance (1–9% of its limit). All-zero everywhere can actually score slightly worse than one tiny balance <i>[VERIFY — model behavior]</i>; AZEO is the tuned position. Both <i>overall</i> utilization and <i>per-card</i> utilization matter — one maxed card hurts even when the overall number is low.</p>'
    +'<p><b>The other side of the fraction.</b> Utilization = balance ÷ limit, so raising limits lowers utilization at the same spending. Ask for <b>credit-limit increases</b> every 6–12 months — many issuers do them with a soft pull (ask which before agreeing) <i>[VERIFY per issuer]</i>. And never casually close old cards: you lose their limit from the denominator and eventually their age (C1’s next lever). Downgrade (product-change) an annual-fee card instead of closing it.</p>'
    +'<p><b>Who benefits.</b> This is the fastest legitimate lever in all of credit: no new accounts, no inquiries, no risk — just timing and denominators. Thirty days before any car application, AZEO the file. It is the closest thing to a free score boost that exists.</p>',
  example:'<p><b>Ex:</b> $8k limit, $6k monthly spend, always paid in full by the due date → reports 75% utilization, score sags. Same spend, paid to $300 two days before the statement closes → reports 3.7%. Nothing about the spending changed. The reported <i>snapshot</i> did.</p>',
  teach:'Explain why paying in full by the due date can still report high utilization, and walk through AZEO before a car application.',
  cards:[
    {f:'When do cards report your balance?', b:'At the statement closing date, not the due date. Pay BEFORE the close and you choose the number the bureau sees.'},
    {f:'AZEO', b:'All Zero Except One: every card reports $0 except one small 1–9% balance. The tuned pre-application snapshot; all-zero can score slightly worse.'},
    {f:'Why never casually close an old card?', b:'You lose its limit from the utilization denominator now and its age later. Product-change annual-fee cards instead.'},
    {f:'Why is utilization the fastest lever?', b:'It has no memory — it is recalculated from the latest snapshot. Fix it this cycle, score responds this cycle.'}
  ],
  quiz:[
    {q:'Utilization is calculated from…', c:['Your balance on the due date','The balance that reported at statement close','Your annual spending','Your income'], a:1, e:'Issuers report at statement close. Paying in full afterward doesn’t change what was already reported.'},
    {q:'The AZEO position before a big application is…', c:['All cards at $0','All cards under 30%','All at $0 except one reporting 1–9%','One card maxed'], a:2, e:'One small reported balance with the rest at zero is the tuned snapshot; all-zero can score slightly worse.'},
    {q:'Which action LOWERS utilization without touching spending?', c:['Closing an old card','A credit-limit increase','A new hard inquiry','Carrying a balance'], a:1, e:'Utilization = balance ÷ limit. Raising the denominator (CLIs, often soft-pull) lowers the percentage at the same spend.'}
  ]},

{ id:'c1_age_inq', sub:'C1', title:'Lever 3 & 4 — age of file, and the truth about inquiries',
  predict:'Rate-shopping five auto lenders in one week: five hard pulls. Does your score take five hits — or one? And what determines the answer?',
  concept:'<p><b>Age (~15%).</b> The models read your <b>average age of accounts</b> and the age of your <b>oldest</b> account. Consequences: your first real card is sacred — keep it open forever, even in a drawer with one small recurring charge. Every new account drops your average (the “thin and young” problem from C0), which is why the file you want for the exotic is <i>started early and opened calmly</i>. Time is the one input money cannot buy — which is exactly why the authorized-user lever in the next lesson is so valuable.</p>'
    +'<p><b>New credit / inquiries (~10%).</b> A <b>hard inquiry</b> (you applied for credit) costs a few points and matters for about a year <i>[VERIFY]</i>; a <b>soft inquiry</b> (you checked yourself, a pre-qualification, a CLI soft pull) costs nothing. The part almost nobody knows: <b>rate-shopping dedup</b>. Multiple auto (or mortgage) inquiries inside a shopping window count as <b>one</b> inquiry for scoring — the window is 14 to 45 days depending on model version <i>[VERIFY]</i>. So you shop your exotic loan hard, in a tight window, without shredding the file. Spraying applications across three months is what shreds it.</p>'
    +'<p><b>The gotcha inside the gotcha.</b> Dedup applies to <i>scoring</i>, but lenders still <i>see</i> every inquiry listed — and a manual underwriter reading six card applications last month reads hunger. Card inquiries never dedup. Keep card applications far away from the months before an auto application.</p>'
    +'<p><b>Who is forced to act.</b> Nobody — this lever is pure discipline and calendar. The winning pattern for your situation: open what the file needs <i>early</i> (C2’s builder accounts), then go quiet, let age accrue, AZEO the snapshot, and concentrate your auto shopping into one two-week strike when you are actually buying.</p>',
  example:'<p><b>Ex:</b> Buyer A applies to 5 auto lenders across January–March: five scored inquiries, each application looking more desperate. Buyer B pre-stages the file, then applies to 6 lenders in 10 days: scored as ONE inquiry, and every lender saw the same clean snapshot. Same shopping, opposite files.</p>',
  teach:'Explain average age vs oldest account, hard vs soft pulls, and how the auto rate-shopping window lets you apply to many lenders for the price of one.',
  cards:[
    {f:'The two age numbers that matter:', b:'Average age of accounts and oldest account. First card stays open forever; new accounts drop the average.'},
    {f:'Hard vs soft inquiry:', b:'Hard = you applied; small cost, ~1 year of relevance. Soft = self-checks, pre-quals, most CLIs; zero cost.'},
    {f:'Auto rate-shopping dedup:', b:'Multiple auto inquiries inside a 14–45 day window [VERIFY] score as ONE. Concentrate your loan shopping into a tight strike.'},
    {f:'What never dedups:', b:'Card inquiries. Keep card applications months away from an auto application — underwriters read recent hunger.'}
  ],
  quiz:[
    {q:'Six auto-loan hard pulls within a tight shopping window score as…', c:['Six inquiries','Three','One','Zero'], a:2, e:'Auto/mortgage rate-shopping dedups to a single scored inquiry inside the window (14–45 days by model [VERIFY]).'},
    {q:'Your oldest card has an annual fee you hate. The file-smart move is…', c:['Close it','Product-change (downgrade) it to a no-fee card','Max it out','Ignore the fee'], a:1, e:'Closing sacrifices age and limit. A product change keeps the account’s history alive without the fee.'},
    {q:'Which is a SOFT inquiry?', c:['An auto loan application','A new card application','Checking your own score / a pre-qualification','A mortgage application'], a:2, e:'Self-checks and pre-quals don’t touch the score. Applications are hard pulls.'}
  ]},

{ id:'c1_mix_au', sub:'C1', title:'Lever 5 — credit mix, and the authorized-user accelerant',
  predict:'A parent adds their kid to a 20-year-old credit card. The kid never touches the card — never even knows the number. What happens to the kid’s credit file, and why is a version of this sold on the internet for $1,500?',
  concept:'<p><b>Mix (~10%).</b> Models like seeing you handle both <b>revolving</b> credit (cards) and <b>installment</b> credit (loans with fixed payments). A file of only cards is missing a food group. The clean fixes: a small <b>credit-builder loan</b> (C2), or in time a modest financed vehicle — which double-dips, because it also feeds the auto history the FICO Auto Score weights (C0). You never borrow <i>just</i> for mix; you sequence borrowing you already need so the mix builds itself.</p>'
    +'<p><b>The authorized-user (AU) accelerant.</b> When you are added as an AU on someone’s card, many issuers report that card’s <b>entire history</b> — its age and its utilization — onto <i>your</i> file <i>[VERIFY per issuer]</i>. A parent’s or partner’s decade-old, high-limit, low-balance card can graft years of age onto a young file overnight. You don’t need the physical card; you need the reporting. This is the single fastest legitimate accelerant for a thin file, and it is exactly how families quietly hand their kids a head start.</p>'
    +'<p><b>Now the wall.</b> Because AUs work, a market exists selling AU spots on strangers’ aged cards — “<b>tradeline buying</b>.” Understand it precisely: renting a stranger’s history to dress your file for a lender misrepresents the risk you actually are. It lives in a gray-to-black zone — banks treat it as file-dressing, scoring models actively discount suspected rented AUs <i>[VERIFY]</i>, and in loan contexts it can support a fraud theory when combined with anything else dishonest. It is also money burned: the boost is discounted, temporary, and removable at the seller’s whim. <b>Family and real partners, yes. Rented strangers, no.</b> An operator whose whole business runs on lender and insurer trust (C4·fraudline) does not rent a costume.</p>'
    +'<p><b>Who benefits.</b> You, twice: honestly-added AU lines age your file while your own accounts season, and the mix fills in from borrowing you genuinely needed. Slow is smooth; smooth is fast.</p>',
  example:'<p><b>Ex:</b> A 19-year-old with one 6-month-old secured card is added to a parent’s 15-year card ($20k limit, always paid). Next cycle, the file’s average age jumps years and utilization drops. Same person, no new debt — the file simply now tells a longer true story: this household pays.</p>',
  teach:'Explain what an authorized user inherits, why family AU additions are legitimate while purchased tradelines are a trap, and how mix builds itself from borrowing you already needed.',
  cards:[
    {f:'What does an AU inherit?', b:'Many issuers report the card’s full age and utilization onto the AU’s file [VERIFY per issuer]. No card use required — the reporting is the gift.'},
    {f:'Family AU vs bought tradeline:', b:'Family/partner AU = legitimate accelerant. Renting a stranger’s line = file-dressing: discounted by models, removable, and fraud-adjacent in loan contexts.'},
    {f:'The clean mix fixes:', b:'A small credit-builder loan, and in time a modest financed vehicle — which also feeds the auto history the exotic desk’s score weights.'},
    {f:'Rule for borrowing and mix:', b:'Never borrow JUST for mix. Sequence borrowing you already need so mix and auto history build themselves.'}
  ],
  quiz:[
    {q:'Being added as an AU on a parent’s 15-year-old card typically…', c:['Does nothing without using the card','Grafts the card’s age and utilization onto your file','Requires a hard pull','Is illegal'], a:1, e:'Many issuers report the full line to the AU’s file — age and utilization included. The reporting, not the plastic, is the point.'},
    {q:'Buying an AU spot on a stranger’s aged card is…', c:['A standard industry practice lenders respect','File-dressing: discounted by models, removable, fraud-adjacent in loan contexts','Guaranteed +100 points','Free'], a:1, e:'Rented history misrepresents your risk. Models discount it, sellers can drop you, and near a loan it feeds a fraud theory.'},
    {q:'The right way to add installment mix to a card-only file is…', c:['Borrow anything immediately','A credit-builder loan or a genuinely-needed modest auto loan','A payday loan','Buy a tradeline'], a:1, e:'Small builder loans and needed auto borrowing add mix and auto history honestly — never borrow purely for mix.'}
  ]},

{ id:'c1_playbook', sub:'C1', title:'The 30-day file tune-up — sequencing all five levers',
  predict:'You have 30 days before you want a lender pulling your file. Put the five levers in order: what do you do in week 1, and what do you absolutely NOT do in week 4?',
  concept:'<p>Levers are only useful in sequence. Here is the tune-up, ordered by mechanism:</p>'
    +'<p><b>Week 1 — see the battlefield.</b> Pull all three reports (C0). List every account, limit, statement close date, and any derogatory. Dispute genuine inaccuracies immediately (C2 covers the machine) — disputes take ~30 days, so they must start now. Check which bureau your target lenders pull if you can learn it.</p>'
    +'<p><b>Week 1–2 — set the denominators.</b> Request soft-pull credit-limit increases on existing cards. Add a genuine family AU line if one exists — it needs a cycle or two to report. Set autopay minimums everywhere.</p>'
    +'<p><b>Week 2–3 — stage the snapshot.</b> Map every card’s statement close date. Pay balances down BEFORE closes so the file reports AZEO: all zeros, one card at 1–9%. This is pure timing; it costs nothing.</p>'
    +'<p><b>Week 4 — go quiet and strike.</b> No new card applications — none. New accounts in the pre-approval window drop your average age, add non-deduping inquiries, and read as hunger to a human underwriter. Then, when you shop the loan itself, concentrate every auto application into one tight window so they score as a single inquiry.</p>'
    +'<p><b>What this cannot do.</b> It cannot erase a real late, age a young file, or manufacture income — those are C2 (repair), time, and honesty respectively. The tune-up polishes what is true. That is the whole point: the file a lender sees on day 30 is the truest, best-lit version of the file you actually have — nothing rented, nothing faked, nothing that unravels in underwriting.</p>',
  example:'<p><b>Ex:</b> Day 1: reports pulled, one wrong-balance collection disputed, CLIs requested. Day 10: AU line from a parent added. Day 18–25: paydowns land before each statement close; AZEO set. Day 30: file reports 4% utilization, zero new inquiries, dispute resolved. The lender’s pull catches the file at its honest best — and the auto shopping that follows dedups to one inquiry.</p>',
  teach:'Walk someone through the 30-day tune-up week by week, and name the two things it can never do.',
  cards:[
    {f:'Week 1 of the tune-up:', b:'Pull all 3 reports, list accounts/limits/close dates, dispute real inaccuracies immediately (they need ~30 days), request soft-pull CLIs.'},
    {f:'Weeks 2–3:', b:'Add a genuine family AU if available; map statement closes; pay down before closes to stage AZEO.'},
    {f:'Week 4 rule:', b:'Zero new card applications. Then concentrate all auto-loan applications into one tight window so they score as one inquiry.'},
    {f:'What the tune-up cannot do:', b:'Erase true lates (that’s repair/goodwill), age a young file (time/AU), or manufacture income (never). It polishes what is true.'}
  ],
  quiz:[
    {q:'Disputes go FIRST in the 30-day tune-up because…', c:['They’re the most fun','Reinvestigation takes ~30 days, so late-started disputes won’t resolve before the pull','They raise limits','They’re free'], a:1, e:'The FCRA reinvestigation window is ~30 days — start on day 1 or the fix misses your application.'},
    {q:'The week-4 mistake that undoes the tune-up is…', c:['Paying a card early','Opening a shiny new card','Checking your own score','Setting autopay'], a:1, e:'A new account right before the pull drops average age, adds a non-deduping inquiry, and reads as hunger.'},
    {q:'The tune-up’s honest limit is that it…', c:['Only works once a year','Polishes the true file — it cannot erase real lates, add years, or invent income','Requires a credit repair company','Needs 90 days minimum'], a:1, e:'Everything in it is timing and truth. Erasing real history or faking income is either repair, time, or fraud — not tuning.'}
  ]}

]);

window.REDLINE_QBANK.C1 = [
  {q:'The heaviest FICO lever is…', c:['Utilization','Payment history','Credit mix','Inquiries'], a:1, e:'~35% [VERIFY]. One reported late outweighs almost anything else you can do that month.', d:1},
  {q:'A late becomes reportable at…', c:['1 day past due','15 days','30 days past due','Only at charge-off'], a:2, e:'Fees start immediately; the FILE is only hit at 30+ days past due.', d:1},
  {q:'Utilization is computed from…', c:['Due-date balance','Statement-close reported balance','Annual spend','Average daily balance'], a:1, e:'Cards report at statement close — pay before the close to choose the reported number.', d:2},
  {q:'AZEO means…', c:['All cards at zero','All zero except one at 1–9%','Alternate zeros each month','All cards equal'], a:1, e:'One small reported balance, rest at zero — the tuned pre-application snapshot.', d:2},
  {q:'Closing your oldest card…', c:['Helps your score','Loses its limit now and its age later','Is neutral','Removes lates'], a:1, e:'Denominator shrinks immediately; age eventually. Product-change instead.', d:2},
  {q:'Auto rate-shopping inquiries inside the dedup window score as…', c:['One each','Half each','One total','Soft pulls'], a:2, e:'The 14–45 day auto/mortgage window [VERIFY] collapses them to one scored inquiry.', d:2},
  {q:'Card application inquiries…', c:['Also dedup','Never dedup — and underwriters read recent card hunger','Are soft','Expire in a week'], a:1, e:'Dedup is for auto/mortgage shopping. Card pulls all count and all show.', d:3},
  {q:'A family AU addition typically grafts…', c:['Nothing without card use','The line’s age and utilization onto your file','Only the limit','A hard inquiry'], a:1, e:'Many issuers report the full line to the AU [VERIFY] — the reporting is the gift.', d:2},
  {q:'Buying a stranger’s tradeline is…', c:['A lender-respected strategy','File-dressing: discounted, removable, fraud-adjacent near loans','Permanent','Reported as installment'], a:1, e:'Rented history misrepresents risk; models discount it and it can feed a fraud theory.', d:3},
  {q:'The correct final week before a planned auto pull is…', c:['Open two cards for mix','Go quiet — no new applications; then shop the loan in one tight window','Max a card','Close old accounts'], a:1, e:'Quiet file + concentrated auto shopping = best snapshot, one scored inquiry.', d:2}
];

// ═══════════════════════ CREDIT 2 · BUILD & REPAIR ═══════════════════════
window.REDLINE_CURRICULUM = window.REDLINE_CURRICULUM.concat([

{ id:'c2_thin', sub:'C2', title:'Building from nothing — secured cards, builder loans, and graduation',
  predict:'A lender wants to see credit history before giving you credit — but you can’t build history without credit. Every broke 18-year-old faces this loop. What are the two products built specifically to break it?',
  concept:'<p>The cold-start loop breaks with two products where <b>you</b> carry the risk, so approval is nearly automatic:</p>'
    +'<p><b>1 — The secured card.</b> You deposit, say, $300; that deposit becomes your limit. To the bureaus it reports exactly like any credit card — which is the entire point. Use it for one small recurring bill, AZEO it like a real card, never carry interest. After 6–12 months of clean reporting, good issuers <b>graduate</b> you: deposit back, card becomes unsecured, and — critically — <b>the account’s age survives</b>. Pick an issuer known to graduate and to report to all three bureaus <i>[VERIFY current issuers]</i>; a secured card that can’t graduate is a dead end with a deposit.</p>'
    +'<p><b>2 — The credit-builder loan (CBL).</b> A loan in reverse: the “borrowed” money sits locked in savings while you make the payments; at the end you get the money and the file got 12–24 months of perfect <b>installment</b> history — the mix lever (C1) for people no bank would loan to yet.</p>'
    +'<p><b>The starter file blueprint.</b> Within the first year you want: 1–2 revolving lines (secured → graduated), one small installment (CBL), a genuine family AU if available (C1), everything on autopay, utilization staged low. That is a file that turns 2 years old looking exactly like what an auto underwriter wants to meet. Rent and utility reporting services can add data to some scores <i>[VERIFY which models use them]</i> — marginal help, never harmful, worth doing if free.</p>'
    +'<p><b>Who pays, who benefits.</b> You fund your own risk (deposit, locked savings), the issuer earns float and a future customer, and the bureaus get a record that is TRUE — which is why this path cannot be taken from you. Contrast: every shortcut in the next lessons is someone selling you a record that is false.</p>',
  example:'<p><b>Ex:</b> Month 1: $300 secured card + $25/mo CBL + added as AU on mom’s 12-year card. Months 2–12: one Netflix charge on the card, autopay, AZEO. Month 12: card graduates, deposit back. The file is now: 3 tradelines, 1 installment, aged AU, zero derogatories — a real foundation, built from $325 of your own money.</p>',
  teach:'Explain how a secured card and a credit-builder loan break the no-history loop, and what the 12-month starter file should look like.',
  cards:[
    {f:'How does a secured card work?', b:'Your deposit = your limit; reports like any card. After 6–12 clean months good issuers graduate it — deposit back, age survives.'},
    {f:'What is a credit-builder loan?', b:'A loan in reverse: money locked in savings while you pay; you get the cash at the end plus 12–24 months of perfect installment history.'},
    {f:'The 12-month starter file:', b:'1–2 revolvers (secured→graduated), one CBL, genuine family AU, autopay everywhere, low staged utilization.'},
    {f:'Why can’t this path be taken from you?', b:'Because the record is TRUE. You funded your own risk and paid on time — no seller, no rented history, nothing to unravel.'}
  ],
  quiz:[
    {q:'A secured card’s limit comes from…', c:['The issuer’s risk model','Your own refundable deposit','Your income','Your parents'], a:1, e:'You collateralize yourself — which is why approval is nearly automatic and reporting is identical to a normal card.'},
    {q:'A credit-builder loan pays out the money…', c:['Up front','Never','At the end, after the payments built the history','Only if you default'], a:2, e:'The funds sit locked while payments report; you get cash + installment history at the end.'},
    {q:'The thing to confirm BEFORE opening a secured card is…', c:['Its color','That it graduates and reports to all three bureaus','That it has a lounge benefit','Its APR only'], a:1, e:'No graduation path or partial bureau reporting makes it a dead end with a deposit attached.'}
  ]},

{ id:'c2_disputes', sub:'C2', title:'The dispute machine — FCRA 611, furnishers, and the 609 myth',
  predict:'Roughly one in five credit reports contains an error [VERIFY]. The law gives you a specific machine for removing them. Who is legally forced to act when you dispute — and what happens if they miss their deadline?',
  concept:'<p>The FCRA gives you a real enforcement machine. Learn the actual gears, because the internet sells fake ones.</p>'
    +'<p><b>The reinvestigation (FCRA §611).</b> Dispute an item with a bureau and the bureau is <b>forced to reinvestigate, generally within 30 days</b> <i>[VERIFY]</i>. It forwards your dispute to the <b>furnisher</b> (the creditor who reported it), who must verify the data. Anything that cannot be verified in the window <b>must be deleted</b>. That is the entire legitimate mechanism: inaccurate, incomplete, or unverifiable items come off; accurate items do not.</p>'
    +'<p><b>How to run it like an operator.</b> Dispute in writing with documents, item by item, specific — “this account shows a 60-day late in March; attached statement shows the March payment posted on the 3rd.” Vague blanket disputes get flagged frivolous. You can also dispute <b>directly with the furnisher</b> (§623 duties) — running both tracks is legitimate. Keep every letter and response; if a bureau stonewalls, escalate with a CFPB complaint, which forces a documented response <i>[VERIFY process]</i>. Certified mail beats web forms for a paper trail on serious items.</p>'
    +'<p><b>The “609 letter” myth.</b> Section 609 is your right to <i>see</i> your file — a disclosure right. The internet sells “609 letters” claiming a magic phrase forces deletion of accurate items. No such mechanism exists. Deletion flows from §611 unverifiability, not from citing a section number like a spell. Anyone selling you a template “that banks fear” is selling paper.</p>'
    +'<p><b>Two honest levers beyond disputes.</b> <b>Goodwill</b> (C1) for true lates after clean history. <b>Pay-for-delete</b> for collections: some collectors will delete the tradeline in exchange for payment — always negotiated <b>in writing before</b> you pay, never on a phone promise <i>[VERIFY enforceability varies]</i>. And one dating rule that catches real abuse: negatives run <b>seven years from the original delinquency date</b> — collectors sometimes “re-age” debts to look fresher. Re-aging is illegal; check the DOFD on every collection and dispute any that moved.</p>',
  example:'<p><b>Ex:</b> A $180 collection you don’t recognize. Letter to the bureau: “not mine, verify or delete,” with ID. Furnisher can’t verify within 30 days → deleted by law. Second item: a true 30-day late. No dispute exists for truth — that one gets a goodwill letter instead. Knowing which tool fits which item IS the skill.</p>',
  teach:'Explain what §611 actually forces, why the “609 letter” is a myth, and when goodwill vs pay-for-delete is the right tool.',
  cards:[
    {f:'What does an FCRA §611 dispute force?', b:'Bureau must reinvestigate (~30 days) with the furnisher; anything unverifiable in the window must be deleted. Accurate items stay.'},
    {f:'The 609 myth:', b:'§609 is a disclosure right. No magic letter deletes accurate data — deletion flows from §611 unverifiability, not a cited section.'},
    {f:'Pay-for-delete rule:', b:'Collections only, negotiated IN WRITING before paying. A phone promise is worth nothing.'},
    {f:'Re-aging:', b:'Negatives run 7 years from ORIGINAL delinquency. Collectors shifting the date to look fresh are breaking the law — check DOFD, dispute it.'}
  ],
  quiz:[
    {q:'An item the furnisher cannot verify within the reinvestigation window…', c:['Stays with a note','Must be deleted','Becomes an inquiry','Doubles'], a:1, e:'That is the teeth of §611: verify it or delete it.'},
    {q:'The “609 letter” sold online…', c:['Forces deletion of accurate items','Is a myth — 609 is just your right to see the file','Is required before any dispute','Works only with a notary'], a:1, e:'No section number deletes true data. §611 unverifiability is the only deletion mechanism.'},
    {q:'A collector offers deletion if you pay, on the phone. You…', c:['Pay immediately','Get the pay-for-delete in writing BEFORE paying','Record it and pay','Dispute it as not yours'], a:1, e:'Written agreement first. And never dispute a debt you know is yours as “not mine” — that’s the fraud line.'}
  ]},

{ id:'c2_scams', sub:'C2', title:'The repair industry — CROA, sweeps, and every scam aimed at you',
  predict:'A “credit repair specialist” promises a 750 in 90 days, wants $1,500 upfront, and hints at a “legal loophole the bureaus hate.” Federal law makes at least two things about that sentence illegal. Which two?',
  concept:'<p>Because credit desperation is evergreen, an industry farms it. Here is the whole taxonomy, so nothing on this list ever costs you a dollar or a felony:</p>'
    +'<p><b>The law that frames it: CROA.</b> The Credit Repair Organizations Act makes it illegal for a repair company to <b>charge before services are performed</b>, to <b>promise specific results</b>, or to advise you to lie. Read that again: the upfront fee and the guaranteed score in the pitch above are both federal violations before any work happens. Also true under CROA’s logic: <b>everything a legitimate repair company can do, you can do yourself, free</b> — it is the §611 machine from the last lesson, in an envelope with a markup.</p>'
    +'<p><b>The “sweep.”</b> The service disputes <i>everything</i> on your file as identity theft — accurate accounts included, sometimes with a fake police report. Items vanish for 30 days (while “unverified”), the seller screenshots the clean report, collects, and the accurate items return on verification. You paid for a screenshot, and a fabricated identity-theft claim with a false report is a crime with your name on it, not theirs.</p>'
    +'<p><b>CPNs, again, from this angle.</b> The C0 wall, now with the sales script: “a fresh profile number, legal under privacy law.” It is a stolen or synthetic SSN. Applying with it is identity fraud plus bank fraud. There is no privacy-law exception. Walk.</p>'
    +'<p><b>Tradeline rental</b> (C1’s wall) and <b>“primaries for sale”</b> — fabricated aged accounts sold as if you’d held them for years — same family: purchased false history, discounted by models, catastrophic in underwriting.</p>'
    +'<p><b>The tell that beats every future variant.</b> Legitimate credit work is <b>slow, documented, and boring</b>: disputes of real errors, goodwill letters, paydown timing, secured builders, age. Every scam sells <b>speed and secrecy</b>. Anyone selling fast + secret is selling you either paper or prison. As the operator this course is building, your file is a business asset with a 20-year horizon — nobody rents you a shortcut worth that.</p>',
  example:'<p><b>Ex:</b> The $1,500 “sweep” file: day 10, collections gone, screenshot sent, balance due. Day 45: every accurate item re-verified and returned — now with a fraud-alert flag and a police report in your name that YOU didn’t file. Score: unchanged. Legal exposure: yours. The specialist: gone.</p>',
  teach:'List the scams — sweep, CPN, rented tradelines, fake primaries — and the one structural tell (fast + secret) that identifies every future variant.',
  cards:[
    {f:'What does CROA make illegal?', b:'Upfront fees before service, promised specific results, and advising you to lie. The classic pitch violates federal law in its first sentence.'},
    {f:'How does a “sweep” work?', b:'Dispute EVERYTHING as identity theft (often w/ fake police report); items vanish ~30 days pending verification; seller screenshots, collects; truth returns. The false report is a crime — yours.'},
    {f:'The universal scam tell:', b:'Legit credit work is slow, documented, boring. Scams sell speed + secrecy. Fast + secret = paper or prison.'},
    {f:'Can a repair company do anything you can’t?', b:'No. The legitimate machine is §611 disputes + goodwill + time — available to you free.'}
  ],
  quiz:[
    {q:'Under CROA, a repair company charging $1,500 before doing anything is…', c:['Standard practice','A federal violation','Fine if disclosed','Legal in most states'], a:1, e:'CROA bans advance fees and promised results outright.'},
    {q:'A “sweep” produces a clean report because…', c:['Items were deleted forever','Accurate items vanish only while pending reinvestigation, then return','The bureaus lost the data','It uses section 609'], a:1, e:'The 30-day unverified window is the illusion the screenshot sells. Truth re-verifies and returns.'},
    {q:'The structural tell of every credit scam is…', c:['High price','Speed and secrecy','Bad grammar','Out-of-state address'], a:1, e:'Real file work is slow and documented. Anything fast and secret is selling paper or prison.'}
  ]},

{ id:'c2_rebuild', sub:'C2', title:'The comeback arc — collections, charge-offs, repos, and real timelines',
  predict:'A charged-off card, a repo from two years ago, one collection. Is this file dead for the exotic path — or does it have a comeback arc, and roughly how long is it?',
  concept:'<p>Damaged is not dead. Every derogatory has a mechanical afterlife, and knowing it turns panic into a schedule.</p>'
    +'<p><b>Collections.</b> First move is never payment — it is <b>validation</b>: under the FDCPA you can demand the collector prove the debt (amount, chain of ownership), and collection activity pauses until they respond <i>[VERIFY window]</i>. Debts get sold with garbage records; some die right here. If valid: negotiate — settlements routinely land below face value, pay-for-delete in writing where possible. Two traps: a partial payment can restart the <b>statute of limitations</b> on being sued in some states <i>[VERIFY your state]</i> — never pay “a little to show good faith” on old debt without knowing your SOL; and remember the clock: 7 years from original delinquency regardless of sale or payment. Also useful: newer models (FICO 9/10, VantageScore 4) ignore <b>paid</b> collections — but auto desks often run older models, so a paid collection may still show teeth at the car desk <i>[VERIFY]</i>.</p>'
    +'<p><b>Charge-offs.</b> The creditor wrote the debt off their books — <b>you still owe it</b>, and it may be sold to a collector (never pay twice: validate who owns it). Settling shows “settled for less,” which beats “unpaid” but not “paid in full.” It ages out on the same 7-year clock.</p>'
    +'<p><b>Repossession.</b> The car goes back, gets auctioned, and the gap between what you owed and what auction fetched — the <b>deficiency</b> — follows you as a debt, often with fees. A repo on the file is the single ugliest item to an AUTO lender specifically (C0: the Auto Score weights auto history). The comeback: settle the deficiency, then rebuild auto history deliberately — a small financed vehicle, perfect for 24 months, is the counter-evidence the auto model wants to see.</p>'
    +'<p><b>Bankruptcy.</b> Chapter 7 reports up to 10 years, 13 up to 7 <i>[VERIFY]</i>. It is the reset button with the longest shadow — and even it has an arc: secured builders often approve soon after discharge because you can’t re-file for years.</p>'
    +'<p><b>The arc itself.</b> Scores weight <b>recency</b> hard: a 5-year-old repo with 3 clean recent years reads completely differently than last month’s. The comeback schedule is: stop new damage → validate/settle strategically → rebuild with C2 builders + C1 levers → let recency do the heavy lift. Real files go damaged → lender-ready in 18–36 months. That is not hype; it is just how the recency math works. The exotic timeline survives a bad chapter — it does not survive giving up, or a shortcut felony.</p>',
  example:'<p><b>Ex:</b> Repo (2 yrs ago, $6k deficiency), 1 collection ($400), 1 charge-off ($900). Sequence: validate the collection (dies — no records); settle the deficiency at 40% in writing; settle the charge-off; open secured card + CBL; 24 clean months + a small financed commuter. At month 30 the file reads: old damage, deep clean recent history, real auto line. That file gets auto approvals — at a rate premium at first, then normally.</p>',
  teach:'Explain validation-before-payment, the deficiency on a repo, why recency is the comeback’s engine, and a realistic 18–36 month arc.',
  cards:[
    {f:'First move on any collection:', b:'FDCPA validation — make them prove the debt and its ownership. Some die right there; never pay an unvalidated debt.'},
    {f:'The partial-payment trap:', b:'A small payment can restart the lawsuit statute of limitations in some states [VERIFY]. Know your SOL before paying anything on old debt.'},
    {f:'What follows a repossession?', b:'The deficiency: loan balance minus auction price, plus fees — a debt that follows you. Settle it, then rebuild auto history deliberately.'},
    {f:'The comeback’s engine:', b:'Recency. Scores discount old damage buried under 2–3 clean years. Damaged → lender-ready is a real 18–36 month arc.'}
  ],
  quiz:[
    {q:'Before paying any collection, you…', c:['Pay a little to show good faith','Demand FDCPA validation','Call and promise','Dispute it as not yours regardless of truth'], a:1, e:'Validate first — records may not exist. “Good faith” partial payments can restart your SOL, and false disputes are the fraud line.'},
    {q:'After a repo sells at auction below the loan balance, the borrower owes…', c:['Nothing','The deficiency plus fees','Only the fees','The full original loan'], a:1, e:'The gap survives the car. Settling it is step one of the auto-history comeback.'},
    {q:'A 5-year-old repo under 3 recent clean years reads to the model as…', c:['Identical to a fresh repo','Heavily discounted — recency dominates','An automatic denial forever','A soft inquiry'], a:1, e:'Recency weighting is the comeback’s engine — old damage under new clean history loses most of its teeth.'}
  ]}

]);

window.REDLINE_QBANK.C2 = [
  {q:'A secured card reports to the bureaus as…', c:['A special starter product','An ordinary credit card','An installment loan','It doesn’t report'], a:1, e:'That’s its whole purpose — identical reporting, you fund the risk.', d:1},
  {q:'A credit-builder loan releases the money…', c:['Immediately','At the end, after payments built history','Never','Only on default'], a:1, e:'Locked savings + reported payments = installment history for the unbankable.', d:1},
  {q:'FCRA §611 forces deletion of items that are…', c:['Old','Embarrassing','Unverifiable within the reinvestigation window','Small'], a:2, e:'Verify-or-delete is the machine. Accurate items survive.', d:2},
  {q:'Section 609 actually gives you…', c:['Magic deletion words','The right to see your file','Free scores','A lawyer'], a:1, e:'Disclosure, not deletion. The “609 letter” industry sells paper.', d:2},
  {q:'Pay-for-delete must be…', c:['Verbal','In writing before payment','Notarized','Filed with the CFPB'], a:1, e:'A phone promise from a collector is worth exactly nothing.', d:2},
  {q:'Re-aging a debt means…', c:['Legally extending the SOL','Illegally shifting the delinquency date to look fresher','Paying it late','Selling it'], a:1, e:'The 7-year clock runs from ORIGINAL delinquency. Moved dates get disputed.', d:3},
  {q:'CROA makes illegal:', c:['All credit repair','Upfront fees and promised results','Goodwill letters','Disputes'], a:1, e:'Advance fees, guaranteed outcomes, and advising lies — the classic pitch is illegal twice.', d:2},
  {q:'A “sweep” works by…', c:['Deleting items forever','Disputing everything as ID theft so accurate items vanish temporarily','Bribing bureaus','Using §609'], a:1, e:'The 30-day pending window is the screenshot illusion; the false report is your crime.', d:2},
  {q:'A partial payment on an old collection can…', c:['Delete it','Restart the lawsuit statute of limitations in some states','Raise your score','End the 7-year clock'], a:1, e:'Know your state’s SOL before any payment on old debt [VERIFY].', d:3},
  {q:'The comeback arc’s engine is…', c:['Luck','Recency — clean recent years discount old damage','Paying everything at face','A new CPN'], a:1, e:'18–36 months of clean, well-built history moves damaged files to lender-ready.', d:2}
];

// ═══════════════════════ CREDIT 3 · THE BUSINESS CREDIT MACHINE ═══════════════════════
window.REDLINE_CURRICULUM = window.REDLINE_CURRICULUM.concat([

{ id:'c3_why', sub:'C3', title:'Two files, one you — why the business gets its own credit life',
  predict:'Your LLC can build a credit profile that never touches your personal report. True — and yet almost every early business loan still runs through YOUR file anyway. How are both of those things true at once?',
  concept:'<p>The moment you form a company, a second credit life becomes possible: a profile keyed to your <b>EIN</b> (the business’s tax ID) instead of your SSN, tracked by <b>business bureaus</b> — Dun &amp; Bradstreet, Experian Business, Equifax Business — under different scores and different rules. Business tradelines generally do not appear on your consumer report, business inquiries don’t hit your FICO, and business utilization doesn’t touch your AZEO snapshot. A leveraged fleet on the business side can coexist with a pristine personal file. That separation is the entire strategic point.</p>'
    +'<p><b>Now the adult truth: the PG.</b> Early business credit almost always requires a <b>personal guarantee</b> — you co-sign your own company. The lender files on the business, prices on the business, but if the business fails, you personally owe it. The PG is not a defeat; it is the standard toll while the business proves itself. What you are building toward is the day revenue, seasoning, and payment history let you sign <b>without</b> one. Vendor lines and some corporate cards get there fast; real bank money takes years.</p>'
    +'<p><b>The wall, stated precisely.</b> The internet sells “EIN-only funding, no PG, hide from your SSN.” Some of it is real (revenue-underwritten corporate cards); much of it is a scam or worse. The felony version: lying on an application — saying no PG exists when it does, inflating revenue, or using the EIN to dodge a personal file you’ve wrecked <i>while misrepresenting who controls the company</i>. Lenders ask who owns the business; answering falsely is loan fraud (C4’s fraudline, business edition). The separation is a structure, not a disguise.</p>'
    +'<p><b>Why this is THE bridge for you.</b> Recall the plan (T0): the exotic gets financed by the <b>business</b>, serviced by <b>consignment revenue</b>, insured under a <b>commercial policy</b> (T4). Every one of those needs a business that looks real to institutions — which is exactly what the next lesson builds, brick by brick.</p>',
  example:'<p><b>Ex:</b> Operator with a 690 personal file and a 2-year-old LLC with real revenue: the LLC holds $40k of vendor lines and a fleet card, none of it on her consumer report. Her personal utilization: 3%. When the exotic lender pulls both files — and for a six-figure note they will — each file is clean on its own terms. Two files, both true, both strong. That is the design.</p>',
  teach:'Explain EIN-vs-SSN credit separation, why the PG still exists early, and where the felony line sits in “EIN-only funding” pitches.',
  cards:[
    {f:'What separates business credit from personal?', b:'Keyed to the EIN, tracked by D&B / Experian Biz / Equifax Biz; business tradelines, inquiries, and utilization generally never touch the consumer file.'},
    {f:'The personal guarantee (PG):', b:'You co-sign your own company — standard toll early. The goal is earning no-PG credit via revenue, seasoning, and payment history.'},
    {f:'The business-credit felony line:', b:'Misrepresenting ownership, revenue, or PG status on applications is loan fraud. Separation is a structure, not a disguise for a wrecked file.'},
    {f:'Why business credit is the exotic bridge:', b:'Business-financed car + consignment revenue servicing the note + commercial policy — every piece needs an institution-grade business profile.'}
  ],
  quiz:[
    {q:'Business tradelines generally appear on…', c:['Your consumer report','The business bureaus only (D&B, Experian Biz, Equifax Biz)','Both always','Neither'], a:1, e:'That separation is the strategy: fleet leverage on the EIN, pristine personal file on the SSN.'},
    {q:'Early business credit almost always still involves…', c:['No paperwork','A personal guarantee','Collateral only','A co-op'], a:1, e:'The PG is the standard toll until revenue and seasoning earn no-PG terms.'},
    {q:'“Use your EIN so your bad SSN never comes up” becomes fraud when…', c:['You form an LLC','You misrepresent ownership, revenue, or PG status to a lender','You get a D-U-N-S number','You open a business account'], a:1, e:'Structure is legal; lying on the application about who/what is behind the company is loan fraud.'}
  ]},

{ id:'c3_fundability', sub:'C3', title:'Fundability — building a business that underwriting believes',
  predict:'Two LLCs apply for the same credit line. Same revenue, same owner score. One sails through, one gets flagged for manual review and dies. The difference is six boring details. Name three.',
  concept:'<p>Before any business bureau scores you, lender systems run a colder check: <b>does this business look real?</b> The industry word is <b>fundability</b>, and it is a checklist — automated underwriting literally pattern-matches these fields, and mismatches quietly kill applications that never get a human explanation.</p>'
    +'<p><b>The foundation, in build order:</b></p>'
    +'<p>• <b>Entity + EIN.</b> An LLC (or corp) filed with the state, in good standing, with its own tax ID. Sole-prop-with-a-DBA builds almost nothing.<br>'
    +'• <b>NAP consistency.</b> Name, Address, Phone — <i>identical everywhere</i>: state filing, IRS, bank, licenses, website, directories. “APEX Exotics LLC” vs “Apex Exotic Rentals” across records is exactly the mismatch that flags review.<br>'
    +'• <b>A real address and a real phone.</b> A commercial or virtual-office address (many lenders discount residential and reject PO boxes <i>[VERIFY policies]</i>) and a dedicated business line listed in directory assistance — a data point some underwriting still checks <i>[VERIFY]</i>.<br>'
    +'• <b>Domain + professional email.</b> A site describing a real operation, email at the domain — gmail-run companies read as hobbies.<br>'
    +'• <b>Licenses</b> your city/state requires for the activity.<br>'
    +'• <b>The business bank account</b> — the load-bearing one. Every dollar of revenue flows through it: it creates the bank rating and the statements that every future lender reads, it seasons, and it is the account ChexSystems gatekeeps (C0 — check yours before you apply). Cash deals that skip the account are invisible to underwriting; you are literally paying yourself to look smaller.<br>'
    +'• <b>Time.</b> Time-in-business is a hard filter (many products want 6–24 months <i>[VERIFY]</i>). The clock starts at formation — form the entity EARLY, even while you are still only brokering leads (T7).</p>'
    +'<p><b>The wall here: shelf corps.</b> “Buy a 5-year-old aged corporation, instant time-in-business.” Presenting a purchased shell’s age as your operating history misrepresents exactly what the filter exists to measure — and lenders detect ownership changes on aged entities <i>[VERIFY]</i>. It rhymes with the CPN: purchased time instead of purchased identity. Same answer: the clock only counts if it is really yours, so start it now.</p>',
  example:'<p><b>Ex:</b> Day one as a lead-sourcer (T7, no car, no money): file the LLC ($~100 in many states), EIN in 15 minutes free, business checking the same week, domain + email that day, phone line listed. Total under a few hundred dollars — and 18 months later, when the fleet plan needs institutional credit, “time in business: 18 months, consistent NAP, seasoned account” is already true. The foundation was never expensive; it was just early.</p>',
  teach:'Walk the fundability checklist in build order and explain why NAP mismatches and skipped bank deposits quietly kill applications.',
  cards:[
    {f:'NAP consistency:', b:'Name, Address, Phone identical across state, IRS, bank, licenses, site, directories. Mismatches flag automated review — the silent application killer.'},
    {f:'The load-bearing fundability item:', b:'The business bank account with ALL revenue flowing through it — creates the bank rating, statements, and seasoning every lender reads.'},
    {f:'Why form the entity before you “need” it:', b:'Time-in-business is a hard filter (6–24 months for many products). The clock starts at formation — start it while still brokering.'},
    {f:'Shelf/aged corps:', b:'Purchased time-in-business presented as your history = misrepresentation, and ownership changes are detectable. The clock only counts if it’s really yours.'}
  ],
  quiz:[
    {q:'The quiet killer of automated business-credit applications is…', c:['High revenue','NAP mismatches across records','Too many employees','A .net domain'], a:1, e:'Underwriting pattern-matches name/address/phone across sources; inconsistency reads as unreal or fraudulent.'},
    {q:'Taking rental payments in cash outside the business account…', c:['Is smart tax planning','Makes revenue invisible to underwriting — you look smaller than you are','Builds PAYDEX','Is required'], a:1, e:'(And skimming it from taxes is its own crime.) Statements ARE the proof of revenue; unbanked dollars don’t exist to lenders.'},
    {q:'Buying an “aged corporation” for instant time-in-business is…', c:['A standard accelerant','Misrepresentation of operating history that lenders can detect','Free','Required in CA'], a:1, e:'Purchased time rhymes with purchased identity. Form YOUR entity early instead — the honest clock is free.'}
  ]},

{ id:'c3_paydex', sub:'C3', title:'D-U-N-S, PAYDEX, and how business scores actually move',
  predict:'On personal credit, paying on the due date is perfect. On the main business score, paying on the due date gets you an 80 — and the top score requires something that sounds impossible. What?',
  concept:'<p>Business scoring runs on different physics. Learn the three systems lenders actually look at:</p>'
    +'<p><b>Dun &amp; Bradstreet.</b> First step: get a <b>D-U-N-S number</b> — D&B’s business identifier. It is <b>free</b> directly from D&B (they will aggressively upsell “credit builder” packages; you don’t need them to have a file) <i>[VERIFY current process]</i>. D&B’s headline score is <b>PAYDEX</b> (0–100), and here is the physics shift: it is <b>dollar-weighted payment timing</b>. Paying exactly on terms ≈ <b>80</b>. Scores above 80 come from paying <b>EARLY</b> — 90 ≈ ~20 days early, 100 ≈ ~30 days early <i>[VERIFY mapping]</i>. On the personal side, early payment buys nothing; on PAYDEX, early payment IS the score. And PAYDEX needs data: roughly <b>3+ reporting tradelines</b> before it even generates <i>[VERIFY]</i>.</p>'
    +'<p><b>Experian Business (Intelliscore)</b> and <b>Equifax Business</b> — blended risk scores using payment data, utilization-like factors, firmographics, public records. You don’t register for these the way you do a D-U-N-S; they build from whatever your creditors report. Which creditor reports to which bureau varies — serious builders pick vendors partly BY where they report <i>[VERIFY per vendor]</i>.</p>'
    +'<p><b>What moves the needles, ranked:</b> (1) <b>tradelines that actually report</b> — many business creditors report nowhere, building you nothing (always confirm before opening); (2) <b>early payment</b>, dollar-weighted — pay the big invoices early first; (3) <b>clean public records</b> — a lien or judgment craters business scores harder than personal ones; (4) <b>utilization discipline</b> on revolving business lines; (5) <b>firmographics</b> — the fundability fields from last lesson feeding the same models.</p>'
    +'<p><b>Who is watching.</b> Not just lenders: landlords for your warehouse (T4’s second obstacle), insurers pricing your commercial policy, fleets deciding if your operation is real, and vendors setting your terms. The business file is your institutional reputation — the operator-world twin of the broker reputation in T7.</p>',
  example:'<p><b>Ex:</b> Two LLCs, both pay every invoice on terms. LLC A: PAYDEX 80. LLC B routes the same invoices but pays its two largest 25 days early: PAYDEX ~95 [VERIFY]. Same cash, different timing — because the score measures WHEN, weighted by HOW MUCH. B gets better terms from the next vendor, compounding.</p>',
  teach:'Explain what a D-U-N-S is, why PAYDEX 80 = on-time and above-80 = early, and the ranked list of what actually moves business scores.',
  cards:[
    {f:'D-U-N-S number:', b:'D&B’s free business identifier — the key to having a D&B file at all. Ignore the paid “builder” upsells; the number itself costs nothing.'},
    {f:'PAYDEX physics:', b:'Dollar-weighted payment timing. On-terms ≈ 80; ~20 days early ≈ 90; ~30 days early ≈ 100 [VERIFY]. Early payment IS the score.'},
    {f:'Why some business credit builds nothing:', b:'Many business creditors report to no bureau. Confirm reporting (and to WHICH bureau) before opening any line.'},
    {f:'Who reads the business file besides lenders:', b:'Warehouse landlords, commercial insurers, vendors setting terms, fleets judging if you’re real — it’s your institutional reputation.'}
  ],
  quiz:[
    {q:'A PAYDEX of 80 means the business…', c:['Pays late','Pays exactly on terms','Pays 30 days early','Has no file'], a:1, e:'On-time is the 80 baseline; only EARLY payment climbs above it — dollar-weighted.'},
    {q:'The fastest way to waste a year of business-credit building is…', c:['Paying early','Opening lines that report to no bureau','Getting a D-U-N-S','Using net-30 terms'], a:1, e:'Non-reporting tradelines build nothing. Confirm reporting before opening — pick vendors BY where they report.'},
    {q:'To maximize PAYDEX with limited cash, pay early on…', c:['The smallest invoices','The largest invoices','Random invoices','Only new vendors'], a:1, e:'PAYDEX is dollar-weighted — early payment on big invoices moves it most.'}
  ]},

{ id:'c3_tiers', sub:'C3', title:'The vendor ladder — net-30s to fleet cards to real bank money',
  predict:'No bank will touch a 3-month-old LLC. Yet that same LLC can be approved for real credit this week — from a different kind of creditor entirely. Who extends credit to businesses banks won’t touch, and why?',
  concept:'<p>Business credit builds up a ladder, each rung underwritten more strictly than the last. The genius of the bottom rung: <b>vendors</b> extend credit banks never would, because their risk is inventory margin, not cash — and they want you as a customer.</p>'
    +'<p><b>Tier 1 — reporting net-30 vendors (month 0+).</b> Suppliers (office, shipping, industrial goods) who invoice on <b>net-30 terms</b> and — the only part that matters — <b>report the tradeline</b> to business bureaus. The classic starter names change over time <i>[VERIFY current reporting vendors]</i>; the recipe doesn’t: open 3–5, place small orders for things you genuinely use (shipping supplies, printer stock, detailing consumables), pay <b>early</b>, and in 60–90 days you have a PAYDEX and a file where none existed.</p>'
    +'<p><b>Tier 2 — store and fleet credit (month 3–6+).</b> Retail/store business accounts (hardware, office chains) and — gold for this industry — <b>fleet fuel cards</b> (WEX/Fuelman-family <i>[VERIFY]</i>): fuel for delivery runs and repositioning drives, per-vehicle controls, and a reporting tradeline that fits your actual operating costs. Often still PG-light at modest limits <i>[VERIFY]</i>.</p>'
    +'<p><b>Tier 3 — business credit cards (month 6–12+, or day 1 with a strong personal file).</b> Major-bank business cards underwrite YOU (PG + your FICO — the C1 file earns its keep here). Quirk worth knowing: most majors report business-card activity to business bureaus and only report to your <i>consumer</i> file if the account goes derogatory <i>[VERIFY per issuer]</i> — day-to-day business utilization stays off your personal snapshot. Newer <b>corporate charge cards</b> underwrite the business’s revenue/balance instead of you — real no-PG credit, gated on real deposits <i>[VERIFY providers]</i>.</p>'
    +'<p><b>Tier 4 — bank lines and term loans (year 2+).</b> Real bank money wants the full fundability file: ~2 years seasoning, revenue through the account, financials, often a banking relationship first — open the operating account where you’ll later want the line; bankers lend to balances they can see. This rung is where fleet-scale borrowing (and the C4 vehicle note without brutal terms) lives.</p>'
    +'<p><b>Discipline that makes the ladder real:</b> only buy what you actually use (a tradeline is not a shopping excuse); every line on autopay-early; track which bureau each line feeds; and never inflate revenue on an application — the ladder is a resume, and one lie on a resume is the C3 fraud line.</p>',
  example:'<p><b>Ex — the 12-month build:</b> Months 0–2: LLC + bank account + 4 reporting net-30s (shipping + detailing supplies), paid 20 days early. Month 3: PAYDEX generates ~86. Months 4–6: fleet fuel card + a store account. Month 8: major business card (PG, personal 720 doing the work). Month 12: file shows 7 reporting tradelines, clean, early-paying — and the year-2 banker conversation is now a real one.</p>',
  teach:'Explain why vendors extend credit banks won’t, walk the four tiers in order with rough timing, and name the discipline rules that keep the ladder honest.',
  cards:[
    {f:'Tier 1 and why it works:', b:'Reporting net-30 vendors — their risk is inventory margin, not cash, so they approve young LLCs. 3–5 lines, real purchases, paid early → a file exists in 60–90 days.'},
    {f:'Tier 2 for THIS industry:', b:'Fleet fuel cards (WEX-family [VERIFY]) — fuel for deliveries/repositioning, per-vehicle controls, and a reporting tradeline that matches your real costs.'},
    {f:'Tier 3 quirk:', b:'Major business cards: PG + your FICO to approve, but activity usually reports to business bureaus only unless derogatory [VERIFY] — utilization stays off your personal file.'},
    {f:'Tier 4 reality:', b:'Bank LOCs/term loans want ~2 years seasoning, revenue through the account, financials, and a relationship — bank where you’ll want the line.'}
  ],
  quiz:[
    {q:'Vendors approve 3-month-old LLCs because…', c:['They’re careless','Their risk is inventory margin and they want the customer','The law requires it','They never report'], a:1, e:'A net-30 supplier risks product, not cash — so they extend credit banks won’t, and the reporting ones build your file.'},
    {q:'The only Tier-1 vendors worth opening are ones that…', c:['Have the best catalog','Report the tradeline to business bureaus','Offer net-60','Waive shipping'], a:1, e:'Non-reporting lines build nothing (C3·paydex). Confirm reporting first — it’s the entire point.'},
    {q:'Most major business credit cards touch your PERSONAL report…', c:['Every month','Only if the account goes derogatory [VERIFY]','Never under any condition','Only utilization'], a:1, e:'Day-to-day business spend stays off the consumer file; blow it up and it lands on you — the PG made sure of that.'}
  ]},

{ id:'c3_lending', sub:'C3', title:'Business auto financing — the note that buys the fleet car',
  predict:'The business borrows; the cars earn; the note services itself. For a lender to sign up for that story on a six-figure car, what three proofs does the file have to carry?',
  concept:'<p>This is where the machine points at the garage. <b>Commercial vehicle financing</b> — the loan or lease that puts a car in the LLC’s name — underwrites three stacked layers: the <b>business</b> (seasoning, bank statements, business scores — the C3 file), the <b>guarantor</b> (your personal FICO — almost always PG’d at this scale, C1’s file), and the <b>asset</b> (the vehicle’s value and, for exotics, its story — C4’s territory). Weakness in one layer must be carried by the others; strength in all three is what “fundable” finally means.</p>'
    +'<p><b>The forms it takes.</b> A straight <b>commercial auto loan</b> (titled to the LLC, fixed note). A <b>commercial lease</b> — including the open-end/TRAC-style structures fleets use, where you carry the residual risk but payments and tax treatment fit a business <i>[VERIFY structures]</i>. Or — the exotic-industry pattern from T0/T8 — <b>you finance strength into the business over time</b>: start with a modest, boring, cash-flowing vehicle note the business can obviously service, season it perfectly, and let THAT auto line become the proof the six-figure note reads later. The business’s first car loan is an audition, and lenders reread it.</p>'
    +'<p><b>What the lender reads, concretely:</b> 12–24 months of business bank statements (revenue = deposits — the fundability lesson’s “every dollar through the account” pays off here); time-in-business; business scores + clean public records; your PG file; and a <b>use story that is TRUE</b>. Which is the trap’s edge:</p>'
    +'<p><b>The commercial-use trap, named.</b> Financing a car on a <b>consumer</b> loan and quietly putting it to rental work violates nearly every consumer note’s terms (acceleration risk if discovered) and — far worse — voids the personal policy insuring it (T2/T4: rental use is excluded). The C4·fraudline cousin: telling a commercial lender it’s a personal car, or a consumer lender it’s not a rental, is loan fraud. The honest structure exists and is not exotic: commercial note or lease, titled and insured commercially, use disclosed. It costs more per month and it is the version that survives a claim, an audit, and a deposition.</p>'
    +'<p><b>Who benefits when it’s built right.</b> The lender gets a self-servicing note with three layers of protection. You get leverage that <b>earns</b> — the anti-Ken (C4): debt whose service comes from the asset’s own consignment revenue, sitting inside an entity built to carry it, leaving your personal snapshot clean for the next move.</p>',
  example:'<p><b>Ex — the audition loan:</b> Year 1: the LLC finances a $28k depreciated-but-clean Urus… no — a $28k M240i for deliveries and a first consignment listing [VERIFY what rents locally], note $520/mo, business banks $1,400/mo from it, paid early for 14 months. Year 2: same lender, same file, now with a perfect business auto line and 24 months of deposits — the $110k exotic conversation is no longer a cold pitch. The first note was never about the first car.</p>',
  teach:'Explain the three underwriting layers of a business vehicle note, the audition-loan sequence, and exactly where the commercial-use trap turns into fraud.',
  cards:[
    {f:'The three layers a business auto note underwrites:', b:'The business (seasoning, statements, scores), the guarantor (your PG’d FICO), and the asset. Strength in all three = fundable.'},
    {f:'The audition loan:', b:'Start with a modest note the business obviously services, season it perfectly — that auto line becomes the proof the six-figure note reads later.'},
    {f:'The commercial-use trap:', b:'Consumer-financed + secretly rented = loan-terms violation AND voided personal policy. Lying about use to either lender = loan fraud. Commercial note, commercial policy, disclosed use.'},
    {f:'The anti-Ken structure:', b:'Debt serviced by the asset’s own consignment revenue, inside an entity built to carry it — leverage that earns instead of eats.'}
  ],
  quiz:[
    {q:'A business vehicle note at this scale is underwritten on…', c:['The asset alone','Business + personal guarantor + asset, stacked','Your Instagram','Time-in-business alone'], a:1, e:'Three layers; weakness in one must be carried by the others.'},
    {q:'The “audition loan” strategy is…', c:['Buying the exotic first','A modest, obviously-serviceable first note seasoned perfectly as proof for the big one','Paying cash always','Leasing personally'], a:1, e:'Lenders reread the business’s first auto line. Make it boring and perfect.'},
    {q:'Renting out a consumer-financed, personally-insured car is…', c:['Fine if profitable','A loan-terms violation with a voided policy — and lying about it to a lender is fraud','Standard practice','A tax strategy'], a:1, e:'The commercial-use trap: the only durable structure is commercial note + commercial policy + disclosed use.'}
  ]}

]);

window.REDLINE_QBANK.C3 = [
  {q:'Business credit is keyed to…', c:['Your SSN','The EIN','Your address','The state'], a:1, e:'EIN-keyed files at D&B / Experian Biz / Equifax Biz — separate from the consumer file.', d:1},
  {q:'A PG means…', c:['No liability','You personally back the business debt','The bank owns equity','Nothing after a year'], a:1, e:'Standard early toll; the goal is earning no-PG terms with seasoning and revenue.', d:1},
  {q:'NAP mismatches across records cause…', c:['Better rates','Silent automated-review flags and dead applications','Higher PAYDEX','Nothing'], a:1, e:'Underwriting pattern-matches name/address/phone; inconsistency reads as unreal.', d:2},
  {q:'PAYDEX above 80 requires…', c:['On-time payment','EARLY payment, dollar-weighted','More revenue','A CPA letter'], a:1, e:'80 = on terms; 90–100 = paying weeks early, weighted by invoice size.', d:2},
  {q:'A D-U-N-S number costs…', c:['$229/yr','Nothing — free from D&B','One tradeline','$49 once'], a:1, e:'Free; the paid “builder” packages are upsells you don’t need to have a file.', d:1},
  {q:'Tier 1 of the ladder is…', c:['Bank term loans','Reporting net-30 vendors','Corporate cards','SBA loans'], a:1, e:'Vendors risk inventory margin, approve young LLCs, and (the reporting ones) create the file.', d:1},
  {q:'A business tradeline that reports to no bureau…', c:['Still builds slowly','Builds nothing','Builds personal credit','Doubles PAYDEX'], a:1, e:'Confirm reporting before opening — non-reporting lines are wasted months.', d:2},
  {q:'Most major business cards hit your consumer report…', c:['Monthly','Only if derogatory [VERIFY]','Never','Weekly'], a:1, e:'Business spend stays off the personal snapshot until you default into the PG.', d:2},
  {q:'Tier 4 bank money typically wants…', c:['A logo','~2 yrs seasoning, revenue through the account, financials, a relationship','Only a PG','A shelf corp'], a:1, e:'Bank where you’ll want the line — bankers lend to balances they can see.', d:2},
  {q:'The commercial-use trap is…', c:['Paying commercial rates','Consumer loan + personal policy on a car secretly used for rentals','Titling to an LLC','Leasing'], a:1, e:'Loan-terms violation + voided coverage; lying about use to a lender is loan fraud.', d:3},
  {q:'The “audition loan” exists to…', c:['Impress clients','Create a perfectly-seasoned business auto line that the six-figure note reads later','Avoid taxes','Skip the PG'], a:1, e:'The first note is evidence for the second. Boring and perfect is the strategy.', d:3},
  {q:'Buying an aged “shelf corp” for instant seasoning is…', c:['A smart accelerant','Misrepresenting operating history — detectable and fraud-adjacent','Free','Standard'], a:1, e:'Purchased time rhymes with purchased identity (CPN). Start your real clock early instead.', d:3}
];

// ═══════════════════════ CREDIT 4 · FINANCING THE EXOTIC (completion) ═══════════════════════
window.REDLINE_CURRICULUM = window.REDLINE_CURRICULUM.concat([

{ id:'c4_lenders', sub:'C4', title:'Who actually lends on exotics — the specialty landscape',
  predict:'Your local bank happily writes $40k car loans all day — then flatly refuses a $140k McLaren note to the same borrower. What about the CAR (not the borrower) makes a normal auto desk say no, and who says yes instead?',
  concept:'<p>Normal auto lending is built for normal cars: predictable depreciation curves, deep resale data, easy repossession and remarketing. An exotic breaks every assumption — six-figure exposure on one VIN, thin comps, model-specific value cliffs, a resale market that punishes miles unevenly (T8: Ferrari vs Lambo). So mainstream desks cap out (often around $100–150k and 84 months <i>[VERIFY]</i>) or decline outright — not because you are weak, but because their box is.</p>'
    +'<p><b>The landscape that says yes:</b></p>'
    +'<p>• <b>Credit unions</b> — sometimes surprisingly aggressive on 6-figure notes for strong members at great rates, but inconsistent: it is one desk’s appetite, not a program <i>[VERIFY locally]</i>.<br>'
    +'• <b>Specialty exotic/classic lenders</b> — firms built ONLY for this asset class (names like Woodside Credit, Premier Financial Services, Putnam Leasing, J.J. Best Banc circulate in this space <i>[VERIFY current programs]</i>). Their box: much longer terms (up to 120–144 months <i>[VERIFY]</i>) to crush the monthly payment, balloon and lease structures, asset-literate underwriting (they know what a Performante is worth and that a driven Ferrari bleeds), and relationship-style approval — the borrower interview matters.<br>'
    +'• <b>Captives</b> — the manufacturers’ own finance arms, strongest on new/CPO cars of their own badge.<br>'
    +'• <b>Dealer F&amp;I at exotic stores</b> — the desk that shops your file to all of the above at once; convenient, and marked up (the dealer keeps rate spread). Direct relationships beat F&amp;I pricing; F&amp;I beats having no access at all.</p>'
    +'<p><b>What the specialty desk underwrites</b> is the pair from C0: <b>borrower + asset</b>. Borrower: the full C1–C3 story (FICO Auto pull, income/DTI, reserves — they routinely want to see cash left after the down payment <i>[VERIFY]</i>). Asset: year/model/miles/spec against THEIR resale view — they will lend happily on a clean Huracán and cautiously on a modified oddball, because they are pricing the repo they hope never to do.</p>'
    +'<p><b>The trap inside the long term.</b> A 144-month note makes a $140k car feel like $1,4xx/month — and it builds equity so slowly that you are underwater for YEARS of the curve. That is exactly the negative-equity fuel from c4_dti. Long terms are a cash-flow tool for people with exit discipline (sell/refi timing, miles managed), not a way to afford a car you can’t (T8’s affordability line). The payment being survivable is not the same as the deal being sound.</p>',
  example:'<p><b>Ex:</b> Same borrower, same $140k Huracán: Bank — declined (over program cap). CU — 84mo @ strong rate, $2,0xx/mo, stiff payment. Specialty — 144mo, $1,3xx/mo, but underwater until ~year 5 [VERIFY math]. Dealer F&I — the specialty deal, +1.5 points of markup. Four answers, one car: the landscape IS the negotiation.</p>',
  teach:'Explain why mainstream desks decline exotics, name the four lender types that say yes, and the equity trap hidden inside very long terms.',
  cards:[
    {f:'Why do normal auto desks decline exotics?', b:'Their box assumes predictable depreciation, deep comps, easy remarketing — an exotic breaks all three. Program caps (~$100–150k/84mo [VERIFY]) do the declining.'},
    {f:'The specialty-lender box:', b:'Exotic-only firms [VERIFY names]: terms to 120–144mo, balloon/lease structures, asset-literate underwriting, relationship-style approvals.'},
    {f:'What does the specialty desk underwrite?', b:'Borrower + asset: your FICO Auto/DTI/reserves AND the car’s year/model/miles/spec against their resale view. They price the repo they hope never to do.'},
    {f:'The long-term trap:', b:'120–144mo crushes the payment but builds equity so slowly you are underwater for years — negative-equity fuel unless you have exit discipline.'}
  ],
  quiz:[
    {q:'A mainstream bank declines your $140k exotic note most likely because…', c:['You are always too weak','The car breaks their program’s box — caps, comps, remarketing','Exotics are illegal to finance','They only do leases'], a:1, e:'Program limits do the declining. The specialty landscape exists precisely because the asset class needs its own box.'},
    {q:'A 144-month exotic note’s hidden cost is…', c:['Higher insurance','Years underwater — slow equity that fuels the negative-equity snowball','No GAP available','Monthly fees'], a:1, e:'The payment feels light while the balance outruns the car’s value deep into the term (c4_dti).'},
    {q:'Dealer F&I versus a direct lender relationship:', c:['F&I is always cheaper','Direct beats F&I pricing; F&I beats no access — the desk keeps rate spread','They are identical','F&I is illegal'], a:1, e:'F&I shops your file conveniently and marks up the winning rate. Relationships remove the spread.'}
  ]},

{ id:'c4_structures', sub:'C4', title:'Loan vs balloon vs lease — engineering the payment to the plan',
  predict:'Three ways to hold the same $150k car: $2,100/mo, $1,500/mo, or $1,200/mo. Same car, same buyer, same lender family. What is each structure quietly trading away for the lower payment?',
  concept:'<p>Structures are trades between <b>payment, equity, and risk</b>. Choose by the PLAN for the car (T8), never by the payment alone.</p>'
    +'<p><b>1 — Simple-interest loan.</b> Highest payment, cleanest story: every month buys real equity, payoff is transparent, no end-of-term event. Interest accrues on the outstanding balance daily — extra principal early actually shortens the cost curve. If the plan is “hold and consign for years,” boring wins.</p>'
    +'<p><b>2 — Balloon note.</b> Normal payments sized as if the loan ran much longer, with a large lump (the balloon) due at term end. You are betting the car will be worth ≥ the balloon when it hits — on an exotic, a bet on miles and market. If right: you sell/refi over the balloon and rode cheap payments. If wrong: you owe a five-figure lump on an asset worth less — the snowball’s big brother. Balloons fit operators with a dated exit plan and mileage discipline; they punish drift.</p>'
    +'<p><b>3 — Lease structures.</b> Payment = depreciation + rent charge, lowest of the three. Two species matter here: the closed-end consumer lease (walk away at term, mileage caps that rental use will demolish — usually wrong for this business) and the <b>open-end / TRAC-style commercial lease</b> the specialty firms write <i>[VERIFY]</i>: business-friendly treatment, but YOU carry the residual risk at term — functionally a balloon wearing a lease’s clothes. Read which species you are signing; the word “lease” alone tells you nothing.</p>'
    +'<p><b>The supporting cast.</b> <b>Down payment:</b> 10–20%+ is both an approval lever (skin in the game) and your anti-underwater cushion <i>[VERIFY typical]</i>. <b>GAP:</b> on a long note or any balloon, the gap between payoff and actual-cash-value after a total loss is exactly where you are exposed — on a $150k car that gap can be crushing; price GAP (or self-insure it consciously) on day one, and note some GAP products exclude commercial use <i>[VERIFY]</i> — the T4 commercial policy conversation must include it. <b>Rate vs everything:</b> a great rate on the wrong structure is still the wrong deal; the structure IS the deal.</p>'
    +'<p><b>The operator’s test.</b> Before signing anything: what is the exit (sell at month N / refi / hold)? What miles will consignment realistically add (T8 ledger)? Does the note survive a 3-month utilization drought (T8’s affordability line)? A structure chosen with those three answers written down is financing; chosen by payment alone, it is hope with a signature.</p>',
  example:'<p><b>Ex:</b> $150k Urus, plan = consign 24 months then sell. Loan: $2,1xx/mo, equity building, clean exit anytime. Balloon: $1,5xx/mo with $70k due at month 36 — works ONLY if miles stay disciplined and the market holds. Closed lease: $1,2xx/mo with 10k mi/yr caps — consignment miles obliterate it in months. The plan picks the loan or a carefully-mileaged balloon; the payment alone would have picked the trap.</p>',
  teach:'Explain what a balloon is betting on, why closed-end leases and rental miles don’t mix, and the three written answers required before choosing any structure.',
  cards:[
    {f:'Simple-interest loan trade:', b:'Highest payment, real equity, transparent payoff, no term event. The “hold and consign for years” structure.'},
    {f:'Balloon note trade:', b:'Low payments now, big lump at term — a bet that the car’s value ≥ balloon. Miles and market discipline or it becomes the snowball’s big brother.'},
    {f:'The lease species that fits fleets (and its catch):', b:'Open-end/TRAC-style commercial lease [VERIFY]: business treatment, but YOU hold residual risk — a balloon in lease clothing. Closed-end caps die under rental miles.'},
    {f:'GAP on exotics:', b:'Covers payoff-vs-ACV after a total loss — the exact exposure of long terms and balloons. Verify commercial-use isn’t excluded [VERIFY].'}
  ],
  quiz:[
    {q:'A balloon note is fundamentally a bet that…', c:['Rates fall','The car’s value at term ≥ the balloon owed','Insurance stays cheap','Utilization stays high'], a:1, e:'Right = cheap payments then exit over the balloon. Wrong = five-figure lump over a depreciated car.'},
    {q:'A closed-end consumer lease fails this business because…', c:['Payments are too high','Mileage caps — consignment/rental miles demolish them','It builds equity too fast','Banks hate them'], a:1, e:'Depreciation+rent pricing assumes capped personal miles. Rental use blows the caps and the economics.'},
    {q:'The three questions to answer IN WRITING before picking a structure:', c:['Color, trim, wrap','Exit plan, realistic consignment miles, drought survival','Rate, rate, rate','Dealer, captive, CU'], a:1, e:'Structure follows plan: exit, miles, and the no-revenue stress test. Payment-only choosing is hope with a signature.'}
  ]},

{ id:'c4_bizbuy', sub:'C4', title:'Buying through the business — title, policy, and the tax edge',
  predict:'Two identical Uruses, same price, same day. One is bought personally; one is bought by a seasoned LLC that consigns it. A year later their owners’ tax bills, insurance validity, and lender files look completely different. Walk the three differences.',
  concept:'<p>The end-state the whole credit spine points at: <b>the business buys the car.</b> Get the three layers right — title, policy, tax — because they only work as a set.</p>'
    +'<p><b>Title &amp; note.</b> The LLC is the titled owner; the note is commercial (C3·lending), PG’d early, with the business’s statements and seasoned auto line doing the persuading. Everything disclosed: the lender knows it is a rental/consignment asset. This is the structure that survives scrutiny — and it is also simply what the T8 fleet-placement plan requires, because…</p>'
    +'<p><b>Policy.</b> A personally-insured car cannot legally do this work (T2: rental use is excluded from personal policies; T4: the commercial policy is the business’s hardest purchase). Titling to the LLC aligns with the commercial policy — or with the fleet’s policy under the lease-and-register consignment machinery (T4) when your car joins their program. The kill-shot to avoid: business-titled car, personal policy “to save money” — a claim adjuster’s easiest denial. The T8 rule restated: never let the car sit in the gap between two structures.</p>'
    +'<p><b>The tax edge — where the heavy SUVs get interesting.</b> Business-use vehicles deduct: either actual expenses (fuel, insurance, maintenance, depreciation) or mileage, plus interest on the business note. The headline: <b>Section 179 + bonus depreciation</b>. Passenger cars face tight “luxury auto” depreciation caps — but vehicles over <b>6,000 lbs GVWR</b> escape into far larger first-year write-offs (179 up to six figures with bonus on top; percentages and caps move yearly <i>[VERIFY current-year rules]</i>). Now read the exotic garage through that lens: <b>Urus, Cullinan, Bentayga, G63 — heavy SUVs over the GVWR line <i>[VERIFY each]</i></b> — the same vehicles T8 calls the gentlest-renter, hardest-working fleet cars. The machine aligns: the car that rents safest may also carry the biggest legitimate first-year deduction <i>against the business income it produces</i>.</p>'
    +'<p><b>The honest fine print, all of it.</b> The deduction requires real <b>business-use percentage</b> (>50% for 179; personal joyrides dilute it — the T5/T8 mileage ledger is also your tax log <i>[VERIFY]</i>); depreciation you take now is <b>recaptured</b> as income when you sell; a write-off is a discount on real spending, never a reason to buy (the T8 affordability line, tax edition); and every number here moves with the tax year — this is education, and the operator who does this <b>hires a CPA</b> before signing. The edge is knowing the structure exists and arriving at that CPA meeting already fluent.</p>',
  example:'<p><b>Ex:</b> Seasoned LLC buys a $240k Urus [VERIFY price], commercial note, commercial policy, consigned at a fleet (T8 audit done). Year 1: consignment revenue services the note; 179+bonus on a >6,000-lb GVWR asset shelters a large slice of the business’s income [VERIFY current caps]; the mileage ledger doubles as the business-use log. Sale in year 3 triggers recapture — planned for, not discovered. Every layer legal, disclosed, and pointing the same direction.</p>',
  teach:'Explain the title-policy-tax stack for a business-bought exotic, why the >6,000-lb GVWR rule makes heavy SUVs special, and the recapture + business-use fine print that keeps it honest.',
  cards:[
    {f:'The three-layer stack of a business buy:', b:'LLC title + commercial note (disclosed use), commercial policy (never a personal policy on a business rental car), and the tax treatment — they only work as a SET.'},
    {f:'Why heavy SUVs are the tax edge:', b:'>6,000 lbs GVWR escapes luxury-auto depreciation caps into Section 179 + bonus territory [VERIFY yearly] — and Urus/Cullinan-class fleet SUVs sit over the line [VERIFY].'},
    {f:'The fine print trio:', b:'>50% real business use (the mileage ledger is the log), depreciation recapture on sale, and numbers that move yearly — CPA before signature.'},
    {f:'A write-off is…', b:'A discount on real spending against real income — never a reason to buy a car the business couldn’t otherwise carry.'}
  ],
  quiz:[
    {q:'Business-titled car + personal auto policy “to save money” =', c:['A smart optimization','An adjuster’s easiest claim denial — the structures must align','Required by lenders','A tax strategy'], a:1, e:'Rental/business use is excluded personally; the car can never sit in the gap between structures.'},
    {q:'The >6,000-lb GVWR line matters because…', c:['Heavier cars rent higher','It escapes luxury-auto caps into 179/bonus territory [VERIFY]','Insurance is free above it','It changes the title'], a:1, e:'Heavy SUVs get the large first-year deductions passenger cars are capped out of — and they’re the gentle-renter fleet cars anyway.'},
    {q:'Depreciation you deduct now is…', c:['Free forever','Recaptured as income when you sell — plan for it','Doubled at sale','Transferred to the buyer'], a:1, e:'179/bonus is timing, not magic. The exit math includes recapture or the “edge” was a surprise tax bill.'}
  ]}

]);

window.REDLINE_QBANK.C4 = [
  {q:'DTI compares…', c:['Debt payments to income','Assets to debts','Cars to income','Rent to income'], a:0, e:'Total monthly debt payments ÷ gross monthly income; PTI is the car payment alone.', d:1},
  {q:'Two same-week car approvals usually work because…', c:['Lenders share instantly','The reporting lag hides the other fresh loan from each pull','Scores update daily','Dealers waive checks'], a:1, e:'New loans post on the next cycle (~30–45 days) — legal only if every app is truthful.', d:2},
  {q:'Rolling negative equity means…', c:['Paying early','Stacking the old car’s upside-down balance into the new loan','Refinancing down','Leasing'], a:1, e:'Each roll deepens the hole — the $290k snowball mechanism.', d:1},
  {q:'Stating income you no longer earn on an auto app is…', c:['Negotiation','Loan-application fraud (state + federal bank fraud)','A gray area','Fine if payments are made'], a:1, e:'18 U.S.C. §1344 territory — the felony line of c4_fraudline.', d:1},
  {q:'Mainstream banks decline exotics mostly because…', c:['Borrowers are weak','Program boxes: caps, thin comps, hard remarketing','They dislike speed','Law forbids it'], a:1, e:'The asset breaks the normal-car assumptions; specialty lenders exist for exactly this.', d:2},
  {q:'Specialty exotic lenders differentiate with…', c:['Free insurance','Very long terms, balloons/leases, asset-literate underwriting','No credit checks','Crypto payment'], a:1, e:'120–144mo terms [VERIFY], structures, and desks that know what a Performante is.', d:2},
  {q:'The hidden cost of a 144-month term is…', c:['Paper fees','Years underwater as equity builds slowly','Higher insurance','Registration'], a:1, e:'Negative-equity fuel unless exit discipline is real.', d:2},
  {q:'A balloon note ends with…', c:['Nothing','A large lump due — a bet on the car’s value at term','Automatic refi','Ownership transfer'], a:1, e:'Value ≥ balloon = ride was cheap. Value < balloon = five-figure problem.', d:2},
  {q:'Closed-end leases fail fleet use because…', c:['Rates','Mileage caps that rental miles demolish','No insurance','Title issues'], a:1, e:'Depreciation-plus-rent pricing assumes capped personal miles.', d:2},
  {q:'GAP coverage exists for…', c:['Maintenance','The payoff-vs-actual-value gap after a total loss','Deductibles','Storage'], a:1, e:'Exactly where long terms and balloons leave you exposed — verify commercial use isn’t excluded [VERIFY].', d:2},
  {q:'The >6,000-lb GVWR tax significance is…', c:['Cheaper fuel','Escaping luxury-auto caps into Section 179/bonus territory [VERIFY]','Free tolls','Lower registration'], a:1, e:'Heavy SUVs (Urus/Cullinan-class [VERIFY]) get first-year deductions capped cars can’t touch.', d:3},
  {q:'Depreciation taken under 179/bonus is…', c:['Permanent','Recaptured as income at sale','Transferable','Doubled'], a:1, e:'It is timing. The exit plan must include recapture or the edge becomes a surprise bill.', d:3}
];
