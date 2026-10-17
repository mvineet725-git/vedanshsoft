# Database Backup and Recovery

This document is the operational backup/restore procedure. See
[docs/DATABASE.md](docs/DATABASE.md) for schema details and migration
commands.

**Current state: no backup is running yet**, because no production SQL
Server host has been provisioned (see `PRODUCTION_DEPLOYMENT_GUIDE.md`).
This document describes the approach to put in place once it is, so backups
exist from day one of production rather than being bolted on after an
incident.

## Backup Approach

Production uses SQL Server (not the local-dev SQLite file). Two supported
approaches, depending on the hosting choice made in `PRODUCTION_DEPLOYMENT_GUIDE.md`:

### Option A — Azure SQL Database (recommended if hosting on Azure)

Azure SQL Database performs **automated backups by default** — no setup
required beyond provisioning the database:
- Full backups weekly, differential backups every 12–24 hours, transaction
  log backups every 5–10 minutes.
- Point-in-time restore to any point within the retention window (7 days on
  Basic/Standard tiers; longer on higher tiers or with configured long-term
  retention).
- **Action required:** none to enable it; only decide if the default 7-day
  retention is sufficient or whether to configure long-term retention
  (weekly/monthly/yearly copies) for compliance reasons once the Privacy
  Policy's retention commitment is legally finalized.

### Option B — Self-managed SQL Server (VPS or on-prem)

Requires an explicit backup job, since nothing does this automatically:

```sql
BACKUP DATABASE vsite
TO DISK = 'vsite-full.bak'
WITH FORMAT, COMPRESSION;
```

- Schedule via **SQL Server Agent** (if available on the SQL Server edition in
  use) or an OS-level scheduled task/cron job wrapping `sqlcmd`.
- **Recommended schedule:** nightly full backup, retained 7 days, plus a
  weekly full backup retained 4 weeks.
- Store backups **off the database server itself** (separate disk, cloud
  blob storage, or network share) — a backup that lives only on the server
  it's protecting against is not a real backup if that server is lost.

## Retention

- **Minimum:** 7 daily backups + 4 weekly backups (30+ days of recovery
  points), regardless of which option above is used.
- Adjust upward once the legally-reviewed Privacy Policy specifies a data
  retention commitment — the backup retention period should not silently
  outlive what the Privacy Policy promises visitors about their data.

## Restore Instructions

### Azure SQL Database

Use the Azure Portal or CLI point-in-time restore feature — this creates a
**new** database from a point in time (it does not overwrite the live
database in place), so you can verify the restored data before cutting over:

```bash
az sql db restore \
  --dest-name vsite-restored \
  --name vsite \
  --server <server-name> \
  --resource-group <resource-group> \
  --time "2026-10-17T03:00:00Z"
```

### Self-managed SQL Server

```sql
RESTORE DATABASE vsite_restored
FROM DISK = 'vsite-full.bak'
WITH MOVE 'vsite' TO '/var/opt/mssql/data/vsite_restored.mdf',
     MOVE 'vsite_log' TO '/var/opt/mssql/data/vsite_restored.ldf';
```

Restoring to a **new** database name first (as shown above), verifying the
data, and only then renaming/cutting over is strongly preferred over
`WITH REPLACE` directly onto the live `vsite` database, which is
irreversible and destroys whatever was there.

## Verification Procedure

**A backup is not considered reliable until a restore has actually been
tested.** Before relying on either option above for production:

1. Take (or wait for) a backup.
2. Restore it to a **separate, non-production** database or server.
3. Run the application against the restored copy with
   `DatabaseProvider=SqlServer` and a connection string pointed at the
   restored database.
4. Confirm: the app starts without migration errors, `/api/health` returns
   200, and a sample of known enquiry records are present and intact.
5. Document the date this verification was last performed, here:

   **Last restore verification: not yet performed** — no production database
   exists yet to back up. This line must be updated the first time a restore
   is actually tested, and re-verified periodically (recommended: every 3–6
   months) thereafter.

## What Backups Must Never Include Unprotected

- Backup files contain the same visitor PII as the live database (names,
  phone numbers, emails, messages). Store them with the same access
  restrictions as the production database itself — never in a public cloud
  storage bucket, public repository, or unencrypted removable media.
- If backups are stored in cloud blob storage, ensure the container/bucket
  is **private** (not publicly listable or downloadable) and encrypted at
  rest, which most providers do by default but should be explicitly
  confirmed, not assumed.

## Incident Response Contact

Vedansh Software Services — `vedanshsoft@gmail.com` / `9172476575`. Until a
dedicated on-call/ops process exists, database incidents (corruption,
accidental data loss, suspected unauthorized access) should be reported
directly to this contact, who should then follow this document's restore
procedure against the most recent verified backup.
