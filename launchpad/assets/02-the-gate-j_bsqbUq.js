var e=`---
id: m4-the-gate
title: "The Machine Model: Ten Seams — the gate, and what most people miss"
minutes: 1
covers:
  - "References vs values: aliasing, shallow vs deep copy"
  - "Stack vs heap, object lifetime, why a server leaks"
  - "Number representation: floats, integer precision, the right type for money and IDs"
  - "Text encoding: bytes vs code points vs grapheme clusters, decoding a stream"
  - "JSON as a lossy boundary"
  - "Blocking: event loop, async I/O, threads, processes"
  - "File descriptors, sockets, pools, timeouts"
  - "Concurrent mutation (two things changing the same data at once): races, atomicity, idempotency"
  - "The lost update: two writers, one row, and the gap between reading and writing"
  - "Dates and timezones: DST’s doubled and missing hours, naive vs timezone-aware timestamps"
---
**GATE** — **REFEREE:** the reviewer picks which bug, from the ten, without telling you. **PASS:** name
the seam and the instrument within 60 seconds, 7 of 10. Then point at the wrong-typed columns in a small
table design your reviewer hands you. **The unseen condition:** two attempts on a data-seam bug
(encoding, money, timezone, pooling) your reviewer plants in a single file you have not seen — pass 1
of 2. **ON FAIL:** rewrite the two you missed from empty; re-attempt in 7 days.

**Most-missed:** Believing \`{...obj}\` or \`JSON.parse(JSON.stringify(obj))\` is a copy. The spread is one
level. The JSON trick converts Dates to strings, drops \`undefined\` and functions, mangles Maps and Sets
to \`{}\`, and throws on cycles. · \`.toFixed(2)\` "solves" money by fixing the display and leaving the
arithmetic wrong. · \`new TextDecoder()\` *inside* the loop — looks identical to correct code, and
discards the carried partial-character state that is the entire point. · "I’m using a pool" while N
serverless instances [[each hold a pool of M|pool-math]]. · [[Believing a transaction prevents the race|atomicity-isolation]]. Atomicity is not
isolation.

::: context pool-math Why pools multiply
Each serverless copy of your app gets its own pool. If the platform runs 50 copies at a busy moment and each holds a pool of 10 connections, the database is asked for 500. Postgres, by default, allows 100 connections in total, so the extra requests are refused. The fix is usually a shared pooler that sits in front of the database, or much smaller pools per copy.
:::

::: context atomicity-isolation Atomicity is not isolation
A **transaction** groups changes so they all happen or none do — that is *atomicity*. Whether two transactions running at the same moment can trip over each other is a separate property, *isolation*. With Postgres's default setting, two transactions can both read a balance of 100, both add to it, and both write back, and one addition is lost. Locking the row while you read it, or asking for stricter isolation, prevents that.
:::
`;export{e as default};