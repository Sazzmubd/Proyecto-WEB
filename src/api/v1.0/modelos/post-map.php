<?php

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST'){

    require_once '../includes/conexion.php';

    $id = trim($_POST['id']);
    $data = trim($_POST['data']);

    if(isset($_POST['extra'])){
        $extra = trim($_POST['extra']);
    }

    switch($data){
        case "field":
            $finalData = getFieldData($id);
            break;
        case "plot":
            $finalData = getPlotData($extra);
            break;
        case "probe":
            $finalData = getProbeData($extra);
            break;
    }

    if($finalData != null && !empty($finalData)){
        encodeData($finalData);
    }else{
        http_response_code(401);
        die();
    }
}

function getFieldData($id){
    $sql = "SELECT `idCampos`, `esquinas`, `color` FROM `campos` WHERE `id` = '$id'";
    $result = mysqli_query($GLOBALS["conn"], $sql);

    $fieldData = array();

    class Campos {
        public $idCampo;
        public $color;
        public $esquinas;

        function __construct($a, $b, $c) {
            $this->idCampo = $a;
            $this->color = $b;
            $this->esquinas = $c;
        }
    }

    if(!empty($result) && mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)) {
            $campo = new Campos($row["idCampos"], $row["color"], $row["esquinas"]);
            array_push($fieldData, $campo);
        }
    }

    return $fieldData;

}

//function getPlotData($idCampo){
//    $sql = "SELECT `idSensor`, `localizacion`, `estado` FROM `sensor` WHERE `idCampos` = '$idCampo';";
//    $result = mysqli_query($GLOBALS["conn"], $sql);
//
//    $plotData = array();
//
//    if(mysqli_num_rows($result) > 0){
//        class Sensor {
//            public $idSensor;
//            public $localizacion;
//            public $estado;
//
//
//            function __construct($a, $b, $c) {
//                $this->idSensor = $a;
//                $this->localizacion = $b;
//                $this->estado = $c;
//            }
//        }
//
//        while($row = mysqli_fetch_array($result)) {
//            $sensor = new Sensor($row["idSensor"], $row["localizacion"], $row["estado"]);
//            array_push($plotData, $sensor);
//        }
//    }
//
//    return $plotData;
//}
// ESTO SERÁ PARA EL TEMA DE LAS MEDICIONES, THOMAS ESTÁ AL CARGO (CÓDIGO: GRUPO DE ALEX)
//function getProbeData($idSensor){
//    $sql = "SELECT * FROM `mediciones` WHERE `idSensor` = '$idSensor';";
//    $result = mysqli_query($GLOBALS["conn"], $sql);
//
//    $probeData = array();
//
//    if(mysqli_num_rows($result) > 0){
//
//        // Realizar con datos de la bbdd
//        class mediciones {
//            public $localizacion;
//            public $humidity;
//            public $temperature;
//            public $salinity;
//            public $luminity;
//            public $lastUpdate;
//
//            function __construct($a, $b, $c, $d, $e, $f) {
//                $this->localizacion = $a;
//                $this->humidity = $b;
//                $this->temperature = $c;
//                $this->salinity = $d;
//                $this->luminity = $e;
//                $this->lastUpdate = $f;
//            }
//        }
//
//        while($row = mysqli_fetch_array($result)) {
//            $probe = new Probe($row["localizacion"], $row["humidity"], $row["temperature"], $row["salinity"], $row["luminity"], $row["lastUpdate"]);
//            array_push($probeData, $probe);
//        }
//    }
//
//    return $probeData;
//}

function encodeData($data){
    header('Content-Type: application/json');
    echo json_encode($data);
}