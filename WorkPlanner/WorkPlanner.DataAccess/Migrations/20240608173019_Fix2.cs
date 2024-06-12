using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPlanner.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Fix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Task_SprintOrBacklog",
                table: "Tasks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_Task_SprintOrBacklog",
                table: "Tasks",
                sql: "[SprintId] IS NOT NULL AND [BacklogId] IS NULL OR [SprintId] IS NULL AND [BacklogId] IS NOT NULL");
        }
    }
}
