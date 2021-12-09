using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AcceptedBid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "JobId1",
                table: "JobBids",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobBids_JobId1",
                table: "JobBids",
                column: "JobId1",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_Jobs_JobId1",
                table: "JobBids",
                column: "JobId1",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_Jobs_JobId1",
                table: "JobBids");

            migrationBuilder.DropIndex(
                name: "IX_JobBids_JobId1",
                table: "JobBids");

            migrationBuilder.DropColumn(
                name: "JobId1",
                table: "JobBids");
        }
    }
}
