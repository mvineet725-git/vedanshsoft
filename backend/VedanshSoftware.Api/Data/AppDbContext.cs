using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VedanshSoftware.Api.Models;

namespace VedanshSoftware.Api.Data;

public class AppDbContext : IdentityDbContext<AdminUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<ContactEnquiry> ContactEnquiries => Set<ContactEnquiry>();
    public DbSet<EnquiryNote> EnquiryNotes => Set<EnquiryNote>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ContactEnquiry>(entity =>
        {
            entity.HasKey(e => e.EnquiryId);

            entity.HasIndex(e => e.EnquiryReferenceNumber).IsUnique();
            entity.HasIndex(e => e.MobileNumber);
            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.ProductInterestedIn);
            entity.HasIndex(e => e.CreatedAt);

            entity.Property(e => e.ConsentAccepted).IsRequired();
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasMany(e => e.Notes)
                .WithOne(n => n.Enquiry)
                .HasForeignKey(n => n.EnquiryId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<EnquiryNote>(entity =>
        {
            entity.HasKey(n => n.EnquiryNoteId);
            entity.HasIndex(n => n.EnquiryId);
        });
    }
}
