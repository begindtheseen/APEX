# The Launch Pad

## A curriculum for becoming a hireable remote AI product engineer

---

## The honest numbers

| | hours |
|---|---|
| **Module hours** (the 33 modules, M0–M32) | **1,114** |
| **Parallel track hours** (10 tracks, all mandatory) | **470** |
| **Real total** | **1,584 focused hours** |

**The parallel tracks are mandatory, so they are in the total.** Plan against 1,584 hours, not
against the module hours alone.

That total matters more than anything else on this page, because M0’s whole claim to authority is
*runway sets the deadline*. A deadline computed from an incomplete number is not a deadline; it is a
miscalculation you experience as a felt sense of perpetual lateness somewhere in month nine, and that
feeling is what turns a bad stretch into quitting.

### What 1,584 hours actually means

- At **18 h/week** — the most the program assumes anyone can sustain for a long stretch — the full
  program is **~20 months** of focused hours.
- To finish in **13 months** you would need **~28 h/week**, every week, for a year. That is above the
  ceiling, which is why the program does not offer it; it offers the Spine instead.
- Wall-clock runs 1.3–1.5× focused hours once you count setup, yak-shaving, and re-reading what decayed,
  so plan on **26–30 months** on the calendar for the full program.

> **Every hour in that total is there on purpose.** Mutation testing, a record-replay model client built
> once instead of four times, inter-annotator agreement, train/test discipline, agent containment, a data
> deletion path, the consent surface, behavioral material — each earns its place, and none is free.
>
> If that is too much, the release valve is below — and it is a designed exit, not a failure.

### The release valve

**Track 8 rule: if you are six weeks behind for two months in a row, switch to the Compressed
Spine.** That is the plan working, not the plan failing. It exists so a slow stretch resolves into a
smaller finished program instead of an abandoned large one.

**Do not pick a weekly number because it sounds committed. Derive it.** M0 has you write down your
runway in months and the hours a week you can truly give this, and read off the deadline those two
numbers force. The program’s ceiling is 18 hours a week; when the work does not fit under it inside
your runway, the **scope** is cut to the Spine — the ceiling is never raised.

### The Compressed Spine — when the full program does not fit your runway

Divide 1,584 by the weeks in your runway. If the answer is more than 18 hours a week, do not attempt
the full program. The honest short path is fourteen modules — **M0, M1, M2, M3, M4, M5, M6, M7, M9,
M10, M12, M27, M28, M30** — which is **552 module hours**, plus the **370 track hours** the Spine keeps,
for **922 hours in all**. At 18 h/week that is **~12 months** — priced with the tracks it carries, not
module-only. If 922 divided by your runway in weeks is *also* over 18, take the Spine, get a contract
role, and learn the rest on someone else’s payroll. That is a financial decision, not a technical one.

**Spine track policy:** T7 (writing) suspended · T2 (open-source contributions) cut to 40h rather than
suspended, because it is the track that manufactures the people who can refer you and the reader on the
shortest runway needs that lever most — 40 hours is one accepted contribution and then the ask · T4 (cold
rebuild) every other week, 30h instead of 60 · T1 (job search, 200h), T5 (reviewer, 26h), T8 (re-plan,
34h), T9 (narrated problems, 25h) and T10 (the Sweep, 15h) unchanged. That is the 370.

**The Spine also drops M14 and M17**, and a contract role — the thing the Spine aims at — is the most
likely of all to drop you into an unfamiliar codebase with a scoped deliverable and no ramp, which is
exactly what those two modules are. That is a real cost of the Spine, not an oversight: budget the first
month on the job for them.

**M27 and M28 are non-droppable in every variant, including this one.** M27 is 11 hours, and it is
where the pay conversation gets rehearsed instead of improvised. M28 is in because the spine exists to
get you to a job and M27’s own gate needs a recruiter screen, which needs a resume. M30 is in because
the first real interview must not be the first rehearsal.

**Numbered cut order**, if you need hours back before switching: ① M26 (23h — OAuth is the most
learn-on-demand module here) · ② M25’s second half (~18h — if the trip-wire says fewer than eight of
your twenty postings ask for Python) · ③ M16 (28h). That is **69 hours back**, in that order. **M32 is
not on this list** — it is the only module that owns seamlessness into real work, which is half the
stated goal.

---

## The six bets this curriculum is making

Each is stated with the strongest objection to it and why the bet stands, so you can judge it yourself.

**BET 1 — TypeScript first, Python late.** The objection is that Python appears in the large majority
of AI-engineer postings and that resolving for TS costs most of your funnel. It fails: your entire
body of shipped evidence is TypeScript, your gap is a *reasoning* gap rather than a language-count gap,
and learning correctness twice is strictly worse than learning it once and porting it. The postings
read "Python **or** TypeScript," and the live AI-*product* roles are TS-native. **A bet this large
needs a hedge** — a trigger, a threshold, and a pre-written alternative. Those live in M0’s trip-wire
(eight or more of your twenty postings asking for Python), which moves M24 and then M25 to right after
M12 and the hard gate.

**BET 2 — the hour budget includes the parallel tracks.** They are mandatory, so they are priced; see
the honest numbers above. Everything M0 derives — weekly hours, the application date, the runway
arithmetic — rests on that total being complete.

**BET 3 — an artifact per module.** The objection (33 artifacts produce a portfolio of toys) fails:
most modules extend one flagship and the portfolio selects down to three pinned repos. What makes it
work is the distinction between **artifacts built to learn** and **artifacts built to show.** Every
artifact is tagged `LAB` or `EVIDENCE`. Costs nothing.

**BET 4 — gating the AI layer behind the fundamentals.** An eval harness built by someone who cannot
write a concurrent data pipeline is a dashboard, not a skill, so evals come after the runtime and
observability modules. They come no later than that, because the differentiator has to exist before
your application date — otherwise you interview without it. **So ingestion and evals run immediately
after observability**, and the ramp-and-collaboration modules come after them. The model layer is not
among them: M6 sits back in Layer 1, because M12 cannot be built without it.

**BET 5 — that a curriculum is the right instrument at all.** You named a real reasoning gap and the
2026 market for unproven remote juniors is genuinely hostile; competence work is necessary. But the
honest residue of the objection stands: **the three activities most directly responsible for whether
you get hired — applications that reach a human, accepted open-source contributions, public writing
about measurements — are the easiest to leave with no hours, no artifact, and no gate,** while every
technical module has all four. Under time pressure, unbudgeted ungated work goes first. That is how
this becomes eighteen months of excellent code and four interviews. So all three carry hours and gates
here.

**BET 6 — that the flagship exists, qualifies, and has real traffic.** Sixteen later modules extend it,
and the hard gate it sits behind keeps back the thirteen modules of Layers 4–6. **It is the only
prerequisite in this document that cannot be satisfied by working harder** — it needs other humans
using your app, months in advance. So it is a hard gate with a spec, an acquisition plan, hours, and a
written fallback. See M0, M2, and the Layer 3 gate.

---

## The five rules

**1. Every module ends in an artifact — something that runs, or something a stranger can read.** Every
artifact is tagged `LAB` (built to learn, never pinned) or `EVIDENCE` (built to show, goes in the
portfolio).

**2. Every module except M0 has at least one inbound dependency edge.** Each module header states
`dependsOn:` explicitly. **The longest path, not the hour sum, sets the timeline.**

**3. Eight concepts have exactly one owning module.** Five are consumed from there on and never
re-taught: **the flagship** (M2), **streaming** and **idempotency** (M7), **the durable queue** (M8),
**evals** (M12). The other three are taught once and then deliberately taken further later, and those
three are the spiral pairs named in Rule 4: **the trust boundary** (M3, again in M13), **observability**
(M10, again in M12), and **cost** — introduced in M6 and owned at depth in M20, the one pair of the three
where the owning module teaches it second.

**4. Seven spiral pairs cover six concepts that are deliberately taught twice, at different depths.**
This is not a violation; it is a spiral, and the pairs are named here so that when you meet the second
pass you know it is deliberate and read it as depth rather than as repetition: observability
(M10 → M12), pooling and isolation (M4 → M5), CI (M9 → M12 and again M12 → M23), OAuth (M21 → M26),
cost (M6 → M20), and the trust boundary (M3 → M13).

**5. Every module opens with a one-hour verification pass, charged to its existing hours.** Before you
build the artifact, read the **primary sources** for that module’s fast-moving claims and write a
`DELTA.md`: *what this document says · what is true now · what I changed.*

> This is the answer to "the space grows every day," and it is the only mechanism here that scales.
> A currency warning on one module is not enough — stale claims turn up in modules labeled durable,
> too. A static document about a moving field rots silently. **A per-module verification habit does not**, because it runs at the
> moment you actually need the truth.
>
> Each `DELTA.md` is also interview material. "Here is where the docs I learned from had gone stale and
> how I found out" is a better answer than anything else you can say about currency.

### What a ticked gate is, and what it is not

**Ticking a gate does not pass it.** It records that a named referee passed you: write who, the date,
and one line of what they said. **An unnamed tick is the decorative gate this program exists to
refuse**, and you are the only person who can tell the difference. This applies to every gate in the
document, not only to the hard gate at the end of Layer 3.

---

## Flow — how this is meant to be read

"Beginner to expert with no confusion points" is a property this document is built to have. Four
things to rely on as you read:

**1. Nothing is used before it is explained.** Almost every forward reference lives in `exports` —
*"the streaming proxy you are building feeds M8, M20 and M22"* — which is motivation, not confusion:
it tells you why the work matters while you do it. The one genuine forward dependency (M11 asking you
to record an embedding model’s dimensionality because of a ceiling you meet in M18) is
**self-explaining at the point of use**, so the decision is never blind.

**2. Vocabulary is defined before it is used.** Three terms are used slightly early — *idempotency*,
*SSRF*, *blast radius* — and all three are in Appendix B, which exists precisely because you have no
colleagues to ask.

**3. Every module of 30 hours or more has named checkpoints, and five shorter ones carry them too** —
**150 in total across 26 modules, averaging about 7 hours apart.** Each is a sub-goal with its own done-state and each is an explicit
legitimate stopping point in a bad week. Forty hours into a module with no intermediate target is where
people conclude they are lost rather than mid-module.

**4. Every module opens with a win, not a wall.** Checkpoints are ordered easiest-first. M5 opens with a
3-hour measured index win before you build the 5,000,000-row rig — and the size of that win is the
result, not the target. M5 says so in as many words: do not work backwards from a headline factor,
because it depends on the query, the selectivity and the cache state, and if it comes out at 1.2× that
is the interesting result and finding out why is the exercise. M3 — the largest module in The Machine, and
only the fourth module you meet — opens with a 20-minute prediction exercise, and being wrong about the
output order is the thing that motivates the other 66 hours.

**On the shape of the curve.** M3 being the largest module in The Machine and coming this early is
deliberate and it is the steepest part of the climb. It is not split, because the material genuinely
belongs together and an artificial boundary would teach you that the runtime is two subjects. It is
checkpointed instead. This is the one place where going slower is going faster, and if you are going to
fall behind schedule anywhere, fall behind here.

---

## Build order

Presented in execution order. Hours are focused hours. A module marked *trigger* is scheduled by an
event on your plan rather than by finishing the row above it; its `dependsOn` still has to be passed.

| # | Module | h | dependsOn |
|---|---|---|---|
| **M0** | The Contract Page | 12 | — |
| **M1** | First Code | 58 | M0 |
| **M2** | Flagship v1 | 30 | M1 |
| **M3** | The Runtime, Unframed | 67 | M1, M2 |
| **M4** | The Machine Model: Ten Seams | 45 | M3 |
| **M5** | The Postgres Underneath Supabase | 61 | M4 |
| **M6** | The Model as a Function | 30 | M3, M2 |
| **M7** | HTTP, Streaming, and the Wire | 45 | M3, M4, M5, M6 |
| **M8** | The Durable Queue | 18 | M7, M5 |
| **M9** | Tests That Fail for the Right Reason | 32 | M3, M7, M5, M6 |
| **M10** | Debugging and Production Observability | 45 | M7, M5 |
| **M11** | Ingestion: Real Documents Into a Corpus | 36 | M5, M8, M10 |
| **M12** | Evals: The One Harness and the Stats Lab | 70 | M10, M6, M9 |
| **M13** | System Design and the Design Doc | 15 | M8, M10 |
| | **▲ HARD GATE — flagship live, two real users, ~100 failure traces, M12 green** | | |
| **M14** | Reading and Changing Code You Did Not Write | 52 | M8, M9, M10 |
| **M15** | Git, Review, and Code Other People Maintain | 46 | M14 |
| **M16** | Working with Coding Agents Professionally | 28 | M14, M15 |
| **M17** | Scoping, Estimating, and Someone Else’s Priorities | 29 | M14, M12 |
| **M18** | Retrieval You Actually Measured | 44 | M11, M12 |
| **M19** | Agents and Tool Use | 49 | M7, M8, M6, M12 |
| **M20** | Cost, Metering, and Unit Economics | 30 | M7, M8, M6, M12 |
| **M21** | Security and the Trust Boundary | 34 | M3, M5, M10, M18, M19 |
| **M22** | Frontend for AI Interfaces | 32 | M7, M18, M19, M20 |
| **M23** | Deployment, CI/CD, and Operating It | 48 | M5, M9, M12 |
| **M24** | Python On-Ramp · *trigger* | 15 | M9 |
| **M25** | Python as a Second Production Language · *trigger* | 35 | M24, M12 |
| **M26** | Third-Party Integration as a Consumer | 23 | M7, M21, M22 |
| **M27** | Pay, Terms, and the Negotiation · *trigger* | 11 | M0 |
| **M28** | The Evidence Layer v1 · *trigger* | 8 | M2 |
| **M29** | The Evidence Layer v2 · *trigger* | 12 | M18, M20, M28 |
| **M30** | Interview Performance · *trigger* | 38 | M28 |
| **M31** | Employed Mode · *trigger* | 10 | M0 |
| **M32** | The First 90 Days · *trigger* | 6 | M0 |


**The critical path is 559 hours**: `M0 → M1 → M2 → M3 → M4 → M5 → M7 → M10 → M12 → M14 → M15 → M16`.

That is the longest chain of strict dependencies — the floor on calendar time even if everything else
ran in parallel. **The hard gate counts as an edge on that chain**, because Layers 4–6 cannot open until
M2, M10 and M12 have produced what it asks for, even though no module in those layers lists all three in
its own `dependsOn`. Read `dependsOn` alone and you get 539 hours, which is twenty hours short of what
the program can actually be run in. **Total hours is the floor on effort; the critical path is the floor on time. They are
different constraints**, and only one of them is fixed by working more hours a week. Everything off that
chain has slack, which is where the Compressed Spine’s cuts come from.

**Hire before completion is a success, not a failure** — it is the outcome this plan is shaped for,
which is a different claim from a prediction that it will happen to you. Your application date is a
target you set in M0 from your runway, and **it does not move because a module is late**; M10 is the
readiness condition, not the date. Reaching M10 puts Layers 0–2 behind you, **443 module hours in**.
That is not 443 divided by your weekly hours: the tracks already running take about **2.3 h/week** out
of an 18-hour budget first, leaving about sixteen for modules, so a target set at readiness lands
around **month six**. (Only the tracks that have actually started count against it. Track 2 does not
begin until after M9, which is most of the way through that span, so it is charged at what it really
costs there rather than at its full cadence.) Layer 3 is another 121 hours. If the target arrives and M10 has not passed, you
apply anyway with what you have and write down in that month's re-plan what you are applying without. A
hire that arrives with much of Layers 4–6 undone is the plan *succeeding*. M31 exists so that no
feedback instrument terminates on hire day.

> **The rate changes at the application date, and it is the single most missed line on this page.**
> Track 1 (3–4 h/week) and Track 9 (about 30 minutes) are both zero before that date and switch on at
> it, and Track 2 steps up to its full cadence around the same stretch. Track load goes from about
> **2.3 h/week to about 8**, so out of the same 18-hour budget the modules drop from about **sixteen
> hours a week to about ten** — roughly **a third less module progress per calendar week** for the
> whole second half of the program. Nothing has gone wrong when that happens; it is the job search
> being mandatory and priced, which is BET 5. **Re-plan against the lower number in the month your
> application date lands**, rather than carrying the month-six rate forward. A reader who does not
> will accumulate about five and a half hours of slippage a week against a schedule that was never
> achievable, reach Track 8's "six weeks behind" mark in something under four months, and switch to
> the Compressed Spine on a planning artifact rather than on a real slowdown. The Spine switch is a
> good rule; feeding it a stale rate is what makes it misfire.

---

# LAYER 0 — The Contract (100h)

*Your numbers, your first code, your reviewer (a working engineer who checks your work), and your flagship (the one app you keep building). Decided and built first, because everything after this rests on them.*

## M0 — The Contract Page (12h) · `dependsOn: —`

*The module was called "The Plan" until the app grew a tab with the same name. It is the page you
write; the tab is the calculator that fills two of its lines.*

> **Read this first if you have never written code.** There is none in this module, and none is
> expected. It is twelve hours of writing one page about money, time and people. **Code starts in the
> very next module, M1** — fifty-eight hours of terminal, variables, loops, errors and git, from an
> empty file. This one comes first for a single reason: how many months you can pay your bills decides
> what you can finish, and everything else on this page is worked out from that number. Deciding it
> after you have built something is how people run out of money in month nine with a half-finished
> portfolio. **Nothing here needs a project, an idea, or a line of code.** If a line asks for something
> you cannot judge yet — what an app should do, whether a posting is a good one — write your honest
> guess and mark it to revisit; the monthly re-plan exists to correct it.

This is day one, and the reader on day one has never written code. So every item below is something a
person can do with a notebook and an internet connection, said in words they already have. Items that
need code the reader has not written yet — a commit queue, a model-call log, a smoke test for tools not
yet installed — live in the module where that code exists, and are pointed to below. What is here is
the contract: the money, the hours, the date, the people, the rules. **No code.** You do not know how to
write any yet, and this page is what decides whether you will.

**What you need to understand.** Runway: how many months you can go without a paycheck. It sets the
deadline; the list of topics never did. Before your application date you build; after it you keep
building while you apply — the date decides what has to exist first, and that is most of the plan. It
also decides your pace: Track 1 and Track 9 start on that date and Track 2 reaches full cadence near
it, so module progress drops by about a third per week from there on. Plan the second half at the
lower rate rather than discovering it. Why
finishing a tutorial feels like learning and is not: it reads smoothly, so it feels understood; you
recognize the answer when it is shown, but cannot produce it; you would swear you could explain it,
until you try out loud. And a bad week is planned for, not recovered from: decide now what one costs and
what the week after looks like, so a missed week is a line in the plan rather than a broken streak.

**The artifact** `LAB` — one page, called `PLAN.md`, that you can read out loud. It contains:

**1. The money, first.** Your runway in months — and then, on the line under it, **what this program
itself costs you every month**, subtracted from that runway to give the runway you actually have. Write
the running cost down as a number: model spend (M2, M6 and M12 are steady; M18 and M19 are the expensive
ones, because they run a corpus and hundreds of adversarial inputs through a model), hosting for the
flagship once it is live, a paid tier anywhere a module needs one (a payment processor in test mode is
free, error tracking and a cloud account usually are not), and, if you are paying for review or mock
interviews, that too. Guess it now, correct it at every monthly re-plan, and treat the corrected number
as a claim on your runway, because it is one. **A program whose founding argument is that runway sets
the deadline cannot leave the outflow out of the arithmetic.** Then how many hours a week you can truly
give this, and the deadline those numbers force. The weekly hours are **derived**, not assumed: divide
the hours of the program by the weeks of your runway. If the answer is over 18 for the full program, take the
Compressed Spine and say so in writing; if it is over 18 for the Spine too, the plan is Spine plus a
contract role.

**2. The hour budget** — **1,114** module hours + **470** track hours = **1,584**, with the line-item
track table below and your date arithmetic shown. **Add the hours up yourself rather than copying the
total across** — a budget you have not computed is one you cannot defend, and a wrong total here is the
exact class of error this module exists to prevent.

**3. The application date** — a target you pick now from your runway — and the written defense of the
before/after-application cut. **It does not move because a module is late.** M10 is the readiness
condition, not the date: if M10 has not passed when the target arrives, you apply anyway with what you
have and write down in that month's re-plan what you are applying without. It is a date rather than an
event because M27 has to fire a month before it and its gate has to be booked, which is impossible
against a date that means "whenever M10 happens."

