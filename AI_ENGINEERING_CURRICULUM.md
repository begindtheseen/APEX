# The Launch Pad

## A curriculum for becoming a hireable remote AI product engineer

Built from 24 parallel research sweeps, three adversarial critics, and an architecture pass.
Raw research corpus: 2,605 hours across 24 dimensions. Cut to **963 focused hours** — because a
perfect curriculum abandoned in month seven is worth less than a leaner one finished.

---

## Read this part first. It is the most important page in the document.

**963 focused hours is roughly 1,300–1,400 wall-clock hours** once you count environment setup,
yak-shaving, and re-reading what decayed. At a sustainable 18 hours/week that is **about 13 months
of focused time and 15–18 months of calendar.**

That number has not been shrunk to look achievable. It is already the product of cutting 1,640 hours
out of the research corpus — deleting an entire dimension, collapsing five duplicate builds, and
removing 604 hours of job-search activity that wasn't writing code.

**If your runway is under nine months, this curriculum is the wrong plan.** The right plan is Layers
0–2 plus M11 and M13, then a contract role at month six, and the remaining ~500 hours learned on
someone else's payroll. That is a financial decision, not a technical one, and M0 is where you make it.

### The three rules that govern everything

**1. Every module ends in an artifact you built and can explain out loud.** Non-negotiable. If a
module has no buildable artifact, it has been restructured until it does or cut.

**2. Every module's capstone imports an earlier module's capstone.** This is the dependency spiral.
M3's streaming proxy is a hard dependency of M15, M18, and M19. M13's eval runner is reused by M14
and gated by M20. You re-read old code because the build requires it, not because a review schedule
says so. **This costs zero hours and is the entire answer to "how do month-two modules not decay by
month ten."**

**3. Six concepts are taught exactly once, by one owning module, and consumed by every module after.**
Streaming, evals, idempotency, observability, the trust boundary, and cost. The research corpus taught
an eval harness six times in four incompatible substrates, SSE-from-scratch four times, and
observability five times. Following it as written produces four abandoned half-harnesses instead of
one that works.

### The honest risk list

- **Months 3–6 are the abandonment window.** M4, M5, M7, and M8 are 200 hours of the least glamorous
  material here and the furthest from the AI work you actually want. No amount of design makes this fun.
- **The application start date will slip.** You will hit month five, feel unready, and push it. That
  single slip is the most likely way this becomes an 18-month unpaid project.
- **The gates are self-administered by the one person who has already demonstrated he can mistake
  working for understanding.** Roughly a third of them are decorative unless witnessed. Mitigations
  are structural: a real reviewer, a passing test, a stranger reading a README, a recording you watch back.
- **Six modules bolt onto the same flagship app.** If it's a toy with no traffic, M13's error analysis
  has nothing to read and M16's cost attribution measures nothing. You need a flagship with ~200 real
  requests before M13 starts. M0 names which app it is.
- **Python at position 25 is a genuine bet.** If your funnel turns out to be Python-mandatory backend
  roles, you are both short on hours and late on timing. The monthly re-plan is the only thing that
  catches this, and only if you're actually applying by month five.

---

# LAYER 0 — The Contract

*8 hours. The only module with authority over the others. Nothing else gets scheduled until its
artifacts exist.*

## M0 — Scope, Runway, and the Cold Baseline

**What you're establishing and why it matters:** The research corpus had no owner for the plan itself.
Twenty-four researchers each answered "what does mastery of my slice require" and nobody asked "what
is the 900-hour version of all of this." A superset handed to a motivated person becomes a
two-and-a-half-year project that ends in burnout with no income and no interviews taken.

The specific structural error to avoid: **treating the job search as the reward for finishing.**
Applying is not a terminal phase — it is the instrument that tells you which 900 hours mattered. Ten
real interviews at month five will re-rank this curriculum more accurately than any researcher can,
and rejection reasons are the highest-quality curriculum feedback available. They're free.

**Core concepts:**
- Runway as the input that sets the deadline — not the topic list
- The difference between "before first application" and "learn on the job"
- Why the tutorial-competence illusion is three distinct mechanisms, not one feeling:
  processing-fluency misattribution, recognition-vs-recall substitution, and the illusion of
  explanatory depth. Each has a different fix; applying the wrong one feels like effort and changes nothing.
- The bad-week minimum: a missed week must not read as a broken streak, because that converts one bad
  week into quitting

**The artifact:**
One git repo, one directory per module, plus `PLAN.md` containing:
1. A written weekly hour budget with **named days**
2. Your runway in months — the number of months of expenses you can cover
3. The calendar date applications begin (target: ~month 5, after Layer 1 and most of Layer 2)
4. The before/after-application cut, with a written defense of the split
5. A one-page operating contract: module shape, weekly cadence, bad-week minimum, plateau protocol
6. **Which existing app is the flagship** — the one M6, M13, M16, M17, M18, M22 all bolt onto

Plus a **recorded cold baseline**: open an empty file and rebuild the core module of a feature you
already shipped, in 45 minutes, with the original repo closed. Record exactly what you could not produce.

**Mastery gate:** State without looking: your weekly hours, your runway in months, the date
applications start, and three specific things from your own shipped code you could not rebuild cold.
The baseline recording exists and is what every later claim of progress is measured against.

**What most people get wrong:** Building an elaborate progress dashboard and mistaking instrumentation
for learning — a real risk given you are literally building a tracking PWA. The dashboard is infinitely
more pleasant to work on than the hard module. Cap the meta-work at one page. Also: setting modules at
4–6 weeks, which feels serious and breaks both the review cadence and the sense of completion.

---

# LAYER 1 — The Machine

*215 hours. The literal answer to "I need to understand code." This layer is where "it works" and
"it is correct" stop being the same sentence.*

## M1 — The Runtime, Unframed (60h)

**What you're understanding and why it matters:** You can build Next.js apps. You likely cannot
explain the event loop, why your async code races, what a Promise actually is, or why your types pass
and your runtime breaks. Every one of those is a production bug you will be asked to debug on the job,
and the last one is the single most common self-taught tell in a code review.

**Core concepts:**
- **The event loop**: call stack, macrotask vs microtask queue, and why one slow function stalls every user
- **What a Promise actually is**: a notification channel for work that already started — not a thing
  that "does" work, and not lazy
- **The four concurrency failure modes**: sequential-when-you-meant-parallel, fire-and-forget,
  unhandled rejection, and cancellation
- **Closures, lexical scope, `this`, reference identity** — including the serverless trap: warm
  instances reuse module scope, so any mutable module-level variable is shared state across users
- **Structural typing and where the type system lies to you**: `as User` is a note to the compiler that
  emits zero runtime code
- **Parse, don't assert** — Zod at every edge, especially model output
- **Discriminated unions and exhaustiveness** — making illegal states unrepresentable
- **Error handling as design**: taxonomy, `cause` chaining, which failures are safe to retry
- **Modules and the bundle graph**: placement means nothing, the import graph is what ships

