var e=`---
id: m22-the-module
title: "Frontend for AI Interfaces — what to understand and what to build"
minutes: 2
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
You started at M1 with no code, so this is React from zero — enough to own one page, not a framework
tour. What is here beyond that is the AI-specific surface, which is where you differentiate.

**Core concepts:** React from zero: [[components, props, state|react-basics]] — enough to own one page. **The React
rendering model: what actually causes a [[re-render|re-render]].** Effects and their four failure modes (infinite
loops, [[stale closures|stale-closure]], races, missing cleanup). **The server/client boundary and the current [[Next.js|nextjs]]
caching direction** — state the direction, which is durable, not the version, which is not: **the
direction is explicit opt-in.** \`fetch\`, GET route handlers and the client router cache no longer cache
by default, and the \`use cache\` directive is how you opt back in. **Statically rendered routes are still
cached — "it caches nothing by default" is the overstatement that gets you a follow-up you cannot
survive.** Check the current documentation the week you build this and write down what you found. Generic
hedging does not catch this because you will read current docs, recognize the words, and map them onto
the old default without noticing the direction flipped. Forms, mutations, [[optimistic UI|optimistic-ui]]
with shared [[Zod schemas|zod]]. **A custom transport over your own M7 [[SSE frames|sse]].** Cancellation and abort
propagation. Resumable streams. Latency choreography for 10-second-plus operations. Conversation scroll
behavior and accessible streaming. **Designing for output that is sometimes wrong** — tool-call UI,
approval gates, citations, uncertainty, honest failure states. **The upgrade-path UI and the honest
failure state** (here rather than in M20, which would create a circular dependency).

**Checkpoints** ① the rendering model: predict which components re-render, then measure · ② one effect
bug from each of the four failure modes, fixed · ③ a custom transport over your own M7 SSE frames · ④ stop
that provably stops billing; refresh that resumes · ⑤ tool-call approval gate wired to M19, citations
wired to M11 · ⑥ honest failure states, and [[axe-core|axe-core]] green on the chat surface.

**Artifact** \`EVIDENCE\` — the flagship’s chat surface rebuilt on **your own M7 protocol via a custom
transport** — not the prebuilt default; implementing the transport interface is the part that teaches
the protocol boundary. A stop button that provably stops upstream billing; refresh-mid-generation that
resumes rather than losing the answer; tool calls surfaced with a working approval gate wired to M19;
citations linking to the span provenance from M11, as retrieved by M18; failure states that tell the
truth; the 402/upgrade path.

::: context react-basics The three words React is built on
A **component** is a reusable piece of screen, written as a function: a button, a message bubble, a whole chat window. **Props** are the inputs a parent hands to a component, like arguments to a function. **State** is data a component remembers and can change itself, like the text typed so far.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" font-family="Inter, Arial, sans-serif">
  <rect x="120" y="10" width="120" height="36" rx="6" fill="#8fb8f0" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="180" y="33" font-size="12" text-anchor="middle" fill="#1f2a44">ChatWindow</text>
  <text x="248" y="33" font-size="11" fill="#1d6fd1">state: messages</text>
  <line x1="150" y1="46" x2="80" y2="90" stroke="#1f2a44" stroke-width="1.5"/>
  <line x1="210" y1="46" x2="280" y2="90" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="60" y="72" font-size="11" fill="#6c7a93">props</text>
  <text x="270" y="72" font-size="11" fill="#6c7a93">props</text>
  <rect x="20" y="90" width="120" height="36" rx="6" fill="#fff" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="80" y="113" font-size="12" text-anchor="middle" fill="#1f2a44">MessageList</text>
  <rect x="220" y="90" width="120" height="36" rx="6" fill="#fff" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="280" y="113" font-size="12" text-anchor="middle" fill="#1f2a44">InputBox</text>
</svg>
\`\`\`

When state changes, React redraws the parts of the page that depend on it.
:::

::: context re-render When React runs your component again
A re-render is React calling your component function again to work out what the screen should show. It happens when that component's state changes, when its parent re-renders, or when a shared value (a context) it reads changes.

Re-renders are usually cheap, but not free. Updating state on every streamed token can mean redrawing a long chat dozens of times a second, which is where apps start to stutter.
:::

::: context stale-closure A function remembering old values
In JavaScript a function "closes over" the variables around it at the moment it was created. If React keeps using an old copy of that function, it keeps seeing old values: a stale closure.

Classic example: a timer set up once that prints a counter. The counter on screen climbs, but the timer keeps printing 0, because it still holds the value from when it was created.
:::

::: context nextjs A framework around React
React draws the page; it does not decide how pages are routed, fetched or rendered on a server. Next.js, made by the company Vercel, is a popular framework that adds those pieces: file-based routes, server rendering, API routes and caching.

Its caching defaults have changed between major versions, which is why the lesson insists you check the current documentation instead of trusting an old tutorial.
:::

::: context optimistic-ui Showing success before it is confirmed
Optimistic UI updates the screen immediately, as if the server already said yes, and quietly undoes it if the server later says no. When you tap "like" and the heart fills instantly, that is optimistic UI; the request is still travelling.

It makes apps feel fast, but it needs a clear, honest way to roll back and tell the user when something did fail.
:::

::: context zod One description of the data, checked everywhere
Zod is a TypeScript library for describing the shape of data, for example "an email string and a message of 1 to 2,000 characters", and checking real data against it while the program runs.

Sharing one schema between the browser form and the server means both enforce exactly the same rules. The form can show friendly errors, and the server still refuses bad data sent by anything other than your form.
:::

::: context sse Server-sent events
Server-sent events (SSE) are a web standard for a server to push a stream of messages down one long-lived HTTP response. Each event is a few lines of text starting with \`data:\` and ending with a blank line. Chat apps commonly use this to stream a model's answer word by word.

One trap: the network delivers data in chunks that do not line up with events, so your code must collect text until it sees the blank line that ends each event.
:::

::: context axe-core An automated accessibility checker
axe-core is a free, open-source engine that scans a web page for accessibility problems: buttons with no label, images with no text alternative, text with too little contrast. It runs in browser tools and in automated tests.

Accessibility means people using screen readers, keyboards only, or zoom can still use your app. Automated checks catch only part of the problems, which is why a real screen-reader test is also required.
:::
`;export{e as default};