using System.ComponentModel.DataAnnotations;

namespace PediloOnline.Models;

    public class Empresa
    {
        [Key]
        public int EmpresaID { get; set; }

        public int EmpresaIDLoguiGestion { get; set; }

        public string? RazonSocial { get; set; }


        public string? NombreFantasia { get; set; }

        public string? Domicilio { get; set; }

        public int LocalidadID { get; set; }


        public string? NroTipoDocumento { get; set; }

        public string? Telefono { get; set; }

        public string? Email { get; set; }

        public byte[] LogoBinario { get; set; }

        public string? UsuarioTitular { get; set; }

        public bool OcultaEnVista { get; set; }

        public virtual Localidad Localidades { get; set; }

        // public virtual ICollection<RubroComercioEmpresa> RubroComercioEmpresa { get; set; }


        // public virtual ICollection<PermisoUsuario> PermisoUsuarios { get; set; }


    }