**4. The funnel teardown.** Twenty real current postings, read end to end, with geography, overlap,
citizenship, degree, and years-of-experience filters already applied. For each, a note on what it asks
for and whether it is an **employee job or a contract job** (W-2 or 1099) — that is your own data
point, and M27 uses it. This lands in M0, not late, because **it determines which modules matter.**

**5. The Python trip-wire, as a number.** Count how many of the twenty ask for Python. *If eight or
more do, M24 and then M25 move to immediately after M12 and the hard gate.* Pre-write that alternate
ordering in one paragraph now, so the decision at the hard gate is a lookup rather than a redesign.

**6. The flagship specification** → *in M2.* You name and specify the app in the module that builds it.
What you decide here is the flagship’s traffic date: **a date in month four by which a dozen people you
found will have used it.** That is a weekend of asking, not a growth strategy. The target behind it is
**~100 logged traces containing real failures** — that is what M12 actually consumes and what the hard
gate counts; a raw request count is not the threshold. **Two of those users is what the hard gate
requires**, and M2's own gate gets you those; the dozen by month four is the target that makes the
traces worth anything.

> **The labeled fallback, stated plainly:** if you cannot get real users, substitute a public corpus
> with *real human labels you create yourself.* It costs you error-analysis realism — you will be
> labeling failures you imagined rather than failures users found — and M12’s own mistakes list says an
> imagined set measures imagination. Take it knowingly or not at all. **Do not invent traces.** A
> hiring manager detects that in two questions.

**7. Turn on logging of every model call from the very first request** → *in M2.* You cannot log a
model call before you have made one; M2 makes the first and logs it from that request on.

**8. The reviewer recruitment.** The first hard human dependency is M1’s gate, and **every gate in this
program names a person** — so this is recruited here, and it is part of this module’s gate. Send
**three messages** to people who write code for a living, asking each for **20 minutes a month**.
Whoever says yes is your reviewer, the person who checks your work from here on.

These are **three different recruitments**, not one person (Track 5 prices them):

| Role | Needed by | Deadline |
|---|---|---|
| **Code reviewer** | every gate that says "your reviewer", from M1 on | before M1’s gate |
| **Someone who runs systems for a living** and can try to break yours | M10’s game day and fault injection | by M10 |
| **Mock interviewer** (credible at mid-level) | M27’s practice recruiter call, M13’s follow-ups, M30 | one month before your application date — in practice around M9 |

The mock interviewer is the one to start on early: recruiting someone credible at mid-level takes
weeks, so start asking **two months out** from that deadline, not on it.

Produce a one-page reviewer brief: what you send, how often, **which months are heavier than the rest**,
and what they get back. Where to look: paid senior-engineer mentorship with a stated
dollar budget, a maintainer of a repo you have already merged into, a reciprocal peer swap, a paid
mock-interview service.

> **The cheapest reviewer is free and requires no network: an OSS maintainer reviewing a real PR.**
> They did not write your code, they cannot be re-rolled, and Track 2 already puts you in front of them.
> M15’s gate consumes that directly.

**Agent fallback, with the anti-re-roll rule in writing:** if no person is available for a gate, an AI
assistant may stand in once per attempt; the whole conversation is kept, failures included, and **a
failed AI review is logged as a failed gate.** Re-rolling until you get a pass is how this instrument
dies.

**9. The cold baseline — as a fraction, not a feeling** → *in M1.* A first attempt at a coding task you
have never seen, scored honestly as a fraction, needs an environment to attempt it in.

**10. The capability inventory — and why this one is not optional.** A dated list of what you can do
today, which on day one is honestly **"nothing yet."** Append to it, dated, every time something ships.

> Every other instrument in this document points at deficit. You have no team supplying the incidental
> positive signal an employed engineer gets for free. **The predictable month-eight reading of a
> relentlessly deficit-framed document, with no counterweight, is that the gap is constitutional rather
> than closeable.** It is not. This list is the record that "nothing yet" stopped being true, and it
> is written so you can re-read it in month eight.

**11. The incident log — zero marginal hours, and it is your entire behavioral interview.** A file
called `INCIDENTS.md` with **one line every time something goes wrong** from here on: the reviewer
rejects a boundary, a maintainer rewrites your approach, an estimate blows up, the game-day partner
cannot follow your runbook. Situation · what you believed · what happened · what you changed.

> By the time you interview you will not have twenty stories with other people in them, and it does not
> matter: you will have a handful of real ones with another person in them, and a much larger number
> about your own system — what you believed, what it did, what you changed.
> Without it you arrive at the behavioral round with 33 modules that were solo, self-scoped, and
> self-graded — and for a candidate with no employment history the behavioral round is weighted
> *harder*, because there are no references to call. M30 rehearses against this log.

**12. The blind-exercise queue** → *in M1.* Finding twenty bug-fix commits needs you to know what a
commit is.

**13. The hardware floor and a 30-minute smoke test** → *in M1.* The smoke test checks the tools M1
installs.

**14. A written rule for what a bad week is and what the week after it looks like**, with adoptable
defaults.
- **Bad-week minimum:** the smallest thing that still counts as not stopping. Default: *the 45-minute
  cold rebuild (Track 4) and one commit.* The minimum exists precisely so the streak never breaks — a
  missed week read as a broken streak is how one bad week becomes quitting.
- **Plateau protocol:** what you do when progress stops feeling like progress. Default: *stop adding new
  material for one week; re-run three cold rebuilds from two months ago; if all three score 3, the
  plateau is a measurement artifact and you continue; if any scores below 2, that module re-opens.*
- **Re-entry ritual** — the actual failure point is not the bad week, it is the week after. Default:
  *re-read your own last `DELTA.md`, then do the bad-week minimum twice before resuming normal hours.*

**GATE** — **REFEREE:** anyone — a friend, a partner, a sibling — who reads your one page and hands it
back. **PASS:** they can say your runway, your **monthly running cost**, your **hour budget**, your
weekly hours and your application date without looking at the page; the three messages are sent; the
twenty postings are tallied; your rule for a bad week is written and you can say it. **ON FAIL:** this one cannot be failed by lack of skill, only by not
finishing it. Name the line your referee could not repeat back, finish that line, and read the page to
them again. Nothing else opens until they can.

**Most-missed:** Building a tracker for the plan instead of doing the plan. The tracker is more pleasant
than the work, and it feels like progress. · Setting every module to run five or six weeks because it feels
serious. It breaks the monthly rhythm and you never get the feeling of finishing anything. · Treating
the job search as the prize for finishing. It is the instrument that tells you which of your hours
mattered. · Skipping the twenty postings because you already know what the job is. You do not yet, and
reading them is the cheapest way to find out. · Budgeting the hours and not the money, then discovering
in month five that the runway the whole plan rests on was never the real number. · Assuming the
reviewer, the systems person and the mock interviewer will simply appear. Two of the four ways this
program suggests finding them cost money and two need a network, and the reader is described as having
neither on day one. That is a real prerequisite; put the month it takes into the plan.

---

## M1 — First Code (58h) · `dependsOn: M0`

> **This is where code starts, and it starts from nothing:** what a program is, what the terminal is,
> what a variable is. Fifty-eight hours is the longest module in this layer on purpose — it is the one
> that decides whether the rest of the program is readable to you. Nothing before this assumed you
> could write anything, and nothing here assumes it either.

**Why this exists.** The promise on the cover is first principles, and the event loop is not a first
principle for a reader who has never opened a terminal. Going from "write a plan" straight to "predict the
output order of six mixed sync/setTimeout/promise lines" walls that reader at hour 12 of a 1,584-hour
program, at the module this document itself calls "the steepest part of the curve." That is not a steep
curve; it is a missing first step, and every gate after it would inherit the gap — the blind queue asks for
twenty commits, M3’s and M4’s gates turn on an unseen bug your reviewer plants in a single file, M25’s gate
needs a pull request into an open-source Python project. So git and the terminal come first.

**What you need to understand.** What a program is: a file of instructions a runtime (here, Node) reads top
to bottom.
The terminal as a place you type commands, and what a working directory means. Variables, functions,
arguments and return values — the four things every program is made of. Conditionals and loops, and why
a loop that never ends is the first bug everyone writes. Arrays and objects: a list of things, and a thing
with named parts. Reading an error message — the type, the message, the file and the line number. What a
test is — code that runs your code and says yes or no without you looking. git as a save-point system:
what a commit is, commit, branch, remote, and how to get back.

**Checkpoints** ① a terminal you opened yourself, `node --version` answering, and an empty file you
created from the command line · ② a program that prints something, run from the terminal rather than from
an editor button · ③ the file-reading program, and the first error you read to the end instead of pasting
into a search box · ④ the API program: something that came back from a real server and was reshaped by
your code · ⑤ the repeated block pulled into a function, because you noticed it, not because you were
told to · ⑥ three tests you wrote before the code, watched fail, then made pass · ⑦ a deliberate break
recovered with git — the save-point used in anger once · ⑧ the 30-minute install check done against the
named hardware floor, your first unseen task scored as a fraction, and the twenty commits saved unread
with each parent SHA recorded and its suite confirmed green today.

**The artifact** `LAB` — six small programs, each written by you from an empty file and run from the
terminal: one that reads a file and prints how many lines it has; one that asks a public API for data and
rearranges what comes back; one that fails on purpose, which you fix by reading the error message; one
where a block you had typed twice becomes a function; one with three tests you wrote before the code they
test; and one you broke on purpose and got back with git. The setup around them counts as part of the
work: node installed with its version written down, an editor you can move around in without a mouse, a
repo pushed to a remote with commit messages a stranger could follow, and a page naming every tool you
installed and what each one is for.

**Then three short things you can only do now that you have tools — the items M0 pointed here:**

- **The hardware floor and a 30-minute smoke test.** Check that a local database, a container runtime,
  a load generator and a browser you can drive from code all install now, so that if something will not
  install it fails today instead of in month three. **Name the floor while you are there, because "a
  substantial machine" is not a specification:** M5 holds a five-million-row Postgres instance and a
  container runtime at the same time, M11 runs OCR over PDFs and M18 runs a reranker, so plan on at
  least **16 GB of memory and 50 GB of free disk**. The check proves things install; it does not prove
  M5 will fit. If you are unsure, load five million rows into your local Postgres today and watch what
  happens. The browser tool is the one item nothing here requires — you check that it installs so that
  knowing your machine can run it costs half a minute now instead of an evening later.
- **The cold baseline — as a fraction, not a feeling.** A first attempt at a coding task you have never
  seen, scored honestly as a fraction. **Zero out of six is a real score, and writing it down is the
  point.** Without a number, nothing later can be compared to it.
- **The blind-exercise queue.** A list of twenty small bug-fix commits from other people’s public repos,
  found but **not read**, saved for M14 and M30, where they become practice problems with a real
  answer — `git revert` one, the suite goes red, work the clock, score against the maintainer’s actual
  merged diff. Real ground truth, no human required, nobody who can leak. **Save a reproducible
  starting state, not a URL:** record each commit’s parent SHA and confirm *today* that the project
  builds and its suite is green at that parent. A repo moves on, and a commit you cannot check out and
  run in fifteen months is not an exercise, it is a merge conflict.

**GATE** — **REFEREE:** anyone who writes code for a living, watching your screen for 20 minutes, on a
task you have not seen. **PASS:** from an empty directory: create a file, write a function with a test,
run it, make the test fail, read the error out loud and say what it means, fix it, commit, push. No
tutorial open. **ON FAIL:** do it again from an empty directory. Re-running the tutorial does not count —
the whole failure mode of this module is a working repo you cannot rebuild.

**Most-missed:** Following a tutorial to a working app and mistaking that for being able to write one. The
gate here is an empty directory for exactly this reason. · Reading the error message as noise instead of as
the answer. It names the file and the line, and usually it names the mistake too. · Copying code you
cannot explain, which converts a 5-minute bug into a 2-hour one because you cannot form a hypothesis
about your own program. · Setting up a perfect environment (your editor and installed tools) instead of
writing programs. A slightly wrong editor that you use beats a perfect one you configure for a week. · Not committing until it works. The
point of a save-point is to have one from before it broke.

---

## M2 — Flagship v1 (30h) · `dependsOn: M1` · **owns: the flagship**

**Why this exists.** Sixteen later modules extend the flagship — M5, M6, M7, M9, M10, M11, M12, M16, M18,
M19, M20, M21, M22, M23, M26 and M29. This module specs it, M10 instruments it, M12 evaluates it, M21 attacks a
copy, M22 rebuilds its chat surface, M23 deploys its pipeline. Something has to build it first. And the
Layer 3 → 4 hard gate requires that flagship *deployed, reachable, and carrying two real users* — months
before the deploy pipeline and the UI arrive in Layer 6. A v1 that does one thing and is actually on the
internet resolves both: the later modules get something to extend, and the hard gate becomes reachable by
doing the work rather than by waiting.

**What you need to understand.** Client and server: what runs on someone else’s machine and what runs on
yours. An API key as a secret — why it cannot go in the browser, and how to prove it did not. Request and
response: one round trip, start to finish. Environment variables and why the same code behaves differently
in two places. Deployment as making the thing *reachable*, not as *finishing* it. Logging a call before you
need the log, because usage you did not record is gone.

**Checkpoints** ① the one-page specification written and signed line by line, before any code · ② one
model call made from a script and its reply printed · ③ the same call behind a server route, with the reply
shown on a page · ④ the key in a server-side environment variable, and a search of the files the browser
downloads proving it is not there · ⑤ the call log written on every request: input, output, usage, time ·
⑥ deployed at a URL that works on a phone you did not configure · ⑦ two strangers through it, their
requests visible in your log.

**The specification, first — the item M0 pointed here.** Give the app a name and write its one-page
specification: who it is for, the one thing it does, what a user types in and what they get back, and what
it must never do. Sixteen later modules add to this page, so you **sign it line by line** before you
build anything. Then read it against this checklist — **as what the app must be able to grow into, not
as what it has.** You are checking the concept, not the code; nothing on this list is built in this
module, and the modules that build these lines are M5, M11, M20, M21 and M23. If your named app could
never carry one of the lines, **pick a different app now, while changing your mind is free.** "Fix the
app before M3" would be an unrunnable instruction.

| The flagship must be able to grow into | Built by |
|---|---|
| A streaming chat surface you can rebuild on your own M7 protocol | M22 |
| Multiple real users with skewed usage, and a paid tier | M20 |
| A user-uploaded document corpus | M11, M18 |
| At least one irreversible side-effecting action | M19, M21 |
| Two distinct roles (so broken-access-control exploits are real) | M5, M21 |
| A third-party account worth connecting | M26 |
| A CI/deploy pipeline you own | M23 |
| Model calls being logged from day one | M10, M12 |

**If a line fails anyway, in month ten — the amendment procedure.** The instruction above is to pick a
different app *now*, and it is the right instruction. But the lines above pay off between M11 and M26,
which is months eight to eighteen, and you choose the app in month two; some readers will get here
anyway, and "take the labeled fallback" is not an answer, because that fallback substitutes *traffic*
and says nothing about a missing tier or a missing role. So:

- **Four of the eight bolt on to a running app at any point.** A paid tier (a payment processor in test
  mode is free, and M20 needs metering, not revenue). A second role — M5 already builds the auth seam,
  and M21 only needs two principals to exploit. A third-party account worth connecting: M26 is OAuth
  against somebody else's API and does not care which app initiates it. And a CI/deploy pipeline, which
  M23 adds by construction. Budget **10–15 hours** for whichever you are repairing.
- **Two cannot be bolted on.** A user-uploaded document corpus, because M11 and M18 measure extraction
  against documents your users actually brought, not a folder you assembled to pass a module. And a
  streaming chat surface, because M22 rebuilds the surface your app already has. If your flagship has
  neither, M11, M18 and M22 have no substrate, and no amount of late work creates one.
- **A second small app is the fallback, and it is partial.** M20, M21 and M26 will accept one — metering,
  exploitation and OAuth are all self-contained. M11, M18 and M22 will not, for the reason above.
- **What it costs is Track 3.** Every module that runs on the second app is a module whose artifact does
  not build on the one before it, which is the dependency spiral the program runs on. Those hours are not
  in the 1,584 — they are the price of a month-two decision you are paying in month ten, and the honest
  place to record that is `INCIDENTS.md`: what you believed, what happened, what you changed.

**The artifact** `EVIDENCE` — the smallest honest version of it. A plain HTML page with one text box. A
server route that sends what the user typed to a model at Anthropic, using your own API key, and returns
the reply. The reply shown on the page. The whole thing deployed on Vercel, so it has a URL a stranger can
open on their phone. **No streaming, no accounts, no database** — each has its own module later
(streaming in M7, accounts and the database in M5) and each is easier to add to something already
running. Four rules that cannot be skipped. The key lives on the server in an environment variable, and
you prove it is not in the client bundle by searching the files the browser downloads. **A hard spend
limit is set at the model service before the first request**, low enough that the worst month you can
imagine is an amount you would shrug at, because this URL is on the public internet and the bill is yours.
**The page is not open to the whole world:** put it behind a shared word you hand out, or a list of
addresses you invite, so the people using it are people you chose. And **every model call is written to a
log with its input, output, usage (the token counts the service reports) and time, from the very first
request** — the item M0 pointed here — because M10 and M12 both read that log and a month of calls you did
not record is gone for good. M10 then *upgrades* a trace store rather than starting one. **That log holds
other people’s words**, so the page says in one line what is recorded and for how long, you keep it no
longer than you said, and you delete a person’s entries when they ask. M11 and M21 make this rigorous; the
one line and the delete-on-request are due now.

**GATE** — **REFEREE:** two people who are not you, on their own devices, with no instructions from you.
**PASS:** both reach the URL, type something, get a reply, and can say what the app is for. Your log shows
their two requests. The spend limit is set and you can say the number. The page states what it records,
and you can show a request deleted on demand. **ON FAIL:** it runs on your laptop. That is a different
artifact, and no later module can bolt onto it.

**Most-missed:** Putting the key in the client (the browser side) because it works. It works, and it is
now public; scrapers (programs that automatically scan public repos for secrets) find committed keys in
minutes. · Building the whole product instead of v1. Everything you are
tempted to add here has a module later, and each one is easier on top of something already deployed.
· Skipping the log because there is nothing to look at yet. M10 and M12 both read this log and neither can
reconstruct a month of calls after the fact. · Calling it done when it runs locally. Two strangers on their
own devices is the gate for a reason.

---

# LAYER 1 — The Machine (248h)

*How code actually runs. The language, the computer under it, the database (where the app keeps its data), the AI model (the program you send text to and get text back from), and the connection between them. The literal answer to: I need to understand code.*

## M3 — The Runtime, Unframed (67h) · `dependsOn: M1, M2` · **owns: the trust boundary**

This is the largest module in The Machine and it comes early, which is the steepest part of the curve. Do
not read ahead — start with checkpoint ①, which is a 20-minute prediction exercise, and let being
wrong about the output order be the thing that motivates the other 66 hours. Everything after this module
assumes you can reason about what the runtime is doing, so this is the one place where going slower is
going faster.

**Core concepts:** The event loop — call stack, macrotask vs microtask queue, why one slow function
stalls every user. What a Promise actually is: a notification channel for work that *already started*,
not a thing that does work and not lazy. The four concurrency failure modes —
sequential-when-you-meant-parallel, fire-and-forget, unhandled rejection, cancellation. Closures,
lexical scope, `this`, reference identity — including the serverless trap where warm instances reuse
module scope, making any mutable module-level variable shared state across users. Structural typing and
where the type system lies to you. **Parse, don’t assert** — the trust boundary, owned here, consumed
everywhere. Discriminated unions and exhaustiveness. Error handling as design: taxonomy, `cause`
chaining, which failures are safe to retry. Modules and the bundle graph — placement means nothing, the
import graph is what ships.

**Checkpoints** ① hello, event loop: predict the output order of six mixed sync/setTimeout/promise lines,
then run it and reconcile · ② one failing async test you wrote, fixed for the right reason · ③
MiniPromise: then/catch/chaining passing your own tests · ④ the four concurrency failure modes reproduced
on demand · ⑤ the Zod boundary rejecting model JSON that `as` accepted · ⑥ the typed error taxonomy with a
documented retry rule per class.

**Artifact** `LAB` — a `runtime-lab` repo: a set of small programs under plain `node --test`. MiniPromise
from scratch. A concurrency harness reproducing all four failure modes on demand, then fixing each. A Zod
boundary that rejects hostile LLM JSON which `as MyType` accepted. A typed error taxonomy with cause
chaining and a documented retry-safety rule per class. Strict flags on from day one.

