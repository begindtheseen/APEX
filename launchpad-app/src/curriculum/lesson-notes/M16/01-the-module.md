<!-- Context notes for M16/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[agent config|agent-config]] 2
[[Decomposing a ticket|ticket]] 2
[[Sandboxing and permission scope|sandboxing]] 2
[[Spec-driven development|spec-driven]] 2
[[pre-commit hook|pre-commit-hook]] 1
[[timebox|timebox]] 1
[[n=1|n-equals-one]] 1

::: context agent-config What an agent config file is
Coding agents read a plain-text instructions file kept in the repository — `CLAUDE.md` for Claude Code, `AGENTS.md` for several other tools. It says how to run the tests, which conventions the team follows, and what not to touch. A good one means the agent's first attempt already looks like the team's code, instead of you correcting the same things every time.
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
Git can run a script of your choosing automatically every time someone tries to commit. If the script fails, the commit is refused. Teams use **pre-commit hooks** to run formatters and quick checks; here it enforces your delegation policy — for example, blocking an agent's change to authentication code. A person can skip hooks deliberately with `--no-verify`, so a hook is a guard rail, not a lock.
:::

::: context timebox What a timebox is
A **timebox** is a fixed amount of time set in advance — "this feature gets six hours." When the time is up, you stop and look at where you are, rather than quietly extending it. It keeps comparisons honest: the agent-built and hand-built features get the same budget, so the difference shows up in what got done.
:::

::: context n-equals-one Why n=1 is an anecdote
**n** is the number of cases you measured. With one pair of features, you cannot tell whether the agent-built one went faster because of the agent, because it was an easier feature, or because you had just learned something from the other. More pairs, and reporting the spread instead of a single number, is what turns a story into evidence.
:::
