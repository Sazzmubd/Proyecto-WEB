<?php
session_start();

if(isset($_GET["idCampos"]) && $_GET['idCampos']!=0) {//si es distinto de cero haz esto
    $idUsuario = $_SESSION['id'];
    $idParcela = $_GET['idCampos'];
    //$idUsuarioSelecionado = $_GET['idUsuario'];


    if($_SESSION['rol'] == "admin"){// si eres admin q te de todas la parcelas
        $sql ="SELECT `campos`.`id` AS usuario, `campos`.`idCampos` AS `campo`, `sensor`.* FROM `campos` INNER JOIN `sensor` ON `campos`.`idCampos` = `sensor`.`idCampos`";// WHERE `campos`.`id` = $idUsuarioSelecionado

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


    $sql = 'SELECT * FROM mediciones ORDER BY idSensor ASC';
    if(!$result = mysqli_query($conn, $sql)) die(); //si la conexión cancelar programa

    $rawdata = array(); //creamos un array

    //guardamos en un array multidimensional todos los datos de la consulta
    $i=0;

    while($row = mysqli_fetch_array($result))
    {
    $rawdata[$i] = $row;
    $i++;
    }


    $json = json_encode($rawdata);

    $file = getcwd() . '../JsonTemp/data.json';
    if(file_exists($file) != true){
        $fh = fopen($file, 'w');
    }
    file_put_contents($file, $json);

    //echo json_encode($salida);//enviar a  JSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
    $http_code = 200;

}else{
    $http_code = 400;
}