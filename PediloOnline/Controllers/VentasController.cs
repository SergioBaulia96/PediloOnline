using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PediloOnline.Data;
using PediloOnline.Models;
namespace PediloOnline.Controllers;

[Authorize]
public class VentasController : Controller
{
    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public VentasController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

}