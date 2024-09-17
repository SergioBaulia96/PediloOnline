

using System.ComponentModel.DataAnnotations;

namespace PediloOnline.Models;

    public class Carrito
    {
        [Key]
        public int CarritoID { get; set; }

        public int UsuarioID { get; set; }

        public int ClienteID { get; set; }

        public string? Domicilio { get; set; }

        public decimal Total { get; set; }

        public int EmpresaID { get; set; }//COMERCIO AL QUE LE ESTA COMPRANDO      

        //[NotMapped]
        //public List<DetalleCarrito> DetalleCarrito { get; set; }

        //[NotMapped]
        //public string NombreFinalEmpresa { get; set; }        
    }
