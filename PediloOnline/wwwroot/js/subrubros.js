window.onload = ListaSubrubros();


function ListaSubrubros(){
    $.ajax({
        url: '../../Subrubros/ListaSubrubros',
        data: { 
         },
        type: 'POST',
        dataType: 'json',
        success: function (subrubrosMostar) {
          $("#ModalSubRubros").modal("hide");
          LimpiarModal();
            let contenidoTabla = ``;

            $.each(subrubrosMostar, function (index, subrubro) {  
                
                contenidoTabla += `
                <tr>
                    <td>${subrubro.rubroNombre}</td>
                    <td>${subrubro.subRubroNombre}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="AbrirEditar(${subrubro.subRubroID})">
                    Editar
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="ValidarEliminar(${subrubro.subRubroID})">
                    Eliminar
                    </button>
                    </td> 
                </tr>
             `;

               
            });

            document.getElementById("tbody-subrubro").innerHTML = contenidoTabla;

        },

       
        error: function (xhr, status) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo salio mal!",
          });
        }
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
        subRubroID : subrubroId,
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
          timer: 1500
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

  function ValidarEliminar(subRubroID) {
    Swal.fire({
      title: "¿Desea eliminar el rubro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
          EliminarSubrubro(subRubroID);
          Swal.fire("Rubro eliminado!", "", "success");
          
        
      } else if (result.isDenied) {
        Swal.fire("No se elimino ningun rubro", "", "info");
      }
    });
    /* let confirmacion = confirm("Desea eliminar?");
    if (confirmacion == true) {
      EliminarSubrubro(subRubroID);
    } */

  }

  function LimpiarModal() {
    document.getElementById("subRubroID").value = 0;
    document.getElementById("RubroID").value = 0;
    document.getElementById("subrubroNombre").value = "";
    document.getElementById("errorMensajeNombre").style.display = "none";
    document.getElementById("errorMensajeRubro").style.display = "none";
  
  }

  function EliminarSubrubro(subRubroID) {
    $.ajax({
      url: "../../Subrubros/EliminarSubrubro",
      data: {
        
        subRubroID : subRubroID,
        
      },
      type: "POST",
      dataType: "json",
      success: function (resultado) {
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

//funcion que convierte lo que escribo en los input a mayuscula
function textoMayuscula(texto) {
  texto.value = texto.value.toUpperCase();
}

