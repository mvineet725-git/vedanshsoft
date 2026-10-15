# Database Schema & Operations

## Schema Overview

EF Core model definitions live in
[backend/VedanshSoftware.Api/Models/](../backend/VedanshSoftware.Api/Models/)
and [backend/VedanshSoftware.Api/Data/AppDbContext.cs](../backend/VedanshSoftware.Api/Data/AppDbContext.cs).
Migrations are in `backend/VedanshSoftware.Api/Migrations/`.

### `ContactEnquiries`

| Column | Type | Notes |
|---|---|---|
| EnquiryId | int, PK, identity | |
| EnquiryReferenceNumber | nvarchar(20) | Unique index, format `VSS-YYYYMMDD-XXXXXXXXX` |
| FullName | nvarchar(120) | |
| MobileNumber | nvarchar(20) | Indexed |
| Email | nvarchar(254), nullable | |
| OrganizationName | nvarchar(150), nullable | |
| OrganizationType | nvarchar(80), nullable | |
| City | nvarchar(100), nullable | |
| ProductInterestedIn | int (enum) | Indexed |
| PreferredContactMethod | int (enum), nullable | |
| Message | nvarchar(2000), nullable | |
| ConsentAccepted | bit, required | |
| EnquirySource | int (enum) | |
| Status | int (enum) | Indexed; default `New` |
| AssignedTo | nvarchar(450), nullable | |
| CreatedAt | datetime2 | Indexed; default `CURRENT_TIMESTAMP` |
| UpdatedAt | datetime2 | |

### `EnquiryNotes`

| Column | Type | Notes |
|---|---|---|
| EnquiryNoteId | int, PK, identity | |
| EnquiryId | int, FK → ContactEnquiries, cascade delete | Indexed |
| Note | nvarchar(2000) | |
| CreatedBy | nvarchar(450) | Admin email |
| CreatedAt | datetime2 | |

### Identity Tables

Standard ASP.NET Core Identity tables (`AspNetUsers`, `AspNetRoles`,
`AspNetUserRoles`, etc.) store admin/staff accounts. `AspNetUsers` is extended
with `DisplayName` and `CreatedAt` via the `AdminUser` entity
([Models/AdminUser.cs](../backend/VedanshSoftware.Api/Models/AdminUser.cs)).
Passwords are hashed by ASP.NET Core Identity's `PasswordHasher` — never
stored in plaintext or reversibly encrypted.

## Enum Reference

See [docs/API.md](API.md) for the integer values of `ProductInterestedIn`,
`PreferredContactMethod`, `Status`, and `EnquirySource`.

## Migrations

```bash
cd backend/VedanshSoftware.Api
dotnet ef migrations add <Name>       # create a new migration
dotnet ef database update             # apply pending migrations manually
dotnet ef migrations remove           # remove the last unapplied migration
```

In normal operation, migrations are applied automatically at application
startup (see `Program.cs`), so a manual `database update` is only needed for
controlled production rollouts (see [DEPLOYMENT.md](DEPLOYMENT.md) §6).

## Backup & Restore

### SQLite (development)

The entire database is the single file `vedansh.db` (plus `-shm`/`-wal`
sidecar files while the app is running). To back up:

```bash
# Stop the app first, or use the SQLite online backup API for a live copy
cp vedansh.db vedansh.db.bak-$(date +%Y%m%d)
```

To restore, stop the app, replace `vedansh.db` with the backup file, and
restart.

### SQL Server (production)

**Backup:**

```sql
BACKUP DATABASE VedanshSoftware
TO DISK = 'VedanshSoftware.bak'
WITH FORMAT, COMPRESSION;
```

On Azure SQL Database, use the built-in automated backup/point-in-time
restore feature instead (enabled by default) rather than manual `BACKUP`
statements, which Azure SQL does not support directly.

**Restore:**

```sql
RESTORE DATABASE VedanshSoftware
FROM DISK = 'VedanshSoftware.bak'
WITH REPLACE;
```

**Recommended schedule:** nightly full backup, retained for at least 7 days,
plus weekly backups retained for 4 weeks. Automate via SQL Server Agent (self-
managed) or your cloud provider's managed backup policy. Test the restore
procedure periodically against a non-production instance.

## Data Retention

Per the draft Privacy Policy ([frontend privacy policy page](../frontend/src/pages/PrivacyPolicyPage.tsx)),
enquiry data should be retained only as long as reasonably necessary. No
automated deletion job exists yet; implementing one (e.g. a scheduled task
that anonymizes or deletes `Closed` enquiries older than N months) is a
recommended follow-up once a specific retention period is decided by the
business owner.
