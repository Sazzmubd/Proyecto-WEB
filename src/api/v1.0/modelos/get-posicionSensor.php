<?php

$idParcela = $_GET['idParcela'];


//coger de la tabla posicion-sonda y donde su id parcela coger los parametros `id`,`lat`,`lng`
$sql = "SELECT `id`,`lat`,`lng` FROM `posicion-sonda` WHERE `id_parcela` = $idParcela";
$res = mysqli_query($conn, $sql);

while($fila = mysqli_fetch_assoc($res)){
    array_push($salida, $fila);
}
$http_code = 200;