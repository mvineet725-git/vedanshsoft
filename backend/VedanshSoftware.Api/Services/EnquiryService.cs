using Microsoft.EntityFrameworkCore;
using VedanshSoftware.Api.Common;
using VedanshSoftware.Api.Data;
using VedanshSoftware.Api.DTOs;
using VedanshSoftware.Api.Models;
using VedanshSoftware.Api.Services.Email;

namespace VedanshSoftware.Api.Services;

public class EnquiryService
{
    private readonly AppDbContext _db;
    private readonly IEmailService _emailService;
    private readonly ILogger<EnquiryService> _logger;

    public EnquiryService(AppDbContext db, IEmailService emailService, ILogger<EnquiryService> logger)
    {
        _db = db;
        _emailService = emailService;
        _logger = logger;
    }

    /// <summary>
    /// Returns an existing enquiry if the same mobile number submitted the same product
    /// interest within the last 2 minutes, to absorb accidental double-submits (e.g. a
    /// double click or a retried request) without creating duplicate records.
    /// </summary>
    public async Task<ContactEnquiry?> FindRecentDuplicateAsync(string mobileNumber, ProductInterest product, CancellationToken ct = default)
    {
        var cutoff = DateTime.UtcNow.AddMinutes(-2);
        return await _db.ContactEnquiries
            .Where(e => e.MobileNumber == mobileNumber.Trim() && e.ProductInterestedIn == product && e.CreatedAt >= cutoff)
            .OrderByDescending(e => e.CreatedAt)
            .FirstOrDefaultAsync(ct);
    }

