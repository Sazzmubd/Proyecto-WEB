<?php


//poder mandar la solicitud a base de datos

$inputCorreo= $_POST['inputCorreo'];



$sql = "INSERT INTO `olvidarcontrasenya` (`correo`) VALUES ('$inputCorreo')";
$res = mysqli_query($conn, $sql);
if ($res==true){
    $http_code=200;//enviado
}else {
    $http_code = 401;//error no se ha enviado
}
