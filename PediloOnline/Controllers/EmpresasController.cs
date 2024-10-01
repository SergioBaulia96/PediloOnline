using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;

namespace PediloOnline.Models;
[Authorize]
public class EmpresasController: Controller {
    private ApplicationDbContext _context;

    public EmpresasController(ApplicationDbContext context) 
    {
        _context = context;
    } 

    public IActionResult Index() {

        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]"}
        };

        ViewBag.LocalidadID = selectListItems.OrderBy(t => t.Text).ToList();

        var localidades = _context.Localidades.ToList();
        localidades.Add(new Localidad { LocalidadID = 0, LocalidadNombre = "[SELECCIONE...]" });
        ViewBag.LocalidadID = new SelectList(localidades.OrderBy(c => c.LocalidadNombre), "LocalidadID", "LocalidadNombre");

        return View();
        
    }

    public JsonResult ListadoEmpresas()
     {
         List<VistaEmpresas> EmpresasMostar = new List<VistaEmpresas>();

         var listadoLocalidades = _context.Localidades.ToList();
         var listadoEmpresas = _context.Empresas.ToList();



          foreach (var empresa in listadoEmpresas)
         {
             var localidad = listadoLocalidades.Where(t => t.LocalidadID == empresa.LocalidadID).Single();
            
             var empresaMostar = new VistaEmpresas
             {
                 EmpresaID = empresa.EmpresaID,
                 LocalidadID = empresa.LocalidadID,
                 LocalidadNombre = localidad.LocalidadNombre,
                 RazonSocial = empresa.RazonSocial, 
                 NombreFantasia = empresa.NombreFantasia,
                 Domicilio = empresa.Domicilio,
                 NroTipoDocumento = empresa.NroTipoDocumento,
                 Telefono = empresa.Telefono,
                 Email = empresa.Email,
                 UsuarioTitular = empresa.UsuarioTitular,
              
             };
             EmpresasMostar.Add(empresaMostar);
         }
         return Json(EmpresasMostar);
     }

    public JsonResult GuardarEmpresa(int empresaID, string razonSocial, string nombreFantasia, string domicilio, int localidad, string documento, string telefono, string email, string usuarioTitular)
    {
        string resultado = "";

        

        if(empresaID == 0)
        {
            var nuevaEmpresa = new Empresa
            {
                RazonSocial = razonSocial,
                NombreFantasia = nombreFantasia,
                Domicilio = domicilio,
                LocalidadID = localidad,
                NroTipoDocumento = documento,
                Telefono = telefono,
                Email = email,
                UsuarioTitular = usuarioTitular,
            };
            _context.Add(nuevaEmpresa);
            _context.SaveChanges();
            resultado = "Marca Guardada";
        }
        else
        {
            var editarEmpresa = _context.Empresas.Where(e => e.EmpresaID == empresaID).SingleOrDefault();
            
            if(editarEmpresa != null)
            {
                /* editarEmpresa.EmpresaID = empresaID; */
                editarEmpresa.RazonSocial = razonSocial;
                editarEmpresa.NombreFantasia = nombreFantasia;
                 editarEmpresa.Domicilio = domicilio;
                editarEmpresa.NroTipoDocumento = documento;
                editarEmpresa.Telefono = telefono;
                editarEmpresa.Email = email;
                editarEmpresa.UsuarioTitular = usuarioTitular;
                editarEmpresa.LocalidadID = localidad;

                _context.SaveChanges();
                resultado = "Marca Editada";
            }
        }
        return Json(resultado);
    }

    public JsonResult TraerEmpresasaModal(int? empresaID) 
    {
        var empresaPorID = _context.Empresas.ToList();
        if (empresaID != null)
        {
            empresaPorID = empresaPorID.Where(e => e.EmpresaID == empresaID).ToList();
        }

        return Json(empresaPorID.ToList());
    }


    public JsonResult EliminarEmpresa( int empresaID) {
        var empresa = _context.Empresas.Find(empresaID);
        _context.Remove(empresa);
        _context.SaveChanges();
        return Json (true);
    }
}