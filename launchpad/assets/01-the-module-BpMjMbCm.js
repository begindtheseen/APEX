var e=`---
id: m4-the-module
title: "The Machine Model: Ten Seams — what to understand and what to build"
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
**Core concepts:** References vs values — aliasing, mutation, shallow vs deep copy. Stack vs heap,
object lifetime, why a server leaks (GC frees *unreachable* objects; a leak is unintended
reachability). Number representation — floating point, integer precision, the right type for money and
IDs. Text encoding — bytes vs code points vs grapheme clusters, decoding a *stream*. JSON as a lossy
boundary. Blocking: event loop, async I/O, threads, processes. File descriptors, sockets, pools,
timeouts. Concurrent mutation (two things changing the same data at once) — races, atomicity,
idempotency. **The lost update:** two writers, one
row, and the gap between reading and writing. **Dates and timezones** — DST’s doubled and missing hours,
naive vs timezone-aware timestamps (\`timestamptz\` vs \`timestamp\` is the Supabase footgun that silently
produces correct-looking wrong data).

**Checkpoints** ① aliasing and the shallow-copy trap, reproduced and fixed · ② money wrong by a cent,
then correct · ③ the leaking server, proved with a heap snapshot · ④ the streamed grapheme split, and the
pool exhausted under load · ⑤ the lost update reproduced against a real database row, then prevented ·
⑥ the four-timezone scheduler pinned across both DST boundaries.

**Artifact** \`LAB\` — a \`seams\` repo of ten reproductions, each a failing script + fix + proving test:
a leak proved with a heap snapshot; money wrong by a cent; a UTF-8 grapheme split across streamed
chunks; a pool exhausted under load; a lost update in a database (the Postgres version, with the plan
that proves it, is M5’s); a four-timezone digest scheduler with an injected fake clock pinned across
spring-forward and fall-back.
`;export{e as default};