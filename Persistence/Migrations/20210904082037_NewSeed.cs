using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class NewSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Certifiations_AspNetUsers_AppUserId",
                table: "Certifiations");

            migrationBuilder.DropForeignKey(
                name: "FK_Certifiations_Photos_CertificateId",
                table: "Certifiations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Certifiations",
                table: "Certifiations");

            migrationBuilder.RenameTable(
                name: "Certifiations",
                newName: "Certifications");

            migrationBuilder.RenameIndex(
                name: "IX_Certifiations_CertificateId",
                table: "Certifications",
                newName: "IX_Certifications_CertificateId");

            migrationBuilder.RenameIndex(
                name: "IX_Certifiations_AppUserId",
                table: "Certifications",
                newName: "IX_Certifications_AppUserId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StudyingTo",
                table: "EducationItems",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Certifications",
                table: "Certifications",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Certifications_AspNetUsers_AppUserId",
                table: "Certifications",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Certifications_Photos_CertificateId",
                table: "Certifications",
                column: "CertificateId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Certifications_AspNetUsers_AppUserId",
                table: "Certifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Certifications_Photos_CertificateId",
                table: "Certifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Certifications",
                table: "Certifications");

            migrationBuilder.RenameTable(
                name: "Certifications",
                newName: "Certifiations");

            migrationBuilder.RenameIndex(
                name: "IX_Certifications_CertificateId",
                table: "Certifiations",
                newName: "IX_Certifiations_CertificateId");

            migrationBuilder.RenameIndex(
                name: "IX_Certifications_AppUserId",
                table: "Certifiations",
                newName: "IX_Certifiations_AppUserId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StudyingTo",
                table: "EducationItems",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Certifiations",
                table: "Certifiations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Certifiations_AspNetUsers_AppUserId",
                table: "Certifiations",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Certifiations_Photos_CertificateId",
                table: "Certifiations",
                column: "CertificateId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
