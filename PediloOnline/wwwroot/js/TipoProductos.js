window.onload = ListadoTipoProductos();


function ListadoTipoProductos(){
    $.ajax({
        url: '../../TipoProductos/ListadoTipoProductos',
        data: {  },
        type: 'POST',
        dataType: 'json',
        success: function (traerTodosLosTiposDeProductos) {
              LimpiarInput();
            let contenidoTabla = ``;
            
            $.each(traerTodosLosTiposDeProductos, function (index, traerTodosLosTiposDeProductos) {  
                
                contenidoTabla += `
                <tr>
                    <td>${traerTodosLosTiposDeProductos.nombre}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success boton-color" onclick="AbrirEditar(${traerTodosLosTiposDeProductos.tipoProductoID})">
                    Editar
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="EliminarTipoProducto(${traerTodosLosTiposDeProductos.tipoProductoID})">
                    Eliminar
                    </button>
                    </td> 
                </tr>
             `;

            });

            document.getElementById("tbody-TipoProductos").innerHTML = contenidoTabla;

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al deshabilitar');
        }
    });
}

function GuardarRegistro(){
    let tipoProductoID = document.getElementById("TipoProductoID").value;
    let nombre = document.getElementById("Nombre").value.trim(); // Elimina espacios en blanco
    let errorMensaje = document.getElementById("errorMensaje");
    

    // Validar si el campo de tipo de ejercicio está vacío
    if(nombre == "") {
        errorMensaje.style.display = "block";
        return;
    } else {
        errorMensaje.style.display = "none";
    }


    
    $.ajax({
        url: '../../TipoProductos/GuardarTipoProducto',
        data: { 
            tipoProductoID: tipoProductoID,
            nombre: nombre,
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
            ListadoTipoProductos();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el registro');
        }
    });    
}

function AbrirEditar(tipoProductoID){
    
    $.ajax({
        url: '../../TipoProductos/TraerTipoProducto',
        data: { 
            tipoProductoID: tipoProductoID,
        },
        type: 'POST',
        dataType: 'json',
        success: function (tipoProductoPorID) { 
            let tipoproducto = tipoProductoPorID[0];

            document.getElementById("TipoProductoID").value = tipoProductoID;
            document.getElementById("Nombre").value = tipoproducto.nombre
            
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    });
}

function EliminarTipoProducto(tipoProductoID) {
 
            $.ajax({
                url: '../../TipoProductos/EliminarTipoProducto',
                data: {
                    tipoProductoID: tipoProductoID,
                },
                type: 'POST',
                dataType: 'json',
                success: function (resultado) {
                    ListadoTipoProductos();
                },
                error: function (xhr, status) {
                    console.log('Disculpe, existió un problema al eliminar el registro.');
                }
            });
        }
    


function LimpiarInput() {
    document.getElementById("TipoProductoID").value = 0;
    document.getElementById("Nombre").value = "";
}
