<!-- Context notes for M39/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[gets a 403|http-401-403]] 1
[[negotiated revision|negotiated-revision]] 1
[[every tool definition is input tokens|tool-definition-tokens]] 1

::: context http-401-403 Two different refusals
**401 Unauthorized** means the server does not accept who you are: the token is missing, expired, or, as here, minted for a different resource. The fix is to get a valid token.

**403 Forbidden** means the token is valid but does not allow this action. With OAuth, the server can say which scope is missing (the standard error code is `insufficient_scope`), so a well-built client can ask the user to grant it and retry. Answering both cases with the same code leaves the client unable to tell "log in again" from "ask for more permission".
:::

::: context negotiated-revision Which version the two sides actually spoke
A client and a server may each support several revisions of the protocol. When they connect, they settle on one both understand, and that is the revision actually in use, which may be older than the newest one your server supports.

Behavior differs between revisions, so a bug that only one client shows is often a revision difference. Recording each client's negotiated revision is what lets you explain it, and lets a reader of your README know what "works with this client" really covered.
:::

::: context tool-definition-tokens Tool lists cost tokens every turn
The model has no memory of your tools between requests. Every call sends each tool's name, description and input schema again as part of the input, so they are billed on every turn just like the conversation.

Twenty tools at a few hundred tokens each adds thousands of tokens per turn before the user has said anything. And because prompt caching only reuses an exactly identical beginning, a tool list that comes back in a different order each time turns every request into a full-price cache miss. Sort the list.
:::
