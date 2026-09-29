var e=`---
id: m34-the-gate
title: "Reading the Model Landscape — the gate, and what most people miss"
minutes: 2
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
**GATE** — **REFEREE:** your reviewer, with your report and a clean checkout of the repo, doing two
things you do not see coming: re-running your M12 test set against one model they pick from your table,
and naming one model released in the last 30 days that is not in it. **PASS:** the re-run lands inside
the interval you published for that model and its cost per completed task is within 10% of yours — or
you find and name the difference ([[host, precision|precision]], chat template, effort setting, an alias that moved)
before the referee does; the unseen model gets a dated profile card and a smoke-tier score inside 4
hours, then a full test-set score or a written reason to stop; you defend the decision from your own
table, the paired interval against the best model and the cost per completed task, without citing a
public ranking; and for each open-weight model you say what its license would forbid the flagship from
doing, and for your chosen model you state its lifecycle status and where you read it. **ON FAIL:** a
re-run outside your interval means the report measured a system you cannot reproduce — pin every
version, host and setting, re-run every model, republish; a decision that leans on a public ranking gets
re-decided from your table.

**Most-missed:** Choosing from a leaderboard and calling it a decision. · Comparing per-token prices
across makers (see the arithmetic above). · Reporting that one model beat another by a few points with
no interval and no case count. · Running every candidate on the incumbent's prompt. · Building on an
alias: a moving name (one that always points at the latest model in a line) can change the model under
your eval without a line of your code changing. [[Pin the snapshot|snapshot]]. · Assuming a free tier's data terms
match the paid tier's: some free tiers let the maker [[train on your inputs|training-use]]. Carry the terms into M21's
data-flow document. · Discovering your rate-limit tier on launch day. · Testing an open-weight model on
one host and deploying it on another. · Treating a deprecation notice as news: write the retirement date
on the card the day you choose, and schedule the M12 re-run before it.

::: context precision Precision here means number format
Here, precision is how many bits store each of the model's numbers. 16-bit is the usual full-size format; 8-bit and 4-bit (quantized) versions take less memory and cost less to run, but can answer differently. Two hosts serving "the same" open-weight model may use different precisions, so scores and costs can differ with neither host doing anything wrong.

It has nothing to do with precision in the classification sense, as in precision and recall.
:::

::: context snapshot A frozen name versus a moving one
A snapshot is a model id that names one fixed version, usually with a date or version number in it; its behavior does not change while it exists. An alias is a shorter name the maker repoints at the newest version in a line.

Calling the alias is convenient until the day your eval scores, output lengths or costs shift with no change in your code. Pinning means your code and your eval both name the snapshot, and moving to a new one is a deliberate change with a re-run.
:::

::: context training-use When your data becomes training data
Training-use terms say whether the maker may use what you send (prompts, files, outputs) to train future models. Paid API terms commonly say no by default; some free tiers and consumer apps say yes.

If your users' data trains a model, pieces of it could in principle resurface elsewhere, and you may be breaking promises in your own privacy policy or customer contracts. That is why the terms go into the data-flow document, not just into the model choice.
:::
`;export{e as default};