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
            
            let tabla = ``

            $.each(listadoMarcas, function(index, marcas){

                tabla += `
                <tr>
                    <td>${marcas.marcaNombre}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success btn-sm" onclick="ModalEditar(${marcas.marcaID})">
                    Editar
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="ValidarEliminacion(${marcas.marcaID})">
                    Eliminar
                    </button>
                    </td>
                </tr>
                `;
            });
            document.getElementById("tbody-marcas").innerHTML = tabla;                                
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

function ValidarEliminacion(marcaID)
{
    Swal.fire({
        title: "¿Desea eliminar la marca?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
            EliminarMarca(marcaID);
            Swal.fire("Marca eliminada!", "", "success");
            
          
        } else if (result.isDenied) {
          Swal.fire("No se elimino ninguna marca", "", "info");
        }
      });
    /* var elimina = confirm("¿Esta seguro que desea eliminar?");
    if(elimina == true)
        {
            EliminarMarca(marcaID);
        } */
}

function EliminarMarca(marcaID){
    $.ajax({
        url: '../../Marcas/EliminarMarca',
        data: { marcaID : marcaID },
        type: 'POST',
        dataType: 'json',
        success: function(EliminarClub){
            ListadoMarcas()
        },
        error: function(xhr, status){
            console.log('Problemas al eliminar Club');
        }
    });
}

//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
    texto.value = texto.value.toUpperCase();
  }