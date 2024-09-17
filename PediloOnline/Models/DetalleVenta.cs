using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PediloOnline.Models;

    public class DetalleVenta
    {
        [Key]
        public int DetalleVentaID { set; get; }

        public int VentaID { get; set; }

        public int ProductoID { get; set; }

        public string Descripcion { get; set; }

        public int MarcaID { get; set; }

        public int SubRubroID { get; set; }

        public decimal PrecioVenta { get; set; }

        public decimal CantidadSolicitada { get; set; }//CANTIDAD SOLICITADA AL MOMENTO DE CREAR EL PEDIDO POR EL CLIENTE

        public decimal Cantidad { get; set; }

        public decimal SubTotal { get; set; }

        public int EmpresaID { get; set; }

        public virtual Venta Venta { get; set; }
    }
