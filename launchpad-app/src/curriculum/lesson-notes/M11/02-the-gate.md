<!-- Context notes for M11/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Making the bucket public|public-bucket]] 1
[[XSS, CSRF or SSRF|web-attacks]] 1

::: context public-bucket Why a public bucket is so dangerous
Storage buckets accidentally left open to the whole internet are one of the most common causes of real data leaks; there are tools that scan the internet for them. Nothing looks broken: the app works, the uploads work. The only sign is that anyone who guesses or finds a file's address can download it.
:::

::: context web-attacks Three classic web attacks
**XSS** (cross-site scripting): an attacker gets their own script to run in other users' browsers on your site, usually by slipping it into content you display. **CSRF** (cross-site request forgery): another site tricks a signed-in user's browser into sending a request to your site. **SSRF** (server-side request forgery): an attacker makes *your server* fetch an address of their choosing, often one inside your private network. A public bucket is none of these, so tests for them will not find it.
:::
