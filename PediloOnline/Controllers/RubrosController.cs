using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PediloOnline.Data;
using PediloOnline.Models;
namespace PediloOnline.Controllers;

[Authorize]
public class RubrosController : Controller
{
    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public RubrosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public JsonResult Listado(int? id)
    {
        var tipoRubros = _context.Rubros.ToList();

        if (id !=null)
        {
            tipoRubros = tipoRubros.Where(r => r.RubroID == id).ToList();
        }

        return Json(tipoRubros);
    }

    public JsonResult GuardarRubro(int rubroId, string rubroNombre)
    {
        string resultado = "";

        if (!String.IsNullOrEmpty(rubroNombre))
        {
            rubroNombre = rubroNombre.ToUpper();
            //INGRESA SI ESCRIBIO SI O SI 

            //2- VERIFICAR SI ESTA EDITANDO O CREANDO NUEVO REGISTRO
            if (rubroId == 0)
            {
                //3- VERIFICAMOS SI EXISTE EN BASE DE DATOS UN REGISTRO CON LA MISMA DESCRIPCION
                //PARA REALIZAR ESA VERIFICACION BUSCAMOS EN EL CONTEXTO, ES DECIR EN BASE DE DATOS 
                //SI EXISTE UN REGISTRO CON ESA DESCRIPCION  
                var existeRubro = _context.Rubros.Where(t => t.RubroNombre == rubroNombre).Count();
                if (existeRubro == 0)
                {
                    //4- GUARDAR EL TIPO DE EJERCICIO
                    var tipoRubro = new Rubro
                    {
                        RubroNombre = rubroNombre,
                        Activo = true
                    };
                    _context.Add(tipoRubro);
                    _context.SaveChanges();

                    resultado = "Se guardo el rubro correctamente";
                }
                
            }
            else
            {
                //QUIERE DECIR QUE VAMOS A EDITAR EL REGISTRO
                var rubroEditar = _context.Rubros.Where(t => t.RubroID == rubroId).SingleOrDefault();
                if (rubroEditar != null)
                {
                    //BUSCAMOS EN LA TABLA SI EXISTE UN REGISTRO CON EL MISMO NOMBRE PERO QUE EL ID SEA DISTINTO AL QUE ESTAMOS EDITANDO
                    var existeTipoEjercicio = _context.Rubros.Where(t => t.RubroNombre == rubroNombre && t.RubroID != rubroId).Count();
                    if (existeTipoEjercicio == 0)
                    {
                        //QUIERE DECIR QUE EL ELEMENTO EXISTE Y ES CORRECTO ENTONCES CONTINUAMOS CON EL EDITAR
                        rubroEditar.RubroNombre = rubroNombre;
                        _context.SaveChanges();

                        resultado = "Se modifico el rubro correctamnete";
                    }
                    
                }
            }
        }
        
        return Json(resultado);
    }

 

    public JsonResult TraerRubrosModal(int? rubroId)
    {
        var rubrosPorID = _context.Rubros.ToList();
        if (rubroId != null)
        {
            rubrosPorID = rubrosPorID.Where(e => e.RubroID == rubroId).ToList();
        }

        return Json(rubrosPorID.ToList());
    }

public IActionResult DeshabilitarRubro(int rubroID)
{
    var rubro = _context.Rubros.FirstOrDefault(r => r.RubroID == rubroID);
    if (rubro == null)
    {
        return Json(new { success = false, message = "Rubro no encontrado" });
    }

     // Verificamos si el subrubro tiene un rubro asociado
    var subRubroAsociado = _context.SubRubros.Any(s => s.SubRubroID == rubro.RubroID);
    if (subRubroAsociado)
    {
        return Json(new { success = false, message = "No se puede deshabilitar el rubro porque está asociado a un subrubro" });
    }

    rubro.Activo = false; // Cambiamos el estado a deshabilitado
    _context.SaveChanges();

    return Json(new { success = true, message = "Rubro deshabilitado correctamente" });
}


public IActionResult HabilitarRubro(int rubroID)
{
    var rubro = _context.Rubros.FirstOrDefault(r => r.RubroID == rubroID);
    if (rubro == null)
    {
        return Json(new { success = false, message = "Rubro no encontrado" });
    }

    rubro.Activo = true; // Cambiamos el estado a habilitado
    _context.SaveChanges();

    return Json(new { success = true, message = "Rubro habilitado correctamente" });
}

public JsonResult Buscar(string buscarRubro)
{
    var rubrosFiltrados = _context.Rubros
        .Where(r => r.RubroNombre.Contains(buscarRubro))
        .Select(r => new {
            r.RubroID,
            r.RubroNombre
        })
        .ToList();

    return Json(rubrosFiltrados);
}
}
