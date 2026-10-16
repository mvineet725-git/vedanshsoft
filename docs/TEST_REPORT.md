# Test Report

This report lists only tests that were actually executed during development,
with pass/fail status. It will be extended as automated test suites are added.

Last updated: 2026-10-16

## Priority 4: Marketing & Discoverability — Articles and Industry Landing Pages (2026-10-16)

Scope: an articles/guides section with 8 original, substantive articles, and
3 genuinely differentiated industry landing pages. No backend changes.

### Scope decision on industry pages

The brief suggested 7 industry-specific landing pages but explicitly warned
against "many nearly identical pages with swapped keywords." Of the 7
suggested (Housing Society, Cooperative Society, Apartment Management,
School, Coaching Center, Tuition Class, College), most would have differed
from the existing product pages and Industries page only in a few nouns.
Built only the 3 with genuinely distinct operational content to write about:
**Cooperative Housing Society Software** (governance/AGM/audit angle),
**School Management Software** (multi-grade, fixed academic calendar), and
**Coaching Institute Management Software** (concurrent batches, rolling
enrollment, exam-prep-aligned attendance). Skipped Apartment Management
(duplicates Housing Society), Tuition Class and Training Institute
(duplicate Coaching Institute), and College (duplicates School) rather than
publish near-duplicate pages purely for keyword coverage.

### Automated browser tests (Playwright, live backend)

| Test | Result |
|---|---|
| `/articles` loads and lists all 8 articles | PASS |
| Category filter narrows the article list correctly | PASS |
| Individual article pages render multiple content sections, a related-articles block, and Article JSON-LD structured data | PASS (verified directly; an invalid Playwright locator chain in the throwaway test script produced false negatives on the first attempt — confirmed as a test-script bug, not a product defect, and re-verified) |
| An invalid article slug redirects to `/articles` instead of showing a broken page | PASS |
| All 3 industry landing pages load, show 4 distinct content points each, and include a working locked-product enquiry form | PASS |
| Footer links to Articles and all 3 industry pages | PASS |
| Industries page rows for Cooperative Societies, Schools, and Coaching Institutes link to their dedicated pages (not the generic product pages) | PASS |
| No horizontal overflow on any new page at phone or tablet width | PASS |
| No console errors across any of the above | PASS (zero errors reported) |

### Build verification

- Backend: unchanged, `dotnet build` clean (0 errors, 0 warnings).
- Frontend: `npm run build` clean; the new article content and industry
  pages are code-split into their own lazy-loaded chunks, so visitors who
  never navigate to them don't pay for that bundle weight.

## Priority 3: Sales Management — Admin Dashboard Enhancements (2026-10-16)

Scope: expanded enquiry statuses (Qualified, Proposal/Quotation), a
`NextFollowUpDate` field, source-based filtering and reporting. Required one
backend schema change: a new EF Core migration
(`AddFollowUpDateAndExpandedStatuses`) adding a single nullable
`NextFollowUpDate` column to `ContactEnquiries`. No existing columns were
altered or dropped; the two new `EnquiryStatus` enum values were appended
after the existing ones, so previously stored integer status values are
unaffected.

### Backend — manual integration tests (curl against a running instance)

| Test | Result |
|---|---|
| Migration applies cleanly on a fresh database | PASS |
| Update status to `Qualified` (6) persists and returns correctly | PASS |
| Update status to `Proposal` (7) persists and returns correctly | PASS |
| Setting `nextFollowUpDate` on a status update persists the date | PASS |
| A later status update without `nextFollowUpDate` leaves the existing date unchanged | PASS |
| Dashboard summary returns `followUpsDueToday`, `overdueFollowUps`, and `enquiriesBySource` | PASS |
| Searching enquiries with `source` query param filters correctly | PASS |

### Frontend admin UI — automated browser tests (Playwright, live backend)

| Test | Result |
|---|---|
| Dashboard renders Follow-ups Due Today / Overdue Follow-ups stat cards | PASS (verified visually; an overly strict text-matching assertion in the throwaway test script produced a false negative, not a real defect) |
| Dashboard renders an Enquiries by Source card with per-source counts | PASS |
| Enquiries list has a Source filter dropdown and a Next Follow-up column | PASS |
| Filtering the enquiries list by source narrows results correctly | PASS |
| Enquiry detail page shows an editable Next Follow-up Date field | PASS |
| Saving a follow-up date updates the detail view immediately | PASS |
| Changing status to Qualified/Proposal updates the status badge immediately | PASS |
| No console errors during any of the above | PASS (zero errors reported) |

