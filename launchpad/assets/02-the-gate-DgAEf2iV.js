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
**GATE** — **REFEREE:** your reviewer, with a screen recording, the cost meter, and axe-core [[in CI|ci]].
**PASS:** demonstrate refresh-mid-generation recovery live; show the stop button’s effect in the cost
meter; report time-to-first-token (measured here, where the client instrumentation lives); **axe-core
passes on the chat surface, plus one recorded [[real-screen-reader pass|screen-reader]] showing the \`aria-live\` re-read
behavior present and then fixed.** **ON FAIL:** the stop button stops the UI only.

**Most-missed:** \`useState\` as a variable store kept in sync with \`useEffect\`. · Adding and removing dependencies
(the list of values an effect re-runs on) until the [[lint rule|lint-rule]] goes quiet. · \`'use client'\` at the root layout, converting the whole tree to client
components. · **Assuming one \`read()\` chunk equals one complete SSE event** — corrupts output only under
load. · \`setState\` on every token at 60 times a second, re-rendering the whole markdown tree, then blaming
React.
· Conflating client disconnect with user cancellation — or a stop button that stops the UI while the
server keeps generating and charging. · \`aria-live="polite"\` on the streaming container, making screen
readers re-read the entire growing message. · **An approval button that appears after the tool already
ran.** That is [[theater|theater]], not a gate.

::: context ci Continuous integration
CI, continuous integration, means every change you push is automatically built and tested on a server, typically with GitHub Actions. A failing check shows a red cross on the pull request and usually blocks merging.

Putting an accessibility check in CI means nobody can quietly break it later: the test runs on every change, not only when someone remembers.
:::

::: context screen-reader Software that reads the screen aloud
A screen reader turns what is on screen into speech or braille for blind and low-vision users. Common ones are VoiceOver on Apple devices, NVDA (free, on Windows) and JAWS.

Streaming chat is hard for them: if the whole message area is announced every time a word is added, the user hears the same growing paragraph over and over. Only testing with a real one shows what it actually says.
:::

::: context lint-rule Automated code-style warnings
A linter (ESLint, for JavaScript) reads your code and flags likely mistakes without running it. React's hooks rules include one that warns when an effect uses a value missing from its dependency list.

The warning points at a real design question. Adding or removing entries just to silence it usually trades the warning for an infinite loop or a stale value.
:::

::: context theater Looks like safety, is not
"Security theater" is a phrase popularised by security writer Bruce Schneier for measures that look reassuring but do not actually protect anything.

An approval button that appears after the tool has already run is exactly that: the user feels in control, but the action has happened. A real gate runs **before** the side effect and blocks it until the person says yes.
:::
`;export{e as default};