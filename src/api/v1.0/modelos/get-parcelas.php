<?php
session_start();

$idUsuario = $_SESSION['id'];// meter en una variable la id que del que se ha registrado

 if($idUsuario <= 2 && isset($_GET['idUsuario'])){//esto es si es el admin

     $idUsuarioSelect = $_GET['idUsuario'];// y esto es para seleccionar el id del usuario que quiero espiar
     $sql = "SELECT `id`,`nombre` FROM `parcelas` WHERE `id_usuario` = $idUsuarioSelect";
 }else{
     $sql = "SELECT `id`,`nombre` FROM `parcelas` WHERE `id_usuario` = $idUsuario";
 }

    $res = mysqli_query($conexion, $sql);

while($fila = mysqli_fetch_assoc($res)){
    array_push($salida, $fila);
}
$http_code = 200;