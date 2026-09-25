var e=`---
id: m17-the-module
title: "Scoping, Estimating, and Someone Else’s Priorities — what to understand and what to build"
minutes: 2
covers:
  - "Turning a vague request into clarifying questions"
  - "Decomposing into one-to-two-day independently shippable slices"
  - "Estimating, and naming the riskiest assumption"
  - "Renegotiating when the estimate is wrong"
  - "The open-ended quality ticket, run against a real OSS AI application you did not write, with prompts in-repo and no decision log — on your own system it tests measurement; on a stranger’s it tests measurement plus archaeology, which is the actual job"
  - "A capability-question protocol: cheap, expensive-and-uncertain, structurally impossible"
  - "Explaining a limit to a non-engineer who wants a guarantee"
---
The definitional mid-level skill, structurally invisible to a solo builder. When you build your own
ideas you are your own product manager: scope is infinitely elastic, nothing is late, nothing is cut,
nobody is waiting. The failure mode is precise — a technically fine hire who disappears for nine days on
something that should have been two, delivers more than was asked, and reads as "not ramping." It is
what most "great, but not mid-level yet" feedback actually means.

**Core concepts:** Turning a vague request into clarifying questions. Decomposing into one-to-two-day
independently shippable slices. Estimating, and naming the riskiest assumption. Renegotiating when the
estimate is wrong. The open-ended quality ticket. A capability-question protocol: cheap,
expensive-and-uncertain, structurally impossible. Explaining a limit to a non-engineer who wants a
guarantee.

**Checkpoints** ① the scoping doc for one real request: what is in, what is out, how it is cut · ② an
estimate written before the work and the actual time beside it · ③ one open-ended request delivered as a
plan with a number, not as an answer.

**Artifact** \`LAB\` — three scoping docs against real open issues (clarifying questions, slice
decomposition, estimate with named riskiest assumption, and an explicit "here is the 20% version if you
need it Thursday"). Then build one and log **actual vs estimate** with a post-mortem on where the
estimate broke.

**Plus the two that only exist in AI product work:**

**The open-ended quality ticket**, run against **a real OSS AI application you did *not* write, with
prompts in-repo and no decision log** — on your own system it tests measurement; on a stranger’s it tests
measurement plus archaeology, which is the actual job. *"The assistant is getting worse, find out why."*
These have no known-achievable endpoint and absorb three days or three months identically. Deliver a
**timeboxed plan**: the current measured number, a target, ranked interventions with **expected gain per
hour**, a hard checkpoint at 50% of the box with a written **stop-or-continue rule**, and an explicit
statement of what you report if the target is missed.

**The capability-question protocol** — the thing that separates the mid band from the one above it, and
the place M6’s structural-boundaries content finally gets cashed in as a *communication* skill. Three
buckets: cheap and near-certain · expensive and uncertain, needs a timeboxed spike · **structurally
impossible.** Practice against the reviewer playing a PM **instructed to push for a yes.**

Then write one page: **a response to a product request that is not achievable as stated** — *"the
assistant should never cite something that isn’t in the document"* — naming why in plain language,
offering the achievable version **with a measured number from your own eval set**, and stating what the
residual failure rate means for the user.

> That page is also the best answer you will ever have to "tell me about a time you pushed back."
`;export{e as default};