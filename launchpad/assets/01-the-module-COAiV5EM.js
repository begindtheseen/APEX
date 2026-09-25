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

**Core concepts:** React from zero: components, props, state — enough to own one page. **The React
rendering model: what actually causes a re-render.** Effects and their four failure modes (infinite
loops, stale closures, races, missing cleanup). **The server/client boundary and the current Next.js
caching direction** — state the direction, which is durable, not the version, which is not: **the
direction is explicit opt-in.** \`fetch\`, GET route handlers and the client router cache no longer cache
by default, and the \`use cache\` directive is how you opt back in. **Statically rendered routes are still
cached — "it caches nothing by default" is the overstatement that gets you a follow-up you cannot
survive.** Check the current documentation the week you build this and write down what you found. Generic
hedging does not catch this because you will read current docs, recognize the words, and map them onto
the old default without noticing the direction flipped. Forms, mutations, optimistic UI
with shared Zod schemas. **A custom transport over your own M7 SSE frames.** Cancellation and abort
propagation. Resumable streams. Latency choreography for 10-second-plus operations. Conversation scroll
behavior and accessible streaming. **Designing for output that is sometimes wrong** — tool-call UI,
approval gates, citations, uncertainty, honest failure states. **The upgrade-path UI and the honest
failure state** (here rather than in M20, which would create a circular dependency).

**Checkpoints** ① the rendering model: predict which components re-render, then measure · ② one effect
bug from each of the four failure modes, fixed · ③ a custom transport over your own M7 SSE frames · ④ stop
that provably stops billing; refresh that resumes · ⑤ tool-call approval gate wired to M19, citations
wired to M11 · ⑥ honest failure states, and axe-core green on the chat surface.

**Artifact** \`EVIDENCE\` — the flagship’s chat surface rebuilt on **your own M7 protocol via a custom
transport** — not the prebuilt default; implementing the transport interface is the part that teaches
the protocol boundary. A stop button that provably stops upstream billing; refresh-mid-generation that
resumes rather than losing the answer; tool calls surfaced with a working approval gate wired to M19;
citations linking to the span provenance from M11, as retrieved by M18; failure states that tell the
truth; the 402/upgrade path.
`;export{e as default};