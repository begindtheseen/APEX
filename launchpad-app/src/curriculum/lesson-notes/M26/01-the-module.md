<!-- Context notes for M26/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[PKCE|pkce]] 2
[[open redirect|open-redirect]] 2
[[OAuth as a consumer|oauth]] 2
[[Token refresh|token-refresh]] 2
[[Scope upgrades|scope-upgrade]] 2
[[a 401|http-401]] 2
[[Envelope encryption|envelope-encryption]] 1

::: context pkce Proof that you started the login
PKCE (Proof Key for Code Exchange, pronounced "pixie") is an OAuth safety step. At the start of login your app makes a random secret and sends only a scrambled version (a hash) of it. When it later swaps the one-time code for a token, it must show the original secret.

Someone who somehow grabbed the code in between cannot use it, because they never had the secret. It is now recommended for essentially every OAuth app.
:::

::: context open-redirect A redirect that goes anywhere
Many login flows end by sending the user back to a page named in the URL, like `?next=/settings`. If the app will redirect to **any** address given there, including other websites, it has an open redirect.

That lets a malicious link borrow your trusted domain name, and in OAuth it can leak sensitive codes. The fix is simple: only redirect to your own paths, or to a short list of allowed addresses.
:::

::: context oauth Letting an app act for you without your password
OAuth is the standard behind "Connect your Google account". Instead of giving an app your password, you log in with Google itself, see what the app is asking for, and approve. Google then gives the app a **token**: a key that works only for what you approved, and that you can revoke at any time.

"As a consumer" means your app is the one asking for access to someone else's service, not the one issuing tokens.
:::

::: context token-refresh Short-lived keys and how to renew them
OAuth usually hands out two tokens. The **access token** is used on every API call and expires quickly, often after about an hour. The **refresh token** lasts longer and is used only to get a fresh access token.

Short lives limit the damage if an access token leaks. Your app must renew on time, and handle the day the refresh itself fails because the user disconnected the app.
:::

::: context scope-upgrade Asking for more permission later
A **scope** is one permission an OAuth app requests, such as "read your calendar" or "create calendar events". Users approve a specific set when they connect.

If version 2 of your feature needs a scope version 1 never asked for, existing tokens simply do not have it. Every existing user has to go through the approval screen again, and your app must handle the ones who have not yet.
:::

::: context http-401 The server no longer accepts your credentials
HTTP status 401 ("Unauthorized") means the request's credentials are missing, expired or no longer valid. When a user revokes your app's access, the provider starts answering your calls with 401.

It differs from 403 ("Forbidden"), which means the server knows who you are and you still may not do this. A 401 in a background job needs a real response: stop retrying, mark the connection broken, and ask the user to reconnect.
:::

::: context envelope-encryption A key that locks other keys
With envelope encryption, each piece of data is encrypted with its own **data key**, and the data keys are themselves encrypted with one **master key** kept somewhere safer, usually a cloud key-management service.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" font-family="Inter, Arial, sans-serif">
  <rect x="130" y="8" width="100" height="34" rx="6" fill="#f2b880" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="180" y="30" font-size="12" text-anchor="middle" fill="#1f2a44">master key</text>
  <g stroke="#1f2a44" stroke-width="1.5">
    <line x1="160" y1="42" x2="60" y2="68"/><line x1="180" y1="42" x2="180" y2="68"/><line x1="200" y1="42" x2="300" y2="68"/>
  </g>
  <g fill="#8fb8f0" stroke="#1f2a44" stroke-width="1.5">
    <rect x="20" y="68" width="80" height="26" rx="4"/><rect x="140" y="68" width="80" height="26" rx="4"/><rect x="260" y="68" width="80" height="26" rx="4"/>
  </g>
  <g font-size="11" text-anchor="middle" fill="#1f2a44">
    <text x="60" y="85">data key A</text><text x="180" y="85">data key B</text><text x="300" y="85">data key C</text>
  </g>
  <g fill="#fff" stroke="#1f2a44" stroke-width="1.5">
    <rect x="20" y="104" width="80" height="26" rx="4"/><rect x="140" y="104" width="80" height="26" rx="4"/><rect x="260" y="104" width="80" height="26" rx="4"/>
  </g>
  <g font-size="11" text-anchor="middle" fill="#1f2a44">
    <text x="60" y="121">user 1 token</text><text x="180" y="121">user 2 token</text><text x="300" y="121">user 3 token</text>
  </g>
</svg>
```

Rotating the master key only means re-wrapping the small data keys, not re-encrypting every row, and a stolen database copy is useless without the master key.
:::
