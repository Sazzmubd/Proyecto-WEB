<?php
$connection = mysqli_connect('localhost', 'root', '', 'proyecto');

if(isset($_POST['filtrar'])){
    $date_start = $_POST['date-input-start'];
    $date_end = $_POST['date-input-end'];

    if($date_start != '' && $date_end != ''){
        $date_start = strval($date_start) . ' 00:00:00';
        $date_end = strval($date_end) . ' 23:59:59';
        $query = "SELECT * FROM mediciones WHERE fecha >= '$date_start' AND fecha <= '$date_end' ORDER BY idSensor ASC";
        $result = mysqli_query($connection, $query);

        $rawdata = array(); //creamos un array

        //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;

        while($row = mysqli_fetch_array($result))
        {
        $rawdata[$i] = $row;
        $i++;
        }

        $json = json_encode($rawdata);

        $file = getcwd() . '/../JsonTemp/data.json';
        echo $file;
        if(file_exists($file) != true){
            $fh = fopen($file, 'w');
        }
        file_put_contents($file, $json);
        echo "<script src='js/mapaB.js'>getData();</script>";
    } else {
        echo '<script>alert("Por favor, rellene los espacios vacíos")</script>';
    }

    $return_window = '../../../app/panelUsuario.html';
    echo '<script type="text/javascript"> window.location.href="'.$return_window.'"; </script>';
}
