<?php
session_start();
if(isset($_SESSION['rol']) && $_SESSION['rol'] !== '') {
    $salida = ($_SESSION);
} else {
    http_response_code(401);
    die();
}