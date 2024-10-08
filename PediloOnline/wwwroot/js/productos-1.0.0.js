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
            let contenidoTabla = ``;

            $.each(productosMostrar, function(index, producto) {
                let precioFormateado = `$ ${parseFloat(producto.precio).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                let deshabilitado = producto.activo ? "" : "table-secondary"; // Cambia color si está deshabilitada
                let boton = producto.activo 
                    ? `<button type="button" class="btn btn-secondary" onclick="DeshabilitarProducto(${producto.productoID}, event)">
                         <i class="fa-solid fa-ban"></i>
                       </button>`
                    : `<button type="button" class="btn btn-primary" onclick="HabilitarProducto(${producto.productoID}, event)">
                         <i class="fa-solid fa-check"></i> 
                       </button>`;

                let clickableClass = producto.activo ? "clickable-row" : "";

                contenidoTabla += `
                <tr class="${deshabilitado} ${clickableClass}" id="fila-${producto.productoID}" data-id="${producto.productoID}">
                    <td>${producto.nombreProducto}</td>
                    <td>${producto.descripcion}</td>
                    <td>${precioFormateado}</td>
                    <td>${producto.subRubroNombre}</td>
                    <td>${producto.marcaNombre}</td>
                    <td class="text-center">
                        ${boton}
                    </td>
                </tr>`;
            });
            document.getElementById("tbody-productos").innerHTML = contenidoTabla;

             // Asigna el evento de clic a las filas clicables
             $(".clickable-row").click(function() {
                let productoID = $(this).data("id"); // Obtiene el ID de la fila
                AbrirEditarProducto(productoID); // Llama a la función para abrir el modal
            });

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


//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
    texto.value = texto.value.toUpperCase();
}

function ValidarDeshabilitacion(productoID) {
    Swal.fire({
        title: "¿Desea deshabilitar la localidad?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Deshabilitar",
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            DeshabilitarLocalidad(productoID);
            Swal.fire("¡Producto deshabilitado!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("El producto no fue deshabilitado", "", "info");
        }
    });
}


function DeshabilitarProducto(productoID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Productos/DeshabilitarProducto',
        type: 'POST',
        data: { productoID: productoID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto deshabilitado',
                showConfirmButton: false,
                timer: 1500
            });
            // Refrescar la tabla de localidades
            ListadoProductos();
        },
        error: function(xhr, status) {
            alert('Error al deshabilitar el producto');
        }
    });
}

function HabilitarProducto(productoID, event) {
    event.stopPropagation(); // Detener la propagación del evento de clic a la fila
    $.ajax({
        url: '../../Productos/HabilitarProducto',
        type: 'POST',
        data: { productoID: productoID },
        success: function(resultado) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto habilitado',
                showConfirmButton: false,
                timer: 1500
            });
            // Refrescar la tabla de localidades
            ListadoProductos();
        },
        error: function(xhr, status) {
            alert('Error al habilitar el producto');
        }
    });
}

