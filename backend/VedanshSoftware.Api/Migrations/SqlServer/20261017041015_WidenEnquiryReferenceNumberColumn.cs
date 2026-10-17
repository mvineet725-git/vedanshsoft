using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VedanshSoftware.Api.Migrations.SqlServer
{
    /// <inheritdoc />
    public partial class WidenEnquiryReferenceNumberColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "EnquiryReferenceNumber",
                table: "ContactEnquiries",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "EnquiryReferenceNumber",
                table: "ContactEnquiries",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30);
        }
    }
}
