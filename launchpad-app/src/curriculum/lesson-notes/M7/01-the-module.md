<!-- Context notes for M7/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[REST|rest]] 2
[[offset pagination|offset-pagination]] 1
[[SSE|sse]] 2
[[no SDK|sdk]] 2
[[proxy buffering|proxy-buffering]] 2
[[Rate limiting|rate-limiting]] 2
[[Webhooks|webhooks]] 2
[[CORS|cors]] 2

::: context rest What REST means
**REST** is the most common style for web APIs. Web addresses name *things* — `/users/42`, `/orders` — and the HTTP method says what to do with them: GET reads, POST creates, PATCH or PUT changes, DELETE removes. It fits naturally until you need an *action*, like "cancel this order" or "retry this payment," which is why real APIs end up with endpoints like `POST /orders/42/cancel`.
:::

::: context offset-pagination Why offset pagination skips and repeats
Offset pagination asks for "20 items, skipping the first 20" to get page two. If a new item is added at the top while someone is paging, everything slides down one place, so the last item of page one shows up again on page two; a deletion makes one item vanish between pages. **Cursor** pagination — "the 20 items after item #8812" — does not have this problem.
:::

::: context sse What SSE is
**Server-Sent Events** are a simple standard for a server to keep one HTTP response open and push messages down it as they happen. Each message is a few lines of text such as `data: Hello` followed by a blank line. It flows one way, server to browser, which is exactly what streaming a model's answer word by word needs.
:::

::: context sdk What an SDK is
An **SDK** (software development kit) is a ready-made library a company publishes so you can use its service without writing raw web requests — you call a function and it handles the details. Doing it once *without* the SDK shows you what those details are, which is what you need when the SDK's behaviour surprises you in production.
:::

::: context proxy-buffering Why a stream can arrive all at once
Between your server and the user there are often other servers — proxies, load balancers, content-delivery networks. Some of them collect a response before passing it on, to be efficient. For a normal page that is harmless. For a streamed answer it means the user stares at nothing for twenty seconds and then gets the whole reply in one lump.
:::

::: context rate-limiting What rate limiting is
A **rate limit** caps how many requests someone may make in a period — say, 50 a minute. Go over and the service answers **429 Too Many Requests**, often with a header saying how long to wait. "From both sides" means you must behave well under your model provider's limits, and you must set limits of your own so one user, or one script, cannot use up your budget.
:::

::: context webhooks What a webhook is
Instead of you asking a service "has anything happened yet?" over and over, the service calls a URL on *your* server when something happens — a payment succeeds, a repository gets a new commit. Senders often deliver the same event more than once, so your handler must cope with repeats. The request carries a **signature** computed from its exact bytes and a shared secret, so you can check it really came from them.
:::

::: context cors What CORS is
Browsers stop a web page's code from reading responses from a *different* site unless that site says it is allowed, using special headers. That rule is **CORS** (cross-origin resource sharing), and it is behind many confusing "blocked by CORS policy" errors. It protects users in the browser only: it does nothing to stop a script or `curl` from calling your server directly.
:::
