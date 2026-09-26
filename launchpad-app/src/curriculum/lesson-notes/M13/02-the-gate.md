<!-- Context notes for M13/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[observability|observability]] 1
[[lint rule|lint-rule]] 1
[[Redis or Kafka|redis-kafka]] 1

::: context observability What observability means
**Observability** is how well you can tell what a running system is doing — and why — from the outside, using its logs, metrics and traces. A design that covers it answers "how would we know this is broken, and where?" before anyone has to ask. In an interview, leaving it out suggests you have never been on call.
:::

::: context lint-rule What a lint rule is
A **linter**, such as ESLint, is a tool that reads your code and flags suspicious patterns or style problems; each check it runs is a rule. The mistake named here is treating "don't use server code on the client" as a style preference a tool enforces, rather than a fact about two different machines — one you control, and one in a stranger's hands.
:::

::: context redis-kafka Redis and Kafka, in a sentence each
**Redis** is a very fast in-memory data store, often used for caches, counters and rate limits. **Kafka** is a system for moving huge streams of events between services, built at LinkedIn for their scale. Both are fine tools; naming them before you know how much traffic there is, or whether it is mostly reads or writes, signals picking technology before understanding the problem.
:::
