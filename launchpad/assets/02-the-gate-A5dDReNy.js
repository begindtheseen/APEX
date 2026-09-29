var e=`---
id: m39-the-gate
title: "MCP and the Agent Platform — the gate, and what most people miss"
minutes: 2
covers:
  - "The three server primitives and who controls each: tools (the model calls them), resources (the application attaches them), prompts (the user picks them). Read-only data behind a tool hands the model a decision it did not need"
  - "Transports: stdio, a subprocess the client launches that takes credentials from its environment, and Streamable HTTP, one endpoint where every message is a POST and replies come back as JSON or a request-scoped stream. The older HTTP+SSE transport is deprecated"
  - "Versioning: dated revisions, a version carried or negotiated on every exchange, a published deprecation policy, and clients that lag the spec by months. Record the revision each client actually speaks"
  - "Your remote server is an OAuth resource server, never the authorization server. It publishes Protected Resource Metadata, answers a missing token with a 401 that points at it, and checks audience and scope on every request"
  - "Token passthrough is forbidden: when your server calls an upstream API it uses a separate token issued for that API, never the one the client sent"
  - "Client registration: pre-registered clients, Client ID Metadata Documents (the client id is a URL to a JSON description of the client), and the older, now deprecated Dynamic Client Registration"
  - "The clients that consume MCP (desktop assistants, coding agents, IDEs, provider APIs that call remote servers directly) each implement a different slice of the spec. One client passing is not interoperability"
  - "Agent SDKs from the major providers: what their hooks buy (a deny before the tool runs, traces you did not write) and what they hide (retries, compaction, text added to your prompt). Measure them on M12, price them with M20"
  - "Sub-agents and skills as context-management tools: a sub-agent is a fresh context that multiplies cost and can carry an injection back as its summary; a skill is instructions and scripts loaded by description, to be treated like a dependency"
  - "Computer-use and browser agents: screenshots in, clicks out. Disposable VM or container, network allowlist, no real credentials, approval before anything consequential"
  - "Coding agents as a platform: headless modes, hooks, plugins and MCP support. A product built on one inherits its permission model"
  - "The security surface: tool poisoning, rug pulls and shadowing through tool definitions; prompt injection through tool results; confused-deputy authorization; over-broad scopes. Every fix is code or configuration, never a sentence to the model"
---
**GATE** — **REFEREE:** your reviewer, connecting from their own machine with an MCP client of their
choosing that you have not configured or tested, then re-running your red-team suite from a clean
checkout. **PASS:** the reviewer's client completes OAuth and runs one read tool against the deployed
server; a token minted for a different resource is refused with a 401, and a read-scoped token calling a
write tool [[gets a 403|http-401-403]] naming the scope it lacks; the irreversible write pauses at the approval gate in
both SDK builds; all 30 red-team cases pass in CI, and every landed one shows a fix in code rather than in
a prompt; the README names the spec revision, every SDK version and each client's [[negotiated revision|negotiated-revision]],
with the date you checked them. **ON FAIL:** the server accepted a token that was not minted for it, or a
fix is a sentence in a prompt. Move the check into code and re-run all 30.

**Most-missed:** Writing your own authorization server. · Verifying the signature and skipping the
audience, so a token the user gave another app works on yours. · Forwarding the client's token to an
upstream API. · One scope for everything, so every read token can delete. · Approving a server once and
never re-reading its tool list. · Returning rows a user can write as tool output in the same run as a tool
that can send data out. · Testing with one client and calling the server interoperable; the second client
is where the revision mismatch shows. · Following a tutorial with an initialize handshake or a session
header without checking which revision it targets. · An approval gate implemented as a line in the system
prompt. · Comparing two SDKs on one run each, which is the vibe table M12 exists to prevent. · Forgetting that [[every tool definition is input tokens|tool-definition-tokens]] on every turn, and that a tool list whose
order varies breaks the prompt cache (M6).

::: context http-401-403 Two different refusals
**401 Unauthorized** means the server does not accept who you are: the token is missing, expired, or, as here, minted for a different resource. The fix is to get a valid token.

**403 Forbidden** means the token is valid but does not allow this action. With OAuth, the server can say which scope is missing (the standard error code is \`insufficient_scope\`), so a well-built client can ask the user to grant it and retry. Answering both cases with the same code leaves the client unable to tell "log in again" from "ask for more permission".
:::

::: context negotiated-revision Which version the two sides actually spoke
A client and a server may each support several revisions of the protocol. When they connect, they settle on one both understand, and that is the revision actually in use, which may be older than the newest one your server supports.

Behavior differs between revisions, so a bug that only one client shows is often a revision difference. Recording each client's negotiated revision is what lets you explain it, and lets a reader of your README know what "works with this client" really covered.
:::

::: context tool-definition-tokens Tool lists cost tokens every turn
The model has no memory of your tools between requests. Every call sends each tool's name, description and input schema again as part of the input, so they are billed on every turn just like the conversation.

Twenty tools at a few hundred tokens each adds thousands of tokens per turn before the user has said anything. And because prompt caching only reuses an exactly identical beginning, a tool list that comes back in a different order each time turns every request into a full-price cache miss. Sort the list.
:::
`;export{e as default};