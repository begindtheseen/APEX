var e=`---
id: m19-the-module
title: "Agents and Tool Use — what to understand and what to build"
minutes: 3
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
**Core concepts:** The agent loop at the wire-format level, no framework. **Writing a tool definition a
model can actually use.** Reactive loop vs plan-then-execute, and when a second agent is overkill. State,
memory and durability across steps — **durable state on M8’s queue.** Append-only thinking-block
replay. **Context management across a long run: compaction**, which summarizes what came before, and
**context editing**, which clears old tool results or thinking blocks outright — what each is for, and
when each is the wrong answer. Failure taxonomy and validation between steps. Loop detection and cost
runaway prevention.
Human-in-the-loop checkpoints for irreversible actions. **Containment as an enforced execution
boundary, not a permission table.** MCP — pin the spec revision. Trajectory tracing and silent-failure
detection.

> **Thinking-block replay — miss it and it silently breaks the loop.** Whatever you send back on the
> next turn, **you may not edit what you already sent**: rewriting earlier thinking or \`tool_use\` blocks
> breaks the model, so **the loop must be append-only.** The classic 2024 bug — appending the assistant’s
> text and dropping the \`tool_use\` blocks — is the exact predecessor of this one. **Resending the whole
> conversation unchanged every turn is one shape, not the only one:** compaction and context editing are
> the other two, and part of this module is knowing when each is the wrong answer.

> **MCP: pin the revision.** MCP is a versioned specification with dated revisions and breaking changes
> between them. **Look the current revision up the week you build, write it down, and be able to name one
> thing that changed in it.** Do not take a revision date from this page; the point of the exercise is
> that you checked. A tutorial that names no revision is showing you some past shape of the protocol.

**Checkpoints** ① one tool call, round-tripped by hand at the wire level · ② the loop: multi-step, with
\`tool_use\` and thinking blocks replayed append-only · ③ the budget governor and loop detection, holding
under a fuzzed input · ④ durable state: kill the process mid-run and resume correctly · ⑤ containment: a
blocked host and the metadata endpoint both refused · ⑥ trajectory evals scored by M12 graders,
step-level and outcome-level.

**Artifact** \`EVIDENCE\` — a hand-rolled agent loop with a hard-stopping budget governor, loop detection,
an approval gate on irreversible actions, durable state on M8’s queue, append-only thinking-block replay,
replayable trajectory traces **scored by M12’s graders**. **You write the governor yourself because that
is how you learn what it has to do; then compare it against the server-side task budget the provider
offers, and write up what each one catches and what each one misses.** Yours stops the run; theirs is a
ceiling the model can see, so it paces itself and finishes rather than being cut off. Plus the context
management above — compaction and context editing, and when each is wrong. Then one small MCP server
against a named spec revision. Then the same agent on the SDK’s tool runner, with a written comparison of what the hooks
bought and what they hid.

**Containment is an execution boundary, not a permission table.** Bounding cost and reversibility is
not enough; you must also bound **blast radius.** Every tool executes behind one *enforced* boundary: a
container or hosted sandbox for anything code-shaped, **a domain allowlist** for anything network-shaped,
a path prefix for anything filesystem-shaped, plus per-tool timeout and memory caps. **Assert on the
policy, not on the response:** show the allowlist refusing the request *before a socket opens*, with the
denial in your own logs. Then, separately, point a tool at \`169.254.169.254\` **and at an RFC1918 address
on your own network** as regression cases — and note in writing that **a refusal there may be the
platform rather than you.** A cloud metadata service usually refuses a bare request on its own account,
and a serverless host may have nothing at that address at all, so **a green result there proves nothing
about your egress policy by itself.**

> Your agent is the one place in the whole system where an attacker-controlled string reaches an
> outbound fetch. M21 teaches SSRF by exploiting it — **one of M21’s five exploits runs through this
> agent’s own fetch tool.**
`;export{e as default};