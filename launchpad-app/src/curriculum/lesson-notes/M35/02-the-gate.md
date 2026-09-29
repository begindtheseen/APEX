<!-- Context notes for M35/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[retry storm|retry-multiply]] 1
[[spend cap|spend-cap]] 1
[[full input price|cold-failover]] 1
[[intersection of three APIs|lowest-common]] 1

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
