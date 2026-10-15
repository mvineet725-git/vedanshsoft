using Microsoft.AspNetCore.Identity;
using VedanshSoftware.Api.Models;

namespace VedanshSoftware.Api.Data;

/// <summary>
/// Provisions the Admin/Staff roles and, only when ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD
/// environment variables are both set, creates the first admin account. No default production
/// password is ever hardcoded; without those variables, seeding is a no-op and an admin must
/// be created via the documented provisioning script (see docs/ADMIN_PROVISIONING.md).
/// </summary>
public static class AdminSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<AdminUser>>();
        var logger = services.GetRequiredService<ILoggerFactory>().CreateLogger("AdminSeeder");

        foreach (var role in new[] { AdminRoles.Admin, AdminRoles.Staff })
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        var seedEmail = Environment.GetEnvironmentVariable("ADMIN_SEED_EMAIL");
        var seedPassword = Environment.GetEnvironmentVariable("ADMIN_SEED_PASSWORD");

        if (string.IsNullOrWhiteSpace(seedEmail) || string.IsNullOrWhiteSpace(seedPassword))
        {
            logger.LogInformation("ADMIN_SEED_EMAIL/ADMIN_SEED_PASSWORD not set; skipping initial admin provisioning.");
            return;
        }

        var existing = await userManager.FindByEmailAsync(seedEmail);
        if (existing is not null)
        {
            logger.LogInformation("Admin account {Email} already exists; skipping seeding.", seedEmail);
            return;
        }

        var admin = new AdminUser
        {
            UserName = seedEmail,
            Email = seedEmail,
            DisplayName = "Administrator",
            EmailConfirmed = true,
            CreatedAt = DateTime.UtcNow
        };

        var result = await userManager.CreateAsync(admin, seedPassword);
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(admin, AdminRoles.Admin);
            logger.LogInformation("Seeded initial admin account {Email}.", seedEmail);
        }
        else
        {
            logger.LogError("Failed to seed initial admin account: {Errors}",
                string.Join("; ", result.Errors.Select(e => e.Description)));
        }
    }
}
