# Production Readiness Report

**Date:** 2026-10-17
**Scope:** Vedansh Software Services marketing site + lead-gen backend
(React/TypeScript frontend, ASP.NET Core 8 backend, SQLite for local dev /
SQL Server for production).

This report reflects an actual audit of the repository as it exists today,
not a generic checklist. Every finding below was verified by reading the
relevant code, running the relevant build/test command, or exercising the
relevant endpoint — not assumed. See `PRODUCTION_TEST_REPORT.md` for the
full test evidence behind the claims here.

## Summary

The application is functionally complete for its core business purpose (lead
capture for Society Management and Education Management software) and is
unusually security-conscious for a project at this stage: no committed
secrets, no exposed admin self-registration, sound rate limiting, parameterized
EF Core queries throughout, honest labeling of all illustrative/demo content.
Before this audit, the project had **zero automated tests, no CI pipeline, an
unverified SQL Server path, and a broken error path in login** — these are
the highest-severity items and are addressed below.

## Findings by Severity

### Critical (fixed during this audit)

| # | Finding | Status |
|---|---|---|
| C1 | `AuthController`'s dummy-password-hash timing mitigation used an invalid (non-Base64) constant, causing every login attempt with a non-existent email to crash with an unhandled `500` instead of returning `401`, and skipping the timing-attack mitigation entirely. Found while writing the first automated auth test. | **Fixed** — replaced with a genuine `PasswordHasher` output. Covered by `Nonexistent_email_is_rejected_the_same_way_as_a_wrong_password`. |
| C2 | Zero automated tests existed anywhere in the repository. Any change carried no regression safety net. | **Fixed** — added `backend/VedanshSoftware.Api.Tests` (23 xUnit integration tests covering enquiry submission, auth/authorization boundaries, admin enquiry management, and rate limiting), wired into CI. |
| C3 | No CI pipeline — builds, tests, and lint were never run automatically; a broken commit could reach `main` undetected. | **Fixed** — `.github/workflows/ci.yml` runs backend build+test and frontend lint+typecheck+build on every push/PR to `main`. |
| C4 | The SQL Server code path had never been exercised against a real SQL Server instance; only SQLite had ever been tested. SQLite-generated migrations typed ASP.NET Identity's string keys as unconstrained `TEXT`, which SQL Server rejects as an index/key column type. | **Fixed** (2026-10-17, prior session) — separate per-provider migration sets added, verified end-to-end against a real `vsite` database on `ACL-402\SQL2022` with correctly-typed `nvarchar(450)` keys. |

### High

