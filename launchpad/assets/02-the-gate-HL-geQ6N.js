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
**GATE** — **REFEREE:** the provider’s own API. **You revoke the grant yourself**, from the provider’s
settings screen, while a background job is running; your reviewer watches the alert fire and reads the
log. **Nobody but you touches that account** — a reviewer cannot revoke a grant on an account they do not
own, and handing them your provider credentials to arrange it is a worse idea than the gate is worth.
**PASS:** revoke during a background job and assert the job **alerts** rather than failing silently;
demonstrate the scope-upgrade re-consent; the CSRF attempt against your callback fails. **ON FAIL:** the
401 surfaces as a generic error, or the \`state\` parameter is decorative.

> The gate is not *"draw the token lifecycle"* — a drawing is strictly weaker than the artifact above it.

**Most-missed:** Storing tokens encrypted without saying where the master key lives or how it rotates.
· Treating the \`state\` parameter as decorative. The OAuth callback is the one place CSRF actually
matters. · A revocation path that fails silently instead of re-prompting. · Assuming scopes granted for
v1 cover v2.
`;export{e as default};