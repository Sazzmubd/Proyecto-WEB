<?php
session_start();

if(isset($_GET["idCampos"]) && $_GET['idCampos']!=0) {//si es distinto de cero haz esto
    $idUsuario = $_SESSION['id'];
    $idParcela = $_GET['idCampos'];

    if($_SESSION['rol'] == "admin"){// si eres admin q te de todas la parcelas
        $sql ="SELECT `campos`.`id` AS usuario, `campos`.`idCampos` AS `campo`, `sensor`.* FROM `campos` INNER JOIN `sensor` ON `campos`.`idCampos` = `sensor`.`idCampos` WHERE `campos`.`id` = $idUsuarioSelecionado";

        $res = mysqli_query($conn, $sql);
    }

    else{//si eres usuario solo t va a dar las tuyas
        //$sql = "SELECT * FROM `campos` WHERE `id`= $idUsuario AND `idCampos` = $idParcela";

        $sql ="SELECT `campos`.`id` AS usuario, `campos`.`idCampos` AS `campo`, `sensor`.* FROM `campos` INNER JOIN `sensor` ON `campos`.`idCampos` = `sensor`.`idCampos` WHERE `campos`.`id` = $idUsuario";
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