using System.Globalization;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VedanshSoftware.Api.DTOs;
using VedanshSoftware.Api.Services;

namespace VedanshSoftware.Api.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize]
public class AdminController : ControllerBase
{
    private readonly EnquiryService _enquiryService;

    public AdminController(EnquiryService enquiryService)
    {
        _enquiryService = enquiryService;
    }

    [HttpGet("dashboard-summary")]
    public async Task<ActionResult<EnquiryDashboardSummary>> GetDashboardSummary(CancellationToken ct)
    {
        var summary = await _enquiryService.GetDashboardSummaryAsync(ct);
        return Ok(summary);
    }

    /// <summary>Export all enquiries as CSV. Restricted to Admin role.</summary>
    [HttpGet("enquiries/export")]
    [Authorize(Roles = Models.AdminRoles.Admin)]
    public async Task<IActionResult> ExportEnquiries(CancellationToken ct)
    {
        var enquiries = await _enquiryService.GetAllForExportAsync(ct);

        var csv = new StringBuilder();
        csv.AppendLine("Reference,FullName,Mobile,Email,Organization,City,Product,Status,CreatedAt");

        foreach (var e in enquiries)
        {
            csv.AppendLine(string.Join(",",
                CsvEscape(e.EnquiryReferenceNumber),
                CsvEscape(e.FullName),
                CsvEscape(e.MobileNumber),
                CsvEscape(e.Email ?? string.Empty),
                CsvEscape(e.OrganizationName ?? string.Empty),
                CsvEscape(e.City ?? string.Empty),
                CsvEscape(e.ProductInterestedIn.ToString()),
                CsvEscape(e.Status.ToString()),
                CsvEscape(e.CreatedAt.ToString("u", CultureInfo.InvariantCulture))));
        }

        var bytes = Encoding.UTF8.GetBytes(csv.ToString());
        return File(bytes, "text/csv", $"enquiries-export-{DateTime.UtcNow:yyyyMMdd-HHmmss}.csv");
    }

    // Public enquiry submitters fully control FullName/OrganizationName/City. Prefix any
    // value starting with a formula-triggering character with a tab so spreadsheet
    // applications (Excel, LibreOffice, Google Sheets) treat it as plain text rather than
    // executing it as a formula when an admin opens the exported file (CSV injection).
    private static readonly char[] FormulaTriggerChars = ['=', '+', '-', '@', '\t', '\r'];

    private static string CsvEscape(string value)
    {
        if (value.Length > 0 && FormulaTriggerChars.Contains(value[0]))
        {
            value = "\t" + value;
        }

        if (value.Contains(',') || value.Contains('"') || value.Contains('\n'))
        {
            return $"\"{value.Replace("\"", "\"\"")}\"";
        }
        return value;
    }
}
