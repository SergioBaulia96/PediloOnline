window.onload = Funciona();
window.onload = ListaSubrubros();

function Funciona () {
    console.log("Funciona");
}

function ListaSubrubros(){
    $.ajax({
        url: '../../Subrubros/ListaSubrubros',
        data: { 
         },
        type: 'POST',
        dataType: 'json',
        success: function (subrubrosMostar) {
            /*  LimpiarInput(); */
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
            alert('Disculpe, existió un problema al deshabilitar');
        }
    });
}

function CargarSubrubro() {
    let rubroID = document.getElementById("RubroID").value;
    let subrubroId = document.getElementById("subRubroID").value;
    let subrubroNombre = document.getElementById("subrubroNombre").value;
  
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
        
        ListaSubrubros(); 
      },
      error: function (xhr, status) {
        console.log("Disculpe, existió un problema al guardar el registro");
      },
    });
  }

  function ValidarEliminar(subRubroID) {
    let confirmacion = confirm("Desea eliminar?");
    if (confirmacion == true) {
      EliminarSubrubro(subRubroID);
    }

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
        console.log("Disculpe, existió un problema al guardar el registro");
      },
    });
  }

