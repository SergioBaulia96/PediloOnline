using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PediloOnline.Models;


public class Producto
{
    [Key]
    public int ProductoID { get; set; }
    public int SubRubroID { get; set; }
    public int MarcaID { get; set; }
    public string? NombreProducto { get; set; }
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public bool Eliminado { get; set; }

    public virtual SubRubro SubRubros { get; set; } 
    public virtual Marca Marcas { get; set;}

}

public class VistaTipoProductos
{
    public int ProductoID { get; set; }
    public int SubRubroID { get; set; }
    public int  MarcaID { get; set;}
    public string? NombreProducto { get; set; }
    public decimal Precio { get; set; }
    public string? Descripcion { get; set; }
    public bool? Estado { get; set;}
    public string? NombreSubRubro { get; set; }
    public string? NombreMarca { get; set; }

}
