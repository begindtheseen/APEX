var e=`---
id: m40-the-module
title: "The Frontier Capstone: Build Something New — what to understand and what to build"
minutes: 9
covers:
  - "The capability delta: what a new release does that the previous generation could not, stated as a task and measured on your own cases against the previous model, never read off a launch post"
  - "Newly possible and newly cheap, fast or local are both deltas, provided you measure them"
  - "Scoping to one job for one kind of person, with a kill date written before the first line of code"
  - "Built on Layer 9 by construction: at least two providers or one open model, and at least one non-text modality or an MCP server"
  - "Strangers, not friends: the only users whose behavior tells you anything. Acquisition starts in week one, and M2's four rules (spend limit, controlled access, call log, privacy line with delete-on-request) come back unchanged"
  - "The model-watch harness: detection, an adapter that makes a new model one configuration line, the M12 runner, a paired comparison against your production model, and a page that ends in a decision"
  - "The 48-hour clock as a design constraint: a harness that needs a day of edits per model cannot meet it"
  - "Launch-day noise: first-day benchmark claims, vibes posts, broken chat templates, and hosts that serve the same open weights at different quality. Evaluate through the maker's own API or reference configuration first, and name the host and quantization"
  - "A product on a preview model needs M35's failover, because previews change on the maker's schedule"
  - "Reading triage: release notes, then API changes and deprecations, then the model card's evaluation table and known limitations, then your own harness, and a paper only when your numbers say it matters"
  - "Drop-in score versus migrated score: report your production prompts unchanged separately from any re-tuned prompt, and tune on dev only"
  - "The decision a delta ends in: adopt, watch or ignore, with the trigger that re-opens it"
  - "The hand-off: Track 11's 30 minutes a week become a run and a read on this harness, and continue on your team's eval set once you are hired"
---
Every module before this one told you what to build. This one tells you only what the thing must be
built on and who has to use it, because the skill it pays off is the one the whole of Layer 9 exists
for: **creating, not following.** Two outputs. A **second product** — not the flagship, and not a
feature of it — found in something a recent model release made newly possible, scoped small, shipped
in public and used by strangers. And the **keep-up system that outlives the program**: a harness that
evaluates a newly released model on your own eval sets within 48 hours and writes a one-page delta.
M28 said this program has no second product; this is where it gets one. It assumes M34 to M39 are
passed, so the eval harness (M12) already speaks to three providers (M35) and to an open model you can
serve (M36), and it assumes **Track 11 — The Model Watch** has been taking 30 minutes of your week
since M34. After this module, that track runs on the harness you build here.

**Core concepts:** The **capability delta** — what a new release does that the previous generation
could not, stated as a task and **measured on your own cases against the previous model**, never read
off a launch post. Newly possible and newly cheap, fast or local are both deltas, provided you measure
them. **Scoping to one job for one kind of person**, with a [[kill date|kill-date]] written before the first line of
code. Building on Layer 9 by construction: **at least two providers or one open model, and at least one
non-text modality or an MCP server.** **[[Strangers, not friends|strangers]]** — the only users whose behavior tells
you anything. The **model-watch harness**: detection, an adapter that makes a new model a configuration
line, the M12 runner, a **[[paired|paired]]** comparison against the model you run in production, and a page that
ends in a decision. **The 48-hour clock**, and why it is a design constraint rather than a sprint.
**Launch-day noise** — first-day benchmark claims, vibes posts, broken chat templates, hosts that
serve the same weights at different quality. **Reading triage**: release notes, then API changes and
deprecations, then the [[model card|model-card]]'s evaluation table and known limitations, then your own harness, and
a paper only when your numbers say it matters. **Drop-in score versus migrated score.** The decision a
delta ends in: **adopt, watch or ignore**, with the trigger that re-opens it.

> **A common belief here produces a product that was possible last year:** that a model "makes
> something newly possible" because its announcement says so. Launch posts report the maker's
> benchmarks on the maker's prompts. **Your enabling claim is a number you produced**: twenty
> hand-written cases of the exact task, run on the new model and on the one before it, with the paired
> difference and its bootstrap interval (M12). If the previous model already does the task inside the
> interval, you have not failed — you have learned the "why now" was false, and the write-up says so.
> Pick again if you have the hours, or ship it and drop the newness claim. Do not keep the claim.

> **The first 48 hours are the noisiest data you will ever read.** Open weights run through a runtime
> whose chat template (the text wrapper that marks roles and turns) or tokenizer is wrong will score
> badly for reasons that are not the model. **Third-party hosts serving the same open weights do not
> serve the same quality** — at least one open-weight maker has published its own verifier after
> measuring the gap — so a bad score from an unnamed host is a finding about the host. New hosted models
> often launch as previews, with low rate limits and terms that differ from [[general availability|general-availability]].
> **Evaluate through the maker's own API or reference configuration first, name the host and the
> quantization in the delta, and check the maker's recommended [[sampling settings|sampling-settings]].**

> **Five strangers is the hard part, and it is not code.** The build takes about thirteen of the thirty
> hours. The rest is getting it in front of people who do not know you, which is M2's gate and M28's
> protocol with a number attached. Acquisition starts in the first week, not after launch. And M2's four
> rules come back unchanged: a hard spend limit at every provider before the first request, access you
> control, a call log from request one, and one line saying what is recorded, for how long, with
> delete-on-request that works. **A product on a preview model needs M35's failover**, because previews
> are changed and withdrawn on the maker's schedule, not yours.

> **Currency: this module is made of things that change weekly.** Which models were released, their
> ids, prices, rate limits, preview or general status, license terms for open weights, the terms of
> service that govern using one model's output to build another, and which release feeds and list
> endpoints exist and what fields they return. Look every one up the week you build and date it.
> Appendix D is a dated snapshot, not a source; your own profile cards from M34 are the copy you keep
> current.

**Checkpoints** ① the capability probe: twenty hand-written cases run on a recent model and its
predecessor, the paired delta stated with its interval · ② the one-page product spec: one job, one kind
of user, the kill date, and which Layer 9 requirements it meets, signed line by line as in M2 · ③ the
product live at a public URL with spend limits, the privacy line, the call log and provider failover ·
④ the model-watch harness dry-run end to end against the most recent release you did not evaluate,
producing the one-page delta · ⑤ five strangers through the core job, visible in the log · ⑥ the public
write-up posted, and one real release evaluated inside 48 hours of its announcement.

**Artifact** \`EVIDENCE\` — two things, both public. **The product:** a new app at its own URL, built on
at least two providers behind your M35 interface or on one open model served your M36 way, using at
least one non-text modality (M37) or exposing an MCP server (M39). It has its own eval set of at least
30 cases on the M12 runner, split dev/test at creation, and **at least 5 strangers who each completed
the core job**, visible in the call log with the date and how each found it. Its **public write-up**
carries measured numbers only: the enabling delta with its interval and the number of cases behind it;
the test-set score with its interval; cost per completed task (M20); end-to-end p50 and p95 with the
request count, and no p99 unless the count supports one; a failure taxonomy from the first strangers'
traces; how many came back on a second day, whatever the number is; and what did not work. **The
harness:** a repository that detects releases from at least three sources, adds a model by one
configuration line, runs the flagship set and the product set with a per-run dollar ceiling, and writes
the one-page delta — plus **one real new-model evaluation, timestamped inside 48 hours** of the maker's
public announcement.

**Finding the problem.** Start from the capability deltas in your Track 11 log, not from an idea. For
each, write the sentence "a task that was blocked on exactly this is ___", then cross that list with
people you can reach: flagship users, whoever answered your Track 7 posts, the warm list from Track 1.
A delta with no reachable audience is a demo. Choose the one where you can name the place the first
five strangers will come from. Then cut until one input produces one output a person would come back
for, and write the kill date: if the capability probe fails, or no stranger completes the job within
two weeks of launch, you stop and write down why.

| Part | Hours |
|---|---|
| Capability probe, problem choice, spec | 5 |
| Build, evals and deploy | 13 |
| Acquisition and the first strangers | 5 |
| The model-watch harness | 5 |
| Write-up and the 48-hour run | 2 |
| **Total** | **30** |

**The harness, concretely.** Detection: diff each provider's models list daily (the Models API from M6
and its counterparts at the other two), watch the open-weight makers you care about on the [[Hugging Face|hugging-face]]
Hub sorted by creation date, and subscribe to the release notes and deprecation pages you rely on.
Adapter: a new hosted model from a known provider is one line in configuration; a new open model is one
line plus a serving recipe you already rehearsed in M36. Runner: M12's tables, M12's graders, a smoke
tier first. Output: a page with the model id as the API returned it, the check date, what the maker
claims, what changed in the API, each eval set's score with the **paired** interval against your
production model, cost per task, latency with its count, failures newly fixed and newly introduced,
and the decision. **Report the drop-in score (your production prompts unchanged) separately from any
migrated score**, and tune prompts on dev only; a new model tuned on your test set wins by [[leakage|leakage]].

**What the 48 hours cost — worked, with illustrative prices.** The flagship set is 100 cases and the
product set 50; run each three times, because non-determinism is structural (M6). That is 450 calls. At
about 3,000 input and 600 output tokens each, 1.35 million input and 270,000 output tokens. At an
illustrative $3 and $15 per million, that is $4.05 plus $4.05 — about $8, before the judge tier. Read
the real prices the day of the run and set the ceiling from them. The clock is the constraint, not the
money: detect within a day, smoke run within two hours of detection, full sets overnight, page
published by hour 48. **A harness that needs a day of edits per model cannot meet that, which is the
point of the deadline.**

**Handing off to Track 11 — The Model Watch.** From here the track's 30 minutes a week are a run and a
read, not a scroll: triage what the detector found, give a full harness run only to releases in a
family you use or at the price and latency tier your products sit in, log the rest in one line, and
read one paper a month at most, chosen by your own numbers. When you are hired, the habit transfers to
your team's eval set, with their permission, and the delta page is the thing you bring to the meeting.

::: context kill-date Deciding in advance when to stop
A **kill date** is a date, with a condition, on which you stop the project unless it has hit a target you wrote down beforehand: for example, "if no stranger completes the job within two weeks of launch, I stop."

Writing it before you start matters because of the **sunk-cost** pull: the more hours you have put in, the easier it feels to justify a few more, and the bar quietly moves. A rule set on day one, while you had nothing invested, is the one you can trust.
:::

::: context strangers Why friends' opinions do not count
Friends, family and colleagues want to be kind, so they try the product because you asked, praise it, and rarely come back. Their behavior tells you about your relationship, not about the product. Rob Fitzpatrick's book *The Mom Test* is built on this problem: people will say your idea is great to avoid hurting you.

A stranger who found the product, used it for the job and finished owes you nothing, so what they do is evidence. That is why the gate counts only people who do not know you.
:::

::: context paired Comparing on the same cases
A **paired** comparison runs both models on exactly the same cases and looks at the difference case by case, rather than comparing two separate averages.

Some cases are hard for every model and some are easy for every model. Pairing cancels that shared difficulty out, so what is left is the difference the models actually make. The result is a much tighter interval from the same number of cases, which matters when you have only twenty hand-written ones.
:::

::: context model-card The document that comes with a model
A **model card** is the document a maker publishes alongside a model: what it is for, how it was trained in broad terms, its evaluation results, and its known limitations and risks. The idea comes from a 2019 research paper, and it is now standard on open-weight releases and common for hosted ones.

The evaluation table shows where the maker claims gains, which tells you what to test. The limitations section is often the most useful part, because it is where makers admit what the model does badly.
:::

::: context general-availability Preview versus the real release
Providers often release a new model first as a **preview** (also called beta or experimental) before **general availability**, the point at which it is the provider's stable, supported offering.

A preview can change behavior without notice, have low rate limits, carry different terms (including how your data is used), and be withdrawn on a short schedule. Building a demo on one is fine. A product on one needs a fallback, because the model you tested may not be the model you are served next month.
:::

::: context sampling-settings The knobs that pick each next word
At each step a model produces probabilities for every possible next token, and **sampling settings** decide how one is chosen. **Temperature** controls how adventurous the choice is (lower means more predictable); **top-p** and **top-k** limit the choice to the most likely candidates.

Makers often publish the settings a model was tuned to use, and some models behave noticeably worse far from them, for example by repeating themselves. Run a new model at your old model's settings and a bad score may be a settings problem, not the model.
:::

::: context hugging-face Where open models are published
**Hugging Face** is a company whose website, the **Hub**, is where most open-weight models are published: each model has a page with its weight files, its model card, its license and its chat template. It also hosts datasets and small demo apps.

For a model watch, it is the place new open models appear first, often before any announcement reaches the news. Listing a maker's models newest first, by hand or through the Hub's API, is a cheap way to spot a release.
:::

::: context leakage When test answers seep into your choices
**Leakage** is when information from the test set influences how the system was built, so the test score no longer measures performance on unseen cases. It rarely looks like cheating: rewriting a prompt until test cases pass, or picking the best of five prompt variants by their test score, is enough.

Each tweak fits the prompt a little more to those particular cases. The score rises, but a fresh set would not show the same gain. That is why tuning happens on dev and the test set is run once at the end.
:::
`;export{e as default};