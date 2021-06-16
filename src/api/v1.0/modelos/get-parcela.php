<?php
session_start();

if( $_GET['idCampos']!=0) {//si es distinto de cero haz esto
    $idUsuario = $_SESSION['id'];
    //$idParcela = $_GET['idCampos'];

    if($_SESSION['rol'] == "admin"){// si eres admin q te de todas la parcelas
        //$sql = "SELECT * FROM `campos` WHERE  `idCampos` = $idParcela";
        $sql ="SELECT `campos`.`id` AS usuario, `campos`.`color`, `campos`.`idCampos` AS `campo`, `esquinas`.* FROM `campos` INNER JOIN `esquinas` ON `campos`.`idCampos` = `esquinas`.`idCampos` WHERE `campos`.`id` = $idUsuario";
        $res = mysqli_query($conn, $sql);
    }
    
    else{//si eres usuario solo t va a dar las tuyas
        //$sql = "SELECT * FROM `campos` WHERE `id`= $idUsuario AND `idCampos` = $idParcela";
        //$sql ="SELECT `campos`.`id` AS usuario, `campos`.`idCampos` AS `campo`, `esquinas`.* FROM `campos` INNER JOIN `esquinas` ON `campos`.`idCampos` = `esquinas`.`idCampos` WHERE `campos`.`id` = $idUsuario";

        $sql ="SELECT `campos`.`id` AS usuario, `campos`.`color`, `campos`.`idCampos` AS `campo`, `esquinas`.* FROM `campos` INNER JOIN `esquinas` ON `campos`.`idCampos` = `esquinas`.`idCampos` WHERE `campos`.`id` = $idUsuario";
        $res = mysqli_query($conn, $sql);
    }

    
    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salida, $fila);
    }
    
    //echo json_encode($salida);//enviar a  JSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
    $http_code = 200;

}else{
    $http_code = 400;
}