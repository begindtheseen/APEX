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

**Most-missed:** Practicing in your own IDE with autocomplete on and the assistant one tab away.
· Barreling into typing without clarifying — interviewers name this as a reject signal. · **Editing the
test to make it pass.** Usually the wrong move, and the interviewer is watching for it — *unless the test
encodes the wrong behavior*, which happens, and then changing it is the right call. **Say so out loud
before you touch it** and name what you believe the spec should be. Silently editing a test is the
failure; arguing that a test is wrong, with a reason, is often the thing being tested for. · Framing
projects around tool names. "What would you do
differently" is a test of honest depth; "nothing, it’s solid" scores worse than naming a real limitation.
· Gold-plating the take-home UI while shipping zero evaluation, which inverts the actual scoring.
`;export{e as default};