using System.ComponentModel.DataAnnotations;
using PediloOnline.Data;

namespace PediloOnline.Models;

public class Cliente
{
    [Key]
    public int ClienteID { get; set; }
    public int LocalidadID { get; set; }
    public string? NombreCompleto { get; set; }
    public string? Domicilio { get; set; }
    public string? Documento { get; set; }
    public string? Telefono { get; set; }
    public TipoCliente TipoCliente { get; set; }
    public string? Email { get; set; }
    public bool Eliminado { get; set; }


    public virtual ICollection<Venta> Ventas { get; set; }

    public virtual Localidad Localidades { get; set; }


}

public enum TipoCliente
{
    Cliente,
    ClienteVendedor
}

public class VistaCliente
{
        public int ClienteID { get; set; }
    public int LocalidadID { get; set; }
    public string? LocalidadNombre { get; set;}
    public string? NombreCompleto { get; set; }
    public string? Domicilio { get; set; }
    public string? Documento { get; set; }
    public string? Telefono { get; set; }
    public string? TipoCliente { get; set; }
    public string? Email { get; set; }
    public bool Eliminado { get; set; }
}