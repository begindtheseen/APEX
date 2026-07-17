// ============================================================
// APEX — OBSIDIAN curriculum: THE MARKETS MODULE
// ============================================================
// Generated from the "APEX HANDOFF — MARKETS MODULE" master brief.
// Absolute zero → independent operator. Educational only — never
// advisory. No buy/sell recommendations, no return promises.
// Time-sensitive figures are tagged [VERIFY] — confirm against live
// sources before repeating them.
//
// ─────────────────────────────────────────────────────────────
// SCHEMA (for future edits — the engine reads exactly this):
//   window.OBSIDIAN_CONFIG = { brand, name, tagline,
//     subjects:{KEY:{name,blurb}}, order:[KEY,...],
//     drills:{n,min,gate},          // gate = % needed to pass a tier drill
//     srs:[d0,d1,d2,d3,d4,d5] }     // review intervals in days, by SRS box
//   window.OBSIDIAN_CURRICULUM = [{
//     id:'t0_slug', sub:'T0', title:'...',
//     predict:'Question shown BEFORE the lesson unlocks (predict-then-reveal).',
//     concept:'<p>HTML lesson, ≤400 words, mechanism-first: who pays whom,
//              who is forced to act, who benefits.</p>',
//     example:'<p><b>Ex:</b> optional worked example.</p>',
//     teach:'Teach-back prompt (explain to a smart 12-year-old).',
//     cards:[{f:'front',b:'back'}], quiz:[{q,c:[4],a:index,e}] }]
//   window.OBSIDIAN_QBANK = { KEY:[{q,c,a,e,d:1|2|3}] }  // tier gate drills
// Rules: ES5 only, no template literals, ’ instead of raw apostrophes,
// unique permanent ids (renaming orphans progress), vary quiz answer index.
// ─────────────────────────────────────────────────────────────

window.OBSIDIAN_CONFIG = {
  brand: 'MARKETS',
  name: 'APEX Markets — Operator Track',
  tagline: 'Absolute zero to independent operator. Mechanisms, filings, prices, traps — who pays whom, who is forced to act, who benefits. Educational only, never advice.',
  subjects: {
    T0:  { name: 'Tier 0 · Money & Ownership from Zero', blurb: 'No prior knowledge assumed. What money, companies, shares, and markets literally are.' },
    T1:  { name: 'Tier 1 · The Game Board', blurb: 'Who is on the field, how each player is paid, and what they are FORCED to do.' },
    T2:  { name: 'Tier 2 · The Machine', blurb: 'Plumbing: market makers, shorts, options, leverage, and the full IPO lifecycle.' },
    T3:  { name: 'Tier 3 · Reading the Money', blurb: 'Financial statements — the load-bearing skill of the whole program.' },
    T4:  { name: 'Tier 4 · What a Price Means', blurb: 'Valuation as reverse engineering: extract the future a price requires.' },
    T5:  { name: 'Tier 5 · Cycles & Macro', blurb: 'Rates, credit, bubbles, reflexivity — the tide under every boat.' },
    T6:  { name: 'Tier 6 · The Elite Playbook', blurb: 'Incentive literacy: what every big player is selling and forced to do.' },
    T7:  { name: 'Tier 7 · The Trap Catalog', blurb: 'Every liquidity-harvesting machine: mechanism, profit, mistake, tell.' },
    T8:  { name: 'Tier 8 · The Craft', blurb: 'Thesis, sizing, journal, scoreboard — judgment, forever.' },
    TX:  { name: 'Tiers 9–14 · Expert Expansion', blurb: 'Credit &amp; macro, private markets, modern mechanics, history, law, research craft. Interleave after Gate 5.' },
    REPS:{ name: 'The Reps System &amp; The Road After', blurb: 'Counters, stakes, and the graduate’s calendar. Reps are the program’s odometer.' }
  },
  order: ['T0','T1','T2','T3','T4','T5','T6','T7','T8','TX','REPS'],
  drills: { n: 10, min: 12, gate: 85 },
  srs: [1, 1, 3, 7, 21, 30]
};

