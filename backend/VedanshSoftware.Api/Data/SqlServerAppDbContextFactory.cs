using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace VedanshSoftware.Api.Data;

/// <summary>
/// Design-time factory so `dotnet ef migrations add --context SqlServerAppDbContext`
/// knows to target SQL Server. Only used by EF Core tooling (its connection
/// string is a design-time placeholder); the real connection string is
/// supplied at runtime in Program.cs.
/// </summary>
public class SqlServerAppDbContextFactory : IDesignTimeDbContextFactory<SqlServerAppDbContext>
{
    public SqlServerAppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<SqlServerAppDbContext>();
        optionsBuilder.UseSqlServer(
            "Server=localhost;Database=DesignTimeOnly;TrustServerCertificate=True;",
            sql => sql.MigrationsAssembly("VedanshSoftware.Api").MigrationsHistoryTable("__EFMigrationsHistory"));

        return new SqlServerAppDbContext(optionsBuilder.Options);
    }
}
