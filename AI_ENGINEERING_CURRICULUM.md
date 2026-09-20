# AI Engineering Curriculum: From API Calls to Production

## Your Path to Hireable AI Product Engineering

This curriculum is designed to take you from understanding how to call an API to shipping production-grade AI features that work reliably at scale. Each module is **layered and sequential**—you master one skill before the next depends on it.

**Core principle**: Every module ends with a working artifact *you* build. No reading alone. No demos. You ship something, explain it out loud, and move forward.

---

## Curriculum Map

### **Module 1: Foundations** — Understanding the Claude API Deeply
**Why this matters**: You can't engineer AI software reliably if you don't understand what's actually happening inside the API. Most people skip this and pay for it later with costs they can't control, outputs they can't debug, and features that break in production.

**Core concepts you'll master**:
- The anatomy of an API call: request/response structure, roles (user/assistant/system), message sequencing
- Tokens: what they are, why they matter, how to count them, why pricing works the way it does
- System prompts: why they're powerful, where they work and where they fail, how to design effective ones
- Temperature, top_p, max_tokens: what each actually does, why outputs vary, how to tune for reliability
- Cost modeling: how to calculate the exact cost of a feature at scale
- When to use different models (Opus vs Sonnet vs Haiku)
- Rate limits, retry logic, and the boundaries of the API

**The artifact you'll build**:
A command-line Node.js tool that:
1. Makes a single API call to Claude (any prompt you choose)
2. Logs the *entire* request and response in detail (every field, every setting)
3. Counts tokens using the official Anthropic SDK
4. Calculates the exact cost (input tokens × input rate + output tokens × output rate)
5. Prints a human-readable explanation of everything: "You sent X tokens as input at $Y per million = $Z"
6. Repeats the call 3 times with `temperature: 0.1` and `temperature: 1.0` to show how randomness works
7. Saves the log to a JSON file so you can inspect the structure

**How you'll know you've mastered it**:
- You can explain what every field in a Claude API response means
- You can predict the cost of a feature before you build it
- You can calculate the exact token count of a prompt by hand (within 10%)
- You can explain why temperature affects outputs and when to use 0 vs 1 vs something in between
- **The test**: I'll give you a use case ("classify 10,000 user reviews"), and you'll tell me the cost, the right model, and the right temperature before writing code

**What most people get wrong**:
- They think higher temperature = "more creative"—it's actually "more random and less predictable"
- They use 0 temperature for open-ended tasks and wonder why outputs are boring
- They never count tokens and get shocked by bills
- They don't test costs at scale before shipping
- They use the wrong model for the job (Opus for classification, Haiku for reasoning)

---

### **Module 2: Reliability** — Making AI Features Production-Ready
**Why this matters**: The difference between a demo and a real product is 90% reliability. Your model will hallucinate, return malformed JSON, contradict itself, and fail in ways you didn't predict. This module teaches you to *expect* that and build systems that handle it gracefully. This is the most important skill in the whole curriculum.

**Core concepts you'll master**:
- Structured outputs (JSON schema validation): forcing the model to output valid JSON
- Retry logic and exponential backoff: when the API fails or returns garbage
- Fallback strategies: what to do when the model can't do the task
- Pydantic/Zod validation: catching malformed outputs before they break downstream systems
- Writing evaluations (evals): how to *measure* whether a feature actually works, not just whether it runs
- Common failure modes: hallucinations, off-by-one errors, instruction following failures
- Detection and recovery: knowing when something went wrong and fixing it automatically
- Cost of reliability: caching, retries, and validation all have costs—learning to balance them

**The artifact you'll build**:
A task-processing system that:
1. Takes a natural language task description
2. Classifies the task into one of 5 categories using Claude (with JSON schema validation)
3. Extracts structured metadata (confidence score, severity, required fields)
4. Handles three real failure scenarios:
   - The model returns invalid JSON (retry with clearer instructions)
   - The model returns JSON that doesn't match the schema (fix it or fail gracefully)
   - The model refuses to classify (detect and log, use sensible default)
5. Runs 20 test cases and reports: success rate, failure reasons, average cost per task
6. Outputs a report: "Succeeded: 18/20 (90%). Failures: 1 refused, 1 schema mismatch. Avg cost: $0.0023"

