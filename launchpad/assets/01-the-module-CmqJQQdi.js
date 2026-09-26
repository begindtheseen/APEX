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
else. [[Statelessness|statelessness]] and why a shared counter is the hard part. The serverless execution model, measured rather than blog-post-quoted. [[Caching in three layers|cache-invalidation]] and
the invalidation for each. [[Graceful degradation|graceful-degradation]], backpressure, what happens when the model is down.
**[[The forward-looking design doc|design-doc]]** — problem, constraints, options, risks, rollout — the mid-level
artifact at most companies, and the highest-leverage move available to an engineer with no credential,
because it is public, durable, and evaluated purely on the quality of thinking.

**Checkpoints** ① the one-page design doc written, with the two options you rejected and why · ② a real
reader’s pushback on it, and the version that changed because of it · ③ the first timed design rep done
and debriefed, on a system outside your stack.

**Artifact** \`EVIDENCE\` — a one-page design doc with two rejected options for a bounded AI system,
**reviewed and pushed back on by a real reader before any code exists.** Keep both the proposed and the
built version; the delta is the interview material. **Plus three [[timed 45-minute design reps|design-reps]]**, one hour
each including the debrief, one per month from the application date, each on a different bounded
system and at least one deliberately *outside* your stack — you will walk in with real [[p99 numbers|p99]] and a
real durable queue (and, once M20 is passed, a real cost-per-completed-task table), and no reps at
saying any of it.

::: context statelessness What stateless means
A **stateless** server remembers nothing between requests; everything it needs comes with the request or from a database. That lets any copy of the server answer any request, so you can run two copies or two hundred. The hard part is anything that must be shared — a count of how many requests a user made this minute has to live in one place every copy can see, not in each copy's memory.
:::

::: context cache-invalidation Caching, and the hard part
A **cache** keeps a copy of an answer so it can be given again without redoing the work — in the user's browser, in your server's memory, or next to the database. The hard part is **invalidation**: knowing when a saved copy is out of date and throwing it away. An old programmers' joke, usually credited to Phil Karlton, says there are only two hard things in computer science: cache invalidation and naming things.
:::

::: context graceful-degradation What graceful degradation is
When one part of a system fails, the rest keeps working in a reduced form instead of showing an error page. If the model provider is down, the app might switch to a backup model, show earlier answers, or let users queue a question for later. Deciding in advance what "reduced" looks like is a design decision interviewers expect you to make out loud.
:::

::: context design-doc What a design doc is
A short document written *before* building something: the problem, the constraints, two or three ways to solve it, which one you chose and why, the risks, and how it will be rolled out. Colleagues comment on it, and the cheap time to find a flaw is in the document, not after the code ships. At many companies, writing good ones is part of what separates mid-level engineers from juniors.
:::

::: context design-reps What a system design interview is
A common interview round: in about 45 minutes, at a whiteboard or shared screen, you design a system such as a chat app or a file-upload service. There is no single right answer. Interviewers watch whether you ask about requirements first, make trade-offs out loud, and handle their follow-up questions — which is why it has to be practised, like any timed performance.
:::

::: context p99 What p99 means
**p99** latency is the response time that 99 out of 100 requests beat — the slowest one percent. It sounds like an edge case, but a busy service serves that one percent constantly, and a page that makes many calls behind the scenes hits a slow one far more often than one time in a hundred. Real p99 numbers from a system you ran are strong interview material.
:::
`;export{e as default};