<?php


//poder mandar la solicitud a base de datos
$inputIdCampos= $_POST['inputIdCampos'];
$inputLatitud= $_POST['inputLatitud'];
$inputLongitud= $_POST['inputLongitud'];
$inputEstado= $_POST['inputEstado'];



$sql = "INSERT INTO `sensor` (`idCampos`,`lat`,`lng`, `estado`) VALUES ('$inputIdCampos', '$inputLatitud', '$inputLongitud', '$inputEstado')";
$res = mysqli_query($conn, $sql);
if ($res==true){
    $http_code=200;//enviado
}else {
    $http_code = 401;//error no se ha enviado
}
