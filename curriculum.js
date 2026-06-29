// ============================================================
// APEX — NUC-NF Academy curriculum
// Loaded before the main app script. Defines CURRICULUM + composite metadata.
// Content is a study aid, not an official source. Math/AR/MK is authored in
// depth; EI/GS/MC/VE/NPS ship with solid starter content and expand over time.
// Schema per topic: {id, sub, phase, title, concept(html), example(html?),
//   cards:[{f,b}], quiz:[{q, c:[...], a:index, e:explanation}]}
// ============================================================

// ASVAB subtests that feed the NF composites + how composites are built.
var ASVAB_SUBS = {
  AR: { name:'Arithmetic Reasoning', phase:1 },
  MK: { name:'Mathematics Knowledge', phase:1 },
  EI: { name:'Electronics Information', phase:2 },
  GS: { name:'General Science', phase:2 },
  MC: { name:'Mechanical Comprehension', phase:2 },
  WK: { name:'Word Knowledge', phase:3 },
  PC: { name:'Paragraph Comprehension', phase:3 }
};
// VE (Verbal Expression) = WK + PC. NF composites & gates:
var NF_COMPOSITES = {
  comp1: { label:'AR + MK + EI + GS', subs:['AR','MK','EI','GS'] },
  comp2: { label:'VE + AR + MK + MC', subs:['VE','AR','MK','MC'] }
};
var NF_GATES = { pass:252, floor235:235, hardMin:225, afqt:50 };

