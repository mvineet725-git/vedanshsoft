# Vedansh Software Services — Official Website

Marketing website and lead-management system for Vedansh Software Services,
covering two products: **Society Management Software** and **Education
Management Software**.

## Stack

- **Frontend:** React 19 + TypeScript (Vite), React Router, React Hook Form + Zod
- **Backend:** ASP.NET Core 8 Web API, EF Core, ASP.NET Core Identity + JWT
- **Database:** SQLite (local development) / SQL Server (production) — same EF Core
  models, switched via configuration (`DatabaseProvider`); see
  [docs/DATABASE.md](docs/DATABASE.md) for why each provider has its own migration set
- **Email:** MailKit over SMTP (Gmail by default)
- **CI:** GitHub Actions (`.github/workflows/ci.yml`) builds and tests the backend
  and lints/typechecks/builds the frontend on every push and pull request to `main`

See [docs/API.md](docs/API.md) for the API surface and
[docs/ADMIN_PROVISIONING.md](docs/ADMIN_PROVISIONING.md) for creating the first
admin account.

## Project Structure

```
vsite/
├── frontend/                  React + TypeScript SPA (public site + admin dashboard)
│   ├── src/pages/              Public pages (Home, Solutions, Contact, etc.)
│   ├── src/pages/admin/        Admin dashboard pages (protected)
│   ├── src/components/         Shared UI components (forms, cards, layout)
│   └── src/lib/                API client, auth context, validation
├── backend/
│   ├── VedanshSoftware.Api/       ASP.NET Core Web API
│   │   ├── Controllers/            Enquiries, Auth, Admin endpoints
│   │   ├── Services/               Business logic, email, JWT
│   │   ├── Models/                  EF Core entities
│   │   ├── Data/                    DbContext (SQLite + SQL Server), migrations, admin seeder
│   │   └── DTOs/                    Request/response contracts
│   └── VedanshSoftware.Api.Tests/ xUnit integration test suite
├── .github/workflows/          CI (build, test, lint)
└── docs/                       API docs, deployment guide, admin provisioning
```

## Local Development

### Prerequisites

- Node.js 20+
- .NET 8 SDK
- (Production only) SQL Server — local dev uses SQLite, no install required

### Backend

```bash
cd backend/VedanshSoftware.Api
dotnet user-secrets set "Jwt:Secret" "$(openssl rand -base64 48)"
dotnet restore
dotnet run
```

The API listens on `http://localhost:5280` by default, serves Swagger UI at
`/swagger`, applies EF Core migrations automatically on startup, and creates
a SQLite database file (`vedansh.db`) in the project folder.

To create the first admin account, see
[docs/ADMIN_PROVISIONING.md](docs/ADMIN_PROVISIONING.md).

To send real emails, see the `Email__*` variables in
[backend/VedanshSoftware.Api/.env.example](backend/VedanshSoftware.Api/.env.example)
and set them via user-secrets or environment variables — without them, the app
logs what it would have sent instead of claiming false delivery.

### Frontend

```bash
cd frontend
cp .env.example .env.local   # adjust VITE_API_BASE_URL if needed
npm install
npm run dev
```

The site runs on `http://localhost:5275` and proxies API calls to
`http://localhost:5280` (configurable via `VITE_API_BASE_URL`).

### Running Tests / Checks

```bash
# Backend build + automated test suite
cd backend && dotnet build && dotnet test

# Frontend lint + type-check + production build
cd frontend && npm run lint && npm run build
```

These same commands run automatically in CI on every push/PR to `main` (see
`.github/workflows/ci.yml`). See [docs/TEST_REPORT.md](docs/TEST_REPORT.md)
for the full executed test results and known gaps, and
[PRODUCTION_TEST_REPORT.md](PRODUCTION_TEST_REPORT.md) for the production
readiness test summary.

## Database Migrations

