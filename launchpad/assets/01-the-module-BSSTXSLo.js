var e=`---
id: m23-the-module
title: "Deployment, CI/CD, and Operating It — what to understand and what to build"
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
**Core concepts:** Environments and configuration as a first-class thing. Secrets across environments;
short-lived credentials over stored keys. A CI pipeline you own — what gates a merge and what it costs.
**Deploy is not release** — preview deploys, promote, instant rollback, feature flags. **Expand/contract
migrations in the pipeline** (here rather than in M5, because here there is a pipeline to run them through).
Health checks, SLOs, alerting that pages a human only when it should. **Exactly enough Docker and Linux,
and not one hour more** (Appendix A says what enough is). **Consumer contracts** — compatibility for
callers you cannot redeploy.

**Checkpoints** ① environments and config: a missing var fails the deploy, not a 2am route · ② CI green
as a required check, with the eval tier wired in · ③ a feature-flagged release you can turn off without a
deploy · ④ a rollback rehearsed under a timer, measured from the dashboard · ⑤ expand/contract run through
the pipeline under live load, zero failed requests · ⑥ one dockerized cloud deploy with an IAM role you
wrote, torn down same day.

**Artifact** \`EVIDENCE\` — the flagship’s full pipeline: OIDC secrets with no stored keys (**the model
API key is the one documented exception, scoped and spend-capped; a second exception is added if M26 is
already built**); required checks **including M12’s eval gate**; a feature-flagged release; a rollback rehearsed
under a timer **measured from the dashboard, not a stopwatch**; an expand/contract migration run through
the pipeline **while M5’s load generator is firing**, with zero failed requests; one burn-rate alert that
fired for a real reason. Plus one dockerized cloud deploy **with an IAM role you wrote and can explain**,
torn down the same day.

> **Roll back when you suspect your change caused the problem.** Waiting for proof is how a five-minute
> rollback becomes an hour of debugging in production.
`;export{e as default};