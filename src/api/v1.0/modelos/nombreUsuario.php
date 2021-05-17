<?php
session_start();
$usuario = $_SESSION["usuario"];


$salida = [];

$serverNombre = "localhost";
$userNombre = "root";
$password = "";
$dbNombre = "ejercicio_ventas";

$conn = mysqli_connect($serverNombre, $userNombre, $password, $dbNombre);
$sql = "SELECT * FROM `usuarios` WHERE `nombre`='$usuario' ";

$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while ($fila = mysqli_fetch_assoc($result)) {

        $respuesta = [];
        $respuesta["usuario"] = $fila ["usuario"];
        $respuesta["contrasenya"] = $fila ["contrasenya"];
        $respuesta["rol"] = $fila ["rol"];

        header('Content-Type: application/json;');
        echo json_encode($respuesta);

    }
} else {
    http_response_code(401);
    die();
}