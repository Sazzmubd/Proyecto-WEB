
<HTML>
<BODY>

<meta charset="utf-8"> 
<?php
require_once("Class.php");

//Creamos un objeto de la clase
$rand = new RandomTable();
//obtenemos toda la información de la tabla
$rawdata = $rand->getAllInfo();

//nos creamos arrays para almacenar os datos (fecha y valores)
$valoresArray;
$timeArray;
//en un bucle for obtenemos en cada iteración el valor númerico y 
//el TIMESTAMP del tiempo y lo almacenamos en los arrays 
for($i = 0 ;$i<count($rawdata);$i++){
    $valoresArray[$i]= $rawdata[$i][1];
    //OBTENEMOS EL TIMESTAMP
    $time= $rawdata[$i][7];
    $date = new DateTime($time);
    //ALMACENAMOS EL TIMESTAMP EN EL ARRAY
    $timeArray[$i] = $date->getTimestamp()*1000;
}

$humedadArray; 
for($i = 0 ;$i<count($rawdata);$i++){
    $valoresArray[$i]= $rawdata[$i][1];
    //OBTENEMOS HUMEDAD
    $humedad= $rawdata[$i][3];
}

$salinidadArray; 
for($i = 0 ;$i<count($rawdata);$i++){
    $valoresArray[$i]= $rawdata[$i][1];
    //OBTENEMOS SALINIDAD
    $salinidad= $rawdata[$i][4];
}

$temperaturaArray; 
for($i = 0 ;$i<count($rawdata);$i++){
    $valoresArray[$i]= $rawdata[$i][1];
    //OBTENEMOS TEMPERATURA
    $temperatura= $rawdata[$i][5];
}

$luminosidadArray; 
for($i = 0 ;$i<count($rawdata);$i++){
    $valoresArray[$i]= $rawdata[$i][1];
    //OBTENEMOS LUMINOSIDAD
    $luminosidad= $rawdata[$i][6];
}

$idMedicion; 
for($i = 0 ;$i<count($rawdata);$i++){
    $valoresArray[$i]= $rawdata[$i][1];
    //OBTENEMOS IDMEDICION
    $idMedicion= $rawdata[$i][2];
}

$idSensor; 
for($i = 0 ;$i<count($rawdata);$i++){
    $valoresArray[$i]= $rawdata[$i][1];
    //OBTENEMOS IDSENSOR
    $idSensor= $rawdata[$i][8];
}

?>
<div id="contenedor"></div>

<script src="https://code.jquery.com/jquery.js"></script>
    <!-- Importo el archivo Javascript de Highcharts directamente desde su servidor -->
<script src="http://code.highcharts.com/stock/highstock.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>
<script>

chartCPU = new Highcharts.StockChart({
    chart: {
        renderTo: 'contenedor'
        //defaultSeriesType: 'spline'
        
    },
    rangeSelector : {
        enabled: false
    },
    title: {
        text: 'Gráfica'
    },
    xAxis: {
        type: 'datetime'
        //tickPixelInterval: 150,
        //maxZoom: 20 * 1000
    },
    yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
            text: 'Valores',
            margin: 10
        }
    },
    series: [{
        name: 'Valor',
        data: (function() {
                // generate an array of random data
                var data = [];
                <?php
                    for($i = 0 ;$i<count($rawdata);$i++){
                ?>
                data.push([<?php echo $valoresArray[$i];?>,<?php echo $humedadArray[$i];?>,<?php echo $salinidadArray[$i];?>,<?php echo $temperaturaArray[$i];?>,<?php echo $luminosidadArray[$i];?>,<?php echo $timeArray[$i];?>,<?php echo $idMedicion[$i];?>,<?php echo $idSensor[$i];?>]);
                <?php } ?>
                return data;
            })()
    }],
    credits: {
            enabled: false
    }
});

</script>   
</BODY>

</html>