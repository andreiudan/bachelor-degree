using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPlanner.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class BugFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Backlogs_BacklogId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Sprints_SprintId",
                table: "Tasks");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Task_SprintOrBacklog",
                table: "Tasks",
                sql: "[SprintId] IS NOT NULL AND [BacklogId] IS NULL OR [SprintId] IS NULL AND [BacklogId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Backlogs_BacklogId",
                table: "Tasks",
                column: "BacklogId",
                principalTable: "Backlogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Sprints_SprintId",
                table: "Tasks",
                column: "SprintId",
                principalTable: "Sprints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Backlogs_BacklogId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Sprints_SprintId",
                table: "Tasks");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Task_SprintOrBacklog",
                table: "Tasks");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Backlogs_BacklogId",
                table: "Tasks",
                column: "BacklogId",
                principalTable: "Backlogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Sprints_SprintId",
                table: "Tasks",
                column: "SprintId",
                principalTable: "Sprints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
