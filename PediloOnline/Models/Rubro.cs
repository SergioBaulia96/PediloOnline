using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PediloOnline.Models;

    public class Rubro
    {
        [Key]
        public int RubroID { get; set; }

        public string RubroNombre { get; set; }

        public bool Eliminado { get; set; }

         public virtual ICollection<SubRubro> SubRubro { get; set; }

     
    }