**How you'll know you've mastered it**:
- You can identify why a model output is wrong (hallucination vs instruction-following failure vs format issue)
- You can write an eval that measures "does this feature actually work" (not just "did the API respond")
- You've tested your system with intentionally malformed data and know how it fails
- You can explain the trade-off between retries (cost) and reliability (success rate)
- **The test**: I'll introduce a bug in the model's output, and you'll detect it with your eval, not by reading the JSON

**What most people get wrong**:
- They test with the happy path only (clean input, good responses) and ship blind
- They think "the API returned something" means "it worked"
- They retry forever on failures instead of giving up with a sensible fallback
- They don't validate outputs before using them downstream
- They build unreliable features and then spend months debugging in production

---

### **Module 3: Retrieval (RAG)** — Grounding AI in Real Data
**Why this matters**: Left alone, Claude will hallucinate. Give it your data first, and it answers from facts. This is how you build AI features that don't make stuff up: document Q&A, customer support bots, code analysis tools. If you skip this, every AI feature you build will confidently tell users false things.

**Core concepts you'll master**:
- Embeddings: what they are, why they work for similarity, what they can't do
- Vector databases (Supabase pgvector): storing and querying embeddings
- Chunking strategies: how to split documents so retrieval is precise (too small = scattered, too large = noisy)
- Retrieval quality: precision vs recall, measuring whether you got the *right* context back
- Retrieval debugging: why a query got bad results and how to fix it
- Hybrid search: combining embeddings with keyword search for better results
- Integration with Claude: feeding retrieved context into prompts cleanly

