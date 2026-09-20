// ============================================================
// APEX — AI Product Engineering curriculum (the Launch Pad)
// Companion data for AI_ENGINEERING_CURRICULUM.md, which holds the prose.
// This file holds the GRAPH: modules, hours, dependency edges, gates.
//
// Schema per module:
//   { id, layer, title, hours, dependsOn[], artifact, kind, gate{referee,pass,onFail},
//     owns[]?, exports[]?, trigger?, checkpoints[]? }
//
// `kind` is LAB or EVIDENCE. Only EVIDENCE artifacts are ever pinned to a portfolio.
// `dependsOn` is load-bearing: the LONGEST PATH, not the hour sum, sets the timeline.
// Run AI_CURRICULUM.validate() to check Rule 2 and compute the critical path.
// ============================================================

var AI_LAYERS = [
  { id: 0, name: 'The Contract',          purpose: 'Budget, runway, reviewer, flagship. Authority over everything else.' },
  { id: 1, name: 'The Machine',           purpose: 'The literal answer to "I need to understand code."' },
  { id: 2, name: 'The Craft I',           purpose: 'The substrate: queue, tests, observability, Python on-ramp.' },
  { id: 3, name: 'The AI Production Core',purpose: 'The differentiator. Gated behind observability, not behind everything.' },
  { id: 4, name: 'The Craft II',          purpose: 'Ramp and collaboration. Learned while interviewing.' },
  { id: 5, name: 'The AI Layer, Completed', purpose: 'Retrieval, agents, cost, security.' },
  { id: 6, name: 'Product and Platform',  purpose: 'The surfaces the AI work ships through.' },
  { id: 7, name: 'The Market',            purpose: 'Scheduled by TRIGGER, not by position.' },
  { id: 8, name: 'Employed Mode',         purpose: 'Hire-before-completion is the modal good outcome.' }
];

// Concepts with exactly ONE owning module. Consumed everywhere after, never re-taught.
var AI_OWNED_CONCEPTS = {
  'trust boundary':  'M1',
  'streaming':       'M3',
  'idempotency':     'M3',
  'durable queue':   'M5',
  'observability':   'M7',
  'evals':           'M11',
  'cost':            'M18'
};

// Deliberately taught twice at different depths. NOT violations — do not "fix" these.
var AI_SPIRAL_PAIRS = [
  ['M7', 'M11', 'observability'],
  ['M2', 'M4',  'pooling and isolation'],
  ['M6', 'M11', 'CI'], ['M11', 'M22', 'CI'],
  ['M3', 'M24', 'OAuth']
];

