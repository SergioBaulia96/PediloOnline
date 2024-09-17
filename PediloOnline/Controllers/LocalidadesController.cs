using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PediloOnline.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;
using static PediloOnline.Models.Localidad;

namespace PediloOnline.Controllers;

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
             var provincia = listadoProvincias.Where(t => t.ProvinciaID == localidad.ProvinciaID).Single();
            
             var localidadMostar = new Vistalocalidades
             {
                 LocalidadID = localidad.LocalidadID,
                 ProvinciaID = localidad.ProvinciaID,
                 Nombre = localidad.LocalidadNombre,
                 CodigoPostal = localidad.CodigoPostal, 
                 NombreProvincia = provincia.ProvinciaNombre
              
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
        Nombre = Nombre.ToUpper();
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

            resultado = "EL REGISTRO SE GUARDO CORRECTAMENTE";
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

                 resultado = "EL REGISTRO SE ACTUALIZÓ CORRECTAMENTE";
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


    public JsonResult EliminarLocalidad(int LocalidadID)
   {
    var localidad = _context.Localidades.Find(LocalidadID);
    _context.Remove(localidad);
    _context.SaveChanges();

    return Json(true);
   }
    }