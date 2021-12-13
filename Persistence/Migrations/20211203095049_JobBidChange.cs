using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class JobBidChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBid_AspNetUsers_BidderId",
                table: "JobBid");

            migrationBuilder.DropForeignKey(
                name: "FK_JobBid_Jobs_JobId",
                table: "JobBid");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobBid",
                table: "JobBid");

            migrationBuilder.DropIndex(
                name: "IX_JobBid_BidderId",
                table: "JobBid");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "JobBid");

            migrationBuilder.RenameTable(
                name: "JobBid",
                newName: "JobBids");

            migrationBuilder.RenameIndex(
                name: "IX_JobBid_JobId",
                table: "JobBids",
                newName: "IX_JobBids_JobId");

            migrationBuilder.AlterColumn<string>(
                name: "BidderId",
                table: "JobBids",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "JobBids",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Fee",
                table: "JobBids",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobBids",
                table: "JobBids",
                columns: new[] { "BidderId", "JobId" });

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_AspNetUsers_BidderId",
                table: "JobBids",
                column: "BidderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_Jobs_JobId",
                table: "JobBids",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_AspNetUsers_BidderId",
                table: "JobBids");

            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_Jobs_JobId",
                table: "JobBids");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobBids",
                table: "JobBids");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "JobBids");

            migrationBuilder.DropColumn(
                name: "Fee",
                table: "JobBids");

            migrationBuilder.RenameTable(
                name: "JobBids",
                newName: "JobBid");

            migrationBuilder.RenameIndex(
                name: "IX_JobBids_JobId",
                table: "JobBid",
                newName: "IX_JobBid_JobId");

            migrationBuilder.AlterColumn<string>(
                name: "BidderId",
                table: "JobBid",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "JobBid",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobBid",
                table: "JobBid",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_JobBid_BidderId",
                table: "JobBid",
                column: "BidderId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobBid_AspNetUsers_BidderId",
                table: "JobBid",
                column: "BidderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_JobBid_Jobs_JobId",
                table: "JobBid",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
