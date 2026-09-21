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
  { id: 0, name: 'The Contract',          purpose: 'Your numbers, your first code, your reviewer (a working engineer who checks your work), and your flagship (the one app you keep building). Decided and built first, because everything after this rests on them.' },
  { id: 1, name: 'The Machine',           purpose: 'How code actually runs. The language, the computer under it, the database (where the app keeps its data), the AI model (the program you send text to and get text back from), and the connection between them. The literal answer to: I need to understand code.' },
  { id: 2, name: 'The Craft I',           purpose: 'The habits that keep a running app running: work that survives a crash, tests that catch real mistakes, and seeing inside your app when it misbehaves.' },
  { id: 3, name: 'The AI Production Core',purpose: 'What makes you an AI engineer rather than a web developer: real documents in, a way to measure whether the AI is right, and a design you defended in writing. Opens once you can see inside your app.' },
  { id: 4, name: 'The Craft II',          purpose: 'Working in other people’s code and with other people. Learned while you are interviewing.' },
  { id: 5, name: 'The AI Layer, Completed', purpose: 'Search you measured, AI that takes actions on its own, what each request (one message a user sends your app) costs, and keeping the whole thing safe.' },
  { id: 6, name: 'Product and Platform',  purpose: 'The screens people use, keeping the app live, connecting other services, and Python, a second programming language.' },
  { id: 7, name: 'The Market',            purpose: 'Pay, proof a stranger can judge, and interviews. Started by a date on your plan, not by finishing everything.' },
  { id: 8, name: 'Employed Mode',         purpose: 'Getting hired before you finish is a success, not a failure — it is the outcome this plan is shaped for, which is a different claim from a prediction that it will happen to you. This layer is what changes on day one of the job.' }
];

// Concepts with exactly ONE owning module. The registry says who owns each one.
// Ownership is not the same claim as never-re-taught: five are owned and then
// only consumed, and three are owned once and then deliberately deepened later.
// Those three also sit in AI_SPIRAL_PAIRS below, which is why "eight concepts are
// never re-taught" is the wrong sentence. validate() checks the two lists against
// each other so the two claims cannot drift apart.
var AI_OWNED_CONCEPTS = {
  'flagship': 'M2',
  'trust boundary':  'M3',
  'streaming':       'M7',
  'idempotency':     'M7',
  'durable queue':   'M8',
  'observability':   'M10',
  'evals':           'M12',
  'cost':            'M20'
};

// Owned once, then consumed and never re-taught.
var AI_OWNED_ONCE = ['flagship', 'streaming', 'idempotency', 'durable queue', 'evals'];
// Owned once, then deliberately revisited at greater depth. These are the three
// that legitimately appear in AI_SPIRAL_PAIRS.
var AI_OWNED_THEN_DEEPENED = ['trust boundary', 'observability', 'cost'];

// Deliberately taught twice at different depths. NOT violations — do not "fix" these.
// Seven pairs covering six concepts (CI is taught three times, so it appears twice here).
// Read each pair as first-taught then deepened, which is not always owner-first:
// 'cost' is introduced in M6 and owned at depth by M20, the reverse of the other two
// deepened concepts, where the owner teaches it first.
var AI_SPIRAL_PAIRS = [
  ['M10', 'M12', 'observability'],
  ['M4', 'M5',  'pooling and isolation'],
  ['M9', 'M12', 'CI'], ['M12', 'M23', 'CI'],
  ['M21', 'M26', 'OAuth'],
  ['M6', 'M20', 'cost'],
  ['M3', 'M13', 'trust boundary']
];

// The canonical numbered rules. One list, here, so the document and the product
// cannot number them differently. LAUNCHPAD_CONFIG.creed below is a three-line
// restatement of rules 1, 2 and 5 for the header; it is not a second numbering.
var LAUNCHPAD_RULES = [
  { n:1, rule:'Every module ends in an artifact — something that runs, or something a stranger can read.' },
  { n:2, rule:'Every module except M0 has an inbound edge, and the longest chain of modules — not the hour sum — sets how long this takes.' },
  { n:3, rule:'Eight ideas have exactly one module that owns them. Five are used from there on and never taught again: the flagship (M2), streaming and idempotency (M7), the durable queue (M8), evals (M12). The other three are taught once and then deliberately taken further later — the trust boundary (M3, again in M13), observability (M10, again in M12), and cost (introduced in M6, owned at depth in M20).' },
  { n:4, rule:'Six ideas are taught twice on purpose, across seven pairs of modules. Three of them are the three from rule 3; the others are pooling and isolation (M4, again in M5), CI (M9, then M12, then M23) and OAuth (M21, again in M26). When you meet one a second time, it is depth, not repetition.' },
  { n:5, rule:'Every module opens with a one-hour verification pass, charged to the hours it already has: read the official documentation before you build, and write down where it proved this page wrong.' }
];

var AI_CURRICULUM = [

// ─────────────── LAYER 0 · THE CONTRACT ───────────────
{ id:'M0', layer:0, hours:12, dependsOn:[], kind:'LAB',
  title:'The Contract Page',
  artifact:'One page, called PLAN.md, that you can read out loud. It holds ten things. First, the money. How many months you can go without a paycheck, which is your runway \u2014 and then, on the line under it, what this program itself costs you every month, subtracted from that runway to give the runway you actually have. Write the running cost down as a number: model spend (M2, M6 and M12 are steady; M18 and M19 are the expensive ones, because they run a corpus and hundreds of adversarial inputs through a model), hosting for the flagship once it is live, a paid tier anywhere a module needs one (a payment processor in test mode is free, error tracking and a cloud account usually are not), and, if you are paying for review or mock interviews, that too. Guess it now, correct it at every monthly re-plan, and treat the corrected number as a claim on your runway, because it is one. A program whose founding argument is that runway sets the deadline cannot leave the outflow out of the arithmetic. Second, how many hours a week you can truly give this, and the deadline those two numbers force. Third, the date you will start applying for jobs: a target you pick now from your runway, and it does not move because a module is late. M10 is the readiness condition, not the date \u2014 if M10 has not passed when the target arrives, you apply anyway with what you have and write down in that month\u2019s re-plan what you are applying without. Fourth, twenty real job postings read end to end, with a note on each of what it asks for and whether it is an employee job or a contract job. Fifth, a count of how many of the twenty ask for Python (if eight or more do, the Python modules M24 and M25 move earlier; expect this to fire). Sixth, three messages sent to people who write code for a living, asking each for 20 minutes a month; whoever says yes is your reviewer, the person who checks your work from here on. Be honest with yourself about this one on day one: the gates in this program need either a budget for paid review and paid mock interviews, or two working engineers who will give you real time for a year. If you have neither today, the first thing you build is that, and it can take a month; put that month in the plan rather than discovering it at M3. Seventh, a dated list of what you can do today, which on day one is honestly "nothing yet". Eighth, a file called INCIDENTS.md with one line every time something goes wrong from here on. Ninth, a date in month four by which a dozen people you found will have used your flagship. Two of those is what the hard gate requires, and M2’s own gate gets you those; the dozen is the target that makes the traces M10 and M12 read worth anything. The flagship is the one app you will build in month two and keep improving for the rest of the program. And tenth, a written rule for what a bad week is and what the week after it looks like. No code. You do not know how to write any yet, and this page is what decides whether you will.',
  gate:{ referee:'Anyone \u2014 a friend, a partner, a sibling \u2014 who reads your one page and hands it back.',
         pass:'They can say your runway, your monthly running cost, your weekly hours and your application date without looking at the page. The three messages are sent. The twenty postings are tallied. Your rule for a bad week is written and you can say it.',
         onFail:'This one cannot be failed by lack of skill, only by not finishing it. Name the line your referee could not repeat back, finish that line, and read the page to them again. Nothing else opens until they can.' } },

{ id:'M1', layer:0, hours:58, dependsOn:['M0'], kind:'LAB',
  title:'First Code',
  artifact:'Six small programs, each written by you from an empty file and run from the terminal. One that reads a file and prints how many lines it has; one that asks a public API for data and rearranges what comes back; one that fails on purpose, which you fix by reading the error message. Then one where a block you had typed twice becomes a function; one with three tests you wrote before the code they test; and one you broke on purpose and got back with git. The setup around them counts as part of the work: Node installed with its version written down, an editor you can move around in without a mouse, a repo pushed to a remote with commit messages a stranger could follow, and a page naming every tool you installed and what each one is for. Then three short things you can only do now that you have tools. A 30-minute check that your machine can install what later modules need (a local database, a container runtime, a load generator, and a browser you can drive from code), done now so that if something will not install it fails today instead of in month three. Name the floor while you are there, because "a substantial machine" is not a specification: M5 holds a five-million-row Postgres instance and a container runtime at the same time, M11 runs OCR over PDFs and M18 runs a reranker, so plan on at least 16 GB of memory and 50 GB of free disk. The check proves things install; it does not prove M5 will fit. If you are unsure, load five million rows into your local Postgres today and watch what happens \u2014 that is the real smoke test, and finding out now is worth the extra half hour. A first attempt at a coding task you have never seen, scored honestly as a fraction; zero out of six is a real score, and writing it down is the point. And a list of twenty small bug-fix commits from other people\u2019s public repos, found but not read, saved for M14 and M30, where they become practice problems with a real answer. Save a reproducible starting state, not a URL: record each commit\u2019s parent SHA and confirm today that the project builds and its suite is green at that parent. A repo moves on, and a commit you cannot check out and run in fifteen months is not an exercise, it is a merge conflict.',
  gate:{ referee:'Anyone who writes code for a living, watching your screen for 20 minutes, on a task you have not seen.',
         pass:'From an empty directory: create a file, write a function with a test, run it, make the test fail, read the error out loud and say what it means, fix it, commit, push. No tutorial open.',
         onFail:'Do it again from an empty directory. Re-running the tutorial does not count \u2014 the whole failure mode of this module is a working repo you cannot rebuild.' } },

{ id:'M2', layer:0, hours:30, dependsOn:['M1'], kind:'EVIDENCE',
  title:'Flagship v1',
  artifact:'First, give the app a name and write its one-page specification: who it is for, the one thing it does, what a user types in and what they get back, and what it must never do. Sixteen later modules add to this page, so you sign it line by line before you build anything. Read that checklist as what the app must be able to grow into, not as what it has: you are checking the concept, not the code. Nothing on it is built in this module. If your named app could never carry one of the lines — could never plausibly have two kinds of user, or a document corpus, or something worth charging for — pick a different app now, while changing your mind is free. "Fix the app before M3" would be an unrunnable instruction, because the modules that build those lines are M5, M11, M20, M21 and M23. Then build the smallest honest version of it. A plain HTML page with one text box. A server route that sends what the user typed to a model at Anthropic, using your own API key, and returns the reply. The reply shown on the page. The whole thing deployed on Vercel, so it has a URL a stranger can open on their phone. No streaming, no accounts, no database; each has its own module later (streaming in M7, accounts and the database in M5) and each is easier to add to something already running. Four rules that cannot be skipped. The key lives on the server in an environment variable, and you prove it is not in the client bundle by searching the files the browser downloads. A hard spend limit is set at the model service before the first request, low enough that the worst month you can imagine is an amount you would shrug at, because this URL is on the public internet and the bill is yours. The page is not open to the whole world: put it behind a shared word you hand out, or a list of addresses you invite, so the people using it are people you chose. And every model call is written to a log with its input, output, usage (the token counts the service reports) and time, from the very first request, because M10 and M12 both read that log and a month of calls you did not record is gone for good. That log holds other people’s words, so the page says in one line what is recorded and for how long, you keep it no longer than you said, and you delete a person’s entries when they ask. M11 and M21 make this rigorous; the one line and the delete-on-request are due now.',
  owns:['flagship'],
  exports:['the app M5, M6, M7, M9, M10, M11, M12, M16, M18, M19, M20, M21, M22, M23, M26 and M29 all extend'],
  gate:{ referee:'Two people who are not you, on their own devices, with no instructions from you.',
         pass:'Both reach the URL, type something, get a reply, and can say what the app is for. Your log shows their two requests. The spend limit is set and you can say the number. The page states what it records, and you can show a request deleted on demand.',
         onFail:'It runs on your laptop. That is a different artifact, and no later module can bolt onto it.' } },

// ─────────────── LAYER 1 · THE MACHINE ───────────────
{ id:'M3', layer:1, hours:67, dependsOn:['M1','M2'], kind:'LAB', owns:['trust boundary'],
  title:'The Runtime, Unframed',
  artifact:'runtime-lab: a set of small programs under plain node --test. MiniPromise from scratch. A harness reproducing all four concurrency failure modes, then fixing each. A Zod boundary rejecting hostile LLM JSON that a bare “as” cast accepted. A typed error taxonomy with cause chaining and a retry-safety rule per class. TypeScript strict flags on from day one.',
  exports:['the estimate log starts here and runs until you are hired'],
  note:'This is the largest module in The Machine and it comes early, which is the steepest part of the '
     + 'curve. Do not skip to the later checkpoints \u2014 start with checkpoint 1, which is a 20-minute prediction '
     + 'exercise, and let being wrong about the output order be the thing that motivates the other 66 '
     + 'hours. Everything after this module assumes you can reason about what the runtime is doing, so '
     + 'this is the one place where going slower is going faster.',
  gate:{ referee:'Your reviewer, watching the screen recording back with you.',
         pass:'Narrate unprompted why setTimeout(fn,0) runs after a resolved .then(). Convert a real `as`-cast of model JSON from your own shipped code into a parsed boundary and name the production bug it prevents.',
         onFail:'Rebuild the concurrency harness from empty. Re-attempt in 7 days.', unseen:'The unseen condition: three attempts, 45 minutes each, on an async bug your reviewer plants in a single file you have not seen. Pass 2 of 3. Narrating your own harness cannot distinguish understanding the runtime from remembering what you built.' } },

{ id:'M4', layer:1, hours:45, dependsOn:['M3'], kind:'LAB',
  title:'The Machine Model: Ten Seams',
  artifact:'seams: ten reproductions, each a failing script + fix + proving test, one per seam in the list above. (1) Aliasing: a shallow copy that was not a copy. (2) A leak proved with a heap snapshot — an object still reachable that you believed was gone. (3) Money wrong by a cent, then correct. (4) An integer that stopped being exact, on an id big enough to reach the limit. (5) A UTF-8 grapheme split across streamed chunks. (6) JSON losing something on the way through: a Date, an undefined, a Map. (7) A pool exhausted under load. (8) A blocking call freezing the loop, and the same work moved off it. (9) A lost update in a database (the Postgres version, with the plan that proves it, is M5’s). (10) A four-timezone digest scheduler with an injected fake clock pinned across spring-forward and fall-back.',
  gate:{ referee:'Reviewer picks which of the ten, without telling you.',
         pass:'Name the seam and the instrument within 60 seconds, 7 of 10. Then point at the wrong-typed columns in a small table design your reviewer hands you.',
         onFail:'Rewrite the two you missed from empty. Re-attempt in 7 days.', unseen:'The unseen condition: two attempts on a data-seam bug (encoding, money, timezone, pooling) your reviewer plants in a single file you have not seen. Pass 1 of 2.' } },

{ id:'M5', layer:1, hours:61, dependsOn:['M4'], kind:'LAB',
  title:'The Postgres Underneath Supabase',
  artifact:'pg-lab against a local Supabase stack. Open with a 3-hour win: 50k rows, one slow query, one EXPLAIN (ANALYZE, BUFFERS), one index, and the speedup you actually measured, stated as a number with both wall-clock times. Do not work backwards from a headline factor — the factor depends on the query, the selectivity and the cache state, and a target set in advance is the habit M12 exists to break. It will probably land somewhere between one and three orders of magnitude. If it comes out at 1.2x, that is the interesting result and finding out why is the exercise. Then the 5,000,000-row rig: twelve hand-written queries with plans before and after, a slow-to-fast loop with wall-clock numbers from a load generator you wrote, an RLS policy set benchmarked correct-but-slow vs fast, and the legacy-key rotation as an artifact. Plus asymptotic complexity, taught here because here it is measurable. Then the flagship moves onto hosted Supabase: sign-in, one table scoped to the signed-in user, one row-level security policy, and a pooled connection, so the app now has accounts and keeps data between visits. The lab itself stays private; this last piece is the exception, because it changes what a stranger sees.',
  exports:['load generator -> M23'],
  gate:{ referee:'Your reviewer, holding an EXPLAIN (ANALYZE, BUFFERS) output you have never seen, taken from their own work. A slow-query log only carries a plan if auto_explain was configured to log one, and only carries actual rows if it was configured with log_analyze — so ask for the plan, not the log line.',
         pass:'State estimated vs actual rows before anything else, then name the fix before reading the query, 3 of 4. If the plan you are handed has no actual rows in it, say so first: plain EXPLAIN reports the planner’s estimates and nothing else, and noticing that is itself the first thing to notice. Explain why your own deployed app exhausted connections and show the pooled fix under the same load.',
         onFail:'Re-run the slow-to-fast loop on three new queries.' },
  currency:'A platform claim wearing fundamentals clothing, and it moves at platform speed. The connection endpoints and their IP-version and plan availability, and the publishable/secret key naming that is replacing the legacy pair, both change on Supabase’s schedule. Verify the current endpoint table and the current key names against the official documentation before you start.' },

{ id:'M6', layer:1, hours:30, dependsOn:['M3','M2'], kind:'LAB',
  exports:['stop_reason discriminator -> M9, M19', 'usage and cache meters -> M20'],
  title:'The Model as a Function',
  artifact:'model-probe CLI: compare token counts against your assumptions across five text types; prove a cache hit from the usage meters and print the cost delta; produce end_turn, max_tokens, tool_use and stop_sequence deliberately, and take the refusal from a recorded fixture rather than trying to trip a safety classifier on demand — that is not reliably producible and drilling it is a bad habit; either way, show stop_details as the discriminator, and note that the categories it carries are an open set, so a switch over the ones you saw this month is a latent bug; demonstrate the limit of constrained decoding rather than a rejection that cannot happen — a generation that is schema-valid and factually wrong, and, separately, what the API does when the schema you sent is itself invalid, which is a 400 on the request rather than a rejected generation; discover capabilities, context window (max_input_tokens) and output cap (max_tokens) from the Models API rather than a hard-coded table, and note that prices are not on that endpoint, so the price table is the one thing in your client that must carry a check date. Plus a dead-patterns page with every 400 pasted in. And the cost column added to the M2 call log, priced from the usage object, so every call from here on has a price.',
  gate:{ referee:'Your reviewer, checking your arithmetic against a real usage object from the service.',
         pass:'Price a request to the cent from its usage object alone, saying where each rate came from and when you last checked it — the Models API does not serve prices, so this one number is hand-carried and dated. Point at the exact byte that broke a cache prefix. Explain why a model-emitted confidence score is generated text, not a probability, and what feature designs that kills.',
         onFail:'Re-derive the pricing by hand from three more requests.' },
  currency:'This is the fastest-changing material in the program. The week you build it, check every detail against the official documentation of the model service you use.' },

{ id:'M7', layer:1, hours:45, dependsOn:['M3','M4','M5','M6'], kind:'EVIDENCE', owns:['streaming','idempotency'],
  title:'HTTP, Streaming, and the Wire',
  artifact:'The streaming LLM proxy — the one the rest of the program builds on. Raw fetch, raw ReadableStream, hand-parsed SSE frames, no SDK. AbortController end to end. Postgres idempotency-key dedupe table. Deliberately reproduces proxy buffering and a mid-stream error, and recovers from both. The flagship server, written in plain JavaScript in M2, is rebuilt in TypeScript here — this is the module where that move happens. The wire format you define here is the one M22’s client has to consume; budget that join now; it is not free.',
  exports:['SSE transport -> M22','idempotency table -> M8, M20'],
  gate:{ referee:'Your reviewer, reading the server logs and a database row count. Both are facts neither of you can argue with.',
         pass:'Kill the client mid-generation, show from logs that upstream billing stopped. Replay one idempotency key twice, show exactly one row. Narrate what arrives on the wire between first byte and first rendered token.',
         onFail:'Rebuild the frame parser against a deliberately chunk-split fixture.' } },

// ─────────────── LAYER 2 · THE CRAFT I ───────────────
{ id:'M8', layer:2, hours:18, dependsOn:['M7','M5'], kind:'EVIDENCE', owns:['durable queue'],
  title:'The Durable Queue',
  artifact:'A Postgres-backed durable job queue: SELECT ... FOR UPDATE SKIP LOCKED, at-least-once delivery, idempotent consumers reusing M7 dedupe, backpressure, dead-letter path, and a read path.',
  exports:['the queue -> M11 ingestion job, M14 backfill, M18 re-embedding, M19 agent state, M20 webhooks'],
  gate:{ referee:'Your reviewer, sending a kill signal at a random time and then counting rows.',
         pass:'Kill a worker mid-job. Zero lost jobs across 1,000 enqueued items, and every effect applied exactly once even where a job ran twice — which is what at-least-once delivery actually lets you promise.',
         onFail:'The consumer is not idempotent. Fix and re-run.' } },

{ id:'M9', layer:2, hours:32, dependsOn:['M3','M7','M5','M6'], kind:'LAB',
  title:'Tests That Fail for the Right Reason',
  artifact:'One shipped repo from zero tests to a green required check: about fifteen unit, five integration against real local Postgres including two RLS policies, CI as a merge gate, a written flakiness budget, and a mutation-testing run with a disposition written for every surviving mutant. The runner moves from M3’s bare node --test to vitest here for watch mode, TypeScript and ESM handling without a build step, and the fixture ergonomics — not because node:test lacks mocking, which it has had for years in mock.fn, mock.method, mock.timers and mock.module. Say which of those reasons is actually yours; a reviewer who runs Node’s test runner daily will ask. And the most reused fixture in the curriculum: a record-replay model client in TypeScript covering a stream with frames split mid-frame and mid-multibyte-character, a tool-use block, and a refusal with stop_details.',
  exports:['record-replay model client -> M12 (zero-cost CI tier)'],
  gate:{ referee:'Your reviewer, reading the mutation score (a number you cannot argue with) and bug reports taken from already-closed public issues.',
         pass:'A mutation score around 70% on the module you care about, with a written disposition for every surviving mutant. The number is a target, not a law — it is chosen because it is high enough to catch assert-nothing tests and low enough to reach, and a full-repo run against a suite with real Postgres integration tests is slow enough that scoping it to one module is the right call. Say which module you scored and why. On a sourced bug: failing test first, then fix, explaining why the test would still fail if the fix were wrong in a different way.',
         onFail:'Surviving mutants in code you claimed was covered. The tests assert implementation, not behavior.' } },

{ id:'M10', layer:2, hours:45, dependsOn:['M7','M5'], kind:'EVIDENCE', owns:['observability'],
  title:'Debugging and Production Observability',
  artifact:'The flagship instrumented end to end, upgrading the day-one call log from M2: structured logs with correlation IDs and redaction, OTel spans including the model call (GenAI semantic conventions, not names you invented), error tracking, a silent-failure detector for wrong-but-200 output, a written sampling decision and retention window per store. A runbook for three failure modes, executed by another person during a scripted game day, plus a blameless postmortem of an outage you caused during it.',
  exports:['model-call span schema -> M20 queries it rather than re-deriving'],
  gate:{ referee:'Your reviewer, running a fault-injection script that fires at a time you do not choose in a seven-day window and logs its timestamp to a file you do not read.',
         pass:'Time-to-detection under 24h from instrumentation alone. Separately: given one trace ID, reconstruct the whole request out loud. Time-to-mitigate scored separately from time-to-root-cause — diagnosing before mitigating is a failing result.',
         onFail:'The detector does not cover that failure class. Add it, re-arm the window.' } },

// ─────────────── LAYER 3 · THE AI PRODUCTION CORE ───────────────
{ id:'M11', layer:3, hours:30, dependsOn:['M5','M8','M10'], kind:'EVIDENCE',
  title:'Ingestion: Real Documents Into a Corpus',
  artifact:'A pipeline accepting a real signed-URL upload, handling a digital PDF, a scanned PDF and a .docx. Character-offset provenance, not page-level: a citation has to highlight the exact sentence that supports a claim, and offsets into extracted text are unrecoverable after the fact, especially through OCR. A private bucket with deny-by-default, scoped short-expiry signed URLs, server-side content-type and size validation, an orphan-cleanup job, a stated retention policy. Resumable on the M8 queue. Scored against twenty hand-labeled documents, split dev/test at creation. Write about twenty-five queries against that corpus by hand at the same time and split them dev/test too, with the number in each half written down. M18’s whole argument about how many things it can measure rests on that count, and queries written after you have seen a retriever’s output are not a test set.',
  exports:['corpus + offsets -> M18','embedding dimensionality decision -> M18 (the column holds thousands more than the index will take: an HNSW index caps at 2,000 dimensions for vector and 4,000 for halfvec)'],
  gate:{ referee:'Your reviewer, scoring against your twenty hand-labeled documents. A number you cannot fudge.',
         pass:'State what percentage of tables your parser destroys, with evidence. Show a citation that highlights the exact span in the correct page of the correct source.',
         onFail:'Provenance is page-level. Rebuild to offsets before M18.' },
  currency:'The pgvector dimension ceilings you are choosing an embedding model against are version-pinned, and embedding models change what they emit. Check the current ceilings and the current model’s output dimensionality the week you embed, and write both in the decision log.' },

{ id:'M12', layer:3, hours:70, dependsOn:['M10','M6','M9'], kind:'EVIDENCE', owns:['evals'],
  title:'Evals: The One Harness and the Stats Lab',
  artifact:'One harness, and only one: Postgres + a TypeScript runner, no platform. 100 hand-read labeled traces in four sessions of 25. Named failure taxonomy with counts. Assertion graders. A judge with a measured confusion matrix. Inter-annotator agreement — the reviewer labels 30 using nothing but your written rubric; where you disagree the rubric gets revised, not the labels. Dev/test split at creation. Tiered CI gate: a smoke set of about fifteen cases on every push, full set nightly, recorded-fixture mode so graders cost $0, a per-run dollar ceiling in the job summary, fail condition as a statistical threshold with its bootstrap CI. Then a deliberate model-family migration gated only by your own eval set. Plus stats-lab: the four statistical tests this program actually consumes, each run once against your own data. Base rates, and why accuracy lies when failures are rare. The confusion matrix, with TPR and TNR computed by hand on your own 100 labeled traces. Percentiles from a raw latency array, and why averaging percentiles is wrong. And bootstrap resampling written from scratch, which is what tells you how many labeled examples you need before a delta means anything.',
  exports:['dataset table, assertion graders, calibrated judge -> M18, M19, M23, M25'],
  gate:{ referee:'Your reviewer, handing you a prompt change that is scored against the test set you have not opened.',
         pass:'Ship/no-ship with a bootstrap CI. State judge TPR/TNR together with human-to-human agreement. Name the criterion that produced the most disagreement and how you rewrote it. Break the gate on purpose on a branch and keep the red check — a rehearsal, and labeled as one, because waiting for a real regression to arrive before gate day is not something you can schedule. If a real regression fires it later, replace the screenshot with that one.',
         onFail:'Your judge is uncalibrated. Re-label 30 traces and recompute.' },
  note:'Break your own eval gate once on purpose, on a branch, and watch it block the merge. A gate that has never fired looks exactly like one that is wired up wrong.' },

{ id:'M13', layer:3, hours:15, dependsOn:['M8','M10'], kind:'EVIDENCE',
  title:'System Design and the Design Doc',
  artifact:'A one-page design doc with two rejected options for a bounded AI system, reviewed, and pushed back on, by a real reader before any code exists. Keep both the proposed and the built version; the delta is the interview material. And three timed design reps of 45 minutes each — about an hour each once the debrief is counted — one per month from the application date, each on a different bounded system and at least one deliberately outside your stack. You will walk in with real p99 numbers and a real durable queue (and, once M20 is passed, a real cost-per-completed-task table), and no reps at saying any of it.',
  gate:{ referee:'The mock interviewer, who must ask questions you did not anticipate. This gate is unadministrable alone.',
         pass:'45 minutes at a whiteboard on one bounded AI system end to end including observability and the failure path, surviving three unscripted follow-ups. Plus: here is where my design was wrong and how I found out.',
         onFail:'Rehearse the weak branch and re-book.' } },

// ─────────────── LAYER 4 · THE CRAFT II ───────────────
{ id:'M14', layer:4, hours:52, dependsOn:['M8','M9','M10'], kind:'EVIDENCE',
  title:'Reading and Changing Code You Did Not Write',
  artifact:'Four pieces. (1) A written end-to-end trace of one user action in a real repo with file:line at every hop, plus getting it running from a cold clone and writing the setup doc that was missing. (2) Characterization tests locking in an untested module including its bugs, then a behavior change behind a flag with both paths green. (3) A resumable backfill over 100k rows on the M8 queue. (4) A dual-run cutover on a deterministic feature — not an AI one; that is an eval and M12 owns it.',
  exports:['characterization tests -> M15'],
  gate:{ referee:'Your reviewer, who reverts a merged bug-fix commit from the ones you saved unread in M1 and scores you against the maintainer\u2019s actual merged diff.',
         pass:'State the root cause out loud in a single sentence before writing any fix — scored separately, and a correct diagnosis with an unfinished patch passes the diagnosis half. Then arrive at a fix matching the maintainer on behavior, 3 of 5 attempts, two tightened to 45 minutes. Then defend three things you thought were wrong and deliberately did not change.',
         onFail:'Pull the next commit from the queue in 7 days. Never read the fix commits.' } },

{ id:'M15', layer:4, hours:46, dependsOn:['M14'], kind:'EVIDENCE',
  title:'Git, Review, and Code Other People Maintain',
  artifact:'Five pieces to a real reviewer. First: a recovery-lab log of six deliberate disasters. Second: a file you have personally been confused by while editing, with 3+ responsibilities, chosen and justified in writing before you touch it, restructured behind M14 characterization tests with a line-item rationale per boundary moved. Third: every failure path in one feature rewritten to actionable messages. Fourth: one PR through a full round trip with 15+ comments, 2+ pushed back on with reasoning, 1+ where you changed your mind and said so. Fifth: twenty consecutive working-day updates posted in public, and a sealed brief handed to your reviewer for M16\u2019s gate.',
  gate:{ referee:'A real maintainer, in the review thread on your pull request.',
         pass:'Three review rounds completed, every comment addressed or argued in writing, zero structural comments on the final round. And twenty consecutive working-day updates posted in public, and the reviewer can reconstruct your month from the thread alone without asking you.',
         onFail:'The structural comments are the curriculum. Address and resubmit.' },
  note:'Gate on what you control. Gating on "merged" would condition your progress on a stranger\u2019s inbox.' },

{ id:'M16', layer:4, hours:28, dependsOn:['M14','M15'], kind:'EVIDENCE',
  title:'Working with Coding Agents Professionally',
  artifact:'A defect log from handing an agent three real tickets in a repo you did not write, naming, for each defect, the earlier module that let you catch it. A one-page delegation policy, enforced by a pre-commit hook that has actually blocked an agent-authored change twice on real work. A spec-driven slice with a log of every place the spec was underspecified and what the agent did in the gap. And a throughput artifact: three small flagship features shipped with agents and three by hand, alternating so the ordering and the learning do not all favor one side, with hours, review findings and defects reaching production reported as a spread and not only as two medians. If you only have the time for one pair, that is fine — report it as an anecdote with n=1 and say so out loud. Both are usable. What is not usable is a single pair of features presented as a measurement, which is the vibe comparison table M12 exists to prevent.',
  gate:{ referee:'A second agent instance with a sealed brief your reviewer wrote weeks earlier. 0-3 defects per diff, count blinded, at least one clean diff.',
         pass:'Find the planted defects across five diffs, false positives scored separately. Plus a pre-commit hook enforcing your delegation policy that has actually blocked agent-authored diffs twice on real work.',
         onFail:'You are pattern-matching, not reviewing. Redo with a new sealed brief.' } },

{ id:'M17', layer:4, hours:29, dependsOn:['M14','M12'], kind:'LAB',
  title:'Scoping, Estimating, and Someone Else’s Priorities',
  artifact:'Three scoping docs against real open issues. Build one, log actual-vs-estimate. And an open-ended quality ticket ("the assistant is getting worse, find out why") delivered as a timeboxed plan with current number, target, ranked interventions by expected gain per hour, a hard 50% checkpoint with a stop-or-continue rule. And a capability-question protocol practiced against the reviewer playing a PM instructed to push for a yes. And one page: a written response to a product request that is not achievable as stated, with the achievable version and a measured number from your own eval set.',
  gate:{ referee:'Your reviewer, handing you a vague two-sentence ticket, cold, and the reviewer playing a PM who will not take no.',
         pass:'Clarifying questions and a sliced plan in 15 minutes. Defend what you would cut if the deadline halved. Report a result that missed its target, in writing, without apologizing and without asking for more time.',
         onFail:'More data points. The estimate log is a standing item from M3, not three points here.' } },

// ─────────────── LAYER 5 · THE AI LAYER, COMPLETED ───────────────
{ id:'M18', layer:5, hours:44, dependsOn:['M11','M12'], kind:'EVIDENCE',
  title:'Retrieval You Actually Measured',
  artifact:'Retrieval over the M11 corpus, on the M12 runner and tables. A measured recall@k baseline, then two interventions measured independently: hybrid+RRF and a reranker. Two, not five, and the reason is the corpus. M11 gives you twenty hand-labeled documents and about twenty-five hand-written queries split dev/test, which leaves roughly ten queries in the test half; recall@10 over ten queries moves in steps of 0.1 and its bootstrap interval is about plus or minus 0.3. You cannot rank five arms on that, there is no third split left to re-measure a winner on, and taking the maximum of five would bias the margin upward in a way no re-measurement here can undo. So: two arms, each reported with its interval, and contextual retrieval named in writing as the arm you cut and why. Run the long-context comparison (same queries, no retrieval) once as a priced anecdote rather than as a ranked arm, and label it that way. Then span-level citation verification against M11 offsets. Embedding lifecycle: batched generation with rate-limit handling, measured cost per 1,000 chunks, a re-embed as a restartable backfill behind a dual-index read switch (M14\u2019s resumable pattern, if you have passed it). Built with M12\u2019s split discipline.',
  gate:{ referee:'Your reviewer, scoring against your held-out test set, half of it hand-written.',
         pass:'State your delta together with its bootstrap interval and the number of queries behind it, and say out loud whether the interval crosses zero. With a set this small it very probably does, and then the finding is "I cannot distinguish these two with the data I have" — saying that plainly is the pass condition, not a failure of the module. Then state recall@10 before and after with the hnsw.iterative_scan setting named out loud and the dev-test gap stated. Name the arm you cut and the size of corpus that would have justified running it. Defend your routing rule between retrieval and long context using your own numbers.',
         onFail:'The golden set is LLM-generated, or you tuned on the set you reported, or you reported a winner with no interval. Hand-write 25, re-split, re-run.' },
  currency:'pgvector index behaviour is version-pinned: the dimension ceilings, and whether iterative scanning is on or off by default, both changed inside this program’s own calendar. Check the version you are running and name the setting your recall number was measured under.' },

{ id:'M19', layer:5, hours:49, dependsOn:['M7','M8','M6','M12'], kind:'EVIDENCE',
  title:'Agents and Tool Use',
  artifact:'A hand-rolled agent loop with a hard-stopping budget governor, loop detection, an approval gate on irreversible actions, durable state on the M8 queue, append-only thinking-block replay, replayable trajectory traces scored by M12 graders. You write the governor yourself because that is how you learn what it has to do; then compare it against the server-side task budget the provider offers, and write up what each one catches and what each one misses. Yours stops the run; theirs is a ceiling the model can see, so it paces itself and finishes rather than being cut off. Containment as an enforced execution boundary: container/sandbox for code-shaped tools, domain allowlist for network-shaped, path prefix for filesystem-shaped, per-tool timeout and memory caps. Assert on the policy, not on the response: show the allowlist refusing the request before a socket opens, with the denial in your own logs. Then, separately, point a tool at 169.254.169.254 and at a private-network address on your own network (the 192.168, 10. and 172.16 to 172.31 ranges, called RFC1918 after the document that reserved them) as regression cases, and note in writing that a refusal there may be the platform rather than you — a cloud metadata service usually refuses a bare request on its own account, and a serverless host may have nothing at that address at all, so a green result there proves nothing about your egress policy by itself. Plus context management across a long run: compaction and context editing, what each is for, and when each is the wrong answer. The conversation does not have to go back unchanged, and resend-everything is a choice rather than the only shape. Then one MCP server against a named spec revision. Then the same agent on the SDK tool runner with a written comparison.',
  gate:{ referee:'Your reviewer, sending a kill signal at a random point, plus 200 adversarial inputs from a second agent with a red-team brief and no knowledge of your governor. The spend assertion lives in the test suite.',
         pass:'Resume correctly after a mid-run kill. Replay a failed trajectory and name the causing step. Cost ceiling holds across all 200. The allowlist denial is in your logs for the blocked host, and the metadata and private-network regression cases both refused. Report step-level and outcome-level agent eval scores.',
         onFail:'The governor caps iterations but not spend. Fix and re-run.' },
  currency:'MCP (defined in the words below) is a versioned specification with dated revisions and breaking changes between them. Look the current revision up the week you build, write it down, and be able to name one thing that changed in it. Do not take a revision date from this page; the point of the exercise is that you checked.' },

{ id:'M20', layer:5, hours:30, dependsOn:['M7','M8','M6','M12'], kind:'EVIDENCE', owns:['cost'],
  title:'Cost, Metering, and Unit Economics',
  artifact:'A per-user credit ledger with an atomic decrement proven by concurrent hammering. A Stripe test-mode subscription with an idempotent webhook consumer on the M8 queue surviving replay. A server-rendered 402 path proven by curl. A circuit breaker on spend. One weekly SQL report joining usage, quality score and cost into one line per active user, including a non-model cost column. Plus a two-dimensional (model x effort) routing experiment scored by M12, reported as cost per completed task.',
  gate:{ referee:'Your reviewer, re-running the queries. Every number must be reproducible from SQL.',
         pass:'State cost per active user per month, and end-to-end p50 and p95 with the request count behind them, each backed by the query. If your n does not support a p99, say so and do not quote one: on a few hundred requests from a dozen users, p99 is the second-slowest request you ever served, which is one sample. "p99 on 300 requests is one request" is the better answer, and it is the one this module is actually teaching. Say whether you would keep the feature.',
         onFail:'You are reporting an average. Recompute from the raw distribution.' },
  note:'Before you build a cascade of models, measure the capable model at a lower effort setting. It is usually cheaper than the cascade, and a cascade throws away your cache, which only ever applies to one model.' },

{ id:'M21', layer:5, hours:34, dependsOn:['M3','M5','M10','M18','M19'], kind:'EVIDENCE',
  title:'Security and the Trust Boundary',
  artifact:'Every exploit in this module runs against your own deliberately vulnerable copy of the flagship, running on your own machine or your own account, and against nothing else. Running any of it against a system you do not own is a crime in most countries and the end of the job search this program exists for. An attack-then-fix log against that copy: Five exploits you ran yourself, each with a fix and a test. The fifth is cross-tenant file access via a guessed or replayed URL. (CSRF against the OAuth callback is M26’s own attack, once there is a callback to attack.) One runs through the M19 agent fetch tool. A tool-permission design with blast-radius analysis. A data-flow document covering both directions — every boundary, third party, retention setting and jurisdiction — plus a delete path that is implemented, not designed, removing rows, objects, embeddings and traces, a written list of what cannot be deleted and why, and a test asserting nothing survives. Plus the constraints you do not control: subprocessor lists, DPAs, zero-data-retention config, residency.',
  gate:{ referee:'Your reviewer, watching each exploit land or not, and a passing deletion test.',
         pass:'Five exploits demonstrated and fixed. Name every irreversible action in your agent and defend containment without saying "I tell the model to ignore injected instructions." State what leaves your perimeter and where it lands. State what happens to every copy of a user\u2019s data when they ask you to delete it.',
         onFail:'The exploit did not actually land. You have a description, not a demonstration.' } },

// ─────────────── LAYER 6 · PRODUCT AND PLATFORM ───────────────
{ id:'M22', layer:6, hours:32, dependsOn:['M7','M18','M19','M20'], kind:'EVIDENCE',
  title:'Frontend for AI Interfaces',
  artifact:'The flagship chat surface rebuilt on the M7 protocol you wrote via a custom transport (not the prebuilt default — implementing the transport interface is the part that teaches the protocol boundary). A stop button that provably stops upstream billing. Refresh-mid-generation that resumes. Tool calls with a working approval gate wired to M19. Citations linking to the span provenance from M11, as retrieved by M18. Honest failure states. The 402/upgrade path. Accessibility checked with axe-core in CI and one pass with a real screen reader.',
  gate:{ referee:'Your reviewer, with a screen recording, the cost meter, and axe-core in CI.',
         pass:'Demonstrate refresh-mid-generation recovery live. Show the stop button effect in the cost meter. Report time-to-first-token. Axe-core passes on the chat surface, plus one recorded real-screen-reader pass showing the aria-live re-read behavior present and then fixed.',
         onFail:'The stop button stops the UI only.' },
  note:'The direction in Next.js is explicit opt-in: fetch, GET route handlers and the client router cache no longer cache by default, and the use cache directive is how you opt back in. Statically rendered routes are still cached. "It caches nothing by default" is the overstatement that gets you a follow-up you cannot survive — check the current documentation the week you build this and write down what you found.' },

{ id:'M23', layer:6, hours:48, dependsOn:['M5','M9','M12'], kind:'EVIDENCE',
  title:'Deployment, CI/CD, and Operating It',
  artifact:'The flagship full pipeline: OIDC secrets with no stored keys (the model API key is the one documented exception, scoped and spend-capped; a second exception is added if M26 is already built), required checks including the M12 eval gate. Then a feature-flagged release, a rollback rehearsed under a timer measured from the dashboard, not a stopwatch, an expand/contract migration run through the pipeline while the M5 load generator fires with zero failed requests, and one burn-rate alert that fired for a real reason. Plus one dockerized cloud deploy with an IAM role you wrote and can explain.',
  gate:{ referee:'Your reviewer, holding a timer driven by the monitoring and reading the load generator error count.',
         pass:'Roll back a bad deploy in under five minutes while narrating. Migration under load with zero failed requests. Explain, naming the specific lock type, why a naive migration takes a site down and why yours does not. Name every consumer of one flagship endpoint and how you would discover one you did not know about from production logs alone.',
         onFail:'The migration dropped requests. Expand/contract was not actually expand/contract.' },
  note:'Roll back when you suspect your change caused the problem. Waiting for proof is how a five-minute rollback becomes an hour of debugging in production.' },

{ id:'M24', layer:6, hours:15, dependsOn:['M9'], kind:'LAB',
  title:'Python On-Ramp',
  trigger:'Moves earlier, right after M12 and the hard gate, if eight or more of the twenty postings you read in M0 ask for Python. M25 follows it. Plan on that happening: Python appears in most AI-engineering postings, so the trip-wire is the base case and this late slot is the exception. The bet this program is actually making is that learning correctness once in TypeScript and then porting it beats splitting your attention across two languages from month one — not that you can avoid Python.',
  artifact:'Current tooling: uv, ruff, and one type checker you pin by name and version — mypy and pyright are the two you will meet most, with faster newer ones arriving; pick one, write down which and when you chose it, and expect the name to age faster than the idea. Python semantics where they differ from TypeScript. pytest. Type hints with a checker in CI. pydantic as the validation boundary. One typed FastAPI route with a test.',
  gate:{ referee:'Your reviewer, with a timer.',
         pass:'Add a typed route and a test to your own small Python service in 60 minutes, and explain each place the idiom differs from what you would write in TypeScript.',
         onFail:'The idiom is wrong. A passing test cannot catch this — that is why the referee is human.' } },

{ id:'M25', layer:6, hours:35, dependsOn:['M24','M12'], kind:'EVIDENCE',
  title:'Python as a Second Production Language',
  artifact:'M12 eval runner ported to Python, so this module extends something you already built rather than standing alone. Typed request/response models, streaming, a pytest suite faking the model client, type checker green in CI, plus a written runtime diff including a reproduction of a blocking call freezing the asyncio loop and its fix.',
  trigger:'Follows M24. Both move earlier, right after M12 and the hard gate, if eight or more of the twenty postings you read in M0 ask for Python, which is the likely case. Otherwise they wait until here. If the trip-wire has fired, do not then reach for the cut order’s "M25 second half" line, whose condition is the inverse: you cannot both move Python earlier because the market asks for it and cut it because the market does not.',
  gate:{ referee:'A timer, plus a Python-fluent OSS maintainer reviewing a real PR.',
         pass:'Add a typed route and test to an unfamiliar Python service in 90 minutes, and have a Python-fluent reviewer confirm there are no idiom comments to make. Gate on that, not on the merge: M15 says not to condition your progress on a stranger’s inbox, and maintainer merge latency runs to months and sometimes to never. Track the merge as a lagging item instead — something you log when it happens rather than wait for. M27 does the same thing with its own second gate.',
         onFail:'You are writing TypeScript with Python syntax. A passing test cannot catch this.' } },

{ id:'M26', layer:6, hours:23, dependsOn:['M7','M21','M22'], kind:'EVIDENCE',
  title:'Third-Party Integration as a Consumer',
  artifact:'A real OAuth connection in the flagship including the consent surface: connect and callback routes with state and PKCE verified by a written attack attempt, a connections settings screen, a scope-upgrade re-consent path actually exercised, an in-chat degraded state. Envelope encryption with a per-row key reference, a stated master-key location per environment, and a written rotation procedure. Automatic refresh and a revocation-recovery path that re-prompts.',
  gate:{ referee:'The provider’s own API. You revoke the grant yourself, from the provider’s settings screen, while a background job is running; your reviewer watches the alert fire and reads the log. Nobody but you touches that account — a reviewer cannot revoke a grant on an account they do not own, and handing them your provider credentials to arrange it is a worse idea than the gate is worth.',
         pass:'Revoke during a background job and assert the job alerts rather than failing silently. Demonstrate scope-upgrade re-consent. The CSRF attempt against your callback fails.',
         onFail:'The 401 surfaces as a generic error, or the state parameter is decorative.' } },

// ─────────────── LAYER 7 · THE MARKET (by trigger) ───────────────
{ id:'M27', layer:7, hours:11, dependsOn:['M0'], kind:'EVIDENCE',
  trigger:'One month before your application date, whatever else is unfinished. It stays in every version of the program, including the Spine.',
  title:'Pay, Terms, and the Negotiation',
  artifact:'The tax structures here are the United States ones (W-2 and 1099). If you are somewhere else, substitute your own two employment structures; the exercise is identical. A pay floor and target with the postings that justify them. A spreadsheet modeling the same headline number as W-2 vs 1099 with self-employment tax, health insurance and unpaid time off. A negotiation script rehearsed out loud and recorded, together with a 30-second background answer and a one-line reply to each of the six predictable follow-ups. Plus a references plan: three real people secured before your first offer — your reviewer, one person from your warm list, and a maintainer from Track 2 if that track is running. If you paid your reviewer, say so when you offer them as a reference. It is still a strong reference, a checker will ask what your working relationship was, and the disclosure costs you nothing while being caught out costs you the loop. And know the difference between a reference and employment verification: references speak to your work; employment verification checks employment records, which you do not have, so a background check will ask for 1099s or client invoices instead. Say up front that the last year was self-employed rather than letting it surface at the offer.',
  gate:{ referee:'Gate A (controllable, one month before your application date): your reviewer playing a recruiter briefed to push back on your number. Gate B (lagging): a real recruiter screen, logged in the funnel table when it happens. Tick this module on Gate A; Gate B depends on a stranger replying and never holds up the ladder.',
         pass:'State your floor out loud without hedging, recorded. And deliver a 30-second background answer with no apology and no hedge, plus a one-line non-defensive answer to each of the six predictable follow-ups: not currently employed? what title? how big was the team? who was the client? why no degree? what have you been doing since? Two of those six have no answer inside a framing that hides how you spent the year, so do not use one. Say what is true: full-time self-directed work on an app you built and operate, with a working engineer reviewing your code and an eval harness gating its CI, no client and no team. If they ask how you learned, name the program and offer to show it, including where it was wrong and what you changed. That answer survives all six follow-ups; a framing engineered to be indistinguishable from employment survives two, and the moment a hiring manager works out which one you chose, the loop is over.',
         onFail:'You hedged. That is the rep. Do it again next screen.' } },

{ id:'M28', layer:7, hours:8, dependsOn:['M10'], kind:'EVIDENCE',
  trigger:'Your application date: the target you set in M0. It does not move because a module is late. If M10 has not passed by then, you apply with what you have and say in the re-plan what you are applying without. Applications need a resume on that date, not a year later.',
  title:'The Evidence Layer v1',
  artifact:'A resume mapping each claim to a repo. Two pinned repos: the flagship and one other Evidence artifact. A README in product-spec form. Only Evidence artifacts are pinned — the labs are private. Plus the sentences you will be asked for in a first screen, rehearsed — but only the ones that are true on the day this module fires. Distributed systems: the M8 durable queue, at-least-once delivery and what your idempotent consumer actually guarantees. Algorithms: the complexity work in M5, against your own measurements. The fine-tuning answer and the framework answer are not yours yet: the first needs your own eval numbers (M12) and the second needs the hand-rolled agent loop (M19), and rehearsing either before those exist is rehearsing something you cannot back. They are in M29, where the artifacts behind them exist.',
  gate:{ referee:'Two strangers, each from a place you name in advance where this ask is on topic and welcome — a chat server for a language or framework with a feedback or show-and-tell channel, a project’s own discussions tab, or a local meetup’s chat. Post the README link with one line: "Five minutes, three questions, no back-and-forth: what does this do, who is it for, what does it refuse to do?" Five-minute timebox each, answers in writing. Then a third pass you run yourself against the written answers: for each question, mark the exact sentence in the README they got it from, and if there is no such sentence, that is the finding.',
         pass:'2/2 on all three questions, plus your own marked-up README showing where each correct answer came from.',
         onFail:'Rewrite, then two fresh strangers. Nobody is burned permanently — a person who has read v1 can read v3 cold if enough has changed, and treating a scarce resource as single-use is how you run out of it.' } },

{ id:'M29', layer:7, hours:12, dependsOn:['M18','M20','M28'], kind:'EVIDENCE',
  trigger:'After M18 and M20, once you have measured numbers worth publishing.',
  title:'The Evidence Layer v2',
  artifact:'The flagship README carrying the eval numbers including the failing v1 — the improvement delta is the evidence of engineering; a single good number could have been luck. A decision log of the five choices that mattered. One public write-up of a measurement you made. The final pinned three: the flagship, the open-source contribution history, and one design doc or public write-up. Plus the two sentences M28 could not honestly rehearse, now that what they describe exists: fine-tuning, answered with what each cheaper rung cost and the number from your own eval set that says the earlier rungs had not run out; and frameworks, answered with the hand-rolled agent loop at the wire level, the same agent on an SDK tool runner, and your written account of what the hooks bought and what they hid.',
  gate:{ referee:'The same protocol as M28 — two strangers from a named, on-topic place, plus your own marked-up pass — with people who have not seen v1.',
         pass:'They can state the cost per user and the quality number from the README alone.',
         onFail:'The README is a feature list, not a product spec plus decision record.' } },

{ id:'M30', layer:7, hours:38, dependsOn:['M28'], kind:'EVIDENCE',
  trigger:'Ten hours the week M28 passes, which is your application date, for a first practice interview. The remaining hours in the eight weeks before your first real one.',
  title:'Interview Performance',
  artifact:'A recorded 10-minute flagship walkthrough in decision language. Three timed foreign-repo bug fixes from the blind queue, with assistant transcripts annotated. Top the queue up first: the commits you saved in M1 are fifteen to twenty months old by now, and a repo moves — dependencies stop resolving, the test framework gets replaced, the surrounding code gets rewritten, and a revert that produces a merge conflict instead of a red test is a different exercise. Find five fresh ones the week you start, and for each of the ones you use, check out the parent and confirm the suite is green there before you revert anything. You still never read the fix commits. Two recorded mock defenses with a real person who pushes back. Plus about 8 hours of behavioral rehearsal against the M0 incident log. You will not have twenty stories with other people in them by now, and it does not matter: you will have a handful of real ones with another person in them — a review that rejected a boundary, a maintainer who rewrote your approach, an estimate that blew up, a game-day partner who could not follow your runbook — and a much larger number about your own system. Both are usable in an interview. Know which is which, and lead with the first kind, because the round that matters most is the one asking how you work with people. The narrated-problem log lives in Track 9\u2019s weekly slot (Tracks tab).',
  gate:{ referee:'Three referees: your mock interviewer for the first two, your reviewer for the third.',
         pass:'(1) Solve an unseen problem out loud in about 30 minutes with autocomplete disabled. (2) Drive an assistant through an unfamiliar bug while someone watches, narrating every point where you verified rather than accepted. (3) Answer three behavioral questions cold with three different stories, none about a decision made alone.',
         onFail:'Watch the transcript back and name where you delegated something you should have verified. That is the rep.' } },

// ─────────────── LAYER 8 · EMPLOYED MODE ───────────────
{ id:'M31', layer:8, hours:10, dependsOn:['M0'], kind:'LAB',
  trigger:'Your first final-round interview, the same moment as M32. It is the last point at which you can write this with a clear head, and it usually lands one to three weeks before an offer. Written before the hire, used after it. A hire that arrives before you finish is a success, not a failure, and it is the outcome this plan is shaped for. That is not a prediction about what will happen to you.',
  title:'Employed Mode',
  artifact:'A second operating contract: a realistic employed weekly budget (5-8h, not 18) and a module order driven by what the job needs first. Do the arithmetic on what is left before you write the order. A hire at the application date leaves around 665 module hours unfinished, and at six or seven hours a week that is close to two more years of evenings on top of a full-time job. Decide in this module which of it you will actually finish and which you are deliberately abandoning, and write both lists down. That decision is what the second operating contract is for; the alternative is two years of quietly falling behind a plan you never renegotiated. Track 4 retargeted from your own artifacts to a component of the employer\u2019s codebase. The reviewer relationship re-contracted or deliberately replaced, decided before the start date. The monthly re-plan surviving with new inputs. The estimate log continuing against real tickets from week one. Plus two scheduled written manager checkpoints at week 6 and week 14, scripted before the start date.',
  gate:{ referee:'Your manager, at the week-6 and week-14 checkpoints, answering in writing.',
         pass:'You asked directly whether you are where they would expect, and you have the written answer.',
         onFail:'You did not ask directly, or you have no written answer. Ask the plain question at the next one-to-one and write the reply down the same day.' } },

{ id:'M32', layer:8, hours:6, dependsOn:['M0'], kind:'LAB',
  trigger:'Your first final-round interview.',
  title:'The First 90 Days',
  artifact:'A 30/60/90 plan against a real posting with week-one manager questions. A reusable asking-for-help template practiced for real by posting three genuine questions in an OSS project Discord or Slack, responses kept. An org map inferred from the repo’s history — who touches what, from git log by author — nothing beyond what M1 taught. A handoff note good enough for a stranger to continue. Plus inheriting an AI system you did not build: reading someone else\u2019s prompts, evals and traces, using whatever of M12 and M17 you have passed; prompt archaeology on a system with no decision log. Plus a WIP policy computed from your own Track 2 review-latency data, and one recorded 45-minute pairing session with another person on a real bug in an unfamiliar repo.',
  gate:{ referee:'Real strangers in a real channel, and a recording.',
         pass:'State which prompt in the inherited system you would change last of all, and why. Three genuine questions posted and answered. Record yourself pairing with another person for 45 minutes on a real bug in an unfamiliar repo, narrating throughout, and watch it back. State your median review latency from your own data and your WIP policy from memory.',
         onFail:'You asked for the answer instead of stating what you tried, expected, saw, and currently believe.' } }
];

