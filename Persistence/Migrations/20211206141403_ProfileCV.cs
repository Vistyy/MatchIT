using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ProfileCV : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_Files_CVId",
                table: "JobBids");

            migrationBuilder.DropIndex(
                name: "IX_JobBids_CVId",
                table: "JobBids");

            migrationBuilder.DropColumn(
                name: "CVId",
                table: "JobBids");

            migrationBuilder.AddColumn<string>(
                name: "CVId",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CVId",
                table: "AspNetUsers",
                column: "CVId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Files_CVId",
                table: "AspNetUsers",
                column: "CVId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Files_CVId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CVId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CVId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "CVId",
                table: "JobBids",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobBids_CVId",
                table: "JobBids",
                column: "CVId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_Files_CVId",
                table: "JobBids",
                column: "CVId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
