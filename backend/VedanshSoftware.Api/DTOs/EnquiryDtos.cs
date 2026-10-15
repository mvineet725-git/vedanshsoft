using System.ComponentModel.DataAnnotations;
using VedanshSoftware.Api.Common;
using VedanshSoftware.Api.Models;

namespace VedanshSoftware.Api.DTOs;

public class CreateEnquiryRequest
{
    [Required(ErrorMessage = "Full name is required.")]
    [MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Mobile number is required.")]
    [MaxLength(20)]
    [PhoneValidation]
    public string MobileNumber { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Enter a valid email address.")]
    [MaxLength(254)]
    public string? Email { get; set; }

    [MaxLength(150)]
    public string? OrganizationName { get; set; }

    [MaxLength(80)]
    public string? OrganizationType { get; set; }

    [MaxLength(100)]
    public string? City { get; set; }

    [Required(ErrorMessage = "Please select the product you are interested in.")]
    public ProductInterest ProductInterestedIn { get; set; }

    public PreferredContactMethod? PreferredContactMethod { get; set; }

    [MaxLength(2000)]
    public string? Message { get; set; }

    [Required(ErrorMessage = "You must accept the privacy policy to continue.")]
    [Range(typeof(bool), "true", "true", ErrorMessage = "You must accept the privacy policy to continue.")]
    public bool ConsentAccepted { get; set; }

    public EnquirySource EnquirySource { get; set; } = EnquirySource.Website;

    /// <summary>Honeypot field. Must stay empty; bots that fill it are silently dropped.</summary>
    public string? WebsiteUrl { get; set; }
}

public class EnquiryConfirmationResponse
{
    public string EnquiryReferenceNumber { get; set; } = string.Empty;
    public DateTime SubmittedAt { get; set; }
    public string FullName { get; set; } = string.Empty;
    public ProductInterest ProductInterestedIn { get; set; }
}

public class EnquiryListItemResponse
{
    public int EnquiryId { get; set; }
    public string EnquiryReferenceNumber { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? OrganizationName { get; set; }
    public string? City { get; set; }
    public ProductInterest ProductInterestedIn { get; set; }
    public EnquiryStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class EnquiryDetailResponse : EnquiryListItemResponse
{
    public string? OrganizationType { get; set; }
    public PreferredContactMethod? PreferredContactMethod { get; set; }
    public string? Message { get; set; }
    public EnquirySource EnquirySource { get; set; }
    public string? AssignedTo { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<EnquiryNoteResponse> Notes { get; set; } = new();
}

public class EnquiryNoteResponse
{
    public int EnquiryNoteId { get; set; }
    public string Note { get; set; } = string.Empty;
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class UpdateEnquiryStatusRequest
{
    [Required]
    public EnquiryStatus Status { get; set; }

    [MaxLength(450)]
    public string? AssignedTo { get; set; }
}

public class AddEnquiryNoteRequest
{
    [Required(ErrorMessage = "Note text is required.")]
    [MaxLength(2000)]
    public string Note { get; set; } = string.Empty;
}

public class PagedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => PageSize == 0 ? 0 : (int)Math.Ceiling(TotalCount / (double)PageSize);
}

public class EnquiryDashboardSummary
{
    public int TotalEnquiries { get; set; }
    public int NewEnquiries { get; set; }
    public Dictionary<string, int> EnquiriesByProduct { get; set; } = new();
    public Dictionary<string, int> EnquiriesByStatus { get; set; } = new();
    public List<EnquiryListItemResponse> RecentEnquiries { get; set; } = new();
}
