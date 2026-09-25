var e=`---
id: m21-the-module
title: "Security and the Trust Boundary — what to understand and what to build"
minutes: 3
covers:
  - "Trust boundaries and secrets: what runs where"
  - "Authentication vs authorization; broken access control as the bug that actually ships"
  - "RLS as a design skill"
  - "Injection, XSS, CSRF, SSRF — by exploiting them yourself"
  - "Dependency and supply-chain risk"
  - "Prompt injection, direct and indirect: contained, not fixed"
  - "The lethal trifecta (Simon Willison’s framing, and say so when you use it): private data + untrusted content + exfiltration"
  - "Tool permission design and excessive agency"
  - "Treating model output as untrusted input"
  - "PII, log leakage, deletion, and the constraints you do not control"
---
**Core concepts:** Trust boundaries and secrets — what runs where. Authentication vs authorization;
**broken access control as the bug that actually ships.** RLS as a design skill. Injection, XSS, CSRF,
SSRF **at working depth, by exploiting them yourself.** Dependency and supply-chain risk. **Prompt
injection — direct and indirect — contained rather than fixed.** The lethal trifecta (**Simon Willison’s
framing, and say so when you use it**): private data + untrusted content + exfiltration. Tool permission design and excessive agency. **Treating model
output as untrusted input.** PII, log leakage, deletion, and the constraints you do not control.

**The constraints you do not control.** The constraints above are ones you author. On the job you are
handed the others: **approved-subprocessor lists** (adding a vendor is a legal action, not a technical
one), what a DPA does, **zero-data-retention configurations**, data residency, and security
questionnaires — which land on the engineer who built the feature. **The week-one move is asking whether
a vendor is approved before you write code against it.**

**Checkpoints** ① secrets audit: prove what actually ships to the browser by searching the files it
downloads · ② broken access control, exploited **on the deliberately vulnerable copy** then fixed ·
③ injection, XSS or SSRF: one landed, one fixed, one test — **SSRF targets are your own allowlisted test
hosts and private-network addresses on your own network, never a third party’s endpoint** · ④ cross-tenant
file access through a guessed or replayed URL, landed and fixed **on the vulnerable copy with synthetic
tenants — never against production, where the rows belong to real people** · ⑤ one exploit run through the
M19 fetch tool · ⑥ indirect prompt injection landed through
retrieved content · ⑦ tool permissions with a written blast-radius analysis · ⑧ the bidirectional
data-flow doc, with the delete path implemented and tested.

**Artifact** \`EVIDENCE\` — **every exploit in this module runs against your own deliberately vulnerable
copy of the flagship, on your own machine or your own account, and against nothing else. Running any of it
against a system you do not own is a crime in most countries and the end of the job search this program
exists for.** An attack-then-fix log against that copy: **five** exploits you ran yourself, each with
fix and test. Four are the standard set; **the fifth is
cross-tenant file access — reading another tenant’s uploaded file by guessing or replaying its URL** (a
misconfigured bucket is none of injection, XSS, CSRF, or SSRF — so the standard four cannot catch the leak
you are most likely to ship under time pressure). CSRF against the OAuth callback is M26’s own attack,
once there is a callback to attack. One of the five runs through M19’s agent fetch tool.

A tool-permission design for M19’s agent with blast-radius analysis.

**A bidirectional data-flow document** — not only what flows *in*. Every boundary
customer data crosses, every third party that sees it, the retention setting and jurisdiction at each,
**plus an implemented delete path** removing the user’s rows, objects, embeddings, and trace records; a
written list of what cannot be deleted and why; and a test asserting nothing survives in any store you
control. Plus the constraints you do not control: subprocessor lists, DPAs, zero-data-retention config,
residency.

> Once the flagship has real users their data lands in at least seven places built by different modules.
> Retention is something to *implement*, not merely a thing to name in a document.

> This reconciles a tension the curriculum creates on purpose: M10 and M12 teach you to log everything
> about a model call; this is where that meets not shipping customer PII to a third-party platform.
`;export{e as default};