<?php


//poder mandar la solicitud a base de datos
$inputName= $_POST['inputName'];
$inputTipo= $_POST['inputTipo'];
$inputCorreo= $_POST['inputCorreo'];
$inputTelefono= $_POST['inputTelefono'];
$inputMotivo= $_POST['inputMotivo'];
$inputProvincia= $_POST['inputProvincia'];



$sql = "INSERT INTO `solicitud` (`nombreapellidosempresa`, `tipo`, `correo`,`telefono`, `motivo`, `provincia`) VALUES ('$inputName' ,'$inputTipo', '$inputCorreo','$inputTelefono', '$inputMotivo', '$inputProvincia' )";
$res = mysqli_query($conn, $sql);
if ($res==true){
    $http_code=200;//enviado
}else {
    $http_code = 401;//error no se ha enviado
}
