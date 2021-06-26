function logout () {
    fetch('api/v1.0/sesion/', {
        method: `DELETE`
    }).then(function(respuesta){
        if(respuesta.ok) {
            location.href = `../index.html`;
		}
	})
}