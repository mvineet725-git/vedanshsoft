# Vedansh Software Services — Official Website

Marketing website and lead-management system for Vedansh Software Services,
covering two products: **Society Management Software** and **Education
Management Software**.

## Stack

- **Frontend:** React 18 + TypeScript (Vite), React Router, React Hook Form + Zod
- **Backend:** ASP.NET Core 8 Web API, EF Core, ASP.NET Core Identity + JWT
- **Database:** SQLite (local development) / SQL Server (production) — same EF Core
  models, switched via configuration (`DatabaseProvider`)
- **Email:** MailKit over SMTP (Gmail by default)

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
│   └── VedanshSoftware.Api/   ASP.NET Core Web API
│       ├── Controllers/        Enquiries, Auth, Admin endpoints
│       ├── Services/           Business logic, email, JWT
│       ├── Models/              EF Core entities
│       ├── Data/                DbContext, migrations, admin seeder
│       └── DTOs/                Request/response contracts
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

The site runs on `http://localhost:5173` and proxies API calls to
`http://localhost:5280` (configurable via `VITE_API_BASE_URL`).

### Running Tests / Checks

```bash
# Backend build
cd backend/VedanshSoftware.Api && dotnet build

# Frontend type-check + production build
cd frontend && npm run build
```

See [docs/TEST_REPORT.md](docs/TEST_REPORT.md) for the executed test results
and known gaps.

## Database Migrations

```bash
cd backend/VedanshSoftware.Api
dotnet ef migrations add <MigrationName>
dotnet ef database update
```

Migrations are applied automatically on application startup
(`db.Database.Migrate()` in `Program.cs`), so no manual step is required in
normal deployments.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for a full production deployment
guide, including hosting options, environment configuration, HTTPS, backups,
and monitoring.

## Admin Dashboard

Once logged in at `/admin/login`, authorized staff can:

- View dashboard KPIs (total/new enquiries, breakdown by product/status)
- Search, filter, and paginate all enquiries
- View full enquiry detail and update status
- Add follow-up notes
- Export all enquiries to CSV (Admin role only)

## Known Limitations / Follow-ups

- Legal pages (Privacy Policy, Terms of Use) are drafts and require review by
  a qualified legal professional before production launch.
- No self-service "invite admin user" UI yet; see
  [docs/ADMIN_PROVISIONING.md](docs/ADMIN_PROVISIONING.md) for the current process.
- Email sending requires a Gmail App Password to be configured; until then the
  app logs intended emails instead of sending them.
