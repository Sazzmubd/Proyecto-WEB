fetch("../api/v1.0/modelos/tablaSolicitudes.php",{
    method:"GET"
}).then(function (respuesta){
    if(respuesta.ok){//si la repuesta devuleve un ok
        console.log("ok");
        return respuesta.json();
    }
}).then(function (solicitudes){
    console.log(solicitudes);

    for (let i = 0; i < solicitudes.length; i++) {
        document.getElementById("myTable").innerHTML=document.getElementById("myTable").innerHTML+'<td data-titulo="Fecha">'+'<div style="width: 6rem" id="fecha">'+solicitudes[i].fechasolicitud+'</div>'+'</td>'+
            '<td id="nombreyapellidos" data-titulo="Nombre y Apellidos">'+solicitudes[i].nombreApellidosEmpresa+'</td>'+
            '<td id="tipo" data-titulo="Tipo">'+solicitudes[i].tipo+'</td>'+
            '<td id="email" data-titulo="Email">'+solicitudes[i].correo+'</td>'+
            '<td id="telefono" data-titulo="Teléfono">'+solicitudes[i].telefono+'</td>'+
            '<td id="motivo" data-titulo="Motivo">'+solicitudes[i].motivo+'</td>'+
            '<td id="provincia" data-titulo="Provincia">'+solicitudes[i].provincia+'</td>'+
            '<td>'+'<div>'+'<img src="ImagenesProyecto/plus.svg" height="" width="30">'+'<img src="ImagenesProyecto/eliminar.svg" height="" width="30">'+'</div>'+'</td>'
    }
})