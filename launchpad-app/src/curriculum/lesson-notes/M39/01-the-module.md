<!-- Context notes for M39/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[OAuth resource server|resource-server]] 2
[[well-known URL|well-known-url]] 1
[[the audience|audience]] 1
[[Token passthrough|token-passthrough]] 2
[[Dynamic Client Registration|dynamic-client-registration]] 2
[[pinned by hash|pinned-by-hash]] 1
[[lethal trifecta|lethal-trifecta]] 1
[[sampling, roots and logging|sampling-roots-logging]] 1
[[headless modes|headless]] 2

::: context resource-server The four roles in OAuth
OAuth splits the work among four parties. The **user** owns the data. The **client** is the app asking to act for them, here an MCP client such as a desktop assistant. The **authorization server** shows the login and consent screens and issues tokens. The **resource server** holds the data and accepts or refuses tokens.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" font-family="Inter, Arial, sans-serif">
  <rect x="10" y="55" width="90" height="36" rx="6" fill="#fff" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="55" y="77" font-size="12" text-anchor="middle" fill="#1f2a44">MCP client</text>
  <rect x="200" y="8" width="150" height="36" rx="6" fill="#e8eef8" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="275" y="24" font-size="11" text-anchor="middle" fill="#1f2a44">authorization server</text>
  <text x="275" y="38" font-size="11" text-anchor="middle" fill="#1f2a44">(identity provider)</text>
  <rect x="200" y="98" width="150" height="36" rx="6" fill="#8fb8f0" stroke="#1d6fd1" stroke-width="2"/>
  <text x="275" y="114" font-size="11" text-anchor="middle" fill="#1f2a44">resource server</text>
  <text x="275" y="128" font-size="11" text-anchor="middle" fill="#1f2a44">(your MCP server)</text>
  <line x1="100" y1="66" x2="196" y2="30" stroke="#1f2a44" stroke-width="1.5"/>
  <polygon points="198,29 188,29 191,37" fill="#1f2a44"/>
  <text x="130" y="36" font-size="11" fill="#1f2a44">1 get token</text>
  <line x1="100" y1="80" x2="196" y2="114" stroke="#1d6fd1" stroke-width="1.5"/>
  <polygon points="198,115 191,107 188,115" fill="#1d6fd1"/>
  <text x="110" y="120" font-size="11" fill="#1d6fd1">2 call with token</text>
</svg>
```

Your MCP server plays only the last role. It never sees a password; it checks each token it receives.
:::

::: context well-known-url A fixed address clients can guess
A **well-known URL** is a path under `/.well-known/` that a standard reserves for a particular purpose, so any client can find a site's settings without being told where to look. OpenID Connect providers, for example, publish their configuration at `/.well-known/openid-configuration`.

Here, an MCP client that knows only your server's address can fetch its Protected Resource Metadata from a known path, learn which authorization server to use, and start the login, with nobody configuring it by hand.
:::

::: context audience Who a token was issued for
Every access token records who it is meant for, its **audience**. When the MCP client asks for a token, it names your server's URL in the `resource` parameter, and the authorization server writes that into the token.

Checking the signature only proves the identity provider issued the token. Checking the audience proves it was issued **for you**. Skip the second check and a token the user granted to some other app on the same identity provider will work on your server too, which is exactly the confused-deputy hole the lesson describes.
:::

::: context token-passthrough Never hand the client's token onward
**Token passthrough** means your server takes the token the client sent it and forwards that same token to another API. It looks convenient and is forbidden by the MCP specification.

That token was minted for your server, so an upstream API that accepts it has skipped its own audience check. Its logs would also show the wrong party acting, and a single leaked token would open every service down the chain. Instead, your server gets its own token for the upstream API, per user, with only the scope that call needs.
:::

::: context dynamic-client-registration Letting any app sign itself up
Before an app can use OAuth with an authorization server, the server has to know it: a **client id**, allowed redirect addresses, a name to show on the consent screen. Traditionally a developer registers each app by hand.

**Dynamic Client Registration** lets an app register itself by sending that information to a registration endpoint and receiving a client id back. That suits MCP, where any client might meet any server, but the authorization server piles up registrations and cannot tell who a client really is. Client ID Metadata Documents address this: the client id is a URL on the client maker's own domain.
:::

::: context pinned-by-hash Noticing when a tool quietly changes
A **hash** (such as SHA-256) turns any text into a short fingerprint; change one character of the input and the fingerprint changes completely.

Pinning means that when a user approves a server's tools, you store the hash of each tool's full definition: name, description and input schema. Every time the tool list is fetched again, you hash it and compare. A mismatch means the text the model will read has changed since a person looked at it, so the tool is disabled until someone reviews and approves it again. Serialize each definition the same way every time, or harmless reordering will look like a change.
:::

::: context lethal-trifecta Three abilities that together leak data
The **lethal trifecta** is a name coined by the developer and writer Simon Willison for an agent that has all three of: access to **private data**, exposure to **untrusted content** (web pages, emails, rows other users wrote), and a way to **send data out** (web requests, email, even an image link).

With all three, one injected instruction can tell the agent to read the private data and send it to the attacker. Because no prompt reliably stops that, the dependable defense is structural: make sure no single run has all three, by removing whichever leg the task can do without.
:::

::: context sampling-roots-logging Three smaller MCP features
Besides tools, resources and prompts, the protocol defined features that run in the other direction, from server to client. **Sampling** lets a server ask the client's model to generate text, so the server can use a model without holding its own API key. **Roots** let the client tell a server which folders or locations it may work within. **Logging** lets a server send log messages for the client to display.

Whatever their current status in the revision you build against, tutorials written earlier may lean on them, which is why the lesson says to check.
:::

::: context headless Running an agent without anyone at the keyboard
A coding agent is usually used interactively: you type, it answers, it asks permission. A **headless mode** runs it from a single command instead, taking the task as an argument and printing the result as text or JSON, with no one watching.

That turns the agent into a building block: a step in a CI pipeline that reviews every pull request, a nightly job that triages new issues, a script that fixes failing lint rules. Since nobody is there to approve actions, the permission settings and hooks you configure beforehand are the only safety net.
:::
