using Microsoft.Extensions.Options;
using MimeKit;
using VedanshSoftware.Api.Models;

namespace VedanshSoftware.Api.Services.Email;

/// <summary>
/// Sends enquiry emails via SMTP (configured for Gmail by default). When no credentials
/// are configured (Email:Enabled=false or SmtpPassword empty), emails are logged instead
/// of sent so the app keeps working in development without fake "delivered" claims.
/// </summary>
public class SmtpEmailService : IEmailService
{
    private readonly EmailOptions _options;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IOptions<EmailOptions> options, ILogger<SmtpEmailService> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public Task SendEnquiryNotificationToOwnerAsync(ContactEnquiry enquiry, CancellationToken ct = default)
    {
        var subject = $"New Enquiry [{enquiry.EnquiryReferenceNumber}] - {enquiry.ProductInterestedIn}";
        var body = $"""
            A new enquiry has been submitted on the Vedansh Software Services website.

            Reference Number: {enquiry.EnquiryReferenceNumber}
            Name: {enquiry.FullName}
            Mobile: {enquiry.MobileNumber}
            Email: {enquiry.Email ?? "Not provided"}
            Organization: {enquiry.OrganizationName ?? "Not provided"}
            City: {enquiry.City ?? "Not provided"}
            Product Interested In: {enquiry.ProductInterestedIn}
            Preferred Contact Method: {enquiry.PreferredContactMethod?.ToString() ?? "Not specified"}
            Message: {enquiry.Message ?? "(none)"}
            Submitted At (UTC): {enquiry.CreatedAt:u}
            Source: {enquiry.EnquirySource}
            """;

        return SendAsync(_options.OwnerNotificationAddress, subject, body, ct);
    }

    public Task SendEnquiryConfirmationToVisitorAsync(ContactEnquiry enquiry, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(enquiry.Email))
        {
            _logger.LogInformation("Skipping visitor confirmation email for {Reference}: no email address provided.", enquiry.EnquiryReferenceNumber);
            return Task.CompletedTask;
        }

        var subject = $"We received your enquiry - Reference {enquiry.EnquiryReferenceNumber}";
        var body = $"""
            Dear {enquiry.FullName},

            Thank you for your interest in Vedansh Software Services. We have received your enquiry
            regarding {enquiry.ProductInterestedIn} and our team will contact you shortly.

            Your enquiry reference number is: {enquiry.EnquiryReferenceNumber}

            If you have any urgent questions, you can reach us at:
            Phone: 9172476575
            Email: vedanshsoft@gmail.com

            Regards,
            Vedansh Software Services
            """;

        return SendAsync(enquiry.Email, subject, body, ct);
    }

    private async Task SendAsync(string toAddress, string subject, string body, CancellationToken ct)
    {
        if (!_options.Enabled || string.IsNullOrWhiteSpace(_options.SmtpPassword) || string.IsNullOrWhiteSpace(_options.SmtpUser))
        {
            _logger.LogWarning(
                "Email sending is not configured (Email:Enabled={Enabled}). Would have sent to {To}: {Subject}",
                _options.Enabled, toAddress, subject);
            return;
        }

        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_options.FromName, _options.FromAddress));
            message.To.Add(MailboxAddress.Parse(toAddress));
            message.Subject = subject;
            message.Body = new TextPart("plain") { Text = body };

            using var client = new MailKit.Net.Smtp.SmtpClient();
            await client.ConnectAsync(_options.SmtpHost, _options.SmtpPort, MailKit.Security.SecureSocketOptions.StartTls, ct);
            await client.AuthenticateAsync(_options.SmtpUser, _options.SmtpPassword, ct);
            await client.SendAsync(message, ct);
            await client.DisconnectAsync(true, ct);

            _logger.LogInformation("Email sent to {To}: {Subject}", toAddress, subject);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {To}: {Subject}", toAddress, subject);
        }
    }
}