    public async Task<ContactEnquiry> CreateAsync(CreateEnquiryRequest request, CancellationToken ct = default)
    {
        var enquiry = new ContactEnquiry
        {
            EnquiryReferenceNumber = await GenerateUniqueReferenceAsync(ct),
            FullName = request.FullName.Trim(),
            MobileNumber = request.MobileNumber.Trim(),
            Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim(),
            OrganizationName = string.IsNullOrWhiteSpace(request.OrganizationName) ? null : request.OrganizationName.Trim(),
            OrganizationType = string.IsNullOrWhiteSpace(request.OrganizationType) ? null : request.OrganizationType.Trim(),
            City = string.IsNullOrWhiteSpace(request.City) ? null : request.City.Trim(),
            ProductInterestedIn = request.ProductInterestedIn,
            PreferredContactMethod = request.PreferredContactMethod,
            Message = string.IsNullOrWhiteSpace(request.Message) ? null : request.Message.Trim(),
            ConsentAccepted = request.ConsentAccepted,
            EnquirySource = request.EnquirySource,
            Status = EnquiryStatus.New,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.ContactEnquiries.Add(enquiry);
        await _db.SaveChangesAsync(ct);

        try
        {
            await _emailService.SendEnquiryNotificationToOwnerAsync(enquiry, ct);
            await _emailService.SendEnquiryConfirmationToVisitorAsync(enquiry, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Enquiry {Reference} saved, but notification email dispatch failed.", enquiry.EnquiryReferenceNumber);
        }

        return enquiry;
    }

    private async Task<string> GenerateUniqueReferenceAsync(CancellationToken ct)
    {
        for (var attempt = 0; attempt < 5; attempt++)
        {
            var candidate = ReferenceNumberGenerator.Generate();
            var exists = await _db.ContactEnquiries.AnyAsync(e => e.EnquiryReferenceNumber == candidate, ct);
            if (!exists)
            {
                return candidate;
            }
        }

        throw new InvalidOperationException("Unable to generate a unique enquiry reference number.");
    }

    public async Task<ContactEnquiry?> GetByReferenceAsync(string referenceNumber, CancellationToken ct = default)
    {
        return await _db.ContactEnquiries
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.EnquiryReferenceNumber == referenceNumber, ct);
    }

    public async Task<PagedResult<EnquiryListItemResponse>> SearchAsync(
        string? search,
        ProductInterest? product,
        EnquiryStatus? status,
        string? city,
        DateTime? fromDate,
        DateTime? toDate,
        int page,
        int pageSize,
        CancellationToken ct = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _db.ContactEnquiries.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(e =>
                e.FullName.Contains(term) ||
                e.MobileNumber.Contains(term) ||
                (e.OrganizationName != null && e.OrganizationName.Contains(term)) ||
                e.EnquiryReferenceNumber.Contains(term));
        }

        if (product.HasValue)
        {
            query = query.Where(e => e.ProductInterestedIn == product.Value);
        }

        if (status.HasValue)
        {
            query = query.Where(e => e.Status == status.Value);
        }

        if (!string.IsNullOrWhiteSpace(city))
        {
            query = query.Where(e => e.City != null && e.City.Contains(city));
        }

        if (fromDate.HasValue)
        {
            query = query.Where(e => e.CreatedAt >= fromDate.Value);
        }

        if (toDate.HasValue)
        {
            query = query.Where(e => e.CreatedAt <= toDate.Value);
        }

        var totalCount = await query.CountAsync(ct);

        var items = await query
            .OrderByDescending(e => e.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(e => new EnquiryListItemResponse
            {
                EnquiryId = e.EnquiryId,
                EnquiryReferenceNumber = e.EnquiryReferenceNumber,
                FullName = e.FullName,
                MobileNumber = e.MobileNumber,
                Email = e.Email,
                OrganizationName = e.OrganizationName,
                City = e.City,
                ProductInterestedIn = e.ProductInterestedIn,
                Status = e.Status,
                CreatedAt = e.CreatedAt
            })
            .ToListAsync(ct);

        return new PagedResult<EnquiryListItemResponse>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<ContactEnquiry?> GetDetailAsync(int enquiryId, CancellationToken ct = default)
    {
        return await _db.ContactEnquiries
            .Include(e => e.Notes.OrderByDescending(n => n.CreatedAt))
            .FirstOrDefaultAsync(e => e.EnquiryId == enquiryId, ct);
    }

    public async Task<ContactEnquiry?> UpdateStatusAsync(int enquiryId, UpdateEnquiryStatusRequest request, CancellationToken ct = default)
    {
        var enquiry = await _db.ContactEnquiries.FirstOrDefaultAsync(e => e.EnquiryId == enquiryId, ct);
        if (enquiry is null)
        {
            return null;
        }

        enquiry.Status = request.Status;
        if (request.AssignedTo is not null)
        {
            enquiry.AssignedTo = request.AssignedTo;
        }
        enquiry.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync(ct);
        return enquiry;
    }

    public async Task<EnquiryNote?> AddNoteAsync(int enquiryId, string noteText, string createdBy, CancellationToken ct = default)
    {
        var exists = await _db.ContactEnquiries.AnyAsync(e => e.EnquiryId == enquiryId, ct);
        if (!exists)
        {
            return null;
        }

        var note = new EnquiryNote
        {
            EnquiryId = enquiryId,
            Note = noteText.Trim(),
            CreatedBy = createdBy,
            CreatedAt = DateTime.UtcNow
        };

        _db.EnquiryNotes.Add(note);

        var enquiry = await _db.ContactEnquiries.FirstAsync(e => e.EnquiryId == enquiryId, ct);
        enquiry.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync(ct);
        return note;
    }

    public async Task<EnquiryDashboardSummary> GetDashboardSummaryAsync(CancellationToken ct = default)
    {
        var totalEnquiries = await _db.ContactEnquiries.CountAsync(ct);
        var newEnquiries = await _db.ContactEnquiries.CountAsync(e => e.Status == EnquiryStatus.New, ct);

        var byProduct = await _db.ContactEnquiries
            .GroupBy(e => e.ProductInterestedIn)
            .Select(g => new { Product = g.Key, Count = g.Count() })
            .ToListAsync(ct);

        var byStatus = await _db.ContactEnquiries
            .GroupBy(e => e.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync(ct);

        var recent = await _db.ContactEnquiries
            .AsNoTracking()
            .OrderByDescending(e => e.CreatedAt)
            .Take(10)
            .Select(e => new EnquiryListItemResponse
            {
                EnquiryId = e.EnquiryId,
                EnquiryReferenceNumber = e.EnquiryReferenceNumber,
                FullName = e.FullName,
                MobileNumber = e.MobileNumber,
                Email = e.Email,
                OrganizationName = e.OrganizationName,
                City = e.City,
                ProductInterestedIn = e.ProductInterestedIn,
                Status = e.Status,
                CreatedAt = e.CreatedAt
            })
            .ToListAsync(ct);

        return new EnquiryDashboardSummary
        {
            TotalEnquiries = totalEnquiries,
            NewEnquiries = newEnquiries,
            EnquiriesByProduct = byProduct.ToDictionary(x => x.Product.ToString(), x => x.Count),
            EnquiriesByStatus = byStatus.ToDictionary(x => x.Status.ToString(), x => x.Count),
            RecentEnquiries = recent
        };
    }

    public async Task<List<ContactEnquiry>> GetAllForExportAsync(CancellationToken ct = default)
    {
        return await _db.ContactEnquiries.AsNoTracking().OrderByDescending(e => e.CreatedAt).ToListAsync(ct);
    }
}
