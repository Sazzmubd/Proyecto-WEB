var globalSolicitudes;
//'../api/v1.0/sesion/'
fetch("../api/v1.0/tablaSolicitudes/",{
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
            '<td name="nombreyapellidos" data-titulo="Nombre y Apellidos">'+solicitudes[i].nombreApellidosEmpresa+'</td>'+
            '<td name="tipo" data-titulo="Tipo">'+solicitudes[i].tipo+'</td>'+
            '<td name="email" data-titulo="Email">'+solicitudes[i].correo+'</td>'+
            '<td name="telefono" data-titulo="Teléfono">'+solicitudes[i].telefono+'</td>'+
            '<td name="motivo" data-titulo="Motivo">'+solicitudes[i].motivo+'</td>'+
            '<td name="provincia" data-titulo="Provincia">'+solicitudes[i].provincia+'</td>'+
            '<td>'+'<div>'+'<img id='+i+' src="ImagenesProyecto/plus.svg" height="" width="30" onmouseup="addClient(this.id)">'+' '+'<img id='+i+' src="ImagenesProyecto/eliminar.svg" height="" width="30" onclick="borrarSolicitud(this.id)">'+'</div>'+'</td>'
    }
})


function addClient(id){
    console.log("------------AÑADO CLIENTE --------------------")
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
    }).then(res => {
        let result = res.text()
        console.log("Se ha añadido correctamente",result)
    })

    borrarSolicitud(id);

}

function borrarSolicitud(id){

    let url = "../api/v1.0/deleteSolicitud"
    let data = {
        id:globalSolicitudes[id].id
    }
    let formBody = [];
    for (let property in data){
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey+"="+encodedValue);
    }

    formBody = formBody.join("&");

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: formBody, // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }).then(res =>{
        res.text()
        window.location.reload();
    })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

}