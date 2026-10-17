using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VedanshSoftware.Api.DTOs;
using VedanshSoftware.Api.Models;
using VedanshSoftware.Api.Services;

namespace VedanshSoftware.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<AdminUser> _userManager;
    private readonly SignInManager<AdminUser> _signInManager;
    private readonly JwtTokenService _tokenService;
    private readonly ILogger<AuthController> _logger;
    private readonly IPasswordHasher<AdminUser> _passwordHasher;

    // A real Identity PasswordHasher output (for an arbitrary password, no corresponding
    // real account) used only to burn equivalent CPU time when the submitted email doesn't
    // exist. Must be a genuine PasswordHasher.HashPassword() result, not a hand-edited
    // string: VerifyHashedPassword parses this value's binary layout (format marker, PRF,
    // iteration count, salt), so an invalid value throws a FormatException instead of
    // returning "failed" - which previously turned every login attempt for a non-existent
    // email into an unhandled 500 rather than a 401, and skipped the timing-parity check
    // entirely.
    private const string DummyPasswordHash = "AQAAAAIAAYagAAAAEF/svHeEex3ZPvWoooX0jS56f0UT9OtLCTmV6GgqXkr+E5cREWlMFhkhfsrFvlaH0w==";

    public AuthController(
        UserManager<AdminUser> userManager,
        SignInManager<AdminUser> signInManager,
        JwtTokenService tokenService,
        ILogger<AuthController> logger,
        IPasswordHasher<AdminUser> passwordHasher)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _logger = logger;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting("auth-login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            // Run a dummy password hash verification so the response time for a
            // non-existent email matches that of a wrong password, avoiding a timing
            // side-channel that could otherwise be used to enumerate admin accounts.
            _passwordHasher.VerifyHashedPassword(new AdminUser(), DummyPasswordHash, request.Password);
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
        if (!result.Succeeded)
        {
            _logger.LogWarning("Failed admin login attempt for {Email}.", request.Email);
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var roles = await _userManager.GetRolesAsync(user);
        var (token, expiresAt) = _tokenService.GenerateToken(user, roles);

        return Ok(new LoginResponse
        {
            Token = token,
            ExpiresAt = expiresAt,
            Email = user.Email ?? string.Empty,
            DisplayName = user.DisplayName,
            Roles = roles.ToList()
        });
    }

    [HttpGet("me")]
    [Authorize]
    public ActionResult<object> Me()
    {
        return Ok(new
        {
            email = User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email)?.Value,
            displayName = User.FindFirst("displayName")?.Value,
            roles = User.Claims.Where(c => c.Type == System.Security.Claims.ClaimTypes.Role).Select(c => c.Value)
        });
    }
}
