//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
let map;

let idCampos;

fetch( '../api/v1.0/parcela?idCampos='+1).then(function (respuesta){
        return respuesta.json();
}).then(function(datos){
    console.log(datos);
    idCampos = datos.idCampos;
})



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
    cargarParcelas(idCampos);
    // 1º coger la sesion del usuario
    // 2º coger todos sus ids campos
    //3º mostrar los ids q has sacado
    //4º meter esos ids en un array

    }
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
function cargarCampo(idCampos) {
    fetch('../api/v1.0/esquinasParcelas?idParcela='+idCampos).then(function (campos) {
        return campos.json();

    }).then(function (jsonCampos) {//viene del get esquinas

        console.log(jsonCampos);

        jsonCampos.forEach(function(campo){//obtener cada parcelas bucle todas
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
            fillOpacity:  .5,
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
    fetch('../api/v1.0/posicionSensor?idParcela="'+idCampos+'"').then(function (localizaciones) {
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


function cargarParcelas(idUsuario="") {
    let url= '../api/v1.0/parcela';
    if(idUsuario!=""){
        url = '../api/v1.0/parcela?idUsuario='+idUsuario;
    }
    fetch(url).then(function (campos) {
        return campos.json();
    }).then(function (jsonCampos) {

        let bounds = new google.maps.LatLngBounds();

        jsonCampos.forEach(function (campo) { // Esto crea campos,
            fetch('../api/v1.0/esquinasParcela?idCampo="'+campo.id+'"').then(function (esquinasParcelas) {
                return esquinasParcelas.json();
            }).then(function (esquinasParcelas) {
                esquinasParcelas.forEach(function(vertice){
                    vertice.lat = parseFloat(vertice.lat);
                    vertice.lng = parseFloat(vertice.lng);
                });

                let polygon = new google.maps.Polygon({
                    paths: esquinasParcelas,
                    strokeColor: "#ff0000",
                    strokeOpacity: .8,
                    strokeWeight: 2,
                    fillColor: "#ff0000",
                    fillOpacity:  .5,
                    map: map
                });

                polygon.getPath().getArray().forEach(function (v) {
                    bounds.extend(v);
                })
                map.fitBounds(bounds);
            })
        })



    })


}