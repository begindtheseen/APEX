var e=`---
id: m30-the-gate
title: "Interview Performance — the gate, and what most people miss"
minutes: 1
covers:
  - "The un-assisted round: thinking out loud under a clock"
  - "Reading and debugging an unfamiliar multi-file codebase from a failing test"
  - "Being scored on how you drive an assistant, because the transcript gets read"
  - "Shipping a scoped PR into a foreign repo and defending the ship/no-ship call"
  - "Mid-level system design in 45 minutes"
  - "The behavioral round, which is weighted harder when there are no references to call"
---
**GATE** — **REFEREE:** three referees — your mock interviewer for the first two, your reviewer for the
third. **PASS (1):** solve an unseen problem out loud in about 30 minutes with autocomplete disabled.
**PASS (2):** drive an assistant through an unfamiliar bug **under observation**, narrating every point
where you *verified* rather than accepted. **PASS (3):** answer **three behavioral questions cold with
three different stories, none about a decision you made alone.** **ON FAIL:** watch the transcript back
and name where you delegated something you should have verified — that is the rep.

**Most-missed:** Practicing in your own [[IDE|ide]] with autocomplete on and the assistant one tab away.
· Barreling into typing without clarifying — interviewers name this as a reject signal. · **Editing the
test to make it pass.** Usually the wrong move, and the interviewer is watching for it — *unless the test
encodes the wrong behavior*, which happens, and then changing it is the right call. **Say so out loud
before you touch it** and name what you believe the spec should be. Silently editing a test is the
failure; arguing that a test is wrong, with a reason, is often the thing being tested for. · Framing
projects around tool names. "What would you do
differently" is a test of honest depth; "nothing, it’s solid" scores worse than naming a real limitation.
· [[Gold-plating|gold-plating]] the [[take-home|take-home]] UI while shipping zero evaluation, which inverts the actual scoring.

::: context ide Integrated development environment
An IDE (integrated development environment) is the program you write code in, bundling an editor, search, a debugger and a terminal. VS Code and the JetBrains editors are common examples.

Your own IDE is set up just how you like it. Interviews often happen in a bare shared editor, so practising only in your comfortable setup hides how you will perform without it.
:::

::: context gold-plating Polishing the parts nobody is grading
Gold-plating means adding polish or extra features beyond what the task needs. In a job it wastes time; in an interview it can be worse, because it signals that you did not work out what mattered.

For an AI take-home, the reviewers usually care most about whether you measured the output's quality. A beautiful interface with no evaluation gets the priorities backwards.
:::

::: context take-home An interview task you do at home
A take-home is an assignment you complete on your own time, often a small app or feature, with a suggested time limit of a few hours. You then submit the code and often discuss it in a later interview.

Reviewers read the code and your write-up. Clear notes on trade-offs and on what you would do with more time often count as much as the code itself.
:::
`;export{e as default};