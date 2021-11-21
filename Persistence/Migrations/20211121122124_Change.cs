using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFile_Jobs_JobId",
                table: "UserFile");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFile_PortfolioItems_PortfolioItemId",
                table: "UserFile");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserFile",
                table: "UserFile");

            migrationBuilder.RenameTable(
                name: "UserFile",
                newName: "Files");

            migrationBuilder.RenameIndex(
                name: "IX_UserFile_PortfolioItemId",
                table: "Files",
                newName: "IX_Files_PortfolioItemId");

            migrationBuilder.RenameIndex(
                name: "IX_UserFile_JobId",
                table: "Files",
                newName: "IX_Files_JobId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Files",
                table: "Files",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Jobs_JobId",
                table: "Files",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Files_PortfolioItems_PortfolioItemId",
                table: "Files",
                column: "PortfolioItemId",
                principalTable: "PortfolioItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Jobs_JobId",
                table: "Files");

            migrationBuilder.DropForeignKey(
                name: "FK_Files_PortfolioItems_PortfolioItemId",
                table: "Files");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Files",
                table: "Files");

            migrationBuilder.RenameTable(
                name: "Files",
                newName: "UserFile");

            migrationBuilder.RenameIndex(
                name: "IX_Files_PortfolioItemId",
                table: "UserFile",
                newName: "IX_UserFile_PortfolioItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Files_JobId",
                table: "UserFile",
                newName: "IX_UserFile_JobId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserFile",
                table: "UserFile",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFile_Jobs_JobId",
                table: "UserFile",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFile_PortfolioItems_PortfolioItemId",
                table: "UserFile",
                column: "PortfolioItemId",
                principalTable: "PortfolioItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
