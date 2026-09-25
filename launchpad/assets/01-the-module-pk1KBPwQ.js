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
analysis: open coding → axial coding**, producing a named failure taxonomy with counts. What an eval is —
a dataset plus a runner — and why it is not a test. Assertion graders before any model grades anything.
**LLM-as-judge calibrated against human labels**, reported as TPR/TNR. Inter-annotator agreement and
rubric revision. Train/test discipline: split at creation, open test once. Structured output as a
reliability mechanism and its limit. CI-gate economics: tiered gates, recorded fixtures, a dollar
ceiling. **Prompt and model lifecycle** — versioning, pinned model IDs, the forced migration.

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
confusion matrix, so they are taught here, covering only what the curriculum consumes — the four tests
you will actually use, each run once against your own data: base rates and why accuracy lies when
failures are rare; the confusion matrix and TPR/TNR computed by hand on your own 100 labeled traces;
percentiles from a raw latency array and why averaging them is wrong; **bootstrap resampling written
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

**Train/test discipline, stated once and inherited by M18.** Split every golden set into **dev and test
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
`;export{e as default};