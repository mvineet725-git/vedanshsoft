using System.Security.Cryptography;

namespace VedanshSoftware.Api.Common;

public static class ReferenceNumberGenerator
{
    private const string Alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    // 9 chars from a 32-char alphabet is ~45 bits of entropy, making the public
    // confirmation-lookup endpoint impractical to brute-force even unauthenticated.
    private const int SuffixLength = 9;

    /// <summary>Generates a reference number like VSS-20261015-X7K2PQR4T.</summary>
    public static string Generate()
    {
        Span<char> suffix = stackalloc char[SuffixLength];
        for (var i = 0; i < suffix.Length; i++)
        {
            suffix[i] = Alphabet[RandomNumberGenerator.GetInt32(Alphabet.Length)];
        }

        return $"VSS-{DateTime.UtcNow:yyyyMMdd}-{new string(suffix)}";
    }
}
