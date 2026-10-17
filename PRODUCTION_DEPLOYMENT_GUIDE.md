# Production Deployment Guide

This document tracks the **actual current deployment state and decisions**
for this project. For the general, provider-agnostic how-to (cost tables,
step-by-step provider instructions), see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) —
this file complements it rather than repeating it.

## Current State

| Component | Status |
|---|---|
| **Frontend** | **Deployed on Vercel**, auto-deploys from pushes to `main` via GitHub integration. Working today. |
| **Backend API** | **Not yet deployed anywhere.** No hosting account, domain, or environment has been provisioned. |
| **Database (production)** | **Not yet deployed.** A SQL Server database (`vsite` on `ACL-402\SQL2022`) exists only as a local verification target used to confirm the SQL Server migration path works — it is not a production database and should not be treated as one (no backups configured, not publicly reachable, intended for development verification only). |
| **Domain** | Not yet confirmed as registered/pointed anywhere in this audit. `docs/DEPLOYMENT.md` and the frontend's SEO metadata use `vedanshsoftware.com` as the working example domain. |
| **CI** | **Live.** `.github/workflows/ci.yml` runs on every push/PR to `main`: backend build + test, frontend lint + typecheck + build. Build-only — does not deploy anything. |

## What Needs to Happen Before Public Launch

1. **Choose backend + database hosting.** See `docs/DEPLOYMENT.md` section 2–3
   for a cost-compared list of options (Azure App Service + Azure SQL,
   a VPS, Azure Container Apps). This is a decision only the business owner
   can make (budget, existing cloud relationships) — not something to pick
   unilaterally.
2. **Provision the chosen backend host and SQL Server database.**
3. **Set all mandatory environment variables** on that host — see
   `PRODUCTION_ENVIRONMENT_VARIABLES.md` for the complete list with
   mandatory/optional status.
4. **Point a domain/subdomain at the backend** (e.g. `api.vedanshsoftware.com`)
   with HTTPS enabled.
5. **Update `frontend/vercel.json`'s Content-Security-Policy `connect-src`**
   to the real backend domain — it currently contains a placeholder
   (`https://api.vedanshsoftware.com`). **If this is left wrong, the
   browser will silently block every API call from the deployed frontend**
   with a CSP violation, which looks like a network failure, not a
   configuration error, and can be confusing to debug. Verify this in the
   browser console on the deployed site after cutover.
6. **Set `VITE_API_BASE_URL`** in Vercel's Production environment variables
   to that same backend domain, then trigger a new frontend deploy (this
   value is baked in at build time, so changing it requires a rebuild, not
   just a config change).
7. **Run the deployment verification checklist** in `docs/DEPLOYMENT.md`
   section 11 against the live URLs.
8. **Complete the items in `PRODUCTION_LAUNCH_CHECKLIST.md`** before
   announcing the site publicly.

## Architecture (current)

```
[ Visitors ] --> [ Frontend: Vercel (live) ] --> [ Backend API: NOT YET DEPLOYED ] --> [ SQL Server: NOT YET DEPLOYED ]
                                                           |
                                                           +--> [ Gmail SMTP: NOT YET CONFIGURED ]
```

## Frontend (Vercel) — Already Working

No action needed beyond the `connect-src`/`VITE_API_BASE_URL` updates above
once the backend domain is known. Current config:

- `frontend/vercel.json` — SPA rewrite (all routes → `index.html`) plus
  security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
  Permissions-Policy, Content-Security-Policy) added during this audit.
- Auto-deploys on every push to `main` via Vercel's GitHub integration
  (already confirmed working in an earlier session).

## Backend + Database — Decision Pending

See `docs/DEPLOYMENT.md` sections 1–3 for the full options comparison. Key
constraints to weigh when choosing:

- The backend needs outbound internet access (for Gmail SMTP) and a
  persistent connection to SQL Server — any platform with those two
  properties works; it does not need to be Azure specifically despite that
  being the worked example in `docs/DEPLOYMENT.md`.
- **Never expose SQL Server's port 1433 to the public internet.** Restrict
  access to the backend's own IP/VNet only.
- Migrations run automatically at startup (`db.Database.Migrate()` in
  `Program.cs`) using the SQL-Server-specific migration set
  (`Migrations/SqlServer/`, tied to `SqlServerAppDbContext`) — verified
  working against a real SQL Server instance during this audit. No manual
  migration step is required for the initial deploy, though
  `docs/DATABASE.md` documents the explicit-migration alternative for
  teams that prefer a separate release step on later deploys.

## Rollback

See `docs/DEPLOYMENT.md` section 12. Summary: Vercel keeps prior frontend
deployments for one-click rollback; the backend rollback procedure depends on
whichever host is chosen and should be documented here once that choice is
made.

## Staging Environment

Not currently set up. Recommended once backend hosting is chosen: a second,
identically-configured backend + database instance (can be a cheaper tier)
with its own `Cors:AllowedOrigins` pointed at a Vercel preview deployment,
so future schema/config changes can be verified before touching the real
production database — directly addressing the master audit prompt's
instruction to test migrations against a staging copy before applying them
to production.
