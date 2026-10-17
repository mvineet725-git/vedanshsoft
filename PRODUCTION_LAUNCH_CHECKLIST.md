# Production Launch Checklist

Use this as the final gate before announcing the site publicly. Items are
grouped by when they apply. Check off each one only when actually done —
not when it seems likely to be fine.

## Pre-Deployment

- [ ] Backend/database hosting chosen and provisioned (see `PRODUCTION_DEPLOYMENT_GUIDE.md`)
- [ ] Domain registered/confirmed and DNS access available
- [ ] All mandatory environment variables set on the backend host (see `PRODUCTION_ENVIRONMENT_VARIABLES.md`) — in particular:
  - [ ] `Jwt__Secret` — a **new** value generated for production, not the development secret
  - [ ] `ConnectionStrings__SqlServer` — the real production database
  - [ ] `Cors__AllowedOrigins__0` — the real production frontend domain only
  - [ ] `ASPNETCORE_ENVIRONMENT=Production`
- [ ] Gmail App Password obtained and `Email__Enabled=true` + `Email__SmtpPassword` set, **then actually tested** by submitting a real enquiry and confirming both the owner-notification and visitor-confirmation emails arrive
- [ ] Privacy Policy and Terms of Use reviewed and approved by a qualified legal professional
- [ ] `frontend/vercel.json`'s CSP `connect-src` updated from the placeholder to the real backend domain
- [ ] `VITE_API_BASE_URL` set in Vercel's Production environment variables to the real backend domain, and a new frontend build triggered
- [ ] `dotnet test` passes locally and in CI
- [ ] `npm run lint` and `npm run build` pass locally and in CI
- [ ] Database backup approach selected and configured (see `DATABASE_BACKUP_AND_RECOVERY.md`) — Azure SQL automated backups, or a scheduled self-managed backup job
- [ ] SQL Server is **not** exposed to the public internet (verify from an external network that port 1433 is unreachable)

## Deployment

- [ ] Backend deployed to the chosen host
- [ ] Database migrations applied successfully on first startup (check logs for `Database.Migrate()` completing without error)
- [ ] `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` set for this first deploy only
- [ ] Logged in successfully with the seeded admin account
- [ ] **Changed the seeded admin password**, then **removed `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`** from the host's environment variables and redeployed/restarted so they're no longer set
- [ ] Frontend deployed (Vercel — confirm the latest commit is what's live, not a stale cached deploy)

## DNS and HTTPS Verification

- [ ] Frontend domain resolves and loads over HTTPS with no mixed-content browser warnings
- [ ] Backend API domain resolves and loads over HTTPS
- [ ] HTTPS certificate is valid (not self-signed/expired) on both domains
- [ ] HTTP requests to either domain redirect to HTTPS

## Post-Deployment Functional Verification

Run every one of these for real against the live URLs — not assumed from local testing:

- [ ] `GET https://<api-domain>/api/health` returns `200 { "status": "healthy" }`
- [ ] Home page loads with no browser console errors
- [ ] Submit a real test enquiry for Society Management via the Contact page → receive a confirmation screen with a reference number
- [ ] Submit a real test enquiry for Education Management → receive a confirmation screen with a reference number
- [ ] Both test enquiries appear in the admin dashboard after logging in
- [ ] Update one test enquiry's status and add a note → confirm both persist after a page refresh
- [ ] Click the phone number link → confirm it opens the device's dialer with `9172476575`
- [ ] Click the email link → confirm it opens a mail client addressed to `vedanshsoft@gmail.com`
- [ ] Click the WhatsApp button → confirm it opens a chat with `+919172476575` and a pre-filled, context-correct message
- [ ] Open browser dev tools Network/Console tab and confirm **no CSP violation errors** (this is the specific failure mode if `connect-src` was left pointing at the placeholder domain)
- [ ] Attempt to open `/admin` while logged out → confirm redirect to `/admin/login`, not the dashboard
- [ ] Attempt `GET /api/enquiries` with no auth token (e.g. via curl) → confirm `401`
- [ ] Log in as a non-Admin (`Staff`) user and attempt the CSV export → confirm `403`
- [ ] Confirm `/swagger` is **not** reachable on the production backend (should only exist when `ASPNETCORE_ENVIRONMENT=Development`)
- [ ] Delete the two test enquiries created above (or clearly label them as test data) so they don't pollute real business reporting

## SEO / Discoverability

- [ ] `robots.txt` and `sitemap.xml` are reachable at the production domain and reference the production domain (not `localhost` or a staging URL)
- [ ] Admin routes (`/admin/*`) are excluded from the sitemap and/or marked `noindex`
- [ ] Submit the production domain and sitemap to Google Search Console
- [ ] Spot-check 3–4 page titles/meta descriptions render correctly in a search-result preview tool

## Monitoring (set up before or immediately after launch)

- [ ] An uptime monitor (e.g. UptimeRobot free tier) watching `https://<api-domain>/api/health` and the homepage, alerting to `vedanshsoft@gmail.com`
- [ ] A way to review backend application logs (hosting platform's log stream at minimum)
- [ ] Confirm backup job (chosen in Pre-Deployment) actually ran at least once and produced a backup file/snapshot

## Rollback Readiness

- [ ] Confirmed how to roll back the frontend (Vercel: redeploy a previous deployment)
- [ ] Confirmed how to roll back the backend on the chosen host
- [ ] Confirmed the most recent pre-launch database backup exists and its restore procedure is documented (`DATABASE_BACKUP_AND_RECOVERY.md`) — used only as a last resort, since restoring loses any enquiries submitted after that backup

## Final Sign-off

- [ ] All items above are checked
- [ ] `PRODUCTION_READINESS_REPORT.md`'s "Outstanding — Requires Your Input" items are either resolved or explicitly accepted as a known, documented limitation by the business owner
- [ ] Launch decision recorded: ________________ (date / who approved)
