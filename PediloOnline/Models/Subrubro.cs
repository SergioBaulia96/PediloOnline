using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PediloOnline.Models;

    public class SubRubro
    {
        [Key]
              
        public int SubRubroID { get; set; }

        public int RubroID { get; set; }

        public string? SubRubroNombre { get; set; }

        public bool Eliminado { get; set; }

         public virtual Rubro Rubros { get; set; } 

         public virtual ICollection<Producto> Productos { get; set; } 
    }

    public class Vistasubrubro {
        public int SubRubroID { get; set; }

        public int RubroID { get; set; }
        public string? RubroNombre {get; set;}

        public string? SubRubroNombre { get; set; }

        public bool Eliminado { get; set; }

    }
