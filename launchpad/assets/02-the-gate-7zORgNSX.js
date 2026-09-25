var e=`---
id: m12-the-gate
title: "Evals: The One Harness and the Stats Lab — the gate, and what most people miss"
minutes: 2
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
**GATE** — **REFEREE:** your reviewer, handing you a prompt change that is scored against your
**held-out test set** — a number you cannot argue with. **PASS:** return ship/no-ship with a bootstrap
CI; state your judge’s TPR and TNR **and your human-to-human agreement — corrected for chance, not as a
raw percentage**, because on a skewed label set two annotators who pass everything agree ninety per cent
of the time and have agreed about nothing (Cohen’s κ is the usual measure; say which you used); name the criterion that
produced the most disagreement and how you rewrote it; **and break the gate on purpose on a branch and
keep the red check — a rehearsal, and labeled as one**, because waiting for a real regression to arrive
before gate day is not something you can schedule. If a real regression fires it later, replace the
screenshot with that one. **ON FAIL:** your judge is uncalibrated — re-label 30 traces and recompute.

> That last clause is not ceremony. **Break your own eval gate once on purpose, on a branch, and watch it
> block the merge.** A gate that has never fired looks exactly like one that is wired up wrong. Keep the
> red check as evidence.

**Most-missed:** **Reporting accuracy instead of TPR/TNR.** When failures are rare, a judge that always
says "pass" scores 92% and is worthless. This is the first thing to check in anyone’s eval work,
including your own. · Generic categories — "hallucination," "unhelpful." Unactionable. "Calendar Scheduling Failure"
is a fix; "poor coherence" is a shrug. · **Delegating the labeling to an LLM.** The LLM clusters notes
you already wrote. People discover what they actually care about *through* labeling. · Building the set
from cases you invented. An imagined set measures imagination. · A runner that re-implements the model
call "to keep the eval clean" — then it measures a different system than the one that ships. · Same
model as generator and judge *without measuring what it costs you.* Self-preference is real, and the
confusion matrix you already built is what shows it: if the judge's errors line up with the generator's,
you will see them there. A same-family judge with a measured matrix beats a different-family judge with
none. · Believing schema enforcement solved reliability. It solves shape, not
content.
`;export{e as default};