using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PediloOnline.Migrations
{
    /// <inheritdoc />
    public partial class MigracionDeshabilitar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Activo",
                table: "Localidades",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Activo",
                table: "Localidades");
        }
    }
}
