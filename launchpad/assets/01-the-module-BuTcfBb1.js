var e=`---
id: m28-the-module
title: "The Evidence Layer v1 — what to understand and what to build"
minutes: 2
covers:
  - "A resume that maps each claim to a repo"
  - "Two pinned repos now; the pinned three (flagship, open-source history, a write-up) arrive in M29. Three, not four — there is no second product in this program, and promising a reader one you never build is the same defect as any other unsupported number"
  - "Rehearsing only the sentences your artifacts can back today. The distributed-systems and algorithms answers are yours at this point; the fine-tuning and framework answers need M12 and M19, and they belong in M29"
  - "Lab vs Evidence — labs are private"
---
**It does not move because a module is late.** If M10 has not passed by then, you apply with what you
have and say in the re-plan what you are applying without — **which is why this module waits only on M2**,
the flagship its claims point at, rather than on M10. M10 is the readiness condition for *applying*; it
is not what opens this page, because a module that opened on M10 could not be reached in the very case
the rule above describes. Applications need a resume on that date, not a year later.

**Core concepts:** A resume that maps each claim to a repo. [[Two pinned repos|pinned-repos]] now; the pinned three
(flagship, open-source history, a write-up) arrive in M29. \`LAB\` vs \`EVIDENCE\` — labs are private. What
you say about how you spent the year, and why the honest version is the one that survives.

**Artifact** \`EVIDENCE\` — a resume mapping each claim to a repo; **two pinned repos: the flagship and one
other \`EVIDENCE\` artifact**; a README in [[product-spec form|product-spec]].

**Only \`EVIDENCE\`-tagged artifacts are pinned, and the labs are private.** \`runtime-lab\`, \`seams\`,
\`pg-lab\`, \`model-probe\`, \`stats-lab\`, the recovery log, the defect log, the estimate log — these taught
you things and they are **not portfolio.**

**The sentences you will be asked for in a first screen, rehearsed here — but only the ones that are
true on the day this module fires.** Every cut in this document is a gap an interviewer may probe. A
shrug loses the room; a specific answer with a number wins it.

- **[[Distributed systems|distributed-systems]], if you built M8** — *"I haven’t run [[Kafka|kafka]]. I built a Postgres-backed durable
  queue with \`SKIP LOCKED\`, [[at-least-once delivery|at-least-once]] and idempotent consumers, and I can tell you exactly
  what would make me outgrow it."* **M8 is not on the Spine**, so on that path this sentence is not yours
  either — say what you did build and what would make you reach for a queue.
- **Algorithms** — *"I state [[the complexity|complexity]] of what I write and measure it against a 5,000,000-row set."*

> **The fine-tuning answer and the framework answer are not yours yet.** The first needs your own eval
> numbers (M12) and the second needs the hand-rolled agent loop (M19), and rehearsing either before those
> exist is rehearsing something you cannot back. **They are in M29**, where the artifacts behind them
> exist.

> **How you talk about the year.** Lab concepts surface only as specific answers to specific questions,
> and a portfolio that describes its own coursework reads as coursework — the same goes for the weekly
> cold-rebuild ritual, which is excellent practice and sounds like test prep. But **not naming how you
> learned is fine; constructing a framing designed to be mistaken for employment is not.** If you are
> asked directly, name the program and offer to show it, including where it was wrong and what you
> changed. M27 works out why that is the answer that survives.

::: context pinned-repos Your GitHub shop window
GitHub lets you **pin** up to six repositories to the top of your profile page. They are the first thing a recruiter or engineer sees when they click your profile link, and many will look at nothing else.

Fewer, stronger pins beat a wall of half-finished tutorials. Each pinned repository should hold up to ten minutes of a stranger poking around.
:::

::: context product-spec A README that explains the product
A product spec (specification) describes what a product does, who it is for, what it deliberately does not do, and how you know it works. Written that way, a README answers a reviewer's real questions in the first screen.

The usual portfolio README instead opens with a list of technologies and installation steps. That tells a reader what you used, not what you built or why it matters.
:::

::: context distributed-systems Many machines acting as one
A distributed system is any system whose parts run on separate machines and talk over a network: a web app with a database server and a job queue already counts.

The hard part is that networks are slow and unreliable: messages arrive late, twice or not at all, and machines fail independently. Interviewers ask about it because handling those failures well is much of backend work.
:::

::: context kafka A heavy-duty message pipeline
Apache Kafka is an open-source platform for moving huge streams of messages between services, originally built at LinkedIn. Large companies use it to pass events such as clicks, orders and log lines between hundreds of systems.

Many job postings name it. Being able to say what a simpler queue you built does and does not handle, and when you would switch, is a stronger answer than claiming experience you do not have.
:::

::: context at-least-once Delivered, maybe twice
Message systems make one of a few promises. **At-most-once**: a message may be lost but is never repeated. **At-least-once**: it is never lost but may arrive more than once, for example when a worker crashes after doing the job but before confirming it.

At-least-once is the common, practical choice, and it is why consumers must be idempotent: handling the same message twice must do no extra harm.
:::

::: context complexity How work grows with the data
The complexity of code describes how its running time grows as the input grows, usually written in **Big-O** notation. $O(n)$ means twice the rows take about twice the time; $O(n^2)$ means twice the rows take about four times as long.

At 5,000,000 rows the difference is stark: $n$ is five million steps, while $n^2$ is $2.5 \\times 10^{13}$, far too many to wait for. Measuring on a large set shows the difference instead of arguing about it.
:::
`;export{e as default};