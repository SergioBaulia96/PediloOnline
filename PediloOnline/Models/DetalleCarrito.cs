using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PediloOnline.Models;

    public class DetalleCarrito
    {
        [Key]
        public int DetalleCarritoID { get; set; }

        public int UsuarioID { get; set; }

        public int ProductoID { get; set; }

        public string? Descripcion { get; set; }

        public decimal Precio { get; set; }

        public decimal Cantidad { get; set; }

        public decimal SubTotal { get; set; }

        public DateTime FechaAgregado { get; set; }

        public int EmpresaID { get; set; }//COMERCIO AL QUE LE ESTA COMPRANDO
   
        public string ImagenProductoString { get; set; }
    }
