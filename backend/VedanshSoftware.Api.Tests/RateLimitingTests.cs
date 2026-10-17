using System.Net;
using System.Net.Http.Json;
using FluentAssertions;

namespace VedanshSoftware.Api.Tests;

/// <summary>
/// Verifies the sliding-window rate limiters configured in Program.cs actually reject
/// excess requests, using a dedicated factory per test so these don't interfere with
/// (or get interfered with by) the functional tests in EnquirySubmissionTests.
/// </summary>
public class RateLimitingTests : IDisposable
{
    private readonly CustomWebApplicationFactory _factory = new();

    public void Dispose() => _factory.Dispose();

    [Fact]
    public async Task Enquiry_submission_is_rate_limited_after_the_configured_permit_count()
    {
        var client = _factory.CreateClient();

        // Policy allows 5 per 10 minutes per IP (Program.cs "enquiry-submission").
        HttpResponseMessage? last = null;
        for (var i = 0; i < 5; i++)
        {
            last = await client.PostAsJsonAsync("/api/enquiries", TestHelpers.ValidEnquiryPayload($"{i:D8}"));
        }
        last!.StatusCode.Should().Be(HttpStatusCode.OK);

        var sixth = await client.PostAsJsonAsync("/api/enquiries", TestHelpers.ValidEnquiryPayload("99999999"));

        sixth.StatusCode.Should().Be(HttpStatusCode.TooManyRequests);
    }

    [Fact]
    public async Task Login_attempts_are_rate_limited_after_the_configured_permit_count()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var client = _factory.CreateClient();

        // Policy allows 10 per 15 minutes per IP (Program.cs "auth-login").
        HttpResponseMessage? last = null;
        for (var i = 0; i < 10; i++)
        {
            last = await client.PostAsJsonAsync("/api/auth/login", new { email = TestHelpers.TestAdminEmail, password = "WrongPassword!" });
        }
        last!.StatusCode.Should().Be(HttpStatusCode.Unauthorized);

        var eleventh = await client.PostAsJsonAsync("/api/auth/login", new { email = TestHelpers.TestAdminEmail, password = "WrongPassword!" });

        eleventh.StatusCode.Should().Be(HttpStatusCode.TooManyRequests);
    }
}
