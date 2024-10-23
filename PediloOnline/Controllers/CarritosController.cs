using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PediloOnline.Data;
using PediloOnline.Models;
namespace PediloOnline.Controllers;

[Authorize]
public class CarritosController : Controller
{
    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public CarritosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]"}
        };

        ViewBag.ClienteID = selectListItems.OrderBy(t => t.Text).ToList();

        var clientes = _context.Clientes.ToList();
        clientes.Add(new Cliente { ClienteID = 0, NombreCompleto = "[SELECCIONE...]" });
        ViewBag.ClienteID = new SelectList(clientes.OrderBy(c => c.NombreCompleto), "ClienteID", "NombreCompleto");

        return View();
    }

}