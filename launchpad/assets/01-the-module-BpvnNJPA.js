var e=`---
id: m15-the-module
title: "Git, Review, and Code Other People Maintain — what to understand and what to build"
minutes: 2
covers:
  - "The git object model: commits are snapshots, refs are pointers, the index is a third thing"
  - "What merge, rebase and squash do to the graph"
  - "Resolving a conflict — including one that merges cleanly and is still wrong"
  - "reflog, revert vs reset, shared-branch etiquette"
  - "Atomic commits and a PR a reviewer can act on"
  - "Giving and receiving review, including of AI-written code"
  - "Naming, module boundaries, cohesion and coupling, dependency direction"
  - "The rule of three; deleting code; actionable error messages"
  - "The three async artifacts — and you produce them yourself: twenty daily-shaped written updates posted publicly in the issue thread across the four weeks around your first submitted PR (what I did, what I am doing next, where I am stuck, what I currently believe), one real blocker escalation, one decision record against real friction. You train a monthly rhythm for the whole program then join a team running a daily one; a team that reads autonomy from your silence will read you as stuck"
---
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

**Artifact** \`EVIDENCE\` — five pieces to a real reviewer: a recovery-lab log of six deliberate
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
`;export{e as default};