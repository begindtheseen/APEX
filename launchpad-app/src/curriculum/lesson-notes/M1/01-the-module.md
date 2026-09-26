<!-- Context notes for M1/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[event loop|event-loop]] 1
[[runtime|runtime]] 2
[[working directory|working-directory]] 2
[[parent SHA|parent-sha]] 1
[[public API|public-api]] 1
[[pushed to a remote|remote]] 1
[[container runtime|container-runtime]] 1
[[Postgres|postgres]] 1

::: context event-loop The event loop, in one breath
JavaScript does one thing at a time. When your code asks for something slow — a timer, a file, a reply from a server — it does not wait; it leaves a note and carries on. The **event loop** is the part of the runtime that, once the current code has finished, picks up the next job whose answer has arrived and runs it. That is why the order things print in can surprise you, and why it is not a first lesson.
:::

::: context runtime What a runtime is
A file of JavaScript is just text. A **runtime** is the program that reads that text and carries it out, and it also gives your code powers the language alone does not have, such as reading files or opening network connections. **Node** is the runtime you use here: it takes the JavaScript engine from Google Chrome and runs it outside the browser, on your own machine or a server. You start it by typing `node` and a file name.
:::

::: context working-directory Where your terminal is standing
A terminal is always "in" one folder, called the working directory. `pwd` prints which one, and `cd` moves you somewhere else. When you type `node count.js`, the terminal looks for `count.js` in that folder — so "file not found" very often just means you are standing in the wrong place.
:::

::: context parent-sha Why record the parent SHA
Every git commit has an ID: a long string of letters and numbers (a hash) that works like a fingerprint for that exact state of the code. A commit's **parent** is the commit just before it. For a bug fix, the parent is the code with the bug still in it — your practice problem. The suite being **green** means every test passes; test tools show passes in green and failures in red.
:::

::: context public-api Asking another program for data
An **API** (application programming interface) is the set of requests a program agrees to answer. A public web API lives at a web address: your code sends a request, and the server sends back data — usually as JSON, text shaped like nested lists and labelled fields — which your code can then pick apart. Weather services, GitHub and many government data sites offer free ones.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" font-family="Inter, Arial, sans-serif">
  <rect x="10" y="30" width="100" height="60" rx="8" fill="#ffffff" stroke="#1f2a44" stroke-width="2"/>
  <text x="60" y="58" font-size="12" text-anchor="middle" fill="#1f2a44">your</text>
  <text x="60" y="73" font-size="12" text-anchor="middle" fill="#1f2a44">program</text>
  <rect x="250" y="30" width="100" height="60" rx="8" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="300" y="65" font-size="12" text-anchor="middle" fill="#1f2a44">server</text>
  <line x1="112" y1="48" x2="240" y2="48" stroke="#1d6fd1" stroke-width="2"/>
  <polygon points="248,48 238,43 238,53" fill="#1d6fd1"/>
  <text x="180" y="40" font-size="11" text-anchor="middle" fill="#1d6fd1">request: GET /weather</text>
  <line x1="248" y1="74" x2="120" y2="74" stroke="#b4232c" stroke-width="2"/>
  <polygon points="112,74 122,69 122,79" fill="#b4232c"/>
  <text x="180" y="92" font-size="11" text-anchor="middle" fill="#b4232c">response: {"temp": 14}</text>
</svg>
```
:::

::: context remote What a git remote is
Your repository lives in a folder on your machine. A **remote** is another copy of it somewhere else — usually on GitHub — that git knows the address of. `git push` sends your new commits there; `git pull` brings other people's commits back. The first remote is conventionally named `origin`. If your laptop dies, the remote is how your work survives.
:::

::: context container-runtime What a container runtime is
A **container** packages a program together with everything it needs to run — the right versions of its libraries and settings — and keeps it walled off from the rest of your machine. A container runtime such as Docker starts and stops them. It is how you can run a database for one project without installing it permanently, and how a team makes "works on my machine" mean "works on every machine."
:::

::: context postgres What Postgres is
**PostgreSQL**, usually called Postgres, is a free, open-source database that grew out of a research project at the University of California, Berkeley in the 1980s. It stores data in tables of rows and columns and you ask it questions in a language called SQL. It shows up in a large share of job postings, which is why several modules here are built on it.
:::