var CURRICULUM = [

// ───────────────────────── PHASE 1 · ARITHMETIC REASONING (AR) ─────────────────────────
{ id:'ar_whole', sub:'AR', phase:1, title:'Whole-number operations',
  concept:'<p>AR is word problems with no calculator. Start by translating the words into an operation: "total/sum"=add, "difference/left"=subtract, "of/product/each"=multiply, "split/per/share"=divide. Line up place values and work carefully — most AR errors are arithmetic slips, not logic.</p>',
  example:'<p><b>Ex:</b> A crew loads 1,248 crates over 6 equal shifts. How many per shift?</p><p>1,248 ÷ 6. 12÷6=2, 4÷6=0 r4, 48÷6=8 → <b>208 crates/shift</b>.</p>',
  cards:[
    {f:'Keyword "per" or "each" usually means…', b:'Divide (or set up a unit rate).'},
    {f:'Keyword "of" (e.g., 20% of 50) means…', b:'Multiply.'},
    {f:'Estimate first, then compute — why?', b:'To catch place-value/decimal slips before committing to an answer.'}
  ],
  quiz:[
    {q:'A warehouse ships 84 boxes a day for 2 weeks (14 days). Total boxes?', c:['1,176','1,008','98','1,260'], a:0, e:'84 × 14 = 84×10 + 84×4 = 840 + 336 = 1,176.'},
    {q:'You have $200 and spend $47, $58, and $39. How much is left?', c:['$56','$66','$144','$56.00'], a:0, e:'47+58+39 = 144; 200 − 144 = 56.'}
  ]},
{ id:'ar_frac', sub:'AR', phase:1, title:'Fractions & mixed numbers',
  concept:'<p>Add/subtract fractions need a common denominator; multiply tops×tops and bottoms×bottoms; divide by multiplying by the reciprocal ("keep–change–flip"). Convert mixed numbers to improper fractions before multiplying or dividing.</p>',
  example:'<p><b>Ex:</b> 2/3 ÷ 4/9 = 2/3 × 9/4 = 18/12 = <b>3/2 = 1½</b>.</p>',
  cards:[
    {f:'To divide fractions you…', b:'Keep the first, change ÷ to ×, flip (reciprocal) the second.'},
    {f:'3/4 + 1/6 = ?', b:'Common denom 12: 9/12 + 2/12 = 11/12.'},
    {f:'Convert 2⅗ to an improper fraction', b:'(2×5 + 3)/5 = 13/5.'}
  ],
  quiz:[
    {q:'A recipe needs ¾ cup, you make it 3 times. Total cups?', c:['2¼','2½','1¾','3'], a:0, e:'¾ × 3 = 9/4 = 2¼.'},
    {q:'5/6 − 1/3 = ?', c:['1/2','4/3','2/3','1/6'], a:0, e:'1/3 = 2/6; 5/6 − 2/6 = 3/6 = 1/2.'}
  ]},
{ id:'ar_dec', sub:'AR', phase:1, title:'Decimals & decimal↔fraction',
  concept:'<p>Align decimal points to add/subtract. To multiply, ignore the points, multiply, then place the decimal so the answer has as many decimal places as both factors combined. A fraction converts to a decimal by dividing top by bottom.</p>',
  example:'<p><b>Ex:</b> 0.3 × 0.04 → 3×4=12, total 3 decimal places → <b>0.012</b>.</p>',
  cards:[
    {f:'5/8 as a decimal', b:'5 ÷ 8 = 0.625.'},
    {f:'Multiplying 1.2 × 0.5: how many decimal places in answer?', b:'2 (one + one) → 0.60.'},
    {f:'0.75 as a fraction', b:'75/100 = 3/4.'}
  ],
  quiz:[
    {q:'A bolt is 0.45 in; a stack of 6 is how thick?', c:['2.70 in','0.270 in','27 in','2.45 in'], a:0, e:'0.45 × 6 = 2.70.'}
  ]},
{ id:'ar_pct', sub:'AR', phase:1, title:'Percentages, tax, interest, % change',
  concept:'<p>"Percent" means per-100. Convert % to a decimal (move point 2 left) and multiply. <b>Percent change = (new − old)/old × 100</b>. Simple interest <b>I = P·r·t</b>. Discount price = original × (1 − rate).</p>',
  example:'<p><b>Ex:</b> $80 jacket, 25% off → 80 × 0.25 = $20 off → pay <b>$60</b>.</p>',
  cards:[
    {f:'Percent change formula', b:'(new − old) / old × 100%.'},
    {f:'Simple interest formula', b:'I = P × r × t (principal, rate, time).'},
    {f:'15% of 60 (mental)', b:'10% = 6, 5% = 3 → 9.'}
  ],
  quiz:[
    {q:'A salary rises from $40,000 to $46,000. Percent increase?', c:['15%','6%','13%','12%'], a:0, e:'(46,000−40,000)/40,000 = 6,000/40,000 = 0.15 = 15%.'},
    {q:'$500 at 4% simple interest for 3 years earns…', c:['$60','$20','$600','$540'], a:0, e:'I = 500 × 0.04 × 3 = $60.'}
  ]},
{ id:'ar_ratio', sub:'AR', phase:1, title:'Ratios, proportions & rates',
  concept:'<p>A ratio compares quantities (3:2). A proportion sets two ratios equal — solve by cross-multiplying. A rate is a ratio with different units (miles/hour); a <b>unit rate</b> has 1 in the denominator. Distance = rate × time.</p>',
  example:'<p><b>Ex:</b> 3 pumps fill a tank in 8 h. How long for 4 pumps (more pumps → less time, inverse)? 3×8 = 4×t → t = 24/4 = <b>6 h</b>.</p>',
  cards:[
    {f:'Solve a proportion by…', b:'Cross-multiplying: a/b = c/d → a·d = b·c.'},
    {f:'Distance–rate–time relationship', b:'d = r × t (so r = d/t, t = d/r).'},
    {f:'Unit rate of 150 miles in 3 hours', b:'50 miles per hour.'}
  ],
  quiz:[
    {q:'A car goes 165 miles in 3 hours. At that rate, how far in 5 hours?', c:['275 mi','225 mi','330 mi','55 mi'], a:0, e:'Rate 165/3 = 55 mph; 55 × 5 = 275.'},
    {q:'Map scale 1 in = 20 mi. Two towns are 3.5 in apart = ?', c:['70 mi','35 mi','23.5 mi','700 mi'], a:0, e:'3.5 × 20 = 70 miles.'}
  ]},
{ id:'ar_avg', sub:'AR', phase:1, title:'Averages: mean, median, mode',
  concept:'<p><b>Mean</b> = sum ÷ count. <b>Median</b> = middle value when ordered (average the two middles if even count). <b>Mode</b> = most frequent. A missing-value problem: total = mean × count, then subtract the knowns.</p>',
  example:'<p><b>Ex:</b> Scores 80, 90, x average 85 over 3 tests. Total = 85×3 = 255; x = 255 − 170 = <b>85</b>.</p>',
  cards:[
    {f:'Mean of 4, 8, 10, 10', b:'(4+8+10+10)/4 = 32/4 = 8.'},
    {f:'Median of 3, 7, 9, 12 (even count)', b:'Average the middle two: (7+9)/2 = 8.'},
    {f:'To find a needed score for a target average…', b:'target × count − (sum of known scores).'}
  ],
  quiz:[
    {q:'Four boxes weigh 12, 15, 18, 15 lb. Mean weight?', c:['15 lb','14 lb','16 lb','60 lb'], a:0, e:'(12+15+18+15)/4 = 60/4 = 15.'}
  ]},
{ id:'ar_prob', sub:'AR', phase:1, title:'Basic probability',
  concept:'<p><b>Probability = favorable outcomes ÷ total outcomes</b>, a value from 0 to 1. For independent events ("and"), multiply. For mutually exclusive events ("or"), add. The complement (not happening) is 1 − P.</p>',
  example:'<p><b>Ex:</b> One die, P(rolling a 5) = 1/6. P(rolling 5 or 6) = 1/6 + 1/6 = <b>1/3</b>.</p>',
  cards:[
    {f:'Probability formula', b:'favorable outcomes / total outcomes.'},
    {f:'P(A and B) for independent events', b:'Multiply: P(A) × P(B).'},
    {f:'Complement of an event with P = 0.7', b:'1 − 0.7 = 0.3.'}
  ],
  quiz:[
    {q:'A bag has 3 red and 5 blue marbles. P(red)?', c:['3/8','3/5','5/8','1/3'], a:0, e:'3 red / 8 total = 3/8.'}
  ]},
{ id:'ar_numprop', sub:'AR', phase:1, title:'Number properties: factors, LCM, GCF, primes',
  concept:'<p><b>Factors</b> divide evenly; <b>multiples</b> are products. <b>GCF</b> (greatest common factor) is the largest shared factor; <b>LCM</b> (least common multiple) is the smallest shared multiple. A <b>prime</b> has exactly two factors (1 and itself). Even = divisible by 2.</p>',
  cards:[
    {f:'GCF of 12 and 18', b:'6 (factors shared: 1,2,3,6 → greatest 6).'},
    {f:'LCM of 4 and 6', b:'12.'},
    {f:'Is 1 prime?', b:'No — a prime has exactly two distinct factors; 1 has only one.'}
  ],
  quiz:[
    {q:'Which is prime?', c:['29','27','21','33'], a:0, e:'27=3³, 21=3×7, 33=3×11; 29 has only 1 and 29.'}
  ]},
{ id:'ar_geo', sub:'AR', phase:1, title:'Applied geometry in word problems',
  concept:'<p>Many AR problems hide geometry: <b>Area</b> of a rectangle = L×W, <b>perimeter</b> = 2(L+W); triangle area = ½·b·h; <b>volume</b> of a box = L×W×H. Read for which quantity is asked (covering = area, fencing = perimeter, filling = volume).</p>',
  example:'<p><b>Ex:</b> A room 12 ft × 10 ft needs flooring. Area = 120 ft². At $3/ft² → <b>$360</b>.</p>',
  cards:[
    {f:'Perimeter vs area — which for fencing a yard?', b:'Perimeter (distance around).'},
    {f:'Volume of a 2×3×4 ft crate', b:'2×3×4 = 24 ft³.'},
    {f:'Area of a triangle', b:'½ × base × height.'}
  ],
  quiz:[
    {q:'A tank is 5 ft × 4 ft × 2 ft. Its volume?', c:['40 ft³','22 ft³','11 ft³','20 ft³'], a:0, e:'5×4×2 = 40 cubic feet.'}
  ]},

// ───────────────────────── PHASE 1 · MATHEMATICS KNOWLEDGE (MK) ─────────────────────────
{ id:'mk_int', sub:'MK', phase:1, title:'Integers & order of operations',
  concept:'<p>Follow <b>PEMDAS</b> (Parentheses, Exponents, Multiply/Divide left→right, Add/Subtract left→right). Sign rules: a negative × negative = positive; subtracting a negative adds.</p>',
  example:'<p><b>Ex:</b> 3 + 2 × (5 − 1)² = 3 + 2 × 16 = 3 + 32 = <b>35</b>.</p>',
  cards:[
    {f:'PEMDAS order', b:'Parentheses, Exponents, ×/÷ (L→R), +/− (L→R).'},
    {f:'−6 − (−4) = ?', b:'−6 + 4 = −2.'},
    {f:'(−3)(−5) = ?', b:'+15 (negative × negative).'}
  ],
  quiz:[
    {q:'Evaluate 12 − 4 × 2 + 1', c:['5','17','9','3'], a:0, e:'Multiply first: 4×2=8 → 12 − 8 + 1 = 5.'}
  ]},
{ id:'mk_exp', sub:'MK', phase:1, title:'Exponents, roots & scientific notation',
  concept:'<p>Exponent rules: xᵃ·xᵇ = xᵃ⁺ᵇ, xᵃ/xᵇ = xᵃ⁻ᵇ, (xᵃ)ᵇ = xᵃᵇ, x⁰ = 1. A square root undoes squaring (√49 = 7). Scientific notation writes numbers as a × 10ⁿ where 1 ≤ a < 10.</p>',
  example:'<p><b>Ex:</b> x³ · x⁴ = x⁷. And 4,500 = <b>4.5 × 10³</b>.</p>',
  cards:[
    {f:'x⁵ · x² = ?', b:'x⁷ (add exponents).'},
    {f:'Anything to the 0 power =', b:'1.'},
    {f:'√144 = ?', b:'12.'}
  ],
  quiz:[
    {q:'Simplify (2³)²', c:['64','12','32','16'], a:0, e:'(2³)² = 2⁶ = 64.'},
    {q:'0.0042 in scientific notation', c:['4.2 × 10⁻³','4.2 × 10³','42 × 10⁻³','4.2 × 10⁻²'], a:0, e:'Move the point 3 right → exponent −3.'}
  ]},
{ id:'mk_lin', sub:'MK', phase:1, title:'Linear equations & inequalities',
  concept:'<p>Isolate the variable by doing the same operation to both sides. With inequalities, the symbol <b>flips</b> when you multiply or divide by a negative.</p>',
  example:'<p><b>Ex:</b> 3x − 5 = 16 → 3x = 21 → x = 7. And −2x &lt; 8 → x &gt; −4 (flip).</p>',
  cards:[
    {f:'Solve 5x + 3 = 28', b:'5x = 25 → x = 5.'},
    {f:'When does an inequality sign flip?', b:'When multiplying/dividing both sides by a negative number.'},
    {f:'Solve x/4 = 9', b:'x = 36.'}
  ],
  quiz:[
    {q:'Solve 2(x − 3) = 10', c:['x = 8','x = 5','x = 2','x = 11'], a:0, e:'2x − 6 = 10 → 2x = 16 → x = 8.'},
    {q:'Solve −3x ≥ 9', c:['x ≤ −3','x ≥ −3','x ≤ 3','x ≥ 3'], a:0, e:'Divide by −3 and flip: x ≤ −3.'}
  ]},
{ id:'mk_sys', sub:'MK', phase:1, title:'Systems of equations',
  concept:'<p>Two equations, two unknowns. <b>Substitution:</b> solve one for a variable, plug into the other. <b>Elimination:</b> add/subtract the equations to cancel a variable.</p>',
  example:'<p><b>Ex:</b> x+y=10, x−y=4. Add → 2x=14 → x=7, then y=3.</p>',
  cards:[
    {f:'Elimination works by…', b:'Adding/subtracting equations so one variable cancels.'},
    {f:'x + y = 12 and x = y + 2 → solve', b:'(y+2)+y=12 → y=5, x=7.'}
  ],
  quiz:[
    {q:'If 2x + y = 11 and y = 3, then x =', c:['4','7','5','8'], a:0, e:'2x + 3 = 11 → 2x = 8 → x = 4.'}
  ]},
{ id:'mk_poly', sub:'MK', phase:1, title:'Polynomials, FOIL & factoring',
  concept:'<p>Combine like terms to add/subtract. Multiply two binomials with <b>FOIL</b> (First, Outer, Inner, Last). Factoring reverses this — find two numbers that multiply to the constant and add to the middle coefficient.</p>',
  example:'<p><b>Ex:</b> (x+3)(x+2) = x² + 5x + 6. Factor x² + 7x + 12 = (x+3)(x+4).</p>',
  cards:[
    {f:'FOIL stands for', b:'First, Outer, Inner, Last.'},
    {f:'(x+5)(x−5) = ?', b:'x² − 25 (difference of squares).'},
    {f:'Factor x² − 9', b:'(x+3)(x−3).'}
  ],
  quiz:[
    {q:'Expand (x + 4)(x + 1)', c:['x² + 5x + 4','x² + 4x + 1','x² + 5x + 5','x² + 4'], a:0, e:'F:x², O:x, I:4x, L:4 → x² + 5x + 4.'}
  ]},
{ id:'mk_quad', sub:'MK', phase:1, title:'Quadratics',
  concept:'<p>A quadratic is ax² + bx + c = 0. Solve simple ones by factoring and setting each factor to zero. If it does not factor cleanly, the quadratic formula x = (−b ± √(b²−4ac)) / 2a always works.</p>',
  example:'<p><b>Ex:</b> x² − 5x + 6 = 0 → (x−2)(x−3)=0 → x = 2 or 3.</p>',
  cards:[
    {f:'Zero-product property', b:'If A·B = 0 then A = 0 or B = 0.'},
    {f:'Quadratic formula', b:'x = (−b ± √(b² − 4ac)) / (2a).'}
  ],
  quiz:[
    {q:'Solve x² − 4 = 0', c:['x = ±2','x = 4','x = 2 only','x = ±4'], a:0, e:'x² = 4 → x = ±2.'}
  ]},
{ id:'mk_geo2d', sub:'MK', phase:1, title:'Geometry — angles & triangles',
  concept:'<p>Angles on a line sum to 180°; around a point 360°. <b>Complementary</b> add to 90°, <b>supplementary</b> to 180°, <b>vertical</b> angles are equal. A triangle\'s angles sum to 180°. <b>Pythagorean theorem:</b> a² + b² = c² (right triangles).</p>',
  example:'<p><b>Ex:</b> Right triangle legs 3 and 4 → hypotenuse √(9+16) = √25 = <b>5</b>.</p>',
  cards:[
    {f:'Sum of a triangle\'s interior angles', b:'180°.'},
    {f:'Complementary angles add to…', b:'90°.'},
    {f:'Pythagorean theorem', b:'a² + b² = c² (c is the hypotenuse).'}
  ],
  quiz:[
    {q:'Two angles are supplementary; one is 130°. The other is…', c:['50°','230°','40°','60°'], a:0, e:'Supplementary sum to 180°: 180 − 130 = 50°.'},
    {q:'Right triangle legs 6 and 8 → hypotenuse?', c:['10','14','12','48'], a:0, e:'√(36+64) = √100 = 10.'}
  ]},
{ id:'mk_geo_area', sub:'MK', phase:1, title:'Geometry — area, perimeter, circles',
  concept:'<p>Rectangle area = L·W; parallelogram = b·h; trapezoid = ½(b₁+b₂)·h. <b>Circle:</b> area = πr², circumference = 2πr (π ≈ 3.14). Perimeter is the distance around.</p>',
  example:'<p><b>Ex:</b> Circle radius 5 → area = π·25 ≈ <b>78.5</b>; circumference = 2π·5 ≈ 31.4.</p>',
  cards:[
    {f:'Area of a circle', b:'πr².'},
    {f:'Circumference of a circle', b:'2πr (or πd).'},
    {f:'Area of a triangle', b:'½ × base × height.'}
  ],
  quiz:[
    {q:'A circle has radius 3. Its area (π≈3.14)?', c:['≈28.3','≈18.8','≈9.4','≈6.3'], a:0, e:'πr² = 3.14 × 9 ≈ 28.3.'}
  ]},
{ id:'mk_geo3d', sub:'MK', phase:1, title:'Geometry — 3D volume',
  concept:'<p>Volume of a prism/cylinder = base area × height. Box = L·W·H; cylinder = πr²·h; sphere = (4/3)πr³; cone = (1/3)πr²·h.</p>',
  cards:[
    {f:'Volume of a cylinder', b:'πr²h.'},
    {f:'Volume of a sphere', b:'(4/3)πr³.'},
    {f:'Volume of a cone vs a cylinder of same base/height', b:'Cone is 1/3 of the cylinder.'}
  ],
  quiz:[
    {q:'A cylinder radius 2, height 5 (π≈3.14). Volume?', c:['≈62.8','≈31.4','≈20','≈125.6'], a:0, e:'πr²h = 3.14 × 4 × 5 ≈ 62.8.'}
  ]},
{ id:'mk_coord', sub:'MK', phase:1, title:'Coordinate geometry: slope, distance, midpoint',
  concept:'<p><b>Slope</b> m = (y₂−y₁)/(x₂−x₁) = rise/run. <b>Midpoint</b> = ((x₁+x₂)/2, (y₁+y₂)/2). <b>Distance</b> = √((x₂−x₁)² + (y₂−y₁)²). Line form y = mx + b (b = y-intercept).</p>',
  example:'<p><b>Ex:</b> Points (1,2) and (4,8): slope = (8−2)/(4−1) = 6/3 = <b>2</b>.</p>',
  cards:[
    {f:'Slope formula', b:'(y₂ − y₁)/(x₂ − x₁), i.e., rise/run.'},
    {f:'In y = mx + b, what is b?', b:'The y-intercept (where the line crosses the y-axis).'},
    {f:'Midpoint of (0,0) and (6,4)', b:'(3, 2).'}
  ],
  quiz:[
    {q:'Slope of the line through (2,3) and (5,9)?', c:['2','3','1/2','6'], a:0, e:'(9−3)/(5−2) = 6/3 = 2.'}
  ]},
{ id:'mk_trig', sub:'MK', phase:1, title:'Right-triangle trig (SOH-CAH-TOA)',
  concept:'<p>For a right triangle: <b>sin = Opp/Hyp, cos = Adj/Hyp, tan = Opp/Adj</b> (SOH-CAH-TOA). Use the side you know relative to the angle to pick the ratio.</p>',
  example:'<p><b>Ex:</b> Opp = 3, Hyp = 5 → sin θ = 3/5 = 0.6.</p>',
  cards:[
    {f:'SOH-CAH-TOA', b:'Sin=Opp/Hyp, Cos=Adj/Hyp, Tan=Opp/Adj.'},
    {f:'tan θ if Opp=4, Adj=3', b:'4/3 ≈ 1.33.'}
  ],
  quiz:[
    {q:'In a right triangle, Adj=8, Hyp=10. cos θ = ?', c:['0.8','0.6','1.25','0.75'], a:0, e:'cos = Adj/Hyp = 8/10 = 0.8.'}
  ]},

// ───────────────────────── PHASE 2 · ELECTRONICS INFORMATION (EI) ─────────────────────────
{ id:'ei_atom', sub:'EI', phase:2, title:'Atomic basis of electricity',
  concept:'<p>Current is the flow of electrons. Atoms have protons (+), neutrons (0), and electrons (−). Electrons in the outer <b>valence</b> shell can move; materials with loosely held valence electrons conduct well.</p>',
  cards:[
    {f:'Charge carriers in a wire', b:'Electrons (negative charge).'},
    {f:'Valence shell', b:'The outermost electron shell; determines conductivity/bonding.'}
  ],
  quiz:[
    {q:'Which particle carries negative charge?', c:['Electron','Proton','Neutron','Nucleus'], a:0, e:'Electrons are negative; protons positive; neutrons neutral.'}
  ]},
{ id:'ei_cond', sub:'EI', phase:2, title:'Conductors, insulators, semiconductors',
  concept:'<p><b>Conductors</b> (copper, silver, gold, aluminum) let current flow easily. <b>Insulators</b> (rubber, glass, plastic) resist it. <b>Semiconductors</b> (silicon, germanium) are in between and are the basis of diodes and transistors.</p>',
  cards:[
    {f:'Best everyday conductor used in wiring', b:'Copper (silver is best but costly).'},
    {f:'Example of an insulator', b:'Rubber, glass, or plastic.'},
    {f:'Semiconductor material', b:'Silicon (or germanium).'}
  ],
  quiz:[
    {q:'Which is the best electrical conductor?', c:['Silver','Rubber','Glass','Wood'], a:0, e:'Silver has the highest conductivity of common materials.'}
  ]},
{ id:'ei_ohm', sub:'EI', phase:2, title:'Voltage, current, resistance & Ohm\'s Law',
  concept:'<p><b>Voltage (V, volts)</b> = electrical pressure. <b>Current (I, amps)</b> = flow rate. <b>Resistance (R, ohms Ω)</b> = opposition to flow. <b>Ohm\'s Law: V = I × R.</b> <b>Power: P = V × I</b> (watts).</p>',
  example:'<p><b>Ex:</b> 12 V across 4 Ω → I = V/R = 12/4 = <b>3 A</b>. Power = 12 × 3 = 36 W.</p>',
  cards:[
    {f:'Ohm\'s Law', b:'V = I × R (so I = V/R, R = V/I).'},
    {f:'Electrical power formula', b:'P = V × I (watts).'},
    {f:'Unit of resistance', b:'Ohm (Ω).'}
  ],
  quiz:[
    {q:'A 24 V source drives 2 A. The resistance is…', c:['12 Ω','48 Ω','26 Ω','0.083 Ω'], a:0, e:'R = V/I = 24/2 = 12 Ω.'},
    {q:'A device draws 5 A at 120 V. Power consumed?', c:['600 W','24 W','125 W','115 W'], a:0, e:'P = V×I = 120 × 5 = 600 W.'}
  ]},
{ id:'ei_circuits', sub:'EI', phase:2, title:'Series vs parallel circuits',
  concept:'<p><b>Series:</b> one path — current is the same everywhere, resistances add, voltage divides. <b>Parallel:</b> multiple paths — voltage is the same across each branch, currents add, total resistance is less than the smallest branch.</p>',
  cards:[
    {f:'In a series circuit, resistances…', b:'Add up (R_total = R₁+R₂+…).'},
    {f:'In a parallel circuit, voltage across each branch is…', b:'The same.'},
    {f:'Remove one bulb in a series string — what happens?', b:'All go out (single path broken).'}
  ],
  quiz:[
    {q:'Two 6 Ω resistors in series total…', c:['12 Ω','3 Ω','6 Ω','36 Ω'], a:0, e:'Series adds: 6 + 6 = 12 Ω.'},
    {q:'Two 6 Ω resistors in parallel total…', c:['3 Ω','12 Ω','6 Ω','1 Ω'], a:0, e:'Equal parallel resistors: R/2 = 3 Ω.'}
  ]},
{ id:'ei_acdc', sub:'EI', phase:2, title:'AC vs DC, transformers, components',
  concept:'<p><b>DC</b> flows one direction (batteries); <b>AC</b> reverses periodically (wall outlets, the grid). A <b>transformer</b> changes AC voltage: more turns on the secondary = step-up, fewer = step-down. <b>Capacitors</b> store charge; <b>inductors</b> store energy in a magnetic field; <b>diodes</b> allow one-way flow; <b>fuses</b> break the circuit on overcurrent.</p>',
  cards:[
    {f:'AC vs DC', b:'AC reverses direction periodically; DC flows one way.'},
    {f:'Step-up transformer has…', b:'More turns on the secondary coil than the primary.'},
    {f:'A diode does what?', b:'Allows current in one direction only.'},
    {f:'A fuse protects by…', b:'Melting/opening the circuit when current is too high.'}
  ],
  quiz:[
    {q:'Wall outlets in the U.S. supply…', c:['AC','DC','Both equally','Neither'], a:0, e:'The grid delivers alternating current (AC).'},
    {q:'A component that stores electric charge is a…', c:['Capacitor','Resistor','Fuse','Diode'], a:0, e:'Capacitors store charge between plates.'}
  ]},

// ───────────────────────── PHASE 2 · GENERAL SCIENCE (GS) ─────────────────────────
{ id:'gs_newton', sub:'GS', phase:2, title:'Physics: Newton\'s laws, work, energy',
  concept:'<p><b>1st law:</b> objects keep their motion unless a force acts (inertia). <b>2nd:</b> F = m·a. <b>3rd:</b> every action has an equal and opposite reaction. <b>Work = force × distance</b>; <b>Power = work/time</b>. Kinetic energy = motion; potential = stored (height).</p>',
  cards:[
    {f:'Newton\'s 2nd law formula', b:'F = m × a.'},
    {f:'Work formula', b:'Work = Force × distance (joules).'},
    {f:'Kinetic vs potential energy', b:'Kinetic = energy of motion; potential = stored (e.g., height).'}
  ],
  quiz:[
    {q:'A 10 kg cart accelerates at 3 m/s². Force?', c:['30 N','13 N','3.3 N','300 N'], a:0, e:'F = ma = 10 × 3 = 30 N.'},
    {q:'"Every action has an equal and opposite reaction" is Newton\'s…', c:['3rd law','1st law','2nd law','law of gravity'], a:0, e:'That is the third law.'}
  ]},
{ id:'gs_matter', sub:'GS', phase:2, title:'Physics: heat, waves, states of matter, density',
  concept:'<p>Heat moves by <b>conduction</b> (contact), <b>convection</b> (fluid motion), and <b>radiation</b> (waves). Matter states: solid, liquid, gas, plasma; phase changes (melting, boiling) absorb/release energy. <b>Density = mass/volume.</b> Waves have frequency, wavelength, and amplitude.</p>',
  cards:[
    {f:'Three modes of heat transfer', b:'Conduction, convection, radiation.'},
    {f:'Density formula', b:'Density = mass / volume.'},
    {f:'Heat transfer through empty space (e.g., the Sun) is…', b:'Radiation.'}
  ],
  quiz:[
    {q:'Boiling water heats a pot handle by…', c:['Conduction','Convection','Radiation','Fission'], a:0, e:'Direct contact through the metal = conduction.'},
    {q:'An object mass 20 g, volume 5 cm³. Density?', c:['4 g/cm³','100 g/cm³','0.25 g/cm³','25 g/cm³'], a:0, e:'20/5 = 4 g/cm³.'}
  ]},
{ id:'gs_chem', sub:'GS', phase:2, title:'Chemistry: atoms, periodic table, acids/bases, reactions',
  concept:'<p>The periodic table organizes elements by atomic number (proton count). <b>Compounds</b> are chemically bonded elements; <b>mixtures</b> are not. A <b>chemical change</b> makes a new substance; a physical change does not. The <b>pH scale</b> runs 0–14: &lt;7 acid, 7 neutral, &gt;7 base. <b>Fission</b> splits nuclei; <b>fusion</b> joins them.</p>',
  cards:[
    {f:'pH 7 means…', b:'Neutral (e.g., pure water).'},
    {f:'Atomic number equals the number of…', b:'Protons.'},
    {f:'Fission vs fusion', b:'Fission splits a heavy nucleus; fusion combines light nuclei.'},
    {f:'Rusting iron is a chemical or physical change?', b:'Chemical (a new substance forms).'}
  ],
  quiz:[
    {q:'A substance with pH 2 is…', c:['A strong acid','A base','Neutral','A salt'], a:0, e:'pH below 7 is acidic; pH 2 is strongly acidic.'},
    {q:'Nuclear reactors generate energy primarily by…', c:['Fission','Fusion','Combustion','Convection'], a:0, e:'Power reactors split (fission) uranium nuclei.'}
  ]},
{ id:'gs_earth', sub:'GS', phase:2, title:'Earth & space science',
  concept:'<p>Earth\'s layers: crust, mantle, outer core (liquid), inner core (solid). The <b>rock cycle</b> and <b>water cycle</b> recycle materials (evaporation→condensation→precipitation). The atmosphere layers from the ground up: troposphere, stratosphere, mesosphere, thermosphere. The <b>electromagnetic spectrum</b> ranges from radio (long wavelength) to gamma (short).</p>',
  cards:[
    {f:'Order of the water cycle', b:'Evaporation → condensation → precipitation → collection.'},
    {f:'Earth\'s innermost layer', b:'Inner core (solid iron/nickel).'},
    {f:'EM spectrum from low to high energy', b:'Radio, micro, IR, visible, UV, X-ray, gamma.'}
  ],
  quiz:[
    {q:'Which has the shortest wavelength / highest energy?', c:['Gamma rays','Radio waves','Visible light','Infrared'], a:0, e:'Gamma rays are highest-energy, shortest wavelength.'}
  ]},
{ id:'gs_life', sub:'GS', phase:2, title:'Life science: cells, genetics, body systems',
  concept:'<p>Cells are the basic unit of life; plant cells add a cell wall and chloroplasts. <b>Photosynthesis</b> makes sugar from light; <b>cellular respiration</b> releases its energy. <b>Genetics:</b> dominant alleles mask recessive ones. Major body systems: circulatory, respiratory, nervous, digestive, skeletal, muscular.</p>',
  cards:[
    {f:'Powerhouse of the cell', b:'Mitochondrion (produces ATP energy).'},
    {f:'Photosynthesis happens in the…', b:'Chloroplast (plant cells).'},
    {f:'Dominant vs recessive trait', b:'Dominant masks recessive; recessive shows only with two copies.'}
  ],
  quiz:[
    {q:'Which structure is found in plant cells but not animal cells?', c:['Cell wall','Nucleus','Mitochondria','Cell membrane'], a:0, e:'Plant cells have a rigid cell wall (and chloroplasts).'}
  ]},

// ───────────────────────── PHASE 2 · MECHANICAL COMPREHENSION (MC) ─────────────────────────
{ id:'mc_machines', sub:'MC', phase:2, title:'Simple machines & mechanical advantage',
  concept:'<p>Simple machines trade force for distance. <b>Mechanical advantage (MA) = output force / input force = load / effort.</b> You never get "free" work — more force means less distance, and vice versa (conservation of work).</p>',
  example:'<p><b>Ex:</b> A lever lets 50 N lift 200 N → MA = 200/50 = <b>4</b>.</p>',
  cards:[
    {f:'Mechanical advantage formula', b:'Output (load) force ÷ input (effort) force.'},
    {f:'Trade-off of any simple machine', b:'Less force needed, but over a greater distance (work is conserved).'}
  ],
  quiz:[
    {q:'A machine outputs 600 N from a 150 N effort. MA?', c:['4','450','750','0.25'], a:0, e:'MA = 600/150 = 4.'}
  ]},
{ id:'mc_levers', sub:'MC', phase:2, title:'Levers & torque',
  concept:'<p>A lever balances when <b>Force₁ × distance₁ = Force₂ × distance₂</b> (torque). Longer effort arm = easier lift. Three classes: 1st (fulcrum in middle, seesaw), 2nd (load in middle, wheelbarrow), 3rd (effort in middle, tweezers).</p>',
  example:'<p><b>Ex:</b> 100 N at 3 m balances X at 1 m → X = 300 N.</p>',
  cards:[
    {f:'Lever balance (torque) equation', b:'F₁·d₁ = F₂·d₂.'},
    {f:'Longer effort arm means…', b:'Less force needed to lift the load.'},
    {f:'A wheelbarrow is which lever class?', b:'2nd class (load between fulcrum and effort).'}
  ],
  quiz:[
    {q:'A 20 N weight sits 4 m from the pivot. What force at 2 m balances it?', c:['40 N','10 N','80 N','20 N'], a:0, e:'F·2 = 20·4 → F = 80/2 = 40 N.'}
  ]},
{ id:'mc_gears', sub:'MC', phase:2, title:'Gears, pulleys & inclined planes',
  concept:'<p><b>Gears:</b> meshed gears spin opposite directions; a small gear driving a big gear turns slower but with more torque. Gear ratio = teeth(driven)/teeth(driver). <b>Pulleys:</b> each supporting rope segment adds mechanical advantage. <b>Inclined plane:</b> longer/gentler ramp = less force.</p>',
  cards:[
    {f:'Two meshed gears rotate…', b:'In opposite directions.'},
    {f:'A movable pulley gives a mechanical advantage of about…', b:'2 (two rope segments support the load).'},
    {f:'Small driver gear → large driven gear: speed and torque?', b:'Driven turns slower, with more torque.'}
  ],
  quiz:[
    {q:'A 10-tooth gear drives a 30-tooth gear. The big gear turns…', c:['1/3 as fast','3× as fast','Same speed','Backwards only'], a:0, e:'Gear ratio 30/10 = 3 → driven turns 1/3 as fast.'}
  ]},
{ id:'mc_fluids', sub:'MC', phase:2, title:'Springs, hydraulics, pressure & structures',
  concept:'<p><b>Hooke\'s Law:</b> spring force F = k·x (stretch). <b>Pressure = Force/Area.</b> <b>Pascal\'s Law:</b> pressure in a confined fluid transmits equally — small piston force creates large force on a big piston (hydraulics). Structures handle <b>tension</b> (pulling), <b>compression</b> (squeezing), and <b>torque</b> (twisting).</p>',
  cards:[
    {f:'Pressure formula', b:'Pressure = Force / Area.'},
    {f:'Pascal\'s Law (hydraulics)', b:'Pressure applied to a confined fluid transmits equally in all directions.'},
    {f:'Hooke\'s Law', b:'Spring force = k × stretch distance.'}
  ],
  quiz:[
    {q:'Same force on a smaller area produces…', c:['Higher pressure','Lower pressure','Same pressure','No pressure'], a:0, e:'Pressure = F/A; smaller A → higher pressure.'}
  ]},

// ───────────────────────── PHASE 3 · WORD KNOWLEDGE (WK / VE) ─────────────────────────
{ id:'wk_roots', sub:'WK', phase:3, title:'Roots, prefixes & suffixes',
  concept:'<p>Most test vocabulary can be decoded from word parts. Prefixes (un-, re-, sub-, trans-, anti-), roots (spect=see, dict=say, port=carry, scrib=write), and suffixes (-able, -tion, -ous) reveal meaning even for unfamiliar words.</p>',
  cards:[
    {f:'Prefix "sub-"', b:'Under / below (submarine, subsurface).'},
    {f:'Root "dict"', b:'To say/speak (dictate, predict, contradict).'},
    {f:'Prefix "anti-"', b:'Against / opposite (antifreeze, antibody).'},
    {f:'Root "port"', b:'To carry (transport, portable, export).'}
  ],
  quiz:[
    {q:'"Benevolent" most nearly means (bene = good)…', c:['Kind','Cruel','Wealthy','Loud'], a:0, e:'"Bene" = good/well → kind, well-meaning.'},
    {q:'"Transmit" most nearly means…', c:['Send across','Stop','Receive','Hide'], a:0, e:'trans (across) + mit (send) = send across.'}
  ]},
{ id:'wk_vocab', sub:'WK', phase:3, title:'High-frequency vocabulary & elimination',
  concept:'<p>On the ASVAB, choose the answer "most nearly" matching the word. Strategy: read the word in context, recall any word part, then <b>eliminate</b> the two clearly wrong options and decide between the last two.</p>',
  cards:[
    {f:'Abundant', b:'Plentiful, more than enough.'},
    {f:'Deteriorate', b:'To get worse; decline.'},
    {f:'Concise', b:'Brief and to the point.'},
    {f:'Tedious', b:'Boring and tiresome (long, dull).'},
    {f:'Validate', b:'To confirm or prove correct.'}
  ],
  quiz:[
    {q:'"Diligent" most nearly means…', c:['Hard-working','Lazy','Angry','Wealthy'], a:0, e:'Diligent = careful and persistent in work.'},
    {q:'"Obscure" most nearly means…', c:['Unclear','Obvious','Bright','Loud'], a:0, e:'Obscure = unclear, hard to see/understand.'}
  ]},

// ───────────────────────── PHASE 3 · PARAGRAPH COMPREHENSION (PC / VE) ─────────────────────────
{ id:'pc_main', sub:'PC', phase:3, title:'Main idea, detail & inference',
  concept:'<p>For each passage: find the <b>main idea</b> (the point the whole paragraph supports), retrieve <b>details</b> (answer is in the text — do not over-think), and make <b>inferences</b> (what must be true based on the text, not outside knowledge). Watch tone/purpose words.</p>',
  cards:[
    {f:'Main idea is…', b:'The central point the paragraph supports (not just one detail).'},
    {f:'An inference must be…', b:'Supported by the passage — not your own outside knowledge.'},
    {f:'Detail questions: where is the answer?', b:'Stated directly in the text — locate and match.'}
  ],
  quiz:[
    {q:'A passage explains steps to maintain a pump, ending "skip these and failure is likely." The author\'s purpose is to…', c:['Persuade you to follow maintenance steps','Entertain','Describe a pump\'s history','Sell a pump'], a:0, e:'The closing warning shows a persuasive/instructional purpose.'}
  ]},

// ───────────────────────── PHASE 4 · NUCLEAR POWER SCHOOL READINESS (NPS) ─────────────────────────
{ id:'nps_math', sub:'NPS', phase:4, title:'NPS math: algebra, logs, intro calculus',
  concept:'<p>Power School moves fast. Be fluent in algebraic manipulation, <b>logarithms</b> (log undoes exponentiation; ln is natural log), exponential functions, and the <b>concepts</b> of calculus: a <b>derivative</b> is an instantaneous rate of change (slope), an <b>integral</b> is accumulated area. Master <b>dimensional analysis</b> (track units through every equation).</p>',
  cards:[
    {f:'A derivative represents…', b:'Instantaneous rate of change (slope of the curve).'},
    {f:'An integral represents…', b:'Accumulated total / area under a curve.'},
    {f:'log₁₀(1000) = ?', b:'3 (10³ = 1000).'},
    {f:'Dimensional analysis means…', b:'Carrying and cancelling units to check an equation.'}
  ],
  quiz:[
    {q:'If 2ˣ = 8, then x =', c:['3','4','2','16'], a:0, e:'2³ = 8 → x = 3.'}
  ]},
{ id:'nps_phys', sub:'NPS', phase:4, title:'NPS physics: kinematics, thermo, circuits',
  concept:'<p>Key NPS physics: kinematics (v = v₀ + at, d = v₀t + ½at²), work–energy and momentum (p = mv), the <b>laws of thermodynamics</b> (1st: energy is conserved; 2nd: entropy increases / heat flows hot→cold), fluid flow (Bernoulli/continuity), and AC/DC circuits including RC/RL behavior.</p>',
  cards:[
    {f:'1st law of thermodynamics', b:'Energy is conserved (ΔU = Q − W).'},
    {f:'2nd law of thermodynamics', b:'Entropy of an isolated system tends to increase; heat flows hot→cold.'},
    {f:'Momentum formula', b:'p = m × v.'}
  ],
  quiz:[
    {q:'Heat naturally flows from…', c:['Hot to cold','Cold to hot','Equal both ways','It never flows'], a:0, e:'2nd law: heat flows from higher to lower temperature.'}
  ]},
{ id:'nps_reactor', sub:'NPS', phase:4, title:'Reactor principles & radiation',
  concept:'<p>A reactor sustains a controlled fission <b>chain reaction</b>. <b>Moderators</b> slow neutrons; <b>control rods</b> absorb them to manage power. <b>Criticality:</b> subcritical (power falling), critical (steady), supercritical (rising). A <b>PWR</b> keeps a pressurized primary loop hot without boiling; it heats a secondary loop to make steam for the turbine. Radiation types: alpha, beta, gamma. <b>ALARA</b> = keep dose As Low As Reasonably Achievable (time, distance, shielding).</p>',
  cards:[
    {f:'Control rods do what?', b:'Absorb neutrons to slow/stop the chain reaction (control power).'},
    {f:'"Critical" reactor means…', b:'Chain reaction is self-sustaining at a steady level.'},
    {f:'Three radiation types (least→most penetrating)', b:'Alpha, beta, gamma.'},
    {f:'ALARA stands for', b:'As Low As Reasonably Achievable (radiation dose).'},
    {f:'PWR primary vs secondary loop', b:'Primary stays pressurized/no boil; secondary boils to steam to drive the turbine.'}
  ],
  quiz:[
    {q:'Which radiation is most penetrating (needs heavy shielding)?', c:['Gamma','Alpha','Beta','Visible light'], a:0, e:'Gamma penetrates most (lead/concrete); alpha is stopped by paper.'},
    {q:'To reduce radiation dose, ALARA emphasizes time, shielding, and…', c:['Distance','Speed','Temperature','Voltage'], a:0, e:'Time, distance, and shielding are the three dose-reduction levers.'}
  ]},
{ id:'nps_chem', sub:'NPS', phase:4, title:'NPS chemistry & materials',
  concept:'<p>Coolant/<b>water chemistry</b> control prevents corrosion and scaling in the loops. Know the basics of <b>corrosion</b> (oxidation of metal) and material properties: <b>yield strength</b> (when a metal permanently deforms), <b>ductility</b> (ability to stretch), and <b>conductivity</b> (heat/electricity).</p>',
  cards:[
    {f:'Yield strength', b:'The stress at which a material begins to deform permanently.'},
    {f:'Ductility', b:'A material\'s ability to be stretched/drawn without breaking.'},
    {f:'Why control reactor water chemistry?', b:'To limit corrosion and scaling in the coolant loops.'}
  ],
  quiz:[
    {q:'Corrosion of a metal is fundamentally a…', c:['Chemical (oxidation) reaction','Physical change only','Nuclear reaction','Type of welding'], a:0, e:'Corrosion is oxidation — a chemical change of the metal.'}
  ]}

];

// Expose for the main app (browser global).
if (typeof window !== 'undefined') { window.CURRICULUM = CURRICULUM; window.ASVAB_SUBS = ASVAB_SUBS; window.NF_COMPOSITES = NF_COMPOSITES; window.NF_GATES = NF_GATES; }
