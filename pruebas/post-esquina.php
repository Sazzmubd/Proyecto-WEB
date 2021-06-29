    <?php


    //poder mandar la solicitud a base de datos
    $inputLatitud= $_POST['inputLatitud'];
    $inputLongitud= $_POST['inputLongitud'];
    $inputidCampos= $_POST['inputidCampos'];


    $sql = "INSERT INTO `esquinas` (`lat`,`lng`, `IdCampos`) VALUES ('$inputLatitud', '$inputLongitud', '$inputidCampos')";
    $res = mysqli_query($conn, $sql);
    if ($res==true){
        $http_code=200;//enviado
    }else {
        $http_code = 401;//error no se ha enviado
    }
