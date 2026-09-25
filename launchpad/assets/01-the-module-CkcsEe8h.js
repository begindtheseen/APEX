var e=`---
id: m0-the-module
title: "The Contract Page — what to understand and what to build"
minutes: 10
covers:
  - "Runway: how many months you can go without a paycheck. It sets the deadline. The topic list never did."
  - "The second number in the runway calculation is the one nobody writes down: what this program costs to run. Model spend across M2, M6, M12, M18 and M19, hosting, a paid tier where a module needs one, and any money going to review or mock interviews. Estimate it, subtract it from the runway, and correct it every month. A plan that budgets 1,114 hours and zero dollars is the same error as one that budgets the modules and forgets the tracks."
  - 'The application date is a target you choose now from your runway, and it does not move because a module is late. M10 is the readiness condition, not the date: if M10 has not passed when the target arrives, you apply with what you have and write down what you are applying without. One definition, everywhere — because M27 has to fire a month before it and its gate has to be booked, which is impossible against a date that means "whenever M10 happens."'
  - "Before your application date you build; after it you keep building while you apply. The date decides what has to exist first, and that is most of the plan — and it also decides your pace. Track 1 and Track 9 both start on that date and Track 2 reaches full cadence near it, so track load goes from about 2.3 hours a week to about 8 and module progress drops from roughly sixteen hours a week to ten. Plan the second half at the lower rate rather than discovering it two months in and reading it as falling behind."
  - "Why finishing a tutorial feels like learning and is not: it reads smoothly, so it feels understood; you recognize the answer when it is shown, but cannot produce it; you would swear you could explain it, until you try out loud."
  - "A bad week is planned for, not recovered from. Decide now what one costs and what the week after looks like, so a missed week is a line in the plan rather than a broken streak."
---
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

**The artifact** \`LAB\` — one page, called \`PLAN.md\`, that you can read out loud. It contains:

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
called \`INCIDENTS.md\` with **one line every time something goes wrong** from here on: the reviewer
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
  *re-read your own last \`DELTA.md\`, then do the bad-week minimum twice before resuming normal hours.*
`;export{e as default};