using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using VedanshSoftware.Api.Common;
using VedanshSoftware.Api.DTOs;
using VedanshSoftware.Api.Models;
using VedanshSoftware.Api.Services;

namespace VedanshSoftware.Api.Controllers;

/// <summary>
/// Admin/Staff enquiry management. Both roles can view, search, update status, and add
/// notes on individual enquiries as part of day-to-day lead follow-up. Bulk export of all
/// enquiry data is intentionally restricted to the Admin role only (see AdminController).
/// </summary>
[ApiController]
[Route("api/enquiries")]
public class EnquiriesController : ControllerBase
{
    private readonly EnquiryService _enquiryService;
    private readonly ILogger<EnquiriesController> _logger;

    public EnquiriesController(EnquiryService enquiryService, ILogger<EnquiriesController> logger)
    {
        _enquiryService = enquiryService;
        _logger = logger;
    }

    /// <summary>Submit a new public enquiry. Rate limited and protected by a honeypot field.</summary>
    [HttpPost]
    [EnableRateLimiting("enquiry-submission")]
    [AllowAnonymous]
    public async Task<ActionResult<EnquiryConfirmationResponse>> Create([FromBody] CreateEnquiryRequest request, CancellationToken ct)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        // Honeypot: real visitors never see or fill this field. Pretend success to avoid tipping off bots.
        if (!string.IsNullOrWhiteSpace(request.WebsiteUrl))
        {
            _logger.LogWarning("Honeypot triggered for enquiry submission from {Ip}.", HttpContext.Connection.RemoteIpAddress);
            return Ok(new EnquiryConfirmationResponse
            {
                EnquiryReferenceNumber = ReferenceNumberGenerator.Generate(),
                SubmittedAt = DateTime.UtcNow,
                FullName = request.FullName,
                ProductInterestedIn = request.ProductInterestedIn
            });
        }

        var duplicate = await _enquiryService.FindRecentDuplicateAsync(request.MobileNumber, request.ProductInterestedIn, ct);
        if (duplicate is not null)
        {
            return Ok(duplicate.ToConfirmationResponse());
        }

        var enquiry = await _enquiryService.CreateAsync(request, ct);
        return Ok(enquiry.ToConfirmationResponse());
    }

    /// <summary>Retrieve a public confirmation by reference number (no sensitive data exposed).</summary>
    [HttpGet("confirmation/{referenceNumber}")]
    [AllowAnonymous]
    [EnableRateLimiting("enquiry-confirmation-lookup")]
    public async Task<ActionResult<EnquiryConfirmationResponse>> GetConfirmation(string referenceNumber, CancellationToken ct)
    {
        var enquiry = await _enquiryService.GetByReferenceAsync(referenceNumber, ct);
        if (enquiry is null)
        {
            return NotFound();
        }

        return Ok(enquiry.ToConfirmationResponse());
    }

    /// <summary>Admin: search/filter/paginate enquiries.</summary>
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<PagedResult<EnquiryListItemResponse>>> Search(
        [FromQuery] string? search,
        [FromQuery] ProductInterest? product,
        [FromQuery] EnquiryStatus? status,
        [FromQuery] string? city,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken ct = default)
    {
        var result = await _enquiryService.SearchAsync(search, product, status, city, fromDate, toDate, page, pageSize, ct);
        return Ok(result);
    }

    /// <summary>Admin: get full enquiry detail including notes.</summary>
    [HttpGet("{id:int}")]
    [Authorize]
    public async Task<ActionResult<EnquiryDetailResponse>> GetDetail(int id, CancellationToken ct)
    {
        var enquiry = await _enquiryService.GetDetailAsync(id, ct);
        if (enquiry is null)
        {
            return NotFound();
        }

        return Ok(enquiry.ToDetailResponse());
    }

    /// <summary>Admin: update enquiry status / assignment.</summary>
    [HttpPatch("{id:int}/status")]
    [Authorize]
    public async Task<ActionResult<EnquiryDetailResponse>> UpdateStatus(int id, [FromBody] UpdateEnquiryStatusRequest request, CancellationToken ct)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var updated = await _enquiryService.UpdateStatusAsync(id, request, ct);
        if (updated is null)
        {
            return NotFound();
        }

        var detail = await _enquiryService.GetDetailAsync(id, ct);
        return Ok(detail!.ToDetailResponse());
    }

    /// <summary>Admin: add a follow-up note to an enquiry.</summary>
    [HttpPost("{id:int}/notes")]
    [Authorize]
    public async Task<ActionResult<EnquiryNoteResponse>> AddNote(int id, [FromBody] AddEnquiryNoteRequest request, CancellationToken ct)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var createdBy = User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email)?.Value ?? "Unknown";
        var note = await _enquiryService.AddNoteAsync(id, request.Note, createdBy, ct);
        if (note is null)
        {
            return NotFound();
        }

        return Ok(new EnquiryNoteResponse
        {
            EnquiryNoteId = note.EnquiryNoteId,
            Note = note.Note,
            CreatedBy = note.CreatedBy,
            CreatedAt = note.CreatedAt
        });
    }
}
