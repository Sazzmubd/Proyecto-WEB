fetch("../app/tablaSolicitudes.php",{
    method:"GET"
}).then(function (respuesta){
    if(respuesta.ok){//si la repuesta devuleve un ok
        console.log("ok");
        return respuesta.json();
    }
}).then(function (solicitudes){
    console.log(solicitudes)
})