# Production Test Report

**Date:** 2026-10-17

This is the production-readiness test summary. It reports only what was
actually executed, with real results — nothing here is assumed or inferred.
For the full narrative development-session test log (including everything
tested before this audit), see [docs/TEST_REPORT.md](docs/TEST_REPORT.md).

## Automated Tests Executed (this audit)

### Backend: `dotnet test` (new — `backend/VedanshSoftware.Api.Tests`)

```
Passed!  - Failed: 0, Passed: 23, Skipped: 0, Total: 23
```

| Suite | Tests | What it proves |
|---|---|---|
| `EnquirySubmissionTests` | 8 | Valid submissions persist and return a real reference number; missing fields, invalid phone numbers, missing consent, and oversized messages are all rejected with 400; the honeypot field silently drops bot submissions without creating a real record; rapid duplicate submissions (same mobile + product within 2 minutes) return the same reference instead of creating two records; confirmation lookup for an unknown reference returns 404. |
| `AuthAndAuthorizationTests` | 9 | Valid login returns a working JWT with correct roles; wrong password and non-existent email are both rejected with 401 (not 500 — see bug fix below); unauthenticated requests to the admin dashboard, enquiry list, and status-update endpoints are all rejected with 401; a `Staff`-role user is rejected (403) from the Admin-only CSV export but can still view/search enquiries; an `Admin`-role user can access the export. |
| `AdminEnquiryManagementTests` | 3 | The full lead-management journey works end-to-end: a public enquiry submission is findable by an authenticated admin, its status can be updated, a follow-up note can be added, and the dashboard summary reflects the new enquiry. Updating a non-existent enquiry returns 404. |
| `RateLimitingTests` | 2 | The enquiry-submission limiter (5/10min/IP) and login limiter (10/15min/IP) both actually reject the request immediately after their configured limit, returning 429. |
| `HealthCheckTests` | 1 | `/api/health` is reachable without authentication. |

Run with: `cd backend && dotnet test`. Runs automatically in CI on every push/PR.

**Two real issues were found and fixed while writing these tests** (not
pre-existing test failures papered over — see `PRODUCTION_READINESS_REPORT.md`
findings C1 and the test-infra note for full detail):
1. A broken dummy-password-hash constant caused login with a non-existent
   email to crash with 500 instead of returning 401.
2. A test-infrastructure config-precedence gotcha (not a product bug) that
   would have made the test suite unreliable if left unfixed.

### Backend: `dotnet build`

Clean, 0 warnings, 0 errors, for both the main API project and the new test project.

### Frontend: `npm run lint` (oxlint)

Passes — 0 errors. 8 pre-existing warnings (React effect/purity style
suggestions, one unnecessary regex escape), none of which are correctness or
security issues. Listed in full in `PRODUCTION_READINESS_REPORT.md` is not
necessary; they're cosmetic lint suggestions, not defects.

### Frontend: `npm run build` (tsc -b && vite build)

Clean production build, 0 TypeScript errors. Output: ~40 code-split chunks
(lazy-loaded pages), main bundle 426 KB / 126 KB gzipped.

### SQL Server end-to-end verification (prior session, same day)

| Test | Result |
|---|---|
| EF Core migrations generate SQL-Server-correct schema (`nvarchar(450)` Identity keys) | PASS |
| App starts and runs `Database.Migrate()` against a real `vsite` database on `ACL-402\SQL2022` | PASS |
| `/api/health` returns 200 against the SQL-Server-backed app | PASS |
| All 10 expected tables created with correct column types, verified via `sys.tables`/`sys.columns` | PASS |

## Manual / Exploratory Tests Executed (prior development sessions)

Summarized here; full detail in `docs/TEST_REPORT.md`. These were run
against a live instance with SQLite, using curl and Playwright-driven
headless Chromium browser automation:

- Full enquiry submission flow (Society + Education products), admin login,
  dashboard, search/filter/pagination, status updates, notes, CSV export —
  all PASS.
- Security review: timing side-channel on login (fixed), CSV formula
  injection (fixed), JWT secret strength enforcement (fixed), low-entropy
  reference numbers (fixed) — all findings closed.
- Responsive/overflow testing at phone (375×812) and tablet (768×1024)
  widths across all pages — PASS after two layout bugs were found and fixed.
- All analytics event instrumentation verified to never include visitor PII.
- Every public page, admin page, and interactive component exercised via
  browser automation with zero console errors.

## Not Tested (explicitly, not silently assumed passing)

| Item | Why | Owner / next step |
|---|---|---|
| Real Gmail SMTP delivery | No App Password configured in this environment (`Email:Enabled=false` everywhere) | Business owner provides a Gmail App Password; see `PRODUCTION_ENVIRONMENT_VARIABLES.md` |
| Cross-browser testing (Firefox, Safari, Edge) | Only headless Chromium was available in prior testing sessions | Manual pass recommended before/shortly after launch |
| Real mobile device testing (physical Android/iOS) | Only responsive emulation was available | Manual pass recommended |
| Screen reader / full keyboard-only accessibility audit | Not performed in any session | Recommended follow-up |
| Lighthouse / Core Web Vitals scoring | Not run in this pass — see `PRODUCTION_READINESS_REPORT.md` performance notes | Recommended before or shortly after launch, using the production build |
| Frontend automated UI tests (Vitest/Playwright as a permanent suite) | A deliberate scope decision for this pass — see `PRODUCTION_READINESS_REPORT.md` | Recommended as the next investment if the project continues to grow |
| Load/concurrency testing beyond the rate-limit boundary tests above | Not performed | Low priority given expected traffic volume for a B2B lead-gen site |

## Verdict

All tests that were run, passed, after fixing the two real defects
(C1: login crash bug) found in the process. Nothing above claims a result
that was not actually observed.
