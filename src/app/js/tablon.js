document.querySelector("form").addEventListener("submit", function (event) {
    console.log(event.target);
    event.preventDefault();//para q no envie cuando hagas enter el submit
    let dataLogin = new FormData(event.target); //aqui se almacena los datos en la variable

    console.log(dataLogin);
});