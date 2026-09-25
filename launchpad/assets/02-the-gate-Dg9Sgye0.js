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
  - "Exactly enough Docker and Linux, and not one hour more"
  - "Consumer contracts — compatibility for callers you cannot redeploy"
---
**GATE** — **REFEREE:** your reviewer, holding a timer driven by the monitoring and reading the load
generator’s error count. **PASS:** roll back a bad deploy in under five minutes while narrating; run the
migration under load with zero failed requests; explain with a **specific lock type** why a naive
migration takes a site down and why yours does not; **name every consumer of one flagship endpoint and
how you would discover one you did not know about from production logs alone.** **ON FAIL:** the
migration dropped requests — expand/contract was not actually expand/contract.

**Most-missed:** \`git revert\` as the rollback strategy — a full rebuild while the site is broken, and it
does nothing about the schema change or the rows the bad version already wrote. · Migrations at application
boot, so every instance races. · Assuming the public-bundle env prefix means "for the frontend" rather than
"baked into the public bundle, forever, at build time." · Production secrets in preview environments, where
any PR can exfiltrate them. · One \`/health\` for both liveness and readiness. · The Kubernetes rabbit hole
after Docker clicks. · Leaving the practice cloud stack running.
`;export{e as default};