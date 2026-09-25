var e=`---
id: m3-the-module
title: "The Runtime, Unframed — what to understand and what to build"
minutes: 2
covers:
  - "The event loop: call stack, macrotask vs microtask queue"
  - "What a Promise actually is — a notification channel for work that already started"
  - "The four concurrency failure modes"
  - "Closures, lexical scope, this, reference identity — including warm serverless instances sharing module scope"
  - "Structural typing and where the type system lies to you"
  - "Parse, don’t assert — the trust boundary"
  - "Discriminated unions and exhaustiveness"
  - "Error taxonomy, cause chaining, retry safety"
  - "Modules and the bundle graph — the import graph is what ships"
---
This is the largest module in The Machine and it comes early, which is the steepest part of the curve. Do
not read ahead — start with checkpoint ①, which is a 20-minute prediction exercise, and let being
wrong about the output order be the thing that motivates the other 66 hours. Everything after this module
assumes you can reason about what the runtime is doing, so this is the one place where going slower is
going faster.

**Core concepts:** The event loop — call stack, macrotask vs microtask queue, why one slow function
stalls every user. What a Promise actually is: a notification channel for work that *already started*,
not a thing that does work and not lazy. The four concurrency failure modes —
sequential-when-you-meant-parallel, fire-and-forget, unhandled rejection, cancellation. Closures,
lexical scope, \`this\`, reference identity — including the serverless trap where warm instances reuse
module scope, making any mutable module-level variable shared state across users. Structural typing and
where the type system lies to you. **Parse, don’t assert** — the trust boundary, owned here, consumed
everywhere. Discriminated unions and exhaustiveness. Error handling as design: taxonomy, \`cause\`
chaining, which failures are safe to retry. Modules and the bundle graph — placement means nothing, the
import graph is what ships.

**Checkpoints** ① hello, event loop: predict the output order of six mixed sync/setTimeout/promise lines,
then run it and reconcile · ② one failing async test you wrote, fixed for the right reason · ③
MiniPromise: then/catch/chaining passing your own tests · ④ the four concurrency failure modes reproduced
on demand · ⑤ the Zod boundary rejecting model JSON that \`as\` accepted · ⑥ the typed error taxonomy with a
documented retry rule per class.

**Artifact** \`LAB\` — a \`runtime-lab\` repo: a set of small programs under plain \`node --test\`. MiniPromise
from scratch. A concurrency harness reproducing all four failure modes on demand, then fixing each. A Zod
boundary that rejects hostile LLM JSON which \`as MyType\` accepted. A typed error taxonomy with cause
chaining and a documented retry-safety rule per class. Strict flags on from day one.

> **Exported: the estimate log starts here and runs until you are hired.** Before every task from now
> on, write down how long you think it will take; afterwards, how long it took. M17 reads the pattern.
`;export{e as default};