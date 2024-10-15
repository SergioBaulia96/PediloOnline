using System.ComponentModel.DataAnnotations;

namespace PediloOnline.Models {
    public class Vendedor {
        [Key]
        public int VendedorID {get; set;}
        public int LocalidadID {get; set;}
        public string? NombreCompleto {get; set;}
        public string? Domicilio {get; set;}
        public string? Documento {get; set;}
        public string? Telefono {get; set;}
        public string? Email {get; set;}
        public bool Activo {get; set;}
        
        public virtual Localidad Localidad {get;set;}
}

    public class VistaVendedores {
        public int VendedorID {get; set;}
        public int LocalidadID {get; set;}
        public string? LocalidadNombre {get; set;}
        public string? NombreCompleto {get; set;}
        public string? Domicilio {get; set;}
        public string? Documento {get; set;}
        public string? Telefono {get; set;}
        public string? Email {get; set;}
        public bool Activo {get; set;}
    }

}