> **Exported: the estimate log starts here and runs until you are hired.** Before every task from now
> on, write down how long you think it will take; afterwards, how long it took. M17 reads the pattern.

**GATE** — **REFEREE:** your reviewer, watching the screen recording back with you. **PASS:** narrate
unprompted why `setTimeout(fn,0)` runs after a resolved `.then()`; convert a real `as`-cast of model JSON
from your own shipped code into a parsed boundary and name the production bug it prevents. **The unseen
condition:** three attempts, 45 minutes each, on an async bug your reviewer plants in a single
file you have not seen — pass 2 of 3. Narrating your own harness cannot distinguish understanding the
runtime from remembering what you built. **ON FAIL:** rebuild the concurrency harness from empty;
re-attempt in 7 days.

**Most-missed:** Believing `async` means "runs in the background." An async function runs synchronously
until its first `await`, and CPU-bound work inside one blocks the whole process exactly as hard.
· `await` in a `for` loop over independent work — 200 × 200 milliseconds (ms) becomes 40 seconds. And the inverse,
`Promise.all` over an unbounded array, firing 200 requests into a retry storm. · Silencing strict-mode
errors with `as` and `!` instead of narrowing — converting a compile error into a runtime crash.
· `{loading, error?, data?}` (the `?` marks a field that may be absent), which permits four impossible
combinations. · `catch (e) { console.log(e) }` and
continuing — a loud failure becomes a silent wrong answer.

## M4 — The Machine Model: Ten Seams (45h) · `dependsOn: M3`

**Core concepts:** References vs values — aliasing, mutation, shallow vs deep copy. Stack vs heap,
object lifetime, why a server leaks (GC frees *unreachable* objects; a leak is unintended
reachability). Number representation — floating point, integer precision, the right type for money and
IDs. Text encoding — bytes vs code points vs grapheme clusters, decoding a *stream*. JSON as a lossy
boundary. Blocking: event loop, async I/O, threads, processes. File descriptors, sockets, pools,
timeouts. Concurrent mutation (two things changing the same data at once) — races, atomicity,
idempotency. **The lost update:** two writers, one
row, and the gap between reading and writing. **Dates and timezones** — DST’s doubled and missing hours,
naive vs timezone-aware timestamps (`timestamptz` vs `timestamp` is the Supabase footgun that silently
produces correct-looking wrong data).

**Checkpoints** ① aliasing and the shallow-copy trap, reproduced and fixed · ② money wrong by a cent,
then correct · ③ the leaking server, proved with a heap snapshot · ④ the streamed grapheme split, and the
pool exhausted under load · ⑤ the lost update reproduced against a real database row, then prevented ·
⑥ the four-timezone scheduler pinned across both DST boundaries.

**Artifact** `LAB` — a `seams` repo of ten reproductions, each a failing script + fix + proving test:
a leak proved with a heap snapshot; money wrong by a cent; a UTF-8 grapheme split across streamed
chunks; a pool exhausted under load; a lost update in a database (the Postgres version, with the plan
that proves it, is M5’s); a four-timezone digest scheduler with an injected fake clock pinned across
spring-forward and fall-back.

**GATE** — **REFEREE:** the reviewer picks which bug, from the ten, without telling you. **PASS:** name
the seam and the instrument within 60 seconds, 7 of 10. Then point at the wrong-typed columns in a small
table design your reviewer hands you. **The unseen condition:** two attempts on a data-seam bug
(encoding, money, timezone, pooling) your reviewer plants in a single file you have not seen — pass 1
of 2. **ON FAIL:** rewrite the two you missed from empty; re-attempt in 7 days.

**Most-missed:** Believing `{...obj}` or `JSON.parse(JSON.stringify(obj))` is a copy. The spread is one
level. The JSON trick converts Dates to strings, drops `undefined` and functions, mangles Maps and Sets
to `{}`, and throws on cycles. · `.toFixed(2)` "solves" money by fixing the display and leaving the
arithmetic wrong. · `new TextDecoder()` *inside* the loop — looks identical to correct code, and
discards the carried partial-character state that is the entire point. · "I’m using a pool" while N
serverless instances each hold a pool of M. · Believing a transaction prevents the race. Atomicity is not
isolation.

## M5 — The Postgres Underneath Supabase (61h) · `dependsOn: M4`

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
`EXPLAIN (ANALYZE, BUFFERS)` — the deliberate slow-to-fast loop. Transactions, isolation, the lost update.
N+1. **Connection pooling and the Vercel+Supabase failure mode.** RLS — correct first, then fast.
Expand/contract *as a concept*. **The planner:** force each join strategy with `enable_hashjoin` /
`enable_mergejoin` / `enable_nestloop` off and time all three on the same query, so its choice becomes a
decision you watched it make. **Estimated vs actual rows** — the first thing to say about any plan; one
query where stale `ANALYZE` or a correlated predicate breaks the estimate. **The isolation levels — four names, three
behaviours**, because READ UNCOMMITTED behaves as READ COMMITTED: show that M4’s lost update survives
READ COMMITTED (the default, which is why putting it in a transaction fails) and is **caught** under
REPEATABLE READ. Caught, not silently fixed — the transaction aborts with a serialization failure, and
**your application has to catch that and retry the whole transaction.** The retry loop is the lesson;
without it you have converted a silent wrong answer into a user-visible 500 and will conclude that
REPEATABLE READ does not work. **MVCC and dead-tuple bloat:** bulk update, watch the query slow
with no code change, `VACUUM`, watch it recover. The local Supabase stack runs in the containers you
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

> **Key naming is mid-migration.** Supabase is replacing the legacy `anon`/`service_role` JWT keys with
> publishable/secret keys, deprecating the old pair inside this curriculum’s own calendar. Learn both
> names once, then use the new ones. **Make the migration an artifact:** rotate the flagship onto the new
> keys, disable the legacy pair, prove with a test that nothing broke.

**Artifact** `LAB` — a `pg-lab` repo against a local Supabase stack. The 3-hour win first. Then the
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

**GATE** — **REFEREE:** your reviewer, holding an `EXPLAIN (ANALYZE, BUFFERS)` output you have never
seen, taken from their own work. A slow-query log only carries a plan if `auto_explain` was configured to
log one, and only carries actual rows if it was configured with `log_analyze` — so ask for the plan, not
the log line. **PASS:** state estimated vs actual rows **first**, then name the fix before reading the
query, 3 of 4. If the plan you are handed has no actual rows in it, say so first: plain `EXPLAIN` reports
the planner’s estimates and nothing else, and noticing that is itself the first thing to notice. Explain why your own deployed app exhausted connections and show the
pooled fix under the same load. **ON FAIL:** re-run the slow-to-fast loop on three new queries.

**Most-missed:** Reading `cost=` as milliseconds. It is an arbitrary planner unit. · Benchmarking
cold-then-warm so the cache gets the credit — run each variant twice, report the second. · Assuming an
index on `(a,b)` helps a query filtering only `b`. · One single-column index per column instead of one
correct composite — and forgetting each is a tax on every write. · **Holding a transaction open across a
model API call**, turning a 200ms connection into a 30-second lock. · Schema changes in the dashboard
table editor, which bypasses migration history. · `USING (true)`, or a policy against a JWT claim the user
can edit.

---

## M6 — The Model as a Function (30h) · `dependsOn: M3, M2`

Also the morale spike for the months 3–6 abandonment window — which only works because it sits
inside that window rather than after it.

**Core concepts:** Tokens as the unit of everything.
The messages array, roles, statelessness, and what a system prompt mechanically is — text rendered at a
specific position in the same token stream. The weighting is a training artifact, not an enforcement
mechanism. **The corollary you must internalize: text inside a user-role or tool-result message can be
forged by anything that writes to user-visible input. That is exactly what prompt injection is.**
The context window — what fills it, what degrades before it fills; the API is stateless, so you resend
the whole history every turn, so **the tokens you resend grow quadratically** with conversation length —
dollars do not follow, because cache reads are priced at a fraction, so measure both. Output control:
`max_tokens`
and **the full `stop_reason` enum**, whose refusal `category` is an **open set**. Pricing:
input/output asymmetry, and prompt caching as a byte-exact prefix match you **opt into** — a breakpoint
you place, or the provider's automatic version. Three things decide whether a hit ever happens: the
prefix has to clear a model-dependent **minimum length**, below which caching silently does nothing; it
has to match byte for byte; and the request is assembled **tools → system → messages**, so a tool list
that varies between requests invalidates everything after it, which is what catches people building
agents. **Adaptive thinking and effort** — the model decides when and how much to reason, and effort is
a coarse dial over that depth and over what the request costs, **not a token count**; a fixed thinking-
token budget is the dead pattern it replaced. It is the first quality-trading lever after caching.
Discovering capabilities, `max_input_tokens` and `max_tokens` **from the Models API** rather than a
hard-coded table — **and knowing what it does not serve:** prices are not on that endpoint, so the price
table in your client is the one thing that carries a check date. The structural boundaries — what no prompt fixes.
**Prefill vs decode and the KV cache** — the one mechanism explaining three facts this module asserts:
why caching needs a byte-exact *prefix*, why the tokens you resend grow quadratically, and why
time-to-first-token and inter-token latency are different numbers. No training, no backprop, no
attention math. Then measure it: probe a long prompt and a short one and show TTFT scaling with input
while inter-token latency does not.

> **A common belief here produces a branch that never fires:** that a refusal returns 200 "with an
> empty content array." **The content array is not empty.** A refusal returns 200 with a
> *populated* content array and a non-null `stop_details` carrying a category. `stop_details` is non-null
> **only** on a refusal, **and only on models from Opus 4.7 on**, which is what makes it the actual
> discriminator — check it against the model you are calling. Write
> `if (!response.content.length)` and that branch never runs — so refusal prose flows downstream and
> gets rendered as the answer, which is precisely the wrong-but-200 failure M10 and M12 exist to catch.
> **Branch on `stop_reason` before you read content.** Add server-side fallbacks as the production handling.
> One value is deliberately out of reach here: **`pause_turn` only arises from long-running *server-side*
> tool use**, and nothing in this module declares a server tool, so you cannot produce it on purpose yet.
> Handle it in the switch anyway — an unhandled `pause_turn` in M19's agent loop reads as a finished turn
> and silently truncates the run.

> **Sampling is a per-model fact, not a property of the field.** On the current Anthropic line,
> `temperature`, `top_p` and `top_k` are removed and return a 400, **while the 4.6 family and Haiku still
> accept them**, and assistant prefill is gone across a wider span than the sampling parameters are.
> **Every other provider you might work for still exposes `temperature`.** Check the model you are
> calling, not the folklore. Keep the underlying idea — **non-determinism is structural, not a knob you
> forgot to set** — which is more true now, not less.

**Checkpoints** ① token counts compared against your guesses across five kinds of text · ② one cache
hit proved from the usage meters, with its cost delta printed · ③ every `stop_reason` this module can reach produced on
purpose, with the refusal taken from a recorded fixture, and the cost column live in the M2 log · ④ the limit of constrained
decoding shown two ways — a schema-valid reply that is factually wrong, and the 400 the API returns when
the schema itself is invalid — with capabilities read from the Models API and every 400 pasted into the
dead-patterns page.

**Artifact** `LAB` — a `model-probe` CLI: compare token counts against your assumptions across five
text types; prove a cache hit from the usage meters and print the cost delta; produce **every**
`stop_reason` you can produce deliberately — `end_turn`, `max_tokens`, `tool_use`, `stop_sequence` —
and take the refusal from a recorded fixture rather than trying to trip a safety classifier on demand,
which is not reliably producible; show `stop_details` as the discriminator, and note that the categories
it carries are an **open set**, so a `switch` over the ones you saw this month is a latent bug;
demonstrate **the limit of constrained decoding rather than a rejection that cannot happen** — a
generation that is schema-valid and factually wrong, and, separately, what the API does when the schema
you sent is itself invalid, which is a 400 on the request rather than a rejected generation; discover
capabilities, context window (`max_input_tokens`) and output cap (`max_tokens`) from the Models API
rather than a hard-coded table, noting that prices are not on that endpoint, so the price table in your
client is the one thing that must carry a check date. Plus a **dead-patterns page** with every 400 pasted
in. **And the cost column added to the M2 call log, priced from the usage object, so every call from
here on has a price.**

> **Exported:** the `stop_reason` discriminator → M9, M19. The usage and cache meters → M20.

**GATE** — **REFEREE:** your reviewer, checking your arithmetic against a real usage object from the
service. **PASS:** price a request to the cent from its usage object alone, **saying where each rate came
from and when you last checked it** — the Models API does not serve prices, so this one number is
hand-carried and dated; point at the exact byte that
broke a cache prefix; explain why a model-emitted "confidence score" is generated text rather than a
probability, and what feature designs that kills. **ON FAIL:** re-derive the pricing by hand from three
more requests.

> **Currency: highest decay rate in the document.** This is the fastest-changing material in the
> program. Model IDs, parameter availability, pricing, caching TTLs, and the `stop_reason` enum move on a
> monthly cadence. The week you build it, check every detail against the official documentation of the
> model service you use. Do not trust this document, a blog post, or a model’s memory.

**Most-missed:** Using another provider’s tokenizer (the provider is the company running the model
service) or a chars/4 rule to budget tokens. · Treating
`max_tokens` as a cost cap. It is a ceiling the model is unaware of, so it truncates mid-thought. The
budget the model *can* see is the server-side task budget (`output_config.task_budget`, currently behind
a beta header) — know that it exists and what it changes.
· Checking for an empty content array to detect a refusal. The array is populated; `stop_details` is the
discriminator, and that branch never fires. · Interpolating anything dynamic near the front of the system
prompt. One changed byte invalidates the cache and the failure is completely silent. · Optimizing input
tokens while ignoring that output costs several times more. · Asking the model to rate its own confidence
and making decisions (routing) on that number. It looks like a probability and behaves like a vibe.

## M7 — HTTP, Streaming, and the Wire (45h) · `dependsOn: M3, M4, M5, M6` · **owns: streaming, idempotency**

**Core concepts:** HTTP as a wire format — the status codes and headers that carry meaning in practice.
**Write your own list and be able to defend each entry**, because "about twelve headers matter" invites
"which twelve?" and there is no list you did not choose.
REST and where it stops being the right answer (real APIs have action endpoints; offset pagination is
the most common correctness bug in list endpoints). **SSE and chunked transfer from scratch, no SDK.**
Production streaming failure modes: proxy buffering, client aborts, mid-stream errors, dropped
connections, resumption. **Idempotency** — why a retry is a data-corruption bug unless designed for.
Timeouts, backoff with jitter, which failures are retry-safe. Rate limiting from both sides. Webhooks —
at-least-once, signature verification on **raw bytes**. CORS; cookies vs bearer vs JWT and where each
breaks.

**Checkpoints** ① read and write one HTTP request by hand, no client library · ② a working SSE frame
parser against a deliberately chunk-split fixture · ③ the streaming proxy end to end, no SDK · ④
`AbortController` wired through: killing the client stops upstream billing · ⑤ proxy buffering and a
mid-stream error reproduced, and recovered from both · ⑥ the idempotency table: same key twice, one row.

**Artifact** `EVIDENCE` — **the streaming LLM proxy.** Raw `fetch`, raw `ReadableStream`, hand-parsed
SSE frames, no SDK. `AbortController` end to end. A Postgres idempotency-key dedupe table. Deliberately
reproduces proxy buffering and a mid-stream error, and recovers from both. The flagship server, written
in plain JavaScript in M2, is rebuilt in TypeScript here — this is the module where that move happens.

> **Exported, and named so the consumers are checkable:** the **SSE transport** → M22. The
> **idempotency table** → M8, M20.

> **One load-bearing detail.** The wire format you define here is the one M22’s client has to consume,
> and M22 consumes it through **a custom transport you write** — not the prebuilt default of the popular
> AI frontend library, which expects its own versioned wire format. That join is not free; **budget it
> now** (it is in the 45h), and check the current wire format the week you build it. The path of least
> resistance when stuck deletes this module’s reason to exist.

**GATE** — **REFEREE:** your reviewer, reading the server logs and a database row count — both are facts
neither of you can argue with. **PASS:** kill the client mid-generation and show from logs that upstream
billing stopped; replay one idempotency key twice and show exactly one row; narrate what arrives on the
wire between first byte and first rendered token. **ON FAIL:** rebuild the frame parser against a
deliberately chunk-split fixture.

**Most-missed:** `chunk.toString().split('\n')` — corrupts output the moment a frame splits across TCP
chunks, and works perfectly on localhost, so it ships. · Assuming HTTP 200 means the whole response
succeeded; the status commits before the body exists. · Writing the assistant message to the database only in
`finally`/`onFinish`, which on serverless may never run. · `200 { ok: false }`, which breaks every retry
library, monitor and health check. · A client-generated idempotency key per *render* instead of per
*logical operation*. · Doing webhook work before responding, so the provider times out and retries,
multiplying the work.

# LAYER 2 — The Craft I (95h)

*The habits that keep a running app running: work that survives a crash, tests that catch real mistakes, and seeing inside your app when it misbehaves.*

## M8 — The Durable Queue (18h) · `dependsOn: M7, M5` · **owns: the durable queue**

**This module sits early on purpose.** A resumable ingestion job, a resumable backfill, re-embedding,
durable agent state, and an idempotent webhook consumer are hard build requirements at five later
modules. Taught late, you would invent a queue five times, badly, and each ad-hoc version would become
load-bearing in a shipped artifact before the correct one existed.

It needs only M7’s idempotency key and M5’s row locking, both of which precede it.

**Core concepts:** Moving slow work off the request path. `SELECT ... FOR UPDATE SKIP LOCKED`.
At-least-once delivery and idempotent consumers. Backpressure and dead-letter paths. **The read path** —
how the client learns the job finished (polling, SSE, and resumable streams are three different
products, and enqueueing is the easy half).

**Checkpoints** ① one job written to the table and picked up by a worker · ② a worker killed mid-job,
and the job picked up again by another when its lease expires · ③ the same job submitted twice and run
once, with the read path showing its result.

**Artifact** `EVIDENCE` — a Postgres-backed durable job queue: `SELECT ... FOR UPDATE SKIP LOCKED`,
at-least-once delivery, idempotent consumers reusing M7’s dedupe table, backpressure, a dead-letter
path, **and a read path.**

> **Exported to:** M11 (ingestion job), M14 (the backfill), M18 (re-embedding), M19 (durable agent
> state), M20 (webhook consumer).

**GATE** — **REFEREE:** your reviewer, sending a kill signal at a random time and then counting rows.
**PASS:** kill a worker mid-job; zero lost jobs across 1,000 enqueued items, and every effect applied
exactly once even where a job ran twice — which is what at-least-once delivery actually lets you promise.
**ON FAIL:** the consumer is not idempotent — fix and re-run.

**Most-missed:** Starting with a hosted queue and never learning the mechanism, which makes every
operational question unanswerable. · Designing the queue and forgetting the read path. Enqueueing is the
easy half. · Assuming a cached step result makes a retry safe. `book_flight()` twice is two bookings.

## M9 — Tests That Fail for the Right Reason (32h) · `dependsOn: M3, M7, M5, M6`

**Core concepts:** The pyramid and what each level is genuinely for. A unit test that fails for the right
reason. Test doubles and when mocking makes a test worthless. Integration tests against real Postgres
including RLS. CI as a gate, not a place tests run. The flakiness budget. **Mutation testing as the
instrument coverage is not.** **The seam between deterministic shell and probabilistic core.**

**Checkpoints** ① one unit test that fails for the right reason, then passes · ② the four test doubles,
each used once where it belongs · ③ integration tests against real Postgres, including two RLS policies ·
④ the record-replay model client, with a split-frame stream recorded · ⑤ green required check in CI, plus
a mutation score at or above 70% on the module you scored.

**Artifact** `LAB` — one shipped repo from zero tests to a green required check: about fifteen unit, five
integration against real local Postgres including two RLS policies, CI as a merge gate, a written
flakiness budget, **and a mutation-testing run with a disposition written for every surviving mutant.**
**The runner moves from M3’s bare `node --test` to vitest here** for watch mode, TypeScript and ESM
handling without a build step, and the fixture ergonomics — **not because `node:test` lacks mocking**,
which it has had for years in `mock.fn`, `mock.method`, `mock.timers` and `mock.module`. Say which of
those reasons is actually yours; a reviewer who runs Node’s test runner daily will ask.

