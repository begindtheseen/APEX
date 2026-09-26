<!-- Context notes for M7/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[TCP|tcp]] 1
[[localhost|localhost]] 1
[[health check|health-check]] 1

::: context tcp TCP does not keep your pieces
**TCP** is the layer underneath HTTP that delivers bytes reliably and in order. It does *not* promise to deliver them in the pieces you sent. One message may arrive split across two chunks, or two messages may arrive glued together. Code that assumes each chunk is one complete line works until the network decides otherwise.
:::

::: context localhost Why localhost hides bugs
**localhost** means your own machine, acting as both client and server. Nothing crosses a real network, so data tends to arrive fast and in large, whole pieces. Bugs that depend on slow links, split chunks or dropped connections simply do not happen there, which is why "it works on my machine" proves so little.
:::

::: context health-check What a health check is
Hosting platforms and monitoring tools regularly call a small address on your app, such as `/health`, and read the status code. A 200 means "healthy, keep sending traffic"; an error means "take this copy out or wake someone up." Answering 200 with an error hidden in the body tells every one of those tools that all is well.
:::