// Parallel tracks: mandatory, continuous, and budgeted. Their hours are in
// the headline total.
var AI_TRACKS = [
  { id:'T1', title:'Job search — three channels, not one', hours:200, cadence:'3-4 hours a week, from your application date',
    rule:'A cold application is a resume sent to a posting where nobody knows you. A referral is someone inside vouching for you. Referrals convert far better than cold applications at every stage of the funnel, plausibly by something like an order of magnitude — but no public number is segmented for a candidate like you, the figures that circulate measure three different things (reply rate, screen rate, share of hires) and get quoted interchangeably, and none of them is a number you should say out loud in an interview. Treat the direction as real and the size as unknown. Your own funnel table in Track 8 will produce your two rates by about month nine, and when it does, it replaces this paragraph. So the 200 hours split three ways. Warm, about 70 hours: the real people you have met through this program, and asking them. Direct, about 50 hours: emailing the engineer or founder who owns the problem your app solves, opening with one number you measured, about fifteen a month. Cold, about 80 hours, six or seven a month, kept mainly so you can compare the other two against it. Lean on warm for the first six months of applying, when a person vouching makes up for a half-built portfolio; lean on direct after that, when your numbers can carry the email. There is no total cap, and a number invented here would contradict the cadences above anyway — fifteen direct and six or seven cold a month is more than 250 over a year of applying. What replaces a cap is a rule: stop adding volume to a channel whose funnel table shows no human contact, and spend those hours on the channel that does. For the first two months, apply to companies you do not want, so the mistakes are cheap. Most applications get silence; the goal in that period is learning what the process asks for, not an offer.' },
  { id:'T2', title:'Open-source contributions — and the ask', hours:80, cadence:'about 8 hours a month; you start submitting small fixes after M9',
    rule:'Open source means code published for anyone to read, use and change. A contribution counts if it changes behavior, is 20 to 200 lines, includes a test, and has survived a round of review by the maintainer, the person who runs the project. Aim for three submitted to three projects and carried through review, with the review conversations kept, plus a note on each about what the maintainer asked you to change and why they were right. Acceptance is the lagging half: merge latency on a healthy project runs from days to months and sometimes to never, so track merges but do not gate yourself on them, exactly as M15 says. Get one submitted and reviewed within two months of your application date: the gap between none and one is far bigger than the gap between one and three. Then the ask. After your first accepted contribution to a project, write to its maintainer: what you are looking for, what you built, whether anything is open where they work, whether they would refer you, and that no is a completely fine answer. Three asks in your first year of applying. Those maintainers become both your references and your referrals, and you ask while the work is fresh.' },
  { id:'T3', title:'The dependency spiral', hours:0, cadence:'built into the modules',
    rule:'Each module’s artifact is built on top of an earlier one, so old work keeps being used and does not rot. It costs no extra hours. It is not enough on its own: most modules are never touched again once they are passed, and that is what the Sweep (T10) is for.' },
  { id:'T4', title:'Weekly cold rebuild', hours:60, cadence:'45 minutes a week',
    rule:'Pick something you built three to eight weeks ago and rebuild its core from an empty file with the original closed. Score yourself 0 to 3. Which artifact you pick is driven by your Sweep scores (T10) once those start in month four; before that, oldest first. This 45 minutes is the minimum for a bad week, and nothing else is ever booked into it.' },
  { id:'T5', title:'Reviewer relationships', hours:26, cadence:'about an hour most months, more in the four or five that carry a heavy gate',
    rule:'Three people, three deadlines. A code reviewer before M1\u2019s gate. Someone who runs systems for a living and can try to break yours, by M10. A mock interviewer one month before the application date you set in M0, because M27 fires then and its Gate A is a rehearsed recruiter call with that person. In practice that is around M9, and it is earlier than it sounds — recruiting someone credible at mid-level takes weeks, so start asking two months out. M13 and M30 use the same person. Ask for the right amount. Most months they spend about an hour; four or five months across the whole program are heavier, because a gate asks them to plant a bug, label thirty traces against your rubric, or sit through a mock interview. Tell them that when you ask, and name the heavy months, so nobody is surprised into quitting. If no person is available for a gate, an AI assistant may stand in once per attempt; the whole conversation is kept, failures included, and a failed AI review counts as a failed gate.' },
  { id:'T6', title:'Agent discipline', hours:0, cadence:'a habit',
    rule:'An AI coding assistant may answer your questions but may never write your code for you until you reach M16. From M16 you follow a written policy for what it is allowed to do on its own. The one exception is M30\u2019s interview drills, where driving an assistant is the skill being tested.' },
  { id:'T7', title:'Writing — and posting it somewhere', hours:30, cadence:'one piece per layer, Layers 2 to 6',
    rule:'Five pieces, each about something you measured. Every piece is posted to at least one named place where working engineers actually read it, and everyone who responds goes on your list of real people. Writing nobody reads is a diary. Posting it takes about fifteen minutes, and those fifteen minutes are what turn the other five hours into something a person can find.' },
  { id:'T8', title:'Monthly re-plan — with a funnel table', hours:34, cadence:'2 hours a month; continues after you are hired',
    rule:'Once a month, sit down with three inputs. The skills counted across the 20 to 40 job postings you screened that month — a fresh batch, not the twenty you read in M0 — which tell you what the market wants without anyone replying to you. Your delta notes. And a funnel table for each job-search channel: how many sent, how many replies, how many screening calls, how many full interview loops (a company’s full set of interview rounds for one candidate), how many offers, and human contacts per hour spent. Two rules, and both are about not fooling yourself with a small sample. Do not reallocate on a quarter of silence: at six or seven cold applications a month, a quarter with no reply is entirely consistent with a channel that works, and you cannot tell a dead channel from an unlucky one at that volume. Reallocate on contacts per hour, compared across channels, once each channel has at least twenty attempts behind it — and say out loud how wide the interval around each rate is, the same discipline M12 grades you on. Second: if a full quarter of applying produces no conversation with a human at all, across every channel, the problem is the channel mix or the evidence rather than the effort; the response is to have three people who actually hire read your resume cold, not to send more. Falling six weeks behind for two months in a row switches you to the Spine.' },
  { id:'T9', title:'Narrated problems — practice for the coding screen', hours:25, cadence:'about 30 minutes a week, from your application date',
    rule:'A coding screen is an interview where you solve a small problem while talking through your thinking. Twenty-four problems, three from each of the eight shapes that come up: arrays and hashing (lookup by a computed key), two pointers (walking a list from both ends), sliding window (a moving range over a list), binary search (halving a sorted list), stacks (a last-in first-out pile), intervals (ranges on a line), trees (a branching structure). The eighth is heaps: here, a structure that always hands you the smallest or largest item, not the memory heap of M4 or the table heap of M5. Each is chosen because the same shape appears in your own app: a set for removing duplicates in M7, sorting and binary search for ranking in M18, a heap for the reranker, a sliding window for rate limiting in M7. One first pass of about 30 minutes, spoken aloud with autocomplete off; one repeat two to four weeks later. Scored 0 to 3; three scores below 2 in a row on a shape re-open that shape. Twenty-four is the floor, not a claim about the market: it is chosen because it is what fits alongside everything else. Plenty of AI-product companies, including well-funded ones hiring remotely, still run a conventional algorithm screen, and you will not know which until you are in one. If M0’s twenty postings or your Track 8 screening say algorithm screens are common in your funnel, raise this number and take the hours from the numbered cut order rather than from the modules.' },
  { id:'T10', title:'The Sweep — retrieval practice', hours:15, cadence:'15 minutes a week from month four',
    rule:'Retrieval practice is pulling answers from memory — the study technique, not M18’s document search. Five prompts, a blank box, written from memory, no notes and no multiple choice. The prompts are the concept and pitfall lines from the modules themselves, one cue each. Score as a fraction, items you produced over items in that module’s list, so you cannot move the goalposts after seeing the answer. Selection is error-driven: weighted toward your lowest last score and toward modules nothing later builds on, which would otherwise never be touched again. This is the answer to being interviewed long after on month-one material.' }
];

