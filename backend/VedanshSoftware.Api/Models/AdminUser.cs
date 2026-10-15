using Microsoft.AspNetCore.Identity;

namespace VedanshSoftware.Api.Models;

public class AdminUser : IdentityUser
{
    public string? DisplayName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public static class AdminRoles
{
    public const string Admin = "Admin";
    public const string Staff = "Staff";
}
