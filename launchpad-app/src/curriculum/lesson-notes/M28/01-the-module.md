<!-- Context notes for M28/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Two pinned repos|pinned-repos]] 2
[[product-spec form|product-spec]] 1
[[Distributed systems|distributed-systems]] 1
[[Kafka|kafka]] 1
[[at-least-once delivery|at-least-once]] 1
[[the complexity|complexity]] 1

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

At 5,000,000 rows the difference is stark: $n$ is five million steps, while $n^2$ is $2.5 \times 10^{13}$, far too many to wait for. Measuring on a large set shows the difference instead of arguing about it.
:::
