window.onload = ListadoLocalidades();

function ListadoLocalidades(){

    $.ajax({
        url: '../../Localidades/ListadoLocalidades',
        data: {},
        type: 'POST',
        datatype: 'json',
        success: function(localidadesMostrar){
            $("#localidadModal").modal("hide");
            LimpiarModal();
            //console.log("Ejecuta funcion limpiar modal")
            let contenidoTabla = ``;

            $.each(localidadesMostrar, function(index, localidadMostrar){

                contenidoTabla += `
                <tr>
                    <td>${localidadMostrar.nombre}</td>
                    <td>${localidadMostrar.codigoPostal}</td>
                    <td>${localidadMostrar.nombreProvincia}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="AbrirEditarLocalidad(${localidadMostrar.localidadID})">
                    Editar
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="ValidarEliminacion(${localidadMostrar.localidadID})">
                    Eliminar
                    </button>
                    </td>
                </tr>
                `;
                
            });
            document.getElementById("tbody-localidades").innerHTML = contenidoTabla;
        },
        error: function (xhr, status){
            alert('Disculpe, existio un problema al deshabilitar');
        }
    });
}


function GuardarLocalidad(){
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

function AbrirEditarLocalidad(localidadID){
    
    $.ajax({
        url: '../../Localidades/TraerLocalidadAlModal',
        data: { 
            localidadID: localidadID,
        },
        type: 'POST',
        dataType: 'json',
        success: function (localidadporID) { 
            let localidad = localidadporID[0];

            document.getElementById("LocalidadID").value = localidadID;
            $("#tituloModal").text("Editar Localidad");
            document.getElementById("LocalidadNombre").value = localidad.localidadNombre,
            document.getElementById("CodigoPostal").value = localidad.CodigoPostal,
            document.getElementById("ProvinciaID").value = localidad.provinciaID;

            $("#localidadModal").modal("show");
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    });
}



function ValidarEliminacion(localidadID)
{   
    Swal.fire({
        title: "¿Desea eliminar la localidad?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
            EliminarLocalidad(localidadID);
            Swal.fire("¡Localidad eliminado!", "", "success");
            
          
        } else if (result.isDenied) {
          Swal.fire("No se elimino ninguna localidad", "", "info");
        }
      });
    /* var elimina = confirm("¿Esta seguro que desea eliminar?");
    if(elimina == true)
        {
            EliminarLocalidad(localidadID);
        } */
}

function EliminarLocalidad(localidadID){
    $.ajax({
        url: '../../Localidades/EliminarLocalidad',
        data: { localidadID: localidadID },
        type: 'POST',
        dataType: 'json',
        success: function(EliminarLocalidad){
            ListadoLocalidades()
        },
        error: function(xhr, status){
            console.log('Problemas al eliminar el cliente');
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

  function NuevaLocalidad()
  {
    $("#tituloModal").text("Nueva Localidad");
  }

//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
    texto.value = texto.value.toUpperCase();
  }
