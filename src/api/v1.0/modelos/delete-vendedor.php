<?php


//DELETE VENDEDORES ELIMINA UN VENDEDOR

if (!isset($conn)) die();

$id = $parametrosPath[0];

$sql = "DELETE FROM `vendedores` WHERE `id` = $id";

$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(200);
    die();
}