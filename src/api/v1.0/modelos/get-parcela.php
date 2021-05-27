<?php
session_start();

if( $_GET['idParcela']!=0) {//si es distinto de cero haz esto

    $idUsuario = $_SESSION['id'];

    $idParcela = $_GET['idParcela'];

    if($_SESSION['rol'] == 1){// si eres admin q te de todas la parcelas
        $sql = "SELECT * FROM `campos` WHERE  `id` = $idParcela";
        $res = mysqli_query($conn, $sql);
    }
    
    else{//si eres usuario solo t va a dar las tuyas
        $sql = "SELECT * FROM `campos` WHERE `id_usuario`= $idUsuario AND `id` = $idParcela";
        $res = mysqli_query($conn, $sql);
    }

    
    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salida, $fila);
    }
    
    echo json_encode($salida);//enviar a  JSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
    $http_code = 200;

}else{
    $http_code = 400;
}