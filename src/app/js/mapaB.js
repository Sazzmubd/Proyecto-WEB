//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
let map;

let idCampos;

/*fetch( '../api/v1.0/parcela?idCampos='+1).then(function (respuesta){
        return respuesta.json();
}).then(function(datos){
    console.log(datos);
    idCampos = datos.idCampos;
})*/


function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.9965055, lng: -0.1674364},
        zoom: 15,

        mapTypeId: 'hybrid',
        styles: [
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                stylers: [{visibility: 'off'}]
            }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
    });

    //cargarCampo(1)
    //cargarPosicion(1)
    cargarParcelas(datosUsuario.id);
    // 1º coger la sesion del usuario
    // 2º coger todos sus ids campos
    //3º mostrar los ids q has sacado
    //4º meter esos ids en un array
    cargarPosiciones(datosUsuario.id);
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
function cargarCampo(idCampos) {
    fetch('../api/v1.0/esquinasParcelas?idParcela=' + idCampos).then(function (campos) {
        return campos.json();

    }).then(function (jsonCampos) {//viene del get esquinas

        console.log(jsonCampos);

        jsonCampos.forEach(function (campo) {//obtener cada parcelas bucle todas
            campo.lat = parseFloat(campo.lat);//obtener cada latitud
            campo.lng = parseFloat(campo.lng);//obtener cada longitud
        });

        let bounds = new google.maps.LatLngBounds();//esto son los limites del poligono
        let polygon = new google.maps.Polygon({//esto crea el poligono
            paths: jsonCampos,
            strokeColor: "#ff0000",
            strokeOpacity: .8,
            strokeWeight: 2,
            fillColor: "#ff0000",
            fillOpacity: .5,
            map: map
        });


        polygon.getPath().getArray().forEach(function (v) {
            //console.log(v);
            bounds.extend(v);
        })
        console.log(map);
        map.fitBounds(bounds);
        map.setCenter(jsonCampos[0]);
    })
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
function cargarPosicion(idCampos) {
    //let idParcelaEnlace = idCampos;
    fetch('../api/v1.0/posicionSensor?idParcela="' + idCampos + '"').then(function (localizaciones) {
        return localizaciones.json();
    }).then(function (localizacionesj) {

        localizacionesj.forEach(function (localizacion) {
            localizacion.lat = parseFloat(localizacion.lat);
            localizacion.lng = parseFloat(localizacion.lng);
        });


        localizacionesj.forEach(function (localizacion) {
            var marker = new google.maps.Marker({
                position: {lat: localizacion.lat, lng: localizacion.lng},// aqui pones la la latitud y longitud
                //de la base de datos en los markers
                label: localizacion.id + "",
                animation: google.maps.Animation.DROP,//esto es la gota roja
                map: map
            });

        })
    })
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
function cargarParcelas(idUsuario = "") {
    let url = '../api/v1.0/parcela';
    if (idUsuario != "") {
        url = '../api/v1.0/parcela?idCampos=' + idUsuario;
    }
    fetch(url).then(function (campos) {
        return campos.json();
    }).then(function (esquinas) {

        let bounds = new google.maps.LatLngBounds();//CREO Q SON LOS LIMITES

        let paths = [];
        let colores =[];

        esquinas.forEach(function (esquina) {
            if (!paths[esquina.campo]) {
                paths[esquina.campo] = [];
                colores[esquina.campo] = esquina.color;
            }
            let vertice = {
                lat: parseFloat(esquina.lat),
                lng: parseFloat(esquina.lng)
            }

            paths[esquina.campo].push(vertice);//en vez de paths ahi creo un marker
        })

        paths.forEach(function (path, index) {

            let polygon = new google.maps.Polygon({
                paths: path,
                strokeColor: colores[index],
                strokeOpacity: .8,
                strokeWeight: 2,
                fillColor: colores[index],
                fillOpacity: .5,
                map: map
            });

            polygon.getPath().getArray().forEach(function (v) {
                bounds.extend(v);
            })
            map.fitBounds(bounds);
        })


    })


}



//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------


//en get parcela hay que cambiar si el usuario es el admin hay hacer eso       $sql ="SELECT `campos`.`id` AS usuario, `campos`.`color`, `campos`.`idCampos` AS `campo`, `esquinas`.* FROM `campos` INNER JOIN `esquinas` ON `campos`.`idCampos` = `esquinas`.`idCampos`";


//COGER EL MISMO CODIGO DE PARCELAS Y HACER LO MISMO CON POSICIONES
//CAMBIAR LA SENTENCIA SQL


function cargarPosiciones(idUsuario = "") {
    let url = '../api/v1.0/posicion';
    if (idUsuario != "") {
        url = '../api/v1.0/posicion?idCampos=' + idUsuario;
    }
    fetch(url).then(function (campos) {
        return campos.json();
    }).then(function (posiciones) {




        posiciones.forEach(function (posicion) {
            //console.log(posicion);

            posicion.lat = parseFloat(posicion.lat);
            posicion.lng = parseFloat(posicion.lng);

            posiciones.forEach(function (posicion) {// esto de aqui crea  marcadores y en este caso como hay un foreach es crear todos
                var marker = new google.maps.Marker({
                    position: {lat: posicion.lat, lng: posicion.lng},
                    label: posicion.id + "",
                    animation: google.maps.Animation.DROP,
                    map: map
                });


            })


        })

    })


}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
/*
function cargarPosiciones(idUsuario = "") {
    let url = '../api/v1.0/parcelas';
    let idParcela;
    if (idUsuario != "") {
        url = '../api/v1.0/parcelas?idUsuario=' + idUsuario;
    }
    fetch(url).then(function (parcelas) {
        return parcelas.json();
    }).then(function (parcelasj) {//enviar a JSSSSSSSSSSSSSSS  esto viene de get parcelas
        parcelasj.forEach(function (parcela) {
            fetch('../api/v1.0/posicionSonda?idParcela="' + parcela.id + '"').then(function (posicionesParcela) {
                idParcela = parcela.id;
                return posicionesParcela.json();
            }).then(function (posicionesj) {

                posicionesj.forEach(function (posicion) {
                    posicion.lat = parseFloat(posicion.lat);
                    posicion.lng = parseFloat(posicion.lng);
                });

                posicionesj.forEach(function (posicion) {// esto de aqui crea  marcadores y en este caso como hay un foreach es crear todos
                    var marker = new google.maps.Marker({
                        position: {lat: posicion.lat, lng: posicion.lng},
                        label: posicion.id + "",
                        animation: google.maps.Animation.DROP,
                        map: map
                    });


                })

            })
        })

    })
}

*/