using VedanshSoftware.Api.DTOs;
using VedanshSoftware.Api.Models;

namespace VedanshSoftware.Api.Common;

public static class MappingExtensions
{
    public static EnquiryConfirmationResponse ToConfirmationResponse(this ContactEnquiry enquiry) => new()
    {
        EnquiryReferenceNumber = enquiry.EnquiryReferenceNumber,
        SubmittedAt = enquiry.CreatedAt,
        FullName = enquiry.FullName,
        ProductInterestedIn = enquiry.ProductInterestedIn
    };

    public static EnquiryDetailResponse ToDetailResponse(this ContactEnquiry enquiry) => new()
    {
        EnquiryId = enquiry.EnquiryId,
        EnquiryReferenceNumber = enquiry.EnquiryReferenceNumber,
        FullName = enquiry.FullName,
        MobileNumber = enquiry.MobileNumber,
        Email = enquiry.Email,
        OrganizationName = enquiry.OrganizationName,
        OrganizationType = enquiry.OrganizationType,
        City = enquiry.City,
        ProductInterestedIn = enquiry.ProductInterestedIn,
        PreferredContactMethod = enquiry.PreferredContactMethod,
        Message = enquiry.Message,
        EnquirySource = enquiry.EnquirySource,
        Status = enquiry.Status,
        AssignedTo = enquiry.AssignedTo,
        NextFollowUpDate = enquiry.NextFollowUpDate,
        CreatedAt = enquiry.CreatedAt,
        UpdatedAt = enquiry.UpdatedAt,
        Notes = enquiry.Notes.Select(n => new EnquiryNoteResponse
        {
            EnquiryNoteId = n.EnquiryNoteId,
            Note = n.Note,
            CreatedBy = n.CreatedBy,
            CreatedAt = n.CreatedAt
        }).ToList()
    };
}
