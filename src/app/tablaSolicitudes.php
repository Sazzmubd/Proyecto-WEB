<!-- Conexion con la bbdd -->
<?php
$conexion = mysqli_connect('localhost', 'root', '', 'proyecto');
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Solicitudes</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="ImagenesProyecto/brote.svg" type="image/ico"/>
    <link href="css/tablasClientes-style.css" rel="stylesheet">
    <link rel="stylesheet" href="css/sidenav.css">


</head>

<body>

<!-- Menú -->
<nav id="mySidenav" class="sidenav">
    <ul>
        <li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&#215;</a></li>
        <li><a class="sidenav-nav" href="../preguntasFrecuentes.html">Preguntas Frecuentes</a></li>
        <li><a class="sidenav-nav" href="monitorSensores2.html">Sensores</a></li>
    </ul>
</nav>

<!-- Cabezera -->
<header class="header">
    <div class="container logo-menu-container">
        <a href="../index.html" class="logo"><img src="ImagenesProyecto/logoGTI.svg" height="" width="120"/></a>
        <!-- Use any element to open the sidenav -->
        <span><a class="menu-icon" onClick="openNav()"><img src="ImagenesProyecto/LandingPage/menu.svg" height="32" width="46" alt="menu-icon"/></a></span>
    </div>
</header>

<main>

    <!--START: FLEXBOX(TÍTULO - BOTÓN USUARIO)-->

    <div class="titulo-usuario-box"><h2 class="titulo">Lista de solicitudes</h2></div>
    <!--END: FLEXBOX(TÍTULO - BOTÓN USUARIO)-->

    <br>

    <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Filtrar por...">

    <!-- Tabla de solicitudes1 -->
    <table class="sortable" id="myTable">
        <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Motivo</th>
            <th>Provincia</th>
            <th>Añadir/Eliminar</th>
        </tr>

        <?php
        $sql="SELECT * from solicitud";
        $result=mysqli_query($conexion,$sql);

        while($mostrar=mysqli_fetch_array($result)){
        ?>

        <tr>
            <td data-titulo="Fecha"><div style="width: 6rem"> <?php echo $mostrar['fecha']?> </div></td>
            <td data-titulo="Nombre"><?php echo $mostrar['nombreApellidosEmpresa']?></td>
            <td data-titulo="Apellidos"><?php echo $mostrar['tipo']?></td>
            <td data-titulo="Email"><?php echo $mostrar['correo']?></td>
            <td data-titulo="Teléfono"><?php echo $mostrar['telefono']?></td>
            <td data-titulo="Motivo"><?php echo $mostrar['motivo']?></td>
            <td data-titulo="Provincia"><?php echo $mostrar['provincia']?></td>
            <td><div><img src="ImagenesProyecto/plus.svg" height="" width="30">  <img src="ImagenesProyecto/eliminar.svg" height="" width="30"></div></td>
        </tr>
            <?php
        }
        ?>
    </table>

    <br><br><br>
</main>

<!-- Footer -->
<footer id="footer" class="footer">
    <p><a href="../terminosPrivacidad.html">© 2021 - GTI</a></p>
    <p>Escuela Politécnica Superior de Gandia <br>
        C/ Paranimf, 1 <br>
        46730 Grao de Gandia, Gandia <br>
        Tel. (+34) 96 284 93 33
    </p>
</footer>


<!-- Scripts -->
<script src="js/jQuery.js"></script>
<script src="js/sidenav.js"></script>
<script src="js/filter.js"></script>
<script src="js/botonesMostrar.js"></script>
<script src="js/sortable.js"></script>

</body>
</html>