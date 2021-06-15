//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
let map;

let idCampos;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.9965055, lng: -0.1674364},
        zoom: 15,
        //coordenadas de madrid 39.686823, -3.901718
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
                const contentString =
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h1  id="firstHeading" class="letras-google">Uluru</h1>' +
                    '<div class="letras-google" id="bodyContent">' +


                    //  "<div id='outputtt'></div>"+

                    "<p>evrvvrvr<b></b>, also referred to as <b>Ayers Rock</b>, is a large " +
                    "sandstone rock formation in the southern part of the " +
                    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
                    "south west of the nearest large town, Alice Springs; 450&#160;km " +
                    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
                    "Heritage Site.</p>" +
                    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
                    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
                    "(last visited June 22, 2009).</p>" +
                    "</div>" +
                    "</div>";
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });
                var marker = new google.maps.Marker({
                    position: {lat: posicion.lat, lng: posicion.lng},
                    label:  posicion.idCampos,
                    animation: google.maps.Animation.DROP,
                    map: map,
                    //title: "Campo"+ posicion.id,

                });
                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });
                //sacarNumcampo();
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
function  sacarNumcampo(){
    fetch( '../api/v1.0/posicion/', {

        method:"GET"

    }).then(function (respuesta) {
        if (respuesta.ok) {
            return respuesta.json();
        }
    }).then(function (datos) {
        console.log( document.getElementById("outputtt"))
        document.getElementById("outputtt").textContent = datos.idCampos;

    })


}
*/