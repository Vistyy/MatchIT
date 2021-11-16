using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PortfolioChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PortfolioItems_Descriptions_DescriptionId",
                table: "PortfolioItems");

            migrationBuilder.DropIndex(
                name: "IX_PortfolioItems_DescriptionId",
                table: "PortfolioItems");

            migrationBuilder.RenameColumn(
                name: "DescriptionId",
                table: "PortfolioItems",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "PortfolioItems",
                newName: "DescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioItems_DescriptionId",
                table: "PortfolioItems",
                column: "DescriptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_PortfolioItems_Descriptions_DescriptionId",
                table: "PortfolioItems",
                column: "DescriptionId",
                principalTable: "Descriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
