using PediloOnline.Data;
using Microsoft.AspNetCore.Mvc;
using PediloOnline.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;

namespace PediloOnline.Controllers;
[Authorize]
public class ProductosController : Controller
{
    private ApplicationDbContext _context;
    public ProductosController(ApplicationDbContext context)
    {
        _context = context;
    }
    public IActionResult Index()
    {
        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]"}
        };

        ViewBag.MarcaID = selectListItems.OrderBy(t => t.Text).ToList();
        ViewBag.SubRubroID = selectListItems.OrderBy(t => t.Text).ToList();

        var marcas = _context.Marcas.ToList();
        var buscarMarcas = _context.Marcas.ToList();
        var buscarSubRubros = _context.SubRubros.ToList();
        var subrubros = _context.SubRubros.ToList();

        marcas.Add(new Marca { MarcaID = 0, MarcaNombre = "[MARCAS...]" });
        ViewBag.MarcaID  = new SelectList(marcas.OrderBy(c => c.MarcaNombre), "MarcaID", "MarcaNombre");

        buscarMarcas.Add(new Marca { MarcaID = 0, MarcaNombre = "[MARCAS...]" });
        ViewBag.BuscarMarcas  = new SelectList(buscarMarcas.OrderBy(c => c.MarcaNombre), "MarcaID", "MarcaNombre");

        subrubros.Add(new SubRubro { SubRubroID = 0, SubRubroNombre = "[SUBRUBROS...]" });
        ViewBag.SubRubroID = new SelectList(subrubros.OrderBy(c => c.SubRubroNombre), "SubRubroID", "SubRubroNombre");

        buscarSubRubros.Add(new SubRubro { SubRubroID = 0, SubRubroNombre = "[SUBRUBROS...]" });
        ViewBag.BuscarSubRubros = new SelectList(buscarSubRubros.OrderBy(c => c.SubRubroNombre), "SubRubroID", "SubRubroNombre");

        return View();
    }

        public JsonResult ListadoProductos(int? id, int? buscarMarcas, int? buscarSubRubros)
    {
        List<VistaProductos> productosMostar = new List<VistaProductos>();

        var productos = _context.Productos.AsQueryable();

        if (id != null)
        {
            productos = productos.Where(t => t.ProductoID == id);
        }

        if (buscarMarcas != 0)
        {
            productos = productos.Where(t => t.MarcaID == buscarMarcas);
        }

        if (buscarSubRubros != 0)
        {
            productos = productos.Where(t => t.SubRubroID == buscarSubRubros);
        }

        var marcas = _context.Marcas.ToList();
        var subrubros = _context.SubRubros.ToList();

        foreach (var p in productos)
        {
            var marca = marcas.Where(t => t.MarcaID == p.MarcaID).Single();
            var subrubro = subrubros.Where(t => t.SubRubroID == p.SubRubroID).Single();

            var productoMostrar = new VistaProductos
            {
                ProductoID = p.ProductoID,
                MarcaID = p.MarcaID,
                SubRubroID = p.SubRubroID,
                NombreProducto = p.NombreProducto,
                MarcaNombre = marca.MarcaNombre,
                SubRubroNombre = subrubro.SubRubroNombre,
                Precio = p.Precio,
                Descripcion = p.Descripcion,
            };
            productosMostar.Add(productoMostrar);
        }


        return Json(productosMostar);
    }

    public JsonResult TraerProductosAlModal(int? ProductoID)
    {
        var productosPorID = _context.Productos.ToList();
        if (ProductoID != null)
        {
            productosPorID = productosPorID.Where(e => e.ProductoID == ProductoID).ToList();
        }

        return Json(productosPorID.ToList());
    }

            public JsonResult GuardarProducto(
        int ProductoID,
        int MarcaID,
        int SubRubroID,
        string NombreProducto,
        string Descripcion,
        decimal Precio
        )
    {
        string resultado = "";
        if (ProductoID == 0)
        {
            if (MarcaID > 0 && SubRubroID > 0)
            {
                var Producto = new Producto
                {
                    MarcaID = MarcaID,
                    SubRubroID = SubRubroID,
                    NombreProducto = NombreProducto,
                    Descripcion = Descripcion,
                    Precio = Precio
                };
                _context.Add(Producto);
                _context.SaveChanges();

                resultado = "El producto se guardo correctamente";
            }
        }
        else
        {
            var editarProducto = _context.Productos.Where(e => e.ProductoID == ProductoID).SingleOrDefault();
            if (editarProducto != null)
            {
                editarProducto.MarcaID = MarcaID;
                editarProducto.SubRubroID = SubRubroID;
                editarProducto.NombreProducto = NombreProducto;
                editarProducto.Descripcion = Descripcion;
                editarProducto.Precio = Precio;

                _context.SaveChanges();

                resultado = "El producto se actualizó correctamente";
            }
        }
        return Json(resultado);
    }

        public JsonResult EliminarProducto(int ProductoID)
    {
        var producto = _context.Productos.Find(ProductoID);
        _context.Remove(producto);
        _context.SaveChanges();

        return Json(true);
    }


}