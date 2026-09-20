# The Launch Pad

## A curriculum for becoming a hireable remote AI product engineer

**Version 2** — rebuilt after adversarial review. Built from 24 parallel research agents, then attacked
by 10 critics from 10 lenses, then re-cut. The review broke one of the five structural bets this
document was resting on and found a sixth it had never named. Both corrections are on this page.

---

## The honest numbers

| | hours |
|---|---|
| **Module hours** (the 31 modules) | **999** |
| **Parallel track hours** (8 tracks, all mandatory) | **~425** |
| **Real total** | **~1,425 focused hours** |

Version 1 of this document said 963 hours. **That was wrong, and it was wrong in the most dangerous
direction.** It excluded the eight parallel tracks — which it simultaneously described as mandatory.
Three critics priced those tracks independently and converged on 350–480 hours. The headline
understated the commitment by roughly 40%.

That matters more than any other correction here, because M0's entire claim to authority is *runway
sets the deadline*. A deadline computed from a number 40% low is not authority. It is a miscalculation
you experience as a felt sense of perpetual lateness somewhere in month nine — which this document
itself names as the mechanism that turns a bad stretch into quitting.

### What ~1,425 hours actually means

- At **18 h/week** → ~20–24 months.
- To finish in **13 months** you need **~24 h/week**, every week, for a year.
- Wall-clock runs 1.3–1.5× focused hours once you count setup, yak-shaving, and re-reading what decayed.

**Do not pick a weekly number because it sounds committed. Derive it.** M0 requires you to write down
your employment status and monthly burn first, then publish two timeline variants — employed (~12 h/wk)
and full-time (~35 h/wk) — and take the one that matches your actual life.

### The Compressed Spine — if your runway is under nine months

Do not attempt the full program. The real short path is **350 focused hours**: M0 (20), M1 (67), M2 (45),
M3 (45), M6 (28), M7 (45), M9 (30), M11 (62), M25 (8). That is ~4.5 months at 18 h/week, and it gets you
to a contract role with the
fundamentals, the observability, the model layer, and one real eval harness. Everything else is learned
on someone else's payroll.

**M25 (comp and terms) is non-droppable in every variant, including this one.** It is 8 hours against a
first-year cost that exceeds the value of this entire curriculum.

---

## The six bets this curriculum is making

A red team was asked to break all of these. Here is what survived.

**BET 1 — TypeScript first, Python late. → HOLDS.** The attack was that Python appears in the large
majority of AI-engineer postings and that resolving for TS costs most of your funnel. It fails: your
entire body of shipped evidence is TypeScript, your gap is a *reasoning* gap rather than a
language-count gap, and learning correctness twice is strictly worse than learning it once and porting
it. The postings read "Python **or** TypeScript," and the live AI-*product* roles are TS-native.
**What was wrong was the hedge, not the bet** — v1 named this "the biggest open bet" and then gave it
no trigger, no threshold, and no pre-written alternative. Fixed in M25 and M8/M23.

**BET 2 — the hour budget. → WAS WRONG.** Corrected above. This is the single most important change in v2.

**BET 3 — an artifact per module. → HOLDS, with one addition.** The attack (27 artifacts produce a
portfolio of toys) fails on the document's own facts — it already collapses many modules onto one
flagship and selects down to four pinned repos. The real defect was never distinguishing **artifacts
built to learn** from **artifacts built to show.** Every artifact is now tagged `LAB` or `EVIDENCE`.
Costs nothing.

