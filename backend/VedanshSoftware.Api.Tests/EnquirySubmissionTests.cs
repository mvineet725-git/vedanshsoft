using System.Net;
using System.Net.Http.Json;
using FluentAssertions;

namespace VedanshSoftware.Api.Tests;

/// <summary>
/// Each test gets its own CustomWebApplicationFactory (rather than IClassFixture sharing
/// one) because the enquiry-submission rate limiter partitions by caller IP, and every
/// request from an in-process TestServer reports the same loopback IP: sharing one app
/// instance across this class's 9 tests would trip the 5-per-10-minutes policy well before
/// the suite finishes. RateLimitingTests below verifies that policy directly instead.
/// </summary>
public class EnquirySubmissionTests : IDisposable
{
    private readonly CustomWebApplicationFactory _factory = new();

    public void Dispose() => _factory.Dispose();

    [Fact]
    public async Task Submitting_valid_enquiry_persists_it_and_returns_a_reference_number()
    {
        var client = _factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/enquiries", TestHelpers.ValidEnquiryPayload("11111111"));

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var body = await response.Content.ReadFromJsonAsync<EnquiryConfirmationDto>();
        body.Should().NotBeNull();
        body!.EnquiryReferenceNumber.Should().NotBeNullOrWhiteSpace();
        body.FullName.Should().Be("Test Visitor");

        // Confirm it's actually retrievable, i.e. really persisted, not just echoed back.
        var confirmation = await client.GetAsync($"/api/enquiries/confirmation/{body.EnquiryReferenceNumber}");
        confirmation.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Missing_required_fields_are_rejected_with_a_validation_error()
    {
        var client = _factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/enquiries", new { });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task Invalid_phone_number_is_rejected()
    {
        var client = _factory.CreateClient();
        var payload = TestHelpers.ValidEnquiryPayload("22222222") with { MobileNumber = "12345" }; // too short, doesn't start 6-9

        var response = await client.PostAsJsonAsync("/api/enquiries", payload);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task Missing_consent_is_rejected()
    {
        var client = _factory.CreateClient();
        var payload = TestHelpers.ValidEnquiryPayload("33333333") with { ConsentAccepted = false };

        var response = await client.PostAsJsonAsync("/api/enquiries", payload);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task Oversized_message_is_rejected()
    {
        var client = _factory.CreateClient();
        var payload = TestHelpers.ValidEnquiryPayload("44444444") with { Message = new string('x', 2001) }; // limit is 2000

        var response = await client.PostAsJsonAsync("/api/enquiries", payload);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task Honeypot_field_silently_drops_the_submission_without_an_error()
    {
        var client = _factory.CreateClient();
        var payload = TestHelpers.ValidEnquiryPayload("55555555") with { WebsiteUrl = "http://spambot.example" }; // a human would never fill this

        var response = await client.PostAsJsonAsync("/api/enquiries", payload);

        // Bots get a fake-success response (so they don't learn they were caught)...
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var body = await response.Content.ReadFromJsonAsync<EnquiryConfirmationDto>();

        // ...but the fake reference number must NOT resolve to a real stored enquiry.
        var confirmation = await client.GetAsync($"/api/enquiries/confirmation/{body!.EnquiryReferenceNumber}");
        confirmation.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Rapid_duplicate_submission_from_same_mobile_and_product_does_not_create_two_records()
    {
        var client = _factory.CreateClient();
        var payload = TestHelpers.ValidEnquiryPayload("66666666");

        var first = await client.PostAsJsonAsync("/api/enquiries", payload);
        var second = await client.PostAsJsonAsync("/api/enquiries", payload);

        first.StatusCode.Should().Be(HttpStatusCode.OK);
        second.StatusCode.Should().Be(HttpStatusCode.OK);

        var firstBody = await first.Content.ReadFromJsonAsync<EnquiryConfirmationDto>();
        var secondBody = await second.Content.ReadFromJsonAsync<EnquiryConfirmationDto>();

        secondBody!.EnquiryReferenceNumber.Should().Be(firstBody!.EnquiryReferenceNumber);
    }

    [Fact]
    public async Task Confirmation_lookup_for_unknown_reference_returns_not_found()
    {
        var client = _factory.CreateClient();

        var response = await client.GetAsync("/api/enquiries/confirmation/VSS-NOPE-000000000");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    private class EnquiryConfirmationDto
    {
        public string EnquiryReferenceNumber { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; }
        public string FullName { get; set; } = string.Empty;
        public int ProductInterestedIn { get; set; }
    }
}
