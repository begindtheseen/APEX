var e=`---
id: m6-the-gate
title: "The Model as a Function — the gate, and what most people miss"
minutes: 2
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
**GATE** — **REFEREE:** your reviewer, checking your arithmetic against a real usage object from the
service. **PASS:** price a request to the cent from its usage object alone, **saying where each rate came
from and when you last checked it** — the Models API does not serve prices, so this one number is
hand-carried and dated; point at the exact byte that
broke a cache prefix; explain why a model-emitted "confidence score" is generated text rather than a
probability, and what feature designs that kills. **ON FAIL:** re-derive the pricing by hand from three
more requests.

> **Currency: highest decay rate in the document.** This is the fastest-changing material in the
> program. Model IDs, parameter availability, pricing, caching TTLs, and the \`stop_reason\` enum move on a
> monthly cadence. The week you build it, check every detail against the official documentation of the
> model service you use. Do not trust this document, a blog post, or a model’s memory.

**Most-missed:** Using another provider’s tokenizer (the provider is the company running the model
service) or a chars/4 rule to budget tokens. · Treating
\`max_tokens\` as a cost cap. It is a ceiling the model is unaware of, so it truncates mid-thought. The
budget the model *can* see is the server-side task budget (\`output_config.task_budget\`, currently behind
a beta header) — know that it exists and what it changes.
· Checking for an empty content array to detect a refusal. The array is populated; \`stop_details\` is the
discriminator, and that branch never fires. · Interpolating anything dynamic near the front of the system
prompt. One changed byte invalidates the cache and the failure is completely silent. · Optimizing input
tokens while ignoring that output costs several times more. · Asking the model to rate its own confidence
and making decisions (routing) on that number. It looks like a probability and behaves like a vibe.
`;export{e as default};