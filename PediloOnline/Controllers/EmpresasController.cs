using Microsoft.AspNetCore.Mvc;
using PediloOnline.Data;

namespace PediloOnline.Models;

public class EmpresasController: Controller {
    private ApplicationDbContext _context;

    public EmpresasController(ApplicationDbContext context) 
    {
        _context = context;
    } 

    public IActionResult Index() {
        return View();
    }
}