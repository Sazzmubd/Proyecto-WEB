<?php
$conexion = mysqli_connect('localhost', 'root', '', 'proyecto');

$sql="SELECT * from solicitud";
$result=mysqli_query($conexion,$sql);

        if (mysqli_num_rows($result) > 0) {
            $arrayresultado= [];
            $narray=0;

        while($mostrar=mysqli_fetch_assoc($result)){
            $resultado = [];
            $resultado['id'] = $mostrar['idSolicitudes'];
            $resultado['fechasolicitud']=$mostrar['fechasolicitud'];
            $resultado['nombreApellidosEmpresa']=$mostrar['nombreApellidosEmpresa'];
            $resultado['tipo']=$mostrar['tipo'];
            $resultado['correo']=$mostrar['correo'];
            $resultado['telefono']=$mostrar['telefono'];
            $resultado['motivo']=$mostrar['motivo'];
            $resultado['provincia']=$mostrar['provincia'];
            $arrayresultado[$narray]=$resultado;
            $narray++;

            $_SESSION["solicitud"]=$resultado;

        }
            echo json_encode($arrayresultado);
        }
        else {
            http_response_code(401);
            die();
        }
        ?>
