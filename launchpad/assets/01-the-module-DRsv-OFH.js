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

**Core concepts:** A resume that maps each claim to a repo. Two pinned repos now; the pinned three
(flagship, open-source history, a write-up) arrive in M29. \`LAB\` vs \`EVIDENCE\` — labs are private. What
you say about how you spent the year, and why the honest version is the one that survives.

**Artifact** \`EVIDENCE\` — a resume mapping each claim to a repo; **two pinned repos: the flagship and one
other \`EVIDENCE\` artifact**; a README in product-spec form.

**Only \`EVIDENCE\`-tagged artifacts are pinned, and the labs are private.** \`runtime-lab\`, \`seams\`,
\`pg-lab\`, \`model-probe\`, \`stats-lab\`, the recovery log, the defect log, the estimate log — these taught
you things and they are **not portfolio.**

**The sentences you will be asked for in a first screen, rehearsed here — but only the ones that are
true on the day this module fires.** Every cut in this document is a gap an interviewer may probe. A
shrug loses the room; a specific answer with a number wins it.

- **Distributed systems, if you built M8** — *"I haven’t run Kafka. I built a Postgres-backed durable
  queue with \`SKIP LOCKED\`, at-least-once delivery and idempotent consumers, and I can tell you exactly
  what would make me outgrow it."* **M8 is not on the Spine**, so on that path this sentence is not yours
  either — say what you did build and what would make you reach for a queue.
- **Algorithms** — *"I state the complexity of what I write and measure it against a 5,000,000-row set."*

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
`;export{e as default};