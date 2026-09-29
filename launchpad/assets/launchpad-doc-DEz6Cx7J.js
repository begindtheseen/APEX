var e=[{id:`the-honest-numbers`,title:`The honest numbers`,part:`The Launch Pad`,markdown:`| | hours |
|---|---|
| **Module hours** (the 41 modules, M0–M40) | **1,364** |
| **Parallel track hours** (11 tracks, all mandatory) | **496** |
| **Real total** | **1,860 focused hours** |

**The parallel tracks are mandatory, so they are in the total.** Plan against 1,860 hours, not
against the module hours alone.

That total matters more than anything else on this page, because M0’s whole claim to authority is
*runway sets the deadline*. A deadline computed from an incomplete number is not a deadline; it is a
miscalculation you experience as a felt sense of perpetual lateness somewhere in month nine, and that
feeling is what turns a bad stretch into quitting.

### What 1,860 hours actually means

- At **18 h/week** — the most the program assumes anyone can sustain for a long stretch — the full
  program is **~24 months** of focused hours.
- To finish in **13 months** you would need **~33 h/week**, every week, for a year. That is above the
  ceiling, which is why the program does not offer it; it offers the Spine instead.
- Wall-clock runs 1.3–1.5× focused hours once you count setup, yak-shaving, and re-reading what decayed,
  so plan on **31–36 months** on the calendar for the full program.

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

Divide 1,860 by the weeks in your runway. If the answer is more than 18 hours a week, do not attempt
the full program. The honest short path is fourteen modules — **M0, M1, M2, M3, M4, M5, M6, M7, M9,
M10, M12, M27, M28, M30** — which is **552 module hours**, plus the **370 track hours** the Spine keeps,
for **922 hours in all**. At 18 h/week that is **~12 months** — priced with the tracks it carries, not
module-only. If 922 divided by your runway in weeks is *also* over 18, take the Spine, get a contract
role, and learn the rest on someone else’s payroll. That is a financial decision, not a technical one.

**Spine track policy:** T7 (writing) suspended · T2 (open-source contributions) cut to 40h rather than
suspended, because it is the track that manufactures the people who can refer you and the reader on the
shortest runway needs that lever most — 40 hours is one accepted contribution and then the ask · T4 (cold
rebuild) every other week, 30h instead of 60 · T1 (job search, 200h), T5 (reviewer, 26h), T8 (re-plan,
34h), T9 (narrated problems, 25h) and T10 (the Sweep, 15h) unchanged; T11 (the Model Watch) is suspended
with the Frontier layer it serves. That is the 370.

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
`},{id:`the-six-bets-this-curriculum-is-making`,title:`The six bets this curriculum is making`,part:`The Launch Pad`,markdown:`Each is stated with the strongest objection to it and why the bet stands, so you can judge it yourself.

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
artifact is tagged \`LAB\` or \`EVIDENCE\`. Costs nothing.

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
`},{id:`the-five-rules`,title:`The five rules`,part:`The Launch Pad`,markdown:`**1. Every module ends in an artifact — something that runs, or something a stranger can read.** Every
artifact is tagged \`LAB\` (built to learn, never pinned) or \`EVIDENCE\` (built to show, goes in the
portfolio).

**2. Every module except M0 has at least one inbound dependency edge.** Each module header states
\`dependsOn:\` explicitly. **The longest path, not the hour sum, sets the timeline.**

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
\`DELTA.md\`: *what this document says · what is true now · what I changed.*

> This is the answer to "the space grows every day," and it is the only mechanism here that scales.
> A currency warning on one module is not enough — stale claims turn up in modules labeled durable,
> too. A static document about a moving field rots silently. **A per-module verification habit does not**, because it runs at the
> moment you actually need the truth.
>
> Each \`DELTA.md\` is also interview material. "Here is where the docs I learned from had gone stale and
> how I found out" is a better answer than anything else you can say about currency.

### What a ticked gate is, and what it is not

**Ticking a gate does not pass it.** It records that a named referee passed you: write who, the date,
and one line of what they said. **An unnamed tick is the decorative gate this program exists to
refuse**, and you are the only person who can tell the difference. This applies to every gate in the
document, not only to the hard gate at the end of Layer 3.
`},{id:`flow-how-this-is-meant-to-be-read`,title:`Flow — how this is meant to be read`,part:`The Launch Pad`,markdown:`"Beginner to expert with no confusion points" is a property this document is built to have. Four
things to rely on as you read:

**1. Nothing is used before it is explained.** Almost every forward reference lives in \`exports\` —
*"the streaming proxy you are building feeds M8, M20 and M22"* — which is motivation, not confusion:
it tells you why the work matters while you do it. The one genuine forward dependency (M11 asking you
to record an embedding model’s dimensionality because of a ceiling you meet in M18) is
**self-explaining at the point of use**, so the decision is never blind.

**2. Vocabulary is defined before it is used.** Three terms are used slightly early — *idempotency*,
*SSRF*, *blast radius* — and all three are in Appendix B, which exists precisely because you have no
colleagues to ask.

**3. Every module of 30 hours or more has named checkpoints, and five shorter ones carry them too** —
**196 in total across 34 modules, averaging about 7 hours apart.** Each is a sub-goal with its own done-state and each is an explicit
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
`},{id:`build-order`,title:`Build order`,part:`The Launch Pad`,markdown:`Presented in execution order. Hours are focused hours. A module marked *trigger* is scheduled by an
event on your plan rather than by finishing the row above it; its \`dependsOn\` still has to be passed.

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
| | **LAYER 9 — The Frontier: opens module by module as its \`dependsOn\` pass, alongside Layers 6 and 7** | | |
| **M33** | How a Language Model Works | 40 | M6, M24 |
| **M34** | Reading the Model Landscape | 20 | M12, M33 |
| **M35** | One Feature, Three Providers | 30 | M7, M19, M34 |
| **M36** | Open Weights on Your Own Hardware | 30 | M20, M25, M34 |
| **M37** | Beyond Text: Vision, Speech, Images and Embeddings | 35 | M18, M22, M35 |
| **M38** | Adapting a Model: Fine-Tuning and When Not To | 35 | M33, M36, M18 |
| **M39** | MCP and the Agent Platform | 30 | M19, M21, M35 |
| **M40** | The Frontier Capstone: Build Something New | 30 | M34, M35, M36, M37, M38, M39 |


**The critical path is 603 hours**: \`M0 → M1 → M2 → M3 → M4 → M5 → M7 → M10 → M12 → M24 → M33 → M34 → M35 → M37 → M40\`.

Since Layer 9 arrived, the longest chain runs through the Frontier, and through Python on the way: M33 builds a
model in Python, so it waits on M24 whatever M24's trigger says. The old chain through M14, M15 and M16 (559 hours)
is still there, just no longer the longest.

That is the longest chain of strict dependencies — the floor on calendar time even if everything else
ran in parallel. **The hard gate counts as an edge on that chain**, because Layers 4–6 cannot open until
M2, M10 and M12 have produced what it asks for, even though no module in those layers lists all three in
its own \`dependsOn\`. Read \`dependsOn\` alone and you get 579 hours, which is twenty-four hours short of what
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
`},{id:`hard-gate-layer-3-layer-4`,title:`HARD GATE — Layer 3 → Layer 4`,part:`LAYER 3 — The AI Production Core (121h)`,markdown:`**Layers 4–6 — thirteen modules, M14 to M26 — do not start until all four are true:**

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
`},{id:`the-parallel-tracks-priced`,title:`The Parallel Tracks — priced`,part:`The Parallel Tracks — priced`,markdown:`All eleven are mandatory, so all eleven are budgeted. Their hours are in the headline total at the top, and
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
| T11 | **The Model Watch** | **26** | 30 minutes a week, from M34; continues after you are hired |

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
- **Your \`DELTA.md\` notes** (Rule 5) — this is how technical change enters the re-plan at all. Without
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

**Track 11 — the Model Watch.** The field moves faster than any curriculum, this one included, so keeping
up is a scheduled habit rather than a feeling of falling behind. Thirty minutes a week: read the release
notes and model cards of what shipped, add or correct a line on your own dated profile cards (M34,
Appendix D), and write one line on what changed for anything you build. **When a model that could matter
to you ships, run your eval sets against it with the harness from M40 inside 48 hours** and write a
one-page delta: better, worse, cheaper, or no change for your work, with the numbers. A headline is not a
finding; your eval set is. This is how you stay where working developers are after the program ends,
which is why it continues after you are hired.
`},{id:`the-cut-list`,title:`The Cut List`,part:`The Cut List`,markdown:`Deliberately removed. **This list is itself a hiring signal** — "I know that exists, here is when I would
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
are **not** on this list: \`uv\` is what M24 teaches, but poetry, pyenv and conda are all in real use, and
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
`},{id:`appendix-a-what-enough-means`,title:`Appendix A — What "enough" means`,part:`Appendix A — What "enough" means`,markdown:`"Exactly enough Docker and Linux, and not one hour more" (M23) is not a target you can act on. Given an
undefined floor you will either over-invest — M23’s own Kubernetes rabbit hole is exactly that — or
under-invest and pass yourself. So here is the floor, enumerated:

**Linux — the finishable list.** Processes and signals · exit codes · stdout/stderr and pipes · file
permissions · \`PATH\` and environment inheritance · SSH keys · and a named short list of commands you
reach for without looking up. That is a checklist. You can finish it and stop.

**Docker — only this.** Write a Dockerfile for your own app · build it · run it with env vars and a
mounted volume · read the layer cache · \`exec\` into a running container. Nothing else until a job
requires it.

**"A contribution that counts" (Track 2).** Changes behavior, not docs or dependency bumps · 20–200
lines · includes a test · survived a round of review by the maintainer.

**"A 500-line file" (M15).** Not a length — **a file you have personally been confused by while
editing**, with at least three responsibilities, chosen and justified in writing before you touch it.

**"~100 failure traces" (the Layer 3 gate).** Traces where the output was *wrong*, not merely traces.
A hundred successful calls teach you nothing; error analysis needs failures to read.
`},{id:`appendix-b-glossary`,title:`Appendix B — Glossary`,part:`Appendix B — Glossary`,markdown:`This document uses in-group vocabulary it does not define. That is invisible to anyone who learned it
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
`},{id:`appendix-c-learn-on-demand`,title:`Appendix C — Learn on demand`,part:`Appendix C — Learn on demand`,markdown:`Not cut because they’re worthless — cut because they’re learnable in days *when a job requires them*,
and front-loading them displaces something you will own. **"I know that exists, here is when I would
reach for it, I have not needed it yet" is a better interview answer than a shallow artifact.**

Playwright and E2E as a discipline · feature flags as a subject · webhook signature verification as its
own unit · rate limiting as its own unit · the batch/async tier · GraphQL · gRPC · implementing an OAuth
*provider* · prompt compression · semantic caching · self-hosting open-weights models and serving
internals · Jujutsu · GitFlow ceremony · git submodules and history surgery · Bedrock/Vertex as
alternative consumption paths for the same models (know the term exists; the client construction and
feature availability differ).

**Give every row here a revisit date.** A cut list with no expiry is indistinguishable from an opinion.
`},{id:`appendix-d-model-profiles-checked-2026-09-29`,title:`Appendix D — Model profiles (checked 2026-09-29)`,part:`Appendix D — Model profiles (checked 2026-09-29)`,markdown:`This is a dated snapshot of the major model families, taken from makers' own model pages, model cards,
license files and changelogs on the date in the heading. It starts going stale the day after that date.
In September 2026 alone, OpenAI shipped a new flagship and two new tiers, Anthropic and Google each
shipped new models, and OpenAI's video API shut down. M34 teaches you to size up any model in an
afternoon and keep your own profile cards; Track 11 (the Model Watch) is when you refresh them. Where
a line here and your own eval set disagree, trust your eval set: it ran on your task.

Each card has the same fields. **Current lineup** lists the tiers the maker names as of the check date
(flagship / mid / small). **Context window / output cap** appears only where an official page published
it; "check" means it was not confirmed. Prices are left out on purpose, except where a pricing *rule*
bites builders.
`},{id:`frontier-chat-and-reasoning-models`,title:`Frontier chat and reasoning models`,part:`Appendix D — Model profiles (checked 2026-09-29)`,markdown:`**Anthropic Claude**
- **Maker:** Anthropic
- **Current lineup:** Claude Fable 5.1 (top tier, for demanding reasoning and long-horizon agentic
  work) · Claude Opus 5.5 (released 2026-09-22, the maker's recommended starting point for most
  workloads) · Claude Sonnet 5.5 (speed and intelligence balance) · Claude Haiku 4.5 (fastest).
  Claude Mythos 5.1 is invitation-only (Project Glasswing). Earlier 4.5–5 models remain as legacy.
- **Open or closed:** Closed. Served on the Claude API, Amazon Bedrock, Google Cloud, Microsoft
  Foundry and Claude Platform on AWS.
- **Inputs and outputs:** Text and images in, text out, for all current models.
- **Context window / output cap:** 1M tokens and 128K output for Fable 5.1, Opus 5.5 and Sonnet 5.5;
  200K and 64K for Haiku 4.5. Batches allow 300K output behind a beta header.
- **Known for:** Long-running agentic coding, tool use and long-context work.
- **Worth knowing:** On Opus 5.5 and Fable 5.1, thinking is always on and cannot be disabled; you steer
  it with the \`effort\` parameter. Forced tool use returns an error, and text between tool calls arrives
  in \`thinking\` blocks that are empty at the default display setting. The tokenizer introduced with
  Opus 4.7 produces roughly 30% more tokens for the same text, so old cost models undercount. Haiku
  4.5's retirement commitment is only "not sooner than October 15, 2026".
- **Check here:** https://platform.claude.com/docs/en/about-claude/models/overview

**OpenAI GPT**
- **Maker:** OpenAI
- **Current lineup:** GPT-6 Astra (flagship, generally available 2026-09-04) · GPT-6 Sol (balanced,
  for coding and agentic work, 2026-09-22) · GPT-6 Luna (lightweight and lowest-cost, 2026-09-22). The
  GPT-5.6 generation is still listed.
- **Open or closed:** Closed. Its open-weight line, gpt-oss, has its own card below.
- **Inputs and outputs:** Text and images in, text out.
- **Context window / output cap:** GPT-6 Astra: 1,050,000 tokens, 128,000 output. Sol and Luna: check
  their model pages.
- **Known for:** Computer use, coding and professional work (the maker's claims for Astra), and a wide
  built-in tool surface: Structured Outputs, prompt caching, compaction.
- **Worth knowing:** Prompts over 272K input tokens are billed at 2x input and 1.5x output **for the
  whole request**, so one long document can double a call's cost. Astra does not accept reasoning
  effort \`none\`. Tools run through the Responses API.
- **Check here:** https://developers.openai.com/api/docs/models

**Google Gemini**
- **Maker:** Google (Google DeepMind)
- **Current lineup:** Gemini 3.1 Pro (flagship, **still in preview**) · Gemini 3.8 Flash (mid, released
  September 2026; Google's recommended default for new projects alongside Flash-Lite) · Gemini 3.5
  Flash-Lite (small, high-throughput). Google has said Gemini 4 is next.
- **Open or closed:** Closed. On the Gemini API and Google Cloud (Vertex AI is now documented as the
  Gemini Enterprise Agent Platform).
- **Inputs and outputs:** Text, image, video, audio and PDF in, text out.
- **Context window / output cap:** 1M input and 64K output for Gemini 3.8 Flash. Check each model page
  for the others.
- **Known for:** Native multimodal input (long video and audio), Flash-tier cost, Search grounding.
- **Worth knowing:** Google now calls the **Interactions API** its primary interface. The older
  \`generateContent\` API is labeled legacy but still supported, and new agent features will increasingly
  ship only on Interactions. Preview models can be deprecated on two weeks' notice, which matters while
  Pro is preview. 3.8 Flash rejects \`thinking_level: minimal\`. Flash pricing is introductory until
  2026-12-31; budget with the standard price.
- **Check here:** https://ai.google.dev/gemini-api/docs/models

**SpaceXAI Grok (formerly xAI)**
- **Maker:** SpaceXAI, the SpaceX unit that xAI's docs now publish under.
- **Current lineup:** grok-4.7 (flagship, for coding and knowledge work) · grok-4.6 and grok-4.5
  (still served). Check the models page for the current lower-cost tier.
- **Open or closed:** Closed.
- **Inputs and outputs:** Text and images in, text out.
- **Context window / output cap:** 500K tokens for grok-4.7, 4.6 and 4.5. No output limit is published.
- **Known for:** Coding and agentic work. Press coverage reports recent Grok models were trained
  jointly with Cursor, which SpaceX acquired in August 2026.
- **Worth knowing:** Branding, URLs and model list changed fast this year. Pin the model ID you
  evaluated. Grok's default slot in Cursor is a distribution fact, not a quality measurement.
- **Check here:** https://docs.x.ai/developers/models

**Meta Muse**
- **Maker:** Meta (Meta Superintelligence Labs)
- **Current lineup:** Muse Spark 1.3. (The open Muse Glimmer is below.)
- **Open or closed:** Closed. In public preview on the Meta Model API for US developers, and also
  offered through OpenRouter.
- **Inputs and outputs / context:** Check the model page.
- **Known for:** Meta's frontier model since April 2026; unlike Llama, weights are not released.
- **Worth knowing:** The Meta Model API is OpenAI-SDK-compatible. Meta's **Llama API was wound down
  on 2026-07-06**; Llama models are now served only by third parties or on your own hardware.
- **Check here:** https://developer.meta.com/ai/models/muse-spark/
`},{id:`open-weight-families`,title:`Open-weight families`,part:`Appendix D — Model profiles (checked 2026-09-29)`,markdown:`The license decides what you may ship. Read the LICENSE file in the repository you download from, not
a summary. The 2026 pattern: permissive terms plus a clause for very large companies or model hosts.

**Meta Llama 4 and Muse Glimmer**
- **Maker:** Meta
- **Current lineup:** Llama 4 Scout (17B active, 16 experts) and Llama 4 Maverick (17B active, 128
  experts), still downloadable. Muse Glimmer 30B (August 2026), dense, distilled from Muse for local
  agents.
- **Open or closed:** Open weights. Llama 4 uses the **Llama 4 Community License**: companies above
  700 million monthly active users need a separate license, you must show "Built with Llama," and
  derivative model names must start with "Llama." The acceptable use policy withholds rights to the
  *multimodal* Llama 4 models from individuals and companies based in the European Union (end users of
  a product are exempt). **Muse Glimmer is Apache 2.0.**
- **Inputs and outputs:** Llama 4: text and images in, text out. Muse Glimmer: multimodal in, text
  out, tuned for tool use.
- **Context window / output cap:** The Llama 4 model card lists 10M (Scout) and 1M (Maverick). Muse
  Glimmer: check the model card.
- **Known for:** Broad inference-tool support (Llama); one-GPU local agents (Glimmer).
- **Worth knowing:** The EU and naming clauses catch teams late. Check both before you fine-tune.
- **Check here:** https://github.com/meta-llama/llama-models and
  https://huggingface.co/meta-models/Muse-Glimmer-30B

**Alibaba Qwen**
- **Maker:** Alibaba (Qwen team)
- **Current lineup:** Qwen3.8 (August 2026): Qwen3.8-2.4T-A95B (the open release of the Qwen3.8-Max
  flagship) · Qwen3.8-Flash-Next · Qwen3.8-27B (dense).
  Qwen3.6 and 3.5 remain widely deployed; Qwen 4 is in training.
- **Open or closed:** Open weights, but not one license. **Qwen3.8-27B is Apache 2.0. The 2.4T
  checkpoint ships under a custom "Qwen3.8-Max License."** The hosted Max model is closed and served on
  Alibaba Cloud.
- **Inputs and outputs:** Qwen3.8-27B takes text and images and outputs text. Users report the open
  2.4T checkpoint lacks some hosted-Max features; check its card.
- **Context window / output cap:** Qwen3.8-27B: 262,144 tokens native. Qwen3.8-Flash-Next: 262,144
  native, extensible to about 1M. 2.4T: check the model card.
- **Known for:** Small to frontier sizes in one family; a common fine-tuning base.
- **Worth knowing:** Some servers have run the 27B text-only for lack of a registered multimodal
  processor. Confirm image input works on yours.
- **Check here:** https://huggingface.co/Qwen

**DeepSeek**
- **Maker:** DeepSeek
- **Current lineup:** DeepSeek-V4.1-Flash (September 2026, the default API model) · DeepSeek-V4-Pro
  (still served after a planned retirement was reversed).
- **Open or closed:** Open weights, **MIT license**, on Hugging Face. Also a low-cost hosted API.
- **Inputs and outputs:** V4.1-Flash takes images and text and outputs text.
- **Context window / output cap:** 1,048,576 tokens context and 393,216 output on the API, per
  DeepSeek's docs.
- **Known for:** Low API cost and MIT-licensed frontier-scale weights.
- **Worth knowing:** Model names are **silently re-routed**: requests to \`deepseek-v4-flash\` are now
  served by V4.1-Flash, and \`deepseek-chat\` / \`deepseek-reasoner\` stopped working after 2026-07-24.
  Results can change with no code change, so log the model each response reports. Off-peak is half
  price. The API accepts OpenAI and Anthropic request formats.
- **Check here:** https://api-docs.deepseek.com/quick_start/pricing/

**Mistral**
- **Maker:** Mistral AI
- **Current lineup:** Mistral Medium 3.5 (128B dense, one set of weights for instruction-following,
  reasoning and coding) · Mistral Large 3 (675B total / 41B active mixture-of-experts, December 2025) ·
  Mistral Small 4 · Ministral 3 (3B, 8B, 14B). Specialists: Devstral (coding), Voxtral
  (speech, including Voxtral TTS), OCR 4.
- **Open or closed:** Mostly open weights. **Large 3 and Ministral 3 are Apache 2.0. Medium 3.5 is
  a "Modified MIT" license** with exceptions for companies above certain thresholds. Also a hosted API.
- **Inputs and outputs:** Medium 3.5 and Ministral 3 take text and images and output text.
- **Context window / output cap:** 256K for Medium 3.5 and Small 4.
- **Known for:** Being a European maker, permissive licenses at large sizes, and document OCR.
- **Worth knowing:** Reasoning is a per-request setting (\`reasoning_effort\`) on the merged models, not a
  separate model ID. Specialist models retire fast (Leanstral 1.5 on 2026-09-30).
- **Check here:** https://docs.mistral.ai/models

**Google Gemma**
- **Maker:** Google DeepMind
- **Current lineup:** Gemma 4 in five sizes: E2B and E4B ("effective" parameters, for phones and
  browsers) · 12B (encoder-free multimodal) · 26B A4B (mixture-of-experts) · 31B (dense).
- **Open or closed:** Open weights, **Apache 2.0** (earlier Gemma generations used Google's own Gemma
  terms).
- **Inputs and outputs:** Text and images in for all sizes, with audio and video natively on E2B, E4B
  and 12B. Text out.
- **Context window / output cap:** 128K (E2B, E4B) and 256K (12B, 26B A4B, 31B).
- **Known for:** On-device and edge deployment, configurable thinking, and native function calling.
- **Worth knowing:** Fine-tunes of older Gemma models still carry the older terms.
- **Check here:** https://ai.google.dev/gemma/docs/core

**OpenAI gpt-oss**
- **Maker:** OpenAI
- **Current lineup:** gpt-oss-120b (117B total, 5.1B active, fits one 80 GB GPU) · gpt-oss-20b (21B
  total, 3.6B active, for local use) · gpt-oss-safeguard (a policy-classification fine-tune).
- **Open or closed:** Open weights, **Apache 2.0**.
- **Inputs and outputs:** Text in, text out, with function calling and structured outputs.
- **Context window / output cap:** 128K context.
- **Known for:** A permissive reasoning model sized for a single GPU or a laptop.
- **Worth knowing:** The models were trained on OpenAI's **harmony** response format and "should only
  be used with this format." Skipping the chat template or \`openai-harmony\` degrades output in a way
  that looks like a model problem.
- **Check here:** https://github.com/openai/gpt-oss

**Moonshot Kimi**
- **Maker:** Moonshot AI
- **Current lineup:** Kimi K3 (released July 2026).
- **Open or closed:** Open weights under the **Kimi K3 License**: MIT-style, but a model-as-a-service
  business above $20 million revenue in any 12 months must sign a separate agreement.
- **Inputs and outputs:** Text, images and video in, text out.
- **Context window / output cap:** 1M tokens.
- **Known for:** Frontier scale in the open (2.8T parameters, billed by the maker as the first open
  3T-class model), aimed at long-horizon coding.
- **Worth knowing:** Self-hosting needs a multi-GPU cluster. Through a host, you are evaluating the
  host's precision and limits too.
- **Check here:** https://github.com/MoonshotAI/Kimi-K3

**Z.ai GLM**
- **Maker:** Z.ai (formerly Zhipu)
- **Current lineup:** GLM-5.3 (same base as GLM-5.2, with more post-training for coding and long tasks)
  · GLM-5.3-Flash (a new, smaller base with hybrid sparse and linear attention) · GLM-5.2.
- **Open or closed:** Open weights. **GLM-5.3-Flash is MIT. GLM-5.3 has its own license**, permissive
  except that a model-as-a-service business above $10 billion revenue must pass Z.ai's security review.
- **Inputs and outputs:** Check the model card for each variant.
- **Context window / output cap:** GLM-5.2: 1M tokens. Others: check.
- **Known for:** Coding. Z.ai claims open-model leadership on several coding benchmarks; measure it.
- **Worth knowing:** The maker reports fast-growing offensive cyber capability. That belongs in your
  M21 threat model.
- **Check here:** https://github.com/zai-org/GLM-5
`},{id:`coding-agents-and-coding-models`,title:`Coding agents and coding models`,part:`Appendix D — Model profiles (checked 2026-09-29)`,markdown:`A coding agent is a harness (tools, permissions, context management) wrapped around a model. The same
model scores differently in different harnesses, which is why benchmark tables name the harness. Change
one of the two at a time.

**Claude Code**
- **Maker:** Anthropic
- **Current lineup:** One engine on terminal, VS Code, JetBrains, desktop, web and mobile, plus CI and
  Slack integrations and the Agent SDK for building your own agents.
- **Open or closed:** Closed. Runs on Claude models.
- **Inputs and outputs:** Repository, shell and MCP servers in; edits, commits, pull requests out.
- **Known for:** Terminal-first agentic work, subagents, hooks, skills, scheduled cloud routines.
- **Worth knowing:** Needs a Claude subscription or Console account (the CLI and IDE extensions can
  also use Bedrock, Google Cloud or Foundry). Reads \`CLAUDE.md\` and \`AGENTS.md\`. Homebrew and WinGet
  installs do not auto-update.
- **Check here:** https://code.claude.com/docs/en/overview

**OpenAI Codex**
- **Maker:** OpenAI
- **Current lineup:** Codex CLI (open source), the Codex app and cloud tasks in ChatGPT. Models:
  gpt-6-sol and gpt-6-luna, with GPT-6 Astra available.
- **Open or closed:** The CLI is open source. The models are closed.
- **Inputs and outputs:** Repository and shell in, edits and pull requests out.
- **Known for:** Integration with ChatGPT plans.
- **Worth knowing:** Retirements hit Codex on their own schedule: gpt-5.4 left on 2026-08-31 and
  GPT-5.5 leaves on 2026-10-14. Pin \`--model\` in scripts and CI.
- **Check here:** https://developers.openai.com/codex/models

**Cursor**
- **Maker:** Anysphere, acquired by SpaceX in August 2026 and folded into SpaceXAI.
- **Current lineup:** Editor, CLI, Cloud Agents, Bugbot (review). Models: Cursor's own Composer 2.5
  (standard and fast) and Grok 4.5–4.7 in the default pool; check your plan for others.
- **Open or closed:** Closed.
- **Inputs and outputs:** Repository in, edits out.
- **Known for:** Editor-native agents and fast completions.
- **Worth knowing:** Agent use is metered by tokens beyond the plan. Composer's fast variant is the
  default and costs several times the standard one.
- **Check here:** https://cursor.com/docs/models-and-pricing

**GitHub Copilot**
- **Maker:** GitHub (Microsoft)
- **Current lineup:** Completions, chat, IDE agent mode, and a coding agent that works from issues.
  Multi-model: Claude Sonnet 5.5 (generally available 2026-09-28), Claude Fable 5.1
  (Pro+ and above), GPT-6 Sol and Luna, and Grok 4.7.
- **Open or closed:** Closed.
- **Inputs and outputs:** Repository and issues in, edits and pull requests out.
- **Known for:** Distribution through existing GitHub contracts, so you may meet it first at a new job
  (M32).
- **Worth knowing:** Models vary by plan, and deprecations come with short notice (a batch on
  2026-10-19).
- **Check here:** https://github.blog/changelog/label/copilot/

**Google Antigravity and Jules**
- **Maker:** Google
- **Current lineup:** Antigravity 2.0 (desktop, agent-first) and Antigravity CLI · Jules
  (asynchronous coding agent, with an API and a CLI).
- **Open or closed:** Closed.
- **Inputs and outputs:** Repository in, edits and pull requests out.
- **Worth knowing:** **Gemini CLI stopped serving Google AI Pro, Ultra and free individual users on
  2026-06-18.** Antigravity CLI replaces it. Tutorials from before June are out of date.
- **Check here:** https://antigravity.google/

**Also in use:** Grok Build (https://docs.x.ai/build/overview) · Mistral Vibe CLI with Devstral 2
(modified MIT) and Devstral Small 2 (Apache 2.0) · Kimi Code. Self-hosted coding models are in the
open-weight cards above.
`},{id:`image-generation`,title:`Image generation`,part:`Appendix D — Model profiles (checked 2026-09-29)`,markdown:`**OpenAI GPT Image**
- **Maker:** OpenAI
- **Current lineup:** GPT-Image-2.5 Flare (fast, everyday use) · GPT-Image-2.5 Sunburst (slower,
  for editing precision), both released 2026-09-08 · GPT-Image-2 (previous).
- **Open or closed:** Closed.
- **Inputs and outputs:** Text and images in, images out (generation and editing).
- **Known for:** Editing precision and keeping subjects from reference photos. OpenAI says 2.5 cut
  latency by up to 50% compared with Images 2.0.
- **Worth knowing:** Flare and Sunburst trade latency for precision. Measure both on your prompts.
- **Check here:** https://developers.openai.com/api/docs/models/gpt-image-2.5-flare

**Google Nano Banana (Gemini Image)**
- **Maker:** Google DeepMind
- **Current lineup:** Nano Banana Pro (Gemini 3 Pro Image) · Nano Banana 2 (Gemini 3.1 Flash Image) ·
  Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image, fastest and cheapest).
- **Open or closed:** Closed.
- **Inputs and outputs:** Text and images in, images (and text) out, with multi-turn editing.
- **Known for:** Conversational editing, and output from 512px up to 4K (Lite: 1K only).
- **Worth knowing:** **Imagen endpoints were shut down on 2026-08-17.** Generation now goes through the
  normal Gemini call. Default output is 1K.
- **Check here:** https://ai.google.dev/gemini-api/docs/image-generation

**Black Forest Labs FLUX**
- **Maker:** Black Forest Labs
- **Current lineup:** FLUX.2 [max] (top quality, can ground prompts with web search) · [pro] · [flex]
  (you control steps and guidance) · [dev] (32B, open weights) · [klein] (small, open weights).
- **Open or closed:** Both. **FLUX.2 [dev] is open weights under a non-commercial license**, and
  commercial self-hosting needs a paid license. **FLUX.2 [klein] is Apache 2.0.** API use includes
  commercial rights.
- **Inputs and outputs:** Text and multiple reference images in, images out, up to 4MP.
- **Known for:** Open weights for local pipelines and fine-tuning, and multi-reference editing.
- **Worth knowing:** Shipping [dev] in a product without a paid license violates it.
- **Check here:** https://bfl.ai/models and https://bfl.ai/licensing

**Midjourney**
- **Maker:** Midjourney
- **Current lineup:** V8.2 (default since 2026-07-24). V8.1 is still selectable.
- **Open or closed:** Closed.
- **Inputs and outputs:** Text and image prompts in, images out.
- **Known for:** Aesthetic style and control, through Midjourney's own apps.
- **Worth knowing:** There is **no general public API**. Do not design around programmatic access without
  a signed agreement.
- **Check here:** https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version
`},{id:`video-generation`,title:`Video generation`,part:`Appendix D — Model profiles (checked 2026-09-29)`,markdown:`**Google Veo and Gemini Omni**
- **Maker:** Google DeepMind
- **Current lineup:** Gemini Omni Flash (\`gemini-omni-1.1-flash\`, generally available, Google's
  recommended default for video) · Veo 3.1 · Veo 3.1 Lite (preview, lowest cost).
- **Open or closed:** Closed.
- **Inputs and outputs:** Omni takes text, images, audio and video together and supports multi-turn
  editing. Veo 3.1 makes 4, 6 or 8 second clips at 720p, 1080p or 4K with native audio (Lite: no 4K,
  no extension).
- **Known for:** Native synchronized audio, and conversational editing (Omni).
- **Worth knowing:** Omni runs through the Interactions API. Veo is paid-tier only and still in
  preview. Generation is asynchronous: poll, don't block.
- **Check here:** https://ai.google.dev/gemini-api/docs/video

**OpenAI Sora — discontinued**
- **Maker:** OpenAI
- **Status:** The Sora apps closed 2026-04-26 and **the Sora API shut down on 2026-09-24**. Samples that
  call \`sora-2\` no longer work.
- **Check here:** https://openai.com/sora/

**Runway**
- **Maker:** Runway
- **Current lineup:** Gen-4.5 (text-to-video and image-to-video) · Gen-4 Turbo. Runway's API also
  serves third-party models, including Veo 3.1 and Seedance.
- **Open or closed:** Closed.
- **Inputs and outputs:** Text and images in, video out.
- **Known for:** One API over several makers' video models.
- **Check here:** https://docs.dev.runwayml.com/

**ByteDance Seedance**
- **Maker:** ByteDance (Seed team)
- **Current lineup:** Seedance 2.5 · Seedance 2.0.
- **Open or closed:** Closed.
- **Inputs and outputs:** Text plus up to 30 images, 10 video clips and 10 audio clips as references in.
  Up to 30-second audio-video clips out in one pass, with extension.
- **Known for:** Long single-pass clips and timestamp-level editing.
- **Worth knowing:** At the check date the maker says 2.5 API access via BytePlus ModelArk is "coming
  soon." Resellers offer it; confirm whose terms apply.
- **Check here:** https://seed.bytedance.com/en/seedance2_5

**SpaceXAI Grok Imagine**
- **Maker:** SpaceXAI
- **Current lineup:** grok-imagine-video-1.5, plus image generation in the same Imagine API.
- **Open or closed:** Closed.
- **Inputs and outputs:** Text, images and video in. Video with audio out, up to 15 seconds at 480p,
  720p or 1080p. Images: up to 10 per request at 1K or 2K.
- **Check here:** https://x.ai/api/imagine
`},{id:`speech-speech-to-text-text-to-speech-realtime-voice`,title:`Speech (speech-to-text, text-to-speech, realtime voice)`,part:`Appendix D — Model profiles (checked 2026-09-29)`,markdown:`A voice product usually chains three stages (speech-to-text, a model, text-to-speech) or uses one
speech-to-speech model. The chain is easier to debug; the single model is faster. Measure p95
time-to-first-audio.

**OpenAI audio**
- **Maker:** OpenAI
- **Current lineup:** Realtime voice: GPT-Realtime-2 (reasons, calls tools, handles interruptions) ·
  GPT-Live-1 (full-duplex, so it listens while speaking, and hands reasoning to a backend agent) ·
  GPT-Realtime-Translate (live translation). Speech-to-text: GPT-Transcribe (files and batch) ·
  GPT-Live-Transcribe (low-latency streaming). Text-to-speech: gpt-4o-mini-tts (steerable delivery,
  13 built-in voices).
- **Open or closed:** Closed. Whisper, the older open model, is MIT-licensed on GitHub.
- **Inputs and outputs:** Audio in, text or audio out. Realtime connects over WebRTC, WebSocket or SIP.
- **Known for:** Tool calling in live voice sessions, and phone calls via SIP.
- **Worth knowing:** GPT-Live-1 is billed by session time, not tokens. A Whisper migration guide exists.
- **Check here:** https://developers.openai.com/api/docs/guides/audio

**Google Gemini Live and TTS**
- **Maker:** Google DeepMind
- **Current lineup:** Gemini 3.8 Live · Gemini 3.8 Live Extended Thinking (deeper reasoning) ·
  Gemini 3.1 Flash Live. TTS: Gemini 3.8 Flash TTS · Gemini 3.8 Flash-Lite TTS.
- **Open or closed:** Closed.
- **Inputs and outputs:** Audio, video and text in, native audio out.
- **Known for:** Speech-to-speech with visual context and asynchronous function calling.
- **Worth knowing:** The Live API is a separate stateful interface with its own session limits.
- **Check here:** https://ai.google.dev/gemini-api/docs/live-api

**ElevenLabs**
- **Maker:** ElevenLabs
- **Current lineup:** TTS: eleven_v4 (most expressive, 90+ languages) · eleven_v4_turbo (realtime) ·
  Flash v2.5 (lowest latency) · Eleven v3 (previous generation). Speech-to-text: Scribe v2 · Scribe v2
  Realtime. Also a Text to Dialogue API and voice agents.
- **Open or closed:** Closed.
- **Inputs and outputs:** Text in, audio out. Audio in, text out with word timestamps and diarization
  (who spoke when).
- **Known for:** Voice quality and voice cloning.
- **Worth knowing:** Pin the model ID per request; defaults move each generation.
- **Check here:** https://elevenlabs.io/docs/overview/models

**Deepgram**
- **Maker:** Deepgram
- **Current lineup:** Speech-to-text: Flux (built for voice agents, with end-of-turn detection inside
  the model) · Flux Multilingual (10 languages) · Nova-3. TTS: Flux TTS · Aura. A Voice Agent API ties
  STT, an LLM and TTS together.
- **Open or closed:** Closed.
- **Inputs and outputs:** Audio in, text out. Text in, audio out.
- **Known for:** Low-latency streaming transcription and built-in turn-taking.
- **Worth knowing:** Built-in end-of-turn detection removes a class of interruption bugs. Test it on
  your users' speech.
- **Check here:** https://developers.deepgram.com/docs/models-languages-overview
`},{id:`embeddings`,title:`Embeddings`,part:`Appendix D — Model profiles (checked 2026-09-29)`,markdown:`You cannot mix vectors from different embedding models. Switching models means re-embedding the whole
corpus (M18), which is a migration with a cost and a rollback plan. The one exception below is a family
built to share a space.

**OpenAI embeddings**
- **Maker:** OpenAI
- **Current lineup:** text-embedding-3-large · text-embedding-3-small. Both date from January 2024, and
  OpenAI still lists no newer embedding model.
- **Open or closed:** Closed.
- **Inputs and outputs:** Text in, vectors out (up to 3072 dimensions for large).
- **Known for:** Broad support across frameworks and vector databases.
- **Worth knowing:** \`dimensions\` shortens vectors; choose before you index.
- **Check here:** https://developers.openai.com/api/docs/guides/embeddings

**Google Gemini Embedding**
- **Maker:** Google
- **Current lineup:** gemini-embedding-2 (the first multimodal embedding model in the Gemini API) ·
  gemini-embedding-001 (text). EmbeddingGemma is the small open option.
- **Open or closed:** Closed (EmbeddingGemma: open weights, so check its terms).
- **Inputs and outputs:** Text, images, video, audio and PDF pages into one shared vector space.
- **Context window / output cap:** 8,192 input tokens, shared across modalities. 3072 dimensions by
  default, with 768 and 1536 recommended as smaller sizes.
- **Known for:** Cross-modal search, for example text queries over video and audio.
- **Worth knowing:** Per-call caps on images, audio, video and PDF pages. Chunk first.
- **Check here:** https://ai.google.dev/gemini-api/docs/embeddings

**Voyage AI**
- **Maker:** Voyage AI (part of MongoDB)
- **Current lineup:** voyage-4-large · voyage-4 · voyage-4-lite, plus domain and contextualized-chunk
  models and rerankers.
- **Open or closed:** Closed. Served on the Voyage API and MongoDB Atlas.
- **Inputs and outputs:** Text in, vectors out at 256, 512, 1024 (default) or 2048 dimensions.
- **Context window / output cap:** 32K tokens for voyage-4-large.
- **Known for:** Retrieval quality, and a **shared embedding space** across the Voyage 4 family. You
  can index with one model and query with another without re-embedding.
- **Check here:** https://docs.voyageai.com/docs/embeddings

**Cohere Embed and Rerank**
- **Maker:** Cohere
- **Current lineup:** embed-v4.0 (multimodal) · Rerank 4 (rerank-v4.0-pro, rerank-v4.0-fast).
- **Open or closed:** Closed. Served on Cohere, AWS SageMaker and Azure AI Foundry.
- **Inputs and outputs:** Text and images in, vectors out at 256, 512, 1024 or 1536 dimensions.
- **Context window / output cap:** 128K context for embed-v4.0.
- **Known for:** Multilingual enterprise search, with a reranker (M18) from the same vendor.
- **Check here:** https://docs.cohere.com/docs/cohere-embed

**Qwen3 Embedding (open)**
- **Maker:** Alibaba (Qwen team)
- **Current lineup:** Qwen3-Embedding 0.6B, 4B, 8B, with matching rerankers · Qwen3-VL-Embedding-8B
  (text, images, screenshots, video).
- **Open or closed:** Open weights, **Apache 2.0** for the Qwen3 Embedding series.
- **Context window / output cap:** 32K. Vector size up to 1024, 2560 and 4096 by model size.
- **Known for:** Self-hosted retrieval with no per-call cost, 100+ languages, and instruction-aware
  embeddings.
- **Worth knowing:** The maker's MTEB rank dates from June 2025. Your own recall@k is what counts.
- **Check here:** https://github.com/QwenLM/Qwen3-Embedding

---

Read this appendix as a map, not a verdict. It tells you who makes what, which tiers exist, what the
license allows and where the official page lives. It does not tell you which model is best for your
task, because only your M12 test set, run on your prompts, can say that. Before you rely on any line
here, open the **Check here** page and re-check five things, then write the date beside each on your
own card: the exact model ID and whether it is preview or generally available · the retirement or
deprecation date · the context window and output cap · the price, including any long-context or
introductory-pricing rule · for open weights, the license file itself, including clauses that only
apply above a revenue or user threshold and any regional exclusion. If any of the five has changed, your
card is out of date, and so is this page.
`},{id:`the-honest-limit`,title:`The honest limit`,part:`The honest limit`,markdown:`Every real program has one. Here is this one’s, stated plainly so you meet it on purpose rather than in
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
`},{id:`currency`,title:`Currency`,part:`The honest limit`,markdown:`**Where the currency risk actually lives.** The model module is the obvious place, and it is the least of
it. **Five modules carry a standing check-this-is-still-true warning on their own page**, and two of them
are in layers this document calls "fundamentals":

- **M6** (model IDs, parameters, pricing, \`stop_reason\` enum, caching TTLs) — monthly cadence
- **M5** (Supabase connection endpoints, key naming migration) — **a platform claim wearing fundamentals
  clothing; it moves at platform speed**
- **M11** (embedding output dimensionality against the pgvector ceilings) — version-pinned
- **M18** (pgvector index behavior, dimension ceilings, \`iterative_scan\` defaults) — version-pinned
- **M19** (the MCP spec revision, which you look up rather than take from a page) — breaking changes
  inside this curriculum’s own calendar

**M22 carries the same warning as a note** rather than a currency flag, for the Next.js caching direction
and the AI frontend library’s wire format. Everything in M3, M4, M14, M15, M17 is durable. Verify the
flagged modules against **primary sources** the week you build each one — not this document, not a blog
post, not a model’s memory.

**And the honest limit:** this document is a static artifact about a field that moves. Track 8’s monthly
re-plan is the only mechanism it has for noticing it has gone stale. That is thin. The real defense is the
habit the curriculum is actually teaching — **measure it yourself, and trust the number over the claim.**
`}];export{e as LAUNCHPAD_DOC};