var e=`---
id: m20-the-gate
title: "Cost, Metering, and Unit Economics — the gate, and what most people miss"
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
**GATE** — **REFEREE:** your reviewer, re-running the queries; each number must be reproducible from SQL.
**PASS:** state cost per active user per month, and end-to-end **p50 and p95 with the request count
behind them**, each backed by the query. **If your n does not support a p99, say so and do not quote
one:** on a few hundred requests from a dozen users, p99 is the second-slowest request you ever served,
which is one sample. *"p99 on 300 requests is one request"* is the better answer, and it is the one this
module is actually teaching. Say whether you would keep the feature. **ON FAIL:** you are reporting an average — recompute from the raw
distribution.

**Most-missed:** Reporting an average; computing percentiles by averaging per-minute percentiles.
**Percentiles do not average.** · Quoting a p99 from a sample that cannot support one. On a few hundred
requests, p99 is a single observation, and a hiring manager who asks "what is your n?" ends that answer.
· Measuring time-to-first-byte instead of time-to-first-token. They can
be seconds apart. · Routing on per-token price instead of cost per completed task — a cheap call that
needs three retries is not cheap. · The alert without the breaker; an alert at 3am tells you about money
already spent. · Running the budget check *after* the API call. · Cost per feature but not per user, which
hides the distribution entirely when AI cost per user is extremely skewed.
`;export{e as default};