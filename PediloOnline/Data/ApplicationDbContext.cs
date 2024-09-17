using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PediloOnline.Models;

namespace PediloOnline.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<Carrito> Carritos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<DetalleCarrito> DetalleCarritos { get; set; }
    public DbSet<Empresa> Empresas { get; set; }
    public DbSet<Localidad> Localidades { get; set; }
    public DbSet<Producto> Productos { get; set; }
    public DbSet<Provincia> Provincias { get; set; }
    public DbSet<Rubro> Rubros { get; set; }
    public DbSet<SubRubro> SubRubros { get; set; }
    public DbSet<Venta> Ventas { get; set; }
    public DbSet<DetalleVenta> DetalleVentas { get; set; }
    public DbSet<Marca> Marcas { get; set; }

}
