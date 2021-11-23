using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PortfolioItemChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "PortfolioItems");

            migrationBuilder.AddColumn<int>(
                name: "PortfolioItemId",
                table: "UserFile",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "StudyingTo",
                table: "EducationItems",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_UserFile_PortfolioItemId",
                table: "UserFile",
                column: "PortfolioItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFile_PortfolioItems_PortfolioItemId",
                table: "UserFile",
                column: "PortfolioItemId",
                principalTable: "PortfolioItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFile_PortfolioItems_PortfolioItemId",
                table: "UserFile");

            migrationBuilder.DropIndex(
                name: "IX_UserFile_PortfolioItemId",
                table: "UserFile");

            migrationBuilder.DropColumn(
                name: "PortfolioItemId",
                table: "UserFile");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "PortfolioItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "StudyingTo",
                table: "EducationItems",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