var AI_COMPRESSED_SPINE = ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M9', 'M10', 'M12', 'M27', 'M28', 'M30'];
// M27 and M28 are non-droppable in every variant. The Spine exists to get you to a job:
// M27 is the pay conversation, and M28 is the resume the applications on your application
// date need that day. Neither is ordered by dependsOn — both are trigger-scheduled off a
// date on your plan rather than off finishing a module — so the ladder cannot enforce this
// one; the triggers do. M27 fires a month before the date, M28 on it.
// Spine track policy (priced in plan()): T7 suspended, T4 every other week, T2 cut to
// 40 hours rather than suspended, the rest unchanged.
//
// T2 survives the Spine at 40 hours rather than being suspended. The Spine is prescribed
// to the reader with the shortest runway — the one who most needs a fast hire — and T2 is
// the track that manufactures the people who can refer you, which is the largest lever
// this program has. It is also where M27's references plan finds its maintainer. Forty
// hours is one accepted contribution and then the ask, which is the part that matters;
// the second and third contributions are what the Spine drops.
var AI_SPINE_TRACK_HOURS = { T1:200, T2:40, T3:0, T4:30, T5:26, T6:0, T7:0, T8:34, T9:25, T10:15 };
// The Spine also drops M14 and M17, and a contract role — the thing the Spine aims at —
// is the most likely of all to drop you into an unfamiliar codebase with a scoped
// deliverable and no ramp, which is exactly what those two modules are. That is a real
// cost of the Spine, not an oversight: budget the first month on the job for them.
var AI_CUT_ORDER = ['M26','M25 second half','M16'];
// M32 is not in the cut order: it is the only module that owns seamlessness into
// real work, which is half the stated goal.
// 23h + ~18h + 28h = 69 hours back, in this order.

var LAUNCHPAD_CONFIG = {
  brand: 'LAUNCHPAD',
  name: 'AI Product Engineering',
  tag: 'HIREABLE · REMOTE · PRODUCTION',
  tagline: 'Every module ends in something you built and can explain out loud.',
  accent: '#4db8ff',
  glyph: '⬢',
  key: 'apex_launchpad_v1',
  // A three-line restatement of rules 1, 2 and 5 for the header. The numbered
  // rules live in LAUNCHPAD_RULES above; this is not a second numbering of them.
  creed: [
    'You do not advance by reading. You advance by shipping a working thing.',
    'A gate with no referee is decorative. Every gate here names who says yes.',
    'Read the official documentation before you build. Write the delta. The field moves.'
  ],
  // The honest description of what a tick in this app is. The creed says a gate with
  // no referee is decorative, and every tick here is a box you press yourself — so the
  // tick is not the gate. It is your record of what a referee told you. Write their
  // name, the date and one line of what they said in your own notes beside it. The
  // record is worth exactly what your honesty is worth, and nobody else can audit it.
  gateRecord: 'Ticking a gate here does not pass it. It records that a named referee '
    + 'passed you: write who, the date, and one line of what they said. An unnamed tick '
    + 'is the decorative gate this program exists to refuse, and you are the only person '
    + 'who can tell the difference.',
  // Belongs to the tracks page as a whole, not to any one track.
  tracksNote: 'Month numbers anywhere in this program assume 18 hours a week; The Plan shows your own.'
};

