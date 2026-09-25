var e=`---
id: m16-the-module
title: "Working with Coding Agents Professionally — what to understand and what to build"
minutes: 2
covers:
  - "Writing a repo’s agent config so generated code conforms to house conventions"
  - "Decomposing a ticket into agent-sized units with verifiable exit criteria"
  - "Reviewing a 400-line diff by reading test changes and boundaries first"
  - "What never to delegate: auth, money, migrations, anything unverifiable"
  - "Sandboxing and permission scope"
  - "Spec-driven development and the underspecified-spec log"
  - "What a run costs"
---
Treating agents exclusively as a threat — and never as the throughput standard of the team you are
joining — produces an engineer who is correctly suspicious and half as fast as everyone around them,
measured from week three. Scheduled **after** M14 and
M15 so the interrogate-never-author discipline stays in force during the period it protects.

**Core concepts:** Writing a repo’s agent config so generated code conforms to house conventions.
Decomposing a ticket into agent-sized units with verifiable exit criteria. Reviewing a 400-line diff by
reading test changes and boundaries first. The categories never to delegate — auth, money, migrations,
anything unverifiable. Sandboxing and permission scope. Spec-driven development and the
underspecified-spec log. What a run costs.

**Checkpoints** ① the delegation policy written, and the pre-commit hook that enforces it · ② three real
tickets handed to an assistant, with a defect log naming which module let you catch each one · ③ one
flagship feature shipped in a timebox with assistants, measured against one written by hand.

**Artifact** \`EVIDENCE\` — a **defect log** from handing an agent three real tickets in a repo you did
not write, naming for each defect *which earlier module let you catch it*; **a one-page delegation
policy, enforced by a pre-commit hook that has actually blocked an agent-authored change twice on real
work**; **a spec-driven slice** — write a specification with explicit acceptance criteria, have an agent
implement against it, and keep a log of every place the spec was underspecified and what the agent did
in the gap.

**And a throughput artifact.** The module’s own thesis is that being slow is the failure mode, and the
three artifacts above are all *defensive*. Ship **three small flagship features with agents and three by
hand, alternating** so the ordering and the learning do not all favor one side, with hours, review
findings and defects reaching production **reported as a spread and not only as two medians.** If you
only have time for one pair, that is fine — **report it as an anecdote with n=1 and say so out loud.**
Both are usable. **What is not usable is a single pair of features presented as a measurement**, which
is the vibe comparison table M12 exists to prevent.

> That produces a number you can say out loud, which is what the module’s thesis demands. The
> underspecified-spec log is the stronger interview object, though — it is direct evidence of the
> judgment an AI-assisted coding round is scoring.
`;export{e as default};