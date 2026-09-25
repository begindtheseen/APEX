var e=`---
id: m22-the-gate
title: "Frontend for AI Interfaces — the gate, and what most people miss"
minutes: 1
covers:
  - "React from zero: components, props, state — enough to own one page, not a framework tour"
  - "The React rendering model: what actually causes a re-render"
  - "Effects and their four failure modes"
  - "The server/client boundary and the current caching direction (opt-in, not opt-out)"
  - "Forms, mutations, optimistic UI with shared Zod schemas"
  - "A custom transport over your own SSE frames"
  - "Cancellation, abort propagation, resumable streams"
  - "Latency choreography for 10-second-plus operations"
  - "Conversation scroll behavior and accessible streaming"
  - "Designing for output that is sometimes wrong"
---
**GATE** — **REFEREE:** your reviewer, with a screen recording, the cost meter, and axe-core in CI.
**PASS:** demonstrate refresh-mid-generation recovery live; show the stop button’s effect in the cost
meter; report time-to-first-token (measured here, where the client instrumentation lives); **axe-core
passes on the chat surface, plus one recorded real-screen-reader pass showing the \`aria-live\` re-read
behavior present and then fixed.** **ON FAIL:** the stop button stops the UI only.

**Most-missed:** \`useState\` as a variable store kept in sync with \`useEffect\`. · Adding and removing dependencies
(the list of values an effect re-runs on) until the lint rule goes quiet. · \`'use client'\` at the root layout, converting the whole tree to client
components. · **Assuming one \`read()\` chunk equals one complete SSE event** — corrupts output only under
load. · \`setState\` on every token at 60 times a second, re-rendering the whole markdown tree, then blaming
React.
· Conflating client disconnect with user cancellation — or a stop button that stops the UI while the
server keeps generating and charging. · \`aria-live="polite"\` on the streaming container, making screen
readers re-read the entire growing message. · **An approval button that appears after the tool already
ran.** That is theater, not a gate.
`;export{e as default};