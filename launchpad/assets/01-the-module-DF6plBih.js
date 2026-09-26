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
[[autocomplete off|autocomplete]]; one [[recorded mock|mock-interview]] — a first practice interview so the first real one is not the first
rehearsal. The remaining 28h lands in the eight weeks before your first real interview.

> **The assisted round leads; the un-assisted round is the floor.** M16 already names the purity play
> as a *scored failure*: some interviews score the transcript of how you drive an assistant, and how you
> drive is itself the test. Keep the autocomplete-disabled round as a floor — thinking out loud under a
> clock with nothing helping.

**Core concepts:** The un-assisted round: thinking out loud under a clock. Reading and debugging an
unfamiliar multi-file codebase from a failing test. Being scored on how you drive an assistant, because
the transcript gets read. Shipping [[a scoped PR|pull-request]] into a foreign repo and defending the ship/no-ship call.
[[Mid-level system design|system-design]] in 45 minutes. [[The behavioral round|behavioral-round]], which is weighted harder when there are no
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
> rewritten, and a revert that produces a [[merge conflict|merge-conflict]] instead of a red test is a different exercise.
> **Find five fresh ones the week you start**, and for each of the ones you use, check out the parent and
> confirm the suite is green there before you revert anything. You still never read the fix commits.

**The narrated-problem log — twenty-four problems — lives in Track 9’s weekly slot**, not as extra hours
here.

**Plus ~8h of behavioral rehearsal against M0’s incident log.** You will not have twenty stories with
other people in them by now, and it does not matter: you will have **a handful of real ones with another
person in them** — a review that rejected a boundary, a maintainer who rewrote your approach, an estimate
that blew up, a [[game-day partner|game-day]] who could not follow your [[runbook|runbook]] — and a much larger number about your
own system. Both are usable. **Know which is which, and lead with the first kind**, because the round
that matters most is the one asking how you work with people.

::: context autocomplete Coding with the helper switched off
Modern editors suggest whole lines of code as you type, powered by AI tools such as GitHub Copilot. It is a huge help day to day, and it also hides how much you can produce on your own.

Many interviews still include at least one round without it, sometimes in a plain shared editor. Practising with it off is the only way to know how you will do when it is gone.
:::

::: context mock-interview A practice run with a real person
A mock interview is a rehearsal that copies a real one: a timer, an unseen problem, and someone playing the interviewer who asks follow-up questions and pushes back.

Recording it lets you watch yourself afterwards. Most people discover habits they never noticed, like going silent for minutes or starting to type before understanding the question.
:::

::: context pull-request Proposing a change to someone else’s code
A pull request (PR) is how you propose a change on GitHub and similar sites: you put your change on a separate branch and ask the project to "pull" it into the main code. Reviewers comment line by line, and a maintainer decides whether to merge it.

"Scoped" means small and focused on one thing. A small PR gets reviewed quickly; a sprawling one tends to sit unread.
:::

::: context system-design Designing a whole system out loud
In a system design interview you are given a broad prompt, such as "design a link shortener" or "design a chat app's message history", and 45 to 60 minutes to sketch how you would build it: the main components, the data, how it handles growth and failure, and the trade-offs.

There is no single right answer. At mid-level, interviewers look for clear questions up front, sensible choices, and honest reasoning about what could break.
:::

::: context behavioral-round The interview about how you work
The behavioral round asks about your past conduct: "tell me about a disagreement with a teammate", "a time you missed a deadline", "a mistake you made". It tests how you work with people, handle pressure and learn.

Strong answers are specific, true, and show what **you** did, often told in the Situation–Task–Action–Result (STAR) shape. With no former employer to call for references, this round carries extra weight.
:::

::: context merge-conflict When git cannot combine two changes
A merge conflict happens when two changes touch the same lines of a file and git cannot tell which to keep. It stops and marks the clash so a person can decide.

In this exercise that is a problem: you wanted undoing an old fix to produce a clean failing test, and a conflict means the surrounding code has changed so much that the setup no longer works.
:::

::: context game-day Breaking things on purpose, to practise
A game day is a planned exercise where a team deliberately causes a failure, such as killing a server or cutting off the database, to rehearse its response while everyone is calm and ready.

It shows whether alerts fire, whether the runbooks make sense to someone else, and how long recovery really takes. Doing one with a partner gives you a true story about working with another person under pressure.
:::

::: context runbook Step-by-step instructions for trouble
A runbook is a written, step-by-step guide for handling a known situation: "the queue is backing up: check this dashboard, run this command, if that fails, do this".

It is written for the person on call at 3am who did not build the system. If someone else could not follow yours, that is a useful finding, and a good interview story.
:::
`;export{e as default};