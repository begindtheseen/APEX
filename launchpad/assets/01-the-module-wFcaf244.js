var e=`---
id: m8-the-module
title: "The Durable Queue — what to understand and what to build"
minutes: 1
covers:
  - "Moving slow work off the request path"
  - "SELECT ... FOR UPDATE SKIP LOCKED"
  - "At-least-once delivery and idempotent consumers"
  - "Backpressure and dead-letter paths"
  - "The read path — polling, SSE and resumable streams are three different products"
---
**This module sits early on purpose.** A resumable ingestion job, a resumable backfill, re-embedding,
durable agent state, and an idempotent webhook consumer are hard build requirements at five later
modules. Taught late, you would invent a queue five times, badly, and each ad-hoc version would become
load-bearing in a shipped artifact before the correct one existed.

It needs only M7’s idempotency key and M5’s row locking, both of which precede it.

**Core concepts:** Moving slow work off the request path. \`SELECT ... FOR UPDATE SKIP LOCKED\`.
At-least-once delivery and idempotent consumers. Backpressure and dead-letter paths. **The read path** —
how the client learns the job finished (polling, SSE, and resumable streams are three different
products, and enqueueing is the easy half).

**Checkpoints** ① one job written to the table and picked up by a worker · ② a worker killed mid-job,
and the job picked up again by another when its lease expires · ③ the same job submitted twice and run
once, with the read path showing its result.

**Artifact** \`EVIDENCE\` — a Postgres-backed durable job queue: \`SELECT ... FOR UPDATE SKIP LOCKED\`,
at-least-once delivery, idempotent consumers reusing M7’s dedupe table, backpressure, a dead-letter
path, **and a read path.**

> **Exported to:** M11 (ingestion job), M14 (the backfill), M18 (re-embedding), M19 (durable agent
> state), M20 (webhook consumer).
`;export{e as default};