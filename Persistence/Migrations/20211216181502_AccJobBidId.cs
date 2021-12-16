using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AccJobBidId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_Jobs_AcceptedJobId",
                table: "JobBids");

            migrationBuilder.AddColumn<Guid>(
                name: "AcceptedJobBidId",
                table: "Jobs",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_Jobs_AcceptedJobId",
                table: "JobBids",
                column: "AcceptedJobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_Jobs_AcceptedJobId",
                table: "JobBids");

            migrationBuilder.DropColumn(
                name: "AcceptedJobBidId",
                table: "Jobs");

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_Jobs_AcceptedJobId",
                table: "JobBids",
                column: "AcceptedJobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
