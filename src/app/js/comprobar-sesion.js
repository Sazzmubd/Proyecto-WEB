fetch('../api/v1.0/sesion').then(function (respuesta) {
    if(respuesta.status != 200){
        location.href = '../login.html';
    }else{
        document.body.style = 'block';//para que no me este redirigiendo continuamente a la pagina
    }
})