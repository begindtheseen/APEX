# APEX MARKETS MODULE — AS BUILT
### Complete implementation record for critique. Generated from the shipped curriculum file (`obsidian.js`) of the APEX "Obsidian" realm.
Feed this back to the session that authored the master brief. Everything the learner sees is below — every lesson, predict prompt, teach-back, flashcard, quiz item, and gate-exam question — plus the engine mechanics that deliver them. Critique format suggestion: per-item corrections keyed by topic `id`, plus structural notes.

---
## HOW THE ENGINE DELIVERS THE PEDAGOGY (§2 of the brief → implementation)

- **Platform:** a black-themed, fully separate realm inside the APEX PWA (offline, localStorage persistence, own backup/export). Opened via a ◆ button; zero contact with the ASVAB data.
- **Predict-then-reveal (§2.1):** every topic has a `predict` question shown FIRST; the lesson stays locked behind an "I attempted an answer — reveal the lesson" tap.
- **Lesson (§2.2–3):** `concept` ≤400 words, mechanism-first (who pays whom / who is forced / who benefits), optional worked `example`.
- **Active recall (§2.4):** per-topic flashcards (tap-to-flip) and a multiple-choice quiz with per-answer explanations. A `teach` prompt ("explain to a smart 12-year-old") closes every lesson. NOTE / deviation: the brief asked for typed answers where avoidable; the engine currently uses multiple-choice + the teach-back prompt (spoken/written outside the app). Flag if this needs a typed-input drill mode.
- **Spaced repetition (§2.5):** quiz score ≥70% advances a topic up a 5-box Leitner ladder with review intervals **1/1/3/7/21/30 days** (configured to the brief's 1/3/7/21 cadence, extended to 30 at the top). Due topics surface in a REVIEW DUE queue on the dashboard, opening straight into the quiz. Box ≥3 = MASTERED.
- **Phase gates (§2.6):** each tier has a 10-question adaptive gate drill (difficulty rises on hits, falls on misses; no repeats within a run; timed 12 min; difficulty-weighted scoring; **pass line 85%** shown as GATE PASSED / BELOW GATE). Deviation: tiers are not hard-locked in the UI — the gate is advisory. Flag if hard locks are wanted.
- **Application beats recognition (§2.7):** gate banks are novel-scenario questions, never verbatim lesson repeats.
- **Post output (§1/§8):** every lesson ends with a persistent **Post Draft** textarea — the learner writes the X post from memory; the app never writes it.
- **Progress:** per-subject progress bars, NEW/STARTED/MASTERED badges, per-tier accuracy, drill history. All drill responses stored. Reps counters (Part III §A) are NOT yet built as dedicated counters — currently only journal-by-hand via Post Drafts. Flag priority if dedicated counters are wanted next.

---
## MODULE CONFIG

- **Brand:** MARKETS · **Name:** APEX Markets — Operator Track
- **Tagline:** Absolute zero to independent operator. Mechanisms, filings, prices, traps — who pays whom, who is forced to act, who benefits. Educational only, never advice.
- **Tier order:** T0 → T1 → T2 → T3 → T4 → T5 → T6 → T7 → T8 → TX → REPS
- **Gate drills:** 10 questions, 12 min, pass ≥85%
- **SRS intervals (days by box):** 1, 1, 3, 7, 21, 30

---
# TIER 0 · MONEY & OWNERSHIP FROM ZERO  `[T0]`
_No prior knowledge assumed. What money, companies, shares, and markets literally are._  · 16 lessons

## T0.1 — What money is — and why cash quietly shrinks  `id: t0_money`

**PREDICT (shown before the lesson unlocks):** You put $100 in a drawer and leave it for 20 years. When you take it out, can it buy more, less, or the same as today? Why?

**LESSON:**

Money is a claim on other people’s work: a token everyone agrees to accept so we don’t have to barter. It has no value by itself — only what it can be exchanged for.

**Inflation** is the rate at which prices rise, which is the same thing as the rate at which each dollar buys less. Historically U.S. inflation has averaged roughly 3% per year *[fact — long-run average; current rate VERIFY]*. At 3%, prices double about every 24 years, so $100 held as cash for 24 years buys about half of what it does today.

Mechanism check — who benefits from inflation? **Borrowers** (they repay with cheaper dollars) and issuers of money. Who pays? **Savers holding cash.** That is why “doing nothing” with savings is not neutral — it is a slow, guaranteed losing position, and it is the honest reason to learn any of this.

**WORKED EXAMPLE:** **Ex:** A candy bar cost about $0.25 in 1985 and about $2 today. The candy didn’t get 8× better — the dollar got 8× weaker against candy.

**TEACH-BACK:** Explain to a smart 12-year-old why hiding money under a mattress for 30 years is a losing plan, in 5 sentences.

**FLASHCARDS:**
- **What is inflation, mechanically?** → The rate at which each dollar buys less — prices rising is the mirror image of money weakening.
- **Long-run U.S. inflation average** → Roughly 3%/yr historically [VERIFY current] — cash halves in buying power about every 24 years at that rate.
- **Who benefits from inflation, who pays?** → Borrowers repay in cheaper dollars; savers holding cash pay the cost.

**QUIZ:**
1. At ~3% inflation, $100 of cash after ~24 years buys about…
   - A. The same as today
   - B. Twice as much
   - ✅ C. Half as much
   - D. Nothing
   - _Explanation:_ ~3% compounding halves buying power in roughly 24 years (rule of 72: 72÷3=24).
2. Inflation most directly punishes…
   - ✅ A. People holding cash savings
   - B. People with fixed-rate debt
   - C. People who own productive assets
   - D. Nobody — it is neutral
   - _Explanation:_ Cash loses buying power; borrowers repay with cheaper dollars; asset owners are partially shielded.

## T0.2 — What a company is: revenue, costs, profit  `id: t0_company`

**PREDICT (shown before the lesson unlocks):** A kid’s lemonade stand sells 50 cups at $1 each. Lemons, sugar, and cups cost $30. Is the stand a good business? What one number tells you?

**LESSON:**

A company is a machine that spends money to make more money. Three words carry the whole idea:

**Revenue** — every dollar customers pay in. **Costs** — every dollar the machine spends to operate (ingredients, wages, rent). **Profit** — what is left: revenue minus costs. Profit is the machine’s output; everything else is plumbing.

The lemonade stand: 50 cups × $1 = **$50 revenue**. Supplies = **$30 costs**. Profit = **$20**. That $20 belongs to whoever *owns* the stand — which is the bridge to the next lesson.

Two honest complications you’ll meet later: revenue can grow while profit shrinks (spending faster than you earn), and reported “profit” can be dressed up. That is why Tier 3 teaches you to read the actual statements instead of trusting headlines. For now: a business is only a business if, over time, more comes in than goes out.

**TEACH-BACK:** Using only a lemonade stand, explain revenue, costs, and profit to a beginner in 5 sentences.

**FLASHCARDS:**
- **Revenue** → Total money customers pay in — the top line, before any costs.
- **Profit** → Revenue minus costs — what actually belongs to the owners.
- **Can revenue grow while the business loses money?** → Yes — if costs grow faster than revenue. Growth alone is not health.

**QUIZ:**
1. A stand takes in $80 and spends $95 on supplies and signs. Its profit is…
   - A. $80
   - B. $15
   - ✅ C. −$15
   - D. $95
   - _Explanation:_ Profit = revenue − costs = 80 − 95 = −$15. Negative profit is a loss.
2. The number that ultimately belongs to a company’s owners is…
   - A. Revenue
   - ✅ B. Profit
   - C. Costs
   - D. Price per cup
   - _Explanation:_ Owners keep what is left after all costs — the profit.

## T0.3 — What a share literally is — and why founders sell pieces  `id: t0_share`

**PREDICT (shown before the lesson unlocks):** If a founder owns 100% of a profitable business, why would she ever sell part of it to strangers?

**LESSON:**

A **share** (or “stock”) is a fractional claim on a business — on everything it owns and every dollar of profit it will ever make. Own 1 of a company’s 100 shares and 1% of that machine is literally yours: 1% of the profits, 1% of the vote, 1% of whatever it sells for someday.

Why would a founder sell pieces? **Capital now in exchange for ownership later.** Building costs money today; profits arrive in the future. Selling 20% of the company for cash lets her build the factory now. She traded a slice of tomorrow’s profits for fuel today.

Who benefits? Both sides, when it works: the founder gets growth she couldn’t afford, the buyer gets a claim on profits he didn’t have to build. Who pays? The founder’s future self — every dollar of profit is now split 80/20 forever. Nothing in markets is free; every share sold is a permanent slice of the future given away.

**WORKED EXAMPLE:** **Ex:** The lemonade stand earns $20/summer. The kid sells you 25% (25 of 100 shares) for $50. From now on $5 of every summer’s profit is yours — she got $50 today to buy a second stand.

**TEACH-BACK:** Explain what owning one share of a company literally means, and why the company sold it, in 5 sentences a 12-year-old follows.

**FLASHCARDS:**
- **A share is…** → A fractional claim on a business — its assets and all its future profits.
- **Why founders sell shares** → Capital now in exchange for ownership later — cash today to grow, traded for a permanent slice of future profits.
- **Own 10 of 1,000 shares — what is yours?** → 1% of profits, votes, and any sale proceeds.

**QUIZ:**
1. A company has 200 shares. You buy 20. A $1,000 dividend is paid to all owners. Your cut is…
   - ✅ A. $100
   - B. $20
   - C. $50
   - D. $1,000
   - _Explanation:_ 20/200 = 10% ownership → 10% of $1,000 = $100.
2. When a founder sells shares to raise money, what does she permanently give up?
   - A. Her salary
   - ✅ B. A slice of all future profits and control
   - C. Nothing — shares are just paper
   - D. Her costs
   - _Explanation:_ Every share sold is a permanent claim on the future handed to someone else.

## T0.4 — Debt vs. equity: lender vs. owner  `id: t0_debtequity`

**PREDICT (shown before the lesson unlocks):** A business needs $100k. It can borrow it, or sell half the company for it. Who gets paid first if things go wrong — and who gets rich if things go right?

**LESSON:**

There are exactly two ways to fund a business, and the whole capital market is built on the difference:

**Debt (the lender).** You lend money; the company must pay it back with interest, on a schedule, no matter how business goes. If the company fails, lenders stand **first in line** for whatever is left. Capped upside (the interest), protected downside.

**Equity (the owner).** You buy shares; nobody owes you anything. You are paid **last** — after suppliers, wages, taxes, and every lender. But you own all the upside: if profits triple, your claim triples. Uncapped upside, unprotected downside.

Who benefits from each? Lenders benefit from certainty; owners from possibility. Remember the seniority rule — **debt eats first, equity eats last but can eat forever** — because in Tier 10 (bankruptcy) you’ll watch equity holders discover “last in line” usually means zero.

**TEACH-BACK:** Explain the difference between lending money to a pizza shop and owning half of it — who gets paid first, who gets the upside — in 5 sentences.

**FLASHCARDS:**
- **Debt holder: upside and downside** → Upside capped at interest; downside protected — first claim on assets if the company fails.
- **Equity holder: upside and downside** → Uncapped share of all future profits; paid dead last if things go wrong — often zero in bankruptcy.
- **Payment order when a company dies** → Suppliers/wages/taxes and lenders first… equity last (usually nothing).

**QUIZ:**
1. A company is sold for scrap at $1M. It owes lenders $1.2M. Equity holders receive…
   - A. $1M split among them
   - B. $200k
   - ✅ C. Nothing
   - D. Their original investment back
   - _Explanation:_ Debt eats first. $1M < $1.2M owed, so lenders take it all and equity gets zero.
2. Profits unexpectedly triple. Who captures that upside?
   - A. Lenders — their interest triples
   - ✅ B. Owners — their claim on profits triples
   - C. Both equally
   - D. Neither
   - _Explanation:_ Debt is capped at the agreed interest; all extra upside belongs to equity.

## T0.5 — Private vs. public: what “going public” means  `id: t0_public`

**PREDICT (shown before the lesson unlocks):** You can’t buy shares of most companies on your phone. What has to happen before you can — and why would a company volunteer for it?

**LESSON:**

A **private** company’s shares are owned by founders, employees, and invited investors; you can’t buy in without being asked. A **public** company has listed its shares on an exchange where *anyone* can buy or sell them — that switch is the **IPO** (initial public offering), covered as a full sequence in Tier 2.

Why go public? (1) **Raise money** from the largest possible pool of buyers. (2) Let early owners and employees **cash out** — private shares are hard to sell. (3) Get a public price to pay people with (stock compensation) and buy other companies with.

The cost: public companies must file audited financial reports with the **SEC** (the U.S. market regulator) — the same filings you will learn to read in Tier 3. Who benefits from that disclosure rule? You do: it is the only reason an outsider can inspect the machine before buying a piece of it.

**TEACH-BACK:** Explain what an IPO changes for a company and for ordinary people, in 5 sentences.

**FLASHCARDS:**
- **Private vs. public company** → Private: shares held by invited insiders. Public: shares listed on an exchange, anyone can trade them.
- **Three reasons companies go public** → Raise capital at scale, let insiders cash out, and get a public currency for pay and acquisitions.
- **The price of being public** → Mandatory audited SEC filings — the disclosure that lets outsiders inspect the machine.

**QUIZ:**
1. The main thing an IPO changes is…
   - A. The company becomes profitable
   - ✅ B. Anyone can now buy and sell its shares on an exchange
   - C. The company stops paying taxes
   - D. The founders must leave
   - _Explanation:_ An IPO lists shares publicly. It changes who can own the company, not whether it makes money.
2. Public companies must file audited reports with…
   - A. The NYSE police
   - ✅ B. The SEC
   - C. Their bank
   - D. No one
   - _Explanation:_ The SEC requires public disclosure — the foundation of everything in Tier 3.

## T0.6 — Market cap — killing the “$10 stock is cheap” fallacy  `id: t0_mcap`

**PREDICT (shown before the lesson unlocks):** Stock A costs $10 per share. Stock B costs $1,000 per share. Which company is cheaper? (Trick question — what’s missing?)

**LESSON:**

**Market capitalization = share price × number of shares.** It is the price of the *whole company*, and it is the only price that means anything.

Per-share price alone tells you nothing, because companies choose how many slices to cut themselves into. A $10 stock with 10 billion shares is a $100B company. A $1,000 stock with 10 million shares is a $10B company — **ten times smaller** despite the “expensive” sticker.

This is the single most common beginner error, and entire promotion machines run on it: penny-stock pitches (“it’s only $0.50!”) rely on victims confusing a low sticker with a bargain. Who benefits from the confusion? Whoever is selling the shares. The permanent fix: **never evaluate a price without the share count.** Ask “what does the whole business cost?” — then Tier 4 teaches whether that whole-business price is reasonable.

**WORKED EXAMPLE:** **Ex:** A pizza cut into 16 slices isn’t cheaper than the same pizza cut into 4. The slice price changed; the pizza didn’t.

**TEACH-BACK:** Explain why a $2 stock can be wildly more expensive than a $900 stock, using the pizza-slices idea, in 5 sentences.

**FLASHCARDS:**
- **Market cap formula** → Share price × total share count = price of the whole company.
- **Why per-share price alone is meaningless** → Companies choose their own share count — the slice size is arbitrary; only the whole pizza’s price matters.
- **Who benefits from the “$0.50 stock is cheap” illusion?** → The seller/promoter of those shares — it is the engine of penny-stock traps.

**QUIZ:**
1. Stock A: $10/share, 10B shares. Stock B: $1,000/share, 10M shares. Which company is bigger?
   - ✅ A. A — $100B vs. $10B
   - B. B — higher share price
   - C. Same size
   - D. Cannot tell
   - _Explanation:_ 10 × 10B = $100B vs. 1,000 × 10M = $10B. The “cheap” stock is the 10× bigger company.
2. A company does a 2-for-1 split: every share becomes two at half the price. Market cap…
   - A. Doubles
   - B. Halves
   - ✅ C. Is unchanged
   - D. Goes to zero
   - _Explanation:_ Twice the slices at half the price — the pizza is the same size.

## T0.7 — Exchanges, tickers, and what “the market was up” means  `id: t0_exchange`

**PREDICT (shown before the lesson unlocks):** The news says “the market rose 1% today.” What thing, specifically, rose? Who decided what counts as “the market”?

**LESSON:**

An **exchange** (NYSE, Nasdaq) is the venue where buyers and sellers meet — a matching engine with rules, not a mystical place. A **ticker** is a stock’s short code on that venue (AAPL, NVDA, SPCX).

“The market was up today” almost always refers to an **index**: a basket of stocks combined by a published rule. The **S&P 500** is ~500 large U.S. companies weighted by market cap; the **Dow** is 30 companies weighted (oddly) by share price; the **Nasdaq-100** is the 100 largest non-financial Nasdaq listings. An index is not “the economy” — it is a rule-based basket, and the rules matter.

Why care about the rules? Because trillions of dollars are contractually forced to buy whatever enters these baskets (Tier 1’s master key). Whoever writes the basket’s rules quietly directs those flows. When you hear “the market,” always translate: *which basket, weighted how, forced on whom?*

**TEACH-BACK:** Explain what the S&P 500 actually is, and why “the market rose” really means “this basket rose,” in 5 sentences.

**FLASHCARDS:**
- **What an exchange is** → A rule-governed matching venue where buyers meet sellers (NYSE, Nasdaq) — plumbing, not magic.
- **An index is…** → A basket of stocks combined by a published rule (S&P 500 ≈ 500 large caps, cap-weighted).
- **Why index rules matter** → Trillions are forced to buy whatever the rules put in the basket — rule-writers direct flows.

**QUIZ:**
1. “The market fell 2%” most precisely means…
   - A. Every stock fell 2%
   - ✅ B. A major index basket fell 2%
   - C. The economy shrank 2%
   - D. Trading was halted
   - _Explanation:_ It refers to an index — a rule-based basket. Individual stocks and the economy can diverge from it.
2. The S&P 500 weights companies by…
   - A. Share price
   - B. Alphabetical order
   - ✅ C. Market capitalization
   - D. Profit
   - _Explanation:_ Cap-weighted: bigger companies move the index more. (The Dow, oddly, is price-weighted.)

## T0.8 — How buying works: brokers, orders, and the bid/ask toll  `id: t0_orders`

**PREDICT (shown before the lesson unlocks):** You tap BUY on a phone app. Somewhere, someone sells to you at that exact moment. Who — and what do they charge you for the privilege?

**LESSON:**

You trade through a **brokerage account** — a firm that routes your orders to the market. Two basic order types: a **market order** says “fill me now at the best available price” (speed, no price control); a **limit order** says “fill me only at this price or better” (price control, no guarantee of filling).

At any moment a stock has two prices: the **bid** (highest price anyone will pay) and the **ask** (lowest price anyone will sell for). The gap is the **spread**, and it is the toll you pay to trade: buy at the ask, sell at the bid, and you are instantly down the spread.

Who collects the toll? **Market makers** — firms quoting both sides all day (Tier 2 dissects them). The practical habits from day one: prefer limit orders, and remember every unnecessary trade pays the toll again. Frequent trading is a subscription paid to the plumbing.

**WORKED EXAMPLE:** **Ex:** Bid $99.90 / ask $100.10. Buy at market ($100.10), instantly sell at market ($99.90): you lost $0.20/share to the spread with the price “unchanged.”

**TEACH-BACK:** Explain bid, ask, and why day-trading pays a toll on every single round trip, in 5 sentences.

**FLASHCARDS:**
- **Market order vs. limit order** → Market: fill now at best available price. Limit: fill only at my price or better (may not fill).
- **The spread is…** → Ask minus bid — the toll paid on every round trip, collected by market makers.
- **Practical default for beginners** → Limit orders, and few trades — every extra trade pays the toll again.

**QUIZ:**
1. Bid $50.00 / ask $50.20. You buy at market and immediately sell at market. Result per share ≈
   - A. $0.00
   - ✅ B. −$0.20
   - C. +$0.20
   - D. −$50
   - _Explanation:_ Buy at the ask, sell at the bid: the $0.20 spread is the toll.
2. A limit order’s trade-off is…
   - ✅ A. Price control, but it may never fill
   - B. Guaranteed fill at any price
   - C. It is always cheaper
   - D. It skips the spread entirely
   - _Explanation:_ You control the price; the market decides whether anyone meets it.

## T0.9 — Dividends and buybacks — the two ways cash comes back  `id: t0_cashreturn`

**PREDICT (shown before the lesson unlocks):** A company earned $1B it doesn’t need. Name two different ways it can hand that money to shareholders — and how each changes what you own.

**LESSON:**

Profitable companies eventually return cash to owners. There are exactly two pipes:

**Dividends** — cash paid per share, straight to your account. Simple, visible, taxed when received. A steady dividend signals management expects steady profits (cutting one is a public admission of trouble).

**Buybacks** — the company buys its own shares on the market and retires them. Your share count is unchanged but the total shrinks, so your *percentage* of the company — and of all future profits — rises. Buybacks are flexible (no promise to repeat) and tax-deferred (no cash event until you sell).

Who benefits? With dividends, all holders equally, now. With buybacks, remaining holders — *if* the shares were bought below their worth. A company overpaying for its own stock is burning owner money; Tier 6 treats buybacks vs. dilution as management’s truest opinion of its own price. Signal reading: dividends say “profits are stable”; buybacks say “we think the stock is worth more than it costs” — sometimes honestly.

**TEACH-BACK:** Explain dividends vs. buybacks — where the cash goes and what happens to your slice — in 5 sentences.

**FLASHCARDS:**
- **Dividend** → Cash paid out per share to all holders — visible, taxed on receipt, cutting it signals trouble.
- **Buyback** → Company repurchases and retires its own shares — total count shrinks, every remaining slice grows.
- **When is a buyback good for holders?** → When shares are repurchased below their real worth; overpaying burns owner cash.

**QUIZ:**
1. A company with 100 shares buys back 20. You own 10 shares. Your ownership went from 10% to…
   - A. 10%
   - B. 8%
   - ✅ C. 12.5%
   - D. 20%
   - _Explanation:_ 10 of the remaining 80 shares = 12.5%. Buybacks grow every surviving slice.
2. Cutting a long-standing dividend usually signals…
   - A. Hidden strength
   - ✅ B. Management expects trouble ahead
   - C. Nothing at all
   - D. An imminent buyback
   - _Explanation:_ Dividends are a public promise; breaking one is an admission profits can’t support it.

## T0.10 — Funds, ETFs, and the fortune hiding in fees  `id: t0_funds`

**PREDICT (shown before the lesson unlocks):** Two identical funds return 7%/yr for 40 years. One charges 0.05% in fees, the other 1%. Guess the difference in your final money. (Most people guess far too low.)

**LESSON:**

A **fund** pools many people’s money to buy many stocks at once. A **mutual fund** is the older wrapper (priced once daily); an **ETF** trades all day like a stock. An **index fund** is a fund that simply copies an index’s basket by rule — no manager picking, so fees can be tiny.

The **expense ratio** is the fee skimmed every year, forever, regardless of performance. It looks harmless — “1%” — but it compounds against you: on $100k at 7% for 40 years, a 0.05% fee leaves about $1.47M; a 1% fee leaves about $1.02M. Roughly **$450k** — nearly a third of your wealth — paid to someone else for the same basket *[estimate — run the math yourself]*.

Who benefits from high fees? The manager, always — paid on assets, not results. This is why the boring, low-cost, broad index fund is the professional default for core savings, and why Tier 7 catalogs the machines built to talk you out of it.

**TEACH-BACK:** Explain what an index fund does and why a 1% annual fee is not small, in 5 sentences a beginner follows.

**FLASHCARDS:**
- **Index fund** → A fund that copies an index basket by rule — no stock-picking, minimal fees.
- **Expense ratio** → The annual % fee skimmed from your money regardless of performance — it compounds against you.
- **0.05% vs 1% fee, $100k, 7%, 40 yrs** → ≈$1.47M vs ≈$1.02M — roughly $450k paid away in fees [estimate].

**QUIZ:**
1. A fund manager’s fee income depends primarily on…
   - A. Beating the market
   - ✅ B. Assets under management
   - C. Your profits
   - D. The number of trades
   - _Explanation:_ Fees are charged on assets, win or lose — the manager benefits either way.
2. An ETF differs from a classic mutual fund mainly in that it…
   - A. Holds only one stock
   - ✅ B. Trades all day on an exchange like a stock
   - C. Has no fees
   - D. Is guaranteed by the government
   - _Explanation:_ Same pooled-basket idea, different wrapper: ETFs trade intraday.

## T0.11 — Compounding and the rule of 72  `id: t0_compound`

**PREDICT (shown before the lesson unlocks):** Would you rather have $1M today, or a penny that doubles every day for 31 days? Do the rough math before revealing.

**LESSON:**

**Compounding** means earning returns on your previous returns. Growth feeds itself, which is why the curve looks flat for years and then vertical: the penny doubling daily is worth $0.01 → $10.7M in 31 days, and more than half of that arrives in the final two doublings.

The working tool: **the rule of 72.** Divide 72 by the annual growth rate to get the approximate doubling time. 72 ÷ 7% ≈ 10 years. 72 ÷ 3% (inflation) ≈ 24 years — the same rule measures the melting of cash.

The strategic consequence: **time in the market is the amateur’s only free edge.** Institutions have better information, tools, and speed — but most are forced to perform quarterly (Tier 6). A 25-year-old with a 40-year horizon owns four doublings at 7% (16×) that no fund manager’s career can hold. Compounding also explains why fees, taxes, and big losses are so expensive: they interrupt the doubling chain at its steepest point.

**TEACH-BACK:** Explain the rule of 72 and why starting 10 years earlier can double the final outcome, in 5 sentences.

**FLASHCARDS:**
- **Rule of 72** → 72 ÷ annual % rate ≈ years to double. 7% → ~10 yrs; 3% inflation → cash halves in ~24 yrs.
- **Why compounding curves look flat, then vertical** → Returns earn returns — the biggest absolute gains arrive in the last doublings.
- **The amateur’s only structural edge** → Time horizon — decades of doublings that quarterly-judged institutions cannot sit through.

**QUIZ:**
1. At 8%/yr, money doubles in about…
   - A. 6 years
   - ✅ B. 9 years
   - C. 12 years
   - D. 20 years
   - _Explanation:_ 72 ÷ 8 = 9 years.
2. 40 years at 7% is roughly four doublings. $10k becomes about…
   - A. $40k
   - B. $80k
   - ✅ C. $160k
   - D. $280k
   - _Explanation:_ Four doublings = 16×. $10k → $160k. Miss the first decade and it is ~$80k.

## T0.12 — Return math and survival: −50% needs +100%  `id: t0_returnmath`

**PREDICT (shown before the lesson unlocks):** Your portfolio drops 50%, then gains 50%. Are you back to even? Compute it on $100 before revealing.

**LESSON:**

Percentages are asymmetric, and the asymmetry is the most important math in investing. Lose 50% of $100 → $50. Gain 50% back → $75. **A −50% loss requires +100% to recover.** −80% requires +400%. −90% requires +900%.

A **drawdown** is the fall from a peak to a trough. Deep drawdowns aren’t just painful — they are mathematically expensive, because the recovery hill grows faster than the hole. This is why professionals obsess over losses more than gains, and why **ruin — losing everything, or being forced out at the bottom — is the only unrecoverable outcome.** Zero compounds to zero at any rate, forever.

Who benefits from ignoring this math? Anyone selling leverage, lottery-ticket trades, or “go big” narratives — their fees are collected either way (Tier 7). The survival rules that follow from the math: never risk ruin, size positions so being wrong is affordable, and judge any strategy by its worst drawdown, not its best year.

**TEACH-BACK:** Explain why a 50% loss is not undone by a 50% gain, and why “never risk ruin” follows, in 5 sentences.

**FLASHCARDS:**
- **Recovery needed after −50%? After −90%?** → +100% and +900%. The recovery hill grows faster than the hole.
- **Drawdown** → The fall from a portfolio’s peak to its trough — judge strategies by their worst one.
- **Why ruin is special** → Zero compounds to zero forever — every other mistake is recoverable, ruin is not.

**QUIZ:**
1. $100 falls 50% then rises 50%. You have…
   - A. $100
   - ✅ B. $75
   - C. $50
   - D. $125
   - _Explanation:_ $100 → $50 → $75. Down 25% overall despite “−50% + 50%.”
2. A strategy that averages +30%/yr but risks a total wipeout every few years is…
   - A. Excellent — the average is high
   - ✅ B. Doomed — ruin ends compounding permanently
   - C. Fine with enough conviction
   - D. Impossible to evaluate
   - _Explanation:_ Multiply by zero once and every past and future return is gone. Survival precedes performance.

## T0.13 — Risk vs. return; diversification and its limits  `id: t0_risk`

**PREDICT (shown before the lesson unlocks):** Why does a savings account pay less than stocks are expected to return? Who is paying you the extra, and for what?

**LESSON:**

**Return is payment for carrying risk.** A Treasury bill pays little because the outcome is near-certain; stocks are *expected* to pay more precisely because outcomes are uncertain and sometimes brutal. Anyone offering high return with no risk is mispricing something — usually your gullibility (Tier 7).

**Diversification** — owning many unrelated things — is the one honest free lunch: one company’s disaster (fraud, fire, obsolescence) barely dents a 500-stock basket. It removes *single-name* risk without lowering expected return.

Its limits, stated plainly: diversification cannot remove **market risk** — in a crash, nearly everything falls together (correlations go to 1 exactly when you need them not to, a Tier 12 lesson from 2008). And owning 50 similar tech stocks is not diversification; it is one bet written 50 times. Who benefits from misunderstood risk? Sellers of “safe high yields” and concentrated lottery tickets alike.

**TEACH-BACK:** Explain why return is payment for risk, what diversification fixes, and what it cannot fix, in 5 sentences.

**FLASHCARDS:**
- **Why stocks are expected to out-return savings accounts** → Return is compensation for bearing uncertainty — no risk carried, no premium paid.
- **What diversification eliminates** → Single-company risk — one blow-up barely dents a broad basket.
- **What diversification cannot eliminate** → Market risk — in crises nearly everything falls together (correlations → 1).

**QUIZ:**
1. An investment promising 15%/yr “with zero risk” is most likely…
   - A. A rare bargain
   - ✅ B. Mispriced or fraudulent — return is payment for risk
   - C. A government program
   - D. Normal for stocks
   - _Explanation:_ The risk-return link is structural. Riskless high yield is the oldest red flag in finance.
2. Owning 40 different AI-chip stocks is…
   - A. Well diversified
   - ✅ B. One concentrated bet written 40 times
   - C. Risk-free
   - D. Equivalent to an index fund
   - _Explanation:_ Diversification requires unrelated exposures, not many tickers with the same driver.

## T0.14 — Bonds and Treasuries 101 — the anchor price of money  `id: t0_bonds`

**PREDICT (shown before the lesson unlocks):** Every stock, house, and business on Earth is valued against one number published by the U.S. government’s borrowing market. What could that number be?

**LESSON:**

A **bond** is a tradable loan: you hand over cash now, receive interest (**the coupon**), and get the principal back at maturity. The **yield** is the return implied by the price you paid — and price and yield move in opposite directions: pay less for the same fixed coupons, earn more.

**Treasuries** are loans to the U.S. government — the closest thing to a risk-free yield in dollars. The **10-year Treasury yield** is the market’s anchor: it is what you can earn doing (almost) nothing. Every other asset must promise more than the anchor to be worth its risk, so when the anchor rises, all risky assets are re-priced downward against it — mechanically, not emotionally (Tier 5 makes this gravity precise).

Who benefits from watching yields? Anyone reading ahead: the bond market is larger than the stock market and typically moves first (Tier 9). Equities tell stories; yields state the price of money.

**TEACH-BACK:** Explain what a bond is, what a yield is, and why the 10-year Treasury is called the anchor, in 5 sentences.

**FLASHCARDS:**
- **Bond price vs. yield** → Opposite directions — pay less for the same fixed coupons and your implied return (yield) is higher.
- **The 10-year Treasury yield is…** → The near-risk-free anchor every risky asset is priced against.
- **When the anchor yield rises, risky assets…** → Get mechanically re-priced downward — they must out-promise the higher risk-free rate.

**QUIZ:**
1. A bond’s price falls. Its yield…
   - A. Falls
   - ✅ B. Rises
   - C. Is unchanged
   - D. Goes to zero
   - _Explanation:_ Same fixed coupons bought cheaper = higher implied return. Price and yield are a seesaw.
2. The 10-year Treasury yield jumps from 2% to 5%. Stock valuations, all else equal…
   - A. Rise — optimism
   - ✅ B. Fall — future profits are worth less against a higher risk-free anchor
   - C. Are unaffected
   - D. Double
   - _Explanation:_ Every asset competes with the anchor. A richer “do-nothing” rate devalues distant profits.

## T0.15 — Account plumbing: taxable, IRA, 401(k), and taxes [VERIFY]  `id: t0_accounts`

**PREDICT (shown before the lesson unlocks):** Two people make identical investments with identical returns. One retires with meaningfully more money. What non-investment choice made the difference?

**LESSON:**

Concept level only — **every rule here is [VERIFY — time-sensitive]**: rates, limits, and laws change, so confirm against current IRS/official sources before acting.

**Taxable brokerage:** the default account. You owe **capital gains tax** when you sell at a profit — historically at a *lower long-term rate* if held over a year, and a *higher short-term rate* (ordinary income) if under a year [VERIFY]. Frequent trading is therefore taxed harder than patience — the tax code itself pays you to hold.

**Retirement wrappers** — 401(k) (employer) and IRA (individual): contributions are limited annually [VERIFY], but growth inside compounds **without yearly tax drag**, traditionally taxed later (traditional) or funded after-tax and untaxed on exit (Roth) [VERIFY].

**Wash sale rule** [VERIFY]: selling at a loss and rebuying the same security within ~30 days voids the tax loss. Who benefits from you ignoring all this? Nobody — this is the rare lesson where the only opponent is your own inattention. After-tax return is the only return (Tier 14).

**TEACH-BACK:** Explain to a beginner why WHERE you invest (account type) and HOW LONG you hold can matter as much as WHAT you buy, in 5 sentences.

**FLASHCARDS:**
- **Short-term vs. long-term capital gains [VERIFY]** → Under ~1 year: taxed like income (higher). Over: lower long-term rate — patience is subsidized.
- **What retirement wrappers (401(k)/IRA) buy you** → Compounding without annual tax drag; contribution limits and exit rules vary [VERIFY].
- **Wash sale rule [VERIFY]** → Sell at a loss and rebuy within ~30 days → the tax loss is disallowed.

**QUIZ:**
1. Holding a winning stock 13 months instead of 11 typically changes…
   - A. Nothing
   - ✅ B. The tax rate on the gain — long-term rates are lower [VERIFY]
   - C. The stock’s return
   - D. The wash sale rule
   - _Explanation:_ Crossing the one-year line historically moves the gain to the lower long-term rate. Verify current thresholds.
2. The correct habit for any tax figure you learn here is…
   - A. Memorize it forever
   - ✅ B. Tag it [VERIFY] and confirm against current official sources
   - C. Assume it never changes
   - D. Ask social media
   - _Explanation:_ Tax rules are time-sensitive by design in this curriculum — always verify before relying or posting.

## T0.16 — The vocabulary spine  `id: t0_vocab`

**PREDICT (shown before the lesson unlocks):** Define as many as you can before revealing: bull, bear, volatility, liquidity, float, position, portfolio, IPO, valuation.

**LESSON:**

The working vocabulary everything ahead assumes. Say each aloud until it is boring:

**Bull / bear** — optimist expecting prices up / pessimist expecting down (bull market: rising; bear market: falling ~20%+ from a peak). **Volatility** — how violently a price swings; a measure of movement, not of loss. **Liquidity** — how much can be bought or sold without moving the price; deep water vs. a puddle. **Float** — the shares actually available for public trading (total shares minus locked-up insiders — decisive in Tier 2’s IPO mechanics). **Position** — your live holding in one thing (long = own it, profit if it rises; short = borrowed and sold, profit if it falls). **Portfolio** — all positions together. **IPO** — the private→public listing event. **Valuation** — what a price implies the business must do (Tier 4’s whole subject).

These terms are the flashcard deck’s seed — the quiz and drills will recycle them from here on.

**TEACH-BACK:** Pick the five of these words a beginner most needs, and define each in one plain sentence.

**FLASHCARDS:**
- **Volatility** → How violently a price swings — movement, not necessarily loss.
- **Liquidity** → How much can trade without moving the price — depth, not activity.
- **Float** → Shares actually available to trade: total minus insider/locked shares.
- **Long vs. short position** → Long: own it, win if it rises. Short: borrowed and sold, win if it falls.

**QUIZ:**
1. A stock where a $50k order moves the price 5% has…
   - A. High liquidity
   - ✅ B. Low liquidity
   - C. High valuation
   - D. A large float
   - _Explanation:_ Thin liquidity = small orders move the price. Depth is what liquidity measures.
2. A “bear market” conventionally means…
   - A. Any red day
   - ✅ B. A ~20%+ decline from a peak
   - C. Low volatility
   - D. An IPO window
   - _Explanation:_ Bear = sustained decline (~20% from highs, by convention); bull = the rising mirror image.

---
# TIER 1 · THE GAME BOARD  `[T1]`
_Who is on the field, how each player is paid, and what they are FORCED to do._  · 6 lessons

## T1.1 — Primary vs. secondary markets: the company got paid once  `id: t1_primary`

**PREDICT (shown before the lesson unlocks):** You buy 10 shares of Apple on your phone. How much of your money does Apple receive?

**LESSON:**

Zero. Apple receives nothing from your trade. Money reaches the company only in the **primary market** — when it sells newly created shares (an IPO, or a later “secondary offering” of new stock). Every trade after that happens in the **secondary market**: players trading existing claims *with each other*, like collectors trading baseball cards long after the printer was paid.

This single fact reframes everything. The daily stock market is not people “investing in companies” — it is a continuous auction of second-hand claims, where every buyer requires a seller and every dollar you make was paid in by someone else’s decision. The company is the referee’s scoreboard, not a participant in your trade.

Who benefits from the confusion? Narratives that frame every purchase as “supporting” a company, and every rally as new money “flowing into” firms. Mechanically: your purchase supports the seller — whoever they are, and whyever they sold.

**TEACH-BACK:** Explain the baseball-card version of primary vs. secondary markets to a beginner in 5 sentences.

**FLASHCARDS:**
- **Primary vs. secondary market** → Primary: company sells new shares and receives the cash (IPO/offerings). Secondary: existing shares trade between players; the company gets nothing.
- **When you buy a share on an exchange, who gets your money?** → The seller of that share — never the company.
- **Every trade requires…** → A counterparty — your buy is someone’s deliberate sell. Ask why they sold.

**QUIZ:**
1. A company benefits directly from its stock trading ONLY when…
   - A. Any share trades
   - ✅ B. It sells newly issued shares (primary market)
   - C. Price rises
   - D. Volume is high
   - _Explanation:_ Cash reaches the company at issuance. Everything after is players trading claims with each other.
2. You buy shares from an unknown seller. The mechanically correct question is…
   - A. Does the CEO approve?
   - ✅ B. Why is my counterparty selling to me at this price?
   - C. Will Apple thank me?
   - D. Is volume high?
   - _Explanation:_ Every trade has an opposing decision. Understanding the other side is the beginning of edge.

## T1.2 — Price is set by the marginal trade, not by “worth”  `id: t1_marginal`

**PREDICT (shown before the lesson unlocks):** A company has 1 billion shares. Today just 5 million traded, and the last trade printed 3% lower. Headlines say the company “lost $9 billion in value.” Did it?

**LESSON:**

A stock’s posted price is simply **the last price at which one share changed hands** — the marginal trade. Multiply that by a billion shares and you get market cap, but nobody traded a billion shares. The 0.5% that traded set the price for the 99.5% that sat still.

Consequences: (1) Prices move on the **urgency of the few**, not the judgment of the many — one forced seller in a thin market marks down everyone’s holdings. (2) “The company lost $9B today” means only: the most recent traders agreed on a lower number. Value on paper is an extrapolation from the margin. (3) In thin liquidity (Tier 0 vocabulary) small money makes big price moves — which is precisely how manipulation works (Tier 7’s pump anatomy).

Who benefits from marginal pricing? Whoever controls the urgency at the margin: forced buyers create sellers’ paydays, and forced sellers create buyers’ bargains. The next lessons build the census of who gets forced, and when.

**TEACH-BACK:** Explain how 0.5% of shares trading can re-price 100% of a company, in 5 sentences.

**FLASHCARDS:**
- **The posted stock price is literally…** → The last marginal trade — the price the most recent buyer and seller agreed on.
- **Why thin liquidity means violent prices** → Few traders at the margin set the price for everyone; one urgent order moves the print.
- **“The company lost $9B today” really means…** → The latest marginal traders agreed on a lower price; the rest is extrapolation.

**QUIZ:**
1. A fund MUST sell a huge block today in a thin market. The likeliest result…
   - A. No effect
   - ✅ B. Price falls hard as urgency hits the margin — bargains for patient buyers
   - C. Price rises
   - D. Trading halts automatically
   - _Explanation:_ Urgency at the margin sets the price. Forced sellers pay; patient counterparties collect.
2. Market cap equals the marginal price × all shares. This makes market cap…
   - A. An exact measure of value
   - ✅ B. An extrapolation from the last trade to shares that never traded
   - C. A government statistic
   - D. Meaningless
   - _Explanation:_ Useful, but built on the margin — which is why forced flows can distort it.

## T1.3 — The player census I: retail, index funds, pensions  `id: t1_players`

**PREDICT (shown before the lesson unlocks):** Rank these by how free they are to do whatever they want with their money: a retail investor, an S&P 500 index fund, a pension fund. Justify your ranking.

**LESSON:**

Learn each player by three questions: what do they hold, how are they paid, what are they **forced** to do?

**Retail (you).** Holds: personal savings. Paid: own gains. Forced to do: *nothing* — the only player with no mandate, no clients, no deadline. That freedom is the edge institutions envy — most retail throws it away by acting like an impatient fund.

**Index funds.** Hold: whatever the index rule says, in the rule’s proportions. Paid: tiny % of assets. Forced: to buy whatever enters the index and sell whatever leaves, *at any price, on a known date*. Price-blind, rule-bound, and now roughly half of U.S. fund assets *[estimate — VERIFY]*.

**Pensions.** Hold: workers’ retirement promises (trillions). Paid: salaries; judged on meeting long liabilities. Forced: to keep allocations near policy targets (e.g. 60% stocks / 40% bonds), which means **mechanical rebalancing** — a quarter where stocks surge forces them to sell stocks and buy bonds, and vice versa. Predictable flows, published calendars.

**TEACH-BACK:** For index funds and pensions, state in plain words what each is FORCED to do and why, in 5 sentences.

**FLASHCARDS:**
- **Retail’s structural edge** → No mandate, no clients, no deadline — the only unforced player on the field.
- **What index funds are forced to do** → Buy whatever enters the index and sell whatever leaves — price-blind, on a known date.
- **What pension rebalancing forces** → Trimming whatever rose and adding whatever fell to restore target weights — predictable, calendar-driven flows.

**QUIZ:**
1. Stocks surge 20% in a quarter. A 60/40 pension fund is now forced to…
   - A. Buy more stocks
   - ✅ B. Sell stocks and buy bonds back to target
   - C. Do nothing
   - D. Close the fund
   - _Explanation:_ Policy weights are the mandate. Rebalancing mechanically sells winners and buys losers.
2. An index fund’s decision about what to buy is made by…
   - A. Its star manager
   - ✅ B. The index rule-writers — the fund just obeys
   - C. The SEC
   - D. Its investors, daily
   - _Explanation:_ Index funds are execution machines for the basket rules. The rule-writers direct the flows.

## T1.4 — The player census II: hedge funds, VCs, banks, market makers, insiders, media  `id: t1_players2`

**PREDICT (shown before the lesson unlocks):** A hedge fund manager is brilliant and believes a stock will triple in 5 years — but clients can pull their money every quarter. What is she forced to care about instead?

**LESSON:**

**Hedge funds.** Hold: pooled money from institutions/rich clients. Paid: fees on assets + cut of profits (“2-and-20”, Tier 6). Forced: to survive **redemptions** — clients can leave quarterly, so a right-in-3-years idea that is down this year gets liquidated. Career risk makes them chase what is working now.

**Venture capital.** Holds: stakes in private startups. Paid: fees + carry on exits. Forced: to *return cash within a ~10-year fund life* — meaning they must eventually find buyers (IPOs, acquirers). Their public optimism is inventory marketing.

**Banks.** Paid: fees on deals (IPOs, M&A, lending). Forced: to keep deal flow coming — their research and ratings orbit that incentive.

**Market makers.** Paid: the spread, millions of times daily. Forced: to hedge instantly and stay flat — they are plumbing, not opinion.

**Insiders.** Hold: their own company’s stock + non-public knowledge. Forced: to disclose trades publicly (Form 4) — a rare honest window (Tier 6).

**Media.** Paid: attention. Forced: to produce urgency on a daily schedule regardless of whether anything happened.

**TEACH-BACK:** Pick any three of these players and state: what they hold, how they are paid, what they are forced to do — one sentence each.

**FLASHCARDS:**
- **What redemptions force on hedge funds** → Quarterly client exits force short horizons — right-eventually gets sold to survive down-now.
- **What a 10-year fund life forces on VCs** → They MUST find exits (IPO/acquisition) — their public bullishness is marketing for future buyers.
- **Media’s actual product** → Urgency and attention on a daily schedule — coverage tracks engagement, not opportunity.

**QUIZ:**
1. A VC loudly praises its portfolio company on TV. The mechanism-first reading is…
   - A. Pure generosity
   - ✅ B. Marketing inventory to future buyers — the fund needs an exit within its lifespan
   - C. Insider trading
   - D. A legal requirement
   - _Explanation:_ Fund structure forces exits; talking the book recruits the buyers those exits require.
2. Hedge funds often pile into whatever is already rising because…
   - A. They are foolish
   - ✅ B. Quarterly redemptions and career risk punish being early/contrarian and down
   - C. It always works
   - D. Regulators require it
   - _Explanation:_ Constraints, not stupidity: clients flee short-term losses, so managers chase short-term winners.

## T1.5 — The master key: constraints force behavior  `id: t1_masterkey`

**PREDICT (shown before the lesson unlocks):** A stock is announced as joining a major index in two weeks. Every index fund on Earth must buy it on inclusion day. What happens to the price before, on, and after that day?

**LESSON:**

The master key of the entire module: **constraints force behavior; forced behavior is predictable; predictable behavior is where edges live.** Nobody needs to guess what a forced player will do — the mandate already wrote their orders.

Case study — index inclusion. When SPCX joined the Nasdaq-100 (June 2026 *[VERIFY details]*), every fund tracking that index was contractually obligated to buy on a public schedule. The sequence: fast money buys *ahead* (front-running the known demand) → price runs up → inclusion day: index funds buy at the elevated price from the front-runners — **the forced buyer pays the toll** → demand exhausted, price fades after.

Who benefited? Traders who read the calendar. Who paid? Index investors, a few basis points at a time, and latecomers who bought the pop’s story. The same key opens every door ahead: rebalances, lockup expiries, margin cascades, buyback blackouts — all calendars of forced flows. When you see any event, ask first: **who is forced to act, which direction, on what schedule?**

**TEACH-BACK:** State the master key in one sentence, then walk a beginner through the index-inclusion sequence: who buys early, who is forced to buy late, who pays.

**FLASHCARDS:**
- **The master key** → Constraints force behavior; forced behavior is predictable; predictable behavior is where edges live.
- **Index-inclusion sequence** → Front-runners buy ahead → price runs → index funds forced to buy high on the date → demand spent, price fades.
- **The first question for any market event** → Who is forced to act, in which direction, on what schedule?

**QUIZ:**
1. Why does a stock often FADE after joining a big index?
   - A. The company weakens
   - ✅ B. The scheduled forced buying is complete — the demand was an event, not a trend
   - C. Index funds sell it
   - D. Regulators cap it
   - _Explanation:_ Once the mandated buyers have bought, the anticipatory bid is gone. The flow was the story.
2. The reason forced flows create edges is that they are…
   - A. Large
   - ✅ B. Public, scheduled, and price-insensitive
   - C. Illegal
   - D. Rare
   - _Explanation:_ Predictability is the edge: everyone can read the calendar; forced players must act anyway.

## T1.6 — Media economics: fear and euphoria as products  `id: t1_media`

**PREDICT (shown before the lesson unlocks):** A stock has risen 400% and now saturates every feed and news show. As a forward indicator, is peak coverage bullish, bearish, or neutral — and through what mechanism?

**LESSON:**

Financial media is not paid to make you money; it is paid for your **attention**. Fear and euphoria are the two most clickable emotions, so the machine manufactures both on a daily schedule — “markets in turmoil,” “the next big thing” — regardless of whether anything changed.

The structural consequence: **coverage peaks track attention peaks, and attention peaks come after the move.** A story reaches saturation only after the price has already run — meaning maximum coverage marks the moment the marginal buyer (Tier 1, lesson 2) is most likely already in. Whoever bought the story at saturation supplied exit liquidity to whoever bought before the story existed.

Who benefits? Platforms (engagement), and early holders (fresh buyers at the top). Who pays? The audience that mistakes coverage intensity for opportunity. The operator’s discipline: use media as a *sentiment gauge*, never a *signal* — when your barber and your feed agree on a stock, ask who still remains to buy it.

**TEACH-BACK:** Explain why maximum news coverage tends to arrive near attention tops, and who is buying from whom at that moment, in 5 sentences.

**FLASHCARDS:**
- **Media’s incentive** → Sell attention — fear and euphoria are products with a daily production quota.
- **Why peak coverage ≈ attention peak, not opportunity** → Stories saturate only after the move; by then the marginal buyer is largely in.
- **Correct use of financial media** → As a sentiment gauge (who already knows this story?) — never as a buy signal.

**QUIZ:**
1. A stock becomes the #1 story everywhere after a 300% run. Mechanically, new buyers at this point mostly provide…
   - A. Capital to the company
   - ✅ B. Exit liquidity to earlier holders
   - C. Support to the media
   - D. Nothing
   - _Explanation:_ Secondary market: late story-buyers purchase from early holders — the story is the distribution channel.
2. “Markets in turmoil” segments exist primarily because…
   - A. Turmoil is constant
   - ✅ B. Fear is a reliably clickable product
   - C. Regulators require them
   - D. They predict crashes
   - _Explanation:_ The business model is attention. Emotional intensity is manufactured on schedule.

---
# TIER 2 · THE MACHINE  `[T2]`
_Plumbing: market makers, shorts, options, leverage, and the full IPO lifecycle._  · 10 lessons

## T2.1 — Market makers and spreads; liquidity as depth  `id: t2_mm`

**PREDICT (shown before the lesson unlocks):** Someone must be willing to sell whenever you buy, instantly, all day. Who volunteers for that job, and what do they earn for it?

**LESSON:**

A **market maker** is a firm that continuously quotes both a bid and an ask on a security, standing ready to trade with anyone. Their profit is the **spread** (Tier 0), captured thousands of times a day, while hedging instantly so they hold almost no directional risk. They are the market’s plumbing: paid for immediacy, not opinion.

Refine your liquidity picture: liquidity is **depth, not volume**. Volume is how much traded; depth is how much *could* trade without moving the price. A meme stock can print huge volume with paper-thin depth — the book is a crowd of tiny urgent orders, so prices gap violently. Treasuries trade with oceanic depth — billions move the price barely at all.

Who benefits? Makers earn the toll; everyone else buys immediacy with it. When does the machine bite? In panics, makers widen spreads or step away — *liquidity vanishes exactly when it is most needed*, a mechanical fact behind flash crashes (and Tier 11’s flow lessons).

**TEACH-BACK:** Explain what a market maker does for a living and why liquidity means depth rather than volume, in 5 sentences.

**FLASHCARDS:**
- **Market maker’s business** → Quote both sides all day, capture the spread at scale, hedge to stay directionless — paid for immediacy.
- **Depth vs. volume** → Volume = how much traded. Depth = how much could trade without moving the price. Liquidity is depth.
- **When spreads blow out** → In panics makers widen or withdraw — liquidity disappears precisely when demanded most.

**QUIZ:**
1. High volume with violent price gaps on modest orders indicates…
   - A. Deep liquidity
   - ✅ B. Thin depth despite the volume
   - C. A healthy market
   - D. Low volatility
   - _Explanation:_ Activity is not depth. Thin books gap on urgency regardless of how much churns.
2. A market maker’s core income is…
   - A. Betting on direction
   - ✅ B. The bid–ask spread, captured at scale
   - C. Company dividends
   - D. Government fees
   - _Explanation:_ They are toll collectors of immediacy, hedged against direction.

## T2.2 — Payment for order flow: why “free” brokers exist  `id: t2_pfof`

**PREDICT (shown before the lesson unlocks):** Your broker charges $0 commission. Brokers are not charities. Trace the money: who is paying them, and for what exactly?

**LESSON:**

**Payment for order flow (PFOF):** your “free” broker sells the right to execute your orders to a market-making firm. The maker pays for the privilege because **retail order flow is the safest flow in the market** — small, uninformed on average, and unlikely to be an institution running them over. Against such flow, quoting a spread is nearly riskless profit.

The mechanics: you are typically filled at or slightly inside the public bid/ask (“price improvement”), the maker still captures most of the spread, and a slice of that goes back to the broker as PFOF. Your commission is $0; your cost moved into the spread and got shared without you at the table.

Who benefits? Makers (safe flow), brokers (paid per order — which is why the app is engineered to make you trade *more*: confetti, alerts, one-tap options). Who pays? Traders, in proportion to how often they trade. The product being sold is not the app. **The product is you** — specifically, your order flow. [Mechanics general; specific broker arrangements VERIFY.]

**TEACH-BACK:** Explain how a $0-commission broker actually gets paid, and why its app design wants you trading constantly, in 5 sentences.

**FLASHCARDS:**
- **Payment for order flow** → Market makers pay brokers for retail orders — safe, uninformed-on-average flow that makes spread capture nearly riskless.
- **Where the cost went when commissions hit $0** → Into the spread, shared between maker and broker — paid per trade, invisibly.
- **Why the app gamifies trading** → Brokers are paid per order — more taps, more flow to sell. The product is your order flow.

**QUIZ:**
1. Retail order flow commands a price because it is…
   - A. Huge
   - ✅ B. Unlikely to be informed institutional flow — safe to trade against
   - C. Illegal to refuse
   - D. Fast
   - _Explanation:_ Makers fear informed counterparties. Small scattered retail orders are the safest business in markets.
2. Under PFOF, a broker’s revenue rises when you…
   - A. Hold for decades
   - ✅ B. Trade more often
   - C. Read filings
   - D. Buy index funds once
   - _Explanation:_ Paid per order: engagement features exist to manufacture flow.

## T2.3 — Short selling: borrow, sell, buy back, return  `id: t2_short`

**PREDICT (shown before the lesson unlocks):** How could you profit from a stock FALLING — using only these tools: borrowing, selling, and buying? Sketch the sequence before revealing.

**LESSON:**

**Short selling**, step by step: (1) **Borrow** shares from a holder, paying a **borrow fee** (annualized %; scarce borrows cost more). (2) **Sell** them at today’s price. (3) Later, **buy back** the same number of shares — hopefully cheaper. (4) **Return** them. Profit = sale price − buyback price − fees.

The risk is inverted and unbounded: a long can lose 100%; a short can lose *infinity*, because there is no ceiling on a price. And rising prices squeeze shorts mechanically: losses grow, margin calls arrive, and the only exit is **buying** — which pushes the price further up, forcing more shorts to buy. That chain reaction is a **short squeeze**.

Read the gauge correctly: **short interest** (% of float sold short) is *fuel, not forecast*. High short interest means many players who are eventually forced to buy — it says nothing by itself about whether they are right. Who benefits from squeezes? Whoever holds inventory when forced buyers arrive (Tier 12: GameStop).

**TEACH-BACK:** Walk a 12-year-old through the four steps of a short sale, then explain why heavily shorted stocks can explode upward, in 5 sentences.

**FLASHCARDS:**
- **The four steps of a short** → Borrow → sell → buy back → return. Profit = sold high, repurchased low, minus borrow fees.
- **Why short losses are unbounded** → No ceiling on price — and rising losses force buy-backs that push price higher (squeeze).
- **Short interest is…** → Fuel, not forecast: a queue of future forced buyers, not evidence about the business.

**QUIZ:**
1. Short at $40, buy back at $25, fees $1. Per-share result…
   - ✅ A. +$14
   - B. +$15
   - C. −$15
   - D. +$25
   - _Explanation:_ 40 − 25 − 1 = +$14.
2. A short squeeze feeds itself because covering a short requires…
   - A. Selling more
   - ✅ B. Buying — which lifts the price and forces more covering
   - C. Borrowing more
   - D. A dividend
   - _Explanation:_ The only exit from a short is a buy. Forced buys beget higher prices beget more forced buys.

## T2.4 — Options from zero — then flip to the seller’s chair  `id: t2_options`

**PREDICT (shown before the lesson unlocks):** Someone will sell you the RIGHT (not obligation) to buy a $100 stock at $110 anytime this month. What should that right cost, and what has to happen for you to profit?

**LESSON:**

An **option** is a contract. A **call**: the right to *buy* at a set price (**strike**) before a date (**expiry**). A **put**: the right to *sell*. The price you pay for the contract is the **premium**. Buy the $110 call for $2 on a $100 stock: below $110 at expiry it dies worthless; you need $112 just to break even.

Now sit in the **seller’s** chair — the view that matters. The seller pockets the premium on day one and profits whenever the big move *doesn’t* happen. Every day that passes, the option loses time value — **theta decay** — money that drains from buyer to seller on a schedule. Theta is the house edge, and sellers (mostly professional dealers) run the casino.

Short-dated options are decay at its steepest: buyers of weekly lottery tickets are, in aggregate, the most reliably harvested group in markets — they must be right on direction, size, *and* deadline, while the seller merely needs time to pass. Who benefits? Premium sellers and the brokers paid per contract. [Tier 7 revisits “income” strategies sold back to retail; Tier 11 covers how dealer hedging moves the whole market.]

**TEACH-BACK:** Define call, put, strike, premium, expiry in plain words — then explain why the option SELLER usually holds the edge, in 5 sentences.

**FLASHCARDS:**
- **Call vs. put** → Call: right to buy at the strike by expiry. Put: right to sell. Cost of either = the premium.
- **Theta decay** → Options lose time value daily — a scheduled transfer from buyer to seller. The house edge.
- **Why short-dated option buyers get harvested** → They must be right on direction, magnitude, AND deadline; the seller just needs the clock.

**QUIZ:**
1. Stock at $100. You pay $2 for a $110 call. At expiry the stock is $109. Your result…
   - A. +$9
   - ✅ B. −$2 (worthless)
   - C. +$7
   - D. Break even
   - _Explanation:_ Below the strike, the right to buy at $110 is worth nothing. The premium is fully lost.
2. Theta decay systematically favors…
   - A. Option buyers
   - ✅ B. Option sellers
   - C. Neither
   - D. The exchange only
   - _Explanation:_ Time value drains to sellers daily — the structural house edge of the options market.

## T2.5 — Leverage and margin: how liquidation cascades work  `id: t2_leverage`

**PREDICT (shown before the lesson unlocks):** You buy $20k of stock using $10k of yours and $10k borrowed. The stock falls 30%. Compute your personal loss in % before revealing.

**LESSON:**

**Leverage** is investing with borrowed money; **margin** is the broker’s loan against your holdings. It multiplies both directions: $10k of yours + $10k borrowed = $20k position. A 30% drop costs $6k — **60% of your money**. The debt doesn’t shrink; only your side does.

The machine has a tripwire. Fall far enough and the broker issues a **margin call**: add cash or be liquidated. Refuse or fail, and the broker **force-sells your position at market** — at the worst possible moment, by construction. Now scale it: falling prices trigger liquidations → forced selling pushes prices lower → lower prices trigger the next tier of liquidations. That chain is a **liquidation cascade**, and it is why leveraged markets fall in air pockets rather than lines.

The permanent lesson: **leverage converts “right eventually” into “broke first.”** The market can stay irrational longer than a borrower can stay solvent. Who benefits? Lenders collect interest in all weather, and cascade buyers collect the forced sellers’ inventory. Ruin math (Tier 0) says the cascade’s victims never get to be right later.

**TEACH-BACK:** Explain with the $10k example how leverage doubles gains and losses, and narrate a liquidation cascade, in 5 sentences.

**FLASHCARDS:**
- **2× leverage turns a −30% move into…** → −60% of your equity — the loan never shrinks, only your side does.
- **Margin call → liquidation** → Fall past the threshold: add cash or the broker force-sells you at market, at the low.
- **The leverage law** → Leverage converts “right eventually” into “broke first.” Cascades are its market-wide form.

**QUIZ:**
1. Liquidation cascades accelerate because forced selling…
   - A. Attracts regulators
   - ✅ B. Lowers prices, which triggers the next round of forced selling
   - C. Reduces volume
   - D. Is illegal
   - _Explanation:_ Each liquidation is a market sell that trips the next tripwire — mechanical, not emotional.
2. $10k own + $10k margin. Stock rises 50%. Ignoring interest, your equity gain is…
   - A. +50%
   - ✅ B. +100%
   - C. +25%
   - D. +150%
   - _Explanation:_ $20k position +50% = +$10k on your $10k. Leverage doubles both directions — remember the other direction.

## T2.6 — IPO I: why companies IPO; the roadshow and bookbuilding  `id: t2_ipo1`

**PREDICT (shown before the lesson unlocks):** Before an IPO, the company and its banks tour the country meeting big investors privately. What are they doing in those rooms — and who is deliberately NOT invited?

**LESSON:**

The IPO lifecycle is this tier’s flagship — five lessons, one running case: **SPCX (SpaceX), June 2026 IPO *[VERIFY dates/details]***.

Why IPO? Tier 0’s reasons (capital, insider liquidity, acquisition currency) plus one more: **early investors need the exit** (Tier 1 — VC fund lifespans). The IPO is the moment a decade of private bets gets converted into public money.

The process: the company files an **S-1** (the full disclosure document — Tier 3 teaches you to read it), then banks run the **roadshow**: private meetings with institutions to gauge demand. In **bookbuilding**, those institutions submit indications — how many shares, at what price — and the banks assemble the demand book and set the offer price.

Note who is in the room: funds, not you. Retail hears the story through media only after the professionals have set the price. Who benefits? Banks (fees ~a healthy % of proceeds *[VERIFY]*, plus favor with fund clients), and institutions (first look). The pricing is a negotiation among insiders that the public later ratifies — or refuses to.

**TEACH-BACK:** Explain what an S-1, a roadshow, and bookbuilding are, and who is in the room when the price is set, in 5 sentences.

**FLASHCARDS:**
- **S-1** → The pre-IPO disclosure filing — the company’s full self-description, risks and financials included.
- **Roadshow + bookbuilding** → Private demand-gathering from institutions; their indications build the book that sets the offer price.
- **Who sets the IPO price?** → Banks negotiating with institutional buyers — retail is not in the room.

**QUIZ:**
1. The offer price of an IPO is set primarily by…
   - A. Retail demand on day one
   - ✅ B. Bankers and institutions during bookbuilding
   - C. The SEC
   - D. An algorithm
   - _Explanation:_ The book is built in private meetings. The public meets the price after it exists.
2. A key structural reason companies IPO is that their venture investors…
   - A. Enjoy paperwork
   - ✅ B. Must return cash within a fund’s ~10-year life and need the exit
   - C. Are forced by law
   - D. Want lower valuations
   - _Explanation:_ Fund clocks force exits. The IPO is the scheduled door.

## T2.7 — IPO II: allocation and the first-day pop as a wealth transfer  `id: t2_ipo2`

**PREDICT (shown before the lesson unlocks):** An IPO prices at $30. It opens for public trading at $45 — a 50% “pop” celebrated on TV. Who owned shares at $30, who bought at $45, and who lost what?

**LESSON:**

**Allocation:** shares at the offer price go to whom the banks choose — overwhelmingly the institutions from the book, plus favored clients. **Retail effectively cannot buy at the offer price.** Your first chance is the open, wherever it prints.

Now decode the celebrated **first-day pop**. Price at $30, open at $45: the allocated institutions are up 50% in hours. But mechanically, the pop means **the company sold its shares for $15 less than buyers would pay** — money the company raised for its future handed instead to the allocation list. A 50% pop on a $2B raise is roughly $1B of foregone capital *[estimate]* — a wealth transfer from the company (and its pre-IPO owners) to the banks’ best customers.

Why do banks systematically underprice? The allocation pop is a gift they distribute to clients who pay them in other ways — and a “hot deal” headline markets the next IPO. Who pays? The issuer, and every retail buyer of the pop at $45 — who bought at a price the professionals just showed they could not get. SPCX case: log its offer price vs. first prints *[VERIFY]*.

**TEACH-BACK:** Explain why a huge first-day IPO pop is bad for the company and great for the allocation list, naming who paid whom, in 5 sentences.

**FLASHCARDS:**
- **Who gets offer-price shares?** → Institutions and favored bank clients from the book. Retail buys at the open, after the pop.
- **A first-day pop mechanically means…** → The company sold itself too cheap — the gap is a transfer to the allocation list.
- **Why banks underprice deliberately** → The pop is a distributable gift to their paying clients, and marketing for the next deal.

**QUIZ:**
1. IPO priced at $30, opens at $45. The $15 gap primarily flowed from…
   - A. Retail to banks
   - ✅ B. The company (foregone proceeds) to allocated institutions
   - C. The SEC to funds
   - D. Nowhere — no one paid
   - _Explanation:_ The company sold at $30 what buyers valued at $45. The difference was captured by whoever got allocations.
2. Buying the celebrated first-day pop means buying at the price…
   - A. Institutions just got
   - ✅ B. Professionals declined to pay hours earlier
   - C. The company chose
   - D. The SEC set
   - _Explanation:_ The book, with full information, priced it at $30. You are paying $45 for the story of the pop itself.

## T2.8 — IPO III: greenshoe, quiet period, analyst initiations  `id: t2_ipo3`

**PREDICT (shown before the lesson unlocks):** In the weeks after an IPO, the underwriting banks quietly stabilize the price, say nothing, then all publish research on the same day. Guess the purpose of each behavior.

**LESSON:**

Three pieces of post-IPO machinery, each mechanically explainable:

**The greenshoe.** Banks are granted an option to sell ~15% extra shares *[VERIFY]*. If the price sags below the offer, they buy shares back (supporting the price) to cover that extra allocation; if it flies, they exercise the option instead. Translation: a legal price-stabilization tool that also guarantees the banks a profit in both directions.

**The quiet period.** For a window around the deal, the company and its underwriters are restricted from promotional statements *[VERIFY current rules]*. Silence is regulatory, not ominous.

**Analyst initiations.** When the quiet period ends, the underwriters’ research desks initiate coverage — overwhelmingly with positive ratings on the stock *their own bank just sold*. The conflict is structural (Tier 6): research orbits banking fees. The initiation-day headline burst is scheduled marketing, not new information.

Who benefits? Banks throughout. The operator’s takeaway: post-IPO price action for weeks is *managed* — judge nothing until the machinery (and the next lesson’s lockup) has cleared.

**TEACH-BACK:** Explain the greenshoe, the quiet period, and why underwriter “Buy” initiations deserve heavy discounting, in 5 sentences.

**FLASHCARDS:**
- **Greenshoe** → Banks’ ~15% over-allotment option [VERIFY] — a stabilization tool that pays them whether the price sags or flies.
- **Quiet period** → A regulatory promotion blackout around the deal — silence by rule, not by signal.
- **Analyst initiations after an IPO** → The selling banks’ research desks rating their own product — scheduled marketing, structurally conflicted.

**QUIZ:**
1. Underwriters initiating coverage with Buy ratings on their own IPO is best read as…
   - A. Independent validation
   - ✅ B. A structural conflict — research supporting the banking relationship
   - C. Illegal
   - D. A coincidence
   - _Explanation:_ The same firm collected the fees. The rating’s incentive chain runs through the deal, not the analysis.
2. The greenshoe lets banks respond to a sagging IPO price by…
   - A. Halting trading
   - ✅ B. Buying shares back to cover their over-allocation, supporting the price
   - C. Suing shorts
   - D. Issuing more stock
   - _Explanation:_ Stabilization by construction: their covering bid props the price during the fragile window.

## T2.9 — IPO IV: the lockup — scheduled supply, in the calendar  `id: t2_ipo4`

**PREDICT (shown before the lesson unlocks):** Insiders own 80% of a newly public company but are contractually barred from selling for ~180 days. What date is circled on every professional’s calendar, and why?

**LESSON:**

The **lockup**: insiders and pre-IPO investors are contractually barred from selling for ~180 days after the IPO *[VERIFY per deal]*. Its purpose: prevent the people with the most shares and the most information from dumping into the fragile debut.

Connect it to **float** (Tier 0): early on, only the IPO’s slice — often 10–20% of the company — actually trades. Small float + heavy attention = the violent price action typical of young listings: scarcity, not consensus, sets the marginal price (Tier 1). Meanwhile a supermajority of shares sits in a locked pen, **with a public release date**.

Lockup expiry is therefore *scheduled supply*: on a known day, the tradable share count can multiply. Master key applied: who is forced/able to act? Insiders — many diversifying a decade’s illiquid wealth, rationally, whatever they believe. Sophisticated players position for that supply *ahead* of the date; the unaware hold through it wondering why the chart sagged into a known calendar event. Running case: **SPCX lockup, December 2026 *[VERIFY dates]*** — the module’s season finale.

**TEACH-BACK:** Define lockup and float, then explain why expiry day is “scheduled supply” and who positions ahead of it, in 5 sentences.

**FLASHCARDS:**
- **Lockup** → ~180-day contractual ban [VERIFY] on insider selling after an IPO — protecting the debut from its own owners.
- **Why young IPOs trade violently** → Tiny float — scarcity sets the marginal price while most shares sit locked.
- **Lockup expiry is…** → Scheduled supply: a known date when the tradable share count can multiply. The calendar is public.

**QUIZ:**
1. Only 15% of a company floats; 85% unlocks in December. Rational insiders diversifying implies December brings…
   - A. Scheduled demand
   - ✅ B. A large, calendar-known increase in potential supply
   - C. Nothing predictable
   - D. A buyback
   - _Explanation:_ Master key: insiders’ rational diversification is predictable, dated selling pressure.
2. The violent early trading of fresh IPOs is primarily explained by…
   - A. Fundamentals changing daily
   - ✅ B. A tiny float — scarcity pricing at the margin
   - C. Short sellers
   - D. Analyst ratings
   - _Explanation:_ When 85% of shares cannot trade, small flows whip the price of the sliver that can.

## T2.10 — IPO V: expiry dynamics, secondaries, and Ritter’s verdict  `id: t2_ipo5`

**PREDICT (shown before the lesson unlocks):** Averaged across decades of data, do IPOs beat or lag the market over the 3–5 years after listing? Commit to a guess and a reason.

**LESSON:**

**Expiry dynamics.** Into a lockup expiry: anticipatory selling and short positioning against the known supply. At expiry: sometimes the cliff (supply overwhelms), sometimes relief (feared selling doesn’t materialize — the fear was pre-sold). The edge is not “short every expiry”; it is knowing the *date, the float math, and who holds what* while others stare at the chart.

**Secondaries.** After lockup, companies and insiders can run **secondary offerings** — organized block sales of new or insider shares, usually priced at a discount. Each new-share secondary dilutes existing holders (Tier 3’s share-count lesson); each insider secondary is disclosed conviction data.

**The verdict.** Jay Ritter’s IPO datasets — the academic standard — show **most IPOs lag the market over the following 3–5 years** *[fact — see Ritter’s data; magnitudes vary by cohort]*. Mechanically sensible: IPOs are sold at maximum narrative, by informed sellers, when conditions favor sellers. You now hold the complete lifecycle: **Gate exam 2 is narrating SPCX from S-1 to lockup, naming who paid whom at every step.**

**TEACH-BACK:** Narrate the full IPO lifecycle — S-1, roadshow, allocation, pop, greenshoe, quiet period, lockup, expiry — in ~8 sentences, naming who benefits at each step.

**FLASHCARDS:**
- **Two outcomes at lockup expiry** → Cliff (supply overwhelms) or relief (selling was pre-positioned) — the edge is knowing date, float, and holders.
- **Secondary offering** → Post-IPO organized share sale — new shares dilute holders; insider blocks reveal conviction.
- **Ritter’s finding on IPO returns** → Most IPOs lag the market over 3–5 years post-listing — informed sellers pick the timing.

**QUIZ:**
1. The long-run pattern in Ritter’s IPO data is that typical IPOs…
   - A. Beat the market for years
   - ✅ B. Lag the market over the following 3–5 years
   - C. Match the market exactly
   - D. Cannot be measured
   - _Explanation:_ IPOs are timed and priced by informed sellers at peak narrative — the average aftermath underperforms.
2. A company issues 20% more shares in a secondary. Your ownership per share…
   - A. Is unchanged
   - ✅ B. Is diluted — your % claim shrinks
   - C. Increases
   - D. Doubles
   - _Explanation:_ More slices of the same pizza. Dilution is the silent tax tracked in Tier 3.

---
# TIER 3 · READING THE MONEY  `[T3]`
_Financial statements — the load-bearing skill of the whole program._  · 8 lessons

## T3.1 — The three statements: opinion, position, truth  `id: t3_three`

**PREDICT (shown before the lesson unlocks):** A company can legally report a profit while its bank account drains toward zero. Which document would expose that — and why can the “profit” number diverge from cash?

**LESSON:**

Every public company files three linked statements. Learn their personalities:

**Income statement — the opinion.** Revenue, costs, profit over a period. Opinion, because accounting choices (when to count a sale, how fast to depreciate) shape the numbers within legal bounds.

**Balance sheet — the position.** A snapshot: what the company owns (assets), owes (liabilities), and the remainder (equity). The freeze-frame of financial standing.

**Cash flow statement — the truth.** Actual dollars entering and leaving the bank account. Cash is brutally hard to fake: it is either there or it is not.

They interlock: profit from the income statement flows into equity; cash movements reconcile to the balance sheet’s cash line. The load-bearing skill of this tier is **triangulation** — when reported profit rises but cash keeps falling, the gap is where questions (and frauds) live. Who benefits from you reading all three? You — the whole disclosure regime exists so outsiders can check the story against the cash.

**TEACH-BACK:** Explain the three statements as opinion / position / truth to a beginner, and why profit and cash can diverge, in 5 sentences.

**FLASHCARDS:**
- **The three statements, one word each** → Income statement: opinion. Balance sheet: position. Cash flow: truth.
- **Why the income statement is “opinion”** → Legal accounting choices (revenue timing, depreciation) shape profit within bounds.
- **The first red-flag pattern** → Reported profit rising while operating cash falls — the gap is where questions live.

**QUIZ:**
1. The statement hardest to dress up is the…
   - A. Income statement
   - B. Balance sheet
   - ✅ C. Cash flow statement
   - D. Press release
   - _Explanation:_ Cash in the bank either exists or it does not. Opinions live upstream of it.
2. Profit up three years straight, operating cash flow down three years straight. Correct response…
   - A. Celebrate growth
   - ✅ B. Investigate the divergence — profit is opinion, cash is truth
   - C. Ignore both
   - D. Check the stock chart
   - _Explanation:_ Triangulation is the skill: divergence between opinion and truth is the tell.

## T3.2 — The income statement line by line — and where revenue is gamed  `id: t3_income`

**PREDICT (shown before the lesson unlocks):** A software firm signs a 3-year, $36M contract today. How much revenue is it entitled to report THIS quarter — and how might a desperate one report more?

**LESSON:**

Top to bottom: **Revenue** (sales) → minus **cost of goods sold** = **gross profit** → minus operating expenses (R&D, sales, admin) = **operating income** → minus interest and taxes = **net income**, the famous “bottom line.” Each level asks a different question: is the product itself profitable (gross)? Is the business machine profitable (operating)? After financing and the taxman (net)?

**Revenue recognition** is where games begin, because revenue is counted when *earned*, not when cash arrives. The $36M/3-year contract should be recognized ~$3M per quarter as service is delivered. Aggressive management pulls tomorrow into today: booking future periods early, stuffing distribution channels with product (“channel stuffing”), or counting barter and round-trip deals as sales.

The detector you already own: revenue recognized without cash arriving piles up as **accounts receivable** (owed but unpaid). **Receivables growing much faster than revenue** is the classic tell that reported sales are running ahead of reality. Who benefits from aggressive recognition? Executives paid on growth — this quarter, on whose watch the music must not stop.

**TEACH-BACK:** Walk down the income statement’s levels in plain words, then explain channel stuffing and its receivables tell, in 6 sentences.

**FLASHCARDS:**
- **Gross vs. operating vs. net income** → Product profitability → business-machine profitability → after interest and taxes.
- **Revenue recognition principle** → Counted when earned, not when cash arrives — the gap is where aggression hides.
- **The classic revenue red flag** → Accounts receivable growing much faster than revenue — sales booked ahead of cash reality.

**QUIZ:**
1. Revenue +10% this year; accounts receivable +45%. The mechanical concern is…
   - A. Healthy demand
   - ✅ B. Sales are being booked well ahead of collection — recognition may be aggressive
   - C. Too much cash
   - D. Low margins
   - _Explanation:_ Uncollected sales piling up faster than sales themselves is the textbook recognition tell.
2. A $36M 3-year service contract signed today should produce roughly how much revenue this quarter?
   - A. $36M
   - B. $12M
   - ✅ C. $3M
   - D. $0 until fully paid
   - _Explanation:_ Earned as delivered: ~$36M ÷ 12 quarters = $3M. Booking more is pulling the future forward.

## T3.3 — The balance sheet: assets, debts, and goodwill’s memory  `id: t3_balance`

**PREDICT (shown before the lesson unlocks):** Company A has $2B cash, no debt. Company B has $50M cash and $3B of debt due next year. Same profits. Why might one of them not exist in 18 months?

**LESSON:**

The balance sheet obeys one identity: **assets = liabilities + equity.** Everything owned is funded by borrowing or by owners.

**Assets**, in order of nearness to cash: cash itself, receivables, inventory, then property and equipment. **Liabilities**: payables, and debt — where the detail that kills companies is the **maturity schedule**. Debt is not one number; it is a calendar. $3B due next year against $50M of cash means the company must borrow again *on the market’s terms, at the market’s mood* — survival outsourced to strangers (a mechanism Tier 12 shows detonating in 2008 and SVB 2023).

**Goodwill** deserves its own sentence: when a company buys another for more than its identifiable assets are worth, the overpayment is parked on the balance sheet as “goodwill.” It is **a memory of overpaying**, not a thing — and when reality disappoints, it gets “impaired” (written down), a delayed confession that the acquisition price was wrong. Who benefits from big goodwill? The sellers who were overpaid, and executives whose empires grew (Tier 10, M&A).

**TEACH-BACK:** Explain the accounting identity, why debt maturities matter more than debt totals, and what goodwill remembers, in 5 sentences.

**FLASHCARDS:**
- **The balance sheet identity** → Assets = liabilities + equity. Everything owned is funded by lenders or owners.
- **Why debt maturities beat debt totals** → Debt is a calendar — a wall of near-term maturities means refinancing at the market’s mercy.
- **Goodwill** → The parked overpayment from acquisitions — a memory of overpaying, confessed later as impairment.

**QUIZ:**
1. A large goodwill impairment announcement is management admitting…
   - A. Fraud
   - ✅ B. A past acquisition was overpaid — its assumed value was wrong
   - C. Cash was stolen
   - D. Nothing important
   - _Explanation:_ Impairment is the delayed write-down of an overpayment memory. The cash left in the original deal.
2. The balance-sheet detail most predictive of refinancing crisis is…
   - A. Total assets
   - ✅ B. The debt MATURITY schedule vs. available cash
   - C. Inventory levels
   - D. Share price
   - _Explanation:_ Companies die at maturities, not totals: obligations due soon against cash on hand.

## T3.4 — The cash flow statement: three doors, one number that matters  `id: t3_cash`

**PREDICT (shown before the lesson unlocks):** A company reports these cash flows — operating: −$400M, investing: −$100M, financing: +$600M. Describe in plain words how this company stays alive.

**LESSON:**

The cash flow statement sorts every dollar through three doors:

**Operating** — cash from actually running the business: collections from customers minus payments to suppliers and staff. The health meter.

**Investing** — cash spent on or received from long-term assets: capital expenditures (**capex**: factories, servers), acquisitions, asset sales.

**Financing** — cash from the money relationship itself: issuing or buying back shares, borrowing, repaying, dividends.

The pattern in the predict question is the burn profile: operations consume cash, and the company lives by selling stock or debt (+$600M financing). Legal, common for young firms — and a countdown clock whenever markets tighten.

The number that matters most in this entire tier: **free cash flow (FCF) = operating cash flow − capex.** The cash the machine generates after maintaining and growing itself — what could actually be paid to owners without shrinking the business. Profits are opinions about FCF’s future; FCF is the thing itself. Who benefits from FCF literacy? You — nearly every trap in Tier 7 depends on victims never checking this one line.

**TEACH-BACK:** Explain the three doors of cash and define free cash flow in plain words, then say why FCF beats “profit,” in 5 sentences.

**FLASHCARDS:**
- **Operating / investing / financing cash** → Running the business / long-term assets (capex, deals) / shares, debt, dividends.
- **Free cash flow** → Operating cash flow minus capex — cash the machine truly generates after sustaining itself.
- **The burn profile** → Negative operating cash funded by positive financing — alive on markets’ generosity, on a countdown.

**QUIZ:**
1. Operating +$800M, capex $300M. Free cash flow…
   - A. $800M
   - B. $1.1B
   - ✅ C. $500M
   - D. $300M
   - _Explanation:_ FCF = 800 − 300 = $500M.
2. Operating −$400M, financing +$600M year after year describes a company that…
   - A. Is self-sustaining
   - ✅ B. Survives by continually selling stock/debt — dependent on market conditions
   - C. Has no risk
   - D. Is shrinking
   - _Explanation:_ The business consumes cash; investors replenish it. Fine until the window closes.

## T3.5 — The dirty dozen: twelve numbers that describe any company  `id: t3_dozen`

**PREDICT (shown before the lesson unlocks):** You get 10 minutes and one filing to describe a company’s health to a professional. List the 5 numbers you’d pull first — then compare with the dozen.

**LESSON:**

Twelve metrics, four families — the standard extraction from any filing:

**Growth & margins:** (1) **revenue growth** — is the machine expanding; (2) **gross margin** — product profitability; (3) **operating margin** — whole-machine profitability.

**Cash reality:** (4) **free cash flow**; (5) **cash conversion** — how much of reported profit becomes actual cash (low = opinion outrunning truth); (6) **capex vs. depreciation** — spending above wear-and-tear = investing; below = quietly harvesting the asset base.

**Owner dilution & pay:** (7) **share count over time** — rising count is the silent tax on your slice; (8) **stock-based compensation** — real pay pretended away in “adjusted” profits.

**Strength & efficiency:** (9) **ROIC** (return on invested capital) — profit per dollar the business employs; (10) **interest coverage** — operating income ÷ interest owed, the survival ratio; (11) **net debt** — debt minus cash; (12) **backlog** — contracted future revenue, where visible.

Every teardown rep (see REPS) fills these twelve blanks. Fluency here is what “can read filings unassisted” means.

**TEACH-BACK:** Name the four families of the dirty dozen and give one metric per family with its plain-words meaning, in 6 sentences.

**FLASHCARDS:**
- **Cash conversion** → Share of reported profit that becomes operating cash — low conversion means opinion is outrunning truth.
- **Share count over time** → The dilution meter — a rising count silently shrinks every holder’s claim.
- **ROIC** → Profit generated per dollar of capital the business employs — the quality gauge of the machine.
- **Interest coverage** → Operating income ÷ interest due — how many times over the debt bill is earned. The survival ratio.

**QUIZ:**
1. Capex persistently BELOW depreciation suggests the company is…
   - A. Investing for growth
   - ✅ B. Quietly under-maintaining/harvesting its asset base
   - C. Fraudulent
   - D. Debt-free
   - _Explanation:_ Spending less than wear-and-tear means the machine is being consumed, not renewed.
2. Share count up 6%/yr while “EPS grows” via buyback headlines. Your claim on the business is…
   - A. Growing
   - ✅ B. Shrinking ~6%/yr — dilution is the silent tax
   - C. Unchanged
   - D. Doubling
   - _Explanation:_ Net count is what matters: issuance (mostly stock comp) can out-dilute the buyback press releases.

## T3.6 — The red-flags catalog  `id: t3_flags`

**PREDICT (shown before the lesson unlocks):** A company reports “record adjusted EBITDA” for the 6th straight year — while GAAP losses widen, its CFO just left, and its footnotes doubled in length. Rank these four facts by scariness.

**LESSON:**

The recurring patterns that precede write-downs, restatements, and zeros:

**Adjusted-EBITDA gymnastics.** “Adjusted” means “losses we ask you to ignore.” Compare adjusted profit to GAAP (rule-based) numbers; a chasm that never closes IS the finding. Stock-based comp “excluded” is real pay diluting you.

**Receivables outgrowing revenue** (the Tier 3 tell). **Serial “one-time” charges** — annual “exceptional” costs are just costs, laundered. **Footnotes lengthening** — complexity is where problems are parked; growing footnotes mean growing things to explain. **Auditor changes** — especially mid-controversy: the referee just quit the game. Add: CFO departures before results, related-party transactions, and guidance withdrawn.

Two disciplines: no single flag convicts — **flags cluster**, and three together outweigh any narrative. And label your findings honestly (fact / estimate / opinion) when you post them: “receivables grew 3× revenue” is fact; “this suggests channel stuffing” is opinion. Who benefits from the flags being boring to check? Every operator of Tier 7’s machines — boredom is their moat.

**TEACH-BACK:** Pick three red flags and explain each one’s mechanism — what the number does and what that implies — in 6 sentences.

**FLASHCARDS:**
- **“Adjusted EBITDA” translated** → Profit after ignoring the losses management prefers ignored — measure the gap to GAAP.
- **Serial one-time charges** → “Exceptional” costs appearing every year are ordinary costs being laundered.
- **Why flags cluster** → One flag is a question; three together outweigh any narrative. Convict on clusters.

**QUIZ:**
1. A company excludes stock-based compensation from “adjusted profit.” Mechanically, SBC is…
   - A. Truly free
   - ✅ B. Real pay funded by diluting shareholders — a genuine cost
   - C. A tax trick
   - D. Refundable
   - _Explanation:_ Employees are paid in your ownership. Excluding it hides a real transfer from holders to staff.
2. Mid-year auditor resignation plus a CFO exit before earnings is best read as…
   - A. Routine turnover
   - ✅ B. A serious cluster — the people who see the books are leaving them
   - C. Bullish
   - D. Meaningless
   - _Explanation:_ The referee and the scorekeeper quitting together is the cluster rule at its loudest.

## T3.7 — Skill drill: the 45-minute 10-K  `id: t3_10k`

**PREDICT (shown before the lesson unlocks):** A 10-K is 200+ pages and you have 45 minutes. In what order do you attack it, and which 150 pages do you skip on the first pass?

**LESSON:**

The **10-K** is the annual report filed with the SEC — the company’s full self-description, free on **EDGAR** (sec.gov). Reading one unassisted in 45 minutes is this program’s core rep (target: 50 by graduation).

**The order of attack:**

(1) **Risk factors** (~10 min) — skim past boilerplate (“markets may decline”) for the specific: customer concentration, debt walls, litigation, dependence on one supplier. Companies must confess here; the confessions hide among the disclaimers.

(2) **Cash flow statement** (~10 min) — truth first: operating trend, capex, FCF, and the financing door (raising or returning?).

(3) **Share count** (~5 min) — dilution trend across 3+ years.

(4) **Footnotes** (~15 min) — debt maturities, revenue recognition policy, related-party deals, commitments. Where bodies are buried.

(5) **MD&A** (~5 min) — management’s narrative, read *last*, so the numbers judge the story instead of the story framing the numbers.

Fill the dirty dozen as you go. First reps take 2 hours; by rep 20 you will genuinely be at 45 minutes — that speed is the compounding asset.

**TEACH-BACK:** Explain the 45-minute order of attack and WHY the story (MD&A) is read last, in 5 sentences.

**FLASHCARDS:**
- **The 10-K attack order** → Risk factors → cash flow → share count → footnotes → MD&A last.
- **Why MD&A goes last** → Numbers first, story second — so the data judges the narrative, not the reverse.
- **Where to find any 10-K free** → SEC EDGAR (sec.gov) — the primary source above all others.

**QUIZ:**
1. Reading management’s narrative FIRST risks…
   - A. Wasting time only
   - ✅ B. Anchoring on the story so the numbers get bent to fit it
   - C. Nothing
   - D. Missing the price
   - _Explanation:_ Anchoring is the failure mode. The discipline is numbers → then story, never the reverse.
2. In risk factors, the valuable material is…
   - A. The generic market warnings
   - ✅ B. Specific confessions: concentration, debt walls, disputes
   - C. The page count
   - D. The fonts
   - _Explanation:_ Boilerplate is camouflage; specificity is signal. Companies must disclose the real risks somewhere.

## T3.8 — Skill drill: the 90-minute S-1 and the teardown template  `id: t3_s1`

**PREDICT (shown before the lesson unlocks):** An S-1 is written by bankers to SELL the company. Which sections will be beautiful, and which two numbers can’t be beautified?

**LESSON:**

The **S-1** (Tier 2) is a sales document wearing a disclosure costume: glossy narrative up front, mandated truth in the back.90-minute attack: (1) **Use of proceeds** — funding growth, or cashing out insiders? (2) **Capitalization & dilution tables** — what insiders paid vs. what you’re asked to pay, and post-IPO share count including options. (3) **Financials** — burn profile: operating cash, runway, dependence on the raise. (4) **Risk factors** — the confessions. (5) **Lockup terms** — when the supply calendar fires (Tier 2). (6) **Principal stockholders** — who is selling into this deal. The unbeautifiable numbers: **cash burned** and **shares outstanding**.

**The teardown template** — every filing rep (10-K or S-1) produces one page: *Business in one sentence · the dirty dozen · three red flags checked · cash reality (FCF or burn/runway) · dilution trend · one thing management emphasized vs. one thing the numbers say · verdict: would I need to know more, and what exactly?* Each teardown ships as a post (see REPS). Fifty of these is the program’s odometer — and Gate 3 is passing a filing-excerpt exam: **is growth generating cash or consuming it, and who funds the gap?**

**TEACH-BACK:** List the six S-1 sections in attack order and the two numbers marketing cannot beautify, in 5 sentences.

**FLASHCARDS:**
- **S-1 in one phrase** → A sales document wearing a disclosure costume — narrative up front, mandated truth in back.
- **“Use of proceeds” tells you…** → Whether the IPO funds the business or cashes out insiders — growth story vs. exit event.
- **The teardown template’s verdict line** → Is growth generating cash or consuming it — and who funds the gap?

**QUIZ:**
1. An S-1 shows most proceeds going to selling shareholders, not the company. The deal is primarily…
   - A. A growth financing
   - ✅ B. An insider exit event
   - C. A debt repayment
   - D. A merger
   - _Explanation:_ Follow the proceeds: money to insiders means the IPO’s purpose is the door, not the fuel.
2. Gate 3’s core question about any filing is…
   - A. Is the CEO likable?
   - ✅ B. Is growth generating cash or consuming it, and who funds the gap?
   - C. Is the stock up?
   - D. How long is the 10-K?
   - _Explanation:_ That one question forces cash-flow literacy, funding analysis, and dilution awareness at once.

---
# TIER 4 · WHAT A PRICE MEANS  `[T4]`
_Valuation as reverse engineering: extract the future a price requires._  · 6 lessons

## T4.1 — Every price is a forecast — DCF as intuition, not spreadsheet  `id: t4_forecast`

**PREDICT (shown before the lesson unlocks):** Two identical machines each print $100/year. One is guaranteed for 30 years; the other MIGHT stop anytime. Should they cost the same? What two things besides the $100 set each machine’s worth?

**LESSON:**

A business is worth **the cash it will hand its owners over its lifetime, discounted for waiting and for risk.** That sentence is the entire theory of valuation (the “discounted cash flow” idea). Three dials: **how much cash**, **when** (later is worth less — a dollar today can compound), and **how certain** (risky dollars are worth less than sure ones).

Therefore: **every market price is a forecast, whether anyone built one or not.** Paying $1B for a company that produces $40M of free cash flow is a specific claim about decades of future cash — made by whoever set the marginal price, with or without thinking.

A warning against spreadsheet worship: a DCF model’s output swings wildly with tiny assumption changes, so precision is fake. Use DCF as a *lens* — cash, timing, risk — not an oracle. The operator’s move (next lessons) is the reverse: don’t compute “fair value”; **extract the forecast the current price already contains and judge whether that future is plausible.** Who benefits from prices-as-forecasts being invisible? Everyone selling stories priced for perfection.

**TEACH-BACK:** Explain the three dials of value (cash, timing, certainty) and why every price is a forecast, in 5 sentences a 12-year-old follows.

**FLASHCARDS:**
- **The whole theory of value in one sentence** → A business is worth its lifetime cash to owners, discounted for waiting and risk.
- **Why a dollar later is worth less than a dollar now** → Today’s dollar can compound in the meantime — delay has a price.
- **The correct use of DCF** → A lens (cash, timing, risk) — never an oracle; its precision is fake by construction.

**QUIZ:**
1. Same expected cash flows, but company B’s are far less certain. B should trade…
   - A. At the same price
   - B. Higher
   - ✅ C. Lower — risky dollars are discounted harder
   - D. At zero
   - _Explanation:_ Certainty is the third dial. Equal cash, more risk → less value.
2. “The market price contains a forecast” means…
   - A. Analysts wrote one
   - ✅ B. The price mathematically implies a path of future cash, whether or not anyone modeled it
   - C. Prices are random
   - D. Forecasts are illegal
   - _Explanation:_ Paying X for future cash IS a claim about that cash. The next lesson extracts the claim.

## T4.2 — Multiples: what P/E, P/S, and EV/EBITDA compress — and when they lie  `id: t4_multiples`

**PREDICT (shown before the lesson unlocks):** Stock A trades at 10× earnings, stock B at 40×. Name two legitimate reasons B might still be the better buy — and one reason A might be a trap.

**LESSON:**

A **multiple** compresses the whole forecast into one ratio. **P/E**: price ÷ earnings — years of current profit you’re paying upfront. **P/S**: price ÷ sales — used when profits don’t exist yet (weakest, most abusable). **EV/EBITDA**: enterprise value (market cap + net debt) ÷ cash-ish operating earnings — includes the debt, so it prices the whole machine, not just the equity slice.

What a multiple hides is everything that matters: **growth, margins, risk, and capital needs.** 40× for a compounder growing 30%/yr with fortress margins can be cheaper than 10× for a melting-ice-cube — the 10× is “cheap” because the market forecasts decline (a **value trap**).

When multiples lie: cross-industry comparisons (software vs. steel have different margin physics), peak-cycle earnings (the E is temporarily fat, so the P/E looks innocent at the top — cyclicals look cheapest at peaks), and P/S on low-margin businesses. Who benefits from multiple confusion? Screeners of “cheap” lists and sellers of “only 5× sales!” stories alike. A multiple is shorthand for a forecast — always decompress it before trusting it.

**TEACH-BACK:** Explain what a P/E of 25 literally means, and why a 10× stock can be more expensive than a 40× one, in 5 sentences.

**FLASHCARDS:**
- **P/E, in plain words** → How many years of current earnings you pay upfront for the claim.
- **Why EV/EBITDA includes debt** → Enterprise value prices the whole machine — equity plus the debt the buyer effectively assumes.
- **Value trap** → A low multiple that is “cheap” because the market correctly forecasts decline.

**QUIZ:**
1. Cyclical companies often look CHEAPEST on P/E exactly at…
   - A. Recessions
   - ✅ B. The peak of their cycle — earnings are temporarily fat
   - C. IPO day
   - D. Random times
   - _Explanation:_ Peak E shrinks the ratio just before E collapses. The multiple lied via its denominator.
2. Comparing a software company’s P/S to a grocery chain’s P/S is misleading because…
   - A. Groceries are older
   - ✅ B. Their margin structures differ completely — a dollar of sales converts to profit very differently
   - C. P/S is illegal
   - D. Software has no sales
   - _Explanation:_ Multiples only compare like machines. Cross-industry ratios compare apples to forklifts.

## T4.3 — Expectations investing: extract the future the price requires  `id: t4_expectations`

**PREDICT (shown before the lesson unlocks):** A company is valued at $1.6T with ~$19B of trailing revenue. Roughly what must its future look like for buyers today to earn a normal return? Sketch the math before revealing.

**LESSON:**

The operator’s core valuation move (Mauboussin’s *Expectations Investing*): **don’t predict the future — extract the future the current price already requires, then judge its plausibility.**

Worked example *[illustrative arithmetic]*: $1.6T valuation on ~$19B revenue ≈ 84× sales. Suppose buyers want ~10%/yr for a decade — the company must be “worth” ~$4.1T by year 10. If a mature version earns a 25% net margin and trades at 25× earnings, it needs ~$165B of earnings → **~$660B of revenue — roughly 35× today’s, a ~43%/yr growth rate sustained for a decade.**

Now the judgment: has ANY company of comparable scale ever done that? (Next lesson: base rates say almost never.) The price is not “wrong” — it is a specific, extractable bet. State it, then bet on or against its plausibility.

This inversion is the weekly rep from Tier 4 onward: one “What the Price Assumes” one-pager per week. It converts every hot ticker from a story into an auditable claim — which is exactly what a falsifiable public analysis account is built from.

**TEACH-BACK:** Walk through the reverse-engineering chain (price → required future value → required earnings → required revenue → required growth rate) for a made-up ticker, in 6 sentences.

**FLASHCARDS:**
- **Expectations investing in one sentence** → Extract the future the price requires; judge that future’s plausibility — never predict from scratch.
- **The extraction chain** → Price → required value at horizon → ÷ assumed multiple = required earnings → ÷ margin = required revenue → implied growth rate.
- **Why this beats “fair value” models** → It converts any price into a specific, checkable claim instead of a subjective target.

**QUIZ:**
1. A stock at 84× sales is best understood as…
   - A. A scam
   - ✅ B. A specific bet that revenue/margins must multiply enormously — extract and judge it
   - C. Cheap if it grows
   - D. Unanalyzable
   - _Explanation:_ Every price implies a path. The job is stating the path and checking it against history.
2. The weekly Tier-4 rep is…
   - A. Predicting price targets
   - ✅ B. A “what the price assumes” one-pager: implied future vs. base rates
   - C. Day trading
   - D. Reading news
   - _Explanation:_ One extraction per week — the auditable core of published analysis.

## T4.4 — Base rates: how often does the required future ever happen?  `id: t4_baserates`

**PREDICT (shown before the lesson unlocks):** Of all large companies in history that were priced for 20%+ annual growth lasting a decade, roughly what fraction delivered it — most, some, or almost none?

**LESSON:**

A **base rate** is history’s answer to “how often does this actually happen?” — judging your specific case against the full population of similar cases, not against the story in front of you.

The market’s most expensive base-rate fact: **sustained hypergrowth is astonishingly rare.** Studies of thousands of companies (Mauboussin’s base-rate work) show only a small minority sustain 20%+ revenue growth for a decade — and the bigger the base, the rarer it gets *[fact — see Mauboussin’s published base rates]*. Yet in every boom, *dozens* of companies are simultaneously priced as if each will be the exception. They cannot all be — the arithmetic forbids it.

Why the error persists: stories are vivid and singular (“this one is different because…”), base rates are dull and statistical. Vividness wins psychologically and loses financially. The inside view (this company’s narrative) must be disciplined by the outside view (what happened to the last 500 companies priced this way).

Who benefits from ignored base rates? Sellers at hype prices. The rep: every expectations one-pager ends with one line — *“the price requires X; historically X has happened in roughly Y% of comparable cases.”* That sentence is the entire edge.

**TEACH-BACK:** Define base rate, then explain why 30 companies can’t all be “the next exception,” in 5 sentences.

**FLASHCARDS:**
- **Base rate** → The historical frequency of an outcome across all comparable cases — the outside view.
- **The hypergrowth base rate** → Only a small minority of large companies sustain 20%+ growth for a decade — rarer as size grows.
- **Inside vs. outside view** → The vivid story of this case vs. the statistics of all similar cases — discipline the first with the second.

**QUIZ:**
1. During booms, dozens of firms are priced for decade-long hypergrowth simultaneously. Base rates say…
   - A. All will deliver
   - ✅ B. Most cannot — the historical frequency of that outcome is far too low
   - C. Base rates changed
   - D. Growth is guaranteed by size
   - _Explanation:_ Pricing many exceptions at once contradicts the measured rarity of exceptions.
2. The correct closing line of an expectations one-pager is…
   - A. A price target
   - ✅ B. “The price requires X; X has historically occurred in ~Y% of comparable cases”
   - C. A buy rating
   - D. A meme
   - _Explanation:_ Claim plus base rate — specific, checkable, and falsifiable.

## T4.5 — TAM math and “just 1% of a huge market”  `id: t4_tam`

**PREDICT (shown before the lesson unlocks):** A pitch says: “The market is $10 trillion. If we capture just 1%, that’s $100B of revenue.” This is the oldest pitch in finance. Find at least two things wrong with it.

**LESSON:**

**TAM** — total addressable market — is the claimed size of the pond. TAM abuse is the most durable pitch structure in capitalism: name an enormous pond, claim a “conservative” sliver, multiply.

What’s wrong with “just 1%”: (1) **Market share is taken, not granted** — someone currently owns every dollar of that spend and will fight for it; there is no unclaimed 1% sitting in a drawer. (2) **TAM inflation** — defining a coffee shop’s market as “global food and beverage” instead of “coffee within 2 miles.” Interrogate the definition before the number. (3) **Revenue ≠ value** — capturing revenue at negative margin destroys value; the pitch skips costs entirely. (4) Small percentages *feel* humble — that feeling is the product. “Only 1%” frames a heroic assumption as modesty.

Flip it into a tool: honest TAM analysis asks *who owns the spend today, why customers would switch, at what cost of acquisition, against what competitive response.* Who benefits from TAM theater? Whoever is raising money at the multiple the big number justifies — founders, promoters, and the banks pricing the round (Tier 2).

**TEACH-BACK:** Explain why “1% of a huge market” is a heroic claim disguised as a humble one, in 5 sentences.

**FLASHCARDS:**
- **TAM** → Total addressable market — the claimed size of the pond, often inflated by definition games.
- **The core flaw of “just 1%”** → Every dollar of a market is already owned and defended — share is taken, never granted.
- **The honest TAM questions** → Who owns the spend now, why would customers switch, at what acquisition cost, against what response?

**QUIZ:**
1. “1% of $10T” framing works psychologically because…
   - A. The math is wrong
   - ✅ B. Small percentages make a heroic assumption feel conservative
   - C. 1% is easy to win
   - D. TAMs are audited
   - _Explanation:_ The modesty is the costume; the assumption (displacing entrenched competitors at scale) is heroic.
2. The first question to ask about any TAM number is…
   - ✅ A. Who computed the market’s definition and how inflated is it?
   - B. Is it big?
   - C. Is it growing?
   - D. Is it round?
   - _Explanation:_ Definition precedes arithmetic — “global beverages” vs. “nearby coffee” changes everything downstream.

## T4.6 — Great company ≠ great stock  `id: t4_great`

**PREDICT (shown before the lesson unlocks):** Everyone agrees a company is magnificent — best product, best margins, obvious winner. Why might buying it still lose money for a decade? What is already inside the price?

**LESSON:**

The tier’s closing law: **the price already contains the greatness.** A stock is not a vote on company quality; it is a bet on reality versus the expectations embedded at your purchase price (Tier 4, lesson 1). A magnificent company priced for magnificence offers no edge — merely meeting sky-high expectations earns ordinary returns, and slight disappointment gets punished savagely.

History’s cleanest proof is Tier 12’s Nifty Fifty: America’s finest companies of the early 1970s — many did fine as *businesses* for decades — yet buyers at peak multiples waited 10+ years to break even. Right about the company, wrong about the entry, wrong outcome.

Symmetrically: a mediocre business priced for death can be a fine stock the moment reality is merely bad instead of fatal. **Returns live in the gap between expectations and reality, not in quality itself.**

Who benefits from quality-worship? Sellers of obvious excellence at full price — “it’s the best company” closes retail buyers who never checked what the price assumes. Gate 4 is the antidote made habit: take a real ticker, state with math what its price assumes, cite the base rate.

**TEACH-BACK:** Using the Nifty Fifty, explain how buyers of genuinely great companies still lost a decade, in 5 sentences.

**FLASHCARDS:**
- **The closing law of Tier 4** → Returns come from the gap between embedded expectations and delivered reality — not from quality alone.
- **Why great-priced-for-great earns ordinary returns** → Meeting expectations that are already in the price is, by definition, unsurprising.
- **The Nifty Fifty lesson** → Great businesses bought at peak multiples cost buyers a decade — right company, wrong price.

**QUIZ:**
1. A flawless quarter from a stock priced for flawlessness typically produces…
   - A. A huge rally
   - ✅ B. An ordinary/muted reaction — perfection was already the assumption
   - C. A crash
   - D. A dividend
   - _Explanation:_ No gap between expectation and delivery, no excess return. The bar was pre-loaded.
2. Where do stock returns structurally come from?
   - A. Company quality
   - B. Brand fame
   - ✅ C. The gap between what the price assumed and what reality delivered
   - D. Trading volume
   - _Explanation:_ Quality already priced is neutralized. Only the expectation gap pays.

---
# TIER 5 · CYCLES & MACRO  `[T5]`
_Rates, credit, bubbles, reflexivity — the tide under every boat._  · 6 lessons

## T5.1 — Interest rates as gravity  `id: t5_rates`

**PREDICT (shown before the lesson unlocks):** Rates rise from 1% to 5%. Two stocks: a bank earning steady profits TODAY, and a startup whose profits arrive in year 10+. Which valuation falls harder, and why — mechanically?

**LESSON:**

Recall the anchor (Tier 0): every asset competes with the risk-free yield. Discounting is the machine that enforces it — a dollar due in 10 years is worth today’s dollars *divided by (1 + rate)¹⁰*. At 1%, $1 in year 10 is worth ~$0.90 today; at 5%, ~$0.61 *[arithmetic]*. The farther away the dollar, the harder the rate bites.

Hence **duration**: assets whose cash arrives mostly in the distant future are “long-duration” and swing hardest when rates move. The profitable-today bank’s value barely moves; the year-10 startup’s value collapses ~a third on the same rate change — *with zero change in the business itself*. This is why unprofitable growth stocks fell 60–80% in 2022’s rate shock while boring cash-cows held (Tier 12).

Buffett’s line compresses it: **interest rates act on asset prices like gravity acts on matter.** Low rates = weak gravity = everything speculative floats; rising rates = gravity returns = the longest-duration promises fall first and furthest. Who benefits from understanding this? Anyone who reads a Fed meeting as a re-pricing of ALL future dollars — which is the next lesson.

**TEACH-BACK:** Explain discounting with the $1-in-year-10 example, then why “profits far away” means “falls hard when rates rise,” in 5 sentences.

**FLASHCARDS:**
- **Discounting** → Future dollars ÷ (1+rate)ⁿ = today’s value. Higher rates or longer waits shrink present value.
- **Duration (concept)** → How far in the future an asset’s cash sits — the farther, the more rate-sensitive the price.
- **Rates-as-gravity** → Low rates float speculative assets; rising rates pull hardest on the longest-dated promises.

**QUIZ:**
1. Rates jump 1% → 5%. With NO business change, the year-10-profits startup’s present value…
   - A. Rises
   - ✅ B. Falls far more than the profitable-today firm’s
   - C. Is unchanged
   - D. Doubles
   - _Explanation:_ Distant dollars are discounted exponentially harder — duration converts rate moves into price moves.
2. $1 arriving in year 10, discounted at 5%, is worth today about…
   - A. $1.00
   - B. $0.90
   - ✅ C. $0.61
   - D. $0.10
   - _Explanation:_ 1 ÷ 1.05¹⁰ ≈ 0.61. At 1% it was ~0.90 — the same dollar, re-priced by gravity.

## T5.2 — The Fed from zero  `id: t5_fed`

**PREDICT (shown before the lesson unlocks):** One committee’s eight-meetings-a-year decision moves every market on Earth within seconds. What exactly do they decide, and through what plumbing does it propagate?

**LESSON:**

The **Federal Reserve** is the U.S. central bank with a dual mandate from Congress: **stable prices** (inflation ~2% target) and **maximum employment**. The two conflict at the edges — cooling inflation means restraining the economy — and policy is the lean between them.

The tools: (1) **The federal funds rate** — the overnight rate banks pay each other, which the Fed steers. Every other rate (mortgages, corporate debt, the Treasury anchor) prices off this floor; moving it re-runs Tier 5’s gravity on everything. (2) **Balance-sheet operations** — QE: the Fed creates reserves and buys bonds at scale, pushing yields down and cash into the system; QT: the reverse, draining it (mechanics deepened in Tier 9). (3) **Words** — “forward guidance”: because markets price the *future* path, a sentence about intentions moves trillions before any action.

“Liquidity,” mechanically, means how much money is available to chase assets — Fed policy is its master valve. Who benefits from Fed literacy? Anyone who understands that **markets trade the gap between the expected path and the announced path** — a hawkish surprise re-prices everything, a fully expected hike moves nothing (Tier 4’s expectations logic, applied to policy).

**TEACH-BACK:** Explain the dual mandate, the funds rate, QE/QT in one sentence each, and why a SURPRISE matters more than a hike, in 6 sentences.

**FLASHCARDS:**
- **The Fed’s dual mandate** → Stable prices (~2% inflation) and maximum employment — policy leans between them.
- **Why the funds rate moves everything** → It is the floor rate the entire curve prices off — moving it re-runs gravity on all assets.
- **QE vs. QT, mechanically** → QE: create reserves, buy bonds, push liquidity in. QT: let holdings roll off, drain it.

**QUIZ:**
1. A fully expected 0.25% hike lands. Markets barely move because…
   - A. Rates don’t matter
   - ✅ B. The expected path was already priced — only surprises re-price (expectations logic)
   - C. The Fed was ignored
   - D. Volume was low
   - _Explanation:_ Prices contain forecasts of policy too. The gap between expected and actual is what trades.
2. “Liquidity,” in plain mechanical terms, is…
   - A. Trading volume
   - ✅ B. How much money is available to chase assets — with Fed policy as the master valve
   - C. Bank branch count
   - D. A feeling
   - _Explanation:_ More available money bidding = richer asset prices, and vice versa. QE/QT turn the valve.

## T5.3 — The credit cycle and Minsky’s three stages  `id: t5_credit`

**PREDICT (shown before the lesson unlocks):** Banks lend freely → asset prices rise → collateral looks safer → banks lend more freely. What eventually breaks this loop — and in which direction does it then run?

**LESSON:**

The **credit cycle** is the economy’s breathing: lending standards loosen → borrowed money bids up assets → richer collateral makes lenders feel safer → standards loosen further. The loop is self-reinforcing in both directions — one default cycle reverses it: losses → tightened standards → forced sales → falling collateral → more tightening. Credit expands gradually and contracts violently.

**Minsky’s ladder** names the decay of borrower quality as good times persist: **Hedge finance** — income covers interest and principal (sound). **Speculative finance** — income covers interest only; principal must be rolled over (dependent on refinancing windows staying open — Tier 3’s maturity walls). **Ponzi finance** — income covers neither; the borrower survives only if the asset’s *price* keeps rising. Stability itself breeds the instability: the longer nothing fails, the further down the ladder the system slides — until the “Minsky moment,” when price stops rising and Ponzi positions must liquidate at once.

Who benefits from reading the cycle? Lenders exiting early, and buyers holding cash at the violent end. The gauge that tells you where you are — credit spreads — is Tier 9’s first lesson.

**TEACH-BACK:** Explain the credit loop in both directions, then Minsky’s hedge/speculative/Ponzi stages with one example each, in 6 sentences.

**FLASHCARDS:**
- **The credit loop** → Loose lending → higher asset prices → safer-looking collateral → looser lending. Reverses violently.
- **Minsky’s three stages** → Hedge: income covers debt. Speculative: covers interest only, must refinance. Ponzi: needs rising prices to survive.
- **Why stability breeds instability** → The longer nothing fails, the more the system migrates toward Ponzi finance — until price stops rising.

**QUIZ:**
1. A borrower who can pay interest but must refinance principal forever is, in Minsky’s terms…
   - A. Hedge
   - ✅ B. Speculative — alive only while refinancing windows stay open
   - C. Ponzi
   - D. Risk-free
   - _Explanation:_ Speculative finance outsources survival to future credit conditions.
2. Credit contractions are more violent than expansions because…
   - A. Banks are cruel
   - ✅ B. Losses force sales that sink collateral, which forces more tightening — the loop compounds downward
   - C. Rates are high
   - D. Volume drops
   - _Explanation:_ The same feedback that inflated gently deflates all at once when it reverses.

## T5.4 — Bubble anatomy: Kindleberger’s five acts  `id: t5_bubble`

**PREDICT (shown before the lesson unlocks):** List history’s bubble stages in order from a genuine new technology to a crash. Who is buying — and who is quietly selling — in the final euphoric act?

**LESSON:**

Kindleberger’s *Manias, Panics, and Crashes* found the same five-act script across four centuries:

**1 · Displacement.** A genuine change arrives — railroads, the internet — real, and really underestimated at first. **2 · Boom.** Prices rise on true adoption; credit expands (Tier 5 loop); early skeptics convert. **3 · Euphoria.** Price becomes the evidence; “new era” logic dismisses base rates (Tier 4); leverage proliferates; taxi drivers give tips. Volume and coverage peak (Tier 1 media). **4 · Distribution.** The quiet act: informed holders — insiders, early money — sell *into* the enthusiasm while the public buys the dip. Watch filings, not speeches. **5 · Panic.** Credit turns (Minsky moment), leverage unwinds in cascades (Tier 2), price discovers the absence of bids.

The permanent trap: each act is obvious only in retrospect, because *the technology usually IS real* — railroads transformed the world AND ruined their 1840s shareholders. Real change and ruinous pricing coexist; the reps: 1929, dot-com, 2008 housing, SPACs 2021 (Tier 12 details each). Who benefits? Act-4 sellers — the people the next lesson’s live overlay asks you to watch.

**TEACH-BACK:** Name the five acts with one sentence each, and explain who sells to whom during distribution, in 6 sentences.

**FLASHCARDS:**
- **Kindleberger’s five acts** → Displacement → boom → euphoria → distribution → panic.
- **The signature of euphoria** → Price itself becomes the argument; “new era” logic retires base rates; leverage spreads.
- **Distribution** → Informed holders selling quietly into public enthusiasm — visible in filings, never in speeches.

**QUIZ:**
1. “The technology is real” and “this is a bubble” are…
   - A. Contradictory
   - ✅ B. Frequently both true — railroads and the internet were real AND ruinously priced
   - C. Both false
   - D. Unknowable
   - _Explanation:_ Displacement is genuine by definition. The bubble is in the pricing, not the physics.
2. During distribution, the mechanically telling data source is…
   - A. CEO interviews
   - ✅ B. Insider sale filings and secondary offerings — what informed holders DO
   - C. Price targets
   - D. Social sentiment
   - _Explanation:_ Act 4 is watched in disclosures. Enthusiastic words accompany quiet exits.

## T5.5 — Live overlay: the AI capex cycle [VERIFY]  `id: t5_ai`

**PREDICT (shown before the lesson unlocks):** Hyperscalers are spending historically enormous sums on AI infrastructure while AI revenue remains far smaller. Using the five acts and Minsky, where might this cycle sit — and what evidence would settle it?

**LESSON:**

Apply the toolkit to the live case — *every figure here is [VERIFY — time-sensitive]*: hyperscaler capex running at roughly $700B/yr, with ~75% AI-directed; AI revenue far behind the spend; the financing mix shifting from cash flow toward debt.

Run the checklist honestly. **Displacement:** real — the technology works and is being adopted. **Credit cycle:** debt-financed capex is the Minsky slide in progress: cash-funded buildout is hedge finance; debt-funded buildout dependent on future AI revenue is speculative, drifting Ponzi-ward if revenue lags long enough. **Expectations (Tier 4):** extract what suppliers’ and hyperscalers’ prices assume about AI revenue growth, and check the base rate. **Reflexivity (next lesson):** the spending itself creates the revenue being cited — vendors’ customers are funded by the boom they justify.

The disciplined frame, verbatim from the brief: **real technology AND bubble dynamics can both be true** — as with railroads and the internet, world-changing infrastructure can still ruin the capital that built it. Your job is not to declare “bubble/no bubble” but to **name the act, cite the evidence, and state a falsifier** — e.g., “if AI revenue reaches $X by [date], the speculative-finance read is wrong” — which is exactly Gate 5.

**TEACH-BACK:** Present the AI capex cycle both ways — the genuine-displacement case and the bubble-dynamics case — ending with one falsifier, in 6 sentences.

**FLASHCARDS:**
- **The AI capex facts to track [VERIFY]** → ~$700B/yr hyperscaler capex, ~75% AI-directed, revenue behind spend, financing shifting to debt.
- **The Minsky read of debt-funded capex** → Cash-funded = hedge; debt-funded awaiting future revenue = speculative, drifting toward Ponzi if revenue lags.
- **The disciplined verdict format** → Name the act + cite evidence + state a dated falsifier. Never a vibes-based “bubble/no bubble.”

**QUIZ:**
1. “Real technology AND bubble dynamics can both be true” is proven by…
   - A. Nothing
   - ✅ B. Railroads and the dot-com era — transformative tech that ruined its boom-time capital
   - C. Only theory
   - D. 2008 housing
   - _Explanation:_ Displacement is real in every great bubble. The ruin lives in the financing and the pricing.
2. A capex boom’s shift from cash-funded to debt-funded matters because…
   - A. Debt is cheaper
   - ✅ B. It moves the system down Minsky’s ladder — survival becomes dependent on future revenue arriving on schedule
   - C. Cash is obsolete
   - D. It reduces spending
   - _Explanation:_ The funding mix is the cycle’s position gauge. Debt-fed buildout awaiting revenue is speculative finance at scale.

## T5.6 — Reflexivity: prices change the fundamentals  `id: t5_reflex`

**PREDICT (shown before the lesson unlocks):** Standard theory: fundamentals drive prices. Find a mechanism running the OTHER way — where a rising stock price makes the company genuinely stronger.

**LESSON:**

Soros’s **reflexivity**: prices don’t just *reflect* fundamentals — they **change** them, creating feedback loops with no stable “true value” underneath.

The mechanisms, concretely: a high stock price lets a company **raise cheap capital** (sell fewer shares for more cash — Tier 2), **pay talent in valuable stock**, **acquire rivals with its own paper**, and borrow on better terms (richer collateral — Tier 5’s credit loop). The high price *manufactures* the strength that then justifies the price. Downward it is crueler: a collapsing price raises capital costs, spooks customers and recruits, triggers covenants — the falling price creates the failure it predicted. Banks are the pure case: believed-solvent is solvent; believed-doomed is doomed (SVB, Tier 12).

Live overlay tie-in: cheap AI-boom capital → more datacenter building → real revenue for suppliers → “fundamentals confirm the boom” → more cheap capital. The circle is genuine revenue AND self-funding narrative at once.

Consequences for the operator: “the market already knows everything” fails when the knowing changes the known; bubbles aren’t mere errors but self-feeding processes (act 2 → 3 fuel); and every thesis should ask — **does this price, if sustained, create or destroy its own justification?**

**TEACH-BACK:** Explain reflexivity with the cheap-capital mechanism upward and the bank-run mechanism downward, in 5 sentences.

**FLASHCARDS:**
- **Reflexivity** → Prices feed back into fundamentals — high prices manufacture strength, collapses manufacture failure.
- **The upward mechanisms** → Cheap equity raises, valuable stock comp, paper acquisitions, better borrowing terms.
- **The thesis question reflexivity adds** → Does this price, if sustained, create or destroy its own justification?

**QUIZ:**
1. A doubted bank with strong stated numbers can still die because…
   - A. Numbers lie
   - ✅ B. Belief drives withdrawals — the falling confidence creates the insolvency it feared
   - C. Regulators close it
   - D. Rates fell
   - _Explanation:_ Reflexivity’s dark side: for confidence-dependent institutions, the belief IS the fundamental.
2. A startup’s inflated stock price can become self-justifying by…
   - A. Magic
   - ✅ B. Funding cheap capital, talent, and acquisitions that build real strength
   - C. Fooling auditors
   - D. Reducing costs
   - _Explanation:_ Price → capital → capability → “fundamentals” → price. The loop is the lesson.

---
# TIER 6 · THE ELITE PLAYBOOK  `[T6]`
_Incentive literacy: what every big player is selling and forced to do._  · 6 lessons

## T6.1 — Hedge fund economics: 2-and-20, redemptions, career risk  `id: t6_hedge`

**PREDICT (shown before the lesson unlocks):** A hedge fund manager is certain a stock triples over five years, but her investors can withdraw their money every quarter and she is judged every single year. What is she actually forced to optimize for?

**LESSON:**

Recall Tier 1’s player census — now we open the hedge fund’s books. The fee model is **2-and-20**: roughly 2% of assets per year no matter what, plus 20% of any profits *[VERIFY — varies by fund]*. The 2% rewards gathering assets; the 20% rewards volatility of the right sign. But the binding constraint is the money itself: investors can **redeem** — pull their capital — usually quarterly.

A brilliant thesis that is right in three years but down this year triggers redemptions, and redemptions force the manager to **sell her best ideas at the worst possible time** to raise cash. Layer on **career risk**: a manager who trails her peers for a year loses clients and possibly her job, whether or not she is eventually proven right. Keynes’ line names the trap — it is better for reputation to fail conventionally than to succeed unconventionally.

Who pays whom? Investors pay the 2% regardless; the manager collects it by holding assets, not by being right. Who is forced to act? The manager — forced to **chase whatever is already working** (to avoid trailing peers) and forced to **sell into weakness** (to meet redemptions). Who benefits? The fund’s operators, paid on assets and short-term results, not on the long-run truth. The liberating consequence, built in this tier’s finale: the short horizon of the smartest people in the room is not a flaw you beat with more brains — it is a constraint you sidestep simply by not having their investors.

**WORKED EXAMPLE:** **Ex:** A fund buys a thesis at $50 expecting $150 by year five. It sinks to $35 in year one; nervous clients redeem 30%. To pay them, the manager must sell the very shares she believes are cheapest — locking the loss and abandoning the thesis. She was right about the company and wrong about surviving her own investors.

**TEACH-BACK:** Explain 2-and-20 and redemptions to a smart 12-year-old, and why a genius manager can be forced to sell what she loves most, in 5 sentences.

**FLASHCARDS:**
- **2-and-20** → ~2% of assets yearly regardless of performance + ~20% of profits [VERIFY] — the 2% rewards gathering assets, not being right.
- **What redemptions force** → Quarterly withdrawals mean a down year forces selling the best ideas at the worst time to raise cash.
- **Career risk (Keynes)** → Better for reputation to fail conventionally than succeed unconventionally — so managers chase what already works.

**QUIZ:**
1. A manager judged yearly and redeemable quarterly is most directly forced to…
   - A. Hold her best idea for a full decade
   - ✅ B. Chase what is already working and sell weakness to survive
   - C. Ignore her investors entirely
   - D. Buy only index funds
   - _Explanation:_ Constraints, not stupidity: short redemption windows and peer comparison punish being early and reward crowding into winners.
2. In “2-and-20,” the 2% management fee rewards a manager mainly for…
   - A. Beating the market
   - B. Taking large risks
   - C. Returning cash to clients
   - ✅ D. Gathering and holding assets regardless of performance
   - _Explanation:_ The 2% is charged on assets in all weather — the incentive is to accumulate and keep assets, separate from performance.

## T6.2 — VC mechanics: the power law, fund clocks, and talking the book  `id: t6_vc`

**PREDICT (shown before the lesson unlocks):** A venture capitalist tells the press her portfolio startup is “the future of everything.” Her fund is nine years into a ten-year life. What is she actually doing when she talks?

**LESSON:**

Venture capital funds buy stakes in private startups, and their structure dictates their behavior. Two features matter. First, the **power law**: most startups in a fund return roughly zero; a tiny few return the whole fund many times over. VCs are not trying to be right often — they hunt the rare 100x, so they need a few names to become enormous public stories. Second, the **fund clock**: a VC fund typically has a ~10-year life *[VERIFY]*, after which it must return cash to its own investors (the “limited partners”).

Here is the gap from Tier 3’s cash-vs-opinion lesson: between raising and returning, VCs report **markups** — paper valuations from the latest funding round — not cash. A startup marked at $10B has made nobody a dollar until there is an **exit**: an IPO or an acquisition. And an exit requires a **buyer**. As the fund clock runs down, the pressure to convert markups into real cash intensifies — which means the pressure to find buyers intensifies.

Who pays whom? Limited partners pay fees and wait; VCs earn fees plus “carry” (a cut of gains) only on realized exits. Who is forced to act? The VC — forced to manufacture the public enthusiasm that recruits the IPO and secondary buyers her clock requires (connect Tier 2’s IPO lifecycle and Tier 5’s distribution act). Who benefits? The fund, if it exits before the music stops. That confident TV appearance is not analysis — it is inventory marketing to the buyers she is structurally required to find. The markup is an opinion; the exit is the truth; and you, the public, are the exit.

**WORKED EXAMPLE:** **Ex:** A fund invests $5M for 20% of a startup. Later rounds mark that stake to $400M — a spectacular number that is still just an entry in a spreadsheet. Only when the company lists and the fund sells does paper become money. The louder the pre-IPO story, the more buyers assemble to make that conversion possible.

**TEACH-BACK:** Explain the power law, the fund clock, and why “markups are not cash” to a smart 12-year-old, in 5 sentences.

**FLASHCARDS:**
- **The power law** → Most startups return ~zero; a few rare 100x names carry the whole fund — so VCs hunt giant public stories.
- **Markups vs. cash** → A startup’s rising private valuation is paper opinion until an exit; nobody is paid until shares are actually sold.
- **Why VCs talk their book** → A ~10-year fund clock forces exits, and exits need buyers; loud pre-IPO optimism recruits them.

**QUIZ:**
1. A VC’s portfolio company is marked at $2B in its latest round. Mechanically, this markup is…
   - ✅ A. A paper valuation that pays no one until an exit
   - B. Cash already in the fund’s bank
   - C. A locked-in IPO price
   - D. A dividend
   - _Explanation:_ Markups are opinion (Tier 3) — only a sale converts them to cash. The exit, not the mark, is the truth.
2. A VC grows loudly optimistic in public right before her startup’s IPO because…
   - A. She simply enjoys attention
   - B. Regulators require the statement
   - ✅ C. Her fund clock forces exits, and exits require buyers she must recruit
   - D. The company’s fundamentals just changed
   - _Explanation:_ Fund structure forces realized exits; talking the book assembles the buyers those exits depend on.

## T6.3 — Insider literacy: Form 4s, 10b5-1, and the cleanest signal in finance  `id: t6_insiders`

**PREDICT (shown before the lesson unlocks):** A company’s CEO sells $20M of stock one week, and a director buys $200k with her own cash the next. Which trade tells you more about what they truly believe — and why?

**LESSON:**

Insiders — officers, directors, and big holders — know their company better than anyone, and the law forces them to leave footprints. When they trade, they must file a **Form 4** with the SEC (usually within two business days), disclosed free on EDGAR. A rare honest window into what the best-informed people do with their own money.

But the two directions are not equal. Insider **SELLS are ambiguous**: an executive might sell to buy a house, fund a divorce, diversify a fortune that is 90% one stock, or cover the tax bill on vesting shares. Worse, many sales run on **10b5-1 plans** — pre-scheduled selling programs set up months ahead, on autopilot, specifically so the sale carries no signal (and gives legal cover against insider-trading claims). A scheduled sale says almost nothing about belief.

Open-market **BUYS are different** — and are, mechanically, the cleanest signal in finance. An insider buying shares on the open market with her own after-tax cash has exactly one way to profit: the price must rise. There is no “I needed liquidity” story for voluntarily converting cash into more of a stock she is already overexposed to. She could diversify; instead she concentrates further.

Who benefits from you confusing the two? Anyone reassuring you that “insiders are always selling, that’s normal” — it is — while hoping you weight it as bearish. The disciplined read (this is the Tier 6 insider-scan rep): log open-market buys, especially **clusters** by multiple insiders, and treat routine and 10b5-1 sales as near-noise. Label honestly: “three directors bought on the open market” is fact; “they expect good news” is opinion — one insider can be wrong, and a buy is a data point, never a recommendation.

**WORKED EXAMPLE:** **Ex:** TSLA-style case: a single scheduled 10b5-1 sale by a founder makes headlines but was set months earlier on autopilot — signal ≈ zero. Contrast a cluster of directors each buying six figures on the open market in the same week: no autopilot, no liquidity excuse, only one way to win.

**TEACH-BACK:** Explain to a smart 12-year-old why an insider buying with her own money says more than an insider selling, in 5 sentences.

**FLASHCARDS:**
- **Form 4** → The SEC filing insiders must submit (usually within 2 business days) disclosing their trades — free on EDGAR.
- **Why insider sells are ambiguous** → Houses, divorce, taxes, diversification, or a pre-scheduled 10b5-1 autopilot plan — many motives unrelated to belief.
- **Why open-market buys are the cleanest signal** → Converting personal after-tax cash into more of an already-concentrated stock only pays if the price rises.

**QUIZ:**
1. A founder’s large stock sale runs through a 10b5-1 plan. As a belief signal, it is…
   - A. Strongly bearish
   - B. Illegal by design
   - C. Strongly bullish
   - ✅ D. Near-noise — it was pre-scheduled on autopilot
   - _Explanation:_ 10b5-1 plans are set months ahead specifically to carry no signal and provide legal cover. Scheduled selling says little about conviction.
2. The reason an open-market insider BUY is unusually informative is that…
   - A. Buys are legally mandated
   - ✅ B. It is the only insider action with essentially one motive — expecting the price to rise
   - C. Buys are tax-free
   - D. The company receives the cash
   - _Explanation:_ Selling has many innocent explanations; voluntarily concentrating further into your own stock with personal cash has essentially one.

## T6.4 — Sell-side ratings and buybacks vs. dilution: management’s true opinion  `id: t6_sellside`

**PREDICT (shown before the lesson unlocks):** Across all Wall Street analyst ratings on large stocks, “Buy” and “Hold” vastly outnumber “Sell.” If ratings were honest forecasts, what should the ratio look like — and what does the imbalance reveal?

**LESSON:**

Two of Wall Street’s and management’s truest tells, both hiding in plain sight.

**Sell-side analysts** work at investment banks and publish the Buy / Hold / Sell ratings you see quoted. Follow the money (Tier 2’s IPO conflict, generalized): the bank’s real revenue is investment banking — running IPOs, secondaries, and M&A for the very companies the analysts rate. A “Sell” insults a potential banking client and severs management’s access, so the incentive bends every rating upward. “Sell” ratings are rare; “Buy” ratings near-universal *[VERIFY current ratios]*. A near-unanimous Buy consensus is therefore not a forecast — it is an **incentive artifact**. “Hold” is often the real “sell,” and an explicit “Sell” is the analyst spending career capital.

**Buybacks vs. dilution** reveal management’s genuine opinion of its own stock — with cash, not words. A buyback (Tier 0) retires shares and is only smart if the shares are cheap. Dilution — issuing new shares, largely as stock-based comp — hands ownership away, which is cheapest to do when the stock is expensive. So watch what they DO. The tell that convicts: companies that buy back aggressively at **peak** prices and stop buying in the crash are doing the exact reverse of “buy low” — burning owner cash to prop the stock (often near executive-comp targets), then vanishing when it is actually cheap.

Who pays whom? You pay attention to ratings the bank produces to win fees from the rated company. Who benefits? The bank (fees) and executives (a supported price near their option grants). The operator’s move: read ratings as marketing, and read **net share count over years** (Tier 3’s silent tax) as management’s real vote on its own price.

**WORKED EXAMPLE:** **Ex:** A company buys back $10B of stock at $90 in the boom, halts at $30 in the bust, then issues shares to raise cash near the bottom. That is buy-high, sell-low with the owners’ money — the opposite of what the buyback story claims, and a truer read of management than any slide deck.

**TEACH-BACK:** Explain to a smart 12-year-old why almost every analyst says “Buy,” and why a company buying its own stock only when it is expensive is a bad sign, in 5 sentences.

**FLASHCARDS:**
- **Why “Sell” ratings are rare** → Analysts work at banks that earn fees from the rated companies; a Sell insults a client, so ratings bend upward.
- **“Hold” often really means…** → Sell — the true negative rating, since an explicit Sell costs the analyst access and career capital.
- **Buybacks vs. dilution as a tell** → Buying back cheap = management thinks shares undervalued; issuing when high, or buying back at peaks, reveals the reverse.

**QUIZ:**
1. Near-unanimous “Buy” ratings across Wall Street are best understood as…
   - ✅ A. An incentive artifact — banks earn fees from the companies analysts rate
   - B. Careful independent forecasts
   - C. Proof that stocks always rise
   - D. A government mandate
   - _Explanation:_ The bank’s revenue is banking fees from those companies; a Sell severs the relationship, so ratings skew bullish structurally.
2. A company that buys back heavily at peak prices but stops in the crash is…
   - A. Buying low and selling high
   - ✅ B. Doing the reverse — burning owner cash high, then vanishing when shares are cheap
   - C. Reducing dilution wisely
   - D. Paying a hidden dividend
   - _Explanation:_ Buybacks only reward holders when shares are cheap. Buying high and stopping low is buy-high/sell-low with the owners’ money.

## T6.5 — Where 10-year capital lives, and lobbying you can read  `id: t6_private`

**PREDICT (shown before the lesson unlocks):** By the time a great private company’s story reaches the public, the largest and most patient investors have often already bought in years earlier. Where does that decade-long money actually live — and why does it get first look?

**LESSON:**

Most of the world’s truly patient capital never touches the public market you watch. It lives in pools built for decade-plus horizons: **sovereign wealth funds** (nations investing surpluses — Gulf and Norwegian funds, trillions each *[VERIFY]*), **family offices** (single wealthy families’ private investment arms), pensions and endowments, and dedicated private-equity and venture funds. Because this money is not redeemable quarterly (unlike Tier 6’s hedge funds), it can lock capital away for ten years and simply wait.

The mechanical consequence: **the best deals close in private, before the public hears the story.** A company raises billions from a sovereign fund and a few family offices in a private round; by the time it IPOs (Tier 2) and the media narrative arrives (Tier 1), the patient money is already in at a fraction of the price — and the IPO is partly their exit. The public is structurally last in line for both information and price. Not a conspiracy — a plumbing fact about where long-horizon money sits and who gets shown deals first.

**Lobbying and regulatory capture** is the same “who benefits” lens pointed at government. Companies spend on lobbying and donations, disclosed as line items in public records. Read them as an investment with an expected return: a firm spending tens of millions to shape a rule that protects its market or wins a subsidy is buying policy. “Regulatory capture” is when the industry effectively writes the rules meant to govern it. The tell is in the disclosures — follow which firms fund which policies and you can often see a moat being purchased before it shows up in the financials.

Who pays whom? The public provides late-stage exit liquidity to early private capital; taxpayers and competitors pay for captured regulation. The operator’s habit: treat lobbying disclosures and private-round investor lists as data, not trivia.

**WORKED EXAMPLE:** **Ex:** SPCX-style case *[VERIFY]*: sovereign funds and family offices bought private stakes years before any public listing, at valuations a fraction of the eventual IPO. When the public finally bought the story, part of what they were buying was the early private money’s exit.

**TEACH-BACK:** Explain to a smart 12-year-old where the most patient money lives, and why the public usually hears a company’s story last, in 5 sentences.

**FLASHCARDS:**
- **Where 10-year capital lives** → Sovereign wealth funds, family offices, endowments, and private funds — money not redeemable quarterly, able to wait a decade.
- **Why the public is last** → The best deals close in private rounds before the IPO and media arrive; the public often supplies the early money’s exit.
- **Regulatory capture, read from disclosures** → Lobbying and donation line items are an investment in favorable rules — follow them to see a moat being bought.

**QUIZ:**
1. Sovereign funds and family offices can buy decade-long private stakes mainly because their capital is…
   - A. Redeemable every quarter
   - B. Insured by governments
   - C. Borrowed cheaply
   - ✅ D. Not subject to short-term redemption — it can be locked away for years
   - _Explanation:_ Unlike hedge funds facing quarterly redemptions (Tier 6), this money’s long lock-up is exactly what lets it wait out a decade.
2. A company spending $40M a year lobbying for a rule that protects its market is best read as…
   - A. Pure charity
   - B. A civic duty with no return
   - ✅ C. An investment expected to return more than $40M via favorable policy
   - D. Irrelevant to investors
   - _Explanation:_ Follow the “who benefits” lens: lobbying is capital deployed for a policy return, disclosed in line items you can read.

## T6.6 — The liberating conclusion: time horizon is your only durable edge  `id: t6_edge`

**PREDICT (shown before the lesson unlocks):** Institutions have better data, faster computers, and smarter staff than you ever will. Given all that, what is the single edge a small operator has that no fund — however brilliant — can copy?

**LESSON:**

This tier’s payoff, and the reason the whole elite playbook is liberating rather than intimidating. Walk back through the census: hedge funds face quarterly redemptions and yearly career risk (forced to chase winners and sell weakness). VCs face a ten-year fund clock (forced to find exits). Sell-side analysts face banking relationships (forced to say Buy). Public-company managers face quarterly earnings (forced to hit the next print). Sovereign and family money is patient — but it lives behind private doors you cannot enter.

Notice the pattern: nearly every professional is **structurally short-term**, not from lack of intelligence but from the constraints wired into how they are paid and judged. Tier 1’s master key — constraints force behavior — applied to the whole industry yields one conclusion: the smartest people in the market are compelled to act on horizons of quarters, because their investors, clients, and bosses grade them on quarters.

That is the gap you own. A small operator with no clients, no redemptions, no fund clock, and no boss can do the one thing the entire professional apparatus is forbidden from doing: **wait**. You can hold through a two-year drawdown that would trigger a fund’s redemptions; you can buy the thing everyone must sell for structural reasons and hold it until the forced sellers are gone. This is Tier 0’s compounding lesson meeting Tier 1’s forced-flow lesson — time horizon is the amateur’s one durable, uncopyable edge.

Who benefits, finally? You — but only if you refuse to imitate the institutions. Most retail throws the edge away by trading like an impatient fund: checking prices hourly, chasing winners, panic-selling drawdowns — voluntarily adopting the constraints professionals are forced into while keeping none of their advantages. Stated plainly, as opinion grounded in structure: you will not out-data or out-compute the institutions; you can out-wait them. Gate 6 tests exactly this — for any public statement, name what the speaker is selling and what they are forced to do next quarter regardless of belief.

**TEACH-BACK:** Explain to a smart 12-year-old why a patient beginner can beat a genius fund manager at one specific thing, in 5 sentences.

**FLASHCARDS:**
- **Why institutions are structurally short-term** → Redemptions, fund clocks, banking ties, and quarterly earnings force quarter-length horizons regardless of intelligence.
- **The small operator’s one durable edge** → A long time horizon — no clients, no redemptions, no boss — the freedom to simply wait.
- **How retail throws the edge away** → Trading like an impatient fund (hourly checking, chasing, panic-selling) adopts institutions’ constraints while keeping none of their advantages.

**QUIZ:**
1. The reason nearly every market professional acts on short horizons is…
   - A. They are not intelligent
   - ✅ B. Structural constraints — redemptions, fund clocks, and quarterly grading force it
   - C. Regulations forbid patience
   - D. They dislike compounding
   - _Explanation:_ It is constraint, not IQ: how they are paid and judged compels quarter-length behavior — Tier 1’s master key, industry-wide.
2. A small operator’s most durable, uncopyable edge over institutions is…
   - A. Better data
   - B. Faster trading
   - ✅ C. A long time horizon — the freedom to wait through what forces others to sell
   - D. Access to private deals
   - _Explanation:_ You cannot out-compute funds, but you can out-wait them — the one thing their investors and clocks forbid.

---
# TIER 7 · THE TRAP CATALOG  `[T7]`
_Every liquidity-harvesting machine: mechanism, profit, mistake, tell._  · 6 lessons

## T7.1 — Traps 1 & 2: the IPO-pop chase and the lockup cliff  `id: t7_ipopop`

**PREDICT (shown before the lesson unlocks):** An IPO you have read about for weeks opens for trading up 60%. Buying now feels like joining a winner. Name who sold you that share, and what they know that you do not.

**LESSON:**

Two traps built on the IPO lifecycle (Tier 2), each dissected in this tier’s mandatory four parts.

**Trap 1 — the IPO-pop chase.** *Mechanism:* shares are allocated at the offer price to institutions; the stock opens far higher and media frames the pop as a winner worth joining. *Operator’s profit:* the allocation list sells its cheap offer-price shares into the public’s opening enthusiasm — the pop IS their payday, funded by you. *Victim’s mistake:* buying at the open, paying $45 for what informed buyers priced at $30 hours earlier, mistaking a first-day jump for momentum. *The tell:* you cannot get shares at the offer price, the first trade prints far above it, and coverage is euphoric — that combination means you are the exit, not the entry (Ritter’s data: IPOs tend to lag for years).

**Trap 2 — the lockup cliff (scheduled supply).** *Mechanism:* insiders hold most shares under a ~180-day lockup; on a known expiry date that supply can flood the tiny float. *Operator’s profit:* insiders and early VCs (Tier 6) finally convert a decade of paper into cash, diversifying rationally whatever they believe. *Victim’s mistake:* holding a thin-float darling into a public calendar date, puzzled when the chart sags on “no news” — the news was the date itself. *The tell:* it is in the S-1 — a small float, a huge locked share count, and a dated expiry any professional can read.

Who benefits across both? The allocation list and the insiders — the earliest, best-informed holders. Who pays? Whoever bought the story late: at the pop, or into the expiry. The unifying lesson: around a new listing, supply and information both favor the people already inside. Label your reads — “float is 12% and unlocks March 3” is fact; “it will fall” is opinion needing a date and a falsifier (Tier 8).

**WORKED EXAMPLE:** **Ex:** SPCX *[VERIFY]*: prices at the offer, opens sharply higher (Trap 1 — allocation list sells the pop), then months later the December lockup expiry releases insider supply into a small float (Trap 2). Same stock, two separate liquidity-harvest events, both printed on the public calendar.

**TEACH-BACK:** Explain the IPO-pop trap and the lockup-cliff trap to a smart 12-year-old, naming who sells to whom each time, in 5 sentences.

**FLASHCARDS:**
- **IPO-pop chase (mechanism + tell)** → The allocation list sells cheap offer shares into the opening jump; the tell is you cannot buy at the offer price and coverage is euphoric — you are the exit.
- **Lockup cliff (mechanism + tell)** → A known ~180-day expiry floods a tiny float with insider supply; the tell is in the S-1 — small float, huge locked count, dated expiry.
- **Who benefits around a new listing** → The earliest, best-informed holders (allocation list, insiders, early VCs); late story-buyers supply the cash.

**QUIZ:**
1. Buying a celebrated IPO at its first-day pop mechanically means buying…
   - A. At the offer price
   - B. Directly from the company
   - ✅ C. At a price informed institutions declined to pay hours earlier
   - D. Below fair value
   - _Explanation:_ The book priced it lower with full information; the pop is the allocation list’s payday, funded by public buyers.
2. A stock with a 12% float sags on “no news” as a known lockup date arrives. The cause is…
   - ✅ A. Scheduled supply — insider shares unlocking into a thin float
   - B. Accounting fraud
   - C. A short squeeze
   - D. A dividend cut
   - _Explanation:_ The expiry date IS the news: rational insider diversification (Tier 6) becomes dated, predictable selling pressure.

## T7.2 — Traps 3 & 4: SPAC promoter economics and pump-and-dump anatomy  `id: t7_spac`

**PREDICT (shown before the lesson unlocks):** A SPAC sponsor puts in a token amount and can walk away with ~20% of a company for it. Given that payoff, is the sponsor’s incentive to find a GOOD company, or just ANY company?

**LESSON:**

Two engineered liquidity machines, in the four-part format.

**Trap 3 — SPAC promoter economics.** A SPAC (“blank-check company”) raises public money first, then hunts a private company to merge with and take public. *Mechanism:* the sponsor buys “founder shares” for a nominal sum and receives roughly 20% of the SPAC’s equity — the “promote” — if any deal closes *[VERIFY terms]*. *Operator’s profit:* the sponsor’s ~20% is enormous and nearly free, and it pays out for completing ANY merger, not a good one. *Victim’s mistake:* buying the hype of a hot SPAC deal, absorbing the sponsor’s dilution and a rushed merger at a promoted valuation. *The tell:* a sponsor paid to close any deal, warrants and redemptions draining the trust, and projections stretching years out (SPACs could market forward projections in ways IPOs could not) *[VERIFY]*. The 2021 SPAC class is the graveyard — many EV and space names down 80-95% from their merger hype *[VERIFY]*.

**Trap 4 — pump-and-dump anatomy.** The classic five-stage machine on a small, thin stock (Tier 1’s thin-liquidity math). *Mechanism and stages:* (1) accumulation — operators quietly buy cheap; (2) seeding — planted stories and tips appear; (3) spike — coordinated promotion drives a thin float up fast; (4) distribution — operators sell into the frenzy they created; (5) bagholders — the crowd is left holding as the price collapses. *Operator’s profit:* they bought in stage 1 and sold in stage 4 — the run-up they engineered is their exit. *Victim’s mistake:* buying the spike, mistaking manufactured volume for genuine demand. *The tell:* a tiny company, a sudden coordinated wave of urgent promotion, and price detached from any filing (Tier 3).

Who benefits in both? The operator who structured the vehicle or the campaign. Who pays? The last buyers — bagholders by design. The through-line: when someone’s payout depends on YOU buying, the pitch is inventory, not analysis.

**WORKED EXAMPLE:** **Ex:** A 2021-class SPAC *[VERIFY]*: the sponsor collects ~20% for closing the merger, retail buys the projection-driven hype at the peak, and two years later the stock sits down ~90% — the promote paid regardless of the wreckage the public holds.

**TEACH-BACK:** Explain the SPAC sponsor’s ~20% promote and the five stages of a pump-and-dump to a smart 12-year-old, in 6 sentences.

**FLASHCARDS:**
- **SPAC promote (mechanism + tell)** → Sponsor gets ~20% of equity for a token sum if ANY deal closes; the tell is an incentive to close any merger plus years-out projections [VERIFY].
- **Pump-and-dump five stages** → Accumulation → seeding → spike → distribution → bagholders; operators buy stage 1 and sell stage 4.
- **The unifying tell** → When someone’s payout depends on you buying, the pitch is inventory being distributed, not analysis.

**QUIZ:**
1. A SPAC sponsor earning ~20% of equity for closing ANY merger is incentivized to find…
   - A. The best possible company
   - B. Nothing at all
   - C. The cheapest company
   - ✅ D. Any company that lets the deal close
   - _Explanation:_ The promote pays on deal completion, not deal quality — the incentive is to close something, whatever its price.
2. In a pump-and-dump, the operators’ profit comes from…
   - A. Patient long-term ownership
   - B. Company dividends
   - ✅ C. Buying during quiet accumulation and selling into the spike they engineered
   - D. The merger closing
   - _Explanation:_ Stages 1 and 4 are the trade: accumulate cheap, distribute into the manufactured frenzy; the crowd bagholds stage 5.

## T7.3 — Traps 5 & 6: influencer bag-dumping and “income” options sold to retail  `id: t7_influencer`

**PREDICT (shown before the lesson unlocks):** A large finance influencer posts nonstop about a small stock he “believes in,” and his posts move the price. What is the one small-print sentence you should hunt for before believing a word?

**LESSON:**

Two retail-facing machines, four parts each.

**Trap 5 — influencer bag-dumping.** *Mechanism:* an influencer with a large audience buys a small, thin stock (Tier 1), then promotes it heavily; the audience’s buying lifts the price. *Operator’s profit:* he sells his earlier, cheaper shares into the demand his posts create — his audience is his exit liquidity. *Victim’s mistake:* treating a paid or positioned promoter as an analyst, and buying a thin stock exactly when attention peaks (Tier 1’s media lesson). *The tell* — mandatory literacy — is the **disclosure**: hunt for “#ad,” “sponsored,” “I own,” or a buried “paid by the issuer” line. Anti-touting law (Tier 13) requires disclosing paid promotion; the fine print, or a sudden coordinated push by several accounts, is the tell. “Not financial advice” in a bio is a caption, not a shield.

**Trap 6 — options “income” strategies sold to retail.** *Mechanism:* courses and gurus market option-selling (Tier 2’s theta) as steady “income” — covered calls, cash-secured puts, the “wheel” — emphasizing the frequent small wins. *Operator’s profit:* the sellers of these programs profit from course fees, subscriptions, and the trading volume brokers pay for (Tier 2’s PFOF); the premium is real but small and capped, while the rare loss is large. *Victim’s mistake:* seeing many small green wins and mistaking pennies-in-front-of-a-steamroller for safe income — until one gap move erases months. *The tell:* “income” language attached to selling insurance, “monthly returns” shown without the tail losses, and an upsell to a course or paid group.

Who benefits in both? The promoter — via your buying (Trap 5) or your fees and churn (Trap 6). The through-line: when guidance comes from someone whose income depends on your action rather than your outcome, read the disclosure and the fine print first. Fact vs. opinion, always — “he posted #ad” is fact; “the stock will fall” is opinion needing a falsifier (Tier 8).

**WORKED EXAMPLE:** **Ex:** An influencer tweets a thin micro-cap ten times in two days; a buried “sponsored” tag sits under the thread — the posts spike a small float while he distributes (Trap 5). Separately, a “$500 a month selling puts” course shows twelve green months and never the thirteenth, when one crash gaps the position (Trap 6).

**TEACH-BACK:** Explain to a smart 12-year-old why to hunt for “#ad” before trusting a stock tip, and why “safe options income” hides a rare big loss, in 5 sentences.

**FLASHCARDS:**
- **Influencer bag-dumping (mechanism + tell)** → Promoter sells cheaper shares into the demand his posts create; the tell is the disclosure — “#ad,” “sponsored,” “paid by the issuer.”
- **Options “income” trap** → Selling options (theta, Tier 2) earns small capped premiums with a rare large loss; the tell is “income” language plus hidden tail losses and a course upsell.
- **The unifying rule** → When someone’s income depends on your action, not your outcome, read the disclosure and fine print before the pitch.

**QUIZ:**
1. Before trusting an influencer’s heavy promotion of a small stock, the first thing to find is…
   - ✅ A. The disclosure — “#ad,” “sponsored,” or “paid by the issuer”
   - B. His follower count
   - C. His past returns
   - D. The price chart
   - _Explanation:_ Anti-touting law requires disclosing paid promotion; the fine print reveals whether you are reading analysis or distribution.
2. “Selling options for monthly income” is risky mainly because…
   - A. Premiums are illegal
   - B. It never earns anything
   - C. Brokers ban the strategy
   - ✅ D. The small capped premiums hide a rare but large tail loss that can erase months of gains
   - _Explanation:_ You are selling insurance for pennies: many small wins, then one gap move pays out the large claim you underwrote.

## T7.4 — Traps 7 & 8: leverage cascades and narrative-peak entries  `id: t7_leverage`

**PREDICT (shown before the lesson unlocks):** Two mistakes: (a) using 5x leverage on a correct long-term thesis, and (b) buying a stock the week it is on every magazine cover. Both can lose everything. What do they share mechanically?

**LESSON:**

Two traps about staying power and timing, four parts each.

**Trap 7 — leverage liquidation cascades.** *Mechanism:* borrowed money (Tier 2’s margin) multiplies moves; a drop past a threshold triggers a margin call, and the broker force-sells at the worst moment; mass forced selling drives prices lower, triggering the next tier of liquidations. *Operator’s profit:* lenders collect interest in all weather; patient, unleveraged buyers collect the forced sellers’ inventory at cascade-low prices. *Victim’s mistake:* using leverage to express a view that is right eventually — but leverage converts “right eventually” into “broke first” (Tier 2), because the position is closed before the thesis plays out. *The tell:* rising margin balances, crowded leveraged positioning, and a market that falls in air pockets rather than lines — the mechanical signature of cascades.

**Trap 8 — narrative-peak entries.** *Mechanism:* coverage and attention peak AFTER the price has run (Tier 1’s media lesson); maximum bullish narrative marks the moment the marginal buyer is most likely already in. *Operator’s profit:* early holders and insiders distribute into the saturation (Tier 5’s distribution act) — the story is their exit channel. *Victim’s mistake:* mistaking peak coverage for opportunity and buying when everyone agrees, precisely when the forward return is worst. *The tell:* the stock is the #1 story everywhere, your barber and your feed agree, and the bullish case is “obvious” — maximum coverage has historically marked among the worst forward returns.

What they share (the predict answer): both are ways to be right about the destination and still lose — one because leverage ends the game before the thesis matures, the other because the price already contains the consensus (Tier 4’s “great company ≠ great stock” law). Who pays? The leveraged optimist and the late, confident buyer. Survival and timing beat conviction (Tier 0’s math).

**WORKED EXAMPLE:** **Ex:** NVDA-style narrative peak *[VERIFY]*: after a huge run and wall-to-wall AI-capex coverage (Tier 5), the confident late buyer pays for consensus already in the price. Add 3x leverage and an ordinary 15% dip becomes a margin-call liquidation — right about the trend, wiped out before it resumes.

**TEACH-BACK:** Explain to a smart 12-year-old why leverage and buying-at-peak-hype can both wipe out someone who was “right,” in 5 sentences.

**FLASHCARDS:**
- **Leverage cascade (mechanism + tell)** → Forced selling past a margin threshold begets lower prices and more forced selling; leverage turns “right eventually” into “broke first.”
- **Narrative-peak entry (mechanism + tell)** → Coverage peaks after the run, so max attention ≈ worst forward return; the tell is “everyone agrees” and it is the #1 story everywhere.
- **What both traps share** → Being right about the destination yet losing — ended by leverage, or overpaying for consensus already in the price.

**QUIZ:**
1. Leverage is dangerous even to a correct thesis because it…
   - A. Lowers your returns slightly
   - ✅ B. Can close the position via liquidation before the thesis plays out
   - C. Is illegal for retail
   - D. Removes all risk
   - _Explanation:_ “Right eventually” loses to “broke first”: a margin call force-sells you at the low, before you can be proven right.
2. Maximum media coverage of a stock has historically coincided with…
   - A. The best time to buy
   - B. No useful information
   - C. A reliable profit signal
   - ✅ D. Among the WORST forward returns — attention peaks after the price has run
   - _Explanation:_ By saturation the marginal buyer is largely in and early holders are distributing (Tier 1, Tier 5) — consensus is already priced.

## T7.5 — Traps 9 & 10: the dilution treadmill and guru funnels  `id: t7_dilution`

**PREDICT (shown before the lesson unlocks):** A stock’s price rises 40% over three years, yet your dollar stake in the actual business barely grows. Where did your slice of ownership quietly go?

**LESSON:**

Two slow, quiet traps, four parts each.

**Trap 9 — the dilution treadmill.** *Mechanism:* a company that does not generate enough cash funds itself by continually issuing new shares — for stock-based compensation (Tier 3) and to raise money (secondaries, Tier 2). Each issuance shrinks every existing holder’s percentage claim (Tier 0’s share-count math), so the price can rise while your OWNERSHIP erodes — more slices cut from the same pizza. *Operator’s profit:* employees and executives are paid in fresh shares (real pay, hidden in “adjusted” numbers), and the company keeps operating on investors’ money. *Victim’s mistake:* watching the stock price and ignoring the rising share count — the silent tax (Tier 3’s dirty dozen). *The tell:* shares outstanding climbing several percent a year, heavy stock-based comp, and repeated secondary offerings — visible in any 10-K.

**Trap 10 — guru funnels.** *Mechanism:* someone sells a trading course, “signals” group, or subscription promising to teach you to beat the market. *Operator’s profit* — and this is the whole tell: the seller’s real, reliable P&L is the COURSE, not the trades. If an edge genuinely compounded (Tier 0), selling a $2,000 course to strangers would be a rounding error against simply trading it. *Victim’s mistake:* paying for the appearance of expertise — win screenshots (losses never shown), rented luxury, survivorship-flavored testimonials (Trap 11). *The tell:* income that depends on enrollment, an upsell ladder, and no audited, complete track record.

Who benefits? Employees and executives diluting you (Trap 9); the guru selling access (Trap 10). The through-line, grounded in incentives (Tier 6’s insider lesson): watch what people DO with their own money versus what they SELL to you. A real edge is quietly compounded; a course is loudly marketed. As the brief states — anyone selling a shortcut to skip the reps is usually running Trap 10.

**WORKED EXAMPLE:** **Ex:** A company’s stock rises 40% over three years while shares outstanding grow 8% a year — your claim on the business shrank ~24% even as the ticker climbed (Trap 9). Meanwhile a “$1,500 options mentorship” shows only winning screenshots; the mentor’s dependable income is enrollment, not trading (Trap 10).

**TEACH-BACK:** Explain to a smart 12-year-old how a rising stock can still shrink your ownership, and why a real money-making edge would not be sold as a course, in 5 sentences.

**FLASHCARDS:**
- **Dilution treadmill (mechanism + tell)** → Constant share issuance (stock comp + secondaries) shrinks each holder’s slice even as price rises; the tell is shares outstanding climbing yearly in the 10-K.
- **Guru funnel (mechanism + tell)** → The seller’s reliable P&L is the course, not the trades; the tell is income from enrollment, an upsell ladder, and no complete audited record.
- **The unifying rule** → Watch what people do with their own money vs. what they sell you — real edges are quietly compounded, courses are loudly marketed.

**QUIZ:**
1. A stock climbs while shares outstanding rise 8% a year. Your percentage claim on the business…
   - A. Rises along with the price
   - B. Stays exactly fixed
   - C. Doubles over three years
   - ✅ D. Shrinks — more slices are cut from the same pizza
   - _Explanation:_ Dilution is the silent tax (Tier 3): price and ownership can move in opposite directions as the share count grows.
2. The clearest tell that a trading “guru” lacks a real edge is that…
   - ✅ A. His dependable income is course and subscription fees, not the trades themselves
   - B. He trades frequently
   - C. He owns an expensive car
   - D. He posts price charts
   - _Explanation:_ A genuinely compounding edge (Tier 0) dwarfs course revenue; selling access instead reveals where the reliable money actually is.

## T7.6 — Traps 11 & 12: survivorship bias and the behavior gap  `id: t7_bias`

**PREDICT (shown before the lesson unlocks):** A book studies 100 wildly successful investors and finds they all took huge risks. The lesson seems clear: take huge risks. What crucial group did the study never interview — and what is the real final boss of investing?

**LESSON:**

The two deepest traps, because they hide inside your own reasoning. Four parts each.

**Trap 11 — survivorship bias in all advice.** *Mechanism:* we only hear from the survivors. Founders who bet everything and won write the books; the identical founders who bet everything and lost are gone, uncounted. Studying only winners makes reckless behavior look wise, because the equally reckless losers were filtered out before the data was collected. *Operator’s profit:* gurus and authors (Trap 10) sell the survivors’ stories precisely because the graveyard stays silent — the missing data is invisible, so the pitch feels unfalsifiable. *Victim’s mistake:* copying what winners did without asking how many did the same and failed (the base-rate lesson, Tier 4). *The tell:* any advice drawn only from success stories — “every great investor did X” — with no mention of everyone who did X and vanished.

**Trap 12 — the behavior gap.** *Mechanism:* studies find fund investors earn meaningfully LESS than the very funds they hold *[VERIFY — Dalbar/Morningstar-type studies]*, because of WHEN they buy and sell — piling in near tops (Trap 8) and panic-selling near bottoms (Tier 0’s ruin/drawdown math). The fund returns X; the average investor in it earns less than X by mistiming. *Operator’s profit:* brokers earn on the churn (Tier 2’s PFOF), and the market transfers wealth from the emotional to the patient. *Victim’s mistake:* acting on fear and greed — buying euphoria, selling panic — the exact opposite of the plan. *The tell:* your own urge to trade is strongest at the extremes. The final boss, verbatim from the brief, is your own amygdala.

Who pays? Anyone who mistakes survivors for a strategy, or feelings for a signal. The through-line closing the trap catalog: the last trap is internal — no filing-reading skill helps if you buy tops and sell bottoms. This is why Tier 8’s decision journal and Tier 0’s survival math exist: to put a rule between you and your amygdala.

**WORKED EXAMPLE:** **Ex:** A “how the greats did it” book interviews 50 billionaires who concentrated everything into one bet — never the thousands who did the same and went broke (Trap 11). Meanwhile a fund returns 10% a year for a decade while its average holder earns 6%, having bought high and sold low (Trap 12) — the gap is behavior, not the fund.

**TEACH-BACK:** Explain to a smart 12-year-old why “learn from winners only” is misleading, and why investors often earn less than their own funds, in 5 sentences.

**FLASHCARDS:**
- **Survivorship bias (mechanism + tell)** → Only winners remain to give advice; the identical losers were filtered out, making recklessness look wise. Tell: advice drawn only from success stories.
- **The behavior gap** → Fund investors earn less than their funds by mistiming — buying tops, selling bottoms [VERIFY]; brokers earn on the churn.
- **The final boss** → Your own amygdala — a rule (decision journal, Tier 8) between you and fear/greed is the only defense.

**QUIZ:**
1. “Every great investor took huge risks, so you should too” ignores…
   - A. Nothing important
   - B. Their personal tax rates
   - ✅ C. The equally risk-taking investors who failed and were filtered out of the data
   - D. The stock market’s trading hours
   - _Explanation:_ Survivorship bias: the losers who did the same thing are gone, so only success remains to be studied — recklessness looks wise.
2. The “behavior gap” — investors earning less than the funds they own — is caused mainly by…
   - A. High fees alone
   - B. Fund manager theft
   - C. Inflation
   - ✅ D. Mistiming: buying near tops and panic-selling near bottoms
   - _Explanation:_ The fund’s return is fixed; the investor’s is lowered by WHEN they buy and sell — fear and greed, the final boss.

---
# TIER 8 · THE CRAFT  `[T8]`
_Thesis, sizing, journal, scoreboard — judgment, forever._  · 5 lessons

## T8.1 — Thesis construction: claim, evidence tiers, and a dated falsifier  `id: t8_thesis`

**PREDICT (shown before the lesson unlocks):** You are about to write your first publishable thesis on a real company. What parts must it contain for a stranger to be able to prove you wrong?

**LESSON:**

Everything in this program converges here: turning what you can read into a claim someone can check. A publishable thesis has four parts, in order.

**1 · The claim.** One falsifiable sentence — not “I like this company” but “the market is pricing X, and Y is more likely.”

**2 · Evidence, in tiers of trust.** Weight sources by how hard they are to fake. **Filings** — audited numbers, the cash flow that cannot be dressed up (Tier 3) — outrank **physical reality** — satellite counts, channel checks, what customers actually do (Tier 14) — which outranks **flows** — positioning, sentiment, price action (Tier 5), real but the softest, most reflexive layer. When the tiers disagree, the higher tier wins; a thesis resting only on flows is a guess wearing a suit.

**3 · What the price assumes.** Extract the future the current price already requires (Tier 4 expectations investing), then judge it against base rates. Your edge is the gap between the embedded forecast and what the evidence supports — never the story itself.

**4 · The falsifier, with a date.** One condition that would prove you wrong by a specific day: “if free cash flow is not positive by Q4 2027, the thesis is dead.” A claim with no falsifier is not analysis; it is a horoscope. Who benefits from date-free predictions? Everyone selling them — they can never be graded, so they can never be wrong. The capstone gate exam is exactly one such written thesis, good enough to publish.

**WORKED EXAMPLE:** **Ex:** Claim: “SPCX is priced for ~40%/yr revenue growth for a decade; the launch-cadence data supports closer to 25%.” Evidence order: filings (revenue) > physical reality (launch counts) > flows (short interest). Falsifier: “if 2027 cadence exceeds 200 launches, I am wrong” *[VERIFY details]*.

**TEACH-BACK:** Explain the four parts of a thesis, and why the falsifier needs a date, in 5 sentences.

**FLASHCARDS:**
- **The four parts of a thesis** → Claim (falsifiable) → evidence in tiers → what the price assumes → dated falsifier.
- **The evidence tiers, most trusted first** → Filings > physical reality > flows — when they disagree, the higher tier wins.
- **Why every claim needs a dated falsifier** → A prediction with no date or disproving condition cannot be graded — that is a horoscope, not analysis.

**QUIZ:**
1. A market claim with no date and no disproving condition is best described as…
   - A. Rigorous analysis
   - ✅ B. A horoscope — unprovable and ungradable
   - C. A safe bet
   - D. Insider information
   - _Explanation:_ A falsifier with a date is what separates analysis from an unfalsifiable story.
2. When your evidence tiers disagree, which source should win?
   - A. Price action and flows
   - B. Sentiment on social media
   - ✅ C. Audited filings
   - D. Analyst opinions
   - _Explanation:_ Filings are the hardest layer to fake; flows are the softest. The higher tier of trust decides.

## T8.2 — Position sizing and survival: wrong three times and still playing  `id: t8_sizing`

**PREDICT (shown before the lesson unlocks):** You have five ideas you love. Should most of your money go into your single favorite? What actually decides how big any one position can be?

**LESSON:**

Sizing is where survival math (Tier 0: ruin is the only unrecoverable outcome) becomes a rule you can execute. The principle, stated plainly: **size every position so that being wrong three times in a row still leaves you in the game.**

Work it backwards. Decide the most a single idea can lose before it stops mattering. If three consecutive maximum losses must not dent your life or force you out, then each position is capped so that three worst-case losses together are survivable. **That cap, not your conviction, sets the size.** Conviction is an input to *whether* you act; it is never a license to bet the account.

Two mechanisms this defends against. First, **ruin**: multiply by zero once and every past and future return is erased (Tier 0). Second, **forced selling**: a position too large makes an ordinary drawdown unbearable, so you sell at the bottom — becoming the forced seller other players harvest (Tier 1; Tier 2 cascades). Correct sizing keeps you the calm counterparty instead of the liquidated one.

The banned move is **averaging down without re-writing the thesis** — adding to a loser to feel better quietly doubles a bet the market is voting against. Who benefits when amateurs oversize? Everyone on the other side of their eventual panic. The operator sizes to be boringly, permanently present — because the only unforgivable outcome is not being at the table for the next reps.

**TEACH-BACK:** Explain why the maximum tolerable loss, not your conviction, sets position size — using the wrong-three-times rule — in 5 sentences.

**FLASHCARDS:**
- **The sizing rule of survival** → Size so that being wrong three times in a row still leaves you in the game.
- **What sets position size** → The most you can lose before it threatens survival — not your conviction level.
- **Why oversizing is self-harvesting** → A position too big makes a normal drawdown unbearable, so you sell at the bottom — the exact forced seller others profit from.

**QUIZ:**
1. The size of any single position should be set primarily by…
   - A. Your conviction level
   - ✅ B. The most you can lose before it threatens survival
   - C. The stock’s recent momentum
   - D. How much cash sits idle
   - _Explanation:_ Conviction decides whether to act; the survivable maximum loss decides how big.
2. Averaging down into a loser without re-writing the thesis is dangerous because it…
   - A. Reduces taxes
   - B. Is illegal
   - ✅ C. Quietly enlarges a bet the market is already voting against
   - D. Always recovers
   - _Explanation:_ Adding to a losing position to ease the pain doubles a bet reality is contradicting.

## T8.3 — The decision journal, and Munger’s misjudgments turned inward  `id: t8_journal`

**PREDICT (shown before the lesson unlocks):** You made a trade that made money. Does that prove your reasoning was good? What record would let you tell a good decision from a lucky one?

**LESSON:**

The **decision journal** is the instrument that lets you grade *process, not luck*. Before any position, you write — timestamped — the thesis, the evidence tiers, what the price assumes, the falsifier, and the sizing logic. Crucially the reasoning is logged **before the outcome exists**, so hindsight cannot quietly edit it.

Why this matters mechanically: outcomes are noisy over any small sample (Tier 4 base rates). A good decision can lose and a bad one can win, so grading yourself on results teaches nothing repeatable and reinforces whatever paid off by chance. Grading the *process* — was the reasoning sound given what was knowable — is the only signal that compounds.

The journal is also where you audit yourself with **Munger’s psychology of misjudgment**, turned inward. **Incentive bias**: am I reaching this view because it pays me — my position, my audience? **Social proof**: am I buying because everyone is (Tier 1 media, Tier 5 euphoria)? **Commitment and consistency**: am I holding because I said so publicly, not because the evidence still holds? **Deprival super-reaction**: am I chasing to avoid the pain of missing out — the exact engine of the behavior gap in Tier 7? Each is a predictable way your own brain becomes the counterparty that gets harvested.

Who benefits from an un-kept journal? The version of you that wants to remember every win and forget every loss. The written, pre-committed record is the one witness that never flatters you.

**TEACH-BACK:** Explain why grading process beats grading outcomes, and name two Munger biases you would audit yourself for, in 5 sentences.

**FLASHCARDS:**
- **Why the journal is written BEFORE the outcome** → So hindsight cannot edit the reasoning — you grade the decision as it actually was.
- **Grade process, not luck** → Outcomes are noisy; a good decision can lose and a bad one win. Only sound process compounds.
- **Munger’s misjudgments, turned inward** → Incentive bias, social proof, commitment/consistency, deprival super-reaction — your own predictable harvest points.

**QUIZ:**
1. Grading your decisions by their OUTCOMES rather than your PROCESS fails because…
   - ✅ A. Outcomes are noisy — a good decision can lose and a bad one can win
   - B. Outcomes are always fair
   - C. Process cannot be measured
   - D. It is against the rules
   - _Explanation:_ Over small samples luck dominates results; only process quality is a repeatable signal.
2. Chasing a stock purely to avoid the pain of missing out is Munger’s…
   - A. Incentive bias
   - B. Social proof
   - ✅ C. Deprival super-reaction
   - D. Commitment bias
   - _Explanation:_ Deprival super-reaction — over-reacting to a perceived loss (the missed gain) — is the behavior-gap engine.

## T8.4 — Doing nothing as a position; boredom as edge  `id: t8_nothing`

**PREDICT (shown before the lesson unlocks):** The market is open, you have cash, and nothing you follow is at a price you like. What is the correct action — and why does it feel so wrong?

**LESSON:**

Beginners believe action is the job — that a day without a trade is a day wasted. The opposite is true: **“no position” is itself a position**, and holding cash while nothing meets your criteria is a deliberate choice, not idleness.

The mechanism. Every trade pays the spread (Tier 0) and, if frequent, higher short-term taxes (Tier 0 accounts) — a subscription to the plumbing. Beyond cost, forcing trades means acting when you have no edge, which hands your money to players who act only when they do. The market throws thousands of pitches; you are under no obligation to swing, and — unlike a hedge fund judged quarterly (Tier 6) — nobody can fire you for waiting. That freedom to do nothing is the retail operator’s structural edge (Tier 1), and impatience is how most people throw it away.

**Boredom is the tell that you are doing it right.** The exciting-feeling trades — the vivid story, the fast mover, the crowded name at peak coverage (Tier 1 media) — are disproportionately the harvested ones. Buffett’s image: investing has no called strikes; you can stand at the plate all day and swing only at the fat pitch.

Who benefits from your impatience? Brokers paid per order (Tier 2 payment for order flow), market makers collecting the spread, and every operator of a Tier 7 machine that needs restless money moving. The discipline: define your pitch in advance, then wait for it without apology.

**TEACH-BACK:** Explain why holding cash is an active position, and why boredom is a good sign, in 5 sentences.

**FLASHCARDS:**
- **“No position” is…** → An active, deliberate position — holding cash while nothing meets criteria is a choice, not idleness.
- **Why forcing trades loses** → Each trade pays the spread and taxes, and acting without edge hands money to players who wait for theirs.
- **Boredom as edge** → No called strikes: you may wait indefinitely for the fat pitch. The exciting trades are the harvested ones.

**QUIZ:**
1. Holding cash because nothing meets your criteria is…
   - A. A wasted opportunity
   - ✅ B. An active, deliberate position
   - C. A sign of fear
   - D. Against the rules
   - _Explanation:_ Not swinging is itself a decision — and the retail operator’s freedom to wait is a structural edge.
2. Who benefits most from a retail trader’s impatience?
   - A. Long-term investors
   - B. The company
   - ✅ C. Brokers and market makers paid on each trade
   - D. The trader
   - _Explanation:_ Per-order revenue and the spread reward activity; the trader pays the toll every round trip.

## T8.5 — The quarterly scoreboard and the paper-first protocol  `id: t8_scoreboard`

**PREDICT (shown before the lesson unlocks):** Two commentators each made 20 predictions last year. One shows you all 20 graded, including the failures. Which has earned more trust, and why?

**LESSON:**

Two rituals convert private opinions into a credential no one can dispute.

**The quarterly scoreboard.** Every public claim you have made gets graded against its falsifier (Tier 8 thesis) on a fixed schedule — and **misses are posted louder than hits.** The mechanism is honesty enforced by structure: a call with a date cannot hide, and grading the failures in public is what separates an analyst from a promoter, who quietly deletes bad calls and screenshots the good ones. Over time the graded record — including the losses you owned — becomes rarer and more trustworthy than any string of boasts.

**The paper-first protocol.** Theses are tracked *publicly on paper* — real claims, dates, and sizes, no real money — before a single dollar is committed. The rule: **a minimum of five completed, graded paper theses before one real dollar takes a position.** Then, when real money enters, it enters small — **sized as tuition**, an amount that can go to zero with no life impact (Tier 2’s lab fee). Paper trading teaches the buttons and the process; it cannot teach emotion — everyone is a genius on demo — so the real-money size stays trivial precisely so the emotional reps are affordable.

Who benefits from a graded public scoreboard? Your future self and your audience, who can verify you instead of trusting you. Who is exposed by it? Every guru whose record exists only in the wins they chose to remember (Tier 7).

**TEACH-BACK:** Explain why publicly grading misses louder than hits builds trust, and why real money starts tiny, in 5 sentences.

**FLASHCARDS:**
- **The quarterly scoreboard ritual** → Every public claim graded against its falsifier on schedule — misses posted louder than hits.
- **The paper-first protocol** → Five graded paper theses before one real dollar; real money then enters sized as tuition.
- **Why grading misses builds trust** → A dated, graded record — losses included — is rarer and more credible than a highlight reel of wins.

**QUIZ:**
1. Posting your MISSES louder than your hits primarily builds…
   - A. Embarrassment
   - ✅ B. A trustworthy, verifiable public record
   - C. Legal liability
   - D. Nothing of value
   - _Explanation:_ Owning graded failures is what separates an analyst from a promoter who deletes bad calls.
2. The paper-first protocol requires how many graded paper theses before one real dollar takes a position?
   - A. Zero
   - B. One
   - ✅ C. Five
   - D. Fifty
   - _Explanation:_ Minimum five completed, graded paper theses first; real money then enters tuition-sized.

---
# TIERS 9–14 · EXPERT EXPANSION  `[TX]`
_Credit & macro, private markets, modern mechanics, history, law, research craft. Interleave after Gate 5._  · 6 lessons

## TX.1 — Tier 9 — Credit, rates and global macro: reading the bigger half  `id: tx_credit`

**PREDICT (shown before the lesson unlocks):** Stocks are calm and green all week, but high-yield credit spreads are quietly widening and the dollar is climbing. Which signal should you trust about what comes next?

**LESSON:**

The stock market is the loud half; the **bond market is larger and moves first** (Tier 0’s anchor, scaled up). Learn to read it and you see the tide before the boats.

**The yield curve** plots Treasury yields across maturities — normally longer means higher. **Inversion** (short yields above long) means the market expects the Fed to cut later because it expects a slowdown; mechanically it has preceded most modern recessions. **Credit spreads** — the extra yield high-yield and investment-grade bonds pay over Treasuries — are the market’s **honest fear gauge**: equities tell stories, but widening spreads mean lenders are demanding more to be repaid (Tier 5’s credit cycle, priced live).

Underneath sits **money-market plumbing**: **repo** is overnight borrowing against Treasury collateral. When it jams — the **2019 repo spike**, when overnight rates leapt — it signals cash or collateral scarcity before stocks notice. **QE/QT** (Tier 5) turn the valve: the Fed buying bonds floods reserves; letting them roll off drains liquidity. Zoom out to the **dollar system** — the world’s funding currency, so dollar *strength* tightens conditions globally as foreign borrowers owe more. **Carry trades** (borrowing a cheap currency like the yen to buy higher-yielding assets) unwind violently when that funding currency jumps — the **2024 yen carry unwind [VERIFY]** was a Tier 2 leverage cascade at global scale. **Commodities** (oil, copper, uranium, natural gas) are macro inputs tied straight to the AI-power bottleneck — datacenters need electricity, priced here. **Gold and bitcoin** act as debasement and liquidity barometers — read as mechanism, not ideology *[VERIFY]*. And **sovereign debt** compounds: deficits raise interest costs, which raise deficits, until who-buys-the-bonds governs rates.

The gate skill (**Gate 9**): read one week of markets using only bond yields, credit spreads, and the dollar — no equity headlines — and produce a coherent macro read.

**TEACH-BACK:** Using only bonds, spreads, and the dollar, explain how you would read a week of markets, in 6 sentences.

**FLASHCARDS:**
- **Yield-curve inversion, mechanically** → Short yields above long = the market expects Fed cuts later because it expects a slowdown; a recession warning.
- **Credit spreads as the honest fear gauge** → Widening spreads mean lenders demand more to be repaid — they rarely lie even when stocks look calm.
- **Carry unwind (yen 2024) [VERIFY]** → Borrowing a cheap currency to buy yield detonates when that currency jumps — a global leverage cascade.

**QUIZ:**
1. Credit spreads are called the market’s honest fear gauge because…
   - A. They are set by the Fed
   - ✅ B. Widening spreads show lenders demanding more to be repaid, even when stocks look calm
   - C. They never move
   - D. They predict earnings
   - _Explanation:_ Equities tell stories; spreads reflect what lenders actually require to keep lending.
2. A yield-curve inversion typically signals that the market expects…
   - ✅ A. Rate cuts later because it expects a slowdown
   - B. A booming economy ahead
   - C. Certainly higher stock prices
   - D. An error in the data
   - _Explanation:_ Short yields above long says the Fed is expected to ease into weakness — historically a recession lead.

## TX.2 — Tier 10 — The private game and corporate warfare  `id: tx_private`

**PREDICT (shown before the lesson unlocks):** A public company announces it is being bought by a private-equity firm using mostly borrowed money. Before cheering for shareholders, ask: who carries the debt if it goes wrong?

**LESSON:**

Most serious money operates **before** the public sees the story. This tier maps that private game.

**Leveraged buyouts (LBOs).** A private-equity firm buys a company mostly with *borrowed money*, loads that debt onto the acquired company, cuts costs, and exits at a higher multiple. Returns come largely from the leverage — and who carries the risk? Not the sponsor’s own capital first, but the company’s **employees** (the cost cuts) and its **lenders** (the debt sits on the target, not the buyer). **Private credit** is the multi-trillion-dollar shadow-lending boom filling the gap banks retreated from *[VERIFY]* — Tier 5’s credit cycle, now largely outside regulated banking, where the next stress may hide.

**Venture secondaries and tender offers** let insiders sell *before* the IPO: pre-listing, SPCX insiders sold at rising private marks — the exact game the learner watched (Tier 2). Access is gated by **accredited-investor rules** and SPVs, so the best-priced rooms are closed by design. **M&A:** most acquisitions *destroy* acquirer value — empire-building incentives (Tier 6) reward size, and goodwill (Tier 3) records the overpayment. **Activists** file a **13D** (crossing 5% with intent) and run public campaigns — the loudest legal edge in markets. **Bankruptcy** is the capital-structure war made real: seniority decides everything (Tier 0 debt-vs-equity), debt holders fight over the carcass, and **equity is usually zero** — the “cheap” stock of a failing company is cheap for a reason. **13F** filings reveal big managers’ holdings quarterly, but with a **45-day lag** — tourists misread stale positions as live signals.

The gate skill (**Gate 10**): given any announced deal, **map every party’s payoff** — and name who wins even if the deal falls apart.

**TEACH-BACK:** Explain who really carries the risk in an LBO, and why equity is usually zero in bankruptcy, in 6 sentences.

**FLASHCARDS:**
- **LBO — who carries the risk** → Debt is loaded onto the acquired company; its employees (cost cuts) and lenders bear the downside, not the sponsor first.
- **Why bankruptcy equity is usually zero** → Seniority: debt is paid first, equity is last in line — the “cheap” failing stock is cheap for a reason.
- **13F literacy and its lag** → Big managers’ holdings are disclosed quarterly with a 45-day lag — stale, and tourists misread it as live.

**QUIZ:**
1. In a leveraged buyout, the debt used to buy the company is loaded primarily onto…
   - A. The private-equity firm’s own balance sheet
   - ✅ B. The acquired company itself — its employees and lenders carry the risk
   - C. The government
   - D. The stock exchange
   - _Explanation:_ The sponsor’s capital is a thin slice; the target company shoulders the borrowed money.
2. Why is the common stock of a company in bankruptcy usually worth zero?
   - A. Stocks legally cannot reach zero
   - B. Regulators confiscate it
   - C. It is always fraud
   - ✅ D. Seniority: debt is paid first, and equity is last with usually nothing left
   - _Explanation:_ Capital-structure order (Tier 0) puts equity behind every creditor — the residual is often nothing.

## TX.3 — Tier 11 — Modern market mechanics: how the 2020s tape moves  `id: tx_mechanics`

**PREDICT (shown before the lesson unlocks):** The market drops 3% on a day with no headline, no earnings, no Fed. If nothing happened in the news, what moved the price?

**LESSON:**

The 2020s tape often moves for reasons that have nothing to do with news. This tier is the master key (Tier 1) at modern scale.

**Passive dominance.** Index funds are now roughly **half** of U.S. equity fund assets *[VERIFY]* and are **price-insensitive** — they buy whatever the basket dictates at any price (Tier 1). Money flowing in bids up the biggest names mechanically, concentrating the index; outflows reverse it, with no one asking about value.

**Options and dealer gamma.** When dealers sell options to retail, they hedge by trading the underlying — and that hedging *amplifies* moves. Heavy **0DTE** (zero-days-to-expiry) activity now steers the intraday tape: dealer hedging of same-day options can pin or accelerate the market hour to hour. **The VIX** measures expected volatility; **vol-selling** strategies harvest calm — until they detonate, as in **February 2018’s volatility spike [VERIFY]**, when a jump forced a cascade of buying-back (Tier 2).

**Mechanical flows** are the calendar of forced behavior: **CTAs** (trend-followers) buy strength and sell weakness by formula; **vol-control** and **risk-parity** funds cut exposure automatically when volatility rises; **buyback blackout** windows remove a company’s own bid around earnings. None of these players has an opinion — they have rules, and the rules are readable in advance.

**Securitization** — pooling loans and slicing them into **tranches** of different risk (MBS, CDOs) — is the 2008 machine (Tier 12), and it will be rebuilt under new labels, so learn it now. **New plumbing [VERIFY]:** stablecoins have become sizable **Treasury buyers**, and tokenization is moving assets on-chain — mechanism only, no ideology.

The gate skill (**Gate 11**): explain a **violent no-news day** using flows and positioning alone.

**TEACH-BACK:** Explain how a market can fall hard on a day with no news, naming three mechanical flows, in 6 sentences.

**FLASHCARDS:**
- **Why passive flows move price mechanically** → Index funds are price-insensitive — they buy the basket at any price, concentrating the biggest names on inflows.
- **Dealer gamma and 0DTE** → Dealers hedging the options they sold trade the underlying, amplifying moves; same-day options now steer the intraday tape.
- **The calendar of forced flows** → CTAs, vol-control, risk-parity, and buyback blackouts act by rule, not opinion — readable in advance.

**QUIZ:**
1. A 3% market drop on a day with no news is best explained by…
   - A. Fundamentals changing
   - ✅ B. Mechanical flows and positioning — CTAs, vol-control, dealer hedging
   - C. Insider trading
   - D. The economy shrinking
   - _Explanation:_ Rule-based, opinion-free flows can move the tape violently with no new information.
2. Passive index funds are “price-insensitive,” meaning they…
   - ✅ A. Buy whatever the index rule dictates regardless of price
   - B. Only buy undervalued names
   - C. Refuse to trade at high prices
   - D. Are run by star managers
   - _Explanation:_ They execute the basket rule at any price — flow, not valuation, drives their buying.

## TX.4 — Tier 12 — Market history as a pattern library: one law per episode  `id: tx_history`

**PREDICT (shown before the lesson unlocks):** Someone says today’s market “is just like 2008.” Before you agree, what two questions decide whether the comparison actually helps you?

**LESSON:**

History does not repeat, but it rhymes — and each great episode leaves one **permanent law**. Learn the laws, not the dates.

**1907:** panics need a lender of last resort — the reason the Fed exists (Tier 5). **1929–33:** leverage plus policy error turns a crash into a depression. **Nifty Fifty (1970s):** “quality at any price” still fails — valuation always matters eventually (Tier 4). **1970s inflation:** the regime where **stocks and bonds fall together**, breaking the usual hedge. **1987:** portfolio insurance showed mechanical selling begets mechanical selling (Tier 11 flows). **Japan 1989:** a bubble can deflate for *thirty years* — “it always comes back” is **not a law**. **LTCM 1998:** genius plus leverage equals ruin, because **correlations go to 1 in a crisis** (Tier 0 diversification’s limit). **Dot-com 2000:** real technology and real bubble at once — the AI-cycle mirror (Tier 5). **2008:** the securitization cascade, mortgage desk to global freeze (Tier 11). **2020:** policy *speed* became the new variable — the fastest crash and recovery on record. **2021 GameStop:** flows and gamma overwhelmed fundamentals in real time (Tier 2, Tier 11). **2022:** duration math punished everything priced on cheap money when rates shocked (Tier 5 gravity). **2023 SVB:** digital-speed bank runs — duration risk hiding on “safe” balance sheets, emptied in hours (Tier 3 maturities, Tier 5 reflexivity).

The through-lines: leverage kills, valuation eventually matters, correlations fail when you need them, mechanical selling feeds itself — and Japan’s anti-law, that recovery is never assured.

The gate skill (**Gate 12**): for any current event, name its **closest historical rhyme AND the one difference that matters most** — because that difference is where the last crisis’s lesson gets you killed.

**TEACH-BACK:** State three permanent laws from three different episodes, and the one anti-law Japan teaches, in 6 sentences.

**FLASHCARDS:**
- **LTCM 1998’s permanent law** → Genius plus leverage equals ruin — and correlations go to 1 in a crisis, so diversification fails when needed.
- **Japan 1989’s anti-law** → A bubble can deflate for thirty years: “it always comes back” is NOT a law.
- **How to use a historical rhyme (Gate 12)** → Name the closest rhyme AND the one difference that matters — the difference is where the old lesson misleads.

**QUIZ:**
1. The single most useful thing to add when someone says “this is just like 2008” is…
   - A. Agreement
   - ✅ B. The one difference that matters most between then and now
   - C. A price target
   - D. A meme
   - _Explanation:_ The rhyme orients you; the key difference is where blindly applying the old lesson gets you hurt.
2. Japan’s experience after 1989 proves which is NOT a law?
   - A. Leverage kills
   - B. Valuation eventually matters
   - ✅ C. “Markets always come back”
   - D. Correlations rise in crises
   - _Explanation:_ A thirty-year deflation shows recovery is not assured — the comforting maxim is the false one.

## TX.5 — Tier 13 — Law, disclosure and the influence seat: armor first  `id: tx_law`

**PREDICT (shown before the lesson unlocks):** An influencer buys a small stock, posts “this is going to run” to a million followers, then sells into the spike. He added “not financial advice.” Does that caption protect him?

**LESSON:**

An account built on trust dies from one legal or ethical breach — and the beat itself (exposing violators) requires knowing the lines cold. This tier is armor, installed *before* the audience grows.

**MNPI.** Material non-public information — facts that would move a price, not yet public. Trading on it, or passing it to someone who trades (**tipper/tippee liability**), is insider trading. “I heard it from a friend” is not a defense; the liability travels with the tip. **Regulation FD** forces companies to disclose material information to *everyone at once* — which is why selective leaks are illegal and why filings (Tier 3) are the level playing field.

**Market manipulation.** **Pumping** — coordinated posting to move a price in a security you already hold, then selling into the demand you created — is **securities fraud** (Tier 7’s pump-and-dump, seen from the operator’s side of the law). **Anti-touting:** promoting a security for **undisclosed compensation** is a crime, not a gray area — if you are paid to post, you must say so. The founding cautionary tale: the **2022 federal charges against the Twitter/Discord pump crew [VERIFY]**, who allegedly bought, hyped to followers, and dumped — charged criminally.

Two traps to kill now: **“not financial advice” is a disclaimer, not a shield** — conduct governs, not captions; and posting your own holdings does not license trading around your posts. **The account’s compliance protocol:** disclose your position before discussing any name, never trade around your own posts, archive timestamps and receipts, and post corrections **prominently**, not quietly.

The gate skill (**Gate 13**): **audit real finfluencer posts** and identify every legal and ethical violation, with the statute-level reason.

**TEACH-BACK:** Explain what pumping legally is, and why “not financial advice” is not a shield, in 6 sentences.

**FLASHCARDS:**
- **MNPI and tipper/tippee liability** → Trading on material non-public information, or tipping someone who does, is insider trading — the tip carries the liability.
- **What pumping legally is** → Coordinated posting to move a price in a security you hold, then selling into it — securities fraud.
- **The compliance protocol** → Disclose your position first, never trade around your own posts, archive receipts, correct prominently.

**QUIZ:**
1. Adding “not financial advice” to a post that pumps a stock you are quietly selling…
   - A. Fully protects you
   - ✅ B. Does nothing — conduct governs, not captions
   - C. Is required by law
   - D. Makes the scheme legal
   - _Explanation:_ Disclaimers do not override conduct; coordinated pumping-and-selling is fraud regardless of the caption.
2. Promoting a security for undisclosed payment is…
   - A. A gray area
   - B. Perfectly legal
   - ✅ C. A crime — illegal touting
   - D. Only a civil courtesy
   - _Explanation:_ Anti-touting law makes paid promotion without disclosure a criminal matter, not a judgment call.

## TX.6 — Tier 14 — Research craft and the portfolio layer  `id: tx_research`

**PREDICT (shown before the lesson unlocks):** You have ten well-researched positions, each sensibly sized on its own. In a real crash, why might they all lose together — and what does that mean for building the whole portfolio?

**LESSON:**

The professional’s daily craft, and the layer that turns individual theses into a survivable portfolio.

**Research inputs.** **Expert networks** and **channel checks** (talking to a company’s customers, suppliers, ex-employees) are legal — *until* they cross into MNPI (Tier 13); that line is the whole skill. **Alternative data** is the builder’s lane: satellite images of parking lots, card-spend panels, app downloads, hiring and permit records — **automate collection where it is legal and public** (the learner builds software, so this is his edge). Feed it into **living trackers** — cadence charts, capex tables, backlog monitors — the account’s data spine that updates whether or not anyone is watching.

**Portfolio construction.** Individual sizing (Tier 8) is not enough, because positions move *together*: **correlation’s crisis failure mode** means diversification vanishes exactly when needed (Tier 0; LTCM in Tier 12). Manage **factors** (value, momentum, quality — hidden shared exposures), enforce **position limits**, and **rebalance** on a rule, not a feeling. **Sizing under uncertainty:** **Kelly-criterion** intuition says bet more when the edge is bigger — but **full Kelly ruins**, because it assumes you know your odds exactly, and one bad estimate compounds toward zero (Tier 0 ruin math). Professionals bet fractional Kelly, sizing to survive being wrong three times (Tier 8).

**Hedging** costs money — a permanent hedge is a permanent drag, so buy protection only when the specific risk justifies the premium (Tier 2 options, from the buyer’s honest side). **Tax-aware operating [VERIFY]:** holding periods, loss harvesting, wash-sale rules (Tier 0) — because **after-tax return is the only return** that reaches your account.

The gate skill (**Gate 14**): present a mock portfolio with **sizing logic, one hedge, a rebalancing rule, and a falsifier for each position.**

**TEACH-BACK:** Explain correlation’s crisis failure and why professionals bet fractional Kelly, in 6 sentences.

**FLASHCARDS:**
- **Correlation’s crisis failure mode** → In a crash positions move together — diversification vanishes exactly when you need it (Tier 0, LTCM).
- **Why full Kelly ruins** → It assumes exact odds; one bad estimate compounds toward zero, so professionals bet a fraction of Kelly.
- **Tax-aware operating [VERIFY]** → Holding periods, loss harvesting, wash-sale rules — after-tax return is the only return that reaches you.

**QUIZ:**
1. Ten sensibly sized positions can still all fall together in a crash because…
   - A. The sizing was wrong
   - ✅ B. Correlations rise toward 1 in crises — diversification fails when needed most
   - C. They were too small
   - D. Of taxes
   - _Explanation:_ Crisis correlation is the portfolio-layer risk that per-position sizing alone cannot fix.
2. Why do professionals bet fractional, not full, Kelly?
   - A. Full Kelly is illegal
   - B. It guarantees a profit
   - C. It reduces taxes owed
   - ✅ D. Full Kelly assumes perfectly known odds, and one bad estimate compounds toward ruin
   - _Explanation:_ Real edges are estimated, not known; fractional Kelly keeps an estimation error from being fatal.

---
# THE REPS SYSTEM & THE ROAD AFTER  `[REPS]`
_Counters, stakes, and the graduate’s calendar. Reps are the program’s odometer._  · 4 lessons

## REPS.1 — The reps ladder: what unlocks at each tier  `id: r_ladder`

**PREDICT (shown before the lesson unlocks):** By the time you graduate this program, roughly how many company filings should you have read — and why is that number, not your grades, the real odometer?

**LESSON:**

Reps are not homework bolted on at the end — they **unlock tier by tier**, each at the moment it becomes relevant, and APEX counts every one like a streak. By graduation you have not “started”; you have been operating for months. The ladder:

**T0 — Observation.** A daily **market journal** (what moved and one mechanical why — no predictions yet) and a **10-name watchlist**; every concept must be spotted in the wild within 48 hours. **T1 — Prediction.** The **prediction log**: before a scheduled event (earnings, Fed day, rebalance), write the expected forced behavior (Tier 1 master key), then grade it — wrong answers are the curriculum. **T2 — Mechanics.** Open a **paper account** and execute every order type — time-boxed to weeks, and honest about the limit: demo teaches buttons, not emotion (*everyone is a genius on demo*). Then one real share of tuition money, and **one full IPO observed** from S-1 to first trade. **T3 — Filings.** One **filing teardown per week**, timed, targeting **50 read by graduation** — the program’s odometer — plus one earnings call logged for what management dodged. **T4 — Valuation.** One **“what the price assumes” audit** per week. **T5 — Macro.** The **Monday macro read** from bonds, spreads, and the dollar only (Tier 9). **T6 — Incentives.** A weekly **insider scan** of Form 4 open-market buys and new 13D filings. **T7 — Traps.** A weekly **trap safari**: one live trap dissected in the mechanism/beneficiary/tell format. **T8 — Theses.** The capstone loop: **five graded paper theses before one real dollar** takes a position.

Who benefits from counters? You — humans grind for visible progress, and every rep is knowledge that lives in your head, not in an AI.

**TEACH-BACK:** Walk through what unlocks at three different tiers and its counter, in 6 sentences.

**FLASHCARDS:**
- **The program’s odometer** → Filing teardowns — one per week, targeting 50 read by graduation. It measures real progress, not grades.
- **The T2 paper-trading rep and its honest limit** → Execute every order type for weeks to feel the machine — but demo teaches buttons, not emotion.
- **The T8 capstone loop** → Five graded paper theses before one real dollar takes a position.

**QUIZ:**
1. The program’s “odometer” — the counter that best measures real progress — is…
   - A. Your win rate
   - ✅ B. The number of filings read (target 50 by graduation)
   - C. Your follower count
   - D. Days logged in
   - _Explanation:_ Fifty timed teardowns is the load-bearing rep; the count tracks capability, not luck.
2. Paper trading is honestly limited because it cannot teach…
   - A. The buttons and order types
   - B. How to place a limit order
   - ✅ C. Emotional discipline — everyone is a genius on demo
   - D. How the IPO works
   - _Explanation:_ Demo builds mechanics and false confidence; only real losses build the emotional callus.

## REPS.2 — Anti-boredom engineering: stakes, scores, and loot  `id: r_stakes`

**PREDICT (shown before the lesson unlocks):** You are three weeks in and it feels like a boring textbook. What two things, added to your routine, would kill the boredom fastest — and why?

**LESSON:**

Boredom is almost always a symptom of **zero stakes and zero output** — so the system installs both early, by design. These are requirements, not suggestions.

**Sync lessons to the live market.** The market is live theater; every lesson references something happening this week. **Earnings season is Tier 3’s lab** (real filings, real calls). **Fed week is Tier 5’s** (a live macro read with a falsifier). **The SPCX lockup is Tier 2’s season finale** (scheduled supply, watched in real time). Abstract theory two days running is a design failure; when a topic drags, switch to a live case of the same mechanic.

**Everything is scored.** The filings odometer, prediction accuracy, streaks, gate badges — progress is visible daily, because humans grind for counters (Tier 8’s scoreboard, gamified). **Stakes cure boredom.** Micro real-money stakes (Tier 2’s tuition-sized lab fee) and reputation stakes (every unit ships a post) mean a red day you own and a public claim you must defend are never boring. **The audience is the accountability** — the parallel X account gives every rep a witness, so ship dates beat mood.

Two recurring engines. **Grade the famous:** pull a big account’s year-old confident call and grade it publicly — fairly, claims not people (Tier 8). It is educational, it spreads, and it trains the exact skill. And the reframe that runs through everything: **being wrong is the fun part.** The prediction log turns misses into loot — every graded miss is one mechanism you now own forever (Tier 1). Who benefits from treating wrongness as reps instead of shame? The operator who keeps going long enough to compound.

**TEACH-BACK:** Explain why stakes and output cure boredom, and how “being wrong is the fun part” works, in 5 sentences.

**FLASHCARDS:**
- **What boredom is a symptom of** → Zero stakes and zero output — so the system installs micro real-money and reputation stakes early.
- **Sync to the live market** → Earnings season = Tier 3’s lab, Fed week = Tier 5’s, SPCX lockup = Tier 2’s season finale.
- **Misses as loot** → Every graded wrong prediction is one mechanism owned forever — wrongness is reps, never shame.

**QUIZ:**
1. In the anti-boredom design, boredom is usually a symptom of…
   - A. Too much information
   - ✅ B. Zero stakes and zero output
   - C. Trading too much
   - D. A rising market
   - _Explanation:_ Add real (tiny) stakes and a shipped post per unit, and a defended claim is never boring.
2. The “grade the famous” segment trains the exact skill by…
   - A. Mocking people personally
   - B. Copying famous traders
   - C. Predicting the next crash
   - ✅ D. Grading a big account’s year-old call against what happened — fairly, claims not people
   - _Explanation:_ Grading real dated calls against outcomes is scoreboard discipline applied publicly.

## REPS.3 — The road after: the graduate’s playbook  `id: r_road`

**PREDICT (shown before the lesson unlocks):** You have graduated and have real money to deploy. Before placing a single trade, what has to be true about your cash, your debt, and your boring index core?

**LESSON:**

What follows is the **standard professional playbook**, described so you can adapt it to your own situation — not instructions, and every specific is *[VERIFY / a personal decision]*.

**Foundation before offense.** The common order of operations: a **cash buffer** for life first, **no high-interest debt** being outrun by hope, and a boring, automated, **low-cost broad index core** as the default base (Tier 0 fees and compounding). The active sleeve — your stock-picking — exists **on top of** this, never instead of it *[VERIFY]*. Active bets are alpha experiments; the core is the portfolio.

**The demo question, answered honestly.** Demo trading: yes, briefly, for mechanics (done in Tier 2). Staying on demo for months builds false confidence and zero emotional callus — the professional consensus is to move to **real money at tiny size** early, because emotional reps only happen when losses are real. Trivial size keeps the tuition cheap.

**The promotion ladder — size follows process, never P&L.** Stage 1 (first quarter live): tiny fixed size per thesis, **maximum 3 open positions**, and a written **thesis + falsifier + exit plan before ordering** (Tier 8). No leverage, no averaging down without re-writing the thesis. The promotion gate is graded on **process only** — journal complete, zero impulse entries, every falsifier honored; returns are noise at this sample size (Tier 4). Size rises only after two consecutive clean-process quarters, and the active sleeve stays a minority — a commonly used structure keeps it roughly **10–20%** while learning *[VERIFY / personal decision]*. **Ruin rules are permanent** (Tier 0): three max losses dent the sleeve, never the life; no single name dominates; leverage stays banned until the scoreboard has years, not months.

**The graduate’s week:** daily journal and review drills; Monday macro read; one filing teardown, one price-assumption audit, one insider scan, one trap dissection weekly — each shipped as a post; manage open theses against their falsifiers only; a quarterly scoreboard; and an annual, honest comparison of the active sleeve versus the index.

**TEACH-BACK:** Explain the order of operations (foundation before offense) and why Stage 1 promotion is graded on process only, in 6 sentences.

**FLASHCARDS:**
- **Foundation before offense** → Cash buffer, no high-interest debt, low-cost index core first — the active sleeve sits on top, never instead of it [VERIFY].
- **Stage 1 rules of the promotion ladder** → Tiny fixed size, max 3 positions, written thesis+falsifier+exit before ordering, no leverage — graded on process only.
- **Permanent ruin rules** → Three max losses dent the sleeve not the life; no name dominates; leverage banned until the scoreboard has years.

**QUIZ:**
1. In the professional order of operations, the active stock-picking sleeve exists…
   - A. Instead of an index core
   - ✅ B. On top of a cash buffer and low-cost index core, never instead of it
   - C. Before any savings
   - D. Only with borrowed money
   - _Explanation:_ The boring core is the portfolio; the active sleeve is an alpha experiment layered on top.
2. In Stage 1 of the promotion ladder, promotion is graded on…
   - ✅ A. Process only: complete journal, zero impulse entries, every falsifier honored
   - B. Total P&L for the quarter
   - C. Beating the index
   - D. Number of trades placed
   - _Explanation:_ At this sample size returns are noise; obeying your own rules is the measurable skill.

## REPS.4 — The honest fork and the honest ceiling  `id: r_ceiling`

**PREDICT (shown before the lesson unlocks):** After three years, your process is disciplined but your returns quietly trail a plain index fund. Is that failure — and what should you do with that finding?

**LESSON:**

After two to three years of graded reps, the scoreboard (Tier 8) says one of two things — and reading it honestly is the whole point.

**The fork.** If process *and* results hold up: scale carefully; the compounding is real in both capital and reputation. If process holds but results persistently lag the index: the no-BS conclusion is that your edge is in the **analysis, not the trading** — the core stays passive, and the craft itself becomes the product (research, audience, tools). **That outcome is not failure.** It is what the data shows for most professionals, and having a scoreboard that proves you faced it honestly is a rarer credential than returns. Either fork ends with you valuable. **Refusing to read the scoreboard is the only losing path.**

And the honest ceiling of the whole module:

**The honest ceiling.** No curriculum contains everything, because the last layer of this game is not information. It is: reps (hundreds of filings, thousands of drills), cycles lived through with real stakes, a graded public record, and the judgment that only forms when you have been wrong in public and survived it. Anyone selling a course that claims to replace those is running Trap #10 (Tier 7). This module ends where authority begins: at the scoreboard.

**TEACH-BACK:** Explain the honest fork and why refusing to read the scoreboard is the only losing path, in 5 sentences.

**FLASHCARDS:**
- **The honest fork** → After 2–3 years: results hold → scale carefully; results lag but process holds → edge is in the analysis, and craft becomes the product.
- **Why lagging the index is not failure** → It is what the data shows for most professionals — and a scoreboard proving you faced it is rarer than returns.
- **The last layer of the game** → Not information — reps, lived cycles, a graded public record, and the judgment of being wrong in public and surviving.

**QUIZ:**
1. If your process is disciplined but your returns persistently lag the index, the honest conclusion is…
   - A. You failed and should quit
   - ✅ B. Your edge is likely in the analysis, not the trading — and that is not failure
   - C. You should add leverage
   - D. The scoreboard is wrong
   - _Explanation:_ Core stays passive; the craft becomes the product. Facing it honestly is itself a rare credential.
2. The module says the only truly losing path is…
   - A. Lagging the index
   - B. Being wrong in public
   - ✅ C. Refusing to read the scoreboard
   - D. Staying passive
   - _Explanation:_ Either fork leaves you valuable; only refusing to read the graded record forfeits the game.

---
# GATE-EXAM QUESTION BANKS (adaptive drills, pass ≥85%)
Difficulty tags: d1 easy · d2 medium · d3 hard. Served adaptively: start medium, step up on a hit, down on a miss; harder items weigh more in the score.

## Gate bank T0 — Tier 0 · Money & Ownership from Zero (10 items)
1. `[d1]` Stock J trades at $4 with 5 billion shares. Stock K trades at $800 with 10 million shares. Which company is worth more?
   - ✅ A. J, by about $12B
   - B. K, by about $12B
   - C. They are equal
   - D. Cannot tell without profit figures
   - _Explanation:_ J = $4 x 5B = $20B; K = $800 x 10M = $8B. The low-priced stock is the bigger company by $12B.
2. `[d1]` A savings vehicle grows about 4% per year. Roughly how long until the money doubles?
   - A. 9 years
   - B. 12 years
   - C. 36 years
   - ✅ D. 18 years
   - _Explanation:_ Rule of 72: 72 / 4 = 18 years to double.
3. `[d1]` A $600 position falls to $300. What percentage GAIN is now required just to return to $600?
   - A. +50%
   - ✅ B. +100%
   - C. +200%
   - D. +300%
   - _Explanation:_ From $300 back to $600 is a doubling: +100%. A 50% loss always needs a 100% gain.
4. `[d2]` A stock shows bid $12.00 / ask $12.06. You buy at market, then sell at market one second later with the price unchanged. Your loss per share is about…
   - ✅ A. $0.06
   - B. $0.00
   - C. $0.03
   - D. $0.60
   - _Explanation:_ Buy at the ask, sell at the bid: the $0.06 spread is the toll paid on the round trip.
5. `[d2]` Two identical index funds each return 6%/yr for decades. One charges 1.0%/yr, the other 0.04%/yr. The higher-fee investor ends with…
   - A. A rounding-error difference
   - B. About 1% less in total
   - C. Roughly the same after fees
   - ✅ D. Meaningfully less — the ~1% gap compounds into a large share of the final balance
   - _Explanation:_ A ~1% annual fee compounds against you for decades, quietly claiming a large slice of the ending wealth.
6. `[d2]` You hold a bond paying a fixed $50/yr coupon. Newly issued bonds now pay $70/yr for the same price. Your older bond’s market price will…
   - A. Rise
   - B. Stay the same
   - ✅ C. Fall
   - D. Double
   - _Explanation:_ Price and yield seesaw: to compete with richer new bonds, the old bond must sell for less.
7. `[d2]` A company has 500 shares; you own 25 (5%). It buys back and retires 100 shares. Your ownership rises to…
   - A. 5%
   - ✅ B. 6.25%
   - C. 5.5%
   - D. 10%
   - _Explanation:_ 25 of the remaining 400 shares = 6.25%. Buybacks shrink the count and grow every surviving slice.
8. `[d3]` At about 6%/yr (money doubles roughly every 12 years), $5,000 left untouched for 36 years grows to about…
   - ✅ A. $40,000
   - B. $20,000
   - C. $80,000
   - D. $15,000
   - _Explanation:_ 36 years is three doublings (8x): $5,000 -> $10k -> $20k -> $40k.
9. `[d3]` An account drops 80%. What gain is required to return to its starting value?
   - A. +80%
   - B. +180%
   - ✅ C. +400%
   - D. +800%
   - _Explanation:_ Down 80% leaves 0.2x; recovering to 1.0x needs a 5x move = +400%. Deep losses are mathematically expensive.
10. `[d3]` Prices rise about 3%/yr while your bank cash earns about 1%/yr. In real (after-inflation) terms your cash each year is roughly…
   - A. Gaining 4%
   - ✅ B. Losing about 2%
   - C. Gaining 1%
   - D. Flat
   - _Explanation:_ Real return ≈ 1% earned minus 3% inflation = about -2% per year. Cash quietly shrinks.

## Gate bank T1 — Tier 1 · The Game Board (10 items)
1. `[d1]` News: Company Vireo will be ADDED to the S&P 500 at next Friday’s close. Index funds tracking that index are forced to…
   - A. Sell Vireo immediately
   - ✅ B. Buy Vireo by that Friday’s close, at whatever price
   - C. Ignore the change
   - D. Vote against it
   - _Explanation:_ Index funds must hold the basket by the rules. Inclusion forces buying on a public, scheduled date.
2. `[d1]` You buy 100 existing shares of Meridian Corp on the exchange. How much of your money does Meridian receive?
   - A. All of it
   - B. Half
   - C. A small fee
   - ✅ D. None — the seller receives it
   - _Explanation:_ Secondary-market trades move claims between players. The company was paid only at issuance.
3. `[d1]` A stock that ran up 250% is suddenly the top story on every finance channel. As a FORWARD signal, peak coverage most reliably marks…
   - A. A buying opportunity
   - ✅ B. An attention peak, often after the move
   - C. A company breakthrough
   - D. Nothing at all
   - _Explanation:_ Coverage saturates after the price has run; peak attention tends to mark tops, not opportunity.
4. `[d2]` A pension targets 70% stocks / 30% bonds. A crash drops the mix to 60/40. To restore the target it is forced to…
   - A. Sell stocks and buy bonds
   - B. Shut down
   - ✅ C. Buy stocks and sell bonds
   - D. Do nothing
   - _Explanation:_ Rebalancing mechanically buys what fell and sells what rose to return to policy weights.
5. `[d2]` A hedge fund’s 3-year thesis is down 25% this year and clients can redeem at quarter-end. Redemptions most likely force the manager to…
   - ✅ A. Sell — even while she still believes the thesis
   - B. Add heavily to the position
   - C. Extend the thesis
   - D. Buy a call
   - _Explanation:_ Quarterly redemptions and career risk force selling now, regardless of a longer-term view.
6. `[d2]` A stock rallies for two weeks INTO its index-inclusion day, then drifts lower for weeks after. The most mechanical explanation is…
   - A. The company weakened
   - B. Index funds sold it
   - C. Short sellers attacked
   - ✅ D. Front-runners bought ahead; once the forced index buying finished, the anticipatory demand was gone
   - _Explanation:_ The flow was the story: pre-positioning runs it up, and the bid vanishes once mandated buying completes.
7. `[d2]` In a thin, low-volume market a fund must liquidate a huge block by today’s close. The likely effect and beneficiary…
   - ✅ A. Price falls hard on forced urgency; patient buyers collect the discount
   - B. Price rises; shorts pay
   - C. No effect at all
   - D. Trading halts automatically
   - _Explanation:_ Urgency at the margin sets the price. Forced sellers pay; patient counterparties collect bargains.
8. `[d3]` A venture fund publicly praises a still-private portfolio company just before its IPO. Beyond belief, the fund is structurally forced to…
   - A. Hold the stake forever
   - B. Short the stock
   - ✅ C. Eventually find public buyers to exit within its fund life — the praise recruits them
   - D. Pay a dividend
   - _Explanation:_ Fund clocks force exits; talking the book recruits the buyers those exits require.
9. `[d3]` Company Dax will be DROPPED from an index at month-end. Funds tracking that index are forced to…
   - A. Buy more Dax
   - ✅ B. Sell Dax by the effective date regardless of price
   - C. Hold Dax indefinitely
   - D. Sue the index provider
   - _Explanation:_ Removal forces price-blind selling on a known date — the mirror image of inclusion buying.
10. `[d3]` A large pension announces it will shift 5% from stocks to bonds over the coming quarter. A trader using the master key expects…
   - A. Random, unpredictable moves
   - B. An immediate crash
   - ✅ C. Predictable, scheduled selling in stocks and buying in bonds
   - D. Nothing worth noting
   - _Explanation:_ Announced, mandated reallocations are calendar-known flows — the essence of the master key.

## Gate bank T2 — Tier 2 · The Machine (10 items)
1. `[d1]` Your broker charges $0 commission yet stays in business. The most direct source of its revenue is…
   - A. A government subsidy
   - ✅ B. Market makers paying it for your order flow
   - C. Interest you pay on trades
   - D. Nothing — it operates at a loss
   - _Explanation:_ Payment for order flow: makers pay brokers for safe retail orders; your cost moved into the spread.
2. `[d1]` To CLOSE a short position, a trader must…
   - ✅ A. Buy shares back
   - B. Sell more shares
   - C. Borrow additional shares
   - D. Collect a dividend
   - _Explanation:_ A short is closed by buying to return the borrowed shares — which is why squeezes feed on themselves.
3. `[d1]` As each day passes with the underlying stock unchanged, a bought option’s time value…
   - A. Rises, helping the buyer
   - B. Stays perfectly fixed
   - ✅ C. Drains toward the seller
   - D. Is refunded at expiry
   - _Explanation:_ Theta decay transfers time value from buyer to seller daily — the structural house edge.
4. `[d2]` Nyx IPOs at $20/share and opens for public trading at $32. Mechanically, the $12 gap is a transfer from…
   - A. Retail to the SEC
   - B. Banks to retail
   - C. Nobody — no one paid
   - ✅ D. The company (foregone proceeds) to the allocated institutions
   - _Explanation:_ The company sold at $20 what buyers valued at $32; the gap went to whoever received offer-price allocations.
5. `[d2]` You buy $16,000 of stock using $8,000 of your own cash plus $8,000 on margin. The stock falls 25%. Your loss as a percentage of YOUR cash is…
   - A. 25%
   - ✅ B. 50%
   - C. 12.5%
   - D. 100%
   - _Explanation:_ A 25% fall on $16,000 is a $4,000 loss; $4,000 of your $8,000 = 50%. The loan does not shrink, only your side.
6. `[d2]` A new listing floats only 15% of its shares; the other 85% unlocks in 180 days. That unlock date represents…
   - A. Scheduled demand
   - B. Nothing tradable
   - ✅ C. A calendar-known jump in potential SUPPLY
   - D. A guaranteed buyback
   - _Explanation:_ Lockup expiry is scheduled supply: on a known date the tradable share count can multiply.
7. `[d2]` Just after an IPO the price sags below the offer. Using the greenshoe, the underwriters can…
   - A. Cancel the IPO
   - ✅ B. Buy shares back to cover their over-allotment, supporting the price
   - C. Sue short sellers
   - D. Force a dividend
   - _Explanation:_ The greenshoe lets banks cover extra allotted shares with a stabilizing bid when the price sags.
8. `[d3]` A heavily shorted stock spikes; shorts covering must BUY, pushing price higher and forcing more covering. This self-feeding loop is…
   - A. A dividend trap
   - B. Theta decay
   - C. A greenshoe
   - ✅ D. A short squeeze
   - _Explanation:_ The only exit from a short is a buy; forced buys lift the price and trigger more forced buys.
9. `[d3]` Why are buyers of weekly (very short-dated) call options the most reliably harvested group?
   - ✅ A. They must be right on direction, size, AND deadline while the seller just needs time to pass
   - B. They pay no premium
   - C. The options are free
   - D. They always win
   - _Explanation:_ Short-dated buyers face the steepest theta and must clear three hurdles at once; the seller only needs the clock.
10. `[d3]` In a leveraged selloff, each forced liquidation is a market sell that pushes prices to the next liquidation threshold. This describes…
   - A. A quiet period
   - B. A roadshow
   - ✅ C. A liquidation cascade
   - D. Payment for order flow
   - _Explanation:_ Cascades are mechanical: every forced sale trips the next tripwire, so leveraged markets fall in air pockets.

## Gate bank T3 — Tier 3 · Reading the Money (10 items)
1. `[d1]` A filing shows operating cash flow of $600M and capital expenditures of $250M. Free cash flow is…
   - A. $850M
   - B. $600M
   - ✅ C. $350M
   - D. $250M
   - _Explanation:_ FCF = operating cash flow minus capex = 600 - 250 = $350M.
2. `[d1]` Of the three statements, the one hardest to fake — because the money is either there or it is not — is the…
   - A. Income statement
   - B. Balance sheet
   - ✅ C. Cash flow statement
   - D. Press release
   - _Explanation:_ Cash flow is the truth statement; opinion and estimates live upstream of the bank balance.
3. `[d1]` Revenue grew 8% but accounts receivable grew 40%. The mechanical concern is that…
   - A. Demand is booming
   - ✅ B. Sales are being booked well ahead of cash collection
   - C. Costs collapsed
   - D. The firm is debt-free
   - _Explanation:_ Receivables outgrowing revenue is the classic tell that recognized sales are running ahead of real cash.
4. `[d2]` Operating cash flow is −$300M while financing cash flow is +$500M, year after year. The gap is funded by…
   - A. Profits
   - B. Customers
   - C. Nothing
   - ✅ D. Selling new stock or debt to investors
   - _Explanation:_ The business consumes cash and lives by tapping markets — fine until the financing window closes.
5. `[d2]` A company has $80M cash and $2B of debt maturing next year, with weak operating cash flow. Its survival most depends on…
   - A. Its share price
   - ✅ B. Refinancing on the market’s terms and mood
   - C. Its dividend policy
   - D. Its brand
   - _Explanation:_ Companies die at maturities, not totals: a near-term debt wall outsources survival to the credit market.
6. `[d2]` Net share count rises about 7%/yr from stock-based comp, even as buybacks are announced. Your per-share claim on the business is…
   - ✅ A. Shrinking — net dilution is the silent tax
   - B. Growing
   - C. Unchanged
   - D. Doubling
   - _Explanation:_ Net count is what matters: issuance can out-dilute the buyback headlines, quietly shrinking your slice.
7. `[d2]` A company touts record "adjusted EBITDA" while GAAP losses widen and it excludes stock-based comp from the adjustment. That adjusted figure is…
   - A. The truest measure of profit
   - ✅ B. Profit after ignoring real costs, including pay funded by diluting you
   - C. Cash in the bank
   - D. Independently audited as cash
   - _Explanation:_ "Adjusted" often means the losses management asks you to ignore; excluded SBC is real, dilutive pay.
8. `[d3]` A company reports positive net income but negative free cash flow for three straight years. This most likely means…
   - A. Nothing unusual
   - B. It must be debt-free
   - ✅ C. Reported profit is not converting to cash — investigate the divergence and how the gap is funded
   - D. Revenue is certainly fraudulent
   - _Explanation:_ Profit (opinion) diverging from cash (truth) for years is exactly where the questions live.
9. `[d3]` Within one quarter the auditor resigns, the CFO departs before results, and the footnotes double in length. The correct reading is…
   - A. Routine turnover
   - B. Bullish news
   - C. Irrelevant noise
   - ✅ D. A serious RED-FLAG CLUSTER — those closest to the books are leaving them
   - _Explanation:_ No single flag convicts, but the referee and scorekeeper leaving together is the cluster rule at its loudest.
10. `[d3]` Net income is $400M but operating cash flow is only $120M, so cash conversion is low. This suggests…
   - ✅ A. Reported profit (opinion) is outrunning cash (truth)
   - B. Excellent earnings quality
   - C. More cash than profit
   - D. An imminent buyback
   - _Explanation:_ Low conversion means little of the reported profit is becoming real cash — a quality warning.

## Gate bank T4 — Tier 4 · What a Price Means (10 items)
1. `[d1]` A stock trades at a P/E of 25. In plain terms, you are paying about…
   - A. $25 per share
   - ✅ B. About 25 years of the company’s current annual earnings upfront
   - C. 25% interest
   - D. A 25% dividend
   - _Explanation:_ P/E compresses the forecast: 25x means roughly 25 years of today’s earnings paid in advance.
2. `[d1]` A company everyone agrees is flawless posts a flawless quarter — exactly as expected. Its stock most likely…
   - A. Soars
   - B. Crashes to zero
   - ✅ C. Barely moves; the perfection was already priced in
   - D. Pays a special dividend
   - _Explanation:_ Meeting expectations already embedded in the price is, by definition, unsurprising — returns are muted.
3. `[d1]` A base rate tells you…
   - A. This company’s unique story
   - B. Tomorrow’s price
   - C. The CEO’s opinion
   - ✅ D. How often an outcome has historically happened across all similar cases
   - _Explanation:_ The base rate is the outside view: the measured frequency of an outcome across the full population.
4. `[d2]` A stock at 7x earnings looks "cheap," but its industry is shrinking and margins are falling. This is most likely…
   - A. A bargain
   - B. A growth stock
   - C. Mispriced upward
   - ✅ D. A value trap — the low multiple reflects forecast decline
   - _Explanation:_ A low multiple can be "cheap" precisely because the market correctly forecasts a declining business.
5. `[d2]` A cyclical commodity producer shows its LOWEST P/E right at the top of its boom. Why?
   - ✅ A. Peak earnings temporarily shrink the ratio just before earnings fall
   - B. Investors are smartest then
   - C. It is always cheap
   - D. P/E behaves randomly
   - _Explanation:_ A temporarily fat E shrinks the ratio at the peak — the multiple lies through its denominator.
6. `[d2]` A pitch says: "The market is $8 trillion; capturing just 1% is $80B in revenue." The core flaw is…
   - A. The arithmetic is wrong
   - B. 1% is too ambitious
   - ✅ C. Every dollar of that market is already owned and defended — share is taken, not granted
   - D. $8 trillion is too small
   - _Explanation:_ There is no unclaimed 1% in a drawer; each dollar has an incumbent who will fight to keep it.
7. `[d2]` A company trades at 60x sales. The disciplined interpretation is…
   - A. It is obviously a scam
   - B. Cheap if it merely grows
   - C. Impossible to analyze
   - ✅ D. A specific bet that revenue and margins must multiply enormously — extract and test it
   - _Explanation:_ Every price implies a path; the job is to state the required future and check it against history.
8. `[d3]` To reverse-engineer what a price assumes, the chain runs: price → required value at the horizon → ÷ assumed multiple = required earnings → ÷ margin = required revenue → implied…
   - A. dividend
   - ✅ B. growth rate to test against base rates
   - C. share price
   - D. credit rating
   - _Explanation:_ The extraction ends in an implied growth rate you can judge against how rarely it has occurred.
9. `[d3]` Comparing a software firm’s P/S of 12 to a supermarket’s P/S of 0.4 is misleading because…
   - ✅ A. Their margin structures are utterly different — a sales dollar converts to profit very differently
   - B. Software is newer
   - C. Supermarkets have no sales
   - D. P/S is banned across industries
   - _Explanation:_ Multiples only compare like machines; cross-industry ratios compare apples to forklifts.
10. `[d3]` Stock returns structurally come from…
   - A. Company quality alone
   - B. Brand recognition
   - ✅ C. The gap between what the price assumed and what reality delivered
   - D. Trading volume
   - _Explanation:_ Quality already in the price is neutralized; only the expectation-versus-reality gap pays.

## Gate bank T5 — Tier 5 · Cycles & Macro (10 items)
1. `[d1]` Interest rates jump from 1% to 5%. With no change in the businesses, which valuation falls hardest?
   - A. A bank earning steady profits today
   - ✅ B. A startup whose profits arrive mostly after year 10
   - C. A cash-rich utility
   - D. They fall equally
   - _Explanation:_ Distant cash is discounted exponentially harder; long-duration growth swings most when rates rise.
2. `[d1]` The Fed raises rates exactly as markets had expected. The typical reaction is…
   - A. A huge rally
   - B. A sharp crash
   - ✅ C. Little movement — the expected path was already priced
   - D. An automatic trading halt
   - _Explanation:_ Markets trade the gap between expected and actual; a fully anticipated move re-prices nothing.
3. `[d1]` A borrower can pay interest but must roll over the principal forever. In Minsky’s terms this is…
   - ✅ A. Speculative finance
   - B. Hedge finance
   - C. Ponzi finance
   - D. Risk-free finance
   - _Explanation:_ Speculative finance covers interest only and depends on refinancing windows staying open.
4. `[d2]` $1 due in 10 years is worth about $0.61 today at a 5% rate, versus about $0.90 at 1%. This illustrates that…
   - A. Inflation is 5%
   - ✅ B. Rising rates shrink the value of DISTANT cash the most
   - C. A dividend was cut
   - D. A buyback occurred
   - _Explanation:_ Discounting bites hardest on far-off dollars — the mechanical core of rates-as-gravity.
5. `[d2]` In the "distribution" act of a bubble, the mechanically telling evidence is…
   - A. CEO interviews
   - B. Analyst price targets
   - C. Social-media enthusiasm
   - ✅ D. Insider sale filings and secondary offerings — what informed holders DO
   - _Explanation:_ Act four is watched in disclosures: enthusiastic words often accompany quiet insider exits.
6. `[d2]` A rising stock price lets a firm raise cheap capital, pay talent in valuable stock, and buy rivals with paper — genuinely strengthening it. This feedback is called…
   - A. Discounting
   - ✅ B. Reflexivity
   - C. Diversification
   - D. Theta decay
   - _Explanation:_ Reflexivity: prices change fundamentals, not just reflect them — the high price manufactures the strength.
7. `[d2]` A borrower whose income covers NEITHER interest nor principal, surviving only if the asset’s price keeps rising, is in…
   - A. Hedge finance
   - B. Speculative finance
   - ✅ C. Ponzi finance
   - D. Risk-free finance
   - _Explanation:_ Ponzi finance depends entirely on rising prices; when prices stall, these positions must liquidate at once.
8. `[d3]` Which is a properly falsifiable macro claim?
   - A. "AI will change everything"
   - B. "This is clearly a bubble"
   - ✅ C. "If AI revenue does not reach $150B by end of 2027, the speculative-finance read holds"
   - D. "Stocks feel expensive right now"
   - _Explanation:_ A falsifiable claim carries a specific condition and a date that could prove it wrong — exactly what Gate 5 requires.
9. `[d3]` The Fed hikes MORE than markets expected. The mechanical result is…
   - A. No change
   - B. A guaranteed rally
   - C. Inflation falls instantly
   - ✅ D. A broad re-pricing lower, especially of long-duration assets
   - _Explanation:_ A hawkish surprise re-prices all future dollars downward; the longest-duration promises fall first.
10. `[d3]` A bank with solid stated numbers can still collapse when depositors doubt it because…
   - ✅ A. For confidence-dependent firms, belief itself is the fundamental — doubt triggers the withdrawals that cause insolvency
   - B. Reported numbers always lie
   - C. Regulators force every doubted bank to close
   - D. Falling rates bankrupt banks
   - _Explanation:_ Reflexivity’s dark side: confidence is the fundamental, so the feared failure becomes self-fulfilling.

## Gate bank T6 — Tier 6 · The Elite Playbook (10 items)
1. `[d1]` Of insider activity, the CLEANEST bullish signal is generally…
   - A. An insider selling shares
   - ✅ B. An open-market purchase made with the insider’s own money
   - C. A company press release
   - D. An analyst upgrade
   - _Explanation:_ Open-market buys are the cleanest signal in finance; sells are ambiguous (taxes, diversification, plans).
2. `[d1]` Nearly every sell-side analyst rates a stock "Buy." A mechanism-first reading is that this…
   - A. Guarantees future gains
   - B. Is illegal
   - ✅ C. May be an incentive artifact — research orbits banking relationships
   - D. Says nothing about incentives
   - _Explanation:_ Sell-side pay flows through banking and trading ties, so near-unanimous Buys reflect incentives, not proof.
3. `[d1]` A hedge fund is forced to sell a position it still believes in mainly because…
   - A. Regulators require it
   - ✅ B. Clients can redeem and career risk punishes being down now
   - C. It ran out of ideas
   - D. The CEO of the stock asked
   - _Explanation:_ Redemptions plus career risk force short horizons: right-eventually gets sold to survive down-now.
4. `[d2]` A VC publicly hypes a portfolio company on TV. Regardless of belief, she is next structurally forced to…
   - A. Hold it forever
   - B. Short it
   - C. Pay extra taxes
   - ✅ D. Find buyers and exits within the fund’s life — the hype recruits them
   - _Explanation:_ The power law and a ~10-year fund clock force exits; the public optimism is inventory marketing.
5. `[d2]` Management aggressively buys back its OWN stock after a large price drop. If shares truly sit below their worth, this signals…
   - A. Panic
   - ✅ B. Management’s honest opinion that the stock is undervalued
   - C. Certain fraud
   - D. An imminent dividend cut
   - _Explanation:_ Buybacks vs. dilution reveal management’s true opinion — repurchasing below worth grows every remaining slice.
6. `[d2]` Sell-side analysts are ultimately paid through…
   - ✅ A. Their firm’s banking and trading relationships — a structural conflict
   - B. Retail subscription fees
   - C. A fee from the SEC
   - D. Nothing at all
   - _Explanation:_ Because research revenue leans on banking relationships, its ratings carry a built-in conflict.
7. `[d2]` An insider SELLS a chunk of stock. The correct reading is…
   - A. Certain trouble ahead
   - B. Always bullish
   - C. Illegal by default
   - ✅ D. Ambiguous — diversification, taxes, or a scheduled 10b5-1 plan are all innocent explanations
   - _Explanation:_ Sells are ambiguous by design; only open-market BUYS give a clean read on conviction.
8. `[d3]` Under "2-and-20," a manager earns 2% of ASSETS plus 20% of profits. The 2% alone incentivizes managers to…
   - ✅ A. Gather and retain assets, win or lose
   - B. Beat the market every year
   - C. Return capital quickly
   - D. Waive their fees
   - _Explanation:_ A fee on assets pays whether or not clients profit — the incentive is to accumulate and keep assets.
9. `[d3]` The brief’s "liberating conclusion" is that a small operator’s only durable edge over institutions is…
   - A. Better information
   - B. Faster trade execution
   - ✅ C. A long time horizon institutions are structurally denied
   - D. Access to more leverage
   - _Explanation:_ Institutions are structurally short-term; the small operator can hold through periods they cannot.
10. `[d3]` A company announces a big buyback while its executives personally SELL shares on Form 4 the same month. This combination is…
   - A. Purely bullish
   - B. Purely bearish
   - ✅ C. A mixed signal worth scrutiny — corporate action and personal conviction diverge
   - D. Completely meaningless
   - _Explanation:_ Corporate buying alongside personal selling is a divergence that deserves a closer look, not a simple verdict.

## Gate bank T7 — Tier 7 · The Trap Catalog (10 items)
1. `[d1]` A $0.80 stock is suddenly hyped across anonymous group chats urging people to "buy now before it runs." The trap is…
   - A. A dividend program
   - ✅ B. A pump-and-dump — organizers distribute their accumulated shares to new buyers
   - C. A normal IPO
   - D. A buyback
   - _Explanation:_ Accumulate quietly, seed hype, spike the price, distribute to bagholders. The tell is coordinated urgency in a micro-cap.
2. `[d1]` A trading guru sells a $2,000 course promising his "system." His reliable profit actually comes from…
   - ✅ A. Course sales — his P&L is the tuition, not the trades
   - B. His trading gains
   - C. Dividends
   - D. SEC rebates
   - _Explanation:_ In a guru funnel the seller’s income is the course; the trades are the marketing, not the business.
3. `[d1]` Studies show fund investors often earn LESS than the very funds they hold. The mechanism is…
   - A. Only high fees
   - ✅ B. Buying after rallies and selling after drops — bad timing, the behavior gap
   - C. Taxes alone
   - D. Pure luck
   - _Explanation:_ The behavior gap: investors add near tops and flee near bottoms, so their timing lags the fund itself.
4. `[d2]` An influencer who loudly promoted a token quietly SOLD his entire stake without disclosing it. The trap and its tell are…
   - ✅ A. Bag-dumping; the tell is undisclosed selling while still promoting
   - B. A buyback; there is no tell
   - C. An IPO; the tell is the price
   - D. Diversification; there is no tell
   - _Explanation:_ Influencer bag-dumping is defused by the disclosure tell: promotion continuing while the promoter exits unannounced.
5. `[d2]` A pitch sells retail a "safe monthly income" strategy of writing covered calls. The hidden cost the pitch omits is…
   - A. There is no cost
   - B. Guaranteed total loss
   - ✅ C. Capped upside and real downside are traded for the premium — the give-up is hidden
   - D. It is outright illegal
   - _Explanation:_ Options "income" strategies sell away upside and keep downside; the "income" is premium for real risk.
6. `[d2]` In a typical SPAC, the sponsor receives founder shares for a token sum (the "promote"). This means the sponsor profits…
   - A. Only if public investors profit
   - B. Never before public investors
   - ✅ C. Even if the merged company later performs poorly for public holders
   - D. Only from dividends
   - _Explanation:_ The sponsor promote pays off on the deal closing, so incentives can favor any merger over a good one.
7. `[d2]` A stock reaches maximum media saturation after a huge run. History suggests entering here tends to produce…
   - A. The best forward returns
   - B. Guaranteed gains
   - C. No discernible pattern
   - ✅ D. Among the WORST forward returns — peak coverage marks attention, not opportunity
   - _Explanation:_ Narrative-peak entries: maximum coverage tends to mark attention tops, and forward returns are poor.
8. `[d3]` A company issues new shares every year to fund operations, steadily lifting its share count. The trap for holders is…
   - A. Higher dividends
   - B. A guaranteed buyback
   - ✅ C. The dilution treadmill — each holder’s claim quietly shrinks; the tell is rising share count
   - D. Lower risk
   - _Explanation:_ Serial dilution silently transfers ownership away from holders; the tell is a share count that only climbs.
9. `[d3]` A guru advertises "my last 10 picks all won." The most important missing information is…
   - A. His age
   - B. His office location
   - C. His broker
   - ✅ D. The picks he does NOT show — survivorship bias hides the losers
   - _Explanation:_ Survivorship bias: a curated set of winners tells you nothing without the full record of all calls.
10. `[d3]` Six months after an IPO, a wave of insider shares becomes sellable on a known date. The trap for late buyers is…
   - A. A short squeeze
   - ✅ B. A lockup cliff — scheduled supply can swamp demand; the tell is the calendar date
   - C. A dividend cut
   - D. Payment for order flow
   - _Explanation:_ Lockup expiry is scheduled supply printed on the calendar; unaware holders sit through predictable selling.

## Gate bank T8 — Tier 8 · The Craft (10 items)
1. `[d1]` Which of these is a properly falsifiable thesis?
   - A. "This company is great"
   - B. "The stock will go up"
   - ✅ C. "If free cash flow is not positive by Q4 2027, my thesis is wrong"
   - D. "Everyone loves this product"
   - _Explanation:_ A real thesis carries a condition and a date that would prove it wrong — the others cannot be tested.
2. `[d1]` You made a reckless, rule-breaking trade that happened to profit. Grading PROCESS, this trade is…
   - A. Excellent, because it made money
   - ✅ B. Bad process that got lucky; the good outcome hides the mistake
   - C. Irrelevant to judge
   - D. Perfect
   - _Explanation:_ Process-over-outcome: a lucky win from broken rules is a bad decision, and the profit disguises it.
3. `[d1]` A decision journal earns its value by recording your reasoning…
   - A. After you see the result
   - B. Only for winning trades
   - C. Never — memory is enough
   - ✅ D. Before the outcome is known, so process can be graded honestly
   - _Explanation:_ Logging reasoning before results is what lets you grade the decision instead of rationalizing the outcome.
4. `[d2]` Position sizing "to survive being wrong three times" means each bet is small enough that…
   - A. One win doubles your account
   - B. You never take a loss
   - ✅ C. Three consecutive maximum losses still leave you able to keep playing
   - D. You can safely use leverage
   - _Explanation:_ Sizing for survival keeps three straight max losses from denting the life — you live to compound.
5. `[d2]` You scan for ideas and none meet your written criteria this week. The correct action is…
   - ✅ A. Do nothing — cash is a position and boredom is not a reason to act
   - B. Force a trade anyway
   - C. Add leverage to a marginal idea
   - D. Buy the most hyped name
   - _Explanation:_ Doing nothing is a valid position; acting out of boredom is exactly the impulse the process guards against.
6. `[d2]` At quarter-end, during your first live stage, you should grade yourself primarily on…
   - ✅ A. Process — journal complete, rules honored, no impulse entries — since returns are noise at small samples
   - B. Total profit only
   - C. Your single best trade
   - D. Follower count
   - _Explanation:_ At small samples returns are noise; obeying your own rules is the skill the promotion gate measures.
7. `[d2]` Which added element turns "I think Orion is undervalued" into a testable thesis?
   - A. More confidence
   - ✅ B. A specific condition and DATE that would prove it wrong
   - C. A bigger position size
   - D. A price chart
   - _Explanation:_ A falsifier with a date converts an opinion into a claim the scoreboard can grade.
8. `[d3]` Your active sleeve is $9,000. You want three consecutive total single-position losses to cost at most 30% of the sleeve. Maximum size per position is about…
   - A. $300
   - ✅ B. $900
   - C. $2,700
   - D. $3,000
   - _Explanation:_ 30% of $9,000 is $2,700; divided across three losses is $900 per position.
9. `[d3]` The MOST important thing to capture in a decision journal entry is…
   - A. The eventual outcome
   - B. The stock’s chart color
   - C. Other people’s opinions
   - ✅ D. Your reasoning, evidence, the price-implied expectations, and the falsifier — recorded before results
   - _Explanation:_ The entry exists to freeze your pre-outcome reasoning so process can be graded, not luck.
10. `[d3]` The "paper-first, then real money as tuition" protocol means…
   - A. Bet big immediately
   - B. Never use real money
   - ✅ C. Track theses publicly first, then enter real money sized so a total loss has zero life impact
   - D. Use maximum leverage from day one
   - _Explanation:_ Theses are proven on the public scoreboard first; real money enters tiny, as an affordable emotional lab fee.

---
## OPEN QUESTIONS FOR THE CRITIQUE PASS
1. Typed-recall drills (§2.4) vs. current multiple-choice + teach-back — build a typed-answer mode?
2. Hard tier locks at 85% gates (§2.6) vs. current advisory gates?
3. Part III reps counters (journal streak, filings odometer, prediction log, etc.) as first-class tracked counters — priority and shape?
4. Content: verify all [VERIFY] tags, check every arithmetic example, flag any hype-adjacent phrasing, missing "who benefits" answers, or tier-content gaps vs. the brief.
5. TX (Tiers 9–14) ships condensed to one lesson per tier — expand any to full lesson sets?