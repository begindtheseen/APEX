var e=`---
id: m20-the-module
title: "Cost, Metering, and Unit Economics — what to understand and what to build"
minutes: 1
covers:
  - "The usage object and the four-number cost of a request, taken further than M6 took it"
  - "Prompt caching mechanics, breakpoint placement, verifying from the meters"
  - "Percentiles from raw distributions"
  - "Streaming as a perceived-latency fix, not a real one"
  - "Model x effort routing, and why caches being model-scoped hurts a cascade"
  - "Cost attribution per feature and per user, both"
  - "Budget alerts and circuit breakers"
  - "Unit economics, and the product-analytics question: is it worth keeping"
---
**Core concepts:** The usage object and the four-number cost of a request, taken further than M6 took
it. Prompt caching mechanics,
breakpoint placement, verifying from the meters. Percentiles from raw distributions. Streaming as a
*perceived*-latency fix, not a real one. **Model × effort routing**, and why caches being model-scoped
hurts a cascade. Cost attribution per feature *and per user*. Budget alerts **and circuit breakers**.
Unit economics, and the product-analytics question — is it worth keeping.

> **Model routing is the wrong first dial.** The **first** quality-trading lever
> after caching is **effort** — measure the most capable model at lower effort *before* building a model
> cascade, because **caches are model-scoped and a cascade forfeits cache reuse.** Make the routing
> experiment two-dimensional: (model × effort) over the same task set, scored by M12’s harness, reported
> as **cost per completed task.**

**Checkpoints** ① the per-user credit ledger, with its decrement proved correct under concurrent
hammering · ② a test-mode subscription whose webhook consumer survives being replayed · ③ the
out-of-credit path and the spend circuit breaker, both proved from outside the app · ④ one weekly report
joining usage, quality and cost into one line per active user · ⑤ the model-by-effort routing experiment
scored by M12, reported as cost per completed task.

**Artifact** \`EVIDENCE\` — a per-user credit ledger with an atomic decrement **proven by concurrent
hammering** (balance never goes negative); a Stripe test-mode subscription with an idempotent webhook
consumer on M8’s queue that survives replay; a server-rendered 402 path with a correct body, proven by
curl; a circuit breaker on spend; one weekly SQL report joining usage, quality score, and cost into **one
line per active user, including a non-model cost column**; and the (model × effort) routing experiment
scored by M12, reported as cost per completed task.
`;export{e as default};