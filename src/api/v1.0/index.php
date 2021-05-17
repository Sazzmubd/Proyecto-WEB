<?php

require_once 'includes/conexion.php';

$metodo = $_SERVER ['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];

$path = explode('v1.0/', parse_url($uri, PHP_URL_PATH))[1];

$parametrosPath = explode('/', $path);//esto deberiacontener sesion

$recurso = array_shift($parametrosPath);//saber que recurso se solicita, y donde me tiene que redirigir

$salida = [];//NEWWW

include 'modelos/' . strtolower($metodo) . '-' . $recurso . '.php';

include 'vistas/json.php';//NEWWW

