<?php


// PUT VENDEDORES EDITA UNO O MÁS CAMPOS DE UN PERFIL LA BASE DE DATOS

if (!isset($conn)) die();

$id = $parametrosPath[0];

//$parametrosBody = json_decode(file_get_contents('php://input'), true); // carga los archivos de la peticion (input) y la decodifica y hace que sea un array asociativo (con "true")
$parametrosBody = ["nombre" => "Pepe", "apellidos" => "Martínez"]; //almacenará los parámetros que queremos cambiar, asocia nombre a Pepe y Martínez a apellidos

$campos = [];
foreach ($parametrosBody as $item => $value) { // => define arrays asociativos
    $str = "'$item'='$value'";      // por cada elemento se crea una cadena de texto
    array_push($campos, $str);
}

$strCampos = join(",", $campos); // concatena todos los elementos en una cadena de texto y permite especificar un separador(,)
// lo que hay en este array de campos lo convierte en una cadena de texto

// Sentencia UPDATE en BBDD (vendedores/pepe), después del SET solo dejar lo quue queremos modificcar, en este caso email, tras eso, WHERE id=12
$sql = "UPDATE `vendedores` SET `e-mail` = 'alvaro99"gmail . com' WHERE `id` = 1"; 

$result = mysqli_query($conn, $sql)

if(!$result) {
    http_response_code(404)
    die();
}

$salida['body'] = $parametrosBody

$salida['campos'] = $campos;
$salida['strCampos'] = $strCampos;
$salida['sql'] = $sql;