var e=`---
id: m12-the-module
title: "Evals: The One Harness and the Stats Lab — what to understand and what to build"
minutes: 5
covers:
  - "Trace capture: the exact input, usage, stop_reason and attempt count"
  - "Error analysis: open coding to axial coding, producing a named taxonomy with counts"
  - "What an eval is — a dataset plus a runner — and why it is not a test"
  - "Assertion graders before any model grades anything"
  - "LLM-as-judge calibrated against human labels, reported as TPR/TNR"
  - "Inter-annotator agreement and rubric revision"
  - "Train/test discipline: split at creation, open test once"
  - "Structured output as a reliability mechanism, and its limit"
  - "CI gate economics: tiered gates, recorded fixtures, a dollar ceiling"
  - "Prompt and model lifecycle: versioning, pinned IDs, the forced migration"
---
The differentiator. Also the concept most often taught **several times, in incompatible substrates.**
Built once, here.

**Core concepts:** Trace capture — the exact input, usage, \`stop_reason\` and attempt count. **Error
analysis: [[open coding → axial coding|open-axial-coding]]**, producing a named failure taxonomy with counts. What an eval is —
a dataset plus a runner — and why it is not a test. Assertion graders before any model grades anything.
**[[LLM-as-judge|llm-as-judge]] calibrated against human labels**, reported as [[TPR/TNR|tpr-tnr]]. Inter-annotator agreement and
rubric revision. Train/test discipline: split at creation, open test once. Structured output as a
reliability mechanism and its limit. CI-gate economics: tiered gates, recorded fixtures, a dollar
ceiling. **Prompt and model lifecycle** — versioning, [[pinned model IDs|pinned-models]], the forced migration.

**Checkpoints** ① the harness skeleton: Postgres tables plus a TypeScript runner that scores one case end
to end · ② session 1 of 4: 25 traces hand-read and labeled, no taxonomy yet · ③ sessions 2–4
done: 100 labeled traces and a failure taxonomy with counts, written after the reading rather than
before · ④ dev/test split made at creation and recorded, so it cannot be quietly re-drawn later · ⑤
assertion graders covering the failures that do not need judgment · ⑥ a judge with a measured confusion
matrix against your own labels · ⑦ inter-annotator agreement: the reviewer labels 30 from your rubric
alone, and the rubric is what gets revised · ⑧ the tiered CI gate: a smoke set on every push, the full set
nightly, recorded fixtures so graders cost nothing · ⑨ the fail condition stated as a statistical
threshold with its bootstrap interval, not as a single number · ⑩ a deliberate model-family migration
gated only by this eval set · ⑪ \`stats-lab\`: the four tests you will actually use, each run once against
your own data.

**The Stats Lab, folded in.** The gate demands a bootstrap confidence interval, TPR/TNR, and a
[[confusion matrix|confusion-matrix]], so they are taught here, covering only what the curriculum consumes — the four tests
you will actually use, each run once against your own data: base rates and why accuracy lies when
failures are rare; the confusion matrix and TPR/TNR computed by hand on your own 100 labeled traces;
[[percentiles|percentiles]] from a raw latency array and why averaging them is wrong; **[[bootstrap resampling|bootstrap]] written
from scratch**, and with it how many labeled examples you need before a delta means anything.

> **Resample the differences, not the two scores.** Every comparison this program asks you to make — a
> prompt change against the same 100 cases, one retrieval arm against another on the same queries — is a
> **paired** comparison: the two sides answered the same items. Resampling the per-item differences
> cancels the difficulty of each item and gives an interval meaningfully tighter than subtracting two
> independent ones. Doing it unpaired makes almost every real improvement look inconclusive, which
> teaches you to distrust a working instrument.

**Three things that are each the difference between a harness a team adopts and one they quietly stop
citing:**

**Inter-annotator agreement.** If you label 100 traces as the sole annotator, the rubric encodes
one person’s discovered preferences and has never survived a second opinion. **Cash in the
standing reviewer:** they independently label 30 of the 100 using *only your written rubric*, with no
conversation first. Compute agreement. Where you disagree, **the rubric gets revised, not the labels**,
and you repeat.

**Train/test discipline, stated once and inherited by M18.** Split every [[golden set|golden-set]] into **dev and test
at creation, before any retriever or grader exists.** All tuning touches dev. Test is opened once, at
gate time, and **the reported number is the test number with the dev–test gap stated alongside.** Tuning
against the same set you then report is the classic leak, and the reason most self-reported eval
numbers are worthless.

**The CI economics — because this is the most hireable artifact here and the one most likely to be
silently switched off.** Not because you failed to build it, but because it costs real dollars on every
push and red-lights at random. Own all four:
- A **tiered gate**: a smoke tier of about fifteen cases on every push; full set nightly.
- **Recorded-fixture mode** (M9’s record-replay client) so graders run at **$0** and only the judge
  tier calls the model.
- A **per-run dollar ceiling** printed in the job summary.
- A fail condition stated as **a statistical threshold with its bootstrap CI**, not a pass/fail count.

**Artifact** \`EVIDENCE\` — one harness, and only one, on your stack: Postgres + a TypeScript runner, no
platform. 100 hand-read and labeled traces **(four sessions of 25 — no taxonomy until the reading is done; this is
the most boring and most valuable work in the curriculum)**, a named failure taxonomy with
counts, assertion graders, a judge with a **measured confusion matrix** against your labels, the
inter-annotator agreement above, the dev/test split at creation, and the tiered CI gate above. Then
prompts versioned with pinned model IDs, and **a deliberate migration to a different model family gated
only by your own eval set**, written up as a regression table including what you could not recover. Plus
a \`stats-lab\` \`LAB\` repo.

**One harness, many datasets.** M18’s recall@k and M19’s agent trajectories are **datasets inside
these same tables and this same runner** — not their own measurement substrates — and M23 gates deploys
on it, M25 ports it.

**Trajectory evaluation — because "how do you know your agent works" is the first question any team
shipping agents asks.** A step-level grader (was the correct tool called with the correct
arguments) and an outcome-level grader (did the task complete), reported alongside cost and step count
per run. M19 uses these graders; traces that are *captured* but never *scored* are not an eval.

> **Exported:** the dataset table, assertion graders, and calibrated judge → M18, M19, M23, M25.

::: context open-axial-coding Borrowed from social science
Both terms come from qualitative research, where people study interviews and field notes. **Open coding**: read each trace and write a short, free-form note on what went wrong, in your own words, with no categories decided in advance. **Axial coding**: afterwards, group those notes into a handful of named failure types and count each one. Deciding the categories first means you only find the failures you already expected.
:::

::: context llm-as-judge What LLM-as-judge means
Having a person read every output does not scale, so teams ask a language model to grade outputs against a written rubric: "Did the answer cite a source? Yes or no." The catch is that the judge is a model too, and it makes mistakes. Before you trust its grades, you measure how often it agrees with careful human labels — that is what "calibrated" means here.
:::

::: context tpr-tnr TPR and TNR in plain words
Treat "this output failed" as the thing the judge is trying to spot. **TPR** (true positive rate): of the outputs that really failed, what share did the judge flag? **TNR** (true negative rate): of the outputs that were really fine, what share did it pass? With 8 failures in 100, a judge that passes everything is 92% "accurate" and has a TPR of zero.
:::

::: context pinned-models Why pin model IDs
Providers offer short aliases that quietly move to newer models, and exact IDs for one specific version. Pinning the exact ID means your app's behaviour changes only when *you* change it. Pinned versions do not last forever — providers retire old models on announced dates — so a switch is eventually forced on you, and the eval set is what tells you whether the new model is as good on your cases.
:::

::: context confusion-matrix The confusion matrix
A table of the four ways a judge's verdict can line up with the truth. Here a judge checked 100 traces with 8 real failures: it caught 6 and missed 2, and of the 92 good ones it passed 88 and wrongly flagged 4. So TPR is 6 of 8, or 75%, and TNR is 88 of 92, about 96%.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160" font-family="Inter, Arial, sans-serif">
  <text x="230" y="16" font-size="12" text-anchor="middle" fill="#1f2a44">judge said</text>
  <text x="180" y="36" font-size="11" text-anchor="middle" fill="#1f2a44">fail</text>
  <text x="280" y="36" font-size="11" text-anchor="middle" fill="#1f2a44">pass</text>
  <text x="40" y="78" font-size="11" text-anchor="middle" fill="#1f2a44">really fail</text>
  <text x="40" y="128" font-size="11" text-anchor="middle" fill="#1f2a44">really pass</text>
  <rect x="130" y="46" width="100" height="50" fill="#8fb8f0" stroke="#1f2a44"/>
  <rect x="230" y="46" width="100" height="50" fill="#f2b880" stroke="#1f2a44"/>
  <rect x="130" y="96" width="100" height="50" fill="#f2b880" stroke="#1f2a44"/>
  <rect x="230" y="96" width="100" height="50" fill="#8fb8f0" stroke="#1f2a44"/>
  <text x="180" y="76" font-size="12" text-anchor="middle" fill="#1f2a44">6 caught</text>
  <text x="280" y="76" font-size="12" text-anchor="middle" fill="#b4232c">2 missed</text>
  <text x="180" y="126" font-size="12" text-anchor="middle" fill="#b4232c">4 false alarms</text>
  <text x="280" y="126" font-size="12" text-anchor="middle" fill="#1f2a44">88 passed</text>
</svg>
\`\`\`
:::

::: context percentiles Why percentiles, and why not average them
The **p95** of a set of response times is the time that 95% of requests beat. Averages hide pain: if most requests take 1 second and a few take 30, the average looks fine while some users wait half a minute. And percentiles cannot be averaged — the p95 of two servers combined is not the mean of their two p95s — so always compute them from the raw numbers.
:::

::: context bootstrap What bootstrap resampling is
You have one set of 100 results and want to know how much the score could wobble by chance. **Bootstrapping** (introduced by statistician Bradley Efron in 1979) invents thousands of alternative sets by drawing 100 results at random from your 100, *with replacement*, and scoring each one. The middle 95% of those scores is your confidence interval. If it includes zero improvement, you have not shown an improvement.
:::

::: context golden-set What a golden set is
A **golden set** is a collection of example inputs whose correct answers or labels you have checked by hand and trust. Every version of the system is scored against it. Keeping part of it aside, never looked at while tuning, is what stops the score from simply rewarding you for memorizing the examples.
:::
`;export{e as default};