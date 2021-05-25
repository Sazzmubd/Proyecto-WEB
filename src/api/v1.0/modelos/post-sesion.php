<?php
//POST

$nombre = $_POST['nombre'];
$contrasenya = $_POST['contrasenya'];

//echo $_POST['content'];

if (!isset ($conn))die();//die lo que hace es cortar la conexion y devuelve Error...

$sql = "SELECT * FROM `usuarios` WHERE `nombre` = '$nombre' and `contrasenya` = '$contrasenya'"; // (*) eso significa todos los campos

$result = mysqli_query($conn, $sql);//
//echo mysqli_num_rows($result);//comprobar que esta esto
//echo mysqli_num_rows($result);
if (mysqli_num_rows($result) > 0) {


//                   esto es lo de RECORDAR CONTRASEÑA
    if(isset($_POST['recordar'])){
        session_start([
            'cookie_lifetime' => 60 * 60 * 24* 365,
        ]);
    }else{
        session_start();
    }


    while ($fila = mysqli_fetch_assoc($result)) {
        //echo $fila["nombre"] . "<br>";// esto devuelve los datos que pidesen este caso nombre

        //echo json_encode($fila);// no sirve para mi trabajo  pero es para que me recoja los datos en formato json creo q no hay q

        $salida = [];
        $salida["id"] = $fila ["id"];// esto lo utilizare ara devolver lo de las mediciones
        $salida["nombre"] = $fila ["nombre"];// esto lo utilizare ara devolver lo de las mediciones
        $salida["rol"] = $fila ["rol"];// esto lo utilizare ara devolver lo de las mediciones

        $_SESSION["id"] = $fila["id"];//Aqui se guarda lo de la cookies
        $_SESSION["nombre"] = $fila["nombre"];//Aqui se guarda lo de la cookies                MIRARRRRRRRRRRRRRRRRRRRRRRRRRR
        $_SESSION["rol"] = $fila["rol"];//Aqui se guarda lo de la cookies
        //echo (json_encode($salida));
    }
} else {
    http_response_code(401);
    die();
    //echo "no hay usuarios con ese nombre"

}

