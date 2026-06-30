#!/usr/bin/env bash
# The "Vercel" part: publish the APEX static app to the gateway's web root.
# Copies the app files from the repo root into ./sites so Caddy serves them at
# https://DOMAIN/. Re-run after any change to redeploy (zero downtime — Caddy
# just serves the new files).
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="${1:-..}"                       # repo root by default
DEST="./sites"
mkdir -p "$DEST"

# The files that make up the APEX PWA.
FILES=(index.html curriculum.js qbank.js sw.js manifest.json icon.svg apex-sync.js)

echo "Deploying APEX from $SRC -> $DEST"
for f in "${FILES[@]}"; do
  if [ -f "$SRC/$f" ]; then
    cp "$SRC/$f" "$DEST/$f"
    echo "  + $f"
  else
    echo "  ! skipped (missing): $f"
  fi
done

echo "Deployed. Live at https://\${DOMAIN}/ once 'docker compose up -d' is running."
