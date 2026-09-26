var e=`---
id: m25-the-gate
title: "Python as a Second Production Language — the gate, and what most people miss"
minutes: 1
covers:
  - "Python semantics at depth"
  - "asyncio and the blocking-call trap — a concurrency model that is not JavaScript’s"
  - "FastAPI with streaming responses and dependency injection"
  - "Reading and debugging idiomatic Python you did not write"
---
**GATE** — **REFEREE:** a timer, plus a Python-fluent [[OSS maintainer|maintainer]] reviewing a real PR (route one
Track 2 contribution to a Python repo). **PASS:** add a typed route and test to an unfamiliar Python
service in 90 minutes, and **have a Python-fluent reviewer confirm there are no idiom comments to
make. Gate on that, not on the merge:** M15 says not to condition your progress on a stranger’s inbox,
and maintainer merge latency runs to months and sometimes to never. **Track the merge as a [[lagging metric|lagging-metric]]
in your funnel, the way M27 treats Gate B.** **ON FAIL:** you are writing
TypeScript with Python syntax — **a passing test cannot catch this**, which is why the referee is a human
who reads Python daily.

**Most-missed:** Assuming Python’s \`async\` is JavaScript’s: a sync HTTP client, a sync database session in an
async handler, \`time.sleep\`. All compile; all pass local testing with one user. · Unbounded
\`gather(*[...])\` — fine on 10 items, rate-limited or [[OOM|oom]] on 5,000. · Calling the real model API in unit
tests. The LLM belongs in the eval suite. · Assuming pydantic is strict by default. [[It coerces unless told|coercion]]
otherwise.

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
By default, pydantic tries to convert data into the declared type rather than rejecting it. A field declared as \`int\` will accept the string \`"42"\` and turn it into the number 42.

That is often convenient, but it can hide bugs where the wrong type was sent. Pydantic has a strict mode that refuses such conversions, and you have to turn it on explicitly.
:::
`;export{e as default};