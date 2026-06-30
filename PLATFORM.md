# APEX Private Platform — your own Vercel + Supabase

This is the plan and the foundation for running APEX (and future apps) on
infrastructure **you own**, instead of Vercel and Supabase. It deliberately
does **not** reimplement those products from scratch — that would be strictly
worse than the proven open-source cores they are built on. Instead it gives you
the same *capabilities*, on your hardware, with the artificial free-tier caps
removed.

---

## Why this beats the free tiers

The free tiers aren't limited by engineering — they're limited by billing.
Self-hosting removes the levers:

| Limit on the free tier | On your own box |
| --- | --- |
| Supabase pauses your project after ~1 week idle | Never pauses |
| 500 MB database cap | Whatever your disk holds |
| Bandwidth / egress caps | Your ISP's pipe |
| Function timeouts, cold starts | None — long-running services |
| Limited projects | Unlimited — drop apps in `infra/sites/` |
| Your data sits in someone else's account | Data + compute are yours outright |

The honest trade: **you now own the operations** — backups, updates, uptime,
TLS. This repo automates as much of that as possible (`infra/scripts/`).

---

## On "full ownership, no relying on any company"

Total zero-dependence isn't physically possible — you'll always touch a domain
registrar and an ISP. But you can own the two things that actually matter:
**the compute and the data.** Recommended posture, most-owned first:

1. **Compute:** a machine you physically own — a mini-PC, an old laptop, or a
   home server. A rented VPS still works and is more reliable for public
   uptime, but it remains *someone else's computer*. For your stated goal, own
   the box.
2. **Data:** lives in Postgres on a disk you control, dumped nightly by
   `scripts/backup.sh`. This is the part with "no caps."
3. **Network edge (the one swappable third party):** a home connection often
   has a dynamic IP / CGNAT and may block ports 80/443. Options, most-owned
   first:
   - Own static IP from your ISP (ask; sometimes a few dollars/month) → purest.
   - A self-hosted tunnel (e.g. a `$4/mo` VPS running WireGuard as *only* a
     dumb relay; your data never lives there).
   - A managed tunnel (Cloudflare Tunnel) — easiest, but reintroduces a company
     at the edge. Use as a stepping stone, swap out later.

The architecture keeps the edge isolated so you can change your mind without
touching the data or app layers.

---

## Architecture (what's in `infra/`)

```
            ┌─────────────────────────── your box ───────────────────────────┐
  Internet  │                                                                 │
  ──────►   │   Caddy (gateway, auto-HTTPS)                                    │
            │     ├─ /            → static apps  (APEX PWA in ./sites)         │  ← the "Vercel"
            │     ├─ /auth/*      → GoTrue       (accounts, JWT)               │  ┐
            │     └─ /rest/*      → PostgREST    (auto REST API, RLS-enforced) │  ├ the "Supabase"
            │                          │                                       │  │
            │                       Postgres (your data, RLS per user)         │  ┘
            └─────────────────────────────────────────────────────────────────┘
```

- **Postgres** — the database. Full superuser, no caps.
- **GoTrue** — Supabase's actual auth server: email/password accounts, JWTs,
  (later) magic links and OAuth.
- **PostgREST** — turns tables into a REST API automatically and enforces
  Row-Level Security so each user only ever sees their own row.
- **Caddy** — one front door: provisions HTTPS automatically, routes the API,
  and static-hosts your apps. This is the "deploy" surface — `scripts/deploy.sh`
  copies the app in; redeploys are instant.

APEX itself talks to this via `apex-sync.js` (in the repo root): optional,
offline-first cross-device sync of your progress. Unconfigured, the app is
byte-for-byte the same offline localStorage tracker it always was.

---

## Roadmap

**Phase 1 — Foundation (this PR).** ✅ Self-hosted DB + auth + REST + gateway as
Docker Compose. ✅ APEX wired for optional account sync. ✅ Backup + deploy +
secret-gen scripts. ✅ Runbook. This already replaces both free tiers for APEX.

**Phase 2 — Operations hardening.** Automated TLS confirmed in prod, off-box
backup copies (e.g. to a second drive you own), healthchecks + restart alerts,
a one-command updater. Optional: add **Coolify** as a web dashboard for
git-push deploys so publishing new apps is point-and-click.

**Phase 3 — Feature parity where you actually need it.** Email magic-links /
verification (wire SMTP, flip `GOTRUE_MAILER_AUTOCONFIRM=false`), file storage
(S3-compatible MinIO, owned), realtime subscriptions, and edge/serverless
functions if a future app needs them. Each is additive and only built when a
real use case appears — not speculatively.

**Phase 4 — Multi-app platform.** Use the same stack for new projects: each app
is a folder under `sites/` (or its own Compose service), each with its own
tables + RLS. One box, many apps, zero per-project fees.

See `infra/README.md` for the step-by-step runbook to stand it up.