**Plus the single most reused fixture in this curriculum, built once here:** a **record-replay model
client** in TypeScript covering a streamed response **with frames deliberately split mid-frame and
mid-multibyte-character** (the grapheme case from M4 and the frame parser from M7), a tool-use block,
and a refusal carrying its `stop_details`.

> **Exported:** the record-replay model client → M12 (the zero-cost CI tier).

**GATE** — **REFEREE:** your reviewer, reading the **mutation score** — a number you cannot argue with —
plus bug reports taken from **already-closed public issues** so the exercise is not self-administered.
**PASS:** a mutation score **around 70% on the module you care about**, with a written disposition for
every surviving mutant. The number is a target, not a law — it is high enough to catch assert-nothing
tests and low enough to reach, and a full-repo run against a suite with real Postgres integration tests
is slow enough that scoping it to one module is the right call. **Say which module you scored and why.**
And on a sourced bug, failing test first, then fix, explaining why the test would still fail if the fix were wrong in a
*different* way. **ON FAIL:** surviving mutants in code you claimed was covered — the tests assert
implementation, not behavior.

> Mutation score, not coverage, is the instrument that tells you whether a test would actually catch a
> regression — which is exactly what "tests that fail for the right reason" asks you to prove.

**Most-missed:** Testing what the code does rather than what it should do. **A test that has never
failed has never been tested.** · `vi.mock()` on your own modules until the test mirrors the
implementation — failing on refactors, passing on bugs. Mock at the network or process boundary, never
your own seams. · Mocking the Supabase client and asserting on `.from().select()` chains — that tests
your mental model of Supabase. · Seeding *and* asserting with the service key, bypassing RLS entirely, so
the test proves nothing about what a real user sees. · `retries: 2` or `sleep(500)` (pause half a second), which hides
the bug and triples the suite time.

## M10 — Debugging and Production Observability (45h) · `dependsOn: M7, M5` · **owns: observability**

The highest-leverage module here. Finding a bug you did not write, in a system you cannot reproduce.

**Core concepts:** Stack traces as primary evidence, including minified production traces and why you
ship source maps. Hypothesis-driven debugging and bisection across code, data, time, configuration (config). A real
debugger — breakpoints, conditional breakpoints, logpoints — and when logging genuinely wins.
Structured logging, log levels with real semantics, request-scoped correlation IDs, redaction. OTel
spans and context propagation. Metrics, SLOs, error tracking. Profiling and flame graphs. **Detecting
wrong model output when nothing throws.** **Incident response as a social event**, rehearsed on the
game day your systems reviewer (Track 5) is already in the room for: acknowledge within 5 minutes; post a
severity call plus *what I know / what I am doing / when I will update next*; update on that interval
whether or not there is news; escalate at a trip-wire written down *before* the window opens, **not during it**. 24h
detection is a *solo* baseline (the starting number) — a real rotation measures acknowledgment in minutes. Runbooks and the
blameless postmortem.

**Checkpoints** ① read one real stack trace to its actual cause · ② a bug found with a conditional
breakpoint you could not have printed your way to · ③ structured logs with correlation IDs surviving one
async hop · ④ OTel spans around the model call, queryable · ⑤ the silent-failure detector catching a
wrong-but-200 output · ⑥ the runbook executed by another person during the game day · ⑦ the written
sampling and retention decision, and the postmortem of the outage you caused.

**Artifact** `EVIDENCE` — the flagship instrumented end to end, upgrading the day-one call log from M2:
structured logs with correlation IDs and redaction, OTel spans including the model call (**GenAI
semantic conventions**, not names you invented), error tracking, a silent-failure detector for
wrong-but-200 output, **a written sampling decision and retention window per store.** A runbook for
three failure modes (for instance provider down, connection exhaustion, cost runaway), **executed by an
actual other person during a scripted game day**, plus a blameless postmortem of an outage you caused
during it.

> **Exported:** the model-call span schema → M20 queries it rather than re-deriving.

**GATE** — **REFEREE:** your reviewer, running a fault-injection script that fires at **a time you do not
choose** in a seven-day window and logs the timestamp to a file you do not read. **PASS:** time-to-detection under
24h from instrumentation alone, without being told. Separately: given one trace ID, reconstruct the
whole request out loud. **Time-to-mitigate is scored separately from time-to-root-cause — diagnosing
before mitigating is a failing result.** **ON FAIL:** the detector does not cover that failure class —
add it, re-arm the window.

**Most-missed:** Changing several things at once and redeploying. **A common and expensive habit to
carry into a job**, because it destroys the evidence before you have read it. · Believing the debugger is
for beginners and `console.log` is for professionals. The inversion is real. · Deploying without source
maps, then concluding production errors are unknowable. · **Assuming valid JSON means correct output.**
Constrained decoding guarantees shape, not truth — and it removes the model’s ability to express
uncertainty, so it fills a required field whether or not the input supports it. · Alerting on causes,
producing noise that gets muted — after which the system is unmonitored while looking monitored.
· Postmortems that stop at the code fix without asking why it took 40 minutes to notice.

# LAYER 3 — The AI Production Core (121h)

*What makes you an AI engineer rather than a web developer: real documents in, a way to measure whether the AI is right, and a design you defended in writing. Opens once you can see inside your app.*

## M11 — Ingestion: Real Documents Into a Corpus (36h) · `dependsOn: M5, M8, M10`

The first mile of most real AI products, and a seam that is easy to leave to nobody — most retrieval
material opens at the embedding step, assuming a corpus that already exists as text. **Extraction
quality dominates retrieval quality by a wide margin.** No amount of hybrid search and reranking
recovers a table flattened into word soup at ingestion.

**Core concepts:** What an embedding is — a fixed-length vector a model emits for a text, near for near
meaning — and what it structurally cannot do. Object storage, signed upload URLs, scoped paths and short
expiry. **Private buckets, deny-by-default, server-side content-type and size validation.** Text-layer
extraction vs OCR **vs the page image through a vision model**, and what each one costs you in
provenance. Tables and multi-column layout. **Character-offset provenance** — page-level cannot
verify a span. Ingestion as a resumable job on M8’s queue, with per-file failure. Re-ingestion when the
parser improves. The embedding dimensionality decision.

> **Page-level provenance cannot verify a span.** A citation has to highlight the exact sentence that
> supports a claim, and character offsets into extracted text are unrecoverable after the fact,
> especially through OCR. M18 needs span-level citations, so page-level provenance here is incompatible
> with it. Store **character offsets into the stored extracted text**, with page and section carried
> alongside.

> **Record the embedding model’s output dimensionality in the decision log before you embed anything.**
> It is an M11 decision with an M18 consequence: pgvector indexes `vector` to 2,000 dimensions and
> `halfvec` to 4,000, and several widely-used embedding models emit 3,072. You choose the model here
> but hit the ceiling in M18. Get this wrong and you hit a flat error there and diagnose it as having
> written the index wrong.

> **The third extraction path, and the arm this module makes you measure.** Text-layer extraction and
> OCR are not the only options. Handing the page image to a vision model is what a working team reaches
> for first on a scanned or multi-column document, and it frequently beats OCR on exactly the thing this
> module scores: tables. So run it as a real arm — the **same twenty documents**, the same metric, priced
> in latency and dollars per document. Then try to carry character offsets through it and report what
> happens honestly. A vision model returns text it read off an image, and on a scanned page there is no
> text layer to map those characters back into, so **span-level provenance is the thing this arm is worst
> at.** That is the finding, not a failure of the exercise. M18 needs span citations, so an arm that wins
> on tables and cannot produce offsets is an arm you **name and cut** — the same move M18 makes with
> contextual retrieval. Write down which path each document type goes through, and why.

**Checkpoints** ① twenty documents hand-labeled and split into dev and test before any pipeline code is
written · ② one document uploaded through a signed URL and stored in a private bucket · ③ text extracted
from a digital PDF, a scanned one and a `.docx`, with character offsets kept · ④ the pipeline resumable on
the M8 queue, with the orphan-cleanup job and the retention rule written down · ⑤ the same twenty
documents through a vision model as a second extraction arm, scored on the same table metric and priced
per document, with what happened to character offsets written down.

**Artifact** `EVIDENCE` — a pipeline accepting a real signed-URL upload, handling a digital PDF, a
scanned PDF, and a `.docx`; character-offset provenance on every chunk. **A private bucket with
deny-by-default, scoped short-expiry signed URLs, server-side content-type and size validation, an
orphan-cleanup job, and a stated retention policy.** Resumable on M8’s queue. Scored against **twenty
hand-labeled documents, split dev/test at creation** — and the **vision-model arm measured against the
same twenty**, named as kept or cut, with its provenance result stated either way.

> **Exported:** the corpus and its offsets → M18. The embedding dimensionality decision → M18
> (the **column** holds thousands more than the **index** will take: an HNSW index caps at 2,000
> dimensions for `vector` and 4,000 for `halfvec`).

**GATE** — **REFEREE:** your reviewer, scoring against your twenty hand-labeled documents — a number you
cannot fudge. **PASS:** state what percentage of tables your parser destroys, with evidence; show a
citation that **highlights the exact span** in the correct page of the correct source; and say which
extraction path each document type goes through, with **the vision arm's table score and its provenance
result on the record — kept or cut, and why.** **ON FAIL:**
provenance is page-level — rebuild to offsets before M18.

**Most-missed:** Storing page-level provenance, then discovering in M18 that span citations are
unverifiable and offsets are unrecoverable after the fact. · Making the bucket public under time
pressure. A misconfigured bucket is none of injection, XSS, CSRF or SSRF, so the standard exploit set will
not catch it. · Picking a 3,072-dimension embedding model without checking the pgvector index ceiling. ·
Running the vision arm, finding it wins on tables, and adopting it without checking whether it can still
produce the character offsets M18's span citations are built on.

## M12 — Evals: The One Harness and the Stats Lab (70h) · `dependsOn: M10, M6, M9` · **owns: evals**

The differentiator. Also the concept most often taught **several times, in incompatible substrates.**
Built once, here.

**Core concepts:** Trace capture — the exact input, usage, `stop_reason` and attempt count. **Error
analysis: open coding → axial coding**, producing a named failure taxonomy with counts. What an eval is —
a dataset plus a runner — and why it is not a test. Assertion graders before any model grades anything.
**LLM-as-judge calibrated against human labels**, reported as TPR/TNR. Inter-annotator agreement and
rubric revision. Train/test discipline: split at creation, open test once. Structured output as a
reliability mechanism and its limit. CI-gate economics: tiered gates, recorded fixtures, a dollar
ceiling. **Prompt and model lifecycle** — versioning, pinned model IDs, the forced migration.

**Checkpoints** ① the harness skeleton: Postgres tables plus a TypeScript runner that scores one case end
to end · ② session 1 of 4: 25 traces hand-read and labeled, no taxonomy yet · ③ sessions 2–4
done: 100 labeled traces and a failure taxonomy with counts, written after the reading rather than
before · ④ dev/test split made at creation and recorded, so it cannot be quietly re-drawn later · ⑤
assertion graders covering the failures that do not need judgment · ⑥ a judge with a measured confusion
matrix against your own labels · ⑦ inter-annotator agreement: the reviewer labels 30 from your rubric
alone, and the rubric is what gets revised · ⑧ the tiered CI gate: a smoke set on every push, the full set
nightly, recorded fixtures so graders cost nothing · ⑨ the fail condition stated as a statistical
threshold with its bootstrap interval, not as a single number · ⑩ a deliberate model-family migration
gated only by this eval set · ⑪ `stats-lab`: the four tests you will actually use, each run once against
your own data.

**The Stats Lab, folded in.** The gate demands a bootstrap confidence interval, TPR/TNR, and a
confusion matrix, so they are taught here, covering only what the curriculum consumes — the four tests
you will actually use, each run once against your own data: base rates and why accuracy lies when
failures are rare; the confusion matrix and TPR/TNR computed by hand on your own 100 labeled traces;
percentiles from a raw latency array and why averaging them is wrong; **bootstrap resampling written
from scratch**, and with it how many labeled examples you need before a delta means anything.

> **Resample the differences, not the two scores.** Every comparison this program asks you to make — a
> prompt change against the same 100 cases, one retrieval arm against another on the same queries — is a
> **paired** comparison: the two sides answered the same items. Resampling the per-item differences
> cancels the difficulty of each item and gives an interval meaningfully tighter than subtracting two
> independent ones. Doing it unpaired makes almost every real improvement look inconclusive, which
> teaches you to distrust a working instrument.

**Three things that are each the difference between a harness a team adopts and one they quietly stop
citing:**

**Inter-annotator agreement.** If you label 100 traces as the sole annotator, the rubric encodes
one person’s discovered preferences and has never survived a second opinion. **Cash in the
standing reviewer:** they independently label 30 of the 100 using *only your written rubric*, with no
conversation first. Compute agreement. Where you disagree, **the rubric gets revised, not the labels**,
and you repeat.

**Train/test discipline, stated once and inherited by M18.** Split every golden set into **dev and test
at creation, before any retriever or grader exists.** All tuning touches dev. Test is opened once, at
gate time, and **the reported number is the test number with the dev–test gap stated alongside.** Tuning
against the same set you then report is the classic leak, and the reason most self-reported eval
numbers are worthless.

**The CI economics — because this is the most hireable artifact here and the one most likely to be
silently switched off.** Not because you failed to build it, but because it costs real dollars on every
push and red-lights at random. Own all four:
- A **tiered gate**: a smoke tier of about fifteen cases on every push; full set nightly.
- **Recorded-fixture mode** (M9’s record-replay client) so graders run at **$0** and only the judge
  tier calls the model.
- A **per-run dollar ceiling** printed in the job summary.
- A fail condition stated as **a statistical threshold with its bootstrap CI**, not a pass/fail count.

**Artifact** `EVIDENCE` — one harness, and only one, on your stack: Postgres + a TypeScript runner, no
platform. 100 hand-read and labeled traces **(four sessions of 25 — no taxonomy until the reading is done; this is
the most boring and most valuable work in the curriculum)**, a named failure taxonomy with
counts, assertion graders, a judge with a **measured confusion matrix** against your labels, the
inter-annotator agreement above, the dev/test split at creation, and the tiered CI gate above. Then
prompts versioned with pinned model IDs, and **a deliberate migration to a different model family gated
only by your own eval set**, written up as a regression table including what you could not recover. Plus
a `stats-lab` `LAB` repo.

**One harness, many datasets.** M18’s recall@k and M19’s agent trajectories are **datasets inside
these same tables and this same runner** — not their own measurement substrates — and M23 gates deploys
on it, M25 ports it.

**Trajectory evaluation — because "how do you know your agent works" is the first question any team
shipping agents asks.** A step-level grader (was the correct tool called with the correct
arguments) and an outcome-level grader (did the task complete), reported alongside cost and step count
per run. M19 uses these graders; traces that are *captured* but never *scored* are not an eval.

> **Exported:** the dataset table, assertion graders, and calibrated judge → M18, M19, M23, M25.

**GATE** — **REFEREE:** your reviewer, handing you a prompt change that is scored against your
**held-out test set** — a number you cannot argue with. **PASS:** return ship/no-ship with a bootstrap
CI; state your judge’s TPR and TNR **and your human-to-human agreement — corrected for chance, not as a
raw percentage**, because on a skewed label set two annotators who pass everything agree ninety per cent
of the time and have agreed about nothing (Cohen’s κ is the usual measure; say which you used); name the criterion that
produced the most disagreement and how you rewrote it; **and break the gate on purpose on a branch and
keep the red check — a rehearsal, and labeled as one**, because waiting for a real regression to arrive
before gate day is not something you can schedule. If a real regression fires it later, replace the
screenshot with that one. **ON FAIL:** your judge is uncalibrated — re-label 30 traces and recompute.

> That last clause is not ceremony. **Break your own eval gate once on purpose, on a branch, and watch it
> block the merge.** A gate that has never fired looks exactly like one that is wired up wrong. Keep the
> red check as evidence.

**Most-missed:** **Reporting accuracy instead of TPR/TNR.** When failures are rare, a judge that always
says "pass" scores 92% and is worthless. This is the first thing to check in anyone’s eval work,
including your own. · Generic categories — "hallucination," "unhelpful." Unactionable. "Calendar Scheduling Failure"
is a fix; "poor coherence" is a shrug. · **Delegating the labeling to an LLM.** The LLM clusters notes
you already wrote. People discover what they actually care about *through* labeling. · Building the set
from cases you invented. An imagined set measures imagination. · A runner that re-implements the model
call "to keep the eval clean" — then it measures a different system than the one that ships. · Same
model as generator and judge *without measuring what it costs you.* Self-preference is real, and the
confusion matrix you already built is what shows it: if the judge's errors line up with the generator's,
you will see them there. A same-family judge with a measured matrix beats a different-family judge with
none. · Believing schema enforcement solved reliability. It solves shape, not
content.

---

## M13 — System Design and the Design Doc (15h) · `dependsOn: M8, M10`

The queue half lives in M8. This is the interview-shaped half, correctly late.

**Core concepts:** The client-server trust boundary again, this time as a thing you draw for someone
else. Statelessness and why a shared counter is the hard part. The serverless execution model, measured rather than blog-post-quoted. Caching in three layers and
the invalidation for each. Graceful degradation, backpressure, what happens when the model is down.
**The forward-looking design doc** — problem, constraints, options, risks, rollout — the mid-level
artifact at most companies, and the highest-leverage move available to an engineer with no credential,
because it is public, durable, and evaluated purely on the quality of thinking.

**Checkpoints** ① the one-page design doc written, with the two options you rejected and why · ② a real
reader’s pushback on it, and the version that changed because of it · ③ the first timed design rep done
and debriefed, on a system outside your stack.

**Artifact** `EVIDENCE` — a one-page design doc with two rejected options for a bounded AI system,
**reviewed and pushed back on by a real reader before any code exists.** Keep both the proposed and the
built version; the delta is the interview material. **Plus three timed 45-minute design reps**, one hour
each including the debrief, one per month from the application date, each on a different bounded
system and at least one deliberately *outside* your stack — you will walk in with real p99 numbers and a
real durable queue (and, once M20 is passed, a real cost-per-completed-task table), and no reps at
saying any of it.

**GATE** — **REFEREE:** the mock interviewer, who must ask questions you did not anticipate — this gate is
unadministrable alone. **PASS:** 45 minutes at a whiteboard on one bounded AI system end to end including
observability and the failure path, surviving three unscripted follow-ups. Plus: "here is where my design
was wrong and how I found out." **ON FAIL:** rehearse the weak branch and re-book.

**Most-missed:** Treating server and client as a lint rule rather than two physically different computers.
· "Serverless means stateless so I’m fine" — instances are reused, so module-level state persists
*sometimes, unpredictably*, which is worse than never. · Caching the final response keyed on the raw
question — almost never hits, leaks across users when it does. · Retrying into an outage; a 429 means
send less traffic. · Reaching for Redis or Kafka in minute three, before anyone established the
read/write ratio. **The mid-level rubric rewards thoughtful simplification.**

## ▲ HARD GATE — Layer 3 → Layer 4

**Layers 4–6 — thirteen modules, M14 to M26 — do not start until all four are true:**

1. The flagship is deployed and reachable.
2. At least **two real users** who are not you — or the labeled fallback taken in their place, with what
   it costs you written down.
3. **~100 logged traces containing real failures** — on the fallback, 100 cases you labeled yourself over
   a public corpus.
4. M12’s harness runs green in CI against those traces.

If you are here without them, stop and execute M0’s traffic milestone. If it fails, take the labeled
fallback and write down what it costs you. **What no version of this gate accepts is a tick with nothing
behind it.** Whichever line you took, write down who used it or what corpus you labeled, and when. **Do
not proceed by inventing traces.**

---

# LAYER 4 — The Craft II (155h)

*Working in other people’s code and with other people. Learned while you are interviewing.*

## M14 — Reading and Changing Code You Did Not Write (52h) · `dependsOn: M8, M9, M10`

What the first 90 days of any job actually is. **Greenfield is a rounding error in the first six months
of any job** — that is the whole argument, and it needs no statistic.

**Core concepts:** Tracing one real user action end to end — architecture is the *output* of tracing, not
the input. A predict-then-ask protocol for using AI on code you are learning. The three layers of code
search: ripgrep (lexical), ast-grep (structural), LSP (semantic). Reading tests as executable
specification. Git history as documentation — blame, pickaxe, `log -L`, bisect. Inferring unwritten
conventions. Chesterton’s fence. **Characterization tests around code you don’t understand.**
Strangler fig, **the resumable backfill** (on M8’s queue), the dual-run cutover.

