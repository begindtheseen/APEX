# The Launch Pad

## A curriculum for becoming a hireable remote AI product engineer

**Version 2** — rebuilt after adversarial review. Built from 24 parallel research agents, then attacked
by 10 critics from 10 lenses, then re-cut. The review broke one of the five structural bets this
document was resting on and found a sixth it had never named. Both corrections are on this page.

---

## The honest numbers

| | hours |
|---|---|
| **Module hours** (the 31 modules) | **1,057** |
| **Parallel track hours** (8 tracks, all mandatory) | **~425** |
| **Real total** | **~1,480 focused hours** |

Version 1 of this document said 963 hours. **That was wrong, and it was wrong in the most dangerous
direction.** It excluded the eight parallel tracks — which it simultaneously described as mandatory.
Three critics priced those tracks independently and converged on 350–480 hours. The headline
understated the commitment by roughly 40%.

That matters more than any other correction here, because M0's entire claim to authority is *runway
sets the deadline*. A deadline computed from a number 40% low is not authority. It is a miscalculation
you experience as a felt sense of perpetual lateness somewhere in month nine — which this document
itself names as the mechanism that turns a bad stretch into quitting.

### What ~1,480 hours actually means

- At **18 h/week** → ~21–25 months.
- To finish in **13 months** you need **~25 h/week**, every week, for a year.
- Wall-clock runs 1.3–1.5× focused hours once you count setup, yak-shaving, and re-reading what decayed.

> **This number went up by 58 hours in v2 and I am not hiding that.** The adversarial review produced 25
> improvements beyond the critical fixes — mutation testing, a record-replay model client built once
> instead of four times, inter-annotator agreement, train/test discipline, agent containment, a data
> deletion path, the consent surface, behavioral material. Each earns its place. **Collectively they cost
> 58 hours and the honest thing is to print the new total rather than quietly re-describe the old one.**
>
> If that is too much, the release valve is below — and it is a designed exit, not a failure.

### The release valve

**Track 8 rule: if you are more than six weeks behind for two consecutive months, switch to the
Compressed Spine.** That is the plan working, not the plan failing. It exists so a slow stretch resolves
into a smaller finished program instead of an abandoned large one.

**Numbered cut order**, if you need hours back before that: ① M24 (28h — OAuth is the most
learn-on-demand module here) · ② M23's second half (~20h — if the trip-wire says your funnel accepts
Node) · ③ M20 (down to 25h — the least differentiating module) · ④ M30 (8h — it triggers on your first
onsite anyway). That is ~80 hours without touching anything the differentiator depends on.

**Do not pick a weekly number because it sounds committed. Derive it.** M0 requires you to write down
your employment status and monthly burn first, then publish two timeline variants — employed (~12 h/wk)
and full-time (~35 h/wk) — and take the one that matches your actual life.

### The Compressed Spine — if your runway is under nine months

Do not attempt the full program. The real short path is **364 focused hours**: M0 (22), M1 (67), M2 (45),
M3 (45), M6 (32), M7 (45), M9 (30), M11 (70), M25 (8). That is ~4.7 months at 18 h/week, and it gets you
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

**5. Every module opens with a one-hour verification pass, charged to its existing hours.** Before you
build the artifact, read the **primary sources** for that module's fast-moving claims and write a
`DELTA.md`: *what this document says · what is true now · what I changed.*

> This is the answer to "the space grows every day," and it is the only mechanism here that scales.
> v1 put a currency warning on one module and called the rest fundamentals — then the review found
> stale claims in nine modules, four of them in layers labeled durable. A static document about a
> moving field rots silently. **A per-module verification habit does not**, because it runs at the
> moment you actually need the truth.
>
> Each `DELTA.md` is also interview material. "Here is where the docs I learned from had gone stale and
> how I found out" is a better answer than anything else you can say about currency.

---

## Flow — how this is meant to be read, and what was checked

"Beginner to expert with no confusion points" is a property you can test rather than claim, so it was
tested. Four checks, run against the module data:

**1. Nothing is used before it is explained.** Every cross-module reference was extracted and sorted by
position. 21 of 22 forward references live in `exports` — *"the streaming proxy you are building feeds
M17, M18 and M20"* — which is motivation, not confusion: it tells you why the work matters while you do
it. The one genuine forward dependency (M10 asking you to record an embedding model's dimensionality
because of a ceiling you meet in M16) is now **self-explaining at the point of use**, so the decision is
never blind.

**2. Vocabulary is defined before it is used.** Twenty-four pieces of in-group jargon were traced to the
module that teaches each. Three are used slightly early — *idempotency*, *SSRF*, *blast radius* — and all
three are in Appendix B, which exists precisely because you have no colleagues to ask.

**3. Every module over 30 hours has named checkpoints.** This was the single largest flow defect: the
document required them and only two of sixteen modules had them. All sixteen do now — **91 checkpoints,
averaging 8.4 hours apart.** Each is a sub-goal with its own done-state and each is an explicit
legitimate stopping point in a bad week. Forty hours into a module with no intermediate target is where
people conclude they are lost rather than mid-module.

**4. Every module opens with a win, not a wall.** Checkpoints are ordered easiest-first. M4 opens with a
3-hour 200× speedup before you build the 5M-row rig. M1 — the largest module in the program, and first —
opens with a twenty-minute prediction exercise, and being wrong about the output order is the thing that
motivates the other 66 hours.

