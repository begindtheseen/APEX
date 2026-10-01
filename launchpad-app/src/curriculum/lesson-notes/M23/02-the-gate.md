<!-- Context notes for M23/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[specific lock type|lock-type]] 1
[[preview environments|preview-env]] 1
[[liveness and readiness|liveness-readiness]] 1
[[Kubernetes|kubernetes]] 2

::: context lock-type Why a schema change can freeze a site
Databases use locks so two operations do not trample each other. In PostgreSQL, most `ALTER TABLE` commands take an **ACCESS EXCLUSIVE** lock, which blocks every read and write on that table until it finishes.

Worse, while the change waits for its lock behind one slow query, every new query queues up behind it. A change that should take a millisecond can stall the whole site. Safe migrations keep each lock brief and set a lock timeout so they give up rather than pile up.
:::

::: context preview-env A temporary copy for each pull request
Many hosts, Vercel and Netlify among them, build a **preview** deployment for every pull request, with its own URL, so reviewers can click through the change before it merges.

Anyone who can open a pull request can change the code that runs there. Giving previews the real production secrets means any pull request could read them. Previews should get separate, low-value credentials.
:::

::: context liveness-readiness Alive versus ready
A **liveness** check asks "is this process stuck?" and, if it fails, the platform restarts it. A **readiness** check asks "can this instance take traffic right now?" and, if it fails, traffic is routed elsewhere until it recovers.

Use one endpoint for both and include a database check, and a brief database hiccup makes every instance fail liveness at once, so the platform restarts them all and turns a blip into an outage.
:::

::: context kubernetes The system for running many containers
Kubernetes (often "K8s") is an open-source system for running and scaling containers across many machines: you declare what should run, and controllers keep reality matching it. Most large backend and AI-infrastructure teams run on it.

It is also a huge topic. The bar here is one workload run, scaled and debugged: a Deployment and a Service, config and a secret, separate readiness and liveness probes, requests and limits, an autoscaler, and a broken rollout read from its events. Operators, service meshes and the certification can wait until a job asks for them.
:::
