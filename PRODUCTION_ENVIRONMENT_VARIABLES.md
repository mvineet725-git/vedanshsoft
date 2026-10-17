# Production Environment Variables

This is a reference, not a secrets file — no real values appear here. See
[backend/VedanshSoftware.Api/.env.example](backend/VedanshSoftware.Api/.env.example)
for the copy-pasteable template (also placeholder-only) and
[frontend/.env.example](frontend/.env.example) for the frontend equivalent.

All backend variables use ASP.NET Core's double-underscore convention for
nested config keys (`Section__Key`) when set as real environment variables;
locally they're set via `dotnet user-secrets set "Section:Key" "value"`
instead (colon-separated), which is equivalent and keeps them out of shell
history/process-list exposure.

## Backend

| Variable | Purpose | Mandatory? | Where to configure |
|---|---|---|---|
| `DatabaseProvider` | `Sqlite` or `SqlServer`. Selects which EF Core provider and migration set the app uses. | Yes (defaults to `Sqlite` if unset — **must** be explicitly `SqlServer` in production) | Host environment variables / App Service Application Settings |
| `ConnectionStrings__SqlServer` | Production database connection string. | Yes, when `DatabaseProvider=SqlServer` | Host environment variables. **Never** commit to source control. |
| `ConnectionStrings__Sqlite` | Local SQLite file path. | No (only used in development; has a working default) | Local only — not used in production |
| `Jwt__Secret` | HMAC-SHA256 signing key for admin JWTs. Must be ≥32 bytes — the app refuses to start otherwise. | **Yes, always** — app will not boot without it | Host environment variables (production) / `dotnet user-secrets` (local dev). Generate fresh per environment; never reuse the dev value in production. |
| `Jwt__Issuer` | JWT `iss` claim, validated on every request. | No (has a working default) | Host environment variables, if overriding the default |
| `Jwt__Audience` | JWT `aud` claim, validated on every request. | No (has a working default) | Host environment variables, if overriding the default |
| `Jwt__ExpiryMinutes` | How long an admin session token stays valid. | No (defaults to 120) | Host environment variables, if overriding the default |
| `Cors__AllowedOrigins__0` (and `__1`, `__2`, ...) | Origins allowed to call the API from a browser. | **Yes, in production** — must be the real frontend domain(s) only, never a wildcard | Host environment variables |
| `Email__Enabled` | Turns real SMTP sending on/off. When `false`, the app logs intended emails instead of sending and never falsely reports delivery. | Yes — must be explicitly `true` once SMTP is configured and tested | Host environment variables |
| `Email__SmtpHost` / `Email__SmtpPort` | SMTP server address. | Yes, once `Email__Enabled=true` | Host environment variables (has a working Gmail default) |
| `Email__SmtpUser` | SMTP auth username (the sending mailbox). | Yes, once `Email__Enabled=true` | Host environment variables |
| `Email__SmtpPassword` | SMTP auth credential. **For Gmail, this must be a Google App Password, not the account's login password** (Gmail no longer accepts the account password for SMTP auth). Generate one at Google Account → Security → 2-Step Verification → App Passwords. | Yes, once `Email__Enabled=true` | Host environment variables. **Never** commit to source control. |
| `Email__FromAddress` / `Email__FromName` | Sender identity on outgoing emails. | No (has a working default) | Host environment variables, if overriding |
| `Email__OwnerNotificationAddress` | Where new-enquiry notifications are sent. | No (has a working default) | Host environment variables, if overriding |
| `ADMIN_SEED_EMAIL` | Email for the first admin account, created once at startup if no matching user exists. | No — only set for the **first deploy**, then remove it | Host environment variables, temporarily. See [docs/ADMIN_PROVISIONING.md](docs/ADMIN_PROVISIONING.md). |
| `ADMIN_SEED_PASSWORD` | Password for the first admin account. | No — only set for the **first deploy**, then remove it immediately after confirming login | Host environment variables, temporarily — **must be removed after first use**; leaving it set is a standing credential-exposure risk documented in `PRODUCTION_LAUNCH_CHECKLIST.md`. |
| `ASPNETCORE_ENVIRONMENT` | `Production` disables Swagger UI and enables HSTS. | **Yes, always in production** | Host environment variables |

## Frontend

| Variable | Purpose | Mandatory? | Where to configure |
|---|---|---|---|
| `VITE_API_BASE_URL` | The backend API's base URL. **Baked into the static bundle at build time** — there is no runtime config step for the frontend, so this must be set correctly before running `npm run build` for production. | Yes (defaults to `http://localhost:5280`, which must never ship to production) | Vercel project environment variables (Production environment), or a `.env.production.local` file at build time if building elsewhere |

## Deployment-platform-specific notes

- **Vercel (frontend):** set `VITE_API_BASE_URL` under Project Settings →
  Environment Variables → Production, scoped to the Production environment
  only (so preview deploys don't accidentally point at the live backend
  unless desired).
- **Backend host (not yet chosen):** whatever platform is selected (see
  `PRODUCTION_DEPLOYMENT_GUIDE.md`), all `Yes`-marked variables above must be
  set as that platform's environment variables / application settings before
  first deploy. The app's own startup checks (`Jwt__Secret` strength, `Jwt__Secret`
  presence) will fail fast with a clear error if misconfigured — it will not
  silently start in an insecure state.

## What must never appear in a committed file

`Jwt__Secret`, `ConnectionStrings__SqlServer`, `Email__SmtpPassword`,
`ADMIN_SEED_PASSWORD`. All four are empty strings in every tracked
`appsettings*.json` file today — confirmed via repository scan — and must
stay that way. Set them only via host environment variables (production) or
`dotnet user-secrets` (local development).
