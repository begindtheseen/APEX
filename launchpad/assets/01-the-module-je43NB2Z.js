var e=`---
id: m30-the-module
title: "Interview Performance — what to understand and what to build"
minutes: 2
covers:
  - "The un-assisted round: thinking out loud under a clock"
  - "Reading and debugging an unfamiliar multi-file codebase from a failing test"
  - "Being scored on how you drive an assistant, because the transcript gets read"
  - "Shipping a scoped PR into a foreign repo and defending the ship/no-ship call"
  - "Mid-level system design in 45 minutes"
  - "The behavioral round, which is weighted harder when there are no references to call"
---
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

**Artifact** \`EVIDENCE\` — a recorded 10-minute flagship walkthrough in **decision-language, not
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
`;export{e as default};