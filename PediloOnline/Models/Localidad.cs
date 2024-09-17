
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace PediloOnline.Models;

    public class Localidad
    {
        [Key]
          public int LocalidadID { get; set; }

        public string? LocalidadNombre { get; set; }

        public string? CodigoPostal { get; set; }

        public int ProvinciaID { get; set; }

        // [NotMapped]
        // public string NombreVista { get { return LocalidadNombre + " / " + Provincia.ProvinciaNombre.ToUpper() + " / " + Provincia.Paises.PaisNombre; } }

         public virtual Provincia Provincias { get; set; }

         public virtual ICollection<Cliente> Clientes { get; set; }

         public virtual ICollection<Empresa> Empresas { get; set; }

    }

    public class Vistalocalidades
{
    public int LocalidadID { get; set; }

    public int ProvinciaID { get; set; }

    public string? Nombre { get; set; }
    public string? CodigoPostal { get; set; }

    public string? NombreProvincia { get; set; }
   
}