**BET 4 — gating the AI layer behind the fundamentals. → WAS PARTLY WRONG.** The justification ("an
eval harness built by someone who cannot write a concurrent data pipeline is a dashboard, not a skill")
supports putting evals after the runtime and observability modules. It does **not** support putting
them after 150 hours of Postgres, git, agents, and scoping. Worse, it collided with the month-5
application date: the differentiator finished around month 10 while you were already interviewing.
**Fixed: the model layer, ingestion, and evals now run immediately after observability**, and the
ramp-and-collaboration modules move after them.

**BET 5 — that a curriculum is the right instrument at all. → HOLDS.** You named a real reasoning gap
and the 2026 market for unproven remote juniors is genuinely hostile; competence work is necessary. But
the honest residue of the attack stands: **the three activities most directly responsible for whether
you get hired — applications that reach a human, merged OSS PRs, public writing about measurements —
were the only parts of v1 with no hours, no artifact, and no gate,** while every technical module had
all four. Under time pressure, unbudgeted ungated work goes first. That is how this becomes eighteen
months of excellent code and four interviews. All three now carry hours and gates.

**BET 6 — THE ONE V1 NEVER NAMED: that the flagship exists, qualifies, and has real traffic.**
Five of ten lenses found this independently — the most corroborated finding in the entire review. It
gates twelve modules. It had no specification, no acquisition plan, no hours, and no fallback. **It is
the only prerequisite in this document that cannot be satisfied by working harder** — it needs other
humans using your app, months in advance. It is now a hard gate with a spec, hours, and a written
fallback. See M0 and the Layer 3 gate.

> The review verified the concrete version of this risk: the one app currently in this repo is a static
> `index.html` with `localStorage` — no backend, no accounts, no users, no model calls. That is not
> proof your flagship will fail. It is proof that an app can pass M0 as v1 wrote it and satisfy **zero**
> of the twelve requirements.

---

## The four rules

**1. Every module ends in an artifact you built and can explain out loud.** Every artifact is tagged
`LAB` (built to learn, never pinned) or `EVIDENCE` (built to show, goes in the portfolio).

**2. Every module except M0 has at least one inbound dependency edge.** Each module header states
`dependsOn:` explicitly. **The longest path, not the hour sum, sets the timeline.**

**3. Five concepts have exactly one owning module** and are consumed, never re-taught: **streaming**
(M3), **the durable queue** (M5), **observability** (M7), **evals** (M11), **the trust boundary** (M1).
v1 claimed this rule and then violated it twice — idempotency and cost had no declared owner. Now:
**idempotency** is owned by M3, **cost** by M18.

**4. Four concepts are deliberately taught twice, at different depths.** This is not a violation; it is
a spiral, and naming the pairs prevents someone "fixing" it later: observability (M7 → M11), pooling and
isolation (M2 → M4), CI (M6 → M11 → M22), OAuth (M3 → M24).

---

## Build order

Presented in execution order. Hours are focused hours.

| # | Module | h | dependsOn |
|---|---|---|---|
| **M0** | Scope, Runway, Reviewer, Flagship | 20 | — |
| **M1** | The Runtime, Unframed | 67 | M0 |
| **M2** | The Machine Model: Ten Seams | 45 | M1 |
| **M3** | HTTP, Streaming, and the Wire | 45 | M1, M2 |
| **M4** | The Postgres Underneath Supabase | 57 | M2 |
| **M5** | The Durable Queue | 18 | M3, M4 |
| **M6** | Tests That Fail For The Right Reason | 28 | M1, M4 |
| **M7** | Debugging and Production Observability | 45 | M3, M4, M6 |
| **M8** | Python On-Ramp | 15 | M6 |
| **M9** | The Model as a Function | 30 | M3 |
| **M10** | Ingestion: Real Documents Into a Corpus | 30 | M4, M5 |
| **M11** | Evals: The One Harness (+ Stats Lab) | 62 | M7, M9 |
| | **▲ HARD GATE — flagship live, 2 real users, 100 failure traces** | | |
| **M12** | Reading and Changing Code You Did Not Write | 52 | M5, M6, M7 |
| **M13** | Git, Review, and Code Others Maintain | 40 | M12 |
| **M14** | Working With Coding Agents Professionally | 20 | M12, M13 |
| **M15** | Scoping, Estimating, Someone Else's Priorities | 25 | M12 |
| **M16** | Retrieval You Actually Measured | 40 | M10, M11 |
| **M17** | Agents and Tool Use | 49 | M3, M5, M9, M11 |
| **M18** | Cost, Metering, and Unit Economics | 30 | M9, M11, M3 |
| **M19** | Security and the Trust Boundary | 30 | M1, M4, M7, M17 |
| **M20** | Frontend for AI Interfaces | 40 | M3, M10, M17, M18 |
| **M21** | System Design and the Design Doc | 12 | M5, M7 |
| **M22** | Deployment, CI/CD, and Operating It | 48 | M4, M6, M11 |
| **M23** | Python as a Second Production Language | 35 | M8, M11 |
| **M24** | Third-Party Integration as a Consumer | 20 | M3, M19 |
| **M25** | Comp, Terms, and the Negotiation | 8 | M0 · *trigger: 1 month before applications* |
| **M26** | The Evidence Layer v1 | 8 | M11 · *trigger: application date* |
| **M27** | The Evidence Layer v2 | 17 | M16, M18 · *trigger: after Layer 5* |
| **M28** | Interview Performance | 45 | M12, M26 · *10h forward-loaded to application date* |
| **M29** | Employed Mode | 10 | — · *written pre-hire, executed post-hire* |
| **M30** | The First 90 Days | 8 | — · *trigger: first onsite* |

**Hire before completion is the modal good outcome, not a failure.** Applications start ~month 5;
Layers 0–3 finish around month 9. A hire at month 7–10 arrives with much of Layers 5–6 undone. That is
the plan *succeeding*. M29 exists because v1 treated it as a footnote and designed every feedback
instrument to terminate on hire day.

---

# LAYER 0 — The Contract

## M0 — Scope, Runway, Reviewer, Flagship (20h) · `dependsOn: —`

v1 gave this 8 hours and it was the module carrying the most weight in the document. It now carries
four things that were previously assumed, unassigned, or discovered too late.

**The artifact** `LAB` — one repo, one directory per module, plus `PLAN.md` containing:

**1. The money, first.** Employment status, monthly burn, runway in months. Two published timeline
variants (employed ~12 h/wk, full-time ~35 h/wk) with the weekly hours **derived** from them, not
assumed. If runway < 9 months, take the Compressed Spine and say so in writing.

**2. The hour budget** — 999 module hours + ~425 track hours, with the line-item track table below, and
your date arithmetic shown.

**3. The application date** and the written defense of the before/after-application cut.

**4. The funnel teardown (4h).** Twenty real current postings with geography, overlap, citizenship,
degree, and YOE filters already applied. Tag each **W2 or 1099** — that is your own data point, and it
replaces an unsupported claim v1 made (see M25). This lands in M0, not late, because **it determines
which modules matter.**

**5. The Python trip-wire, as a number.** From those twenty postings: *if fewer than 40% accept a
Node-primary backend, M23 moves immediately after M11.* Pre-write that alternate ordering in one
paragraph now, so the month-5 decision is a lookup rather than a redesign.

**6. THE FLAGSHIP SPECIFICATION.** Name the app, then verify it against this checklist. **Twelve
modules consume it.** If your named app fails a line, either fix the app before M1 or take the labeled
fallback.

| The flagship must have | Required by |
|---|---|
| A streaming chat surface you can rebuild on your own M3 protocol | M20 |
| Multiple real users with skewed usage, and a paid tier | M18 |
| A user-uploaded document corpus | M10, M16 |
| At least one irreversible side-effecting action | M17, M19 |
| Two distinct roles (so broken-access-control exploits are real) | M19 |
| A third-party account worth connecting | M24 |
| A CI/deploy pipeline you own | M22 |
| Model calls being logged from day one | M7, M11 |

**7. The traffic milestone (10–15h, dated, month 4).** Twelve to fifteen recruited people running a
scripted task list. That is a weekend of asking, not a growth strategy. The target is **~100 traces
containing real failures** — that is what M11 actually consumes, and it is a better threshold than
v1's "~200 requests."

> **The labeled fallback, stated plainly:** if you cannot get real users, substitute a public corpus
> with *real human labels you create yourself.* It costs you error-analysis realism — you will be
> labeling failures you imagined rather than failures users found — and M11's own mistakes list says an
> imagined set measures imagination. Take it knowingly or not at all. **Do not invent traces.** A
> hiring manager detects that in two questions.

**8. Turn on append-only logging of every model call today, before M1 (1h).** So M7 *upgrades* a trace
store rather than starting one at month 5.

**9. THE REVIEWER RECRUITMENT (4–6h).** v1 said "secured in M0, used from M8" and then put it in
neither M0's artifact list nor its gate. Both claims were also wrong: the first hard human dependency
is M7's game day, and **nine modules depend on a human**, not four.

These are **three different recruitments**, not one person:

| Role | Needed by | Deadline |
|---|---|---|
| **Code reviewer** | M13, M14 | end of month 2 |
| **Technical operator** (can break a system cold) | M7 game day, M14 defect planting | month 4 |
| **Mock interviewer** (credible at mid-level) | M21 design follow-ups, M28, M30 | month 10 |

Produce: a one-page reviewer brief (what you send, how often, **capped at ~90 min/month**, what they
get back); a ranked list of eight real candidate sources — *paid senior-engineer mentorship with a
stated dollar budget, a maintainer of a repo you have already merged into, a reciprocal peer swap, a
paid mock-interview service*; and **an acceptance test: one trial review completed with written
comments returned.**

> **The cheapest reviewer is free and requires no network: an OSS maintainer reviewing a real PR.**
> They did not write your code, they cannot be re-rolled, and Track 2 already puts you in front of them.
> M13's gate consumes that directly.

**Agent fallback, with the anti-re-roll rule in writing:** one run per attempt, transcript kept
including failures, **a failed agent review is logged as a failed gate.** Re-rolling until you get a
pass is how this instrument dies.

**10. The cold baseline.** Open an empty file and rebuild the core module of a feature you already
shipped, in 45 minutes, original repo closed. Record what you could not produce.

**11. The blind-exercise queue (2h).** Find 20 merged bug-fix commits in real repos. **Do not read the
fix commits.** M12 and M28 consume these — `git revert` one, the suite goes red, work the clock, score
against the maintainer's actual merged diff. Real ground truth, no human required, nobody who can leak.

**GATE** — **REFEREE:** the reviewer's trial review is returned in writing; the flagship checklist is
signed line by line. **PASS:** all eleven artifacts exist; you state from memory your weekly hours,
runway, application date, and three things you could not rebuild cold. **ON FAIL:** M1 does not start.
This is the one gate with no partial credit.

---

# LAYER 1 — The Machine (214h)

*The literal answer to "I need to understand code." Where "it works" and "it is correct" stop being the
same sentence.*

## M1 — The Runtime, Unframed (67h) · `dependsOn: M0` · **owns: the trust boundary**

**Core concepts:** The event loop — call stack, macrotask vs microtask queue, why one slow function
stalls every user. What a Promise actually is: a notification channel for work that *already started*,
not a thing that does work and not lazy. The four concurrency failure modes —
sequential-when-you-meant-parallel, fire-and-forget, unhandled rejection, cancellation. Closures,
lexical scope, `this`, reference identity — including the serverless trap where warm instances reuse
module scope, making any mutable module-level variable shared state across users. Structural typing and
where the type system lies to you. **Parse, don't assert** — the trust boundary, owned here, consumed
everywhere. Discriminated unions and exhaustiveness. Error handling as design: taxonomy, `cause`
chaining, which failures are safe to retry. Modules and the bundle graph — placement means nothing, the
import graph is what ships.

**Artifact** `LAB` — a `runtime-lab` repo, eight programs under plain `node --test`. MiniPromise from
scratch. A concurrency harness reproducing all four failure modes on demand, then fixing each. A Zod
boundary that rejects hostile LLM JSON which `as MyType` accepted. A typed error taxonomy with cause
chaining and a documented retry-safety rule per class. Strict flags on from day one.

**GATE** — **REFEREE:** screen recording, watched back. **PASS:** narrate unprompted why
`setTimeout(fn,0)` runs after a resolved `.then()`; convert a real `as`-cast of model JSON from your own
shipped code into a parsed boundary and name the production bug it prevents. **ON FAIL:** rebuild the
concurrency harness from empty; re-attempt in 7 days.

**Most-missed:** Believing `async` means "runs in the background." An async function runs synchronously
until its first `await`, and CPU-bound work inside one blocks the whole process exactly as hard.
· `await` in a `for` loop over independent work — 200 × 200ms becomes 40 seconds. And the inverse,
`Promise.all` over an unbounded array, firing 200 requests into a retry storm. · Silencing strict-mode
errors with `as` and `!` instead of narrowing — converting a compile error into a runtime crash.
· `{loading, error?, data?}` permitting four impossible states. · `catch (e) { console.log(e) }` and
continuing — a loud failure becomes a silent wrong answer.

## M2 — The Machine Model: Ten Seams (45h) · `dependsOn: M1`

**Core concepts:** References vs values — aliasing, mutation, shallow vs deep copy. Stack vs heap,
object lifetime, why a server leaks (GC frees *unreachable* objects; a leak is unintended
reachability). Number representation — floating point, integer precision, the right type for money,
IDs, timestamps. Text encoding — bytes vs code points vs grapheme clusters, decoding a *stream*.
Serialization as a lossy boundary. Blocking. File descriptors, sockets, pools, timeouts. Concurrent
mutation — races, atomicity, idempotency. **Dates and timezones** — UTC storage vs local display, DST's
doubled and missing hours, `timestamptz` vs `timestamp` as a Supabase footgun that silently produces
correct-looking wrong data.

**Artifact** `LAB` — a `seams` repo of ten reproductions, each a failing script + fix + proving test:
a leak proved with a heap snapshot; money wrong by a cent; a UTF-8 grapheme split across streamed
chunks; a pool exhausted under load; a lost update in Postgres; a four-timezone digest scheduler with an
injected fake clock pinned across spring-forward and fall-back. **The fake clock is imported by M6.**

**GATE** — **REFEREE:** the reviewer picks which bug, from the ten, without telling you. **PASS:** name
the seam and the instrument within 60 seconds, 8 of 10. Then open your own shipped schema and point at
the wrong-typed columns. **ON FAIL:** rewrite the three you missed from empty; re-attempt in 7 days.

**Most-missed:** Believing `{...obj}` or `JSON.parse(JSON.stringify(obj))` is a copy. The spread is one
level. The JSON trick converts Dates to strings, drops `undefined` and functions, mangles Maps and Sets
to `{}`, and throws on cycles. · `.toFixed(2)` "solves" money by fixing the display and leaving the
arithmetic wrong. · `new TextDecoder()` *inside* the loop — looks identical to correct code, and
discards the carried partial-character state that is the entire point. · "I'm using a pool" while N
serverless instances each hold a pool of M. · Believing a transaction prevents the race.

## M3 — HTTP, Streaming, and the Wire (45h) · `dependsOn: M1, M2` · **owns: streaming, idempotency**

**Core concepts:** HTTP as a wire format — the ~15 status codes and ~12 headers that carry meaning.
REST and where it stops being the right answer (real APIs have action endpoints; offset pagination is
the most common correctness bug in list endpoints). **SSE and chunked transfer from scratch, no SDK.**
Production streaming failure modes: proxy buffering, client aborts, mid-stream errors, dropped
connections, resumption. **Idempotency** — why a retry is a data-corruption bug unless designed for.
Timeouts, backoff with jitter, which failures are retry-safe. Rate limiting from both sides. Webhooks —
at-least-once, signature verification on **raw bytes**. CORS; cookies vs bearer vs JWT and where each
breaks. OAuth basics (deepened in M24).

**Artifact** `EVIDENCE` — **the streaming LLM proxy.** Raw `fetch`, raw `ReadableStream`, hand-parsed
SSE frames, no SDK. `AbortController` end to end. A Postgres idempotency-key dedupe table. Deliberately
reproduces proxy buffering and a mid-stream error, and recovers from both.

> **Exported, and named so the consumers are checkable:** the **SSE transport** → M17, M20. The
> **idempotency table** → M5, M18, M21.

> **One thing v1 got wrong here and it is load-bearing.** v1 said M20 would put `useChat` "on top of the
> stream protocol you already wrote," as a free composition. **It is not free.** The hook is bound to a
> versioned UI message stream wire format. You must either emit that format byte-for-byte from this
> proxy or write a custom transport — both are multi-hour and neither was budgeted. **Budget it here**
> (it is in the 45h) and check the current wire format the week you build it. The path of least
> resistance when stuck deletes this module's reason to exist.

**GATE** — **REFEREE:** server logs and a database row count; both are external facts. **PASS:** kill
the client mid-generation and show from logs that upstream billing stopped; replay one idempotency key
twice and show exactly one row; narrate what arrives on the wire between first byte and first rendered
token. **ON FAIL:** the frame parser is rebuilt against a deliberately chunk-split fixture.

**Most-missed:** `chunk.toString().split('\n')` — corrupts output the moment a frame splits across TCP
chunks, and works perfectly on localhost, so it ships. · Assuming HTTP 200 means the whole response
succeeded; the status commits before the body exists. · Writing the assistant message to the DB only in
`finally`/`onFinish`, which on serverless may never run. · `200 { ok: false }`, which breaks every retry
library and health check. · A client-generated idempotency key per *render* instead of per *logical
operation*. · Doing webhook work before responding.

## M4 — The Postgres Underneath Supabase (57h) · `dependsOn: M2`

Supabase fluency is not Postgres fluency. Every posting sampled lists SQL flat.

**Core concepts:** Relational modeling — constraints as the thing that actually enforces invariants.
SQL without an ORM: joins, aggregates, subqueries, CTEs, window functions. Indexes and
`EXPLAIN (ANALYZE, BUFFERS)` — the deliberate slow→fast loop. Transactions, isolation, lost update.
N+1. **Connection pooling and the Vercel+Supabase failure mode.** RLS — correct first, then fast.
Migrations and expand/contract *as a concept*. Plus **2–3h of Docker minimum**, because the local
Supabase stack already requires it.

> **The connection surface, named — v1 left this as one bullet and a gate you could not complete.**
> There are four distinct endpoints with different IP-version and plan availability: direct, shared
> pooler in session mode, shared pooler in transaction mode (the serverless one), and dedicated pooler.
> Session mode's old port was removed in Feb 2025 and the IPv4 add-on is a *swap*, not a dual-stack
> addition. **Verify the current endpoint table before you start** — this is a platform claim wearing
> fundamentals clothing and it moves at platform speed.

> **Key naming is mid-migration.** Supabase is replacing the legacy `anon`/`service_role` JWT keys with
> publishable/secret keys, deprecating the old pair inside this curriculum's own calendar. Learn both
> names once, then use the new ones. **Make the migration an artifact:** rotate the flagship onto the new
> keys, disable the legacy pair, prove with a test that nothing broke.

**Artifact** `LAB` — a `pg-lab` repo against a local Supabase stack: twelve hand-written queries with
EXPLAIN plans before and after indexing on a 5M-row `generate_series` set; a documented slow→fast loop
with wall-clock numbers from **a load generator you wrote** (exported to M22); an RLS policy set
benchmarked correct-but-slow vs fast; the key rotation above.

> Two things v1 put here have moved. The **expand/contract-under-load build** goes to M22, where the
> deploy pipeline exists to run it through. The **pgvector recall and filtered-search** bullets go to
> M16 — at this position recall is *literally unmeasurable*, because no corpus, embeddings, queries, or
> golden set exist yet.

**GATE** — **REFEREE:** an EXPLAIN plan you have never seen, supplied by the reviewer or pulled from an
OSS repo's slow-query log. **PASS:** name the fix before reading the query, 3 of 4. Explain why your own
deployed app exhausted connections and show the pooled fix under the same load. **ON FAIL:** re-run the
slow→fast loop on three new queries.

**Most-missed:** Reading `cost=` as milliseconds. · Benchmarking cold-then-warm so the cache gets the
credit — run each variant twice, report the second. · Assuming an index on `(a,b)` helps a query
filtering only `b`. · One single-column index per column instead of one correct composite — and
forgetting each is a tax on every write. · **Holding a transaction open across a model API call**,
turning a 200ms connection into a 30-second lock. · Schema changes in the dashboard table editor, which
bypasses migration history. · `USING (true)`, or a policy against a JWT claim the user can edit.

---

# LAYER 2 — The Craft I (106h)

## M5 — The Durable Queue (18h) · `dependsOn: M3, M4` · **owns: async job processing**

**This module did not exist in v1 and its absence was a critical sequencing bug.** v1 taught the queue
at position 20 — but a resumable backfill, a resumable ingestion job, durable agent state, and an
idempotent webhook consumer are hard build requirements at four earlier modules. You would have
invented a queue four times, badly, and each ad-hoc version would have become load-bearing in a shipped
artifact before the correct one existed.

It needs only M3's idempotency key and M4's row locking, both of which precede it.

**Core concepts:** Moving slow work off the request path. `SELECT ... FOR UPDATE SKIP LOCKED`.
At-least-once delivery and idempotent consumers. Backpressure. Dead-letter paths. **The read path** —
how the client learns the job finished (polling, SSE, and resumable streams are three different
products, and enqueueing is the easy half).

**Artifact** `EVIDENCE` — a Postgres-backed durable job queue with row locking, at-least-once delivery,
idempotent consumers reusing M3's dedupe table, backpressure, and a dead-letter path.

> **Imported by:** M10 (ingestion job), M12 (the backfill), M16 (re-embedding), M17 (durable agent
> state), M18 (webhook consumer).

**GATE** — **REFEREE:** a kill signal at a random time, and a row count. **PASS:** kill a worker
mid-job; zero double-processing and zero lost jobs across 1,000 enqueued items. **ON FAIL:** the
consumer is not idempotent — fix and re-run.

## M6 — Tests That Fail For The Right Reason (28h) · `dependsOn: M1, M4`

**Core concepts:** The pyramid and what each level is for. A unit test that fails for the right reason.
Test doubles and when mocking makes a test worthless. Integration tests against real Postgres including
RLS. CI as a gate. The flakiness budget. **The seam between deterministic shell and probabilistic core.**
Imports M2's fake clock.

**Artifact** `LAB` — one shipped repo from zero tests to a green required check: ~15 unit, 5 integration
against real local Postgres including two RLS policies, in CI as a merge gate, a written flakiness
budget, and the record of one test you deleted for asserting implementation.

**GATE** — **REFEREE:** a bug report written by the reviewer against your repo. **PASS:** failing test
first, then fix; explain why the test would still fail if the fix were wrong in a *different* way.
**ON FAIL:** the test asserted implementation — rewrite against behavior.

**Most-missed:** Testing what the code does rather than what it should do. **A test that has never
failed has never been tested.** · `vi.mock()` on your own modules until the test mirrors the
implementation — failing on refactors, passing on bugs. Mock at the network or process boundary, never
your own seams. · Mocking the Supabase client and asserting on `.from().select()` chains — that tests
your mental model of Supabase. · Seeding *and* asserting with the service key, bypassing RLS entirely.
· `retries: 2` or `sleep(500)`.

## M7 — Debugging and Production Observability (45h) · `dependsOn: M3, M4, M6` · **owns: observability**

The highest-leverage module here. Finding a bug you did not write, in a system you cannot reproduce.

**Core concepts:** Stack traces as primary evidence, including minified production traces and why you
ship source maps. Hypothesis-driven debugging and bisection across code, data, time, config. A real
debugger — breakpoints, conditional breakpoints, logpoints — and when logging genuinely wins.
Structured logging, log levels with real semantics, request-scoped correlation IDs, redaction. OTel
spans and context propagation. Metrics, SLOs, error tracking. Profiling and flame graphs. **Detecting
wrong model output when nothing throws.** Incident response, runbooks, the blameless postmortem.

**Artifact** `EVIDENCE` — the flagship instrumented end to end (upgrading M0's day-one log store):
structured logs with correlation IDs and redaction, OTel spans including the model call, error
tracking, and a silent-failure detector for wrong-but-200 output. A runbook for three failure modes
(provider down, connection exhaustion, cost runaway), **executed by an actual other person during a
scripted game day**, plus a blameless postmortem of an outage you caused during it.

**GATE** — **REFEREE:** a fault-injection script that fires at a **random time in a seven-day window**
and logs the timestamp to a file you do not read. **PASS:** time-to-detection under 24h from
instrumentation alone, without being told. Separately: given one trace ID, reconstruct the whole
request out loud. **ON FAIL:** the detector does not cover that failure class — add it, re-arm the
window.

**Most-missed:** Changing several things at once and redeploying. **The single most expensive habit
self-taught developers carry into a job**, because it destroys the evidence. · Believing the debugger is
for beginners. · Deploying without source maps, then concluding production errors are unknowable.
· **Assuming valid JSON means correct output.** Constrained decoding guarantees shape, not truth — and
it removes the model's ability to express uncertainty, so it fills a required field whether or not the
input supports it. · Alerting on causes, producing noise that gets muted — after which the system is
unmonitored while looking monitored. · Postmortems that stop at the code fix without asking why it took
40 minutes to notice.

## M8 — Python On-Ramp (15h) · `dependsOn: M6`

Split forward from v1's single 50-hour Python module, which sat at hour 853 and was therefore the most
likely thing to be cut under deadline pressure.

**Core concepts:** Environments and dependencies on current tooling — **`uv`, `ruff`, one type checker
pinned green in CI.** (v1's cut list rejected conda/poetry/pyenv and then named no replacement, leaving
you at a 50-hour module with the three most-Googled answers pre-rejected. The names have a shelf life;
the module is unchanged if they move.) Python semantics where they differ from TypeScript — names vs
values, LEGB, truthiness, generators, dunders. pytest. Type hints with a checker in CI. pydantic as the
runtime validation boundary. One typed FastAPI route with a test.

**Artifact** `LAB` — one typed FastAPI route with a pydantic request/response model, a pytest test that
fakes the model client, and a type checker green in CI.

**GATE** — **REFEREE:** a timer, and a Python-fluent reviewer (route one Track 2 PR to a Python repo).
**PASS:** add a typed route + test to a Python service you did not write, in 90 minutes. **ON FAIL:**
the idiom is wrong — a passing test cannot catch this, which is why the referee is human.

---

# LAYER 3 — The AI Production Core (122h)

*Pulled forward from v1's Layer 3 position. v1 gated this behind 150 hours of Postgres, git, agents and
scoping for no stated reason, and the differentiator finished five months after applications started.*

## M9 — The Model as a Function (30h) · `dependsOn: M3`

Also the morale spike for the months 3–6 abandonment window — which only works because it now sits
inside that window rather than after it.

**Core concepts:** Tokens as the unit of everything, and why the tokenizer is not locally inspectable.
The messages array, roles, statelessness, and what a system prompt mechanically is — text rendered at a
specific position in the same token stream. The weighting is a training artifact, not an enforcement
mechanism. **The corollary you must internalize: text inside a user-role or tool-result message can be
forged by anything that writes to user-visible input. That is exactly what prompt injection is.**
The context window — what fills it, what degrades before it fills; the API is stateless, so you resend
the whole history every turn and conversation cost grows quadratically. Output control: `max_tokens`
and **the full `stop_reason` enum**. Pricing: input/output asymmetry, prompt caching as a byte-exact
prefix match. **Adaptive/extended thinking and the effort levels** — the first quality-trading lever
after caching. Discovering capabilities and context window **programmatically from the Models API**,
which is the version of this knowledge that cannot go stale. Streaming as production transport. The
structural boundaries.

> **v1 was wrong here in a way that produces a branch that never fires.** It said a refusal returns 200
> "with an empty content array." **The content array is not empty.** A refusal returns 200 with a
> *populated* content array and a non-null `stop_details` carrying a category; `stop_details` is null
> for every other stop reason and is therefore the actual discriminator. Write
> `if (!response.content.length)` and that branch never runs — so refusal prose flows downstream and
> gets rendered as the answer, which is precisely the wrong-but-200 failure M7 and M11 exist to catch.
> **Branch on `stop_reason` before you read content.** Add server-side fallbacks as the production handling.

> **Sampling is no longer a live concept.** `temperature`, `top_p`, `top_k` and assistant prefill are
> removed on the current model line and return 400. They belong in the dead-patterns artifact, not the
> concepts list. Keep the underlying idea — **non-determinism is structural, not a knob you forgot to
> set** — which is more true now, not less.

**Artifact** `LAB` — a `model-probe` CLI: compare token counts against your assumptions across five
text types; prove a cache hit from the usage meters and print the cost delta; produce **every**
`stop_reason` deliberately, including a refusal, and show `stop_details` as the discriminator;
demonstrate a structured-output schema rejecting a malformed generation; discover model capabilities
from the API rather than a hard-coded table. Plus a **dead-patterns page**: every 2023–2025 pattern your
probe killed, with the 400 pasted in.

**GATE** — **REFEREE:** an arithmetic check against a real usage object. **PASS:** price a request to
the cent from its usage object alone; point at the exact byte that broke a cache prefix; explain why a
model-emitted "confidence score" is generated text rather than a probability, and what feature designs
that kills. **ON FAIL:** re-derive the pricing by hand from three more requests.

> **Currency: highest decay rate in the document.** Model IDs, parameter availability, pricing, caching
> TTLs, and the `stop_reason` enum move on a monthly cadence. Verify against primary API documentation
> the week you build this. Do not trust this document, a blog post, or a model's memory.

## M10 — Ingestion: Real Documents Into a Corpus (30h) · `dependsOn: M4, M5`

The first mile of most real AI products, and a seam the original research left to nobody — retrieval
research opens at the embedding step, assuming a corpus that already exists as text. **Extraction
quality dominates retrieval quality by a wide margin.** No amount of hybrid search and reranking
recovers a table flattened into word soup at ingestion.

**Core concepts:** Object storage and signed upload URLs. Size and type limits. Text-layer extraction vs
OCR. Tables and multi-column layout. **Character-offset-level provenance.** Ingestion as a resumable job
on M5's queue, with progress and per-file failure. Re-ingestion when the parser improves.

> **v1 required page-level provenance and M16 requires span-level citation verification. Those are
> incompatible** — page-level provenance cannot verify a span, and character offsets into extracted text
> are unrecoverable after the fact, especially through OCR. Store **character offsets into the stored
> extracted text**, with page and section carried alongside.

> **Record the embedding model's output dimensionality in the decision log before you embed anything.**
> It is an M10 decision with an M16 consequence: pgvector indexes `vector` to 2,000 dimensions and
> `halfvec` to 4,000, and several widely-used embedding models emit 3,072. Get this wrong and you hit a
> flat error in M16 and diagnose it as having written the index wrong.

**Artifact** `EVIDENCE` — a pipeline accepting a real signed-URL upload, handling a digital PDF, a
scanned PDF, and a `.docx`; character-offset provenance on every chunk; resumable on M5's queue; scored
against **twenty hand-labeled documents.**

**GATE** — **REFEREE:** your twenty hand-labeled documents — a number you cannot fudge. **PASS:** state
what percentage of tables your parser destroys, with evidence; show a citation that **highlights the
exact span** in the correct page of the correct source. **ON FAIL:** provenance is page-level — rebuild
to offsets before M16.

## M11 — Evals: The One Harness, and the Stats Lab (62h) · `dependsOn: M7, M9` · **owns: evals**

The differentiator — validated by the review, not assumed. Also the concept the original research
taught **six times in four incompatible substrates.** Built once, here.

**Core concepts:** Trace capture. **Error analysis: open coding → axial coding**, producing a named
failure taxonomy with frequencies. What an eval is — a dataset plus a runner — and why it is not a test.
Assertion graders before any model grades anything. **LLM-as-judge calibrated against human labels**,
reported as TPR/TNR. Inter-annotator agreement. Structured output as a reliability mechanism and its
limit. Retries and fallback chains. Regression evals in CI and the economics of how much eval is enough.
**Prompt and model lifecycle** — versioning, pinned model IDs, rollback, the forced migration.

**The Stats Lab (8–10h), folded in.** v1's gate demanded a bootstrap confidence interval, TPR/TNR, and a
confusion matrix — and **taught none of them anywhere in the document.** Covering only what the
curriculum consumes: base rates and why accuracy lies when failures are rare; the confusion matrix and
TPR/TNR computed by hand on your own 100 labeled traces; recall@k; percentiles from a raw latency array
and why averaging them is wrong; **bootstrap resampling written from scratch in ~30 lines**; and how
many labeled examples you need before a delta means anything.

**Artifact** `EVIDENCE` — ONE harness on your stack, Postgres + a TypeScript runner, no platform:
100 hand-read and labeled traces, a named failure taxonomy with counts, assertion graders, a judge with
a **measured confusion matrix** against your labels, and CI blocking a PR on regression. Then prompts
versioned with pinned model IDs, and **a deliberate migration to a different model family gated only by
your own eval set**, written up as a regression table including what you could not recover. Plus a
`stats-lab` `LAB` repo in the same shape as `runtime-lab`.

> **Exported:** the dataset table and assertion graders → M16, M22.

**GATE** — **REFEREE:** a prompt change supplied by the reviewer, scored against your own golden set —
a number you cannot argue with. **PASS:** return ship/no-ship with a bootstrap CI; state your judge's
TPR and TNR; name the failure mode off-the-shelf metrics would have hidden. **ON FAIL:** your judge is
uncalibrated — re-label 30 traces and recompute.

**Most-missed:** **Reporting accuracy instead of TPR/TNR.** When failures are rare, a judge that always
says "pass" scores 92% and is worthless. This single mistake invalidates more eval work than anything
else. · Generic categories — "hallucination," "unhelpful." Unactionable. "Calendar Scheduling Failure"
is a fix; "poor coherence" is a shrug. · **Delegating the labeling to an LLM.** The LLM clusters notes
you already wrote. People discover what they actually care about *through* labeling. · Building the set
from cases you invented. · A runner that re-implements the model call "to keep the eval clean" — then it
measures a different system than the one that ships. · Same model as generator and judge. · Believing
schema enforcement solved reliability. It solves shape, not content.

---

## ▲ HARD GATE — Layer 3 → Layer 4

**Layer 4 does not start until all four are true:**

1. The flagship is deployed and reachable.
2. At least **two real users** who are not you.
3. **~100 logged traces containing real failures.**
4. M11's harness runs green in CI against those traces.

If you are here without them, stop and execute M0's traffic milestone. If it fails, take the labeled
fallback and write down what it costs you. **Do not proceed by inventing traces.**

---

# LAYER 4 — The Craft II (137h)

*Ramp-and-collaboration skills. These matter for surviving the job more than getting the screen, and are
the modules most safely learned while interviewing.*

## M12 — Reading and Changing Code You Did Not Write (52h) · `dependsOn: M5, M6, M7`

What the first 90 days of any job actually is. **Greenfield is a rounding error in the first six months
of any job** — that is the whole argument, and it needs no statistic.

> v1 claimed "roughly 60% of 2026 onsite loops include a read-existing-code round." **Two critics
> searched independently and could not verify it**; one traced the figure to a single analysis scoped to
> FAANG-tier onsites, which this curriculum's cut list excludes on purpose. It was the only quantitative
> justification for the second-largest module in the document. Removed. The named evidence that does
> exist: Google's code-comprehension round replacing one of two coding rounds and scoring AI fluency
> explicitly; reported pilots at Meta; Stripe's Bug Squash.

**Core concepts:** Tracing one real user action end to end — architecture is the *output* of tracing, not
the input. A predict-then-ask protocol for using AI on code you are learning. The three layers of code
search: ripgrep (lexical), ast-grep (structural), LSP (semantic). Reading tests as executable
specification. Git history as documentation — blame, pickaxe, `log -L`, bisect. Inferring unwritten
conventions. Chesterton's fence. **Characterization tests around code you don't understand.** Finding a
seam. Strangler-fig. **The resumable backfill** (on M5's queue). Dual-run cutover.

**Artifact** `EVIDENCE` — four pieces:
1. A written end-to-end trace of one user action in a real repo (cal.com, Hono) with `file:line` at every hop.
2. In a real OSS repo: characterization tests locking in an untested module's behavior *including its
   bugs*, then a behavior change behind a flag with both paths green.
3. A resumable backfill over 100k rows on M5's queue — killed halfway, restarted, zero double-processing.
4. A dual-run cutover on **a deterministic feature** — a pure-function or query-path refactor where old
   and new outputs diff exactly.

> **v1 made #4 an AI feature.** That required comparing two versions of a model-backed feature and
> justifying a cutover — **which is an eval** — six modules before M11 teaches what an eval is. You would
> have produced exactly the vibe comparison table M11 exists to prevent, then pinned it as portfolio
> evidence and defended it in M28. M11 already contains the identical exercise done correctly. Retargeted
> to a deterministic feature, where the comparison is unambiguous and the lesson is actually about
> cutover.

**GATE** — **REFEREE:** a `git revert` of a merged bug-fix commit from M0's blind queue, scored against
the maintainer's actual merged diff. **PASS:** 60 minutes, narrating, arrive at a fix that matches the
maintainer's on the behavior (not necessarily line for line), 3 of 5 attempts. Then defend three things
you thought were wrong and deliberately did not change. **ON FAIL:** pull the next commit from the queue
in 7 days. Never read the fix commits.

**Most-missed:** Reading directories top-down, or asking for an architecture overview first. · Asking
the assistant to produce the answer rather than pressure-test yours. **The measured split is the whole
lesson: conceptual-question users scored 65%+, delegation users under 40%.** · Grepping a function name
and treating the hits as the complete blast radius. · `git blame` as the final answer — it gives the
last commit to touch the line, usually a formatting sweep. `git log -S` and `git log -L :funcname:file`
answer "why is this here." · Pattern-matching ugliness to badness. **Your confidence is highest exactly
where your context is lowest.** · Waiting to understand the whole system before opening anything.

## M13 — Git, Review, and Code Other People Maintain (40h) · `dependsOn: M12`

"I need to understand code" has a reading half and a writing half. M12 owns reading. **This owns
writing** — the judgment that produces a convention rather than conforms to one. Structure and naming
are what the overwhelming majority of code-review comments are about.

**Core concepts:** The git object model — commits are snapshots, refs are pointers, the index is a third
thing. What merge/rebase/squash do to the graph. Resolving a conflict, including the kind that merges
cleanly and is still wrong. reflog, revert vs reset, shared-branch etiquette. Atomic commits and a PR a
reviewer can act on. Giving and receiving review, including of AI-written code. **Naming, module
boundaries, cohesion and coupling, dependency direction, the rule of three, deleting code, making an
error message actionable.** The three async artifacts a remote team runs on: status update, blocker
escalation, decision record.

**Artifact** `EVIDENCE` — three pieces to a real reviewer: a recovery-lab log of eight deliberate
disasters, each recovered and explained; a 500-line file from your own project restructured behind M12's
characterization tests with **a line-item rationale for every boundary moved**; every failure path in one
feature rewritten to actionable messages (expected / received / what to do).

**GATE** — **REFEREE:** an OSS maintainer merging a real PR — someone who did not write the code, cannot
be re-rolled, and requires no network. **PASS:** a substantive PR merged with no structural review
comments. **ON FAIL:** the structural comments *are* the curriculum — address and resubmit.

## M14 — Working With Coding Agents Professionally (20h) · `dependsOn: M12, M13`

The original research treated agents exclusively as a threat — in three separate dimensions — and never
once as the throughput standard of the team you are joining. That produces an engineer who is correctly
suspicious and half as fast as everyone around him, measured from week three. Scheduled **after** M12 and
M13 so the interrogate-never-author discipline holds during the period it protects.

**Core concepts:** Writing a repo's agent config so generated code conforms to house conventions.
Decomposing a ticket into agent-sized units with verifiable exit criteria. Reviewing a 400-line diff in
ten minutes by reading test changes and boundaries first. The categories never to delegate — auth,
money, migrations, anything whose boundary you cannot verify. Sandboxing and permission scope. What a run
costs.

**Artifact** `EVIDENCE` — an agent config proved by an agent-produced PR that passes review against your
own conventions doc; a **defect log** from handing an agent three real tickets in a repo you did not
write, naming for each defect *which earlier module let you catch it*; a one-page written delegation
policy.

**GATE** — **REFEREE:** a second agent instance with a **sealed brief written weeks earlier**, planting
**0–3 defects per diff, count blinded, with at least one clean diff.** **PASS:** find the planted
defects across five diffs with false positives scored separately. Plus the behavioral version: a
pre-commit hook enforcing your delegation policy that has **actually blocked agent-authored diffs twice
on real work.** **ON FAIL:** you are pattern-matching, not reviewing — redo with a new sealed brief.

> v1's gate told you there was exactly one boundary violation, which is most of the answer.

## M15 — Scoping, Estimating, and Someone Else's Priorities (25h) · `dependsOn: M12`

The definitional mid-level skill, structurally invisible to a solo builder. When you build your own
ideas you are your own product manager: scope is infinitely elastic, nothing is late, nothing is cut,
nobody is waiting. The failure mode is precise — a technically fine hire who disappears for nine days on
something that should have been two, delivers more than was asked, and reads as "not ramping." It is
what most "great, but not mid-level yet" feedback actually means.

**Artifact** `LAB` — three scoping docs against real open issues (clarifying questions, slice
decomposition, estimate with named riskiest assumption, and an explicit "here is the 20% version if you
need it Thursday"). Then build one and log **actual vs estimate** with a post-mortem on where the
estimate broke. Plus one **open-ended quality ticket** — "users say the summaries feel off, look into
it" — which is the shape most real AI tickets arrive in and which has no specification to work from.

**GATE** — **REFEREE:** a vague two-sentence ticket written by the reviewer, cold. **PASS:** clarifying
questions and a sliced plan in 15 minutes; defend what you would cut if the deadline halved. **ON FAIL:**
three more data points of being wrong. **The estimate log is the artifact** — calibration starts at three.

---

# LAYER 5 — The AI Layer, Completed (149h)

## M16 — Retrieval You Actually Measured (40h) · `dependsOn: M10, M11`

**Build the measuring instrument before the retriever.** Imports M11's dataset table and graders —
swapping in retrieval graders is hours, not a rebuild.

**Core concepts:** What an embedding is and what it structurally cannot do. **pgvector: HNSW
parameters, the dimension ceiling (`vector` 2,000 / `halfvec` 4,000 / `bit` 64,000, with the
cast-expression index as the escape for 3,072-dim models), and the recall/latency curve.** Chunking —
why fixed-size is the right baseline and what contextual retrieval actually fixes. Two-stage retrieval:
hybrid lexical+semantic fused with RRF, then a cross-encoder reranker. Agentic retrieval. **Grounding and
span-level citation verification** against M10's character offsets. When to skip retrieval entirely.
**The embedding lifecycle** — batched generation with rate-limit handling, measured cost per 1,000
chunks, and a re-embed executed as a resumable backfill on M5's queue behind a dual-index read switch.

> **v1 described the filtered-search trap with a mechanism that is now wrong.** A `WHERE` clause does not
> bypass the HNSW index; the filter is applied as the index returns candidates, so the symptom is
> **returning fewer rows than your LIMIT**, not slower queries. Since pgvector 0.8.0 the fix is
> `hnsw.iterative_scan`, **which ships OFF** — so your recall@10 gate number is measured under an unnamed
> GUC that changes it. Name it. The Supabase-specific version: chaining `.eq()` after `.rpc()` applies the
> filter in PostgREST *after* the SQL function already ranked and limited, returning plausible rows that
> are the wrong ones.

**Artifact** `EVIDENCE` — retrieval over M10's corpus with a measured **recall@k baseline**, then three
interventions measured independently (hybrid+RRF, reranker, contextual retrieval), then span-level
citation verification. A written table of what each bought, what it cost in latency and dollars, **and
which one did nothing.**

**GATE** — **REFEREE:** your golden set, half of it hand-written. **PASS:** state recall@10 before and
after with the `iterative_scan` setting named; name the intervention that did not help; defend staying on
pgvector using your own numbers. **ON FAIL:** the golden set is LLM-generated — hand-write 25 and re-run.

**Most-missed:** Evaluating end-to-end with a judge scoring answer quality. **Answer quality hides
retrieval failure** — a strong model answers correctly from pretraining even when retrieval returned
garbage. · Generating the golden set entirely with an LLM: synthetic queries are written *from* the
chunk, leak its vocabulary, and every retriever scores artificially high. · Treating HNSW as exact.
· Reranking too few candidates — if the right chunk is at rank 73 and you rerank the top 10, the
reranker is pure added latency. · Skipping lexical search, which is why queries with an error code or a
person's name fail on pure vector. · Asking for "citations like [1]" and trusting them. If citations are
not machine-checkable against offsets, you have the appearance of grounding.

## M17 — Agents and Tool Use (49h) · `dependsOn: M3, M5, M9, M11`

**Core concepts:** The agent loop at the wire-format level, no framework. **Writing a tool definition a
model can actually use.** Reactive loop vs plan-then-execute, and when a second agent is overkill. State
and memory across steps — **durable state on M5's queue.** Failure taxonomy and validation between steps.
Loop detection and cost runaway prevention. Human-in-the-loop checkpoints for irreversible actions.
**Agent containment** — what the agent can actually reach, and the sandbox it executes in (a seam neither
this module nor M19 owned in v1). MCP. Trajectory tracing and silent-failure detection.

> **Thinking-block replay — absent from v1 and it silently breaks the loop.** Thinking blocks must be
> echoed back unchanged when continuing on the same model, and on current models editing earlier turns
> invalidates them, so **the loop must be append-only.** v1's best mistake bullet ("appending the
> assistant's text and dropping the tool_use blocks") is the exact 2024 predecessor of this bug and the
> 2026 sequel had no bullet.

> **MCP: pin the revision.** The specification shipped a breaking, stateless rewrite in the 2026-07-28
> revision — the initialize handshake and session IDs removed, protocol-level sessions gone, several
> features deprecated on a support window that expires inside this curriculum's own calendar. Every
> pre-August-2026 tutorial teaches the deprecated shape and you reach this module around month 9–12.
> **Name the revision your server implements and one thing that changed in it.** Two of this module's
> hand-rolled objectives — durable state and human-in-the-loop checkpoints — now have protocol-level
> answers you would otherwise not know exist.

> **The tool-flooding bullet needs a remedy, not a prohibition.** v1 told you not to do the thing the
> module asks you to do. The first-class answer is **tool search plus deferred loading on the long tail**
> — with one condition that bites: the search tool itself must not be deferred, and at least one tool must
> stay non-deferred, or you get a 400.

**Artifact** `EVIDENCE` — a hand-rolled agent loop with a hard-stopping budget governor, loop detection,
an approval gate on irreversible actions, durable state on M5's queue, append-only thinking-block replay,
replayable trajectory traces, and a written containment/blast-radius analysis per tool. Then one small
MCP server against a named spec revision. Then the same agent on the SDK's tool runner, with a written
comparison of what the hooks bought and what they hid.

**GATE** — **REFEREE:** a kill signal at a random point, and an adversarial input written by the
reviewer. **PASS:** resume correctly after a mid-run kill; replay a failed trajectory and name the
causing step; demonstrate the cost ceiling holding under an input designed to loop. **ON FAIL:** the
governor caps iterations but not spend — fix and re-run.

**Most-missed:** Treating the message array as a chat log of strings. · Tool descriptions written as API
documentation instead of decision-support for a model choosing among eight tools; error paths returning
raw exception text, which teaches nothing and causes retry of the identical failing call. · Adding agents
to solve what is a bad tool definition. · Persisting *after* the step rather than bracketing the side
effect, which makes resume a duplicate-execution machine. `book_flight()` twice is two bookings. · Capping
iteration count only — an agent alternating between two tools never repeats at lag-1. · Denying by
silently dropping a tool call, leaving a dangling `tool_use` with no result.

## M18 — Cost, Metering, and Unit Economics (30h) · `dependsOn: M9, M11, M3` · **owns: cost**

**Core concepts:** The usage object and the four-number cost of a request. Prompt caching mechanics and
verifying from the meters. Percentiles from raw distributions. Streaming as a *perceived*-latency fix.
**Model × effort routing.** Cost attribution per feature *and per user*. Budget alerts **and circuit
breakers**. Unit economics. The product-analytics question — is it used, does it improve the thing it was
built to improve, is it worth its cost.

> **v1 measured the wrong dial.** It made model routing the lever. The **first** quality-trading lever
> after caching is **effort** — measure the most capable model at lower effort *before* building a model
> cascade, because **caches are model-scoped and a cascade forfeits cache reuse.** Make the routing
> experiment two-dimensional: (model × effort) over the same task set, scored by M11's harness, reported
> as **cost per completed task.**

**Artifact** `EVIDENCE` — a per-user credit ledger with an atomic decrement **proven by concurrent
hammering** (balance never goes negative); a Stripe test-mode subscription with an idempotent webhook
consumer on M5's queue that survives replay; a server-rendered 402 path with a correct body, proven by
curl; a circuit breaker on spend; one weekly SQL report joining usage, quality score, and cost into **one
line per active user**; and the (model × effort) experiment table.

**GATE** — **REFEREE:** the queries themselves; each number must be reproducible from SQL. **PASS:** state
cost per active user per month and end-to-end p50/p95/p99, each backed by the query. Say whether you would
keep the feature. **ON FAIL:** you are reporting an average — recompute from the raw distribution.

**Most-missed:** Reporting an average; computing percentiles by averaging per-minute percentiles.
**Percentiles do not average.** · Routing on per-token price instead of cost per completed task — a cheap
call that needs three retries is not cheap. · The alert without the breaker; an alert at 3am tells you
about money already spent. · Running the budget check *after* the API call. · Cost per feature but not per
user, which hides the distribution entirely when AI cost per user is extremely skewed.

## M19 — Security and the Trust Boundary (30h) · `dependsOn: M1, M4, M7, M17`

**Core concepts:** Trust boundaries and secrets. Authentication vs authorization; **broken access control
as the bug that actually ships.** RLS as a design skill. Injection, XSS, CSRF, SSRF **at working depth, by
exploiting them yourself.** Dependency and supply-chain risk. **Prompt injection — direct and indirect —
contained rather than fixed.** The lethal trifecta: private data + untrusted content + exfiltration
ability. Tool permission design and excessive agency. **Treating model output as untrusted input.** PII,
prompt and log leakage, and the data obligations your employer will hand you.

**Artifact** `EVIDENCE` — an attack-then-fix log against a deliberately vulnerable copy of the flagship:
four exploits you ran yourself, each with fix and test. A tool-permission design for M17's agent with
blast-radius analysis. A one-page **data-flow document** naming every boundary customer data crosses,
every third party that sees it, and the retention setting at each — **plus a PII redaction step
implemented in M7's trace pipeline** and proven by a test that feeds it synthetic PII.

> This reconciles a tension v1 created and never resolved: M7 and M11 teach you to log everything about a
> model call; this is where that meets not shipping customer PII to a third-party platform.

**GATE** — **REFEREE:** working exploits — either they land or they do not. **PASS:** four exploits
demonstrated and fixed with tests; name every irreversible action in your agent and defend the containment
architecture **without ever saying "I tell the model to ignore injected instructions."** **ON FAIL:** the
exploit did not actually land — you have a description, not a demonstration.

**Most-missed:** Believing code is server-side because of where the file lives. · Treating a leaked key as
fixed by deleting the commit — it is compromised the moment it was pushed; rotation is the only fix.
· Trusting a `userId` in the request body. · `USING (true)`, or the secret key in an Edge Function
"because RLS was in the way." · Believing a classifier or delimiter scheme solves prompt injection.
Assuming indirect injection is exotic — **it is the common case**: a web page, a PDF, a calendar invite, a
GitHub issue, a row another user can write to. · Giving the agent an admin token "temporarily." · A
confirmation step whose summary the model itself generates — an injected model lies in the confirmation.

---

# LAYER 6 — Product and Platform (155h)

## M20 — Frontend for AI Interfaces (40h) · `dependsOn: M3, M10, M17, M18`

Cut from v1's 45h and retargeted: the generic React rendering-model material is below your level. What
remains is the AI-specific surface, which is where you differentiate.

**Core concepts:** Effects and their four failure modes (infinite loops, stale closures, races, missing
cleanup). **The server/client boundary and the current Next.js caching direction** — state the direction,
which is durable, not the version, which is not: **caching is now opt-in.** Nothing is cached by default;
you opt in explicitly. v1 hedged on this as if it were a version bump; it is an *inversion*, and generic
hedging does not catch it because you will read current docs, recognize the words, and map them onto the
old default without noticing it flipped. Forms, mutations, optimistic UI with shared Zod schemas. Then:
**`useChat` on M3's wire format** (budgeted in M3 — it is not free). Cancellation and abort propagation.
Resumable streams. Latency choreography for 10-second-plus operations. Conversation scroll behavior.
**Designing for output that is sometimes wrong** — tool-call UI, approval gates, citations, uncertainty,
honest failure states. **The upgrade-path UI and the honest failure state** (moved here from M18 to break
a circular dependency).

**Artifact** `EVIDENCE` — the flagship's chat surface rebuilt on **your own M3 protocol**: a stop button
that provably stops upstream billing; refresh-mid-generation that resumes rather than losing the answer;
tool calls surfaced with a working approval gate wired to M17; citations linking to M10's span provenance;
failure states that tell the truth; the 402/upgrade path.

**GATE** — **REFEREE:** a screen recording plus the cost meter. **PASS:** explain the byte path from model
token to painted DOM node with no notes; demonstrate refresh-mid-generation recovery live; show the stop
button's effect in the cost meter; report time-to-first-token (measured here, where the client
instrumentation lives). **ON FAIL:** the stop button stops the UI only.

**Most-missed:** `useState` as a variable store kept in sync with `useEffect`. · Adding and removing deps
until the lint rule goes quiet. · `'use client'` at the root layout. · **Assuming one `read()` chunk equals
one complete SSE event** — corrupts output only under load. · `setState` on every token at 60/sec,
re-rendering the whole markdown tree, then blaming React. · Conflating client disconnect with user
cancellation. · `aria-live="polite"` on the streaming container, making screen readers re-read the entire
growing message. · **An approval button that appears after the tool already ran.** That is theatre.

## M21 — System Design and the Design Doc (12h) · `dependsOn: M5, M7`

The queue half moved to M5. What remains is the interview-shaped half, correctly late.

**Core concepts:** The client-server trust boundary. Statelessness and why a shared counter is the hard
part. The serverless execution model, measured rather than blog-post-quoted. Caching in three layers and
the invalidation for each. Graceful degradation, backpressure, what happens when the model is down.
**The forward-looking design doc** — the mid-level artifact at most companies, and the highest-leverage
move available to an engineer with no credential, because it is public, durable, and evaluated purely on
the quality of thinking.

**Artifact** `EVIDENCE` — a one-page design doc with two rejected options for a bounded AI system,
**reviewed and pushed back on by a real reader before any code exists.** Keep both the proposed and the
built version; the delta is the interview material.

**GATE** — **REFEREE:** the mock interviewer, who must ask questions you did not anticipate — this gate is
unadministrable alone. **PASS:** 45 minutes at a whiteboard on one bounded AI system end to end including
observability and the failure path, surviving three unscripted follow-ups. Plus: "here is where my design
was wrong and how I found out." **ON FAIL:** rehearse the weak branch and re-book.

**Most-missed:** Treating server and client as a lint rule rather than two physically different computers.
· "Serverless means stateless so I'm fine" — instances are reused and handle concurrent invocations in the
same process, so module-level state persists *sometimes, unpredictably*, which is worse than never.
· Caching the final response keyed on the raw question — almost never hits, leaks across users when it
does. The high-value caching is upstream. · Retrying into an outage; a 429 means send less. · Reaching for
Redis or Kafka in minute three, before anyone established the read/write ratio. **The mid-level rubric
rewards thoughtful simplification.**

## M22 — Deployment, CI/CD, and Operating It (48h) · `dependsOn: M4, M6, M11`

**Core concepts:** Environments and configuration as a first-class thing. Secrets across environments;
short-lived credentials over stored keys. A CI pipeline you own — what gates a merge and what it costs.
**Deploy ≠ release** — preview deploys, promote, instant rollback, feature flags. **Expand/contract
migrations in the pipeline** (moved here from M4, where there was no pipeline to run them through).
Health checks, SLOs, alerting that pages a human only when it should. Registries, image builds in CI, one
real cloud deploy.

**Artifact** `EVIDENCE` — the flagship's full pipeline: OIDC secrets with no stored keys; required checks
**including M11's eval gate**; a feature-flagged release; a rollback rehearsed under a timer; an
expand/contract migration run through the pipeline **while M4's load generator is firing**, with zero
failed requests; one burn-rate alert that fired for a real reason. Plus one dockerized cloud deploy, torn
down the same day.

**GATE** — **REFEREE:** a timer and the load generator's error count. **PASS:** roll back a bad deploy in
under five minutes while narrating; run the migration under load with zero failed requests; explain with a
**specific lock type** why a naive migration takes a site down and why yours does not. **ON FAIL:** the
migration dropped requests — expand/contract was not actually expand/contract.

**Most-missed:** `git revert` as the rollback strategy — a full rebuild while the site is broken, and it
does nothing about the schema change or the rows the bad version already wrote. · Migrations at application
boot, so every instance races. · Assuming the public-bundle env prefix means "for the frontend" rather than
"baked into the public bundle, forever, at build time." · Production secrets in preview environments, where
any PR can exfiltrate them. · One `/health` for both liveness and readiness. · The Kubernetes rabbit hole.
· Leaving the practice cloud stack running.

## M23 — Python as a Second Production Language (35h) · `dependsOn: M8, M11`

**Trip-wire from M0:** if fewer than 40% of your filtered funnel accepts a Node-primary backend, **this
module moved to immediately after M11** and you are already running the alternate ordering.

**Core concepts:** Python semantics at depth. **asyncio and the blocking-call trap** — a concurrency model
that is not JavaScript's. FastAPI with streaming responses and dependency injection. Reading and debugging
idiomatic Python in a codebase you did not write.

**Artifact** `EVIDENCE` — **M11's eval runner ported to Python** (this gives the module an inbound
dependency edge; v1's Python module was terminal, which is why it was the most cuttable thing in the
document). Typed request/response models, streaming, a pytest suite faking the model client, type checker
green in CI, plus a written runtime diff **including a reproduction of a blocking call freezing the
asyncio loop and its fix.**

**GATE** — **REFEREE:** a timer, plus a Python-fluent OSS maintainer reviewing a real PR. **PASS:** add a
typed route and test to an unfamiliar Python service in 90 minutes; the maintainer merges without idiom
comments. **ON FAIL:** you are writing TypeScript with Python syntax — **a passing test cannot catch this**,
which is why the referee is a human who reads Python daily.

**Most-missed:** Classes everywhere, raw `dict` passed around, camelCase. Reviewers read that instantly.
· Assuming `async` is JavaScript's: a sync HTTP client, a sync DB session in an async handler,
`time.sleep`. All compile; all pass local testing with one user. · Unbounded `gather(*[...])` — fine on 10
items, OOM on 5,000. · Calling the real model API in unit tests. The LLM belongs in the eval suite.
· Assuming pydantic is strict by default. It coerces unless told otherwise.

## M24 — Third-Party Integration as a Consumer (20h) · `dependsOn: M3, M19`

**Artifact** `EVIDENCE` — a real OAuth connection in the flagship: encrypted per-user token storage,
automatic refresh, a revocation-recovery path that re-prompts rather than failing silently, and a
deliberate test where you revoke access in the provider's own UI and show the app degrading honestly.

**GATE** — **REFEREE:** the provider's own UI, where you actually revoke. **PASS:** draw the token
lifecycle from consent to revocation and name exactly what happens when a refresh token expires inside a
background job at 3am; demonstrate the recovery. **ON FAIL:** the 401 surfaces as a generic error.

---

# LAYER 7 — The Market (78h)

**Scheduled by trigger, not by position.** v1's single worst sequencing error was here: M23's gate said in
bold "this happens before the first application" while sitting at hour 873 — eight months *after*
applications start. M24 produced the resume at month 15 for applications at month 5. Five lenses caught it
independently.

## M25 — Comp, Terms, and the Negotiation (8h) · *trigger: one month before the application date*

The funnel-filter half of this work already happened in M0, where it belongs, because it determines which
modules matter. This is the transaction itself.

**Core concepts:** Reading an offer — base vs equity vs bonus, vesting, what a startup's equity is
realistically worth. **W2 vs 1099 vs agency vs employer-of-record.**

> **v1 asserted that remote entry-band roles are "disproportionately" 1099 and escalated to calling it "a
> certainty." That is not supported.** A critic pulled live postings and found W2 full-time with benefits
> explicitly listed; a contract-filtered search returned nothing. Thin sample, weak null result — but
> "certainty" was not defensible from anything the document showed. **What is defensible: check the
> classification on every posting before applying, and know your delta before you negotiate.** You already
> tagged twenty postings W2 or 1099 in M0. That is your data, and it is a better artifact than my claim was.

**Artifact** `EVIDENCE` — a comp floor and target with the postings that justify them; a spreadsheet
modeling the same headline number as W2 vs 1099 with self-employment tax, health insurance, and unpaid
time off; a negotiation script rehearsed out loud and recorded.

**GATE** — **REFEREE:** a real recruiter screen. **PASS:** state your floor to an actual recruiter without
hedging. **ON FAIL:** you hedged — that is the rep; do it again next screen.

## M26 — The Evidence Layer v1 (8h) · *trigger: the application date*

Split from v1's single late module, because applications at month 5 need a resume at month 5.

**Artifact** `EVIDENCE` — a resume mapping each claim to a repo; two pinned repos; a README in
product-spec form. **Only `EVIDENCE`-tagged artifacts are pinned.** `runtime-lab`, `seams`, `pg-lab`, and
`stats-lab` are labs — they taught you things and they are not portfolio.

**GATE** — **REFEREE:** a stranger. **PASS:** they state what the system does without asking a question.

## M27 — The Evidence Layer v2 (17h) · *trigger: after Layer 5*

**Artifact** `EVIDENCE` — the flagship README carrying **the eval numbers including the failing v1**; a
decision log of the five choices that mattered; one public write-up of a measurement you made.

**Most-missed:** The README as a feature list instead of a product spec plus decision record. The stack
list is the least interesting thing in the repo and it is what 90% of portfolios lead with. · **Hiding the
v1 numbers because they were bad. The improvement delta *is* the evidence** — a single good number could
have been luck. · Tutorials that duplicate a thousand existing posts; the convincing genre is a specific,
numbered account of something that went wrong in your own system. · 22 technologies listed. Six you can be
grilled on reads as competence. Do not put "Prompt Engineering" on it. · Auto-apply tools and
200-application blasts. Always find the human.

## M28 — Interview Performance (45h) · *10h forward-loaded to the application date*

**Forward-loaded (10h, at the application date):** clarify-before-typing; out-loud narration with
autocomplete off; one recorded mock. The remaining 35h stays late.

> **v1 had the emphasis inverted.** It led with the un-assisted round and filed the assisted round as a
> secondary bullet — while its own M14 already named the purity play as a *scored failure*. Major firms are
> piloting candidate-uses-an-assistant rounds, standard policy does not ban AI, and take-homes are
> contracting specifically because unverifiable AI use undermined them. **Invert it.** Keep the
> autocomplete-disabled round as a floor. Stop budgeting hours against the shrinking take-home format.
> (Direction is well-corroborated; no percentage is attached, deliberately.)

**Artifact** `EVIDENCE` — a recorded ten-minute flagship walkthrough in **decision-language, not
feature-language**; three timed foreign-repo bug fixes from M0's blind queue with assistant transcripts
attached and annotated; two recorded mock defenses with a real person who pushes back. **The 40-problem
narrated log lives in Track 4's existing weekly slot**, not as 15 extra hours here.

**GATE** — two referees. **PASS (1):** solve an unseen problem out loud in 25 minutes with autocomplete
disabled. **PASS (2):** drive an assistant through an unfamiliar bug **under observation**, narrating every
point where you *verified* rather than accepted. **ON FAIL:** watch the transcript back and name where you
delegated something you should have verified — that is the rep.

**Most-missed:** Practicing in your own IDE with autocomplete on. · Barreling into typing without
clarifying — interviewers name this as a reject signal, and it reads as someone used to a model filling the
gaps. · **Editing the test to make it pass.** Instant fail. · Framing projects around tool names. "What
would you do differently" is a test of honest depth; "nothing, it's solid" scores worse than naming a real
limitation. · Gold-plating the take-home UI while shipping zero evaluation, which inverts the actual
scoring.

---

# LAYER 8 — Employed Mode (18h)

*Every feedback instrument in v1 was designed for an unemployed person and terminated on hire day. But the
document's own arithmetic makes **hire-before-completion the modal outcome.***

## M29 — Employed Mode (10h) · *written pre-hire, executed post-hire*

**Artifact** — a second operating contract: a realistic employed weekly budget (**5–8 hours, not 18**) and
a module order driven by what the job needs first. Track 4 retargeted from your own artifacts to a
component of the employer's codebase — which doubles as onboarding. The reviewer relationship re-contracted
or deliberately replaced, **decided before the start date.** The monthly re-plan surviving with new inputs:
PR review comments, tickets that took longer than estimated, things you could not answer that month. The
estimate log continuing against real tickets from week one.

Plus **two scheduled written manager checkpoints at week 6 and week 14**, scripted before the start date,
asking directly whether you are where they would expect. Week one is the wrong time to ask — that is when a
manager's answer is most generic.

## M30 — The First 90 Days (8h) · *trigger: first onsite*

Self-taught plus remote is the highest-risk combination for silent struggle, and silent struggle is how new
hires get let go at month three — not for incompetence, but for being stuck two days on something a
teammate would have unblocked in five minutes.

**The unwritten norm nobody writes down:** struggle alone ~30 minutes, then ask publicly in a channel with
what you tried, what you expected, what happened, and your current best hypothesis. That format demonstrates
competence *while* asking for help rather than in spite of it.

Also here: **inheriting an AI system you did not build** — reading someone else's prompts, evals, and
traces; prompt archaeology on a system with no decision log; and the fact that your first AI ticket is more
likely "the summaries feel off, look into it" than a greenfield feature.

**Artifact** — a 30/60/90 plan against a real posting with week-one manager questions; a reusable
asking-for-help template **practiced for real by posting three genuine questions in an OSS project's
Discord or Slack**, responses kept; an org map inferred from `git blame` and `log`; a handoff note good
enough for a stranger to continue.

**GATE** — **REFEREE:** real strangers in a real channel, and a recording. **PASS:** three genuine questions
posted and answered; record yourself pairing with another person for 45 minutes on a real bug in an
unfamiliar repo, narrating throughout, and watch it back.

---

# The Parallel Tracks — priced

v1 listed these as mandatory and budgeted none of them. That was the 40% error.

| # | Track | Hours | Cadence |
|---|---|---|---|
| 1 | **Job search** — 10 researched applications/month where you can name the product and a human | **~200** | 3–4 h/week from the application date |
| 2 | **OSS PRs** — one substantive merged PR/month | **~80** | ~8h/month from M12 |
| 3 | **The dependency spiral** — every capstone imports an earlier one | **0** | structural |
| 4 | **Weekly cold re-build** — 45 min, original repo closed. *Also carries M28's narrated-problem log.* | **~60** | weekly |
| 5 | **Reviewer relationship** — batched into scheduled monthly sessions, not escalating ad-hoc favors | **~15** | ~1 h/month |
| 6 | **Agent discipline** — interrogate-never-author through M12; delegation policy after M14 | **0** | habit |
| 7 | **Writing** — one short piece per layer, each about something you *measured* | **~30** | 5 × 6h |
| 8 | **Monthly re-plan** — *and it survives into Employed Mode* | **~40** | 2 h/month |
| | **Total** | **~425** | |

**Track 1 sequencing rule:** for the first two months, deliberately target companies you do **not** want.
The first ten interviews are instruments, not opportunities.

**Track 4 rubric (v1 gave it none, so it could not fail):** score each cold re-build 0–3 — 0 could not
start, 1 needed the original, 2 rebuilt with gaps, 3 clean. **Three consecutive scores below 2 on the same
artifact means that module is re-opened**, not noted.

---

# The Cut List

Deliberately removed. **This list is itself a hiring signal** — "I know that exists, here is when I would
reach for it, I have not needed it yet" beats a shallow artifact.

**Model training in every form** (fine-tuning, LoRA, PyTorch, backprop, transformer internals) — the
biggest time sink available, zero hireable signal for this job family. · **Algorithm theater** — linked
lists, tree rotations, DP past recognizing memoization, implementing sorts, bit manipulation, tries,
graphs/BFS/toposort, competitive programming. The interview subset survives, timeboxed, in M28.
· **Distributed systems theory and platform engineering** — CAP, Raft/Paxos, sharding, Kafka, Kubernetes,
service meshes, microservices, gRPC, Terraform as a practice, self-hosted metrics stacks. · **TypeScript
exotica** — type-level metaprogramming, decorators, namespaces, RxJS, Effect-TS/fp-ts. Read these;
authoring them makes you the person whose PRs nobody can review. · **The Python data-science slice** —
numpy, pandas mastery, scikit-learn, notebooks-as-primary-workflow, Django/Flask, conda/poetry/pyenv.
· **Framework tourism** — deep LangChain, LlamaIndex, CrewAI, AutoGen, and *most tempting of all*,
building your own agent framework, eval platform, or observability dashboard. Each is a way to build a
worse version of something that exists while avoiding the labeling and debugging that actually teach.
· **The advanced-RAG genre** — GraphRAG, RAPTOR, self-RAG, CRAG, FLARE, standalone vector DBs, fine-tuned
embeddings, implementing HNSW, chasing MTEB. · **Eval anti-patterns** — public benchmarks, BLEU/ROUGE/
BERTScore, off-the-shelf RAG metric bundles, 1–5 Likert judge rubrics, adopting a platform before you
have 50 real cases. · **Certifications of every kind** — across 14 full postings sampled, not one named an
AI certification. · **Learn-on-demand appendix** (~55h) — Playwright as a unit, feature flags as study,
webhook signature verification as its own unit, rate limiting as its own unit, the batch tier, GraphQL,
gRPC, OAuth *provider* implementation, prompt compression, semantic caching, self-hosting open-weights
models.

**One cut the review flagged as a real risk, not a clean win:** the AWS/second-cloud unit stays cut, and
the Vercel/Supabase focus is defensible for this segment — **but it narrows your funnel more than the
Python bet does, and unlike the Python bet there is no trip-wire for it.** If M0's twenty postings show
cloud-native infrastructure as a common requirement, add a 15-hour unit and take the hours from M20, the
least differentiating module in the plan.

---

# A note on APEX itself

The learning-science research read your `obsidian.js` and flagged this: **APEX's quiz engine is built
almost entirely out of multiple choice.** Recognition memory survives long after recall is gone, so a 90%
MCQ score is compatible with total inability to produce the thing. That is precisely the illusion this
curriculum exists to escape, and M0 names it as one of the three distinct mechanisms behind
tutorial-induced competence illusion.

The `predict:` fields already in that file are the good part — **pre-questions before instruction improve
later learning even when the pre-answer is wrong.** Expand those; demote the MCQ banks to warm-up only;
make free generation into a blank box the primary interaction.

**On schema:** APEX's current unit is `{id, sub, phase, title, concept, example, cards, quiz}` — built for
exam prep. This curriculum's unit is
`{id, layer, title, hours, dependsOn[], concepts[], artifact, artifactKind, gate:{referee, pass, onFail}, mistakes[], trigger?}`.
Different shape. Do not retrofit the ASVAB one.

The `dependsOn[]` field is not decoration — **derive the layers from the graph rather than asserting them**,
and print two properties: every module except M0 has at least one inbound edge, and **the longest path, not
the hour sum, sets your timeline.**

---

## Provenance and currency

**Built by:** 24 parallel research agents with web access (2.66M tokens, 432 tool calls) → a gap critic and
a waste critic → an architecture pass that cut 2,605 research hours to 963. **Then reviewed by:** 10
adversarial critics (1.5M tokens) across sequencing, month-six failure, currency, seams, hiring-manager,
gates, learner-reality, emerging-reality, self-taught-specific, and red-team lenses → a synthesis that
produced 15 must-fixes, 25 should-fixes, 18 stale-claim corrections, and **rejected 11 findings as wrong or
not worth the hours.**

**Where the currency risk actually lives** — v1 put its only warning on the model module, which was the part
it mostly got right. The real decay is concentrated in **four places**, and three of them are in layers this
document calls "fundamentals":

- **M9** (model IDs, parameters, pricing, `stop_reason` enum, caching TTLs) — monthly cadence
- **M4** (Supabase connection endpoints, key naming migration) — **a platform claim wearing fundamentals
  clothing; it moves at platform speed**
- **M16 / M10** (pgvector index behavior, dimension ceilings, `iterative_scan` defaults) — version-pinned
- **M17 / M20** (MCP spec revision, AI SDK wire format, Next.js caching direction) — breaking changes
  inside this curriculum's own calendar

Everything in M1, M2, M12, M13, M15 is durable. Verify the four above against **primary sources** the week
you build each one — not this document, not a blog post, not a model's memory.

**And the honest limit:** this document is a static artifact about a field that moves. Track 8's monthly
re-plan is the only mechanism it has for noticing it has gone stale. That is thin. The real defense is the
habit the curriculum is actually teaching — **measure it yourself, and trust the number over the claim.**
