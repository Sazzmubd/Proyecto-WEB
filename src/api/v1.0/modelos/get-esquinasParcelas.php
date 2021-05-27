<?php
session_start();
$idParcela = $_GET['idParcela'];

$sql = "SELECT `lat`,`lng` FROM `esquinas` WHERE `idCampos`= $idParcela";//idCampos = id_parcela
$res = mysqli_query($conn, $sql);

while($fila = mysqli_fetch_assoc($res)){//fila es lo importante, q es lo que despue se manda al JSSSSS
    array_push($salida, $fila);
}
echo json_encode($salida);//enviar a  JSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

$http_code = 200;