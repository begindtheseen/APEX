var e=`---
id: m10-the-gate
title: "Debugging and Production Observability — the gate, and what most people miss"
minutes: 1
covers:
  - "Stack traces as primary evidence, including minified production traces"
  - "Hypothesis-driven debugging and bisection across code, data, time, configuration (config)"
  - "A real debugger: breakpoints, conditional breakpoints, logpoints"
  - "Structured logging, log levels with real semantics, correlation IDs, redaction"
  - "OTel spans and context propagation"
  - "Metrics, SLOs, error tracking"
  - "Profiling and flame graphs"
  - "Detecting wrong model output when nothing throws"
  - "Incident response as a social event, not a technical one, rehearsed on the game day your systems reviewer (Track 5, Tracks tab) is already in the room for: acknowledge within 5 minutes; post a severity call plus what I know / what I am doing / when I will update next; update on that interval whether or not there is news; escalate at a trip-wire written down before the window opens, not during it"
  - "24h detection is a baseline for working alone (the starting number) — a real rotation measures acknowledgment in minutes"
  - "Runbooks and the blameless postmortem"
---
**GATE** — **REFEREE:** your reviewer, running a fault-injection script that fires at **a time you do not
choose** in a seven-day window and logs the timestamp to a file you do not read. **PASS:** time-to-detection under
24h from instrumentation alone, without being told. Separately: given one trace ID, reconstruct the
whole request out loud. **Time-to-mitigate is scored separately from time-to-root-cause — diagnosing
before mitigating is a failing result.** **ON FAIL:** the detector does not cover that failure class —
add it, re-arm the window.

**Most-missed:** Changing several things at once and redeploying. **A common and expensive habit to
carry into a job**, because it destroys the evidence before you have read it. · Believing the debugger is
for beginners and \`console.log\` is for professionals. The inversion is real. · Deploying without source
maps, then concluding production errors are unknowable. · **Assuming valid JSON means correct output.**
Constrained decoding guarantees shape, not truth — and it removes the model’s ability to express
uncertainty, so it fills a required field whether or not the input supports it. · Alerting on causes,
producing noise that gets muted — after which the system is unmonitored while looking monitored.
· Postmortems that stop at the code fix without asking why it took 40 minutes to notice.
`;export{e as default};