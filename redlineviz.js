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
+'</svg>'

};
