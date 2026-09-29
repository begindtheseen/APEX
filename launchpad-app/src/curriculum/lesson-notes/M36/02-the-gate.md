<!-- Context notes for M36/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[reviewer changes one input|sensitivity]] 1
[[auto-shutdown|auto-shutdown]] 1
[[wrong chat template|chat-template]] 1

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
