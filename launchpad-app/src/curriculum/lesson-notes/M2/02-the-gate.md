<!-- Context notes for M2/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[The spend limit is set|spend-limit]] 1
[[a request deleted on demand|delete-on-request]] 1

::: context spend-limit What a spend limit does
Model services let you cap how much an account can spend in a month. Once the cap is reached, further calls are refused instead of billed. The app stops answering, which is annoying — and far better than waking up to a bill because someone found your URL and scripted a few hundred thousand requests.
:::

::: context delete-on-request Why deletion on request matters
Your log holds what people typed, and people type personal things. Privacy laws in many places — Europe's GDPR and California's privacy law among them — give people the right to ask a company to delete data about them. Building the habit now, at the scale of two users, is far easier than adding it to a system that already holds data from thousands.
:::
