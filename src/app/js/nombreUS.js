fetch( '../api/v1.0/sesion/', {

    method:"GET"

}).then(function (respuesta) {
    if (respuesta.ok) {
        return respuesta.json();
    }
}).then(function (datos) {
    document.getElementById("output").textContent = datos.nombre;
    window.datosUsuario = datos;//                            AQUI DECLARO UNA VARIABLE SUUUUUPEEEEERRRRGLOBAL
})