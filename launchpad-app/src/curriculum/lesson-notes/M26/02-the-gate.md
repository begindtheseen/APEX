<!-- Context notes for M26/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[revoke the grant|revoke-grant]] 1
[[token lifecycle|token-lifecycle]] 1
[[master key lives|master-key]] 1

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
