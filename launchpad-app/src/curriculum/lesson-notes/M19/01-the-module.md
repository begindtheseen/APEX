<!-- Context notes for M19/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[wire-format level|wire-format]] 2
[[compaction|compaction]] 2
[[Human-in-the-loop|human-in-the-loop]] 2
[[MCP|mcp]] 2
[[blast radius|blast-radius]] 1
[[RFC1918 address|rfc1918]] 1
[[A cloud metadata service|metadata-service]] 1
[[SSRF|ssrf]] 1

::: context wire-format The raw messages, with nothing in between
The "wire format" is the exact data that travels over the network: here, the JSON your code sends to the model's API and the JSON that comes back. Frameworks such as LangChain wrap that in friendlier functions, which hides what is really being sent.

Working at the wire level first means that when something breaks later, you can read the actual request and see the problem, instead of guessing what the framework did for you.
:::

::: context compaction When the conversation outgrows the window
A model can only read a limited amount of text per request, its **context window**, measured in tokens. A long agent run (many tool calls, many results) eventually fills it, and cost rises with every token you resend.

**Compaction** replaces the older part of the conversation with a written summary, like handing a colleague your notes instead of the whole meeting recording. It saves space, but details the summary left out are gone for good, which is why it is sometimes the wrong answer.
:::

::: context human-in-the-loop A person approves before it happens
Human-in-the-loop means the system pauses and asks a person to approve before a certain step runs. It is reserved for actions that cannot be undone: sending an email, paying money, deleting records, deploying code.

Reading a file can be retried freely; a sent email cannot be unsent. Your coding assistant asking "run this command?" before touching your machine is the same idea.
:::

::: context mcp The Model Context Protocol
MCP, the **Model Context Protocol**, is an open standard Anthropic introduced in late 2024 for connecting AI applications to tools and data. A service writes one MCP server (say, for its calendar or its database) and any MCP-aware app can use it, instead of every app writing its own custom integration.

Think of it like a USB port for AI tools: one agreed-upon plug shape. Because the standard is still evolving, which version you built against matters.
:::

::: context blast-radius How much can one mistake break?
Blast radius is how much damage one failure can do before something stops it. A bug that can only touch one user's draft has a small blast radius; a leaked admin key that can reach every database has a huge one.

For an agent, the question is: if the model is tricked into doing the worst thing its tools allow, what is the worst case? Containment means that worst case is limited by hard walls (a sandbox, an allowlist of domains it may call, a folder it cannot leave), not by the model choosing to behave.
:::

::: context rfc1918 Private network addresses
RFC 1918 is the internet standard that set aside three blocks of IP addresses for private networks: those starting with `10.`, `172.16.` to `172.31.`, and `192.168.`. Your home router almost certainly hands out `192.168.` addresses.

These addresses are unreachable from the public internet, so the services living on them (databases, admin panels) often have weak or no passwords. An agent that fetches any URL it is given could be steered to one of them from inside.
:::

::: context metadata-service The cloud server that tells a machine who it is
Cloud providers run a special address, `169.254.169.254`, that any virtual machine can reach to learn about itself, including, on many setups, **temporary credentials** for the cloud account. That makes it the classic target when attackers get a server to fetch a URL for them.

Newer versions guard it: AWS's IMDSv2 requires first requesting a session token, and Google Cloud requires a special header. So a refused request there may be the cloud's protection, not your code's.
:::

::: context ssrf Server-side request forgery
SSRF happens when an attacker gets **your server** to make a web request on their behalf. Your server sits inside your network, so it can reach places the attacker cannot.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" font-family="Inter, Arial, sans-serif">
  <rect x="10" y="50" width="80" height="40" rx="6" fill="#fff" stroke="#b4232c" stroke-width="2"/>
  <text x="50" y="74" font-size="12" text-anchor="middle" fill="#b4232c">attacker</text>
  <rect x="120" y="10" width="230" height="130" rx="8" fill="#fff" stroke="#6c7a93" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="235" y="28" font-size="11" text-anchor="middle" fill="#6c7a93">your network</text>
  <rect x="140" y="50" width="80" height="40" rx="6" fill="#8fb8f0" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="180" y="74" font-size="12" text-anchor="middle" fill="#1f2a44">agent</text>
  <rect x="250" y="42" width="90" height="24" rx="4" fill="#f2b880" stroke="#1f2a44"/>
  <text x="295" y="58" font-size="11" text-anchor="middle" fill="#1f2a44">metadata</text>
  <rect x="250" y="78" width="90" height="24" rx="4" fill="#f2b880" stroke="#1f2a44"/>
  <text x="295" y="94" font-size="11" text-anchor="middle" fill="#1f2a44">private DB</text>
  <line x1="90" y1="70" x2="136" y2="70" stroke="#b4232c" stroke-width="2"/>
  <polygon points="140,70 130,65 130,75" fill="#b4232c"/>
  <line x1="220" y1="66" x2="246" y2="56" stroke="#b4232c" stroke-width="2"/>
  <line x1="220" y1="74" x2="246" y2="88" stroke="#b4232c" stroke-width="2"/>
  <text x="235" y="128" font-size="11" text-anchor="middle" fill="#1f2a44">"summarise http://10.0.0.5/admin"</text>
</svg>
```

An agent with a fetch tool is a ready-made SSRF machine: a malicious web page or document only has to ask it to fetch an internal address. The fix is a network boundary the agent cannot talk its way past.
:::
