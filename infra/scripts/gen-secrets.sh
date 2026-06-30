#!/usr/bin/env bash
# Fill .env with strong random secrets. Idempotent-ish: only replaces the
# CHANGE_ME placeholders so re-running won't clobber values you've set.
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || cp .env.example .env

rand() { openssl rand -hex "$1"; }

repl() { # repl KEY VALUE
  if grep -q "^$1=CHANGE_ME" .env; then
    # Use a non-/ delimiter; secrets are hex/base so safe.
    sed -i.bak "s|^$1=.*|$1=$2|" .env && rm -f .env.bak
    echo "  set $1"
  else
    echo "  kept $1 (already customised)"
  fi
}

echo "Generating secrets into .env:"
repl POSTGRES_PASSWORD "$(rand 24)"
repl JWT_SECRET "$(rand 32)"   # 64 hex chars — comfortably > 32 bytes

echo "Done. Now edit DOMAIN and ACME_EMAIL in .env before 'docker compose up -d'."
