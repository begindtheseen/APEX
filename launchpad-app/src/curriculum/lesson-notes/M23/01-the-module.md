<!-- Context notes for M23/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Deploy is not release|deploy-vs-release]] 2
[[feature flags|feature-flag]] 2
[[Expand/contract|expand-contract]] 2
[[SLOs|slo]] 2
[[pages a human|paging]] 2
[[Docker|docker]] 2
[[IAM role|iam-role]] 1
[[OIDC|oidc]] 1

::: context deploy-vs-release Shipping code versus switching it on
**Deploying** puts new code on the servers. **Releasing** lets users actually reach the new behaviour. Keeping them separate means you can deploy on Tuesday afternoon with the new feature hidden, then release it on Wednesday to 5% of users, then everyone.

It turns a risky big moment into several small, reversible ones. If something looks wrong, you switch the feature off; you do not have to rush out another deploy.
:::

::: context feature-flag A switch in the code
A feature flag is an if-statement whose answer lives outside the code: "if the new-search flag is on for this user, show new search". The flag is flipped in a dashboard or a config table, with no deploy.

Teams use flags to release gradually, to let staff try features first, and as a kill switch when something breaks. Old flags should be removed once a feature is fully launched, or the code fills up with dead branches.
:::

::: context expand-contract Changing a database without downtime
You cannot change a database column and all the code using it at the same instant, because old and new versions of the app run side by side during a deploy. Expand/contract splits the change into safe steps:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 110" font-family="Inter, Arial, sans-serif">
  <rect x="8" y="20" width="104" height="50" rx="6" fill="#8fb8f0" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="60" y="41" font-size="12" text-anchor="middle" fill="#1f2a44" font-weight="700">1. Expand</text>
  <text x="60" y="58" font-size="11" text-anchor="middle" fill="#1f2a44">add new column</text>
  <rect x="128" y="20" width="104" height="50" rx="6" fill="#fff" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="180" y="41" font-size="12" text-anchor="middle" fill="#1f2a44" font-weight="700">2. Migrate</text>
  <text x="180" y="58" font-size="11" text-anchor="middle" fill="#1f2a44">write both, backfill</text>
  <rect x="248" y="20" width="104" height="50" rx="6" fill="#f2b880" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="300" y="41" font-size="12" text-anchor="middle" fill="#1f2a44" font-weight="700">3. Contract</text>
  <text x="300" y="58" font-size="11" text-anchor="middle" fill="#1f2a44">drop old column</text>
  <line x1="112" y1="45" x2="124" y2="45" stroke="#1f2a44" stroke-width="2"/>
  <line x1="232" y1="45" x2="244" y2="45" stroke="#1f2a44" stroke-width="2"/>
  <text x="180" y="96" font-size="11" text-anchor="middle" fill="#6c7a93">one deploy per step; old and new code both keep working</text>
</svg>
```

Between steps, the app switches its reads to the new column. At no point does running code depend on something that is not there yet or already gone.
:::

::: context slo A reliability target with a budget
An SLO, a **service level objective**, is a target like "99.9% of requests succeed over 30 days". The leftover 0.1% is the **error budget**: about 43 minutes of total outage in 30 days.

Alerting on budget is calmer than alerting on every error. A **burn-rate** alert fires when you are spending the budget much faster than the target allows, which tells you something is genuinely wrong rather than one request failing.
:::

::: context paging Being paged and being on call
To "page" someone is to send an alert that interrupts them, a phone notification through a tool like PagerDuty, even at 3am. The name comes from the pagers doctors and engineers used to carry.

Engineers take turns being **on call**, the person who gets paged for a week. Pages should be rare and always mean "act now". Noisy alerts teach people to ignore them, and then the real one gets missed.
:::

::: context docker Packaging an app with everything it needs
Docker packages an application together with its operating-system libraries, language runtime and dependencies into an **image**. Running that image gives a **container**: an isolated process that behaves the same on your laptop, in CI and on a cloud server.

It ends the "works on my machine" problem. For this program you need to write a Dockerfile, build, run and debug a container, not run a fleet of them.
:::

::: context iam-role A set of permissions a service can take on
IAM, **identity and access management**, is how cloud providers control who may do what. A **role** is a named bundle of permissions, such as "may read this one storage bucket", that a server or CI job assumes while it works.

The goal is **least privilege**: grant exactly what the job needs and nothing more. Being able to explain each permission in your role is a common interview question for backend roles.
:::

::: context oidc Logging in without a stored password
OIDC, **OpenID Connect**, is a standard way for one system to prove its identity to another. GitHub Actions, for example, can hand your cloud provider a signed token saying "I am the deploy job in this repository, on the main branch".

The cloud checks the token and hands back **temporary** credentials that expire soon after. No long-lived secret key sits in your CI settings waiting to leak.
:::
