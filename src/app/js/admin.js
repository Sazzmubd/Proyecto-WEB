fetch("../api/v1.0/modelos/admin.php",{
    method:"GET"
}).then(function (respuesta){
    if(respuesta.ok){//si la repuesta devuleve un ok
        console.log("ok");
        return respuesta.json();
    }
}).then(function (clientes){
    console.log(clientes);

    for (let i = 0; i < clientes.length; i++) {
        document.getElementById("myTable").innerHTML=document.getElementById("myTable").innerHTML+
            '<td id="nombreyapellidos" data-titulo="Nombre y Apellidos">'+clientes[i].nombreapellidosempresa+'</td>'+
            '<td id="tipo" data-titulo="Tipo">'+clientes[i].tipo+'</td>'+
            '<td id="email" data-titulo="Email">'+clientes[i].correo+'</td>'+
            '<td id="telefono" data-titulo="Teléfono">'+clientes[i].telefono+'</td>'+
            '<td>'+'<a className="logo">'+'<img onclick="verCamposUsuario('+clientes[i].id+')" src="ImagenesProyecto/atencion.svg" height="" width="70"/>'+'</a>'+'</td>'+
            '<td>'+'<img src="ImagenesProyecto/editar.svg" height="" width="20">'+'</td>'
    }
})            //onclick="verCamposUsuario(<?php echo $mostrar['id']?>)"

