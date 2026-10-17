using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using FluentAssertions;

namespace VedanshSoftware.Api.Tests;

/// <summary>
/// Exercises the full lead-management journey end to end: a visitor submits an enquiry,
/// then an authenticated admin finds it, updates its status, and adds a follow-up note —
/// mirroring the "Society customer" / "Education customer" acceptance journeys.
/// </summary>
public class AdminEnquiryManagementTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly CustomWebApplicationFactory _factory;

    public AdminEnquiryManagementTests(CustomWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Admin_can_view_update_status_and_add_a_note_to_a_submitted_enquiry()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var publicClient = _factory.CreateClient();
        var adminClient = await AuthenticatedClientAsync(TestHelpers.TestAdminEmail, TestHelpers.TestAdminPassword);

        var submitResponse = await publicClient.PostAsJsonAsync("/api/enquiries", TestHelpers.ValidEnquiryPayload("77777777"));
        submitResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var confirmation = await submitResponse.Content.ReadFromJsonAsync<ConfirmationDto>();

        var searchResponse = await adminClient.GetAsync($"/api/enquiries?search={confirmation!.EnquiryReferenceNumber}");
        searchResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var searchResult = await searchResponse.Content.ReadFromJsonAsync<PagedResultDto>();
        searchResult!.Items.Should().ContainSingle(i => i.EnquiryReferenceNumber == confirmation.EnquiryReferenceNumber);
        var enquiryId = searchResult.Items.Single().EnquiryId;

        var statusUpdateResponse = await adminClient.PatchAsJsonAsync($"/api/enquiries/{enquiryId}/status", new { status = 1 }); // Contacted
        statusUpdateResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var updated = await statusUpdateResponse.Content.ReadFromJsonAsync<DetailDto>();
        updated!.Status.Should().Be(1);

        var noteResponse = await adminClient.PostAsJsonAsync($"/api/enquiries/{enquiryId}/notes", new { note = "Called visitor, scheduling a demo." });
        noteResponse.StatusCode.Should().Be(HttpStatusCode.OK);

        var detailResponse = await adminClient.GetAsync($"/api/enquiries/{enquiryId}");
        var detail = await detailResponse.Content.ReadFromJsonAsync<DetailDto>();
        detail!.Notes.Should().ContainSingle(n => n.Note == "Called visitor, scheduling a demo.");
        detail.Status.Should().Be(1);
    }

    [Fact]
    public async Task Updating_status_of_a_nonexistent_enquiry_returns_not_found()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var adminClient = await AuthenticatedClientAsync(TestHelpers.TestAdminEmail, TestHelpers.TestAdminPassword);

        var response = await adminClient.PatchAsJsonAsync("/api/enquiries/999999/status", new { status = 1 });

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Dashboard_summary_reflects_a_newly_submitted_enquiry()
    {
        await TestHelpers.SeedAdminAndStaffAsync(_factory);
        var publicClient = _factory.CreateClient();
        var adminClient = await AuthenticatedClientAsync(TestHelpers.TestAdminEmail, TestHelpers.TestAdminPassword);

        await publicClient.PostAsJsonAsync("/api/enquiries", TestHelpers.ValidEnquiryPayload("88888888"));

        var response = await adminClient.GetAsync("/api/admin/dashboard-summary");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var summary = await response.Content.ReadFromJsonAsync<DashboardSummaryDto>();
        summary!.TotalEnquiries.Should().BeGreaterThanOrEqualTo(1);
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
    }

    private class ConfirmationDto
    {
        public string EnquiryReferenceNumber { get; set; } = string.Empty;
    }

    private class PagedResultDto
    {
        public List<ListItemDto> Items { get; set; } = new();
        public int TotalCount { get; set; }
    }

    private class ListItemDto
    {
        public int EnquiryId { get; set; }
        public string EnquiryReferenceNumber { get; set; } = string.Empty;
    }

    private class DetailDto
    {
        public int Status { get; set; }
        public List<NoteDto> Notes { get; set; } = new();
    }

    private class NoteDto
    {
        public string Note { get; set; } = string.Empty;
    }

    private class DashboardSummaryDto
    {
        public int TotalEnquiries { get; set; }
    }
}
