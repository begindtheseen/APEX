<!-- Context notes for M17/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[product manager|product-manager]] 1
[[independently shippable slices|shippable-slice]] 2
[[post-mortem|post-mortem]] 1
[[OSS|oss]] 2
[[no decision log|decision-log]] 2
[[timeboxed plan|timebox]] 1
[[timeboxed spike|spike]] 1
[[tell me about a time you pushed back|behavioral-question]] 1

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
