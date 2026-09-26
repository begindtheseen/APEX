<!-- Context notes for M22/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[components, props, state|react-basics]] 2
[[re-render|re-render]] 2
[[stale closures|stale-closure]] 1
[[Next.js|nextjs]] 1
[[optimistic UI|optimistic-ui]] 2
[[Zod schemas|zod]] 2
[[SSE frames|sse]] 2
[[axe-core|axe-core]] 1

::: context react-basics The three words React is built on
A **component** is a reusable piece of screen, written as a function: a button, a message bubble, a whole chat window. **Props** are the inputs a parent hands to a component, like arguments to a function. **State** is data a component remembers and can change itself, like the text typed so far.

```svg
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
```

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
Server-sent events (SSE) are a web standard for a server to push a stream of messages down one long-lived HTTP response. Each event is a few lines of text starting with `data:` and ending with a blank line. Chat apps commonly use this to stream a model's answer word by word.

One trap: the network delivers data in chunks that do not line up with events, so your code must collect text until it sees the blank line that ends each event.
:::

::: context axe-core An automated accessibility checker
axe-core is a free, open-source engine that scans a web page for accessibility problems: buttons with no label, images with no text alternative, text with too little contrast. It runs in browser tools and in automated tests.

Accessibility means people using screen readers, keyboards only, or zoom can still use your app. Automated checks catch only part of the problems, which is why a real screen-reader test is also required.
:::
