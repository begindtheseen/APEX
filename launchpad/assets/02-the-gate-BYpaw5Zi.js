var e=`---
id: m36-the-gate
title: "Open Weights on Your Own Hardware — the gate, and what most people miss"
minutes: 2
covers:
  - "Where open weights live: a Hugging Face Hub model repository, its model card and license, gated repos that need an access request and a token, and hf download pinned to a revision"
  - "File formats: safetensors holds tensors only and is safe to load; older pickle-based checkpoints can run code when loaded; GGUF is llama.cpp's single file carrying weights, tokenizer and chat template together"
  - "Quantization: storing each weight in fewer bits. 8-bit, 4-bit, GGUF k-quants such as Q4_K_M, and the calibrated GPU-side methods AWQ and GPTQ, plus FP8 on newer cards"
  - "What quantization costs in quality is uneven: small models, arithmetic, code, long context and tool-call formatting break first, and perplexity can barely move while your task pass rate drops. Your M12 set is the verdict; KL divergence against the reference file is a cheap second signal"
  - "The memory bill predicted before measured: parameters times bytes per parameter, plus the KV cache (2 x layers x KV heads x head dimension x bytes per element, per token, per sequence), plus runtime overhead"
  - "The weights are a fixed cost; the KV cache scales with context length times concurrency, and it is what runs a GPU out of memory in production"
  - "Decode is memory-bandwidth bound: every generated token reads every active weight once, so tokens per second is roughly memory bandwidth divided by model size. A prediction you can check"
  - "Mixture-of-experts models: memory is set by total parameters, speed by active parameters"
  - "Local runtimes: llama.cpp, Ollama, LM Studio, and MLX on Apple silicon, each exposing an OpenAI-compatible endpoint so the M12 runner points at it unchanged. Each has a default (context length, GPU layers, memory fitting) that silently decides what you measure unless you pin it"
  - "Serving at scale with vLLM or SGLang: continuous batching, paged attention, prefix caching, and the throughput-versus-latency curve you sweep to choose an operating point"
  - "Renting a GPU by the hour: billing starts at boot, the model download is billed time, idle hours cost the same as busy ones, and an unauthenticated public endpoint is a free service for strangers"
  - "A model file is untrusted input: prefer safetensors and GGUF, read remote code before enabling trust_remote_code. M21's trust boundary on the download path"
  - "Licenses: Apache 2.0 and MIT versus custom community licenses with user-count thresholds, attribution clauses and regional exclusions. Open weights is not open source"
  - "When local beats an API (privacy and residency, offline, high steady volume, controlled latency) and when it does not (frontier capability, spiky or low traffic, and the operations work you now own). Decided by cost per successful request at your real utilization"
---
**GATE** — **REFEREE:** your reviewer, running one quantization level from your README on their own machine
or watching you run it live, then reading your vLLM benchmark logs and your cost sheet. **PASS:** every
memory prediction lands within 20% of its measurement at the stated context length, and any larger gap is
explained by a named cause; each quantization level's delta against the reference is reported with its
bootstrap interval and the number of cases behind it, saying whether the interval crosses zero; the load
sweep shows throughput and p95 time-to-first-token at all four concurrency levels, and you name the
operating point you would run and why; cost per 1,000 successful requests is stated at both utilization
levels against the M34 API model, with the break-even rate; and the recommendation holds up when the
[[reviewer changes one input|sensitivity]], such as traffic tripling or the API price halving. **ON FAIL:** your
prediction missed because the context length was not pinned, or a winner was named with no interval —
pin it, re-measure, re-run the eval.

**Most-missed:** Comparing quantization levels on a leaderboard or on perplexity instead of your own eval
set. · Measuring memory without pinning the context length, so the runtime's default decided the number
for you. · Reading \`nvidia-smi\` on a vLLM box and concluding the model needs the whole card. · Pricing
the rented GPU at full utilization when your traffic keeps it idle most of the hour. · Leaving the rented
GPU running overnight; put an [[auto-shutdown|auto-shutdown]] on it the way M20 put a breaker on spend. · Evaluating a GGUF
on the laptop and serving a different checkpoint on the GPU, then quoting the laptop's score. · Using the
[[wrong chat template|chat-template]], which degrades output without a single error. · Assuming a mixture-of-experts model
fits in memory because its active parameter count is small. · Treating "open weights" as "open source";
read the license before the product depends on it.

::: context sensitivity Does the answer survive a changed assumption?
This is a sensitivity check. Every cost recommendation rests on guesses: traffic, API price, GPU hourly rate, pass rate. Change one and recompute. If tripling traffic flips "use the API" into "rent a GPU," the recommendation should say so and name the traffic level where it flips.

A decision that holds across reasonable changes is robust. One that reverses on a small change needs that condition written into it, so the team knows when to revisit.
:::

::: context auto-shutdown Stop paying when nobody is using it
A rented GPU bills every hour it is running, busy or idle. An auto-shutdown turns it off when nothing is happening: some rental platforms offer an idle timeout, and otherwise a small script on the machine can watch for requests and power it down after, say, thirty quiet minutes.

Pair it with a billing alert. A forgotten GPU left on over a weekend can cost more than a month of your API calls.
:::

::: context chat-template Wrapping messages the way the model was trained
A chat model is trained on conversations laid out in one particular text format, with special tokens marking where each system, user and assistant turn starts and ends. The chat template turns your messages array into that exact layout.

Use another model's template, or drop the special tokens, and the model still answers, only worse: it may ramble, ignore instructions or break tool calls. GGUF files and Hub repositories usually ship the template; check that your runtime actually applies it.
:::
`;export{e as default};