**On the shape of the curve.** M1 being both the biggest module and the first one is deliberate and it is
the steepest part of the climb. It is not split, because the material genuinely belongs together and an
artificial boundary would teach you that the runtime is two subjects. It is checkpointed instead. This is
the one place where going slower is going faster, and if you are going to fall behind schedule anywhere,
fall behind here.

---

## Build order

Presented in execution order. Hours are focused hours.

| # | Module | h | dependsOn |
|---|---|---|---|
| **M0** | Scope, Runway, Reviewer, Flagship | 22 | — |
| **M1** | The Runtime, Unframed | 67 | M0 |
| **M2** | The Machine Model: Ten Seams | 45 | M1 |
| **M3** | HTTP, Streaming, and the Wire | 45 | M1, M2 |
| **M4** | The Postgres Underneath Supabase | 61 | M2 |
| **M5** | The Durable Queue | 18 | M3, M4 |
| **M6** | Tests That Fail For The Right Reason | 32 | M1, M4 |
| **M7** | Debugging and Production Observability | 45 | M3, M4, M6 |
| **M8** | Python On-Ramp | 15 | M6 |
| **M9** | The Model as a Function | 30 | M3 |
| **M10** | Ingestion: Real Documents Into a Corpus | 30 | M4, M5 |
| **M11** | Evals: The One Harness (+ Stats Lab) | 70 | M7, M9 |
| | **▲ HARD GATE — flagship live, 2 real users, 100 failure traces** | | |
| **M12** | Reading and Changing Code You Did Not Write | 52 | M5, M6, M7 |
| **M13** | Git, Review, and Code Others Maintain | 44 | M12 |
| **M14** | Working With Coding Agents Professionally | 28 | M12, M13 |
| **M15** | Scoping, Estimating, Someone Else's Priorities | 29 | M12 |
| **M16** | Retrieval You Actually Measured | 44 | M10, M11 |
| **M17** | Agents and Tool Use | 49 | M3, M5, M9, M11 |
| **M18** | Cost, Metering, and Unit Economics | 30 | M9, M11, M3 |
| **M19** | Security and the Trust Boundary | 34 | M1, M4, M7, M17 |
| **M20** | Frontend for AI Interfaces | 40 | M3, M10, M17, M18 |
| **M21** | System Design and the Design Doc | 12 | M5, M7 |
| **M22** | Deployment, CI/CD, and Operating It | 48 | M4, M6, M11 |
| **M23** | Python as a Second Production Language | 35 | M8, M11 |
| **M24** | Third-Party Integration as a Consumer | 28 | M3, M19 |
| **M25** | Comp, Terms, and the Negotiation | 8 | M0 · *trigger: 1 month before applications* |
| **M26** | The Evidence Layer v1 | 8 | M11 · *trigger: application date* |
| **M27** | The Evidence Layer v2 | 17 | M16, M18 · *trigger: after Layer 5* |
| **M28** | Interview Performance | 53 | M12, M26 · *10h forward-loaded to application date* |
| **M29** | Employed Mode | 10 | — · *written pre-hire, executed post-hire* |
| **M30** | The First 90 Days | 8 | — · *trigger: first onsite* |

**The critical path is 453 hours**: `M0 → M1 → M2 → M4 → M6 → M7 → M11 → M17 → M19 → M24`.

That is the longest chain of strict dependencies — the floor on calendar time even if everything else
ran in parallel. **Total hours is the floor on effort; the critical path is the floor on time. They are
different constraints**, and only one of them is fixed by working more hours a week. Everything off that
chain has slack, which is where the Compressed Spine's cuts come from.

*(Computed by `AI_CURRICULUM_API.criticalPath()` in `curriculum-ai.js`, not asserted.)*

**Hire before completion is the modal good outcome, not a failure.** Applications start ~month 5;
Layers 0–3 finish around month 9. A hire at month 7–10 arrives with much of Layers 5–6 undone. That is
the plan *succeeding*. M29 exists because v1 treated it as a footnote and designed every feedback
instrument to terminate on hire day.

---

# LAYER 0 — The Contract

## M0 — Scope, Runway, Reviewer, Flagship (22h) · `dependsOn: —`

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

**10. The cold baseline — as a fraction, not a feeling.** **Write the component checklist first and
freeze it.** Then open an empty file and rebuild the core module of a feature you already shipped, in 45
minutes, original repo closed. Score is *items produced ÷ items listed.* v1 produced no number, so
nothing later could be compared to it. **Re-run the identical exercise at month 6 and month 12.**

**11. The capability inventory — and why this one is not optional.** A dated list of what you have
already shipped, debugged unsupervised, and taught yourself.

> Every other instrument in this document points at deficit. You have no team supplying the incidental
> positive signal an employed engineer gets for free. **The predictable month-eight reading of a
> relentlessly deficit-framed document, with no counterweight, is that the gap is constitutional rather
> than closeable.** It is not — you shipped working products with no one teaching you, which is the
> rarer half of this. Write it down while you still believe it, and re-read it in month eight.

**12. The incident log — zero marginal hours, and it is your entire behavioral interview.** Every time
the reviewer rejects a boundary, a maintainer rewrites your approach, an estimate blows up, or the
game-day partner cannot follow your runbook: **five lines.** Situation · what you believed · what
happened · what you changed.

> By month 12 that is 20+ real stories sourced from real friction with real people. Without it you
> arrive at the behavioral round with 31 modules that were solo, self-scoped, and self-graded — and for
> a candidate with no employment history the behavioral round is weighted *harder*, because there are no
> references to call. M28 rehearses against this log.