| # | Finding | Status |
|---|---|---|
| H1 | No `Content-Security-Policy` header anywhere, despite other security headers being present and the app handling visitor PII (names, phone numbers, emails). | **Fixed** — restrictive CSP added to the backend API (`default-src 'none'`, since it's a JSON-only API) and to the frontend (`frontend/vercel.json`, scoped to actually-used origins: self + Google Fonts). |
| H2 | Real email delivery (enquiry notifications to the business, confirmation to visitors) has never been tested end-to-end. `Email:Enabled=false` everywhere; the business currently has no working automated lead-notification channel. | **Not fixed — requires a decision/credential only the business owner can provide.** See "Outstanding — Requires Your Input" below. |
| H3 | Privacy Policy and Terms of Use pages are explicit drafts, self-flagged in the README as needing qualified legal review. | **Not fixed — requires legal review**, not an engineering task. |
| H4 | No automated frontend test suite (Vitest/Playwright); frontend correctness currently rests on manual exploratory testing performed during development plus `npm run build`'s TypeScript type-check. | **Partially mitigated** — `npm run lint` and `npm run build` now run in CI on every push, which catches type errors and most classes of broken-code regressions, but does not catch broken user-facing behavior the way a UI test would. Recommended as a near-term follow-up, not done in this pass (see "Not Done — Judgment Call" below). |

### Medium

| # | Finding | Status |
|---|---|---|
| M1 | `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` cleanup after first deploy is a manual, unenforced step — if left set on the host, they remain readable to anyone with host config access. | **Not fixed — process risk**, documented as a hard checklist item in `PRODUCTION_LAUNCH_CHECKLIST.md`. |
| M2 | No automated data-retention/deletion job for enquiry PII, relevant once the Privacy Policy (once legally reviewed) presumably commits to a retention period. | **Not fixed — deferred**, consistent with the existing `docs/DATABASE.md` note; building a retention job before the retention *period* is legally decided would be guesswork. |
| M3 | JWT is stored in `localStorage` on the frontend (standard SPA XSS-exposure tradeoff, not an httpOnly cookie). | **Accepted as-is** — reasonable for an internal admin tool at this scale; flagging for conscious sign-off rather than treating as a defect. |
| M4 | No Node version pin (`engines`/`.nvmrc`); README says "Node 20+" but nothing enforces it. | **Fixed** — `engines` field added to `frontend/package.json`; CI pins Node 20 explicitly. |

### Low / Documentation drift

| # | Finding | Status |
|---|---|---|
| L1 | `README.md` said "React 18"; actual installed version is React 19.2.8. | **Fixed.** |
| L2 | `SmtpEmailService.cs` hardcodes the company phone/email into email body text rather than sourcing from `EmailOptions`. | **Not fixed** — low priority, not a security or correctness issue; noted for future cleanup. |
| L3 | Main frontend JS bundle is ~426 KB (126 KB gzipped) — not alarming for a marketing site, but worth tracking as more pages are added. | **Not fixed** — noted for the performance phase; no action needed before launch. |

## What Was Explicitly Checked and Found Clean (not re-litigated)

- No secrets committed anywhere (verified via `git ls-files` + heuristic
  regex scan across all source files); all connection strings, JWT secret,
  and SMTP password are empty in every tracked config file and live only in
  `dotnet user-secrets` locally.
- No publicly exposed admin self-registration endpoint; the only path to
  create an admin is the env-var-gated `AdminSeeder` at startup.
- CORS is origin-restricted (`WithOrigins`, not `AllowAnyOrigin`).
- All EF Core queries are parameterized LINQ; no raw SQL anywhere.
- CSV export neutralizes spreadsheet formula injection from visitor-controlled fields.
- Demo/illustrative data is consistently and explicitly labeled as fictional in the UI.
- JWT secret strength is enforced at startup (≥32 bytes) — the app cannot boot without one.

## Outstanding — Requires Your Input

These cannot be completed by an engineering pass alone:

1. **Email delivery.** Provide a Gmail App Password (generated from the
   `vedanshsoft@gmail.com` account's Google Account security settings, not
   the regular account password) to enable and test real SMTP delivery. Until
   then, `Email:Enabled` should stay `false` in any environment rather than
   silently claiming delivery works.
2. **Legal review.** The Privacy Policy and Terms of Use are drafts. Have a
   qualified professional review them before relying on them for a live site
   collecting visitor PII.
3. **Backend + database hosting decision.** The frontend deploys to Vercel
   (already working, auto-deploys from `main`). No backend/SQL Server host
   has been chosen yet. See `PRODUCTION_DEPLOYMENT_GUIDE.md` for the options
   and their cost/tradeoffs — this needs an actual choice and account
   provisioning before the backend can go live.
4. **`vercel.json`'s CSP `connect-src`** currently points at a placeholder
   domain (`https://api.vedanshsoftware.com`). Once the real backend domain
   is chosen, this must be updated to match, or the browser will silently
   block all API calls from the deployed frontend.

## Not Done — Judgment Call (flagging rather than silently skipping)

- **Frontend automated test suite (Vitest/Playwright).** Given the master
  prompt's instruction not to introduce a large new testing framework without
  compelling reason, and that the backend (the layer handling money-adjacent,
  security-sensitive logic: auth, data persistence, access control) is now
  covered, I prioritized that over frontend UI tests in this pass. Recommended
  as the next investment if this project continues to grow.
- **Full phases 9–13 of the master prompt** (multi-browser/device testing,
  Lighthouse performance scoring, live monitoring/alerting setup, Google
  Search Console submission) require either manual testing on physical
  devices/browsers this environment doesn't have, or external accounts
  (hosting, monitoring services, Search Console) that don't exist yet. These
  are documented as next steps in `PRODUCTION_LAUNCH_CHECKLIST.md` rather
  than fabricated as complete.

## Launch Decision

**READY WITH DOCUMENTED LIMITATIONS.**

No critical or high-severity blocker remains that is within engineering's
power to fix unilaterally. The two genuine High-severity gaps (email
delivery, legal review) are explicitly documented, do not corrupt data or
expose secrets, and have a clear owner and path to close. All critical
blockers that *were* fixable in this pass (the login crash bug, zero test
coverage, no CI, the unverified SQL Server path, missing CSP) have been
fixed and verified, not just claimed.
