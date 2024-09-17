
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace PediloOnline.Models;

    public class Provincia
    {
        [Key]
       public int ProvinciaID { get; set; }

        public string? ProvinciaNombre { get; set; }


         public virtual ICollection<Localidad> Localidades { get; set; }
    }
