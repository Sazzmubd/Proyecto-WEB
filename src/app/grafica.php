<?php
function connectDB(){

    $server = "localhost";
    $user = "root";
    $pass = "";
    $bd = "proyecto";

    $conexion = mysqli_connect($server, $user, $pass,$bd);

    if ($conexion) {
        echo 'La conexion de la base de datos se ha hecho satisfactoriamente';
    } else {
        echo 'Ha sucedido un error inexperado en la conexion de la base de datos';
    }

    return $conexion;
}

function disconnectDB($conexion){

    $close = mysqli_close($conexion);

    if ($close) {
        echo 'La desconexion de la base de datos se ha hecho satisfactoriamente';
    } else {
        echo 'Ha sucedido un error inexperado en la desconexion de la base de datos';
    }   

    return $close;
}

function getArraySQL(){
    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    $sql = 'SELECT * FROM mediciones';
    if(!$result = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa

    $rawdata = array(); //creamos un array

    //guardamos en un array multidimensional todos los datos de la consulta
    $i=0;

    while($row = mysqli_fetch_array($result))
    {
    $rawdata[$i] = $row;
    $i++;
    }

    disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}

function createJSONFile($json){
    $file = '../api/v1.0/JsonTemp/data.json';
    if(file_exists($file) != true){
        $fh = fopen($file, 'w');
    }
    file_put_contents($file, $json);
}

$myArray = getArraySQL();
$json = json_encode($myArray);
createJSONFile($json);
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Index</title>

    <link rel="icon" href="ImagenesProyecto/brote.svg" type="image/ico"/>
    <link rel="stylesheet" href="css/index-style.css">
    <link rel="stylesheet" href="css/sidenav.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.min.js" integrity="sha512-VCHVc5miKoln972iJPvkQrUYYq7XpxXzvqNfiul1H4aZDwGBGC0lq373KNleaB2LpnC2a/iNfE5zoRYmB4TRDQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/luxon@1.26.0/build/global/luxon.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@1.0.0/dist/chartjs-adapter-luxon.min.js"></script>
    <script src="js/sidenav.js"></script>

    <style>
        .chart-container { position: relative; width: 80vw; height: 50vh; border: solid 1px black; margin: 0 auto; }
    </style>
    

</head>
<!-- proyecto -->
<body class="fondo">

<!-- proyecto -->
<nav id="mySidenav" class="sidenav">
    <ul>
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&#215;</a>
        <li><a class="sidenav-nav" href="../login.html">Iniciar sesión</a>
        </li>
        <li><a class="sidenav-nav" href="../preguntasFrecuentes.html">Preguntas Frecuentes</a>
        </li>
        <li><a class="sidenav-nav" href="../nosotros.html">Acerca de Nosotros</a>
        </li>
        <li><a class="sidenav-nav" href="#footer">Contáctanos</a>
        </li>
    </ul>
</nav>



<header class="header">
    <nav class="container logo-menu-container">
        <a href="../index.html" class="logo"><img src="ImagenesProyecto/logoGTI.svg" height=""
                                               width="120"/></a>
        <!-- Use any element to open the sidenav -->
        <span><a class="menu-icon" onClick="openNav()"><img src="ImagenesProyecto/LandingPage/menu.svg"
                                                            height="32" width="46" alt="menu-icon"/></a></span>
    </nav>
</header>

<div class="fondo-pantalla">

    <main>
        <div class="chart-container">
            <canvas id="chart"></canvas>
        </div>
    </main>
</div>

<section class="flexbox column space-between section-info">
    
</section>


<footer id="footer" class="footer">
    <div class="parrafo"><a href="../terminosPrivacidad.html">© 2021 - GTI</a></div>
    <div class="parrafo">Escuela Politécnica Superior de Gandia <br>
        C/ Paranimf, 1 <br>
        46730 Grao de Gandia, Gandia <br>
        Tel. (+34) 96 284 93 33
    </div>
    <script src="js/grafica.js"></script>
</footer>


</body>
</html>

