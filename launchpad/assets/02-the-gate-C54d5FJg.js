var e=`---
id: m8-the-gate
title: "The Durable Queue — the gate, and what most people miss"
minutes: 1
covers:
  - "Moving slow work off the request path"
  - "SELECT ... FOR UPDATE SKIP LOCKED"
  - "At-least-once delivery and idempotent consumers"
  - "Backpressure and dead-letter paths"
  - "The read path — polling, SSE and resumable streams are three different products"
---
**GATE** — **REFEREE:** your reviewer, sending a kill signal at a random time and then counting rows.
**PASS:** kill a worker mid-job; zero lost jobs across 1,000 enqueued items, and every effect applied
exactly once even where a job ran twice — which is what at-least-once delivery actually lets you promise.
**ON FAIL:** the consumer is not idempotent — fix and re-run.

**Most-missed:** Starting with a hosted queue and never learning the mechanism, which makes every
operational question unanswerable. · Designing the queue and forgetting the read path. Enqueueing is the
easy half. · Assuming a cached step result makes a retry safe. \`book_flight()\` twice is two bookings.
`;export{e as default};