<?php
include('../includes/conexion.php');

if(isset($_POST['insertar'])){
    $imagen = $_FILES['img-link']['name'];
    $url = $_POST['link'];
    $descripcion = $_POST['desc-link'];

    if(isset($imagen) && $imagen != ''){
        $tipo = $_FILES['img-link']['type'];
        $temp = $_FILES['img-link']['tmp-name'];

        if(!((strpos($tipo,'png') || strpos($tipo,'jpg') || strpos($tipo,'jpeg')))){
            $_SESSION['mensaje'] = 'Solo se permiten archivos png, jpg, jpeg';
            header('location:../../../tablon.html');
        } else {
            $query = "INSERT INTO anuncios(url, descripcion, imagen) values('$url', '$descripcion', '$anuncios')";
            $result = mysqli_query($conn, $query);
            if($result){
                move_uploaded_file($temp, '../../../app/ImagenesProyecto/Tablon/.$imagen');
                $_SESSION['mensaje'] = 'Archivo subido correctamente';
            } else {
                $_SESSION['mensaje'] = 'Error en el servidor';
            }
        }
    }

}
?>