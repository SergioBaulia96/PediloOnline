window.onload = ListadoClientes();

function ListadoClientes() {
    let buscarLocalidad = document.getElementById("BuscarLocalidad").value;

    $.ajax({
        url: '../../Clientes/ListadoClientes',
        data: {
            BuscarLocalidad: buscarLocalidad
        },
        type: 'POST',
        datatype: 'json',
        success: function (clientesMostrar) {
            $("#clienteModal").modal("hide");
            LimpiarModal();
            let contenidoTabla = ``;

            $.each(clientesMostrar, function (index, clienteMostrar) {
                let deshabilitado = clienteMostrar.activo ? "" : "table-secondary"; // Cambia color si está deshabilitada
                let boton = clienteMostrar.activo 
                    ? `<button type="button" class="btn btn-secondary" onclick="DeshabilitarCliente(${clienteMostrar.clienteID}, event)">
                         <i class="fa-solid fa-ban"></i>
                       </button>`
                    : `<button type="button" class="btn btn-primary" onclick="HabilitarCliente(${clienteMostrar.clienteID}, event)">
                         <i class="fa-solid fa-check"></i> 
                       </button>`;

                let clickableClass = clienteMostrar.activo ? "clickable-row" : "";

                contenidoTabla += `
                <tr class="${deshabilitado} ${clickableClass}" id="fila-${clienteMostrar.clienteID}" data-id="${clienteMostrar.clienteID}">
                    <td>${clienteMostrar.tipoCliente}</td>
                    <td>${clienteMostrar.localidadNombre}</td>
                    <td>${clienteMostrar.nombreCompleto}</td>
                    <td>${clienteMostrar.domicilio}</td>
                    <td>${clienteMostrar.documento}</td>
                    <td>${clienteMostrar.telefono}</td>
                    <td>${clienteMostrar.email}</td>
                    <td class="text-center">
                        ${boton}
                    </td>
                </tr>`;
            });
            document.getElementById("tbody-clientes").innerHTML = contenidoTabla;

            // Asigna el evento de clic a las filas clicables
            $(".clickable-row").click(function() {
                let clienteID = $(this).data("id"); // Obtiene el ID de la fila
                AbrirEditarCliente(clienteID); // Llama a la función para abrir el modal
            });
        },
        error: function (xhr, status) {
            alert('Disculpe, existio un problema al deshabilitar');
        }
    });
}

function LimpiarModal() {
    document.getElementById("ClienteID").value = 0;
    document.getElementById("TipoCliente").value = 0;
    document.getElementById("LocalidadID").value = 0;
    document.getElementById("NombreCompleto").value = "";
    document.getElementById("Domicilio").value = "";
    document.getElementById("Documento").value = "";
    document.getElementById("Telefono").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("errorMensajeTipoCliente").style.display = "none";
    document.getElementById("errorMensajeLocalidad").style.display = "none";
    document.getElementById("errorMensajeNombre").style.display = "none";
    document.getElementById("errorMensajeDomicilio").style.display = "none";
    document.getElementById("errorMensajeDocumento").style.display = "none";
    document.getElementById("errorMensajeTelefono").style.display = "none";
    document.getElementById("errorMensajeEmail").style.display = "none";
}

function NuevoCliente() {
    $("#tituloModal").text("Nuevo Cliente");
}

function GuardarCliente() {
    let clienteID = document.getElementById("ClienteID").value;
    let tipoCliente = document.getElementById("TipoCliente").value;
    let localidadID = document.getElementById("LocalidadID").value;
    let nombreCompleto = document.getElementById("NombreCompleto").value;
    let domicilio = document.getElementById("Domicilio").value;
    let documento = document.getElementById("Documento").value;
    let telefono = document.getElementById("Telefono").value;
    let email = document.getElementById("Email").value;

    let isValid = true;

    if (tipoCliente === "") {
        document.getElementById("errorMensajeTipoCliente").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeTipoCliente").style.display = "none";
    }

    if (localidadID === "0") {
        document.getElementById("errorMensajeLocalidad").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeLocalidad").style.display = "none";
    }

    if (nombreCompleto === "") {
        document.getElementById("errorMensajeNombre").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeNombre").style.display = "none";
    }

    if (domicilio === "") {
        document.getElementById("errorMensajeDomicilio").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeDomicilio").style.display = "none";
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

    if (!isValid) {
        return;  // Detener la ejecución aquí si isValid es false
      }


    $.ajax({
        url: '../../Clientes/GuardarCliente',
        data: {
            ClienteID: clienteID
            , TipoCliente: tipoCliente
            , LocalidadID: localidadID
            , NombreCompleto: nombreCompleto
            , Domicilio: domicilio
            , Documento: documento
            , Telefono: telefono
            , Email: email
        },
        type: 'POST',
        datatype: 'json',
        success: function (resultado) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: resultado,
                showConfirmButton: false,
                timer: 1500
              });
            ListadoClientes();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el cliente');
        }
    });
}


function AbrirEditarCliente(clienteID) {
    $.ajax({
        url: '../../Clientes/TraerClientesAlModal',
        data: { clienteID: clienteID },
        type: 'POST',
        datatype: 'json',
        success: function (clientesPorID) {
            let cliente = clientesPorID[0];

            document.getElementById("ClienteID").value = clienteID;
            $("#tituloModal").text("Editar Cliente");
            document.getElementById("TipoCliente").value = cliente.tipoCliente,
                document.getElementById("LocalidadID").value = cliente.localidadID,
                document.getElementById("NombreCompleto").value = cliente.nombreCompleto,
                document.getElementById("Domicilio").value = cliente.domicilio,
                document.getElementById("Documento").value = cliente.documento,
                document.getElementById("Telefono").value = cliente.telefono,
                document.getElementById("Email").value = cliente.email;
            $("#clienteModal").modal("show");
        },

        error: function (xhr, status) {
            console.log('Disculpe, exitio un problema al editar el Cliente.');
        }
    });
}



//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
    texto.value = texto.value.toUpperCase();
}

function ValidarDeshabilitacion(clienteID) {
    Swal.fire({
        title: "¿Desea deshabilitar el cliente?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Deshabilitar",
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            DeshabilitarCliente(clienteID);
            Swal.fire("¡Cliente deshabilitado!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("El cliente no fue deshabilitado", "", "info");
        }
    });
}


function DeshabilitarCliente(clienteID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Clientes/DeshabilitarCliente',
        type: 'POST',
        data: { clienteID: clienteID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cliente deshabilitado',
                showConfirmButton: false,
                timer: 1500
            });
            ListadoClientes();
        },
        error: function(xhr, status) {
            alert('Error al deshabilitar el cliente');
        }
    });
}



function HabilitarCliente(clienteID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Clientes/HabilitarCliente',
        type: 'POST',
        data: { clienteID: clienteID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cliente habilitado',
                showConfirmButton: false,
                timer: 1500
            });
            // Refrescar la tabla de localidades
            ListadoClientes();
        },
        error: function(xhr, status) {
            alert('Error al habilitar el cliente');
        }
    });
}

