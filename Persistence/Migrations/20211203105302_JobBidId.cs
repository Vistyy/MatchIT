using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class JobBidId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_AspNetUsers_BidderId",
                table: "JobBids");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobBids",
                table: "JobBids");

            migrationBuilder.AlterColumn<string>(
                name: "BidderId",
                table: "JobBids",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "JobBids",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobBids",
                table: "JobBids",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_JobBids_BidderId",
                table: "JobBids",
                column: "BidderId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobBids_AspNetUsers_BidderId",
                table: "JobBids",
                column: "BidderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobBids_AspNetUsers_BidderId",
                table: "JobBids");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobBids",
                table: "JobBids");

            migrationBuilder.DropIndex(
                name: "IX_JobBids_BidderId",
                table: "JobBids");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "JobBids");

            migrationBuilder.AlterColumn<string>(
                name: "BidderId",
                table: "JobBids",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

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
        }
    }
}
