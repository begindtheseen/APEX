#!/usr/bin/env bash
# Durable, owned backups of your Postgres data. Run from anywhere; point cron
# at it. Keeps the last 30 daily dumps. THIS is your "no caps" insurance — the
# data is yours, on disk you control.
#
#   crontab -e
#   15 3 * * *  /path/to/infra/scripts/backup.sh >> /var/log/apex-backup.log 2>&1
set -euo pipefail
cd "$(dirname "$0")/.."

OUT_DIR="${APEX_BACKUP_DIR:-./backups}"
KEEP="${APEX_BACKUP_KEEP:-30}"
STAMP="$(date +%Y-%m-%d_%H%M%S)"
mkdir -p "$OUT_DIR"

# shellcheck disable=SC1091
set -a; . ./.env; set +a

FILE="$OUT_DIR/apex-db-$STAMP.sql.gz"
echo "Dumping database -> $FILE"
docker compose exec -T db pg_dump -U postgres "${POSTGRES_DB:-postgres}" | gzip > "$FILE"

# Prune old dumps, keep newest $KEEP.
ls -1t "$OUT_DIR"/apex-db-*.sql.gz 2>/dev/null | tail -n +"$((KEEP + 1))" | xargs -r rm -f

echo "Backup complete. Retained newest $KEEP dumps in $OUT_DIR."
echo "Restore with:  gunzip -c $FILE | docker compose exec -T db psql -U postgres ${POSTGRES_DB:-postgres}"