window.OBSIDIAN_CURRICULUM = [

// ───────────────────────── TIER 0 · MONEY & OWNERSHIP FROM ZERO ─────────────────────────
{ id:'t0_money', sub:'T0', title:'What money is — and why cash quietly shrinks',
  predict:'You put $100 in a drawer and leave it for 20 years. When you take it out, can it buy more, less, or the same as today? Why?',
  concept:'<p>Money is a claim on other people’s work: a token everyone agrees to accept so we don’t have to barter. It has no value by itself — only what it can be exchanged for.</p><p><b>Inflation</b> is the rate at which prices rise, which is the same thing as the rate at which each dollar buys less. Historically U.S. inflation has averaged roughly 3% per year <i>[fact — long-run average; current rate VERIFY]</i>. At 3%, prices double about every 24 years, so $100 held as cash for 24 years buys about half of what it does today.</p><p>Mechanism check — who benefits from inflation? <b>Borrowers</b> (they repay with cheaper dollars) and issuers of money. Who pays? <b>Savers holding cash.</b> That is why “doing nothing” with savings is not neutral — it is a slow, guaranteed losing position, and it is the honest reason to learn any of this.</p>',
  example:'<p><b>Ex:</b> A candy bar cost about $0.25 in 1985 and about $2 today. The candy didn’t get 8× better — the dollar got 8× weaker against candy.</p>',
  teach:'Explain to a smart 12-year-old why hiding money under a mattress for 30 years is a losing plan, in 5 sentences.',
  cards:[
    {f:'What is inflation, mechanically?', b:'The rate at which each dollar buys less — prices rising is the mirror image of money weakening.'},
    {f:'Long-run U.S. inflation average', b:'Roughly 3%/yr historically [VERIFY current] — cash halves in buying power about every 24 years at that rate.'},
    {f:'Who benefits from inflation, who pays?', b:'Borrowers repay in cheaper dollars; savers holding cash pay the cost.'}
  ],
  quiz:[
    {q:'At ~3% inflation, $100 of cash after ~24 years buys about…', c:['The same as today','Twice as much','Half as much','Nothing'], a:2, e:'~3% compounding halves buying power in roughly 24 years (rule of 72: 72÷3=24).'},
    {q:'Inflation most directly punishes…', c:['People holding cash savings','People with fixed-rate debt','People who own productive assets','Nobody — it is neutral'], a:0, e:'Cash loses buying power; borrowers repay with cheaper dollars; asset owners are partially shielded.'}
  ]},
{ id:'t0_company', sub:'T0', title:'What a company is: revenue, costs, profit',
  predict:'A kid’s lemonade stand sells 50 cups at $1 each. Lemons, sugar, and cups cost $30. Is the stand a good business? What one number tells you?',
  concept:'<p>A company is a machine that spends money to make more money. Three words carry the whole idea:</p><p><b>Revenue</b> — every dollar customers pay in. <b>Costs</b> — every dollar the machine spends to operate (ingredients, wages, rent). <b>Profit</b> — what is left: revenue minus costs. Profit is the machine’s output; everything else is plumbing.</p><p>The lemonade stand: 50 cups × $1 = <b>$50 revenue</b>. Supplies = <b>$30 costs</b>. Profit = <b>$20</b>. That $20 belongs to whoever <i>owns</i> the stand — which is the bridge to the next lesson.</p><p>Two honest complications you’ll meet later: revenue can grow while profit shrinks (spending faster than you earn), and reported “profit” can be dressed up. That is why Tier 3 teaches you to read the actual statements instead of trusting headlines. For now: a business is only a business if, over time, more comes in than goes out.</p>',
  teach:'Using only a lemonade stand, explain revenue, costs, and profit to a beginner in 5 sentences.',
  cards:[
    {f:'Revenue', b:'Total money customers pay in — the top line, before any costs.'},
    {f:'Profit', b:'Revenue minus costs — what actually belongs to the owners.'},
    {f:'Can revenue grow while the business loses money?', b:'Yes — if costs grow faster than revenue. Growth alone is not health.'}
  ],
  quiz:[
    {q:'A stand takes in $80 and spends $95 on supplies and signs. Its profit is…', c:['$80','$15','−$15','$95'], a:2, e:'Profit = revenue − costs = 80 − 95 = −$15. Negative profit is a loss.'},
    {q:'The number that ultimately belongs to a company’s owners is…', c:['Revenue','Profit','Costs','Price per cup'], a:1, e:'Owners keep what is left after all costs — the profit.'}
  ]},
{ id:'t0_share', sub:'T0', title:'What a share literally is — and why founders sell pieces',
  predict:'If a founder owns 100% of a profitable business, why would she ever sell part of it to strangers?',
  concept:'<p>A <b>share</b> (or “stock”) is a fractional claim on a business — on everything it owns and every dollar of profit it will ever make. Own 1 of a company’s 100 shares and 1% of that machine is literally yours: 1% of the profits, 1% of the vote, 1% of whatever it sells for someday.</p><p>Why would a founder sell pieces? <b>Capital now in exchange for ownership later.</b> Building costs money today; profits arrive in the future. Selling 20% of the company for cash lets her build the factory now. She traded a slice of tomorrow’s profits for fuel today.</p><p>Who benefits? Both sides, when it works: the founder gets growth she couldn’t afford, the buyer gets a claim on profits he didn’t have to build. Who pays? The founder’s future self — every dollar of profit is now split 80/20 forever. Nothing in markets is free; every share sold is a permanent slice of the future given away.</p>',
  example:'<p><b>Ex:</b> The lemonade stand earns $20/summer. The kid sells you 25% (25 of 100 shares) for $50. From now on $5 of every summer’s profit is yours — she got $50 today to buy a second stand.</p>',
  teach:'Explain what owning one share of a company literally means, and why the company sold it, in 5 sentences a 12-year-old follows.',
  cards:[
    {f:'A share is…', b:'A fractional claim on a business — its assets and all its future profits.'},
    {f:'Why founders sell shares', b:'Capital now in exchange for ownership later — cash today to grow, traded for a permanent slice of future profits.'},
    {f:'Own 10 of 1,000 shares — what is yours?', b:'1% of profits, votes, and any sale proceeds.'}
  ],
  quiz:[
    {q:'A company has 200 shares. You buy 20. A $1,000 dividend is paid to all owners. Your cut is…', c:['$100','$20','$50','$1,000'], a:0, e:'20/200 = 10% ownership → 10% of $1,000 = $100.'},
    {q:'When a founder sells shares to raise money, what does she permanently give up?', c:['Her salary','A slice of all future profits and control','Nothing — shares are just paper','Her costs'], a:1, e:'Every share sold is a permanent claim on the future handed to someone else.'}
  ]},
{ id:'t0_debtequity', sub:'T0', title:'Debt vs. equity: lender vs. owner',
  predict:'A business needs $100k. It can borrow it, or sell half the company for it. Who gets paid first if things go wrong — and who gets rich if things go right?',
  concept:'<p>There are exactly two ways to fund a business, and the whole capital market is built on the difference:</p><p><b>Debt (the lender).</b> You lend money; the company must pay it back with interest, on a schedule, no matter how business goes. If the company fails, lenders stand <b>first in line</b> for whatever is left. Capped upside (the interest), protected downside.</p><p><b>Equity (the owner).</b> You buy shares; nobody owes you anything. You are paid <b>last</b> — after suppliers, wages, taxes, and every lender. But you own all the upside: if profits triple, your claim triples. Uncapped upside, unprotected downside.</p><p>Who benefits from each? Lenders benefit from certainty; owners from possibility. Remember the seniority rule — <b>debt eats first, equity eats last but can eat forever</b> — because in Tier 10 (bankruptcy) you’ll watch equity holders discover “last in line” usually means zero.</p>',
  teach:'Explain the difference between lending money to a pizza shop and owning half of it — who gets paid first, who gets the upside — in 5 sentences.',
  cards:[
    {f:'Debt holder: upside and downside', b:'Upside capped at interest; downside protected — first claim on assets if the company fails.'},
    {f:'Equity holder: upside and downside', b:'Uncapped share of all future profits; paid dead last if things go wrong — often zero in bankruptcy.'},
    {f:'Payment order when a company dies', b:'Suppliers/wages/taxes and lenders first… equity last (usually nothing).'}
  ],
  quiz:[
    {q:'A company is sold for scrap at $1M. It owes lenders $1.2M. Equity holders receive…', c:['$1M split among them','$200k','Nothing','Their original investment back'], a:2, e:'Debt eats first. $1M &lt; $1.2M owed, so lenders take it all and equity gets zero.'},
    {q:'Profits unexpectedly triple. Who captures that upside?', c:['Lenders — their interest triples','Owners — their claim on profits triples','Both equally','Neither'], a:1, e:'Debt is capped at the agreed interest; all extra upside belongs to equity.'}
  ]},
{ id:'t0_public', sub:'T0', title:'Private vs. public: what “going public” means',
  predict:'You can’t buy shares of most companies on your phone. What has to happen before you can — and why would a company volunteer for it?',
  concept:'<p>A <b>private</b> company’s shares are owned by founders, employees, and invited investors; you can’t buy in without being asked. A <b>public</b> company has listed its shares on an exchange where <i>anyone</i> can buy or sell them — that switch is the <b>IPO</b> (initial public offering), covered as a full sequence in Tier 2.</p><p>Why go public? (1) <b>Raise money</b> from the largest possible pool of buyers. (2) Let early owners and employees <b>cash out</b> — private shares are hard to sell. (3) Get a public price to pay people with (stock compensation) and buy other companies with.</p><p>The cost: public companies must file audited financial reports with the <b>SEC</b> (the U.S. market regulator) — the same filings you will learn to read in Tier 3. Who benefits from that disclosure rule? You do: it is the only reason an outsider can inspect the machine before buying a piece of it.</p>',
  teach:'Explain what an IPO changes for a company and for ordinary people, in 5 sentences.',
  cards:[
    {f:'Private vs. public company', b:'Private: shares held by invited insiders. Public: shares listed on an exchange, anyone can trade them.'},
    {f:'Three reasons companies go public', b:'Raise capital at scale, let insiders cash out, and get a public currency for pay and acquisitions.'},
    {f:'The price of being public', b:'Mandatory audited SEC filings — the disclosure that lets outsiders inspect the machine.'}
  ],
  quiz:[
    {q:'The main thing an IPO changes is…', c:['The company becomes profitable','Anyone can now buy and sell its shares on an exchange','The company stops paying taxes','The founders must leave'], a:1, e:'An IPO lists shares publicly. It changes who can own the company, not whether it makes money.'},
    {q:'Public companies must file audited reports with…', c:['The NYSE police','The SEC','Their bank','No one'], a:1, e:'The SEC requires public disclosure — the foundation of everything in Tier 3.'}
  ]},
{ id:'t0_mcap', sub:'T0', title:'Market cap — killing the “$10 stock is cheap” fallacy',
  predict:'Stock A costs $10 per share. Stock B costs $1,000 per share. Which company is cheaper? (Trick question — what’s missing?)',
  concept:'<p><b>Market capitalization = share price × number of shares.</b> It is the price of the <i>whole company</i>, and it is the only price that means anything.</p><p>Per-share price alone tells you nothing, because companies choose how many slices to cut themselves into. A $10 stock with 10 billion shares is a $100B company. A $1,000 stock with 10 million shares is a $10B company — <b>ten times smaller</b> despite the “expensive” sticker.</p><p>This is the single most common beginner error, and entire promotion machines run on it: penny-stock pitches (“it’s only $0.50!”) rely on victims confusing a low sticker with a bargain. Who benefits from the confusion? Whoever is selling the shares. The permanent fix: <b>never evaluate a price without the share count.</b> Ask “what does the whole business cost?” — then Tier 4 teaches whether that whole-business price is reasonable.</p>',
  example:'<p><b>Ex:</b> A pizza cut into 16 slices isn’t cheaper than the same pizza cut into 4. The slice price changed; the pizza didn’t.</p>',
  teach:'Explain why a $2 stock can be wildly more expensive than a $900 stock, using the pizza-slices idea, in 5 sentences.',
  cards:[
    {f:'Market cap formula', b:'Share price × total share count = price of the whole company.'},
    {f:'Why per-share price alone is meaningless', b:'Companies choose their own share count — the slice size is arbitrary; only the whole pizza’s price matters.'},
    {f:'Who benefits from the “$0.50 stock is cheap” illusion?', b:'The seller/promoter of those shares — it is the engine of penny-stock traps.'}
  ],
  quiz:[
    {q:'Stock A: $10/share, 10B shares. Stock B: $1,000/share, 10M shares. Which company is bigger?', c:['A — $100B vs. $10B','B — higher share price','Same size','Cannot tell'], a:0, e:'10 × 10B = $100B vs. 1,000 × 10M = $10B. The “cheap” stock is the 10× bigger company.'},
    {q:'A company does a 2-for-1 split: every share becomes two at half the price. Market cap…', c:['Doubles','Halves','Is unchanged','Goes to zero'], a:2, e:'Twice the slices at half the price — the pizza is the same size.'}
  ]},
{ id:'t0_exchange', sub:'T0', title:'Exchanges, tickers, and what “the market was up” means',
  predict:'The news says “the market rose 1% today.” What thing, specifically, rose? Who decided what counts as “the market”?',
  concept:'<p>An <b>exchange</b> (NYSE, Nasdaq) is the venue where buyers and sellers meet — a matching engine with rules, not a mystical place. A <b>ticker</b> is a stock’s short code on that venue (AAPL, NVDA, SPCX).</p><p>“The market was up today” almost always refers to an <b>index</b>: a basket of stocks combined by a published rule. The <b>S&amp;P 500</b> is ~500 large U.S. companies weighted by market cap; the <b>Dow</b> is 30 companies weighted (oddly) by share price; the <b>Nasdaq-100</b> is the 100 largest non-financial Nasdaq listings. An index is not “the economy” — it is a rule-based basket, and the rules matter.</p><p>Why care about the rules? Because trillions of dollars are contractually forced to buy whatever enters these baskets (Tier 1’s master key). Whoever writes the basket’s rules quietly directs those flows. When you hear “the market,” always translate: <i>which basket, weighted how, forced on whom?</i></p>',
  teach:'Explain what the S&amp;P 500 actually is, and why “the market rose” really means “this basket rose,” in 5 sentences.',
  cards:[
    {f:'What an exchange is', b:'A rule-governed matching venue where buyers meet sellers (NYSE, Nasdaq) — plumbing, not magic.'},
    {f:'An index is…', b:'A basket of stocks combined by a published rule (S&amp;P 500 ≈ 500 large caps, cap-weighted).'},
    {f:'Why index rules matter', b:'Trillions are forced to buy whatever the rules put in the basket — rule-writers direct flows.'}
  ],
  quiz:[
    {q:'“The market fell 2%” most precisely means…', c:['Every stock fell 2%','A major index basket fell 2%','The economy shrank 2%','Trading was halted'], a:1, e:'It refers to an index — a rule-based basket. Individual stocks and the economy can diverge from it.'},
    {q:'The S&amp;P 500 weights companies by…', c:['Share price','Alphabetical order','Market capitalization','Profit'], a:2, e:'Cap-weighted: bigger companies move the index more. (The Dow, oddly, is price-weighted.)'}
  ]},
{ id:'t0_orders', sub:'T0', title:'How buying works: brokers, orders, and the bid/ask toll',
  predict:'You tap BUY on a phone app. Somewhere, someone sells to you at that exact moment. Who — and what do they charge you for the privilege?',
  concept:'<p>You trade through a <b>brokerage account</b> — a firm that routes your orders to the market. Two basic order types: a <b>market order</b> says “fill me now at the best available price” (speed, no price control); a <b>limit order</b> says “fill me only at this price or better” (price control, no guarantee of filling).</p><p>At any moment a stock has two prices: the <b>bid</b> (highest price anyone will pay) and the <b>ask</b> (lowest price anyone will sell for). The gap is the <b>spread</b>, and it is the toll you pay to trade: buy at the ask, sell at the bid, and you are instantly down the spread.</p><p>Who collects the toll? <b>Market makers</b> — firms quoting both sides all day (Tier 2 dissects them). The practical habits from day one: prefer limit orders, and remember every unnecessary trade pays the toll again. Frequent trading is a subscription paid to the plumbing.</p>',
  example:'<p><b>Ex:</b> Bid $99.90 / ask $100.10. Buy at market ($100.10), instantly sell at market ($99.90): you lost $0.20/share to the spread with the price “unchanged.”</p>',
  teach:'Explain bid, ask, and why day-trading pays a toll on every single round trip, in 5 sentences.',
  cards:[
    {f:'Market order vs. limit order', b:'Market: fill now at best available price. Limit: fill only at my price or better (may not fill).'},
    {f:'The spread is…', b:'Ask minus bid — the toll paid on every round trip, collected by market makers.'},
    {f:'Practical default for beginners', b:'Limit orders, and few trades — every extra trade pays the toll again.'}
  ],
  quiz:[
    {q:'Bid $50.00 / ask $50.20. You buy at market and immediately sell at market. Result per share ≈', c:['$0.00','−$0.20','+$0.20','−$50'], a:1, e:'Buy at the ask, sell at the bid: the $0.20 spread is the toll.'},
    {q:'A limit order’s trade-off is…', c:['Price control, but it may never fill','Guaranteed fill at any price','It is always cheaper','It skips the spread entirely'], a:0, e:'You control the price; the market decides whether anyone meets it.'}
  ]},
{ id:'t0_cashreturn', sub:'T0', title:'Dividends and buybacks — the two ways cash comes back',
  predict:'A company earned $1B it doesn’t need. Name two different ways it can hand that money to shareholders — and how each changes what you own.',
  concept:'<p>Profitable companies eventually return cash to owners. There are exactly two pipes:</p><p><b>Dividends</b> — cash paid per share, straight to your account. Simple, visible, taxed when received. A steady dividend signals management expects steady profits (cutting one is a public admission of trouble).</p><p><b>Buybacks</b> — the company buys its own shares on the market and retires them. Your share count is unchanged but the total shrinks, so your <i>percentage</i> of the company — and of all future profits — rises. Buybacks are flexible (no promise to repeat) and tax-deferred (no cash event until you sell).</p><p>Who benefits? With dividends, all holders equally, now. With buybacks, remaining holders — <i>if</i> the shares were bought below their worth. A company overpaying for its own stock is burning owner money; Tier 6 treats buybacks vs. dilution as management’s truest opinion of its own price. Signal reading: dividends say “profits are stable”; buybacks say “we think the stock is worth more than it costs” — sometimes honestly.</p>',
  teach:'Explain dividends vs. buybacks — where the cash goes and what happens to your slice — in 5 sentences.',
  cards:[
    {f:'Dividend', b:'Cash paid out per share to all holders — visible, taxed on receipt, cutting it signals trouble.'},
    {f:'Buyback', b:'Company repurchases and retires its own shares — total count shrinks, every remaining slice grows.'},
    {f:'When is a buyback good for holders?', b:'When shares are repurchased below their real worth; overpaying burns owner cash.'}
  ],
  quiz:[
    {q:'A company with 100 shares buys back 20. You own 10 shares. Your ownership went from 10% to…', c:['10%','8%','12.5%','20%'], a:2, e:'10 of the remaining 80 shares = 12.5%. Buybacks grow every surviving slice.'},
    {q:'Cutting a long-standing dividend usually signals…', c:['Hidden strength','Management expects trouble ahead','Nothing at all','An imminent buyback'], a:1, e:'Dividends are a public promise; breaking one is an admission profits can’t support it.'}
  ]},
{ id:'t0_funds', sub:'T0', title:'Funds, ETFs, and the fortune hiding in fees',
  predict:'Two identical funds return 7%/yr for 40 years. One charges 0.05% in fees, the other 1%. Guess the difference in your final money. (Most people guess far too low.)',
  concept:'<p>A <b>fund</b> pools many people’s money to buy many stocks at once. A <b>mutual fund</b> is the older wrapper (priced once daily); an <b>ETF</b> trades all day like a stock. An <b>index fund</b> is a fund that simply copies an index’s basket by rule — no manager picking, so fees can be tiny.</p><p>The <b>expense ratio</b> is the fee skimmed every year, forever, regardless of performance. It looks harmless — “1%” — but it compounds against you: on $100k at 7% for 40 years, a 0.05% fee leaves about $1.47M; a 1% fee leaves about $1.02M. Roughly <b>$450k</b> — nearly a third of your wealth — paid to someone else for the same basket <i>[estimate — run the math yourself]</i>.</p><p>Who benefits from high fees? The manager, always — paid on assets, not results. This is why the boring, low-cost, broad index fund is the professional default for core savings, and why Tier 7 catalogs the machines built to talk you out of it.</p>',
  teach:'Explain what an index fund does and why a 1% annual fee is not small, in 5 sentences a beginner follows.',
  cards:[
    {f:'Index fund', b:'A fund that copies an index basket by rule — no stock-picking, minimal fees.'},
    {f:'Expense ratio', b:'The annual % fee skimmed from your money regardless of performance — it compounds against you.'},
    {f:'0.05% vs 1% fee, $100k, 7%, 40 yrs', b:'≈$1.47M vs ≈$1.02M — roughly $450k paid away in fees [estimate].'}
  ],
  quiz:[
    {q:'A fund manager’s fee income depends primarily on…', c:['Beating the market','Assets under management','Your profits','The number of trades'], a:1, e:'Fees are charged on assets, win or lose — the manager benefits either way.'},
    {q:'An ETF differs from a classic mutual fund mainly in that it…', c:['Holds only one stock','Trades all day on an exchange like a stock','Has no fees','Is guaranteed by the government'], a:1, e:'Same pooled-basket idea, different wrapper: ETFs trade intraday.'}
  ]},
{ id:'t0_compound', sub:'T0', title:'Compounding and the rule of 72',
  predict:'Would you rather have $1M today, or a penny that doubles every day for 31 days? Do the rough math before revealing.',
  concept:'<p><b>Compounding</b> means earning returns on your previous returns. Growth feeds itself, which is why the curve looks flat for years and then vertical: the penny doubling daily is worth $0.01 → $10.7M in 31 days, and more than half of that arrives in the final two doublings.</p><p>The working tool: <b>the rule of 72.</b> Divide 72 by the annual growth rate to get the approximate doubling time. 72 ÷ 7% ≈ 10 years. 72 ÷ 3% (inflation) ≈ 24 years — the same rule measures the melting of cash.</p><p>The strategic consequence: <b>time in the market is the amateur’s only free edge.</b> Institutions have better information, tools, and speed — but most are forced to perform quarterly (Tier 6). A 25-year-old with a 40-year horizon owns four doublings at 7% (16×) that no fund manager’s career can hold. Compounding also explains why fees, taxes, and big losses are so expensive: they interrupt the doubling chain at its steepest point.</p>',
  teach:'Explain the rule of 72 and why starting 10 years earlier can double the final outcome, in 5 sentences.',
  cards:[
    {f:'Rule of 72', b:'72 ÷ annual % rate ≈ years to double. 7% → ~10 yrs; 3% inflation → cash halves in ~24 yrs.'},
    {f:'Why compounding curves look flat, then vertical', b:'Returns earn returns — the biggest absolute gains arrive in the last doublings.'},
    {f:'The amateur’s only structural edge', b:'Time horizon — decades of doublings that quarterly-judged institutions cannot sit through.'}
  ],
  quiz:[
    {q:'At 8%/yr, money doubles in about…', c:['6 years','9 years','12 years','20 years'], a:1, e:'72 ÷ 8 = 9 years.'},
    {q:'40 years at 7% is roughly four doublings. $10k becomes about…', c:['$40k','$80k','$160k','$280k'], a:2, e:'Four doublings = 16×. $10k → $160k. Miss the first decade and it is ~$80k.'}
  ]},
{ id:'t0_returnmath', sub:'T0', title:'Return math and survival: −50% needs +100%',
  predict:'Your portfolio drops 50%, then gains 50%. Are you back to even? Compute it on $100 before revealing.',
  concept:'<p>Percentages are asymmetric, and the asymmetry is the most important math in investing. Lose 50% of $100 → $50. Gain 50% back → $75. <b>A −50% loss requires +100% to recover.</b> −80% requires +400%. −90% requires +900%.</p><p>A <b>drawdown</b> is the fall from a peak to a trough. Deep drawdowns aren’t just painful — they are mathematically expensive, because the recovery hill grows faster than the hole. This is why professionals obsess over losses more than gains, and why <b>ruin — losing everything, or being forced out at the bottom — is the only unrecoverable outcome.</b> Zero compounds to zero at any rate, forever.</p><p>Who benefits from ignoring this math? Anyone selling leverage, lottery-ticket trades, or “go big” narratives — their fees are collected either way (Tier 7). The survival rules that follow from the math: never risk ruin, size positions so being wrong is affordable, and judge any strategy by its worst drawdown, not its best year.</p>',
  teach:'Explain why a 50% loss is not undone by a 50% gain, and why “never risk ruin” follows, in 5 sentences.',
  cards:[
    {f:'Recovery needed after −50%? After −90%?', b:'+100% and +900%. The recovery hill grows faster than the hole.'},
    {f:'Drawdown', b:'The fall from a portfolio’s peak to its trough — judge strategies by their worst one.'},
    {f:'Why ruin is special', b:'Zero compounds to zero forever — every other mistake is recoverable, ruin is not.'}
  ],
  quiz:[
    {q:'$100 falls 50% then rises 50%. You have…', c:['$100','$75','$50','$125'], a:1, e:'$100 → $50 → $75. Down 25% overall despite “−50% + 50%.”'},
    {q:'A strategy that averages +30%/yr but risks a total wipeout every few years is…', c:['Excellent — the average is high','Doomed — ruin ends compounding permanently','Fine with enough conviction','Impossible to evaluate'], a:1, e:'Multiply by zero once and every past and future return is gone. Survival precedes performance.'}
  ]},
{ id:'t0_risk', sub:'T0', title:'Risk vs. return; diversification and its limits',
  predict:'Why does a savings account pay less than stocks are expected to return? Who is paying you the extra, and for what?',
  concept:'<p><b>Return is payment for carrying risk.</b> A Treasury bill pays little because the outcome is near-certain; stocks are <i>expected</i> to pay more precisely because outcomes are uncertain and sometimes brutal. Anyone offering high return with no risk is mispricing something — usually your gullibility (Tier 7).</p><p><b>Diversification</b> — owning many unrelated things — is the one honest free lunch: one company’s disaster (fraud, fire, obsolescence) barely dents a 500-stock basket. It removes <i>single-name</i> risk without lowering expected return.</p><p>Its limits, stated plainly: diversification cannot remove <b>market risk</b> — in a crash, nearly everything falls together (correlations go to 1 exactly when you need them not to, a Tier 12 lesson from 2008). And owning 50 similar tech stocks is not diversification; it is one bet written 50 times. Who benefits from misunderstood risk? Sellers of “safe high yields” and concentrated lottery tickets alike.</p>',
  teach:'Explain why return is payment for risk, what diversification fixes, and what it cannot fix, in 5 sentences.',
  cards:[
    {f:'Why stocks are expected to out-return savings accounts', b:'Return is compensation for bearing uncertainty — no risk carried, no premium paid.'},
    {f:'What diversification eliminates', b:'Single-company risk — one blow-up barely dents a broad basket.'},
    {f:'What diversification cannot eliminate', b:'Market risk — in crises nearly everything falls together (correlations → 1).'}
  ],
  quiz:[
    {q:'An investment promising 15%/yr “with zero risk” is most likely…', c:['A rare bargain','Mispriced or fraudulent — return is payment for risk','A government program','Normal for stocks'], a:1, e:'The risk-return link is structural. Riskless high yield is the oldest red flag in finance.'},
    {q:'Owning 40 different AI-chip stocks is…', c:['Well diversified','One concentrated bet written 40 times','Risk-free','Equivalent to an index fund'], a:1, e:'Diversification requires unrelated exposures, not many tickers with the same driver.'}
  ]},
{ id:'t0_bonds', sub:'T0', title:'Bonds and Treasuries 101 — the anchor price of money',
  predict:'Every stock, house, and business on Earth is valued against one number published by the U.S. government’s borrowing market. What could that number be?',
  concept:'<p>A <b>bond</b> is a tradable loan: you hand over cash now, receive interest (<b>the coupon</b>), and get the principal back at maturity. The <b>yield</b> is the return implied by the price you paid — and price and yield move in opposite directions: pay less for the same fixed coupons, earn more.</p><p><b>Treasuries</b> are loans to the U.S. government — the closest thing to a risk-free yield in dollars. The <b>10-year Treasury yield</b> is the market’s anchor: it is what you can earn doing (almost) nothing. Every other asset must promise more than the anchor to be worth its risk, so when the anchor rises, all risky assets are re-priced downward against it — mechanically, not emotionally (Tier 5 makes this gravity precise).</p><p>Who benefits from watching yields? Anyone reading ahead: the bond market is larger than the stock market and typically moves first (Tier 9). Equities tell stories; yields state the price of money.</p>',
  teach:'Explain what a bond is, what a yield is, and why the 10-year Treasury is called the anchor, in 5 sentences.',
  cards:[
    {f:'Bond price vs. yield', b:'Opposite directions — pay less for the same fixed coupons and your implied return (yield) is higher.'},
    {f:'The 10-year Treasury yield is…', b:'The near-risk-free anchor every risky asset is priced against.'},
    {f:'When the anchor yield rises, risky assets…', b:'Get mechanically re-priced downward — they must out-promise the higher risk-free rate.'}
  ],
  quiz:[
    {q:'A bond’s price falls. Its yield…', c:['Falls','Rises','Is unchanged','Goes to zero'], a:1, e:'Same fixed coupons bought cheaper = higher implied return. Price and yield are a seesaw.'},
    {q:'The 10-year Treasury yield jumps from 2% to 5%. Stock valuations, all else equal…', c:['Rise — optimism','Fall — future profits are worth less against a higher risk-free anchor','Are unaffected','Double'], a:1, e:'Every asset competes with the anchor. A richer “do-nothing” rate devalues distant profits.'}
  ]},
{ id:'t0_accounts', sub:'T0', title:'Account plumbing: taxable, IRA, 401(k), and taxes [VERIFY]',
  predict:'Two people make identical investments with identical returns. One retires with meaningfully more money. What non-investment choice made the difference?',
  concept:'<p>Concept level only — <b>every rule here is [VERIFY — time-sensitive]</b>: rates, limits, and laws change, so confirm against current IRS/official sources before acting.</p><p><b>Taxable brokerage:</b> the default account. You owe <b>capital gains tax</b> when you sell at a profit — historically at a <i>lower long-term rate</i> if held over a year, and a <i>higher short-term rate</i> (ordinary income) if under a year [VERIFY]. Frequent trading is therefore taxed harder than patience — the tax code itself pays you to hold.</p><p><b>Retirement wrappers</b> — 401(k) (employer) and IRA (individual): contributions are limited annually [VERIFY], but growth inside compounds <b>without yearly tax drag</b>, traditionally taxed later (traditional) or funded after-tax and untaxed on exit (Roth) [VERIFY].</p><p><b>Wash sale rule</b> [VERIFY]: selling at a loss and rebuying the same security within ~30 days voids the tax loss. Who benefits from you ignoring all this? Nobody — this is the rare lesson where the only opponent is your own inattention. After-tax return is the only return (Tier 14).</p>',
  teach:'Explain to a beginner why WHERE you invest (account type) and HOW LONG you hold can matter as much as WHAT you buy, in 5 sentences.',
  cards:[
    {f:'Short-term vs. long-term capital gains [VERIFY]', b:'Under ~1 year: taxed like income (higher). Over: lower long-term rate — patience is subsidized.'},
    {f:'What retirement wrappers (401(k)/IRA) buy you', b:'Compounding without annual tax drag; contribution limits and exit rules vary [VERIFY].'},
    {f:'Wash sale rule [VERIFY]', b:'Sell at a loss and rebuy within ~30 days → the tax loss is disallowed.'}
  ],
  quiz:[
    {q:'Holding a winning stock 13 months instead of 11 typically changes…', c:['Nothing','The tax rate on the gain — long-term rates are lower [VERIFY]','The stock’s return','The wash sale rule'], a:1, e:'Crossing the one-year line historically moves the gain to the lower long-term rate. Verify current thresholds.'},
    {q:'The correct habit for any tax figure you learn here is…', c:['Memorize it forever','Tag it [VERIFY] and confirm against current official sources','Assume it never changes','Ask social media'], a:1, e:'Tax rules are time-sensitive by design in this curriculum — always verify before relying or posting.'}
  ]},
{ id:'t0_vocab', sub:'T0', title:'The vocabulary spine',
  predict:'Define as many as you can before revealing: bull, bear, volatility, liquidity, float, position, portfolio, IPO, valuation.',
  concept:'<p>The working vocabulary everything ahead assumes. Say each aloud until it is boring:</p><p><b>Bull / bear</b> — optimist expecting prices up / pessimist expecting down (bull market: rising; bear market: falling ~20%+ from a peak). <b>Volatility</b> — how violently a price swings; a measure of movement, not of loss. <b>Liquidity</b> — how much can be bought or sold without moving the price; deep water vs. a puddle. <b>Float</b> — the shares actually available for public trading (total shares minus locked-up insiders — decisive in Tier 2’s IPO mechanics). <b>Position</b> — your live holding in one thing (long = own it, profit if it rises; short = borrowed and sold, profit if it falls). <b>Portfolio</b> — all positions together. <b>IPO</b> — the private→public listing event. <b>Valuation</b> — what a price implies the business must do (Tier 4’s whole subject).</p><p>These terms are the flashcard deck’s seed — the quiz and drills will recycle them from here on.</p>',
  teach:'Pick the five of these words a beginner most needs, and define each in one plain sentence.',
  cards:[
    {f:'Volatility', b:'How violently a price swings — movement, not necessarily loss.'},
    {f:'Liquidity', b:'How much can trade without moving the price — depth, not activity.'},
    {f:'Float', b:'Shares actually available to trade: total minus insider/locked shares.'},
    {f:'Long vs. short position', b:'Long: own it, win if it rises. Short: borrowed and sold, win if it falls.'}
  ],
  quiz:[
    {q:'A stock where a $50k order moves the price 5% has…', c:['High liquidity','Low liquidity','High valuation','A large float'], a:1, e:'Thin liquidity = small orders move the price. Depth is what liquidity measures.'},
    {q:'A “bear market” conventionally means…', c:['Any red day','A ~20%+ decline from a peak','Low volatility','An IPO window'], a:1, e:'Bear = sustained decline (~20% from highs, by convention); bull = the rising mirror image.'}
  ]}

,
// ───────────────────────── TIER 1 · THE GAME BOARD ─────────────────────────
{ id:'t1_primary', sub:'T1', title:'Primary vs. secondary markets: the company got paid once',
  predict:'You buy 10 shares of Apple on your phone. How much of your money does Apple receive?',
  concept:'<p>Zero. Apple receives nothing from your trade. Money reaches the company only in the <b>primary market</b> — when it sells newly created shares (an IPO, or a later “secondary offering” of new stock). Every trade after that happens in the <b>secondary market</b>: players trading existing claims <i>with each other</i>, like collectors trading baseball cards long after the printer was paid.</p><p>This single fact reframes everything. The daily stock market is not people “investing in companies” — it is a continuous auction of second-hand claims, where every buyer requires a seller and every dollar you make was paid in by someone else’s decision. The company is the referee’s scoreboard, not a participant in your trade.</p><p>Who benefits from the confusion? Narratives that frame every purchase as “supporting” a company, and every rally as new money “flowing into” firms. Mechanically: your purchase supports the seller — whoever they are, and whyever they sold.</p>',
  teach:'Explain the baseball-card version of primary vs. secondary markets to a beginner in 5 sentences.',
  cards:[
    {f:'Primary vs. secondary market', b:'Primary: company sells new shares and receives the cash (IPO/offerings). Secondary: existing shares trade between players; the company gets nothing.'},
    {f:'When you buy a share on an exchange, who gets your money?', b:'The seller of that share — never the company.'},
    {f:'Every trade requires…', b:'A counterparty — your buy is someone’s deliberate sell. Ask why they sold.'}
  ],
  quiz:[
    {q:'A company benefits directly from its stock trading ONLY when…', c:['Any share trades','It sells newly issued shares (primary market)','Price rises','Volume is high'], a:1, e:'Cash reaches the company at issuance. Everything after is players trading claims with each other.'},
    {q:'You buy shares from an unknown seller. The mechanically correct question is…', c:['Does the CEO approve?','Why is my counterparty selling to me at this price?','Will Apple thank me?','Is volume high?'], a:1, e:'Every trade has an opposing decision. Understanding the other side is the beginning of edge.'}
  ]},
{ id:'t1_marginal', sub:'T1', title:'Price is set by the marginal trade, not by “worth”',
  predict:'A company has 1 billion shares. Today just 5 million traded, and the last trade printed 3% lower. Headlines say the company “lost $9 billion in value.” Did it?',
  concept:'<p>A stock’s posted price is simply <b>the last price at which one share changed hands</b> — the marginal trade. Multiply that by a billion shares and you get market cap, but nobody traded a billion shares. The 0.5% that traded set the price for the 99.5% that sat still.</p><p>Consequences: (1) Prices move on the <b>urgency of the few</b>, not the judgment of the many — one forced seller in a thin market marks down everyone’s holdings. (2) “The company lost $9B today” means only: the most recent traders agreed on a lower number. Value on paper is an extrapolation from the margin. (3) In thin liquidity (Tier 0 vocabulary) small money makes big price moves — which is precisely how manipulation works (Tier 7’s pump anatomy).</p><p>Who benefits from marginal pricing? Whoever controls the urgency at the margin: forced buyers create sellers’ paydays, and forced sellers create buyers’ bargains. The next lessons build the census of who gets forced, and when.</p>',
  teach:'Explain how 0.5% of shares trading can re-price 100% of a company, in 5 sentences.',
  cards:[
    {f:'The posted stock price is literally…', b:'The last marginal trade — the price the most recent buyer and seller agreed on.'},
    {f:'Why thin liquidity means violent prices', b:'Few traders at the margin set the price for everyone; one urgent order moves the print.'},
    {f:'“The company lost $9B today” really means…', b:'The latest marginal traders agreed on a lower price; the rest is extrapolation.'}
  ],
  quiz:[
    {q:'A fund MUST sell a huge block today in a thin market. The likeliest result…', c:['No effect','Price falls hard as urgency hits the margin — bargains for patient buyers','Price rises','Trading halts automatically'], a:1, e:'Urgency at the margin sets the price. Forced sellers pay; patient counterparties collect.'},
    {q:'Market cap equals the marginal price × all shares. This makes market cap…', c:['An exact measure of value','An extrapolation from the last trade to shares that never traded','A government statistic','Meaningless'], a:1, e:'Useful, but built on the margin — which is why forced flows can distort it.'}
  ]},
{ id:'t1_players', sub:'T1', title:'The player census I: retail, index funds, pensions',
  predict:'Rank these by how free they are to do whatever they want with their money: a retail investor, an S&amp;P 500 index fund, a pension fund. Justify your ranking.',
  concept:'<p>Learn each player by three questions: what do they hold, how are they paid, what are they <b>forced</b> to do?</p><p><b>Retail (you).</b> Holds: personal savings. Paid: own gains. Forced to do: <i>nothing</i> — the only player with no mandate, no clients, no deadline. That freedom is the edge institutions envy — most retail throws it away by acting like an impatient fund.</p><p><b>Index funds.</b> Hold: whatever the index rule says, in the rule’s proportions. Paid: tiny % of assets. Forced: to buy whatever enters the index and sell whatever leaves, <i>at any price, on a known date</i>. Price-blind, rule-bound, and now roughly half of U.S. fund assets <i>[estimate — VERIFY]</i>.</p><p><b>Pensions.</b> Hold: workers’ retirement promises (trillions). Paid: salaries; judged on meeting long liabilities. Forced: to keep allocations near policy targets (e.g. 60% stocks / 40% bonds), which means <b>mechanical rebalancing</b> — a quarter where stocks surge forces them to sell stocks and buy bonds, and vice versa. Predictable flows, published calendars.</p>',
  teach:'For index funds and pensions, state in plain words what each is FORCED to do and why, in 5 sentences.',
  cards:[
    {f:'Retail’s structural edge', b:'No mandate, no clients, no deadline — the only unforced player on the field.'},
    {f:'What index funds are forced to do', b:'Buy whatever enters the index and sell whatever leaves — price-blind, on a known date.'},
    {f:'What pension rebalancing forces', b:'Trimming whatever rose and adding whatever fell to restore target weights — predictable, calendar-driven flows.'}
  ],
  quiz:[
    {q:'Stocks surge 20% in a quarter. A 60/40 pension fund is now forced to…', c:['Buy more stocks','Sell stocks and buy bonds back to target','Do nothing','Close the fund'], a:1, e:'Policy weights are the mandate. Rebalancing mechanically sells winners and buys losers.'},
    {q:'An index fund’s decision about what to buy is made by…', c:['Its star manager','The index rule-writers — the fund just obeys','The SEC','Its investors, daily'], a:1, e:'Index funds are execution machines for the basket rules. The rule-writers direct the flows.'}
  ]},
{ id:'t1_players2', sub:'T1', title:'The player census II: hedge funds, VCs, banks, market makers, insiders, media',
  predict:'A hedge fund manager is brilliant and believes a stock will triple in 5 years — but clients can pull their money every quarter. What is she forced to care about instead?',
  concept:'<p><b>Hedge funds.</b> Hold: pooled money from institutions/rich clients. Paid: fees on assets + cut of profits (“2-and-20”, Tier 6). Forced: to survive <b>redemptions</b> — clients can leave quarterly, so a right-in-3-years idea that is down this year gets liquidated. Career risk makes them chase what is working now.</p><p><b>Venture capital.</b> Holds: stakes in private startups. Paid: fees + carry on exits. Forced: to <i>return cash within a ~10-year fund life</i> — meaning they must eventually find buyers (IPOs, acquirers). Their public optimism is inventory marketing.</p><p><b>Banks.</b> Paid: fees on deals (IPOs, M&amp;A, lending). Forced: to keep deal flow coming — their research and ratings orbit that incentive.</p><p><b>Market makers.</b> Paid: the spread, millions of times daily. Forced: to hedge instantly and stay flat — they are plumbing, not opinion.</p><p><b>Insiders.</b> Hold: their own company’s stock + non-public knowledge. Forced: to disclose trades publicly (Form 4) — a rare honest window (Tier 6).</p><p><b>Media.</b> Paid: attention. Forced: to produce urgency on a daily schedule regardless of whether anything happened.</p>',
  teach:'Pick any three of these players and state: what they hold, how they are paid, what they are forced to do — one sentence each.',
  cards:[
    {f:'What redemptions force on hedge funds', b:'Quarterly client exits force short horizons — right-eventually gets sold to survive down-now.'},
    {f:'What a 10-year fund life forces on VCs', b:'They MUST find exits (IPO/acquisition) — their public bullishness is marketing for future buyers.'},
    {f:'Media’s actual product', b:'Urgency and attention on a daily schedule — coverage tracks engagement, not opportunity.'}
  ],
  quiz:[
    {q:'A VC loudly praises its portfolio company on TV. The mechanism-first reading is…', c:['Pure generosity','Marketing inventory to future buyers — the fund needs an exit within its lifespan','Insider trading','A legal requirement'], a:1, e:'Fund structure forces exits; talking the book recruits the buyers those exits require.'},
    {q:'Hedge funds often pile into whatever is already rising because…', c:['They are foolish','Quarterly redemptions and career risk punish being early/contrarian and down','It always works','Regulators require it'], a:1, e:'Constraints, not stupidity: clients flee short-term losses, so managers chase short-term winners.'}
  ]},
{ id:'t1_masterkey', sub:'T1', title:'The master key: constraints force behavior',
  predict:'A stock is announced as joining a major index in two weeks. Every index fund on Earth must buy it on inclusion day. What happens to the price before, on, and after that day?',
  concept:'<p>The master key of the entire module: <b>constraints force behavior; forced behavior is predictable; predictable behavior is where edges live.</b> Nobody needs to guess what a forced player will do — the mandate already wrote their orders.</p><p>Case study — index inclusion. When SPCX joined the Nasdaq-100 (June 2026 <i>[VERIFY details]</i>), every fund tracking that index was contractually obligated to buy on a public schedule. The sequence: fast money buys <i>ahead</i> (front-running the known demand) → price runs up → inclusion day: index funds buy at the elevated price from the front-runners — <b>the forced buyer pays the toll</b> → demand exhausted, price fades after.</p><p>Who benefited? Traders who read the calendar. Who paid? Index investors, a few basis points at a time, and latecomers who bought the pop’s story. The same key opens every door ahead: rebalances, lockup expiries, margin cascades, buyback blackouts — all calendars of forced flows. When you see any event, ask first: <b>who is forced to act, which direction, on what schedule?</b></p>',
  teach:'State the master key in one sentence, then walk a beginner through the index-inclusion sequence: who buys early, who is forced to buy late, who pays.',
  cards:[
    {f:'The master key', b:'Constraints force behavior; forced behavior is predictable; predictable behavior is where edges live.'},
    {f:'Index-inclusion sequence', b:'Front-runners buy ahead → price runs → index funds forced to buy high on the date → demand spent, price fades.'},
    {f:'The first question for any market event', b:'Who is forced to act, in which direction, on what schedule?'}
  ],
  quiz:[
    {q:'Why does a stock often FADE after joining a big index?', c:['The company weakens','The scheduled forced buying is complete — the demand was an event, not a trend','Index funds sell it','Regulators cap it'], a:1, e:'Once the mandated buyers have bought, the anticipatory bid is gone. The flow was the story.'},
    {q:'The reason forced flows create edges is that they are…', c:['Large','Public, scheduled, and price-insensitive','Illegal','Rare'], a:1, e:'Predictability is the edge: everyone can read the calendar; forced players must act anyway.'}
  ]},
{ id:'t1_media', sub:'T1', title:'Media economics: fear and euphoria as products',
  predict:'A stock has risen 400% and now saturates every feed and news show. As a forward indicator, is peak coverage bullish, bearish, or neutral — and through what mechanism?',
  concept:'<p>Financial media is not paid to make you money; it is paid for your <b>attention</b>. Fear and euphoria are the two most clickable emotions, so the machine manufactures both on a daily schedule — “markets in turmoil,” “the next big thing” — regardless of whether anything changed.</p><p>The structural consequence: <b>coverage peaks track attention peaks, and attention peaks come after the move.</b> A story reaches saturation only after the price has already run — meaning maximum coverage marks the moment the marginal buyer (Tier 1, lesson 2) is most likely already in. Whoever bought the story at saturation supplied exit liquidity to whoever bought before the story existed.</p><p>Who benefits? Platforms (engagement), and early holders (fresh buyers at the top). Who pays? The audience that mistakes coverage intensity for opportunity. The operator’s discipline: use media as a <i>sentiment gauge</i>, never a <i>signal</i> — when your barber and your feed agree on a stock, ask who still remains to buy it.</p>',
  teach:'Explain why maximum news coverage tends to arrive near attention tops, and who is buying from whom at that moment, in 5 sentences.',
  cards:[
    {f:'Media’s incentive', b:'Sell attention — fear and euphoria are products with a daily production quota.'},
    {f:'Why peak coverage ≈ attention peak, not opportunity', b:'Stories saturate only after the move; by then the marginal buyer is largely in.'},
    {f:'Correct use of financial media', b:'As a sentiment gauge (who already knows this story?) — never as a buy signal.'}
  ],
  quiz:[
    {q:'A stock becomes the #1 story everywhere after a 300% run. Mechanically, new buyers at this point mostly provide…', c:['Capital to the company','Exit liquidity to earlier holders','Support to the media','Nothing'], a:1, e:'Secondary market: late story-buyers purchase from early holders — the story is the distribution channel.'},
    {q:'“Markets in turmoil” segments exist primarily because…', c:['Turmoil is constant','Fear is a reliably clickable product','Regulators require them','They predict crashes'], a:1, e:'The business model is attention. Emotional intensity is manufactured on schedule.'}
  ]},

// ───────────────────────── TIER 2 · THE MACHINE ─────────────────────────
{ id:'t2_mm', sub:'T2', title:'Market makers and spreads; liquidity as depth',
  predict:'Someone must be willing to sell whenever you buy, instantly, all day. Who volunteers for that job, and what do they earn for it?',
  concept:'<p>A <b>market maker</b> is a firm that continuously quotes both a bid and an ask on a security, standing ready to trade with anyone. Their profit is the <b>spread</b> (Tier 0), captured thousands of times a day, while hedging instantly so they hold almost no directional risk. They are the market’s plumbing: paid for immediacy, not opinion.</p><p>Refine your liquidity picture: liquidity is <b>depth, not volume</b>. Volume is how much traded; depth is how much <i>could</i> trade without moving the price. A meme stock can print huge volume with paper-thin depth — the book is a crowd of tiny urgent orders, so prices gap violently. Treasuries trade with oceanic depth — billions move the price barely at all.</p><p>Who benefits? Makers earn the toll; everyone else buys immediacy with it. When does the machine bite? In panics, makers widen spreads or step away — <i>liquidity vanishes exactly when it is most needed</i>, a mechanical fact behind flash crashes (and Tier 11’s flow lessons).</p>',
  teach:'Explain what a market maker does for a living and why liquidity means depth rather than volume, in 5 sentences.',
  cards:[
    {f:'Market maker’s business', b:'Quote both sides all day, capture the spread at scale, hedge to stay directionless — paid for immediacy.'},
    {f:'Depth vs. volume', b:'Volume = how much traded. Depth = how much could trade without moving the price. Liquidity is depth.'},
    {f:'When spreads blow out', b:'In panics makers widen or withdraw — liquidity disappears precisely when demanded most.'}
  ],
  quiz:[
    {q:'High volume with violent price gaps on modest orders indicates…', c:['Deep liquidity','Thin depth despite the volume','A healthy market','Low volatility'], a:1, e:'Activity is not depth. Thin books gap on urgency regardless of how much churns.'},
    {q:'A market maker’s core income is…', c:['Betting on direction','The bid–ask spread, captured at scale','Company dividends','Government fees'], a:1, e:'They are toll collectors of immediacy, hedged against direction.'}
  ]},
{ id:'t2_pfof', sub:'T2', title:'Payment for order flow: why “free” brokers exist',
  predict:'Your broker charges $0 commission. Brokers are not charities. Trace the money: who is paying them, and for what exactly?',
  concept:'<p><b>Payment for order flow (PFOF):</b> your “free” broker sells the right to execute your orders to a market-making firm. The maker pays for the privilege because <b>retail order flow is the safest flow in the market</b> — small, uninformed on average, and unlikely to be an institution running them over. Against such flow, quoting a spread is nearly riskless profit.</p><p>The mechanics: you are typically filled at or slightly inside the public bid/ask (“price improvement”), the maker still captures most of the spread, and a slice of that goes back to the broker as PFOF. Your commission is $0; your cost moved into the spread and got shared without you at the table.</p><p>Who benefits? Makers (safe flow), brokers (paid per order — which is why the app is engineered to make you trade <i>more</i>: confetti, alerts, one-tap options). Who pays? Traders, in proportion to how often they trade. The product being sold is not the app. <b>The product is you</b> — specifically, your order flow. [Mechanics general; specific broker arrangements VERIFY.]</p>',
  teach:'Explain how a $0-commission broker actually gets paid, and why its app design wants you trading constantly, in 5 sentences.',
  cards:[
    {f:'Payment for order flow', b:'Market makers pay brokers for retail orders — safe, uninformed-on-average flow that makes spread capture nearly riskless.'},
    {f:'Where the cost went when commissions hit $0', b:'Into the spread, shared between maker and broker — paid per trade, invisibly.'},
    {f:'Why the app gamifies trading', b:'Brokers are paid per order — more taps, more flow to sell. The product is your order flow.'}
  ],
  quiz:[
    {q:'Retail order flow commands a price because it is…', c:['Huge','Unlikely to be informed institutional flow — safe to trade against','Illegal to refuse','Fast'], a:1, e:'Makers fear informed counterparties. Small scattered retail orders are the safest business in markets.'},
    {q:'Under PFOF, a broker’s revenue rises when you…', c:['Hold for decades','Trade more often','Read filings','Buy index funds once'], a:1, e:'Paid per order: engagement features exist to manufacture flow.'}
  ]},
{ id:'t2_short', sub:'T2', title:'Short selling: borrow, sell, buy back, return',
  predict:'How could you profit from a stock FALLING — using only these tools: borrowing, selling, and buying? Sketch the sequence before revealing.',
  concept:'<p><b>Short selling</b>, step by step: (1) <b>Borrow</b> shares from a holder, paying a <b>borrow fee</b> (annualized %; scarce borrows cost more). (2) <b>Sell</b> them at today’s price. (3) Later, <b>buy back</b> the same number of shares — hopefully cheaper. (4) <b>Return</b> them. Profit = sale price − buyback price − fees.</p><p>The risk is inverted and unbounded: a long can lose 100%; a short can lose <i>infinity</i>, because there is no ceiling on a price. And rising prices squeeze shorts mechanically: losses grow, margin calls arrive, and the only exit is <b>buying</b> — which pushes the price further up, forcing more shorts to buy. That chain reaction is a <b>short squeeze</b>.</p><p>Read the gauge correctly: <b>short interest</b> (% of float sold short) is <i>fuel, not forecast</i>. High short interest means many players who are eventually forced to buy — it says nothing by itself about whether they are right. Who benefits from squeezes? Whoever holds inventory when forced buyers arrive (Tier 12: GameStop).</p>',
  teach:'Walk a 12-year-old through the four steps of a short sale, then explain why heavily shorted stocks can explode upward, in 5 sentences.',
  cards:[
    {f:'The four steps of a short', b:'Borrow → sell → buy back → return. Profit = sold high, repurchased low, minus borrow fees.'},
    {f:'Why short losses are unbounded', b:'No ceiling on price — and rising losses force buy-backs that push price higher (squeeze).'},
    {f:'Short interest is…', b:'Fuel, not forecast: a queue of future forced buyers, not evidence about the business.'}
  ],
  quiz:[
    {q:'Short at $40, buy back at $25, fees $1. Per-share result…', c:['+$14','+$15','−$15','+$25'], a:0, e:'40 − 25 − 1 = +$14.'},
    {q:'A short squeeze feeds itself because covering a short requires…', c:['Selling more','Buying — which lifts the price and forces more covering','Borrowing more','A dividend'], a:1, e:'The only exit from a short is a buy. Forced buys beget higher prices beget more forced buys.'}
  ]},
{ id:'t2_options', sub:'T2', title:'Options from zero — then flip to the seller’s chair',
  predict:'Someone will sell you the RIGHT (not obligation) to buy a $100 stock at $110 anytime this month. What should that right cost, and what has to happen for you to profit?',
  concept:'<p>An <b>option</b> is a contract. A <b>call</b>: the right to <i>buy</i> at a set price (<b>strike</b>) before a date (<b>expiry</b>). A <b>put</b>: the right to <i>sell</i>. The price you pay for the contract is the <b>premium</b>. Buy the $110 call for $2 on a $100 stock: below $110 at expiry it dies worthless; you need $112 just to break even.</p><p>Now sit in the <b>seller’s</b> chair — the view that matters. The seller pockets the premium on day one and profits whenever the big move <i>doesn’t</i> happen. Every day that passes, the option loses time value — <b>theta decay</b> — money that drains from buyer to seller on a schedule. Theta is the house edge, and sellers (mostly professional dealers) run the casino.</p><p>Short-dated options are decay at its steepest: buyers of weekly lottery tickets are, in aggregate, the most reliably harvested group in markets — they must be right on direction, size, <i>and</i> deadline, while the seller merely needs time to pass. Who benefits? Premium sellers and the brokers paid per contract. [Tier 7 revisits “income” strategies sold back to retail; Tier 11 covers how dealer hedging moves the whole market.]</p>',
  teach:'Define call, put, strike, premium, expiry in plain words — then explain why the option SELLER usually holds the edge, in 5 sentences.',
  cards:[
    {f:'Call vs. put', b:'Call: right to buy at the strike by expiry. Put: right to sell. Cost of either = the premium.'},
    {f:'Theta decay', b:'Options lose time value daily — a scheduled transfer from buyer to seller. The house edge.'},
    {f:'Why short-dated option buyers get harvested', b:'They must be right on direction, magnitude, AND deadline; the seller just needs the clock.'}
  ],
  quiz:[
    {q:'Stock at $100. You pay $2 for a $110 call. At expiry the stock is $109. Your result…', c:['+$9','−$2 (worthless)','+$7','Break even'], a:1, e:'Below the strike, the right to buy at $110 is worth nothing. The premium is fully lost.'},
    {q:'Theta decay systematically favors…', c:['Option buyers','Option sellers','Neither','The exchange only'], a:1, e:'Time value drains to sellers daily — the structural house edge of the options market.'}
  ]},
{ id:'t2_leverage', sub:'T2', title:'Leverage and margin: how liquidation cascades work',
  predict:'You buy $20k of stock using $10k of yours and $10k borrowed. The stock falls 30%. Compute your personal loss in % before revealing.',
  concept:'<p><b>Leverage</b> is investing with borrowed money; <b>margin</b> is the broker’s loan against your holdings. It multiplies both directions: $10k of yours + $10k borrowed = $20k position. A 30% drop costs $6k — <b>60% of your money</b>. The debt doesn’t shrink; only your side does.</p><p>The machine has a tripwire. Fall far enough and the broker issues a <b>margin call</b>: add cash or be liquidated. Refuse or fail, and the broker <b>force-sells your position at market</b> — at the worst possible moment, by construction. Now scale it: falling prices trigger liquidations → forced selling pushes prices lower → lower prices trigger the next tier of liquidations. That chain is a <b>liquidation cascade</b>, and it is why leveraged markets fall in air pockets rather than lines.</p><p>The permanent lesson: <b>leverage converts “right eventually” into “broke first.”</b> The market can stay irrational longer than a borrower can stay solvent. Who benefits? Lenders collect interest in all weather, and cascade buyers collect the forced sellers’ inventory. Ruin math (Tier 0) says the cascade’s victims never get to be right later.</p>',
  teach:'Explain with the $10k example how leverage doubles gains and losses, and narrate a liquidation cascade, in 5 sentences.',
  cards:[
    {f:'2× leverage turns a −30% move into…', b:'−60% of your equity — the loan never shrinks, only your side does.'},
    {f:'Margin call → liquidation', b:'Fall past the threshold: add cash or the broker force-sells you at market, at the low.'},
    {f:'The leverage law', b:'Leverage converts “right eventually” into “broke first.” Cascades are its market-wide form.'}
  ],
  quiz:[
    {q:'Liquidation cascades accelerate because forced selling…', c:['Attracts regulators','Lowers prices, which triggers the next round of forced selling','Reduces volume','Is illegal'], a:1, e:'Each liquidation is a market sell that trips the next tripwire — mechanical, not emotional.'},
    {q:'$10k own + $10k margin. Stock rises 50%. Ignoring interest, your equity gain is…', c:['+50%','+100%','+25%','+150%'], a:1, e:'$20k position +50% = +$10k on your $10k. Leverage doubles both directions — remember the other direction.'}
  ]},
{ id:'t2_ipo1', sub:'T2', title:'IPO I: why companies IPO; the roadshow and bookbuilding',
  predict:'Before an IPO, the company and its banks tour the country meeting big investors privately. What are they doing in those rooms — and who is deliberately NOT invited?',
  concept:'<p>The IPO lifecycle is this tier’s flagship — five lessons, one running case: <b>SPCX (SpaceX), June 2026 IPO <i>[VERIFY dates/details]</i></b>.</p><p>Why IPO? Tier 0’s reasons (capital, insider liquidity, acquisition currency) plus one more: <b>early investors need the exit</b> (Tier 1 — VC fund lifespans). The IPO is the moment a decade of private bets gets converted into public money.</p><p>The process: the company files an <b>S-1</b> (the full disclosure document — Tier 3 teaches you to read it), then banks run the <b>roadshow</b>: private meetings with institutions to gauge demand. In <b>bookbuilding</b>, those institutions submit indications — how many shares, at what price — and the banks assemble the demand book and set the offer price.</p><p>Note who is in the room: funds, not you. Retail hears the story through media only after the professionals have set the price. Who benefits? Banks (fees ~a healthy % of proceeds <i>[VERIFY]</i>, plus favor with fund clients), and institutions (first look). The pricing is a negotiation among insiders that the public later ratifies — or refuses to.</p>',
  teach:'Explain what an S-1, a roadshow, and bookbuilding are, and who is in the room when the price is set, in 5 sentences.',
  cards:[
    {f:'S-1', b:'The pre-IPO disclosure filing — the company’s full self-description, risks and financials included.'},
    {f:'Roadshow + bookbuilding', b:'Private demand-gathering from institutions; their indications build the book that sets the offer price.'},
    {f:'Who sets the IPO price?', b:'Banks negotiating with institutional buyers — retail is not in the room.'}
  ],
  quiz:[
    {q:'The offer price of an IPO is set primarily by…', c:['Retail demand on day one','Bankers and institutions during bookbuilding','The SEC','An algorithm'], a:1, e:'The book is built in private meetings. The public meets the price after it exists.'},
    {q:'A key structural reason companies IPO is that their venture investors…', c:['Enjoy paperwork','Must return cash within a fund’s ~10-year life and need the exit','Are forced by law','Want lower valuations'], a:1, e:'Fund clocks force exits. The IPO is the scheduled door.'}
  ]},
{ id:'t2_ipo2', sub:'T2', title:'IPO II: allocation and the first-day pop as a wealth transfer',
  predict:'An IPO prices at $30. It opens for public trading at $45 — a 50% “pop” celebrated on TV. Who owned shares at $30, who bought at $45, and who lost what?',
  concept:'<p><b>Allocation:</b> shares at the offer price go to whom the banks choose — overwhelmingly the institutions from the book, plus favored clients. <b>Retail effectively cannot buy at the offer price.</b> Your first chance is the open, wherever it prints.</p><p>Now decode the celebrated <b>first-day pop</b>. Price at $30, open at $45: the allocated institutions are up 50% in hours. But mechanically, the pop means <b>the company sold its shares for $15 less than buyers would pay</b> — money the company raised for its future handed instead to the allocation list. A 50% pop on a $2B raise is roughly $1B of foregone capital <i>[estimate]</i> — a wealth transfer from the company (and its pre-IPO owners) to the banks’ best customers.</p><p>Why do banks systematically underprice? The allocation pop is a gift they distribute to clients who pay them in other ways — and a “hot deal” headline markets the next IPO. Who pays? The issuer, and every retail buyer of the pop at $45 — who bought at a price the professionals just showed they could not get. SPCX case: log its offer price vs. first prints <i>[VERIFY]</i>.</p>',
  teach:'Explain why a huge first-day IPO pop is bad for the company and great for the allocation list, naming who paid whom, in 5 sentences.',
  cards:[
    {f:'Who gets offer-price shares?', b:'Institutions and favored bank clients from the book. Retail buys at the open, after the pop.'},
    {f:'A first-day pop mechanically means…', b:'The company sold itself too cheap — the gap is a transfer to the allocation list.'},
    {f:'Why banks underprice deliberately', b:'The pop is a distributable gift to their paying clients, and marketing for the next deal.'}
  ],
  quiz:[
    {q:'IPO priced at $30, opens at $45. The $15 gap primarily flowed from…', c:['Retail to banks','The company (foregone proceeds) to allocated institutions','The SEC to funds','Nowhere — no one paid'], a:1, e:'The company sold at $30 what buyers valued at $45. The difference was captured by whoever got allocations.'},
    {q:'Buying the celebrated first-day pop means buying at the price…', c:['Institutions just got','Professionals declined to pay hours earlier','The company chose','The SEC set'], a:1, e:'The book, with full information, priced it at $30. You are paying $45 for the story of the pop itself.'}
  ]},
{ id:'t2_ipo3', sub:'T2', title:'IPO III: greenshoe, quiet period, analyst initiations',
  predict:'In the weeks after an IPO, the underwriting banks quietly stabilize the price, say nothing, then all publish research on the same day. Guess the purpose of each behavior.',
  concept:'<p>Three pieces of post-IPO machinery, each mechanically explainable:</p><p><b>The greenshoe.</b> Banks are granted an option to sell ~15% extra shares <i>[VERIFY]</i>. If the price sags below the offer, they buy shares back (supporting the price) to cover that extra allocation; if it flies, they exercise the option instead. Translation: a legal price-stabilization tool that also guarantees the banks a profit in both directions.</p><p><b>The quiet period.</b> For a window around the deal, the company and its underwriters are restricted from promotional statements <i>[VERIFY current rules]</i>. Silence is regulatory, not ominous.</p><p><b>Analyst initiations.</b> When the quiet period ends, the underwriters’ research desks initiate coverage — overwhelmingly with positive ratings on the stock <i>their own bank just sold</i>. The conflict is structural (Tier 6): research orbits banking fees. The initiation-day headline burst is scheduled marketing, not new information.</p><p>Who benefits? Banks throughout. The operator’s takeaway: post-IPO price action for weeks is <i>managed</i> — judge nothing until the machinery (and the next lesson’s lockup) has cleared.</p>',
  teach:'Explain the greenshoe, the quiet period, and why underwriter “Buy” initiations deserve heavy discounting, in 5 sentences.',
  cards:[
    {f:'Greenshoe', b:'Banks’ ~15% over-allotment option [VERIFY] — a stabilization tool that pays them whether the price sags or flies.'},
    {f:'Quiet period', b:'A regulatory promotion blackout around the deal — silence by rule, not by signal.'},
    {f:'Analyst initiations after an IPO', b:'The selling banks’ research desks rating their own product — scheduled marketing, structurally conflicted.'}
  ],
  quiz:[
    {q:'Underwriters initiating coverage with Buy ratings on their own IPO is best read as…', c:['Independent validation','A structural conflict — research supporting the banking relationship','Illegal','A coincidence'], a:1, e:'The same firm collected the fees. The rating’s incentive chain runs through the deal, not the analysis.'},
    {q:'The greenshoe lets banks respond to a sagging IPO price by…', c:['Halting trading','Buying shares back to cover their over-allocation, supporting the price','Suing shorts','Issuing more stock'], a:1, e:'Stabilization by construction: their covering bid props the price during the fragile window.'}
  ]},
{ id:'t2_ipo4', sub:'T2', title:'IPO IV: the lockup — scheduled supply, in the calendar',
  predict:'Insiders own 80% of a newly public company but are contractually barred from selling for ~180 days. What date is circled on every professional’s calendar, and why?',
  concept:'<p>The <b>lockup</b>: insiders and pre-IPO investors are contractually barred from selling for ~180 days after the IPO <i>[VERIFY per deal]</i>. Its purpose: prevent the people with the most shares and the most information from dumping into the fragile debut.</p><p>Connect it to <b>float</b> (Tier 0): early on, only the IPO’s slice — often 10–20% of the company — actually trades. Small float + heavy attention = the violent price action typical of young listings: scarcity, not consensus, sets the marginal price (Tier 1). Meanwhile a supermajority of shares sits in a locked pen, <b>with a public release date</b>.</p><p>Lockup expiry is therefore <i>scheduled supply</i>: on a known day, the tradable share count can multiply. Master key applied: who is forced/able to act? Insiders — many diversifying a decade’s illiquid wealth, rationally, whatever they believe. Sophisticated players position for that supply <i>ahead</i> of the date; the unaware hold through it wondering why the chart sagged into a known calendar event. Running case: <b>SPCX lockup, December 2026 <i>[VERIFY dates]</i></b> — the module’s season finale.</p>',
  teach:'Define lockup and float, then explain why expiry day is “scheduled supply” and who positions ahead of it, in 5 sentences.',
  cards:[
    {f:'Lockup', b:'~180-day contractual ban [VERIFY] on insider selling after an IPO — protecting the debut from its own owners.'},
    {f:'Why young IPOs trade violently', b:'Tiny float — scarcity sets the marginal price while most shares sit locked.'},
    {f:'Lockup expiry is…', b:'Scheduled supply: a known date when the tradable share count can multiply. The calendar is public.'}
  ],
  quiz:[
    {q:'Only 15% of a company floats; 85% unlocks in December. Rational insiders diversifying implies December brings…', c:['Scheduled demand','A large, calendar-known increase in potential supply','Nothing predictable','A buyback'], a:1, e:'Master key: insiders’ rational diversification is predictable, dated selling pressure.'},
    {q:'The violent early trading of fresh IPOs is primarily explained by…', c:['Fundamentals changing daily','A tiny float — scarcity pricing at the margin','Short sellers','Analyst ratings'], a:1, e:'When 85% of shares cannot trade, small flows whip the price of the sliver that can.'}
  ]},
{ id:'t2_ipo5', sub:'T2', title:'IPO V: expiry dynamics, secondaries, and Ritter’s verdict',
  predict:'Averaged across decades of data, do IPOs beat or lag the market over the 3–5 years after listing? Commit to a guess and a reason.',
  concept:'<p><b>Expiry dynamics.</b> Into a lockup expiry: anticipatory selling and short positioning against the known supply. At expiry: sometimes the cliff (supply overwhelms), sometimes relief (feared selling doesn’t materialize — the fear was pre-sold). The edge is not “short every expiry”; it is knowing the <i>date, the float math, and who holds what</i> while others stare at the chart.</p><p><b>Secondaries.</b> After lockup, companies and insiders can run <b>secondary offerings</b> — organized block sales of new or insider shares, usually priced at a discount. Each new-share secondary dilutes existing holders (Tier 3’s share-count lesson); each insider secondary is disclosed conviction data.</p><p><b>The verdict.</b> Jay Ritter’s IPO datasets — the academic standard — show <b>most IPOs lag the market over the following 3–5 years</b> <i>[fact — see Ritter’s data; magnitudes vary by cohort]</i>. Mechanically sensible: IPOs are sold at maximum narrative, by informed sellers, when conditions favor sellers. You now hold the complete lifecycle: <b>Gate exam 2 is narrating SPCX from S-1 to lockup, naming who paid whom at every step.</b></p>',
  teach:'Narrate the full IPO lifecycle — S-1, roadshow, allocation, pop, greenshoe, quiet period, lockup, expiry — in ~8 sentences, naming who benefits at each step.',
  cards:[
    {f:'Two outcomes at lockup expiry', b:'Cliff (supply overwhelms) or relief (selling was pre-positioned) — the edge is knowing date, float, and holders.'},
    {f:'Secondary offering', b:'Post-IPO organized share sale — new shares dilute holders; insider blocks reveal conviction.'},
    {f:'Ritter’s finding on IPO returns', b:'Most IPOs lag the market over 3–5 years post-listing — informed sellers pick the timing.'}
  ],
  quiz:[
    {q:'The long-run pattern in Ritter’s IPO data is that typical IPOs…', c:['Beat the market for years','Lag the market over the following 3–5 years','Match the market exactly','Cannot be measured'], a:1, e:'IPOs are timed and priced by informed sellers at peak narrative — the average aftermath underperforms.'},
    {q:'A company issues 20% more shares in a secondary. Your ownership per share…', c:['Is unchanged','Is diluted — your % claim shrinks','Increases','Doubles'], a:1, e:'More slices of the same pizza. Dilution is the silent tax tracked in Tier 3.'}
  ]}
,
// ───────────────────────── TIER 3 · READING THE MONEY ─────────────────────────
{ id:'t3_three', sub:'T3', title:'The three statements: opinion, position, truth',
  predict:'A company can legally report a profit while its bank account drains toward zero. Which document would expose that — and why can the “profit” number diverge from cash?',
  concept:'<p>Every public company files three linked statements. Learn their personalities:</p><p><b>Income statement — the opinion.</b> Revenue, costs, profit over a period. Opinion, because accounting choices (when to count a sale, how fast to depreciate) shape the numbers within legal bounds.</p><p><b>Balance sheet — the position.</b> A snapshot: what the company owns (assets), owes (liabilities), and the remainder (equity). The freeze-frame of financial standing.</p><p><b>Cash flow statement — the truth.</b> Actual dollars entering and leaving the bank account. Cash is brutally hard to fake: it is either there or it is not.</p><p>They interlock: profit from the income statement flows into equity; cash movements reconcile to the balance sheet’s cash line. The load-bearing skill of this tier is <b>triangulation</b> — when reported profit rises but cash keeps falling, the gap is where questions (and frauds) live. Who benefits from you reading all three? You — the whole disclosure regime exists so outsiders can check the story against the cash.</p>',
  teach:'Explain the three statements as opinion / position / truth to a beginner, and why profit and cash can diverge, in 5 sentences.',
  cards:[
    {f:'The three statements, one word each', b:'Income statement: opinion. Balance sheet: position. Cash flow: truth.'},
    {f:'Why the income statement is “opinion”', b:'Legal accounting choices (revenue timing, depreciation) shape profit within bounds.'},
    {f:'The first red-flag pattern', b:'Reported profit rising while operating cash falls — the gap is where questions live.'}
  ],
  quiz:[
    {q:'The statement hardest to dress up is the…', c:['Income statement','Balance sheet','Cash flow statement','Press release'], a:2, e:'Cash in the bank either exists or it does not. Opinions live upstream of it.'},
    {q:'Profit up three years straight, operating cash flow down three years straight. Correct response…', c:['Celebrate growth','Investigate the divergence — profit is opinion, cash is truth','Ignore both','Check the stock chart'], a:1, e:'Triangulation is the skill: divergence between opinion and truth is the tell.'}
  ]},
{ id:'t3_income', sub:'T3', title:'The income statement line by line — and where revenue is gamed',
  predict:'A software firm signs a 3-year, $36M contract today. How much revenue is it entitled to report THIS quarter — and how might a desperate one report more?',
  concept:'<p>Top to bottom: <b>Revenue</b> (sales) → minus <b>cost of goods sold</b> = <b>gross profit</b> → minus operating expenses (R&amp;D, sales, admin) = <b>operating income</b> → minus interest and taxes = <b>net income</b>, the famous “bottom line.” Each level asks a different question: is the product itself profitable (gross)? Is the business machine profitable (operating)? After financing and the taxman (net)?</p><p><b>Revenue recognition</b> is where games begin, because revenue is counted when <i>earned</i>, not when cash arrives. The $36M/3-year contract should be recognized ~$3M per quarter as service is delivered. Aggressive management pulls tomorrow into today: booking future periods early, stuffing distribution channels with product (“channel stuffing”), or counting barter and round-trip deals as sales.</p><p>The detector you already own: revenue recognized without cash arriving piles up as <b>accounts receivable</b> (owed but unpaid). <b>Receivables growing much faster than revenue</b> is the classic tell that reported sales are running ahead of reality. Who benefits from aggressive recognition? Executives paid on growth — this quarter, on whose watch the music must not stop.</p>',
  teach:'Walk down the income statement’s levels in plain words, then explain channel stuffing and its receivables tell, in 6 sentences.',
  cards:[
    {f:'Gross vs. operating vs. net income', b:'Product profitability → business-machine profitability → after interest and taxes.'},
    {f:'Revenue recognition principle', b:'Counted when earned, not when cash arrives — the gap is where aggression hides.'},
    {f:'The classic revenue red flag', b:'Accounts receivable growing much faster than revenue — sales booked ahead of cash reality.'}
  ],
  quiz:[
    {q:'Revenue +10% this year; accounts receivable +45%. The mechanical concern is…', c:['Healthy demand','Sales are being booked well ahead of collection — recognition may be aggressive','Too much cash','Low margins'], a:1, e:'Uncollected sales piling up faster than sales themselves is the textbook recognition tell.'},
    {q:'A $36M 3-year service contract signed today should produce roughly how much revenue this quarter?', c:['$36M','$12M','$3M','$0 until fully paid'], a:2, e:'Earned as delivered: ~$36M ÷ 12 quarters = $3M. Booking more is pulling the future forward.'}
  ]},
{ id:'t3_balance', sub:'T3', title:'The balance sheet: assets, debts, and goodwill’s memory',
  predict:'Company A has $2B cash, no debt. Company B has $50M cash and $3B of debt due next year. Same profits. Why might one of them not exist in 18 months?',
  concept:'<p>The balance sheet obeys one identity: <b>assets = liabilities + equity.</b> Everything owned is funded by borrowing or by owners.</p><p><b>Assets</b>, in order of nearness to cash: cash itself, receivables, inventory, then property and equipment. <b>Liabilities</b>: payables, and debt — where the detail that kills companies is the <b>maturity schedule</b>. Debt is not one number; it is a calendar. $3B due next year against $50M of cash means the company must borrow again <i>on the market’s terms, at the market’s mood</i> — survival outsourced to strangers (a mechanism Tier 12 shows detonating in 2008 and SVB 2023).</p><p><b>Goodwill</b> deserves its own sentence: when a company buys another for more than its identifiable assets are worth, the overpayment is parked on the balance sheet as “goodwill.” It is <b>a memory of overpaying</b>, not a thing — and when reality disappoints, it gets “impaired” (written down), a delayed confession that the acquisition price was wrong. Who benefits from big goodwill? The sellers who were overpaid, and executives whose empires grew (Tier 10, M&amp;A).</p>',
  teach:'Explain the accounting identity, why debt maturities matter more than debt totals, and what goodwill remembers, in 5 sentences.',
  cards:[
    {f:'The balance sheet identity', b:'Assets = liabilities + equity. Everything owned is funded by lenders or owners.'},
    {f:'Why debt maturities beat debt totals', b:'Debt is a calendar — a wall of near-term maturities means refinancing at the market’s mercy.'},
    {f:'Goodwill', b:'The parked overpayment from acquisitions — a memory of overpaying, confessed later as impairment.'}
  ],
  quiz:[
    {q:'A large goodwill impairment announcement is management admitting…', c:['Fraud','A past acquisition was overpaid — its assumed value was wrong','Cash was stolen','Nothing important'], a:1, e:'Impairment is the delayed write-down of an overpayment memory. The cash left in the original deal.'},
    {q:'The balance-sheet detail most predictive of refinancing crisis is…', c:['Total assets','The debt MATURITY schedule vs. available cash','Inventory levels','Share price'], a:1, e:'Companies die at maturities, not totals: obligations due soon against cash on hand.'}
  ]},
{ id:'t3_cash', sub:'T3', title:'The cash flow statement: three doors, one number that matters',
  predict:'A company reports these cash flows — operating: −$400M, investing: −$100M, financing: +$600M. Describe in plain words how this company stays alive.',
  concept:'<p>The cash flow statement sorts every dollar through three doors:</p><p><b>Operating</b> — cash from actually running the business: collections from customers minus payments to suppliers and staff. The health meter.</p><p><b>Investing</b> — cash spent on or received from long-term assets: capital expenditures (<b>capex</b>: factories, servers), acquisitions, asset sales.</p><p><b>Financing</b> — cash from the money relationship itself: issuing or buying back shares, borrowing, repaying, dividends.</p><p>The pattern in the predict question is the burn profile: operations consume cash, and the company lives by selling stock or debt (+$600M financing). Legal, common for young firms — and a countdown clock whenever markets tighten.</p><p>The number that matters most in this entire tier: <b>free cash flow (FCF) = operating cash flow − capex.</b> The cash the machine generates after maintaining and growing itself — what could actually be paid to owners without shrinking the business. Profits are opinions about FCF’s future; FCF is the thing itself. Who benefits from FCF literacy? You — nearly every trap in Tier 7 depends on victims never checking this one line.</p>',
  teach:'Explain the three doors of cash and define free cash flow in plain words, then say why FCF beats “profit,” in 5 sentences.',
  cards:[
    {f:'Operating / investing / financing cash', b:'Running the business / long-term assets (capex, deals) / shares, debt, dividends.'},
    {f:'Free cash flow', b:'Operating cash flow minus capex — cash the machine truly generates after sustaining itself.'},
    {f:'The burn profile', b:'Negative operating cash funded by positive financing — alive on markets’ generosity, on a countdown.'}
  ],
  quiz:[
    {q:'Operating +$800M, capex $300M. Free cash flow…', c:['$800M','$1.1B','$500M','$300M'], a:2, e:'FCF = 800 − 300 = $500M.'},
    {q:'Operating −$400M, financing +$600M year after year describes a company that…', c:['Is self-sustaining','Survives by continually selling stock/debt — dependent on market conditions','Has no risk','Is shrinking'], a:1, e:'The business consumes cash; investors replenish it. Fine until the window closes.'}
  ]},
{ id:'t3_dozen', sub:'T3', title:'The dirty dozen: twelve numbers that describe any company',
  predict:'You get 10 minutes and one filing to describe a company’s health to a professional. List the 5 numbers you’d pull first — then compare with the dozen.',
  concept:'<p>Twelve metrics, four families — the standard extraction from any filing:</p><p><b>Growth &amp; margins:</b> (1) <b>revenue growth</b> — is the machine expanding; (2) <b>gross margin</b> — product profitability; (3) <b>operating margin</b> — whole-machine profitability.</p><p><b>Cash reality:</b> (4) <b>free cash flow</b>; (5) <b>cash conversion</b> — how much of reported profit becomes actual cash (low = opinion outrunning truth); (6) <b>capex vs. depreciation</b> — spending above wear-and-tear = investing; below = quietly harvesting the asset base.</p><p><b>Owner dilution &amp; pay:</b> (7) <b>share count over time</b> — rising count is the silent tax on your slice; (8) <b>stock-based compensation</b> — real pay pretended away in “adjusted” profits.</p><p><b>Strength &amp; efficiency:</b> (9) <b>ROIC</b> (return on invested capital) — profit per dollar the business employs; (10) <b>interest coverage</b> — operating income ÷ interest owed, the survival ratio; (11) <b>net debt</b> — debt minus cash; (12) <b>backlog</b> — contracted future revenue, where visible.</p><p>Every teardown rep (see REPS) fills these twelve blanks. Fluency here is what “can read filings unassisted” means.</p>',
  teach:'Name the four families of the dirty dozen and give one metric per family with its plain-words meaning, in 6 sentences.',
  cards:[
    {f:'Cash conversion', b:'Share of reported profit that becomes operating cash — low conversion means opinion is outrunning truth.'},
    {f:'Share count over time', b:'The dilution meter — a rising count silently shrinks every holder’s claim.'},
    {f:'ROIC', b:'Profit generated per dollar of capital the business employs — the quality gauge of the machine.'},
    {f:'Interest coverage', b:'Operating income ÷ interest due — how many times over the debt bill is earned. The survival ratio.'}
  ],
  quiz:[
    {q:'Capex persistently BELOW depreciation suggests the company is…', c:['Investing for growth','Quietly under-maintaining/harvesting its asset base','Fraudulent','Debt-free'], a:1, e:'Spending less than wear-and-tear means the machine is being consumed, not renewed.'},
    {q:'Share count up 6%/yr while “EPS grows” via buyback headlines. Your claim on the business is…', c:['Growing','Shrinking ~6%/yr — dilution is the silent tax','Unchanged','Doubling'], a:1, e:'Net count is what matters: issuance (mostly stock comp) can out-dilute the buyback press releases.'}
  ]},
{ id:'t3_flags', sub:'T3', title:'The red-flags catalog',
  predict:'A company reports “record adjusted EBITDA” for the 6th straight year — while GAAP losses widen, its CFO just left, and its footnotes doubled in length. Rank these four facts by scariness.',
  concept:'<p>The recurring patterns that precede write-downs, restatements, and zeros:</p><p><b>Adjusted-EBITDA gymnastics.</b> “Adjusted” means “losses we ask you to ignore.” Compare adjusted profit to GAAP (rule-based) numbers; a chasm that never closes IS the finding. Stock-based comp “excluded” is real pay diluting you.</p><p><b>Receivables outgrowing revenue</b> (the Tier 3 tell). <b>Serial “one-time” charges</b> — annual “exceptional” costs are just costs, laundered. <b>Footnotes lengthening</b> — complexity is where problems are parked; growing footnotes mean growing things to explain. <b>Auditor changes</b> — especially mid-controversy: the referee just quit the game. Add: CFO departures before results, related-party transactions, and guidance withdrawn.</p><p>Two disciplines: no single flag convicts — <b>flags cluster</b>, and three together outweigh any narrative. And label your findings honestly (fact / estimate / opinion) when you post them: “receivables grew 3× revenue” is fact; “this suggests channel stuffing” is opinion. Who benefits from the flags being boring to check? Every operator of Tier 7’s machines — boredom is their moat.</p>',
  teach:'Pick three red flags and explain each one’s mechanism — what the number does and what that implies — in 6 sentences.',
  cards:[
    {f:'“Adjusted EBITDA” translated', b:'Profit after ignoring the losses management prefers ignored — measure the gap to GAAP.'},
    {f:'Serial one-time charges', b:'“Exceptional” costs appearing every year are ordinary costs being laundered.'},
    {f:'Why flags cluster', b:'One flag is a question; three together outweigh any narrative. Convict on clusters.'}
  ],
  quiz:[
    {q:'A company excludes stock-based compensation from “adjusted profit.” Mechanically, SBC is…', c:['Truly free','Real pay funded by diluting shareholders — a genuine cost','A tax trick','Refundable'], a:1, e:'Employees are paid in your ownership. Excluding it hides a real transfer from holders to staff.'},
    {q:'Mid-year auditor resignation plus a CFO exit before earnings is best read as…', c:['Routine turnover','A serious cluster — the people who see the books are leaving them','Bullish','Meaningless'], a:1, e:'The referee and the scorekeeper quitting together is the cluster rule at its loudest.'}
  ]},
{ id:'t3_10k', sub:'T3', title:'Skill drill: the 45-minute 10-K',
  predict:'A 10-K is 200+ pages and you have 45 minutes. In what order do you attack it, and which 150 pages do you skip on the first pass?',
  concept:'<p>The <b>10-K</b> is the annual report filed with the SEC — the company’s full self-description, free on <b>EDGAR</b> (sec.gov). Reading one unassisted in 45 minutes is this program’s core rep (target: 50 by graduation).</p><p><b>The order of attack:</b></p><p>(1) <b>Risk factors</b> (~10 min) — skim past boilerplate (“markets may decline”) for the specific: customer concentration, debt walls, litigation, dependence on one supplier. Companies must confess here; the confessions hide among the disclaimers.</p><p>(2) <b>Cash flow statement</b> (~10 min) — truth first: operating trend, capex, FCF, and the financing door (raising or returning?).</p><p>(3) <b>Share count</b> (~5 min) — dilution trend across 3+ years.</p><p>(4) <b>Footnotes</b> (~15 min) — debt maturities, revenue recognition policy, related-party deals, commitments. Where bodies are buried.</p><p>(5) <b>MD&amp;A</b> (~5 min) — management’s narrative, read <i>last</i>, so the numbers judge the story instead of the story framing the numbers.</p><p>Fill the dirty dozen as you go. First reps take 2 hours; by rep 20 you will genuinely be at 45 minutes — that speed is the compounding asset.</p>',
  teach:'Explain the 45-minute order of attack and WHY the story (MD&amp;A) is read last, in 5 sentences.',
  cards:[
    {f:'The 10-K attack order', b:'Risk factors → cash flow → share count → footnotes → MD&amp;A last.'},
    {f:'Why MD&amp;A goes last', b:'Numbers first, story second — so the data judges the narrative, not the reverse.'},
    {f:'Where to find any 10-K free', b:'SEC EDGAR (sec.gov) — the primary source above all others.'}
  ],
  quiz:[
    {q:'Reading management’s narrative FIRST risks…', c:['Wasting time only','Anchoring on the story so the numbers get bent to fit it','Nothing','Missing the price'], a:1, e:'Anchoring is the failure mode. The discipline is numbers → then story, never the reverse.'},
    {q:'In risk factors, the valuable material is…', c:['The generic market warnings','Specific confessions: concentration, debt walls, disputes','The page count','The fonts'], a:1, e:'Boilerplate is camouflage; specificity is signal. Companies must disclose the real risks somewhere.'}
  ]},
{ id:'t3_s1', sub:'T3', title:'Skill drill: the 90-minute S-1 and the teardown template',
  predict:'An S-1 is written by bankers to SELL the company. Which sections will be beautiful, and which two numbers can’t be beautified?',
  concept:'<p>The <b>S-1</b> (Tier 2) is a sales document wearing a disclosure costume: glossy narrative up front, mandated truth in the back.90-minute attack: (1) <b>Use of proceeds</b> — funding growth, or cashing out insiders? (2) <b>Capitalization &amp; dilution tables</b> — what insiders paid vs. what you’re asked to pay, and post-IPO share count including options. (3) <b>Financials</b> — burn profile: operating cash, runway, dependence on the raise. (4) <b>Risk factors</b> — the confessions. (5) <b>Lockup terms</b> — when the supply calendar fires (Tier 2). (6) <b>Principal stockholders</b> — who is selling into this deal. The unbeautifiable numbers: <b>cash burned</b> and <b>shares outstanding</b>.</p><p><b>The teardown template</b> — every filing rep (10-K or S-1) produces one page: <i>Business in one sentence · the dirty dozen · three red flags checked · cash reality (FCF or burn/runway) · dilution trend · one thing management emphasized vs. one thing the numbers say · verdict: would I need to know more, and what exactly?</i> Each teardown ships as a post (see REPS). Fifty of these is the program’s odometer — and Gate 3 is passing a filing-excerpt exam: <b>is growth generating cash or consuming it, and who funds the gap?</b></p>',
  teach:'List the six S-1 sections in attack order and the two numbers marketing cannot beautify, in 5 sentences.',
  cards:[
    {f:'S-1 in one phrase', b:'A sales document wearing a disclosure costume — narrative up front, mandated truth in back.'},
    {f:'“Use of proceeds” tells you…', b:'Whether the IPO funds the business or cashes out insiders — growth story vs. exit event.'},
    {f:'The teardown template’s verdict line', b:'Is growth generating cash or consuming it — and who funds the gap?'}
  ],
  quiz:[
    {q:'An S-1 shows most proceeds going to selling shareholders, not the company. The deal is primarily…', c:['A growth financing','An insider exit event','A debt repayment','A merger'], a:1, e:'Follow the proceeds: money to insiders means the IPO’s purpose is the door, not the fuel.'},
    {q:'Gate 3’s core question about any filing is…', c:['Is the CEO likable?','Is growth generating cash or consuming it, and who funds the gap?','Is the stock up?','How long is the 10-K?'], a:1, e:'That one question forces cash-flow literacy, funding analysis, and dilution awareness at once.'}
  ]},

// ───────────────────────── TIER 4 · WHAT A PRICE MEANS ─────────────────────────
{ id:'t4_forecast', sub:'T4', title:'Every price is a forecast — DCF as intuition, not spreadsheet',
  predict:'Two identical machines each print $100/year. One is guaranteed for 30 years; the other MIGHT stop anytime. Should they cost the same? What two things besides the $100 set each machine’s worth?',
  concept:'<p>A business is worth <b>the cash it will hand its owners over its lifetime, discounted for waiting and for risk.</b> That sentence is the entire theory of valuation (the “discounted cash flow” idea). Three dials: <b>how much cash</b>, <b>when</b> (later is worth less — a dollar today can compound), and <b>how certain</b> (risky dollars are worth less than sure ones).</p><p>Therefore: <b>every market price is a forecast, whether anyone built one or not.</b> Paying $1B for a company that produces $40M of free cash flow is a specific claim about decades of future cash — made by whoever set the marginal price, with or without thinking.</p><p>A warning against spreadsheet worship: a DCF model’s output swings wildly with tiny assumption changes, so precision is fake. Use DCF as a <i>lens</i> — cash, timing, risk — not an oracle. The operator’s move (next lessons) is the reverse: don’t compute “fair value”; <b>extract the forecast the current price already contains and judge whether that future is plausible.</b> Who benefits from prices-as-forecasts being invisible? Everyone selling stories priced for perfection.</p>',
  teach:'Explain the three dials of value (cash, timing, certainty) and why every price is a forecast, in 5 sentences a 12-year-old follows.',
  cards:[
    {f:'The whole theory of value in one sentence', b:'A business is worth its lifetime cash to owners, discounted for waiting and risk.'},
    {f:'Why a dollar later is worth less than a dollar now', b:'Today’s dollar can compound in the meantime — delay has a price.'},
    {f:'The correct use of DCF', b:'A lens (cash, timing, risk) — never an oracle; its precision is fake by construction.'}
  ],
  quiz:[
    {q:'Same expected cash flows, but company B’s are far less certain. B should trade…', c:['At the same price','Higher','Lower — risky dollars are discounted harder','At zero'], a:2, e:'Certainty is the third dial. Equal cash, more risk → less value.'},
    {q:'“The market price contains a forecast” means…', c:['Analysts wrote one','The price mathematically implies a path of future cash, whether or not anyone modeled it','Prices are random','Forecasts are illegal'], a:1, e:'Paying X for future cash IS a claim about that cash. The next lesson extracts the claim.'}
  ]},
{ id:'t4_multiples', sub:'T4', title:'Multiples: what P/E, P/S, and EV/EBITDA compress — and when they lie',
  predict:'Stock A trades at 10× earnings, stock B at 40×. Name two legitimate reasons B might still be the better buy — and one reason A might be a trap.',
  concept:'<p>A <b>multiple</b> compresses the whole forecast into one ratio. <b>P/E</b>: price ÷ earnings — years of current profit you’re paying upfront. <b>P/S</b>: price ÷ sales — used when profits don’t exist yet (weakest, most abusable). <b>EV/EBITDA</b>: enterprise value (market cap + net debt) ÷ cash-ish operating earnings — includes the debt, so it prices the whole machine, not just the equity slice.</p><p>What a multiple hides is everything that matters: <b>growth, margins, risk, and capital needs.</b> 40× for a compounder growing 30%/yr with fortress margins can be cheaper than 10× for a melting-ice-cube — the 10× is “cheap” because the market forecasts decline (a <b>value trap</b>).</p><p>When multiples lie: cross-industry comparisons (software vs. steel have different margin physics), peak-cycle earnings (the E is temporarily fat, so the P/E looks innocent at the top — cyclicals look cheapest at peaks), and P/S on low-margin businesses. Who benefits from multiple confusion? Screeners of “cheap” lists and sellers of “only 5× sales!” stories alike. A multiple is shorthand for a forecast — always decompress it before trusting it.</p>',
  teach:'Explain what a P/E of 25 literally means, and why a 10× stock can be more expensive than a 40× one, in 5 sentences.',
  cards:[
    {f:'P/E, in plain words', b:'How many years of current earnings you pay upfront for the claim.'},
    {f:'Why EV/EBITDA includes debt', b:'Enterprise value prices the whole machine — equity plus the debt the buyer effectively assumes.'},
    {f:'Value trap', b:'A low multiple that is “cheap” because the market correctly forecasts decline.'}
  ],
  quiz:[
    {q:'Cyclical companies often look CHEAPEST on P/E exactly at…', c:['Recessions','The peak of their cycle — earnings are temporarily fat','IPO day','Random times'], a:1, e:'Peak E shrinks the ratio just before E collapses. The multiple lied via its denominator.'},
    {q:'Comparing a software company’s P/S to a grocery chain’s P/S is misleading because…', c:['Groceries are older','Their margin structures differ completely — a dollar of sales converts to profit very differently','P/S is illegal','Software has no sales'], a:1, e:'Multiples only compare like machines. Cross-industry ratios compare apples to forklifts.'}
  ]},
{ id:'t4_expectations', sub:'T4', title:'Expectations investing: extract the future the price requires',
  predict:'A company is valued at $1.6T with ~$19B of trailing revenue. Roughly what must its future look like for buyers today to earn a normal return? Sketch the math before revealing.',
  concept:'<p>The operator’s core valuation move (Mauboussin’s <i>Expectations Investing</i>): <b>don’t predict the future — extract the future the current price already requires, then judge its plausibility.</b></p><p>Worked example <i>[illustrative arithmetic]</i>: $1.6T valuation on ~$19B revenue ≈ 84× sales. Suppose buyers want ~10%/yr for a decade — the company must be “worth” ~$4.1T by year 10. If a mature version earns a 25% net margin and trades at 25× earnings, it needs ~$165B of earnings → <b>~$660B of revenue — roughly 35× today’s, a ~43%/yr growth rate sustained for a decade.</b></p><p>Now the judgment: has ANY company of comparable scale ever done that? (Next lesson: base rates say almost never.) The price is not “wrong” — it is a specific, extractable bet. State it, then bet on or against its plausibility.</p><p>This inversion is the weekly rep from Tier 4 onward: one “What the Price Assumes” one-pager per week. It converts every hot ticker from a story into an auditable claim — which is exactly what a falsifiable public analysis account is built from.</p>',
  teach:'Walk through the reverse-engineering chain (price → required future value → required earnings → required revenue → required growth rate) for a made-up ticker, in 6 sentences.',
  cards:[
    {f:'Expectations investing in one sentence', b:'Extract the future the price requires; judge that future’s plausibility — never predict from scratch.'},
    {f:'The extraction chain', b:'Price → required value at horizon → ÷ assumed multiple = required earnings → ÷ margin = required revenue → implied growth rate.'},
    {f:'Why this beats “fair value” models', b:'It converts any price into a specific, checkable claim instead of a subjective target.'}
  ],
  quiz:[
    {q:'A stock at 84× sales is best understood as…', c:['A scam','A specific bet that revenue/margins must multiply enormously — extract and judge it','Cheap if it grows','Unanalyzable'], a:1, e:'Every price implies a path. The job is stating the path and checking it against history.'},
    {q:'The weekly Tier-4 rep is…', c:['Predicting price targets','A “what the price assumes” one-pager: implied future vs. base rates','Day trading','Reading news'], a:1, e:'One extraction per week — the auditable core of published analysis.'}
  ]},
{ id:'t4_baserates', sub:'T4', title:'Base rates: how often does the required future ever happen?',
  predict:'Of all large companies in history that were priced for 20%+ annual growth lasting a decade, roughly what fraction delivered it — most, some, or almost none?',
  concept:'<p>A <b>base rate</b> is history’s answer to “how often does this actually happen?” — judging your specific case against the full population of similar cases, not against the story in front of you.</p><p>The market’s most expensive base-rate fact: <b>sustained hypergrowth is astonishingly rare.</b> Studies of thousands of companies (Mauboussin’s base-rate work) show only a small minority sustain 20%+ revenue growth for a decade — and the bigger the base, the rarer it gets <i>[fact — see Mauboussin’s published base rates]</i>. Yet in every boom, <i>dozens</i> of companies are simultaneously priced as if each will be the exception. They cannot all be — the arithmetic forbids it.</p><p>Why the error persists: stories are vivid and singular (“this one is different because…”), base rates are dull and statistical. Vividness wins psychologically and loses financially. The inside view (this company’s narrative) must be disciplined by the outside view (what happened to the last 500 companies priced this way).</p><p>Who benefits from ignored base rates? Sellers at hype prices. The rep: every expectations one-pager ends with one line — <i>“the price requires X; historically X has happened in roughly Y% of comparable cases.”</i> That sentence is the entire edge.</p>',
  teach:'Define base rate, then explain why 30 companies can’t all be “the next exception,” in 5 sentences.',
  cards:[
    {f:'Base rate', b:'The historical frequency of an outcome across all comparable cases — the outside view.'},
    {f:'The hypergrowth base rate', b:'Only a small minority of large companies sustain 20%+ growth for a decade — rarer as size grows.'},
    {f:'Inside vs. outside view', b:'The vivid story of this case vs. the statistics of all similar cases — discipline the first with the second.'}
  ],
  quiz:[
    {q:'During booms, dozens of firms are priced for decade-long hypergrowth simultaneously. Base rates say…', c:['All will deliver','Most cannot — the historical frequency of that outcome is far too low','Base rates changed','Growth is guaranteed by size'], a:1, e:'Pricing many exceptions at once contradicts the measured rarity of exceptions.'},
    {q:'The correct closing line of an expectations one-pager is…', c:['A price target','“The price requires X; X has historically occurred in ~Y% of comparable cases”','A buy rating','A meme'], a:1, e:'Claim plus base rate — specific, checkable, and falsifiable.'}
  ]},
{ id:'t4_tam', sub:'T4', title:'TAM math and “just 1% of a huge market”',
  predict:'A pitch says: “The market is $10 trillion. If we capture just 1%, that’s $100B of revenue.” This is the oldest pitch in finance. Find at least two things wrong with it.',
  concept:'<p><b>TAM</b> — total addressable market — is the claimed size of the pond. TAM abuse is the most durable pitch structure in capitalism: name an enormous pond, claim a “conservative” sliver, multiply.</p><p>What’s wrong with “just 1%”: (1) <b>Market share is taken, not granted</b> — someone currently owns every dollar of that spend and will fight for it; there is no unclaimed 1% sitting in a drawer. (2) <b>TAM inflation</b> — defining a coffee shop’s market as “global food and beverage” instead of “coffee within 2 miles.” Interrogate the definition before the number. (3) <b>Revenue ≠ value</b> — capturing revenue at negative margin destroys value; the pitch skips costs entirely. (4) Small percentages <i>feel</i> humble — that feeling is the product. “Only 1%” frames a heroic assumption as modesty.</p><p>Flip it into a tool: honest TAM analysis asks <i>who owns the spend today, why customers would switch, at what cost of acquisition, against what competitive response.</i> Who benefits from TAM theater? Whoever is raising money at the multiple the big number justifies — founders, promoters, and the banks pricing the round (Tier 2).</p>',
  teach:'Explain why “1% of a huge market” is a heroic claim disguised as a humble one, in 5 sentences.',
  cards:[
    {f:'TAM', b:'Total addressable market — the claimed size of the pond, often inflated by definition games.'},
    {f:'The core flaw of “just 1%”', b:'Every dollar of a market is already owned and defended — share is taken, never granted.'},
    {f:'The honest TAM questions', b:'Who owns the spend now, why would customers switch, at what acquisition cost, against what response?'}
  ],
  quiz:[
    {q:'“1% of $10T” framing works psychologically because…', c:['The math is wrong','Small percentages make a heroic assumption feel conservative','1% is easy to win','TAMs are audited'], a:1, e:'The modesty is the costume; the assumption (displacing entrenched competitors at scale) is heroic.'},
    {q:'The first question to ask about any TAM number is…', c:['Who computed the market’s definition and how inflated is it?','Is it big?','Is it growing?','Is it round?'], a:0, e:'Definition precedes arithmetic — “global beverages” vs. “nearby coffee” changes everything downstream.'}
  ]},
{ id:'t4_great', sub:'T4', title:'Great company ≠ great stock',
  predict:'Everyone agrees a company is magnificent — best product, best margins, obvious winner. Why might buying it still lose money for a decade? What is already inside the price?',
  concept:'<p>The tier’s closing law: <b>the price already contains the greatness.</b> A stock is not a vote on company quality; it is a bet on reality versus the expectations embedded at your purchase price (Tier 4, lesson 1). A magnificent company priced for magnificence offers no edge — merely meeting sky-high expectations earns ordinary returns, and slight disappointment gets punished savagely.</p><p>History’s cleanest proof is Tier 12’s Nifty Fifty: America’s finest companies of the early 1970s — many did fine as <i>businesses</i> for decades — yet buyers at peak multiples waited 10+ years to break even. Right about the company, wrong about the entry, wrong outcome.</p><p>Symmetrically: a mediocre business priced for death can be a fine stock the moment reality is merely bad instead of fatal. <b>Returns live in the gap between expectations and reality, not in quality itself.</b></p><p>Who benefits from quality-worship? Sellers of obvious excellence at full price — “it’s the best company” closes retail buyers who never checked what the price assumes. Gate 4 is the antidote made habit: take a real ticker, state with math what its price assumes, cite the base rate.</p>',
  teach:'Using the Nifty Fifty, explain how buyers of genuinely great companies still lost a decade, in 5 sentences.',
  cards:[
    {f:'The closing law of Tier 4', b:'Returns come from the gap between embedded expectations and delivered reality — not from quality alone.'},
    {f:'Why great-priced-for-great earns ordinary returns', b:'Meeting expectations that are already in the price is, by definition, unsurprising.'},
    {f:'The Nifty Fifty lesson', b:'Great businesses bought at peak multiples cost buyers a decade — right company, wrong price.'}
  ],
  quiz:[
    {q:'A flawless quarter from a stock priced for flawlessness typically produces…', c:['A huge rally','An ordinary/muted reaction — perfection was already the assumption','A crash','A dividend'], a:1, e:'No gap between expectation and delivery, no excess return. The bar was pre-loaded.'},
    {q:'Where do stock returns structurally come from?', c:['Company quality','Brand fame','The gap between what the price assumed and what reality delivered','Trading volume'], a:2, e:'Quality already priced is neutralized. Only the expectation gap pays.'}
  ]},

// ───────────────────────── TIER 5 · CYCLES & MACRO ─────────────────────────
{ id:'t5_rates', sub:'T5', title:'Interest rates as gravity',
  predict:'Rates rise from 1% to 5%. Two stocks: a bank earning steady profits TODAY, and a startup whose profits arrive in year 10+. Which valuation falls harder, and why — mechanically?',
  concept:'<p>Recall the anchor (Tier 0): every asset competes with the risk-free yield. Discounting is the machine that enforces it — a dollar due in 10 years is worth today’s dollars <i>divided by (1 + rate)¹⁰</i>. At 1%, $1 in year 10 is worth ~$0.90 today; at 5%, ~$0.61 <i>[arithmetic]</i>. The farther away the dollar, the harder the rate bites.</p><p>Hence <b>duration</b>: assets whose cash arrives mostly in the distant future are “long-duration” and swing hardest when rates move. The profitable-today bank’s value barely moves; the year-10 startup’s value collapses ~a third on the same rate change — <i>with zero change in the business itself</i>. This is why unprofitable growth stocks fell 60–80% in 2022’s rate shock while boring cash-cows held (Tier 12).</p><p>Buffett’s line compresses it: <b>interest rates act on asset prices like gravity acts on matter.</b> Low rates = weak gravity = everything speculative floats; rising rates = gravity returns = the longest-duration promises fall first and furthest. Who benefits from understanding this? Anyone who reads a Fed meeting as a re-pricing of ALL future dollars — which is the next lesson.</p>',
  teach:'Explain discounting with the $1-in-year-10 example, then why “profits far away” means “falls hard when rates rise,” in 5 sentences.',
  cards:[
    {f:'Discounting', b:'Future dollars ÷ (1+rate)ⁿ = today’s value. Higher rates or longer waits shrink present value.'},
    {f:'Duration (concept)', b:'How far in the future an asset’s cash sits — the farther, the more rate-sensitive the price.'},
    {f:'Rates-as-gravity', b:'Low rates float speculative assets; rising rates pull hardest on the longest-dated promises.'}
  ],
  quiz:[
    {q:'Rates jump 1% → 5%. With NO business change, the year-10-profits startup’s present value…', c:['Rises','Falls far more than the profitable-today firm’s','Is unchanged','Doubles'], a:1, e:'Distant dollars are discounted exponentially harder — duration converts rate moves into price moves.'},
    {q:'$1 arriving in year 10, discounted at 5%, is worth today about…', c:['$1.00','$0.90','$0.61','$0.10'], a:2, e:'1 ÷ 1.05¹⁰ ≈ 0.61. At 1% it was ~0.90 — the same dollar, re-priced by gravity.'}
  ]},
{ id:'t5_fed', sub:'T5', title:'The Fed from zero',
  predict:'One committee’s eight-meetings-a-year decision moves every market on Earth within seconds. What exactly do they decide, and through what plumbing does it propagate?',
  concept:'<p>The <b>Federal Reserve</b> is the U.S. central bank with a dual mandate from Congress: <b>stable prices</b> (inflation ~2% target) and <b>maximum employment</b>. The two conflict at the edges — cooling inflation means restraining the economy — and policy is the lean between them.</p><p>The tools: (1) <b>The federal funds rate</b> — the overnight rate banks pay each other, which the Fed steers. Every other rate (mortgages, corporate debt, the Treasury anchor) prices off this floor; moving it re-runs Tier 5’s gravity on everything. (2) <b>Balance-sheet operations</b> — QE: the Fed creates reserves and buys bonds at scale, pushing yields down and cash into the system; QT: the reverse, draining it (mechanics deepened in Tier 9). (3) <b>Words</b> — “forward guidance”: because markets price the <i>future</i> path, a sentence about intentions moves trillions before any action.</p><p>“Liquidity,” mechanically, means how much money is available to chase assets — Fed policy is its master valve. Who benefits from Fed literacy? Anyone who understands that <b>markets trade the gap between the expected path and the announced path</b> — a hawkish surprise re-prices everything, a fully expected hike moves nothing (Tier 4’s expectations logic, applied to policy).</p>',
  teach:'Explain the dual mandate, the funds rate, QE/QT in one sentence each, and why a SURPRISE matters more than a hike, in 6 sentences.',
  cards:[
    {f:'The Fed’s dual mandate', b:'Stable prices (~2% inflation) and maximum employment — policy leans between them.'},
    {f:'Why the funds rate moves everything', b:'It is the floor rate the entire curve prices off — moving it re-runs gravity on all assets.'},
    {f:'QE vs. QT, mechanically', b:'QE: create reserves, buy bonds, push liquidity in. QT: let holdings roll off, drain it.'}
  ],
  quiz:[
    {q:'A fully expected 0.25% hike lands. Markets barely move because…', c:['Rates don’t matter','The expected path was already priced — only surprises re-price (expectations logic)','The Fed was ignored','Volume was low'], a:1, e:'Prices contain forecasts of policy too. The gap between expected and actual is what trades.'},
    {q:'“Liquidity,” in plain mechanical terms, is…', c:['Trading volume','How much money is available to chase assets — with Fed policy as the master valve','Bank branch count','A feeling'], a:1, e:'More available money bidding = richer asset prices, and vice versa. QE/QT turn the valve.'}
  ]},
{ id:'t5_credit', sub:'T5', title:'The credit cycle and Minsky’s three stages',
  predict:'Banks lend freely → asset prices rise → collateral looks safer → banks lend more freely. What eventually breaks this loop — and in which direction does it then run?',
  concept:'<p>The <b>credit cycle</b> is the economy’s breathing: lending standards loosen → borrowed money bids up assets → richer collateral makes lenders feel safer → standards loosen further. The loop is self-reinforcing in both directions — one default cycle reverses it: losses → tightened standards → forced sales → falling collateral → more tightening. Credit expands gradually and contracts violently.</p><p><b>Minsky’s ladder</b> names the decay of borrower quality as good times persist: <b>Hedge finance</b> — income covers interest and principal (sound). <b>Speculative finance</b> — income covers interest only; principal must be rolled over (dependent on refinancing windows staying open — Tier 3’s maturity walls). <b>Ponzi finance</b> — income covers neither; the borrower survives only if the asset’s <i>price</i> keeps rising. Stability itself breeds the instability: the longer nothing fails, the further down the ladder the system slides — until the “Minsky moment,” when price stops rising and Ponzi positions must liquidate at once.</p><p>Who benefits from reading the cycle? Lenders exiting early, and buyers holding cash at the violent end. The gauge that tells you where you are — credit spreads — is Tier 9’s first lesson.</p>',
  teach:'Explain the credit loop in both directions, then Minsky’s hedge/speculative/Ponzi stages with one example each, in 6 sentences.',
  cards:[
    {f:'The credit loop', b:'Loose lending → higher asset prices → safer-looking collateral → looser lending. Reverses violently.'},
    {f:'Minsky’s three stages', b:'Hedge: income covers debt. Speculative: covers interest only, must refinance. Ponzi: needs rising prices to survive.'},
    {f:'Why stability breeds instability', b:'The longer nothing fails, the more the system migrates toward Ponzi finance — until price stops rising.'}
  ],
  quiz:[
    {q:'A borrower who can pay interest but must refinance principal forever is, in Minsky’s terms…', c:['Hedge','Speculative — alive only while refinancing windows stay open','Ponzi','Risk-free'], a:1, e:'Speculative finance outsources survival to future credit conditions.'},
    {q:'Credit contractions are more violent than expansions because…', c:['Banks are cruel','Losses force sales that sink collateral, which forces more tightening — the loop compounds downward','Rates are high','Volume drops'], a:1, e:'The same feedback that inflated gently deflates all at once when it reverses.'}
  ]},
{ id:'t5_bubble', sub:'T5', title:'Bubble anatomy: Kindleberger’s five acts',
  predict:'List history’s bubble stages in order from a genuine new technology to a crash. Who is buying — and who is quietly selling — in the final euphoric act?',
  concept:'<p>Kindleberger’s <i>Manias, Panics, and Crashes</i> found the same five-act script across four centuries:</p><p><b>1 · Displacement.</b> A genuine change arrives — railroads, the internet — real, and really underestimated at first. <b>2 · Boom.</b> Prices rise on true adoption; credit expands (Tier 5 loop); early skeptics convert. <b>3 · Euphoria.</b> Price becomes the evidence; “new era” logic dismisses base rates (Tier 4); leverage proliferates; taxi drivers give tips. Volume and coverage peak (Tier 1 media). <b>4 · Distribution.</b> The quiet act: informed holders — insiders, early money — sell <i>into</i> the enthusiasm while the public buys the dip. Watch filings, not speeches. <b>5 · Panic.</b> Credit turns (Minsky moment), leverage unwinds in cascades (Tier 2), price discovers the absence of bids.</p><p>The permanent trap: each act is obvious only in retrospect, because <i>the technology usually IS real</i> — railroads transformed the world AND ruined their 1840s shareholders. Real change and ruinous pricing coexist; the reps: 1929, dot-com, 2008 housing, SPACs 2021 (Tier 12 details each). Who benefits? Act-4 sellers — the people the next lesson’s live overlay asks you to watch.</p>',
  teach:'Name the five acts with one sentence each, and explain who sells to whom during distribution, in 6 sentences.',
  cards:[
    {f:'Kindleberger’s five acts', b:'Displacement → boom → euphoria → distribution → panic.'},
    {f:'The signature of euphoria', b:'Price itself becomes the argument; “new era” logic retires base rates; leverage spreads.'},
    {f:'Distribution', b:'Informed holders selling quietly into public enthusiasm — visible in filings, never in speeches.'}
  ],
  quiz:[
    {q:'“The technology is real” and “this is a bubble” are…', c:['Contradictory','Frequently both true — railroads and the internet were real AND ruinously priced','Both false','Unknowable'], a:1, e:'Displacement is genuine by definition. The bubble is in the pricing, not the physics.'},
    {q:'During distribution, the mechanically telling data source is…', c:['CEO interviews','Insider sale filings and secondary offerings — what informed holders DO','Price targets','Social sentiment'], a:1, e:'Act 4 is watched in disclosures. Enthusiastic words accompany quiet exits.'}
  ]},
{ id:'t5_ai', sub:'T5', title:'Live overlay: the AI capex cycle [VERIFY]',
  predict:'Hyperscalers are spending historically enormous sums on AI infrastructure while AI revenue remains far smaller. Using the five acts and Minsky, where might this cycle sit — and what evidence would settle it?',
  concept:'<p>Apply the toolkit to the live case — <i>every figure here is [VERIFY — time-sensitive]</i>: hyperscaler capex running at roughly $700B/yr, with ~75% AI-directed; AI revenue far behind the spend; the financing mix shifting from cash flow toward debt.</p><p>Run the checklist honestly. <b>Displacement:</b> real — the technology works and is being adopted. <b>Credit cycle:</b> debt-financed capex is the Minsky slide in progress: cash-funded buildout is hedge finance; debt-funded buildout dependent on future AI revenue is speculative, drifting Ponzi-ward if revenue lags long enough. <b>Expectations (Tier 4):</b> extract what suppliers’ and hyperscalers’ prices assume about AI revenue growth, and check the base rate. <b>Reflexivity (next lesson):</b> the spending itself creates the revenue being cited — vendors’ customers are funded by the boom they justify.</p><p>The disciplined frame, verbatim from the brief: <b>real technology AND bubble dynamics can both be true</b> — as with railroads and the internet, world-changing infrastructure can still ruin the capital that built it. Your job is not to declare “bubble/no bubble” but to <b>name the act, cite the evidence, and state a falsifier</b> — e.g., “if AI revenue reaches $X by [date], the speculative-finance read is wrong” — which is exactly Gate 5.</p>',
  teach:'Present the AI capex cycle both ways — the genuine-displacement case and the bubble-dynamics case — ending with one falsifier, in 6 sentences.',
  cards:[
    {f:'The AI capex facts to track [VERIFY]', b:'~$700B/yr hyperscaler capex, ~75% AI-directed, revenue behind spend, financing shifting to debt.'},
    {f:'The Minsky read of debt-funded capex', b:'Cash-funded = hedge; debt-funded awaiting future revenue = speculative, drifting toward Ponzi if revenue lags.'},
    {f:'The disciplined verdict format', b:'Name the act + cite evidence + state a dated falsifier. Never a vibes-based “bubble/no bubble.”'}
  ],
  quiz:[
    {q:'“Real technology AND bubble dynamics can both be true” is proven by…', c:['Nothing','Railroads and the dot-com era — transformative tech that ruined its boom-time capital','Only theory','2008 housing'], a:1, e:'Displacement is real in every great bubble. The ruin lives in the financing and the pricing.'},
    {q:'A capex boom’s shift from cash-funded to debt-funded matters because…', c:['Debt is cheaper','It moves the system down Minsky’s ladder — survival becomes dependent on future revenue arriving on schedule','Cash is obsolete','It reduces spending'], a:1, e:'The funding mix is the cycle’s position gauge. Debt-fed buildout awaiting revenue is speculative finance at scale.'}
  ]},
{ id:'t5_reflex', sub:'T5', title:'Reflexivity: prices change the fundamentals',
  predict:'Standard theory: fundamentals drive prices. Find a mechanism running the OTHER way — where a rising stock price makes the company genuinely stronger.',
  concept:'<p>Soros’s <b>reflexivity</b>: prices don’t just <i>reflect</i> fundamentals — they <b>change</b> them, creating feedback loops with no stable “true value” underneath.</p><p>The mechanisms, concretely: a high stock price lets a company <b>raise cheap capital</b> (sell fewer shares for more cash — Tier 2), <b>pay talent in valuable stock</b>, <b>acquire rivals with its own paper</b>, and borrow on better terms (richer collateral — Tier 5’s credit loop). The high price <i>manufactures</i> the strength that then justifies the price. Downward it is crueler: a collapsing price raises capital costs, spooks customers and recruits, triggers covenants — the falling price creates the failure it predicted. Banks are the pure case: believed-solvent is solvent; believed-doomed is doomed (SVB, Tier 12).</p><p>Live overlay tie-in: cheap AI-boom capital → more datacenter building → real revenue for suppliers → “fundamentals confirm the boom” → more cheap capital. The circle is genuine revenue AND self-funding narrative at once.</p><p>Consequences for the operator: “the market already knows everything” fails when the knowing changes the known; bubbles aren’t mere errors but self-feeding processes (act 2 → 3 fuel); and every thesis should ask — <b>does this price, if sustained, create or destroy its own justification?</b></p>',
  teach:'Explain reflexivity with the cheap-capital mechanism upward and the bank-run mechanism downward, in 5 sentences.',
  cards:[
    {f:'Reflexivity', b:'Prices feed back into fundamentals — high prices manufacture strength, collapses manufacture failure.'},
    {f:'The upward mechanisms', b:'Cheap equity raises, valuable stock comp, paper acquisitions, better borrowing terms.'},
    {f:'The thesis question reflexivity adds', b:'Does this price, if sustained, create or destroy its own justification?'}
  ],
  quiz:[
    {q:'A doubted bank with strong stated numbers can still die because…', c:['Numbers lie','Belief drives withdrawals — the falling confidence creates the insolvency it feared','Regulators close it','Rates fell'], a:1, e:'Reflexivity’s dark side: for confidence-dependent institutions, the belief IS the fundamental.'},
    {q:'A startup’s inflated stock price can become self-justifying by…', c:['Magic','Funding cheap capital, talent, and acquisitions that build real strength','Fooling auditors','Reducing costs'], a:1, e:'Price → capital → capability → “fundamentals” → price. The loop is the lesson.'}
  ]}
];
