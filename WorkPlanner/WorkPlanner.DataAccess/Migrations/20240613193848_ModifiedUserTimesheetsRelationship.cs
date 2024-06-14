using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkPlanner.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedUserTimesheetsRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_AccountId",
                table: "Timesheets",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Timesheets_Users_AccountId",
                table: "Timesheets",
                column: "AccountId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Timesheets_Users_AccountId",
                table: "Timesheets");

            migrationBuilder.DropIndex(
                name: "IX_Timesheets_AccountId",
                table: "Timesheets");
        }
    }
}
