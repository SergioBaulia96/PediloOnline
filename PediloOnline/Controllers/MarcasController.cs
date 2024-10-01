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

    public JsonResult EliminarMarca(int marcaID)
    {
        var eliminarMarca = _context.Marcas.Find(marcaID);
        _context.Remove(eliminarMarca);
        _context.SaveChanges();

        return Json(eliminarMarca);
    } 


}