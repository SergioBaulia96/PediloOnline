window.onload = ListaSubrubros();

function ListaSubrubros() {
  $.ajax({
    url: "../../Subrubros/ListaSubrubros",
    data: {},
    type: "POST",
    dataType: "json",
    success: function (subrubrosMostrar) {
      $("#ModalSubRubros").modal("hide");
      LimpiarModal();
      let contenidoTabla = ``;

      $.each(subrubrosMostrar, function(index, subrubro) {
        let deshabilitado = subrubro.activo ? "" : "table-secondary"; // Cambia color si está deshabilitada
        let boton = subrubro.activo 
            ? `<button type="button" class="btn btn-secondary" onclick="DeshabilitarSubRubro(${subrubro.subRubroID}, event)">
                 <i class="fa-solid fa-ban"></i>
               </button>`
            : `<button type="button" class="btn btn-primary" onclick="HabilitarSubRubro(${subrubro.subRubroID}, event)">
                 <i class="fa-solid fa-check"></i> 
               </button>`;

        let clickableClass = subrubro.activo ? "clickable-row" : "";

        contenidoTabla += `
        <tr class="${deshabilitado} ${clickableClass}" id="fila-${subrubro.subRubroID}" data-id="${subrubro.subRubroID}">
            <td>${subrubro.rubroNombre}</td>
            <td>${subrubro.subRubroNombre}</td>
            <td class="text-center">
                ${boton}
            </td>
        </tr>`;
    });


      document.getElementById("tbody-subrubro").innerHTML = contenidoTabla;

      // Asigna el evento de clic a las filas clicables
      $(".clickable-row").click(function() {
        let subRubroID = $(this).data("id"); // Obtiene el ID de la fila
        ModalEditarSubRubros(subRubroID); // Llama a la función para abrir el modal
    });
    },

    error: function (xhr, status) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Algo salio mal!",
      });
    },
  });
}

function CargarSubrubro() {
  let rubroID = document.getElementById("RubroID").value;
  let subrubroId = document.getElementById("subRubroID").value;
  let subrubroNombre = document.getElementById("subrubroNombre").value;

  let isValid = true;

  if (subrubroNombre === "") {
    document.getElementById("errorMensajeNombre").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("errorMensajeNombre").style.display = "none";
  }

  if (rubroID === "") {
    document.getElementById("errorMensajeRubro").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("errorMensajeRubro").style.display = "none";
  }

  if (!isValid) {
    return;
  }

  $.ajax({
    url: "../../Subrubros/GuardarsubRubro",
    data: {
      RubroID: rubroID,
      subRubroID: subrubroId,
      subrubroNombre: subrubroNombre,
    },
    type: "POST",
    dataType: "json",
    success: function (resultado) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: resultado,
        showConfirmButton: false,
        timer: 1500,
      });
      ListaSubrubros();
    },
    error: function (xhr, status) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Algo salio mal!",
      });
    },
  });
}

//recien agregado editar rubro
function ModalEditarSubRubros(subRubroID){
   
  $.ajax({
      url: '../../SubRubros/TraerSubRubrosModal',
      data: { 
        subRubroID: subRubroID,
      },
      type: 'POST',
      dataType: 'json',
      success: function (subRubrosPorID) { 
          let subRubro = subRubrosPorID[0];
 
          document.getElementById("subRubroID").value = subRubroID;
          $("#tituloSubrubro").text("Editar SubRubro");
          document.getElementById("subrubroNombre").value = subRubro.subRubroNombre;
          
 
          $("#ModalSubRubros").modal("show");
      },
 
      error: function (xhr, status) {
          console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
      }
  });
 } 


function LimpiarModal() {
  document.getElementById("subRubroID").value = 0;
  document.getElementById("RubroID").value = 0;
  document.getElementById("subrubroNombre").value = "";
  document.getElementById("errorMensajeNombre").style.display = "none";
  document.getElementById("errorMensajeRubro").style.display = "none";
}



//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
  texto.value = texto.value.toUpperCase();
}

function ValidarDeshabilitacion(subRubroID) {
  Swal.fire({
      title: "¿Desea deshabilitar el SubRubro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Deshabilitar",
      denyButtonText: `Cancelar`
  }).then((result) => {
      if (result.isConfirmed) {
          DeshabilitarSubRubro(subRubroID);
          Swal.fire("¡SubRubro deshabilitado!", "", "success");
      } else if (result.isDenied) {
          Swal.fire("El SubRubro no fue deshabilitado", "", "info");
      }
  });
}


function DeshabilitarSubRubro(subRubroID, event) {
  event.stopPropagation(); // Detener la propagación del evento de clic a la fila
  $.ajax({
      url: '../../SubRubros/DeshabilitarSubRubro',
      type: 'POST',
      data: { subRubroID: subRubroID },
      success: function(resultado) {
          if (resultado.success) {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: resultado.message,
                  showConfirmButton: false,
                  timer: 1500
              });
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'No se pudo deshabilitar',
                  text: resultado.message
              });
          }
          ListaSubrubros();
      },
      error: function(xhr, status) {
          alert('Error al deshabilitar el subrubro');
      }
  });
}




function HabilitarSubRubro(subRubroID, event) {
  event.stopPropagation(); // Detener la propagación del evento de clic a la fila
  $.ajax({
      url: '../../SubRubros/HabilitarSubRubro',
      type: 'POST',
      data: { subRubroID: subRubroID },
      success: function(resultado) {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'SubRubro habilitado',
              showConfirmButton: false,
              timer: 1500
          });
          ListaSubrubros();
      },
      error: function(xhr, status) {
          alert('Error al habilitar el SubRubro');
      }
  });
}


//funcion buscar subrubros
$(document).ready(function () {
  // Captura el evento de escribir en el input de búsqueda
  $('#subRubroBuscar').on('input', function () {
    var buscarsubRubro = $(this).val(); // Obtiene el valor del input

    if (buscarsubRubro === '') {
      ListaSubrubros(); // Llama a la función que carga todos los rubros
      return; // Detiene la ejecución aquí, no se hace búsqueda
    }

    // Hacer una solicitud AJAX para buscar los rubros filtrados
    $.ajax({
      url: '/Subrubros/Buscar', // Acción del controlador que realiza la búsqueda
      type: 'GET',
      data: { buscarsubRubro: buscarsubRubro }, // Enviar el término de búsqueda al servidor
      success: function (subRubrosFiltrados) {
        // Variable para construir la tabla con los resultados filtrados
        var tabla = '';
        $.each(subRubrosFiltrados, function (index, subRubro) {
          tabla += `
            <tr>
              <td>${subRubro.rubroNombre}</td>
              <td>${subRubro.subRubroNombre}</td>
              
              <td>
                <button type="button" class="btn btn-success" onclick="ModalEditarRubros(${subRubro.subRubroID})">
                  Editar
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger" onclick="ValidarEliminar(${subRubro.subRubroID})">
                  Eliminar
                </button>
              </td>
            </tr>
          `;
        });

        // Actualizar el contenido del cuerpo de la tabla
        $('#tbody-subrubro').html(tabla);
      },
      error: function (xhr, status, error) {
        console.log("Error en la búsqueda: " + error);
      }
    });
  });
});