**Checkpoints** ① trace one user action end to end with `file:line` at every hop · ② answer "why is this
line here" using pickaxe and `log -L`, not blame alone · ③ characterization tests pinning an untested
module, bugs included · ④ a behavior change behind a flag, both paths green · ⑤ the resumable backfill
over 100k rows, killed and restarted clean · ⑥ the dual-run cutover on a deterministic feature.

**Artifact** `EVIDENCE` — four pieces:
1. A written end-to-end trace of one user action in a real repo with `file:line` at every hop, **plus
   getting it running from a cold clone and writing the setup doc that was missing.**
2. Characterization tests locking in an untested module’s behavior *including its bugs*, then a behavior
   change behind a flag with both paths green.
3. A resumable backfill over 100k rows on M8’s queue — killed halfway, restarted, zero double-processing.
4. A dual-run cutover on **a deterministic feature** — a pure-function or query-path refactor where old
   and new outputs diff exactly.

> **#4 is deliberately not an AI feature.** Comparing two versions of a model-backed feature and
> justifying a cutover **is an eval**, and M12 is where you learn to do that properly. Do it here and you
> produce exactly the vibe comparison table M12 exists to prevent. Keep the target deterministic, where
> the comparison is unambiguous and the lesson is actually about cutover.

> **Exported:** characterization tests → M15.

**GATE** — **REFEREE:** your reviewer, who reverts a merged bug-fix commit from the ones you saved unread
in M1 and scores you against the maintainer’s actual merged diff. **PASS:** state the root cause out loud
in **one sentence** before writing any fix — scored separately, and a correct diagnosis with an
unfinished patch passes the diagnosis half. Then arrive at a fix that matches the maintainer’s on the
behavior (not necessarily line for line), 3 of 5 attempts, **two of them tightened to 45 minutes.** Then
defend three things you thought were wrong and deliberately did not change. **ON FAIL:** pull the next
commit from the queue in 7 days. Never read the fix commits.

**Most-missed:** Reading directories top-down, or asking for an architecture overview first. · Asking
the assistant to produce the answer rather than pressure-test yours. People who ask it questions learn
the code; people who hand it the task do not. · Searching (grepping) for a function name and treating the hits as
the complete blast radius. · `git blame` as the final answer — it gives the last commit to touch the line,
usually a formatting sweep. `git log -S` and `git log -L :funcname:file` answer "why is this here."
· Pattern-matching ugliness to badness. **Your confidence is highest exactly where your context is
lowest.** · Waiting to understand the whole system before opening anything. The most common ramp killer.

## M15 — Git, Review, and Code Other People Maintain (46h) · `dependsOn: M14`

"I need to understand code" has a reading half and a writing half. M14 owns reading. **This owns
writing** — the judgment that produces a convention rather than conforms to one. Structure and naming
are what the overwhelming majority of code-review comments are about.

**Core concepts:** The git object model — commits are snapshots, refs are pointers, the index is a third
thing. What merge/rebase/squash do to the graph. Resolving a conflict, including the kind that merges
cleanly and is still wrong. reflog, revert vs reset, shared-branch etiquette. Atomic commits and a PR a
reviewer can act on. Giving and receiving review, including of AI-written code. **Naming, module
boundaries, cohesion and coupling, dependency direction, the rule of three, deleting code, making an
error message actionable.** The three async artifacts a remote team runs on — **and you produce them:**
twenty daily-shaped written updates posted publicly in the issue thread across the four weeks around your
first submitted PR (what I did, what I am doing next, where I am stuck, what I currently believe), one
real blocker escalation, one decision record against real friction. You train a monthly rhythm for the
whole program then join a team running a daily one; autonomy read through silence reads as stuck.

**Checkpoints** ① the object model, out loud: what a commit, a ref and the index actually are · ② the
recovery lab: six disasters, each recovered and explained · ③ one conflict resolved by reading the merge
base, not by picking a side · ④ a file you were confused by, restructured behind characterization tests ·
⑤ failure paths rewritten to actionable messages · ⑥ one PR through a full review round trip, 15+
comments · ⑦ twenty working-day updates posted in public, and the sealed brief handed over for M16.

