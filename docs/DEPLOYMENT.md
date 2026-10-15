# Deployment Guide

This guide covers a cost-conscious production deployment for a small software
company. No specific hosting provider has been committed to yet, so this
document describes a generic path using Microsoft Azure as the worked example
(since the stack is .NET + SQL Server-shaped), with notes on alternatives and
their trade-offs. Adjust the specific commands to whichever provider you
choose — the architecture and steps below apply generally.

## Architecture Overview

```
[ Visitors ] --> [ Frontend: static hosting + CDN ] --> [ Backend API: App Service / container ] --> [ SQL Server ]
                                                                 |
                                                                 +--> [ Gmail SMTP ] (enquiry notifications)
```

The frontend is a static single-page app (no server-side rendering needed) and
can be hosted on any static host. The backend is a stateless ASP.NET Core API
that can run on any container or App Service platform with outbound internet
access (for SMTP) and a connection to SQL Server.

## 1. Domain & DNS

1. Register or use your existing domain (e.g. `vedanshsoftware.com`).
2. Point the apex/`www` record to your frontend host (CNAME or A record per
   your provider's instructions).
3. Point an API subdomain (e.g. `api.vedanshsoftware.com`) to your backend host.
4. Enable HTTPS — most modern hosts (Azure Static Web Apps, Netlify, Vercel,
   Azure App Service) provision free managed TLS certificates automatically
   once DNS is verified.

## 2. Database (SQL Server)

**Cost-conscious options:**

- **Azure SQL Database, Basic/Serverless tier** — cheapest managed option if
  already on Azure; serverless auto-pauses when idle, reducing cost for a
  low-traffic lead-gen site.
- **A VPS running SQL Server Express** (free edition, 10GB database limit) —
  works for a small company's enquiry volume but you manage patching/backups
  yourself.
- Avoid exposing SQL Server directly to the public internet. Restrict access
  to your backend's IP/VNet only; never open port 1433 to `0.0.0.0/0`.

Steps:

1. Provision the SQL Server instance/database.
2. Note the connection string.
3. Set `DatabaseProvider=SqlServer` and `ConnectionStrings__SqlServer=<value>`
   as environment variables on your backend host (never commit this to source
   control).
4. On first deploy, the app runs EF Core migrations automatically at startup
   (`db.Database.Migrate()`), creating all tables, indexes, and constraints.

## 3. Backend API Hosting

**Options, roughly cheapest to most managed:**

| Option | Cost notes |
|---|---|
| Azure App Service (Linux, B1 tier) | ~$13-55/month depending on tier; free tier (F1) exists but sleeps and has CPU limits unsuitable for production |
| A small VPS (e.g. $5-10/month) running the API behind `systemd` + nginx reverse proxy | Cheapest, but you manage OS patching, HTTPS renewal, process supervision |
| Azure Container Apps / AWS App Runner | Pay-per-use, scales to zero — good fit for low, spiky enquiry traffic |

Deployment steps (Azure App Service example):

```bash
cd backend/VedanshSoftware.Api
dotnet publish -c Release -o ./publish
# Deploy ./publish via az webapp deploy, GitHub Actions, or your CI/CD of choice
```

Set these **Application Settings** (environment variables) on the host — see
[.env.example](../backend/VedanshSoftware.Api/.env.example) for the full list:

- `DatabaseProvider=SqlServer`
- `ConnectionStrings__SqlServer`
- `Jwt__Secret` (generate a new, long random value — do not reuse the dev one)
- `Jwt__Issuer`, `Jwt__Audience`
- `Cors__AllowedOrigins__0=https://www.vedanshsoftware.com`
- `Email__Enabled=true`, `Email__SmtpUser`, `Email__SmtpPassword` (Gmail App Password)
- `ASPNETCORE_ENVIRONMENT=Production`

Enable HTTPS-only / "Require HTTPS" at the platform level in addition to the
app's own `UseHsts()`/`UseHttpsRedirection()` middleware.

## 4. Frontend Hosting

**Options:**

- **Azure Static Web Apps** — free tier available, integrates with Azure
  backend, automatic HTTPS and global CDN.
- **Netlify / Vercel / Cloudflare Pages** — all have generous free tiers for a
  low-traffic marketing site.

Build and deploy:

```bash
cd frontend
echo "VITE_API_BASE_URL=https://api.vedanshsoftware.com" > .env.production.local
npm install
npm run build
# Upload ./dist to your static host
```

Configure the host to redirect all paths to `index.html` (standard SPA
fallback) so client-side routing (`/solutions/society-management`, `/admin`,
etc.) works on direct URL access and refresh.

## 5. Production Environment Variables Checklist

- [ ] `Jwt__Secret` — new value, not the development secret
- [ ] `ConnectionStrings__SqlServer` — production database, not local SQLite
- [ ] `Cors__AllowedOrigins__0` — your real production domain only
- [ ] `Email__Enabled=true` with a valid Gmail App Password
- [ ] `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` — set for first deploy only,
      then removed (see [ADMIN_PROVISIONING.md](ADMIN_PROVISIONING.md))
- [ ] `ASPNETCORE_ENVIRONMENT=Production` (disables Swagger UI, enables HSTS)
- [ ] Frontend `VITE_API_BASE_URL` points to the production API domain

## 6. Database Migrations in Production

Migrations run automatically on startup. For a safer rollout on an existing
production database, you can instead run them as an explicit release step:

```bash
dotnet ef database update --connection "<production connection string>"
```

and disable the automatic `Migrate()` call in `Program.cs` once you prefer
manual control.

## 7. Secure Initial Admin Creation

See [ADMIN_PROVISIONING.md](ADMIN_PROVISIONING.md). Summary: set
`ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` for the first deploy, log in, change
the password, then remove the environment variables.

## 8. Backup Strategy

- **Database:** enable automated backups on your SQL Server host (Azure SQL
  has automatic point-in-time restore; a self-managed SQL Server needs a
  scheduled `BACKUP DATABASE` job, e.g. nightly via SQL Agent or a cron task).
- **Retention:** keep at least 7 daily backups and 4 weekly backups, adjusted
  to your compliance needs.
- **Test restores periodically** — an untested backup is not a backup.

## 9. Error Monitoring

- At minimum, ship application logs to your hosting platform's log stream
  (Azure App Service Log Stream, journalctl on a VPS, etc.) and review
  periodically.
- For a small team, a free tier of an error-tracking service (e.g. Sentry's
  free plan) can be wired into the ASP.NET Core app via its SDK if desired —
  not configured out of the box in this codebase.

## 10. Uptime Monitoring

- Point a free uptime monitor (e.g. UptimeRobot, Better Uptime free tier) at:
  - `https://api.vedanshsoftware.com/api/health`
  - `https://www.vedanshsoftware.com/`
- Alert via email to `vedanshsoft@gmail.com` on downtime.

## 11. Deployment Verification Checklist

After deploying, verify:

- [ ] Home page loads over HTTPS with no mixed-content warnings
- [ ] `/api/health` returns `200 { "status": "healthy" }`
- [ ] Submitting a test enquiry via the Contact page returns a confirmation
      with a reference number
- [ ] The enquiry appears in the admin dashboard (`/admin`) after logging in
- [ ] CORS is correctly restricted — a request from an unrelated origin is
      rejected
- [ ] `/swagger` is NOT publicly accessible (only available in Development)
- [ ] Admin endpoints return `401` without a token and `403` for a `Staff`
      user hitting an `Admin`-only route (CSV export)

## 12. Rollback Procedure

- **Frontend:** redeploy the previous build artifact/static files — most
  static hosts keep prior deployments and support one-click rollback.
- **Backend:** redeploy the previous published build. If a migration was part
  of the release, confirm whether it needs a corresponding down-migration
  (`dotnet ef migrations remove` locally, then regenerate and redeploy) before
  rolling back the app code, to avoid schema/code mismatches.
- **Database:** restore from the most recent pre-deployment backup only as a
  last resort, since this loses any enquiries submitted after that backup.
