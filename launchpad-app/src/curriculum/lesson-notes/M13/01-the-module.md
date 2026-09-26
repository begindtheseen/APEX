<!-- Context notes for M13/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Statelessness|statelessness]] 2
[[Caching in three layers|cache-invalidation]] 2
[[Graceful degradation|graceful-degradation]] 2
[[The forward-looking design doc|design-doc]] 2
[[timed 45-minute design reps|design-reps]] 1
[[p99 numbers|p99]] 1

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
