<?php

if (!isset($salida)) die();
//meter los encabezados http
header('Content-type: application/json; charset=utf-8');
header('Acces-Control-Allow-Origin:*');
header('Acces-Control-Allow-Methods: PUT, GET, POST, DELETE');

echo json_encode($salida);//y aqui formatea la salida json y la manda

