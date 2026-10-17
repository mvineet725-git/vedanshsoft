using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using VedanshSoftware.Api.Models;

namespace VedanshSoftware.Api.Tests;

public static class TestHelpers
{
    public const string TestAdminEmail = "admin@test.local";
    public const string TestAdminPassword = "Test-Passw0rd!";
    public const string TestStaffEmail = "staff@test.local";
    public const string TestStaffPassword = "Test-Passw0rd!";

    public static async Task SeedAdminAndStaffAsync(CustomWebApplicationFactory factory)
    {
        using var scope = factory.Services.CreateScope();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AdminUser>>();

        foreach (var role in new[] { AdminRoles.Admin, AdminRoles.Staff })
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        await CreateUserIfMissingAsync(userManager, TestAdminEmail, TestAdminPassword, AdminRoles.Admin);
        await CreateUserIfMissingAsync(userManager, TestStaffEmail, TestStaffPassword, AdminRoles.Staff);
    }

    private static async Task CreateUserIfMissingAsync(UserManager<AdminUser> userManager, string email, string password, string role)
    {
        if (await userManager.FindByEmailAsync(email) is not null)
        {
            return;
        }

        var user = new AdminUser { UserName = email, Email = email, DisplayName = email, EmailConfirmed = true };
        var result = await userManager.CreateAsync(user, password);
        if (!result.Succeeded)
        {
            throw new InvalidOperationException(
                $"Failed to seed test user {email}: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }

        await userManager.AddToRoleAsync(user, role);
    }

    public static EnquiryPayload ValidEnquiryPayload(string mobileSuffix) => new()
    {
        FullName = "Test Visitor",
        MobileNumber = "98" + mobileSuffix.PadLeft(8, '0'),
        Email = "visitor@test.local",
        OrganizationName = "Test Society",
        OrganizationType = "Housing Society",
        City = "Pune",
        ProductInterestedIn = 0, // SocietyManagementSoftware
        PreferredContactMethod = 1, // Email
        Message = "Looking for a demo.",
        ConsentAccepted = true,
        EnquirySource = 0, // Website
        WebsiteUrl = "" // honeypot, must stay empty
    };
}

/// <summary>Mirrors CreateEnquiryRequest's JSON shape; a record so tests can tweak one field via `with`.</summary>
public record EnquiryPayload
{
    public string FullName { get; init; } = string.Empty;
    public string MobileNumber { get; init; } = string.Empty;
    public string? Email { get; init; }
    public string? OrganizationName { get; init; }
    public string? OrganizationType { get; init; }
    public string? City { get; init; }
    public int ProductInterestedIn { get; init; }
    public int? PreferredContactMethod { get; init; }
    public string? Message { get; init; }
    public bool ConsentAccepted { get; init; }
    public int EnquirySource { get; init; }
    public string? WebsiteUrl { get; init; }
}
