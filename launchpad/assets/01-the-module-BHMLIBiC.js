var e=`---
id: m10-the-module
title: "Debugging and Production Observability — what to understand and what to build"
minutes: 2
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
The highest-leverage module here. Finding a bug you did not write, in a system you cannot reproduce.

**Core concepts:** Stack traces as primary evidence, including minified production traces and why you
ship source maps. Hypothesis-driven debugging and bisection across code, data, time, configuration (config). A real
debugger — breakpoints, conditional breakpoints, logpoints — and when logging genuinely wins.
Structured logging, log levels with real semantics, request-scoped correlation IDs, redaction. OTel
spans and context propagation. Metrics, SLOs, error tracking. Profiling and flame graphs. **Detecting
wrong model output when nothing throws.** **Incident response as a social event**, rehearsed on the
game day your systems reviewer (Track 5) is already in the room for: acknowledge within 5 minutes; post a
severity call plus *what I know / what I am doing / when I will update next*; update on that interval
whether or not there is news; escalate at a trip-wire written down *before* the window opens, **not during it**. 24h
detection is a *solo* baseline (the starting number) — a real rotation measures acknowledgment in minutes. Runbooks and the
blameless postmortem.

**Checkpoints** ① read one real stack trace to its actual cause · ② a bug found with a conditional
breakpoint you could not have printed your way to · ③ structured logs with correlation IDs surviving one
async hop · ④ OTel spans around the model call, queryable · ⑤ the silent-failure detector catching a
wrong-but-200 output · ⑥ the runbook executed by another person during the game day · ⑦ the written
sampling and retention decision, and the postmortem of the outage you caused.

**Artifact** \`EVIDENCE\` — the flagship instrumented end to end, upgrading the day-one call log from M2:
structured logs with correlation IDs and redaction, OTel spans including the model call (**GenAI
semantic conventions**, not names you invented), error tracking, a silent-failure detector for
wrong-but-200 output, **a written sampling decision and retention window per store.** A runbook for
three failure modes (for instance provider down, connection exhaustion, cost runaway), **executed by an
actual other person during a scripted game day**, plus a blameless postmortem of an outage you caused
during it.

> **Exported:** the model-call span schema → M20 queries it rather than re-deriving.
`;export{e as default};