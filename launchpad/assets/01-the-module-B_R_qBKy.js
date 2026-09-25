var e=`---
id: m26-the-module
title: "Third-Party Integration as a Consumer — what to understand and what to build"
minutes: 1
covers:
  - "OAuth as a consumer: state, PKCE, open redirect"
  - "The consent surface: connect, callback, connections screen, re-consent"
  - "Encrypted per-tenant credential storage and envelope encryption"
  - "Token refresh on the provider’s schedule"
  - "Scope upgrades forcing every existing user to re-consent"
  - "Revocation surfacing as a 401 in a background job at 3am"
---
**The consent surface is part of this module, not someone else’s.** A revocation path that *re-prompts
the user* is UI work, and this module comes after the frontend module — so the connect button, the
callback route, the connections screen, the re-consent flow, and the in-chat degraded state are owned
here, with hours.

**Also: the OAuth callback is the one place CSRF actually matters** — \`state\`, PKCE, open redirect — and
M21 teaches CSRF five modules earlier, before any OAuth exists. This is where the OAuth spiral lands.

**Core concepts:** OAuth as a consumer: \`state\`, PKCE, open redirect. The consent surface: connect,
callback, connections screen, re-consent. Encrypted per-tenant credential storage and envelope
encryption. Token refresh on the provider’s schedule. Scope upgrades forcing every existing user to
re-consent. Revocation surfacing as a 401 in a background job at 3am.

**Checkpoints** ① one provider connected end to end, with the token exchange working · ② the grant
revoked mid-run and the app degrading honestly instead of crashing · ③ the connections screen, and the
scopes you asked for written down with why.

**Artifact** \`EVIDENCE\` — a real OAuth connection in the flagship, **including the consent surface**:
- **Connect and callback routes with \`state\` and PKCE, verified by a written attack attempt.**
- A connections settings screen, and a **scope-upgrade re-consent path actually exercised** (scopes
  granted for v1 are insufficient for v2, so every existing user must re-consent).
- An **in-chat degraded state** when the connection is broken.
- **Envelope encryption with a per-row key reference**, a stated location for the master key per
  environment, and a written key-rotation procedure. ("Encrypted per-tenant storage" without saying
  where the key lives or how it rotates is not a design.)
- Automatic refresh, and a revocation-recovery path that re-prompts rather than failing silently.
`;export{e as default};