using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;

namespace PediloOnline.Models;

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
            
             var empresadMostar = new VistaEmpresas
             {
                 EmpresaID = empresa.EmpresaID,
                 LocalidadID = localidad.LocalidadID,
                 LocalidadNombre = localidad.LocalidadNombre,
                 RazonSocial = empresa.RazonSocial, 
                 NombreFantasia = empresa.NombreFantasia,
                 Domicilio = empresa.Domicilio,
                 NroTipoDocumento = empresa.NroTipoDocumento,
                 Telefono = empresa.Telefono,
                 Email = empresa.Email,
                 UsuarioTitular = empresa.UsuarioTitular,
              
             };
             EmpresasMostar.Add(empresadMostar);
         }
         return Json(EmpresasMostar);
     }

    public JsonResult GuardarEmpresa(int empresaID, string razonSocial, string nombreFantasia, int localidad, string documento, string telefono, string email, string usuarioTitular)
    {
        string resultado = "";

        

        if(empresaID == 0)
        {
            var nuevaEmpresa = new Empresa
            {
                RazonSocial = razonSocial,
                NombreFantasia = nombreFantasia,
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
                editarEmpresa.EmpresaID = empresaID;
                editarEmpresa.RazonSocial = razonSocial;
                editarEmpresa.NombreFantasia = nombreFantasia;
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

}