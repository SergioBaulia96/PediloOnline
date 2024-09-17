using System.ComponentModel.DataAnnotations;

namespace PediloOnline.Models;

public class Marca
{
    [Key]

    public int MarcaID { get; set; }
    public string? MarcaNombre { get; set; }
    public bool Eliminado { get; set; }

    public virtual ICollection<Producto> Productos { get; set; }
}