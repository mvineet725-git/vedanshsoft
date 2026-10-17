using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace VedanshSoftware.Api.Data;

/// <summary>
/// Gives the SQL Server migration set its own identity
/// (`dotnet ef migrations add --context SqlServerAppDbContext`), separate from
/// <see cref="AppDbContext"/>'s SQLite migrations. Also registered as the
/// runtime implementation for <see cref="AppDbContext"/> when
/// DatabaseProvider=SqlServer, via `AddDbContext&lt;AppDbContext,
/// SqlServerAppDbContext&gt;` in Program.cs, so EF Core resolves the type its
/// SQL Server migrations are actually tagged for.
/// </summary>
public class SqlServerAppDbContext : AppDbContext
{
    // AddDbContext<AppDbContext, SqlServerAppDbContext> registers a
    // DbContextOptions<SqlServerAppDbContext>, not DbContextOptions<AppDbContext>,
    // so the options extensions (connection string, provider, etc.) are copied
    // across to the base type AppDbContext's constructor expects.
    public SqlServerAppDbContext(DbContextOptions<SqlServerAppDbContext> options)
        : base(Rewrap(options))
    {
    }

    private static DbContextOptions<AppDbContext> Rewrap(DbContextOptions<SqlServerAppDbContext> options)
    {
        var builder = new DbContextOptionsBuilder<AppDbContext>();
        foreach (var extension in options.Extensions)
        {
            ((IDbContextOptionsBuilderInfrastructure)builder).AddOrUpdateExtension(extension);
        }
        return builder.Options;
    }
}
