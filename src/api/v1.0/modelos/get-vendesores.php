<?php

if (!isset($conn)) die();

$sql = "SELECT * FROM vendedores";

if ($parametrosPath[0] != ""){
    $sql .= "WHERE 'id' = " . $parametrosPath[0];
}
        
     $result = mysqli_query($conn, $sql);
     
     while($fila = mysqli_fetch_assoc($result)){
        $fila['id'] = (int) $fila['id'];
        array_push($salida, $fila);
     }