<?php


//poder mandar la solicitud a base de datos
$Email= $_POST['email'];
$Tipo= $_POST['tipo'];
$NombreApellidos= $_POST['nombreapellidos'];
$Telefono= $_POST['telefono'];


$sql = "INSERT INTO clientes(correo, nombreapellidosempresa, telefono,tipo) VALUES ('$Email','$NombreApellidos','$Telefono','$Tipo');";
$res = mysqli_query($conn, $sql);

if ($res==true){
    $http_code=200;//enviado
}else {
    $http_code = 401;//error no se ha enviado
}$res = mysqli_query($conn, $sql);
