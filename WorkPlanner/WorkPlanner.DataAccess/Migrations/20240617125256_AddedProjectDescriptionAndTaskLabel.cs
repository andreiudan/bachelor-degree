using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPlanner.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedProjectDescriptionAndTaskLabel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LabelId",
                table: "Tasks");

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Projects",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Label",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Projects");

            migrationBuilder.AddColumn<int>(
                name: "LabelId",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
