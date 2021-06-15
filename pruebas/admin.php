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

    <link rel="icon" href="../src/app/ImagenesProyecto/brote.svg" type="image/ico"/>
    <link href="../src/app/css/tablasClientes-style.css" rel="stylesheet">
    <link rel="stylesheet" href="../src/app/css/sidenav.css">

</head>

<body>

<nav id="mySidenav" class="sidenav"><!-- LO DE LOS UL -->
    <ul>
        <li><a class="sidenav-nav" href="javascript:logout()">Cerrar sesión</a><!-- AQUI EJECUTO JSSSSSSSSSSSSSSSSSSSSSS -->
        </li>
        <li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&#215;</a></li>
        <li><a class="sidenav-nav" href="../src/app/tablaSolicitudes.php">Tabla Solicitudes</a></li>
    </ul>
</nav>


<header class="header">
    <div class="container logo-menu-container">
        <a href="../src/index.html" class="logo"><img src="../src/app/ImagenesProyecto/logoGTI.svg" height="" width="120"/></a>
        <!-- Use any element to open the sidenav -->
        <span><a class="menu-icon" onClick="openNav()"><img src="../src/app/ImagenesProyecto/LandingPage/menu.svg"
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

            <td><img onclick="verCamposUsuario(<?php echo $mostrar['id']?>)" src="../src/app/ImagenesProyecto/atencion.svg" height="" width="70"/></td>
            <td><img src="../src/app/ImagenesProyecto/editar.svg" height="" width="20"</td>

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
<script src="../src/app/js/jQuery.js"></script>
<script src="../src/app/js/sidenav.js"></script>
<script src="../src/app/js/filter.js"></script>
<script src="../src/app/js/botonesMostrar.js"></script>
<script src="../src/app/js/comprobar-sesion.js"></script>
<script src="../src/app/js/sortable.js"></script>
<script src="../src/app/js/funcionRecogerId.js"></script>


</body>
</html>
