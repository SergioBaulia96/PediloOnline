

using System.ComponentModel.DataAnnotations;

namespace PediloOnline.Models;

    public class Venta
    {
        [Key]
        public int VentaID { get; set; }

        public DateTime FechaVenta { get; set; }

        public string? PtoVta { get; set; }

        public string? NroComprobante { get; set; }

        public int ClienteID { get; set; }

        public string? Domicilio { get; set; }

        public EstadoVenta EstadoVenta { get; set; }

        public string? Observacion { get; set; }

        public DateTime FechaPosibleEntrega { get; set; }

        public decimal Total { get; set; }

        public int EmpresaID { get; set; }

         public virtual Cliente Cliente { get; set; }

         public virtual ICollection<DetalleVenta> DetalleVentas { get; set; }
         
    }

    public enum EstadoVenta
    {
        Pendiente,
        EnPreparacion,
        Cancelado,
        Entregado
    }
