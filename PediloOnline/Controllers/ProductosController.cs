using PediloOnline.Data;
using Microsoft.AspNetCore.Mvc;
using PediloOnline.Models;

namespace PediloOnline.Controllers;

public class ProductosController : Controller
{
    private ApplicationDbContext _context;
    public ProductosController(ApplicationDbContext context)
    {
        _context = context;
    }
    public IActionResult Index()
    {
        return View();
    }

}