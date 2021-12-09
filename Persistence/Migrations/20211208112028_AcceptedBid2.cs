﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AcceptedBid2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<Guid>(
                name: "AcceptedJobId",
                table: "JobBids",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_JobBids_AcceptedJobId",
                table: "JobBids",
                column: "AcceptedJobId",
                unique: true);

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

            migrationBuilder.DropIndex(
                name: "IX_JobBids_AcceptedJobId",
                table: "JobBids");

            migrationBuilder.DropColumn(
                name: "AcceptedJobId",
                table: "JobBids");

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
    }
}
