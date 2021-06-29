document.querySelector("form").addEventListener("submit", function (event) {

    alert("Solicitud enviada");

    event.preventDefault();//para q no envie cuando hagas enter el submit
    let dataLogin = new FormData(event.target); //aqui se almacena los datos en la variable esa

    //event.target es la informacion que rellenas en la tabla

    fetch('api/v1.0/olvidarContrasenya/', {
        method: 'POST',
        body:dataLogin,

    }).then(function (res) {

        console.log(res);
        res.json().then(data => console.log(data))
        window.location.reload();
    })
})