var AI_CURRICULUM = [

// ─────────────── LAYER 0 · THE CONTRACT ───────────────
{ id:'M0', layer:0, hours:22, dependsOn:[], kind:'LAB',
  title:'Scope, Runway, Reviewer, Flagship',
  artifact:'PLAN.md with 15 artifacts: runway + derived weekly hours, hour budget, application date, 20-posting funnel teardown (each tagged W2/1099), the Python trip-wire as a number, the flagship spec checklist, a dated traffic milestone, day-one model-call logging, three reviewer recruitments with an acceptance test, a cold baseline scored as a FRACTION, a capability inventory, a running incident log, a 20-commit blind-exercise queue, a hardware smoke test, and defined bad-week/plateau/re-entry rules.',
  gate:{ referee:'Reviewer trial review returned in writing; flagship checklist signed line by line; hardware smoke test passes on all four stacks.',
         pass:'All 15 artifacts exist. Cold baseline is a fraction. State from memory: weekly hours, runway, application date, Python trip-wire number.',
         onFail:'M1 does not start. No partial credit on this one.' } },

// ─────────────── LAYER 1 · THE MACHINE ───────────────
{ id:'M1', layer:1, hours:67, dependsOn:['M0'], kind:'LAB', owns:['trust boundary'],
  title:'The Runtime, Unframed',
  artifact:'runtime-lab: 8 programs under plain node --test. MiniPromise from scratch. A harness reproducing all four concurrency failure modes then fixing each. A Zod boundary rejecting hostile LLM JSON that `as` accepted. A typed error taxonomy with cause chaining and a retry-safety rule per class.',
  exports:['the estimate log starts here and runs to month 12'],
  gate:{ referee:'Screen recording, watched back.',
         pass:'Narrate unprompted why setTimeout(fn,0) runs after a resolved .then(). Convert a real `as`-cast of model JSON from your own shipped code into a parsed boundary and name the production bug it prevents.',
         onFail:'Rebuild the concurrency harness from empty. Re-attempt in 7 days.' } },

{ id:'M2', layer:1, hours:45, dependsOn:['M1'], kind:'LAB',
  title:'The Machine Model: Ten Seams',
  artifact:'seams: ten reproductions, each a failing script + fix + proving test. Leak proved with a heap snapshot; money wrong by a cent; UTF-8 grapheme split across streamed chunks; pool exhausted under load; lost update in Postgres; four-timezone digest scheduler with an injected fake clock pinned across spring-forward and fall-back.',
  exports:['fake clock -> M6'],
  gate:{ referee:'Reviewer picks which of the ten, without telling you.',
         pass:'Name the seam and the instrument within 60 seconds, 8 of 10. Then point at the wrong-typed columns in your own shipped schema.',
         onFail:'Rewrite the three you missed from empty. Re-attempt in 7 days.' } },

{ id:'M3', layer:1, hours:45, dependsOn:['M1','M2'], kind:'EVIDENCE', owns:['streaming','idempotency'],
  title:'HTTP, Streaming, and the Wire',
  artifact:'THE streaming LLM proxy. Raw fetch, raw ReadableStream, hand-parsed SSE frames, no SDK. AbortController end to end. Postgres idempotency-key dedupe table. Deliberately reproduces proxy buffering and a mid-stream error, and recovers from both. Budget the useChat wire-format join here — it is not free.',
  exports:['SSE transport -> M17, M20','idempotency table -> M5, M18, M21'],
  gate:{ referee:'Server logs and a database row count. Both are external facts.',
         pass:'Kill the client mid-generation, show from logs that upstream billing stopped. Replay one idempotency key twice, show exactly one row. Narrate what arrives on the wire between first byte and first rendered token.',
         onFail:'Rebuild the frame parser against a deliberately chunk-split fixture.' } },

{ id:'M4', layer:1, hours:61, dependsOn:['M2'], kind:'LAB',
  title:'The Postgres Underneath Supabase',
  checkpoints:['the 3-hour win','the rig built and seeded','twelve queries with before/after plans','RLS benchmarked','the key rotation'],
  artifact:'pg-lab against a local Supabase stack. OPEN WITH A 3-HOUR WIN: 50k rows, one slow query, one EXPLAIN, one index, one measured 200x speedup. Then the 5M-row rig: twelve hand-written queries with plans before and after, a slow->fast loop with wall-clock numbers from a load generator you wrote, an RLS policy set benchmarked correct-but-slow vs fast, and the legacy-key rotation as an artifact. Plus asymptotic complexity, taught here because here it is measurable.',
  exports:['load generator -> M22'],
  gate:{ referee:'An EXPLAIN plan you have never seen — from the reviewer or an OSS slow-query log.',
         pass:'Name the fix before reading the query, 3 of 4. Explain why your own deployed app exhausted connections and show the pooled fix under the same load.',
         onFail:'Re-run the slow->fast loop on three new queries.' } },

// ─────────────── LAYER 2 · THE CRAFT I ───────────────
{ id:'M5', layer:2, hours:18, dependsOn:['M3','M4'], kind:'EVIDENCE', owns:['durable queue'],
  title:'The Durable Queue',
  artifact:'A Postgres-backed durable job queue: SELECT ... FOR UPDATE SKIP LOCKED, at-least-once delivery, idempotent consumers reusing M3 dedupe, backpressure, dead-letter path, and a read path.',
  exports:['-> M10 ingestion job, M12 backfill, M16 re-embedding, M17 agent state, M18 webhooks'],
  gate:{ referee:'A kill signal at a random time, and a row count.',
         pass:'Kill a worker mid-job. Zero double-processing and zero lost jobs across 1,000 enqueued items.',
         onFail:'The consumer is not idempotent. Fix and re-run.' } },

{ id:'M6', layer:2, hours:32, dependsOn:['M1','M4'], kind:'LAB',
  title:'Tests That Fail For The Right Reason',
  artifact:'One shipped repo from zero tests to a green required check: ~15 unit, 5 integration against real local Postgres including two RLS policies, CI as a merge gate, a written flakiness budget. PLUS the most reused fixture in the curriculum: a record-replay model client in TypeScript covering a stream with frames split mid-frame and mid-multibyte-character, a tool-use block, and a refusal with stop_details.',
  exports:['record-replay model client -> M11 (zero-cost CI tier), M17, M20'],
  gate:{ referee:'A mutation score — a number you cannot argue with — plus bug reports sourced from already-closed OSS issues.',
         pass:'Mutation score >= 70% with a written disposition for every surviving mutant. On a sourced bug: failing test first, then fix, explaining why the test would still fail if the fix were wrong in a different way.',
         onFail:'Surviving mutants in code you claimed was covered. The tests assert implementation, not behavior.' } },

{ id:'M7', layer:2, hours:45, dependsOn:['M3','M4','M6'], kind:'EVIDENCE', owns:['observability'],
  title:'Debugging and Production Observability',
  artifact:'The flagship instrumented end to end, upgrading M0 day-one logging: structured logs with correlation IDs and redaction, OTel spans including the model call (GenAI semantic conventions, not names you invented), error tracking, a silent-failure detector for wrong-but-200 output, a written sampling decision and retention window per store. A runbook for three failure modes executed by another person during a scripted game day, plus a blameless postmortem of an outage you caused during it.',
  exports:['model-call span schema -> M18 queries it rather than re-deriving'],
  gate:{ referee:'A fault-injection script firing at a RANDOM time in a seven-day window, logging its timestamp to a file you do not read.',
         pass:'Time-to-detection under 24h from instrumentation alone. Separately: given one trace ID, reconstruct the whole request out loud. Time-to-mitigate scored separately from time-to-root-cause — diagnosing before mitigating is a failing result.',
         onFail:'The detector does not cover that failure class. Add it, re-arm the window.' } },

{ id:'M8', layer:2, hours:15, dependsOn:['M6'], kind:'LAB',
  title:'Python On-Ramp',
  artifact:'Current tooling (uv, ruff, one pinned type checker — stated shelf life). Python semantics where they differ from TS. pytest. Type hints with a checker in CI. pydantic as the validation boundary. One typed FastAPI route with a test.',
  gate:{ referee:'A timer, and a Python-fluent maintainer via a routed Track 2 PR.',
         pass:'Add a typed route + test to a Python service you did not write, in 90 minutes.',
         onFail:'The idiom is wrong. A passing test cannot catch this — that is why the referee is human.' } },

// ─────────────── LAYER 3 · THE AI PRODUCTION CORE ───────────────
{ id:'M9', layer:3, hours:30, dependsOn:['M3'], kind:'LAB',
  title:'The Model as a Function',
  artifact:'model-probe CLI: compare token counts against your assumptions across five text types; prove a cache hit from the usage meters and print the cost delta; produce EVERY stop_reason deliberately including a refusal, showing stop_details as the discriminator; demonstrate a structured-output schema rejecting a malformed generation; discover capabilities from the Models API rather than a hard-coded table. Plus a dead-patterns page with every 400 pasted in.',
  gate:{ referee:'Arithmetic against a real usage object.',
         pass:'Price a request to the cent from its usage object alone. Point at the exact byte that broke a cache prefix. Explain why a model-emitted confidence score is generated text, not a probability, and what feature designs that kills.',
         onFail:'Re-derive the pricing by hand from three more requests.' },
  currency:'HIGHEST decay rate in the curriculum. Verify against primary API docs the week you build it.' },

{ id:'M10', layer:3, hours:30, dependsOn:['M4','M5'], kind:'EVIDENCE',
  title:'Ingestion: Real Documents Into a Corpus',
  artifact:'A pipeline accepting a real signed-URL upload, handling a digital PDF, a scanned PDF and a .docx. CHARACTER-OFFSET provenance (not page-level — M16 needs spans). A private bucket with deny-by-default, scoped short-expiry signed URLs, server-side content-type and size validation, an orphan-cleanup job, a stated retention policy. Resumable on M5 queue. Scored against twenty hand-labeled documents, split dev/test at creation.',
  exports:['corpus + offsets -> M16','embedding dimensionality decision -> M16 (pgvector caps: vector 2000, halfvec 4000)'],
  gate:{ referee:'Your twenty hand-labeled documents. A number you cannot fudge.',
         pass:'State what percentage of tables your parser destroys, with evidence. Show a citation that highlights the exact span in the correct page of the correct source.',
         onFail:'Provenance is page-level. Rebuild to offsets before M16.' } },

{ id:'M11', layer:3, hours:70, dependsOn:['M7','M9'], kind:'EVIDENCE', owns:['evals'],
  title:'Evals: The One Harness, and the Stats Lab',
  checkpoints:['25 traces labeled + interim taxonomy','50 traces','75 traces','100 traces + final taxonomy','judge calibrated','CI tiers wired'],
  artifact:'ONE harness: Postgres + a TypeScript runner, no platform. 100 hand-read labeled traces in four sessions of 25. Named failure taxonomy with counts. Assertion graders. A judge with a measured confusion matrix. Inter-annotator agreement — the reviewer labels 30 using ONLY your written rubric; where you disagree the RUBRIC gets revised, not the labels. Dev/test split at creation. Tiered CI gate: ~15-case smoke on every push, full set nightly, recorded-fixture mode so graders cost $0, a per-run dollar ceiling in the job summary, fail condition as a statistical threshold with its bootstrap CI. Then a deliberate model-family migration gated only by your own eval set. Plus stats-lab.',
  exports:['dataset table, assertion graders, trajectory graders -> M16, M17, M22'],
  gate:{ referee:'A prompt change from the reviewer, scored against your HELD-OUT test set.',
         pass:'Ship/no-ship with a bootstrap CI. State judge TPR/TNR AND human-to-human agreement. Name the criterion that produced the most disagreement and how you rewrote it. Show a red check where this gate blocked a PR you actually wanted to merge.',
         onFail:'Your judge is uncalibrated. Re-label 30 traces and recompute.' },
  note:'A gate that has never fired is indistinguishable from one that is misconfigured.' },

// ─────────────── LAYER 4 · THE CRAFT II ───────────────
{ id:'M12', layer:4, hours:52, dependsOn:['M5','M6','M7'], kind:'EVIDENCE',
  title:'Reading and Changing Code You Did Not Write',
  artifact:'Four pieces. (1) A written end-to-end trace of one user action in a real repo with file:line at every hop, plus getting it running from a cold clone and writing the setup doc that was missing. (2) Characterization tests locking in an untested module including its bugs, then a behavior change behind a flag with both paths green. (3) A resumable backfill over 100k rows on M5 queue. (4) A dual-run cutover on a DETERMINISTIC feature — not an AI one; that is an eval and M11 owns it.',
  exports:['characterization tests -> M13'],
  gate:{ referee:'git revert a merged bug-fix commit from M0 blind queue. Score against the maintainer actual merged diff.',
         pass:'60 minutes, narrating, arrive at a fix matching the maintainer on behavior, 3 of 5 attempts. Then defend three things you thought were wrong and deliberately did not change.',
         onFail:'Pull the next commit from the queue in 7 days. Never read the fix commits.' } },

{ id:'M13', layer:4, hours:44, dependsOn:['M12'], kind:'EVIDENCE',
  title:'Git, Review, and Code Other People Maintain',
  artifact:'Four pieces to a real reviewer. A recovery-lab log of eight deliberate disasters. A file you have personally been confused by while editing, with 3+ responsibilities, chosen and justified in writing before you touch it, restructured behind M12 characterization tests with a line-item rationale per boundary moved. Every failure path in one feature rewritten to actionable messages. AND one PR through a full round trip with 15+ comments, 2+ pushed back on with reasoning, 1+ where you changed your mind and said so.',
  gate:{ referee:'A real maintainer review thread.',
         pass:'Three review rounds completed, every comment addressed or argued in writing, zero structural comments on the final round.',
         onFail:'The structural comments ARE the curriculum. Address and resubmit.' },
  note:'Gate on what you control. v1 gated on "merged", which conditions progress on a stranger inbox.' },

{ id:'M14', layer:4, hours:28, dependsOn:['M12','M13'], kind:'EVIDENCE',
  title:'Working With Coding Agents Professionally',
  artifact:'A defect log from handing an agent three real tickets in a repo you did not write, naming for each defect WHICH earlier module let you catch it. A one-page delegation policy. A spec-driven slice with a log of every place the spec was underspecified and what the agent did in the gap. AND a throughput artifact: one non-trivial flagship feature shipped in a timebox using agents, transcript preserved, measured against a similar feature written by hand (hours, review findings, defects reaching production).',
  gate:{ referee:'A second agent instance with a SEALED brief written weeks earlier. 0-3 defects per diff, count blinded, at least one clean diff.',
         pass:'Find the planted defects across five diffs, false positives scored separately. Plus a pre-commit hook enforcing your delegation policy that has actually blocked agent-authored diffs twice on real work.',
         onFail:'You are pattern-matching, not reviewing. Redo with a new sealed brief.' } },

{ id:'M15', layer:4, hours:29, dependsOn:['M12'], kind:'LAB',
  title:'Scoping, Estimating, and Someone Else’s Priorities',
  artifact:'Three scoping docs against real open issues. Build one, log actual-vs-estimate. PLUS an open-ended quality ticket ("the assistant is getting worse, find out why") delivered as a timeboxed plan with current number, target, ranked interventions by expected gain per hour, a hard 50% checkpoint with a stop-or-continue rule. PLUS a capability-question protocol practiced against the reviewer playing a PM instructed to push for a yes. PLUS one page: a written response to a product request that is NOT achievable as stated, with the achievable version and a measured number from your own eval set.',
  gate:{ referee:'A vague two-sentence ticket from the reviewer, cold, and the reviewer playing a PM who will not take no.',
         pass:'Clarifying questions and a sliced plan in 15 minutes. Defend what you would cut if the deadline halved. Report a result that missed its target, in writing, without apologizing and without asking for more time.',
         onFail:'More data points. The estimate log is a standing item from M1, not three points here.' } },

// ─────────────── LAYER 5 · THE AI LAYER, COMPLETED ───────────────
{ id:'M16', layer:5, hours:44, dependsOn:['M10','M11'], kind:'EVIDENCE',
  title:'Retrieval You Actually Measured',
  artifact:'Retrieval over M10 corpus, on M11 runner and tables. A measured recall@k baseline, then FIVE interventions measured independently: hybrid+RRF, reranker, contextual retrieval, A LONG-CONTEXT BASELINE (same queries, no retrieval), and an ITERATIVE/AGENTIC SEARCH ARM. Then span-level citation verification against M10 offsets. Embedding lifecycle: batched generation with rate-limit handling, measured cost per 1,000 chunks, a re-embed as a resumable backfill behind a dual-index read switch. Inherits M11 dev/test split.',
  gate:{ referee:'Your held-out test set, half hand-written.',
         pass:'State recall@10 before and after with the hnsw.iterative_scan setting NAMED and the dev-test gap stated. Name the intervention that did not help. Defend your routing rule between retrieval and long context using your own numbers.',
         onFail:'The golden set is LLM-generated, or you tuned on the set you reported. Hand-write 25, re-split, re-run.' } },

{ id:'M17', layer:5, hours:49, dependsOn:['M3','M5','M9','M11'], kind:'EVIDENCE',
  title:'Agents and Tool Use',
  artifact:'A hand-rolled agent loop with a hard-stopping budget governor, loop detection, an approval gate on irreversible actions, durable state on M5 queue, APPEND-ONLY thinking-block replay, replayable trajectory traces scored by M11 graders. CONTAINMENT as an enforced execution boundary: container/sandbox for code-shaped tools, domain allowlist for network-shaped, path prefix for filesystem-shaped, per-tool timeout and memory caps — demonstrated against a blocked host and 169.254.169.254. Then one MCP server against a NAMED spec revision. Then the same agent on the SDK tool runner with a written comparison.',
  gate:{ referee:'A kill signal at a random point, plus 200 adversarial inputs from a second agent with a red-team brief and no knowledge of your governor. Spend assertion lives in the test suite.',
         pass:'Resume correctly after a mid-run kill. Replay a failed trajectory and name the causing step. Cost ceiling holds across all 200. Blocked host and metadata endpoint both refused. Report step-level and outcome-level agent eval scores.',
         onFail:'The governor caps iterations but not spend. Fix and re-run.' },
  currency:'MCP shipped a breaking stateless rewrite in the 2026-07-28 revision. Pin your revision; every pre-August-2026 tutorial teaches the deprecated shape.' },

{ id:'M18', layer:5, hours:30, dependsOn:['M9','M11','M3'], kind:'EVIDENCE', owns:['cost'],
  title:'Cost, Metering, and Unit Economics',
  artifact:'A per-user credit ledger with an atomic decrement proven by concurrent hammering. A Stripe test-mode subscription with an idempotent webhook consumer on M5 queue surviving replay. A server-rendered 402 path proven by curl. A circuit breaker on spend. One weekly SQL report joining usage, quality score and cost into ONE LINE PER ACTIVE USER, including a non-model cost column. Plus a two-dimensional (model x effort) routing experiment scored by M11, reported as cost per completed task.',
  gate:{ referee:'The queries themselves. Every number must be reproducible from SQL.',
         pass:'State cost per active user per month and end-to-end p50/p95/p99, each backed by the query. Say whether you would keep the feature.',
         onFail:'You are reporting an average. Recompute from the raw distribution.' },
  note:'Effort is the first quality-trading lever after caching — measure the capable model at lower effort BEFORE building a cascade, because caches are model-scoped.' },

{ id:'M19', layer:5, hours:34, dependsOn:['M1','M4','M7','M17'], kind:'EVIDENCE',
  title:'Security and the Trust Boundary',
  artifact:'An attack-then-fix log against a deliberately vulnerable copy of the flagship: FIVE exploits you ran yourself, each with fix and test. The fifth is cross-tenant file access via a guessed/replayed URL, or CSRF against an OAuth callback. One runs through M17 agent fetch tool. A tool-permission design with blast-radius analysis. A BIDIRECTIONAL data-flow document — every boundary, third party, retention setting and jurisdiction — plus an IMPLEMENTED delete path removing rows, objects, embeddings and traces, a written list of what cannot be deleted and why, and a test asserting nothing survives. Plus the constraints you do not control: subprocessor lists, DPAs, zero-data-retention config, residency.',
  gate:{ referee:'Working exploits — they land or they do not — and a passing deletion test.',
         pass:'Five exploits demonstrated and fixed. Name every irreversible action in your agent and defend containment WITHOUT saying "I tell the model to ignore injected instructions." State what leaves your perimeter and where it lands. State what happens to every copy of a user data when they ask you to delete it.',
         onFail:'The exploit did not actually land. You have a description, not a demonstration.' } },

// ─────────────── LAYER 6 · PRODUCT AND PLATFORM ───────────────
{ id:'M20', layer:6, hours:40, dependsOn:['M3','M10','M17','M18'], kind:'EVIDENCE',
  title:'Frontend for AI Interfaces',
  artifact:'The flagship chat surface rebuilt on YOUR OWN M3 protocol via a custom transport (not the prebuilt default — implementing the transport interface is the part that teaches the protocol boundary). A stop button that provably stops upstream billing. Refresh-mid-generation that resumes. Tool calls with a working approval gate wired to M17. Citations linking to M10 span provenance. Honest failure states. The 402/upgrade path.',
  gate:{ referee:'A screen recording, the cost meter, and axe-core in CI.',
         pass:'Demonstrate refresh-mid-generation recovery live. Show the stop button effect in the cost meter. Report time-to-first-token. Axe-core passes on the chat surface, plus one recorded real-screen-reader pass showing the aria-live re-read behavior present and then fixed.',
         onFail:'The stop button stops the UI only.' },
  note:'Next.js caching INVERTED — nothing is cached by default, you opt in. State the direction, not the version.' },

{ id:'M21', layer:6, hours:12, dependsOn:['M5','M7'], kind:'EVIDENCE',
  title:'System Design and the Design Doc',
  artifact:'A one-page design doc with two rejected options for a bounded AI system, REVIEWED AND PUSHED BACK ON by a real reader before any code exists. Keep both the proposed and the built version; the delta is the interview material.',
  gate:{ referee:'The mock interviewer, who must ask questions you did not anticipate. This gate is unadministrable alone.',
         pass:'45 minutes at a whiteboard on one bounded AI system end to end including observability and the failure path, surviving three unscripted follow-ups. Plus: here is where my design was wrong and how I found out.',
         onFail:'Rehearse the weak branch and re-book.' } },

{ id:'M22', layer:6, hours:48, dependsOn:['M4','M6','M11'], kind:'EVIDENCE',
  title:'Deployment, CI/CD, and Operating It',
  artifact:'The flagship full pipeline: OIDC secrets with no stored keys (the model API key and third-party refresh tokens are the two DOCUMENTED exceptions, scoped and spend-capped), required checks including the M11 eval gate, a feature-flagged release, a rollback rehearsed under a timer measured from the DASHBOARD not a stopwatch, an expand/contract migration run through the pipeline while M4 load generator fires with zero failed requests, one burn-rate alert that fired for a real reason. Plus one dockerized cloud deploy with an IAM role you wrote and can explain.',
  gate:{ referee:'A timer driven by the monitoring, and the load generator error count.',
         pass:'Roll back a bad deploy in under five minutes while narrating. Migration under load with zero failed requests. Explain with a SPECIFIC LOCK TYPE why a naive migration takes a site down and why yours does not. Name every consumer of one flagship endpoint and how you would discover one you did not know about from production logs alone.',
         onFail:'The migration dropped requests. Expand/contract was not actually expand/contract.' },
  note:'Rollback trigger is SUSPICION that your change caused it, not proof.' },

{ id:'M23', layer:6, hours:35, dependsOn:['M8','M11'], kind:'EVIDENCE',
  title:'Python as a Second Production Language',
  artifact:'M11 eval runner ported to Python — this gives the module an inbound edge; v1 Python module was terminal and therefore the most cuttable thing in the document. Typed request/response models, streaming, a pytest suite faking the model client, type checker green in CI, plus a written runtime diff including a reproduction of a blocking call freezing the asyncio loop and its fix.',
  trigger:'MOVES to immediately after M11 if fewer than 40% of M0 twenty postings accept a Node-primary backend.',
  gate:{ referee:'A timer, plus a Python-fluent OSS maintainer reviewing a real PR.',
         pass:'Add a typed route and test to an unfamiliar Python service in 90 minutes. The maintainer merges without idiom comments.',
         onFail:'You are writing TypeScript with Python syntax. A passing test cannot catch this.' } },

{ id:'M24', layer:6, hours:28, dependsOn:['M3','M19'], kind:'EVIDENCE',
  title:'Third-Party Integration as a Consumer',
  artifact:'A real OAuth connection in the flagship INCLUDING THE CONSENT SURFACE: connect and callback routes with state and PKCE verified by a written attack attempt, a connections settings screen, a scope-upgrade re-consent path actually exercised, an in-chat degraded state. Envelope encryption with a per-row key reference, a stated master-key location per environment, and a written rotation procedure. Automatic refresh and a revocation-recovery path that re-prompts.',
  gate:{ referee:'The provider own API, where you revoke the grant MID-RUN.',
         pass:'Revoke during a background job and assert the job ALERTS rather than failing silently. Demonstrate scope-upgrade re-consent. The CSRF attempt against your callback fails.',
         onFail:'The 401 surfaces as a generic error, or the state parameter is decorative.' } },

// ─────────────── LAYER 7 · THE MARKET (by trigger) ───────────────
{ id:'M25', layer:7, hours:8, dependsOn:['M0'], kind:'EVIDENCE',
  trigger:'One month BEFORE the application date. Non-droppable in every variant including the Compressed Spine.',
  title:'Comp, Terms, and the Negotiation',
  artifact:'A comp floor and target with the postings that justify them. A spreadsheet modeling the same headline number as W2 vs 1099 with self-employment tax, health insurance and unpaid time off. A negotiation script rehearsed out loud and recorded. Plus a references plan: three real people secured by month 10 — the reviewer, an OSS maintainer, a freelance client.',
  gate:{ referee:'A real recruiter screen.',
         pass:'State your floor to an actual recruiter without hedging.',
         onFail:'You hedged. That is the rep. Do it again next screen.' } },

{ id:'M26', layer:7, hours:8, dependsOn:['M11'], kind:'EVIDENCE',
  trigger:'The application date (~month 5). Applications need a resume at month 5, not month 15.',
  title:'The Evidence Layer v1',
  artifact:'A resume mapping each claim to a repo. Two pinned repos. A README in product-spec form. ONLY EVIDENCE artifacts are pinned — the labs are private. Final pinned four: the flagship, the OSS contribution history, one design doc or public write-up, one genuinely separate small product.',
  gate:{ referee:'THREE strangers from named channels, five-minute timebox each, answers in writing before any back-and-forth.',
         pass:'3/3 on all three questions: what does it do, what does it cost per user, how good is it.',
         onFail:'Rewrite, then THREE FRESH strangers. The first three are now briefed and can never be used again.' },
  note:'Never name the curriculum. The correct sentence is "I spent the last year building and operating X."' },

{ id:'M27', layer:7, hours:17, dependsOn:['M16','M18'], kind:'EVIDENCE',
  trigger:'After Layer 5, when there are numbers worth publishing.',
  title:'The Evidence Layer v2',
  artifact:'The flagship README carrying the eval numbers INCLUDING THE FAILING V1 — the improvement delta is the evidence of engineering; a single good number could have been luck. A decision log of the five choices that mattered. One public write-up of a measurement you made.',
  gate:{ referee:'The same three-stranger protocol as M26, with fresh strangers.',
         pass:'They can state the cost per user and the quality number from the README alone.',
         onFail:'The README is a feature list, not a product spec plus decision record.' } },

{ id:'M28', layer:7, hours:53, dependsOn:['M12','M26'], kind:'EVIDENCE',
  trigger:'10h forward-loaded to the application date; the rest in the last eight weeks.',
  title:'Interview Performance',
  artifact:'A recorded ten-minute flagship walkthrough in DECISION-language. Three timed foreign-repo bug fixes from M0 blind queue with assistant transcripts annotated. Two recorded mock defenses with a real person who pushes back. Plus ~8h behavioral rehearsal against M0 incident log — twenty real stories accumulated at zero marginal cost since month one. The 40-problem narrated log lives in Track 4 weekly slot.',
  gate:{ referee:'Three referees.',
         pass:'(1) Solve an unseen problem out loud in 25 min with autocomplete disabled. (2) Drive an assistant through an unfamiliar bug UNDER OBSERVATION, narrating every point where you VERIFIED rather than accepted. (3) Answer three behavioral questions cold with three different stories, none about a decision made alone.',
         onFail:'Watch the transcript back and name where you delegated something you should have verified. That is the rep.' } },

// ─────────────── LAYER 8 · EMPLOYED MODE ───────────────
{ id:'M29', layer:8, hours:10, dependsOn:[], kind:'LAB',
  trigger:'WRITTEN pre-hire, EXECUTED post-hire. Hire-before-completion is the modal good outcome.',
  title:'Employed Mode',
  artifact:'A second operating contract: a realistic employed weekly budget (5-8h, not 18) and a module order driven by what the job needs first. Track 4 retargeted from your own artifacts to a component of the employer codebase. The reviewer relationship re-contracted or deliberately replaced, decided BEFORE the start date. The monthly re-plan surviving with new inputs. The estimate log continuing against real tickets from week one. Plus two scheduled written manager checkpoints at week 6 and week 14, scripted before the start date.',
  gate:{ referee:'The week-6 and week-14 manager checkpoints, in writing.',
         pass:'You asked directly whether you are where they would expect, and you have the written answer.',
         onFail:'Week one is the wrong time to ask — that is when a manager answer is most generic.' } },

{ id:'M30', layer:8, hours:8, dependsOn:[], kind:'LAB',
  trigger:'First onsite.',
  title:'The First 90 Days',
  artifact:'A 30/60/90 plan against a real posting with week-one manager questions. A reusable asking-for-help template practiced FOR REAL by posting three genuine questions in an OSS project Discord or Slack, responses kept. An org map inferred from git blame and log. A handoff note good enough for a stranger to continue. Plus inheriting an AI system you did not build: reading someone else prompts, evals and traces; prompt archaeology on a system with no decision log. Plus a WIP policy computed from your OWN Track 2 review-latency data.',
  gate:{ referee:'Real strangers in a real channel, and a recording.',
         pass:'Three genuine questions posted and answered. Record yourself pairing with another person for 45 minutes on a real bug in an unfamiliar repo, narrating throughout, and watch it back. State your median review latency from your own data and your WIP policy from memory.',
         onFail:'You asked for the answer instead of stating what you tried, expected, saw, and currently believe.' } }
];

