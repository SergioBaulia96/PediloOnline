using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;
using PediloOnline.Models;
using SQLitePCL;
namespace PediloOnline.Controllers;


public class SubrubrosController : Controller
{
    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public SubrubrosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var rubros = _context.Rubros.Select(p => new SelectListItem
        {
            Value = p.RubroID.ToString(),
            Text = p.RubroNombre
        }).ToList();

        ViewBag.Rubro = rubros;

        return View(); ;


    }

    public JsonResult ListaSubrubros()
    {
        List<Vistasubrubro> subrubrosMostar = new List<Vistasubrubro>();
        var listadoSubrubros = _context.SubRubros.ToList();

        var listadoRubros = _context.Rubros.ToList();
        foreach (var subrubros in listadoSubrubros)
        {
            var subrubro = listadoSubrubros.Where(t => t.SubRubroID == subrubros.SubRubroID).Single();
            var rubro = listadoRubros.Where(t => t.RubroID == subrubro.RubroID).Single();

            var subrubroMostar = new Vistasubrubro
            {
                SubRubroID = subrubro.SubRubroID,
                RubroID = subrubro.RubroID,
                RubroNombre = rubro.RubroNombre,
                SubRubroNombre = subrubro.SubRubroNombre,


            };
            subrubrosMostar.Add(subrubroMostar);
        }
        return Json(subrubrosMostar);
    }


    public JsonResult GuardarsubRubro(int subRubroID, int RubroID, string subrubroNombre)
    {
        string resultado = "";

        if (!String.IsNullOrEmpty(subrubroNombre))
        {
            subrubroNombre = subrubroNombre.ToUpper();
            //INGRESA SI ESCRIBIO SI O SI 

            //2- VERIFICAR SI ESTA EDITANDO O CREANDO NUEVO REGISTRO
            if (subRubroID == 0)
            {
                //3- VERIFICAMOS SI EXISTE EN BASE DE DATOS UN REGISTRO CON LA MISMA DESCRIPCION
                //PARA REALIZAR ESA VERIFICACION BUSCAMOS EN EL CONTEXTO, ES DECIR EN BASE DE DATOS 
                //SI EXISTE UN REGISTRO CON ESA DESCRIPCION  
                var existesubRubro = _context.SubRubros.Where(t => t.SubRubroNombre == subrubroNombre).Count();
                if (existesubRubro == 0)
                {
                    //4- GUARDAR EL TIPO DE EJERCICIO
                    var tiposubRubro = new SubRubro
                    {
                        RubroID = RubroID,
                        SubRubroID = subRubroID,
                        SubRubroNombre = subrubroNombre
                    };
                    _context.Add(tiposubRubro);
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
                var subrubroEditar = _context.SubRubros.Where(t => t.SubRubroID == subRubroID).SingleOrDefault();
                if (subrubroEditar != null)
                {
                    //BUSCAMOS EN LA TABLA SI EXISTE UN REGISTRO CON EL MISMO NOMBRE PERO QUE EL ID SEA DISTINTO AL QUE ESTAMOS EDITANDO
                    var existesubRubro = _context.SubRubros.Where(t => t.SubRubroNombre == subrubroNombre && t.SubRubroID != subRubroID).Count();
                    if (existesubRubro == 0)
                    {
                        //QUIERE DECIR QUE EL ELEMENTO EXISTE Y ES CORRECTO ENTONCES CONTINUAMOS CON EL EDITAR
                        subrubroEditar.SubRubroNombre = subrubroNombre;
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

    public JsonResult EliminarSubrubro(int subRubroID)
    {
        var subrubro = _context.SubRubros.Find(subRubroID);
        _context.Remove(subrubro);
        _context.SaveChanges();

        return Json(true);
    }
}








