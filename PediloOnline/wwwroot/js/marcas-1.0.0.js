window.onload = ListadoMarcas();

function ListadoMarcas()
{
    $.ajax({
        url: '../../Marcas/ListadoMarcas',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function(listadoMarcas){
            $("#marcaModal").modal("hide");
            LimpiarModal();
            
            let contenidoTabla = ``;

            $.each(listadoMarcas, function(index, listadoMarcas) {
                let deshabilitado = listadoMarcas.activo ? "" : "table-secondary"; // Cambia color si está deshabilitada
                let boton = listadoMarcas.activo 
                    ? `<button type="button" class="btn btn-secondary" onclick="DeshabilitarMarca(${listadoMarcas.marcaID}, event)">
                         <i class="fa-solid fa-ban"></i>
                       </button>`
                    : `<button type="button" class="btn btn-primary" onclick="HabilitarMarca(${listadoMarcas.marcaID}, event)">
                         <i class="fa-solid fa-check"></i> 
                       </button>`;

                let clickableClass = listadoMarcas.activo ? "clickable-row" : "";

                contenidoTabla += `
                <tr class="${deshabilitado} ${clickableClass}" id="fila-${listadoMarcas.marcaID}" data-id="${listadoMarcas.marcaID}">
                    <td>${listadoMarcas.marcaNombre}</td>
                    <td class="text-center">
                        ${boton}
                    </td>
                </tr>`;
            });
            document.getElementById("tbody-marcas").innerHTML = contenidoTabla;
            
            // Asigna el evento de clic a las filas clicables
            $(".clickable-row").click(function() {
                let marcaID = $(this).data("id"); // Obtiene el ID de la fila
                ModalEditar(marcaID); // Llama a la función para abrir el modal
            });
        },
        error: function(xhr, status){
            console.log('Problemas al cargar la tabla');
        }
    });
}

function LimpiarModal(){
    document.getElementById("MarcaID").value = 0;
    document.getElementById("MarcaNombre").value = "";
    document.getElementById("errorMensajeMarcaNombre").style.display = "none";
}

function NuevaMarca(){
    $("#tituloModal").text("Nueva Marca");
}

function GuardarMarca(){
    let marcaID = document.getElementById("MarcaID").value;
    let marcaNombre = document.getElementById("MarcaNombre").value;

    if (marcaNombre === "") {
        document.getElementById("errorMensajeMarcaNombre").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeMarcaNombre").style.display = "none";
    }


    $.ajax({
        url: '../../Marcas/GuardarMarca',
        data: {
            marcaID : marcaID,
            marcaNombre : marcaNombre
        },
        type: 'POST',
        dataType: 'json',
        success: function(resultado){
            Swal.fire({
                position: "center",
                icon: "success",
                title: resultado,
                showConfirmButton: false,
                timer: 1500
              });
            ListadoMarcas();
        },
        error: function(xhr, status){
            console.log('Problemas al guardar Marca');
        },
    });
}

function ModalEditar(marcaID){
    $.ajax({
        url: '../../Marcas/ListadoMarcas',
        data: { marcaID : marcaID },
        type: 'POST',
        dataType: 'json',
        success: function(listadoMarcas){
            listadoMarca = listadoMarcas[0];
            
            document.getElementById("MarcaID").value = marcaID
            $("#tituloModal").text("Editar Marca");
            document.getElementById("MarcaNombre").value = listadoMarca.marcaNombre;
            $("#marcaModal").modal("show");
        },
        error: function(xhr, status){
            console.log('Problemas al cargar Marca');
        }
    });
}


//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
    texto.value = texto.value.toUpperCase();
  }

  function ValidarDeshabilitacion(marcaID) {
    Swal.fire({
        title: "¿Desea deshabilitar la marca?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Deshabilitar",
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            DeshabilitarMarca(marcaID);
            Swal.fire("¡Marca deshabilitada!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("La marca no fue deshabilitada", "", "info");
        }
    });
}


function DeshabilitarMarca(marcaID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Marcas/DeshabilitarMarca',
        type: 'POST',
        data: { marcaID: marcaID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Marca deshabilitada',
                showConfirmButton: false,
                timer: 1500
            });
            ListadoMarcas();
        },
        error: function(xhr, status) {
            alert('Error al deshabilitar el cliente');
        }
    });
}



function HabilitarMarca(marcaID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Marcas/HabilitarMarca',
        type: 'POST',
        data: { marcaID: marcaID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Marca habilitada',
                showConfirmButton: false,
                timer: 1500
            });
            ListadoMarcas();
        },
        error: function(xhr, status) {
            alert('Error al habilitar la marca');
        }
    });
}