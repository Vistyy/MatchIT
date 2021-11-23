﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserFileFKChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Jobs_JobId",
                table: "Files");

            migrationBuilder.DropForeignKey(
                name: "FK_Files_PortfolioItems_PortfolioItemId",
                table: "Files");

            migrationBuilder.AlterColumn<Guid>(
                name: "PortfolioItemId",
                table: "Files",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "JobId",
                table: "Files",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

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

            migrationBuilder.AlterColumn<Guid>(
                name: "PortfolioItemId",
                table: "Files",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "JobId",
                table: "Files",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Jobs_JobId",
                table: "Files",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Files_PortfolioItems_PortfolioItemId",
                table: "Files",
                column: "PortfolioItemId",
                principalTable: "PortfolioItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}