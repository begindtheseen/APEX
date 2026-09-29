<!-- Context notes for M35/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[optional server-held state|server-state]] 2
[[subsets of JSON Schema|json-schema]] 2
[[switching is a base URL|base-url]] 1
[[hoisted and concatenated|hoisted]] 1
[[signed thinking blocks|signed-thinking]] 1
[[an overload|overload]] 1
[[discriminated union|discriminated-union]] 1
[[non-inferiority margin|non-inferiority]] 2

::: context server-state The provider remembers the conversation
With a stateless API you resend the whole conversation on every request, as the flagship has done since M6. With server-held state, the provider stores the conversation and you send only the new message plus an id pointing at the previous turn.

Requests get smaller, but the history now lives on someone else's servers for as long as their retention rules say, and a conversation stored at one provider cannot be continued at another. For failover, your own copy of the history stays the source of truth.
:::

::: context json-schema One standard, three partial readings
JSON Schema is a standard way to describe what a JSON value must look like: which fields exist, their types, which are required, which values are allowed. Providers use it to constrain structured output, but each supports only part of it, and the parts differ. One may reject a keyword such as a string pattern or a numeric minimum; another may insist that every field be listed as required, or that objects forbid extra properties.

So one schema can pass on one provider and return a 400 on another. Keep one source schema and test what each accepts.
:::

::: context base-url The address your SDK sends to
The base URL is the start of every request address a client sends: the provider's API host plus a version path. OpenAI's SDKs let you change it, and several other providers accept requests in OpenAI's format at their own base URL.

So in a demo, pointing the same code at another provider really is a one-line change. The lesson's point is what that one line hides: fields the other side does not implement are quietly dropped.
:::

::: context hoisted Moved to the top and glued together
Some APIs allow system messages anywhere in the conversation; others accept exactly one system prompt, in its own field. A compatibility layer bridging the two "hoists" each system message out of its place and "concatenates" them, joining them into one block at the top.

An instruction you placed late in the conversation, meant to apply from that point on, now sits at the start with everything else, and no error tells you its position changed.
:::

::: context signed-thinking Reasoning you return but may not edit
Reasoning models can hand back a record of their thinking that you must send back unchanged on the next turn, so the model can pick up where it left off, especially across tool calls. Providers protect it: the content may be encrypted or summarized, and a cryptographic signature lets the provider detect any edit.

Only the provider that issued it can check it, so it means nothing to another provider. When a conversation moves, you strip it and the new model starts its reasoning fresh.
:::

::: context overload The provider is out of capacity
An overload error means the provider is temporarily short of capacity for that model: your request was fine, and you did not hit your own rate limit. It usually arrives as a 5xx status; Anthropic uses its own code, 529, for it.

Retrying after a short wait often works, but during a real capacity crunch many clients retry at once. That makes it the classic case for failing over to another admitted provider rather than hammering the same one.
:::

::: context discriminated-union One type, several tagged shapes
A discriminated union is a TypeScript type made of several object shapes that share one field, the tag, whose value says which shape you have: `{ type: 'text', text }`, `{ type: 'tool_call', name, args }`, `{ type: 'finish', reason }`. A `switch` on `type` lets the compiler narrow to the right shape and flag a case you forgot.

Here it is the single event type all three adapters emit, so the rest of the app never sees any provider's own format.
:::

::: context non-inferiority Not worse by more than a set amount
You are not trying to prove a routing entry beats the primary, only that it is not meaningfully worse. Before running anything, write down a margin, say 3 points of pass rate. The entry is admitted only if the whole bootstrap interval of its paired difference sits above minus that margin.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" font-family="Inter, Arial, sans-serif">
  <line x1="60" y1="120" x2="330" y2="120" stroke="#1f2a44" stroke-width="1.5"/>
  <line x1="240" y1="20" x2="240" y2="120" stroke="#1f2a44" stroke-width="1.5"/>
  <line x1="150" y1="20" x2="150" y2="120" stroke="#b4232c" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="240" y="137" font-size="11" text-anchor="middle" fill="#1f2a44">0</text>
  <text x="150" y="137" font-size="11" text-anchor="middle" fill="#b4232c">minus margin</text>
  <line x1="180" y1="50" x2="270" y2="50" stroke="#1d6fd1" stroke-width="4"/>
  <circle cx="225" cy="50" r="5" fill="#1d6fd1"/>
  <text x="275" y="42" font-size="11" fill="#1d6fd1">A: admitted</text>
  <line x1="90" y1="90" x2="240" y2="90" stroke="#b4232c" stroke-width="4"/>
  <circle cx="165" cy="90" r="5" fill="#b4232c"/>
  <text x="248" y="94" font-size="11" fill="#b4232c">B: rejected</text>
  <text x="195" y="14" font-size="11" text-anchor="middle" fill="#1f2a44">paired difference vs primary, with interval</text>
</svg>
```

Entry B's best guess is only a little worse, but its interval reaches past the margin, so it stays out. Writing the margin first stops you choosing one after seeing the numbers.
:::
