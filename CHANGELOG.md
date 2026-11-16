# Changelog

## 26.11.0-1 (2026-11-16)

- README: add the Deploy on Railway button for the published template actual-budget-1. No change to the app or its image.

## 26.11.0 (2026-11-16)

- First release of the template: Actual Budget sync server 26.11.0 (`actualbudget/actual-server:26.11.0@sha256:06cf186569cf58d93e12659ff1a517b65b5b0ebee7050a3991d4bd8a1d398da6`).
- Data on a Railway volume at `/data`, health check on `/health`.
- The server password is set on first boot from the generated `ACTUAL_PASSWORD` variable.
