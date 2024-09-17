window.onload = Funciona();
window.onload = ListadoRubros();

function Funciona() {
  console.log("Funciona");
}

function ListadoRubros() {
  $.ajax({
    url: "../../Rubros/Listado",
    data: {},
    type: "POST",
    dataType: "json",
    success: function (tipoRubro) {
      let contenidoTabla = ``;

      $.each(tipoRubro, function (index, rubro) {
        contenidoTabla += `
                <tr>
                    <td>${rubro.rubroNombre}</td>
                    <td>
                    <button type="button" class="btn btn-success" onclick="ModalEditarRubros(${rubro.rubroID})">
                    Editar
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick="ValidarEliminar(${rubro.rubroID})">
                    Eliminar
                    </button>
                    </td>
                </tr>
            `;
      });

      document.getElementById("tbody-rubro").innerHTML = contenidoTabla;
    },

    error: function (xhr, status) {
      console.log("Disculpe, existió un problema al cargar el listado");
    },
  });
}

function CargarRubro() {
  let rubroId = document.getElementById("rubroID").value;
  let rubroNombre = document.getElementById("rubroNombre").value;;

  $.ajax({
    url: "../../Rubros/GuardarRubro",
    data: {
      rubroId: rubroId,
      rubroNombre: rubroNombre,
    },
    type: "POST",
    dataType: "json",
    success: function (resultado) {
      /* alert(resultado); */
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
 /*  function ModalEditarRubros(rubroID){
    
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
          $("#tituloModal").text("Editar Rubro");
          document.getElementById("rubroNombre").value = rubro.rubroNombre,
          

          $("#ModalRubros").modal("show");
      },

      error: function (xhr, status) {
          console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
      }
  });
}  */

function ValidarEliminar (rubroID) {
    var confirmacion = confirm("Desea Eliminar rubro");
    if (confirmacion == true) {
      EliminarRubro(rubroID);
    }

}

function EliminarRubro(rubroID) {
  $.ajax({
    url: "../../Rubros/EliminarRubro",
    data: {
      rubroID: rubroID,
    },
    type: "POST",
    dataType: "json",
    success: function (resultado) {
      alert(resultado);
      ListadoRubros();
      
    },
    error: function (xhr, status) {
      console.log("Disculpe, existió un problema al eliminar el rubro");
    },
  });
}


//Funcion para hacer busqueda
$(document).ready(function() {
  $('#buscarRubro').on('input', function() {
    var buscarRubro = $(this).val();
    
    $.ajax({
      url: '/Rubros/Buscar', 
      type: 'GET',
      data: { buscarRubro: buscarRubro },
      success: function(data) {
        
        var tabla = "";

        data.results.forEach(function(result) {
          tabla += "<div>" + "<p>" + result.rubroNombre +"</p>"  + "</div>";
          
        });
        $('#results').html(tabla);
        console.log(results); 
      },
      error: function(xhr, status, error) {
        console.log("Error en la búsqueda: " + error);
      }
    });
  });
});



$(document).ready(function() {
  $('#buscarRubro').on('input', function() {
    var buscarRubro = $(this).val();
    
    $.ajax({
      url: '/Rubros/Buscar', 
      type: 'GET',
      data: { buscarRubro: buscarRubro },
      success: function(rubros) {
        
        var tabla1 = "";
        $.each(rubros, function(index, rubro){
          tabla1 += `
            <tr>
                    <td>${rubro.rubroNombre}</td>
                    <td>
                    <button type="button" class="btn btn-success" onclick="ModalEditarRubros(${rubro.rubroID})">
                    Editar
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick="ValidarEliminar(${rubro.rubroID})">
                    Eliminar
                    </button>
                    </td>
                </tr>
          
          `
        });
        document.getElementById("tbody-rubro1").innerHTML = tabla1;
        
      }
    });
  });
});
