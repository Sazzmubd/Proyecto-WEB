//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
let map;

let idCampos;


function loadData(){
    let datos = {
        datasets:[
            {
                label: 'humedad',
                data: [],
                fill: true,
                backgroundColor: 'rgba(43,69,34,.5)',
                borderColor: 'rgb(43,110,86)',
                borderDash: [2,3],
                pointStyle: 'rectRot',
                pointRadius: 10,
            },
            {
                label: 'temperatura',
                data: [],
                fill: true,
                backgroundColor: 'rgba(111,69,34,.5)',
                borderColor: 'rgb(111,110,86)',
                borderDash: [2,3],
                pointStyle: 'rectRot',
                pointRadius: 10,
            },
            {
                label: 'salinidad',
                data: [],
                fill: true,
                backgroundColor: 'rgba(255,69,34,.5)',
                borderColor: 'rgb(255,110,86)',
                borderDash: [2,3],
                pointStyle: 'rectRot',
                pointRadius: 10,
            },
            {
                label: 'luminosidad',
                data: [],
                fill: true,
                backgroundColor: 'rgba(200,69,34,.5)',
                borderColor: 'rgb(200,110,86)',
                borderDash: [2,3],
                pointStyle: 'rectRot',
                pointRadius: 10,
            }
        ]
    };

    return datos;
}

function loadOptions(idSensor){
    let opciones = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                stacked: true
            }
        },
        plugins: {
            legend: {
                position: 'left',
                align: 'end'
            },
            title: {
                display: true,
                text: 'Medidas sensor ' + idSensor
            },
            tooltips: {
                backgroundColor: '#F0EDFE',
                titleColor: 'rgba(200,69,34,.5)',
                titleAlign: 'center',
                bodyColor: 'rgba(200,69,34,.5)',
                borderColor: 'rgba(200,69,34,.5)',
                borderWidth: 1,
            }
        }
    };
    return opciones;
}

function crearGrafica(idElem, grafica){
    let ctx = document.getElementById('contentSensor' + idElem);
    ctx.height = 500;
    opciones = loadOptions(idElem);
    console.log(grafica, opciones);
    let miGrafica = new Chart(ctx, {
        type: 'line',
        data: grafica,
        options: opciones
    });
}

function procesarDatos(idSensor, medidas){
    medidas = medidas.sort(function (a, b) {
        if (a.fecha < b.fecha) return -1;
        if (a.fecha > b.fecha) return 1;
        return 0;
    });

    

    let fechas = [];
    let humedades = [];
    let temperaturas = [];
    let salinidades = [];
    let luminosidades = [];


    medidas.forEach(element => {
        fechas.push(element.fecha);
        humedades.push(parseFloat(element.humedad));
        temperaturas.push(parseFloat(element.temperatura));
        salinidades.push(parseFloat(element.salinidad));
        luminosidades.push(parseFloat(element.luminosidad));
    });
    
    datos = loadData();

    datos.labels = fechas;
    datos.datasets[0].data = humedades;
    datos.datasets[1].data = temperaturas;
    datos.datasets[2].data = salinidades;
    datos.datasets[3].data = luminosidades;

    crearGrafica(idSensor, datos);
}

function getData(){
    let dataUrl = '../api/v1.0/JsonTemp/data.json';
    fetch(dataUrl).then(function (campos) {
        return campos.json();
    }).then(function (mediciones) {
        let medicionesData = [];
        let index = -1;
        console.log(mediciones);
        mediciones.forEach(function (medicion){
            if (index != parseInt(medicion.idSensor)){
                if(index != -1){
                    procesarDatos(medicionesData[0].idSensor, medicionesData);
                }
                medicionesData = [];
                index = parseInt(medicion.idSensor);
            }
            medicionesData.push(medicion);
            // Comprueba que la medición sea del sensor correcto
        })
        procesarDatos(medicionesData[0].idSensor, medicionesData);
    })

}



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
    if(datosUsuario.id == 1){
        let idUser = document.URL.split("?")[1].replace("idUsuario=","");
        console.log("ID ->",idUser)
        cargarParcelas(idUser);
        // 1º coger la sesion del usuario
        // 2º coger todos sus ids campos
        //3º mostrar los ids q has sacado
        //4º meter esos ids en un array
        cargarPosiciones(idUser);
        getData();
        //setTimeout(getData, 5000);
    }else{
        cargarParcelas(datosUsuario.id);
        // 1º coger la sesion del usuario
        // 2º coger todos sus ids campos
        //3º mostrar los ids q has sacado
        //4º meter esos ids en un array
        cargarPosiciones(datosUsuario.id);
        getData();
        //setTimeout(getData, 5000);
    }



}


//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
function cargarParcelas(idUsuario) {
    let url = "";
    url = 'http://localhost/GitHub/Proyecto-WEB3/src/api/v1.0/parcela?idUsuario='+idUsuario;

    fetch(url).then(function (campos) {
        return campos.json();
    }).then(function (esquinas) {

        console.log(esquinas);
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
    let url = "";
    url = 'http://localhost/GitHub/Proyecto-WEB3/src/api/v1.0/posicion?idUsuario='+idUsuario;


    fetch(url).then(function (campos) {
        return campos.json();
    }).then(function (sensores) {

        sensores.forEach(function (sensor) {

            sensor.lat = parseFloat(sensor.lat);
            sensor.lng = parseFloat(sensor.lng);

            // Carga los datos de las mediciones


            const contentString =
            '<div id="sensor' + sensor.idSensor + '">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h1 id="firstHeading" class="letras-google">Sensor' + sensor.idSensor + '</h1>' +
                    '<button onclick="verdatos(' + sensor.idSensor + ')">Ver datos del sensor</button>'
                    "</div>";
            var infowindow = new google.maps.InfoWindow({
                content: contentString,
            });
            var marker = new google.maps.Marker({
                position: {lat: sensor.lat, lng: sensor.lng},
                label:  sensor.idCampos,
                animation: google.maps.Animation.DROP,
                map: map,
                //title: "Campo"+ sensor.id,

            });
            marker.addListener("click", () => {
                infowindow.open(map, marker);
            });
            //sacarNumcampo();
        })

    })

}


function esconderGraficas(){
    let stringContent = 'contentSensor';
    document.getElementById("exitGraphicSensor").style.display = 'none';
    for (let i = 1; i<6; i++){
        document.getElementById(stringContent+i).style.display = 'none';
    }
}

function verdatos(id) {
    let stringContent = 'contentSensor';
    let canvasVer = document.getElementById(stringContent + id);
    document.getElementById("exitGraphicSensor").style.display = 'block';
    for (let i = 1; i<6; i++){
        let canvasFor = document.getElementById(stringContent+i);
        if (canvasFor != canvasVer){
            canvasFor.style.display = 'none';
        } else {
            canvasFor.style.display = 'block';
        }
    }
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