**13. The blind-exercise queue (2h).** Find 20 merged bug-fix commits in real repos. **Do not read the
fix commits.** M12 and M28 consume these — `git revert` one, the suite goes red, work the clock, score
against the maintainer's actual merged diff. Real ground truth, no human required, nobody who can leak.

**14. The hardware floor and a 30-minute smoke test.** The artifacts collectively assume a substantial
machine — a 5M-row local Postgres, a container runtime, a load generator, a browser automation stack.
Run all four in week one. **Fail loudly now rather than in month three.**

**15. Two terms this document keeps using, defined by you, with adoptable defaults.**
- **Bad-week minimum:** the smallest thing that still counts as not stopping. Default: *one 45-minute
  cold re-build and one commit.* The minimum exists precisely so the streak never breaks — a missed week
  read as a broken streak is how one bad week becomes quitting.
- **Plateau protocol:** what you do when progress stops feeling like progress. Default: *stop adding new
  material for one week; re-run three cold re-builds from two months ago; if all three score 3, the
  plateau is a measurement artifact and you continue; if any scores below 2, that module re-opens.*
- **Re-entry ritual** — the actual failure point is not the bad week, it is the week after. Default:
  *re-read your own last `DELTA.md`, then do the bad-week minimum twice before resuming normal hours.*

**GATE** — **REFEREE:** the reviewer's trial review is returned in writing; the flagship checklist is
signed line by line; the hardware smoke test passes on all four stacks. **PASS:** all fifteen artifacts
exist; the cold baseline is a **fraction**; you state from memory your weekly hours, runway, application
date, and the Python trip-wire number. **ON FAIL:** M1 does not start. This is the one gate with no
partial credit.

---

# LAYER 1 — The Machine (218h)

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

## M4 — The Postgres Underneath Supabase (61h) · `dependsOn: M2`

Supabase fluency is not Postgres fluency. Every posting sampled lists SQL flat.

> **Open with a 3-hour win, not a 15-hour rig.** One table of 50k rows, one slow query, one EXPLAIN,
> one index, one measured 200× speedup. **See the loop work on day one**, then build the 5M-row rig with
> the purpose already understood. v1 front-loaded environment setup with no visible result at the exact
> start of the abandonment window.

**Checkpoints** (every module over 30h gets them; each is a legitimate stopping point in a bad week):
① the 3-hour win · ② the rig built and seeded · ③ twelve queries with before/after plans ·
④ RLS benchmarked · ⑤ the key rotation.

**Core concepts:** Relational modeling — constraints as the thing that actually enforces invariants.
SQL without an ORM: joins, aggregates, subqueries, CTEs, window functions. Indexes and
`EXPLAIN (ANALYZE, BUFFERS)` — the deliberate slow→fast loop. Transactions, isolation, lost update.
N+1. **Connection pooling and the Vercel+Supabase failure mode.** RLS — correct first, then fast.
Migrations and expand/contract *as a concept*. Plus **2–3h of Docker minimum**, because the local
Supabase stack already requires it.

**Asymptotic complexity, taught here because here it is measurable.** State the complexity of the loop
or query you just wrote, predict where it breaks, measure against the 5M-row dataset, compare prediction
to plan.

> The cut list removes "algorithm theater" — implementations, puzzle practice, graphs and toposort. **It
> does not remove the notation or the reasoning**, and v1 accidentally took Big-O down with it. Big-O is
> the working vocabulary of code review and design discussion, and M12, M13, and M21 all put you on the
> *receiving* end of it.

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

# LAYER 2 — The Craft I (110h)

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

## M6 — Tests That Fail For The Right Reason (32h) · `dependsOn: M1, M4`

**Core concepts:** The pyramid and what each level is for. A unit test that fails for the right reason.
Test doubles and when mocking makes a test worthless. Integration tests against real Postgres including
RLS. CI as a gate. The flakiness budget. **The seam between deterministic shell and probabilistic core.**
Imports M2's fake clock.

**Artifact** `LAB` — one shipped repo from zero tests to a green required check: ~15 unit, 5 integration
against real local Postgres including two RLS policies, in CI as a merge gate, a written flakiness
budget, and the record of one test you deleted for asserting implementation.

**Plus the single most reused fixture in this curriculum, built once here:** a **record-replay model
client** in TypeScript, with record and replay modes, covering a streamed response **with frames
deliberately split mid-frame and mid-multibyte-character** (reusing M2's grapheme case and M3's frame
parser), a tool-use block, and a refusal carrying its `stop_details`.

> **Imported by:** M11 (the zero-cost CI tier), M17 (agent tests), M20 (stream UI tests, which need
> deterministic chunk boundaries to test the split-frame bug M20 itself calls out). v1 built this once,
> in Python, at hour 853, for a service that was a port — while four TypeScript modules needed it first.

**GATE** — **REFEREE:** a **mutation score**, which is a number you cannot argue with, plus bug reports
sourced from **already-closed OSS issues** so the exercise is not self-administered. **PASS:** mutation
score ≥ 70% with a written disposition for every surviving mutant; and on a sourced bug, failing test
first, then fix, explaining why the test would still fail if the fix were wrong in a *different* way.
**ON FAIL:** surviving mutants in code you claimed was covered — the tests assert implementation, not
behavior.