### Known limitation

`PATCH /api/enquiries/{id}/status` can set or change `nextFollowUpDate` but
cannot currently clear it back to "not scheduled" (a `null` value is treated
as "no change" rather than "clear"). Low priority since picking a new date
addresses the common case; flagged here for future enhancement if a
genuine need to unschedule a follow-up arises.

## Interactive SaaS Upgrade (2026-10-16)

Scope: interactive hero demo, India city explorer, Society/Education feature
explorers, before/after comparison, public fictional product demos, multi-step
enquiry form, searchable/categorized FAQ. No backend, database, or API changes
were required for this phase — all new functionality is frontend-only and
reuses the existing `/api/enquiries` contract unchanged.

### Automated browser tests (Playwright, headless Chromium, against live backend)

| Test | Result |
|---|---|
| Home page renders with new hero headline and interactive tabs | PASS |
| Hero tab switch (Society ↔ Education) changes displayed sample metrics | PASS |
| Trust section shows honest "no fabricated stats" messaging (no verified metrics configured) | PASS |
| City explorer search filters the city list | PASS |
| Selecting a city shows its detail panel with product-specific enquiry CTAs | PASS |
| Clicking "Enquire for [city]" navigates to /contact with product and city pre-filled | PASS |
| Multi-step enquiry form: full 4-step flow (Solution → Organization → Contact → Review) submits successfully against the live backend and returns a real reference number | PASS |
| Confirmation screen shows phone/email/WhatsApp contact buttons alongside the reference number | PASS |
| Feature explorer (Society page) updates displayed content when a category is selected | PASS |
| `lockProduct` on a dedicated product page correctly skips the Solution step and starts at Organization | PASS |
| Institution type selector (Education page) changes displayed sample metrics per type | PASS |
| Society demo page shows the fictional-data banner and fictional society name/records | PASS |
| Society demo tabs (Flats/Notices/Complaints) switch content correctly | PASS |
| Education demo page shows the fictional-data banner and fictional institute name/records | PASS |
| FAQ search filters results by keyword | PASS |
| FAQ search shows an accessible empty state when no results match | PASS |
| Before/after comparison toggle switches displayed content | PASS |
| No console errors across any of the above interactions | PASS (zero errors reported) |

### Responsive and overlap testing

Re-ran the mobile (375×812) and tablet (768×1024) overflow sweep across all
new pages and sections (home, both product pages, contact, both demo pages,
FAQ): zero horizontal overflow issues, zero console errors.

Verified the floating WhatsApp button does not overlap the multi-step
enquiry form's submit button on a phone-width viewport (bounding-box check:
no overlap).

### Build verification

- `dotnet build` on the backend: 0 errors, 0 warnings (unchanged — no backend
  files were modified in this phase, confirming no regression to existing
  enquiry records, auth, or APIs).
- `npm run build` (tsc + vite) on the frontend: clean production build.

### Data integrity

No database migrations were created or needed. No existing enquiry records,
admin accounts, or API contracts were touched. The previously existing
single-step `EnquiryForm` component was removed only after confirming zero
remaining references anywhere in the codebase (fully superseded by
`MultiStepEnquiryForm`, which shares its base CSS and posts to the same
unchanged `/api/enquiries` endpoint).

### Known gaps for this phase

- Accessibility: new tab-style controls (hero demo, feature explorer,
  institution selector, FAQ categories) use native `<button>` elements with
  `role="tab"`/`aria-selected`, which are keyboard-focusable and operable, but
  do not implement full ARIA tabs arrow-key navigation. Consistent with the
  existing `FaqAccordion` pattern already in the codebase.
- The admin dashboard was not modified in this phase and was not re-tested
  here (see the prior admin dashboard UI testing section above).
- No admin-side content management UI was built for toggling verified metrics
  on/off; `VERIFIED_METRICS` and `APPROVED_TESTIMONIALS` in
  `frontend/src/data/siteContent.ts` and `testimonials.ts` are edited directly
  in code, which is appropriate for the current scale per the brief's
  allowance for "a clean configuration file... appropriate to the current
  architecture" instead of a full CMS.

