<?php
/*
$conexion = mysqli_connect('localhost', 'root', '', 'proyecto');
*/
$sql="SELECT * from clientes";
$result=mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    $arrayresultado= [];
    $narray=0;

    while($mostrar=mysqli_fetch_assoc($result)){
        $resultado = [];
        $resultado['nombreapellidosempresa']=$mostrar['nombreapellidosempresa'];
        $resultado['tipo']=$mostrar['tipo'];
        $resultado['correo']=$mostrar['correo'];
        $resultado['telefono']=$mostrar['telefono'];
        $resultado['id']=$mostrar['id'];

        $arrayresultado[$narray]=$resultado;
        $narray++;

        $_SESSION["clientes"]=$resultado;

    }
    $salida = $arrayresultado;

    //echo json_encode($arrayresultado);
}
else {
    http_response_code(401);
    die();
}
?>