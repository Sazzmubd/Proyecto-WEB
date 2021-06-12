document .querySelector("form").addEventListener("submit", function (event){

    //console.log;
    event.preventDefault();//para q no envie cuando hagas enter el submit
    let dataLogin = new FormData(event.target); //aqui se almacena los datos en la variable esa
    console.log(dataLogin.get("username"));
    console.log(dataLogin.get("userpass"));


    fetch( 'api/v1.0/sesion/', {//               mirar esoooo es donde redirrige
        method:"POST",
        body:dataLogin


    }).then(function (respuesta){
        if(respuesta.ok){//si la repuesta devuleve un ok
            console.log("ok");
            return respuesta.json();
        }
    }).then(function (datos){
        if(datos.rol == "admin"){// Caso rol admin
            document.getElementById("output").textContent = "Bienvenido ," +datos.nombre + "!";
            setTimeout(function (){location.href = "app/tablaSolicitudes.php"}, 500);
        } else { // Caso resto roles
            document.getElementById("output").textContent = "Bienvenido ," +datos.nombre + "!";
            setTimeout(function (){location.href = "app/panelUsuario.html"}, 500); // Aquí cambiar el href por el que tú quieras
        }

    });
});