using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace VedanshSoftware.Api.Tests;

/// <summary>
/// Boots the real app (Program.cs) against a throwaway SQLite file per test-class instance,
/// so integration tests exercise the actual DI wiring, EF Core migrations, Identity, and JWT
/// auth pipeline rather than mocks.
/// </summary>
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    public readonly string DbPath = Path.Combine(Path.GetTempPath(), $"vsite-tests-{Guid.NewGuid():N}.db");

    protected override void ConfigureWebHost(Microsoft.AspNetCore.Hosting.IWebHostBuilder builder)
    {
        // WebApplicationFactory defaults to the "Development" environment already,
        // which is what Program.cs needs to skip HSTS and allow Swagger wiring.
        //
        // Development also loads the real developer's `dotnet user-secrets` (e.g. a
        // real Jwt:Secret / SQL Server connection string set for local manual runs).
        // ConfigureAppConfiguration's own AddInMemoryCollection is appended to the
        // SAME chain and does not reliably out-rank user secrets depending on
        // provider registration order, so these must be set via UseSetting, which
        // WebApplicationFactory guarantees wins over everything the host itself adds.
        builder.UseSetting("DatabaseProvider", "Sqlite");
        builder.UseSetting("ConnectionStrings:Sqlite", $"Data Source={DbPath}");
        builder.UseSetting("Jwt:Secret", "test-secret-at-least-32-bytes-long-for-hs256!!");
        builder.UseSetting("Jwt:Issuer", "vsite-tests");
        builder.UseSetting("Jwt:Audience", "vsite-tests");
        builder.UseSetting("Jwt:ExpiryMinutes", "60");
        builder.UseSetting("Cors:AllowedOrigins:0", "http://localhost:5275");
        builder.UseSetting("Email:Enabled", "false");
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);
        try
        {
            if (File.Exists(DbPath)) File.Delete(DbPath);
            var shm = DbPath + "-shm";
            var wal = DbPath + "-wal";
            if (File.Exists(shm)) File.Delete(shm);
            if (File.Exists(wal)) File.Delete(wal);
        }
        catch
        {
            // Best-effort cleanup; a leftover temp file doesn't fail the test run.
        }
    }
}
