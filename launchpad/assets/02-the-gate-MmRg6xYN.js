var e=`---
id: m35-the-gate
title: "One Feature, Three Providers — the gate, and what most people miss"
minutes: 2
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
**GATE** — **REFEREE:** your reviewer, who chooses which provider to kill and at which token, without telling you, and then reruns the M12 held-out test set on all three providers. **PASS:** 10 injected mid-stream failures, each completed on an admitted second provider, with the user shown one coherent answer after a visible reset, the idempotency table proving 0 duplicated side effects, and the failed attempt's tokens priced in the cost log; the three providers' M12 test scores stated as paired differences against the primary with bootstrap intervals, beside cost per request at p50 and p95 with the request count; the full fixture suite replayed with the network off; one field proved silently ignored on an OpenAI-compatible endpoint; and \`DIFFERENCES.md\` holding at least 25 rows, each with a doc link, a fixture and a check date. **ON FAIL:** a side effect ran twice, or the usage normalizer did not reconcile with a provider's totals — fix the adapter, re-record the fixtures, run the drill again.

**Most-missed:** Treating an OpenAI-compatible endpoint as the provider: fields you rely on are dropped
with a 200. · Treating \`arguments\` as an object when it is a string. · Normalizing usage by field name, and undercounting or double-counting cached and
reasoning tokens on two of three providers. · Leaving SDK retries on under your own failover, so an
outage becomes a [[retry storm|retry-multiply]]. · Retrying a 429 that is a [[spend cap|spend-cap]], or failing over on a 400 that is
your own bug and will fail everywhere. · Splicing the second model's text onto the first model's
partial answer. · A failover target that never passed the eval set, so the outage is invisible and the
quality drop is not. · Forgetting that caches are provider- and model-scoped, so failover's first minutes
pay [[full input price|cold-failover]]. · One prompt tuned on
one provider, and the other two blamed for the score. · An interface whose every
method is the [[intersection of three APIs|lowest-common]], which deletes caching, reasoning control and strict schemas
from your product to make the types line up.

::: context retry-multiply How polite layers become a storm
Each layer that retries multiplies the attempts of the layer above it. If the SDK makes up to 3 attempts (one call plus two retries), a gateway around it does the same, and your failover then tries a second provider, one click can mean 3 × 3 × 2 = 18 upstream requests.

During an outage every user does this at once, piling load onto a provider that is already failing and delaying the moment you give up and fail over. One place owns the retry policy; every other layer passes errors straight through.
:::

::: context spend-cap A limit that does not clear in seconds
A rate limit counts requests or tokens per minute: wait a moment and it clears. A spend cap or quota counts money over a month or billing period: once you hit it, every request fails until the period rolls over or someone raises the limit.

Both can come back as HTTP 429, so the status alone does not tell you which one you hit. Read the error body and headers. Retrying a spend cap only burns time; the right move is to fail over or alert a person.
:::

::: context cold-failover Why the backup costs more at first
Prompt caches belong to one provider and one model. When traffic moves to a failover target, none of your long, repeated prompt prefixes are cached there yet, so each request pays the full uncached input price, and often waits longer for its first token, until the new cache warms up.

If cached reads were most of your input bill, the jump can be large. Budget for it in the cost of an outage, and do not mistake the spike for a bug.
:::

::: context lowest-common Keeping only what everyone supports
An interface built as the intersection of three APIs offers only the features all three share: the "lowest common denominator." The types line up neatly, but every provider's particular strengths vanish, such as explicit cache breakpoints, a reasoning effort setting, or strict schema enforcement.

Your product then pays more, answers worse or validates less on every provider, even the one that had the feature. The lesson's alternative is a shared core plus declared capabilities and per-provider extensions.
:::
`;export{e as default};