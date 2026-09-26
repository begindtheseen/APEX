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
five-minute unblock is the kind of thing that ends a [[probation period|probation]] — not for incompetence, but for
being stuck two days on something a teammate would have unblocked in five minutes.

**The unwritten norm nobody writes down:** struggle alone briefly, then ask publicly in a channel with
what you tried, what you expected, what you saw, and what you currently believe. That format demonstrates
competence *while* asking for help rather than in spite of it.

**Core concepts:** The [[30/60/90 plan|thirty-sixty-ninety]] and the week-one manager questions. The asking-for-help format:
what you tried, expected, saw, and currently believe. [[Org mapping|org-mapping]] from git history. **Inheriting an AI
system you did not build**, with a done-state: a one-page note saying where the prompts live, which are
[[load-bearing|load-bearing]], what the implied eval was, what the author was evidently afraid of (inferred from the
defensive instructions in the prompt text), and the single measurement you would run first. A [[WIP policy|wip-policy]]
computed from your own review-latency data.

**Artifact** \`LAB\` — a 30/60/90 plan against a real posting with week-one manager questions; a reusable
asking-for-help template **practiced for real by posting three genuine questions in an OSS project’s
Discord or Slack**, responses kept; an org map inferred from the repo’s history — who touches what, from
\`git log\` by author; nothing M1 did not teach; a handoff note good enough for a stranger to continue.
**Plus inheriting an AI system you did not build:** reading someone else’s prompts, evals and traces,
using whatever of M12 and M17 you have passed; prompt archaeology on a system with no decision log — your
first AI ticket is more likely "the summaries feel off, look into it" than a [[greenfield feature|greenfield]]. **Plus a
WIP policy computed from your own Track 2 review-latency data, and one recorded 45-minute [[pairing session|pairing]]
with another person on a real bug in an unfamiliar repo.**

::: context probation The trial months at a new job
Many companies and countries use a probation period: the first months of a new job, often three to six, during which performance is watched closely and the job can be ended more easily.

Being slow on day-to-day problems is rarely what gets people let go. Going quiet for days while stuck is, because it looks like the person cannot work on a team.
:::

::: context thirty-sixty-ninety A plan for your first three months
A 30/60/90 plan sets out what you aim to learn and deliver by day 30, day 60 and day 90 of a new job, and you share it with your manager.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100" font-family="Inter, Arial, sans-serif">
  <line x1="20" y1="40" x2="340" y2="40" stroke="#1f2a44" stroke-width="2"/>
  <g fill="#1d6fd1"><circle cx="20" cy="40" r="5"/><circle cx="127" cy="40" r="6"/><circle cx="233" cy="40" r="6"/><circle cx="340" cy="40" r="6"/></g>
  <g font-size="12" text-anchor="middle" fill="#1f2a44">
    <text x="20" y="24">start</text><text x="127" y="24">day 30</text><text x="233" y="24">day 60</text><text x="340" y="24" text-anchor="end">day 90</text>
  </g>
  <g font-size="11" text-anchor="middle" fill="#6c7a93">
    <text x="73" y="64">learn: setup,</text><text x="73" y="78">people, code</text>
    <text x="180" y="64">contribute:</text><text x="180" y="78">small tickets</text>
    <text x="287" y="64">own: a piece</text><text x="287" y="78">of the system</text>
  </g>
</svg>
\`\`\`

It shows you have thought about ramping up, and it gives you and your manager an agreed yardstick for the checkpoints.
:::

::: context org-mapping Who works on what
An org map is your picture of who does what: who owns which parts of the code, who reviews what, who to ask about the billing system. Formal org charts show reporting lines, not who actually knows things.

The git history reveals it: listing commits by author for a folder shows who has worked on it most. Those are the people to ask.
:::

::: context load-bearing The parts holding everything up
In a building, a load-bearing wall holds up the floors above, and removing it brings things down. In a system, a load-bearing prompt or line of code is one that other behaviour depends on, often in ways nobody wrote down.

The safe habit when inheriting a system: find out which parts are load-bearing before changing anything, because a harmless-looking edit there can break things far away.
:::

::: context wip-policy Limiting how much is in flight
WIP means **work in progress**. A WIP policy is a rule for how many tasks you keep open at once, such as "at most three pull requests waiting for review".

Too few and you sit idle waiting for reviewers; too many and everything is half-done. Your own data sets the number: if reviews usually take a day, you need enough other work in flight to stay busy during that day.
:::

::: context greenfield Building from scratch versus inheriting
**Greenfield** work starts from nothing: a new project with no existing code or constraints, like building on an empty field. **Brownfield** work means changing an existing system with all its history.

Most jobs are overwhelmingly brownfield. New hires usually start by fixing or improving something that already exists, which is why reading unfamiliar code matters so much.
:::

::: context pairing Two people, one problem
Pair programming means two people working on the same code at once, usually one typing ("driver") and one reviewing and thinking ahead ("navigator"), swapping often. Remote pairs share a screen.

Many teams pair to onboard new people or crack hard bugs, and some interviews are run as pairing sessions. Narrating your thinking so the other person can follow is the core skill.
:::
`;export{e as default};