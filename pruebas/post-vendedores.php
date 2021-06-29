<?php
if(!isset($conn)) die();
//poder mandar la solicitud a base de datos
$nombre= "'".$_POST['nombre']. "'";
$apellidos= "'".$_POST['apellidos']. "'";


//esto es para hacer campos optativos creando un array vacio
$email = "'";//esto es para hacer campos optativos creando un array vacio

if(isset($_POST['email']))  "'".$email = $_POST['email']. "'";//esto es para hacer campos optativos creando un array vacio


$telefono ="'";//esto es para hacer campos optativos creando un array vacio

if(isset($_POST['telefono']))  "'".$telefono = $_POST['telefono']. "'";//esto es para hacer campos optativos creando un array vacio

$sql = "INSERT INTO `vendedores` (`nombre`, `apellidos`, `email`,`telefono`,) VALUES ('$nombre' ,'$apellidos', '$email','$telefono')";
$res = mysqli_query($conn, $sql);
if ($res){
    $salida['href'] = "/vendedores/".myqli_insert_id($conn);
    //$http_code=200;//enviado
}else {
    http_response_code(422);//error no se ha enviado
    die();
}

