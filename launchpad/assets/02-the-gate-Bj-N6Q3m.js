var e=`---
id: m32-the-gate
title: "The First 90 Days — the gate, and what most people miss"
minutes: 1
covers:
  - "The 30/60/90 plan and the week-one manager questions"
  - "The asking-for-help format: what you tried, expected, saw, and currently believe"
  - "Org mapping from git history"
  - "Inheriting an AI system you did not build, with a done-state: a one-page note saying where the prompts live, which are load-bearing, what the implied eval was, what the author was evidently afraid of (inferred from the defensive instructions in the prompt text), and the single measurement you would run first"
  - "A WIP policy computed from your own review-latency data"
---
**GATE** — **REFEREE:** real strangers in a real channel, and a recording. **PASS:** state which prompt
in the inherited system you would change *last*, and why; three genuine questions posted and answered;
record yourself pairing with another person for 45 minutes on a real bug in an unfamiliar repo, narrating
throughout, and watch it back; state your [[median review latency|review-latency]] from your own data and your WIP policy
from memory. **ON FAIL:** you asked for the answer instead of stating what you tried, expected, saw, and
currently believe.

**Most-missed:** Silent struggle. Self-taught plus remote is a high-risk combination for exactly this,
and being stuck two days on a five-minute unblock is the kind of thing that ends a probation period. · Working one thing
at a time, so four months of six-day PRs reads on a [[cycle-time dashboard|cycle-time]] as slow to deliver. · Asking for
the answer instead of stating your [[current best hypothesis|hypothesis]].

::: context review-latency How long your changes wait
Review latency is the time between opening a pull request and getting a review. The median, the middle value of your own history, gives you a typical wait that one unusually slow review cannot distort.

Knowing it lets you plan: if reviews take about a day, you start the next task instead of waiting.
:::

::: context cycle-time From start to shipped
Cycle time measures how long a piece of work takes from start (often the first commit or opening the pull request) until it is merged or shipped. Many teams track it on dashboards.

Big pull requests that stay open for six days each look slow there, even if the work is good. Smaller, more frequent pull requests give a truer picture and get feedback sooner.
:::

::: context hypothesis Saying what you think is going on
A hypothesis is your current best guess at the cause, stated so it can be checked: "I think the job fails because the token expired, since the error started exactly an hour after login."

Sharing it when you ask for help shows your reasoning, lets a colleague correct you in one line, and proves you tried before asking.
:::
`;export{e as default};