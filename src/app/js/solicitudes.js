var globalSolicitudes;

fetch("../api/v1.0/modelos/get-tablaSolicitudes.php",{
    method:"GET"
}).then(function (respuesta){
    if(respuesta.ok){//si la repuesta devuleve un ok
        console.log("ok");
        return respuesta.json();
    }
}).then(function (solicitudes){
    console.log(solicitudes);
    globalSolicitudes = solicitudes;

    for (let i = 0; i < solicitudes.length; i++) {
        document.getElementById("myTable").innerHTML=document.getElementById("myTable").innerHTML+'<td data-titulo="Fecha">'+'<div style="width: 6rem" id="fecha">'+solicitudes[i].fechasolicitud+'</div>'+'</td>'+
            '<td id="nombreyapellidos" data-titulo="Nombre y Apellidos">'+solicitudes[i].nombreApellidosEmpresa+'</td>'+
            '<td id="tipo" data-titulo="Tipo">'+solicitudes[i].tipo+'</td>'+
            '<td id="email" data-titulo="Email">'+solicitudes[i].correo+'</td>'+
            '<td id="telefono" data-titulo="Teléfono">'+solicitudes[i].telefono+'</td>'+
            '<td id="motivo" data-titulo="Motivo">'+solicitudes[i].motivo+'</td>'+
            '<td id="provincia" data-titulo="Provincia">'+solicitudes[i].provincia+'</td>'+
            '<td>'+'<div>'+'<img id='+i+' src="ImagenesProyecto/plus.svg" height="" width="30" onclick="addClient(this.id)">'+' '+'<img src="ImagenesProyecto/eliminar.svg" height="" width="30">'+'</div>'+'</td>'
    }
})


function addClient(id){
    var url = '../api/v1.0/cliente/';
    let data = globalSolicitudes[id];
    let parsedData ={
        "email": data.correo,
        "tipo": data.tipo.toLowerCase(),
        "nombreapellidos": data.nombreApellidosEmpresa,
        "telefono": data.telefono
    }
    console.log("---->",parsedData);

    let formBody = [];
    for (let property in parsedData){
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(parsedData[property]);
        formBody.push(encodedKey+"="+encodedValue);
    }

    formBody = formBody.join("&");
    console.log(formBody);
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: formBody, // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }).then(res => res.text())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));


}