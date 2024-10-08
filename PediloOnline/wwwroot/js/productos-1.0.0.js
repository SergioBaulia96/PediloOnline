window.onload = ListadoProductos();

function ListadoProductos() {

    $.ajax({
        url: '../../Productos/ListadoProductos',
        data: {},
        type: 'POST',
        datatype: 'json',
        success: function (productosMostrar) {
            $("#productoModal").modal("hide");
            LimpiarModal();
            //console.log("Ejecuta funcion limpiar modal")
            let contenidoTabla = ``;

            $.each(productosMostrar, function (index, productoMostrar) {
                let precioFormateado = `$ ${parseFloat(productoMostrar.precio).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                contenidoTabla += `
                <tr>
                    <td>${productoMostrar.nombreProducto}</td>
                    <td>${productoMostrar.descripcion}</td>
                    <td>${precioFormateado}</td>
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
        error: function (xhr, status) {
            alert('Disculpe, existio un problema al deshabilitar');
        }
    });
}

function LimpiarModal() {
    document.getElementById("ProductoID").value = 0;
    document.getElementById("MarcaID").value = 0;
    document.getElementById("SubRubroID").value = 0;
    document.getElementById("NombreProducto").value = "";
    document.getElementById("Descripcion").value = "";
    document.getElementById("Precio").value = "";
    document.getElementById("errorMensajeMarca").style.display = "none";
    document.getElementById("errorMensajeSubRubro").style.display = "none";
    document.getElementById("errorMensajeNombreProducto").style.display = "none";
    document.getElementById("errorMensajeDescripcion").style.display = "none";
    document.getElementById("errorMensajePrecio").style.display = "none";
}

function NuevoProducto() {
    $("#tituloModal").text("Nuevo Producto");
}

function GuardarProducto() {
    
    let productoID = document.getElementById("ProductoID").value;
    let marcaID = document.getElementById("MarcaID").value;
    let subRubroID = document.getElementById("SubRubroID").value;
    let nombreProducto = document.getElementById("NombreProducto").value;
    let descripcion = document.getElementById("Descripcion").value;
    let precio = document.getElementById("Precio").value;

    let isValid = true;

    if (marcaID === "0") {
        document.getElementById("errorMensajeMarca").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeMarca").style.display = "none";
    }

    if (subRubroID === "0") {
        document.getElementById("errorMensajeSubRubro").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeSubRubro").style.display = "none";
    }

    if (nombreProducto === "") {
        document.getElementById("errorMensajeNombreProducto").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeNombreProducto").style.display = "none";
    }

    if (descripcion === "") {
        document.getElementById("errorMensajeDescripcion").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajeDescripcion").style.display = "none";
    }

    if (precio === "0") {
        document.getElementById("errorMensajePrecio").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorMensajePrecio").style.display = "none";
    }

    if (!isValid) {
        return;  // Detener la ejecución aquí si isValid es false
      }


    $.ajax({
        url: '../../Productos/GuardarProducto',
        data: {
            ProductoID: productoID,
            MarcaID: marcaID,
            SubRubroID: subRubroID,
            NombreProducto: nombreProducto,
            Descripcion: descripcion,
            Precio: precio
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
            ListadoProductos();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el Producto');
        }
    });
}


function AbrirEditarProducto(ProductoID) {
    $.ajax({
        url: '../../Productos/TraerProductosAlModal',
        data: { ProductoID: ProductoID },
        type: 'POST',
        datatype: 'json',
        success: function (productoPorID) {
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

        error: function (xhr, status) {
            console.log('Disculpe, exitio un problema al editar el Producto.');
        }
    });
}

function EliminarProducto(productoID) {
    $.ajax({
        url: '../../Productos/EliminarProducto',
        data: { productoID: productoID },
        type: 'POST',
        dataType: 'json',
        success: function (EliminarProducto) {
            ListadoProductos()
        },
        error: function (xhr, status) {
            console.log('Problemas al eliminar el producto');
        }
    });
}

function ValidarEliminacion(productoID) {
    Swal.fire({
        title: "¿Desea eliminar el producto?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
            EliminarProducto(productoID);
            Swal.fire("producto eliminado!", "", "success");
            
          
        } else if (result.isDenied) {
          Swal.fire("No se elimino ningun producto", "", "info");
        }
      });
    /* var elimina = confirm("¿Esta seguro que desea eliminar?");
    if (elimina == true) {
        EliminarProducto(productoID);
    } */
}

//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
    texto.value = texto.value.toUpperCase();
}

