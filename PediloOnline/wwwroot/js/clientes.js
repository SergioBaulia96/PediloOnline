window.onload = ListadoClientes();

function ListadoClientes(){
    let buscarLocalidad = document.getElementById("BuscarLocalidad").value;

    $.ajax({
        url: '../../Clientes/ListadoClientes',
        data: {
            BuscarLocalidad: buscarLocalidad
        },
        type: 'POST',
        datatype: 'json',
        success: function(clientesMostrar){
             $("#clienteModal").modal("hide");
             LimpiarModal();
            //console.log("Ejecuta funcion limpiar modal")
            let contenidoTabla = ``;

            $.each(clientesMostrar, function(index, clienteMostrar){

                contenidoTabla += `
                <tr>
                    <td>${clienteMostrar.tipoCliente}</td>
                    <td>${clienteMostrar.localidadNombre}</td>
                    <td>${clienteMostrar.nombreCompleto}</td>
                    <td>${clienteMostrar.domicilio}</td>
                    <td>${clienteMostrar.documento}</td>
                    <td>${clienteMostrar.telefono}</td>
                    <td>${clienteMostrar.email}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="AbrirEditarCliente(${clienteMostrar.clienteID})">
                    Editar
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="ValidarEliminacion(${clienteMostrar.clienteID})">
                    Eliminar
                    </button>
                    </td>
                </tr>
                `;
                
            });
            document.getElementById("tbody-clientes").innerHTML = contenidoTabla;
        },
        error: function (xhr, status){
            alert('Disculpe, existio un problema al deshabilitar');
        }
    });
}

    function LimpiarModal(){
        document.getElementById("ClienteID").value = 0 ;
        document.getElementById("TipoCliente").value = 0;
        document.getElementById("LocalidadID").value = 0;
        document.getElementById("NombreCompleto").value = "";
        document.getElementById("Domicilio").value = "";
        document.getElementById("Documento").value = "";
        document.getElementById("Telefono").value = "";
        document.getElementById("Email").value = "";
    }

    function NuevoCliente(){
        $("#tituloModal").text("Nuevo Cliente");
    }

    function GuardarCliente(){
        let clienteID = document.getElementById("ClienteID").value;
        let tipoCliente = document.getElementById("TipoCliente").value;
        let localidadID = document.getElementById("LocalidadID").value;
        let nombreCopleto = document.getElementById("NombreCompleto").value;
        let domicilio = document.getElementById("Domicilio").value;
        let documento = document.getElementById("Documento").value;
        let telefono = document.getElementById("Telefono").value;
        let email = document.getElementById("Email").value;

        $.ajax({
            url: '../../Clientes/GuardarCliente',
        data: { ClienteID: clienteID
            , TipoCliente: tipoCliente
            , LocalidadID: localidadID
            , NombreCompleto: nombreCopleto
            , Domicilio: domicilio
            , Documento: documento
            , Telefono: telefono
            , Email: email
        },
        type: 'POST',
        datatype: 'json',
        success: function (resultado) {
            if(resultado != ""){
                alert(resultado);
            }
            ListadoClientes();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el cliente');
        }
    });
}


function AbrirEditarCliente(clienteID){
    $.ajax({
        url:'../../Clientes/TraerClientesAlModal',
        data: {clienteID: clienteID},
        type: 'POST',
        datatype: 'json',
        success: function (clientesPorID){
            let cliente = clientesPorID[0];

            document.getElementById("ClienteID").value = clienteID;
            $("#tituloModal").text("Editar Cliente");
            document.getElementById("TipoCliente").value = cliente.tipoCliente,
            document.getElementById("LocalidadID").value = cliente.localidadID,
            document.getElementById("NombreCompleto").value = cliente.nombreCopleto,
            document.getElementById("Domicilio").value = cliente.domicilio,
            document.getElementById("Documento").value = cliente.documento,
            document.getElementById("Telefono").value = cliente.telefono,
            document.getElementById("Email").value = cliente.email;
            $("#clienteModal").modal("show");
        },

        error: function (xhr, status){
            console.log('Disculpe, exitio un problema al editar el Cliente.');
        }
    });
}

function EliminarCliente(clienteID){
    $.ajax({
        url: '../../Clientes/EliminarCliente',
        data: { clienteID: clienteID },
        type: 'POST',
        dataType: 'json',
        success: function(EliminarCliente){
            ListadoClientes()
        },
        error: function(xhr, status){
            console.log('Problemas al eliminar el cliente');
        }
    });
}

function ValidarEliminacion(clienteID)
{
    var elimina = confirm("¿Esta seguro que desea eliminar?");
    if(elimina == true)
        {
            EliminarCliente(clienteID);
        }
}

