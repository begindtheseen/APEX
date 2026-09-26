var e=`---
id: m26-the-gate
title: "Third-Party Integration as a Consumer — the gate, and what most people miss"
minutes: 1
covers:
  - "OAuth as a consumer: state, PKCE, open redirect"
  - "The consent surface: connect, callback, connections screen, re-consent"
  - "Encrypted per-tenant credential storage and envelope encryption"
  - "Token refresh on the provider’s schedule"
  - "Scope upgrades forcing every existing user to re-consent"
  - "Revocation surfacing as a 401 in a background job at 3am"
---
**GATE** — **REFEREE:** the provider’s own API. **You [[revoke the grant|revoke-grant]] yourself**, from the provider’s
settings screen, while a background job is running; your reviewer watches the alert fire and reads the
log. **Nobody but you touches that account** — a reviewer cannot revoke a grant on an account they do not
own, and handing them your provider credentials to arrange it is a worse idea than the gate is worth.
**PASS:** revoke during a background job and assert the job **alerts** rather than failing silently;
demonstrate the scope-upgrade re-consent; the CSRF attempt against your callback fails. **ON FAIL:** the
401 surfaces as a generic error, or the \`state\` parameter is decorative.

> The gate is not *"draw the [[token lifecycle|token-lifecycle]]"* — a drawing is strictly weaker than the artifact above it.

**Most-missed:** Storing tokens encrypted without saying where the [[master key lives|master-key]] or how it rotates.
· Treating the \`state\` parameter as decorative. The OAuth callback is the one place CSRF actually
matters. · A revocation path that fails silently instead of re-prompting. · Assuming scopes granted for
v1 cover v2.

::: context revoke-grant Taking back access
A **grant** is the permission a user gave your app when they connected their account. Every major provider has a settings page (Google's is under "Third-party apps and services") where users can revoke it at any moment.

Your app gets no warning. The next API call simply fails, which is why the realistic test is revoking in the middle of a running job.
:::

::: context token-lifecycle Birth to death of a token
A token's lifecycle is every state it can be in: issued at connection, used, refreshed before it expires, upgraded when new scopes are granted, and finally revoked or expired for good.

A diagram of that is easy to draw. Code that handles each transition correctly, including the ugly ones at 3am, is the real test, which is why the gate asks for the working system instead.
:::

::: context master-key Where the key to the keys is kept
Encrypting tokens protects nothing if the key sits next to them, in the same database or in the code. The master key usually lives in a key-management service such as AWS KMS or Google Cloud KMS, which performs encryption on request and never hands the raw key out.

A real design says which service holds it in each environment, who may use it, and how you rotate it.
:::
`;export{e as default};