**The artifact:** A `runtime-lab` repo — eight small programs run with plain `node --test`. No Next.js,
no bundler. Contains: MiniPromise built from scratch; a concurrency harness that reproduces all four
failure modes on demand and then fixes each; a Zod boundary that rejects hostile LLM JSON that
`as MyType` accepted; a typed error taxonomy with cause chaining and a documented retry-safety rule per
error class. `tsconfig` has `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
`verbatimModuleSyntax`, and `erasableSyntaxOnly` on from day one.

**Mastery gate:** Screen-share and narrate, unprompted, why `setTimeout(fn, 0)` runs after a resolved
`.then()`. Then take a function from your own shipped code that `as`-casts model JSON, convert it to a
parsed boundary, and explain out loud exactly which production bug that prevents.

**What most people get wrong:**
- Believing `async` means "runs in the background." An async function runs synchronously until its
  first `await`, and CPU-bound work inside one blocks the whole process exactly as hard as sync code.
- `await` inside a `for` loop over independent work — turning 200 × 200ms into 40 seconds. And the
  opposite: `Promise.all` over an unbounded array, firing 200 simultaneous requests into a retry storm.
- Silencing strict-mode errors with `as` casts and `!` instead of narrowing — which converts a compile
  error into a runtime crash and makes the whole exercise net-negative.
- Modeling state as `{ loading: boolean, error?: string, data?: T }`, which permits four impossible
  combinations, instead of a union that permits exactly the real ones.
- `catch (e) { console.log(e); }` and continuing — converting a loud failure into a silent wrong answer.

## M2 — The Machine Model: Nine Seams (45h)

**What you're understanding and why it matters:** Nine specific places where a naive mental model of
the machine breaks, each framed around a bug it explains. You are not writing an operating system —
you are eliminating the class of bug where you are mystified by your own code.

**Core concepts:**
- **References vs values**: aliasing, mutation, shallow vs deep copy
- **Stack vs heap, object lifetime, and why a server leaks memory** — GC frees unreachable objects; a
  leak is unintended reachability
- **Number representation**: floating point, integer precision, the right type for money, IDs, timestamps
- **Text encoding**: bytes vs code points vs grapheme clusters, and decoding a *stream*
- **Serialization**: JSON as a lossy boundary
- **Blocking**: event loop, async I/O, threads, processes
- **File descriptors, sockets, connection pools, timeouts**
- **Concurrent mutation**: races, atomicity, idempotency
- **Dates, times, and timezones** — UTC storage vs local display, DST transitions (the hour that
  happens twice and the hour that never happens), `timestamptz` vs `timestamp` as a Supabase footgun
  that silently produces correct-looking wrong data

**The artifact:** A `seams` repo of ten reproductions. Each is a failing script, the fix, and a test
that proves it: a leaking server proved with a heap snapshot; a money total wrong by a cent; a UTF-8
grapheme split across streamed chunks; a pool exhausted under load; a lost update in Postgres; and a
daily-digest scheduler for users in four timezones with an injected fake clock, pinned across a
spring-forward and a fall-back.

**Mastery gate:** Shown any of the ten bugs cold, name the seam and the instrument you'd reach for
within 60 seconds. Separately: open your own shipped schema, point at the columns that are the wrong
type, and say what will silently go wrong.

**What most people get wrong:**
- Believing `{...obj}` or `JSON.parse(JSON.stringify(obj))` is "a copy." The spread is one level deep.
  The JSON trick converts Dates to strings, drops `undefined` and functions, mangles Maps and Sets into
  `{}`, and throws on cycles — and self-taught devs use it for years without knowing that.
- Reaching for `.toFixed(2)` and calling money solved — that fixes the display and leaves the
  arithmetic wrong, so error accumulates invisibly until a reconciliation report months later.
- Constructing a `new TextDecoder()` inside the loop — looks identical to correct code, and is wrong,
  because the whole point is the carried-over partial-character state.
- Thinking "I'm using a connection pool" solves it, without noticing each of N serverless instances has
  its own pool of size M, so the real number is N×M against the database's hard limit.
- Believing a transaction prevents the race. At the default isolation level both transactions read the
  same balance; `BEGIN/COMMIT` guarantees both statements land together, not that nobody moved the row.

## M3 — HTTP, Streaming, and the Wire (45h)

**What you're understanding and why it matters:** This is the layer under every AI feature, and the
streaming and idempotency pieces are disproportionately load-bearing. **This module owns streaming for
the entire curriculum** — M15, M18, and M19 import what you build here rather than rebuilding it.

**Core concepts:**
- **HTTP as a wire format** — the ~15 status codes and ~12 headers that carry meaning
- **REST design and where REST stops being the right answer** (real APIs at Stripe and GitHub have
  action endpoints; offset pagination is the most common correctness bug in list endpoints)
- **SSE and chunked transfer, implemented from scratch with no SDK**
- **Production streaming failure modes**: proxy buffering, client aborts, mid-stream errors, dropped
  connections, resumption
- **Idempotency** — why a retry is a data-corruption bug unless you design for it
- **Timeouts, exponential backoff with jitter**, and which failures are safe to retry
- **Rate limiting from both sides**
- **Webhooks**: at-least-once delivery, signature verification on raw bytes, the async job pattern
- **The browser boundary**: CORS and preflight, cookies vs bearer tokens vs JWTs, and exactly where
  each breaks
- **OAuth as a consumer** (deepened in M22)

**The artifact:** **THE streaming LLM proxy** — raw `fetch`, raw `ReadableStream`, hand-parsed SSE
frames, no SDK anywhere — with `AbortController` wired end to end and a Postgres idempotency-key dedupe
table. It deliberately reproduces proxy buffering and a mid-stream error, and recovers from both. It is
published as a module that later modules import.

**Mastery gate:** Kill the client mid-generation and show, from logs, that upstream billing stopped.
Replay the same idempotency key twice and show one row. Narrate what arrives on the wire between the
first byte and the first rendered token.

**What most people get wrong:**
- Naive frame splitting: `chunk.toString().split('\n')`, which corrupts output the moment a frame is
  split across TCP chunks — and works perfectly on localhost, so it ships.
- Assuming HTTP 200 means the whole response succeeded. The status is committed before the body exists,
  so mid-stream failures are invisible to any `res.ok` check.
- Writing the assistant message to the database only in the stream's `finally`/`onFinish` — which on
  serverless may never run once the response closes, silently losing the turn.
- Everything returning `200 { ok: false }`, which breaks every retry library, monitoring tool, and
  load-balancer health check.
- Letting the client generate the idempotency key per-render instead of per-logical-operation — a React
  re-render producing a fresh UUID defeats the entire mechanism.
- Doing webhook work before responding, so a slow handler causes the provider to time out and retry,
  multiplying the work.

## M4 — The Postgres Underneath Supabase (65h)

**What you're understanding and why it matters:** You use Supabase. Supabase fluency (RLS policies,
auto-generated REST) is not Postgres fluency, and every job posting sampled lists SQL as a flat
requirement. This is also where the abandonment window starts — it is unglamorous and it is load-bearing.

**Core concepts:**
- **Relational modeling**: keys, foreign keys, constraints as the thing that actually enforces invariants
- **SQL without an ORM**: joins, aggregates, subqueries, CTEs, window functions
- **Indexes and `EXPLAIN (ANALYZE, BUFFERS)`** — the deliberate slow-to-fast measurement loop
- **Transactions, isolation levels, the lost-update problem**
- **N+1 queries**: recognizing, measuring, killing
- **Connection pooling** and the Vercel-plus-Supabase serverless failure mode
- **Row Level Security** as a design skill — correct first, then fast
- **Migrations and expand/contract** — schema evolution without downtime
- **pgvector**: index types, recall measurement, the filtered-search trap

**The artifact:** A `pg-lab` repo against a local Supabase stack: twelve hand-written queries with
EXPLAIN plans before and after indexing, on a `generate_series` dataset of 5M rows; a documented
slow→fast loop with wall-clock numbers from a load generator you wrote; an RLS policy set with a
benchmark showing the correct-but-slow version and the fast fix; and an expand/contract migration
executed against the app *while the load generator is running*, with zero failed requests.

**Mastery gate:** Read an unfamiliar EXPLAIN plan out loud and name the fix before looking at the
query. Explain why your own deployed app exhausted connections, and show the pooled fix working under
the same load.

**What most people get wrong:**
- Reading `cost=` as milliseconds (it is an arbitrary planner unit), and benchmarking cold-then-warm so
  the cache does the work the index gets credit for. Run each variant twice; report the second.
- Assuming an index on `(a, b)` helps a query filtering only on `b`. It does not.
- Creating a single-column index per column instead of one correctly ordered composite — and forgetting
  every index is a tax on every INSERT and UPDATE.
- Holding a transaction open across a network call to a model API, turning a 200ms DB connection into a
  30-second lock.
- Making schema changes in the Supabase dashboard's table editor, which bypasses migration history and
  makes `db push` start failing with sync errors.
- `USING (true)` in an RLS policy — identical to having no RLS while looking like security. And writing
  a policy against a JWT claim the user can edit.
- Treating approximate nearest neighbor as exact and never measuring recall. This is the default state
  of almost every RAG app in the wild.

---

# LAYER 2 — The Craft

*225 hours. Turn a solo builder into someone who can be dropped into a running system he did not write
and be useful in week two. This layer is where the hiring gap actually lives.*

## M5 — Tests That Fail For The Right Reason (35h)

**Core concepts:** The test pyramid and what each level is genuinely for; writing a unit test that
fails for the right reason; test doubles (stub, fake, mock, spy) and when mocking makes a test
worthless; integration tests against real Postgres including RLS; CI as a gate, not a place tests run;
the flakiness budget; **the seam between deterministic shell and probabilistic core** in an AI feature.

**The artifact:** One of your already-shipped repos goes from zero tests to a green required check:
~15 unit tests, 5 integration tests against real local Postgres including two RLS policies, running in
GitHub Actions as a merge gate, with a written flakiness budget and the record of one test you deleted
for asserting implementation.

**Mastery gate:** Handed a bug report on that repo, write the failing test first, then the fix, and
explain why the test would still fail if the fix were wrong in a different way.

**What most people get wrong:**
- Testing that the code does what it does rather than what it should do. A test that has never failed
  has never been tested.
- Mocking your own modules with `vi.mock()` until the test mirrors the implementation — failing on
  refactors, passing on bugs. Mock at the network or process boundary, never at your own internal seams.
- Mocking the Supabase client and asserting on `.from().select()` chains — that tests your mental model
  of Supabase, not Supabase.
- Seeding with the service-role key and asserting reads that also use service role — bypassing RLS
  entirely, so the test proves nothing about what a real user sees.
- Reaching for `retries: 2` or `sleep(500)`, which hides the bug and triples the suite time.

## M6 — Debugging and Production Observability (45h)

**What you're understanding and why it matters:** This is the highest-leverage module in the
curriculum. It is the skill of finding a bug you did not write, in a system you cannot reproduce
locally. **This module owns observability** for everything after it.

**Core concepts:** Stack traces as primary evidence (including minified production traces and why you
ship source maps); hypothesis-driven debugging and bisection across code, data, time, and config; a
real debugger — breakpoints, conditional breakpoints, logpoints — and when logging genuinely beats one;
structured logging with pino, log levels with real semantics, request-scoped correlation IDs,
redaction; OpenTelemetry spans and context propagation; metrics, SLOs, error tracking; profiling and
flame graphs; **AI feature observability — detecting wrong model output when nothing throws**;
production incident response; runbooks and the blameless postmortem.

**The artifact:** Your deployed flagship instrumented end to end: pino with correlation IDs and
redaction, OTel spans including the model call, Sentry, and a silent-failure detector for
wrong-but-200 model output. Plus a runbook covering three failure modes (provider down, connection
exhaustion, cost runaway), **validated by an actual other person executing it during a scripted game
day**, and a blameless postmortem of an outage you caused during that game day.

**Mastery gate:** Given one production trace ID, reconstruct the entire request out loud — which
queries ran, what the model was sent, where the time went. Then detect a wrong-output-no-exception
failure from instrumentation alone, without being told it happened.

**What most people get wrong:**
- Changing several things at once and redeploying to see what happens. The single most expensive habit
  self-taught developers carry into a job, because it destroys the evidence.
- Believing the debugger is for beginners and `console.log` is for professionals. The inversion is real
  and widespread.
- Deploying without source maps, so every production trace is `a.b is not a function at
  chunk-4f2.js:1:88421`, then concluding production errors are unknowable.
- Assuming valid JSON means correct output. Constrained decoding guarantees the shape, not the truth —
  and it removes the model's ability to express uncertainty, so it populates a required field whether
  or not the input supports it.
- Alerting on causes instead of symptoms, producing alerts that fire constantly and get muted — after
  which the system is unmonitored while looking monitored.
- Postmortems that stop at the code fix without asking why it took 40 minutes to notice.

## M7 — Reading and Changing Code You Did Not Write (60h)

**What you're understanding and why it matters:** This is what the first 90 days of any job actually
is, and almost no self-taught curriculum teaches it. Roughly 60% of 2026 onsite loops include a
read-existing-code round. Greenfield is approximately none of the job — the overwhelming majority of
your first six months is modifying a system that already runs, already has users, has no tests around
the part you must change, and cannot stop while you work.

**Core concepts:** Tracing one real user action end to end (architecture is the *output* of tracing,
not the input); a predict-then-ask protocol for using AI on code you're learning; the three layers of
code search — ripgrep (lexical), ast-grep (structural), LSP (semantic); reading tests as executable
specification; git history as documentation of record (blame, pickaxe, `log -L`, bisect); inferring
unwritten conventions and conforming; Chesterton's fence in practice; **characterization tests around
code you don't understand**; finding a seam; strangler-fig migration; feature-flagged dual-write;
**the resumable backfill**; the dual-run cutover.

**The artifact:** Four pieces.
1. A written end-to-end trace of one user action in **cal.com** with `file:line` citations at every hop.
2. In a real OSS repo: characterization tests locking in an untested module's current behavior
   *including its bugs*, then a behavior change behind a flag with both paths green.
3. A resumable backfill over 100k synthetic rows that can be killed halfway and restarted with zero
   double-processing.
4. A dual-run v2 of one of your own AI features — old and new both execute, outputs logged and
   compared, cutover justified by a comparison table.

**Mastery gate:** Sixty minutes, an unfamiliar repo, a failing test and nothing else: arrive at the
correct fix while narrating. Then defend three things you thought were wrong and deliberately did not change.

**What most people get wrong:**
- Starting at the repo root and reading directories top-down, or asking for an architecture overview first.
- Asking the assistant to produce the answer rather than pressure-test your own. The measured split is
  the whole lesson: conceptual-question users scored 65%+, delegation users under 40%.
- Grepping a function name and treating the hit list as the complete blast radius.
- Using `git blame` as the final answer instead of the starting point — blame gives the last commit
  that touched the line, usually a formatting sweep. `git log -S` and `git log -L :funcname:file` are
  the tools that answer "why is this here."
- Pattern-matching ugliness to badness. Defensive null checks, redundant-looking guards, and inlined
  duplication in hot paths are the three self-taught devs most reliably misdiagnose. Your confidence is
  highest exactly where your context is lowest.
- Waiting to understand the whole system before opening anything. Comprehensive understanding before
  first contribution is the single most common ramp killer.

## M8 — Git, Review, and Code Other People Maintain (40h)

**What you're understanding and why it matters:** "I need to understand code" has a reading half and a
writing half. M7 owns reading. This owns writing — the judgment that produces a convention rather than
conforms to one. Structure and naming are what the overwhelming majority of code-review comments are
about, and "works but I wouldn't want to maintain it" is the exact shape of the gap you described.

**Core concepts:** The git object model (commits are snapshots, refs are pointers, the index is a third
thing); what merge/rebase/squash actually do to the graph; resolving a conflict — including the kind
that merges cleanly and is still wrong; reflog, revert vs reset, shared-branch etiquette; atomic
commits and a PR a reviewer can act on; giving and receiving review, including reviewing code an AI
wrote; **naming, function and module boundaries, cohesion and coupling, dependency direction, the rule
of three, deleting code, making an error message actionable**; the three async artifacts a remote team
runs on — status update, blocker escalation, decision record.

**The artifact:** Three pieces, all submitted to a real reviewer.
1. A recovery-lab log: eight deliberate disasters (bad merge, lost commit, force-pushed shared branch,
   botched rebase), each recovered and each explained in writing.
2. A 500-line file from your own project restructured behind characterization tests, with a **line-item
   rationale for every boundary you moved** and proof behavior is unchanged.
3. Every failure path in one feature rewritten to actionable error messages — what was expected, what
   was received, what to do about it.

The reviewer's comments are kept verbatim as the scorecard.

**Mastery gate:** A reviewer who did not write the code accepts the PR series with no structural
comments. Separately: catch a deliberately planted defect in an AI-authored PR that passes CI, and say
which fundamentals module let you catch it.

**What most people get wrong:**
- Treating rebase as "a cleaner merge." It is history rewriting: new commits, new SHAs, and anyone who
  pulled the old ones is now diverged.
- Resolving a conflict by picking a whole side, or keeping both halves so it compiles, without
  re-reading the function as a whole — and never looking at the merge base.
- Commits that map to time spent rather than units of change; mixing a rename with a behavior change in
  the same commit, which makes the diff unreviewable and poisons future blame.
- A PR description that says what the diff already says instead of *why*, and omits how to verify it.
- On a remote team: explaining verbally in a call what should have been a comment on the line. If it is
  not written on the PR, it did not happen.

## M9 — Working With Coding Agents Professionally (25h)

**What you're understanding and why it matters:** The research corpus treated AI coding agents
exclusively as a threat to be resisted or inspected — in three separate dimensions — and never once as
the throughput standard of the team you're about to join. That blind spot produces an engineer who is
correctly suspicious and half as fast as everyone around him. You will be measured against teammates'
throughput from week three.

**Scheduled deliberately after M7 and M8** so the interrogate-never-author discipline holds during the
period it's meant to protect.

**Core concepts:** Writing a repo's agent config so generated code conforms to house conventions;
decomposing a ticket into agent-sized units with verifiable exit criteria; reviewing a 400-line agent
diff in ten minutes by reading the test changes and the boundaries first; the categories never to
delegate (anything touching auth, money, migrations, or a boundary you can't verify); sandboxing and
permission scope; what an agent run costs.

**The artifact:**
1. An agent config file for one of your own repos, proved to work by an agent-produced PR that passes
   review against your own conventions doc.
2. A defect log from handing an agent three real tickets in a repo you did not write: every wrong thing
   it did, how you caught it, and **which earlier module made the catch possible**.
3. A one-page written delegation policy naming what you will never hand to an agent and why.

**Mastery gate:** Triage a 400-line agent diff correctly in ten minutes, finding the one boundary
violation. State the delegation policy from memory and defend the hardest line in it.

**What most people get wrong:** Two opposite failures, both scored badly in interviews. Accepting
suggestions and moving on, producing a transcript of a person being driven by a model. And the purity
play — refusing to touch the assistant in a round whose rubric line is AI fluency.

## M10 — Scoping, Estimating, and Someone Else's Priorities (20h)

**What you're understanding and why it matters:** This is the definitional mid-level skill and it is
structurally invisible to a solo builder. When you build your own ideas you are your own product
manager: scope is infinitely elastic, nothing is ever late, nothing is ever cut, and no one is ever
waiting on you. The failure mode is precise and common — a technically fine hire who disappears for
nine days on something that should have been scoped to two, delivers more than was asked, and gets read
as "not ramping." It is also what most "he's great but not mid-level yet" feedback actually means.

**Core concepts:** Turning a vague request into clarifying questions; decomposing a feature into 1–2
day independently shippable slices; giving an estimate and naming its riskiest assumption;
renegotiating when the estimate is wrong; proposing the cheap version of an expensive ask.

**The artifact:** Three scoping docs written against real open issues in **cal.com** and **Hono** —
clarifying questions, slice decomposition, estimate with named risk, and an explicit "here is the 20%
version if you need it Thursday." Then build one of the three and log actual-vs-estimate with a written
post-mortem on where the estimate broke. **The estimate log is the artifact; three data points of being
wrong is what starts calibration.**

**Mastery gate:** Handed a vague two-sentence ticket cold, produce the clarifying questions and a
sliced plan in fifteen minutes, and defend what you would cut if the deadline halved.

---

# LAYER 3 — The AI Production Layer

*240 hours. The hiring differentiator, deliberately gated behind Layers 1–2 — because an eval harness
built by someone who cannot write a concurrent data pipeline is a dashboard, not a skill.*

## M11 — The Model as a Function (30h)

**What you're understanding and why it matters:** How language models actually work, so you engineer
with them rather than superstitiously. Also available as a morale spike during the months 3–6
abandonment window — it is 30 cheap, satisfying hours and depends only on M3.

**Core concepts:**
- **Tokens as the unit of everything**, and why Claude's tokenizer is not inspectable locally
- **The messages array, roles, statelessness**, and what a system prompt mechanically is — text
  rendered in a specific position of the same token stream. The weighting is a training artifact, not
  an enforcement mechanism. The corollary you must internalize: text inside a user-role or tool-result
  message can be forged by anything that writes to user-visible input. **That is exactly what prompt
  injection is.**
- **Sampling, and why identical prompts give different output**
- **The context window**: what fills it, what degrades before it fills. The API is stateless — you are
  resending the entire history every turn, so conversation cost grows quadratically in length.
- **Output control**: `max_tokens`, the full `stop_reason` taxonomy
- **Pricing mechanics**: input/output asymmetry, and prompt caching as a byte-exact prefix match
- **Model selection** across the current lineup; streaming as a production transport
- **The structural boundaries** — what these models cannot do no matter the prompt

**The artifact:** A `model-probe` CLI that: compares `count_tokens` against your own assumptions across
five text types; proves a cache hit from the usage meters and prints the cost delta; produces every
`stop_reason` deliberately; and demonstrates a structured-output schema rejecting a malformed
generation. Plus a one-page written list of every 2023–2025 pattern your probe proved dead, with the
400 response pasted in.

**Mastery gate:** Price a single request to the cent from its usage object alone. Point at the exact
byte that broke a cache prefix. Explain why a "confidence score" the model emits is generated text, not
a probability, and what feature designs that kills.

**What most people get wrong:**
- Using tiktoken or the chars/4 rule to budget Claude tokens. tiktoken is OpenAI's tokenizer.
- Treating `max_tokens` as a cost cap. It is an enforced ceiling the model is not aware of, so it
  truncates mid-thought rather than finishing early.
- Assuming HTTP 200 means usable content — a safety refusal returns 200 with `stop_reason: "refusal"`
  and an empty content array.
- Interpolating anything dynamic near the front of the system prompt. Caching is a byte-exact prefix
  match; one changed byte at position N invalidates everything after it, and **the failure is
  completely silent** — requests still succeed, the bill is just higher.
- Optimizing input tokens while ignoring that output tokens cost several times more.
- **Asking the model to rate its own confidence and routing on that number.** It looks like a
  probability, behaves like a vibe, and is the single most common way self-taught engineers ship an
  unreliable AI feature.

> **Currency warning.** This module's specifics — model IDs, parameter availability, prices, caching
> TTLs — move on a monthly cadence and several 2023–2025 patterns now return HTTP 400. Verify against
> primary API documentation at the moment you build it. Do not trust this document, a blog post, or a
> model's memory for any of it.

## M12 — Ingestion: Real Documents Into a Corpus (25h)

**What you're understanding and why it matters:** The first mile of most real AI products, and a seam
the research corpus left to nobody — retrieval research opens at the embedding step, assuming a corpus
that already exists as text. **Extraction quality dominates retrieval quality by a wide margin.** No
amount of hybrid search and reranking recovers a table that was flattened into word soup at ingestion.

**Core concepts:** Signed upload URLs to object storage; size and type limits; text-layer extraction vs
OCR for scans; tables and multi-column layout; **per-page provenance so a citation can point somewhere
real**; ingestion as an async job with progress and partial failure; re-ingestion when the parser improves.

**The artifact:** An ingestion pipeline that accepts a real signed-URL upload and handles a digital PDF,
a scanned PDF, and a `.docx`; preserves page and section provenance on every chunk; runs as a resumable
job with visible progress and per-file failure; and is scored against **twenty hand-labeled documents**.

**Mastery gate:** State what percentage of tables your parser destroys, with the evidence. Open the app
and show a citation that resolves to the correct page of the correct source document.

## M13 — Evals: The One Harness (50h)

**What you're understanding and why it matters:** This is the differentiator — validated, not assumed.
It is also the concept the research corpus taught six separate times in four incompatible substrates.
**You build it once, here, and every later module consumes it.**

**Core concepts:**
- **Trace capture**: instrumenting every LLM call so the failure is reconstructable later
- **Error analysis**: open coding → axial coding, producing a named failure taxonomy with frequencies
- **What an eval actually is** — a dataset plus a runner — and why it is not a test
- **Assertion-based graders** before any model grades anything
- **LLM-as-judge calibrated against human labels**, reported as TPR/TNR
- **Structured output and schema validation** as a reliability mechanism — and its limit
- **Retries and fallback chains**: when a retry helps vs masks a defect
- **Regression evals in CI**, online sampling, and the economics of how much eval is enough
- **Prompt and model lifecycle**: versioning, pinned model IDs, rollback, and the forced migration

**The artifact:** ONE harness on your own stack — Postgres plus a TypeScript runner, no platform:
100 hand-read and labeled traces, a named failure taxonomy with counts, assertion graders, a judge with
a **measured confusion matrix** against your labels, and a GitHub Actions job that blocks a PR on
regression. Then: prompts versioned with pinned model IDs, and **a deliberate migration of the feature
to a different model family gated only by your own eval set**, written up as a regression table
including what you could not recover.

**Mastery gate:** Handed a prompt change and your golden set, return ship/no-ship with a number and a
bootstrap confidence interval. State your judge's true-positive and true-negative rate from memory, and
name the failure mode that off-the-shelf metrics would have hidden.

**What most people get wrong:**
- **Reporting accuracy instead of TPR/TNR.** When the failure mode is rare, a judge that always says
  "pass" scores 92% accurate and is worthless. This single mistake invalidates more eval work than
  anything else.
- Reaching for generic categories — "hallucination," "unhelpful," "incoherent." These are unactionable.
  "Calendar Scheduling Failure" is a fix; "poor coherence" is a shrug.
- Delegating the labeling to an LLM from the start. The LLM is for clustering notes you already wrote.
  People discover what they actually care about *through* the act of labeling.
- Building the eval set from cases you invented rather than cases that actually failed. An imagined set
  measures imagination.
- Having the runner re-implement the model call "to keep the eval clean" — then the eval measures a
  different system than the one that ships.
- Using the same model as both generator and judge, which invites self-preference.
- Believing schema enforcement solved reliability. It solves the shape, not the content.

## M14 — Retrieval You Actually Measured (30h)

**What you're understanding and why it matters:** Grounding a model in your own data — and knowing
which of the widely-taught RAG techniques actually buy you anything on *your* corpus. **Build the
measuring instrument before the retriever.**

**Core concepts:** What an embedding actually is and the things it structurally cannot do; pgvector
HNSW parameters, the filtering trap, and the recall/latency curve; chunking — why fixed-size is the
right baseline and what contextual retrieval actually fixes; two-stage retrieval (hybrid lexical +
semantic, fused with RRF, then a cross-encoder reranker); agentic retrieval; **grounding and citation
verification — proving the answer came from the retrieved text**; when to skip retrieval entirely.

**The artifact:** A retrieval system over M12's corpus with a measured **recall@k baseline**, then
three interventions each measured independently (hybrid+RRF, reranker, contextual retrieval), then
span-level citation verification. A written table of what each intervention bought, what it cost in
latency and dollars, **and which one did nothing.**

**Mastery gate:** State your recall@10 before and after, name the intervention that did not help, and
defend staying on pgvector instead of a dedicated vector store using your own numbers.

**What most people get wrong:**
- Evaluating end-to-end with an LLM judge scoring answer quality. **Answer quality hides retrieval
  failure** — a strong model answers correctly from pretraining even when retrieval returned garbage.
- Generating the golden set entirely with an LLM. Synthetic queries are written *from* the chunk, so
  they leak its vocabulary and every retriever scores artificially high. Hand-write at least half.
- Treating HNSW as exact search, and running a filtered vector query without realizing the WHERE clause
  is applied after the index has already stopped searching.
- Reranking too few candidates. A reranker can only reorder what stage one handed it — if the right
  chunk is at rank 73 and you rerank the top 10, the reranker is pure added latency.
- Skipping lexical search entirely, which is exactly why queries containing an error code, a function
  name, or a person's name fail on a pure-vector system.
- Asking the model to "include citations like [1]" and trusting the output. Free-text citation markers
  are generated text. If citations aren't machine-checkable against exact offsets, you have the
  appearance of grounding, not grounding.

## M15 — Agents and Tool Use (45h)

**Core concepts:** The agent loop at the wire-format level, no framework; **writing a tool definition
the model can actually use**; orchestration shape — reactive loop vs plan-then-execute, and when a
second agent is overkill; state, memory, and durability across steps; failure taxonomy and validation
between steps; loop detection and cost runaway prevention; human-in-the-loop checkpoints for
irreversible actions; MCP — build one server, consume several; trajectory tracing and silent-failure detection.

**The artifact:** A hand-rolled agent loop with a budget governor that hard-stops, loop detection, an
approval gate on irreversible actions, durable state that survives a process restart, and replayable
trajectory traces. Then one small MCP server. Then the same agent re-expressed on the SDK's tool runner
with per-turn hooks, plus a written comparison of what the hooks bought and what they hid.

**Mastery gate:** Kill the process mid-run and resume it correctly. Replay a failed trajectory and name
the step that caused the failure. State your hard cost ceiling and demonstrate it holding under an
adversarial input designed to loop.

**What most people get wrong:**
- Treating the message array as a chat log of strings — appending the assistant's text and dropping the
  `tool_use` blocks, which either 400s or silently produces an agent that re-calls the same tool forever.
- Writing the tool description as API documentation instead of decision-support for a model choosing
  among eight tools. Error paths that return raw exception text teach the model nothing and cause it to
  retry the identical failing call.
- Adding agents to solve what is actually a bad tool definition or a context-management problem.
- Persisting after the step completes rather than bracketing the side effect, which makes "resume" a
  duplicate-execution machine. `book_flight()` twice is two bookings.
- Only capping iteration count. A single iteration can be expensive, and an agent alternating between
  two tools forever never repeats a call at lag-1.
- Denying an action by silently dropping the tool call, leaving a dangling `tool_use` with no
  `tool_result` — a malformed conversation.
- Bolting on five public MCP servers, flooding context with dozens of mediocre tool schemas and
  measurably degrading tool selection.

## M16 — Cost, Metering, and Unit Economics (30h)

**What you're understanding and why it matters:** AI features run at materially lower gross margin than
classic SaaS, which is exactly why metering and quota work is one of the most common backend tickets at
any company shipping AI — and the ticket most likely to land on the new engineer because it's
considered plumbing. It's also the perfect demonstration of everything already taught: an atomic
decrement under concurrency (M2), an idempotent webhook consumer (M3), a circuit breaker, an honest
failure UI (M18).

**Core concepts:** The `usage` object and the four-number cost of a single request; prompt caching
mechanics, breakpoint placement, and verifying from the meters; measuring latency properly —
percentiles, and where time actually goes; streaming as a perceived-latency fix, not a real one; model
routing and why the obvious cascade often loses; the async tier; cost attribution per feature *and per
user*; budget alerts and circuit breakers; **unit economics — telling early whether a feature can ever
be profitable**; and the product-analytics question: is it used, does it improve the thing it was built
to improve, is it worth its cost.

**The artifact:** A per-user credit ledger in your existing Postgres with an atomic decrement **proven
correct by concurrent hammering** (balance never goes negative), a Stripe test-mode subscription with
an idempotent webhook consumer that survives replay, a working 402/upgrade path in the UI, a circuit
breaker on spend, and one weekly SQL report joining usage, quality score, and cost into **one line per
active user**.

**Mastery gate:** State your flagship's cost per active user per month, its p50/p95/p99 latency
decomposed into network, time-to-first-token, and generation, and whether you would keep the feature —
each backed by the query that produced it.

**What most people get wrong:**
- Reporting an average, and computing percentiles by averaging per-minute percentiles. Percentiles do
  not average.
- Measuring time-to-first-*byte* instead of time-to-first-*token*. They can be seconds apart, and the
  entire gap is where prefill lives.
- Routing on per-token price instead of cost per completed task. A cheap call that needs three retries
  is not cheap.
- Building the alert without the breaker — an alert at 3am tells you about money already spent.
- Running the budget check *after* the API call.
- Attributing cost per feature but not per user, which hides the distribution entirely when AI cost per
  user is extremely skewed and the mean is meaningless.

## M17 — Security and the Trust Boundary (30h)

**Core concepts:** Trust boundaries and secrets — what runs where, and why an API key in the frontend
is the classic AI-app disaster; authentication vs authorization, and broken access control as the bug
that actually ships; RLS as a design skill; injection, XSS, CSRF, SSRF **at working depth, by
exploiting them**; dependency and supply-chain risk; **prompt injection — direct and indirect — and why
it is contained rather than fixed**; the lethal trifecta of private data + untrusted content +
exfiltration ability; tool-use permission design and excessive agency; **treating model output as
untrusted input**; PII, prompt and log leakage, and the data obligations your employer will hand you.

**The artifact:** An attack-then-fix log against a deliberately vulnerable copy of your own app: four
exploits you ran yourself, each with the fix and a test. A tool-permission design for M15's agent with a
written blast-radius analysis per tool. A one-page **data-flow document** naming every boundary customer
data crosses, every third party that sees it, and the retention setting at each — plus a PII redaction
step actually implemented in the M6 trace pipeline and proven by a test that feeds it synthetic PII.

> Note the tension this resolves: M6 and M13 teach you to log everything about an LLM call. This module
> is where that gets reconciled with not shipping customer PII to a third-party observability platform.

**Mastery gate:** Given your own agent, name every irreversible action and defend the containment
architecture **without ever saying "I tell the model to ignore injected instructions."** State exactly
what customer data leaves your perimeter and where it lands.

**What most people get wrong:**
- Believing code is server-side because of where the file lives. A single import chain reaching a
  `'use client'` component drags a module into the browser.
- Treating a leaked key as fixed by deleting the commit. The key is compromised the moment it was
  pushed; rotation is the only fix.
- Trusting an `organizationId` or `userId` sent in the request body. Hiding the admin button in the UI
  and calling that access control.
- `USING (true)`, or using the service-role key in an Edge Function "because RLS was in the way."
- Believing a classifier, guardrail product, or delimiter scheme solves prompt injection. Assuming
  indirect injection is exotic — it is the common case: a web page, a PDF, a calendar invite, a GitHub
  issue, a row another user can write to.
- Giving the agent an admin token "temporarily," which converts every injection into total compromise.
- A confirmation step whose summary text the model itself generates. An injected model lies in the
  confirmation.

---

# LAYER 4 — Product and Platform

*185 hours. The surfaces the AI work sits on and ships through. Python sits here deliberately — late,
so you port rigor you already have rather than acquiring two languages you write working-but-incorrect
code in.*

## M18 — Frontend for AI Interfaces (45h)

**Cut from 140h to 45h** — you already ship Next.js, and by the market evidence the missing 60% is
backend and production operations, not React. What remains is narrow and load-bearing.

**Core concepts:** The React rendering model — what actually causes a re-render; effects and their four
failure modes (infinite loops, stale closures, races, missing cleanup); server vs client components and
the current Next.js caching model; forms, mutations, optimistic UI with shared Zod schemas; **then the
AI-specific layer**: `useChat` on top of the stream protocol you already wrote in M3; cancellation and
abort propagation; resumable streams; latency choreography for 10-second-plus operations; conversation
scroll behavior; and **designing for output that is sometimes wrong** — tool-call UI, approval gates,
citations, uncertainty, honest failure states.

**The artifact:** The flagship's chat surface rebuilt on **your own M3 stream protocol**: a stop button
that provably stops upstream billing, a refresh mid-generation that resumes rather than losing the
answer, tool calls surfaced with a working approval gate wired to M15, citations that link to M12's page
provenance, and failure states that tell the truth about what went wrong.

**Mastery gate:** Explain the byte path from model token to painted DOM node with no notes. Demonstrate
refresh-mid-generation recovery live. Show the stop button's effect in the cost meter.

**What most people get wrong:**
- Treating `useState` as a variable store and keeping it in sync with `useEffect` — `filteredItems`,
  `fullName`, `isValid`, `totalPrice` all held in state instead of computed during render.
- Adding and removing dependencies until the lint rule goes quiet.
- Putting `'use client'` at the top of the root layout, converting the entire tree to client components.
- Assuming one `read()` chunk equals one complete SSE event — the bug that silently corrupts output
  only under load.
- `setState(s => s + delta)` on every token at 60/sec, re-rendering the whole markdown tree per token,
  then blaming React.
- Conflating client disconnect with user cancellation, so a refresh silently kills work the user wanted
  kept — or the inverse, a stop button that only stops the UI while the server keeps generating and charging.
- `aria-live="polite"` on the streaming container, which makes screen readers re-read the entire
  growing message over and over.
- An approval button that appears *after* the tool has already run. That is theatre, not a gate.

## M19 — System Design and the Design Doc (30h)

**What you're understanding and why it matters:** At most companies the forward-looking design doc is
*the* mid-level artifact, and it is the single highest-leverage move available to an engineer with no
credential — it is public, durable, and evaluated purely on the quality of thinking. Writing down why
you did something *after* you did it never surfaces the option you failed to consider, which is exactly
what review-before-implementation is for.

**Core concepts:** The request lifecycle end to end; the client-server trust boundary; statelessness and
why a shared counter is the hard part; the serverless execution model measured rather than
blog-post-quoted; **moving slow work off the request path — building a real queue**; caching in three
layers and the invalidation for each; graceful degradation, backpressure, and what happens when the
model is down.

**The artifact:** A Postgres-backed durable job queue: row locking with `SELECT ... FOR UPDATE SKIP
LOCKED`, at-least-once delivery, idempotent consumers reusing M3's dedupe pattern, backpressure, and a
dead-letter path. **It is preceded by a one-page design doc with two rejected options, reviewed and
pushed back on by a real reader before any code exists.** Keep both the proposed and the built version;
the delta is the interview material.

**Mastery gate:** Forty-five minutes at a whiteboard: one bounded AI system end to end including the
observability and the failure path, surviving three follow-ups past the script. Plus: "here is where my
design was wrong and how I found out."

**What most people get wrong:**
- Treating "server" and "client" as a lint rule rather than two physically different computers.
- Assuming "serverless means stateless so I'm fine." Instances are reused and handle concurrent
  invocations in the same process, so module-level state persists — sometimes, unpredictably, which is
  worse than never persisting.
- Starting with a hosted queue and never learning the mechanism, which makes every operational question
  unanswerable.
- Designing the queue and forgetting the read path. Enqueueing is easy; how the client learns the job
  finished is three different products.
- Caching the final LLM response keyed on the user's raw question — almost never hits, and leaks across
  users when it does. The high-value caching is upstream.
- Retrying into an outage. A 429 is telling you to send less traffic.
- Reaching for Redis or Kafka in minute three of a design interview, before anyone established the
  read/write ratio. The mid-level rubric rewards thoughtful simplification.

## M20 — Deployment, CI/CD, and Operating It (40h)

**Core concepts:** Environments and configuration as a first-class thing; secrets across environments
and short-lived credentials instead of stored keys; a CI pipeline you own — what gates a merge and what
it costs; **deploy ≠ release** — preview deploys, promote, instant rollback, feature flags; **database
migrations inside a deploy pipeline (expand/contract), where real outages come from**; health checks,
SLOs, and alerting that pages a human only when it should; exactly enough Docker and Linux to not be
helpless, and not one hour more.

**The artifact:** Your flagship's full pipeline: OIDC secrets with no stored keys, required checks
including **the M13 eval gate**, a feature-flagged release, a rollback rehearsed under a timer, an
expand/contract migration run through the pipeline while the load generator is firing, and one burn-rate
alert that fired for a real reason. Plus one dockerized deploy to a real cloud, torn down the same day,
with notes.

**Mastery gate:** Roll back a bad deploy in under five minutes while narrating each step. Explain, with
a specific lock type, why a naive migration takes a site down and why yours does not.

**What most people get wrong:**
- Treating `git revert` as the rollback strategy — it requires a full rebuild while the site is broken,
  and does nothing about the schema change or the corrupted rows the bad version already wrote.
- Running migrations as part of application boot, so every instance races to apply them.
- Assuming `NEXT_PUBLIC_` means "for the frontend" rather than "baked into the public bundle, forever,
  at build time."
- Putting production secrets into preview environments, so any PR — including from a fork — can
  exfiltrate them.
- A single `/health` endpoint used for both liveness and readiness.
- Going down the Kubernetes rabbit hole after Docker clicks.
- Leaving the practice cloud stack running. An idle managed database and a NAT gateway are the classic
  surprise bill.

## M21 — Python as a Second Production Language (50h)

**The strategic call, stated plainly:** Go deep in TypeScript first, then port the rigor. Your gap is a
*reasoning* gap, not a language-count gap — learning Python first yields two languages you write
working-but-incorrect code in. Fix correctness in the language you already think in; the second
language then takes weeks instead of months.

**This is the curriculum's biggest open bet.** One researcher found Python in the large majority of
AI-engineer postings and argued for it as a co-primary. Another found that TS-first is strictly correct
because your shipped work only counts as evidence in the TS-friendly job family. It is resolved in
favor of TS-first — **and the monthly re-plan exists to catch it if your actual funnel proves otherwise.**

**Core concepts:** Environments and dependencies on current tooling; Python's actual semantics where
they differ from TypeScript — names vs values, mutability, LEGB scoping, truthiness, iterators and
generators, dunder methods; pytest as the testing substrate, including faking the LLM client; type hints
and a real type checker in CI; **pydantic as the runtime validation boundary for AI output**; the
Anthropic Python SDK; **asyncio and the blocking-call trap — a concurrency model that is not
JavaScript's**; FastAPI with typed request/response models and streaming responses.

**The artifact:** One of your TypeScript services ported to FastAPI + pydantic with typed
request/response models, streaming responses, a pytest suite that fakes the model client, and a type
checker green in CI — plus a written diff of what the two runtimes actually do differently, with **a
reproduction of a blocking call freezing the asyncio loop and its fix**.

**Mastery gate:** Open an unfamiliar file in a real Python OSS project cold and explain what it does out
loud. Then add a typed FastAPI route with a pydantic model to a Python service you did not write, and
its test.

**What most people get wrong:**
- Writing TypeScript with Python syntax: classes everywhere, raw `dict` passed around instead of models,
  no type hints, camelCase. Reviewers read that instantly.
- Assuming Python's `async` is JavaScript's. Using a sync HTTP client instead of an async one, a sync DB
  session in an async handler, `time.sleep` instead of `asyncio.sleep`. All compile, all pass local
  testing with one user.
- Firing unbounded concurrency with `gather(*[...])` — works on 10 items in dev, rate-limited or OOM on
  5,000 in prod.
- Calling the real model API inside unit tests. The LLM belongs in the eval suite, not the unit suite.
  Conflating the two is the tell.
- Assuming pydantic is strict by default. It coerces unless told otherwise, so a validator passing does
  not mean the model got it right.

## M22 — Third-Party Integration as a Consumer (20h)

**Why it matters:** A large share of AI-product work is "connect to the customer's data source and do
something with it," and the failure modes are specific and unintuitive.

**Core concepts:** OAuth flows as a consumer; vendor sandboxes; encrypted per-tenant credential storage;
token refresh on the provider's schedule; scopes granted for v1 being insufficient for v2 (so every
existing user must re-consent); revoked grants surfacing as a 401 in a background job at 3am rather than
in a browser; vendor outages.

**The artifact:** A real Slack or Google OAuth connection in the flagship: encrypted per-user token
storage, automatic refresh, a revocation-recovery path that re-prompts the user instead of failing
silently, and a deliberate test where you revoke access in the provider's own UI and show the app
degrading honestly.

**Mastery gate:** Draw the token lifecycle from consent to revocation and name exactly what happens when
a refresh token expires inside a background job at 3am.

---

# LAYER 5 — The Market

*90 hours, down from the corpus's 650 — because a quarter of a curriculum spent not writing code is the
largest single waste in it. These are the structured pieces; continuous contact with the market is a
parallel track that starts on M0's date.*

## M23 — Target Teardown, Comp, and the Terms (12h)

**Why this is 12 hours and not 260:** The "job market research" dimension's nine topics were a duplicate
index of the technical curriculum with a price tag attached. What actually belongs here is an afternoon
of reading postings — plus one thing nobody else covered at all.

**The thing nobody covered:** compensation, offer structure, and employment classification. Remote roles
at the entry band are disproportionately offered as **1099 contract**: no benefits, no payroll tax
withholding, quarterly estimated taxes, no unemployment insurance, and a headline number that looks ~20%
higher than an equivalent W2 salary while being materially worse. A self-taught candidate with no
credential and no peer network is the single most likely person to accept the first number and the first
structure offered. **One under-negotiated or misclassified offer costs more in year one than every hour
of this curriculum is worth, and it is a certainty rather than a risk.**

**The artifact:** A one-page requirement-to-evidence map built from twenty real current postings **with
the geography, overlap, and citizenship filters already applied**; a comp floor and target with the
postings that justify them; a spreadsheet modeling the same headline number as W2 vs 1099 with
self-employment tax, health insurance, and unpaid time off; and a negotiation script rehearsed out loud
and recorded.

**Mastery gate:** State your floor, your target, and your walk-away without hedging, and explain the
W2-versus-1099 delta as a number you computed yourself. **This happens before the first application, not
after the first offer.**

**What most people get wrong:** Treating "remote" as one category. "Remote (US only)," "remote in 4
timezones," and "remote-first, quarterly onsite" are different jobs. Many postings require 4+ hours of
overlap with a specific timezone, and some are region-locked for payroll reasons — a silent funnel
filter you must check *before* applying.

## M24 — The Flagship's Evidence Layer (25h)

**The artifact:** Four pinned repos; one flagship README carrying **the eval numbers including the
failing v1**; a decision log of the five choices that mattered and why; a resume that maps each claim to
a repo; and one public write-up of a measurement you made.

**Mastery gate:** A stranger reads the README and can state what the system does, what it costs per
user, and how good it is — **without asking you a single question.**

**What most people get wrong:**
- Writing the README as a feature list ("Built with Next.js, Supabase, Tailwind") instead of a product
  spec plus decision record. The stack list is the least interesting thing in the repo and it is what
  90% of portfolios lead with.
- **Hiding the v1 numbers because they were bad.** The improvement delta *is* the evidence of
  engineering — a single good number could have been luck.
- Writing tutorials that duplicate a thousand existing posts. The convincing genre is a specific,
  numbered account of something that went wrong in your own system.
- A skills list of 22 technologies. Six you can be grilled on reads as competence; 22 reads as tourism.
  And do not put "Prompt Engineering" on it.
- AI auto-apply tools and 200-application blasts — increasingly detected and auto-rejected. Always find
  the human.

## M25 — Interview Performance (45h)

**Scheduled as the last eight weeks, not as a parallel hum.**

**Core concepts:** The surviving un-assisted coding round — thinking out loud under a clock with no
tooling; reading and debugging an unfamiliar multi-file codebase from a failing test; **being scored on
how you drive an AI assistant, because the transcript gets read**; shipping a scoped PR into a foreign
repo and defending the ship/no-ship call; mid-level system design in 45 minutes; the AI-feature take-home
and the cold defense that follows.

**The artifact:** A defense pack — a recorded ten-minute narrated walkthrough of the flagship in
**decision-language, not feature-language**; a log of 40 narrated problems solved cold; three timed
foreign-repo bug fixes with the assistant transcript attached and annotated; and two recorded mock
defenses with a real person who pushes back.

**Mastery gate:** Survive three follow-ups past the script on any artifact you built. Solve an unseen
medium out loud in 25 minutes with autocomplete disabled. Watch back one assistant transcript and name
where you delegated something you should have verified.

**What most people get wrong:**
- Practicing in your own IDE with autocomplete on and the assistant one tab away — training a motion you
  will not have in the room.
- Barreling into typing without clarifying the problem. Interviewers call this out by name as a reject
  signal, and it reads as exactly the pattern of someone used to a model filling in the gaps.
- Editing the test to make it pass, or "fixing" by adding a guard clause that suppresses the symptom.
  Instant fail.
- Framing your project around tool names. "What would you do differently" is a test of honest depth — a
  candidate who says "nothing, it's solid" scores worse than one who names a real limitation.
- Blowing the take-home timebox to gold-plate the UI while shipping zero evaluation, which inverts the
  actual scoring. The strong README says what you deliberately did **not** build and why.

## M26 — The First 90 Days (8h)

**Why it exists:** Self-taught plus remote is the highest-risk combination for silent struggle, and
silent struggle is how new hires get let go at month three — not for incompetence, but for being stuck
for two days on something a teammate would have unblocked in five minutes.

**The unwritten norm nobody writes down:** struggle alone for roughly 30 minutes, then ask publicly in a
channel with what you tried, what you expected, what happened, and your current best hypothesis. That
format is how you demonstrate competence *while* asking for help rather than in spite of it.

**The artifact:** A 30/60/90 plan filled against a real posting with week-one manager questions written
out; a reusable asking-for-help template **practiced for real by posting three genuine questions in the
Discord or Slack of an OSS project you're contributing to**, with the responses kept; an org map of that
project inferred from `git blame` and `log`; and a handoff note on real in-progress work good enough for
a stranger to continue.

**Mastery gate:** State your own struggle threshold and reproduce the ask format from memory. Record
yourself pairing with another person for 45 minutes on a real bug in an unfamiliar repo, narrating
throughout, and watch it back.

---

# The Parallel Tracks

These run continuously alongside modules. They are not modules and have no completion date.

**1. Job search — a permanent 20% track from M0's date (target ~month 5).** Ten researched applications
a month where you can name the product and a human, not two hundred generated ones. The purpose is not
to get hired in month five; it is that ten real interviews re-rank the remaining curriculum more
accurately than any researcher can.

**2. Open-source PRs — one substantive merged PR per month from the end of M7.** Same repos, same skill,
same afternoons. Three substantive merged PRs beat thirty cosmetic ones. No docs typos, no dependency
bumps, no Hacktoberfest. Pick something you actually use, where your bug report is genuinely useful —
not a famous repo with a 400-deep PR queue.

**3. The dependency spiral.** Every module's capstone imports an earlier one's. Zero hours. The entire
answer to knowledge decay.

**4. Weekly cold re-build — one per week, 45 minutes, original repo closed.** Pick an artifact from
three-to-eight weeks ago and rebuild its core from an empty file. Score what you could not produce.
**This is the only instrument that distinguishes "I can make this work" from "I understand this."**
Tracked in a markdown checklist, not a CLI tool you build.

**5. A standing reviewer relationship — secured in M0, used from M8.** A real human (second-best: a
dedicated agent instance with a written reviewer brief) who pushes back on every capstone. **M8, M10,
M19, and M26 all silently assume this person exists.** If not recruited in month one, four modules
degrade into self-assessment by the one person least able to grade it.

**6. Agent-assisted workflow discipline.** During M1–M7: **interrogate, never author.** AI answers
conceptual questions with `file:line` citations you verify, and writes none of the code you're trying to
learn from. From M9 onward the delegation policy is in force and the defect log keeps running.

**7. Writing — one short public piece per completed layer.** Five pieces total, each about something you
*measured*, not something you read. Feeds M24 at nearly zero marginal cost and is the cheapest credential
available to someone with no degree.

**8. Monthly re-plan ritual — two hours, under M0's authority.** Interview feedback, rejection reasons,
and actual-vs-estimate data from M10 re-order the remaining modules. This is the mechanism that catches
a wrong bet.

---

# The Cut List

What was deliberately removed, and why. **This list is itself a hiring signal** — "I know that exists,
here is when I'd reach for it, I haven't needed it yet" is a better interview answer than a shallow artifact.

| Cut | Why |
|---|---|
| **Model training in every form** — fine-tuning, LoRA, PyTorch, backprop, transformer internals, nanoGPT | The single biggest time sink available, and it produces zero hireable signal for this job family. |
| **Algorithm theater** — linked lists, tree rotations, DP past recognizing memoization, implementing sorts, bit manipulation, tries, graphs/BFS/toposort, competitive programming | The interview subset survives, timeboxed, inside M25. |
| **Distributed systems theory & platform engineering** — CAP, Raft/Paxos, sharding, Kafka, Kubernetes, service meshes, microservices, gRPC, Terraform as a practice, self-hosted Prometheus/Grafana | Nobody hires a mid-level AI product engineer to do any of this, and each is an 80-hour displacement of something you will own. |
| **TypeScript exotica** — type-level metaprogramming, decorators, namespaces, RxJS, Effect-TS/fp-ts, bundler internals | Read these; authoring them is a library-author skill that makes you the person whose PRs nobody can review. |
| **The Python data-science slice** — numpy, pandas mastery, scikit-learn, notebooks-as-primary-workflow, Django/Flask, conda/poetry/pyenv | Different job family. |
| **Framework tourism** — deep LangChain, LlamaIndex, CrewAI, AutoGen, AutoGPT-style autonomy, and *most tempting of all*, building your own agent framework / eval platform / observability dashboard | Each is a way to produce a worse version of something that exists while avoiding the labeling and debugging that actually teach. |
| **The advanced-RAG genre** — GraphRAG, RAPTOR, self-RAG, CRAG, FLARE, standalone vector DBs, fine-tuned embeddings, implementing HNSW, chasing MTEB | Hybrid + rerank + a measuring instrument covers the ground. |
| **Eval anti-patterns** — public benchmarks (MMLU, HumanEval, GPQA), BLEU/ROUGE/BERTScore, off-the-shelf RAG metric bundles, 1–5 Likert judge rubrics, adopting a platform before you have 50 real cases | Each produces a number that moves without telling you what to fix. |
| **Frontend: Redux, CSS-in-JS, memoization drills, building a component library, a second framework, React Native, Canvas/WebGL, micro-frontends** | Cut 140h → 45h. |
| **Certifications of every kind** | Across 14 full postings sampled, not one named an AI certification. |
| **Learn-on-demand appendix (~55h)** — Playwright as a unit, feature flags as study, webhook signature verification as its own unit, rate limiting as its own unit, the batch tier, model routing before you have cost data, GraphQL, gRPC, OAuth *provider* implementation, prompt compression, semantic caching, self-hosting open-weights models, vLLM | Each gets one line saying what it is and where to read about it when it comes up. |

---

# A note on APEX itself

The learning-science research read your existing `obsidian.js` and flagged something worth acting on:
**APEX's quiz engine is built almost entirely out of multiple choice.** Recognition memory survives long
after recall is gone, so a 90% MCQ score is compatible with total inability to produce the thing. That
is precisely the illusion this curriculum exists to escape.

The `predict:` fields already in that file are the good part — pre-questions before instruction improve
later learning even when the pre-answer is wrong. The recommendation: **expand `predict:`, demote the
MCQ banks to warm-up only, and make free generation into a blank box the primary interaction.**

Also worth knowing before you wire this in: APEX's current schema
(`{id, sub, phase, title, concept, example, cards, quiz}`) is built for exam prep. This curriculum's
unit is a module with an artifact, a gate, a dependency edge, and an hour budget. It needs a different
shape — `{id, layer, title, hours, dependsOn[], concepts[], artifact, gate, mistakes[]}` — not a
retrofit of the ASVAB one.

---

## Sources and currency

Built from 24 parallel research agents (2.66M tokens, 432 tool calls) with web access, plus empirical
job-posting data, then cut by an adversarial waste critic and a gap critic.

**Fast-moving claims in this document — model IDs, pricing, API parameters, framework version behavior,
tooling defaults — carry a shelf life measured in months.** Verify against primary sources at the moment
you build each module. The fundamentals in Layers 1 and 2 do not move; treat the rest as perishable.
