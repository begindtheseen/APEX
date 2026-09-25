var e=`---
id: m5-the-gate
title: "The Postgres Underneath Supabase — the gate, and what most people miss"
minutes: 1
covers:
  - "Relational modeling — constraints as the thing that actually enforces invariants"
  - "SQL without an ORM: joins, aggregates, CTEs, window functions"
  - "Indexes and EXPLAIN (ANALYZE, BUFFERS) — the slow-to-fast loop"
  - "Transactions, isolation, the lost update"
  - "N+1 queries"
  - "Connection pooling and the Vercel+Supabase failure mode"
  - "RLS: correct first, then fast"
  - "Expand/contract as a concept"
  - "Asymptotic complexity, taught here because here it is measurable"
  - "The planner: force each join strategy with enable_hashjoin/enable_mergejoin/enable_nestloop off and time all three on the same query, so its choice becomes a decision you watched it make"
  - "Estimated vs actual rows — the first thing to say about any plan; one query where stale ANALYZE or a correlated predicate breaks the estimate"
  - "The isolation levels: Postgres accepts four names and behaves in three ways, because READ UNCOMMITTED behaves as READ COMMITTED. Show that M4’s lost update survives READ COMMITTED (the default, which is why putting it in a transaction fails) and is caught under REPEATABLE READ — caught, not silently fixed: the transaction aborts with a serialization failure, and your application has to catch that and retry the whole transaction. The retry loop is the lesson; without it you have turned a silent wrong answer into a 500"
  - "MVCC and dead-tuple bloat: bulk update, watch the query slow with no code change, VACUUM, watch it recover"
---
**GATE** — **REFEREE:** your reviewer, holding an \`EXPLAIN (ANALYZE, BUFFERS)\` output you have never
seen, taken from their own work. A slow-query log only carries a plan if \`auto_explain\` was configured to
log one, and only carries actual rows if it was configured with \`log_analyze\` — so ask for the plan, not
the log line. **PASS:** state estimated vs actual rows **first**, then name the fix before reading the
query, 3 of 4. If the plan you are handed has no actual rows in it, say so first: plain \`EXPLAIN\` reports
the planner’s estimates and nothing else, and noticing that is itself the first thing to notice. Explain why your own deployed app exhausted connections and show the
pooled fix under the same load. **ON FAIL:** re-run the slow-to-fast loop on three new queries.

**Most-missed:** Reading \`cost=\` as milliseconds. It is an arbitrary planner unit. · Benchmarking
cold-then-warm so the cache gets the credit — run each variant twice, report the second. · Assuming an
index on \`(a,b)\` helps a query filtering only \`b\`. · One single-column index per column instead of one
correct composite — and forgetting each is a tax on every write. · **Holding a transaction open across a
model API call**, turning a 200ms connection into a 30-second lock. · Schema changes in the dashboard
table editor, which bypasses migration history. · \`USING (true)\`, or a policy against a JWT claim the user
can edit.
`;export{e as default};