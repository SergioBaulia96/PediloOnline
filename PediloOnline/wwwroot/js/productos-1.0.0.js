window.onload = ListadoProductos();

function ListadoProductos(){

    $.ajax({
        url: '../../Productos/ListadoProductos',
        data: {},
        type: 'POST',
        datatype: 'json',
        success: function(productosMostrar){
            $("#productoModal").modal("hide");
            LimpiarModal();
            //console.log("Ejecuta funcion limpiar modal")
            let contenidoTabla = ``;

            $.each(productosMostrar, function(index, productoMostrar){

                contenidoTabla += `
                <tr>
                    <td>${productoMostrar.nombreProducto}</td>
                    <td>${productoMostrar.descripcion}</td>
                    <td>${productoMostrar.precio}</td>
                    <td>${productoMostrar.subRubroNombre}</td>
                    <td>${productoMostrar.marcaNombre}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="AbrirEditarProducto(${productoMostrar.productoID})">
                    Editar
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="ValidarEliminacion(${productoMostrar.productoID})">
                    Eliminar
                    </button>
                    </td>
                </tr>
                `;
                
            });
            document.getElementById("tbody-productos").innerHTML = contenidoTabla;
        },
        error: function (xhr, status){
            alert('Disculpe, existio un problema al deshabilitar');
        }
    });
}

    function LimpiarModal(){
        document.getElementById("ProductoID").value = 0 ;
        document.getElementById("MarcaID").value = 0;
        document.getElementById("SubRubroID").value = 0;
        document.getElementById("NombreProducto").value = "";
        document.getElementById("Descripcion").value = "";
        document.getElementById("Precio").value = "";
    }

    function NuevoProducto(){
        $("#tituloModal").text("Nuevo Producto");
    }

    function GuardarProducto(){
        let productoID = document.getElementById("ProductoID").value;
        let marcaID = document.getElementById("MarcaID").value;
        let subRubroID = document.getElementById("SubRubroID").value;
        let nombreProducto = document.getElementById("NombreProducto").value;
        let descripcion = document.getElementById("Descripcion").value;
        let precio = document.getElementById("Precio").value;

        $.ajax({
            url: '../../Productos/GuardarProducto',
        data: { ProductoID: productoID,
            MarcaID: marcaID,
            SubRubroID: subRubroID,
            NombreProducto: nombreProducto,
            Descripcion: descripcion,
            Precio: precio
        },
        type: 'POST',
        datatype: 'json',
        success: function (resultado) {
            if(resultado != ""){
                alert(resultado);
            }
            ListadoProductos();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el Producto');
        }
    });
}


function AbrirEditarProducto(ProductoID){
    $.ajax({
        url:'../../Productos/TraerProductosAlModal',
        data: {ProductoID: ProductoID},
        type: 'POST',
        datatype: 'json',
        success: function (productoPorID){
            let producto = productoPorID[0];

            document.getElementById("ProductoID").value = ProductoID;
            $("#tituloModal").text("Editar Producto");
            document.getElementById("MarcaID").value = producto.marcaID,
            document.getElementById("SubRubroID").value = producto.subRubroID,
            document.getElementById("NombreProducto").value = producto.nombreProducto,
            document.getElementById("Descripcion").value = producto.descripcion,
            document.getElementById("Precio").value = producto.precio,
            $("#productoModal").modal("show");
        },

        error: function (xhr, status){
            console.log('Disculpe, exitio un problema al editar el Producto.');
        }
    });
}

function EliminarProducto(productoID){
    $.ajax({
        url: '../../Productos/EliminarProducto',
        data: { productoID: productoID },
        type: 'POST',
        dataType: 'json',
        success: function(EliminarProducto){
            ListadoProductos()
        },
        error: function(xhr, status){
            console.log('Problemas al eliminar el producto');
        }
    });
}

function ValidarEliminacion(productoID)
{
    var elimina = confirm("¿Esta seguro que desea eliminar?");
    if(elimina == true)
        {
            EliminarProducto(productoID);
        }
}

