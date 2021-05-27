

$("#submenu").css("display", "none");

$(document).ready(function () {
    $("#userBtn").click(function (evento) {
        if ($("#userBtn").attr("checked")) {
            $("#submenu").css("display", "none");
        } else {
            $("#submenu").css("display", "block");
        }
    });
});

$("#submenu").css("display", "none");

$(document).ready(function () {
    $("#cerrarBtn").click(function (evento) {
        if ($("#cerrarBtn").attr("checked")) {
            $("#submenu").css("display", "block");
        } else {
            $("#submenu").css("display", "none");
        }
    });
});


