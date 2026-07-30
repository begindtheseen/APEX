// ============================================================
// APEX — REDLINE mechanism diagrams (Exotic Rental Operator Track)
// ============================================================
// Maps topic id -> an inline animated SVG string, rendered in the lesson
// view under MECHANISM DIAGRAM. Self-contained SMIL-animated SVG: no
// external assets, works offline, loops calmly (2.5–8s).
//
// Visual language (fixed semantic roles — never decorative, shared with
// obsviz so the two dark realms read the same way):
//   #ffb020 gold  = money / the flow being traced
//   #00e5a0 green = receiver / benefit / up
//   #ff4455 red   = payer / cost / down / risk
//   #d8d8d8 strokes = structure · #a9a9a9 = labels
// Every colored element carries a text label; color never stands alone.
// All ids are prefixed per-topic (rlv<topicid>_) to avoid collisions.
// ES5 only, ’ instead of raw apostrophes.

window.REDLINE_VIZ = {

// T0 · The agency secret — cars come from hidden owners; money splits back.
t0_agency:
'<svg viewBox="0 0 320 196" width="100%" height="196" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">Behind the Instagram: the agency owns almost none of it</text>'
// hidden owners (left)
+'<g>'
+'<rect x="8" y="30" width="74" height="30" rx="7" fill="#140a0a" stroke="#d8d8d8" stroke-width="1"/>'
+'<text x="45" y="49" fill="#d8d8d8" font-size="10" text-anchor="middle">OWNER</text>'
+'<rect x="8" y="82" width="74" height="30" rx="7" fill="#140a0a" stroke="#d8d8d8" stroke-width="1"/>'
+'<text x="45" y="101" fill="#d8d8d8" font-size="10" text-anchor="middle">OWNER</text>'
+'<rect x="8" y="134" width="74" height="30" rx="7" fill="#140a0a" stroke="#d8d8d8" stroke-width="1"/>'
+'<text x="45" y="153" fill="#d8d8d8" font-size="10" text-anchor="middle">OWNER</text>'
+'</g>'
// the curtain
+'<line x1="98" y1="24" x2="98" y2="176" stroke="#ff4455" stroke-width="1.2" stroke-dasharray="4 4"/>'
+'<text x="98" y="190" fill="#ff4455" font-size="8.5" text-anchor="middle">the curtain (hidden)</text>'
// agency (center)
+'<rect x="118" y="70" width="86" height="54" rx="10" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.3"/>'
+'<text x="161" y="93" fill="#f2e6c8" font-size="11" text-anchor="middle">AGENCY</text>'
+'<text x="161" y="108" fill="#a9a9a9" font-size="8.5" text-anchor="middle">operates · splits</text>'
// renters (right)
+'<rect x="238" y="76" width="74" height="42" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1"/>'
+'<text x="275" y="101" fill="#d8d8d8" font-size="10" text-anchor="middle">RENTERS</text>'
// consign arrows (grey, owner -> agency)
+'<path d="M82 45 L118 88" stroke="#7a7a7a" stroke-width="1" fill="none"/>'
+'<path d="M82 97 L118 96" stroke="#7a7a7a" stroke-width="1" fill="none"/>'
+'<path d="M82 149 L118 104" stroke="#7a7a7a" stroke-width="1" fill="none"/>'
+'<text x="100" y="70" fill="#7a7a7a" font-size="8" text-anchor="middle" transform="rotate(-20 100 70)">cars</text>'
// money in (renter -> agency)
+'<path id="rlvt0a_min" d="M238 97 L204 97" stroke="#ffb020" stroke-width="1.4" fill="none"/>'
+'<circle r="4" fill="#ffb020"><animateMotion dur="2.2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" path="M238 97 L204 97"/></circle>'
+'<text x="221" y="90" fill="#ffb020" font-size="8.5" text-anchor="middle">pays</text>'
// split out (agency -> owner)
+'<circle r="4" fill="#00e5a0"><animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" path="M130 100 L84 97"/></circle>'
+'<text x="108" y="120" fill="#00e5a0" font-size="8.5" text-anchor="middle">split</text>'
+'</svg>',

// C0 · One file, many scores — the car desk reads the Auto Score.
c0_scores:
'<svg viewBox="0 0 320 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">One file → many scores. Lenders don’t all read the same one.</text>'
// the file (left)
+'<rect x="8" y="78" width="78" height="44" rx="10" fill="#1c0e0e" stroke="#d8d8d8" stroke-width="1.2"/>'
+'<text x="47" y="98" fill="#ece0df" font-size="10" text-anchor="middle">YOUR</text>'
+'<text x="47" y="112" fill="#ece0df" font-size="10" text-anchor="middle">FILE</text>'
// fan lines
+'<path d="M86 100 L176 30" stroke="#7a7a7a" stroke-width="1" fill="none"/>'
+'<path d="M86 100 L176 74" stroke="#7a7a7a" stroke-width="1" fill="none"/>'
+'<path id="rlvc0s_auto" d="M86 100 L176 122" stroke="#00e5a0" stroke-width="1.6" fill="none"/>'
+'<path d="M86 100 L176 168" stroke="#7a7a7a" stroke-width="1" fill="none"/>'
// pulse along the auto line (the one that sets the car rate)
+'<circle r="4" fill="#00e5a0"><animateMotion dur="2.4s" repeatCount="indefinite" path="M86 100 L176 122"/></circle>'
// score chips (right)
+'<rect x="176" y="16" width="138" height="30" rx="7" fill="#140a0a" stroke="#7a7a7a" stroke-width="1"/>'
+'<text x="185" y="30" fill="#a9a9a9" font-size="9" text-anchor="start">VantageScore ~740</text>'
+'<text x="185" y="41" fill="#7a7a7a" font-size="8" text-anchor="start">the free apps</text>'
+'<rect x="176" y="60" width="138" height="30" rx="7" fill="#140a0a" stroke="#7a7a7a" stroke-width="1"/>'
+'<text x="185" y="74" fill="#a9a9a9" font-size="9" text-anchor="start">FICO 8</text>'
+'<text x="185" y="85" fill="#7a7a7a" font-size="8" text-anchor="start">most card decisions</text>'
+'<rect x="176" y="106" width="138" height="32" rx="7" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.4"/>'
+'<text x="185" y="121" fill="#00e5a0" font-size="9.5" text-anchor="start">FICO Auto ~705</text>'
+'<text x="185" y="132" fill="#00e5a0" font-size="8" text-anchor="start">the car desk reads this →</text>'
+'<rect x="176" y="154" width="138" height="30" rx="7" fill="#140a0a" stroke="#7a7a7a" stroke-width="1"/>'
+'<text x="185" y="168" fill="#a9a9a9" font-size="9" text-anchor="start">FICO 2 / 4 / 5</text>'
+'<text x="185" y="179" fill="#7a7a7a" font-size="8" text-anchor="start">mortgage pulls</text>'
+'</svg>',

// C4 · The roll — negative equity stacks into each new loan; debt snowballs.
c4_dti:
'<svg viewBox="0 0 320 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">The roll: each trade stacks old debt into the new loan</text>'
// baseline
+'<line x1="20" y1="172" x2="300" y2="172" stroke="#3c1d1d" stroke-width="1"/>'
// Car 1 — owe 60k (gold 45k car + red 15k negative)
+'<rect x="44" y="142" width="54" height="30" fill="#ffb020"/>'
+'<rect x="44" y="122" width="54" height="20" fill="#ff4455"/>'
+'<text x="71" y="116" fill="#ff6a5f" font-size="9" text-anchor="middle">$60k</text>'
+'<text x="71" y="186" fill="#a9a9a9" font-size="9" text-anchor="middle">Car 1</text>'
// Car 2 — owe 85k (gold 55k + red 30k)
+'<rect x="136" y="132" width="54" height="40" fill="#ffb020"/>'
+'<rect x="136" y="92" width="54" height="40" fill="#ff4455"/>'
+'<text x="163" y="86" fill="#ff6a5f" font-size="9" text-anchor="middle">$85k</text>'
+'<text x="163" y="186" fill="#a9a9a9" font-size="9" text-anchor="middle">Car 2</text>'
// Car 3 — owe 120k (gold 62k + red 58k)
+'<rect x="228" y="110" width="54" height="62" fill="#ffb020"/>'
+'<rect x="228" y="52" width="54" height="58" fill="#ff4455"/>'
+'<text x="255" y="46" fill="#ff6a5f" font-size="9" text-anchor="middle">$120k+</text>'
+'<text x="255" y="186" fill="#a9a9a9" font-size="9" text-anchor="middle">Car 3</text>'
// the rolled negative equity travels forward and grows
+'<circle r="5" fill="#ff4455"><animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;0.5;1" keyTimes="0;0.5;1" calcMode="linear" path="M71 122 L163 92 L255 52"/></circle>'
// legend
+'<rect x="20" y="24" width="9" height="9" fill="#ffb020"/><text x="33" y="32" fill="#7a7a7a" font-size="8" text-anchor="start">financed car</text>'
+'<rect x="96" y="24" width="9" height="9" fill="#ff4455"/><text x="109" y="32" fill="#7a7a7a" font-size="8" text-anchor="start">negative equity carried forward</text>'
+'</svg>',

// T1 · The waterfall — one $1,000 deal, three paychecks in fixed order.
t1_waterfall:
'<svg viewBox="0 0 320 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">The waterfall: sourcer first, owner second, agency keeps the rest</text>'
+'<rect x="118" y="24" width="84" height="26" rx="7" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.2"/>'
+'<text x="160" y="41" fill="#ffb020" font-size="10" text-anchor="middle">RENTER $1,000</text>'
+'<path d="M160 50 L160 74" stroke="#7a7a7a" stroke-width="1"/>'
+'<circle r="4" fill="#ffb020"><animateMotion dur="3.2s" repeatCount="indefinite" path="M160 50 L160 74 L66 74 L66 96"/></circle>'
+'<circle r="4" fill="#ffb020"><animateMotion dur="3.2s" begin="1s" repeatCount="indefinite" path="M160 74 L160 96"/></circle>'
+'<circle r="4" fill="#ffb020"><animateMotion dur="3.2s" begin="2s" repeatCount="indefinite" path="M160 74 L254 74 L254 96"/></circle>'
+'<path d="M66 74 L254 74" stroke="#7a7a7a" stroke-width="1"/>'
+'<path d="M66 74 L66 96 M160 74 L160 96 M254 74 L254 96" stroke="#7a7a7a" stroke-width="1"/>'
+'<rect x="20" y="96" width="92" height="40" rx="8" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.2"/>'
+'<text x="66" y="112" fill="#00e5a0" font-size="9.5" text-anchor="middle">BROKER $200</text>'
+'<text x="66" y="126" fill="#00e5a0" font-size="8" text-anchor="middle">paid FIRST · no costs</text>'
+'<rect x="118" y="96" width="84" height="40" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1"/>'
+'<text x="160" y="112" fill="#ece0df" font-size="9.5" text-anchor="middle">OWNER $400</text>'
+'<text x="160" y="126" fill="#ff6a5f" font-size="8" text-anchor="middle">− miles − wear</text>'
+'<rect x="208" y="96" width="92" height="40" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1"/>'
+'<text x="254" y="112" fill="#ece0df" font-size="9.5" text-anchor="middle">AGENCY $400</text>'
+'<text x="254" y="126" fill="#ff6a5f" font-size="8" text-anchor="middle">− the whole cost stack</text>'
+'<text x="160" y="158" fill="#a9a9a9" font-size="8.5" text-anchor="middle">Owner splits WHOLESALE ($800) — the broker shrank the pie first</text>'
+'<text x="160" y="176" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Net per effort: broker ≈ pure profit · agency earns it · owner nets 15–20% of split</text>'
+'</svg>',

// T2 · The asymmetry — liability pays outward automatically; the collision
// claim on YOUR car sits behind a lock only the renter can open.
t2_asymmetry:
'<svg viewBox="0 0 320 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">One crash, two coverages, opposite behaviors</text>'
+'<rect x="118" y="26" width="84" height="30" rx="8" fill="#1c0e0e" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="160" y="45" fill="#ece0df" font-size="10" text-anchor="middle">THE CRASH</text>'
+'<path d="M130 56 L66 92" stroke="#00e5a0" stroke-width="1.4"/>'
+'<circle r="4" fill="#00e5a0"><animateMotion dur="2s" repeatCount="indefinite" path="M130 56 L66 92"/></circle>'
+'<rect x="20" y="92" width="102" height="52" rx="8" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.2"/>'
+'<text x="71" y="108" fill="#00e5a0" font-size="9.5" text-anchor="middle">LIABILITY</text>'
+'<text x="71" y="121" fill="#a9a9a9" font-size="8" text-anchor="middle">other car · injured · city</text>'
+'<text x="71" y="134" fill="#00e5a0" font-size="8.5" text-anchor="middle">pays AUTOMATICALLY</text>'
+'<path d="M190 56 L254 92" stroke="#ff4455" stroke-width="1.4" stroke-dasharray="5 4"/>'
+'<rect x="198" y="92" width="102" height="52" rx="8" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.2"/>'
+'<text x="249" y="108" fill="#ff6a5f" font-size="9.5" text-anchor="middle">COLLISION (your car)</text>'
+'<text x="249" y="121" fill="#a9a9a9" font-size="8" text-anchor="middle">renter’s own policy</text>'
+'<text x="249" y="134" fill="#ff6a5f" font-size="8.5" text-anchor="middle">ONLY the renter can file</text>'
+'<rect x="238" y="66" width="22" height="16" rx="3" fill="none" stroke="#ff4455" stroke-width="1.4"/>'
+'<path d="M243 66 L243 60 A6 6 0 0 1 255 60 L255 66" fill="none" stroke="#ff4455" stroke-width="1.4"/>'
+'<text x="160" y="170" fill="#a9a9a9" font-size="8.5" text-anchor="middle">A ghost renter = a real, covered claim that simply never gets filed.</text>'
+'<text x="160" y="186" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Every ritual in T3–T5 exists to keep that person from ever holding keys.</text>'
+'</svg>',

// T2 · Four documents — the answer lives two documents deeper than anyone reads.
t2_fourdocs:
'<svg viewBox="0 0 320 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">“Will it pay for my Lamborghini?” lives in docs 3 + 4</text>'
+'<rect x="24" y="30" width="130" height="26" rx="6" fill="#140a0a" stroke="#7a7a7a"/>'
+'<text x="89" y="47" fill="#a9a9a9" font-size="9" text-anchor="middle">1 · APPLICATION</text>'
+'<rect x="24" y="64" width="130" height="26" rx="6" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.2"/>'
+'<text x="89" y="81" fill="#ece0df" font-size="9" text-anchor="middle">2 · DEC PAGE (what they BOUGHT)</text>'
+'<text x="89" y="104" fill="#ff6a5f" font-size="8" text-anchor="middle">← everyone stops here</text>'
+'<rect x="166" y="64" width="130" height="26" rx="6" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.3"/>'
+'<text x="231" y="81" fill="#00e5a0" font-size="9" text-anchor="middle">3 · POLICY CONTRACT</text>'
+'<rect x="166" y="98" width="130" height="26" rx="6" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.3"/>'
+'<text x="231" y="115" fill="#00e5a0" font-size="9" text-anchor="middle">4 · ENDORSEMENTS</text>'
+'<circle r="4" fill="#ffb020"><animateMotion dur="2.6s" repeatCount="indefinite" path="M154 77 L166 77"/></circle>'
+'<text x="231" y="140" fill="#ffb020" font-size="8.5" text-anchor="middle">non-owner rules · caps · exclusions</text>'
+'<rect x="82" y="152" width="156" height="26" rx="7" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.1"/>'
+'<text x="160" y="169" fill="#ffb020" font-size="9" text-anchor="middle">SERFF: NAIC # + form # → state portal</text>'
+'<text x="160" y="193" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Filed fine print, pulled free — then AI-extract the three answers</text>'
+'</svg>',

// T3 · The stack — three layers funnel to a decision before keys move.
t3_stack:
'<svg viewBox="0 0 320 208" width="100%" height="208" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">Three layers — each catches what the others miss</text>'
+'<rect x="40" y="26" width="240" height="30" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="160" y="45" fill="#ece0df" font-size="9.5" text-anchor="middle">1 · CARRIER CONNECTION — policy is REAL</text>'
+'<rect x="58" y="70" width="204" height="30" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="160" y="89" fill="#ece0df" font-size="9.5" text-anchor="middle">2 · FINE PRINT — transfer? cap? voided uses?</text>'
+'<rect x="76" y="114" width="168" height="30" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="160" y="133" fill="#ece0df" font-size="9.5" text-anchor="middle">3 · RECORDED CALL — on tape</text>'
+'<circle r="4" fill="#ffb020"><animateMotion dur="3s" repeatCount="indefinite" path="M160 56 L160 70 M160 100 L160 114 M160 144 L160 158" keyPoints="0;1" keyTimes="0;1"/></circle>'
+'<path d="M160 56 L160 70 M160 100 L160 114 M160 144 L160 158" stroke="#7a7a7a" stroke-width="1"/>'
+'<rect x="60" y="158" width="90" height="28" rx="8" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.3"/>'
+'<text x="105" y="176" fill="#00e5a0" font-size="10" text-anchor="middle">KEYS MOVE</text>'
+'<rect x="170" y="158" width="90" height="28" rx="8" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.3"/>'
+'<text x="215" y="176" fill="#ff6a5f" font-size="10" text-anchor="middle">DECLINE</text>'
+'<text x="160" y="202" fill="#7a7a7a" font-size="8.5" text-anchor="middle">All three agree → more diligence than 90% of the industry</text>'
+'</svg>',

// T4 · The Turo exception — the PVSP shield and its two walls.
t4_turo:
'<svg viewBox="0 0 320 204" width="100%" height="204" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">The PVSP shield — and the two walls that keep fleets out</text>'
+'<path d="M74 34 L74 96 Q74 122 104 130 Q134 122 134 96 L134 34 Q104 44 74 34 Z" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.3"/>'
+'<text x="104" y="70" fill="#00e5a0" font-size="9" text-anchor="middle">PVSP</text>'
+'<text x="104" y="84" fill="#a9a9a9" font-size="7.5" text-anchor="middle">noncommercial</text>'
+'<text x="104" y="95" fill="#a9a9a9" font-size="7.5" text-anchor="middle">sharing</text>'
+'<text x="104" y="150" fill="#7a7a7a" font-size="8" text-anchor="middle">owner can’t be cancelled ·</text>'
+'<text x="104" y="161" fill="#7a7a7a" font-size="8" text-anchor="middle">program carries trip liability</text>'
+'<rect x="186" y="34" width="116" height="42" rx="8" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.2"/>'
+'<text x="244" y="50" fill="#ff6a5f" font-size="9" text-anchor="middle">WALL 1 · revenue test</text>'
+'<text x="244" y="63" fill="#a9a9a9" font-size="7.5" text-anchor="middle">revenue ≤ ownership costs</text>'
+'<text x="244" y="72" fill="#ff6a5f" font-size="7.5" text-anchor="middle">profit = outside the shield</text>'
+'<rect x="186" y="88" width="116" height="42" rx="8" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.2"/>'
+'<text x="244" y="104" fill="#ff6a5f" font-size="9" text-anchor="middle">WALL 2 · underwriting</text>'
+'<text x="244" y="117" fill="#a9a9a9" font-size="7.5" text-anchor="middle">25+/30+ gates · ~$200k cap</text>'
+'<text x="244" y="126" fill="#ff6a5f" font-size="7.5" text-anchor="middle">the carriers said no</text>'
+'<rect x="186" y="146" width="116" height="34" rx="8" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.2"/>'
+'<text x="244" y="160" fill="#ffb020" font-size="8.5" text-anchor="middle">ABOVE THE WALLS:</text>'
+'<text x="244" y="172" fill="#ffb020" font-size="8.5" text-anchor="middle">the independents’ moat</text>'
+'<circle r="3.5" fill="#ffb020"><animateMotion dur="2.8s" repeatCount="indefinite" path="M134 82 L186 55"/></circle>'
+'<text x="160" y="196" fill="#7a7a7a" font-size="8.5" text-anchor="middle">This entire industry lives inside the carriers’ “no”</text>'
+'</svg>',

// T5 · Telemetry → strikes → enforcement ladder.
t5_telematics:
'<svg viewBox="0 0 320 196" width="100%" height="196" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">Watching becomes enforcement: the strike ladder</text>'
+'<rect x="20" y="30" width="86" height="34" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="63" y="45" fill="#ece0df" font-size="9" text-anchor="middle">TELEMATICS</text>'
+'<text x="63" y="57" fill="#a9a9a9" font-size="7.5" text-anchor="middle">speed · g’s · zones</text>'
+'<path d="M106 47 L140 47" stroke="#7a7a7a" stroke-width="1"/>'
+'<circle r="3.5" fill="#ffb020"><animateMotion dur="2.4s" repeatCount="indefinite" path="M106 47 L140 47"/></circle>'
+'<rect x="140" y="30" width="160" height="34" rx="8" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.1"/>'
+'<text x="220" y="45" fill="#ffb020" font-size="9" text-anchor="middle">ALERT: 20-over sustained</text>'
+'<text x="220" y="57" fill="#a9a9a9" font-size="7.5" text-anchor="middle">call the renter — knock it off</text>'
+'<g><rect x="34" y="86" width="70" height="26" rx="7" fill="#1c0e0e" stroke="#ffc83c"/><text x="69" y="103" fill="#ffc83c" font-size="9" text-anchor="middle">STRIKE 1</text></g>'
+'<g><rect x="124" y="86" width="70" height="26" rx="7" fill="#1c0e0e" stroke="#ff8a3c"/><text x="159" y="103" fill="#ff8a3c" font-size="9" text-anchor="middle">STRIKE 2</text></g>'
+'<g><rect x="214" y="86" width="86" height="26" rx="7" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.3"/><text x="257" y="103" fill="#ff6a5f" font-size="9" text-anchor="middle">3: RENTAL OVER</text></g>'
+'<path d="M104 99 L124 99 M194 99 L214 99" stroke="#7a7a7a" stroke-width="1"/>'
+'<rect x="70" y="130" width="180" height="26" rx="7" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.3"/>'
+'<text x="160" y="147" fill="#ff6a5f" font-size="8.5" text-anchor="middle">DRIFT or 100+ mph → VOID ON THE SPOT</text>'
+'<text x="160" y="176" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Kill switch: stopped cars only · deposit forfeits per the contract</text>'
+'<text x="160" y="189" fill="#7a7a7a" font-size="8" text-anchor="middle">Flexible in practice — absolute on paper</text>'
+'</svg>',

// T6 · The double clock-out — every mile belongs to someone.
t6_broker:
'<svg viewBox="0 0 320 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">The double clock-out: the gap is the broker’s miles</text>'
+'<rect x="20" y="34" width="80" height="34" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="60" y="49" fill="#ece0df" font-size="9" text-anchor="middle">AGENCY</text>'
+'<text x="60" y="61" fill="#ffb020" font-size="8" text-anchor="middle">odo 8,412</text>'
+'<rect x="120" y="34" width="80" height="34" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="160" y="49" fill="#ece0df" font-size="9" text-anchor="middle">BROKER</text>'
+'<text x="160" y="61" fill="#ffb020" font-size="8" text-anchor="middle">odo 8,498</text>'
+'<rect x="220" y="34" width="80" height="34" rx="8" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="260" y="49" fill="#ece0df" font-size="9" text-anchor="middle">CLIENT</text>'
+'<text x="260" y="61" fill="#a9a9a9" font-size="8" text-anchor="middle">clock-out #2</text>'
+'<path d="M100 51 L120 51 M200 51 L220 51" stroke="#7a7a7a" stroke-width="1"/>'
+'<circle r="4" fill="#ffb020"><animateMotion dur="3s" repeatCount="indefinite" path="M100 51 L120 51 M200 51 L220 51" keyPoints="0;1" keyTimes="0;1"/></circle>'
+'<path d="M110 78 Q160 108 210 78" stroke="#ff4455" stroke-width="1.4" fill="none"/>'
+'<text x="160" y="104" fill="#ff6a5f" font-size="9" text-anchor="middle">86-mile gap = BROKER’S drive</text>'
+'<rect x="46" y="126" width="228" height="26" rx="7" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.1"/>'
+'<text x="160" y="143" fill="#ffb020" font-size="8.5" text-anchor="middle">Mirrored on return · both photo sets compared</text>'
+'<text x="160" y="172" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Delivering brokers get renter-grade verification + a broker agreement</text>'
+'<text x="160" y="186" fill="#7a7a7a" font-size="8" text-anchor="middle">Deposit stays with the asset. Always.</text>'
+'</svg>',

// T7 · The ladder — four rungs, each trading simplicity for margin.
t7_ladder:
'<svg viewBox="0 0 320 208" width="100%" height="208" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">The ladder: simplicity traded for margin, rung by rung</text>'
+'<rect x="20" y="160" width="280" height="28" rx="7" fill="#140a0a" stroke="#d8d8d8"/>'
+'<text x="34" y="178" fill="#ece0df" font-size="9" text-anchor="start">1 · SOURCE LEADS</text>'
+'<text x="296" y="178" fill="#00e5a0" font-size="8.5" text-anchor="end">15–30% · zero risk</text>'
+'<rect x="40" y="124" width="260" height="28" rx="7" fill="#140a0a" stroke="#d8d8d8"/>'
+'<text x="54" y="142" fill="#ece0df" font-size="9" text-anchor="start">2 · FORMALIZE (LLC · records)</text>'
+'<rect x="60" y="88" width="240" height="28" rx="7" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.2"/>'
+'<text x="74" y="106" fill="#ffb020" font-size="9" text-anchor="start">3 · SOURCE CARS</text>'
+'<text x="296" y="106" fill="#ffb020" font-size="8.5" text-anchor="end">~10% of every deal</text>'
+'<rect x="80" y="52" width="220" height="28" rx="7" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.3"/>'
+'<text x="94" y="70" fill="#ff6a5f" font-size="9" text-anchor="start">4 · THE AGENCY</text>'
+'<text x="296" y="70" fill="#ff6a5f" font-size="8.5" text-anchor="end">majority · all risk</text>'
+'<circle r="4" fill="#00e5a0"><animateMotion dur="4s" repeatCount="indefinite" path="M30 174 L50 138 L70 102 L90 66"/></circle>'
+'<text x="160" y="34" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Rung 3: owner 50/50 + agency 60/40 → you keep 10 points forever</text>'
+'<text x="160" y="202" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Every rung is a real place to stay — the reputation stacks upward</text>'
+'</svg>',

// T8 · Every model summons its renter — risk classes side by side.
t8_customer:
'<svg viewBox="0 0 320 204" width="100%" height="204" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">You are choosing a customer, not a car</text>'
+'<rect x="20" y="30" width="88" height="96" rx="9" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.2"/>'
+'<text x="64" y="48" fill="#ff6a5f" font-size="9" text-anchor="middle">M3 / M4 TIER</text>'
+'<text x="64" y="64" fill="#a9a9a9" font-size="7.5" text-anchor="middle">youngest renters</text>'
+'<text x="64" y="76" fill="#a9a9a9" font-size="7.5" text-anchor="middle">hardest driving</text>'
+'<text x="64" y="96" fill="#ff6a5f" font-size="8.5" text-anchor="middle">HIGHEST abuse</text>'
+'<text x="64" y="110" fill="#ff6a5f" font-size="8.5" text-anchor="middle">rate: $400–500</text>'
+'<rect x="116" y="30" width="88" height="96" rx="9" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.2"/>'
+'<text x="160" y="48" fill="#ffb020" font-size="9" text-anchor="middle">2-DOOR SUPER</text>'
+'<text x="160" y="64" fill="#a9a9a9" font-size="7.5" text-anchor="middle">wants THE DRIVE</text>'
+'<text x="160" y="76" fill="#a9a9a9" font-size="7.5" text-anchor="middle">price filters age</text>'
+'<text x="160" y="96" fill="#ffb020" font-size="8.5" text-anchor="middle">high risk · high rate</text>'
+'<text x="160" y="110" fill="#ffb020" font-size="8.5" text-anchor="middle">$1,100–1,300</text>'
+'<rect x="212" y="30" width="88" height="96" rx="9" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.2"/>'
+'<text x="256" y="48" fill="#00e5a0" font-size="9" text-anchor="middle">LUX / SUV</text>'
+'<text x="256" y="64" fill="#a9a9a9" font-size="7.5" text-anchor="middle">renting presence</text>'
+'<text x="256" y="76" fill="#a9a9a9" font-size="7.5" text-anchor="middle">drives like it</text>'
+'<text x="256" y="96" fill="#00e5a0" font-size="8.5" text-anchor="middle">GENTLEST use</text>'
+'<text x="256" y="110" fill="#00e5a0" font-size="8.5" text-anchor="middle">$900–1,200</text>'
+'<circle r="4" fill="#00e5a0"><animateMotion dur="3.4s" repeatCount="indefinite" path="M64 140 L160 140 L256 140"/></circle>'
+'<path d="M64 140 L256 140" stroke="#7a7a7a" stroke-width="1"/>'
+'<text x="64" y="158" fill="#ff6a5f" font-size="8" text-anchor="middle">risk ▲</text>'
+'<text x="256" y="158" fill="#00e5a0" font-size="8" text-anchor="middle">calm ▲</text>'
+'<text x="160" y="180" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Urus: no lip to scrape, less shop time, gentler renters — quietly the better business</text>'
+'<text x="160" y="194" fill="#7a7a7a" font-size="8" text-anchor="middle">Lambos forgive miles at resale; Ferraris punish them</text>'
+'</svg>',

// C1 · The five levers — weight bars, the recipe made visible.
c1_payment:
'<svg viewBox="0 0 320 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">The FICO recipe (approx. — [VERIFY]) — pull the heavy levers first</text>'
+'<text x="96" y="42" fill="#ece0df" font-size="9" text-anchor="end">Payment history</text>'
+'<rect x="104" y="32" width="0" height="14" rx="3" fill="#00e5a0"><animate attributeName="width" values="0;133" dur="1.2s" fill="freeze"/></rect>'
+'<text x="245" y="43" fill="#00e5a0" font-size="8.5" text-anchor="start">35%</text>'
+'<text x="96" y="72" fill="#ece0df" font-size="9" text-anchor="end">Utilization</text>'
+'<rect x="104" y="62" width="0" height="14" rx="3" fill="#00e5a0"><animate attributeName="width" values="0;114" dur="1.2s" begin="0.2s" fill="freeze"/></rect>'
+'<text x="226" y="73" fill="#00e5a0" font-size="8.5" text-anchor="start">30%</text>'
+'<text x="96" y="102" fill="#ece0df" font-size="9" text-anchor="end">Age of file</text>'
+'<rect x="104" y="92" width="0" height="14" rx="3" fill="#ffb020"><animate attributeName="width" values="0;57" dur="1.2s" begin="0.4s" fill="freeze"/></rect>'
+'<text x="169" y="103" fill="#ffb020" font-size="8.5" text-anchor="start">15%</text>'
+'<text x="96" y="132" fill="#ece0df" font-size="9" text-anchor="end">New credit</text>'
+'<rect x="104" y="122" width="0" height="14" rx="3" fill="#ff8a3c"><animate attributeName="width" values="0;38" dur="1.2s" begin="0.6s" fill="freeze"/></rect>'
+'<text x="150" y="133" fill="#ff8a3c" font-size="8.5" text-anchor="start">10%</text>'
+'<text x="96" y="162" fill="#ece0df" font-size="9" text-anchor="end">Mix</text>'
+'<rect x="104" y="152" width="0" height="14" rx="3" fill="#ff8a3c"><animate attributeName="width" values="0;38" dur="1.2s" begin="0.8s" fill="freeze"/></rect>'
+'<text x="150" y="163" fill="#ff8a3c" font-size="8.5" text-anchor="start">10%</text>'
+'<text x="160" y="188" fill="#7a7a7a" font-size="8.5" text-anchor="middle">One 30-day late attacks the 35% — autopay minimums make it impossible</text>'
+'</svg>',

// C1 · The statement-date trick — pay BEFORE the close, choose the number.
c1_utilization:
'<svg viewBox="0 0 320 196" width="100%" height="196" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">Cards report at statement CLOSE — not the due date</text>'
+'<line x1="30" y1="60" x2="290" y2="60" stroke="#3c1d1d" stroke-width="2"/>'
+'<circle cx="90" cy="60" r="5" fill="#ffb020"/>'
+'<text x="90" y="44" fill="#ffb020" font-size="8.5" text-anchor="middle">PAY DOWN HERE</text>'
+'<circle cx="170" cy="60" r="5" fill="#ff4455"/>'
+'<text x="170" y="44" fill="#ff6a5f" font-size="8.5" text-anchor="middle">STATEMENT CLOSE</text>'
+'<text x="170" y="80" fill="#ff6a5f" font-size="7.5" text-anchor="middle">← the bureau’s snapshot</text>'
+'<circle cx="260" cy="60" r="5" fill="#7a7a7a"/>'
+'<text x="260" y="44" fill="#a9a9a9" font-size="8.5" text-anchor="middle">DUE DATE</text>'
+'<text x="260" y="80" fill="#7a7a7a" font-size="7.5" text-anchor="middle">too late to matter</text>'
+'<circle r="4" fill="#ffb020"><animateMotion dur="2.6s" repeatCount="indefinite" path="M60 60 L90 60"/></circle>'
+'<rect x="30" y="104" width="122" height="52" rx="8" fill="#1a0d0d" stroke="#ff4455" stroke-width="1.1"/>'
+'<text x="91" y="122" fill="#ff6a5f" font-size="8.5" text-anchor="middle">Pay at due date:</text>'
+'<text x="91" y="136" fill="#ff6a5f" font-size="9.5" text-anchor="middle">reports 75%</text>'
+'<text x="91" y="149" fill="#a9a9a9" font-size="7.5" text-anchor="middle">score sags — no interest paid</text>'
+'<rect x="168" y="104" width="122" height="52" rx="8" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.2"/>'
+'<text x="229" y="122" fill="#00e5a0" font-size="8.5" text-anchor="middle">Pay before close (AZEO):</text>'
+'<text x="229" y="136" fill="#00e5a0" font-size="9.5" text-anchor="middle">reports 1–9% on one card</text>'
+'<text x="229" y="149" fill="#a9a9a9" font-size="7.5" text-anchor="middle">same spending — tuned snapshot</text>'
+'<text x="160" y="182" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Utilization has no memory: fix it this cycle, score responds this cycle</text>'
+'</svg>',

// C3 · The vendor ladder — tiers of business credit, climbed in order.
c3_tiers:
'<svg viewBox="0 0 320 208" width="100%" height="208" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">The business-credit ladder — reporting lines only</text>'
+'<rect x="20" y="164" width="280" height="26" rx="7" fill="#140a0a" stroke="#d8d8d8"/>'
+'<text x="32" y="181" fill="#ece0df" font-size="8.5" text-anchor="start">T1 · reporting net-30 vendors — mo. 0+ · pay EARLY</text>'
+'<rect x="40" y="130" width="260" height="26" rx="7" fill="#140a0a" stroke="#d8d8d8"/>'
+'<text x="52" y="147" fill="#ece0df" font-size="8.5" text-anchor="start">T2 · store + FLEET FUEL cards — mo. 3–6</text>'
+'<rect x="60" y="96" width="240" height="26" rx="7" fill="#1c0e0e" stroke="#ffb020" stroke-width="1.1"/>'
+'<text x="72" y="113" fill="#ffb020" font-size="8.5" text-anchor="start">T3 · business cards (PG + your FICO) — mo. 6–12</text>'
+'<rect x="80" y="62" width="220" height="26" rx="7" fill="#0f1a12" stroke="#00e5a0" stroke-width="1.2"/>'
+'<text x="92" y="79" fill="#00e5a0" font-size="8.5" text-anchor="start">T4 · bank LOC / vehicle notes — yr 2+</text>'
+'<circle r="4" fill="#00e5a0"><animateMotion dur="4s" repeatCount="indefinite" path="M30 177 L50 143 L70 109 L90 75"/></circle>'
+'<text x="160" y="34" fill="#7a7a7a" font-size="8.5" text-anchor="middle">PAYDEX 80 = on time · 90+ = paying weeks EARLY (dollar-weighted)</text>'
+'<text x="160" y="204" fill="#7a7a7a" font-size="8" text-anchor="middle">Every rung: confirm the line REPORTS before opening — non-reporting lines build nothing</text>'
+'</svg>',

// C4 · The specialty desk weighs borrower AND asset.
c4_lenders:
'<svg viewBox="0 0 320 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">'
+'<text x="160" y="14" fill="#a9a9a9" font-size="10" text-anchor="middle">The specialty desk underwrites the PAIR: borrower + asset</text>'
+'<line x1="160" y1="34" x2="160" y2="64" stroke="#d8d8d8" stroke-width="2"/>'
+'<line x1="70" y1="64" x2="250" y2="64" stroke="#d8d8d8" stroke-width="2">'
+'<animateTransform attributeName="transform" type="rotate" values="-3 160 64;3 160 64;-3 160 64" dur="5s" repeatCount="indefinite"/></line>'
+'<g><animateTransform attributeName="transform" type="rotate" values="-3 160 64;3 160 64;-3 160 64" dur="5s" repeatCount="indefinite"/>'
+'<line x1="70" y1="64" x2="70" y2="84" stroke="#7a7a7a" stroke-width="1"/>'
+'<rect x="22" y="84" width="96" height="60" rx="9" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="70" y="101" fill="#ece0df" font-size="9" text-anchor="middle">BORROWER</text>'
+'<text x="70" y="115" fill="#a9a9a9" font-size="7.5" text-anchor="middle">FICO Auto · DTI</text>'
+'<text x="70" y="127" fill="#a9a9a9" font-size="7.5" text-anchor="middle">reserves · C1–C3 story</text>'
+'<text x="70" y="139" fill="#00e5a0" font-size="7.5" text-anchor="middle">the file you engineered</text>'
+'<line x1="250" y1="64" x2="250" y2="84" stroke="#7a7a7a" stroke-width="1"/>'
+'<rect x="202" y="84" width="96" height="60" rx="9" fill="#140a0a" stroke="#d8d8d8" stroke-width="1.1"/>'
+'<text x="250" y="101" fill="#ece0df" font-size="9" text-anchor="middle">ASSET</text>'
+'<text x="250" y="115" fill="#a9a9a9" font-size="7.5" text-anchor="middle">model · miles · spec</text>'
+'<text x="250" y="127" fill="#a9a9a9" font-size="7.5" text-anchor="middle">their resale view</text>'
+'<text x="250" y="139" fill="#ffb020" font-size="7.5" text-anchor="middle">they price the repo</text>'
+'</g>'
+'<text x="160" y="168" fill="#7a7a7a" font-size="8.5" text-anchor="middle">Weakness on one side must be carried by the other</text>'
+'<text x="160" y="184" fill="#7a7a7a" font-size="8" text-anchor="middle">120–144mo terms crush payments — and stretch the underwater years [VERIFY]</text>'
+'</svg>'


};
