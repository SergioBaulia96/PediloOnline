using PediloOnline.Data;
using Microsoft.AspNetCore.Mvc;
using PediloOnline.Models;
using Microsoft.AspNetCore.Authorization;

namespace PediloOnline.Controllers;
[Authorize]
public class MarcasController : Controller
{
    private ApplicationDbContext _context;
    public MarcasController(ApplicationDbContext context)
    {
        _context = context;
    }
    public IActionResult Index()
    {
        return View();
    }

     public JsonResult ListadoMarcas ( int? marcaID)
    {
        var listadoMarcas = _context.Marcas.ToList();
            listadoMarcas = _context.Marcas.OrderBy(l => l.MarcaNombre).ToList();

        if(marcaID != null)
        {
            listadoMarcas = _context.Marcas.Where(l => l.MarcaID == marcaID).ToList();
        }      
        return Json(listadoMarcas);
    }

            public JsonResult GuardarMarca (int marcaID, string marcaNombre)
    {
        string resultado = "";

        marcaNombre = marcaNombre.ToUpper();

        if(marcaID == 0)
        {
            var nuevaMarca = new Marca
            {
                MarcaNombre = marcaNombre,
                Activo = true
            };
            _context.Add(nuevaMarca);
            _context.SaveChanges();
            resultado = "Marca Guardada";
        }
        else
        {
            var editarMarca = _context.Marcas.Where(e => e.MarcaID == marcaID).SingleOrDefault();
            
            if(editarMarca != null)
            {
                editarMarca.MarcaNombre = marcaNombre;

                _context.SaveChanges();
                resultado = "Marca Editada";
            }
        }
        return Json(resultado);
    }

    public IActionResult DeshabilitarMarca(int marcaID)
{
    var marca = _context.Marcas.FirstOrDefault(m => m.MarcaID == marcaID);
    if (marca == null)
    {
        return Json(new { success = false, message = "Marca no encontrada" });
    }

    marca.Activo = false; // Cambiamos el estado a deshabilitado
    _context.SaveChanges();

    return Json(new { success = true, message = "Marca deshabilitada correctamente" });
}


public IActionResult HabilitarMarca(int marcaID)
{
    var marca = _context.Marcas.FirstOrDefault(m => m.MarcaID == marcaID);
    if (marca == null)
    {
        return Json(new { success = false, message = "Marca no encontrada" });
    }

    marca.Activo = true; // Cambiamos el estado a habilitado
    _context.SaveChanges();

    return Json(new { success = true, message = "Marca habilitada correctamente" });
}


}