// Parallel tracks. v1 called these mandatory and budgeted none of them — that was a 40% error.
var AI_TRACKS = [
  { id:'T1', title:'Job search',            hours:200, cadence:'3-4 h/week from the application date',
    rule:'First two months, deliberately target companies you do NOT want. The modal response is silence; the success metric is "I learned what the funnel requires."' },
  { id:'T2', title:'Open-source PRs',       hours:80,  cadence:'~8h/month from end of M13',
    rule:'Substantive = touches behavior, 20-200 lines, includes a test, survived a round of review. Three merged into two repos with threads preserved. Gate on SUBMITTED, track merged as lagging.' },
  { id:'T3', title:'The dependency spiral', hours:0,   cadence:'structural',
    rule:'Every capstone imports an earlier capstone. Zero hours. The entire answer to knowledge decay.' },
  { id:'T4', title:'Weekly cold re-build',  hours:60,  cadence:'45 min weekly',
    rule:'Score 0-3. Three consecutive scores below 2 on the same artifact RE-OPENS that module. Also carries M28 narrated-problem log.' },
  { id:'T5', title:'Reviewer relationship', hours:15,  cadence:'~1 h/month, batched into scheduled sessions',
    rule:'Three roles, three deadlines: code reviewer (month 2), technical operator (month 4), mock interviewer (month 10). Agent fallback is one run per attempt, transcript kept, a failed agent review logged as a failed gate.' },
  { id:'T6', title:'Agent discipline',      hours:0,   cadence:'habit',
    rule:'Interrogate-never-author through M12. Delegation policy in force from M14.' },
  { id:'T7', title:'Writing',               hours:30,  cadence:'one piece per layer',
    rule:'Each about something you MEASURED, not something you read.' },
  { id:'T8', title:'Monthly re-plan',       hours:40,  cadence:'2 h/month, survives into Employed Mode',
    rule:'Inputs that actually arrive: skill counts across 20-40 postings screened this month, screening questions, which applications produced human contact, and your DELTA.md files. Six weeks behind for two consecutive months -> switch to the Compressed Spine.' }
];

