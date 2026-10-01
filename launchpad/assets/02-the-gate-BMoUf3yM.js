var e=`---
id: m23-the-gate
title: "Deployment, CI/CD, and Operating It — the gate, and what most people miss"
minutes: 1
covers:
  - "Environments and configuration as a first-class thing"
  - "Secrets across environments; short-lived credentials over stored keys"
  - "A CI pipeline you own: what gates a merge and what it costs"
  - "Deploy is not release: preview, promote, instant rollback, feature flags"
  - "Expand/contract migrations inside the pipeline"
  - "Health checks, SLOs, alerting that pages a human only when it should"
  - "Exactly enough Docker and Linux, and enough Kubernetes to run, scale and debug one workload — not certification depth"
  - "A real public-cloud slice built from code: private networking, managed services, secrets, DNS and TLS, monitoring, least-privilege IAM"
  - "Consumer contracts — compatibility for callers you cannot redeploy"
---
**GATE** — **REFEREE:** your reviewer, holding a timer driven by the monitoring and reading the load
generator’s error count. **PASS:** roll back a bad deploy in under five minutes while narrating; run the
migration under load with zero failed requests; explain with a **[[specific lock type|lock-type]]** why a naive
migration takes a site down and why yours does not; **name every consumer of one flagship endpoint and
how you would discover one you did not know about from production logs alone.** **ON FAIL:** the
migration dropped requests — expand/contract was not actually expand/contract.

**Most-missed:** \`git revert\` as the rollback strategy — a full rebuild while the site is broken, and it
does nothing about the schema change or the rows the bad version already wrote. · Migrations at application
boot, so every instance races. · Assuming the public-bundle env prefix means "for the frontend" rather than
"baked into the public bundle, forever, at build time." · Production secrets in [[preview environments|preview-env]], where
any PR can exfiltrate them. · One \`/health\` for both [[liveness and readiness|liveness-readiness]]. · [[Kubernetes|kubernetes]] to certification
depth: one workload run, scaled and debugged is the bar. · Leaving the practice cloud stack running.

::: context lock-type Why a schema change can freeze a site
Databases use locks so two operations do not trample each other. In PostgreSQL, most \`ALTER TABLE\` commands take an **ACCESS EXCLUSIVE** lock, which blocks every read and write on that table until it finishes.

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
`;export{e as default};