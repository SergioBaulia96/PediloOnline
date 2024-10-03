window.onload = ListadoLocalidades();

function ListadoLocalidades() {
    $.ajax({
        url: '../../Localidades/ListadoLocalidades',
        type: 'POST',
        datatype: 'json',
        success: function(localidadesMostrar) {
            $("#localidadModal").modal("hide");
            LimpiarModal();
            let contenidoTabla = ``;

            $.each(localidadesMostrar, function(index, localidad) {
                let deshabilitado = localidad.activo ? "" : "table-secondary"; // Cambia color si está deshabilitada
                let boton = localidad.activo 
                    ? `<button type="button" class="btn btn-secondary" onclick="DeshabilitarLocalidad(${localidad.localidadID}, event)">
                         <i class="fa-solid fa-ban"></i>
                       </button>`
                    : `<button type="button" class="btn btn-primary" onclick="HabilitarLocalidad(${localidad.localidadID}, event)">
                         <i class="fa-solid fa-check"></i> 
                       </button>`;

                let clickableClass = localidad.activo ? "clickable-row" : "";

                contenidoTabla += `
                <tr class="${deshabilitado} ${clickableClass}" id="fila-${localidad.localidadID}" data-id="${localidad.localidadID}">
                    <td>${localidad.nombre}</td>
                    <td>${localidad.codigoPostal}</td>
                    <td>${localidad.nombreProvincia}</td>
                    <td class="text-center">
                        ${boton}
                    </td>
                </tr>`;
            });

            document.getElementById("tbody-localidades").innerHTML = contenidoTabla;

            // Asigna el evento de clic a las filas clicables
            $(".clickable-row").click(function() {
                let localidadID = $(this).data("id"); // Obtiene el ID de la fila
                AbrirEditarLocalidad(localidadID); // Llama a la función para abrir el modal
            });
        },
        error: function(xhr, status) {
            alert('Hubo un problema al listar las localidades');
        }
    });
}


function GuardarLocalidad() {
    let localidadID = document.getElementById("LocalidadID").value;
    let nombre = document.getElementById("LocalidadNombre").value.trim(); // Elimina espacios en blanco
    let codigoPostal = document.getElementById("CodigoPostal").value; // Elimina espacios en blanco
    let provinciaID = document.getElementById("ProvinciaID").value;

    if (nombre === "") {
        document.getElementById("errorMensajeLocalidadNombre").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeLocalidadNombre").style.display = "none";
    }

    if (codigoPostal === "") {
        document.getElementById("errorMensajeCodigoPostal").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeCodigoPostal").style.display = "none";
    }

    if (provinciaID === "0") {
        document.getElementById("errorMensajeProvincia").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeProvincia").style.display = "none";
    }



    $.ajax({
        url: '../../Localidades/GuardarLocalidad',
        data: {
            localidadID: localidadID,
            nombre: nombre,
            codigoPostal: codigoPostal,
            provinciaID: provinciaID
        },
        type: 'POST',
        dataType: 'json',
        success: function (resultado) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: resultado,
                showConfirmButton: false,
                timer: 1500
            });
            ListadoLocalidades();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el registro');
        }
    });
}

function AbrirEditarLocalidad(localidadID) {
    
    $.ajax({
        url: '../../Localidades/TraerLocalidadAlModal',
        data: { localidadID: localidadID },
        type: 'POST',
        dataType: 'json',
        success: function (localidadporID) {
            let localidad = localidadporID[0];

            document.getElementById("LocalidadID").value = localidadID;
            $("#tituloModal").text("Editar Localidad");
            document.getElementById("LocalidadNombre").value = localidad.localidadNombre;
            document.getElementById("CodigoPostal").value = localidad.CodigoPostal;
            document.getElementById("ProvinciaID").value = localidad.provinciaID;

            $("#localidadModal").modal("show");
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    });
}



function ValidarDeshabilitacion(localidadID) {
    Swal.fire({
        title: "¿Desea deshabilitar la localidad?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Deshabilitar",
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            DeshabilitarLocalidad(localidadID);
            Swal.fire("¡Localidad deshabilitada!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("La localidad no fue deshabilitada", "", "info");
        }
    });
}


function DeshabilitarLocalidad(localidadID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Localidades/DeshabilitarLocalidad',
        type: 'POST',
        data: { localidadID: localidadID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Localidad deshabilitada',
                showConfirmButton: false,
                timer: 1500
            });
            // Refrescar la tabla de localidades
            ListadoLocalidades();
        },
        error: function(xhr, status) {
            alert('Error al deshabilitar la localidad');
        }
    });
}



function HabilitarLocalidad(localidadID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Localidades/HabilitarLocalidad',
        type: 'POST',
        data: { localidadID: localidadID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Localidad habilitada',
                showConfirmButton: false,
                timer: 1500
            });
            // Refrescar la tabla de localidades
            ListadoLocalidades();
        },
        error: function(xhr, status) {
            alert('Error al habilitar la localidad');
        }
    });
}


function LimpiarModal() {
    document.getElementById("LocalidadID").value = 0;
    document.getElementById("LocalidadNombre").value = "";
    document.getElementById("CodigoPostal").value = "";
    document.getElementById("ProvinciaID").value = 0;
    document.getElementById("errorMensajeLocalidadNombre").style.display = "none";
    document.getElementById("errorMensajeCodigoPostal").style.display = "none";
    document.getElementById("errorMensajeProvincia").style.display = "none";
}

function NuevaLocalidad() {
    $("#tituloModal").text("Nueva Localidad");
}

//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
    texto.value = texto.value.toUpperCase();
}
