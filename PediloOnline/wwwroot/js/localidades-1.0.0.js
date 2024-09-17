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
            // Swal.fire({
            //     position: "bottom-end",
            //     icon: "success",
            //     title: "Registro guardado correctamente!",
            //     showConfirmButton: false,
            //     timer: 1000
            // }); 
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

function ValidarEliminacion(localidadID)
{
    var elimina = confirm("¿Esta seguro que desea eliminar?");
    if(elimina == true)
        {
            EliminarLocalidad(localidadID);
        }
}

    function LimpiarModal() {
        document.getElementById("LocalidadID").value = 0;
        document.getElementById("LocalidadNombre").value = "";
        document.getElementById("CodigoPostal").value = "";
        document.getElementById("ProvinciaID").value = 0;
    }

  function NuevaLocalidad()
  {
    $("#tituloModal").text("Nueva Localidad");
  }