> Mutation testing is the mechanism v1's title promised and did not deliver. "Tests that fail for the
> right reason" needs an instrument that measures whether a test would actually catch a regression.
> Coverage does not do that. Mutation score does.

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

# LAYER 3 — The AI Production Core (130h)

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

> **Page-level provenance cannot verify a span.** A citation has to highlight the exact sentence that
> supports a claim, and character offsets into extracted text are unrecoverable after the fact,
> especially through OCR. v1 required page-level here and span-level in M16; those are incompatible — page-level provenance cannot verify a span, and character offsets into extracted text
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

## M11 — Evals: The One Harness, and the Stats Lab (70h) · `dependsOn: M7, M9` · **owns: evals**

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

**Three things v1 left out, and each is the difference between a harness a team adopts and one they
quietly stop citing:**

**Inter-annotator agreement (~4h).** v1 had you label 100 traces as the sole annotator — so the rubric
encodes one person's discovered preferences and has never survived a second opinion. **Cash in the
standing reviewer:** they independently label 30 of the 100 using *only your written rubric*, with no
conversation first. Compute agreement. Where you disagree, **the rubric gets revised, not the labels**,
and you repeat.

**Train/test discipline, stated once and inherited by M16.** Split every golden set into **dev and test
at creation, before any retriever or grader exists.** All tuning touches dev. Test is opened once, at
gate time, and **the reported number is the test number with the dev–test gap stated alongside.** v1 had
you tune against the same set you then reported — the classic leak, and the reason most self-reported
eval numbers are worthless.

