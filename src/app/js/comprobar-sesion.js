fetch('../api/v1.0/sesion').then(function (respuesta) {
    if(respuesta.status != 200){
        location.href = '../login.html';

    }else{
        location.href = '../app/panelUsuario.html';

    }
})