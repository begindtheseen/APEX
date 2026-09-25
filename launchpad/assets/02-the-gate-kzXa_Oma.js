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
**GATE** — **REFEREE:** a timer, plus a Python-fluent OSS maintainer reviewing a real PR (route one
Track 2 contribution to a Python repo). **PASS:** add a typed route and test to an unfamiliar Python
service in 90 minutes, and **have a Python-fluent reviewer confirm there are no idiom comments to
make. Gate on that, not on the merge:** M15 says not to condition your progress on a stranger’s inbox,
and maintainer merge latency runs to months and sometimes to never. **Track the merge as a lagging metric
in your funnel, the way M27 treats Gate B.** **ON FAIL:** you are writing
TypeScript with Python syntax — **a passing test cannot catch this**, which is why the referee is a human
who reads Python daily.

**Most-missed:** Assuming Python’s \`async\` is JavaScript’s: a sync HTTP client, a sync database session in an
async handler, \`time.sleep\`. All compile; all pass local testing with one user. · Unbounded
\`gather(*[...])\` — fine on 10 items, rate-limited or OOM on 5,000. · Calling the real model API in unit
tests. The LLM belongs in the eval suite. · Assuming pydantic is strict by default. It coerces unless told
otherwise.
`;export{e as default};