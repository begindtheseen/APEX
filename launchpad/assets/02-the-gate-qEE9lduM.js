var e=`---
id: m19-the-gate
title: "Agents and Tool Use — the gate, and what most people miss"
minutes: 1
covers:
  - "The agent loop at the wire-format level, no framework"
  - "Writing a tool definition a model can actually use"
  - "Reactive loop vs plan-then-execute; when a second agent is overkill"
  - "State, memory and durability across steps"
  - "Append-only thinking-block replay"
  - "Failure taxonomy and validation between steps"
  - "Loop detection and cost runaway prevention"
  - "Human-in-the-loop checkpoints for irreversible actions"
  - "Containment as an enforced execution boundary, not a permission table — and asserted on the policy, not on whether the remote address happened to answer"
  - "Context management across a long run: compaction, which summarizes what came before, and context editing, which clears old tool results or thinking blocks outright. What each is for, and when each is the wrong answer. Resending the whole conversation unchanged every turn is one shape, not the only one"
  - "The budget the model can see: a server-side task budget paces the model toward finishing, where max_tokens cuts it off mid-thought. Know what your own governor catches that it does not"
  - "MCP — pin the spec revision"
  - "Trajectory tracing and silent-failure detection"
---
**GATE** — **REFEREE:** your reviewer, sending a kill signal at a random point, plus **200 adversarial
inputs from a second agent with a red-team brief and no knowledge of your governor**, with the spend
assertion living in the test suite. **PASS:** resume correctly after a mid-run kill; replay a failed
trajectory and name the causing step; the cost ceiling holds across all 200; **the allowlist denial is
in your logs for the blocked host, and the metadata and RFC1918 private-network regression cases
both refused.** Plus: report your agent eval set’s step-level and outcome-level
scores. **ON FAIL:** the governor caps iterations but not spend — fix and re-run.

> Fuzz the ceiling, don’t demo it. A demonstration you designed proves you can construct a passing case.

**Most-missed:** Treating the message array as a chat log of strings — dropping \`tool_use\` blocks,
producing an agent that re-calls the same tool forever. · Tool descriptions written as API documentation
instead of decision-support for a model choosing among eight tools. · Error paths returning the raw text of an
exception (the error object code throws), which teaches nothing and causes retry of the identical failing
call. · Adding agents to solve what
is actually a bad tool definition or a context problem. · Saving state (persisting) *after* the step
instead of around the side effect (the change the step makes in the world, such as an email sent), which
makes resume a duplicate-execution machine. · Capping iteration count
only — an agent alternating between two tools never repeats at lag-1. · Denying an action by silently
dropping the tool call, leaving a dangling \`tool_use\` with no result.
`;export{e as default};