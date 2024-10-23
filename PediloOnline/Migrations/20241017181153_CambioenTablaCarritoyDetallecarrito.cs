using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PediloOnline.Migrations
{
    /// <inheritdoc />
    public partial class CambioenTablaCarritoyDetallecarrito : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UsuarioID",
                table: "DetalleCarritos",
                newName: "VendedorID");

            migrationBuilder.RenameColumn(
                name: "UsuarioID",
                table: "Carritos",
                newName: "VendedorID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VendedorID",
                table: "DetalleCarritos",
                newName: "UsuarioID");

            migrationBuilder.RenameColumn(
                name: "VendedorID",
                table: "Carritos",
                newName: "UsuarioID");
        }
    }
}
