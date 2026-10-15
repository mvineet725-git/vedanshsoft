namespace VedanshSoftware.Api.Services.Email;

public interface IEmailService
{
    Task SendEnquiryNotificationToOwnerAsync(Models.ContactEnquiry enquiry, CancellationToken ct = default);
    Task SendEnquiryConfirmationToVisitorAsync(Models.ContactEnquiry enquiry, CancellationToken ct = default);
}
