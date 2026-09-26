<!-- Context notes for M32/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[median review latency|review-latency]] 1
[[cycle-time dashboard|cycle-time]] 1
[[current best hypothesis|hypothesis]] 1

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
