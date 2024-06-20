﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPlanner.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedUsersProjectsRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Projects_CreatorId",
                table: "Projects",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_CreatorId",
                table: "Projects",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_CreatorId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_CreatorId",
                table: "Projects");
        }
    }
}