**Artifact** `EVIDENCE` — five pieces to a real reviewer: a recovery-lab log of six deliberate
disasters, each recovered and explained; **a file you have personally been confused by while editing,
with at least three responsibilities, chosen and justified in writing before you touch it** (not "a
500-line file" — a length is not a criterion), restructured behind M14’s characterization tests
with a line-item rationale for every boundary moved; every failure path in one feature rewritten to
actionable messages (expected / received / what to do).

**Fourth, and it is the one that actually changes how you are read:** one PR carried through a **full
round trip with at least fifteen comments** — at least two pushed back on with reasoning, and at least
one where you **changed your mind and said so.**

**Fifth:** twenty consecutive working-day updates posted in public, and **a sealed brief handed to your
reviewer for M16’s gate** — written now, weeks before it is used, so it cannot be shaped around what you
expect.

> How you answer review is a larger part of your reputation than the diff. **Silent compliance under a
> senior’s disagreement is the exact behavior that reads as not-mid-level** — and so is arguing every
> point. Both are visible in a thread; neither is visible in a merged diff.

**GATE** — **REFEREE:** a real maintainer’s review thread. **PASS:** **three review rounds completed,
every comment either addressed or argued in writing, zero structural comments on the final round.
Plus twenty consecutive working-day updates posted in public, and the reviewer can reconstruct your
month from the thread alone without asking you.** **ON FAIL:** the structural comments *are* the
curriculum — address and resubmit.

> The gate is not "merged," because that conditions your progress on **a stranger’s inbox.** Gate on
> what you control; track merges as a lagging metric.

**Most-missed:** Treating rebase as a cleaner merge. It is history rewriting: new SHAs, and anyone who
pulled is now diverged. · Resolving a conflict by picking a whole side without re-reading the function,
and never looking at the merge base. · Commits that map to time spent rather than units of change; mixing
a rename with a behavior change in one commit. · A PR description that says what the diff already says
instead of why, and omits how to verify it. · Silent compliance under a senior’s disagreement. That is
the exact behavior that reads as not-mid-level — and so is arguing every point. · Explaining in a call
what should have been a comment on the line. If it is not written on the PR it did not happen.

## M16 — Working with Coding Agents Professionally (28h) · `dependsOn: M14, M15`

Treating agents exclusively as a threat — and never as the throughput standard of the team you are
joining — produces an engineer who is correctly suspicious and half as fast as everyone around them,
measured from week three. Scheduled **after** M14 and
M15 so the interrogate-never-author discipline stays in force during the period it protects.

**Core concepts:** Writing a repo’s agent config so generated code conforms to house conventions.
Decomposing a ticket into agent-sized units with verifiable exit criteria. Reviewing a 400-line diff by
reading test changes and boundaries first. The categories never to delegate — auth, money, migrations,
anything unverifiable. Sandboxing and permission scope. Spec-driven development and the
underspecified-spec log. What a run costs.

**Checkpoints** ① the delegation policy written, and the pre-commit hook that enforces it · ② three real
tickets handed to an assistant, with a defect log naming which module let you catch each one · ③ one
flagship feature shipped in a timebox with assistants, measured against one written by hand.

**Artifact** `EVIDENCE` — a **defect log** from handing an agent three real tickets in a repo you did
not write, naming for each defect *which earlier module let you catch it*; **a one-page delegation
policy, enforced by a pre-commit hook that has actually blocked an agent-authored change twice on real
work**; **a spec-driven slice** — write a specification with explicit acceptance criteria, have an agent
implement against it, and keep a log of every place the spec was underspecified and what the agent did
in the gap.

**And a throughput artifact.** The module’s own thesis is that being slow is the failure mode, and the
three artifacts above are all *defensive*. Ship **three small flagship features with agents and three by
hand, alternating** so the ordering and the learning do not all favor one side, with hours, review
findings and defects reaching production **reported as a spread and not only as two medians.** If you
only have time for one pair, that is fine — **report it as an anecdote with n=1 and say so out loud.**
Both are usable. **What is not usable is a single pair of features presented as a measurement**, which
is the vibe comparison table M12 exists to prevent.

> That produces a number you can say out loud, which is what the module’s thesis demands. The
> underspecified-spec log is the stronger interview object, though — it is direct evidence of the
> judgment an AI-assisted coding round is scoring.

**GATE** — **REFEREE:** a second agent instance with a **sealed brief your reviewer wrote weeks
earlier** (in M15), planting **0–3 defects per diff, count blinded, with at least one clean diff.**
**PASS:** find the planted defects across five diffs with false positives scored separately. Plus the
behavioral version: a pre-commit hook enforcing your delegation policy that has **actually blocked
agent-authored diffs twice on real work.** **ON FAIL:** you are pattern-matching, not reviewing — redo
with a new sealed brief.

> Knowing in advance that each diff contains exactly one defect is most of the answer — hence the blinded
> count.

**Most-missed:** Accepting suggestions and moving on, producing a transcript of a person being driven by
a model. · The purity play — refusing to touch the assistant in an interview round whose rubric line is AI
fluency.
· Measuring nothing, so the module’s own thesis (being slow is the failure mode) has no number attached
to it.

## M17 — Scoping, Estimating, and Someone Else’s Priorities (29h) · `dependsOn: M14, M12`

The definitional mid-level skill, structurally invisible to a solo builder. When you build your own
ideas you are your own product manager: scope is infinitely elastic, nothing is late, nothing is cut,
nobody is waiting. The failure mode is precise — a technically fine hire who disappears for nine days on
something that should have been two, delivers more than was asked, and reads as "not ramping." It is
what most "great, but not mid-level yet" feedback actually means.

**Core concepts:** Turning a vague request into clarifying questions. Decomposing into one-to-two-day
independently shippable slices. Estimating, and naming the riskiest assumption. Renegotiating when the
estimate is wrong. The open-ended quality ticket. A capability-question protocol: cheap,
expensive-and-uncertain, structurally impossible. Explaining a limit to a non-engineer who wants a
guarantee.

**Checkpoints** ① the scoping doc for one real request: what is in, what is out, how it is cut · ② an
estimate written before the work and the actual time beside it · ③ one open-ended request delivered as a
plan with a number, not as an answer.

**Artifact** `LAB` — three scoping docs against real open issues (clarifying questions, slice
decomposition, estimate with named riskiest assumption, and an explicit "here is the 20% version if you
need it Thursday"). Then build one and log **actual vs estimate** with a post-mortem on where the
estimate broke.

**Plus the two that only exist in AI product work:**

**The open-ended quality ticket**, run against **a real OSS AI application you did *not* write, with
prompts in-repo and no decision log** — on your own system it tests measurement; on a stranger’s it tests
measurement plus archaeology, which is the actual job. *"The assistant is getting worse, find out why."*
These have no known-achievable endpoint and absorb three days or three months identically. Deliver a
**timeboxed plan**: the current measured number, a target, ranked interventions with **expected gain per
hour**, a hard checkpoint at 50% of the box with a written **stop-or-continue rule**, and an explicit
statement of what you report if the target is missed.

**The capability-question protocol** — the thing that separates the mid band from the one above it, and
the place M6’s structural-boundaries content finally gets cashed in as a *communication* skill. Three
buckets: cheap and near-certain · expensive and uncertain, needs a timeboxed spike · **structurally
impossible.** Practice against the reviewer playing a PM **instructed to push for a yes.**

Then write one page: **a response to a product request that is not achievable as stated** — *"the
assistant should never cite something that isn’t in the document"* — naming why in plain language,
offering the achievable version **with a measured number from your own eval set**, and stating what the
residual failure rate means for the user.

> That page is also the best answer you will ever have to "tell me about a time you pushed back."

**GATE** — **REFEREE:** a vague two-sentence ticket written by the reviewer, cold, and the reviewer
playing a PM who will not take no. **PASS:** clarifying questions and a sliced plan in 15 minutes;
defend what you would cut if the deadline halved; **and report a result that missed its target, in
writing, without apologizing and without asking for more time.** **ON FAIL:** more data points — the
estimate log is a standing item from M3, not three points gathered here.

> **The estimate log is a standing item from M3, not three data points here.** Costs nothing, produces
> dozens of points by the time you are interviewing, and *"my median estimate error is X and I most
> reliably underestimate Y"* is a better mid-level signal than anything else in this document.

**Most-missed:** Disappearing for nine days on something that should have been scoped to two, and
delivering more than was asked. This is what most "not mid-level yet" feedback means. · Having no
stop-or-continue rule on an open-ended ticket, so it absorbs three days or three months identically.
· Apologizing for a missed target or asking for more time, instead of reporting the result and the
evidence.

---

# LAYER 5 — The AI Layer, Completed (157h)

*Search you measured, AI that takes actions on its own, what each request (one message a user sends your app) costs, and keeping the whole thing safe.*

## M18 — Retrieval You Actually Measured (44h) · `dependsOn: M11, M12`

**Build the measuring instrument before the retriever.** Imports M12’s dataset table and graders —
swapping in retrieval graders is hours, not a rebuild.

**Core concepts:** **pgvector: HNSW parameters, the *index* dimension ceiling (2,000 for `vector`,
4,000 for `halfvec` — the column itself holds far more), and the recall/latency curve.** Chunking — why fixed-size is the right baseline and what contextual
retrieval actually fixes. Two-stage retrieval: hybrid lexical+semantic fused with RRF, then a
cross-encoder reranker. Agentic and iterative retrieval. **Grounding and span-level citation
verification** against M11’s character offsets. The long-context baseline, and when to skip retrieval
entirely. **The embedding lifecycle** — batched generation, cost per 1,000 chunks, re-embedding.

> **The filtered-search trap, with the correct mechanism.** A `WHERE` clause does not
> bypass the HNSW index; the filter is applied as the index returns candidates, so the symptom is
> **returning fewer rows than your LIMIT**, not slower queries. Since pgvector 0.8.0 the fix is
> `hnsw.iterative_scan`, **which ships off** — so your recall@10 gate number is measured under an unnamed
> GUC that changes it. Name it. The Supabase-specific version: chaining `.eq()` after `.rpc()` applies the
> filter in PostgREST *after* the SQL function already ranked and limited, returning plausible rows that
> are the wrong ones.

**Checkpoints** ① the measuring instrument first: a golden set, split dev/test at creation, with the
number of test queries written down before anything is measured · ② a recall@k baseline number, stated
with its bootstrap interval · ③ hybrid + RRF measured against it, delta and interval reported together ·
④ reranker measured, with the candidate depth that actually matters, delta and interval together · ⑤ the
arms you did not run, named in writing, with the corpus size that would have justified running them ·
⑥ the long-context comparison run once on the same queries and priced — an anecdote, labeled as one, not
a ranked arm · ⑦ span-level citation verification against M11 offsets · ⑧ embedding lifecycle: batched,
priced per 1,000 chunks, re-embedded behind the read switch · ⑨ whether your delta’s interval crosses
zero, said out loud in the README, whichever way it came out.

**Artifact** `EVIDENCE` — retrieval over M11’s corpus, on M12’s runner and tables, with a measured
**recall@k baseline**, then **two** interventions measured independently: **hybrid+RRF and a reranker.**

**Two, not five, and the reason is the corpus.** M11 gives you twenty hand-labeled documents and about
twenty-five hand-written queries split dev/test, which leaves roughly **ten queries in the test half**.
Recall@10 over ten queries moves in steps of 0.1 and its bootstrap interval is about ±0.3. You cannot
rank five arms on that; **there is no third split left to re-measure a winner on**, and taking the
maximum of five would bias the margin upward in a way no re-measurement here can undo. So: two arms,
each reported with its interval, and **contextual retrieval named in writing as the arm you cut, and
why.** Run the long-context comparison (same queries, no retrieval) **once as a priced anecdote rather
than as a ranked arm**, and label it that way.

Then span-level citation verification against M11’s character offsets. **Embedding lifecycle:** batched
generation with rate-limit handling, measured cost per 1,000 chunks, a re-embed as a restartable backfill
behind a dual-index read switch (M14’s resumable pattern, if you have passed it). A written table of what
each arm bought, what it cost in latency and dollars, **and which ones did nothing.** Built with M12’s
split discipline — **the reported number is the test number.**

**GATE** — **REFEREE:** your reviewer, scoring against your held-out test set, half of it hand-written.
**PASS:** state your delta **together with its bootstrap interval and the number of queries behind
it**, and say out loud **whether the interval crosses zero.** With a set this small it very probably
does, and then the finding is *"I cannot distinguish these two with the data I have"* — **saying that
plainly is the pass condition, not a failure of the module.** Then state recall@10 before and after
**with the `hnsw.iterative_scan` setting named and the dev–test gap stated**; **name the arm you cut and
the size of corpus that would have justified running it**; and **defend your routing rule between
retrieval and long context using your own numbers.** **ON FAIL:** the golden set is LLM-generated, or you
tuned on the set you reported, **or you reported a winner with no interval** — hand-write 25, re-split,
re-run.

> "Should this be RAG or just long context?" is the live architectural question in 2026 and the
> instrument to answer it already exists once you have a golden set. One priced anecdote, labeled as
> one — not a row in a ranked table you do not have the queries to support.

**Most-missed:** Evaluating end-to-end with a judge scoring answer quality. **Answer quality hides
retrieval failure** — a strong model answers correctly from pretraining even when retrieval returned
garbage. · Generating the golden set entirely with an LLM: synthetic queries are written *from* the
chunk, leak its vocabulary, and every retriever scores artificially high. · Treating HNSW as exact search,
and never measuring recall at all. · Reranking too few candidates — if the right chunk is at rank 73 and
you rerank the top 10, the reranker is pure added latency. · Skipping lexical search, which is why queries
with an error code or a person’s name fail on pure vector. · Asking for "citations like [1]" and trusting
them. Free-text markers are generated text; if citations are not machine-checkable against offsets, you
have the appearance of grounding.

## M19 — Agents and Tool Use (49h) · `dependsOn: M7, M8, M6, M12`

**Core concepts:** The agent loop at the wire-format level, no framework. **Writing a tool definition a
model can actually use.** Reactive loop vs plan-then-execute, and when a second agent is overkill. State,
memory and durability across steps — **durable state on M8’s queue.** Append-only thinking-block
replay. **Context management across a long run: compaction**, which summarizes what came before, and
**context editing**, which clears old tool results or thinking blocks outright — what each is for, and
when each is the wrong answer. Failure taxonomy and validation between steps. Loop detection and cost
runaway prevention.
Human-in-the-loop checkpoints for irreversible actions. **Containment as an enforced execution
boundary, not a permission table.** MCP — pin the spec revision. Trajectory tracing and silent-failure
detection.

> **Thinking-block replay — miss it and it silently breaks the loop.** Whatever you send back on the
> next turn, **you may not edit what you already sent**: rewriting earlier thinking or `tool_use` blocks
> breaks the model, so **the loop must be append-only.** The classic 2024 bug — appending the assistant’s
> text and dropping the `tool_use` blocks — is the exact predecessor of this one. **Resending the whole
> conversation unchanged every turn is one shape, not the only one:** compaction and context editing are
> the other two, and part of this module is knowing when each is the wrong answer.

> **MCP: pin the revision.** MCP is a versioned specification with dated revisions and breaking changes
> between them. **Look the current revision up the week you build, write it down, and be able to name one
> thing that changed in it.** Do not take a revision date from this page; the point of the exercise is
> that you checked. A tutorial that names no revision is showing you some past shape of the protocol.

**Checkpoints** ① one tool call, round-tripped by hand at the wire level · ② the loop: multi-step, with
`tool_use` and thinking blocks replayed append-only · ③ the budget governor and loop detection, holding
under a fuzzed input · ④ durable state: kill the process mid-run and resume correctly · ⑤ containment: a
blocked host and the metadata endpoint both refused · ⑥ trajectory evals scored by M12 graders,
step-level and outcome-level.

**Artifact** `EVIDENCE` — a hand-rolled agent loop with a hard-stopping budget governor, loop detection,
an approval gate on irreversible actions, durable state on M8’s queue, append-only thinking-block replay,
replayable trajectory traces **scored by M12’s graders**. **You write the governor yourself because that
is how you learn what it has to do; then compare it against the server-side task budget the provider
offers, and write up what each one catches and what each one misses.** Yours stops the run; theirs is a
ceiling the model can see, so it paces itself and finishes rather than being cut off. Plus the context
management above — compaction and context editing, and when each is wrong. Then one small MCP server
against a named spec revision. Then the same agent on the SDK’s tool runner, with a written comparison of what the hooks
bought and what they hid.

**Containment is an execution boundary, not a permission table.** Bounding cost and reversibility is
not enough; you must also bound **blast radius.** Every tool executes behind one *enforced* boundary: a
container or hosted sandbox for anything code-shaped, **a domain allowlist** for anything network-shaped,
a path prefix for anything filesystem-shaped, plus per-tool timeout and memory caps. **Assert on the
policy, not on the response:** show the allowlist refusing the request *before a socket opens*, with the
denial in your own logs. Then, separately, point a tool at `169.254.169.254` **and at an RFC1918 address
on your own network** as regression cases — and note in writing that **a refusal there may be the
platform rather than you.** A cloud metadata service usually refuses a bare request on its own account,
and a serverless host may have nothing at that address at all, so **a green result there proves nothing
about your egress policy by itself.**

> Your agent is the one place in the whole system where an attacker-controlled string reaches an
> outbound fetch. M21 teaches SSRF by exploiting it — **one of M21’s five exploits runs through this
> agent’s own fetch tool.**

**GATE** — **REFEREE:** your reviewer, sending a kill signal at a random point, plus **200 adversarial
inputs from a second agent with a red-team brief and no knowledge of your governor**, with the spend
assertion living in the test suite. **PASS:** resume correctly after a mid-run kill; replay a failed
trajectory and name the causing step; the cost ceiling holds across all 200; **the allowlist denial is
in your logs for the blocked host, and the metadata and RFC1918 private-network regression cases
both refused.** Plus: report your agent eval set’s step-level and outcome-level
scores. **ON FAIL:** the governor caps iterations but not spend — fix and re-run.

> Fuzz the ceiling, don’t demo it. A demonstration you designed proves you can construct a passing case.

**Most-missed:** Treating the message array as a chat log of strings — dropping `tool_use` blocks,
producing an agent that re-calls the same tool forever. · Tool descriptions written as API documentation
instead of decision-support for a model choosing among eight tools. · Error paths returning the raw text of an
exception (the error object code throws), which teaches nothing and causes retry of the identical failing
call. · Adding agents to solve what
is actually a bad tool definition or a context problem. · Saving state (persisting) *after* the step
instead of around the side effect (the change the step makes in the world, such as an email sent), which
makes resume a duplicate-execution machine. · Capping iteration count
only — an agent alternating between two tools never repeats at lag-1. · Denying an action by silently
dropping the tool call, leaving a dangling `tool_use` with no result.

## M20 — Cost, Metering, and Unit Economics (30h) · `dependsOn: M7, M8, M6, M12` · **owns: cost**

**Core concepts:** The usage object and the four-number cost of a request, taken further than M6 took
it. Prompt caching mechanics,
breakpoint placement, verifying from the meters. Percentiles from raw distributions. Streaming as a
*perceived*-latency fix, not a real one. **Model × effort routing**, and why caches being model-scoped
hurts a cascade. Cost attribution per feature *and per user*. Budget alerts **and circuit breakers**.
Unit economics, and the product-analytics question — is it worth keeping.

> **Model routing is the wrong first dial.** The **first** quality-trading lever
> after caching is **effort** — measure the most capable model at lower effort *before* building a model
> cascade, because **caches are model-scoped and a cascade forfeits cache reuse.** Make the routing
> experiment two-dimensional: (model × effort) over the same task set, scored by M12’s harness, reported
> as **cost per completed task.**

**Checkpoints** ① the per-user credit ledger, with its decrement proved correct under concurrent
hammering · ② a test-mode subscription whose webhook consumer survives being replayed · ③ the
out-of-credit path and the spend circuit breaker, both proved from outside the app · ④ one weekly report
joining usage, quality and cost into one line per active user · ⑤ the model-by-effort routing experiment
scored by M12, reported as cost per completed task.

**Artifact** `EVIDENCE` — a per-user credit ledger with an atomic decrement **proven by concurrent
hammering** (balance never goes negative); a Stripe test-mode subscription with an idempotent webhook
consumer on M8’s queue that survives replay; a server-rendered 402 path with a correct body, proven by
curl; a circuit breaker on spend; one weekly SQL report joining usage, quality score, and cost into **one
line per active user, including a non-model cost column**; and the (model × effort) routing experiment
scored by M12, reported as cost per completed task.

**GATE** — **REFEREE:** your reviewer, re-running the queries; each number must be reproducible from SQL.
**PASS:** state cost per active user per month, and end-to-end **p50 and p95 with the request count
behind them**, each backed by the query. **If your n does not support a p99, say so and do not quote
one:** on a few hundred requests from a dozen users, p99 is the second-slowest request you ever served,
which is one sample. *"p99 on 300 requests is one request"* is the better answer, and it is the one this
module is actually teaching. Say whether you would keep the feature. **ON FAIL:** you are reporting an average — recompute from the raw
distribution.

**Most-missed:** Reporting an average; computing percentiles by averaging per-minute percentiles.
**Percentiles do not average.** · Quoting a p99 from a sample that cannot support one. On a few hundred
requests, p99 is a single observation, and a hiring manager who asks "what is your n?" ends that answer.
· Measuring time-to-first-byte instead of time-to-first-token. They can
be seconds apart. · Routing on per-token price instead of cost per completed task — a cheap call that
needs three retries is not cheap. · The alert without the breaker; an alert at 3am tells you about money
already spent. · Running the budget check *after* the API call. · Cost per feature but not per user, which
hides the distribution entirely when AI cost per user is extremely skewed.

## M21 — Security and the Trust Boundary (34h) · `dependsOn: M3, M5, M10, M18, M19`

**Core concepts:** Trust boundaries and secrets — what runs where. Authentication vs authorization;
**broken access control as the bug that actually ships.** RLS as a design skill. Injection, XSS, CSRF,
SSRF **at working depth, by exploiting them yourself.** Dependency and supply-chain risk. **Prompt
injection — direct and indirect — contained rather than fixed.** The lethal trifecta (**Simon Willison’s
framing, and say so when you use it**): private data + untrusted content + exfiltration. Tool permission design and excessive agency. **Treating model
output as untrusted input.** PII, log leakage, deletion, and the constraints you do not control.

**The constraints you do not control.** The constraints above are ones you author. On the job you are
handed the others: **approved-subprocessor lists** (adding a vendor is a legal action, not a technical
one), what a DPA does, **zero-data-retention configurations**, data residency, and security
questionnaires — which land on the engineer who built the feature. **The week-one move is asking whether
a vendor is approved before you write code against it.**

**Checkpoints** ① secrets audit: prove what actually ships to the browser by searching the files it
downloads · ② broken access control, exploited **on the deliberately vulnerable copy** then fixed ·
③ injection, XSS or SSRF: one landed, one fixed, one test — **SSRF targets are your own allowlisted test
hosts and private-network addresses on your own network, never a third party’s endpoint** · ④ cross-tenant
file access through a guessed or replayed URL, landed and fixed **on the vulnerable copy with synthetic
tenants — never against production, where the rows belong to real people** · ⑤ one exploit run through the
M19 fetch tool · ⑥ indirect prompt injection landed through
retrieved content · ⑦ tool permissions with a written blast-radius analysis · ⑧ the bidirectional
data-flow doc, with the delete path implemented and tested.

**Artifact** `EVIDENCE` — **every exploit in this module runs against your own deliberately vulnerable
copy of the flagship, on your own machine or your own account, and against nothing else. Running any of it
against a system you do not own is a crime in most countries and the end of the job search this program
exists for.** An attack-then-fix log against that copy: **five** exploits you ran yourself, each with
fix and test. Four are the standard set; **the fifth is
cross-tenant file access — reading another tenant’s uploaded file by guessing or replaying its URL** (a
misconfigured bucket is none of injection, XSS, CSRF, or SSRF — so the standard four cannot catch the leak
you are most likely to ship under time pressure). CSRF against the OAuth callback is M26’s own attack,
once there is a callback to attack. One of the five runs through M19’s agent fetch tool.

A tool-permission design for M19’s agent with blast-radius analysis.

**A bidirectional data-flow document** — not only what flows *in*. Every boundary
customer data crosses, every third party that sees it, the retention setting and jurisdiction at each,
**plus an implemented delete path** removing the user’s rows, objects, embeddings, and trace records; a
written list of what cannot be deleted and why; and a test asserting nothing survives in any store you
control. Plus the constraints you do not control: subprocessor lists, DPAs, zero-data-retention config,
residency.

> Once the flagship has real users their data lands in at least seven places built by different modules.
> Retention is something to *implement*, not merely a thing to name in a document.

> This reconciles a tension the curriculum creates on purpose: M10 and M12 teach you to log everything
> about a model call; this is where that meets not shipping customer PII to a third-party platform.

**GATE** — **REFEREE:** your reviewer, watching each exploit land or not, and a passing deletion test.
**PASS:** five exploits demonstrated and fixed; name every irreversible action in your agent and defend
the containment architecture **without ever saying "I tell the model to ignore injected
instructions"**; state exactly what customer data leaves your perimeter and where it lands; and **state
what happens to every copy of a user’s data when they ask you to delete it.** **ON FAIL:** the exploit
did not actually land — you have a description, not a demonstration.

**Most-missed:** Believing code is server-side because of where the file lives. One import from server
code into browser code drags it into the browser. · Treating a leaked key as fixed by deleting the commit
— it is compromised the moment it was pushed; rotation is the only fix. · Trusting an `organizationId` or
`userId` sent in the request body. · Hiding the admin button in the UI (the screens a user sees) and calling that access control.
· `USING (true)`, or the service key in an Edge Function "because RLS was in the way." · Believing a
classifier or delimiter scheme solves prompt injection. · Assuming indirect injection is exotic — **it is
the common case**: a web page, a PDF, a calendar invite, a row another user can write to. · A
confirmation step whose summary the model itself generates — an injected model lies in the confirmation.

---

# LAYER 6 — Product and Platform (153h)

*The screens people use, keeping the app live, connecting other services, and Python, a second programming language.*

## M22 — Frontend for AI Interfaces (32h) · `dependsOn: M7, M18, M19, M20`

You started at M1 with no code, so this is React from zero — enough to own one page, not a framework
tour. What is here beyond that is the AI-specific surface, which is where you differentiate.

**Core concepts:** React from zero: components, props, state — enough to own one page. **The React
rendering model: what actually causes a re-render.** Effects and their four failure modes (infinite
loops, stale closures, races, missing cleanup). **The server/client boundary and the current Next.js
caching direction** — state the direction, which is durable, not the version, which is not: **the
direction is explicit opt-in.** `fetch`, GET route handlers and the client router cache no longer cache
by default, and the `use cache` directive is how you opt back in. **Statically rendered routes are still
cached — "it caches nothing by default" is the overstatement that gets you a follow-up you cannot
survive.** Check the current documentation the week you build this and write down what you found. Generic
hedging does not catch this because you will read current docs, recognize the words, and map them onto
the old default without noticing the direction flipped. Forms, mutations, optimistic UI
with shared Zod schemas. **A custom transport over your own M7 SSE frames.** Cancellation and abort
propagation. Resumable streams. Latency choreography for 10-second-plus operations. Conversation scroll
behavior and accessible streaming. **Designing for output that is sometimes wrong** — tool-call UI,
approval gates, citations, uncertainty, honest failure states. **The upgrade-path UI and the honest
failure state** (here rather than in M20, which would create a circular dependency).

**Checkpoints** ① the rendering model: predict which components re-render, then measure · ② one effect
bug from each of the four failure modes, fixed · ③ a custom transport over your own M7 SSE frames · ④ stop
that provably stops billing; refresh that resumes · ⑤ tool-call approval gate wired to M19, citations
wired to M11 · ⑥ honest failure states, and axe-core green on the chat surface.

**Artifact** `EVIDENCE` — the flagship’s chat surface rebuilt on **your own M7 protocol via a custom
transport** — not the prebuilt default; implementing the transport interface is the part that teaches
the protocol boundary. A stop button that provably stops upstream billing; refresh-mid-generation that
resumes rather than losing the answer; tool calls surfaced with a working approval gate wired to M19;
citations linking to the span provenance from M11, as retrieved by M18; failure states that tell the
truth; the 402/upgrade path.

**GATE** — **REFEREE:** your reviewer, with a screen recording, the cost meter, and axe-core in CI.
**PASS:** demonstrate refresh-mid-generation recovery live; show the stop button’s effect in the cost
meter; report time-to-first-token (measured here, where the client instrumentation lives); **axe-core
passes on the chat surface, plus one recorded real-screen-reader pass showing the `aria-live` re-read
behavior present and then fixed.** **ON FAIL:** the stop button stops the UI only.

**Most-missed:** `useState` as a variable store kept in sync with `useEffect`. · Adding and removing dependencies
(the list of values an effect re-runs on) until the lint rule goes quiet. · `'use client'` at the root layout, converting the whole tree to client
components. · **Assuming one `read()` chunk equals one complete SSE event** — corrupts output only under
load. · `setState` on every token at 60 times a second, re-rendering the whole markdown tree, then blaming
React.
· Conflating client disconnect with user cancellation — or a stop button that stops the UI while the
server keeps generating and charging. · `aria-live="polite"` on the streaming container, making screen
readers re-read the entire growing message. · **An approval button that appears after the tool already
ran.** That is theater, not a gate.

## M23 — Deployment, CI/CD, and Operating It (48h) · `dependsOn: M5, M9, M12`

**Core concepts:** Environments and configuration as a first-class thing. Secrets across environments;
short-lived credentials over stored keys. A CI pipeline you own — what gates a merge and what it costs.
**Deploy is not release** — preview deploys, promote, instant rollback, feature flags. **Expand/contract
migrations in the pipeline** (here rather than in M5, because here there is a pipeline to run them through).
Health checks, SLOs, alerting that pages a human only when it should. **Exactly enough Docker and Linux,
and not one hour more** (Appendix A says what enough is). **Consumer contracts** — compatibility for
callers you cannot redeploy.

**Checkpoints** ① environments and config: a missing var fails the deploy, not a 2am route · ② CI green
as a required check, with the eval tier wired in · ③ a feature-flagged release you can turn off without a
deploy · ④ a rollback rehearsed under a timer, measured from the dashboard · ⑤ expand/contract run through
the pipeline under live load, zero failed requests · ⑥ one dockerized cloud deploy with an IAM role you
wrote, torn down same day.

**Artifact** `EVIDENCE` — the flagship’s full pipeline: OIDC secrets with no stored keys (**the model
API key is the one documented exception, scoped and spend-capped; a second exception is added if M26 is
already built**); required checks **including M12’s eval gate**; a feature-flagged release; a rollback rehearsed
under a timer **measured from the dashboard, not a stopwatch**; an expand/contract migration run through
the pipeline **while M5’s load generator is firing**, with zero failed requests; one burn-rate alert that
fired for a real reason. Plus one dockerized cloud deploy **with an IAM role you wrote and can explain**,
torn down the same day.

> **Roll back when you suspect your change caused the problem.** Waiting for proof is how a five-minute
> rollback becomes an hour of debugging in production.

**GATE** — **REFEREE:** your reviewer, holding a timer driven by the monitoring and reading the load
generator’s error count. **PASS:** roll back a bad deploy in under five minutes while narrating; run the
migration under load with zero failed requests; explain with a **specific lock type** why a naive
migration takes a site down and why yours does not; **name every consumer of one flagship endpoint and
how you would discover one you did not know about from production logs alone.** **ON FAIL:** the
migration dropped requests — expand/contract was not actually expand/contract.

**Most-missed:** `git revert` as the rollback strategy — a full rebuild while the site is broken, and it
does nothing about the schema change or the rows the bad version already wrote. · Migrations at application
boot, so every instance races. · Assuming the public-bundle env prefix means "for the frontend" rather than
"baked into the public bundle, forever, at build time." · Production secrets in preview environments, where
any PR can exfiltrate them. · One `/health` for both liveness and readiness. · The Kubernetes rabbit hole
after Docker clicks. · Leaving the practice cloud stack running.

## M24 — Python On-Ramp (15h) · `dependsOn: M9` · *trigger: moves earlier, right after M12 and the hard gate, if eight or more of the twenty postings you read in M0 ask for Python; M25 follows it*

Deliberately small: a single large Python module sitting near the end of the program is the most likely
thing to be cut under deadline pressure. **Plan on the trip-wire firing.** Python appears in most
AI-engineering postings, so the earlier slot is the base case and this late one is the exception. The bet
this program is actually making is that learning correctness once in TypeScript and then porting it beats
splitting your attention across two languages from month one — **not that you can avoid Python.**

**Core concepts:** Environments and dependencies on current tooling — **`uv`, `ruff`, one pinned type
checker.** (The names have a shelf life; the module is unchanged if they move.) Python semantics where they differ from TypeScript — names
vs values, LEGB, truthiness, generators. pytest. Type hints with a checker in CI. pydantic as the runtime
validation boundary. One typed FastAPI route.

**Artifact** `LAB` — current tooling: `uv`, `ruff`, and **one type checker you pin by name and
version** — mypy and pyright are the two you will meet most, with faster newer ones arriving; pick one,
write down which and when you chose it, and expect the name to age faster than the idea. Python semantics where they differ from TS, each proved by a small script. pytest. Type hints with
a checker green in CI. pydantic as the validation boundary. One typed FastAPI route with a test.

**GATE** — **REFEREE:** your reviewer, with a timer. **PASS:** add a typed route and a test to your own
small Python service in 60 minutes, and explain each place the idiom differs from what you would write in
TypeScript. **ON FAIL:** the idiom is wrong — a passing test cannot catch this, which is why the referee
is human.

**Most-missed:** Writing TypeScript with Python syntax: classes everywhere, raw `dict`s, no type hints,
camelCase. That is the thing a Python reviewer notices first. · Assuming the tool you learned is the tool
the job uses. `uv` is the current default and the right one to learn here, **but poetry is widely used in
production teams, pyenv solves a real problem in interpreter-version management, and conda is still
standard in ML-adjacent organizations.** If a posting stack names one of them, learn it in an afternoon
and say nothing — nobody is judging you for the packaging tool, and being doctrinaire about it is its own
bad signal. · Assuming type hints behave like TypeScript’s compile-then-trust contract.

---

## M25 — Python as a Second Production Language (35h) · `dependsOn: M24, M12` · *trigger: follows M24; both move earlier, right after M12 and the hard gate, if eight or more of the twenty postings you read in M0 ask for Python — otherwise they wait until here*

**Trip-wire from M0:** if eight or more of your twenty postings ask for Python — **which is the likely
case** — **M24 and then this module run immediately after M12 and the hard gate**, and you are already on
the alternate ordering. **If the trip-wire has fired, do not then reach for the cut order’s "M25 second
half" line**, whose condition is the inverse: you cannot both move Python earlier because the market asks
for it and cut it because the market does not.

**Core concepts:** Python semantics at depth. **asyncio and the blocking-call trap** — a concurrency model
that is not JavaScript’s. FastAPI with streaming responses and dependency injection. Reading and debugging
idiomatic Python you did not write.

**Checkpoints** ① typed request and response models, and one streaming route · ② the blocking-call trap
reproduced: an async handler frozen, then fixed · ③ M12 eval runner ported, pytest faking the model
client · ④ the type checker green in CI on the ported runner.

**Artifact** `EVIDENCE` — **M12’s eval runner ported to Python**, so this module extends something you
already built rather than standing alone. Typed request/response models, streaming, a pytest suite faking
the model client, type checker green in CI, plus a written runtime diff **including a reproduction of a
blocking call freezing the asyncio loop and its fix.**

**GATE** — **REFEREE:** a timer, plus a Python-fluent OSS maintainer reviewing a real PR (route one
Track 2 contribution to a Python repo). **PASS:** add a typed route and test to an unfamiliar Python
service in 90 minutes, and **have a Python-fluent reviewer confirm there are no idiom comments to
make. Gate on that, not on the merge:** M15 says not to condition your progress on a stranger’s inbox,
and maintainer merge latency runs to months and sometimes to never. **Track the merge as a lagging metric
in your funnel, the way M27 treats Gate B.** **ON FAIL:** you are writing
TypeScript with Python syntax — **a passing test cannot catch this**, which is why the referee is a human
who reads Python daily.

**Most-missed:** Assuming Python’s `async` is JavaScript’s: a sync HTTP client, a sync database session in an
async handler, `time.sleep`. All compile; all pass local testing with one user. · Unbounded
`gather(*[...])` — fine on 10 items, rate-limited or OOM on 5,000. · Calling the real model API in unit
tests. The LLM belongs in the eval suite. · Assuming pydantic is strict by default. It coerces unless told
otherwise.

## M26 — Third-Party Integration as a Consumer (23h) · `dependsOn: M7, M21, M22`

**The consent surface is part of this module, not someone else’s.** A revocation path that *re-prompts
the user* is UI work, and this module comes after the frontend module — so the connect button, the
callback route, the connections screen, the re-consent flow, and the in-chat degraded state are owned
here, with hours.

**Also: the OAuth callback is the one place CSRF actually matters** — `state`, PKCE, open redirect — and
M21 teaches CSRF five modules earlier, before any OAuth exists. This is where the OAuth spiral lands.

**Core concepts:** OAuth as a consumer: `state`, PKCE, open redirect. The consent surface: connect,
callback, connections screen, re-consent. Encrypted per-tenant credential storage and envelope
encryption. Token refresh on the provider’s schedule. Scope upgrades forcing every existing user to
re-consent. Revocation surfacing as a 401 in a background job at 3am.

**Checkpoints** ① one provider connected end to end, with the token exchange working · ② the grant
revoked mid-run and the app degrading honestly instead of crashing · ③ the connections screen, and the
scopes you asked for written down with why.

**Artifact** `EVIDENCE` — a real OAuth connection in the flagship, **including the consent surface**:
- **Connect and callback routes with `state` and PKCE, verified by a written attack attempt.**
- A connections settings screen, and a **scope-upgrade re-consent path actually exercised** (scopes
  granted for v1 are insufficient for v2, so every existing user must re-consent).
- An **in-chat degraded state** when the connection is broken.
- **Envelope encryption with a per-row key reference**, a stated location for the master key per
  environment, and a written key-rotation procedure. ("Encrypted per-tenant storage" without saying
  where the key lives or how it rotates is not a design.)
- Automatic refresh, and a revocation-recovery path that re-prompts rather than failing silently.

**GATE** — **REFEREE:** the provider’s own API. **You revoke the grant yourself**, from the provider’s
settings screen, while a background job is running; your reviewer watches the alert fire and reads the
log. **Nobody but you touches that account** — a reviewer cannot revoke a grant on an account they do not
own, and handing them your provider credentials to arrange it is a worse idea than the gate is worth.
**PASS:** revoke during a background job and assert the job **alerts** rather than failing silently;
demonstrate the scope-upgrade re-consent; the CSRF attempt against your callback fails. **ON FAIL:** the
401 surfaces as a generic error, or the `state` parameter is decorative.

> The gate is not *"draw the token lifecycle"* — a drawing is strictly weaker than the artifact above it.

**Most-missed:** Storing tokens encrypted without saying where the master key lives or how it rotates.
· Treating the `state` parameter as decorative. The OAuth callback is the one place CSRF actually
matters. · A revocation path that fails silently instead of re-prompting. · Assuming scopes granted for
v1 cover v2.

---

# LAYER 7 — The Market (69h)

*Pay, proof a stranger can judge, and interviews. Started by a date on your plan, not by finishing everything.*

## M27 — Pay, Terms, and the Negotiation (11h) · `dependsOn: M0` · *trigger: one month before your application date, whatever else is unfinished — it stays in every version of the program, including the Spine*

The funnel-filter half of this work already happened in M0, where it belongs, because it determines which
modules matter. This is the transaction itself.

**Core concepts:** Reading an offer — base vs equity vs bonus, vesting, what a startup’s equity is
realistically worth. **W-2 vs 1099 vs agency vs employer-of-record.** Computing the delta yourself — **with your own state,
your own premium and your own deductions in your own spreadsheet, because no single percentage survives
contact with a real return** — rather than taking a headline number. References and employment
verification when you are self-employed. **Not naming how you learned is fine; constructing a framing
designed to be mistaken for employment is not.**

> Check the classification on every posting before applying, and know your delta before you negotiate.
> You already tagged twenty postings employee or contract in M0. That is your data, and it is a better
> artifact than any general claim about what remote roles pay.

**Artifact** `EVIDENCE` — **the tax structures here are the United States ones (W-2 and 1099); if you
are somewhere else, substitute your own two employment structures, because the exercise is identical.**
A pay floor and target with the postings that justify them; a spreadsheet modeling the same headline
number as W-2 vs 1099 with self-employment tax, health insurance, and unpaid time off; a negotiation
script rehearsed out loud and recorded. **Plus a references plan: three real people secured before your
first offer** — your reviewer, one person from your warm list, and a maintainer from Track 2 if that
track is running; all three already exist in this curriculum, and none of them knows they are a
reference until you ask. **If you paid your reviewer, say so when you offer them as a reference.** It is
still a strong reference, a checker will ask what your working relationship was, and the disclosure costs
you nothing while being caught out costs you the loop. And **know the difference between a reference and
employment verification:** references speak to your work; employment verification checks employment
records, which you do not have, so a background check will ask for 1099s or client invoices instead.
**Say up front that the last year was self-employed** rather than letting it surface at the offer.

**GATE** — **REFEREE:** **Gate A** (controllable, one month before your application date): your reviewer
playing a recruiter briefed to push back on your number. **Gate B** (lagging): a real recruiter screen,
logged in the funnel table when it happens. **Tick this module on Gate A;** Gate B depends on a stranger
replying and never holds up the ladder. **PASS:** state your floor out loud without hedging, recorded.
**And** deliver a 30-second background answer with no apology and no hedge, plus a one-line non-defensive
answer to each of the six predictable follow-ups: not currently employed? what title? how big was the
team? who was the client? why no degree? what have you been doing since? **Two of those six have no
answer inside a framing that hides how you spent the year, so do not use one.** Say what is true:
full-time self-directed work on an app you built and operate, with a working engineer reviewing your code
and an eval harness gating its CI, no client and no team. **If they ask how you learned, name the program
and offer to show it, including where it was wrong and what you changed.** That answer survives all six
follow-ups; a framing engineered to be indistinguishable from employment survives two, and the moment a
hiring manager works out which one you chose, the loop is over. **ON FAIL:** you hedged — that is the rep;
do it again next screen.

**Most-missed:** Accepting the first number and the first structure offered because you are grateful and
have nothing to compare against. · Treating "remote" as one category. Remote US-only, remote in four
timezones, and remote-first quarterly-onsite are different jobs. · Discovering the references problem at
the offer instead of solving it before the first one. · Offering a reviewer you paid as a reference
without saying so. A checker asks what the working relationship was, and the answer arriving from them
instead of from you is what does the damage. · Assuming references cover employment verification. They do
not: a background check verifies employment records, and for a self-employed year that means 1099s or
invoices.

## M28 — The Evidence Layer v1 (8h) · `dependsOn: M2` · *trigger: your application date — the target you set in M0*

**It does not move because a module is late.** If M10 has not passed by then, you apply with what you
have and say in the re-plan what you are applying without — **which is why this module waits only on M2**,
the flagship its claims point at, rather than on M10. M10 is the readiness condition for *applying*; it
is not what opens this page, because a module that opened on M10 could not be reached in the very case
the rule above describes. Applications need a resume on that date, not a year later.

**Core concepts:** A resume that maps each claim to a repo. Two pinned repos now; the pinned three
(flagship, open-source history, a write-up) arrive in M29. `LAB` vs `EVIDENCE` — labs are private. What
you say about how you spent the year, and why the honest version is the one that survives.

**Artifact** `EVIDENCE` — a resume mapping each claim to a repo; **two pinned repos: the flagship and one
other `EVIDENCE` artifact**; a README in product-spec form.

**Only `EVIDENCE`-tagged artifacts are pinned, and the labs are private.** `runtime-lab`, `seams`,
`pg-lab`, `model-probe`, `stats-lab`, the recovery log, the defect log, the estimate log — these taught
you things and they are **not portfolio.**

**The sentences you will be asked for in a first screen, rehearsed here — but only the ones that are
true on the day this module fires.** Every cut in this document is a gap an interviewer may probe. A
shrug loses the room; a specific answer with a number wins it.

- **Distributed systems, if you built M8** — *"I haven’t run Kafka. I built a Postgres-backed durable
  queue with `SKIP LOCKED`, at-least-once delivery and idempotent consumers, and I can tell you exactly
  what would make me outgrow it."* **M8 is not on the Spine**, so on that path this sentence is not yours
  either — say what you did build and what would make you reach for a queue.
- **Algorithms** — *"I state the complexity of what I write and measure it against a 5,000,000-row set."*

> **The fine-tuning answer and the framework answer are not yours yet.** The first needs your own eval
> numbers (M12) and the second needs the hand-rolled agent loop (M19), and rehearsing either before those
> exist is rehearsing something you cannot back. **They are in M29**, where the artifacts behind them
> exist.

> **How you talk about the year.** Lab concepts surface only as specific answers to specific questions,
> and a portfolio that describes its own coursework reads as coursework — the same goes for the weekly
> cold-rebuild ritual, which is excellent practice and sounds like test prep. But **not naming how you
> learned is fine; constructing a framing designed to be mistaken for employment is not.** If you are
> asked directly, name the program and offer to show it, including where it was wrong and what you
> changed. M27 works out why that is the answer that survives.

**GATE** — **REFEREE:** **two strangers**, each from a place you name in advance where this ask is on
topic and welcome — a chat server for a language or framework with a feedback or show-and-tell channel, a
project’s own discussions tab, or a local meetup’s chat. Post the README link with one line: *"Five minutes, three
questions, no back-and-forth: what does this do, who is it for, what does it refuse to do?"* Five-minute
timebox each, answers **in writing.** Then **a third pass you run yourself** against the written answers:
for each question, mark the exact sentence in the README they got it from, and **if there is no such
sentence, that is the finding.** **PASS:** **2/2** on all three questions, **plus your own marked-up
README** showing where each correct answer came from. **ON FAIL:** rewrite, then **two fresh strangers.**
**Nobody is burned permanently** — a person who has read v1 can read v3 cold if enough has changed, and
treating a scarce resource as single-use is how you run out of it.

**Most-missed:** Pinning the lab repos, which reads as coursework. · Rehearsing an answer about work you
have not done yet. If the sentence needs an eval number or a hand-rolled agent loop and you have neither,
it is not your sentence yet. · A long skills list you cannot defend. A short one you can be grilled on
every line of reads as competence — **pick the number that matches what you can actually defend** rather
than a number from a rule. On "Prompt Engineering" as a line item: it reads thin to a lot of engineers,
**and** it is named explicitly in a meaningful share of 2026 postings, and a keyword filter does not share
anyone’s taste. That is a funnel decision. If your twenty postings ask for it, put it on and be ready to
say what you mean by it.

## M29 — The Evidence Layer v2 (12h) · `dependsOn: M18, M20, M28` · *trigger: after M18 and M20, once you have measured numbers worth publishing*

**Core concepts:** The README as product spec plus decision record. Publishing the failing v1 numbers
alongside the improved ones. The write-up genre that converts: a numbered account of something that went
wrong in your own system.

**Artifact** `EVIDENCE` — the flagship README carrying **the eval numbers including the failing v1** —
the improvement delta is the evidence of engineering; a single good number could have been luck. A
decision log of the five choices that mattered. One public write-up of a measurement you made. **The
final pinned three:** the flagship · the open-source contribution history · one design doc or public
write-up.

**Plus the two sentences M28 could not honestly rehearse**, now that what they describe exists:

- **Fine-tuning** — *"Prompt, then retrieval, then fine-tune, then distill. Here’s what each cheaper rung
  cost, and here’s the number from my own eval set that says the earlier rungs hadn’t run out."*
- **Frameworks** — *"I hand-rolled the agent loop at the wire level, then ran the same agent on an SDK
  tool runner and wrote up what the hooks bought and what they hid."*

**GATE** — **REFEREE:** the same protocol as M28 — **two strangers** from a named, on-topic place,
**plus your own marked-up pass** — with people who have not seen v1. **PASS:** they can
state the cost per user and the quality number from the README alone. **ON FAIL:** the README is a
feature list, not a product spec plus decision record.

**Most-missed:** The README as a feature list. The stack list is the least interesting thing in the repo
and it is what most portfolios lead with. · **Hiding the v1 numbers because they were bad. The
improvement delta *is* the evidence** — a single good number could have been luck. · Tutorials that
duplicate a thousand existing posts; the convincing genre is a specific, numbered account of something
that went wrong in your own system.

## M30 — Interview Performance (38h) · `dependsOn: M28` · *trigger: ten hours the week M28 passes, which is your application date, for a first practice interview; the remaining hours in the eight weeks before your first real one*

**Forward-loaded (10h, the week M28 passes):** clarify-before-typing; out-loud narration with
autocomplete off; one recorded mock — a first practice interview so the first real one is not the first
rehearsal. The remaining 28h lands in the eight weeks before your first real interview.

> **The assisted round leads; the un-assisted round is the floor.** M16 already names the purity play
> as a *scored failure*: some interviews score the transcript of how you drive an assistant, and how you
> drive is itself the test. Keep the autocomplete-disabled round as a floor — thinking out loud under a
> clock with nothing helping.

**Core concepts:** The un-assisted round: thinking out loud under a clock. Reading and debugging an
unfamiliar multi-file codebase from a failing test. Being scored on how you drive an assistant, because
the transcript gets read. Shipping a scoped PR into a foreign repo and defending the ship/no-ship call.
Mid-level system design in 45 minutes. The behavioral round, which is weighted harder when there are no
references to call.

**Checkpoints** ① the 10-minute flagship walkthrough, in decision language, recorded · ② behavioral
stories rehearsed against the incident log · ③ two mock defenses with a real person who pushes back ·
④ the blind queue topped up with five freshly found commits verified green at their parents, then three
timed foreign-repo fixes from it, transcripts annotated.

**Artifact** `EVIDENCE` — a recorded 10-minute flagship walkthrough in **decision-language, not
feature-language**; three timed foreign-repo bug fixes from the blind queue, with assistant transcripts
attached and annotated; two recorded mock defenses with a real person who pushes back.

> **Top the queue up first.** The commits you saved in M1 are fifteen to twenty months old by now, and a
> repo moves — dependencies stop resolving, the test framework gets replaced, the surrounding code gets
> rewritten, and a revert that produces a merge conflict instead of a red test is a different exercise.
> **Find five fresh ones the week you start**, and for each of the ones you use, check out the parent and
> confirm the suite is green there before you revert anything. You still never read the fix commits.

**The narrated-problem log — twenty-four problems — lives in Track 9’s weekly slot**, not as extra hours
here.

**Plus ~8h of behavioral rehearsal against M0’s incident log.** You will not have twenty stories with
other people in them by now, and it does not matter: you will have **a handful of real ones with another
person in them** — a review that rejected a boundary, a maintainer who rewrote your approach, an estimate
that blew up, a game-day partner who could not follow your runbook — and a much larger number about your
own system. Both are usable. **Know which is which, and lead with the first kind**, because the round
that matters most is the one asking how you work with people.

**GATE** — **REFEREE:** three referees — your mock interviewer for the first two, your reviewer for the
third. **PASS (1):** solve an unseen problem out loud in about 30 minutes with autocomplete disabled.
**PASS (2):** drive an assistant through an unfamiliar bug **under observation**, narrating every point
where you *verified* rather than accepted. **PASS (3):** answer **three behavioral questions cold with
three different stories, none about a decision you made alone.** **ON FAIL:** watch the transcript back
and name where you delegated something you should have verified — that is the rep.

**Most-missed:** Practicing in your own IDE with autocomplete on and the assistant one tab away.
· Barreling into typing without clarifying — interviewers name this as a reject signal. · **Editing the
test to make it pass.** Usually the wrong move, and the interviewer is watching for it — *unless the test
encodes the wrong behavior*, which happens, and then changing it is the right call. **Say so out loud
before you touch it** and name what you believe the spec should be. Silently editing a test is the
failure; arguing that a test is wrong, with a reason, is often the thing being tested for. · Framing
projects around tool names. "What would you do
differently" is a test of honest depth; "nothing, it’s solid" scores worse than naming a real limitation.
· Gold-plating the take-home UI while shipping zero evaluation, which inverts the actual scoring.

---

# LAYER 8 — Employed Mode (16h)

*Getting hired before you finish is a success, not a failure — it is the outcome this plan is shaped for,
which is a different claim from a prediction that it will happen to you. This layer is what changes on day
one of the job.*

## M31 — Employed Mode (10h) · `dependsOn: M0` · *trigger: your first final-round interview, the same moment as M32 — written before the hire, used after it*

Your first final-round interview is the last point at which you can write this with a clear head, and it
usually lands one to three weeks before an offer. Being hired before you finish the program is a success,
not a failure — it is the outcome this plan is shaped for, which is a different claim from a prediction
that it will happen to you.

**Core concepts:** A second operating contract at an employed weekly budget (5–8h, not 18). Retargeting
the cold rebuild to the employer’s codebase. Re-contracting or replacing the reviewer before the start
date. Manager checkpoints at week 6 and week 14, scripted in advance.

**Artifact** `LAB` — **do the arithmetic on what is left before you write the order.** A hire at the
application date leaves around **665 module hours** unfinished, and at six or seven hours a week that is
close to **two more years of evenings** on top of a full-time job. Decide in this module which of it you
will actually finish and which you are deliberately abandoning, and **write both lists down.** That
decision is what the second operating contract is for; the alternative is two years of quietly falling
behind a plan you never renegotiated.

Then the contract itself: a realistic employed weekly budget (**5–8 hours, not 18**) and a module order
driven by what the job needs first. Track 4 retargeted from your own artifacts
to a component of the employer’s codebase — which doubles as onboarding. The reviewer relationship
re-contracted or deliberately replaced, **decided before the start date.** The monthly re-plan surviving
with new inputs: PR review comments, tickets that took longer than estimated, things you could not answer
that month. The estimate log continuing against real tickets from week one.

Plus **two scheduled written manager checkpoints at week 6 and week 14**, scripted before the start date,
asking directly whether you are where they would expect.

**GATE** — **REFEREE:** the week-6 and week-14 manager checkpoints, in writing. **PASS:** you asked
directly whether you are where they would expect, and you have the written answer. **ON FAIL:** you did
not ask directly, or you have no written answer. Ask the plain question at the next one-to-one and write
the reply down the same day.

**Most-missed:** Treating hire-before-completion as failure. The arithmetic makes it the outcome this
plan is shaped for. · Not doing the arithmetic on what is left. A hire at the application date leaves
roughly **665 module hours**, which at five to eight hours a week is close to two more years. Decide what
you are finishing and what you are abandoning, in writing. · Letting every feedback instrument terminate
on hire day. · Asking "am I where you expected" in
week one, when a manager’s answer is most generic.

## M32 — The First 90 Days (6h) · `dependsOn: M0` · *trigger: your first final-round interview*

Self-taught plus remote is a high-risk combination for silent struggle, and being stuck two days on a
five-minute unblock is the kind of thing that ends a probation period — not for incompetence, but for
being stuck two days on something a teammate would have unblocked in five minutes.

**The unwritten norm nobody writes down:** struggle alone briefly, then ask publicly in a channel with
what you tried, what you expected, what you saw, and what you currently believe. That format demonstrates
competence *while* asking for help rather than in spite of it.

**Core concepts:** The 30/60/90 plan and the week-one manager questions. The asking-for-help format:
what you tried, expected, saw, and currently believe. Org mapping from git history. **Inheriting an AI
system you did not build**, with a done-state: a one-page note saying where the prompts live, which are
load-bearing, what the implied eval was, what the author was evidently afraid of (inferred from the
defensive instructions in the prompt text), and the single measurement you would run first. A WIP policy
computed from your own review-latency data.

**Artifact** `LAB` — a 30/60/90 plan against a real posting with week-one manager questions; a reusable
asking-for-help template **practiced for real by posting three genuine questions in an OSS project’s
Discord or Slack**, responses kept; an org map inferred from the repo’s history — who touches what, from
`git log` by author; nothing M1 did not teach; a handoff note good enough for a stranger to continue.
**Plus inheriting an AI system you did not build:** reading someone else’s prompts, evals and traces,
using whatever of M12 and M17 you have passed; prompt archaeology on a system with no decision log — your
first AI ticket is more likely "the summaries feel off, look into it" than a greenfield feature. **Plus a
WIP policy computed from your own Track 2 review-latency data, and one recorded 45-minute pairing session
with another person on a real bug in an unfamiliar repo.**

**GATE** — **REFEREE:** real strangers in a real channel, and a recording. **PASS:** state which prompt
in the inherited system you would change *last*, and why; three genuine questions posted and answered;
record yourself pairing with another person for 45 minutes on a real bug in an unfamiliar repo, narrating
throughout, and watch it back; state your median review latency from your own data and your WIP policy
from memory. **ON FAIL:** you asked for the answer instead of stating what you tried, expected, saw, and
currently believe.

**Most-missed:** Silent struggle. Self-taught plus remote is a high-risk combination for exactly this,
and being stuck two days on a five-minute unblock is the kind of thing that ends a probation period. · Working one thing
at a time, so four months of six-day PRs reads on a cycle-time dashboard as slow to deliver. · Asking for
the answer instead of stating your current best hypothesis.

---

# The Parallel Tracks — priced

All ten are mandatory, so all ten are budgeted. Their hours are in the headline total at the top, and
they belong in yours.
Month numbers anywhere in this program assume 18 hours a week; The Plan shows your own.

| # | Track | Hours | Cadence |
|---|---|---|---|
| T1 | **Job search — three channels, not one** | **200** | 3–4 hours a week, from your application date |
| T2 | **Open-source contributions — and the ask** | **80** | about 8 hours a month; you start submitting small fixes after M9 |
| T3 | **The dependency spiral** | **0** | built into the modules |
| T4 | **Weekly cold rebuild** | **60** | 45 minutes a week |
| T5 | **Reviewer relationships** | **26** | about an hour most months, more in the four or five that carry a heavy gate |
| T6 | **Agent discipline** | **0** | a habit |
| T7 | **Writing — and posting it somewhere** | **30** | one piece per layer, Layers 2 to 6 |
| T8 | **Monthly re-plan — with a funnel table** | **34** | 2 hours a month; continues after you are hired |
| T9 | **Narrated problems — practice for the coding screen** | **25** | about 30 minutes a week, from your application date |
| T10 | **The Sweep — retrieval practice** | **15** | 15 minutes a week from month four |

**Track 1 — three channels.** A cold application is a resume sent to a posting where nobody knows you; a
referral is someone inside vouching for you. **Referrals convert far better than cold applications at
every stage of the funnel, plausibly by something like an order of magnitude — but no public number is
segmented for a candidate like you**, the figures that circulate measure three different things (reply
rate, screen rate, share of hires) and get quoted interchangeably, and none of them is a number you should
say out loud in an interview. **Treat the direction as real and the size as unknown.** Your own funnel
table in Track 8 will produce your two rates by about month nine, and when it does, **it replaces this
paragraph.** So the 200 hours split three ways. **Warm, about 70 hours:** the
real people you have met through this program, and asking them. **Direct, about 50 hours:** emailing the
engineer or founder who owns the problem your app solves, opening with one number you measured, about
fifteen a month. **Cold, about 80 hours,** six or seven a month, kept mainly so you can compare the other
two against it. Lean on warm for the first six months of applying, when a person vouching makes up for a
half-built portfolio; lean on direct after that, when your numbers can carry the email. **There is no
total cap**, and a number invented here would contradict the cadences above anyway — fifteen direct and
six or seven cold a month is more than 250 over a year of applying. **What replaces a cap is a rule:
stop adding volume to a channel whose funnel table shows no human contact, and spend those hours on the
channel that does.** **Sequencing rule:** for the first two months, apply to companies you do
**not** want, so the mistakes are cheap.

> **And say the true thing about the first months of applying: most applications get silence.**
> Rejection reasons are not "free" — what actually arrives is forty unanswered messages during the exact
> window this document identifies as the abandonment window. The goal in that period is learning what
> the process asks for, not an offer — a success metric that does not depend on anyone replying.

**Track 2 — what counts, and the ask.** Open source means code published for anyone to read, use and
change. A contribution counts if it changes behavior, is 20 to 200 lines, includes a test, and survived a
round of review by the maintainer. Aim for **three submitted to three projects and carried through
review**, with the review conversations kept, plus a note on each about what the maintainer asked you to
change and why they were right. **Acceptance is the lagging half:** merge latency on a healthy project
runs from days to months and sometimes to never, so track merges but do not gate yourself on them,
exactly as M15 says. **Get one submitted and reviewed within two months of your application date:** the
gap between none and one is far bigger than the gap between one and three. You start submitting small fixes after M9; M15’s gate
consumes a real maintainer’s review thread, so the track is running before M15 ends. Then the ask. After
your first accepted contribution to a project, write to its maintainer: what you are looking for, what
you built, whether anything is open where they work, whether they would refer you, and that no is a
completely fine answer. Three asks in your first year of applying. Those maintainers become both your
references and your referrals, and you ask while the work is fresh.

**Track 3 — the dependency spiral.** Each module’s artifact is built on top of an earlier one, so old
work keeps being used and does not rot. It costs no extra hours. It is not enough on its own: most
modules are never touched again once they are passed, and that is what the Sweep (T10) is for.

**Track 4 — the weekly cold rebuild.** Pick something you built three to eight weeks ago and rebuild its
core from an empty file with the original closed. Score yourself 0 to 3 — 0 could not start, 1 needed the
original, 2 rebuilt with gaps, 3 clean. Which artifact you pick is driven by your Sweep scores (T10) once
those start in month four; before that, oldest first. **This 45 minutes is the minimum for a bad week,
and nothing else is ever booked into it.**

**Track 5 — three people, three deadlines.** A code reviewer before M1’s gate. Someone who runs systems
for a living and can try to break yours, by M10. **A mock interviewer one month before the application
date you set in M0**, because M27 fires then and its Gate A is a rehearsed recruiter call with that
person. In practice that is around M9, and it is earlier than it sounds — recruiting someone credible at
mid-level takes weeks, so **start asking two months out.** M13 and M30 use the same person.
**Ask for the right amount.** Most months they spend about an hour; four or five months across the whole
program are heavier, because a gate asks them to plant a bug, label thirty traces against your rubric, or
sit through a mock interview. Tell them that when you ask, and name the heavy months, so nobody is
surprised into quitting. If no person is available for a gate, an AI assistant may stand in once per
attempt; the whole conversation is kept, failures included, and a failed AI review counts as a failed
gate.

**Track 6 — agent discipline.** An AI coding assistant may answer your questions but never writes your
code for you until you reach M16. From M16 you follow a written policy for what it is allowed to do on
its own. The one exception is M30’s interview drills, where driving an assistant is the skill being
tested.

**Track 7 — writing, and posting it.** Five pieces, one per layer from Layer 2 to Layer 6, each about
something you measured. Every piece is posted to at least one named place where working engineers
actually read, and everyone who responds goes on your list of real people. Writing nobody reads is a
diary; posting it takes about fifteen minutes, and those fifteen minutes are what turn the other five
hours into something a person can find.

**Track 8 — the monthly re-plan needs inputs that actually arrive.** Interview feedback and rejection
reasons mostly arrive as silence, so a re-plan built on them runs for months with its primary input
missing. Once a month, sit down with three inputs:

- **The skills counted across the 20–40 job postings you screened that month**, which tells you what
  the market wants without anyone replying to you. *This is the real Python-bet signal.*
- **Your `DELTA.md` notes** (Rule 5) — this is how technical change enters the re-plan at all. Without
  them, every currency finding on this document’s own list would enter undetected.
- **A funnel table for each job-search channel:** how many sent, how many replies, how many screening
  calls, how many full interview loops (a company’s full set of interview rounds for one candidate), how
many offers, and human contacts per hour spent.

Two rules, and **both are about not fooling yourself with a small sample.**

**First: do not reallocate on a quarter of silence.** At six or seven cold applications a month, a
quarter with no reply is entirely consistent with a channel that works, and you cannot tell a dead channel
from an unlucky one at that volume. **Reallocate on contacts per hour, compared across channels, once
each channel has at least twenty attempts behind it** — and say out loud how wide the interval around each
rate is, the same discipline M12 grades you on.

**Second: if a full quarter of applying produces no conversation with a human at all, across every
channel**, the problem is the channel mix or the evidence rather than the effort; the response is to have
three people who actually hire read your resume cold, not to send more.

And falling six weeks behind for two months in a row switches you to the Spine. **Re-baseline the
month your application date lands**, because that is when Track 1 and Track 9 switch on and your module
hours per week drop by about a third; measuring the second half against the first half's rate will walk
you into that switch on arithmetic rather than on a real slowdown.

**Track 9 — narrated problems.** A coding screen is an interview where you solve a small problem while
talking through your thinking. **Twenty-four problems**, three from each of the eight shapes that come
up:
arrays and hashing (lookup by a computed key), two pointers (walking a list from both ends), sliding
window (a moving range over a list), binary search (halving a sorted list), stacks (a last-in first-out
pile), intervals (ranges on a line), trees (a branching structure), and heaps (here, a structure that
always hands you the smallest or largest item; not the memory heap of M4 or the table heap of M5).
Each is chosen because the same shape appears in your own app: a set for removing duplicates in M7,
sorting and binary search for ranking in M18, a heap for the reranker, a sliding window for rate limiting
in M7. One first pass of about 30 minutes, spoken aloud with autocomplete off; one repeat two to four
weeks later. Scored 0 to 3; **three scores under 2 in a row on a shape re-opens that shape.**
**Twenty-four is the floor, not a claim about the market:** it is chosen because it is what fits alongside
everything else. Plenty of AI-product companies, including well-funded ones hiring remotely, still run a
conventional algorithm screen, and you will not know which until you are in one. **If M0’s twenty postings
or your Track 8 screening say algorithm screens are common in your funnel, raise this number and take the
hours from the numbered cut order rather than from the modules.**

**Track 10 — the Sweep.** Retrieval practice is pulling answers from memory, the study technique; not
M18’s document search. Five prompts, a blank box, written from memory, no notes and no multiple choice. The prompts are the concept and pitfall lines from the modules themselves, one cue each. Score as
a fraction, items you produced over items in that module’s list, so you cannot move the goalposts after
seeing the answer. Selection is error-driven: weighted toward your lowest last score and toward modules
nothing later builds on, which would otherwise never be touched again. This is the answer to being
interviewed long after on month-one material.

---

# The Cut List

Deliberately removed. **This list is itself a hiring signal** — "I know that exists, here is when I would
reach for it, I have not needed it yet" beats a shallow artifact.

**Model training in every form** (fine-tuning, LoRA, PyTorch, backprop, transformer internals) — the
biggest time sink available, zero hireable signal for this job family. · **Algorithm theater** — linked
lists, tree rotations, DP past recognizing memoization, implementing sorts, bit manipulation, tries,
graphs/BFS/toposort, competitive programming. The interview subset survives, timeboxed, in Track 9.
· **Distributed systems theory and platform engineering** — CAP, Raft/Paxos, sharding, Kafka, Kubernetes,
service meshes, microservices, gRPC, Terraform as a practice, self-hosted metrics stacks. · **TypeScript
exotica** — type-level metaprogramming, decorators, namespaces, RxJS, Effect-TS/fp-ts. Read these;
authoring them makes you the person whose PRs nobody can review. · **The Python data-science slice** —
numpy, pandas mastery, scikit-learn, notebooks-as-primary-workflow, Django/Flask. (The packaging tools
are **not** on this list: `uv` is what M24 teaches, but poetry, pyenv and conda are all in real use, and
if a posting names one you learn it in an afternoon.)
· **Building your own agent framework, eval platform, or observability dashboard** — the genuinely
dangerous half, and the most tempting. *(Reading a framework’s docs is not cut: see Appendix C —
read the docs for whichever framework a posting names, the week that posting appears.)* Each is a way to build a
worse version of something that exists while avoiding the labeling and debugging that actually teach.
· **The advanced-RAG genre** — GraphRAG, RAPTOR, self-RAG, CRAG, FLARE, standalone vector DBs, fine-tuned
embeddings, implementing HNSW, chasing MTEB. · **Eval anti-patterns** — public benchmarks, BLEU/ROUGE/
BERTScore, off-the-shelf RAG metric bundles, 1–5 Likert judge rubrics, adopting a platform before you
have 50 real cases. · **Certifications of every kind.** · **Learn-on-demand appendix** — Playwright
as a unit, feature flags as study, webhook signature verification as its own unit, rate limiting as its
own unit, the batch tier, GraphQL, gRPC, OAuth *provider* implementation, prompt compression, semantic
caching, self-hosting open-weights models. **Those eleven are the ~55h half of Appendix C**; the four
that follow them there — Jujutsu, GitFlow ceremony, git submodules and history surgery, Bedrock/Vertex —
carry no hours at all, because knowing the term exists is the whole of what they ask for.

**One cut that is a real risk, not a clean win:** the AWS/second-cloud unit stays cut beyond M23’s one
dockerized cloud deploy, and the Vercel/Supabase focus is defensible for this segment — **but it narrows
your funnel more than the Python bet does, and unlike the Python bet there is no trip-wire for it.** If
M0’s twenty postings show cloud-native infrastructure as a common requirement, add a 15-hour unit and take
the hours from the numbered cut order at the top.

---

# Appendix A — What "enough" means

"Exactly enough Docker and Linux, and not one hour more" (M23) is not a target you can act on. Given an
undefined floor you will either over-invest — M23’s own Kubernetes rabbit hole is exactly that — or
under-invest and pass yourself. So here is the floor, enumerated:

**Linux — the finishable list.** Processes and signals · exit codes · stdout/stderr and pipes · file
permissions · `PATH` and environment inheritance · SSH keys · and a named short list of commands you
reach for without looking up. That is a checklist. You can finish it and stop.

**Docker — only this.** Write a Dockerfile for your own app · build it · run it with env vars and a
mounted volume · read the layer cache · `exec` into a running container. Nothing else until a job
requires it.

**"A contribution that counts" (Track 2).** Changes behavior, not docs or dependency bumps · 20–200
lines · includes a test · survived a round of review by the maintainer.

**"A 500-line file" (M15).** Not a length — **a file you have personally been confused by while
editing**, with at least three responsibilities, chosen and justified in writing before you touch it.

**"~100 failure traces" (the Layer 3 gate).** Traces where the output was *wrong*, not merely traces.
A hundred successful calls teach you nothing; error analysis needs failures to read.

---

# Appendix B — Glossary

This document uses in-group vocabulary it does not define. That is invisible to anyone who learned it
from colleagues and it is a real tax on someone who did not have any. **A read-only vocabulary also means
the mispronunciation is the one error you cannot detect alone** — say these out loud once, to a person,
before an interview. Every module defines its own words on its own page; these are the ones that cross
modules.

| Term | Meaning |
|---|---|
| **Yak-shaving** | The chain of prerequisite tasks between you and the thing you meant to do. |
| **Chesterton’s fence** | Don’t remove something until you know why it was put there. |
| **Strangler fig** | Replacing a system incrementally by routing traffic to the new one piece by piece, and removing the old one only when nothing uses it. |
| **Expand/contract** | A migration in two safe steps — add the new shape first and move to it (expand), remove the old one later (contract) — so old and new code can run simultaneously. |
| **Blast radius** | Everything a change or a compromise can reach. |
| **Characterization test** | A test that pins current behavior *including its bugs*, so you can refactor safely without knowing intent. |
| **Open coding / axial coding** | Reading examples and writing freeform notes (open), then clustering those notes into named categories with counts (axial). The method behind a failure taxonomy. |
| **Backpressure** | Signaling upstream to slow down when you cannot keep up, instead of queueing without limit. |
| **Dead-letter** | Where a job goes after it has failed too many times — set aside, out of the line, for a person to look at. |
| **Idempotent** | Safe to run more than once — the second run changes nothing. |
| **LEGB** | Python’s name-resolution order: Local → Enclosing → Global → Built-in. |
| **RRF** (reciprocal rank fusion) | Merging two ranked result lists by rank rather than by score, so something ranked well in both rises to the top. |
| **Cross-encoder / reranker** | A slower model that scores query-and-document *together*, used to reorder a cheap retriever’s top candidates. |
| **Recall@k** | Of all the chunks that should have been retrieved, what fraction appeared in the top k. |
| **TPR / TNR** | True-positive rate (of real failures, how many did the judge catch) and true-negative rate (of non-failures, how many did it correctly pass). |
| **Bootstrap CI** | Re-drawing your own results many times to get a confidence interval, when you can’t assume a distribution. |
| **Mutation score** | The share of deliberately introduced bugs (mutants) your test suite kills. Measures test quality; coverage does not. |
| **Prefill** | The model reading the whole input in one pass before generation starts — where time-to-first-token goes. |
| **Grapheme cluster** | What a human calls one character, which may be several code points, which may be several bytes. |
| **p50 / p95 / p99** | Median, and the values below which 95% and 99% of requests fall. The tail is where incidents live. |
| **SSRF** | Server-side request forgery — making *your* server fetch a URL an attacker chose. |
| **Envelope encryption** | Encrypting data with a per-row key, then encrypting those keys with one master key kept elsewhere, so rotation doesn’t mean re-encrypting everything. |
| **ADR / decision record** | A short dated record of a decision, the options rejected, and the reason. |
| **WIP** | Work in progress — the number of things you have started and not finished, such as open PRs. |

---

# Appendix C — Learn on demand

Not cut because they’re worthless — cut because they’re learnable in days *when a job requires them*,
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

# The honest limit

Every real program has one. Here is this one’s, stated plainly so you meet it on purpose rather than in
month nine.

**No solo curriculum is job placement, and this one is not either.** Placement has a counterparty with
money riding on your outcome — someone with employer relationships who schedules interviews on your
behalf and gets paid when you land. You cannot self-generate that. Every number that makes the phrase
sound achievable is self-reported, by the program quoting it; only a handful of programs anywhere
publish audited outcomes, and a placement rate nobody audited is a marketing number.

**The second thing this cannot buy is a credential that survives an ATS filter**, and no hour count
changes that. Which is why M0 filtering postings on degree requirements *before* you spend an hour is
the correct move, not a consolation.

So the honest ceiling: **this can make you a candidate who wins almost any interview you actually get,
and it can instrument your funnel well enough that you find out fast which part is failing. It cannot
make the funnel large.**

### What closes the remaining distance

**Not more modules. The three relationships this program already manufactures and must not waste.** By
the time you are deep into applying you will have two or three working engineers at real companies who
have read your code line by line, argued with you about it, and merged it. **Referrals convert far
better than cold applications at every stage of the funnel, plausibly by something like an order of
magnitude** — the direction is real and the size is unknown, because no public figure is segmented for a
candidate like you and the ones that circulate measure three different things. **It is still the largest
lever available to you**, and Track 8’s funnel table will give you your own two rates by about month
nine. Track 2 builds that asset over 80 hours, and the ask is what it is
for. **Ask them** — it is part of Track 2, and it is three asks in your first year of applying.

**Take contract or 1099 work as a bridge if a W-2 title has not arrived by month 12.** M27 already models
the tax and insurance delta, and the Compressed Spine is explicitly aimed at a contract role. Six months
of paid real work converts you from *"self-taught with a portfolio"* to *"engineer with references,"*
which is the transition no curriculum can perform for you. **Plan for it as a likely path, not a
fallback.**

**And the thing to actually be afraid of is not that this is too shallow.** The real risk is month nine,
with silence in the funnel and M3 many months cold, concluding that the gap is constitutional. **It is
not.** Go and re-read the capability inventory M0 made you start in month one — the dated list that
began as "nothing yet." That is precisely what it is there for.

---

## Currency

**Where the currency risk actually lives.** The model module is the obvious place, and it is the least of
it. **Five modules carry a standing check-this-is-still-true warning on their own page**, and two of them
are in layers this document calls "fundamentals":

- **M6** (model IDs, parameters, pricing, `stop_reason` enum, caching TTLs) — monthly cadence
- **M5** (Supabase connection endpoints, key naming migration) — **a platform claim wearing fundamentals
  clothing; it moves at platform speed**
- **M11** (embedding output dimensionality against the pgvector ceilings) — version-pinned
- **M18** (pgvector index behavior, dimension ceilings, `iterative_scan` defaults) — version-pinned
- **M19** (the MCP spec revision, which you look up rather than take from a page) — breaking changes
  inside this curriculum’s own calendar

**M22 carries the same warning as a note** rather than a currency flag, for the Next.js caching direction
and the AI frontend library’s wire format. Everything in M3, M4, M14, M15, M17 is durable. Verify the
flagged modules against **primary sources** the week you build each one — not this document, not a blog
post, not a model’s memory.

**And the honest limit:** this document is a static artifact about a field that moves. Track 8’s monthly
re-plan is the only mechanism it has for noticing it has gone stale. That is thin. The real defense is the
habit the curriculum is actually teaching — **measure it yourself, and trust the number over the claim.**