**The CI economics — because this is the most hireable artifact here and the one most likely to be
silently switched off.** Not because you failed to build it, but because it costs real dollars on every
push and red-lights at random. Own all four:
- A **tiered gate**: ~15-case smoke tier on every push; full set nightly and on release.
- **Recorded-fixture mode** (M6's record-replay client) so assertion graders run at **zero API cost** and
  only the judge tier calls the model.
- A **per-run dollar ceiling** printed in the job summary.
- A fail condition stated as **a statistical threshold with its bootstrap CI**, not a pass/fail count.

**Artifact** `EVIDENCE` — ONE harness on your stack, Postgres + a TypeScript runner, no platform:
100 hand-read and labeled traces **(four sessions of 25, with a written interim taxonomy after each —
this is 6–10 hours of the most boring and most valuable work in the curriculum)**, a named failure
taxonomy with counts, assertion graders, a judge with a **measured confusion matrix** against your
labels, and the tiered CI gate above. Then prompts versioned with pinned model IDs, and **a deliberate
migration to a different model family gated only by your own eval set**, written up as a regression
table including what you could not recover. Plus a `stats-lab` `LAB` repo.

**One harness, four datasets.** M10's document-extraction scores, M16's recall@k, and M17's agent
trajectories are **datasets inside these same tables and this same runner** — not their own
measurement substrates. v1 claimed one harness and then described four.

**Trajectory evaluation — added, because "how do you know your agent works" is the first question any
team shipping agents asks.** A step-level grader (was the correct tool called with the correct
arguments) and an outcome-level grader (did the task complete), reported alongside cost and step count
per run. M17 imports this; v1 ended M17 at *captured* traces that were never *scored*.

> **Exported:** the dataset table, assertion graders, and trajectory graders → M16, M17, M22.
> **PII redaction (from M7) is an acceptance criterion here**, not later — otherwise you run
> full-fidelity unredacted traces through four modules for three months.

**GATE** — **REFEREE:** a prompt change supplied by the reviewer, scored against your **held-out test
set** — a number you cannot argue with. **PASS:** return ship/no-ship with a bootstrap CI; state your
judge's TPR and TNR **and your human-to-human agreement rate**; name the criterion that produced the
most disagreement and how you rewrote it; **and show a red check where this gate blocked a PR you
actually wanted to merge.** **ON FAIL:** your judge is uncalibrated — re-label 30 traces and recompute.

> That last clause is not ceremony. **A gate that has never fired is indistinguishable from one that is
> misconfigured.** Keep the red check as evidence.

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

# LAYER 4 — The Craft II (153h)

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

## M13 — Git, Review, and Code Other People Maintain (44h) · `dependsOn: M12`

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

**Artifact** `EVIDENCE` — four pieces to a real reviewer: a recovery-lab log of eight deliberate
disasters, each recovered and explained; **a file you have personally been confused by while editing,
with at least three responsibilities, chosen and justified in writing before you touch it** (v1 said
"a 500-line file," which is a length, not a criterion), restructured behind M12's characterization tests
with a line-item rationale for every boundary moved; every failure path in one feature rewritten to
actionable messages (expected / received / what to do).

**Fourth, and it is the one that actually changes how you are read:** one PR carried through a **full
round trip with at least fifteen comments** — at least two pushed back on with reasoning, and at least
one where you **changed your mind and said so.**

> How you answer review is a larger part of your reputation than the diff. **Silent compliance under a
> senior's disagreement is the exact behavior that reads as not-mid-level** — and so is arguing every
> point. Both are visible in a thread; neither is visible in a merged diff.

**GATE** — **REFEREE:** a real maintainer's review thread. **PASS:** **three review rounds completed,
every comment either addressed or argued in writing, zero structural comments on the final round.**
**ON FAIL:** the structural comments *are* the curriculum — address and resubmit.

> v1 gated on "merged with no structural comments," which conditions your progress on **a stranger's
> inbox.** Gate on what you control; track merges as a lagging metric.

## M14 — Working With Coding Agents Professionally (28h) · `dependsOn: M12, M13`

The original research treated agents exclusively as a threat — in three separate dimensions — and never
once as the throughput standard of the team you are joining. That produces an engineer who is correctly
suspicious and half as fast as everyone around him, measured from week three. Scheduled **after** M12 and
M13 so the interrogate-never-author discipline holds during the period it protects.

**Core concepts:** Writing a repo's agent config so generated code conforms to house conventions.
Decomposing a ticket into agent-sized units with verifiable exit criteria. Reviewing a 400-line diff in
ten minutes by reading test changes and boundaries first. The categories never to delegate — auth,
money, migrations, anything whose boundary you cannot verify. Sandboxing and permission scope. What a run
costs.

**Artifact** `EVIDENCE` — a **defect log** from handing an agent three real tickets in a repo you did
not write, naming for each defect *which earlier module let you catch it*; a one-page written delegation
policy; **a spec-driven slice** — write a specification with explicit acceptance criteria, have an agent
implement against it, and keep a log of every place the spec was underspecified and what the agent did
in the gap.

**And the one v1 was missing entirely: a throughput artifact (~8h).** The module's own thesis is that
being slow is the failure mode — and all three of v1's artifacts were *defensive*. Ship **one
non-trivial flagship feature** — multi-file, with a migration and tests — inside a timebox using agents,
full transcript preserved, **measured against a feature of similar size written by hand**: hours, review
findings, defects reaching production.

> That produces a number you can say out loud, which is what the module's thesis demands. The
> underspecified-spec log is the stronger interview object, though — it is direct evidence of the
> judgment an AI-assisted coding round is scoring.

**GATE** — **REFEREE:** a second agent instance with a **sealed brief written weeks earlier**, planting
**0–3 defects per diff, count blinded, with at least one clean diff.** **PASS:** find the planted
defects across five diffs with false positives scored separately. Plus the behavioral version: a
pre-commit hook enforcing your delegation policy that has **actually blocked agent-authored diffs twice
on real work.** **ON FAIL:** you are pattern-matching, not reviewing — redo with a new sealed brief.

> v1's gate told you there was exactly one boundary violation, which is most of the answer.

## M15 — Scoping, Estimating, and Someone Else's Priorities (29h) · `dependsOn: M12`

The definitional mid-level skill, structurally invisible to a solo builder. When you build your own
ideas you are your own product manager: scope is infinitely elastic, nothing is late, nothing is cut,
nobody is waiting. The failure mode is precise — a technically fine hire who disappears for nine days on
something that should have been two, delivers more than was asked, and reads as "not ramping." It is
what most "great, but not mid-level yet" feedback actually means.

**Artifact** `LAB` — three scoping docs against real open issues (clarifying questions, slice
decomposition, estimate with named riskiest assumption, and an explicit "here is the 20% version if you
need it Thursday"). Then build one and log **actual vs estimate** with a post-mortem on where the
estimate broke.

**Plus the two that only exist in AI product work:**

**The open-ended quality ticket (~5h)**, run against M10 or M16's corpus so the substrate exists:
*"the assistant is getting worse, find out why."* These have no known-achievable endpoint and absorb
three days or three months identically. Deliver a **timeboxed plan**: the current measured number, a
target, ranked interventions with **expected gain per hour**, a hard checkpoint at 50% of the box with a
written **stop-or-continue rule**, and an explicit statement of what you report if the target is missed.

**The capability-question protocol (~4h)** — the thing that separates the mid band from the one above
it, and the place M9's structural-boundaries content finally gets cashed in as a *communication* skill.
Three buckets: cheap and near-certain · expensive and uncertain, needs a timeboxed spike · **structurally
impossible.** Practice against the reviewer playing a PM **instructed to push for a yes.**

Then write one page: **a response to a product request that is not achievable as stated** — *"the
assistant should never cite something that isn't in the document"* — naming why in plain language,
offering the achievable version **with a measured number from your own eval set**, and stating what the
residual failure rate means for the user.

> That page is also the best answer you will ever have to "tell me about a time you pushed back."

**GATE** — **REFEREE:** a vague two-sentence ticket written by the reviewer, cold, and the reviewer
playing a PM who will not take no. **PASS:** clarifying questions and a sliced plan in 15 minutes;
defend what you would cut if the deadline halved; **and report a result that missed its target, in
writing, without apologizing and without asking for more time.** **ON FAIL:** more data points.

> **The estimate log is a standing item from M1, not three data points here.** Costs nothing, produces
> 25 points by month 12, and *"my median estimate error is X and I most reliably underestimate Y"* is a
> better mid-level signal than anything else in this document.

---

# LAYER 5 — The AI Layer, Completed (157h)

## M16 — Retrieval You Actually Measured (44h) · `dependsOn: M10, M11`

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

**Artifact** `EVIDENCE` — retrieval over M10's corpus, on M11's runner and tables, with a measured
**recall@k baseline**, then **five** interventions measured independently. Three are the standard set:
hybrid+RRF, reranker, contextual retrieval. **Two are the ones that actually contest the space now, and
v1 measured neither:**

- **A long-context baseline** — same queries, no retrieval, documents in context — with recall, latency,
  and dollar cost.
- **An iterative/agentic search arm.**

Then span-level citation verification against M10's character offsets. A written table of what each arm
bought, what it cost in latency and dollars, **and which ones did nothing.**

Inherits M11's dev/test split — **the reported number is the test number.**

**GATE** — **REFEREE:** your held-out test set, half of it hand-written. **PASS:** state recall@10
before and after **with the `iterative_scan` setting named and the dev–test gap stated**; name the
intervention that did not help; and **defend your routing rule between retrieval and long context using
your own numbers.** **ON FAIL:** the golden set is LLM-generated, or you tuned on the set you reported —
hand-write 25, re-split, re-run.

> "Should this be RAG or just long context?" is the live architectural question in 2026 and the
> instrument to answer it already exists once you have a golden set. Two more rows in the table.

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

**Containment is an execution boundary, not a permission table (~4h).** v1 bounded cost and
reversibility and never bounded **blast radius.** Every tool executes behind one *enforced* boundary
with a written threat model: a container or hosted sandbox for anything code-shaped, **a domain
allowlist** for anything network-shaped, a path prefix for anything filesystem-shaped, plus per-tool
timeout and memory caps. **Demonstrate it by pointing a tool at a blocked host and at
`169.254.169.254`.**

> Your agent is the one place in the whole system where an attacker-controlled string reaches an
> outbound fetch. M19 teaches SSRF by exploiting it — **one of those four exploits runs through this
> agent's own fetch tool.** v1 taught both and never connected them.

**GATE** — **REFEREE:** a kill signal at a random point, and **200 adversarial inputs generated by a
second agent with a red-team brief and no knowledge of your governor**, with the spend assertion living
in the test suite. **PASS:** resume correctly after a mid-run kill; replay a failed trajectory and name
the causing step; the cost ceiling holds across all 200; the blocked host and metadata endpoint are both
refused. Plus: report your agent eval set's step-level and outcome-level scores from M11's runner.
**ON FAIL:** the governor caps iterations but not spend — fix and re-run.

> Fuzz the ceiling, don't demo it. A demonstration you designed proves you can construct a passing case.

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

## M19 — Security and the Trust Boundary (34h) · `dependsOn: M1, M4, M7, M17`

**Core concepts:** Trust boundaries and secrets. Authentication vs authorization; **broken access control
as the bug that actually ships.** RLS as a design skill. Injection, XSS, CSRF, SSRF **at working depth, by
exploiting them yourself.** Dependency and supply-chain risk. **Prompt injection — direct and indirect —
contained rather than fixed.** The lethal trifecta: private data + untrusted content + exfiltration
ability. Tool permission design and excessive agency. **Treating model output as untrusted input.** PII,
prompt and log leakage, and the data obligations your employer will hand you.

**The constraints you do not control (~4h).** v1 taught only the constraints you author. On the job you
are handed the others: **approved-subprocessor lists** (adding a vendor is a legal action, not a
technical one), what a DPA does, **zero-data-retention configurations**, data residency, and security
questionnaires — which land on the engineer who built the feature. **The week-one move is asking whether
a vendor is approved before you write code against it.**

**Artifact** `EVIDENCE` — an attack-then-fix log against a deliberately vulnerable copy of the flagship:
**five** exploits you ran yourself, each with fix and test. Four are the standard set; the fifth is
either **reading another tenant's uploaded file by guessing or replaying its URL** (a misconfigured
bucket is none of injection, XSS, CSRF, or SSRF — so the standard four cannot catch the leak you are
most likely to ship under time pressure) or **CSRF against an OAuth callback** if M24 is already built.
One of the five runs through M17's agent fetch tool.

A tool-permission design for M17's agent with blast-radius analysis.

**A bidirectional data-flow document** — v1's version covered only what flows *in*. Every boundary
customer data crosses, every third party that sees it, the retention setting and jurisdiction at each,
**plus an implemented delete path** removing the user's rows, objects, embeddings, and trace records; a
written list of what cannot be deleted and why; and a test asserting nothing survives in any store you
control.

> Once the flagship has real users their data lands in at least seven places built by different modules.
> "Retention" appeared exactly once in v1 — as a thing to *name* in a document rather than implement.

> This reconciles a tension v1 created and never resolved: M7 and M11 teach you to log everything about a
> model call; this is where that meets not shipping customer PII to a third-party platform.

**GATE** — **REFEREE:** working exploits — either they land or they do not — and a passing deletion
test. **PASS:** five exploits demonstrated and fixed with tests; name every irreversible action in your
agent and defend the containment architecture **without ever saying "I tell the model to ignore injected
instructions"**; state exactly what customer data leaves your perimeter and where it lands; and **state
what happens to every copy of a user's data when they ask you to delete it.** **ON FAIL:** the exploit
did not actually land — you have a description, not a demonstration.

**Most-missed:** Believing code is server-side because of where the file lives. · Treating a leaked key as
fixed by deleting the commit — it is compromised the moment it was pushed; rotation is the only fix.
· Trusting a `userId` in the request body. · `USING (true)`, or the secret key in an Edge Function
"because RLS was in the way." · Believing a classifier or delimiter scheme solves prompt injection.
Assuming indirect injection is exotic — **it is the common case**: a web page, a PDF, a calendar invite, a
GitHub issue, a row another user can write to. · Giving the agent an admin token "temporarily." · A
confirmation step whose summary the model itself generates — an injected model lies in the confirmation.

---

# LAYER 6 — Product and Platform (163h)

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

## M24 — Third-Party Integration as a Consumer (28h) · `dependsOn: M3, M19`

**The consent surface is part of this module, not someone else's.** v1 made M24 entirely backend in 20
hours while its own artifact required a revocation path that *re-prompts the user* — UI work in a module
with no UI budget, in a layer after the frontend module. So nobody owned the connect button, the callback
route, the connections screen, the re-consent flow, or the in-chat degraded state.

**Also: the OAuth callback is the one place CSRF actually matters** — `state`, PKCE, open redirect — and
M19 teaches CSRF two modules earlier, before any OAuth exists.

**Artifact** `EVIDENCE` — a real OAuth connection in the flagship:
- **Connect and callback routes with `state` and PKCE, verified by a written attack attempt.**
- A connections settings screen, and a **scope-upgrade re-consent path actually exercised** (scopes
  granted for v1 are insufficient for v2, so every existing user must re-consent).
- An **in-chat degraded state** when the connection is broken.
- **Envelope encryption with a per-row key reference**, a stated location for the master key per
  environment, and a written key-rotation procedure. (v1 said "encrypted per-tenant storage" without
  saying where the key lived or how it rotated.)
- Automatic refresh, and a revocation-recovery path that re-prompts rather than failing silently.

**GATE** — **REFEREE:** the provider's own API, where you revoke the grant **mid-run**. **PASS:** revoke
during a background job and assert the job **alerts** rather than failing silently; demonstrate the
scope-upgrade re-consent; the CSRF attempt against your callback fails. **ON FAIL:** the 401 surfaces as
a generic error, or the `state` parameter is decorative.

> v1's gate was *"draw the token lifecycle"* — a drawing, strictly weaker than the artifact above it.

---

# LAYER 7 — The Market (86h)

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
product-spec form.

**Only `EVIDENCE`-tagged artifacts are pinned, and the labs are private.** `runtime-lab`, `seams`,
`pg-lab`, `model-probe`, `stats-lab`, the recovery log, the defect log, the estimate log — these taught
you things and they are **not portfolio.** The final pinned four: the flagship · the OSS contribution
history · one design doc or public write-up · one genuinely separate small product.

> **Never name the curriculum.** Not in a README, not in an interview, not on the resume. The correct
> sentence is *"I spent the last year building and operating X."* Lab concepts surface only as specific
> answers to specific questions. The same goes for the weekly cold-rebuild ritual — excellent practice,
> and it sounds like test prep. A portfolio that describes its own coursework reads as coursework.

> **The README is a standing obligation on the flagship from M7 onward**, updated at the end of every
> `EVIDENCE` module — not a thing you write once, here.

**GATE** — **REFEREE:** **three strangers from named channels**, five-minute timebox each, answers **in
writing before any back-and-forth.** **PASS:** 3/3 on all three questions — what does it do, what does
it cost per user, how good is it. **ON FAIL:** rewrite, then **three fresh strangers** — the first three
are now briefed and can never be used again.

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

## M28 — Interview Performance (53h) · *10h forward-loaded to the application date*

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

**Plus ~8h of behavioral rehearsal against M0's incident log** — twenty real stories, sourced from real
friction with real people, accumulated at zero marginal cost since month one.

**GATE** — three referees. **PASS (1):** solve an unseen problem out loud in 25 minutes with autocomplete
disabled. **PASS (2):** drive an assistant through an unfamiliar bug **under observation**, narrating every
point where you *verified* rather than accepted. **PASS (3):** answer **three behavioral questions cold
with three different stories, none about a decision you made alone.** **ON FAIL:** watch the transcript
back and name where you delegated something you should have verified — that is the rep.

> **The references problem, solved by month 10 rather than discovered at the offer.** Employment
> verification for the self-employed substitutes tax filings and invoices for the HR call that does not
> exist. Secure **three real people**: the reviewer, an OSS maintainer, a freelance client. All three
> already exist in this curriculum — none of them knows they are a reference until you ask.

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

> **And say the true thing about months 5–9: the modal response to an application is silence.** v1 called
> rejection reasons "free," which will read as forty unanswered messages during the exact window this
> document identifies as the abandonment window. Reframe the period as **funnel instrumentation**, with a
> success metric of *"I learned what the funnel requires"* — which does not depend on anyone replying.

**Track 2 artifact spec** (v1 had this as a bullet with no hours, no spec, and no gate — while it is the
single highest-signal activity in the document: a public record graded by people with no incentive to be
nice to you). **Substantive** means: touches behavior, not docs or dependency bumps · 20–200 lines ·
includes a test · survived at least one round of maintainer review. Deliver **three merged non-trivial
PRs into two repos**, full review threads preserved, plus a written note per PR on *what the maintainer
asked you to change and why they were right.*

**Track 2 starts at the end of M13, not M12** — one module later than v1 said, because M13 is where you
learn to write a PR a maintainer can act on. Use the M12 window for the reading half: **two
well-researched issue reports** in the target repos. That is genuine contribution and it builds the
relationship the PRs will need.

**Track 8 needs inputs that actually arrive.** v1's three inputs were interview feedback, rejection
reasons, and estimate data — but rejections mostly arrive as silence, and the estimate log sat at
position 15, so the re-plan would have run for seven months with its primary input missing. Use instead:

- **Counts of required skills across the 20–40 postings you screened this month.** *This is the real
  Python-bet signal and it needs no employer to reply.*
- Screening questions asked · recruiter-call notes · which applications produced **any** human contact ·
  where in the funnel you stopped.
- **M25's requirement-to-evidence map, re-sampled monthly and kept as a dated diff** — terms that
  appeared, vanished, or shifted framing. One decision rule: *any term in more than a quarter of sampled
  postings two months running becomes a candidate module, displacing an equal-hour module under the fixed hour budget.*
- **Your `DELTA.md` files** (Rule 5) — this is how technical change enters the re-plan at all. Without
  them, every currency finding on this document's own list would enter undetected.

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

# Appendix A — What "enough" means

Several requirements in this document were stated in terms **the person it describes cannot
operationalize.** "Exactly enough Docker and Linux to not be helpless" is not a target; given an
undefined floor you will either over-invest (M22's own Kubernetes warning is exactly this failure, and
naming it does not prevent it when the floor is undefined) or under-invest and pass yourself. Enumerated:

**Linux — the finishable list.** Processes and signals · exit codes · stdout/stderr and pipes · file
permissions · `PATH` and environment inheritance · SSH keys · and a named short list of commands you
reach for without looking up. That is a checklist. You can finish it and stop.

**Docker — only this.** Write a Dockerfile for your own app · build it · run it with env vars and a
mounted volume · read the layer cache · `exec` into a running container. Nothing else until a job
requires it.

**"A substantive PR."** Touches behavior, not docs or dependency bumps · 20–200 lines · includes a test ·
survived at least one round of maintainer review.

**"A 500-line file" (M13).** Not a length — **a file you have personally been confused by while
editing**, with at least three responsibilities, chosen and justified in writing before you touch it.

**"~100 failure traces" (the Layer 3 gate).** Traces where the output was *wrong*, not merely traces.
A hundred successful calls teach you nothing; error analysis needs failures to read.

---

# Appendix B — Glossary

This document uses in-group vocabulary it does not define. That is invisible to anyone who learned it
from colleagues and it is a real tax on someone who did not have any. **A read-only vocabulary also means
the mispronunciation is the one error you cannot detect alone** — say these out loud once, to a person,
before an interview.

| Term | Meaning |
|---|---|
| **Yak-shaving** | The chain of prerequisite tasks between you and the thing you meant to do. |
| **Chesterton's fence** | Don't remove something until you know why it was put there. |
| **Strangler fig** | Replacing a system incrementally by routing traffic to the new one piece by piece. |
| **Expand/contract** | A migration in two deploys — add the new shape, backfill, switch reads, then remove the old — so old and new code can run simultaneously. |
| **Blast radius** | Everything a change or a compromise can reach. |
| **Characterization test** | A test that pins current behavior *including its bugs*, so you can refactor safely without knowing intent. |
| **Open coding / axial coding** | Reading examples and writing freeform notes (open), then clustering those notes into named categories (axial). The method behind a failure taxonomy. |
| **Backpressure** | Signaling upstream to slow down when you cannot keep up, instead of queueing without limit. |
| **Dead-letter** | Where a job goes after it has failed too many times, so it stops blocking the queue. |
| **Idempotent** | Safe to run more than once — the second run changes nothing. |
| **LEGB** | Python's name-resolution order: Local → Enclosing → Global → Built-in. |
| **RRF** (reciprocal rank fusion) | Merging two ranked result lists by rank rather than by score, so you don't have to make incomparable scores comparable. |
| **Cross-encoder / reranker** | A slower model that scores query-and-document *together*, used to reorder a cheap retriever's top candidates. |
| **Recall@k** | Of all the documents that should have been retrieved, what fraction appeared in the top k. |
| **TPR / TNR** | True-positive rate (of real failures, how many did the judge catch) and true-negative rate (of non-failures, how many did it correctly pass). |
| **Bootstrap CI** | Resampling your own results many times to get a confidence interval, when you can't assume a distribution. |
| **Mutation score** | The fraction of deliberately introduced bugs your test suite catches. Measures test quality; coverage does not. |
| **Prefill** | Processing the input tokens before generation starts — where time-to-first-token goes. |
| **Grapheme cluster** | What a human calls one character, which may be several code points, which may be several bytes. |
| **p50 / p95 / p99** | Median, and the values below which 95% and 99% of requests fall. The tail is where incidents live. |
| **SSRF** | Server-side request forgery — making *your* server fetch a URL an attacker chose. |
| **Envelope encryption** | Encrypting data with a per-row key, then encrypting those keys with one master key, so rotation doesn't mean re-encrypting everything. |
| **ADR / decision record** | A short written record of a decision and the options rejected. |
| **Trunk-based** | Short-lived branches merged to main quickly, with green main defended by automation. Not "commit straight to main." |
| **WIP** | Work in progress — here, how many things you have in flight awaiting review. |

---

# Appendix C — Learn on demand

Not cut because they're worthless — cut because they're learnable in days *when a job requires them*,
and front-loading them displaces something you will own. **"I know that exists, here is when I would
reach for it, I have not needed it yet" is a better interview answer than a shallow artifact.**

Playwright and E2E as a discipline · feature flags as a subject · webhook signature verification as its
own unit · rate limiting as its own unit · the batch/async tier · GraphQL · gRPC · implementing an OAuth
*provider* · prompt compression · semantic caching · self-hosting open-weights models and serving
internals · Jujutsu · GitFlow ceremony · git submodules and history surgery · Bedrock/Vertex as
alternative consumption paths for the same models (know the term exists; the client construction and
feature availability differ).

**Give every row here a revisit date.** A cut list with no expiry is indistinguishable from an opinion.

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
