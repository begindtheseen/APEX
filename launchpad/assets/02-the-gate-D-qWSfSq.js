var e=`---
id: m16-the-gate
title: "Working with Coding Agents Professionally — the gate, and what most people miss"
minutes: 1
covers:
  - "Writing a repo’s agent config so generated code conforms to house conventions"
  - "Decomposing a ticket into agent-sized units with verifiable exit criteria"
  - "Reviewing a 400-line diff by reading test changes and boundaries first"
  - "What never to delegate: auth, money, migrations, anything unverifiable"
  - "Sandboxing and permission scope"
  - "Spec-driven development and the underspecified-spec log"
  - "What a run costs"
---
**GATE** — **REFEREE:** a second agent instance with a **sealed brief your reviewer wrote weeks
earlier** (in M15), planting **0–3 defects per diff, count blinded, with at least one clean diff.**
**PASS:** find the planted defects across five diffs with false positives scored separately. Plus the
behavioral version: a pre-commit hook enforcing your delegation policy that has **actually blocked
agent-authored diffs twice on real work.** **ON FAIL:** you are pattern-matching, not reviewing — redo
with a new sealed brief.

> Knowing in advance that each diff contains exactly one defect is most of the answer — hence the blinded
> count.

**Most-missed:** Accepting suggestions and moving on, producing a transcript of a person being driven by
a model. · The purity play — refusing to touch the assistant in an interview round whose rubric line is AI
fluency.
· Measuring nothing, so the module’s own thesis (being slow is the failure mode) has no number attached
to it.
`;export{e as default};