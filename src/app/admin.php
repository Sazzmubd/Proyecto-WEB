<!-- Conexion con la bbdd -->
<?php
$conexion = mysqli_connect('localhost', 'root', '', 'proyecto');
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de clientes</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="ImagenesProyecto/brote.svg" type="image/ico"/>
    <link href="css/tablasClientes-style.css" rel="stylesheet">
    <link rel="stylesheet" href="css/sidenav.css">

</head>

<body>

<nav id="mySidenav" class="sidenav"><!-- LO DE LOS UL -->
    <ul>
        <li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&#215;</a></li>
        <li><a class="sidenav-nav" href="tablaSolicitudes.html">Tabla Solicitudes</a></li>
    </ul>
</nav>


<header class="header">
    <div class="container logo-menu-container">
        <a href="../index.html" class="logo"><img src="ImagenesProyecto/logoGTI.svg" height="" width="120"/></a>
        <!-- Use any element to open the sidenav -->
        <span><a class="menu-icon" onClick="openNav()"><img src="ImagenesProyecto/LandingPage/menu.svg"
                                                            height="32" width="46" alt="menu-icon"/></a></span>
    </div>
</header>

<main>

    <div class="titulo-usuario-box"><h2 class="titulo">Lista de clientes</h2></div>

    <br>

    <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Filtrar por...">

    <table class="sortable" id="myTable">
        <tr>
            <th>Nombre y Apellidos</th>
            <th>Tipo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Visualizar Sensores</th>
            <th>Editar</th>

        </tr>

        <?php
        $sql="SELECT * from clientes";
        $result=mysqli_query($conexion,$sql);

        while($mostrar=mysqli_fetch_array($result)){
        ?>

        <tr>
            <td data-titulo="Nombre y Apellidos"><?php echo $mostrar['nombreapellidosempresa']?></td>
            <td data-titulo="Tipo"><?php echo $mostrar['tipo']?></td>
            <td data-titulo="Correo"><?php echo $mostrar['correo']?></td>
            <td data-titulo="Teléfono"><?php echo $mostrar['telefono']?></td>
            <td><a href="../app/monitorSensores2.html" class="logo"><img src="ImagenesProyecto/atencion.svg" height="" width="70"/></a></td>
            <td><img src="ImagenesProyecto/editar.svg" height="" width="20"</td>

        </tr>
            <?php
        }
        ?>
    </table>

    <br><br><br>
</main>

<footer class="footer">
    <p>© 2021 - GTI</p>
    <p>Escuela Politécnica Superior de Gandia <br>
        C/ Paranimf, 1 <br>
        46730 Grao de Gandia, Gandia <br>
        Tel. (+34) 96 284 93 33</p>
</footer>

<!-- Scripts -->
<script src="js/jQuery.js"></script>
<script src="js/sidenav.js"></script>
<script src="js/filter.js"></script>
<script src="js/botonesMostrar.js"></script>
<script src="js/sortable.js"></script>

</body>
</html>