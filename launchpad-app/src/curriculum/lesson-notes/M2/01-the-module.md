<!-- Context notes for M2/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Client and server|client-server]] 2
[[An API key as a secret|api-key]] 2
[[Environment variables|env-vars]] 2
[[Deployment|deployment]] 2
[[OAuth|oauth]] 1
[[CI/deploy pipeline|ci-pipeline]] 2
[[client bundle|client-bundle]] 1
[[the token counts the service reports|token-counts]] 1

::: context client-server Whose computer runs what
The **client** is the program on the user's side — usually their web browser, on their phone or laptop. The **server** is a computer you control that waits for requests and answers them. The rule that follows is simple and it never bends: anything sent to the client, the user can read and change. Secrets and checks that matter live on the server.
:::

::: context api-key An API key is a password that spends money
When your code calls a model service, it sends a long secret string — the API key — that says "bill this account." Anyone who has the key can make calls on your bill. Anything the browser downloads can be read by the person using it (the browser's developer tools show every file), so a key placed in front-end code is a key handed to every visitor.
:::

::: context env-vars What an environment variable is
A named value handed to a program when it starts, from outside the code — for example `ANTHROPIC_API_KEY`. In Node your code reads it as `process.env.ANTHROPIC_API_KEY`. On your laptop it might come from a local file that git is told to ignore; on Vercel you type it into the project's settings. Same code, different values in each place, and the secret never lands in your repository.
:::

::: context deployment What deploying means
**Deploying** is putting your code on a server that is always on and reachable at a public address, then starting it there. On Vercel it can be as short as pushing to GitHub: the service notices, builds the app and puts the new version live at a URL. Deploying early matters because the problems of a live app — real devices, slow networks, strangers — only show up once it is live.
:::

::: context oauth What OAuth is
OAuth is the standard behind buttons like "Sign in with Google" or "Connect your calendar." Instead of giving your app their password, the user is sent to the other service, approves a limited set of permissions, and your app receives a token that can do only those things — and that the user can revoke later. Getting it right has several fiddly steps, which is why it has its own module.
:::

::: context ci-pipeline What CI and a deploy pipeline are
**CI** stands for continuous integration: every time code is pushed, a server automatically installs it, builds it and runs the tests, and marks the change red or green. A **deploy pipeline** carries on from there, putting a green build live without anyone copying files by hand. GitHub Actions is a common place to set this up. Nearly every software job expects you to have worked with one.
:::

::: context client-bundle What the client bundle is
Before a web app goes live, a build step packs the code meant for the browser into a few files, often minified into dense, hard-to-read text. That package is the bundle, and every visitor downloads all of it. "Search the files the browser downloads" means opening those files and searching for the first few characters of your key. If it is there, it is public.
:::

::: context token-counts Why the token counts go in the log
Each reply from the model service reports how many tokens went in (your prompt) and how many came out (the answer). Those two numbers are what you are billed for, so logging them from the first request lets you work out what one user, one feature or one bad prompt costs — questions later modules will ask of this log.
:::
