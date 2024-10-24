using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;
using PediloOnline.Models;
namespace PediloOnline.Controllers;

[Authorize]
public class CarritosController : Controller
{
    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public CarritosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]"}
        };

        /* ViewBag.ClienteID = selectListItems.OrderBy(t => t.Text).ToList(); */

        var clientes = _context.Clientes.ToList();
        var vendedores = _context.Vendedores.ToList();

        clientes.Add(new Cliente { ClienteID = 0, NombreCompleto = "[SELECCIONE...]" });
        ViewBag.ClienteID = new SelectList(clientes.OrderBy(c => c.NombreCompleto), "ClienteID", "NombreCompleto");

        vendedores.Add(new Vendedor { VendedorID = 0, NombreCompleto = "[SELECCIONE...]" });
        ViewBag.VendedorID = new SelectList(vendedores.OrderBy(c => c.NombreCompleto), "VendedorID", "NombreCompleto");

        return View();
    }

     // Método para inicializar la vista de Nueva Venta
        public IActionResult Carrito()
        {
            // Código para cargar los select de TipoProducto, Producto y Cliente
            var rubros = _context.Rubros.ToList();
            rubros.Add(new Rubro { RubroID = 0, RubroNombre = "[SELECCIONE EL RUBBRO DEL PRODUCTO]" });
            ViewBag.RubroID = new SelectList(rubros.OrderBy(c => c.RubroNombre), "RubroID", "RubroNombre");

            var productos = _context.Productos.ToList();
            productos.Add(new Producto { ProductoID = 0, NombreProducto = "[SELECCIONE UN PRODUCTO]" });
            ViewBag.ProductoID = new SelectList(productos.OrderBy(c => c.NombreProducto), "ProductoID", "NombreProducto");

            var clientes = _context.Clientes.ToList();
            clientes.Add(new Cliente { ClienteID = 0, NombreCompleto = "[SELECCIONE CLIENTE]" });
            var listadoClientes = clientes.Select(c => new
            {
                c.ClienteID,
                NombreCompleto = c.NombreCompleto
            });
            ViewBag.ClienteID = new SelectList(listadoClientes.OrderBy(c => c.NombreCompleto), "ClienteID", "NombreCompleto");

            return View();
        }

}