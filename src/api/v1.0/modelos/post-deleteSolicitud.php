<?php


//poder mandar la solicitud a base de datos
$id = $_POST['id'];


$sql =  "DELETE FROM `solicitud` WHERE `idSolicitudes` = $id";
$res = mysqli_query($conn, $sql);

if ($res == true) {
    $http_code = 200;//enviado
} else {
    $http_code = 401;//error no se ha enviado
}
$res = mysqli_query($conn, $sql);
