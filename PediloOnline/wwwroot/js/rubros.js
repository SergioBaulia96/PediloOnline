window.onload = ListadoRubros();



function ListadoRubros() {
  $.ajax({
    url: "../../Rubros/Listado",
    data: {},
    type: "POST",
    dataType: "json",
    success: function (tipoRubro) {
      $("#ModalRubros").modal("hide");
      LimpiarModal();
      let contenidoTabla = ``;

      $.each(tipoRubro, function(index, tipoRubro) {
        let deshabilitado = tipoRubro.activo ? "" : "table-secondary"; // Cambia color si está deshabilitada
        let boton = tipoRubro.activo 
            ? `<button type="button" class="btn btn-secondary" onclick="DeshabilitarRubro(${tipoRubro.rubroID}, event)">
                 <i class="fa-solid fa-ban"></i>
               </button>`
            : `<button type="button" class="btn btn-primary" onclick="HabilitarRubro(${tipoRubro.rubroID}, event)">
                 <i class="fa-solid fa-check"></i> 
               </button>`;

        let clickableClass = tipoRubro.activo ? "clickable-row" : "";

        contenidoTabla += `
        <tr class="${deshabilitado} ${clickableClass}" id="fila-${tipoRubro.rubroID}" data-id="${tipoRubro.rubroID}">
            <td>${tipoRubro.rubroNombre}</td>
            <td class="text-center">
                ${boton}
            </td>
        </tr>`;
    });

      document.getElementById("tbody-rubros").innerHTML = contenidoTabla;

      // Asigna el evento de clic a las filas clicables
      $(".clickable-row").click(function() {
        let rubroID = $(this).data("id"); // Obtiene el ID de la fila
        ModalEditarRubros(rubroID); // Llama a la función para abrir el modal
    });
    },

    error: function (xhr, status) {
      console.log("Disculpe, existió un problema al cargar el listado");
    },
  });
}

function CargarRubro() {
  let rubroId = document.getElementById("rubroID").value;
  let rubroNombre = document.getElementById("rubroNombre").value;;

  let isValid = true;

  if (rubroNombre === "") {
    document.getElementById("errorMensajeNombre").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("errorMensajeNombre").style.display = "none";
  }

  if (!isValid) {
    return;  // Detener la ejecución aquí si isValid es false
  }

  $.ajax({
    url: "../../Rubros/GuardarRubro",
    data: {
      rubroId: rubroId,
      rubroNombre: rubroNombre,
    },
    type: "POST",
    dataType: "json",
    success: function (resultado) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: resultado,
        showConfirmButton: false,
        timer: 1500
      });
      ListadoRubros();
    },
    error: function (xhr, status) {
      console.log("Disculpe, existió un problema al guardar el registro");
    },
  });
}

/* function Editar(rubroId) {
  $.ajax({
    url: "../../Rubros/Listado",
    data: {
      id: rubroId,
    },
    type: "POST",
    dataType: "json",
    success: function (tipoRubros) {
      let tipoRubro = tipoRubros[0];

      document.getElementById("rubroID").value = rubroId;
      document.getElementById("rubroNombre").value = tipoRubro.rubroNombre;
      ListadoRubros()
      
    },
    error: function (xhr, status) {
      console.log("Disculpe, existió un problema al guardar el registro");
    },
  });
} */

//recien agregado editar rubro
function ModalEditarRubros(rubroID){
   
 $.ajax({
     url: '../../Rubros/TraerRubrosModal',
     data: { 
       rubroId: rubroID,
     },
     type: 'POST',
     dataType: 'json',
     success: function (rubrosPorID) { 
         let rubro = rubrosPorID[0];

         document.getElementById("rubroID").value = rubroID;
         $("#tituloRubros").text("Editar Rubro");
         document.getElementById("rubroNombre").value = rubro.rubroNombre;
         

         $("#ModalRubros").modal("show");
     },

     error: function (xhr, status) {
         console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
     }
 });
} 

function LimpiarModal() {
  document.getElementById("rubroID").value = 0;
  document.getElementById("rubroNombre").value = "";
  document.getElementById("errorMensajeNombre").style.display = "none";

}


//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
  texto.value = texto.value.toUpperCase();
}

function ValidarDeshabilitacion(rubroID) {
  Swal.fire({
      title: "¿Desea deshabilitar el rubro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Deshabilitar",
      denyButtonText: `Cancelar`
  }).then((result) => {
      if (result.isConfirmed) {
          DeshabilitarRubro(rubroID);
          Swal.fire("¡Rubro deshabilitado!", "", "success");
      } else if (result.isDenied) {
          Swal.fire("El rubro no fue deshabilitado", "", "info");
      }
  });
}


function DeshabilitarRubro(rubroID, event) {
  event.stopPropagation(); // Detener la propagación del evento de clic a la fila
  $.ajax({
      url: '../../Rubros/DeshabilitarRubro',
      type: 'POST',
      data: { rubroID: rubroID },
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
      ListadoRubros();
  },
  error: function(xhr, status) {
      alert('Error al deshabilitar el rubro');
  }
});
}



function HabilitarRubro(rubroID, event) {
  event.stopPropagation(); // Detener la propagación del evento de clic a la fila
  $.ajax({
      url: '../../Rubros/HabilitarRubro',
      type: 'POST',
      data: { rubroID: rubroID },
      success: function(resultado) {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Rubro habilitado',
              showConfirmButton: false,
              timer: 1500
          });
          ListadoRubros();
      },
      error: function(xhr, status) {
          alert('Error al habilitar el rubro');
      }
  });
}
