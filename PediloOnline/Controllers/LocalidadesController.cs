using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PediloOnline.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;
using static PediloOnline.Models.Localidad;

namespace PediloOnline.Controllers;
[Authorize]
public class LocalidadesController : Controller
{
    private ApplicationDbContext _context;

    public LocalidadesController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
{
    var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]"}
        };

        ViewBag.ProvinciaID = selectListItems.OrderBy(t => t.Text).ToList();

    var provincias = _context.Provincias.ToList();
        provincias.Add(new Provincia { ProvinciaID = 0, ProvinciaNombre = "[SELECCIONE...]" });
        ViewBag.ProvinciaID = new SelectList(provincias.OrderBy(c => c.ProvinciaNombre), "ProvinciaID", "ProvinciaNombre");

    return View();
}


     public JsonResult ListadoLocalidades()
{
    List<Vistalocalidades> LocalidadesMostar = new List<Vistalocalidades>();

    var listadoLocalidades = _context.Localidades.ToList();
    var listadoProvincias = _context.Provincias.ToList();

    foreach (var localidad in listadoLocalidades)
    {
        var provincia = listadoProvincias.FirstOrDefault(t => t.ProvinciaID == localidad.ProvinciaID);

        var localidadMostar = new Vistalocalidades
        {
            LocalidadID = localidad.LocalidadID,
            ProvinciaID = localidad.ProvinciaID,
            Nombre = localidad.LocalidadNombre,
            CodigoPostal = localidad.CodigoPostal,
            NombreProvincia = provincia.ProvinciaNombre,
            Activo = localidad.Activo // Asegúrate de que el estado activo se envía correctamente
        };

        LocalidadesMostar.Add(localidadMostar);
    }
    return Json(LocalidadesMostar);
}


     public JsonResult GuardarLocalidad(
       int LocalidadID,
       string? Nombre,
       string? CodigoPostal,
       int ProvinciaID
       
       )
    {
        string resultado = "";
        Nombre = Nombre?.ToUpper();
        if (LocalidadID == 0)
        {
            var localidad = new Localidad
            {
                LocalidadNombre = Nombre,
                CodigoPostal = CodigoPostal,
                ProvinciaID = ProvinciaID
            };
            _context.Add(localidad);
            _context.SaveChanges();

            resultado = "La localidad se guardo correctamente";
        }
         else
         {
             var editarLocalidad = _context.Localidades.Where(e => e.LocalidadID == LocalidadID).SingleOrDefault();
             if (editarLocalidad != null)
             {
                 editarLocalidad.LocalidadID = LocalidadID;
                 editarLocalidad.LocalidadNombre = Nombre;
                 editarLocalidad.CodigoPostal = CodigoPostal;
                 editarLocalidad.ProvinciaID = ProvinciaID;
                 _context.SaveChanges();

                 resultado = "La localidad se actualizó correctamente";
             }
         }
        return Json(resultado);
    }

    public JsonResult TraerLocalidadAlModal(int? LocalidadID)
    {
        var localidadporID = _context.Localidades.ToList();
        if (LocalidadID != null)
        {
            localidadporID = localidadporID.Where(e => e.LocalidadID == LocalidadID).ToList();
        }

        return Json(localidadporID.ToList());
    }


public IActionResult DeshabilitarLocalidad(int localidadID)
{
    var localidad = _context.Localidades.FirstOrDefault(l => l.LocalidadID == localidadID);
    if (localidad == null)
    {
        return Json(new { success = false, message = "Localidad no encontrada" });
    }

    localidad.Activo = false; // Cambiamos el estado a deshabilitado
    _context.SaveChanges();

    return Json(new { success = true, message = "Localidad deshabilitada correctamente" });
}


public IActionResult HabilitarLocalidad(int localidadID)
{
    var localidad = _context.Localidades.FirstOrDefault(l => l.LocalidadID == localidadID);
    if (localidad == null)
    {
        return Json(new { success = false, message = "Localidad no encontrada" });
    }

    localidad.Activo = true; // Cambiamos el estado a habilitado
    _context.SaveChanges();

    return Json(new { success = true, message = "Localidad habilitada correctamente" });
}
    }