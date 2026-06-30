# APEX Private Platform — Runbook

Stand up your own "Vercel + Supabase" on a box you own. See `../PLATFORM.md`
for the why and the architecture; this is the how.

## Prerequisites

- A machine you control (mini-PC, home server, old laptop, or a VPS) running
  Linux with **Docker** + the **Docker Compose plugin**.
- `openssl` (for secret generation) and `bash`.
- Optional but recommended: a domain name pointed at the box, so HTTPS gets a
  real certificate. Without one you can still run on `localhost` for testing.

## 1. Configure

```bash
cd infra
./scripts/gen-secrets.sh          # writes .env with strong random secrets
$EDITOR .env                      # set DOMAIN= and ACME_EMAIL=
```

- `DOMAIN` — the hostname this serves (e.g. `apex.yourdomain.com`). For local
  testing use `localhost`.
- `ACME_EMAIL` — your email, used only for Let's Encrypt recovery.
- Leave `GOTRUE_MAILER_AUTOCONFIRM=true` to start — accounts work immediately
  **without** an email server. Wire SMTP and flip it to `false` later when you
  want email verification / magic links.

## 2. Deploy the app + bring the stack up

```bash
./scripts/deploy.sh               # copies APEX into ./sites (the web root)
docker compose up -d              # starts db, auth, rest, gateway
docker compose ps                 # all should be "running"/"healthy"
docker compose logs -f            # watch boot; Ctrl-C to stop watching
```

First boot runs `db/init/00_init.sh` once to create the roles, the `auth`
schema GoTrue manages, and the `apex_state` table with per-user RLS.

Visit `https://DOMAIN/`. The APEX app loads; a small **Sync** button sits
bottom-left.

## 3. Connect APEX to your backend

In the app's **Sync** panel (or the browser console):

```js
APEXSync.configure('https://DOMAIN')   // your platform's base URL
```

Then **Create** an account (email + password) on one device and **Sign in** on
the others. Your progress now syncs across all of them. Offline still works —
changes push automatically when you're back online.

## 4. Backups (do this before you rely on it)

```bash
./scripts/backup.sh               # one nightly dump, keeps newest 30
# cron it:
crontab -e
15 3 * * *  /full/path/to/infra/scripts/backup.sh >> /var/log/apex-backup.log 2>&1
```

Restore:

```bash
gunzip -c backups/apex-db-YYYY-…​.sql.gz | docker compose exec -T db psql -U postgres postgres
```

## Common operations

| Task | Command |
| --- | --- |
| Update APEX after a code change | `./scripts/deploy.sh` (instant; no restart) |
| Restart a service | `docker compose restart rest` |
| Update container images | `docker compose pull && docker compose up -d` |
| Stop everything | `docker compose down` (data volumes persist) |
| Wipe and start over | `docker compose down -v` ⚠️ deletes the database |
| Tail one service's logs | `docker compose logs -f auth` |

## Security notes

- `.env` holds secrets — it is gitignored; never commit it.
- Postgres is **not** exposed to the host; only the gateway publishes 80/443.
- Each user's data is isolated by Row-Level Security (`user_id = auth.uid()`),
  enforced in the database itself — not just the app.
- Rotate `JWT_SECRET`/`POSTGRES_PASSWORD` by editing `.env` and recreating the
  stack (note: rotating `JWT_SECRET` signs everyone out — expected).

## Troubleshooting

- **Cert won't issue:** DNS must point at the box and ports 80+443 must reach
  it from the internet. On a home connection this is the network-edge step in
  `PLATFORM.md` (static IP / tunnel).
- **Sign-in fails with "Database error":** check `docker compose logs auth` —
  usually GoTrue couldn't reach Postgres on first boot; `docker compose up -d`
  again once `db` is healthy.
- **Sync button missing:** ensure `apex-sync.js` deployed into `./sites` (it's
  in the `deploy.sh` file list) and hard-refresh to update the service worker.
