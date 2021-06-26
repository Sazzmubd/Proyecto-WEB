function logout () {
    fetch('api/v1.0/sesion/', {// asi funciona en plesk
        method: `DELETE`
    }).then(function(respuesta){
        if(respuesta.ok) {
            location.href = `../index.html`;
		}
	})
}