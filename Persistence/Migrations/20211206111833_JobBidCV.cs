using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class JobBidCV : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Fee",
                table: "JobBids",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "Fee",
                table: "JobBids",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");
        }
    }
}
