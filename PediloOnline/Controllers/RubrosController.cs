using Microsoft.AspNetCore.Mvc;
using PediloOnline.Data;
using PediloOnline.Models;
namespace PediloOnline.Controllers;


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
                        RubroNombre = rubroNombre
                    };
                    _context.Add(tipoRubro);
                    _context.SaveChanges();
                }
                else
                {
                    resultado = "YA EXISTE UN REGISTRO CON LA MISMA DESCRIPCIÓN";
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
                    }
                    else
                    {
                        resultado = "YA EXISTE UN REGISTRO CON LA MISMA DESCRIPCIÓN";
                    }
                }
            }
        }
        else
        {
            resultado = "DEBE INGRESAR UNA DESCRIPCIÓN.";
        }

        return Json(resultado);
    }

    public JsonResult EliminarRubro(int rubroID) {
        string resultado = "";
        
        var tieneSubrrubro = _context.SubRubros.Any(r => r.RubroID == rubroID); //si encuentra algun rubro que tiene subrubros asociados devuele true  

        if (tieneSubrrubro != true) { 
            var eliminarRubro = _context.Rubros.Find(rubroID);
            _context.Remove(eliminarRubro);
            _context.SaveChanges();
            resultado = "El rubro se elimino correctamente";
        }  else {
            resultado = "No se puede eliminar, el rubro tiene subrubros asociados";
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


    public JsonResult Buscar(string buscarRubro) {

         if (string.IsNullOrEmpty(buscarRubro))
        {
            return Json(new { results = new List<string>() });
        }

        var rubros = _context.Rubros
            .Where(r => r.RubroNombre.Contains(buscarRubro)) // Busca coincidencias en la columna "Nombre"
            .Select(r => new { r.RubroID, r.RubroNombre })  // Selecciona los campos necesarios
            .ToList();

        return Json(new { rubros });

    }
}
