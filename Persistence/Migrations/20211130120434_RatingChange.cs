using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RatingChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "AspNetUsers",
                newName: "RatingSum");

            migrationBuilder.AddColumn<int>(
                name: "RatingCount",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RatingCount",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "RatingSum",
                table: "AspNetUsers",
                newName: "Rating");
        }
    }
}