SQLite and SQL Server each have their own migration set (see
[docs/DATABASE.md](docs/DATABASE.md) for why):

```bash
cd backend/VedanshSoftware.Api

# SQLite (default, local dev)
dotnet ef migrations add <Name> --output-dir Migrations/Sqlite
dotnet ef database update

# SQL Server
dotnet ef migrations add <Name> --context SqlServerAppDbContext --output-dir Migrations/SqlServer
dotnet ef database update --context SqlServerAppDbContext
```

Migrations are applied automatically on application startup
(`db.Database.Migrate()` in `Program.cs`), so no manual step is required in
normal deployments.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the full deployment guide
(hosting options, environment configuration, HTTPS, backups, monitoring) and
[PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md) /
[PRODUCTION_LAUNCH_CHECKLIST.md](PRODUCTION_LAUNCH_CHECKLIST.md) for the
current launch status and remaining steps. The frontend is deployed on Vercel
(auto-deploys from pushes to `main`); backend/database hosting has not yet
been chosen.

## Admin Dashboard

Once logged in at `/admin/login`, authorized staff can:

- View dashboard KPIs (total/new enquiries, breakdown by product/status)
- Search, filter, and paginate all enquiries
- View full enquiry detail and update status
- Add follow-up notes
- Export all enquiries to CSV (Admin role only)

## Interactive Site Features

- **Interactive hero demo** (`components/InteractiveHeroDemo.tsx`) — Society/Education
  tabs with illustrative sample dashboard metrics, clearly labeled as demo data.
- **India city explorer** (`components/CityExplorer.tsx`) — searchable/filterable
  example target markets; selecting a city and product deep-links to `/contact`
  with both pre-filled. Labeled as illustrative markets, not confirmed coverage.
- **Feature explorers** (`components/FeatureExplorer.tsx`) — category-based,
  dynamically updating product feature walkthroughs for both Society
  (`data/societyFeatures.ts`) and Education (`data/educationFeatures.ts`) pages.
- **Public fictional demos** (`/demo/society`, `/demo/education`) — read-only,
  clearly banner-labeled exploration of entirely fictional sample records
  (`data/demoData.ts`). Not connected to the real database or admin system.
- **Multi-step enquiry form** (`components/MultiStepEnquiryForm.tsx`) — a
  4-step flow (Solution → Organization → Contact → Review) with a review
  screen and contact-method buttons on the confirmation screen. Posts to the
  same unchanged `/api/enquiries` endpoint as before.
- **Searchable FAQ** (`components/SearchableFaq.tsx`) — keyword search plus
  category filters over `data/faqs.ts`.
- **Centralized illustrative-data config** (`data/siteContent.ts`,
  `data/testimonials.ts`) — all sample statistics and the testimonials
  section check a single `VERIFIED_METRICS` / `APPROVED_TESTIMONIALS` constant
  first; when empty (the current state), components render honest
  "illustrative data" / "explore a demo" messaging instead of fabricated
  numbers or fake reviews. Add real, verified figures there — nowhere else —
  once available.

## Known Limitations / Follow-ups

- Legal pages (Privacy Policy, Terms of Use) are drafts and require review by
  a qualified legal professional before production launch.
- No self-service "invite admin user" UI yet; see
  [docs/ADMIN_PROVISIONING.md](docs/ADMIN_PROVISIONING.md) for the current process.
- Email sending requires a Gmail App Password to be configured; until then the
  app logs intended emails instead of sending them.
- No frontend automated test suite yet (Vitest/Playwright) — frontend
  correctness currently rests on manual testing plus CI's lint + TypeScript
  type-check on every push. The backend has full integration test coverage
  (`backend/VedanshSoftware.Api.Tests`).
- Backend/database hosting has not yet been chosen; see
  [PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md).

See [PRODUCTION_READINESS_REPORT.md](PRODUCTION_READINESS_REPORT.md) for the
full production-readiness audit.
