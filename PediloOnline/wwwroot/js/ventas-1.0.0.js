// window.onload = ListadoVentas();

// function ListadoVentas() {
//     $.ajax({
//         url: '../../Ventas/ListadoVentas',
//         type: 'GET',
//         dataType: 'json',
//         success: function (VentasMostrar) {
//             let contenidoTabla = ``;

//             // Recorrer las ventas de la página actual
//             $.each(function (index, VentaMostrar) {
//                 contenidoTabla += `
//                 <tr class="text-center">
//                     <td># ${VentaMostrar.ventaID}</td>
//                     <td>${VentaMostrar.apellidoPersona}, ${VentaMostrar.nombrePersona}</td>
//                     <td>${VentaMostrar.fecha}</td>
//                     <td>${totalFormateado}</td>
//                     <td class="text-center">
//                         <button type="button" class="btn btn-primary boton-color" onclick="AbrirDetalleVenta(${VentaMostrar.ventaID})">
//                             <i class="fa-solid fa-list"></i>
//                         </button>
//                     </td>
//                 </tr>`;
//             });

//             document.getElementById("tbody-Ventas").innerHTML = contenidoTabla;
//         },
//         error: function (xhr, status) {
//             alert('Disculpe, existió un problema al cargar las ventas');
//         }
//     });
// }
