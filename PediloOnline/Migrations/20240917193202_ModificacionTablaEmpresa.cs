using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PediloOnline.Migrations
{
    /// <inheritdoc />
    public partial class ModificacionTablaEmpresa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmpresaIDLoguiGestion",
                table: "Empresas");

            migrationBuilder.DropColumn(
                name: "LogoBinario",
                table: "Empresas");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmpresaIDLoguiGestion",
                table: "Empresas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<byte[]>(
                name: "LogoBinario",
                table: "Empresas",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
