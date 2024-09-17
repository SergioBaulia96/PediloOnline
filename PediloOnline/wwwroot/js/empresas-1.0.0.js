window.onload = ListadoEmpresas();

function ListadoEmpresas() {
  $.ajax({
    url: "../../Empresas/ListadoEmpresas",
    data: {},
    type: "POST",
    dataType: "json",
    success: function (EmpresasMostar) {
      let contenidoTabla = ``;

      $.each(EmpresasMostar, function (index, empresa) {
        contenidoTabla += `
                <tr>
                    <td>${empresa.razonSocial}</td>
                    <td>${empresa.nombreFantasia}</td>
                    <td>${empresa.localidadNombre}</td>
                    <td>${empresa.nroTipoDocumento}</td>
                    <td>${empresa.telefono}</td>
                    <td>${empresa.email}</td>
                    <td>${empresa.usuarioTitular}</td>
                    <td>
                    <button type="button" class="btn btn-success" onclick="ModalEditarEmpresa(${empresa.empresaID})">
                    Editar
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick="ValidarEliminar(${empresa.empresaID})">
                    Eliminar
                    </button>
                    </td>
                </tr>
            `;
      });

      document.getElementById("tbody-tablaEmpresa").innerHTML = contenidoTabla;
    },

    error: function (xhr, status) {
      console.log("Disculpe, existió un problema al cargar el listado");
    },
  });
} 


function AgregarEmpresa() {
  let empresaID = document.getElementById("empresaID").value;
  let razonSocial = document.getElementById("razonSocial").value;
  let nombreFantasia = document.getElementById("razonSocial").value;
  let localidad = document.getElementById("LocalidadID").value;
  let documento = document.getElementById("documento").value;
  let telefono = document.getElementById("telefono").value;
  let email = document.getElementById("email").value;
  let usuarioTitular = document.getElementById("usuarioTitular").value;


  $.ajax({
    url: "../../Empresas/GuardarEmpresa",
    data: {
        empresaID: empresaID,
        razonSocial: razonSocial,
        nombreFantasia: nombreFantasia,
        localidad: localidad,
        documento: documento,
        telefono: telefono,
        email: email,
        usuarioTitular: usuarioTitular


    },
    type: "POST",
    dataType: "json",
    success: function (resultado) {
      /* alert(resultado); */
      ListadoEmpresas();
    },
    error: function (xhr, status) {
      console.log("Disculpe, existió un problema al guardar el registro");
    },
  });
}
