<!-- Context notes for M25/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[OSS maintainer|maintainer]] 1
[[lagging metric|lagging-metric]] 1
[[OOM|oom]] 1
[[It coerces unless told|coercion]] 1

::: context maintainer Who looks after an open-source project
A maintainer is someone with the right to review and merge changes into an open-source project. Many are volunteers maintaining the project in spare time, with a long queue of pull requests from strangers.

That is why a contribution can wait weeks or months for a review, through no fault of yours, and why this gate does not depend on the merge itself.
:::

::: context lagging-metric Results that show up late
A **lagging** metric records an outcome after the fact and is mostly outside your control: a merged pull request, an interview offer. A **leading** metric is something you do now that tends to produce it: pull requests opened, applications sent.

You steer by leading metrics and track lagging ones to see whether the steering works. Waiting on a lagging one before moving on stalls the whole plan.
:::

::: context oom Out of memory
OOM means **out of memory**: the program asked for more memory than the machine or container allows, and the operating system killed it, usually without a helpful error.

Starting 5,000 tasks at once holds 5,000 requests and responses in memory together, and the API will likely start refusing you for sending too many requests. Capping concurrency, for example with a semaphore that lets 20 run at a time, avoids both.
:::

::: context coercion Pydantic quietly converts types
By default, pydantic tries to convert data into the declared type rather than rejecting it. A field declared as `int` will accept the string `"42"` and turn it into the number 42.

That is often convenient, but it can hide bugs where the wrong type was sent. Pydantic has a strict mode that refuses such conversions, and you have to turn it on explicitly.
:::
