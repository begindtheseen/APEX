var e=`---
id: m5-the-module
title: "The Postgres Underneath Supabase — what to understand and what to build"
minutes: 4
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
Supabase fluency is not Postgres fluency.

> **Open with a 3-hour win, not a 15-hour rig.** One table of 50k rows, one slow query, one EXPLAIN,
> one index, one measured speedup you state as a number. **Do not work backwards from a headline
> factor** — it depends on the query, the selectivity and the cache state, and a target set in advance is
> the habit M12 exists to break. It will probably land somewhere between one and three orders of
> magnitude; if it comes out at 1.2×, that is the interesting result and finding out why is the
> exercise. **See the loop work on day one**, then build the 5,000,000-row rig with
> the purpose already understood. Environment setup with no visible result, at the exact start of the
> abandonment window, is how modules get abandoned.

**Checkpoints** ① the 3-hour win: 50k rows, one slow query, one EXPLAIN, one index, one measured speedup
you can state as a number · ② reading a plan out loud: seq scan vs index scan vs bitmap heap, and which
line of EXPLAIN told you · ③ the 5,000,000-row rig loaded, with a load generator you wrote rather than a
benchmark you downloaded · ④ six of the twelve queries with plans captured before and after · ⑤ all
twelve, plus the wall-clock table that shows the slow-to-fast loop closing · ⑥ an RLS policy set benchmarked
correct-but-slow against correct-and-fast, with the plan diff that explains it · ⑦ asymptotic complexity
written against your own measurements, not against a textbook curve · ⑧ the legacy-key rotation performed
and documented as a procedure someone else could follow · ⑨ the flagship on hosted Supabase: sign-in, one
user-scoped table, one policy, a pooled connection.

**Core concepts:** Relational modeling — constraints as the thing that actually enforces invariants.
SQL without an ORM: joins, aggregates, CTEs, window functions. Indexes and
\`EXPLAIN (ANALYZE, BUFFERS)\` — the deliberate slow-to-fast loop. Transactions, isolation, the lost update.
N+1. **Connection pooling and the Vercel+Supabase failure mode.** RLS — correct first, then fast.
Expand/contract *as a concept*. **The planner:** force each join strategy with \`enable_hashjoin\` /
\`enable_mergejoin\` / \`enable_nestloop\` off and time all three on the same query, so its choice becomes a
decision you watched it make. **Estimated vs actual rows** — the first thing to say about any plan; one
query where stale \`ANALYZE\` or a correlated predicate breaks the estimate. **The isolation levels — four names, three
behaviours**, because READ UNCOMMITTED behaves as READ COMMITTED: show that M4’s lost update survives
READ COMMITTED (the default, which is why putting it in a transaction fails) and is **caught** under
REPEATABLE READ. Caught, not silently fixed — the transaction aborts with a serialization failure, and
**your application has to catch that and retry the whole transaction.** The retry loop is the lesson;
without it you have converted a silent wrong answer into a user-visible 500 and will conclude that
REPEATABLE READ does not work. **MVCC and dead-tuple bloat:** bulk update, watch the query slow
with no code change, \`VACUUM\`, watch it recover. The local Supabase stack runs in the containers you
checked could install in M1.

**Asymptotic complexity, taught here because here it is measurable.** State the complexity of the loop
or query you just wrote, predict where it breaks, measure against the 5,000,000-row dataset, compare prediction
to plan.

> The cut list removes "algorithm theater" — implementations, puzzle practice, graphs and toposort. **It
> does not remove the notation or the reasoning.** Big-O is the working vocabulary of code review and design discussion, and M14, M15, and M13 all put you on the
> *receiving* end of it.

> **The connection surface, named.**
> There are four distinct endpoints with different IP-version and plan availability: direct, shared
> pooler in session mode, shared pooler in transaction mode (the serverless one), and dedicated pooler.
> Session mode’s old port was removed in Feb 2025 and the IPv4 add-on is a *swap*, not a dual-stack
> addition. **Verify the current endpoint table before you start** — this is a platform claim wearing
> fundamentals clothing and it moves at platform speed.

> **Key naming is mid-migration.** Supabase is replacing the legacy \`anon\`/\`service_role\` JWT keys with
> publishable/secret keys, deprecating the old pair inside this curriculum’s own calendar. Learn both
> names once, then use the new ones. **Make the migration an artifact:** rotate the flagship onto the new
> keys, disable the legacy pair, prove with a test that nothing broke.

**Artifact** \`LAB\` — a \`pg-lab\` repo against a local Supabase stack. The 3-hour win first. Then the
5,000,000-row rig: twelve hand-written queries with EXPLAIN plans before and after, a documented
slow-to-fast loop with wall-clock numbers from **a load generator you wrote** (exported to M23); an RLS
policy set benchmarked correct-but-slow vs fast; the legacy-key rotation above as an artifact. Plus
asymptotic complexity, measured. **Then the flagship moves onto hosted Supabase:** sign-in, one table
scoped to the signed-in user, one row-level security policy, and a pooled connection, so the app now has
accounts and keeps data between visits. **The lab itself stays private; this last piece is the exception,
because it changes what a stranger sees.**

> Two things belong later. The **expand/contract-under-load build** is in M23, where the deploy
> pipeline exists to run it through. **pgvector recall and filtered search** are in M18 — at this
> position recall is *literally unmeasurable*, because no corpus, embeddings, queries, or golden set
> exist yet.
`;export{e as default};