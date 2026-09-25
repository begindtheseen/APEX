var e=`---
id: m6-the-module
title: "The Model as a Function — what to understand and what to build"
minutes: 5
covers:
  - "Tokens as the unit of everything"
  - "The messages array, roles, statelessness, what a system prompt mechanically is"
  - "Why text in a user or tool-result message can be forged — that is prompt injection"
  - "The context window: what fills it, what degrades before it fills"
  - "pause_turn is the stop_reason you cannot produce here: it only arises from long-running server-side tool use, and this module declares no server tool. Handle it in the switch regardless — unhandled, it reads as a finished turn and silently truncates an agent run in M19"
  - "max_tokens and the full stop_reason enum"
  - "Pricing: input/output asymmetry, caching as a byte-exact prefix match"
  - "Adaptive thinking and effort — the first quality-trading lever after caching"
  - "Discovering capabilities, max_input_tokens and max_tokens from the Models API rather than a hard-coded table — and knowing what it does not serve: prices are not on that endpoint, so the price table in your client is the one thing that carries a check date"
  - "Sampling as a per-model fact rather than a property of the field: on the current Anthropic line, temperature, top_p and top_k are removed and return a 400, while the 4.6 family and Haiku still accept them, and assistant prefill is gone across a wider span than the sampling parameters are. Every other provider you might work for still exposes temperature. Check the model you are calling, not the folklore, and do it the way this module already teaches — from the Models API rather than from a table. The durable idea survives either way: non-determinism is structural, not a knob you forgot to set"
  - "The structural boundaries — what no prompt fixes"
  - "Prefill vs decode and the KV cache — the one mechanism explaining three facts this module asserts: why caching needs a byte-exact prefix — the prefix, not the body — why the tokens you resend grow quadratically with conversation length (dollars do not follow, because cache reads are priced at a fraction; measure both), and why time-to-first-token and inter-token latency are different numbers. No training, no backprop, no attention math. Then measure it: probe a long prompt and a short one and show TTFT scaling with input while inter-token latency does not"
---
Also the morale spike for the months 3–6 abandonment window — which only works because it sits
inside that window rather than after it.

**Core concepts:** Tokens as the unit of everything.
The messages array, roles, statelessness, and what a system prompt mechanically is — text rendered at a
specific position in the same token stream. The weighting is a training artifact, not an enforcement
mechanism. **The corollary you must internalize: text inside a user-role or tool-result message can be
forged by anything that writes to user-visible input. That is exactly what prompt injection is.**
The context window — what fills it, what degrades before it fills; the API is stateless, so you resend
the whole history every turn, so **the tokens you resend grow quadratically** with conversation length —
dollars do not follow, because cache reads are priced at a fraction, so measure both. Output control:
\`max_tokens\`
and **the full \`stop_reason\` enum**, whose refusal \`category\` is an **open set**. Pricing:
input/output asymmetry, and prompt caching as a byte-exact prefix match you **opt into** — a breakpoint
you place, or the provider's automatic version. Three things decide whether a hit ever happens: the
prefix has to clear a model-dependent **minimum length**, below which caching silently does nothing; it
has to match byte for byte; and the request is assembled **tools → system → messages**, so a tool list
that varies between requests invalidates everything after it, which is what catches people building
agents. **Adaptive thinking and effort** — the model decides when and how much to reason, and effort is
a coarse dial over that depth and over what the request costs, **not a token count**; a fixed thinking-
token budget is the dead pattern it replaced. It is the first quality-trading lever after caching.
Discovering capabilities, \`max_input_tokens\` and \`max_tokens\` **from the Models API** rather than a
hard-coded table — **and knowing what it does not serve:** prices are not on that endpoint, so the price
table in your client is the one thing that carries a check date. The structural boundaries — what no prompt fixes.
**Prefill vs decode and the KV cache** — the one mechanism explaining three facts this module asserts:
why caching needs a byte-exact *prefix*, why the tokens you resend grow quadratically, and why
time-to-first-token and inter-token latency are different numbers. No training, no backprop, no
attention math. Then measure it: probe a long prompt and a short one and show TTFT scaling with input
while inter-token latency does not.

> **A common belief here produces a branch that never fires:** that a refusal returns 200 "with an
> empty content array." **The content array is not empty.** A refusal returns 200 with a
> *populated* content array and a non-null \`stop_details\` carrying a category. \`stop_details\` is non-null
> **only** on a refusal, **and only on models from Opus 4.7 on**, which is what makes it the actual
> discriminator — check it against the model you are calling. Write
> \`if (!response.content.length)\` and that branch never runs — so refusal prose flows downstream and
> gets rendered as the answer, which is precisely the wrong-but-200 failure M10 and M12 exist to catch.
> **Branch on \`stop_reason\` before you read content.** Add server-side fallbacks as the production handling.
> One value is deliberately out of reach here: **\`pause_turn\` only arises from long-running *server-side*
> tool use**, and nothing in this module declares a server tool, so you cannot produce it on purpose yet.
> Handle it in the switch anyway — an unhandled \`pause_turn\` in M19's agent loop reads as a finished turn
> and silently truncates the run.

> **Sampling is a per-model fact, not a property of the field.** On the current Anthropic line,
> \`temperature\`, \`top_p\` and \`top_k\` are removed and return a 400, **while the 4.6 family and Haiku still
> accept them**, and assistant prefill is gone across a wider span than the sampling parameters are.
> **Every other provider you might work for still exposes \`temperature\`.** Check the model you are
> calling, not the folklore. Keep the underlying idea — **non-determinism is structural, not a knob you
> forgot to set** — which is more true now, not less.

**Checkpoints** ① token counts compared against your guesses across five kinds of text · ② one cache
hit proved from the usage meters, with its cost delta printed · ③ every \`stop_reason\` this module can reach produced on
purpose, with the refusal taken from a recorded fixture, and the cost column live in the M2 log · ④ the limit of constrained
decoding shown two ways — a schema-valid reply that is factually wrong, and the 400 the API returns when
the schema itself is invalid — with capabilities read from the Models API and every 400 pasted into the
dead-patterns page.

**Artifact** \`LAB\` — a \`model-probe\` CLI: compare token counts against your assumptions across five
text types; prove a cache hit from the usage meters and print the cost delta; produce **every**
\`stop_reason\` you can produce deliberately — \`end_turn\`, \`max_tokens\`, \`tool_use\`, \`stop_sequence\` —
and take the refusal from a recorded fixture rather than trying to trip a safety classifier on demand,
which is not reliably producible; show \`stop_details\` as the discriminator, and note that the categories
it carries are an **open set**, so a \`switch\` over the ones you saw this month is a latent bug;
demonstrate **the limit of constrained decoding rather than a rejection that cannot happen** — a
generation that is schema-valid and factually wrong, and, separately, what the API does when the schema
you sent is itself invalid, which is a 400 on the request rather than a rejected generation; discover
capabilities, context window (\`max_input_tokens\`) and output cap (\`max_tokens\`) from the Models API
rather than a hard-coded table, noting that prices are not on that endpoint, so the price table in your
client is the one thing that must carry a check date. Plus a **dead-patterns page** with every 400 pasted
in. **And the cost column added to the M2 call log, priced from the usage object, so every call from
here on has a price.**

> **Exported:** the \`stop_reason\` discriminator → M9, M19. The usage and cache meters → M20.
`;export{e as default};