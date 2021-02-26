using Microsoft.EntityFrameworkCore.Migrations;

namespace DatabaseManager.Migrations
{
    public partial class TodoMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TodoItem",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Task = table.Column<string>(nullable: true),
                    IsComplete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoItem", x => x.ID);
                });

            migrationBuilder.InsertData(
                table: "TodoItem",
                columns: new[] { "ID", "IsComplete", "Task" },
                values: new object[] { 2, false, "Task 2" });

            migrationBuilder.InsertData(
                table: "TodoItem",
                columns: new[] { "ID", "IsComplete", "Task" },
                values: new object[] { 3, false, "Task 3" });

            migrationBuilder.InsertData(
                table: "TodoItem",
                columns: new[] { "ID", "IsComplete", "Task" },
                values: new object[] { 4, false, "Task 4" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TodoItem");
        }
    }
}
