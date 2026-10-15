# Admin Account Provisioning

There is no public admin registration page and no hardcoded default production
password. The first admin account is created via environment variables read once
at application startup by `AdminSeeder` ([backend/VedanshSoftware.Api/Data/AdminSeeder.cs](../backend/VedanshSoftware.Api/Data/AdminSeeder.cs)).

## How it works

On every startup, the API:

1. Ensures the `Admin` and `Staff` roles exist.
2. Checks the environment variables `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD`.
   - If either is missing, seeding is skipped (logged as informational) and nothing happens.
   - If both are present and no user with that email already exists, an admin account
     is created with the `Admin` role.
   - If a user with that email already exists, seeding is skipped.

This means seeding is **idempotent and safe** to leave configured across restarts.

## Local development

Use .NET user-secrets or your shell environment, never `appsettings.json`:

```bash
cd backend/VedanshSoftware.Api
dotnet user-secrets set "Jwt:Secret" "<a long random string>"
```

```powershell
$env:ADMIN_SEED_EMAIL = "owner@example.com"
$env:ADMIN_SEED_PASSWORD = "A-Strong-Temp-Password1!"
dotnet run
```

After the first successful run, **remove or change these environment variables**
(or change the account's password from the admin UI) so the seed credentials are
not left active indefinitely.

## Production

Set `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD` as secure environment variables
on your hosting platform (see [DEPLOYMENT.md](DEPLOYMENT.md) for provider-specific
instructions) for the first deploy only. After confirming you can log in:

1. Log into the admin dashboard with the seeded credentials.
2. Change the password immediately (via your identity provider's normal flow,
   or by resetting the password in the database if no self-service UI exists yet).
3. Remove the `ADMIN_SEED_PASSWORD` environment variable from your hosting
   configuration so it cannot be reused or leaked via environment dumps.

## Password policy

Enforced by ASP.NET Core Identity (`Program.cs`):

- Minimum length: 10 characters
- Requires uppercase, digit, and a non-alphanumeric character
- Account lockout after 5 failed attempts for 15 minutes

## Adding additional admins

There is no self-service "invite user" UI in this phase. To add another admin or
staff account, a developer with database access should either:

- Temporarily set `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` to the new user's details,
  restart the app once, then unset the variables again; or
- Insert the user directly via a small one-off script using `UserManager<AdminUser>`,
  which correctly hashes the password (never insert password hashes by hand).
