using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace VedanshSoftware.Api.Common;

/// <summary>
/// Accepts Indian mobile numbers (optionally +91/91 prefixed, 10 digits starting 6-9)
/// as well as general international numbers (+ followed by 8-15 digits), so legitimate
/// international enquiries are not rejected.
/// </summary>
public partial class PhoneValidationAttribute : ValidationAttribute
{
    [GeneratedRegex(@"^(\+?91[\-\s]?)?[6-9]\d{9}$")]
    private static partial Regex IndianMobileRegex();

    [GeneratedRegex(@"^\+[1-9]\d{7,14}$")]
    private static partial Regex InternationalRegex();

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is not string raw || string.IsNullOrWhiteSpace(raw))
        {
            return new ValidationResult("Mobile number is required.");
        }

        var cleaned = raw.Trim();

        if (IndianMobileRegex().IsMatch(cleaned) || InternationalRegex().IsMatch(cleaned))
        {
            return ValidationResult.Success;
        }

        return new ValidationResult("Enter a valid 10-digit Indian mobile number or a valid international number with country code.");
    }
}