## Build Verification

| Check | Status |
|---|---|
| Backend `dotnet build` (0 errors, 0 warnings) | PASS |
| Frontend `tsc -b && vite build` (production build) | PASS |
| EF Core initial migration generation (`InitialCreate`) | PASS |

## Backend API — Manual Integration Tests (executed via curl against a running instance)

| Test | Method | Result |
|---|---|---|
| Health check returns 200 | `GET /api/health` | PASS |
| Valid enquiry submission creates a record and returns a reference number | `POST /api/enquiries` | PASS |
| Duplicate submission (same mobile + product within 2 min) returns the same reference instead of creating a second record | `POST /api/enquiries` x2 | PASS |
| Invalid mobile number is rejected with 400 | `POST /api/enquiries` | PASS |
| Honeypot field filled returns a fake success without persisting a record | `POST /api/enquiries` with `websiteUrl` set | PASS |
| Admin endpoints reject unauthenticated requests (401) | `GET /api/enquiries`, `GET /api/admin/enquiries/export` | PASS |
| Admin login succeeds with valid seeded credentials and returns a JWT | `POST /api/auth/login` | PASS |
| `/api/auth/me` returns the authenticated user's real email, display name, and roles | `GET /api/auth/me` | PASS (bug found and fixed — see below) |
| Dashboard summary reflects actual enquiry counts/breakdowns | `GET /api/admin/dashboard-summary` | PASS |
| Enquiry search/pagination returns matching records | `GET /api/enquiries?page=1&pageSize=10` | PASS |
| Status update persists and reflects in subsequent detail fetch | `PATCH /api/enquiries/{id}/status` | PASS |
| Adding a follow-up note records the correct `createdBy` (admin email) | `POST /api/enquiries/{id}/notes` | PASS |
| CSV export succeeds for an authenticated Admin-role user | `GET /api/admin/enquiries/export` | PASS |
| CSV export is rejected (401) for unauthenticated requests | `GET /api/admin/enquiries/export` | PASS |
| CSV export neutralizes formula-injection payloads (e.g. `=cmd\|calc` prefixed with a tab) | `GET /api/admin/enquiries/export` | PASS |

### Bug found and fixed during testing

`GET /api/auth/me` initially returned `email: null` because `User.Identity.Name`
does not resolve against the custom JWT claims used by this app, and because
`JwtBearerHandler`'s default inbound claim mapping remapped the `email` claim
to a different claim type than the controller was checking. Fixed by setting
`options.MapInboundClaims = false` in `Program.cs` and reading claims by their
literal registered names. Re-verified after the fix — see table above.

## Security Review (automated, see commit history / session notes for full findings)

An adversarial review of the backend was performed covering authN/authZ
bypass, injection, broken access control, information disclosure, JWT
configuration, CORS, rate limiting, and secrets handling. Findings and fixes:

| Finding | Severity | Status |
|---|---|---|
| Public confirmation-lookup endpoint had low-entropy, brute-forceable reference numbers and no rate limiting | High | Fixed — entropy increased to ~45 bits, rate limiting added |
| JWT secret had no minimum length/strength enforcement | High | Fixed — startup now requires ≥32 bytes |
| CSV export vulnerable to spreadsheet formula injection via visitor-controlled fields | Low | Fixed — formula-triggering leading characters are neutralized |
| Login endpoint had a timing side-channel that could aid email enumeration | Medium | Fixed — dummy password-hash check runs for non-existent emails |
| `Staff` vs `Admin` role boundaries were implicit | Medium | Clarified as intentional via code comment; only bulk CSV export is Admin-only |

No SQL injection, log injection, or stack-trace/information disclosure issues
were found. All EF Core queries use parameterized LINQ; no raw SQL is used
anywhere in the codebase.

## Frontend — Manual Browser Verification (Playwright-driven, headless Chromium)

| Test | Result |
|---|---|
| Home page renders with no console errors | PASS |
| Navigation to Society Management solution page renders correctly | PASS |
| Navigation to Contact page renders correctly | PASS |
| Contact form: fill name, mobile, select product, accept consent, submit | PASS |
| Enquiry submission returns a real confirmation screen with reference number from the live backend | PASS |
| No browser console errors during the full flow | PASS (zero errors reported) |

