<!-- Context notes for M4/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[GC|garbage-collector]] 1
[[floating point|floating-point]] 1
[[grapheme clusters|grapheme-clusters]] 2
[[pools|pools]] 2
[[idempotency|idempotency]] 2
[[DST|dst]] 2
[[footgun|footgun]] 1
[[heap snapshot|heap-snapshot]] 1

::: context garbage-collector What the GC does
**GC** is short for garbage collector: the part of the JavaScript runtime that finds objects your program can no longer reach and frees their memory, so you never free memory by hand. The catch is in "can no longer reach." An object stored in a cache, a list or an event listener that nothing ever clears is still reachable, so it is never freed — and a server that keeps doing that grows until it crashes.
:::

::: context floating-point Why 0.1 + 0.2 is not 0.3
JavaScript numbers are stored in binary, and most decimal fractions — like 0.1 — cannot be written exactly in binary, just as 1/3 cannot be written exactly in decimal. So `0.1 + 0.2` gives `0.30000000000000004`. For money, store whole cents as integers. Whole numbers are only exact up to 9,007,199,254,740,991, which is why very large IDs are often sent as strings.
:::

::: context grapheme-clusters What a "character" really is
What a person sees as one character can be several pieces underneath. An accented é can be one code point or two (e plus an accent mark), and a family emoji is several code points joined together; each code point is then stored as one to four bytes in UTF-8. Cut a stream of bytes at the wrong place and you split a character in half — the source of those "�" boxes in text.
:::

::: context pools What a connection pool is
Opening a new connection to a database takes time, and the database accepts only a limited number at once. A **pool** keeps a few connections open and lends them out: a request borrows one, uses it and gives it back. When every connection is busy, the next request waits in line — and if connections are never given back, everything eventually waits forever.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" font-family="Inter, Arial, sans-serif">
  <text x="60" y="18" font-size="12" text-anchor="middle" fill="#6c7a93">waiting</text>
  <g fill="#f2b880" stroke="#1f2a44" stroke-width="1.5">
    <circle cx="30" cy="60" r="10"/><circle cx="60" cy="60" r="10"/><circle cx="90" cy="60" r="10"/>
  </g>
  <rect x="130" y="22" width="110" height="80" rx="10" fill="#ffffff" stroke="#1d6fd1" stroke-width="2"/>
  <text x="185" y="16" font-size="12" text-anchor="middle" fill="#1d6fd1">pool of 3</text>
  <g stroke="#1d6fd1" stroke-width="4">
    <line x1="145" y1="40" x2="225" y2="40"/><line x1="145" y1="62" x2="225" y2="62"/><line x1="145" y1="84" x2="225" y2="84"/>
  </g>
  <text x="185" y="116" font-size="11" text-anchor="middle" fill="#1f2a44">all 3 in use</text>
  <rect x="270" y="32" width="80" height="60" rx="8" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="310" y="66" font-size="12" text-anchor="middle" fill="#1f2a44">database</text>
  <line x1="240" y1="62" x2="270" y2="62" stroke="#1d6fd1" stroke-width="2"/>
  <line x1="102" y1="60" x2="126" y2="60" stroke="#1f2a44" stroke-width="2"/>
  <polygon points="130,60 121,55 121,65" fill="#1f2a44"/>
</svg>
```
:::

::: context idempotency What idempotent means
An action is **idempotent** when doing it twice has the same effect as doing it once. Setting your email address to a value is idempotent; adding \$10 to a balance is not. Payment services let you attach an "idempotency key" to a request, so if your code retries after a timeout, the service recognizes the repeat and does not charge the customer a second time.
:::

::: context dst Why daylight saving time breaks code
**DST** is daylight saving time. In the United States, on the spring-forward night clocks jump from 2:00 to 3:00, so 2:30 that night never exists. On the fall-back night the hour from 1:00 to 2:00 happens twice. A job scheduled for 2:30 a.m. local time may therefore run zero times or twice, and different countries switch on different dates.
:::

::: context footgun What a footgun is
Programmer slang for a feature that makes it easy to shoot yourself in the foot. In Postgres, `timestamptz` stores an exact moment in time, while plain `timestamp` stores a clock reading with no time zone attached. Pick the plain one and every time still looks perfectly sensible — it is just silently off by some hours for users in other zones.
:::

::: context heap-snapshot What a heap snapshot is
The **heap** is where a program keeps its objects. A heap snapshot is a dump of every object in memory at one moment, which you can open in Chrome's developer tools. Take one, let the server handle a few thousand requests, take another, and compare: whatever kind of object keeps growing, and what is still holding on to it, is your leak.
:::
