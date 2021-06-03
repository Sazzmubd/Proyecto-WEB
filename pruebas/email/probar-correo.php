<?php

define('INCLUDE_PATH', './email/');

include 'email/email.php';

EnviarCorreo('email@company.com', 'Holamundo', 'lo que sea');


define('INCLUDE_PATH', './ruta/hasta/includes/');
require_once INCLUDE_PATH.'SendMail.php';
$envio = EnviarCorreo($_POST['email'], $_POST['asunto'], '<p>'.$_POST['contenido'].'</p>');//esto viene del formulario
$salida = ['resultado' => $envio];
header('Content-Type: application.json;charset=utf-8');
header('Allow: POST');
header('Access-Control-Allow-Origin: *');
echo json_encode($salida);