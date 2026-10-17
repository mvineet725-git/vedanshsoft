using System.ComponentModel.DataAnnotations;

namespace VedanshSoftware.Api.Models;

public enum ProductInterest
{
    SocietyManagementSoftware = 0,
    EducationManagementSoftware = 1,
    CustomSoftwareDevelopment = 2,
    OtherEnquiry = 3
}

public enum PreferredContactMethod
{
    Phone = 0,
    Email = 1,
    WhatsApp = 2
}

public enum EnquiryStatus
{
    New = 0,
    Contacted = 1,
    DemoScheduled = 2,
    FollowUpRequired = 3,
    Converted = 4,
    Closed = 5,
    Qualified = 6,
    Proposal = 7
}

public enum EnquirySource
{
    Website = 0,
    ContactPage = 1,
    SocietyPage = 2,
    EducationPage = 3,
    HomePage = 4,
    Other = 5
}

public class ContactEnquiry
{
    public int EnquiryId { get; set; }

    // Format: VSS-yyyyMMdd-XXXXXXXXX (4 + 8 + 1 + 9 = 22 chars); 30 leaves headroom
    // for a longer suffix later without another migration.
    [MaxLength(30)]
    public string EnquiryReferenceNumber { get; set; } = string.Empty;

    [MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(20)]
    public string MobileNumber { get; set; } = string.Empty;

    [MaxLength(254)]
    public string? Email { get; set; }

    [MaxLength(150)]
    public string? OrganizationName { get; set; }

    [MaxLength(80)]
    public string? OrganizationType { get; set; }

    [MaxLength(100)]
    public string? City { get; set; }

    public ProductInterest ProductInterestedIn { get; set; }

    public PreferredContactMethod? PreferredContactMethod { get; set; }

    [MaxLength(2000)]
    public string? Message { get; set; }

    public bool ConsentAccepted { get; set; }

    public EnquirySource EnquirySource { get; set; }

    public EnquiryStatus Status { get; set; } = EnquiryStatus.New;

    [MaxLength(450)]
    public string? AssignedTo { get; set; }

    public DateTime? NextFollowUpDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public List<EnquiryNote> Notes { get; set; } = new();
}

public class EnquiryNote
{
    public int EnquiryNoteId { get; set; }

    public int EnquiryId { get; set; }
    public ContactEnquiry? Enquiry { get; set; }

    [MaxLength(2000)]
    public string Note { get; set; } = string.Empty;

    [MaxLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
