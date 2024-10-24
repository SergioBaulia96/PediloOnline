

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;
using PediloOnline.Models;

namespace PediloOnline.Controllers;
[Authorize]
public class ClientesController : Controller
{
    private ApplicationDbContext _context;

    public ClientesController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Clientes()
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

    public JsonResult ListadoClientes(int? id, int? buscarLocalidad)
    {
        List<VistaCliente> clientesMostrar = new List<VistaCliente>();

        var clientes = _context.Clientes.AsQueryable();

        if (id != null)
        {
            clientes = clientes.Where(t => t.ClienteID == id);
        }

        if (buscarLocalidad != 0)
        {
            clientes = clientes.Where(t => t.LocalidadID == buscarLocalidad);
        }

        var localidades = _context.Localidades.ToList();

        foreach (var cliente in clientes)
        {
            var localidad = localidades.Where(t => t.LocalidadID == cliente.LocalidadID).Single();

            var clienteMostrar = new VistaCliente
            {
                ClienteID = cliente.ClienteID,
                TipoCliente = Enum.GetName(typeof(TipoCliente), cliente.TipoCliente),
                LocalidadID = cliente.LocalidadID,
                LocalidadNombre = localidad.LocalidadNombre,
                NombreCompleto = cliente.NombreCompleto,
                Domicilio = cliente.Domicilio,
                Documento = cliente.Documento,
                Telefono = cliente.Telefono,
                Email = cliente.Email,
                Activo = cliente.Activo
            };
            clientesMostrar.Add(clienteMostrar);
        }


        return Json(clientesMostrar);
    }

    public JsonResult TraerClientesAlModal(int? ClienteID)
    {
        var clientesPorID = _context.Clientes.ToList();
        if (ClienteID != null)
        {
            clientesPorID = clientesPorID.Where(e => e.ClienteID == ClienteID).ToList();
        }

        return Json(clientesPorID.ToList());
    }

    public JsonResult GuardarCliente(int ClienteID, TipoCliente TipoCliente, int LocalidadID, string NombreCompleto, string Domicilio, string Documento, string Telefono, string Email
        )
    {
        string resultado = "";
        if (ClienteID == 0)
        {
            if (LocalidadID > 0)
            {
                var Cliente = new Cliente
                {
                    LocalidadID = LocalidadID,
                    TipoCliente = TipoCliente,
                    NombreCompleto = NombreCompleto,
                    Domicilio = Domicilio,
                    Documento = Documento,
                    Telefono = Telefono,
                    Email = Email,
                    Activo = true
                };
                _context.Add(Cliente);
                _context.SaveChanges();

                resultado = "El cliente se guardo correctamente";
            }
        }
        else
        {
            var editarCliente = _context.Clientes.Where(e => e.ClienteID == ClienteID).SingleOrDefault();
            if (editarCliente != null)
            {
                editarCliente.LocalidadID = LocalidadID;
                editarCliente.TipoCliente = TipoCliente;
                editarCliente.NombreCompleto = NombreCompleto;
                editarCliente.Domicilio = Domicilio;
                editarCliente.Telefono = Telefono;
                editarCliente.Email = Email;

                _context.SaveChanges();

                resultado = "El cliente se actualizó correctamente";
            }
        }
        return Json(resultado);
    }

    public IActionResult DeshabilitarCliente(int clienteID)
    {
        var cliente = _context.Clientes.FirstOrDefault(c => c.ClienteID == clienteID);
        if (cliente == null)
        {
            return Json(new { success = false, message = "Localidad no encontrada" });
        }

        cliente.Activo = false; // Cambiamos el estado a deshabilitado
        _context.SaveChanges();

        return Json(new { success = true, message = "Cliente deshabilitado correctamente" });
    }


    public IActionResult HabilitarCliente(int clienteID)
    {
        var cliente = _context.Clientes.FirstOrDefault(c => c.ClienteID == clienteID);
        if (cliente == null)
        {
            return Json(new { success = false, message = "Cliente no encontrado" });
        }

        cliente.Activo = true; // Cambiamos el estado a habilitado
        _context.SaveChanges();

        return Json(new { success = true, message = "Cliente habilitado correctamente" });
    }
}