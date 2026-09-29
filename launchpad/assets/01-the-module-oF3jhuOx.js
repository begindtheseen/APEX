var e=`---
id: m34-the-module
title: "Reading the Model Landscape — what to understand and what to build"
minutes: 9
covers:
  - "The map as a structure: closed frontier labs that serve only through their own API and licensed clouds, and open-weight families whose weights anyone can download and serve"
  - "Inference providers: the same open-weight model sold by many hosts at different prices, speeds and precisions — and under the host's data terms, not the maker's"
  - "Tiers inside a family (flagship, mid, small), and why the small tier is usually the product answer once it clears your bar"
  - "Reading a model card and a system card: knowledge cutoff, modalities, context window and output cap, reasoning controls, the evaluation setup behind every headline number, and what the card does not say"
  - "Benchmarks and how they fail: contamination, saturation and leaderboard gaming"
  - "Arena-style human preference votes versus task benchmarks — voters reward length and formatting, a task benchmark measures one task under one setup, and neither is your task"
  - "Cost per completed task, not price per token: tokenizers differ between makers and reasoning models bill thinking tokens as output"
  - "Latency as a selection criterion: time-to-first-token and total latency at p50 and p95, with the request count behind them"
  - "Context window, output cap, rate-limit tier and data-retention and training-use terms as hard filters before quality is even compared"
  - "Open weights are not open source: permissive licenses versus community licenses with user thresholds, acceptable-use policies, naming rules or limits on training other models"
  - "Model lifecycles: pinned snapshot versus moving alias, deprecation and retirement, and the forced migration a retirement schedules for you"
  - "Your own M12 test set outranks every public leaderboard, run paired with an interval and with each candidate given the same prompt-adaptation budget"
  - "The afternoon protocol and the dated profile card: sizing up any model in four hours, and keeping your own copy current through Track 11"
---
Until now you have used one maker's models, picked by default in M2 and changed once, deliberately, in
M12's model-family migration. Working AI developers have no default: they size up a new model in an
afternoon and can say, with numbers, why this model and not the five beside it. This module turns that
one migration into a method for any model from any maker, and hands you the map of who makes what. It
assumes the M12 harness and its held-out test set, and M33, which makes a model card legible:
*mixture-of-experts*, *reasoning model*, *post-training* and *knowledge cutoff* are words you can now
check rather than repeat. It feeds M35, M36, M40 and Track 11, which starts here.

**Core concepts:** **The map is a structure, not a list.** **Closed frontier labs** serve their models
only through their own API and the clouds they license to; **open-weight families** publish the weights
(the trained numbers themselves) for anyone to download and serve, so the same model is sold by many
**inference providers** (companies that run models and sell calls to them) at different prices, speeds
and precisions. **Tiers inside a family** — flagship, mid, small; this page says *large* for the top
one, so that *the flagship* still means your app — are one training lineage at different sizes and
prices, and **the small tier is usually the product answer**: most product tasks are narrow, the small
tier costs a fraction and answers faster, and the only question is whether it clears your bar. **Reading
a model card and a system card**: the model card says what a model is for, how it was evaluated and
where it fails; the system card is the lab's longer safety and capability report at release. Extract the
[[knowledge cutoff|knowledge-cutoff]], [[the modalities|modalities]], the context window and output cap, the reasoning controls, the
evaluation setup behind every headline number (attempts, tools, the *scaffold* — the harness code
wrapped around the model), and what the card does not say. **Benchmarks and how they fail**:
contamination, saturation, leaderboard gaming, and the difference between **arena-style human preference
votes** and **task benchmarks** — neither is your task. **Selection criteria past quality**: price per
completed task rather than per token, time-to-first-token and throughput, context window, output cap,
[[rate-limit tier|rate-limit-tier]], and **data-retention and training-use terms**. **Open weights are not open source**,
and each license says what you may do. **Model lifecycles**: pinned snapshot versus moving alias, and
[[the deprecation|deprecation]] that turns into a forced migration. **Your own eval set outranks every public
leaderboard**, because it is the only one built from your traffic. And the **profile card**, your dated
record of one model, which Track 11 keeps current for the rest of your career.

> **The common belief that is wrong: the top of the leaderboard is the best model for you.** An arena
> ranking (the public site formerly called LMArena and Chatbot Arena, where people vote between two
> anonymous answers) measures which answer anonymous voters preferred on the prompts they chose to type,
> and voters reward length and formatting — which is why the arena publishes a [[style-controlled ranking|style-control]]
> beside the raw one. A task benchmark measures one task under one setup. Your flagship is neither.
> Public rankings build a shortlist; the decision comes from your M12 test set, paired, with an
> interval.

> **Contamination is not hypothetical.** A benchmark whose questions and answers are on the public web
> ends up in training data, and scores rise without the skill rising. In February 2026 OpenAI stopped
> reporting [[SWE-bench Verified|swe-bench]] after an audit found flawed tasks and frontier models reproducing the
> reference fixes word for word — read that write-up yourself. Saturation is the quieter version: when
> every frontier model scores near the ceiling, the benchmark stops separating them, and labs retire it.
> Gaming is the third: a maker that tests many private variants and publishes the best one reports its
> luckiest draw. Your test set escapes all three because nobody else has it. **Keep it that way: never
> paste test cases into a chat window, a public issue or a gateway's logged playground.**

> **"The same model" on two hosts is two systems.** An open-weight model served by two inference
> providers can differ in numeric precision (full versus quantized weights, which M36 measures), in the
> chat template (how the messages array is turned into one token stream, M6), in the context length the
> host actually allows, and in the host's data terms, which replace the maker's. Record the host and its
> declared precision with every score, or write that it declares none.

> **Currency: as perishable as M6.** Model names, tiers, prices, context windows, rate-limit tiers,
> retention terms, license versions and retirement dates change monthly, and a benchmark that mattered
> in spring can be retired by autumn. This page gives no value for any of them, on purpose. Appendix D
> is a dated snapshot of the major model families, a starting map that is stale the day after its date.
> Your profile cards are the copy you trust: you measured and dated them.

**Checkpoints** ① one model card and one system card read end to end for the model the flagship uses
today, with every profile-card field filled and the questions the card leaves open written down · ② the
shortlist: at least six models from at least four makers, at least two open-weight, each with its
license or terms read and one written reason it is on the list · ③ the smoke tier (M12's fifteen cases)
run on all of them, then the full test set on every model that survived, through the same runner with
recorded fixtures · ④ the quality, cost and latency table, with paired intervals against the best model
and latency percentiles with their request counts · ⑤ the decision published, with a dated profile card
per model and a re-check date on each.

**Artifact** \`EVIDENCE\` — a published **model-selection report for the flagship**: at least **6 models**
across at least **4 makers**, including at least **2 open-weight models**, every one run on the **M12
held-out test set** through M12's own runner. Reach closed models through each maker's API and
open-weight models through an inference provider (or your own machine if M36 is done); a gateway or an
OpenAI-compatible endpoint (an API that accepts OpenAI's request shape) is allowed, provided you record
it, because it is part of the system you measured and M35 owns what it hides. The table has one row per
model: pass rate on the test set, the **paired difference against the best model with its bootstrap
interval**, **cost per completed task** from the usage objects, time-to-first-token and total latency at
p50 and p95 with the request count behind them, context window and output cap, the effort or reasoning
setting used, the host and precision, the data terms, the license, and the lifecycle status. Then the
decision in one paragraph, with what would make you revisit it. Plus **one dated profile card per
model**, in the format below.

**The afternoon protocol** — how you size up any model, used six times here and weekly in Track 11: read
the model page and card, fill the profile card, note the three claims you most doubt (forty minutes);
read the license or terms and the retention page (twenty); run the smoke tier and stop if it fails your
own threshold; otherwise run the full test set and a latency probe of at least fifty requests; write the
card with today's date. **Run each candidate twice**: once with the flagship's current prompt unchanged,
and once after a fixed prompt-adaptation budget spent on dev only, the same budget for every model. The
incumbent's prompt was tuned for it; skip the second run and the comparison is rigged. Report both
numbers.

**Worked arithmetic, illustrative.** On a 30-case test set, the large tier passes 27 and costs $0.54
across the run, so $0.54 ÷ 27 = **$0.020 per completed task**. The small tier from the same maker passes
25 and costs $0.07, so $0.07 ÷ 25 = **$0.0028** — about one-seventh. The paired difference is two cases
out of thirty, and on thirty cases its paired bootstrap interval will very probably reach zero: you
cannot tell these two apart on quality with the data you have. That finding points at the small tier.
Before you take it, **read the two cases the small tier failed and the large tier passed**, and look
them up in your M12 failure taxonomy: if both are in the category your users would not forgive, the
count hides the answer. Never compare per-token prices across makers: each tokenizer turns the same text
into a different number of tokens, and a reasoning model bills its thinking tokens as output. Divide
what the usage objects say you spent by the cases that passed; the completed task is the unit (M20).

**What "open" permits.** Some open-weight families ship under standard [[permissive licenses|permissive]] (Apache 2.0,
MIT) that allow commercial use with little more than attribution; others ship under the maker's own
[[community license|community-license]], which can carry a user-count threshold, an acceptable-use policy, naming or
attribution rules, regional restrictions, or limits on using the model's outputs to train other models
(the question M38 asks again about distillation). The Open Source Initiative's [[Open Source AI Definition|osaid]]
asks for much more than downloadable weights — training-data information and code as well — which is why
most "open" models are open-weight, not open source. Read the license file in the repository, not the
summary on the model page, and write in each card what it would forbid the flagship from doing.

**The profile card**, one file per model, dated, in the same order every time: maker · family and tier ·
exact model id and whether it is a snapshot or an alias · check date · closed or open-weight, with the
license by name · modalities · context window and output cap, from the Models API where the maker has
one · price per million input, output and cached tokens, with the date and page you read it on · your
rate-limit tier · data retention, training use, and whether zero retention is available to you ·
lifecycle status and any retirement date · host and precision, for open weights · your M12 score with
its interval and case count · p50 and p95 latency with request count · cost per completed task · the
three claims from the card you doubted, and what your measurement said. Where your card and Appendix D
disagree, yours wins for your work; write the disagreement in your delta.

::: context knowledge-cutoff Where the training data stops
The knowledge cutoff is the date after which the model saw little or no training data. Ask about anything later (a library release, a price change, a news event) and the model does not know it, yet may answer fluently anyway, for the reasons M33 gave. Some makers state one date for "reliable knowledge" and a later one for the raw training data.

It matters for coding work in particular: a model can confidently suggest an API that has since changed, which is why retrieval and current documentation still earn their place.
:::

::: context modalities What kinds of input and output
A modality is a kind of data: text, images, audio, video, or documents such as PDFs. A card lists which ones the model accepts as input and which it can produce as output, and the two lists often differ; many models read images but reply only in text.

Each modality also has its own limits (image size, audio length) and its own token cost. If your flagship takes screenshots or voice, a model without that input is off the shortlist before quality comes into it.
:::

::: context rate-limit-tier How much you are allowed to send
Providers cap how many requests and tokens an account may send per minute, and sometimes per day. The caps usually come in tiers: a new account starts low and moves up as it spends more or has been paying longer, so two teams calling the same model can have very different ceilings.

A model that wins your eval is no use at launch if your tier allows a fraction of your expected traffic, and moving up can take time. That is why the tier goes on the card and gets checked early.
:::

::: context deprecation Announced, then switched off
Deprecation is the announcement that a model will stop being offered; retirement is the date it actually stops, after which calls to it fail. The gap is usually measured in months, and the maker usually names a suggested replacement.

That replacement is a different model, so prompts, parsing and costs all have to be re-checked against it, which is why the lesson calls it a forced migration. Makers publish these schedules on a deprecations page, and the date belongs on your card the day you choose a model.
:::

::: context style-control Correcting for long, pretty answers
In head-to-head votes, people tend to prefer answers that are longer and use more headings, bullets and bold text, whether or not the content is better. A style-controlled ranking uses statistics to estimate how much of each model's win rate comes from those features, and shows the ranking with that effect taken out.

A model that drops sharply between the raw table and the style-controlled one owed part of its lead to presentation. Neither table measures your task.
:::

::: context swe-bench A benchmark built from real bug fixes
SWE-bench collects real issues from open-source Python projects on GitHub. The model gets the repository and the issue text and must produce a code change; it passes if the project's tests, including the ones added with the original fix, succeed. SWE-bench Verified is a subset that human engineers screened to remove unclear or unfair tasks, and it became a headline number for coding models.

Because the issues and their fixes are public, a model may have seen the answers during training: the contamination problem, exactly.
:::

::: context permissive Licenses that ask almost nothing
Apache 2.0 and MIT are two of the most widely used open-source licenses. Both let you use, change, sell and redistribute the software, commercially too, as long as you keep the copyright and license notice. Apache 2.0 adds an explicit patent grant and asks you to mark files you changed.

Because lawyers already know these texts, a model released under one of them rarely needs more legal review than "keep the notice." That is the contrast with custom licenses, where every clause is new.
:::

::: context community-license A maker's own terms
A community license is a custom license a model maker writes for its own weights. It usually allows free use, commercial use included, but adds conditions: a user-count threshold above which you need a separate license from the maker, an acceptable-use policy listing forbidden uses, rules about naming or crediting derived models, or limits on using outputs to train other models.

Meta's Llama licenses are a well-known example, with a threshold in the hundreds of millions of monthly users. Breaking a condition can end your right to use the model.
:::

::: context osaid What open source means for a model
The Open Source Initiative is the nonprofit that maintains the widely accepted definition of open-source software and approves licenses such as MIT and Apache 2.0. Its Open Source AI Definition, published in 2024, says an AI system is open source only if you are free to use, study, modify and share it, which it says requires the weights, the code to train and run the model, and detailed information about the training data.

Most "open" models release only the weights, under their own terms, so they are open-weight.
:::
`;export{e as default};