**The artifact you'll build**:
A document Q&A system that:
1. Takes a set of documents (e.g., technical docs, FAQs, research papers)
2. Chunks them into fixed-size pieces (you'll tune the size)
3. Embeds all chunks using Claude's embedding API
4. Stores chunks + embeddings in Supabase pgvector
5. For a query:
   - Embeds the query
   - Retrieves top-K similar chunks
   - Feeds them to Claude with the query
   - Returns the answer
6. Runs 10 test queries and measures:
   - Retrieval precision: "Did the top result actually answer the question?"
   - Retrieval recall: "Did we get all relevant chunks?"
   - Answer quality: "Is the final answer correct and grounded in the retrieved docs?"
7. Outputs a retrieval report: "Query: X | Retrieved: 3 docs | Relevant: 2 | Answer correct: yes/no"

**How you'll know you've mastered it**:
- You can explain why a retrieval query failed and how to fix it
- You can tune chunk size by testing different sizes and measuring retrieval quality
- You understand the difference between what embeddings can do (similarity) and what they can't (exact match, reasoning)
- You can identify hallucinations in the final answer vs. actual errors in retrieval
- **The test**: I'll ask a query that requires multi-document synthesis, and you'll explain whether retrieval can handle it or where it will fail

**What most people get wrong**:
- They chunk documents too large and retrieval returns irrelevant noise
- They chunk documents too small and lose context
- They treat "retrieval returned something" as "this will work" and don't measure quality
- They don't understand that embeddings are for *similarity*, not semantics—you can't reason about context with embeddings alone
- They don't measure hallucinations in the answer separate from failures in retrieval

---

### **Module 4: Cost & Latency** — Making AI Features Shippable
**Why this matters**: A feature that costs $10 per user request or takes 30 seconds to respond doesn't get shipped. This module teaches you to think about AI features as products: cheap, fast, and scalable. You'll learn optimization strategies that separate engineers who ship from those whose demos never go live.

**Core concepts you'll master**:
- Token economics: input vs output costs, which costs more, where money is actually spent
- Prompt caching: reducing redundant API calls, when it helps (80% cost savings is possible)
- Batch processing: trading latency for cost, when to use it
- Model selection for cost: Haiku vs Sonnet trade-offs, when to use cheaper models
- Chunking and retrieval optimization: faster/cheaper retrieval = faster/cheaper answers
- Latency measurement: where time is spent (API calls, retrieval, processing)
- Cost-latency trade-offs: caching is fast but might return stale data; batching is cheap but slower
- Profiling: measuring before and after to know if an optimization actually helped

**The artifact you'll build**:
A cost & latency analyzer that:
1. Takes a feature description (e.g., "Answer 100 customer support questions per day")
2. Simulates running that feature with different configurations:
   - Model choice (Opus vs Sonnet vs Haiku)
   - Caching enabled/disabled
   - Batch processing enabled/disabled
   - Retrieval included/excluded
3. Calculates for each configuration:
   - Total cost per day / week / month
   - Average latency per request
   - P99 latency (worst case)
   - Token efficiency (tokens spent per useful output)
4. Outputs a comparison table:
   ```
   Config                | Cost/day | Latency | P99     | Best for
   Opus + no cache       | $12.50   | 2.1s    | 5.2s    | Accuracy
   Sonnet + cache        | $3.20    | 1.8s    | 3.1s    | Balanced
   Haiku + batch + cache | $0.85    | 45s     | 120s    | Cheap volume
   ```
5. Shows the ROI of each optimization

**How you'll know you've mastered it**:
- You can estimate the cost of a feature before building it (within 20%)
- You know when caching will help and when it won't
- You can explain the latency cost of retrieval and when it's worth it
- You can make a trade-off decision: "This feature will be 2x cheaper with Haiku but 20% less accurate—is that acceptable?"
- **The test**: Given a feature spec, you'll design the optimal config for three different constraints: "minimize cost", "minimize latency", "maximize accuracy"

**What most people get wrong**:
- They always use Opus because it's "the best" and spend 10x more than needed
- They ignore caching and run the same prompts 100x per day at full cost
- They never measure latency and ship features that timeout in production
- They optimize one thing (cost) and accidentally break another (latency) without realizing
- They don't know that prompt caching saves 90% on repeated inputs—they just pay full price every time

---

### **Module 5: Agents & Workflows** — Multi-Step AI Systems
**Why this matters**: Real products need AI to do complex, multi-step work: research → analysis → decision. Single API calls aren't enough. This module teaches you to orchestrate multiple AI calls, use tools, handle failures in multi-step systems, and build workflows that don't fall over when something goes wrong.

**Core concepts you'll master**:
- Tool use (function calling): teaching Claude to use external tools to gather information
- Agent loops: reasoning → tool call → result → reasoning again (the core of agents)
- State management: tracking progress through a multi-step workflow
- Error handling in multi-step systems: one failure breaks everything unless you handle it
- Validation between steps: ensuring each step produced valid output before continuing
- Fallbacks and recovery: what to do when a step fails (retry, skip, use default)
- Orchestration patterns: sequential vs parallel steps, when to use each
- Timeout and resource limits: preventing infinite loops or runaway costs

**The artifact you'll build**:
A multi-step research agent that:
1. Takes a question (e.g., "Should I invest in Company X?")
2. Uses tools to gather information:
   - Search for news articles
   - Fetch financial data
   - Look up competitive landscape
3. Orchestrates a workflow:
   - Gather data (parallel tool calls)
   - Analyze findings (Claude processes data)
   - Identify risks (Claude flags potential problems)
   - Make recommendation (Claude synthesizes into decision)
4. Handles failures:
   - If a search returns nothing, use a fallback data source
   - If financial data is unavailable, continue with what you have
   - If analysis reaches token limit, summarize and retry
5. Outputs:
   - The final recommendation
   - Confidence level (high/medium/low based on data quality)
   - Sources cited
   - A detailed log showing what failed and how it recovered

**How you'll know you've mastered it**:
- You can design a multi-step workflow and identify where it could fail
- You've built error recovery that doesn't require manual intervention
- You can explain why an agent succeeded or failed by reading the log
- You understand the difference between retrying (expensive, eventually works) and falling back (cheap, might be less accurate)
- **The test**: I'll inject failures (missing data, API timeouts, malformed responses) and you'll handle them gracefully

**What most people get wrong**:
- They build workflows that fail on the first error instead of having fallbacks
- They don't validate tool outputs before using them (tool calls can return garbage)
- They loop forever retrying the same failing step instead of giving up
- They don't log what happened, making it impossible to debug when the workflow fails
- They run tools sequentially when they could run in parallel, making workflows slow

---

### **Module 6: Full Product Integration** — Shipping Real AI Features
**Why this matters**: Everything so far is components. This module is about gluing it all together into a real, deployed product that users use. Authentication, databases, real deployments, monitoring, the boring essentials that separate shipped products from nice experiments.

**Core concepts you'll master**:
- User authentication and session management (Supabase Auth)
- Database schema design for AI features (storing prompts, responses, evaluations)
- API design: building endpoints that expose your AI features cleanly
- Frontend integration: wiring AI features into a real UI
- Deployment and versioning: shipping code and rolling back when things break
- Observability and monitoring: knowing when a feature is broken before users notice
- Production debugging: finding and fixing bugs without being able to reproduce locally
- Cost monitoring: tracking feature costs in production so you don't get surprised by bills

**The artifact you'll build**:
A full-stack, deployed AI feature (end-to-end):
1. A Next.js app deployed on Vercel
2. User auth (sign up / login with Supabase)
3. A feature that takes user input, processes it with Claude, saves results to database
4. A dashboard showing:
   - Your processing history
   - Costs for each feature
   - Success/failure rates
5. Backend:
   - API endpoint for processing requests
   - Database schema storing requests and responses
   - Cost tracking and logging
6. Monitoring:
   - Error alerts if a feature fails >5% of the time
   - Cost alerts if daily spend exceeds threshold
   - Performance dashboard showing average latency

**How you'll know you've mastered it**:
- You can deploy a feature and know it's working without reading logs manually
- You understand the full path from user input to database to display
- You can diagnose production issues (is it auth, the API, the database, or the frontend?)
- You've measured real user latency and cost (not just local testing)
- **The test**: I'll tell you the feature is broken for 10% of requests, and you'll find and fix the bug using production logs

**What most people get wrong**:
- They build features that work locally and then break in production (auth, environment variables, deployment)
- They don't monitor costs and get shocked by AWS/API bills
- They don't test the full flow end-to-end before shipping
- They can't diagnose production issues because they didn't log the right things
- They ship and then disappear instead of watching the feature's first week

---

## Learning Philosophy

**Tutoring, not code generation**: When we work through a module, I will:
1. Explain concepts deeply before you write any code
2. Ask you to write every line yourself (I won't just build it for you)
3. Quiz you on understanding before moving to the next part
4. Stop you if you try to rush or cut corners

**Mastery before advancement**: You don't move to the next module until:
1. Your artifact works and you can explain every part
2. You've passed the "test" I'll give you
3. You can identify and explain the common pitfalls

**Real-world focus**: Every module uses:
- Actual APIs and databases (Anthropic, Supabase, Vercel)
- Production patterns (error handling, monitoring, cost tracking)
- Real constraints (latency budgets, cost targets, reliability targets)

---

## How to Use This Curriculum

1. **Start with Module 1**: Don't skip foundations. It matters.
2. **Build the artifact**: I won't let you move forward until it's done.
3. **Demonstrate mastery**: Explain it out loud. Answer the test questions.
4. **Document as you go**: Add notes to your code. Know *why* you wrote what you wrote.
5. **Ship something**: At the end, you'll have a real deployed feature to show employers.

---

## Success Criteria

At the end of this curriculum, you will be able to:

- ✅ Explain how Claude's API works at every level (tokens, costs, structure)
- ✅ Build AI features that work reliably in production (not just in demos)
- ✅ Measure whether a feature actually works (evals, not hope)
- ✅ Ground AI in real data (retrieval, no hallucinations)
- ✅ Optimize for cost and latency (ship features at scale)
- ✅ Build multi-step AI systems that handle failures gracefully
- ✅ Deploy and monitor real AI products (production plumbing)
- ✅ Debug production issues and iterate quickly
- ✅ Explain your code and decisions to a hiring manager

That's what makes you hireable.

---

## Next Steps

When you're ready, we'll start with **Module 1: Foundations**. I'll explain the concepts, you'll write the code, and by the end of the day, you'll have a tool that explains exactly what's happening inside every Claude API call.

**Ready?** Let me know when you want to begin, and we'll work through it together—tutoring style.
