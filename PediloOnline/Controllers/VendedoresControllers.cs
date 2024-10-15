using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;
using PediloOnline.Models;
namespace PediloOnline.Controllers;

[Authorize]
public class VendedoresController : Controller
{
    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public VendedoresController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]"}
        };

        var enumValues = Enum.GetValues(typeof(TipoCliente)).Cast<TipoCliente>();
        
        selectListItems.AddRange(enumValues.Select(e => new SelectListItem
        {
            Value = e.GetHashCode().ToString(),
            Text = e.ToString().ToUpper()
        }));
        ViewBag.TipoCliente = selectListItems.OrderBy(t => t.Text).ToList();
        ViewBag.LocalidadID = selectListItems.OrderBy(t => t.Text).ToList();

        var localidades = _context.Localidades.ToList();
        var localidadesBuscar = _context.Localidades.ToList();

        localidades.Add(new Localidad { LocalidadID = 0, LocalidadNombre = "[SELECCIONE...]" });
        ViewBag.LocalidadID = new SelectList(localidades.OrderBy(c => c.LocalidadNombre), "LocalidadID", "LocalidadNombre");
        
        localidadesBuscar.Add(new Localidad { LocalidadID = 0, LocalidadNombre = "[SELECCIONE...]" });
        ViewBag.BuscarLocalidad = new SelectList(localidadesBuscar.OrderBy(c => c.LocalidadNombre), "LocalidadID", "LocalidadNombre");

        return View();
    }

    public JsonResult ListadoVendedores(int? id, int? buscarLocalidad)
    {
        List<VistaVendedores> vendedoresMostrar = new List<VistaVendedores>();

        var vendedores = _context.Vendedores.AsQueryable();

        if (id != null)
        {
            vendedores = vendedores.Where(t => t.VendedorID == id);
        }

        if (buscarLocalidad != 0)
        {
            vendedores = vendedores.Where(t => t.LocalidadID == buscarLocalidad);
        }

        var localidades = _context.Localidades.ToList();

        foreach (var vendedor in vendedores)
        {
            var localidad = localidades.Where(t => t.LocalidadID == vendedor.LocalidadID).Single();

            var vendedorMostrar = new VistaVendedores
            {
                VendedorID = vendedor.VendedorID,
                LocalidadID = vendedor.LocalidadID,
                LocalidadNombre = localidad.LocalidadNombre,
                NombreCompleto = vendedor.NombreCompleto,
                Domicilio = vendedor.Domicilio,
                Documento = vendedor.Documento,
                Telefono = vendedor.Telefono,
                Email = vendedor.Email,
                Activo = vendedor.Activo
            };
            vendedoresMostrar.Add(vendedorMostrar);
        }


        return Json(vendedoresMostrar);
    }

    public JsonResult GuardarVendedor(int vendedorID,int LocalidadID,string NombreCompleto,string Domicilio,string Documento,string Telefono,string Email
        )
    {
        string resultado = "";
        if (vendedorID == 0)
        {
            if (LocalidadID > 0)
            {
                var Vendedor = new Vendedor
                {
                    LocalidadID = LocalidadID,
                    NombreCompleto = NombreCompleto,
                    Domicilio = Domicilio,
                    Documento = Documento,
                    Telefono = Telefono,
                    Email = Email
                };
                _context.Add(Vendedor);
                _context.SaveChanges();

                resultado = "El vendedor se guardo correctamente";
            }
        }
        else
        {
            var editarVendedor = _context.Vendedores.Where(e => e.VendedorID == vendedorID).SingleOrDefault();
            if (editarVendedor != null)
            {
                editarVendedor.LocalidadID = LocalidadID;
                editarVendedor.NombreCompleto = NombreCompleto;
                editarVendedor.Domicilio = Domicilio;
                editarVendedor.Telefono = Telefono;
                editarVendedor.Email = Email;

                _context.SaveChanges();

                resultado = "El Vendedor se actualizó correctamente";
            }
        }
        return Json(resultado);
    }

public JsonResult TraerVendedoresAlModal(int? vendedorID)
    {
        var vendedoresPorID = _context.Vendedores.ToList();
        if (vendedorID != null)
        {
            vendedoresPorID = vendedoresPorID.Where(e => e.VendedorID == vendedorID).ToList();
        }

        return Json(vendedoresPorID.ToList());
    }
    public IActionResult HabilitarVendedor(int vendedorID)
{
    var vendedor = _context.Vendedores.FirstOrDefault(c => c.VendedorID == vendedorID);
    if (vendedor == null)
    {
        return Json(new { success = false, message = "Vendedor no encontrado" });
    }

    vendedor.Activo = true; // Cambiamos el estado a habilitado
    _context.SaveChanges();

    return Json(new { success = true, message = "Vendedor habilitado correctamente" });
}

 public IActionResult DeshabilitarVendedor(int vendedorID)
{
    var vendedor = _context.Vendedores.FirstOrDefault(c => c.VendedorID == vendedorID);
    if (vendedor == null)
    {
        return Json(new { success = false, message = "Localidad no encontrada" });
    }

    vendedor.Activo = false; // Cambiamos el estado a deshabilitado
    _context.SaveChanges();

    return Json(new { success = true, message = "Vendedor deshabilitado correctamente" });
}

}
