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
**Core concepts:** The agent loop at the [[wire-format level|wire-format]], no framework. **Writing a tool definition a
model can actually use.** Reactive loop vs plan-then-execute, and when a second agent is overkill. State,
memory and durability across steps — **durable state on M8’s queue.** Append-only thinking-block
replay. **Context management across a long run: [[compaction|compaction]]**, which summarizes what came before, and
**context editing**, which clears old tool results or thinking blocks outright — what each is for, and
when each is the wrong answer. Failure taxonomy and validation between steps. Loop detection and cost
runaway prevention.
[[Human-in-the-loop|human-in-the-loop]] checkpoints for irreversible actions. **Containment as an enforced execution
boundary, not a permission table.** [[MCP|mcp]] — pin the spec revision. Trajectory tracing and silent-failure
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
not enough; you must also bound **[[blast radius|blast-radius]].** Every tool executes behind one *enforced* boundary: a
container or hosted sandbox for anything code-shaped, **a domain allowlist** for anything network-shaped,
a path prefix for anything filesystem-shaped, plus per-tool timeout and memory caps. **Assert on the
policy, not on the response:** show the allowlist refusing the request *before a socket opens*, with the
denial in your own logs. Then, separately, point a tool at \`169.254.169.254\` **and at an [[RFC1918 address|rfc1918]]
on your own network** as regression cases — and note in writing that **a refusal there may be the
platform rather than you.** [[A cloud metadata service|metadata-service]] usually refuses a bare request on its own account,
and a serverless host may have nothing at that address at all, so **a green result there proves nothing
about your egress policy by itself.**

> Your agent is the one place in the whole system where an attacker-controlled string reaches an
> outbound fetch. M21 teaches [[SSRF|ssrf]] by exploiting it — **one of M21’s five exploits runs through this
> agent’s own fetch tool.**

::: context wire-format The raw messages, with nothing in between
The "wire format" is the exact data that travels over the network: here, the JSON your code sends to the model's API and the JSON that comes back. Frameworks such as LangChain wrap that in friendlier functions, which hides what is really being sent.

Working at the wire level first means that when something breaks later, you can read the actual request and see the problem, instead of guessing what the framework did for you.
:::

::: context compaction When the conversation outgrows the window
A model can only read a limited amount of text per request, its **context window**, measured in tokens. A long agent run (many tool calls, many results) eventually fills it, and cost rises with every token you resend.

**Compaction** replaces the older part of the conversation with a written summary, like handing a colleague your notes instead of the whole meeting recording. It saves space, but details the summary left out are gone for good, which is why it is sometimes the wrong answer.
:::

::: context human-in-the-loop A person approves before it happens
Human-in-the-loop means the system pauses and asks a person to approve before a certain step runs. It is reserved for actions that cannot be undone: sending an email, paying money, deleting records, deploying code.

Reading a file can be retried freely; a sent email cannot be unsent. Your coding assistant asking "run this command?" before touching your machine is the same idea.
:::

::: context mcp The Model Context Protocol
MCP, the **Model Context Protocol**, is an open standard Anthropic introduced in late 2024 for connecting AI applications to tools and data. A service writes one MCP server (say, for its calendar or its database) and any MCP-aware app can use it, instead of every app writing its own custom integration.

Think of it like a USB port for AI tools: one agreed-upon plug shape. Because the standard is still evolving, which version you built against matters.
:::

::: context blast-radius How much can one mistake break?
Blast radius is how much damage one failure can do before something stops it. A bug that can only touch one user's draft has a small blast radius; a leaked admin key that can reach every database has a huge one.

For an agent, the question is: if the model is tricked into doing the worst thing its tools allow, what is the worst case? Containment means that worst case is limited by hard walls (a sandbox, an allowlist of domains it may call, a folder it cannot leave), not by the model choosing to behave.
:::

::: context rfc1918 Private network addresses
RFC 1918 is the internet standard that set aside three blocks of IP addresses for private networks: those starting with \`10.\`, \`172.16.\` to \`172.31.\`, and \`192.168.\`. Your home router almost certainly hands out \`192.168.\` addresses.

These addresses are unreachable from the public internet, so the services living on them (databases, admin panels) often have weak or no passwords. An agent that fetches any URL it is given could be steered to one of them from inside.
:::

::: context metadata-service The cloud server that tells a machine who it is
Cloud providers run a special address, \`169.254.169.254\`, that any virtual machine can reach to learn about itself, including, on many setups, **temporary credentials** for the cloud account. That makes it the classic target when attackers get a server to fetch a URL for them.

Newer versions guard it: AWS's IMDSv2 requires first requesting a session token, and Google Cloud requires a special header. So a refused request there may be the cloud's protection, not your code's.
:::

::: context ssrf Server-side request forgery
SSRF happens when an attacker gets **your server** to make a web request on their behalf. Your server sits inside your network, so it can reach places the attacker cannot.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" font-family="Inter, Arial, sans-serif">
  <rect x="10" y="50" width="80" height="40" rx="6" fill="#fff" stroke="#b4232c" stroke-width="2"/>
  <text x="50" y="74" font-size="12" text-anchor="middle" fill="#b4232c">attacker</text>
  <rect x="120" y="10" width="230" height="130" rx="8" fill="#fff" stroke="#6c7a93" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="235" y="28" font-size="11" text-anchor="middle" fill="#6c7a93">your network</text>
  <rect x="140" y="50" width="80" height="40" rx="6" fill="#8fb8f0" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="180" y="74" font-size="12" text-anchor="middle" fill="#1f2a44">agent</text>
  <rect x="250" y="42" width="90" height="24" rx="4" fill="#f2b880" stroke="#1f2a44"/>
  <text x="295" y="58" font-size="11" text-anchor="middle" fill="#1f2a44">metadata</text>
  <rect x="250" y="78" width="90" height="24" rx="4" fill="#f2b880" stroke="#1f2a44"/>
  <text x="295" y="94" font-size="11" text-anchor="middle" fill="#1f2a44">private DB</text>
  <line x1="90" y1="70" x2="136" y2="70" stroke="#b4232c" stroke-width="2"/>
  <polygon points="140,70 130,65 130,75" fill="#b4232c"/>
  <line x1="220" y1="66" x2="246" y2="56" stroke="#b4232c" stroke-width="2"/>
  <line x1="220" y1="74" x2="246" y2="88" stroke="#b4232c" stroke-width="2"/>
  <text x="235" y="128" font-size="11" text-anchor="middle" fill="#1f2a44">"summarise http://10.0.0.5/admin"</text>
</svg>
\`\`\`

An agent with a fetch tool is a ready-made SSRF machine: a malicious web page or document only has to ask it to fetch an internal address. The fix is a network boundary the agent cannot talk its way past.
:::
`;export{e as default};