Screenshots were reviewed visually to confirm layout, spacing, and responsive
design matched the intended visual design (navy/royal/teal palette, card
layouts, hero dashboard mockup).

## Admin Dashboard UI — Manual Browser Verification (Playwright-driven)

| Test | Result |
|---|---|
| Admin login with seeded credentials succeeds and redirects to dashboard | PASS |
| Dashboard renders live stats, product/status breakdowns, and recent enquiries table | PASS |
| Enquiries list page renders search/filter controls and a populated data table | PASS |
| Enquiry detail page renders full details, status selector, and notes panel | PASS |
| No browser console errors during the full admin flow | PASS (zero errors reported) |

### Bug found and fixed during this pass

The dashboard's "Enquiries by Product" and "Enquiries by Status" breakdown
cards displayed raw C# enum names (e.g. `SocietyManagementSoftware`) instead
of friendly labels, because the backend's dashboard-summary endpoint
serializes dictionary keys as enum *names*, while the frontend was looking up
labels by numeric enum *value*. Fixed by adding name-keyed label maps
(`PRODUCT_INTEREST_LABELS_BY_NAME`, `ENQUIRY_STATUS_LABELS_BY_NAME`) and using
them in `AdminDashboardPage.tsx`. Re-verified visually after the fix.

## Mobile & Tablet Responsive Testing (Playwright-driven, real browser)

Tested at iPhone-class (375×812) and iPad-class (768×1024) viewports across
Home, Society Management, Contact, and Industries pages.

| Test | Result |
|---|---|
| No horizontal page overflow on any tested page at phone width | PASS (after fix — see below) |
| No horizontal page overflow on any tested page at tablet width | PASS (after fix — see below) |
| Mobile hamburger menu opens to a full-height overlay with all nav links and CTA | PASS (after fix — see below) |
| No console errors across any page/viewport combination | PASS (zero errors reported) |

### Bugs found and fixed during this pass

1. **Horizontal overflow on every page at phone and tablet widths.** The
   off-canvas mobile navigation (`.site-nav`) used `transform: translateX(100%)`
   to hide itself when closed. Chromium still counted the element's
   untransformed layout box toward the document's scrollable overflow,
   doubling `scrollWidth` on every page. Fixed by switching to `left: 100%`
   positioning (which removes the box from scroll-overflow calculations) and
   adding `overflow-x: hidden` on `<html>` as a defensive second layer (`body`
   already had it, but the audit measured `document.documentElement`).
2. **Mobile menu collapsed to the height of its toggle button instead of
   filling the screen** once overflow positioning was switched to `left`/
   `top`/`bottom` insets — the flex container's auto-height resolved against
   its content rather than the fixed-position box. Fixed with an explicit
   `height: calc(100vh - var(--header-height))`.

Both fixes were verified by re-running the full responsive + console-error
sweep (all pages, both viewports) after each change, and by visually
inspecting screenshots of the open mobile menu and several pages at both
viewport sizes.

## Not Yet Tested / Known Gaps

- **Accessibility (screen reader, keyboard-only navigation):** semantic HTML,
  focus-visible styles, and ARIA attributes on the FAQ accordion are
  implemented, but have not been tested with an actual screen reader.
- **Real SQL Server target:** all testing above used SQLite (the agreed local
  dev database). The SQL Server code path (`UseSqlServer`) has not been
  exercised against a live SQL Server instance.
- **Real email delivery:** `Email:Enabled` is `false` in this environment (no
  Gmail App Password was provided per the user's request); email sending logs
  intended messages instead of delivering them. Not yet tested against a real
  Gmail SMTP connection.
- **Load/rate-limit behavior under concurrent traffic:** rate limiting logic
  was implemented and endpoint-tested for correctness but not load-tested.
- **Cross-browser testing:** verified only in headless Chromium.

## Recommendation Before Production Launch

1. Exercise the admin dashboard pages in a real browser (not just the API).
2. Configure and test real Gmail SMTP delivery end-to-end.
3. Run a full pass against a real SQL Server instance, including migrations.
4. Have a qualified legal professional review the Privacy Policy and Terms of Use drafts.
5. Test on real mobile devices (Android, per the acceptance criteria) in addition to responsive emulation.