// ── Graph validation. Rule 2 says every module except M0 has an inbound edge,
// ── and the LONGEST PATH — not the hour sum — sets the timeline.
var AI_CURRICULUM_API = {
  byId: function (id) { return AI_CURRICULUM.filter(function (m) { return m.id === id })[0] },

  byLayer: function (n) { return AI_CURRICULUM.filter(function (m) { return m.layer === n }) },

  // A module is available when every module it depends on has its GATE passed.
  // A trigger-scheduled module with no dependencies opens from day one; the ones
  // with dependencies wait for them like any other module.
  isUnlocked: function (id, progress) {
    var m = this.byId(id);
    if (!m) return false;
    // Layers 4-6 are the thirteen modules the hard gate exists to hold back.
    // Rendering the checklist without consulting it here left the gate
    // decorative, which Rule 1 of this curriculum specifically forbids.
    if (m.layer >= 4 && m.layer <= 6 && !this.flagshipGate(progress).open) return false;
    if (m.trigger && m.dependsOn.length === 0) return true;
    return m.dependsOn.every(function (d) {
      return progress && progress[d] && progress[d].gate;
    });
  },

  // What the reader could legitimately start right now.
  available: function (progress) {
    var self = this;
    return AI_CURRICULUM.filter(function (m) {
      var p = progress && progress[m.id];
      return !(p && p.gate) && self.isUnlocked(m.id, progress);
    });
  },

  // The Layer 3 -> Layer 4 hard gate. Not a module — a precondition with teeth,
  flagshipGate: function (progress) {
    var f = (progress && progress.__flagship) || {};
    // M0 documents a labeled fallback for a reader who cannot get real users: a public
    // corpus with real human labels you create yourself. The gate used to have no branch
    // for it, so a reader who took the documented fallback was locked out of Layers 4-6
    // or had to tick a box that was false. Both lines now name the substitution, and the
    // cost of taking it has to be written down, because it is a real cost.
    var items = [
      { key:'deployed', label:'Flagship deployed and reachable' },
      { key:'users',    label:'Two real users who are not you — or the labeled fallback taken in their place, with what it costs you written down' },
      { key:'traces',   label:'About 100 logged traces containing real failures. If you took the fallback above: 100 cases you labeled yourself over a public corpus' },
      { key:'ci',       label:'M12 harness green in CI against those traces' }
    ];
    var done = items.filter(function (i) { return f[i.key] }).length;
    return { items: items, done: done, total: items.length, open: done === items.length,
             note: 'What no version of this gate accepts is a tick with nothing behind it. '
                 + 'Whichever line you took, write down who used it or what corpus you labeled, and when.' };
  },

  // The plan arithmetic. The headline includes the parallel tracks, because
  // M0's whole claim to authority is that runway sets
  // the deadline. So this derives weekly hours from runway rather than
  // assuming a number, and says plainly when the answer is "take the Spine."
  plan: function (setup) {
    var WK = 4.345;                                  // weeks per month
    var tot = this.totalHours();
    var full = tot.modules + tot.tracks;             // module hours + track hours
    var self = this;
    var spineMods = (typeof AI_COMPRESSED_SPINE !== 'undefined' ? AI_COMPRESSED_SPINE : [])
      .reduce(function (a, id) { var m = self.byId(id); return a + (m ? m.hours : 0) }, 0);
    // The Spine keeps the job search and the weekly habits and drops the rest;
    // AI_SPINE_TRACK_HOURS prices that policy track by track.
    var policy = (typeof AI_SPINE_TRACK_HOURS !== 'undefined') ? AI_SPINE_TRACK_HOURS : {};
    var spineTracks = (typeof AI_TRACKS !== 'undefined' ? AI_TRACKS : []).reduce(function (a, t) {
      return a + (policy[t.id] !== undefined ? policy[t.id] : t.hours); }, 0);
    var spine = spineMods + spineTracks;
    var CEIL = 18;                                   // hours a week the program assumes anyone can sustain

    var s = setup || {};
    var wk = Number(s.weeklyHours) || 0;
    var runway = Number(s.runwayMonths) || 0;

    function months(hours, perWeek) { return perWeek > 0 ? hours / perWeek / WK : null; }
    // What you'd need per week to land inside the runway.
    function needed(hours) { return runway > 0 ? hours / (runway * WK) : null; }

    // Hours a week the parallel tracks actually consume BEFORE the application date,
    // read off their own cadence lines: T4 45 minutes a week, T10 15 minutes, T8 two
    // hours a month, T5 about an hour most months, T7 one piece per layer, T2 about
    // eight hours a month once it starts after M9. T1 and T9 do not begin until the
    // application date, so they are zero here.
    var PRE_APPLY_TRACK_RATE = { T1:0, T2:1.8, T3:0, T4:0.75, T5:0.25, T6:0, T7:0.4, T8:0.46, T9:0, T10:0.25 };
    var preTrack = Object.keys(PRE_APPLY_TRACK_RATE).reduce(function (a, k) { return a + PRE_APPLY_TRACK_RATE[k] }, 0);
    var applyMods = this.byLayer(0).concat(this.byLayer(1), this.byLayer(2))
      .reduce(function (a, m) { return a + m.hours }, 0);
    var modWeekly = wk > preTrack ? wk - preTrack : 0;

    var fullMonths  = months(full, wk);
    var spineMonths = months(spine, wk);
    var needFull    = needed(full);
    var needSpine   = needed(spine);

    var rec, why;
    if (!runway || !wk) {
      rec = 'unset';
      why = 'Enter your runway and the hours you can actually commit. Everything downstream derives from these two numbers.';
    } else if (needFull && needFull <= wk) {
      rec = 'full';
      why = 'The full program fits inside your runway at the hours you committed, with room. '
          + 'You need ' + needFull.toFixed(1) + ' h/week and you have ' + wk + '.';
    } else if (needFull && Math.round(needFull * 10) / 10 <= CEIL) {
      rec = 'full-tight';
      why = 'The full program fits your runway only at ' + needFull.toFixed(1) + ' h/week — above the '
          + wk + ' you committed but under the ' + CEIL + ' the program assumes anyone can sustain. '
          + 'Either raise the hours honestly or plan on the Spine.';
    } else if (needSpine && Math.round(needSpine * 10) / 10 <= CEIL) {
      rec = 'spine';
      why = 'Finishing the full program inside your runway would take ' + (needFull ? needFull.toFixed(1) : '?')
          + ' h/week, above the ' + CEIL + ' hours a week the program assumes anyone can sustain. The Spine needs '
          + (needSpine ? needSpine.toFixed(1) : '?') + ' h/week' + (needSpine > wk ? ', more than the ' + wk + ' you committed' : '') + '.';
    } else {
      // A distinct value, because this is not the same answer as the branch above.
      // There the Spine fits; here nothing fits and the recommendation is the Spine
      // PLUS paid work, which is a different plan and a consumer has to be able to
      // tell the two apart.
      rec = 'spine-plus-contract';
      why = 'Neither program fits your runway under ' + CEIL + ' h/week: the full program needs '
          + (needFull ? needFull.toFixed(1) : '?') + ' and the Spine needs ' + (needSpine ? needSpine.toFixed(1) : '?')
          + '. Take the Spine, get a contract role, and learn the rest on someone else’s payroll. '
          + 'This is a financial decision, not a technical one. Know what it costs you: the Spine keeps fourteen '
          + 'modules and drops nineteen, including the whole AI layer, deployment and Python. The two that will hurt '
          + 'first are M14, reading code you did not write, and M17, scoping and estimating — because a contract role '
          + 'is the most likely of all to drop you into an unfamiliar codebase with a scoped deliverable and no ramp. '
          + 'Budget your first month on the job for them.';
    }

    return {
      fullHours: full, spineHours: spine, spineModuleHours: spineMods, spineTrackHours: spineTracks,
      moduleHours: tot.modules, trackHours: tot.tracks,
      weeklyHours: wk, runwayMonths: runway,
      fullMonths: fullMonths, spineMonths: spineMonths,
      neededForFull: needFull, neededForSpine: needSpine,
      recommend: rec, why: why,
      // Applications start once Layers 0-2 are behind you, not when everything is.
      applyAfterHours: applyMods,
      // And the month that lands in is NOT applyAfterHours / weeklyHours. The weekly
      // ceiling is the whole commitment, tracks included, so the tracks already running
      // before the application date take their hours out of it first and the modules get
      // what is left. Dividing module hours by the full weekly budget is the module-only
      // headline this program opens by condemning, and it errs in the dangerous direction.
      applyTrackHoursPerWeek: preTrack,
      applyModuleHoursPerWeek: modWeekly,
      applyAfterMonths: (modWeekly > 0 ? applyMods / modWeekly / WK : null),
      applyNote: 'Applications start ' + applyMods + ' module hours in, but the tracks running '
        + 'alongside take about ' + preTrack.toFixed(1) + ' h/week out of your weekly budget first. '
        + 'Use applyAfterMonths, not applyAfterHours divided by your weekly hours.'
    };
  },

  progressSummary: function (progress) {
    var doneH = 0, gated = 0, arts = 0, deltas = 0;
    AI_CURRICULUM.forEach(function (m) {
      var p = (progress && progress[m.id]) || {};
      if (p.gate) { gated++; doneH += m.hours; }
      if (p.artifact) arts++;
      if (p.delta) deltas++;
    });
    var tot = this.totalHours();
    return {
      modulesDone: gated, modulesTotal: AI_CURRICULUM.length,
      artifactsDone: arts, deltasDone: deltas,
      hoursDone: doneH, hoursTotal: tot.modules,
      pct: tot.modules ? Math.round(doneH / tot.modules * 100) : 0
    };
  },

  totalHours: function () {
    var mod = AI_CURRICULUM.reduce(function (a, m) { return a + m.hours }, 0);
    var trk = AI_TRACKS.reduce(function (a, t) { return a + t.hours }, 0);
    return { modules: mod, tracks: trk, total: mod + trk, count: AI_CURRICULUM.length };
  },

  // Longest dependency path in hours — the real floor on calendar time.
  // The hard gate is a real edge even though it is not in dependsOn: isUnlocked
  // holds every Layer 4-6 module behind it, and the four things it asks for can
  // only come from M2 (deployed, users), M10 (traces) and M12 (green in CI). A
  // longest path that reads dependsOn alone therefore reports a floor lower than
  // the program can actually be run in. These are added here, and nowhere else,
  // so the displayed prerequisites on a module page stay the ones the module
  // itself declares.
  GATE_EDGES: ['M2', 'M10', 'M12'],

  criticalPath: function () {
    // The graph is a constant; the walk is not free and every render asked for
    // it. Computed once, then handed back.
    if (this._cpCache) return this._cpCache;
    var memo = {}, onStack = {}, self = this;
    function walk(id) {
      if (memo[id]) return memo[id];
      // A cycle would recurse forever; validate() reports it, this survives it.
      if (onStack[id]) return { hours: 0, path: [] };
      onStack[id] = true;
      var m = self.byId(id);
      if (!m) { onStack[id] = false; return { hours: 0, path: [] }; }
      var best = { hours: 0, path: [] };
      var edges = m.dependsOn.slice();
      if (m.layer >= 4 && m.layer <= 6) {
        self.GATE_EDGES.forEach(function (g) {
          if (g !== m.id && edges.indexOf(g) === -1) edges.push(g);
        });
      }
      edges.forEach(function (d) {
        var r = walk(d);
        if (r.hours > best.hours) best = r;
      });
      onStack[id] = false;
      return (memo[id] = { hours: best.hours + m.hours, path: best.path.concat([id]) });
    }
    var winner = { hours: 0, path: [] };
    AI_CURRICULUM.forEach(function (m) {
      var r = walk(m.id);
      if (r.hours > winner.hours) winner = r;
    });
    this._cpCache = winner;
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
        errors.push('Graph check: ' + m.id + ' has no inbound dependency and no trigger');
      }
      if (!m.gate || !m.gate.referee || !m.gate.pass || !m.gate.onFail) {
        errors.push(m.id + ' gate is missing referee / pass / onFail');
      }
      if (/\b(he|she|they|you) can explain\b/i.test((m.gate && m.gate.pass) || '')) {
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
        errors.push('Ownership check: concept "' + c + '" has ' + owners.length + ' declared owners (expected 1)');
      } else if (owners[0].id !== AI_OWNED_CONCEPTS[c]) {
        errors.push('Ownership check: "' + c + '" declared by ' + owners[0].id + ', registry says ' + AI_OWNED_CONCEPTS[c]);
      }
    });

    // Rules 3 and 4 against each other: a concept listed as owned-once must never
    // appear in a spiral pair, and every owned concept must be in exactly one of the
    // two lists. Without this check, "never re-taught" and "deliberately taught twice"
    // could both claim the same concept — and for three of them, they did.
    var spiralConcepts = AI_SPIRAL_PAIRS.map(function (p) { return p[2] });
    AI_OWNED_ONCE.forEach(function (c) {
      if (spiralConcepts.indexOf(c) !== -1) {
        errors.push('Spiral check: "' + c + '" is listed as owned-once and also as a spiral pair');
      }
    });
    AI_OWNED_THEN_DEEPENED.forEach(function (c) {
      if (spiralConcepts.indexOf(c) === -1) {
        errors.push('Spiral check: "' + c + '" is listed as deepened later but names no spiral pair');
      }
    });
    Object.keys(AI_OWNED_CONCEPTS).forEach(function (c) {
      var inOnce = AI_OWNED_ONCE.indexOf(c) !== -1;
      var inDeep = AI_OWNED_THEN_DEEPENED.indexOf(c) !== -1;
      if (inOnce === inDeep) {
        errors.push('Spiral check: owned concept "' + c + '" must be in exactly one of AI_OWNED_ONCE / AI_OWNED_THEN_DEEPENED');
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
                     LAUNCHPAD_CONFIG: LAUNCHPAD_CONFIG,
                     AI_OWNED_CONCEPTS: AI_OWNED_CONCEPTS, AI_SPIRAL_PAIRS: AI_SPIRAL_PAIRS,
                     AI_OWNED_ONCE: AI_OWNED_ONCE, AI_OWNED_THEN_DEEPENED: AI_OWNED_THEN_DEEPENED,
                     LAUNCHPAD_RULES: LAUNCHPAD_RULES,
                     AI_COMPRESSED_SPINE: AI_COMPRESSED_SPINE, AI_CUT_ORDER: AI_CUT_ORDER,
                     AI_CURRICULUM_API: AI_CURRICULUM_API };
}

// ============================================================
// Concepts and failure modes, per module. Kept separate from the graph
// above so the dependency data stays readable. Merged in at load.
// `mistakes` is the "what most people get wrong" list — it is the half of
// this curriculum that stops you repeating a known-bad path, so it belongs
// in the app rather than only in the prose.
// ============================================================
var AI_DETAIL = {
M1:{concepts:['What a program is: a file of instructions a runtime (here, Node) reads top to bottom','The terminal as a place you type commands, and what a working directory means','Variables, functions, arguments and return values \u2014 the four things every program is made of','Conditionals and loops, and why a loop that never ends is the first bug everyone writes','Arrays and objects: a list of things, and a thing with named parts','Reading an error message: the type, the message, the file and the line number','What a test is \u2014 code that runs your code and says yes or no without you looking','git as a save-point system: what a commit is, and what branch, remote and getting back mean'],
 mistakes:['Following a tutorial to a working app and mistaking that for being able to write one. The gate here is an empty directory for exactly this reason.','Reading the error message as noise instead of as the answer. It names the file and the line, and usually it names the mistake too.','Copying code you cannot explain, which converts a 5-minute bug into a 2-hour one because you cannot form a hypothesis about your own program.','Setting up a perfect environment (your editor and installed tools) instead of writing programs. A slightly wrong editor that you use beats a perfect one you configure for a week.','Not committing until it works. The point of a save-point is to have one from before it broke.']},
M2:{concepts:['Client and server: what runs on someone else\u2019s machine and what runs on yours','An API key as a secret \u2014 why it cannot go in the browser, and how to prove it did not','Request and response: one round trip, start to finish','Environment variables and why the same code behaves differently in two places','Deployment as making the thing reachable, not as finishing it','Logging a call before you need the log, because usage you did not record is gone'],
 mistakes:['Putting the key in the client (the browser side) because it works. It works, and it is now public; scrapers (programs that automatically scan public repos for secrets) find committed keys in minutes.','Building the whole product instead of v1. Everything you are tempted to add here has a module later, and each one is easier on top of something already deployed.','Skipping the log because there is nothing to look at yet. M10 and M12 both read this log and neither can reconstruct a month of calls after the fact.','Calling it done when it runs locally. Two strangers on their own devices is the gate for a reason.']},
M0:{concepts:['Runway: how many months you can go without a paycheck. It sets the deadline. The topic list never did.','The second number in the runway calculation is the one nobody writes down: what this program costs to run. Model spend across M2, M6, M12, M18 and M19, hosting, a paid tier where a module needs one, and any money going to review or mock interviews. Estimate it, subtract it from the runway, and correct it every month. A plan that budgets 1,108 hours and zero dollars is the same error as one that budgets the modules and forgets the tracks.','The application date is a target you choose now from your runway, and it does not move because a module is late. M10 is the readiness condition, not the date: if M10 has not passed when the target arrives, you apply with what you have and write down what you are applying without. One definition, everywhere — because M27 has to fire a month before it and its gate has to be booked, which is impossible against a date that means "whenever M10 happens."','Before your application date you build; after it you keep building while you apply. The date decides what has to exist first, and that is most of the plan.','Why finishing a tutorial feels like learning and is not: it reads smoothly, so it feels understood; you recognize the answer when it is shown, but cannot produce it; you would swear you could explain it, until you try out loud.','A bad week is planned for, not recovered from. Decide now what one costs and what the week after looks like, so a missed week is a line in the plan rather than a broken streak.'],
 mistakes:['Building a tracker for the plan instead of doing the plan. The tracker is more pleasant than the work, and it feels like progress.','Budgeting the hours and not the money, then discovering in month five that the runway the whole plan rests on was never the real number.','Assuming the reviewer, the systems person and the mock interviewer will appear on their own. Two of the four ways this program suggests finding them cost money and two need a network, and the reader is described as having neither on day one. That is a real prerequisite; put the month it takes into the plan.','Setting every module to run five or six weeks because it feels serious. It breaks the monthly rhythm and you never get the feeling of finishing anything.','Treating the job search as the prize for finishing. It is the instrument that tells you which of your hours mattered.','Skipping the twenty postings because you already know what the job is. You do not yet, and reading them is the cheapest way to find out.']},
M3:{concepts:['The event loop: call stack, macrotask vs microtask queue','What a Promise actually is — a notification channel for work that already started','The four concurrency failure modes','Closures, lexical scope, this, reference identity — including warm serverless instances sharing module scope','Structural typing and where the type system lies to you','Parse, don’t assert — the trust boundary','Discriminated unions and exhaustiveness','Error taxonomy, cause chaining, retry safety','Modules and the bundle graph — the import graph is what ships'],
 mistakes:['Believing async means "runs in the background." An async function runs synchronously until its first await, and CPU work inside one blocks the process exactly as hard.','await inside a for loop over independent work — 200 x 200 milliseconds (ms) becomes 40 seconds. And the inverse: Promise.all over an unbounded array, firing 200 requests into a retry storm.','Silencing strict-mode errors with “as” and “!” instead of narrowing — converting a compile error into a runtime crash.','Modeling state as {loading, error?, data?} (the ? marks a field that may be absent), which permits four impossible combinations.','catch (e) { console.log(e) } and continuing — a loud failure becomes a silent wrong answer.']},
M4:{concepts:['References vs values: aliasing, shallow vs deep copy','Stack vs heap, object lifetime, why a server leaks','Number representation: floats, integer precision, the right type for money and IDs','Text encoding: bytes vs code points vs grapheme clusters, decoding a stream','JSON as a lossy boundary','Blocking: event loop, async I/O, threads, processes','File descriptors, sockets, pools, timeouts','Concurrent mutation (two things changing the same data at once): races, atomicity, idempotency','The lost update: two writers, one row, and the gap between reading and writing','Dates and timezones: DST’s doubled and missing hours, naive vs timezone-aware timestamps'],
 mistakes:['Believing {...obj} or JSON.parse(JSON.stringify(obj)) is a copy. The spread is one level. The JSON trick converts Dates to strings, drops undefined and functions, mangles Maps and Sets, and throws on cycles.','.toFixed(2) "solves" money by fixing the display and leaving the arithmetic wrong.','new TextDecoder() inside the loop — looks identical to correct code, discards the carried partial-character state that is the entire point.','"I’m using a pool" while N serverless instances each hold a pool of M.','Believing a transaction prevents the race. Atomicity is not isolation.']},
M7:{concepts:['HTTP as a wire format: the status codes and headers that carry meaning in practice — write your own list and be able to defend each entry, because "about twelve headers matter" invites "which twelve?" and there is no list you did not choose','REST and where it stops being the right answer','SSE and chunked transfer, from scratch, no SDK','Production streaming failures: proxy buffering, aborts, mid-stream errors, resumption','Idempotency — why a retry corrupts data unless designed for','Timeouts, backoff with jitter, which failures are retry-safe','Rate limiting from both sides','Webhooks: at-least-once, signature verification on the raw bytes','CORS; cookies vs bearer vs JWT and where each breaks'],
 mistakes:['chunk.toString().split("\\n") — corrupts output the moment a frame splits across TCP chunks, and works perfectly on localhost, so it ships.','Assuming HTTP 200 means the whole response succeeded. The status commits before the body exists.','Writing the assistant message to the database only in finally/onFinish, which on serverless may never run.','Everything returning 200 {ok:false}, which breaks every retry library, monitor and health check.','A client-generated idempotency key per render instead of per logical operation.','Doing webhook work before responding, so the provider times out and retries, multiplying the work.']},
M5:{concepts:['Relational modeling — constraints as the thing that actually enforces invariants','SQL without an ORM: joins, aggregates, CTEs, window functions','Indexes and EXPLAIN (ANALYZE, BUFFERS) — the slow-to-fast loop','Transactions, isolation, the lost update','N+1 queries','Connection pooling and the Vercel+Supabase failure mode','RLS: correct first, then fast','Expand/contract as a concept','Asymptotic complexity, taught here because here it is measurable','The planner: force each join strategy with enable_hashjoin/enable_mergejoin/enable_nestloop off and time all three on the same query, so its choice becomes a decision you watched it make','Estimated vs actual rows — the first thing to say about any plan; one query where stale ANALYZE or a correlated predicate breaks the estimate','The isolation levels: Postgres accepts four names and behaves in three ways, because READ UNCOMMITTED behaves as READ COMMITTED. Show that M4’s lost update survives READ COMMITTED (the default, which is why putting it in a transaction fails) and is caught under REPEATABLE READ — caught, not silently fixed: the transaction aborts with a serialization failure, and your application has to catch that and retry the whole transaction. The retry loop is the lesson; without it you have turned a silent wrong answer into a 500','MVCC and dead-tuple bloat: bulk update, watch the query slow with no code change, VACUUM, watch it recover'],
 mistakes:['Reading cost= as milliseconds. It is an arbitrary planner unit.','Benchmarking cold-then-warm so the cache gets the credit. Run each variant twice, report the second.','Assuming an index on (a,b) helps a query filtering only on b.','One single-column index per column instead of one correct composite — and forgetting each is a tax on every write.','Holding a transaction open across a model API call, turning a 200ms connection into a 30-second lock.','Schema changes in the dashboard table editor, which bypasses migration history.','USING (true), or a policy against a JWT claim the user can edit.']},
M8:{concepts:['Moving slow work off the request path','SELECT ... FOR UPDATE SKIP LOCKED','At-least-once delivery and idempotent consumers','Backpressure and dead-letter paths','The read path — polling, SSE and resumable streams are three different products'],
 mistakes:['Starting with a hosted queue and never learning the mechanism, which makes every operational question unanswerable.','Designing the queue and forgetting the read path. Enqueueing is the easy half.','Assuming a cached step result makes a retry safe. book_flight() twice is two bookings.']},
M9:{concepts:['The pyramid and what each level is genuinely for','A unit test that fails for the right reason','Test doubles, and when mocking makes a test worthless','Integration tests against real Postgres, including RLS','CI as a gate, not a place tests run','The flakiness budget','Mutation testing as the instrument coverage is not','The deterministic-shell/probabilistic-core seam'],
 mistakes:['Testing what the code does rather than what it should do. A test that has never failed has never been tested.','vi.mock() on your own modules until the test mirrors the implementation — failing on refactors, passing on bugs. Mock at the network or process boundary.','Mocking the Supabase client and asserting on .from().select() chains. That tests your mental model of Supabase.','Seeding and asserting with the service key, bypassing RLS entirely, so the test proves nothing about what a real user sees.','retries: 2 or sleep(500) (pause half a second), which hides the bug and triples the suite time.']},
M10:{concepts:['Stack traces as primary evidence, including minified production traces','Hypothesis-driven debugging and bisection across code, data, time, configuration (config)','A real debugger: breakpoints, conditional breakpoints, logpoints','Structured logging, log levels with real semantics, correlation IDs, redaction','OTel spans and context propagation','Metrics, SLOs, error tracking','Profiling and flame graphs','Detecting wrong model output when nothing throws','Incident response as a social event, not a technical one, rehearsed on the game day your systems reviewer (Track 5, Tracks tab) is already in the room for: acknowledge within 5 minutes; post a severity call plus what I know / what I am doing / when I will update next; update on that interval whether or not there is news; escalate at a trip-wire written down before the window opens, not during it','24h detection is a baseline for working alone (the starting number) — a real rotation measures acknowledgment in minutes','Runbooks and the blameless postmortem'],
 mistakes:['Changing several things at once and redeploying. A common and expensive habit to carry into a job, because it destroys the evidence before you have read it.','Believing the debugger is for beginners and console.log is for professionals. The inversion is real.','Deploying without source maps, then concluding production errors are unknowable.','Assuming valid JSON means correct output. Constrained decoding guarantees shape, not truth — and removes the model’s ability to express uncertainty, so it fills a required field regardless.','Alerting on causes, producing noise that gets muted. The system is then unmonitored while looking monitored.','Postmortems that stop at the code fix without asking why it took 40 minutes to notice.']},
M24:{concepts:['Environments and dependencies on current tooling (uv, ruff, one pinned type checker)','Python semantics where they differ from TypeScript: names vs values, LEGB, truthiness, generators','pytest','Type hints with a checker in CI','pydantic as the runtime validation boundary','One typed FastAPI route'],
 mistakes:['Writing TypeScript with Python syntax: classes everywhere, raw dicts, no type hints, camelCase. That is the thing a Python reviewer notices first.','Assuming the tool you learned is the tool the job uses. uv is the current default and the right one to learn here, but poetry is widely used in production teams, pyenv solves a real problem in interpreter-version management, and conda is still standard in ML-adjacent organizations. If a posting stack names one of them, learn it in an afternoon and say nothing — nobody is judging you for the packaging tool, and being doctrinaire about it is its own bad signal.','Assuming type hints behave like TypeScript’s compile-then-trust contract.']},
M6:{concepts:['Tokens as the unit of everything','The messages array, roles, statelessness, what a system prompt mechanically is','Why text in a user or tool-result message can be forged — that is prompt injection','The context window: what fills it, what degrades before it fills','max_tokens and the full stop_reason enum','Pricing: input/output asymmetry, caching as a byte-exact prefix match','Adaptive thinking and effort — the first quality-trading lever after caching','Discovering capabilities, max_input_tokens and max_tokens from the Models API rather than a hard-coded table — and knowing what it does not serve: prices are not on that endpoint, so the price table in your client is the one thing that carries a check date','Sampling as a per-model fact rather than a property of the field: on the current Anthropic line, temperature, top_p and top_k are removed and return a 400, while the 4.6 family and Haiku still accept them, and assistant prefill is gone across a wider span than the sampling parameters are. Every other provider you might work for still exposes temperature. Check the model you are calling, not the folklore, and do it the way this module already teaches — from the Models API rather than from a table. The durable idea survives either way: non-determinism is structural, not a knob you forgot to set','The structural boundaries — what no prompt fixes','Prefill vs decode and the KV cache — the one mechanism explaining three facts this module asserts: why caching needs a byte-exact prefix — the prefix, not the body — why the tokens you resend grow quadratically with conversation length (dollars do not follow, because cache reads are priced at a fraction; measure both), and why time-to-first-token and inter-token latency are different numbers. No training, no backprop, no attention math. Then measure it: probe a long prompt and a short one and show TTFT scaling with input while inter-token latency does not'],
 mistakes:['Using another provider’s tokenizer or a chars/4 rule to budget tokens.','Treating max_tokens as a cost cap. It is a ceiling the model is unaware of, so it truncates mid-thought. The budget the model can see is the server-side task budget (output_config.task_budget, currently behind a beta header) — know that it exists and what it changes.','Reading content before checking stop_reason. Branch on stop_reason first, every time; stop_details is non-null only on a refusal, and only on models from Opus 4.7 on. What content happens to hold on a refusal is an implementation detail and the wrong thing to build on.','Interpolating anything dynamic near the front of the system prompt. One changed byte invalidates the cache and the failure is completely silent.','Optimizing input tokens while ignoring that output costs several times more.','Asking the model to rate its own confidence and making decisions (routing) on that number. It looks like a probability and behaves like a vibe.']},
M11:{concepts:['What an embedding is — a fixed-length vector a model emits for a text, near for near meaning — and what it structurally cannot do','Object storage, signed upload URLs, scoped paths and short expiry','Private buckets, deny-by-default, server-side content-type and size validation','Text-layer extraction vs OCR','Tables and multi-column layout','Character-offset provenance — page-level cannot verify a span','Ingestion as a resumable job with per-file failure','Re-ingestion when the parser improves','The embedding dimensionality decision: pgvector indexes the vector type to 2,000 dimensions and halfvec to 4,000; several common models emit 3,072; and you choose the model in this module but hit the ceiling in M18 \u2014 so record it in the decision log before you embed anything'],
 mistakes:['Storing page-level provenance, then discovering in M18 that span citations are unverifiable and offsets are unrecoverable after the fact.','Making the bucket public under time pressure. A misconfigured bucket is none of injection, XSS, CSRF or SSRF, so the standard exploit set will not catch it.','Picking a 3,072-dimension embedding model without checking the pgvector index ceiling.']},
M12:{concepts:['Trace capture: the exact input, usage, stop_reason and attempt count','Error analysis: open coding to axial coding, producing a named taxonomy with counts','What an eval is — a dataset plus a runner — and why it is not a test','Assertion graders before any model grades anything','LLM-as-judge calibrated against human labels, reported as TPR/TNR','Inter-annotator agreement and rubric revision','Train/test discipline: split at creation, open test once','Structured output as a reliability mechanism, and its limit','CI gate economics: tiered gates, recorded fixtures, a dollar ceiling','Prompt and model lifecycle: versioning, pinned IDs, the forced migration'],
 mistakes:['Reporting accuracy instead of TPR/TNR. When failures are rare, a judge that always says pass scores 92% and is worthless. This is the first thing to check in anyone’s eval work, including your own.','Generic categories — "hallucination", "unhelpful". Unactionable. "Calendar Scheduling Failure" is a fix; "poor coherence" is a shrug.','Delegating the labeling to an LLM. It clusters notes you already wrote. People discover what they care about through labeling.','Building the eval set from cases you invented. An imagined set measures imagination.','A runner that re-implements the model call to keep the eval clean. It then measures a different system than the one that ships.','Using the same model as generator and judge without measuring what it costs you. Self-preference is real, and the confusion matrix you already build is what shows it: if the judge’s errors line up with the generator’s, you will see it there. A same-family judge with a measured matrix beats a different-family judge with none.','Believing schema enforcement solved reliability. It solves shape, not content.']},
M14:{concepts:['Tracing one user action end to end — architecture is the output of tracing, not the input','A predict-then-ask protocol for using AI on code you are learning','Three layers of code search: ripgrep, ast-grep, LSP','Reading tests as executable specification','Git history as documentation: blame, pickaxe, log -L, bisect','Inferring unwritten conventions','Chesterton’s fence','Characterization tests around code you do not understand','Strangler fig, the resumable backfill, the dual-run cutover'],
 mistakes:['Reading directories top-down, or asking for an architecture overview first.','Asking the assistant to produce the answer rather than pressure-test yours. People who ask it questions learn the code; people who hand it the task do not.','Searching (grepping) for a function name and treating the hits as the complete blast radius.','git blame as the final answer — it gives the last commit to touch the line, usually a formatting sweep.','Pattern-matching ugliness to badness. Your confidence is highest exactly where your context is lowest.','Waiting to understand the whole system before opening anything. The most common ramp killer.']},
M15:{concepts:['The git object model: commits are snapshots, refs are pointers, the index is a third thing','What merge, rebase and squash do to the graph','Resolving a conflict — including one that merges cleanly and is still wrong','reflog, revert vs reset, shared-branch etiquette','Atomic commits and a PR a reviewer can act on','Giving and receiving review, including of AI-written code','Naming, module boundaries, cohesion and coupling, dependency direction','The rule of three; deleting code; actionable error messages','The three async artifacts — and you produce them yourself: twenty daily-shaped written updates posted publicly in the issue thread across the four weeks around your first submitted PR (what I did, what I am doing next, where I am stuck, what I currently believe), one real blocker escalation, one decision record against real friction. You train a monthly rhythm for the whole program then join a team running a daily one; a team that reads autonomy from your silence will read you as stuck'],
 mistakes:['Treating rebase as a cleaner merge. It is history rewriting: new SHAs, and anyone who pulled is now diverged.','Resolving a conflict by picking a whole side without re-reading the function, and never looking at the merge base.','Commits that map to time spent rather than units of change; mixing a rename with a behavior change in one commit.','A PR description that says what the diff already says instead of why, and omits how to verify it.','Silent compliance under a senior’s disagreement. That is the exact behavior that reads as not-mid-level — and so is arguing every point.','Explaining in a call what should have been a comment on the line. If it is not written on the PR it did not happen.']},
M16:{concepts:['Writing a repo’s agent config so generated code conforms to house conventions','Decomposing a ticket into agent-sized units with verifiable exit criteria','Reviewing a 400-line diff by reading test changes and boundaries first','What never to delegate: auth, money, migrations, anything unverifiable','Sandboxing and permission scope','Spec-driven development and the underspecified-spec log','What a run costs'],
 mistakes:['Accepting suggestions and moving on, producing a transcript of a person being driven by a model.','The purity play — refusing to touch the assistant in an interview round whose rubric line is AI fluency.','Measuring nothing, so the module’s own thesis (being slow is the failure mode) has no number attached to it.']},
M17:{concepts:['Turning a vague request into clarifying questions','Decomposing into one-to-two-day independently shippable slices','Estimating, and naming the riskiest assumption','Renegotiating when the estimate is wrong','The open-ended quality ticket, run against a real OSS AI application you did not write, with prompts in-repo and no decision log — on your own system it tests measurement; on a stranger’s it tests measurement plus archaeology, which is the actual job','A capability-question protocol: cheap, expensive-and-uncertain, structurally impossible','Explaining a limit to a non-engineer who wants a guarantee'],
 mistakes:['Disappearing for nine days on something that should have been scoped to two, and delivering more than was asked. This is often what "not mid-level yet" feedback turns out to mean.','Having no stop-or-continue rule on an open-ended ticket, so it absorbs three days or three months identically.','Apologizing for a missed target or asking for more time, instead of reporting the result and the evidence.']},
M18:{concepts:['pgvector HNSW parameters, the dimension ceiling, the recall/latency curve','Chunking: why fixed-size is the right baseline; what contextual retrieval fixes','Two-stage retrieval: hybrid lexical+semantic fused with RRF, then a cross-encoder','Agentic and iterative retrieval','Grounding and span-level citation verification','The long-context baseline, and when to skip retrieval entirely','The embedding lifecycle: batched generation, cost per 1,000 chunks, re-embedding'],
 mistakes:['Evaluating end to end with a judge scoring answer quality. Answer quality hides retrieval failure — a strong model answers correctly from pretraining even when retrieval returned garbage.','Generating the golden set entirely with an LLM. Synthetic queries are written from the chunk, leak its vocabulary, and every retriever scores artificially high.','Treating HNSW as exact search, and never measuring recall at all.','Reranking too few candidates. If the right chunk is at rank 73 and you rerank the top 10, the reranker is pure added latency.','Skipping lexical search, which is why queries with an error code or a person’s name fail on pure vector.','Asking for citations like [1] and trusting them. Free-text markers are generated text.']},
M19:{concepts:['The agent loop at the wire-format level, no framework','Writing a tool definition a model can actually use','Reactive loop vs plan-then-execute; when a second agent is overkill','State, memory and durability across steps','Append-only thinking-block replay','Failure taxonomy and validation between steps','Loop detection and cost runaway prevention','Human-in-the-loop checkpoints for irreversible actions','Containment as an enforced execution boundary, not a permission table — and asserted on the policy, not on whether the remote address happened to answer','Context management across a long run: compaction, which summarizes what came before, and context editing, which clears old tool results or thinking blocks outright. What each is for, and when each is the wrong answer. Resending the whole conversation unchanged every turn is one shape, not the only one','The budget the model can see: a server-side task budget paces the model toward finishing, where max_tokens cuts it off mid-thought. Know what your own governor catches that it does not','MCP — pin the spec revision','Trajectory tracing and silent-failure detection'],
 mistakes:['Treating the message array as a chat log of strings — dropping tool_use blocks, producing an agent that re-calls the same tool forever.','Tool descriptions written as API documentation instead of decision-support for a model choosing among eight tools.','Error paths returning the raw text of an exception (the error object code throws), which teaches nothing and causes retry of the identical failing call.','Adding agents to solve what is actually a bad tool definition or a context problem.','Saving state (persisting) after the step instead of around the side effect (the change the step makes in the world, such as an email sent), which turns resuming into a duplicate-execution machine.','Capping iteration count only. An agent alternating between two tools never repeats at lag-1.','Denying an action by silently dropping the tool call, leaving a dangling tool_use with no result.']},
M20:{concepts:['The usage object and the four-number cost of a request, taken further than M6 took it','Prompt caching mechanics, breakpoint placement, verifying from the meters','Percentiles from raw distributions','Streaming as a perceived-latency fix, not a real one','Model x effort routing, and why caches being model-scoped hurts a cascade','Cost attribution per feature and per user, both','Budget alerts and circuit breakers','Unit economics, and the product-analytics question: is it worth keeping'],
 mistakes:['Reporting an average, and computing percentiles by averaging per-minute percentiles. Percentiles do not average.','Quoting a p99 from a sample that cannot support one. On a few hundred requests, p99 is a single observation, and a hiring manager who asks "what is your n?" ends that answer.','Measuring time-to-first-byte instead of time-to-first-token. They can be seconds apart.','Routing on per-token price instead of cost per completed task. A cheap call that needs three retries is not cheap.','Building the alert without the breaker. An alert at 3am tells you about money already spent.','Running the budget check after the API call.','Attributing cost per feature but not per user, which hides the distribution entirely when it is extremely skewed.']},
M21:{concepts:['Trust boundaries and secrets: what runs where','Authentication vs authorization; broken access control as the bug that actually ships','RLS as a design skill','Injection, XSS, CSRF, SSRF — by exploiting them yourself','Dependency and supply-chain risk','Prompt injection, direct and indirect: contained, not fixed','The lethal trifecta (Simon Willison’s framing, and say so when you use it): private data + untrusted content + exfiltration','Tool permission design and excessive agency','Treating model output as untrusted input','PII, log leakage, deletion, and the constraints you do not control'],
 mistakes:['Believing code is server-side because of where the file lives. One import from server code into browser code drags it into the browser.','Treating a leaked key as fixed by deleting the commit. It is compromised the moment it was pushed; rotation is the only fix.','Trusting an organizationId or userId sent in the request body.','Hiding the admin button in the UI (the screens a user sees) and calling that access control.','USING (true), or the service key in an Edge Function because RLS was in the way.','Believing a classifier or delimiter scheme solves prompt injection.','Assuming indirect injection is exotic. It is the common case: a web page, a PDF, a calendar invite, a row another user can write to.','A confirmation step whose summary the model itself generates. An injected model lies in the confirmation.']},
M22:{concepts:['React from zero: components, props, state — enough to own one page, not a framework tour','The React rendering model: what actually causes a re-render','Effects and their four failure modes','The server/client boundary and the current caching direction (opt-in, not opt-out)','Forms, mutations, optimistic UI with shared Zod schemas','A custom transport over your own SSE frames','Cancellation, abort propagation, resumable streams','Latency choreography for 10-second-plus operations','Conversation scroll behavior and accessible streaming','Designing for output that is sometimes wrong'],
 mistakes:['useState as a variable store kept in sync with useEffect.','Adding and removing dependencies (the list of values an effect re-runs on) until the lint rule goes quiet.','"use client" at the root layout, converting the whole tree to client components.','Assuming one read() chunk equals one complete SSE event. Corrupts output only under load.','setState on every token at 60 times a second, re-rendering the whole markdown tree, then blaming React.','Conflating client disconnect with user cancellation — or a stop button that stops the UI while the server keeps generating and charging.','aria-live="polite" on the streaming container, making screen readers re-read the entire growing message.','An approval button that appears after the tool already ran. That is theater, not a gate.']},
M13:{concepts:['The client-server trust boundary again, this time as a thing you draw for someone else','Statelessness, and why a shared counter is the hard part','The serverless execution model, measured rather than quoted','Caching in three layers and the invalidation for each','Graceful degradation, backpressure, what happens when the model is down','The forward-looking design doc: problem, constraints, options, risks, rollout'],
 mistakes:['Treating server and client as a lint rule rather than two physically different computers.','"Serverless means stateless so I’m fine." Instances are reused, so module-level state persists sometimes, unpredictably — worse than never.','Caching the final response keyed on the raw question. Almost never hits, and leaks across users when it does.','Retrying into an outage. A 429 means send less traffic.','Reaching for Redis or Kafka in minute three, before anyone established the read/write ratio. The mid-level rubric rewards thoughtful simplification.']},
M23:{concepts:['Environments and configuration as a first-class thing','Secrets across environments; short-lived credentials over stored keys','A CI pipeline you own: what gates a merge and what it costs','Deploy is not release: preview, promote, instant rollback, feature flags','Expand/contract migrations inside the pipeline','Health checks, SLOs, alerting that pages a human only when it should','Exactly enough Docker and Linux, and not one hour more','Consumer contracts — compatibility for callers you cannot redeploy'],
 mistakes:['git revert as the rollback strategy. A full rebuild while the site is broken, and it does nothing about the schema change or the rows already written.','Running migrations at application boot, so every instance races.','Assuming the public-bundle env prefix means "for the frontend" rather than "baked into the public bundle, forever, at build time."','Production secrets in preview environments, where any PR can exfiltrate them.','One /health endpoint used for both liveness and readiness.','The Kubernetes rabbit hole after Docker clicks.','Leaving the practice cloud stack running.']},
M25:{concepts:['Python semantics at depth','asyncio and the blocking-call trap — a concurrency model that is not JavaScript’s','FastAPI with streaming responses and dependency injection','Reading and debugging idiomatic Python you did not write'],
 mistakes:['Assuming Python’s async is JavaScript’s: a sync HTTP client, a sync database session in an async handler, time.sleep. All compile; all pass local testing with one user.','Unbounded gather(*[...]) — fine on ten items, rate-limited or OOM on five thousand.','Calling the real model API inside unit tests. The LLM belongs in the eval suite.','Assuming pydantic is strict by default. It coerces unless told otherwise.']},
M26:{concepts:['OAuth as a consumer: state, PKCE, open redirect','The consent surface: connect, callback, connections screen, re-consent','Encrypted per-tenant credential storage and envelope encryption','Token refresh on the provider’s schedule','Scope upgrades forcing every existing user to re-consent','Revocation surfacing as a 401 in a background job at 3am'],
 mistakes:['Storing tokens encrypted without saying where the master key lives or how it rotates.','Treating the state parameter as decorative. The OAuth callback is the one place CSRF actually matters.','A revocation path that fails silently instead of re-prompting.','Assuming scopes granted for v1 cover v2.']},
M27:{concepts:['Reading an offer: base vs equity vs bonus, vesting, what startup equity is realistically worth','W-2 vs 1099 vs agency vs employer-of-record','Computing the delta yourself rather than taking a headline number — with your own state, your own premium and your own deductions in your own spreadsheet, because no single percentage survives contact with a real return','References and employment verification when you are self-employed: they are different checks, and a reference you paid gets disclosed','Describing the year accurately: "I spent the last year building and operating X, full-time and self-directed, with a working engineer reviewing my code." Not naming how you learned is fine; constructing a framing designed to be mistaken for employment is not, because the follow-ups this module predicts — what title, how big was the team, who was the client — are exactly where it falls apart'],
 mistakes:['Accepting the first number and the first structure offered because you are grateful and have nothing to compare against.','Treating "remote" as one category. Remote US-only, remote in four timezones, and remote-first quarterly-onsite are different jobs.','Discovering the references problem at the offer instead of solving it before the first one.','Offering a reviewer you paid as a reference without saying so. A checker asks what the working relationship was, and the answer arriving from them instead of from you is what does the damage.','Assuming references cover employment verification. They do not: a background check verifies employment records, and for a self-employed year that means 1099s or invoices.']},
M28:{concepts:['A resume that maps each claim to a repo','Two pinned repos now; the pinned three (flagship, open-source history, a write-up) arrive in M29. Three, not four — there is no second product in this program, and promising a reader one you never build is the same defect as any other unsupported number','Rehearsing only the sentences your artifacts can back today. The distributed-systems and algorithms answers are yours at this point; the fine-tuning and framework answers need M12 and M19, and they belong in M29','Lab vs Evidence — labs are private'],
 mistakes:['Pinning the lab repos, which reads as coursework.','Rehearsing an answer about work you have not done yet. If the sentence needs an eval number or a hand-rolled agent loop and you have neither, it is not your sentence yet.','A long skills list you cannot defend. A short one you can be grilled on every line of reads as competence — pick the number that matches what you can actually defend rather than a number from a rule. On "Prompt Engineering" as a line item: it reads thin to a lot of engineers, and it is also named explicitly in a meaningful share of 2026 postings, and a keyword filter does not share anyone’s taste. That is a funnel decision. If your twenty postings ask for it, put it on and be ready to say what you mean by it.']},
M29:{concepts:['The README as product spec plus decision record','Publishing the failing v1 numbers alongside the improved ones','The write-up genre that converts: a numbered account of something that went wrong in your own system'],
 mistakes:['The README as a feature list. The stack list is the least interesting thing in the repo and it is what most portfolios lead with.','Hiding the v1 numbers because they were bad. The improvement delta is the evidence; a single good number could have been luck.','Tutorials that duplicate a thousand existing posts.']},
M30:{concepts:['The un-assisted round: thinking out loud under a clock','Reading and debugging an unfamiliar multi-file codebase from a failing test','Being scored on how you drive an assistant, because the transcript gets read','Shipping a scoped PR into a foreign repo and defending the ship/no-ship call','Mid-level system design in 45 minutes','The behavioral round, which is weighted harder when there are no references to call'],
 mistakes:['Practicing in your own IDE with autocomplete on and the assistant one tab away.','Barreling into typing without clarifying. Interviewers name this as a reject signal.','Editing the test to make it pass. Usually the wrong move, and the interviewer is watching for it — unless the test encodes the wrong behavior, which happens, and then changing it is the right call. Say so out loud before you touch it and name what you believe the spec should be. Silently editing a test is the failure; arguing that a test is wrong, with a reason, is often the thing being tested for.','Framing projects around tool names. "Nothing, it’s solid" scores worse than naming a real limitation.','Gold-plating the take-home UI while shipping zero evaluation, which inverts the actual scoring.']},
M31:{concepts:['A second operating contract at an employed weekly budget (5-8h, not 18)','Retargeting the cold rebuild to the employer’s codebase','Re-contracting or replacing the reviewer before the start date','Manager checkpoints at week 6 and week 14, scripted in advance'],
 mistakes:['Treating hire-before-completion as failure. It is the outcome the plan is shaped for, and the hour arithmetic is why — which is not the same as a prediction that it will happen to you.','Not doing the arithmetic on what is left. A hire at the application date leaves roughly 665 module hours, which at five to eight hours a week is close to two more years. Decide what you are finishing and what you are abandoning, in writing.','Letting every feedback instrument terminate on hire day.','Asking "am I where you expected?" in week one, when a manager’s answer is most generic.']},
M32:{concepts:['The 30/60/90 plan and the week-one manager questions','The asking-for-help format: what you tried, expected, saw, and currently believe','Org mapping from git history','Inheriting an AI system you did not build, with a done-state: a one-page note saying where the prompts live, which are load-bearing, what the implied eval was, what the author was evidently afraid of (inferred from the defensive instructions in the prompt text), and the single measurement you would run first','A WIP policy computed from your own review-latency data'],
 mistakes:['Silent struggle. Self-taught plus remote is a high-risk combination for exactly this, and being stuck two days on a five-minute unblock is the kind of thing that ends a probation period.','Working one thing at a time, so four months of six-day PRs read on a cycle-time dashboard as slow delivery.','Asking for the answer instead of stating your current best hypothesis.']}
};

// ============================================================
// Words. Every technical term a module uses, defined in plain language on that
// module's own page, in the order it appears there. Each list is deliberately
// self-contained rather than a single running glossary: a reader opening M18 in
// month nine should not have to go back to M4 for a word. So a term used by two
// modules is defined on both pages, at the depth each one needs — the repeat is
// the design, not a duplicate to be removed. Within a page, nothing is defined
// using a word defined lower down.
// ============================================================
var AI_WORDS = {
M0:[
 ['Runway','How many months you can pay your bills with no paycheck. It is the only number that sets your deadline.'],
 ['Python','A programming language. Some job postings ask for it by name. This program teaches JavaScript (the programming language M1 starts with) first and Python later, unless your postings say otherwise.'],
 ['PLAN.md, INCIDENTS.md','Plain text files. The .md ending only means ordinary text with light formatting. Any notes app can make one.'],
 ['Module','One unit of this program. The biggest are about four weeks at the program’s ceiling of 18 hours a week, and longer if you run below it — M3 and M12 are five or six weeks at twelve hours a week, and that is what the checkpoints are for. A few are paced by a calendar and say so on their own page. Each ends with a thing you made and a check by someone else.'],
 ['Reviewer','A person who writes code for a living and has agreed to look at your work for 20 minutes a month. You find them in this module.'],
 ['Flagship','The one app you will build in month two and keep improving for the rest of the program. Sixteen later modules add something to it.'],
 ['Lab','A module whose result stays private. It exists so you learn, not so anyone sees it. The other kind, Evidence, is something a stranger can look at.'],
 ['Artifact','The thing a module produces. Here it is a page of text. Later it is a program.'],
 ['Delta','A page of notes you write before building, listing where the official documentation proved you wrong. On this module there is nothing to read yet, so it is one paragraph: what you believe this program will take.'],
 ['Gate, referee','The gate is the check at the end of a module: someone other than you looks at what you did and says yes or no. That person is the referee. Nothing after the gate opens until it is a yes. Be clear about what the tick box in this app is: pressing it does not pass the gate, it records that a referee passed you. Write their name, the date and one line of what they said next to it. Nobody can audit that, which is exactly the point — the record is worth precisely what your honesty is worth, and a tick with no name behind it is the decorative gate this program exists to refuse.'],
 ['Running cost','What this program costs you per month while you run it: model spend, hosting for the flagship, a paid tier anywhere a module needs one, and any money going to paid review or mock interviews. It is written in PLAN.md next to the runway and subtracted from it, because the months you can go without a paycheck are fewer when the work itself is also spending.'],
 ['Three ticks (Modules tab)','The three marks next to each module on the Modules tab: delta (your notes written), artifact (the thing built), gate (a referee said yes).'],
 ['Spine','The fourteen modules you do if your runway is short. The figure at the bottom of this page compares it with the full program.'],
  ['Track','One of ten pieces of work that run every week alongside the modules, from the start until you are hired. The Tracks tab lists them. The figure on this page counts their hours separately from the modules’.'],
 ['Words in the module titles','You will meet these on the Home screen before any module explains them. Postgres: a database. Supabase: a hosted service built on it. HTTP: the rules browsers and servers use to talk. Streaming: showing a reply as it arrives. Evals: measuring whether the AI is right. Corpus: the documents your app can search. Retrieval: finding the right ones. Metering: counting what each request used. Unit economics: what one user costs and earns. CI/CD: the robot that checks and ships your code. Frontend: the screens people see. Trust boundary: the line between code you control and input you do not. Tool use: letting the model run functions you wrote. Durable queue: work that survives a crash.'],
 ['Layer','The program’s grouping of modules into nine stages, numbered 0 to 8, shown on the Home tab. Layers are a grouping for reading. What opens a module is its own prerequisites, and for Layers 4 to 6 the hard gate as well.'],
 ['Trace, harness, CI','Three words in the hard gate on the Modules tab, each taught later. A trace is one logged model call kept whole: what went in, what came out, what it cost (M10). A harness is a test program that runs your app on many saved cases and scores it (M3, M12). CI is a service that runs your tests on its own machine on every push (M9); green in CI means they all passed there.']],
M1:[
 ['Program','A text file of instructions a computer reads top to bottom and carries out.'],
 ['Terminal','A window where you type commands as text instead of clicking. Also called the command line. Everything in this module is run from it.'],
 ['Script','A small program, usually one file, that does one job when you run it.'],
 ['Public API','A web address a program can ask for data. It answers in text a program can read, not a page a person reads.'],
 ['JSON','The text format an API answers in: named values inside curly braces. Once you have seen one you have seen them all.'],
 ['Error message','What the computer prints when it stops. It names the file, the line and, most of the time, the mistake.'],
 ['Function','A named block of code you run by name. Values go in (arguments) and one value comes back (the return value).'],
 ['Test','A second, tiny program that runs your program and reports pass or fail, so you do not have to check by eye.'],
 ['git','A save-point system for files. Each save is a commit with a message. The history of commits is what lets you get back to before something broke.'],
 ['JavaScript','The programming language this program teaches first, because it runs in browsers and on servers (computers you control that answer requests; M2) alike.'],
 ['Node','The program that runs JavaScript on your computer outside a browser. Typing node --version prints which one you have.'],
 ['Editor','The app you write code in. A text editor with helpers, not a word processor.'],
 ['Repo','Short for repository: one project folder under git’s control, with its whole history.'],
 ['Remote, push','A remote is a copy of your repo on another computer, usually GitHub, the website where most public repos are kept and shared. A push copies your commits there.'],
 ['Local database','A program on your own machine that stores data in tables and answers questions about it. Checked here, used from M4.'],
 ['Container runtime','A tool (Docker is the common one) that runs a program in a sealed box with everything it needs. Checked here, used from M5.'],
 ['Load generator','A tool that sends your app many requests at once to see when it slows down. Checked here, used from M4.'],
 ['Browser driven from code','A tool that opens a real browser and clicks through your app on its own, for testing. You only check it installs; nothing in this program requires it, and knowing your machine can run it costs half a minute now instead of an evening later.'],
 ['Bug-fix commit','A save-point in someone else’s public repo whose message says it fixed a bug. The change it made is the answer you practice against later.'],
 ['Runtime','The program that runs your code; here it is Node. M3 looks inside it.'],
 ['Directory, working directory','A directory is a folder. The working directory is the folder the terminal is currently in; the gate starts from an empty one.'],
 ['Variable','A named box that holds a value, so the value can be used by name later.'],
 ['Conditional, loop','A conditional is an if: run this only when that is true. A loop repeats a block until something changes; one that never ends is the first bug everyone writes.'],
 ['Branch','A separate line of commits you work on without touching the main one.']],
M2:[
 ['Specification','One page saying what the app is for, what it does, and what it must never do, written before any code.'],
 ['Client, server','The client is the part that runs on the user’s device, in their browser; it is also called the frontend. The server is the part that runs on a computer you control. The user never sees the server’s code.'],
 ['HTML','The text format a browser turns into (renders as) a page. A plain HTML page is the simplest possible screen.'],
 ['Server route','One web address your server answers. The client sends a request to it and gets a reply back, over HTTP, the rules browsers and servers use to talk; the bytes that actually travel are called the wire (M7).'],
 ['Model','The AI program you send text to and get text back from, through a paid service. Calling a model means sending it one request.'],
 ['API key','A long secret string the service gives you. Anyone who has it can spend your money, which is why it must never reach the client.'],
 ['Anthropic','The company whose model this program calls over the internet with your API key. The shape of the call is the same at any similar service.'],
 ['Deploy, URL','Deploying puts the app on a computer on the internet so it has a web address, a URL, that a stranger can open on their phone.'],
 ['Vercel','The hosting service this program deploys to. You push your code and it hands back a URL. Any similar service works; one is named so there is nothing to choose.'],
 ['Environment variable','A named value the server reads from its surroundings when it starts, not from your code. Secrets live there so they are never written into the code itself.'],
 ['Client bundle','The files the browser downloads to show your app, packaged (built) from your code. Anything in them is public, which is why the key must not be there.'],
 ['Log','A file your server adds one line to on every request: what came in, what went out, how many tokens it used, and when (the timestamp). M6 adds what it cost.'],
 ['Streaming, accounts, database','Three things this version deliberately lacks. Streaming shows the reply word by word as it arrives (M7). Accounts let a user sign in (added with Supabase, a hosted database service, in M5; connecting other services is M26). A database keeps data between visits (M5).'],
 ['Evidence','A module whose result a stranger can see and judge. Labs are private; evidence is public. This is the first one.'],
 ['Ship, shipped','To ship is to put a change in front of real users: deployed and switched on. Shipped code is code that has been.'],
 ['Scraper','A program that automatically scans public repos for secrets such as API keys. A key pushed to a public repo is found by one within minutes.'],
 ['Developer tools (devtools)','The panel built into every browser, opened with F12, that shows the page’s requests, its downloaded files and its console. It is how you prove the key is not in the client bundle.']],
M3:[
 ['node --test','Node’s built-in test runner (the program that finds and runs your tests). Typing node --test in a repo runs every test file with nothing extra installed.'],
 ['Type','What kind of value something is: a number, a piece of text, a list, an object with these named parts.'],
 ['TypeScript','JavaScript with the types written down next to the code. A checker reads them before the program runs and complains when a value could be the wrong kind. Used from here on; the flagship you wrote in JavaScript moves to TypeScript when M7 rebuilds its server.'],
 ['as (cast)','A TypeScript word that tells the checker to trust that a value is a certain type, with no check when the program runs. It is how wrong model output gets into your code unnoticed.'],
 ['LLM','Large language model: the kind of model from M2. LLM JSON is JSON the model wrote, which can be wrong in any way at all.'],
 ['Error taxonomy','A sorted list of the kinds of error your program can hit, each given a named class.'],
 ['Cause chaining','When one error triggers another, the new error keeps the original attached as its cause, so the log shows the whole chain instead of only the last link.'],
 ['Retry, retry-safe','A retry is running the same operation again after it failed. It is retry-safe when doing it twice cannot cause harm. Each error class gets a written rule for whether it may be retried.'],
 ['Estimate log','A running record of how long you guessed a task would take, next to how long it took. Starts here and runs until you are hired.'],
 ['Closure, lexical scope','A closure is a function that keeps the variables around it from where it was written, even after that outer code has finished. Lexical scope is the rule for which variables a line can see: where it sits in the file, not when it runs.'],
 ['this, reference identity','this is a keyword whose meaning changes with how a function was called. Reference identity is whether two variables point at the same object, as opposed to two separate objects that look alike.'],
 ['Parse','Read raw input and build a checked value from it, rejecting anything that does not fit. Parse, don’t assert: check at the boundary instead of declaring it fine.'],
 ['Discriminated union, exhaustiveness','A type that is one of several named shapes, each carrying a tag field that says which one. Exhaustiveness is the checker’s complaint when your code forgets to handle one of them.'],
 ['Module (of code), import, bundle graph','A module here is one code file that exports things for other files to import. The import graph is the map of which files pull in which; the bundle the browser downloads is built from it, so anything reachable ships.'],
 ['Runtime','The program that runs your code: here it is Node. This module is about what the runtime is doing between the lines you wrote, because that decides the order things happen.'],
 ['Trust boundary','The line in your code where data from outside comes in: from a user, a model, another service. Everything past the line is trusted, so the checking happens at the line. This module owns the idea; M21 builds on it.'],
 ['Serverless, warm instance, module scope','Serverless hosting starts a copy of your server code for a request and may freeze it afterwards. A warm instance is a copy kept alive and reused, so variables at the top level of a file (module scope) persist between requests you thought were separate.'],
 ['Production','The deployed version real users hit, as opposed to the copy on your laptop. A production bug is one that reached them.'],
 ['Unseen bug','A bug you have not read the fix for. Your reviewer plants one in a single file for this gate, because a bug you have seen before cannot tell you whether you understand the runtime or only remember your own code.'],
 ['Strict mode, !, narrowing','Strict mode is the TypeScript setting that makes the checker as strict as it can be. ! tells it a value is not empty without checking. Narrowing is the honest alternative: an if that proves the type, so the checker agrees.'],
 ['Compile error, runtime crash','A compile error is caught by the checker before the program runs, on your screen. A runtime crash happens while a user is using it.'],
 ['State','The data a program holds at one moment. Modeling it means choosing a shape that cannot represent situations that never happen.'],
 ['throw, catch','throw raises an error and stops the current work; catch is the block that receives it. Catching and carrying on without acting turns a loud failure into a wrong answer nobody sees.'],
 ['Concurrency','Several pieces of work in flight at the same time, overlapping. The four failure modes are the four ways overlapping work goes wrong: sequential when you meant parallel (waiting for each piece in turn), fire-and-forget (starting work and never checking whether it finished), unhandled rejection (a failure nobody catches), and cancellation (work that keeps running after nobody wants it). You reproduce each and fix it.'],
 ['Harness','A small program whose only job is to run other code under conditions you control and report what happened. Here it makes each concurrency bug happen on demand.'],
 ['console, console.log','The console is a program’s printed output, shown in the terminal. console.log is the command that prints a value there; it is the first debugging tool everyone reaches for, and M10 gives you better ones.'],
 ['Unseen condition','A third condition the gate requires, on top of the two in its pass line. It is written separately because it is checked on a bug you have not seen.'],
 ['Promise','A JavaScript object that stands for a result that is not ready yet, such as a reply from the network. You attach a function to it that runs when the result arrives. Chaining is calling .then() on what .then() returns, so steps run one after another; .catch() attaches the function that runs if it fails instead. MiniPromise is your own small version, written to see how one works inside.'],
 ['then(cb), main()','then(cb) attaches a function (the callback, cb) to a Promise, to run when the result arrives. main() is the usual name for the function a program starts in.'],
 ['Event loop','The runtime’s loop that takes the next piece of waiting work and runs it. The call stack is the list of functions running right now. The microtask queue (promise callbacks) and the macrotask queue (timers, network replies) are two waiting lines, and microtasks always go first.'],
 ['Sync, async','Synchronous code runs to the end before anything else happens. Asynchronous code starts something (a timer, a request) and lets the loop run other work until it finishes. setTimeout schedules a function after a delay; .then() attaches a function to a Promise; resolved means the Promise has its value.'],
 ['Structural typing','TypeScript treats two types as the same when they have the same shape, whatever they are named. The type system lies because types vanish when the program runs; nothing checks them then.'],
 ['Maintainer, merged diff','The maintainer is the person who runs a public repo and decides what goes in. A diff is the list of changed lines; merged means it was accepted into the main history. Their fix is your answer key.'],
 ['await, CPU work, blocking','await pauses an async function until a Promise resolves, letting other work run meanwhile. CPU work is computation (loops, math) that keeps the processor busy; it blocks, meaning nothing else runs until it finishes, async or not.'],
 ['Promise.all, retry storm','Promise.all starts many Promises at once and waits for all of them. Fired over a list with no cap it sends every request at the same instant; a retry storm is when they all fail and all retry together, making the failure worse.'],
 ['Library, package','Code someone else wrote that you add to your project and call from your own. Node installs one with npm, the package-installing tool that comes with Node.'],
 ['Zod','A library that checks, while the program runs, that a value really has the shape you declared, and refuses it otherwise.']],
M4:[
 ['Unseen condition','A third thing this gate requires, shown on the page under UNSEEN. It is checked on a bug you have not seen, which is the only way to tell understanding from memory.'],
 ['Reproduction','A small script that makes a bug happen on demand. Fixing a bug you cannot reproduce is guessing.'],
 ['Memory leak, heap snapshot','A leak is a program holding on to memory it no longer needs, growing until the server dies. A heap snapshot is a picture of everything in memory at one instant, taken with a tool; comparing two proves the leak.'],
 ['Byte, UTF-8','A byte is the smallest unit of stored data, a number from 0 to 255. UTF-8 is the standard way text is turned into bytes; one character can take one to four of them.'],
 ['Grapheme','What a reader sees as one character, such as an emoji or an accented letter. It can be several bytes, so a stream cut at the wrong byte shows garbage.'],
 ['Chunk','One piece of data as it arrives over the network. Pieces come in whatever size the network chose, not one per message.'],
 ['Under load','While many requests hit the app at once, sent by the load generator. Some bugs only appear then.'],
 ['Lost update','Two requests read the same row (one record in a table), each changes it, each writes it back; one change vanishes.'],
 ['Postgres','The database used for the whole program, and the local database you installed in M1. Free, and the same one Supabase, the hosted database service of M5, runs.'],
 ['Query plan','The database’s written step-by-step account of how it will answer a question. Read in M5.'],
 ['DST','Daylight saving time. In spring an hour is skipped; in fall an hour happens twice. Any code that adds a day can break on those two nights.'],
 ['Reference vs value, aliasing','A number or piece of text is copied when assigned; an object is not, only a reference to it. Aliasing is two names for the same object, so a change through one appears through the other.'],
 ['Shallow vs deep copy','A shallow copy makes a new outer object but the things inside are still shared. A deep copy copies everything down.'],
 ['Stack vs heap, object lifetime','The stack is memory for function calls that clears itself when each returns. The heap is where objects live, until nothing refers to them; an object something still points at cannot be freed, which is the leak.'],
 ['Float, integer precision','A float is how computers store numbers with a decimal point, and it is approximate: 0.1 + 0.2 is not 0.3. Whole numbers are exact only up to a size. Money is stored as whole cents and IDs as text for these reasons.'],
 ['Code point, encoding, decoding','A code point is one numbered entry in Unicode, the master list of every character. Encoding turns code points into bytes; decoding turns bytes back, and a stream must be decoded with the partial character from the last chunk kept.'],
 ['Seam','A place where your code meets something outside it: memory, numbers, text encoding, the network, the clock, the database. Bugs hide at seams, and each of the ten here is one.'],
 ['Blocking, I/O','Blocking work stops everything else until it finishes. I/O is input and output: reading files, talking over the network. Async I/O lets the loop keep running while the wait happens.'],
 ['Thread, process','A process is one running program with its own memory. A thread is one line of execution inside it; Node runs your code on one thread, so blocking it blocks every request.'],
 ['File descriptor, socket','A file descriptor is the number the operating system hands your program for each open file or connection, and there is a limit. A socket is one open network connection.'],
 ['Timeout','A limit on how long to wait before giving up. Without one a stuck connection is held forever.'],
 ['Race, atomicity','A race is when the result depends on which of two overlapping operations finishes first. An atomic operation happens completely or not at all, with no one able to see it half done.'],
 ['Idempotency','An operation is idempotent when doing it twice leaves things the same as doing it once. Named here; M7 owns it.'],
 ['Timestamp, naive vs timezone-aware','A timestamp is a recorded moment. Naive means it has no timezone attached, so nobody knows which 9 a.m. it is. Timezone-aware means the zone travels with the value, so the moment is unambiguous.'],
 ['Instrument','The tool that proves a seam: a heap snapshot for a leak, a load generator for a pool. The gate asks you to name it.'],
 ['Schema, column','A schema is the written design of a database: its tables, the columns in each, and the type of each column. A wrong-typed column is money stored as a float, or an ID as a number.'],
 ['Spread, JSON round trip','{...obj} copies an object’s top level into a new one, and only the top level. JSON.parse(JSON.stringify(obj)) turns the object to text and back, losing what JSON cannot say.'],
 ['Date, Map, Set, undefined, cycle','Built-in JavaScript values: a Date is a moment, a Map is a lookup table, a Set is a list without repeats, undefined means no value at all. A cycle is an object that refers to itself, which JSON cannot write.'],
 ['Connection pool','A small set of open connections to the database, kept ready and shared, because opening one is slow and the database allows only so many. Exhausted means every one is busy and new requests wait or fail.'],
 ['Scheduler, fake clock','A scheduler runs jobs at set times, here a daily digest (summary email) at each user’s local hour. A fake clock is a stand-in for the real one, passed in from outside (injected) so a test can set the date to any moment.'],
 ['Lossy','Losing information on the way through. JSON has no way to write a Date, a Map or undefined, so they come out changed.'],
 ['.toFixed(2)','Turns a number into text with two decimals, for display. The number underneath is still wrong.'],
 ['TextDecoder','The built-in that turns bytes into text. One instance must live across all chunks, because it carries the half-finished character from the last one.'],
 ['Transaction, isolation','A transaction groups database operations so they succeed or fail together. Isolation is a separate question: how much two transactions running at once can see of each other. Atomic does not mean isolated. Both go deeper in M5.']],
M5:[
 ['Supabase','A hosted service that gives you a Postgres database with sign-in, file storage and a web dashboard. The flagship uses it. A local Supabase stack is the same set of programs running on your machine in containers.'],
 ['Table, row','A table is a grid; each row is one record and each column one field. 50k rows means fifty thousand records.'],
 ['Query, SQL','A query is a question you ask the database. SQL is the language it is written in, and the only way this module talks to Postgres.'],
 ['Rig, seeded','The rig is your measuring set-up: a database filled (seeded) with 5,000,000 made-up rows, large enough that slow queries are slow.'],
 ['Wall-clock','Time by an ordinary clock, start to finish, as a user would feel it, rather than a unit the database reports.'],
 ['Benchmark','A measurement made under a repeatable set-up so a before and an after can be compared honestly.'],
 ['RLS, policy','Row Level Security: a Postgres feature where rules called policies, attached to a table, decide per row which user may read or change it. The database enforces it, so a bug in your code cannot bypass it.'],
 ['Key rotation','Replacing a secret with a fresh one and retiring the old. A legacy key is an older one on its way out; Supabase is retiring its older long-lived keys, and doing that swap is part of this module’s artifact.'],
 ['Asymptotic complexity','How a job grows as the data grows: double the rows, and the time doubles, stays flat, or quadruples. Measured here on your own rig rather than taken from a textbook.'],
 ['Relational modeling, constraint, invariant','Modeling is designing tables and how they refer to one another. An invariant is something that must always be true (every order has a customer); a constraint is a rule the database enforces itself so it stays true.'],
 ['ORM','A library that lets you use the database through objects in your language and writes the SQL for you. Not used here, so that you see the SQL.'],
 ['Join, aggregate, CTE, window function','A join combines rows from two tables on a matching column. An aggregate collapses many rows to one number (count, sum). A CTE is a named sub-query written at the top with WITH. A window function computes across related rows, like a running total, without collapsing them.'],
 ['N+1 queries','Fetching a list with one query, then one more query per item. Fast on ten items, dead on ten thousand.'],
 ['Vercel','The hosting service the flagship deploys to; it runs your server code serverless. The Vercel+Supabase failure mode is every serverless instance opening its own pool until Postgres runs out of connections.'],
 ['Migration','A scripted, numbered change to the database’s schema, kept in the repo, so every copy of the database can be brought to the same shape in the same order.'],
 ['Expand/contract','Changing a table’s shape in two safe steps: add the new column first and move to it (expand), remove the old one later (contract). Nothing breaks in between. Run for real in M23.'],
 ['Planner, join strategy','The part of Postgres that chooses the plan. Hash join, merge join and nested loop are its three ways of combining two tables; the enable_ settings let you switch each off and time the others.'],
 ['Predicate, correlated','A predicate is a filter condition (the WHERE part). Two predicates are correlated when they move together, so the planner’s assumption that they are independent gets the row count badly wrong.'],
 ['Isolation level','The setting for how much one transaction sees of others running at the same time. READ COMMITTED is the default and still allows the lost update; REPEATABLE READ catches it.'],
 ['MVCC, dead tuple, VACUUM','Postgres keeps the old version of a row when it is updated rather than overwriting it, so readers are not blocked (multi-version concurrency control). The old version is a dead tuple; too many is bloat, and VACUUM clears them.'],
 ['OSS','Open-source software: code published for anyone to read, use and change. Its repos and issue trackers are where this program gets real bugs and real plans.'],
 ['Slow-query log','A record the database keeps of every query that took longer than a set threshold.'],
 ['cost (in a plan)','The planner’s own unit for how expensive a step is. It is not milliseconds and cannot be compared across machines.'],
 ['Index','A separate sorted structure the database keeps for a column so it can find matching rows without reading the whole table. Every index is also a cost on every write to that table.'],
 ['Root, node, leaf, heap (table)','An index is a tree: the root at the top, nodes below, leaves at the bottom pointing at rows. In Postgres the heap is the table\u2019s own storage, a different meaning from the memory heap in M4.'],
 ['Cache, cold, warm','A cache is a copy of recently used data kept somewhere faster. Cold means nothing is cached yet; warm means it is. Run each variant twice and report the second so both are warm.'],
 ['Composite index','One index over two or more columns in a stated order. It helps a query that filters on the first column; it does not help one that filters only on the second.'],
 ['Lock','A hold a transaction takes on rows or a table so others must wait. Held across a model call, it holds everyone for as long as the model takes.'],
 ['Dashboard table editor','Supabase’s web screen for changing tables by clicking. Changes made there are not recorded as migrations, so no other copy of the database gets them.'],
 ['JWT, claim','JSON Web Token: a signed (stamped so it cannot be altered without detection) block of JSON that says who the user is, sent with each request. A claim is one named fact inside it. A policy must only trust claims the user cannot edit.'],
 ['USING (true)','An RLS policy whose condition is always true, letting everyone see everything. It looks like security and is not.'],
 ['Seq scan, index scan, bitmap heap scan','Three ways a plan reads a table: every row in order; through an index straight to the matching rows; or using the index to mark matching pages (the fixed-size blocks a table is stored in on disk) and then reading those.'],
 ['pg-lab','The repo holding this module’s experiments. pg is short for Postgres.'],
 ['Pointer','A value that holds the location of another value, so following it leads there. In the figure the index leaves are pointers to rows.'],
 ['EXPLAIN','The SQL command that prints the plan for a query. EXPLAIN ANALYZE also runs it and reports what actually happened; BUFFERS adds how much data it read. ANALYZE on its own, without EXPLAIN, is a different command: it refreshes the statistics the plan’s guesses are built on.'],
 ['Estimated vs actual rows','The planner guesses how many rows each step returns; EXPLAIN ANALYZE shows what really came back. Stale statistics mean a wrong guess, and the plain ANALYZE command refreshes them.']],
M6:[
 ['CLI','Command-line interface: a program run from the terminal with options typed after its name. model-probe is one you write.'],
 ['Token','The unit the model reads and writes: a piece of a word. You pay per token and every limit is counted in them. Rules of thumb for converting words or characters into tokens exist, and they are wrong often enough to matter — this module’s own pitfall list bans budgeting by a characters-over-four rule, and converting from words is the same rule from the other side. Count tokens with the provider’s token-counting endpoint, against the model you are actually calling.'],
 ['Tokenizer','The fixed procedure that cuts text into tokens. Each model family has its own, so the same text counts differently.'],
 ['Usage object','The block the API returns with every reply, counting input tokens, output tokens, and tokens read from or written to the cache. These are the meters, and every cost in this program is computed from them.'],
 ['Cost delta','The difference in cost between two requests.'],
 ['stop_reason, refusal','stop_reason is the field in every reply saying why the model stopped: it finished, it hit the length limit, it wants to call a tool, or it refused. A refusal is the model declining to answer.'],
 ['end_turn, tool_use','The two common values of stop_reason. end_turn means the model finished its answer; tool_use means it stopped to ask your code to run a tool, a function of yours the model may ask to have run (M19).'],
 ['stop_details, discriminator','stop_details is the field that says more about the stop. A discriminator is the one field you branch on to tell cases apart, the tag from M3’s discriminated unions; here it is the only reliable way to detect a refusal.'],
 ['Generation','One reply produced by the model.'],
 ['Structured output, schema','Asking the model to reply in a JSON shape you declared, rather than free text. The schema is the written description of that shape (the same word as the database schema in M4); a malformed generation is a reply that does not fit it.'],
 ['Models API, hard-coded','The provider’s web address that lists which models exist and what each can do. Hard-coded means written into your code as fixed values, which go stale the week a model changes.'],
 ['400, dead pattern','400 is the reply code an API sends when the request itself was wrong; M7 covers the codes. A dead pattern is a request shape that used to work and no longer does, so you keep every 400 you hit on one page.'],
 ['Prompt','The text you send to the model in one request.'],
 ['Prompt caching, cache hit','The service can keep the start of a prompt you sent recently and charge a fraction to read it again. It does not do this on its own: you mark where the reusable part ends — the cache breakpoint — or turn on the provider’s automatic version. Three things decide whether you ever see a hit. The prefix has to be long enough (the minimum depends on the model, and below it caching silently does nothing). It has to match byte for byte. And the request is assembled tools, then system, then messages — so a tool list that changes between requests invalidates everything after it, which is the part that catches people building agents. A hit is visible in the usage object as cache_read tokens.'],
 ['Messages array, roles, system prompt','The request is a list of messages, each tagged with a role: user, assistant, or system. The system prompt is the instructions at the top that the model treats as coming from the operator. It is text the model reads, not a command it must obey.'],
 ['Statelessness','The service remembers nothing between calls. Every request must resend the whole conversation.'],
 ['Tool-result message, prompt injection','A tool-result message carries the output of something the model asked your code to run (M19). Prompt injection is instructions hidden inside data the model reads, such as a web page or a user message, written to be obeyed. Contained in M19 and M21, never fixed.'],
 ['Context window','The maximum number of tokens one request can hold, prompt and reply together. Quality falls off before it is full.'],
 ['max_tokens, enum','max_tokens caps how long the reply may be; the model does not know the cap exists and is cut off mid-sentence when it hits it. An enum is a fixed list of allowed values, here the possible stop_reasons.'],
 ['Input/output asymmetry','Output tokens cost several times more than input tokens.'],
 ['Byte-exact prefix','Caching matches only when the beginning of the prompt is identical byte for byte. One changed character at the front and nothing after it is cached.'],
 ['Adaptive thinking, effort','Adaptive thinking means the model decides for itself when to reason and how much. Effort is a coarse dial over that depth and over what a request costs — low, medium, high — not a token count. A fixed number of thinking tokens is the thing this replaced; it belongs on the dead-patterns page, not in your code. Turning effort down trades quality for cost, the first such lever after caching.'],
 ['Structural boundary','Something the model cannot do whatever the prompt says, such as know the current date or measure its own confidence.'],
 ['Prefill, decode, KV cache','Prefill is the model reading the whole prompt in one pass. Decode is producing the reply one token at a time. The KV cache is the working memory built in prefill that every decode step re-reads; it explains why caching needs an exact prefix, why long conversations cost more each turn, and why the first token and later tokens arrive at different speeds.'],
 ['Latency, TTFT, inter-token latency','Latency is how long you wait. Time to first token (TTFT) is the wait before the reply starts, which grows with prompt length; inter-token latency is the gap between tokens after that, which does not.'],
 ['Quadratically','Growing with the square: twice the length, four times the cost.'],
 ['Training, backprop, attention','How a model is built inside. Not taught here; you need the mechanism above, not the math.'],
 ['Probability, confidence score','A probability is a measured chance. A confidence score the model writes is generated text shaped like a number and is not measured by anything, so no feature may route on it.'],
 ['chars/4 rule','The rough guess that four characters make a token. Wrong enough across text types to break a budget.'],
 ['Content array','The reply’s list of blocks: text, tool calls, thinking. It is not empty on a refusal.'],
 ['Interpolate','Insert a changing value (a date, a user’s name) into a fixed string. Done near the front of the system prompt it changes the prefix and kills the cache silently.'],
 ['Primary API docs','The model provider’s own reference pages. This module decays fastest, so you check them the week you build.']],
M7:[
 ['The wire','The actual bytes travelling over the network, as opposed to what a library shows you.'],
 ['Idempotency key, dedupe table','An ID the client attaches to a request so the server can recognize a repeat. The dedupe table stores each key once; a second request with the same key gets the first result and does no new work. This module owns idempotency.'],
 ['Wire format, transport','The wire format is the exact shape of bytes you send, which the other end must match; the M22 client will consume this one. A transport is the piece of code that moves messages between two ends.'],
 ['Status code, header','The status code is the three-digit number opening every response: 200 OK, 400 bad request, 401 not signed in, 404 not found, 429 slow down, 500 server error. Headers are named lines above the body carrying details such as content type and who you are.'],
 ['HTTP','The rules browsers and servers use to talk: one request goes out, one response comes back, each with a status line, headers (named lines carrying details) and a body. M2 ran on it without looking; here you read it byte by byte.'],
 ['fetch, ReadableStream','fetch is JavaScript’s built-in function for making an HTTP request. A ReadableStream is the built-in object that hands you the response piece by piece as it arrives instead of all at once. Raw means using them with no library on top.'],
 ['SSE, frame','Server-sent events: a server keeps one HTTP response open and sends a series of small messages down it. A frame is one such message, ending in a blank line. Hand-parsed means your code splits the bytes into frames; that code is the frame parser.'],
 ['Mid-stream error','A failure after the response has started, when the status code has already gone out as 200. The client has to be told inside the stream.'],
 ['REST','A convention for HTTP APIs: each URL names a thing and the verb (GET, POST, PUT, DELETE) says what to do with it.'],
 ['Chunked transfer','HTTP’s way of sending a body in pieces without knowing the total length up front. It is what lets a response start before it is finished.'],
 ['Abort, resumption','Aborting is canceling a request midway. Resumption is a client picking a stream up from where it stopped rather than starting over.'],
 ['Backoff with jitter','Waiting longer between each retry, plus a random extra, so many clients do not retry in lockstep.'],
 ['Webhook','An HTTP request another service sends to a route on your server when something happens, rather than you asking. Delivery is at least once, so the same event can arrive twice.'],
 ['CORS','The browser’s rule about which websites’ pages may call your server, controlled by a header your server sends.'],
 ['Cookie, bearer token','A cookie is a small value the browser stores and sends back automatically with every request to that site. A bearer token is a secret string sent by hand in a header. Both say who you are; each breaks in a different place.'],
 ['Client library','A library that makes requests for you, hiding the wire. The first checkpoint forbids it.'],
 ['Replay','Sending the same request again, deliberately, to see what happens the second time.'],
 ['Fixture, chunk-split','A fixture is a saved sample of input a test replays. A chunk-split fixture is a recorded stream cut at deliberately awkward points, mid-frame and mid-character.'],
 ['TCP, localhost','TCP is the network layer HTTP rides on; it delivers bytes in order but cut into pieces of any size. localhost is your own machine as a network address, where pieces arrive whole and hide the bug.'],
 ['finally, onFinish','Code placed to run after a request ends. On serverless the instance can be frozen before it runs, so work put there sometimes never happens.'],
 ['Retry library, monitor, health check','A retry library repeats failed requests based on the status code. A monitor is a tool that calls your service on a schedule and alerts when it fails. A health check is the route it calls. All three read status codes, so 200 with an error inside fools them all.'],
 ['Render','One drawing of the page by the browser. A key made per render changes on every redraw; it must be made per user action.'],
 ['Provider','Named in M6: the third-party service on the other end. Here it is the model provider, or the payment provider sending a webhook.'],
 ['Proxy','A server that sits between a client and another service, forwarding requests and replies. Your server is a proxy to the model provider.'],
 ['SDK','A library from a service provider wrapping its API in ready-made functions. Banned here so you see what it hides.'],
 ['AbortController','The built-in object that cancels a request in flight. End to end means the browser’s cancel travels through your server to the model provider, so billing stops.'],
 ['Proxy buffering','A proxy in the middle holding a whole response until it is complete before passing it on. It turns streaming back into waiting, and hosts do it by default.'],
 ['Rate limiting','Capping how many requests one caller may make in a time window, answered with 429. The model provider limits you; you limit your users.'],
 ['Signature, raw bytes','A stamp a provider computes from the webhook body and a secret only you and they know, so you can prove it came from them. It is checked against the body exactly as received, before any parsing, because parsing changes the bytes.'],
 ['Upstream','The service your server calls in turn, here the model provider. Upstream billing is its meter running.'],
 ['Join (of work)','Joining-up work: connecting pieces that were built separately so they run as one, which is what moving the flagship to TypeScript costs here. Not the SQL join of M5.']],
M8:[
 ['Kill signal','The operating system’s order to stop a program instantly, with no chance to clean up. Sent at a random moment, it stands in for a crash.'],
 ['Request path','The work done while the user is waiting for the response. Anything slow belongs off it.'],
 ['Queue, job','A queue is a waiting line of jobs. A job is one unit of work written down to be done later, off the request path, instead of while the user waits.'],
 ['Durable','Stored in the database, so a crash or restart does not lose it. A queue held in memory vanishes with the process.'],
 ['Worker, consumer, producer','A worker is a program that loops: claim a job, do it, mark it done; consumer is the same role seen from the queue. A producer adds jobs; enqueue is the act of adding one.'],
 ['Lease','A job is leased to a worker for a fixed time. If the worker dies, the lease expires and another worker can take the job. This is how the queue survives a crash.'],
 ['At-least-once delivery','Every job gets done at least once, and sometimes twice, because a worker can die after doing the work and before marking it done. The consumer must therefore be idempotent, reusing M7’s dedupe table.'],
 ['Backpressure','Slowing producers down when workers cannot keep up, instead of letting the queue grow without limit.'],
 ['Dead-letter path','Where a job goes after failing too many times: set aside, out of the line, for a person to look at.'],
 ['Read path','How the user gets to see a job’s result: polling (asking again every few seconds), an SSE stream, or a resumable stream. Three different products; enqueueing is the easy half.'],
 ['Ingestion, backfill, re-embedding, agent state','Later modules’ work that rides this queue. Ingestion (M11): taking files in and turning them into searchable text. A backfill (M14): a job over every existing row. Re-embedding (M18): recomputing the number-lists search uses. Agent state (M19): the saved progress of an agent, a model run in a loop. Webhook handling (M20): the retry-safe consumer for payment events. Each goes deeper in its own module.'],
 ['Double-processing','The same job done twice, such as one email sent two times.'],
 ['Hosted queue','A queue run by a cloud provider, mechanism hidden. Starting there leaves you unable to answer what happens when it breaks.'],
 ['SELECT ... FOR UPDATE SKIP LOCKED','The Postgres query that claims the next job: it picks one row, locks it so no other worker can take it, and skips any row already locked. This one line is the mechanism most hosted queues hide.'],
 ['Cached step result','Remembering a step’s output so a retry skips it. It does not make the retry safe: book_flight() twice is two bookings.'],
 ['Back in the pool','Ready to be picked up again. A job whose lease expired goes back in the pool, so the next free worker claims it. Not the connection pool of M4.']],
M9:[
 ['Cassette','A recorded copy of a real network reply, saved to a file and played back in tests so they run without the network.'],
 ['Unit test, integration test','A unit test checks one function alone: fast, no network, no database. An integration test runs several parts together against a real local Postgres.'],
 ['CI, required check, merge','Continuous integration: a service that runs your tests on its own machine on every push. A branch is a separate line of commits; merging joins it into the main one. A required check is a CI result that must be green (passing) before a merge is allowed.'],
 ['Merge gate','CI used to block a merge when tests fail, rather than as a place tests happen to run.'],
 ['Flaky, flakiness budget','A flaky test passes or fails at random. The budget is a written limit on how much of that you tolerate before stopping to fix it.'],
 ['Mock, fixture','A mock is a stand-in for a real part (the network, the model) whose behavior the test controls. A fixture is saved sample data a test loads.'],
 ['Test runner, vitest','The program that finds tests, runs them and prints results. M3 used Node’s built-in one; vitest replaces it here because mocks and fixtures come built in.'],
 ['Record-replay client','A fake model client that recorded real responses once and plays them back in tests. Tests then cost nothing and never change under you. The most reused piece in the program.'],
 ['Tool-use block','A part of a model reply asking your code to run a tool. Recorded here, used in M19.'],
 ['Multibyte character','A character stored as several bytes (M4). The fixture splits a frame in the middle of one.'],
 ['Test pyramid','Many unit tests, fewer integration tests, fewest end-to-end tests that drive the real app in a browser. Each level catches something the others cannot.'],
 ['Test double','The general word for any stand-in used in a test. The four kinds are a stub (returns a fixed answer), a fake (a working but simpler version), a mock (checks it was called as expected), and a spy (records calls on the real thing).'],
 ['Coverage','The share of lines your tests executed. A line can be executed by a test that would never notice it being wrong.'],
 ['Mutation testing, mutant, mutation score','A tool changes your code on purpose (flips a > to a <) and runs the tests; each change is a mutant. A mutant that no test catches survives. The score is the share killed, and it measures what coverage cannot.'],
 ['Deterministic, probabilistic','Deterministic: the same input always gives the same output. Probabilistic: it can vary, as a model’s reply does. The seam is the line in your code between the two; tests belong on the deterministic side.'],
 ['Disposition','A written decision on each surviving mutant: fixed, or accepted with the reason.'],
 ['Issue','A tracked problem on a public repo’s page. A closed one already has a real fix, which makes it a bug report with an answer key.'],
 ['Refactor','Changing code’s structure without changing what it does. Good tests survive one; tests that mirror the implementation fail.'],
 ['vi.mock()','vitest’s command to replace a module with a mock. Aimed at your own code it makes the test a copy of the code.'],
 ['Supabase client, chain','The library for talking to Supabase from code; .from().select() is its chain of calls. Mocking it tests your memory of the library, not your program.'],
 ['Service key','Supabase’s all-powerful key that bypasses RLS. Tests that use it for everything prove nothing about what a real user sees.'],
 ['Suite','All the tests together as one run. retries and sleep (a pause written into a test) hide bugs and slow it down.'],
 ['Assert, assertion','An assertion is a test line stating what must be true, such as expect(total).toBe(6); the test fails if it is not. Asserting implementation means checking how the code did it rather than what came out.']],
M10:[
 ['Corpus, retrieve','The corpus is the set of documents your app can search, built in M11. To retrieve is to pull the matching ones out for the model. The figure shows the model citing a document the corpus does not contain.'],
 ['Observability','Being able to tell what your running system is doing from what it emits, without adding code after the fact. This module owns it; M12 revisits it for evals (measuring whether the AI is right).'],
 ['Structured log, correlation ID, redaction','A structured log line is JSON fields rather than free text, so a tool can search it. A correlation ID is one value stamped on every line of one request, so all its lines can be pulled together. Redaction strips secrets and personal data before the line is written.'],
 ['OTel, trace, span','OpenTelemetry (OTel) is the standard toolkit for emitting traces. A trace is the record of one request’s journey through the system; a span is one step in it, with a start time, an end time and named details. A trace ID names one trace.'],
 ['GenAI semantic conventions','The names OTel has standardized for the details of a model-call span, such as model name and token counts. Using them means other people’s tools can read your spans.'],
 ['Silent failure, detector','A silent failure is a wrong answer returned with status 200, so nothing errored. A detector is code that checks output for wrongness after the fact.'],
 ['Sampling, retention window, store','Sampling is keeping a fraction of traces to save cost. The retention window is how long each kind of data is kept. A store is one place data is kept: the log store, the trace store.'],
 ['Runbook','A written step-by-step procedure for one specific failure, usable by someone who did not build the system.'],
 ['Game day','A scheduled rehearsal where someone breaks the system on purpose and another person follows the runbook.'],
 ['Outage, postmortem, blameless','An outage is the system down for users. A postmortem is the written account afterwards: what happened, minute by minute, why, and what changes. Blameless means it names causes in the system, not a person.'],
 ['Stack trace, minified, source map','A stack trace is the list of function calls that were active when an error was thrown. Production code is minified, squashed to unreadable names, so the trace is gibberish; a source map is the file that maps it back to your code.'],
 ['Error tracking','A service that collects every error thrown in production and groups the same one together, with its stack trace.'],
 ['Debugger, breakpoint, logpoint','A debugger pauses the running program at a line you marked (a breakpoint) so you can look at every variable. A conditional breakpoint pauses only when a condition holds. A logpoint prints instead of pausing.'],
 ['Context propagation','Carrying the trace ID across every async hop (one step from one function or service to the next) and into every service called, so a request stays one trace.'],
 ['Metric','A number measured over time: requests per second, error rate, time per request.'],
 ['Instrumented','Code added throughout the app whose only job is to emit logs, spans and metrics.'],
 ['SLO','Service level objective: a target you commit to and measure against, such as 99.9% of requests answered under 2 seconds.'],
 ['Profiling, flame graph','Profiling measures where a program spends its time. A flame graph is the chart of it, with wide bars for slow functions.'],
 ['Incident, severity, escalate, trip-wire','An incident is the system failing for users, handled as an event with people in it. Severity is the first call: how bad. Escalating is pulling in someone more senior. The trip-wire is the condition, written beforehand, at which you do.'],
 ['Log level','The severity tag on a log line: debug, info, warn, error. Real semantics means each level has a stated meaning, so error means someone should look.'],
 ['Rotation','A schedule of people who take turns being the one who answers when the system breaks.'],
 ['Fault injection','Deliberately causing a failure, here by a script that fires at a random time you do not know.'],
 ['Time-to-detection, mitigate, root cause','Time-to-detection is how long until your instruments told you. Mitigating is making it stop hurting users; the root cause is why it happened. You mitigate first.'],
 ['Constrained decoding','Forcing the model’s output to match a schema token by token. It guarantees the shape and nothing about the truth.'],
 ['Alerting, muted','Alerting is automatic notification when a metric crosses a line. An alert that fires for causes rather than for what users see fires too often and gets muted, and a muted alert is no alert.'],
 ['Debugging','Finding why a program misbehaves and fixing it. Done with evidence, one change at a time, or the evidence is destroyed.'],
 ['Hypothesis-driven debugging, bisection','Debugging by stating what you believe is wrong and testing that one thing. Bisection is halving the search space each step: which half of the commits, the data, the time range, the configuration.'],
 ['Track, systems reviewer','A track is one of ten pieces of work that run every week alongside the modules (Tracks tab). Your systems reviewer is the person Track 5 has you find: someone who runs systems for a living and can try to break yours.']],
M11:[
 ['Corpus','The set of documents your app can search. M18 builds retrieval over the corpus you make here.'],
 ['Pipeline','A chain of steps where each one’s output feeds the next, run by a program rather than by hand. Here: upload, extract text, store, index.'],
 ['Signed URL','A web address with a built-in, time-limited permission attached. A signed-URL upload lets the browser send a file straight into storage without the file passing through your server, and without the storage being open to everyone.'],
 ['Digital PDF, scanned PDF','A PDF is a fixed-layout document file. A digital one contains its text as text; a scanned one is a photo of paper pages and contains no text at all until software reads the letters off the image.'],
 ['.docx','The Microsoft Word file format. Inside it is compressed text with formatting, which needs its own extraction step.'],
 ['Extracted text','The plain text your code pulls out of a file, stripped of layout. Everything downstream works on this text, not on the original file.'],
 ['Character offset','A position in the extracted text counted in characters from the start. Offsets 2,140 to 2,208 name one exact sentence; a page number does not.'],
 ['Chunking','Cutting a long document into pieces small enough to search and hand to a model. M18 goes deep on it; here you only keep the character offsets so a piece can be traced back to its page.'],
 ['Provenance','The record of where a piece of text came from: which document, which page, and which character offsets. Without it a claim cannot be checked against its source.'],
 ['Citation','A pointer from a sentence in an answer back to the passage that supports it. A good one highlights the exact words; a bad one names a page.'],
 ['OCR','Optical character recognition: software that looks at an image of a page and guesses the letters on it. It is how scanned PDFs get text, and it makes mistakes, so offsets have to be recorded as it runs.'],
 ['Object storage, bucket','Object storage is a service that keeps whole files (objects) and hands them back by name, built for size rather than for queries. A bucket is one named top-level area inside it, with its own access rules.'],
 ['Deny-by-default','An access rule where nothing is allowed unless a line explicitly permits it. A private bucket denies by default; a public one is readable by anyone who has the address.'],
 ['Scoped, short-expiry','Two limits on a signed URL. Scoped: it works for one path and one action only. Short-expiry: it stops working after a few minutes, so a leaked link is worth little.'],
 ['Content-type','A label sent with every file saying what kind it is, such as application/pdf. Server-side validation means your server checks the label and the size itself instead of trusting what the browser claimed.'],
 ['Orphan-cleanup job','A job is one unit of work waiting in the M8 queue. This one runs on a schedule and deletes stored files that no database row refers to any more, so abandoned uploads do not pile up.'],
 ['Retention policy','A written rule for how long each kind of data is kept and when it is deleted. Stated now because M21 asks you to prove you follow it.'],
 ['Resumable','Able to be stopped part-way, by a crash or a kill, and continued later without starting over or repeating finished work. The M8 queue is what makes this possible.'],
 ['Hand-labeled','A person read each document and wrote down the correct answer, such as how many tables it has and where each one is. Labels made by a person are the only ones you can score against.'],
 ['Dev/test split','Dividing your labeled examples into two groups the moment you create them. The dev group is for improving your code; the test group is opened only at the end, to measure. Mixing them lets you fool yourself.'],
 ['Text-layer extraction','Reading the text a digital PDF already carries inside it. It is exact and cheap, unlike OCR, so you use it whenever a text layer exists.'],
 ['Multi-column layout','A page with text in side-by-side columns, as in papers and magazines. Naive extraction reads straight across both columns and produces scrambled sentences.'],
 ['Per-file failure','When one document cannot be processed, that one is marked failed and the rest continue, rather than the whole run stopping.'],
 ['Parser','The code that turns a raw file into text and structure such as paragraphs and tables. Every parser destroys some tables; the gate asks you to measure how many.'],
 ['Re-ingestion','Running every stored document through the pipeline again after the parser improves. It has to be cheap, because parsers always improve.'],
 ['Injection, XSS, CSRF, SSRF','Four standard attacks on web apps, each of which you run yourself in M21. Injection: user text treated as a command. XSS: user text run as code in another user’s browser. CSRF: a hostile page making your logged-in browser send a request you did not mean to. SSRF: tricking your server into fetching an address of the attacker’s choosing. A public bucket is none of these, which is why checklists miss it.'],
 ['Ingestion','Taking a file in and turning it into stored, searchable text, with a record of where each piece came from. It is what this module builds.'],
 ['Span (of text)','A run of characters between two offsets in the extracted text. A citation that names a span can be checked word for word; one that names a page cannot. Not the M10 trace span.'],
 ['Character range [start, end)','A span written as two offsets: from start up to, but not including, end. The square bracket means included, the round one means excluded, so [10, 15) is characters 10 to 14.'],
 ['Embedding, vector, dimensions','An embedding is a fixed-length list of numbers a model produces for a piece of text, made so that texts with similar meaning get lists that are numerically close. A vector is any such list; its dimensions are how many numbers it holds, often 1,536 or 3,072.'],
 ['pgvector, halfvec','pgvector is an add-on that lets Postgres store embeddings and find the nearest ones. It offers two column types: vector, which can be indexed up to 2,000 dimensions, and halfvec, which stores each number in half the space and can be indexed up to 4,000.'],
 ['Decision log','A dated file where you write down each choice that would be expensive to reverse, and why you made it. It starts here, with the embedding model, and M29 publishes it.']],
M12:[
 ['Eval','A saved set of test cases (the dataset) plus a program that runs your AI feature on each one and scores the outputs. Unlike a test, the result is a rate, such as 87 percent passing, not a single yes or no, because the model’s output varies.'],
 ['Runner','The program inside the harness that walks through each case, calls your real app, and records what came back.'],
 ['Label','A person’s written verdict on one trace: pass or fail, and if fail, what kind. Hand-read means you read the trace yourself; nobody and nothing labels for you.'],
 ['Failure taxonomy','A named list of the kinds of failure you found in your traces, each with a count. Named means specific enough to fix, such as Wrong Date In Reply, not Unhelpful.'],
 ['Assertion grader','A small program that checks one fixed fact about an output: it contains a date, it is valid JSON, it is under 200 words. No model is involved, so it is free and never wrong about what it checks.'],
 ['Judge, LLM-as-judge','A second model call that reads an output and grades it against your written rules. LLM, large language model, is the formal name for the kind of model you have been calling. A judge is only trusted after you have measured how often it agrees with human labels. Calibrated means exactly that: measured against human labels so you know how often it agrees.'],
 ['Confusion matrix','A two-by-two table comparing the judge’s verdicts with the human’s: both said pass, both said fail, judge passed what the human failed, judge failed what the human passed. The four counts tell you exactly how the judge is wrong.'],
 ['Inter-annotator agreement','How often two people, labeling the same traces independently, reach the same verdict. Report it the way this module makes you report a judge, not as a bare percentage: when nine traces in ten are passes, two annotators who pass everything agree ninety per cent of the time and have agreed about nothing. Use a measure that subtracts the agreement you would get by chance — Cohen’s kappa is the usual one — and say which you used. Low agreement means the rules are unclear, not that one person is wrong.'],
 ['Rubric, criterion','The rubric is the written rules for deciding pass or fail, precise enough that another person applying them alone gets the same answer you would. A criterion is one line of it.'],
 ['Tiered CI gate','A CI check with levels: a small fast set on every push, the full set once a night. Tiering keeps the check cheap enough to leave switched on.'],
 ['Smoke set','About fifteen cases chosen to catch obvious breakage quickly. Named after checking whether a machine smokes when switched on.'],
 ['Nightly','A run scheduled once a day, usually overnight, for work too slow or costly to do on every push.'],
 ['Recorded-fixture mode','Real model replies saved to disk once and replayed on later runs, using M9’s record-replay client. A replayed run costs nothing and gives the same answer every time.'],
 ['Job summary','The report a CI run prints when it finishes. Putting the dollar total there means the cost is seen every time, not hunted for.'],
 ['Confidence interval, bootstrap CI','A confidence interval is a range the true score probably lies in, not a single number, because 100 cases can only estimate it. Bootstrap is the way you compute the range: re-draw your cases at random many times, score each draw, and see how much the score moves. Here CI is a confidence interval. The other CI on this page, the continuous-integration check that runs your tests on every push, is always written "CI gate".'],
 ['Statistical threshold','The fail rule written as a range test: the gate fails only when the whole confidence interval falls below the target, so noise alone cannot block a change.'],
 ['Model family, migration','A model family is one provider’s line of models across versions. A migration is switching your app to a different family or version, and here it is allowed only when your own eval set says quality held.'],
 ['Stats-lab','Four statistical tests, each run once against your own data: base rates, the confusion matrix with TPR and TNR, percentiles from a raw array, and a bootstrap confidence interval. A statistical test is a calculation that says whether a difference between two measured numbers is larger than chance alone would produce.'],
 ['Trajectory grader','A grader that scores the sequence of steps an agent took, not only its final answer. An agent is a model run in a loop that chooses its own next action; M19 builds one and uses these graders.'],
 ['Open coding, axial coding','Two passes over your traces. Open coding: write a free-form note on each failure describing what went wrong. Axial coding: group those notes into named categories with counts. The taxonomy comes out of the second pass.'],
 ['Train/test discipline','The rule that the test half of your split is opened once, at the end. Every time you look at it and adjust, it stops measuring anything.'],
 ['Structured output, schema','Asking the model to reply in a fixed shape, such as JSON with named fields, checked against a schema, which is a written description of the shape data must have. It guarantees the shape of a reply, not that its contents are true.'],
 ['Versioning, pinned ID','Versioning: every prompt is saved as a numbered copy, so you can say which one produced a trace. A pinned ID is the exact model identifier the provider publishes, written in your code, so the provider updating a model cannot silently change your results. Copy it; do not construct one by adding a date you half-remember from a tutorial. Know whether your provider’s identifiers are aliases that move or snapshots that do not — it differs by provider, and so does the punctuation.'],
 ['Held-out test set','The test half of your split, kept untouched. The gate scores a change against it because it is the only number you cannot have tuned toward.'],
 ['Ship/no-ship','The decision whether a change goes out to users. The point of the harness is that this decision is made by a number and a range, not a feeling.'],
 ['TPR, TNR, accuracy','Two rates from the confusion matrix. True positive rate: of the traces a human marked as failing, the share the judge also caught. True negative rate: of the traces a human passed, the share the judge also passed. Both are needed; accuracy, the share of all verdicts that were right, hides a judge that says pass to everything.'],
 ['PR, merge, red check','A PR (pull request) is a proposed change to a repo, shown to others for review before it joins the main branch. Merging is accepting it. A red check is a CI check that failed and shows red on the PR, blocking the merge; green is one that passed.'],
 ['Hallucination','A model stating something false with confidence. As a failure category it is too broad to act on, which is why the taxonomy needs specific names.'],
 ['Generator','The model call that produces the output being graded, as opposed to the judge that grades it. Using the same model for both lets its blind spots pass unnoticed.'],
 ['Platform (eval)','A hosted eval product that stores your cases and runs them for you. Not used here: Postgres and a runner you wrote do the same job, so you can see every part of it.']],
M13:[
 ['Design doc','A one-page written proposal: the problem, the constraints, the options considered, the one chosen, the risks, and how it will be rolled out. Two rejected options are required so the reader can see you chose.'],
 ['Bounded system','A system with stated limits, such as 1,000 users, 50 requests a second, and 200 dollars a month. Limits are what make a design defensible with numbers.'],
 ['Design rep','A timed practice run at designing a system out loud, the way an interview asks you to. A rep is one repetition.'],
 ['Stack','The set of languages, tools and services you build with. Yours is Node, TypeScript, Postgres, Supabase and Vercel; a rep outside it forces you to reason instead of recite.'],
 ['Latency, p99','Latency is how long a request takes from being sent to being answered. p99 is found by sorting every request’s latency and reading the value that 99 percent of them came under; it describes the slow tail an average hides. p50 and p95 are the same idea at 50 and 95 percent.'],
 ['Cost per completed task','Total money spent divided by the number of tasks that actually finished, so retries and failed attempts count against you. M20 builds the table later; here you say so out loud when asked.'],
 ['Shared counter','One number many requests read and increase at the same time, such as a usage total. It is hard because two requests can both read the same number and both write the one after it, losing an update.'],
 ['Serverless, instance','Running your code as functions a hosting company starts on demand, with no server you manage. An instance is one running copy; a cold one is freshly started, a warm one is reused from a previous request and still holds whatever was in memory.'],
 ['Lambda, fan-out','Lambda is a serverless hosting service where each request may start a fresh copy of your code. Fan-out is one request spawning many at once. Together they exhaust a database\u2019s connections.'],
 ['Cache, invalidation','A cache is a saved copy of a result kept close by so the next identical request is answered without redoing the work. Invalidation is deciding when a saved copy has gone stale and must be thrown away; it is the hard half. The three layers are the browser, a copy kept on servers near the user, and your own server or database.'],
 ['Graceful degradation','When one part fails, the app keeps doing what it still can and says plainly what it cannot, instead of failing entirely. What your app does when the model is down is the standard example.'],
 ['Rollout','The plan for turning a change on for users in stages, so a problem is seen by a few before it reaches everyone. M23 makes you do it for real.'],
 ['Mock interviewer','A person playing the interviewer for practice, asking follow-ups you did not prepare for. Track 5 (Tracks tab) has you find one by M13.'],
 ['Whiteboard','Drawing boxes and arrows on a board while explaining, the standard format for a design interview. The gate is 45 minutes of it.'],
 ['System design','Deciding what parts a system has, how they talk to each other, where data lives, and what happens when each part fails, before code is written. Interviews test it at a whiteboard.'],
 ['Failure path','What the system does when a step fails: what the user sees, what is retried, what is logged, and what is lost.'],
 ['Linter, lint rule','A linter is a tool that reads your code without running it and flags patterns it has rules against, such as a server-only import in a client file. Treating server and client as a lint rule means forgetting they are two different computers.'],
 ['Module-level state','A variable declared at the top of a file, outside any function. It lives as long as the running instance does, so on serverless it sometimes survives between requests and sometimes does not.'],
 ['Keyed on','Using a value as the lookup label for a cache entry. Keying on the raw question means only an identical question hits, and a hit can serve one user’s answer to another.'],
 ['429, outage','429 is the HTTP status code meaning too many requests: the service is asking you to send less. An outage is a period when a service is down. Retrying harder into either makes it worse.'],
 ['Redis, Kafka','Redis is a fast memory-based data store often used for caches and counters. Kafka is a heavy-duty system for streaming large volumes of events between programs. Both are real tools and both are usually reached for too early.'],
 ['Read/write ratio','How many reads happen for each write. A high ratio is what makes a cache worth having; you cannot choose a cache before you know it.'],
 ['Mid-level','An engineer expected to own a feature end to end without supervision, which is the level this program targets. The mid-level rubric is what interviewers score against, and it rewards choosing the simple design.'],
 ['Delta (difference)','The difference between two numbers, here between what you designed on paper and what you measured. That difference, and why it exists, is the interview material. Not the M0 notes page.']],
M14:[
 ['End-to-end trace, hop','Following one user action, such as clicking Send, through every file it touches until the reply appears. A hop is one step from one function or file to the next. Here trace means this written path, not a logged request.'],
 ['file:line','The notation for a place in code: the file name, a colon, the line number, such as routes/chat.ts:42. Every hop in your trace names one.'],
 ['Clone, cold clone','Cloning is copying a repo from its remote onto your machine. A cold clone is one on a machine that has never run the project, which is where every missing setup step shows up.'],
 ['Setup doc','The written steps for getting the project running from a cold clone. The one that was missing is the one you write.'],
 ['Characterization test','A test that records what the code does today, bugs included, without judging whether it is right. It exists so a later change cannot alter behavior without you noticing.'],
 ['Feature flag, both paths green','A feature flag is a switch, read while the app runs, that turns a code path on or off without a deploy. Both paths green means the tests pass with the flag on and with it off.'],
 ['Dual-run cutover','Running the old and new versions of a feature side by side on the same inputs, comparing their outputs, and switching over only once they match. It only works on a deterministic feature, one where the same input always gives the same output; an AI feature needs an eval instead.'],
 ['Architecture','How a system’s parts are arranged and connected. Here it is what you write down after tracing, not a diagram you ask for first.'],
 ['Coding assistant, predict-then-ask','A coding assistant is an AI tool you talk to about code, which reads files and suggests changes. Predict-then-ask is the rule for using one on code you are learning: write down what you think the code does, then ask, then compare. Through M15 the rule is interrogate, never author.'],
 ['ripgrep, ast-grep, LSP','Three layers of code search. ripgrep (the rg command) finds every line matching a piece of text across a whole repo. ast-grep searches by the structure of the code, such as every call to a function with two arguments, not by its spelling. LSP, the Language Server Protocol, is the service behind editor features like go-to-definition and find-all-references, and it knows what a name refers to.'],
 ['Executable specification','Reading a project’s tests as a description of what the code is required to do, one that can be run to check it is still true.'],
 ['blame, pickaxe, log -L, bisect','Four ways to ask git history a question. blame: which commit last touched each line. pickaxe (git log -S): which commits added or removed a given piece of text. log -L: the full history of one range of lines. bisect: a halving search through commits to find the one that introduced a bug.'],
 ['Convention','An unwritten house rule for how code in this repo is named, structured or laid out. You infer it from what is already there and follow it.'],
 ['Chesterton’s fence','The rule that you do not remove something until you know why it was put there. Named after a parable about a fence in a field.'],
 ['Strangler fig','Replacing an old piece of a system gradually: build the new one beside it, route more and more traffic to it, and remove the old one only when nothing uses it. Named after a vine that grows around a tree.'],
 ['git revert','A new commit that undoes the changes of an earlier commit, leaving history intact. The gate reverts a real bug fix so you can find the bug fresh.'],
 ['Open source, maintainer, merged diff','Open source (OSS), as M5 defines it, is code published for anyone to read, use and change, in projects that accept changes from strangers. A maintainer is the person who runs such a project and decides what gets in. A diff is the line-by-line list of what a change added and removed; the merged diff is the fix the maintainer accepted, which you score yourself against.'],
 ['Patch','A set of changes that fixes something. An unfinished patch with a correct diagnosis still passes the diagnosis half.'],
 ['Blast radius','Everything that could be affected by a change. Searching for a function’s name finds the direct callers and misses the rest.'],
 ['Formatting sweep','A commit that changed spacing or style across many files without changing what the code does. It is often the last commit to touch a line, which is why blame alone misleads.'],
 ['Ramp','The period of becoming productive in a codebase or job you have newly joined. A ramp killer is a habit that stretches it out.'],
 ['Backfill','A job that walks every existing row and fills in or recomputes a value, done in pieces so it can be stopped and resumed. Resumable means a kill part-way loses nothing already done.'],
 ['.tsx','A TypeScript file that also contains page markup — the tag-shaped description of what a screen looks like, which M22 is where you write; the x on the ending marks it. Files ending .ts hold plain TypeScript.']],
M15:[
 ['Recovery lab','A log of disasters you cause in a repo on purpose, such as deleting a branch or rewriting shared history, and recover from one by one, so the first real one is not the first.'],
 ['Responsibility (of a file)','One distinct job a file does. A file with three or more is doing too much, and each one is a separate reason it will change.'],
 ['Restructure, refactor','Changing how code is organized without changing what it does. Characterization tests are how you prove the second half.'],
 ['Module boundary','The line between two parts of the code, defined by what one exposes to the other. Moving a boundary means changing what crosses it, and each move needs a written reason.'],
 ['Actionable error message','A message that tells the reader what went wrong and what to do next, such as which setting to change, rather than only that something failed.'],
 ['Round trip','One full cycle of a PR: you submit, reviewers comment, you reply or push changes, and it repeats until the change is merged.'],
 ['Git object model','How git stores things. A commit is a snapshot of every file at one moment, not a list of changes. A ref is a named pointer to a commit; a branch is one. The index is the staging area holding exactly what the next commit will contain.'],
 ['Merge, rebase, squash, the graph','Three ways to combine work. Merge joins two lines of history with a commit that has two parents. Rebase replays your commits on top of another branch, producing new commits with new identities. Squash combines several commits into one. The graph is the shape of the history all three change.'],
 ['Conflict, merge base','A conflict is when two changes touch the same lines and git cannot choose. The merge base is the most recent commit both sides share; reading it is how you see what each side intended.'],
 ['reflog, revert vs reset','reflog is git’s private diary of where each ref has pointed, and it is how commits that seem lost are recovered. revert adds a commit that undoes another. reset moves a branch pointer backward, dropping commits from the branch.'],
 ['Atomic commit','One commit that contains one complete, self-contained change and nothing else, so it can be understood, reverted or reviewed on its own.'],
 ['Code review','Another person reading your proposed change and commenting on it before it merges. Giving one well and receiving one without silent compliance are both skills.'],
 ['Cohesion, coupling, dependency direction','Cohesion: the things inside one module belong together. Coupling: how much one module relies on the insides of another; less is better. Dependency direction: which module imports which; details should depend on the core, not the other way round.'],
 ['Issue, issue thread','An issue is one tracked item in a repo’s list of bugs and tasks. Its thread is the running comment stream under it, which is where your daily updates go.'],
 ['Blocker escalation','A written note saying you are stuck, what you tried, what you expected, what you saw, and who could unblock you. Sending it early is the skill.'],
 ['Decision record','A short dated note: the decision, the options, and the reason. Written against real friction, meaning a disagreement that actually happened.'],
 ['Async artifacts','Written updates that let a team follow your work without a meeting. The three here: a daily-shaped update, a blocker escalation, and a decision record. Async means the reader sees it on their own schedule.'],
 ['Structural comment','A review comment about how the change is organized, such as where a responsibility lives, as opposed to a typo or a small naming point. Zero on the final round is the gate.'],
 ['SHA','The 40-character identifier git computes for every commit from its contents. Rebase produces new SHAs, which is the proof it rewrote history.'],
 ['Diverged','Two copies of a branch that no longer share the same recent history, so neither can be pushed over the other cleanly.'],
 ['Senior','An engineer with more experience and authority on the team. Silently going along with one, and arguing every point, both read badly; disagreeing in writing with a reason reads as mid-level.'],
 ['Line comment','A review comment attached to one specific line of the diff. If it is not written on the PR, it did not happen.'],
 ['Pull','Fetch the latest commits from the remote into your own copy of the repo. Everyone who pulled a branch holds its history, which is why rewriting that history breaks them.'],
 ['Shared branch','A branch other people also pull from. The etiquette is that its history is never rewritten, because everyone else’s copy would then disagree with it.'],
 ['Rule of three','Do not pull shared code out into one place until the third copy appears. Two copies are cheaper than a shared version built around the wrong idea.'],
 ['HEAD','git’s name for the commit you currently have checked out, the one your working files come from. Switching branch moves HEAD; the figure shows it as an arrow.']],
M16:[
 ['Coding agent','An AI tool that goes beyond suggesting code: it edits files, runs commands and tests on its own, and keeps going until the task is done or it gives up. It is the coding form of the agent named in M12, a model run in a loop choosing its own next action, which M19 builds from scratch.'],
 ['Ticket','One unit of work in a team’s task list: a bug report or a feature request with a title and a description.'],
 ['Defect, defect log','A defect is a mistake in code that was delivered as done. The defect log records each one an agent produced and which earlier module taught you to spot it.'],
 ['Spec, spec-driven, underspecified','A spec is a written statement of exactly what a piece of work must do, made before code. Spec-driven means the agent builds from the spec alone; a spec-driven slice is one piece of a feature that ships on its own (M17), built that way. Underspecified means the spec left a question open, and the log records what the agent decided in each gap.'],
 ['Throughput','How much finished work comes out per unit of time. The throughput artifact measures whether agents actually made you faster, in hours, review findings and defects.'],
 ['Timebox','A fixed time limit set before starting. When it ends you stop and report, whatever state the work is in.'],
 ['Transcript','The full saved conversation with the agent, every instruction and every reply. It is kept so a reviewer can see how you drove it.'],
 ['Agent config','A file in the repo, such as CLAUDE.md or AGENTS.md, that the agent reads before working. It states the house conventions so generated code matches what is already there.'],
 ['Exit criteria','The checkable conditions that mean one unit of work is done, such as a named test passing. Verifiable means a program or a person can confirm them without trusting the agent.'],
 ['Auth, migration','Two things never delegated. Auth is short for two things M21 separates properly: proving who a user is, and deciding what they may do. A migration is a scripted change to the database’s structure. Both are hard to verify and expensive when wrong.'],
 ['Sandbox, permission scope','A sandbox is a sealed environment where the agent can run commands without reaching your real files, network or secrets. Permission scope is the written list of what it is allowed to do; anything outside it needs you.'],
 ['Run cost','What one agent task costs in money, mostly tokens. Measured because a run that costs more than the hour it saved is not a saving.'],
 ['Sealed brief, second agent instance','A sealed brief is a set of instructions written and stored weeks in advance, not seen by you, so the test cannot be shaped around what you expect. A second agent instance is a separate, fresh copy of an agent with no memory of your work.'],
 ['Planted defect','A bug inserted on purpose into a diff to see whether the reviewer catches it. Count blinded means you do not know how many are in each diff.'],
 ['False positive','Flagging something as a defect when it is not. Scored separately because a reviewer who flags everything is not reviewing.'],
 ['Purity play, AI fluency','The purity play is refusing to use AI tools at all in a round whose score line is AI fluency, which is how well you work with them. It reads as inflexibility, not rigor.'],
 ['Pre-commit hook','A script git runs automatically before it allows a commit, which can reject it. Yours checks agent-written code against the rules you wrote for what may be handed to an agent.'],
 ['Delegation policy','A one-page written rule for what you hand to an agent, what you never hand over, and how you check what comes back. It is enforced by a pre-commit hook, not by memory.']],
M17:[
 ['Estimate, estimate log','An estimate is your stated guess, before starting, of how long a task will take. The log records each estimate next to the actual time, and has been running since M3; its value is in the pattern, not in any one entry.'],
 ['Scoping, scoping doc','Scoping is deciding what a piece of work includes, what it leaves out, and how it will be cut into pieces, before anyone estimates it. The doc is that decision written on one page.'],
 ['Open issue','An unresolved item in a public project’s list of bugs and tasks. Scoping against real ones means the request was not invented to be easy.'],
 ['Open-ended ticket','A task with no defined finish line, such as find out why the assistant is getting worse. It is delivered as a plan with a number, not as an answer.'],
 ['Intervention, expected gain per hour','An intervention is one specific change you could make to move the number, such as rewriting one prompt or adding one grader. Expected gain per hour is how much improvement you predict, divided by the hours it would take; you rank interventions by it.'],
 ['Stop-or-continue rule','A rule written at the start stating what result at the halfway point means keep going and what means stop and report. Without it a ticket absorbs any amount of time.'],
 ['PM','Product manager: the person who decides what gets built and in what order, usually not an engineer. Your reviewer plays one who has been told to push for a yes.'],
 ['Capability question','The question can the model do X. The protocol (a fixed procedure, followed the same way every time) sorts every answer into three bins: cheap to find out, expensive and uncertain, or structurally impossible, meaning no prompt can fix it.'],
 ['Slice','A piece of a feature that can ship on its own in one to two days and be useful by itself. A sliced plan is the work cut into such pieces, in order.'],
 ['Riskiest assumption','The belief in your plan that, if wrong, would break it most. You name it so it is tested first, not last.'],
 ['Renegotiating','Going back to whoever asked when the estimate turns out wrong, with the new number and what you would cut, before the deadline rather than after it.'],
 ['Prompt archaeology, prompts in-repo','Prompts in-repo means the prompt text lives in the code files of the project. Archaeology is working out why they say what they say when nobody wrote down the reason, by reading history, tests and traces.'],
 ['Non-engineer','Someone outside engineering, such as a PM or a customer, who wants a guarantee and needs the limit explained in plain words with a number.'],
 ['Missed target','A result that came in below the number you set. Reported as the number, the evidence and what you would do next; not apologized for.'],
 ['Cold (ticket)','Handed to you with no warning and no preparation, the way a real request arrives. Not the cold cache of M5.'],],
M18:[
 ['Retrieval','Finding the few passages in your corpus, the document store you built in M11, that are relevant to a question, so the model answers from them instead of from memory.'],
 ['Chunk, chunking','Documents are cut into pieces called chunks before embedding, because one embedding stands for one passage, not a whole book. Chunking is choosing where to cut. Fixed-size means every chunk is the same length, and it is the right starting point.'],
 ['recall@k','Of the chunks that should have been found for a question, the share that appear in the top k results. recall@10 means the top ten. It is the measuring instrument for retrieval.'],
 ['Baseline','The number you measure first, before changing anything. Every improvement is reported as a difference (the delta) from it.'],
 ['Intervention, arm','An intervention is one change made to see whether the number moves. An arm is one version of the system under test; comparing five arms means running five versions on the same questions.'],
 ['Hybrid search','Running two searches at once: a lexical search, which matches the exact words, and a semantic search, which matches by embedding. Each finds things the other misses, such as an error code or a person’s name.'],
 ['RRF','Reciprocal rank fusion: a way to merge two ranked lists into one. Each result scores by its position in each list, so something ranked well in both rises to the top.'],
 ['Reranker, cross-encoder','A second, slower model that reads the question and each candidate chunk together and re-orders them. A cross-encoder is the kind of model that does this. It is the second stage of two-stage retrieval.'],
 ['Contextual retrieval','Before embedding each chunk, adding a short model-written note saying which document it came from and what it is about, so a chunk read on its own still makes sense.'],
 ['Long-context baseline','Skipping retrieval and putting the whole corpus into the model’s context window. Measured on the same questions so you know what retrieval is actually buying.'],
 ['Iterative, agentic search','Letting the model search, read what came back, and search again with a better query, instead of one search up front. Slower and more expensive; measured here as one arm.'],
 ['Citation, span-level verification','A citation points from a sentence in the answer to the source passage that supports it. Span-level verification checks that the exact characters cited, by M11 offsets, really contain the claim.'],
 ['Batched generation','Sending many chunks to the embedding service in one request rather than one at a time. Cheaper, and the rate limit is hit less often.'],
 ['Re-embed','Producing new embeddings for every chunk, needed whenever you change the embedding model. It is a long job over every row, so it runs as a resumable backfill on the M8 queue.'],
 ['Dual-index read switch','Keeping the old and the new embeddings side by side while re-embedding, with one setting deciding which the app reads. Flip it when the new set is complete; flip back if it is worse.'],
 ['HNSW','The kind of index pgvector builds so that nearest-embedding search is fast. It is approximate: it can miss the true nearest chunks, which is why recall has to be measured. Its parameters trade recall against speed.'],
 ['ef_search','A dial on the HNSW index: how many candidates it looks at per search. Higher finds more of the true matches and costs time.'],
 ['Recall/latency curve','The plot of how much recall you get for how long each search takes as you turn the HNSW parameters. You choose a point on it, not a setting from a tutorial.'],
 ['Grounding','Making the model answer only from the retrieved passages, and being able to show which passage each claim came from.'],
 ['Golden set','The hand-written list of questions with their known correct chunks that everything here is scored against. At least half is written by you, not generated.'],
 ['Candidate depth','How many results from the first search stage you hand to the reranker. Too few and the right chunk never reaches it.'],
 ['README','The front page of a repo: the text file GitHub shows first, explaining what the project is and how to run it. For evidence repos it carries your measured numbers.'],
 ['Fresh split, dev-test gap','After choosing on the dev set, measure on questions the choice never touched. The dev-test gap is how much worse it does on those; a big gap means you tuned to the questions, not the problem. There is no third split: with two arms and a test half of about ten queries, you get one honest measurement, so report it with its interval rather than hunting for a better one.'],
 ['Bootstrap interval','Resampling your own results many times over to see how much the number would have moved if you had drawn a different set of questions. On ten test queries the interval around one arm’s recall is wide — plus or minus roughly 0.3 — which is the reason this module compares two arms rather than five. Resample the per-question differences between the two arms, not the two recalls separately: the arms answered the same questions, so the difficulty of each question cancels, and the paired interval is meaningfully tighter than subtracting two independent ones. A delta whose interval crosses zero is a delta you cannot claim.'],
 ['hnsw.iterative_scan','A pgvector setting that tells the HNSW index to keep scanning when a filter throws away most of its results, instead of returning too few. Named in the gate because it changes the number.'],
 ['Routing rule','The written rule your app uses to decide, per request, whether to retrieve or to send the long context. Defended with your own numbers.'],
 ['Pretraining','The training the model had before you ever called it. A strong model can answer from that alone, which hides a retrieval that returned nothing useful.'],
 ['Synthetic queries','Test questions written by a model from the chunk itself. They reuse the chunk’s own words, so every search finds them and the score means nothing.'],
 ['dist','The distance between two vectors: the smaller it is, the closer in meaning the two texts are. The figure labels it dist; a nearest-neighbor search is a search for the smallest one.']],
M19:[
 ['Tool, tool call','A tool is a function you tell the model it may ask for, with a name and a description of its inputs. A tool call, a tool_use block in the reply, is the model asking for it; your code runs it and sends back a tool result.'],
 ['Agent, agent loop','An agent is a model that can call tools and is run in a loop: send the conversation, read the reply, run any tool the model asked for, add the result to the conversation, repeat until it stops. The loop is code you write.'],
 ['Hand-rolled, framework','Hand-rolled means written from scratch by you. A framework is a library that runs the loop for you; you skip it here so you have seen every message on the wire.'],
 ['Budget governor','Code that stops the loop when a limit is reached: dollars spent, steps taken, or time elapsed. Hard-stopping means the model cannot talk its way past it.'],
 ['Loop detection','Noticing that the agent is repeating itself, such as calling the same tool with the same input, and stopping it. An agent alternating between two calls repeats at every second step, so the check must look further back than one.'],
 ['Approval gate, irreversible action','An irreversible action cannot be undone: sending an email, deleting a file, charging a card. An approval gate pauses the loop before one and waits for a human to say yes.'],
 ['Durable state','The agent’s progress saved to the database after every step, so a crash mid-run is resumed from the last step rather than started over. It lives on the M8 queue.'],
 ['Thinking block, append-only replay','A thinking block is the part of a reply where the model reasons before answering. On the next turn the whole conversation, thinking blocks included, goes back unchanged with the new step added at the end; that is append-only. Editing earlier blocks breaks the model.'],
 ['Trajectory','The full recorded sequence of one agent run: every message, tool call and result in order. Replayable means you can step through it afterwards and score it.'],
 ['Containment','Limits enforced by the environment a tool runs in, not by instructions to the model. A contained tool cannot reach outside its box even when the model asks it to.'],
 ['Code-shaped, network-shaped, filesystem-shaped tools','Three families by what they touch: tools that run code, tools that make network requests, tools that read or write files. Each gets its own kind of box.'],
 ['Domain allowlist','A short list of website addresses a network tool may reach. Anything not on the list is refused.'],
 ['Path prefix','A folder a filesystem tool may not leave. Every path it touches must start with it.'],
 ['Memory cap','The most memory one tool run may use before it is killed. With the per-tool timeout, it stops a runaway tool from taking the server down.'],
 ['Blocked host, metadata endpoint','A blocked host is an address you have decided tools must never reach. 169.254.169.254 is the metadata endpoint (an endpoint is one address a server answers at): the address inside a rented server where the machine’s own credentials are handed out; a tool that can fetch it can steal them. Be careful what a refusal there proves. Most cloud metadata services already refuse a plain request without a token or a special header, and on serverless hosting there is often nothing at that address at all — so a blocked result may be the platform rather than your allowlist. Assert on your own policy: show the request refused before a socket opened, with the denial in your logs. Keep the metadata and private-network addresses as regression cases underneath that, not as the proof.'],
 ['MCP','Model Context Protocol: a published standard for how a tool server describes its tools to any model. An MCP server is a program offering tools that way.'],
 ['Spec revision, pin','The spec is the published document that defines MCP; a revision is one dated version of it. Pinning means writing down which revision you built against and not silently moving.'],
 ['SDK tool runner','The feature of the provider’s official library that runs the agent loop for you. Built second, so you can compare it with your own.'],
 ['Tool definition','The name, description and input shape you give the model for one tool. It is written for a model choosing among tools, so the description says when to use it, not how it is implemented.'],
 ['Reactive loop, plan-then-execute','Two shapes of agent. Reactive: decide the next step after each result. Plan-then-execute: write the whole plan first, then carry it out step by step.'],
 ['Human-in-the-loop','A design where a person must confirm certain steps before the agent continues. The approval gate is the mechanism.'],
 ['Fuzzed input','Random or deliberately odd inputs thrown at the loop to see whether the governor still holds.'],
 ['Step-level, outcome-level','Two ways to score an agent run: whether each step was sensible, and whether the end result was right. Both are reported; a right answer reached by a wrong path is still a defect.'],
 ['Adversarial inputs, red-team brief','Adversarial inputs are messages written to make the agent misbehave. A red-team brief is the instruction given to whoever writes them: attack this, without knowing how it is defended.'],
 ['Spend assertion','A test that fails if a run costs more than the ceiling. It lives in the test suite so the limit is checked on every push.'],
 ['Lag-1','Comparing each step only with the one before it. Two tools called in alternation never match at lag-1, so detection has to look at longer patterns.'],
 ['Dangling tool_use','A tool call in the conversation with no result after it. The model expects one, so a refused call still needs a result saying it was refused.'],
 ['Breaking change, deprecated','A breaking change is a new version that old code does not work with. Deprecated means still working but scheduled to stop; tutorials written before the change teach the deprecated shape.']],
M20:[
 ['Credit, credit ledger','A credit is one prepaid unit of usage a user buys and spends. The ledger is a table recording every credit a user has been given and every credit spent, so the balance is the sum of the rows. Per-user means one balance each.'],
 ['Atomic decrement','Subtracting from a balance in one indivisible database step, so two requests at the same instant cannot both see the old number and both succeed.'],
 ['Concurrent hammering','Firing many requests at the same balance at the same instant on purpose, to prove the decrement is atomic. A test that runs them one at a time proves nothing.'],
 ['Stripe, test mode','Stripe is a service that takes card payments for you. Test mode is its practice setting: fake cards, real API, no money moves.'],
 ['Subscription','A recurring charge, monthly or yearly, that Stripe manages and reports on through webhooks.'],
 ['Replay (webhook)','The provider sending the same webhook event again, which it will do after any timeout. Surviving replay means the second copy changes nothing.'],
 ['Server-rendered','A page whose HTML is produced by the server for each request, rather than assembled in the browser. Used here so the out-of-credits page works even with no app loaded.'],
 ['402','The HTTP status code meaning payment required. Your server sends it when a user is out of credits, and the client shows the way to pay.'],
 ['curl','A terminal command that sends one HTTP request and prints the raw response. Proving a path with curl means no browser was involved.'],
 ['Circuit breaker','Code that stops making model calls once spending crosses a limit, and stays off until a person resets it. An alert tells you; the breaker stops it.'],
 ['Active user','A user who did something in the period being measured, as opposed to one who signed up once. Cost per active user is the number that matters.'],
 ['Non-model cost','Everything you pay that is not the model: hosting, database, storage, payments. It gets its own column so the model does not look like the whole bill.'],
 ['Model x effort routing','Choosing, per request, which model to call and at what effort setting, from a grid of both. The experiment measures each cell’s cost per completed task.'],
 ['Four-number cost','A request’s price comes from four counts in its usage object: input tokens, output tokens, tokens written to the cache, and tokens read from it. Each has its own price.'],
 ['Cache breakpoint','A marker you place in the prompt telling the provider where the reusable prefix ends. Not the debugger kind. Where you put it decides how much of each request is a cache hit.'],
 ['Percentile','The value below which a given share of measurements fall. p50, p95 and p99 are the middle value, the slowest one in twenty and the slowest one in a hundred. Computed from the raw list of measurements, never by averaging.'],
 ['Perceived latency','How long the wait feels to the user. Streaming shortens it by showing the first words early; the total time is unchanged.'],
 ['Cascade','Trying a cheap model first and moving to a more expensive one when it fails. Costs more than it looks, because a cache warmed for one model does nothing for the other.'],
 ['Cost attribution','Tagging every dollar with which feature and which user caused it, so the report can group either way.'],
 ['Budget alert','A message sent to you when spend crosses a line. It informs; it does not stop anything.'],
 ['Unit economics','Whether one unit of the product, here one active user for one month, brings in more than it costs. If not, growth makes the loss bigger.'],
 ['Product analytics','Measuring what users actually do with a feature, so the question of whether to keep it is answered with numbers.'],
 ['Time-to-first-byte','How long until the first byte of the HTTP response arrives. Headers arrive first, so it can be seconds before the first token.'],
 ['Per-token price','The provider’s list price for one token. A cheap model that needs three tries costs more per completed task than an expensive one that needs one.'],
 ['Skewed distribution','A spread where a few users account for most of the cost. The average looks fine; the per-user report does not.'],
 ['Metering','Counting what each request used, the way a utility meter counts gas: tokens in, tokens out, cache reads and writes. Every cost figure here is read off those meters.'],
 ['Page a human','Wake a person, by phone, because of an alert. The figure shows it as the last step after the breaker; M23 covers when paging is right.']],
M21:[
 ['Vulnerable, exploit','A vulnerable app has a hole an attacker can use. An exploit is a working attack that goes through it. You write the exploit against a copy of your own app so you know the hole is real, then fix it.'],
 ['Tenant, cross-tenant','A tenant is one customer’s data inside a shared app. Cross-tenant access is one user reading another’s; it is the bug that ships most often.'],
 ['Guessed or replayed URL','Guessed: changing a number in a file address to reach someone else’s file. Replayed: reusing a signed link after it should have expired. Both are tried against your M11 bucket.'],
 ['OAuth, callback','OAuth is the standard way a user lets your app act on their account at another service, such as Google or GitHub, without giving you their password. The callback is the route on your site the other service sends the user back to when they say yes. Built in M26.'],
 ['Fetch tool','The M19 agent tool that makes web requests. It is a way into your system for anything on the web, so one of the five exploits goes through it.'],
 ['Data-flow document','A written map of every place user data goes: into your system, out to other companies, and back. Bidirectional means it covers both directions.'],
 ['Third party','Any company whose service your app sends data to: the model provider, the payments service, the hosting. Each holds a copy.'],
 ['Retention setting','How long a store keeps data before deleting it. Every store and every third party has one, and you have to know each.'],
 ['Jurisdiction, residency','Jurisdiction is which country’s law applies to a copy of the data. Residency is a rule that data must stay in a given region, which your providers may or may not offer.'],
 ['Delete path','The code that, when a user asks, removes every copy of their data: rows, files in the bucket, embeddings, traces. Tested by asserting nothing survives.'],
 ['Subprocessor, DPA','A subprocessor is a company your provider passes data to in turn. A DPA is a data processing agreement: the contract saying what a provider may do with the data you send it. You control neither; you list them.'],
 ['Zero-data-retention','A provider setting under which they keep no copy of your requests after answering. Turned on where offered; recorded where not.'],
 ['Authentication, authorization','Authentication is knowing who the user is. Authorization is deciding what they may do. Most shipped security bugs are the second one missing.'],
 ['Broken access control','Any case where a logged-in user can reach data or actions that are not theirs. It is checked on the server, per request, or it is not checked.'],
 ['Dependency, supply-chain risk','A dependency is someone else’s code your app installs and runs. Supply-chain risk is that one of them is hostile or broken; you run all of it with your server’s permissions.'],
 ['Indirect prompt injection','Instructions to the model hidden in content it reads: a web page, a PDF, a row another user wrote. Direct injection is typed by the user; indirect arrives through retrieval, and it is the common case.'],
 ['Lethal trifecta, exfiltration','Exfiltration is data leaving your system to somewhere the attacker can read. The lethal trifecta — Simon Willison’s framing, and it is well enough known in AI security that using it unattributed will be noticed by exactly the people you are trying to impress — is the combination that makes it possible: the model can see private data, reads untrusted content, and has a way to send data out. Remove one.'],
 ['Excessive agency','Giving the model more tools or permissions than the task needs, so an injected instruction has more it can do.'],
 ['PII','Personally identifiable information: anything that points at a specific person, such as a name, email or address. It must not end up in logs or traces.'],
 ['Log leakage','Secrets or PII written into logs, which are copied, kept and read by more people than the database.'],
 ['Perimeter','The edge of what you control. Data that leaves it lands somewhere with someone else’s retention setting.'],
 ['Browser code','Any file the browser downloads: the frontend, or client side, of the app, which from M22 is built from components (each a reusable piece of the page). Anything it imports ships to the browser too, secrets included.'],
 ['Service key, Edge Function','The service key is the Supabase key that bypasses RLS entirely. An Edge Function is a small server function Supabase runs for you. Using the first inside the second turns off access control.'],
 ['Classifier, delimiter scheme','Two things people hope will stop prompt injection. A classifier is a model that tries to spot hostile text; a delimiter scheme wraps user text in markers. Both can be talked past, so neither is containment.']],
M22:[
 ['Frontend, chat surface','The frontend is the part of the app the user sees and touches in the browser. The chat surface is the page where they type and the reply appears.'],
 ['Protocol','The agreed shape of what goes over the wire between two programs. Yours is the SSE frame format you defined in M7; the client has to speak it exactly.'],
 ['Transport, transport interface','The transport is the piece of client code that opens the connection, reads frames and hands them to the page. The interface is the list of functions any transport must provide so the rest of the app can use whichever one is plugged in.'],
 ['Prebuilt default','The transport that ships with the popular AI frontend library and expects that library’s own wire format. You replace it so your client speaks M7’s format.'],
 ['Failure state','What the page shows when something goes wrong: a timeout, a refused tool, an empty answer. Honest means it says what happened instead of spinning.'],
 ['Upgrade path','The screen a user out of credits sees after a 402, and the way from it to paying.'],
 ['React','The library used to build the frontend. It lets you describe the page as small pieces that redraw themselves when their data changes.'],
 ['Component, props, state','A component is one reusable piece of the page, written as a function. Props are the values passed into it; state is the values it keeps and changes itself.'],
 ['Render, re-render','Rendering is React running a component to produce what it shows. A re-render is running it again because a prop or state changed. Knowing what triggers one is the rendering model.'],
 ['Effect','Code in a component that runs after rendering, for things outside the page such as opening a connection. Written with useEffect. Its four failure modes: running too often, not often enough, at the wrong time, and never cleaning up.'],
 ['Opt-in caching','The direction the framework moved: data fetching, GET route handlers and the client-side router no longer cache unless you ask. Statically rendered routes still are cached, so “it caches nothing by default” is the overstatement that loses you the follow-up. Earlier versions cached far more by default, which is why older tutorials disagree.'],
 ['Form, mutation','A form is the part of a page that collects input. A mutation is a request that changes data on the server, as opposed to one that only reads.'],
 ['Optimistic UI','Showing the result of a change on the page before the server has confirmed it, then correcting if the server says no.'],
 ['Cancellation, abort propagation','Cancellation is the user stopping a request. Propagation is passing that stop all the way through: page, server, provider. If it stops at the page, billing continues.'],
 ['Latency choreography','Planning what the page shows during a wait of 10 seconds or more: progress, partial output, a way to stop. A blank wait is where users leave.'],
 ['Screen reader','Software that reads a page aloud for a user who cannot see it. A streaming message can make it read the whole message again on every new word.'],
 ['Accessibility, accessible','Making the page usable by people who rely on a screen reader, a keyboard alone, or high contrast. Measured, not assumed.'],
 ['axe-core','A tool that scans a page for accessibility errors and fails a check when it finds one. Run in CI here.'],
 ['aria-live','A marker on a page element telling screen readers to announce changes inside it. Set to polite on the streaming container, it makes the reader re-read everything; the fix is announcing once.'],
 ['useState, setState','useState gives a component a piece of state; setState changes it and triggers a re-render. Calling it on every streamed token re-renders 60 times a second.'],
 ['"use client", root layout','"use client" is the marker that makes a component and everything under it run in the browser. The root layout is the outermost component; marking it makes the whole app client-side.'],
 ['Markdown','The light formatting used in .md files, which the reply is written in and the page turns into headings and lists. Re-drawing that whole tree per token is the slow part.'],
 ['Next.js','The framework built on React that the flagship frontend uses. It provides the server/client split and the caching rules.'],
 ['Server/client boundary','The line between code that runs on the server and code that runs in the browser. Components are server-side until marked otherwise.']],
M23:[
 ['CI/CD, pipeline','CD is continuous delivery: the automation that takes code passing CI and deploys it. The pipeline is the whole chain from push to live: checks, build, deploy, release.'],
 ['OIDC','A way for your CI job to prove to the cloud who it is with a short-lived token minted for that one run, so no long-lived cloud key is stored anywhere.'],
 ['Refresh token','A long-lived credential a third party gives your app so it can fetch fresh short-lived access without asking the user again. One of the two secrets that must still be stored.'],
 ['Scoped, spend-capped','Scoped: the key can do only the few things it needs. Spend-capped: the provider refuses calls past a dollar limit you set. Both are applied to the stored exceptions.'],
 ['Deploy vs release','Deploying puts new code on the servers. Releasing lets users reach it. Keeping the two separate is what makes turning a change off instant.'],
 ['Rollback','Putting the previous version back in front of users. Rehearsed under a timer, and triggered on suspicion, because the goal is minutes.'],
 ['Dashboard','The screen showing your metrics over time. Timing a rollback from it means measuring from when the graph shows the problem to when it shows the fix.'],
 ['Burn-rate alert','An alert that fires when errors are using up your SLO’s allowance faster than it can last the month. It pages for real trouble and stays quiet for noise.'],
 ['Dockerized, cloud deploy','Dockerized means packaged into a container that runs the same anywhere. A cloud deploy runs that container on a server rented by the hour from a cloud provider such as AWS, rather than on the hosting used so far.'],
 ['IAM role','Identity and access management: the cloud’s permission system. A role is a named set of permissions a running program is given, and no more.'],
 ['Short-lived credential','A key that expires in minutes and is minted fresh each time. Nothing that leaks stays useful.'],
 ['Preview, promote','A preview is a deployment of one PR at its own URL for review. Promoting is pointing production at a build that already exists, rather than building again.'],
 ['Environment, configuration','An environment is one full copy of the app: development, preview, production. Configuration is the set of values that differ between them, held outside the code as environment variables (vars for short).'],
 ['Health check, liveness, readiness','A health check is a route the platform polls to see whether an instance is well. Liveness asks whether the process is alive; readiness asks whether it can take traffic yet. One route for both restarts instances that were only warming up.'],
 ['Paging','Waking a person, by phone, because of an alert. Alerting should page only when a human is needed now.'],
 ['Linux','The operating system servers run on. Exactly enough means the commands to look inside a running box and a container, not administration.'],
 ['Consumer contract, endpoint','An endpoint is one route on your server. A consumer is any program calling it, including a client you cannot update. The contract is the promise of what that route accepts and returns; breaking it breaks callers you may not know about.'],
 ['Lock type','When a schema change runs, the database takes a lock on the table that blocks some or all other queries until it finishes. Which lock, and for how long, is why a naive migration takes a site down.'],
 ['Build time, public-bundle env prefix','Build time is when the code is packaged, before it runs anywhere. Variables with the public prefix are copied into the client bundle at that moment, so they are public forever and cannot be secrets.'],
 ['Kubernetes','A system for running many containers across many machines. Powerful, and a rabbit hole; not needed for one app.'],
 ['Cloud stack, torn down','The set of rented cloud pieces you created for the deploy. Tearing it down deletes all of them the same day, because idle cloud resources bill by the hour.'],
 ['CSV','Comma-separated values: a plain text table, one row per line with commas between the columns. Spreadsheets open and save it, which is why exports and reports use it.'],
 ['Nullable','A column allowed to hold no value (null). The expand step adds the new column this way — the figure calls it “allowed empty” — so existing rows stay valid until it is filled.'],
 ['Dual write','Writing the same data to the old column and the new one while the migration is in progress — the figure calls it “write both” — so both stay correct until the contract step drops the old one.']],
M24:[
 ['Tooling','The programs around a language that install packages, check style and run tests. Python’s changed recently, so older tutorials name the wrong ones.'],
 ['ruff','The current Python linter and formatter: it applies lint rules and rewrites spacing and layout to the standard style.'],
 ['Type checker, type hints','Python runs without types. Type hints are optional notes saying what a function takes and returns; a type checker is a separate program that reads them and reports mismatches. Run in CI.'],
 ['Pinned, shelf life','Pinned: a fixed version written down, so the build is the same next month. Shelf life: your written estimate of how long this tooling choice stays current.'],
 ['Semantics, TS','Semantics is what code means when it runs, as opposed to how it is spelled. TS is TypeScript. Some things that look the same in both languages behave differently.'],
 ['pytest','The standard Python test runner. Tests are plain functions whose names start with test_.'],
 ['pydantic','The Python library that checks incoming data against a declared shape at runtime and rejects what does not fit. It plays the role Zod plays in M3.'],
 ['FastAPI','The Python web framework (a library for building servers) used here. Routes are functions with type hints, and it uses pydantic to validate requests.'],
 ['Names vs values','In Python a variable is a name pointing at a value; assignment moves the name, not the value. Two names can point at one list, so changing it through one changes both.'],
 ['LEGB','The order Python looks up a name: local, enclosing, global, built-in. It decides which variable a name means inside nested functions.'],
 ['Truthiness','Which values count as false in an if: empty lists, empty strings, zero and None all do. Different from JavaScript in the details.'],
 
 ['Idiom, idiomatic','The way experienced users of a language write things. Idiomatic Python reads as Python; correct code in the wrong idiom is what a reviewer flags and a test cannot.'],
 ['Class, dict','A class is a blueprint for objects with data and functions attached. A dict is Python’s named-value container, like a JSON object. Classes for everything, or raw dicts where a typed model belongs, is the TypeScript accent.'],
 ['camelCase, snake_case','Two naming styles: firstName versus first_name. JavaScript uses the first, Python the second.'],
 ['Compile-then-trust','TypeScript checks types before the code runs and then removes them. Python hints are never enforced at runtime, so a checker passing does not mean bad data is rejected; that is pydantic’s job.'],
 ['Generator','A Python function that hands back values one at a time, with yield, instead of building a whole list first. Not the M12 generator, which is a model call.'],
 ['Handler','The function that runs for one route. In FastAPI it is the function under the route decorator.'],
 ['422','The HTTP status code FastAPI sends when the request body fails validation: the shape was wrong, so the handler never ran. It is the pydantic boundary refusing the input.'],
 ['Environment (Python)','A folder holding one project’s installed packages and its Python version, separate from every other project’s. The package tool creates and manages it for you, so you never make one by hand.'],
 ['uv','The current Python tool for installing packages and managing a project’s environment. Fast, and one tool where there used to be several.'],
 ['conda, poetry, pyenv','Three older Python tools for environments and packages that uv replaces. Tutorials from before 2024 still name them.']],
M25:[
 ['Port, ported','Rewriting a program in another language so it does the same thing. Porting the M12 runner means the Python version must produce the same scores.'],
 ['Request/response models','pydantic classes declaring the exact shape of what a route accepts and what it returns, so both are validated.'],
 ['Runtime diff','A written list of the ways Python’s runtime behaves differently from Node’s, each proved by a small script.'],
 ['asyncio','Python’s built-in event loop. As in Node, one blocking call inside it freezes every other request, but Python does not warn you, and most libraries are blocking by default.'],
 ['Dependency injection','FastAPI’s way of handing a route the things it needs, such as a database connection, by declaring them as parameters. It is what lets a test swap in a fake.'],
 ['Hello-world service','The smallest possible server: one route that returns a fixed greeting. Used to get the tooling green before any real code.'],
 ['Handler','The function that runs for one route. An async handler is one written to run inside the event loop.'],
 ['Backend, Node-primary','The backend is the server side of an app. A Node-primary backend is one whose main server language is JavaScript; the trigger moves this module earlier if eight or more of the twenty postings you read in M0 ask for Python.'],
 ['Sync client, sync DB session','A library that blocks while it waits for the network or the database. Called inside an async handler it freezes the loop for every user. The async versions exist and must be used.'],
 ['time.sleep','Python’s blocking pause. Inside async code it stops the whole loop; asyncio.sleep is the one that lets other work run.'],
 ['gather','asyncio’s way of running many async tasks at once, the same shape as Promise.all. Unbounded, it fires everything at once.'],
 ['OOM','Out of memory: the process is killed because it asked for more memory than the machine has.'],
 ['Strict, coerce','Strict validation rejects a value of the wrong type. Coercion converts it, so the text "1" becomes the number 1. pydantic coerces unless told to be strict.']],
M26:[
 ['Provider, grant','The provider is the other service whose account the user connects, such as Google. The grant is the permission the user gave your app; the provider can revoke it at any time.'],
 ['Consent surface','Every screen the user meets around a connection: the button to connect, the provider’s permission page, the settings screen listing connections, and the prompt to reconnect.'],
 ['Access token','The short-lived credential each request to the provider carries. When it expires, a second, long-lived credential called the refresh token fetches a new one; automatic refresh means the app does this itself, on the provider’s schedule.'],
 ['Connect route, callback route','Two routes on your server. Connect sends the user to the provider’s permission page. The callback is where the provider sends them back with a one-time code your server exchanges for tokens.'],
 ['State parameter','A random value your server creates when sending the user out and checks when they come back. Without it an attacker can complete the callback on the user’s behalf; that is the CSRF from M21.'],
 ['PKCE','Proof key for code exchange: your server makes a secret, sends a scrambled version out, and sends the original back when exchanging the code. It stops a stolen code from being used by anyone else.'],
 ['Scope, scope upgrade, re-consent','A scope is one permission the user granted, such as reading their calendar. A scope upgrade is your app needing a new one; re-consent is sending every existing user back through the permission page to grant it.'],
 ['Degraded state','What the chat shows when the connection has stopped working: the feature is off, the reason is stated, and the way to reconnect is offered.'],
 ['Per-row key reference','A column saying which key scrambled this row, so keys can be rotated one at a time without re-encrypting everything at once.'],
 ['Rotation procedure','The written steps for replacing a key with a new one, re-encrypting under it, and retiring the old one, without downtime.'],
 ['Open redirect','A route that sends the user on to any address given in the request. Attackers use one to make a callback land on their site instead of yours.'],
 ['Per-tenant credential storage','Each user’s tokens kept in their own encrypted row, so one leaked row exposes one user.'],
 ['401','The HTTP status code meaning the credential was missing or no longer valid. From a revoked provider it arrives at 3am in a background job, where nobody is watching.'],
 ['Revocation','The user or the provider canceling the grant. Your next request gets a 401 and must lead to a re-prompt, not a silent failure.'],
 ['Session','The server’s record that a user is signed in, tied to a cookie the browser sends back on every visit. The connection you build is stored against the session’s user.'],
 ['code_verifier','The PKCE secret your server makes and keeps for one sign-in. The scrambled version it sends out is the code_challenge; the verifier goes back when the code is exchanged, proving the same server started and finished.'],
 ['Master key','The one key that unlocks the per-row keys. Its location per environment is written down, because if it lives next to the data the scrambling is decorative.'],
 ['Encryption, envelope encryption','Encryption scrambles data so only a holder of the key can read it. Envelope encryption uses two layers: each row is scrambled with its own key, and each of those keys is scrambled with one master key kept elsewhere.'],
 ['At rest','Data as it sits stored on disk, as opposed to in transit over the network. Encryption at rest scrambles the stored copy, so a copied database file is unreadable without the key.']],
M27:[
 ['Variant, non-droppable','A variant is one version of the program’s module list: the full program, the Spine, or a cut-down one. Non-droppable means this module stays in every variant, because being paid correctly is the point of all the others.'],
 ['Equity, startup','Equity is part-ownership of the company, given as shares or the right to buy them. A startup is a young company hoping to grow fast; its equity is worth something only if the company is later sold or listed, and most are not, so it is not counted as pay.'],
 ['Vesting','The schedule on which equity becomes yours. A common one gives you nothing for the first year and then a portion each month for three more; leave early and the unvested part is gone.'],
 ['Delta (of two numbers)','The difference between two numbers. Here it is the money you keep under one arrangement minus the money you keep under another, computed by you rather than taken from the headline. M29 uses the same word for the difference between two scores.'],
 ['Recruiter','The person whose job is finding and screening candidates for a company, either on its staff or at an outside firm. The recruiter is usually the first person you talk to and the one who asks for your number.'],
 ['Gate A, Gate B, controllable, lagging','Two checks. Gate A is controllable: you can book it yourself, with the reviewer playing a part. Gate B is lagging: it happens when a real recruiter calls, which you cannot schedule, so it is logged when it comes rather than waited for.'],
 ['Briefed','Given instructions in advance about how to act. The reviewer is briefed to push back on your number so the rehearsal is harder than the real call.'],
 ['Recruiter screen','A short first phone or video call with a recruiter, 20 to 30 minutes, to decide whether you go on to interviews. It covers your background, your availability and your expected pay.'],
 ['Hedging','Softening what you say so it can be taken back: I was thinking maybe around, if that works for you. A hedged number invites a lower one; the rep is saying the number plainly and then stopping.'],
 ['Coursework','Work done to complete a course, as opposed to work done because someone needed it. Naming it tells the listener you are a student; the same work described as building and operating an app does not.'],
 ['Background answer','Your 30-second reply to tell me about yourself: what you have built and operated and what you are looking for. Delivered without apology and without naming coursework.'],
 ['Follow-ups','The questions a recruiter asks after your answer. The six here are predictable, so each gets a one-line reply written and rehearsed in advance.'],
 ['Remote (work), remote-first, quarterly onsite','Remote here means working from somewhere other than the office, not the git remote of M1. Remote US-only requires you to live in the US; remote in four timezones requires your working day to overlap the team’s. Remote-first means the whole company works this way; quarterly onsite means travelling to the office every three months. They are different jobs with the same word on the posting.'],
 ['Employee, contractor','An employee is on the company’s payroll: the company withholds your tax, pays most of your medical cover and gives paid time off. A contractor runs a one-person business that bills the company for work, gets none of that, and can be dropped without notice. Contract job, the M0 posting category, means the second.'],
 ['Terms','Everything a company proposes besides the pay: whether you are an employee or a contractor, hours, where you must live, notice period, and what happens to your equity if you leave. Terms can move more money than the pay figure does.'],
 ['W-2, 1099, FICA','The two US tax forms that name the arrangement. A W-2 is what an employee receives each year, showing pay and the tax already withheld. A 1099 is what a contractor receives, showing only what was paid, with all the tax still owed. People say W-2 job or 1099 job to mean employee or contractor. FICA is the US payroll tax for Social Security and Medicare; on a W-2 the employer pays half of it.'],
 ['Freelance, freelance client','Freelance work is paid work done as a contractor for someone who is not your employer. The client here is the person or company that paid for it, not the browser side of an app as in M2; a real one can vouch for you as a reference.'],
 ['Agency, employer-of-record','Two middle arrangements. An agency employs you and rents you to a client company, keeping a cut. An employer-of-record is a company that puts you on its own payroll so a client in another country can pay you as an employee without setting up there.'],
 ['Base','The fixed yearly salary, paid whatever happens. It is the part you can count on and the part most often moved when you ask for more.'],
 ['Bonus','Extra money on top of base, usually once a year and usually tied to a goal being met. It is promised, not guaranteed, so it is counted separately.'],
 ['Offer','A written proposal from a company to hire you, stating base, equity, bonus, start date and terms. Nothing before it is real, and everything in it can be discussed.'],
 ['Negotiation','The conversation after an offer where you ask for more money or different terms before saying yes. Every company expects one; the first number is rarely the last.'],
 ['Comp','Short for compensation: everything you are paid for the job, in money and in things worth money. Total comp is the yearly sum of all of it, and it is the number to compare offers by.'],
 ['Floor, target','Your floor is the lowest comp you will accept; below it you say no. Your target is the number you ask for. Both are written down, with the postings that justify them, before any recruiter asks.'],
 ['Negotiation script','The exact words you will say when asked for a number and when pushed on it, written down and rehearsed out loud until they come without a pause. The first time you state your floor to a stranger should not be the real call.'],
 ['Unpaid time off, PTO','Days you do not work and are not paid for. A contractor’s holidays, sick days and gaps between jobs are all unpaid; an employee’s paid time off (PTO) is part of comp.'],
 ['Headline number','The single yearly figure a posting or an offer leads with. Two jobs with the same headline number can leave you with very different amounts once tax, insurance and time off are counted.'],
 ['Spreadsheet model','A spreadsheet where the inputs sit in their own cells and every other cell is a formula, so changing one input recomputes the result. Yours turns one headline number into what actually reaches you under each arrangement.'],
 ['Self-employment tax, SE tax','The extra tax a contractor pays that an employer would otherwise cover: the employer’s half of FICA. Do not carry a single percentage around. SE tax is 15.3 percent of 92.35 percent of your net self-employment earnings, so the employer half is roughly 7 percent of what you actually net, not 7.65 percent of what you bill. The Social Security part of it stops at the annual wage base, above which only the Medicare part continues. And it is partly given back: you deduct half of it above the line, and you may qualify for the qualified business income deduction on top. Those pull in opposite directions and the net effect depends on your state, your filing status and your deductions. Model it in your own spreadsheet with your own numbers. Saying "1099 costs you 7.65 percent" in an offer conversation gets you corrected by someone who has filed one.'],
 ['Health insurance (employer-paid)','In the US an employer usually pays most of the cost of an employee’s health insurance. A contractor buys it alone, and that cost comes off the headline number.'],
 ['References, references plan','References are people a prospective employer can phone or email to ask what you are like to work with. The plan is who your three will be and by when each is secured, because the ask cannot be made in the week of an offer.'],
 ['Employment verification, self-employed','Employment verification is a background-check vendor confirming that you held the jobs you listed, usually against payroll or tax records. Self-employed means there is no employer to confirm, and references do not substitute: references speak to what you are like to work with, which is a different question. If a background check is coming, expect to supply 1099s or client invoices for any paid work, and say up front that the last year was self-employed rather than letting it surface late.'],
 ['Title','Your job title: the name of the role. When you were self-employed you choose it, and the honest one is the one your work supports — which for a year of self-directed building with no clients and no team is a narrow range. If "what title?" and "who was the client?" are questions you cannot answer plainly, the problem is the framing, not the question.'],
 ['Funnel table','A table you keep of the job search by stage: applications sent, replies, screens, interview loops (an interview loop is the full set of interview rounds a company runs for one candidate), offers, and human contacts per hour spent, one column per channel. Called a funnel because each stage is smaller than the one before; it shows which channel is working.'],
 ['Structure (of an offer)','How the comp is split: how much is base, bonus and equity, and under which arrangement. The number and the structure are both open to negotiation.']],
M28:[
 ['Pinned repo','GitHub lets you choose up to six repos to show at the top of your profile page; those are pinned. They are what a stranger sees first, so only evidence repos go there.'],
 ['Product-spec form','A README written like the M2 specification: who the app is for, what it does, what it costs, how good it is, what it refuses to do. Not a list of what is inside it.'],
 ['Contribution, OSS contribution history','A contribution is a change of yours accepted into someone else’s open-source project. Your contribution history is the public record of all of them, with their review threads, which GitHub shows on your profile.'],
 ['Write-up, public write-up','A short published piece explaining something you built or measured, with the numbers. Public means posted where strangers can read it, such as a blog or a forum, rather than kept in the repo.'],
 
 ['Channel, named channel','A place where you can reach people who are not your friends. Named means you write down which one each reader came from. Pick places where this ask is on topic and welcome, or it reads as self-promotion and gets removed: a chat server for a language or framework with a feedback or show-and-tell channel, the discussions tab of a project you have contributed to, or the chat of a local meetup you attend. A general subreddit or a busy mailing list is where this request goes to be ignored. Post the link with exactly one line — "Five minutes, three questions, no back-and-forth: what does this do, who is it for, what does it refuse to do?" — and take the answers in writing.'],
 ['Operating','Running a live system for real users over time: keeping it up, watching cost and quality, fixing it when it breaks. Building is one weekend; operating is the year after, and it is the half employers ask about.'],
 ['Upstream (contributed upstream)','Contributed upstream means your change went into the original project itself, so everyone who downloads it gets your fix. Not the M7 upstream, the service your server calls.'],
 ['Resume','A one- or two-page summary of your work and skills, sent to every job you apply for. Here every line on it points at a repo where a reader can check it.'],
 ['Application','One attempt at one job: your resume plus whatever the posting asks for, sent through the company’s form or handed to a person there.'],
 ['Claim (on a resume)','A sentence on your resume saying you did something, such as built document search with measured recall. Mapping it to a repo means naming the repository where a reader can see the code and the numbers.'],
 ['Curriculum','This program: the ordered list of modules you followed. Never named to an employer, because a course completed is a weaker claim than an app built and run for a year.'],
 ['Skills list, technologies','The section of a resume listing the languages, tools and services you know; each one is a technology. Six you can answer detailed questions on beat 22 you have touched, because an interviewer will pick one and dig.'],
 ['Grilled on','Questioned closely and in detail until it is clear whether you know the thing. Anything on the skills list can be.'],
 ['Prompt Engineering','Writing prompts for a model, listed as a skill. It appears on so many resumes with nothing behind it that it reads as a warning sign; your eval numbers say the same thing with evidence.']],
M29:[
 ['Layer','The program’s grouping of modules into nine stages, numbered 0 to 8. Layer 5 is the AI modules M18 to M21. This module waits for M18 and M20 in particular, because that is where its numbers come from.'],
 ['Failing v1','The eval score of your first version, from before the improvements, which was bad. Published because a reader can only see engineering in the change from a bad number to a better one; a single good number could have been luck.'],
 ['Genre','A recognized kind of writing with its own expected shape, as a recipe or an obituary has. The genre that works here is a numbered account of something that went wrong in your own system and what you measured.'],
 ['Converts','Causes the reader to do the thing you wanted: reply, follow you, ask for a call. Borrowed from sales. A piece that converts brings people to you; a diary does not.'],
 ['Protocol (procedure)','A fixed procedure followed the same way each time so results can be compared. The stranger protocol is M28’s gate: two people from a named, on-topic place, 5 minutes each, answers in writing before any back-and-forth, then a marked-up pass you run yourself against what they wrote. Not the wire protocol of M22.'],
 ['Quality number','The one figure from your eval set that says how good the app is, such as 87 percent of test cases passing. It sits in the README next to the cost per user.'],
 ['Stack list','The list of languages, tools and services the app is built with. Every project has one and it says nothing about whether the app works.'],
 ['Portfolio','The set of public work a stranger judges you by: your pinned repos, their READMEs and your write-ups together. It stands in for the employment history you do not have.'],
 ['Feature, feature list','A feature is one thing the app can do, such as upload a PDF. A feature list is a README that is only such things, with no numbers and no reasons; it is what most portfolios are and why they are not read.'],
 ['Post','One piece published on a blog, forum or newsletter. A tutorial post explains how to do something that a thousand other posts already explain, and reaches nobody.']],
M30:[
 ['Forward-loaded','Done early, ahead of the date, instead of at the end. Ten of this module’s hours happen in the week of the application date, not after it, so the first real interview is not the first rehearsal.'],
 ['Walkthrough','A recorded tour of your flagship, 10 minutes, screen visible, explaining what it does and how it is built. It is the answer to tell me about a project, prepared once.'],
 ['Decision language','Describing work as the choices you made and why: I chose X over Y because of Z, and here is what it cost. The opposite is tool-language, which lists what you used.'],
 ['Foreign repo','A repo you did not write and have never opened. The bug fixes here come from the M1 blind queue, so every one is foreign.'],
 ['Annotated','With notes added alongside. An annotated assistant transcript has your comments at each point marking where you checked the assistant’s claim and where you took it on trust.'],
 ['Mock defense','A practice run of explaining a design or a decision to someone who argues against it, the way a real interviewer will. Mock means practice with a real person; defense means you hold the position or change it with a reason.'],
 ['Marginal cost','The extra cost of one more of something. Your stories cost nothing extra because INCIDENTS.md recorded each one on the day it happened.'],
 ['Narrated problem, narrated log','A narrated problem is a small coding problem solved while saying every thought out loud, the way a coding interview is done. The log is the record of all of them with a score each.'],
 ['Round','One stage of a company’s interview process, usually 30 to 60 minutes with its own format and its own interviewer. A typical process has four to six, and each has a name.'],
 ['Behavioral round, behavioral rehearsal','The interview round with no code: tell me about a time you disagreed with someone, handled a failure, missed a deadline. Answered with real stories. Rehearsal is choosing the stories and telling them out loud in advance.'],
 ['Codebase','All the code of one project taken together. Unfamiliar and multi-file means many files you have never seen, which is every job’s first week.'],
 ['Driving an assistant','Working through a task by directing an AI coding tool: what you ask it, what you check, what you reject. Some interviews score the transcript of this, so how you drive is itself the test.'],
 ['Take-home','A task the company gives you to do on your own time, usually a few hours, and submit, such as a small PR into a repo they provide. It is scored on judgment and evidence, not polish.'],
 ['System design round','The round where you design a system at a whiteboard for 45 minutes and defend it, rehearsed in M13. Mid-level means the bar is a bounded system with its failure path, not a global one.'],
 ['Clarify-before-typing','Asking what the problem means and where its edges are before writing any code. Drilled means repeated until it happens without deciding to.'],
 ['Autocomplete','The editor feature that finishes your code as you type, from a single word to whole functions when an AI tool is attached. Off for practice, because the interview machine will not have it.'],
 ['Track 9 (Tracks tab), weekly slot','The parallel tracks are the work that runs alongside the modules every week. Track 9 is the weekly half-hour narrated problem, solved out loud with autocomplete off; its log is what this module’s first gate draws on.'],
 ['Un-assisted round','The coding round where you solve a problem alone, out loud, with no AI tool and no autocomplete. It tests whether you can think with nothing helping.'],
 ['Verified vs accepted','Verified: you ran it, read it or tested it yourself before using it. Accepted: you took the assistant’s word. The interviewer counts how often each happened.'],
 ['Cold (question)','With no warning and no preparation, as a question asked for the first time in the room; not the cold cache of M5. The rehearsal is so that cold still has a story ready.'],
 ['IDE','Integrated development environment: an editor with everything attached, such as autocomplete, a debugger and an AI assistant. VS Code is one. Your own is set up for you; the interview’s is not.'],
 ['Reject signal','A behavior interviewers have agreed means no, whatever else went well. Starting to type before asking a question is one they name.'],
 ['Gold-plating','Polishing the parts that show, such as a take-home’s screens, beyond what was asked, while the part that is scored is missing.'],
 ['UI','User interface: the screens and buttons a person sees and uses. The visible part of an app, and the part most tempting to polish.']],
M31:[
 ['Onsite (interview)','The final round of interviews, several in one day, with the team you would join. Once done in the office, now often on video and still called an onsite. It is the last step before an offer, which follows one to three weeks later.'],
 ['Operating contract','The one page from M0 that sets your hours, your reviewer and your rule for a bad week. The second one is the same page rewritten for a person with a job.'],
 ['Weekly budget','The hours per week you will honestly give the program. Employed, that is five to eight hours, and every plan built on eighteen has to be rebuilt.'],
 ['Component (of a codebase)','One self-contained part of a larger codebase, such as the billing code or the search code. Not the React sense from M22.'],
 ['Re-contracted','Agreed again on new terms. Your reviewer signed up for 20 minutes a month with an unemployed learner; the employed version needs asking for afresh, or a different person.'],
 ['Monthly re-plan','The 2 hours each month, from Track 8 (Tracks tab), where you re-read the plan against what actually arrived: postings screened, the funnel table, your delta notes. It continues after hire with the job as a new input.'],
 ['Manager checkpoint','A scheduled written exchange with your manager where you ask whether you are where they would expect at this point, and get the answer in writing. Scripted means the questions are written before you start, so nerves do not soften them.'],
 ['Cold rebuild','Track 4: rebuilding the core of something you made weeks ago from an empty file with the original closed, scored 0 to 3. Retargeted, it becomes rebuilding a component of the employer’s codebase from memory.'],
 ['Feedback instrument','Anything that tells you how you are doing with a number or a written answer: the estimate log, the reviewer, the funnel table, the weekly rebuild score. Each was built for the program and each is worth more inside a job.']],
M32:[
 ['30/60/90 plan','A written plan for your first thirty, sixty and ninety days in a job: what you will have learned, shipped and be trusted with at each mark. Written against a real posting so it names that job’s systems, and shown to the manager in week one.'],
 ['Template','A fill-in-the-blanks text kept ready so the same kind of message is written the same good way every time. The asking-for-help template has four blanks: tried, expected, saw, believe.'],
 ['Discord, Slack','Two chat apps where teams and open-source projects talk, organized into channels by topic. Most projects’ help channels are on one of them, and a question posted there is answered in public.'],
 ['Org map, org mapping','A chart of who works on what and who decides what, worked out from evidence rather than asked for. Here it is inferred from git history: whoever has committed most to a folder owns it.'],
 ['git log, author','git log is the command that prints the commit history. Every commit records an author, the person who made it, so counting commits by author per folder shows who touches what.'],
 ['Handoff note','A written page that lets someone else pick up your unfinished work: what is done, what is not, what is broken, where the branches are, what to do next. Good enough means a stranger can continue without asking you.'],
 ['Inherit (a system)','Take over responsibility for something someone else built and may have left. An inherited AI system comes with prompts, evals and traces but usually no note saying why any of it is the way it is.'],
 ['WIP, WIP policy','WIP is work in progress: the number of things you have started and not finished, such as open PRs. A WIP policy is a written cap on that number, chosen from how long your reviews take, so work keeps moving instead of piling up.'],
 ['Review latency','How long a PR waits between being opened and getting its first review. Your own data comes from the Track 2 (Tracks tab) PRs you sent to open-source projects, and it decides how many PRs to keep open at once.'],
 ['Hypothesis','Your current best guess at what is going on, stated so it can be tested and shown wrong. Asking for help means giving yours, not asking for the answer.'],
 ['Done-state','The written condition that means a piece of work is finished, agreed before starting. For inheriting a system it is a one-page note with five named parts.'],
 ['Load-bearing','A part the whole thing rests on: a prompt whose smallest change alters behavior, as a wall that holds the roof up. You change those last.'],
 ['Implied eval','The measure the previous author was clearly optimizing for, read from the prompts and tests, although no eval set was ever written down.'],
 ['Defensive instructions','Lines in a prompt telling the model not to do something: never guess a date, always cite a source. Each is a scar from a failure the author hit, so together they tell you what they were afraid of.'],
 ['Pairing','Two people working on one bug at one screen, one typing and both thinking out loud. Standard on many teams, and the fastest way for a new hire to be seen working.'],
 ['Median','The middle value when all your measurements are sorted: half are above it, half below. Used for review latency instead of the average because one PR that sat for a month would drag an average.'],
 ['Unblock','Remove whatever is stopping someone’s work, often with one answer from the right person. Being stuck two days on a 5-minute unblock is the failure that gets remote new hires let go, meaning dismissed.'],
 ['Cycle time, cycle-time dashboard','Cycle time is how long one piece of work takes from started to merged. Many teams show it on a dashboard per person; six-day PRs done one at a time look slow there even when the total output is fine.']]
};

// Merge detail onto the graph so consumers see one object per module.
(function () {
  for (var i = 0; i < AI_CURRICULUM.length; i++) {
    var d = AI_DETAIL[AI_CURRICULUM[i].id];
    if (d) { AI_CURRICULUM[i].concepts = d.concepts; AI_CURRICULUM[i].mistakes = d.mistakes; }
    if (AI_WORDS[AI_CURRICULUM[i].id]) AI_CURRICULUM[i].words = AI_WORDS[AI_CURRICULUM[i].id];
  }
})();

// ============================================================
// Checkpoints. Named sub-goals on every module of 30 hours or more, plus five
// shorter ones that earn them, each with its own done-state and each a legitimate
// stopping point in a bad week. A module without them is the single largest flow
// defect available to a program like this: forty hours in with no defined
// intermediate target is where people conclude they are lost rather than
// mid-module. Ordered easiest-first inside each module so the first one lands
// early and the module opens with a win rather than a wall.
// ============================================================
var AI_CHECKPOINTS = {
  M8:['One job written to the table and picked up by a worker',
      'A worker killed mid-job, and the job picked up again by another when its lease expires',
      'The same job submitted twice and run once, with the read path showing its result'],
  M13:['The one-page design doc written, with the two options you rejected and why',
      'A real reader’s pushback on it, and the version that changed because of it',
      'The first timed design rep done and debriefed, on a system outside your stack'],
  M16:['The delegation policy written, and the pre-commit hook that enforces it',
      'Three real tickets handed to a coding agent, with a defect log naming which module let you catch each one',
      'One flagship feature shipped in a timebox with a coding agent, measured against one written by hand'],
  M17:['The scoping doc for one real request: what is in, what is out, how it is cut',
      'An estimate written before the work and the actual time beside it',
      'One open-ended request delivered as a plan with a number, not as an answer'],
  M26:['One provider connected end to end, with the token exchange working',
      'The grant revoked mid-run and the app degrading honestly instead of crashing',
      'The connections screen, and the scopes you asked for written down with why'],
  M6:['Token counts compared against your assumptions across five text types',
      'One cache hit proved from the usage meters, with its cost delta printed',
      'Every stop_reason produced on purpose, with the refusal taken from a recorded fixture, and the cost column live in the M2 log',
      'The limit of constrained decoding shown two ways — a schema-valid reply that is factually wrong, and the 400 the API returns when the schema itself is invalid — with capabilities read from the Models API and every 400 pasted into the dead-patterns page'],
  M11:['Twenty documents hand-labeled and about twenty-five queries hand-written against them, split into dev and test before any pipeline code is written, with the number in each half recorded',
      'One document uploaded through a signed URL and stored in a private bucket',
      'Text extracted from a digital PDF, a scanned one and a .docx, with character offsets kept',
      'The pipeline resumable on the M8 queue, with the orphan-cleanup job and the retention rule written down'],
  M20:['The per-user credit ledger, with its decrement proved correct under concurrent hammering',
      'A test-mode subscription whose webhook consumer survives being replayed',
      'The out-of-credit path and the spend circuit breaker, both proved from outside the app',
      'One weekly report joining usage, quality and cost into one line per active user',
      'The model-by-effort routing experiment scored by M12, reported as cost per completed task'],
  M1:['A terminal you opened yourself, node --version answering, and an empty file you created from the command line',
      'A program that prints something, run from the terminal rather than from an editor button',
      'The file-reading program, and the first error you read to the end instead of pasting into a search box',
      'The API program: something that came back from a real server and was reshaped by your code',
      'The repeated block pulled into a function, because you noticed it, not because you were told to',
      'Three tests you wrote before the code, watched fail, then made pass',
      'A deliberate break recovered with git \u2014 the save-point used in anger once',
      'The 30-minute install check done against the named hardware floor, your first unseen task scored as a fraction, and the twenty commits saved unread with each parent SHA recorded and its suite confirmed green today'],
  M2:['The one-page specification written and signed line by line, before any code',
      'One model call made from a script and its reply printed',
      'The same call behind a server route, with the reply shown on a page',
      'The key in a server-side environment variable, and a search of the files the browser downloads proving it is not there',
      'The call log written on every request: input, output, usage, time',
      'Deployed at a URL that works on a phone you did not configure',
      'Two strangers through it, their requests visible in your log'],
  M5:['The 3-hour win: 50k rows, one slow query, one EXPLAIN, one index, one measured speedup you can state as a number',
      'Reading a plan out loud: seq scan vs index scan vs bitmap heap, and which line of EXPLAIN told you',
      'The 5,000,000-row rig loaded, with a load generator you wrote rather than a benchmark you downloaded',
      'Six of the twelve queries with plans captured before and after',
      'All twelve, plus the wall-clock table that shows the slow-to-fast loop closing',
      'An RLS policy set benchmarked correct-but-slow against correct-and-fast, with the plan diff that explains it',
      'Asymptotic complexity written against your own measurements, not against a textbook curve',
      'The legacy-key rotation performed and documented as a procedure someone else could follow',
      'The flagship on hosted Supabase: sign-in, one user-scoped table, one policy, a pooled connection'],
  M12:['The harness skeleton: Postgres tables plus a TypeScript runner that scores one case end to end',
      'Session 1 of 4: 25 traces hand-read and labeled, no taxonomy yet',
      'Sessions 2-4 done: 100 labeled traces and a failure taxonomy with counts, written after the reading rather than before',
      'Dev/test split made at creation and recorded, so it cannot be quietly re-drawn later',
      'Assertion graders covering the failures that do not need judgment',
      'A judge with a measured confusion matrix against your own labels',
      'Inter-annotator agreement: the reviewer labels 30 from your rubric alone, and the rubric is what gets revised',
      'The tiered CI gate: a smoke set on every push, the full set nightly, recorded fixtures so graders cost nothing',
      'The fail condition stated as a statistical threshold with its bootstrap interval, not as a single number',
      'A deliberate model-family migration gated only by this eval set',
      'stats-lab: the four tests, each run once against your own data — base rates, the confusion matrix with TPR and TNR, percentiles from a raw array, and a bootstrap confidence interval you wrote yourself'],
  M3:['Hello, event loop: predict the output order of six mixed sync/setTimeout/promise lines, then run it and reconcile',
      'One failing async test you wrote, fixed for the right reason',
      'MiniPromise: then/catch/chaining passing your own tests',
      'The four concurrency failure modes reproduced on demand',
      'The Zod boundary rejecting model JSON that a bare “as” cast accepted',
      'The typed error taxonomy with a documented retry rule per class'],
  M4:['Aliasing and the shallow-copy trap, reproduced and fixed',
      'Money wrong by a cent, then correct',
      'The leaking server, proved with a heap snapshot',
      'The streamed grapheme split, and the pool exhausted under load',
      'The lost update reproduced against a real database row, then prevented',
      'The four-timezone scheduler pinned across both DST boundaries'],
  M7:['Read and write one HTTP request by hand, no client library',
      'A working SSE frame parser against a deliberately chunk-split fixture',
      'The streaming proxy end to end, no SDK',
      'AbortController wired through: killing the client stops upstream billing',
      'Proxy buffering and a mid-stream error reproduced, and recovered from both',
      'The idempotency table: same key twice, one row'],
  M9:['One unit test that fails for the right reason, then passes',
      'The four test doubles, each used once where it belongs',
      'Integration tests against real Postgres, including two RLS policies',
      'The record-replay model client, with a split-frame stream recorded',
      'Green required check in CI, plus a mutation score around 70% on the module you scored'],
  M10:['Read one real stack trace to its actual cause',
      'A bug found with a conditional breakpoint you could not have printed your way to',
      'Structured logs with correlation IDs surviving one async hop',
      'OTel spans around the model call, queryable',
      'The silent-failure detector catching a wrong-but-200 output',
      'The runbook executed by another person during the game day',
      'The written sampling and retention decision, and the postmortem of the outage you caused'],
  M14:['Trace one user action end to end with file:line at every hop',
      'Answer "why is this line here?" using pickaxe and log -L, not blame alone',
      'Characterization tests pinning an untested module, bugs included',
      'A behavior change behind a flag, both paths green',
      'The resumable backfill over 100k rows, killed and restarted clean',
      'The dual-run cutover on a deterministic feature'],
  M15:['The object model, out loud: what a commit, a ref and the index actually are',
      'The recovery lab: six disasters, each recovered and explained',
      'One conflict resolved by reading the merge base, not by picking a side',
      'A file you were confused by, restructured behind characterization tests',
      'Failure paths rewritten to actionable messages',
      'One PR through a full review round trip, 15+ comments','Twenty working-day updates posted in public, and the sealed brief handed over for M16'],
  M18:['The measuring instrument first: a golden set, split dev/test at creation, with the number of test queries written down before anything is measured',
      'A recall@k baseline number, stated with its bootstrap interval',
      'Hybrid+RRF measured against it, delta and interval reported together',
      'Reranker measured, with the candidate depth that actually matters, delta and interval together',
      'The arms you did not run, named in writing, with the corpus size that would have justified running them',
      'The long-context comparison run once on the same queries and priced — an anecdote, labeled as one, not a ranked arm',
      'Span-level citation verification against M11 offsets',
      'Embedding lifecycle: batched, priced per 1,000 chunks, re-embedded behind the read switch',
      'Whether your delta’s interval crosses zero, said out loud in the README, whichever way it came out'],
  M19:['One tool call, round-tripped by hand at the wire level',
      'The loop: multi-step, with tool_use and thinking blocks replayed append-only',
      'The budget governor and loop detection, holding under a fuzzed input',
      'Durable state: kill the process mid-run and resume correctly',
      'Containment: a blocked host and the metadata endpoint both refused',
      'Trajectory evals scored by M12 graders, step-level and outcome-level'],
  M21:['Secrets audit: prove what actually ships to the browser by searching the files it downloads',
      'Broken access control, exploited on the deliberately vulnerable copy then fixed',
      'Injection, XSS or SSRF: one landed, one fixed, one test — SSRF targets are your own allowlisted test hosts and private-network addresses on your own network, never a third party’s endpoint','Cross-tenant file access through a guessed or replayed URL, landed and fixed on the vulnerable copy with synthetic tenants — never against production, where the rows belong to real people','One exploit run through the M19 fetch tool',
      'Indirect prompt injection landed through retrieved content',
      'Tool permissions with a written blast-radius analysis',
      'The bidirectional data-flow doc, with the delete path implemented and tested'],
  M22:['The rendering model: predict which components re-render, then measure',
      'One effect bug from each of the four failure modes, fixed',
      'A custom transport over your own M7 SSE frames',
      'Stop that provably stops billing; refresh that resumes',
      'Tool-call approval gate wired to M19, citations wired to M11',
      'Honest failure states, and axe-core green on the chat surface'],
  M23:['Environments and config: a missing var fails the deploy, not a 2am route',
      'CI green as a required check, with the eval tier wired in',
      'A feature-flagged release you can turn off without a deploy',
      'A rollback rehearsed under a timer, measured from the dashboard',
      'Expand/contract run through the pipeline under live load, zero failed requests',
      'One dockerized cloud deploy with an IAM role you wrote, torn down same day'],
  M25:['Typed request and response models, and one streaming route',
      'The blocking-call trap reproduced: an async handler frozen, then fixed',
      'M12 eval runner ported, pytest faking the model client',
      'The type checker green in CI on the ported runner'],
  M30:['The 10-minute flagship walkthrough, in decision language, recorded',
      'Behavioral stories rehearsed against the incident log',
      'Two mock defenses with a real person who pushes back',
      'The blind queue topped up with five freshly found commits verified green at their parents, then three timed foreign-repo fixes from it, transcripts annotated']
};
(function () {
  for (var i = 0; i < AI_CURRICULUM.length; i++) {
    var cp = AI_CHECKPOINTS[AI_CURRICULUM[i].id];
    if (cp && !AI_CURRICULUM[i].checkpoints) AI_CURRICULUM[i].checkpoints = cp;
  }
})();

// AI_DETAIL, AI_WORDS, AI_CHECKPOINTS and AI_SPINE_TRACK_HOURS are declared below the
// module.exports block above, so they were still undefined when it ran. A Node consumer
// got the graph and no glossary. Export them here, where they exist.
if (typeof module !== 'undefined' && module.exports) {
  module.exports.AI_DETAIL = AI_DETAIL;
  module.exports.AI_WORDS = AI_WORDS;
  module.exports.AI_CHECKPOINTS = AI_CHECKPOINTS;
  module.exports.AI_SPINE_TRACK_HOURS = AI_SPINE_TRACK_HOURS;
}
