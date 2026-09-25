var e=`---
id: m13-the-module
title: "System Design and the Design Doc — what to understand and what to build"
minutes: 1
covers:
  - "The client-server trust boundary again, this time as a thing you draw for someone else"
  - "Statelessness, and why a shared counter is the hard part"
  - "The serverless execution model, measured rather than quoted"
  - "Caching in three layers and the invalidation for each"
  - "Graceful degradation, backpressure, what happens when the model is down"
  - "The forward-looking design doc: problem, constraints, options, risks, rollout"
---
The queue half lives in M8. This is the interview-shaped half, correctly late.

**Core concepts:** The client-server trust boundary again, this time as a thing you draw for someone
else. Statelessness and why a shared counter is the hard part. The serverless execution model, measured rather than blog-post-quoted. Caching in three layers and
the invalidation for each. Graceful degradation, backpressure, what happens when the model is down.
**The forward-looking design doc** — problem, constraints, options, risks, rollout — the mid-level
artifact at most companies, and the highest-leverage move available to an engineer with no credential,
because it is public, durable, and evaluated purely on the quality of thinking.

**Checkpoints** ① the one-page design doc written, with the two options you rejected and why · ② a real
reader’s pushback on it, and the version that changed because of it · ③ the first timed design rep done
and debriefed, on a system outside your stack.

**Artifact** \`EVIDENCE\` — a one-page design doc with two rejected options for a bounded AI system,
**reviewed and pushed back on by a real reader before any code exists.** Keep both the proposed and the
built version; the delta is the interview material. **Plus three timed 45-minute design reps**, one hour
each including the debrief, one per month from the application date, each on a different bounded
system and at least one deliberately *outside* your stack — you will walk in with real p99 numbers and a
real durable queue (and, once M20 is passed, a real cost-per-completed-task table), and no reps at
saying any of it.
`;export{e as default};