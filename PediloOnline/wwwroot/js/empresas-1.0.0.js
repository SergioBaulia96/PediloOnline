window.onload = ListadoEmpresas();


function ListadoEmpresas() {
  $.ajax({
    url: "../../Empresas/ListadoEmpresas",
    data: {},
    type: "POST",
    dataType: "json",
    success: function (EmpresasMostar) {
      $("#modalEmpresas").modal("hide");
      LimpiarModal();
      let contenidoTabla = ``;

      $.each(EmpresasMostar, function (index, empresa) {
        contenidoTabla += `
                <tr>
                    <td>${empresa.razonSocial}</td>
                    <td>${empresa.nombreFantasia}</td>
                    <td>${empresa.domicilio}</td>
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

function LimpiarModal(){
  document.getElementById("empresaID").value = 0 ;
  document.getElementById("razonSocial").value = "";
  document.getElementById("nombreFantasia").value = "";
  document.getElementById("domicilio").value = "";
  document.getElementById("LocalidadID").value = 0;
  document.getElementById("documento").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("email").value = "";
  document.getElementById("usuarioTitular").value = "";
}

function AgregarEmpresa() {
  let empresaID = document.getElementById("empresaID").value;
  let razonSocial = document.getElementById("razonSocial").value;
  let nombreFantasia = document.getElementById("razonSocial").value;
  let domicilio = document.getElementById("domicilio").value;
  let localidad = document.getElementById("LocalidadID").value;
  let documento = document.getElementById("documento").value;
  let telefono = document.getElementById("telefono").value;
  let email = document.getElementById("email").value;
  let usuarioTitular = document.getElementById("usuarioTitular").value;

  let isValid = true;

  if (razonSocial === "") {
      document.getElementById("errorMensajeRazonSocial").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("errorMensajeRazonSocial").style.display = "none";
  }

  if (nombreFantasia === "") {
      document.getElementById("errorMensajeNombreFantasia").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("errorMensajeNombreFantasia").style.display = "none";
  }

  if (domicilio === "") {
      document.getElementById("errorMensajeDomicilio").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("errorMensajeDomicilio").style.display = "none";
  }

  if (localidad === "0") {
      document.getElementById("errorMensajeLocalidad").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("errorMensajeLocalidad").style.display = "none";
  }

  if (documento === "") {
      document.getElementById("errorMensajeDocumento").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("errorMensajeDocumento").style.display = "none";
  }

  if (telefono === "") {
      document.getElementById("errorMensajeTelefono").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("errorMensajeTelefono").style.display = "none";
  }

  if (email === "") {
      document.getElementById("errorMensajeEmail").style.display = "block";
      isValid = false;
  } else {
      document.getElementById("errorMensajeEmail").style.display = "none";
  }

  if (usuarioTitular === "") {
    document.getElementById("errorMensajeUsuarioTitular").style.display = "block";
    isValid = false;
} else {
    document.getElementById("errorMensajeUsuarioTitular").style.display = "none";
}

  if (!isValid) {
      return;  // Detener la ejecución aquí si isValid es false
    }


  $.ajax({
    url: "../../Empresas/GuardarEmpresa",
    data: {
        empresaID: empresaID,
        razonSocial: razonSocial,
        domicilio: domicilio,
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
      ListadoEmpresas();
    },
    error: function (xhr, status) {
      console.log("Disculpe, existió un problema al guardar el registro");
    },
  });
}

function textoMayuscula(texto) {
  texto.value = texto.value.toUpperCase();
}

function ModalEditarEmpresa (empresaID) {
  $.ajax({
    url:'../../Empresas/TraerEmpresasaModal',
    data: {empresaID: empresaID},
    type: 'POST',
    datatype: 'json',
    success: function (empresaPorID){
        let empresa = empresaPorID[0];

        document.getElementById("empresaID").value = empresaID;
        $("#tituloModal").text("Editar Empresa");
        document.getElementById("razonSocial").value = empresa.razonSocial,
        document.getElementById("nombreFantasia").value = empresa.nombreFantasia,
        document.getElementById("domicilio").value = empresa.domicilio,
        document.getElementById("LocalidadID").value = empresa.localidadID,
        document.getElementById("documento").value = empresa.nroTipoDocumento,
        document.getElementById("telefono").value = empresa.telefono,
        document.getElementById("email").value = empresa.email;
        document.getElementById("usuarioTitular").value = empresa.usuarioTitular;
        $("#modalEmpresas").modal("show");
    },

    error: function (xhr, status){
        console.log('Disculpe, exitio un problema al editar el nobre de la empresa.');
    }
});
}

function ValidarEliminar (empresaID) {
  var elimina = confirm("¿Desea eliminar la empresa?")
  if (elimina == true) {
    EliminarEmpresa(empresaID);
  }
}

function EliminarEmpresa(empresaID) {
  $.ajax({
    url: '../../Empresas/EliminarEmpresa',
    data: { empresaID: empresaID },
    type: 'POST',
    dataType: 'json',
    success: function(EliminarCliente){
      ListadoEmpresas()
    },
    error: function(xhr, status){
        console.log('Problemas al eliminar el cliente');
    }
});
}
