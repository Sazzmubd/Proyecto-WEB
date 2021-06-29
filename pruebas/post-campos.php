<?php


//poder mandar la solicitud a base de datos
$inputIdUsuario= $_POST['inputIdUsuario'];
$inputColor= $_POST['inputColor'];



$sql = "INSERT INTO `campos` (`id`,`color`) VALUES ('$inputIdUsuario', '$inputColor')";
$res = mysqli_query($conn, $sql);
if ($res==true){
    $http_code=200;//enviado
}else {
    $http_code = 401;//error no se ha enviado
}
