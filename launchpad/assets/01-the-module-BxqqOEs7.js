var e=`---
id: m32-the-module
title: "The First 90 Days — what to understand and what to build"
minutes: 2
covers:
  - "The 30/60/90 plan and the week-one manager questions"
  - "The asking-for-help format: what you tried, expected, saw, and currently believe"
  - "Org mapping from git history"
  - "Inheriting an AI system you did not build, with a done-state: a one-page note saying where the prompts live, which are load-bearing, what the implied eval was, what the author was evidently afraid of (inferred from the defensive instructions in the prompt text), and the single measurement you would run first"
  - "A WIP policy computed from your own review-latency data"
---
Self-taught plus remote is a high-risk combination for silent struggle, and being stuck two days on a
five-minute unblock is the kind of thing that ends a probation period — not for incompetence, but for
being stuck two days on something a teammate would have unblocked in five minutes.

**The unwritten norm nobody writes down:** struggle alone briefly, then ask publicly in a channel with
what you tried, what you expected, what you saw, and what you currently believe. That format demonstrates
competence *while* asking for help rather than in spite of it.

**Core concepts:** The 30/60/90 plan and the week-one manager questions. The asking-for-help format:
what you tried, expected, saw, and currently believe. Org mapping from git history. **Inheriting an AI
system you did not build**, with a done-state: a one-page note saying where the prompts live, which are
load-bearing, what the implied eval was, what the author was evidently afraid of (inferred from the
defensive instructions in the prompt text), and the single measurement you would run first. A WIP policy
computed from your own review-latency data.

**Artifact** \`LAB\` — a 30/60/90 plan against a real posting with week-one manager questions; a reusable
asking-for-help template **practiced for real by posting three genuine questions in an OSS project’s
Discord or Slack**, responses kept; an org map inferred from the repo’s history — who touches what, from
\`git log\` by author; nothing M1 did not teach; a handoff note good enough for a stranger to continue.
**Plus inheriting an AI system you did not build:** reading someone else’s prompts, evals and traces,
using whatever of M12 and M17 you have passed; prompt archaeology on a system with no decision log — your
first AI ticket is more likely "the summaries feel off, look into it" than a greenfield feature. **Plus a
WIP policy computed from your own Track 2 review-latency data, and one recorded 45-minute pairing session
with another person on a real bug in an unfamiliar repo.**
`;export{e as default};