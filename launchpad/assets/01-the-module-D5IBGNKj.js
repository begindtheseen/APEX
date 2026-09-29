var e=`---
id: m0-the-module
title: "The Contract Page — what to understand and what to build"
minutes: 10
covers:
  - "Runway: how many months you can go without a paycheck. It sets the deadline. The topic list never did."
  - "The second number in the runway calculation is the one nobody writes down: what this program costs to run. Model spend across M2, M6, M12, M18 and M19, hosting, a paid tier where a module needs one, and any money going to review or mock interviews. Estimate it, subtract it from the runway, and correct it every month. A plan that budgets 1,364 hours and zero dollars is the same error as one that budgets the modules and forgets the tracks."
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
need code the reader has not written yet — a commit queue, a model-call log, a [[smoke test|smoke-test]] for tools not
yet installed — live in the module where that code exists, and are pointed to below. What is here is
the contract: the money, the hours, the date, the people, the rules. **No code.** You do not know how to
write any yet, and this page is what decides whether you will.

**What you need to understand.** [[Runway|runway]]: how many months you can go without a paycheck. It sets the
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
the running cost down as a number: [[model spend|model-spend]] (M2, M6 and M12 are steady; M18 and M19 are the expensive
ones, because they run a corpus and hundreds of adversarial inputs through a model), [[hosting|hosting]] for the
flagship once it is live, a paid tier anywhere a module needs one (a payment processor in test mode is
free, error tracking and a cloud account usually are not), and, if you are paying for review or mock
interviews, that too. Guess it now, correct it at every monthly re-plan, and treat the corrected number
as a claim on your runway, because it is one. **A program whose founding argument is that runway sets
the deadline cannot leave the outflow out of the arithmetic.** Then how many hours a week you can truly
give this, and the deadline those numbers force. The weekly hours are **derived**, not assumed: divide
the hours of the program by the weeks of your runway. If the answer is over 18 for the full program, take the
Compressed Spine and say so in writing; if it is over 18 for the Spine too, the plan is Spine plus a
contract role.

**2. The hour budget** — **1,364** module hours + **496** track hours = **1,860**, with the line-item
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
for and whether it is an **employee job or a contract job** ([[W-2 or 1099|w2-or-1099]]) — that is your own data
point, and M27 uses it. This lands in M0, not late, because **it determines which modules matter.**

**5. The Python trip-wire, as a number.** Count how many of the twenty ask for Python. *If eight or
more do, M24 and then M25 move to immediately after M12 and the hard gate.* Pre-write that alternate
ordering in one paragraph now, so the decision at the hard gate is a lookup rather than a redesign.

**6. The flagship specification** → *in M2.* You name and specify the app in the module that builds it.
What you decide here is the flagship’s traffic date: **a date in month four by which a dozen people you
found will have used it.** That is a weekend of asking, not a growth strategy. The target behind it is
**~100 [[logged traces|traces]] containing real failures** — that is what M12 actually consumes and what the hard
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

> **The cheapest reviewer is free and requires no network: an OSS maintainer reviewing a [[real PR|pull-request]].**
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
> Without it you arrive at the [[behavioral round|behavioral-round]] with 41 modules that were solo, self-scoped, and
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

::: context smoke-test Why it is called a smoke test
The name comes from hardware and plumbing: switch the new thing on, or blow smoke through the pipes, and see if smoke comes out where it should not. In software it means a quick, shallow check that the basics work at all — the tools start, the app loads, one request succeeds — before anyone spends time on detailed testing.
:::

::: context runway Where "runway" comes from
It is startup slang, borrowed from airports: the length of ground left before you must be in the air. The arithmetic is one division — money you have, divided by money you spend each month. With \\$24,000 saved and \\$3,000 a month going out, your runway is 8 months. Everything that makes the monthly number bigger makes the runway shorter, which is why this page counts the program's own costs too.
:::

::: context model-spend Paying for a model by the word
Apps that use an AI model usually call it over the internet through an API and pay for each call. The bill is counted in **tokens** — chunks of text, roughly three-quarters of an English word each on average — and priced per million tokens, with the model's reply usually costing more than your question. One test is fractions of a cent. A script that sends a thousand documents through a large model can cost real money in an afternoon.
:::

::: context hosting What "hosting" means
Your laptop sleeps, loses its connection and has no public address, so other people cannot reach an app running on it. Hosting is renting a computer in a data center that keeps your app running day and night at a web address. Services such as Vercel, Render, Fly.io or a big cloud like AWS all sell this; small projects often fit in a free tier, and the bill grows with traffic.
:::

::: context w2-or-1099 Employee or contractor
These are the US tax forms each kind of worker receives. A **W-2** employee has taxes taken out of every paycheck, and the employer pays half of Social Security and Medicare and usually offers benefits such as health insurance. A **1099** contractor is paid the full amount and handles the rest: quarterly estimated taxes, both halves of Social Security and Medicare (about 15.3%), and no benefits. The same hourly number is worth noticeably less on a 1099.
:::

::: context traces What a trace is
A trace is the full record of one request as it moved through your system: what the user typed, the exact prompt your code sent to the model, what came back, which tools were called, how long each step took and what it cost. Reading a hundred of them is how you find out how your app actually fails, instead of how you imagine it fails.
:::

::: context pull-request What a PR is
A **pull request** (PR) is how a change gets into a shared project. You make your change on your own copy, then ask the project's owners to "pull" it in. They read the difference line by line, leave comments, and either merge it or ask for changes. An **OSS maintainer** is someone with the right to merge into an open-source project — a stranger with no reason to go easy on you.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 110" font-family="Inter, Arial, sans-serif">
  <rect x="8" y="35" width="92" height="40" rx="8" fill="#ffffff" stroke="#1d6fd1" stroke-width="2"/>
  <text x="54" y="59" font-size="12" text-anchor="middle" fill="#1f2a44">your change</text>
  <rect x="134" y="35" width="92" height="40" rx="8" fill="#ffffff" stroke="#1f2a44" stroke-width="2"/>
  <text x="180" y="59" font-size="12" text-anchor="middle" fill="#1f2a44">review</text>
  <rect x="260" y="35" width="92" height="40" rx="8" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="306" y="59" font-size="12" text-anchor="middle" fill="#1f2a44">merged</text>
  <line x1="100" y1="55" x2="126" y2="55" stroke="#1f2a44" stroke-width="2"/>
  <polygon points="132,55 122,50 122,60" fill="#1f2a44"/>
  <line x1="226" y1="55" x2="252" y2="55" stroke="#1f2a44" stroke-width="2"/>
  <polygon points="258,55 248,50 248,60" fill="#1f2a44"/>
  <path d="M180 75 C180 100 54 100 54 80" fill="none" stroke="#b4232c" stroke-width="2"/>
  <polygon points="54,76 49,86 59,86" fill="#b4232c"/>
  <text x="117" y="106" font-size="11" text-anchor="middle" fill="#b4232c">changes requested</text>
  <text x="54" y="24" font-size="11" text-anchor="middle" fill="#6c7a93">opens the PR</text>
</svg>
\`\`\`
:::

::: context behavioral-round The behavioral interview
Most engineering interview loops include one round with no code. The interviewer asks "tell me about a time when…" — you disagreed with someone, missed a deadline, broke something in production — and listens for a real situation, what you did and what changed afterwards. Candidates are often coached to answer in that order (situation, task, action, result). Vague or invented stories fall apart at the first follow-up question, which is why a dated log of real incidents is worth so much.
:::
`;export{e as default};