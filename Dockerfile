# Actual Budget sync server, official image pinned by version and digest.
# Bump both the tag and the digest together, and add a CHANGELOG.md entry.
FROM actualbudget/actual-server:26.11.0@sha256:06cf186569cf58d93e12659ff1a517b65b5b0ebee7050a3991d4bd8a1d398da6

# Budgets and server settings live in /data (mount a Railway volume there).
ENV ACTUAL_DATA_DIR=/data

COPY railway-start.sh railway-bootstrap.mjs /app/

# The image's tini entrypoint stays; only the command changes.
CMD ["sh", "/app/railway-start.sh"]
