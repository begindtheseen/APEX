var e=`---
id: m17-the-module
title: "Scoping, Estimating, and Someone Else’s Priorities — what to understand and what to build"
minutes: 2
covers:
  - "Turning a vague request into clarifying questions"
  - "Decomposing into one-to-two-day independently shippable slices"
  - "Estimating, and naming the riskiest assumption"
  - "Renegotiating when the estimate is wrong"
  - "The open-ended quality ticket, run against a real OSS AI application you did not write, with prompts in-repo and no decision log — on your own system it tests measurement; on a stranger’s it tests measurement plus archaeology, which is the actual job"
  - "A capability-question protocol: cheap, expensive-and-uncertain, structurally impossible"
  - "Explaining a limit to a non-engineer who wants a guarantee"
---
The definitional mid-level skill, structurally invisible to a solo builder. When you build your own
ideas you are your own [[product manager|product-manager]]: scope is infinitely elastic, nothing is late, nothing is cut,
nobody is waiting. The failure mode is precise — a technically fine hire who disappears for nine days on
something that should have been two, delivers more than was asked, and reads as "not ramping." It is
what most "great, but not mid-level yet" feedback actually means.

**Core concepts:** Turning a vague request into clarifying questions. Decomposing into one-to-two-day
[[independently shippable slices|shippable-slice]]. Estimating, and naming the riskiest assumption. Renegotiating when the
estimate is wrong. The open-ended quality ticket. A capability-question protocol: cheap,
expensive-and-uncertain, structurally impossible. Explaining a limit to a non-engineer who wants a
guarantee.

**Checkpoints** ① the scoping doc for one real request: what is in, what is out, how it is cut · ② an
estimate written before the work and the actual time beside it · ③ one open-ended request delivered as a
plan with a number, not as an answer.

**Artifact** \`LAB\` — three scoping docs against real open issues (clarifying questions, slice
decomposition, estimate with named riskiest assumption, and an explicit "here is the 20% version if you
need it Thursday"). Then build one and log **actual vs estimate** with a [[post-mortem|post-mortem]] on where the
estimate broke.

**Plus the two that only exist in AI product work:**

**The open-ended quality ticket**, run against **a real [[OSS|oss]] AI application you did *not* write, with
prompts in-repo and [[no decision log|decision-log]]** — on your own system it tests measurement; on a stranger’s it tests
measurement plus archaeology, which is the actual job. *"The assistant is getting worse, find out why."*
These have no known-achievable endpoint and absorb three days or three months identically. Deliver a
**[[timeboxed plan|timebox]]**: the current measured number, a target, ranked interventions with **expected gain per
hour**, a hard checkpoint at 50% of the box with a written **stop-or-continue rule**, and an explicit
statement of what you report if the target is missed.

**The capability-question protocol** — the thing that separates the mid band from the one above it, and
the place M6’s structural-boundaries content finally gets cashed in as a *communication* skill. Three
buckets: cheap and near-certain · expensive and uncertain, needs a [[timeboxed spike|spike]] · **structurally
impossible.** Practice against the reviewer playing a PM **instructed to push for a yes.**

Then write one page: **a response to a product request that is not achievable as stated** — *"the
assistant should never cite something that isn’t in the document"* — naming why in plain language,
offering the achievable version **with a measured number from your own eval set**, and stating what the
residual failure rate means for the user.

> That page is also the best answer you will ever have to "[[tell me about a time you pushed back|behavioral-question]]."

::: context product-manager The person who decides what gets built
A product manager (PM) owns the *what* and the *why*: which problems the product solves, for whom, and in what order. Engineers own the *how*. The PM talks to customers, sets priorities and says what can wait.

On a team, requests usually reach you through a PM, loosely worded. Turning "make search better" into something you can finish and show by Friday is your half of that partnership.
:::

::: context shippable-slice A slice you could ship on its own
"Shipping" means putting working code in front of real users. A slice is **independently shippable** when it is useful and safe to release even if nothing after it ever gets built.

Say the request is "let users export their data". A shippable first slice: a CSV download of one table, behind a button. Not shippable: "build the export backend" with no button, which nobody can use. Small slices mean progress shows up daily, and a surprise costs one slice instead of the whole project.
:::

::: context post-mortem Looking back without blame
A post-mortem (also called a retrospective or incident review) is a short written look back after something finishes or goes wrong: what happened, why, and what you will do differently.

Good teams run them **blameless**: the question is "which step let this happen", not "whose fault was it". For an estimate, that means writing down where the time actually went, such as "the API needed an approval I did not know about", so your next estimate includes it.
:::

::: context oss Open-source software
OSS stands for **open-source software**: code published under a license that lets anyone read it, run it and change it. Linux, Python and PostgreSQL are all open source, and most of them live on GitHub.

For practice it is ideal: a real codebase written by strangers, with real open issues, that you can clone for free. Working in code you did not write, and cannot ask the author about, is what most of a working engineer's week looks like.
:::

::: context decision-log Why the code looks the way it does
A decision log is a running record of choices a team made and the reasons behind them: "we use model X because Y was too slow; revisit if prices drop". Some teams call each entry an ADR, an *architecture decision record*.

Without one, the only evidence left is the code and its commit history, so you dig through old commits and pull requests to reconstruct why a prompt says what it says. That digging is the "archaeology" the lesson means.
:::

::: context timebox Fixing the time, not the result
A timebox is a fixed amount of time you agree to spend before you stop and report, whatever state the work is in. "I will spend three days on this, and at the end you get what I found" is a timebox.

It turns an open question into a bounded cost. The manager knows the worst case up front, and you have a natural point to decide, with evidence, whether more time is worth it.
:::

::: context spike A short experiment to answer one question
In software, a spike is a small, throwaway piece of work done only to learn something, for example "can this model read our scanned PDFs well enough?", before anyone commits to building the real thing.

A spike is always timeboxed and ends with an answer, not a feature: yes, no, or "yes, but it costs this much". The code is often thrown away afterwards, and that is fine; the knowledge was the point.
:::

::: context behavioral-question The behavioral interview question
"Tell me about a time you…" is a **behavioral** interview question: it asks for a true story from your past, on the idea that past behavior predicts future behavior. Others in the family: a conflict with a teammate, a mistake you made, a deadline you missed.

A common way to answer is the **STAR method**: Situation, Task, Action, Result. A written page where you said no, explained why, and offered a measured alternative is a ready-made STAR story with a real number in the Result.
:::
`;export{e as default};