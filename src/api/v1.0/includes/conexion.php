<?php

/*
$serverNombre = "localhost";
$userNombre = "aescrod_Francisco2";//aescrod_Francisco2
$password = "Francisco12345678";//Francisco12345678
$dbNombre = "aescrod_proyectoWebUsuarios";//aescrod_proyectoWebUsuarios
// Crear la conexión
*/
///*
    $serverNombre = "localhost";
    $userNombre = "root";
    $password = "";               // SI QUIERO CAMBIAR A ESTA BASE DE DATOS 1ºopen explorer src 2ºzip 3º subir
    $dbNombre = "proyecto";
// Crear la conexión
//*/
$conn = mysqli_connect($serverNombre, $userNombre, $password, $dbNombre);//$conn es una variable en la que se almacenan los datos
// Chequear la conexión
if(!$conn){
    http_response_code(500);
    die("no se conecta a base de datos");
}
mysqli_query($conn,'SET NAMES utf8');

