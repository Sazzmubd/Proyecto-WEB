document.querySelector("form").addEventListener("submit", function (event) {

    event.preventDefault();//para q no envie cuando hagas enter el submit
    let dataLogin = new FormData(event.target); //aqui se almacena los datos en la variable esa
    console.log(dataLogin.get("username"));
    console.log(dataLogin.get("userpass"));


    fetch('http://localhost/src/api/v1.0/solicitud', {
        method: 'POST',
        body:dataLogin,

    }).then(function (res) {

        console.log(response);
        response.json().then(data => console.log(data))

    })
})
