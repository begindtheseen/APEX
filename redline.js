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
