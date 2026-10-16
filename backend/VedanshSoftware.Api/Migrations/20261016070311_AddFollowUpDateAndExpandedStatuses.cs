using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VedanshSoftware.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddFollowUpDateAndExpandedStatuses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NextFollowUpDate",
                table: "ContactEnquiries",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextFollowUpDate",
                table: "ContactEnquiries");
        }
    }
}
