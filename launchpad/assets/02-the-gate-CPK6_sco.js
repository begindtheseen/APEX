var e=`---
id: m15-the-gate
title: "Git, Review, and Code Other People Maintain — the gate, and what most people miss"
minutes: 1
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
**GATE** — **REFEREE:** a real maintainer’s review thread. **PASS:** **three review rounds completed,
every comment either addressed or argued in writing, zero structural comments on the final round.
Plus twenty consecutive working-day updates posted in public, and the reviewer can reconstruct your
month from the thread alone without asking you.** **ON FAIL:** the structural comments *are* the
curriculum — address and resubmit.

> The gate is not "merged," because that conditions your progress on **a stranger’s inbox.** Gate on
> what you control; track merges as a lagging metric.

**Most-missed:** Treating rebase as a cleaner merge. It is history rewriting: new SHAs, and anyone who
pulled is now diverged. · Resolving a conflict by picking a whole side without re-reading the function,
and never looking at the merge base. · Commits that map to time spent rather than units of change; mixing
a rename with a behavior change in one commit. · A PR description that says what the diff already says
instead of why, and omits how to verify it. · Silent compliance under a senior’s disagreement. That is
the exact behavior that reads as not-mid-level — and so is arguing every point. · Explaining in a call
what should have been a comment on the line. If it is not written on the PR it did not happen.
`;export{e as default};