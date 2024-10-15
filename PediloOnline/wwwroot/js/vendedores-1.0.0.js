window.onload = ListadoVendedores();

function ListadoVendedores() {
    let buscarLocalidad = document.getElementById("LocalidadID").value;

    $.ajax({
        url: '../../Vendedores/ListadoVendedores',
        data: {
            buscarLocalidad: buscarLocalidad
        },
        type: 'POST',
        datatype: 'json',
        success: function (vendedoresMostrar) {
            $("#vendedorModal").modal("hide");
            LimpiarModal();
            let contenidoTabla = ``;

            $.each(vendedoresMostrar, function (index, vendedorMostrar) {
                let deshabilitado = vendedorMostrar.activo ? "" : "table-secondary"; // Cambia color si está deshabilitada
                let boton = vendedorMostrar.activo 
                    ? `<button type="button" class="btn btn-secondary" onclick="DeshabilitarVendedor(${vendedorMostrar.vendedorID}, event)">
                         <i class="fa-solid fa-ban"></i>
                       </button>`
                    : `<button type="button" class="btn btn-primary" onclick="HabilitarVendedor(${vendedorMostrar.vendedorID}, event)">
                         <i class="fa-solid fa-check"></i> 
                       </button>`;

                let clickableClass = vendedorMostrar.activo ? "clickable-row" : "";

                contenidoTabla += `
                <tr class="${deshabilitado} ${clickableClass}" id="fila-${vendedorMostrar.VendedorID}" data-id="${vendedorMostrar.vendedorID}">
                    <td>${vendedorMostrar.nombreCompleto}</td>
                    <td>${vendedorMostrar.domicilio}</td>
                    <td>${vendedorMostrar.localidadNombre}</td>
                    <td>${vendedorMostrar.documento}</td>
                    <td>${vendedorMostrar.telefono}</td>
                    <td>${vendedorMostrar.email}</td>
                    <td class="text-center">
                        ${boton}
                    </td>
                </tr>`;
            });
            document.getElementById("tbody-vendedores").innerHTML = contenidoTabla;

            // Asigna el evento de clic a las filas clicables
            $(".clickable-row").click(function() {
                let vendedorID = $(this).data("id"); // Obtiene el ID de la fila
                AbrirEditarVendedor(vendedorID); // Llama a la función para abrir el modal
            });
        },
        error: function (xhr, status) {
            alert('Disculpe, existio un problema al deshabilitar');
        }
    });
}

function LimpiarModal() {
    document.getElementById("VendedorID").value = 0;
    document.getElementById("LocalidadID").value = 0;
    document.getElementById("NombreCompleto").value = "";
    document.getElementById("Domicilio").value = "";
    document.getElementById("Documento").value = "";
    document.getElementById("Telefono").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("errorMensajeLocalidad").style.display = "none";
    document.getElementById("errorMensajeNombre").style.display = "none";
    document.getElementById("errorMensajeDomicilio").style.display = "none";
    document.getElementById("errorMensajeDocumento").style.display = "none";
    document.getElementById("errorMensajeTelefono").style.display = "none";
    document.getElementById("errorMensajeEmail").style.display = "none";
}
function NuevoVendedor() {
    $("#tituloModal").text("Nuevo vendedor");
}

function GuardarVendedor() {
    let vendedorID = document.getElementById("VendedorID").value;
    let localidadID = document.getElementById("LocalidadID").value;
    let nombreCompleto = document.getElementById("NombreCompleto").value;
    let domicilio = document.getElementById("Domicilio").value;
    let documento = document.getElementById("Documento").value;
    let telefono = document.getElementById("Telefono").value;
    let email = document.getElementById("Email").value;

    let isValid = true;

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
        url: '../../Vendedores/GuardarVendedor',
        data: {
            VendedorID: vendedorID, LocalidadID: localidadID, NombreCompleto: nombreCompleto, Domicilio: domicilio, Documento: documento, Telefono: telefono, Email: email
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
              ListadoVendedores();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el cliente');
        }
    });
}

function AbrirEditarVendedor(vendedorID) {
    $.ajax({
        url: '../../Vendedores/TraerVendedoresAlModal',
        data: { vendedorID: vendedorID },
        type: 'POST',
        datatype: 'json',
        success: function (vendedoresPorID) {
            let vendedor = vendedoresPorID[0];

            document.getElementById("VendedorID").value = vendedorID;
            $("#tituloModal").text("Editar Vendedor");
                document.getElementById("LocalidadID").value = vendedor.localidadID,
                document.getElementById("NombreCompleto").value = vendedor.nombreCompleto,
                document.getElementById("Domicilio").value = vendedor.domicilio,
                document.getElementById("Documento").value = vendedor.documento,
                document.getElementById("Telefono").value = vendedor.telefono,
                document.getElementById("Email").value = vendedor.email;
            $("#vendedorModal").modal("show");
        },

        error: function (xhr, status) {
            console.log('Disculpe, exitio un problema al editar el vendedor.');
        }
    });
}
function textoMayuscula(texto) {
    texto.value = texto.value.toUpperCase();
}

function HabilitarVendedor(vendedorID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Vendedores/HabilitarVendedor',
        type: 'POST',
        data: { vendedorID: vendedorID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Vendedor habilitado',
                showConfirmButton: false,
                timer: 1500
            });
            // Refrescar la tabla de localidades
            ListadoVendedores();
        },
        error: function(xhr, status) {
            alert('Error al habilitar el Vendedor');
        }
    });
}


function DeshabilitarVendedor(vendedorID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Vendedores/DeshabilitarVendedor',
        type: 'POST',
        data: { vendedorID: vendedorID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Vendedor deshabilitado',
                showConfirmButton: false,
                timer: 1500
            });
            ListadoVendedores();
        },
        error: function(xhr, status) {
            alert('Error al deshabilitar el vendedor');
        }
    });
}
