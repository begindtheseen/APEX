<!-- Context notes for M3/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[macrotask vs microtask queue|task-queues]] 2
[[Closures|closures]] 2
[[the serverless trap|serverless-trap]] 1
[[Structural typing|structural-typing]] 2
[[the trust boundary|trust-boundary]] 2
[[which failures are safe to retry|safe-to-retry]] 1
[[Zod boundary|zod]] 1
[[the estimate log|estimate-log]] 1

::: context task-queues Two waiting lines, one worker
JavaScript runs one piece of code at a time, on the **call stack**. Work that is ready to run later waits in line. Promise callbacks wait in the **microtask** queue; timers and finished input/output wait in the **macrotask** queue. Each time the stack empties, the whole microtask line is served first, then one macrotask. That is why a resolved promise's `.then()` runs before a `setTimeout(fn, 0)`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" font-family="Inter, Arial, sans-serif">
  <rect x="140" y="55" width="80" height="44" rx="8" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="180" y="75" font-size="12" text-anchor="middle" fill="#1f2a44">call</text>
  <text x="180" y="90" font-size="12" text-anchor="middle" fill="#1f2a44">stack</text>
  <text x="70" y="20" font-size="12" text-anchor="middle" fill="#1d6fd1">microtasks (first)</text>
  <g fill="#ffffff" stroke="#1d6fd1" stroke-width="2">
    <rect x="16" y="30" width="30" height="24" rx="4"/><rect x="52" y="30" width="30" height="24" rx="4"/><rect x="88" y="30" width="30" height="24" rx="4"/>
  </g>
  <text x="70" y="140" font-size="12" text-anchor="middle" fill="#b4232c">macrotasks (then one)</text>
  <g fill="#ffffff" stroke="#b4232c" stroke-width="2">
    <rect x="16" y="100" width="30" height="24" rx="4"/><rect x="52" y="100" width="30" height="24" rx="4"/><rect x="88" y="100" width="30" height="24" rx="4"/>
  </g>
  <line x1="120" y1="42" x2="140" y2="62" stroke="#1d6fd1" stroke-width="2"/>
  <line x1="120" y1="112" x2="140" y2="92" stroke="#b4232c" stroke-width="2"/>
  <text x="290" y="72" font-size="11" text-anchor="middle" fill="#1f2a44">.then() callbacks</text>
  <text x="290" y="88" font-size="11" text-anchor="middle" fill="#6c7a93">wait in the top line</text>
  <text x="290" y="112" font-size="11" text-anchor="middle" fill="#1f2a44">setTimeout, I/O</text>
  <text x="290" y="128" font-size="11" text-anchor="middle" fill="#6c7a93">wait in the bottom line</text>
</svg>
```
:::

::: context closures What a closure is
A function made inside another function remembers the variables around it, even after the outer function has returned. A `makeCounter()` that creates `let count = 0` and returns a function adding one to it gives you a counter no other code can touch. Closures are everywhere in JavaScript — every callback you write uses one — and most confusing bugs about "the wrong value" trace back to which variable a closure captured.
:::

::: context serverless-trap What serverless and warm instances are
On a **serverless** platform such as Vercel or AWS Lambda, you hand over a function and the platform starts copies of it as requests arrive. To save time, a copy that just answered one request is often kept **warm** and reused for the next — possibly a different user. Code that runs once when the file loads is not re-run, so a variable kept at the top of the file can carry one user's data into another user's request.
:::

::: context structural-typing Types by shape, not by name
TypeScript checks whether a value has the right *shape*: any object with a `name` string and an `email` string fits a `User` type, whatever it was called when it was made. The catch is that all types vanish when the code runs. Writing `data as User` makes the checker stop asking questions; it does not look at the data. That is where the type system "lies."
:::

::: context trust-boundary Where outside data comes in
A trust boundary is any place data enters your program from something you do not control — a form, a web request, another company's API, a language model's reply. Outside data can have any shape at all. "Parse, don't assert" means checking it at that line and turning it into a known type once, so every line of code behind the boundary can rely on it.
:::

::: context safe-to-retry When trying again is safe
Some failures can be fixed by simply trying again: a network blip while *reading* data costs nothing to repeat. Others cannot: if a request to charge a card timed out, the charge may already have gone through, and retrying could charge twice. An action that has the same effect whether it runs once or several times is called **idempotent**, and knowing which of your actions are is a question interviewers love.
:::

::: context zod What Zod is
Zod is a popular TypeScript library for checking data at runtime. You describe the shape you expect — "an object with a `title` string and a `score` number" — and call `.parse()` on the incoming data. If the data matches, you get it back correctly typed; if not, you get an error that says which field was wrong, instead of a crash three functions later.
:::

::: context estimate-log Why keep an estimate log
People reliably underestimate how long their own tasks will take, even when they know about the habit — psychologists Daniel Kahneman and Amos Tversky named this the **planning fallacy** in 1979. A log of guess versus actual shows your personal multiplier. In a job, estimates decide deadlines and promises to customers, and "I usually take about 1.6 times my first guess" is a very useful thing to know about yourself.
:::
