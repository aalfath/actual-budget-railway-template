[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/actual-budget-1?utm_medium=integration&utm_source=button&utm_campaign=actual-budget)

# Actual Budget on Railway

This repo builds the [Actual Budget](https://actualbudget.org) sync server for a one-click Railway template.

- **App:** Actual Budget **26.11.0**, official image `actualbudget/actual-server:26.11.0`, pinned by digest in the `Dockerfile`.
- **Service:** one web service built from this repo, with a Railway volume at `/data` (budgets, server settings, sessions).
- **Health check:** `/health`.

## Variables

| Variable | Default | What it does |
|---|---|---|
| `ACTUAL_PASSWORD` | generated secret | Server password, set once on the first boot. Read it in the service's **Variables** tab, then change it in Actual's settings if you like. Changing the variable later does nothing. Leave it empty to set the password in the browser on first visit instead. |
| `PORT` | `5006` | Port the server listens on (the domain points to it). |

Optional settings (bank sync, OpenID login, upload limits) are listed in [Actual's configuration docs](https://actualbudget.org/docs/config/). Add them as `ACTUAL_*` variables on the service.

## What the wrapper adds

`railway-start.sh` starts the official server on `$PORT`. `railway-bootstrap.mjs` waits for it and, if the server is still new, sets its password from `ACTUAL_PASSWORD` through Actual's own `/account/bootstrap` endpoint. It never prints the password. Without it, whoever opened a fresh instance's URL first could claim the server.

## Updates

New Actual releases land here as a pull request that bumps the image tag and digest and adds a `CHANGELOG.md` entry. When it's merged to `main`, Railway shows everyone who deployed the template an "update available" notice, and they choose when to apply it. Read `CHANGELOG.md` before you apply one. Your data on the volume is kept.

Back up first: in Actual, **Settings → Export data**.
