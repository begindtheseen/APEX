var e=`---
id: m35-the-module
title: "One Feature, Three Providers — what to understand and what to build"
minutes: 9
covers:
  - "Three request shapes for one idea: a messages API, a responses-style API with optional server-held state, and a contents-and-parts API. Where each puts the system prompt, the tools and the conversation"
  - "Tool-calling formats: a call arrives as an object on two providers and as a JSON string you must parse on one, and each sends the result back in its own shape"
  - "Structured output on three schema dialects that accept different subsets of JSON Schema, so one schema can be a 400 on one provider and fine on another"
  - "Streaming event shapes: named events, typed semantic events, and whole partial responses per frame, and where usage and the stop signal sit in each"
  - "Prompt caching: breakpoints you place versus automatic prefix caching. Caches are provider- and model-scoped, so a failover is a cold cache"
  - "Reasoning controls that do not map onto each other by name; the mapping is a table measured with M12, not a rename"
  - "Error classes and rate limits: retry here, fail over, or stop because it is your bug. A 429 is not always retryable"
  - "Usage fields that share a word and not a meaning: cached and reasoning tokens sit inside the total on some providers and beside it on others. Normalize to explicit fields and reconcile against the provider's own totals"
  - "OpenAI-compatible endpoints and where compatibility silently stops: unsupported fields are mostly ignored with a 200, not rejected"
  - "Gateways and routers, and when a thin interface of your own is better: provider-native features, an owned streaming protocol, one fewer subprocessor holding user prompts"
  - "An interface that does not collapse to the lowest common denominator: capabilities declared as data, opaque provider state round-tripped untouched, a raw escape hatch on every event"
  - "Eval-gated routing: every routing entry, the failover target included, admitted only by the M12 test set against a non-inferiority margin written down first"
  - "Failover is a restart, not a splice: silent retry before the first token, a visible reset after it, no side effect re-run, both attempts priced"
---
The flagship has spoken one provider's dialect so far. M34 chose a model per maker on paper, from your own eval set; this module makes the same flagship
feature actually run on three frontier providers (Anthropic, OpenAI and Google) — **at the wire level
first, with raw \`fetch\` and M7's hand-written frame parser, then again with each official SDK** — behind
one interface you design. It pays off three ways: a failover path you have watched work, a written
record of every place the three disagree, and "how hard would it be to switch providers?" answered
with numbers. It assumes M7's parser and idempotency table, M19's
append-only loop, M9's record-replay client, M12's harness and M34's model choices.

**Core concepts:** **Three request shapes for one idea** — a messages API, a responses-style API with
[[optional server-held state|server-state]], and a contents-and-parts API — and where each puts the system prompt, the
tools and the conversation. **Tool-calling formats**: how a call arrives (an object on two, a JSON
*string* to parse on one) and how its result goes back. **Structured output** on three schema dialects
that accept different [[subsets of JSON Schema|json-schema]]. **Streaming event shapes**: named events, typed semantic
events, and whole partial responses per frame, and where usage and the stop signal sit in each.
**Prompt caching**: breakpoints you place versus automatic prefix caching, and why **a failover is a
cold cache**. **Reasoning controls** that do not map onto each other by name. **Error classes and rate
limits**: which failures are retry-here, which are fail-over, which are your bug. **Usage fields that
share a word and not a meaning.** OpenAI-compatible endpoints and where compatibility silently stops.
Gateways and routers, and when a thin interface of your own is better. **An interface that does not
collapse to the lowest common denominator.** **Eval-gated routing and failover.**

> **A common belief that is wrong: "they are all OpenAI-compatible now, so [[switching is a base URL|base-url]]."**
> Compatibility endpoints exist, and Anthropic's own documentation describes its layer as meant for
> testing and comparing models, not as a long-term production path. On that layer, at last check, the
> function-calling \`strict\` flag is ignored, \`response_format\` is ignored, prompt caching is unsupported,
> system messages are [[hoisted and concatenated|hoisted]], and **most unsupported fields are silently ignored rather
> than rejected.** Silence is the failure: an ignored field returns 200, so nothing in your logs says the
> schema you relied on was never enforced. Read every compatibility endpoint's limitations page, Google's
> included, and prove one ignored field with a fixture.

> **Failover is a restart, not a splice.** Once a token has reached the user, you cannot hand the rest of
> the answer to another model as if nothing happened: the second model never saw the first one's
> reasoning, its cache is cold, and the opaque reasoning state (Anthropic's [[signed thinking blocks|signed-thinking]],
> OpenAI's reasoning items, Gemini's \`thoughtSignature\`) does not cross providers. Decide the policy
> in writing — silent retry before the first token, a visible \`reset\` event after it — and never glue
> two models' text together. The tokens the failed attempt generated are still billed.

> **Retries multiply.** The official SDKs retry on their own: the OpenAI and Anthropic TypeScript SDKs
> both document two automatic retries on connection errors, 429 and 5xx, and Google's SDK has its own
> retry options. Put a gateway with its own retries in front and your failover behind, and one user
> click becomes a dozen upstream attempts during exactly the outage you were trying to ride out. **Turn
> SDK retries off inside the adapters and own the policy in one place.** And a 429 is not always
> retryable: Anthropic's monthly spend-cap 429 carries no \`retry-after\` and keeps failing until the cap
> lifts, and OpenAI separates quota exhaustion from rate limiting in the error code (check its current codes).

> **Currency: every field name in this module is a snapshot.** Endpoints, event names, cache rules,
> reasoning parameters, error codes, rate-limit headers, SDK versions, model ids and prices all move
> monthly, and two of the three have shipped a new primary API surface recently. The week you build,
> read each provider's current API reference, streaming, caching, errors and rate-limit pages, write the
> check date beside every row of your difference table, and take model choices from M34 and Appendix D,
> not from memory.

**Checkpoints** ① one flagship request written by hand three times, raw \`fetch\`, status, headers and body
saved as the first fixtures · ② three stream adapters emitting one internal event type, replayed green
against chunk-split fixtures of each provider · ③ a tool call and a structured-output reply round-tripped
on all three, with every shape difference logged · ④ usage normalized and priced to the cent on all three,
one cache hit proved per provider, parts reconciled against totals · ⑤ the M12 test set run on all three
with paired intervals and cost per request · ⑥ the failover drill: a provider killed mid-stream, the
answer completed elsewhere, no side effect run twice.

**Artifact** \`EVIDENCE\` — the flagship's main AI feature running on all three providers behind **your
own provider interface**: three wire-level adapters (raw \`fetch\`, M7's parser, SDK retries off), then the
same three on the official SDKs with a written comparison of what each SDK hid. **At least 12 recorded
fixtures per provider** through M9's record-replay client: plain reply, streamed reply, tool call, tool
result round trip, structured output, a schema the provider rejects, a cache hit, a \`max_tokens\`-style
cut-off, a safety or refusal stop, a 429, [[an overload|overload]], and a mid-stream error event, so the whole suite
replays offline at zero cost. **M12 scores on the held-out test set for each provider**, reported as a
paired difference against your primary with its bootstrap interval, beside **cost per request at p50 and
p95 with the request count**. **A failover drill**: one provider made to fail mid-stream, repeatedly, with
the outcome logged. And \`DIFFERENCES.md\`: **at least 25 rows**, each one difference, the documentation
link that states it, the fixture that shows it, and the check date.

**The difference table, seeded.** Verify every cell; these are the shapes at last check, not facts to copy.

| | Anthropic Messages | OpenAI Responses | Google Gemini |
|---|---|---|---|
| System prompt | top-level \`system\` | \`instructions\`, or a developer-role item | \`systemInstruction\` |
| State | stateless; you resend | stateless, or server-held via \`previous_response_id\` | stateless \`generateContent\`; server-held in the newer Interactions API |
| Tool call | \`tool_use\` block, \`input\` object | \`function_call\` item, \`arguments\` string | \`functionCall\` part, \`args\` object |
| Structured output | \`output_config.format\` | \`text.format\` with \`json_schema\` | \`responseMimeType\` plus \`responseJsonSchema\` |
| Stream | named events, cumulative usage in \`message_delta\`, \`error\` event | typed events such as \`response.output_text.delta\`, usage in \`response.completed\` | \`streamGenerateContent?alt=sse\`, each frame a partial response |
| Caching | breakpoints you place, or one automatic top-level \`cache_control\` | automatic; \`prompt_cache_key\` improves hit rate | implicit on recent models; explicit \`cachedContents\` with a TTL |
| Reasoning dial | adaptive thinking plus \`output_config.effort\` | \`reasoning.effort\` | \`thinkingConfig\`: a level, or a token budget on older models |
| Stop signal | \`stop_reason\` | \`status\` plus \`incomplete_details.reason\` | \`finishReason\` |

**Usage: one word, three meanings.** Take one illustrative request: a 10,000-token prompt of which 8,000
hit the cache, a 500-token visible answer and 1,200 reasoning tokens. Anthropic reports \`input_tokens\`
2,000 and \`cache_read_input_tokens\` 8,000 **side by side** — \`input_tokens\` counts only what follows the
last cache breakpoint — and \`output_tokens\` 1,700 with the thinking inside it. OpenAI reports
\`input_tokens\` 10,000 with \`cached_tokens\` 8,000 **inside** it, and \`output_tokens\` 1,700 with
\`reasoning_tokens\` 1,200 inside that. Gemini reports \`promptTokenCount\` 10,000 including
\`cachedContentTokenCount\` 8,000, and \`candidatesTokenCount\` 500 with \`thoughtsTokenCount\` 1,200 **beside**
it. A normalizer that reads \`input_tokens\` as "the prompt" is 8,000 short on Anthropic; one that adds cached
to input double-counts 8,000 on the other two; one that reads candidates as "the output" drops 1,200 billed
tokens on Gemini, a 70% undercount of output. Normalize to explicit fields (uncached input, cache read,
cache write, output, reasoning-within-output), keep the raw object, and assert in a test that your parts
reconcile with each provider's own total. Confirm each rule from one real response.

**An interface that does not collapse to the lowest common denominator.** Normalize the core that is
genuinely shared — text deltas, tool calls, a finish event, usage, classified errors — as one
[[discriminated union|discriminated-union]], and **refuse to normalize away what differs.** Three rules. **Capabilities are
data:** each adapter declares what it supports (forced tool choice, cache mode, structured-output mode,
reasoning levels), and callers branch on the declaration, never on the provider's name — forcing a tool
call, for instance, returns a 400 on some current Anthropic models, so an interface that promises
\`forceTool\` everywhere is lying. **Opaque state round-trips untouched:** store the provider-native turn
beside the normalized one, apply M19's append-only rule per provider, and strip provider-bound reasoning
when a conversation moves. **Keep an escape hatch:** every event carries \`raw\`, and every request takes a
typed, per-adapter \`extensions\` field, so cache breakpoints and effort are expressible without widening
the core. Two corollaries: on two of the three, a tool request is read from the output items, not the stop
field (confirm with your fixtures); and reasoning levels do not map by name — the mapping is a table
you measure with M12.

**Gateways, and when your own thin layer wins.** Hosted routers such as OpenRouter (one key, many
models, a fallback list, billing at the model that actually served) and open-source ones such as LiteLLM
(a library and a proxy whose router splits fallbacks by error class: context window, content policy,
everything else) suit comparing many models, as in M34, and team-wide spend tracking. Your own interface wins when you depend on provider-native features — breakpoint caching,
thinking replay, strict structured output — when you already own the streaming protocol (M7) and the
client transport (M22), and because **a gateway is one more subprocessor holding your users' prompts**:
M21's data-flow document gets a row. Measure the extra hop: time-to-first-token p50 over 20 requests direct and 20
through a gateway.

**Eval-gated routing and the drill.** The routing table is a list of entries (provider, model, prompt
version, reasoning level), and **an entry is admitted only by the M12 test set**: a paired difference
against the primary whose whole bootstrap interval stays above minus a [[non-inferiority margin|non-inferiority]] you wrote
down first. **The failover target must be admitted too**, or failover turns an outage into a silent
quality regression. Put M20's circuit breaker, pointed at
providers, in front of each one. For the drill, a fault injector in the adapter cuts the stream after a chosen token or
replays that provider's own mid-stream error fixture; tool calls already executed are not re-run,
because M7's idempotency key belongs to the logical operation, not to the attempt; both attempts land
in the cost log.

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
A discriminated union is a TypeScript type made of several object shapes that share one field, the tag, whose value says which shape you have: \`{ type: 'text', text }\`, \`{ type: 'tool_call', name, args }\`, \`{ type: 'finish', reason }\`. A \`switch\` on \`type\` lets the compiler narrow to the right shape and flag a case you forgot.

Here it is the single event type all three adapters emit, so the rest of the app never sees any provider's own format.
:::

::: context non-inferiority Not worse by more than a set amount
You are not trying to prove a routing entry beats the primary, only that it is not meaningfully worse. Before running anything, write down a margin, say 3 points of pass rate. The entry is admitted only if the whole bootstrap interval of its paired difference sits above minus that margin.

\`\`\`svg
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
\`\`\`

Entry B's best guess is only a little worse, but its interval reaches past the margin, so it stays out. Writing the margin first stops you choosing one after seeing the numbers.
:::
`;export{e as default};