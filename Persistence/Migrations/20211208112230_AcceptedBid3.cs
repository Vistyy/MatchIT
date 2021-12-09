using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AcceptedBid3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_Jobs_AcceptedJobId",
                table: "JobBids");

            migrationBuilder.AlterColumn<Guid>(
                name: "AcceptedJobId",
                table: "JobBids",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_Jobs_AcceptedJobId",
                table: "JobBids",
                column: "AcceptedJobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_Jobs_AcceptedJobId",
                table: "JobBids");

            migrationBuilder.AlterColumn<Guid>(
                name: "AcceptedJobId",
                table: "JobBids",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_Jobs_AcceptedJobId",
                table: "JobBids",
                column: "AcceptedJobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
