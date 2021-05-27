//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
let map;

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


}
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

function cargarCampo(idCampos) {
    fetch('../api/v1.0/esquinasParcelas="'+idCampos+'"').then(function (campos) {
        return campos.json();

    }).then(function (jsonCampos) {//viene del get esquinas

        jsonCampos.forEach(function(campo){//obtener cada parcelas bucle todas
            campo.lat = parseFloat(campo.lat);//obtener cada latitud
            campo.lng = parseFloat(campo.lng);//obtener cada longitud
        });

        let bounds = new google.maps.LatLngBounds();//esto son los limites del poligono
        let polygon = new google.maps.Polygon({//esto crea el poligono
            paths: jsonCampos,
            strokeColor: "#ff0000",
            strokeOpacity: 0,
            strokeWeight: 2,
            fillColor: "#ff0000",
            fillOpacity:  0,
            map: map
        });


        polygon.getPath().getArray().forEach(function (v) {
            bounds.extend(v);
        })
        map.fitBounds(bounds);
    })
}

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

function cargarPosicion(idCampos) {
    //let idParcelaEnlace = idCampos;
    fetch('../api/v1.0/posicionSensor="'+idCampos+'"').then(function (localizaciones) {
        return localizaciones.json();
    }).then(function (localizacionesj) {

        localizacionesj.forEach(function(localizacion){
            localizacion.lat = parseFloat(localizacion.lat);
            localizacion.lng = parseFloat(localizacion.lng);
        });


        localizacionesj.forEach(function (localizacion) {
            var marker = new google.maps.Marker({
                position: {lat: localizacion.lat, lng: localizacion.lng},// aqui pones la la latitud y longitud
                //de la base de datos en los markers
                label: localizacion.id+"",
                animation: google.maps.Animation.DROP,//esto es la gota roja
                map: map
            });
            
        })
    })
}