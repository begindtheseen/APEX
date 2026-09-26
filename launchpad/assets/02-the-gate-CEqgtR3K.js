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
**GATE** — **REFEREE:** your reviewer, sending a [[kill signal|kill-signal]] at a random time and then counting rows.
**PASS:** kill a worker mid-job; zero lost jobs across 1,000 enqueued items, and every effect applied
exactly once even where a job ran twice — which is what at-least-once delivery actually lets you promise.
**ON FAIL:** the consumer is not idempotent — fix and re-run.

**Most-missed:** Starting with a [[hosted queue|hosted-queue]] and never learning the mechanism, which makes every
operational question unanswerable. · Designing the queue and forgetting the read path. Enqueueing is the
easy half. · Assuming a cached step result makes a retry safe. \`book_flight()\` twice is two bookings.

::: context kill-signal What a kill signal is
Operating systems stop programs by sending them signals. A polite one (SIGTERM) asks the program to finish up and exit, and it can run clean-up code. \`kill -9\` sends SIGKILL, which ends the program instantly with no chance to tidy anything. Testing with the harsh one proves your queue survives the worst case: a machine losing power mid-job.
:::

::: context hosted-queue Hosted queues
Cloud providers sell ready-made queues — Amazon SQS is a well-known one — that you use without running anything yourself. They are good tools. But when something goes wrong in one, the questions are the same ones this module teaches: who holds the job, what happens when a worker dies, what if it runs twice. Building one first makes those questions answerable.
:::
`;export{e as default};