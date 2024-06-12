using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPlanner.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedBacklogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BacklogId",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Backlogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProjectId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Backlogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Backlogs_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_BacklogId",
                table: "Tasks",
                column: "BacklogId");

            migrationBuilder.CreateIndex(
                name: "IX_Backlogs_ProjectId",
                table: "Backlogs",
                column: "ProjectId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Backlogs_BacklogId",
                table: "Tasks",
                column: "BacklogId",
                principalTable: "Backlogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Backlogs_BacklogId",
                table: "Tasks");

            migrationBuilder.DropTable(
                name: "Backlogs");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_BacklogId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "BacklogId",
                table: "Tasks");
        }
    }
}
