var e=`---
id: m13-the-gate
title: "System Design and the Design Doc — the gate, and what most people miss"
minutes: 1
covers:
  - "The client-server trust boundary again, this time as a thing you draw for someone else"
  - "Statelessness, and why a shared counter is the hard part"
  - "The serverless execution model, measured rather than quoted"
  - "Caching in three layers and the invalidation for each"
  - "Graceful degradation, backpressure, what happens when the model is down"
  - "The forward-looking design doc: problem, constraints, options, risks, rollout"
---
**GATE** — **REFEREE:** the mock interviewer, who must ask questions you did not anticipate — this gate is
unadministrable alone. **PASS:** 45 minutes at a whiteboard on one bounded AI system end to end including
[[observability|observability]] and the failure path, surviving three unscripted follow-ups. Plus: "here is where my design
was wrong and how I found out." **ON FAIL:** rehearse the weak branch and re-book.

**Most-missed:** Treating server and client as a [[lint rule|lint-rule]] rather than two physically different computers.
· "Serverless means stateless so I’m fine" — instances are reused, so module-level state persists
*sometimes, unpredictably*, which is worse than never. · Caching the final response keyed on the raw
question — almost never hits, leaks across users when it does. · Retrying into an outage; a 429 means
send less traffic. · Reaching for [[Redis or Kafka|redis-kafka]] in minute three, before anyone established the
read/write ratio. **The mid-level rubric rewards thoughtful simplification.**

::: context observability What observability means
**Observability** is how well you can tell what a running system is doing — and why — from the outside, using its logs, metrics and traces. A design that covers it answers "how would we know this is broken, and where?" before anyone has to ask. In an interview, leaving it out suggests you have never been on call.
:::

::: context lint-rule What a lint rule is
A **linter**, such as ESLint, is a tool that reads your code and flags suspicious patterns or style problems; each check it runs is a rule. The mistake named here is treating "don't use server code on the client" as a style preference a tool enforces, rather than a fact about two different machines — one you control, and one in a stranger's hands.
:::

::: context redis-kafka Redis and Kafka, in a sentence each
**Redis** is a very fast in-memory data store, often used for caches, counters and rate limits. **Kafka** is a system for moving huge streams of events between services, built at LinkedIn for their scale. Both are fine tools; naming them before you know how much traffic there is, or whether it is mostly reads or writes, signals picking technology before understanding the problem.
:::
`;export{e as default};