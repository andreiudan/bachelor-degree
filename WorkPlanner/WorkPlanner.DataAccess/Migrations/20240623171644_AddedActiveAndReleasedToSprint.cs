using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPlanner.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedActiveAndReleasedToSprint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Sprints",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Released",
                table: "Sprints",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "Released",
                table: "Sprints");
        }
    }
}
