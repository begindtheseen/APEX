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
observability and the failure path, surviving three unscripted follow-ups. Plus: "here is where my design
was wrong and how I found out." **ON FAIL:** rehearse the weak branch and re-book.

**Most-missed:** Treating server and client as a lint rule rather than two physically different computers.
· "Serverless means stateless so I’m fine" — instances are reused, so module-level state persists
*sometimes, unpredictably*, which is worse than never. · Caching the final response keyed on the raw
question — almost never hits, leaks across users when it does. · Retrying into an outage; a 429 means
send less traffic. · Reaching for Redis or Kafka in minute three, before anyone established the
read/write ratio. **The mid-level rubric rewards thoughtful simplification.**
`;export{e as default};