using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CertificateChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Certifications_Photos_CertificateId",
                table: "Certifications");

            migrationBuilder.DropIndex(
                name: "IX_Certifications_CertificateId",
                table: "Certifications");

            migrationBuilder.DropColumn(
                name: "CertificateId",
                table: "Certifications");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CertificateId",
                table: "Certifications",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Certifications_CertificateId",
                table: "Certifications",
                column: "CertificateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Certifications_Photos_CertificateId",
                table: "Certifications",
                column: "CertificateId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
