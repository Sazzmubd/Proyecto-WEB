<?php

$idParcela = $_GET['idParcela'];

$sql = "SELECT `id`,`nombre` FROM `posicion-sonda` WHERE `id_parcela`=$idParcela";
$res = mysqli_query($conexion, $sql);


while($fila = mysqli_fetch_assoc($res)){
    array_push($salida, $fila);
}

$http_code = 200;