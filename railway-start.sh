#!/bin/sh
# Railway wrapper for Actual Budget.
# - Listens on $PORT (Railway sets it; the template sets 5006).
# - On first boot, sets the server password from ACTUAL_PASSWORD, so a fresh
#   instance can't be claimed by whoever opens the URL first.
set -e

export PORT="${PORT:-5006}"
export ACTUAL_PORT="${ACTUAL_PORT:-$PORT}"
export ACTUAL_DATA_DIR="${ACTUAL_DATA_DIR:-/data}"
mkdir -p "$ACTUAL_DATA_DIR"

node /app/railway-bootstrap.mjs &
exec node /app/app.js
