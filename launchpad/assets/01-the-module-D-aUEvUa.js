var e=`---
id: m16-the-module
title: "Working with Coding Agents Professionally — what to understand and what to build"
minutes: 2
covers:
  - "Writing a repo’s agent config so generated code conforms to house conventions"
  - "Decomposing a ticket into agent-sized units with verifiable exit criteria"
  - "Reviewing a 400-line diff by reading test changes and boundaries first"
  - "What never to delegate: auth, money, migrations, anything unverifiable"
  - "Sandboxing and permission scope"
  - "Spec-driven development and the underspecified-spec log"
  - "What a run costs"
---
Treating agents exclusively as a threat — and never as the throughput standard of the team you are
joining — produces an engineer who is correctly suspicious and half as fast as everyone around them,
measured from week three. Scheduled **after** M14 and
M15 so the interrogate-never-author discipline stays in force during the period it protects.

**Core concepts:** Writing a repo’s [[agent config|agent-config]] so generated code conforms to house conventions.
[[Decomposing a ticket|ticket]] into agent-sized units with verifiable exit criteria. Reviewing a 400-line diff by
reading test changes and boundaries first. The categories never to delegate — auth, money, migrations,
anything unverifiable. [[Sandboxing and permission scope|sandboxing]]. [[Spec-driven development|spec-driven]] and the
underspecified-spec log. What a run costs.

**Checkpoints** ① the delegation policy written, and the [[pre-commit hook|pre-commit-hook]] that enforces it · ② three real
tickets handed to an assistant, with a defect log naming which module let you catch each one · ③ one
flagship feature shipped in a [[timebox|timebox]] with assistants, measured against one written by hand.

**Artifact** \`EVIDENCE\` — a **defect log** from handing an agent three real tickets in a repo you did
not write, naming for each defect *which earlier module let you catch it*; **a one-page delegation
policy, enforced by a pre-commit hook that has actually blocked an agent-authored change twice on real
work**; **a spec-driven slice** — write a specification with explicit acceptance criteria, have an agent
implement against it, and keep a log of every place the spec was underspecified and what the agent did
in the gap.

**And a throughput artifact.** The module’s own thesis is that being slow is the failure mode, and the
three artifacts above are all *defensive*. Ship **three small flagship features with agents and three by
hand, alternating** so the ordering and the learning do not all favor one side, with hours, review
findings and defects reaching production **reported as a spread and not only as two medians.** If you
only have time for one pair, that is fine — **report it as an anecdote with [[n=1|n-equals-one]] and say so out loud.**
Both are usable. **What is not usable is a single pair of features presented as a measurement**, which
is the vibe comparison table M12 exists to prevent.

> That produces a number you can say out loud, which is what the module’s thesis demands. The
> underspecified-spec log is the stronger interview object, though — it is direct evidence of the
> judgment an AI-assisted coding round is scoring.

::: context agent-config What an agent config file is
Coding agents read a plain-text instructions file kept in the repository — \`CLAUDE.md\` for Claude Code, \`AGENTS.md\` for several other tools. It says how to run the tests, which conventions the team follows, and what not to touch. A good one means the agent's first attempt already looks like the team's code, instead of you correcting the same things every time.
:::

::: context ticket What a ticket is
A **ticket** is one unit of work in a team's tracker — Jira, Linear or GitHub Issues — describing a bug to fix or a feature to build. Breaking a ticket into pieces small enough for an agent, each with a check that proves it is done, is much of the skill of working with agents well.
:::

::: context sandboxing Sandboxing an agent
A **sandbox** is a walled-off place to run something you do not fully trust, where it can only reach what it needs — a container with no production passwords, limited network access, nothing it can permanently break. **Permission scope** is the list of actions the agent may take on its own, such as editing files but asking before running commands or deleting anything.
:::

::: context spec-driven Specs and acceptance criteria
In **spec-driven development** you write the specification first, with **acceptance criteria**: concrete, checkable statements such as "if the reset link has expired, the page says so and offers to send a new one." The agent builds against those. Wherever the spec was vague, the agent had to guess — and logging those guesses shows exactly where your own thinking was unfinished.
:::

::: context pre-commit-hook What a pre-commit hook is
Git can run a script of your choosing automatically every time someone tries to commit. If the script fails, the commit is refused. Teams use **pre-commit hooks** to run formatters and quick checks; here it enforces your delegation policy — for example, blocking an agent's change to authentication code. A person can skip hooks deliberately with \`--no-verify\`, so a hook is a guard rail, not a lock.
:::

::: context timebox What a timebox is
A **timebox** is a fixed amount of time set in advance — "this feature gets six hours." When the time is up, you stop and look at where you are, rather than quietly extending it. It keeps comparisons honest: the agent-built and hand-built features get the same budget, so the difference shows up in what got done.
:::

::: context n-equals-one Why n=1 is an anecdote
**n** is the number of cases you measured. With one pair of features, you cannot tell whether the agent-built one went faster because of the agent, because it was an easier feature, or because you had just learned something from the other. More pairs, and reporting the spread instead of a single number, is what turns a story into evidence.
:::
`;export{e as default};