var AI_COMPRESSED_SPINE = ['M0','M1','M2','M3','M6','M7','M9','M11','M25']; // 364h, for runway under 9 months
var AI_CUT_ORDER = ['M24','M23(second half)','M20(down to 25h)','M30'];      // ~80h back, in this order

// ── Graph validation. Rule 2 says every module except M0 has an inbound edge,
// ── and the LONGEST PATH — not the hour sum — sets the timeline.
var AI_CURRICULUM_API = {
  byId: function (id) { return AI_CURRICULUM.filter(function (m) { return m.id === id })[0] },

  totalHours: function () {
    var mod = AI_CURRICULUM.reduce(function (a, m) { return a + m.hours }, 0);
    var trk = AI_TRACKS.reduce(function (a, t) { return a + t.hours }, 0);
    return { modules: mod, tracks: trk, total: mod + trk };
  },

  // Longest dependency path in hours — the real floor on calendar time.
  criticalPath: function () {
    var memo = {}, self = this;
    function walk(id) {
      if (memo[id]) return memo[id];
      var m = self.byId(id);
      if (!m) return { hours: 0, path: [] };
      var best = { hours: 0, path: [] };
      m.dependsOn.forEach(function (d) {
        var r = walk(d);
        if (r.hours > best.hours) best = r;
      });
      return (memo[id] = { hours: best.hours + m.hours, path: best.path.concat([id]) });
    }
    var winner = { hours: 0, path: [] };
    AI_CURRICULUM.forEach(function (m) {
      var r = walk(m.id);
      if (r.hours > winner.hours) winner = r;
    });
    return winner;
  },

  validate: function () {
    var ids = AI_CURRICULUM.map(function (m) { return m.id });
    var errors = [], warnings = [];

    AI_CURRICULUM.forEach(function (m) {
      m.dependsOn.forEach(function (d) {
        if (ids.indexOf(d) === -1) errors.push(m.id + ' depends on unknown module ' + d);
      });
      // Rule 2: every module except M0 and the trigger-scheduled ones needs an inbound edge.
      if (m.dependsOn.length === 0 && m.id !== 'M0' && !m.trigger) {
        errors.push('Rule 2 violation: ' + m.id + ' has no inbound dependency and no trigger');
      }
      if (!m.gate || !m.gate.referee || !m.gate.pass || !m.gate.onFail) {
        errors.push(m.id + ' gate is missing referee / pass / onFail');
      }
      if (/\bhe can explain\b/i.test((m.gate && m.gate.pass) || '')) {
        warnings.push(m.id + ' gate may be decorative — "can explain" with no external referee');
      }
    });

    // Cycle detection.
    var state = {}, self = this;
    function visit(id, stack) {
      if (state[id] === 'done') return;
      if (state[id] === 'open') { errors.push('Dependency cycle: ' + stack.concat([id]).join(' -> ')); return }
      state[id] = 'open';
      var m = self.byId(id);
      if (m) m.dependsOn.forEach(function (d) { visit(d, stack.concat([id])) });
      state[id] = 'done';
    }
    ids.forEach(function (id) { visit(id, []) });

    // Rule 3: each owned concept has exactly one owner, and that owner declares it.
    Object.keys(AI_OWNED_CONCEPTS).forEach(function (c) {
      var owners = AI_CURRICULUM.filter(function (m) { return (m.owns || []).indexOf(c) !== -1 });
      if (owners.length !== 1) {
        errors.push('Rule 3: concept "' + c + '" has ' + owners.length + ' declared owners (expected 1)');
      } else if (owners[0].id !== AI_OWNED_CONCEPTS[c]) {
        errors.push('Rule 3: "' + c + '" declared by ' + owners[0].id + ', registry says ' + AI_OWNED_CONCEPTS[c]);
      }
    });

    var cp = this.criticalPath(), h = this.totalHours();
    return {
      ok: errors.length === 0,
      errors: errors,
      warnings: warnings,
      modules: AI_CURRICULUM.length,
      hours: h,
      criticalPathHours: cp.hours,
      criticalPath: cp.path.join(' -> '),
      note: 'Critical path is the floor on calendar time. Total hours is the floor on effort. They are different constraints.'
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AI_CURRICULUM: AI_CURRICULUM, AI_LAYERS: AI_LAYERS, AI_TRACKS: AI_TRACKS,
                     AI_OWNED_CONCEPTS: AI_OWNED_CONCEPTS, AI_SPIRAL_PAIRS: AI_SPIRAL_PAIRS,
                     AI_COMPRESSED_SPINE: AI_COMPRESSED_SPINE, AI_CUT_ORDER: AI_CUT_ORDER,
                     AI_CURRICULUM_API: AI_CURRICULUM_API };
}
