using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using FluentAssertions;

namespace VedanshSoftware.Api.Tests;

public class AuthAndAuthorizationTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly CustomWebApplicationFactory _factory;

    public AuthAndAuthorizationTests(CustomWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Valid_admin_credentials_return_a_working_jwt()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var client = _factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = TestHelpers.TestAdminEmail,
            password = TestHelpers.TestAdminPassword
        });

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var body = await response.Content.ReadFromJsonAsync<LoginDto>();
        body!.Token.Should().NotBeNullOrWhiteSpace();
        body.Roles.Should().Contain("Admin");
    }

    [Fact]
    public async Task Wrong_password_is_rejected()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var client = _factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = TestHelpers.TestAdminEmail,
            password = "WrongPassword123!"
        });

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Nonexistent_email_is_rejected_the_same_way_as_a_wrong_password()
    {
        var client = _factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "nobody-such-user@test.local",
            password = "Whatever123!"
        });

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Unauthenticated_request_to_admin_dashboard_is_rejected()
    {
        var client = _factory.CreateClient();

        var response = await client.GetAsync("/api/admin/dashboard-summary");

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Unauthenticated_request_to_list_enquiries_is_rejected()
    {
        var client = _factory.CreateClient();

        var response = await client.GetAsync("/api/enquiries");

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Unauthenticated_request_to_update_enquiry_status_is_rejected()
    {
        var client = _factory.CreateClient();

        var response = await client.PatchAsJsonAsync("/api/enquiries/1/status", new { status = 1 });

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Staff_role_cannot_access_the_admin_only_csv_export()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var client = await AuthenticatedClientAsync(TestHelpers.TestStaffEmail, TestHelpers.TestStaffPassword);

        var response = await client.GetAsync("/api/admin/enquiries/export");

        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

    [Fact]
    public async Task Admin_role_can_access_the_csv_export()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var client = await AuthenticatedClientAsync(TestHelpers.TestAdminEmail, TestHelpers.TestAdminPassword);

        var response = await client.GetAsync("/api/admin/enquiries/export");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        response.Content.Headers.ContentType!.MediaType.Should().Be("text/csv");
    }

    [Fact]
    public async Task Staff_role_can_still_view_and_search_enquiries()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var client = await AuthenticatedClientAsync(TestHelpers.TestStaffEmail, TestHelpers.TestStaffPassword);

        var response = await client.GetAsync("/api/enquiries");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    private async Task<HttpClient> AuthenticatedClientAsync(string email, string password)
    {
        var client = _factory.CreateClient();
        var loginResponse = await client.PostAsJsonAsync("/api/auth/login", new { email, password });
        loginResponse.EnsureSuccessStatusCode();
        var login = await loginResponse.Content.ReadFromJsonAsync<LoginDto>();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", login!.Token);
        return client;
    }

    private class LoginDto
    {
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? DisplayName { get; set; }
        public List<string> Roles { get; set; } = new();
    }
}
