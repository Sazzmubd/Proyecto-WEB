
// VARIABLES

$("#element1").hide(); // Lo primero a suceder
$("#element2").hide(); // Lo primero a suceder
$("#element3").hide(); // Lo primero a suceder
$("#element4").hide(); // Lo primero a suceder
$("#element5").hide(); // Lo primero a suceder
$("#element6").hide(); // Lo primero a suceder

<!-- Botón 1 -->

function ShowHideElement1() {
    let text = "";

    if($("#dropbtn1").text() == "Mostrar") {
        $("#element1").show();
        text = "Ocultar";
    }else{
        $("#element1").hide();
        text = "Mostrar"
    }

    $("#dropbtn1").html(text);
}

<!-- Botón 2 -->

function ShowHideElement2() {
    let text = "";

    if($("#dropbtn2").text() === "Mostrar") {
        $("#element2").show();
        text = "Ocultar";
    }else{
        $("#element2").hide();
        text = "Mostrar"
    }

    $("#dropbtn2").html(text);
}

<!-- Botón 3 -->

function ShowHideElement3() {
    let text = "";

    if($("#dropbtn3").text() === "Mostrar") {
        $("#element3").show();
        text = "Ocultar";
    }else{
        $("#element3").hide();
        text = "Mostrar"
    }

    $("#dropbtn3").html(text);
}

<!-- Botón 4 -->

function ShowHideElement4() {
    let text = "";

    if($("#dropbtn4").text() === "Mostrar") {
        $("#element4").show();
        text = "Ocultar";
    }else{
        $("#element4").hide();
        text = "Mostrar"
    }

    $("#dropbtn4").html(text);
}

<!-- Botón 5 -->

function ShowHideElement5() {
    let text = "";

    if($("#dropbtn5").text() === "Mostrar") {
        $("#element5").show();
        text = "Ocultar";
    }else{
        $("#element5").hide();
        text = "Mostrar"
    }

    $("#dropbtn5").html(text);
}

<!-- Botón 6 -->

function ShowHideElement6() {
    let text = "";

    if($("#dropbtn6").text() === "Mostrar") {
        $("#element6").show();
        text = "Ocultar";
    }else{
        $("#element6").hide();
        text = "Mostrar"
    }

    $("#dropbtn6").html(text);
}