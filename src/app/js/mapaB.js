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
                backgroundColor: 'none',
                backgroundColor: 'rgba(255,69,34,0)',
                borderColor: 'rgb(156, 219, 232)',
                borderDash: [],
                pointStyle: 'circle',
                pointRadius: 7,
            },
            {
                label: 'temperatura',
                data: [],
                fill: true,
                backgroundColor: 'rgba(255,69,34,0)',
                borderColor: 'rgb(250, 237, 157)',
                borderDash: [],
                pointStyle: 'circle',
                pointRadius: 7,
            },
            {
                label: 'salinidad',
                data: [],
                fill: true,
                backgroundColor: 'rgba(255,69,34,0)',
                borderColor: 'rgb(255, 166, 92)',
                borderDash: [],
                pointStyle: 'circle',
                pointRadius: 7,
            },
            {
                label: 'luminosidad',
                data: [],
                fill: true,
                backgroundColor: 'rgba(255,69,34,0)',
                borderColor: 'rgb(0, 0, 0)',
                borderDash: [],
                pointStyle: 'circle',
                pointRadius: 7,
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
            title: {
                display: true,
                text: 'MEDIDAS SENSOR ' + idSensor
            },
            tooltips: {
                backgroundColor: '#F0EDFE',
                titleColor: 'rgba(255,255,255,1)',
                titleAlign: 'center',
                bodyColor: 'rgba(200,69,34,1)',
                borderColor: 'rgba(200,69,34,1)',
                borderWidth: 1,
            }
        },
        labels: {
            fontColor: 'black'
        }
    };
    return opciones;
}

function crearGrafica(idElem, grafica){
    $('div#graphicDataContent').append('<canvas class="canvasGraphic" id="sensorContent' + idElem + '" style="display: none; height:500px;"></canvas>');
    let ctx = document.getElementById('sensorContent' + idElem);
    ctx.height = 150;
    opciones = loadOptions(idElem);
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
    let idSensorData = [];
    let tablaDatos = [];

    medidas.forEach(element => {
        fechas.push(element.fecha);
        idSensorData.push(element.idSensor);
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

    tablaDatos.push(idSensorData);
    tablaDatos.push(temperaturas);
    tablaDatos.push(humedades);
    tablaDatos.push(salinidades);
    tablaDatos.push(luminosidades);
    tablaDatos.push(fechas);

    crearTabla(tablaDatos);

    crearGrafica(idSensor, datos);
}

function createElement(Type, ClassName, Content) {
    let elem = document.createElement(Type);

    if (ClassName != null) {
        ClassName.forEach(function (elemClass) {
            $(elem).addClass(elemClass);
        });
    }

    if (Content != null) {
        Content.forEach(function (elemContent) {
            elem.innerHTML += elemContent;
        });
    }

    return elem;
}

function createColumnTitle(){
    let tituloTemperatura = createElement('div', ['titleTableTemperatura'], ['Temperatura']);
    tituloTemperatura.style.width = '15%';
    tituloTemperatura.style.display = 'flex';
    tituloTemperatura.style.justifyContent = 'center';
    let tituloHumedad = createElement('div', ['titleTableHumedad'], ['Humedad']);
    tituloHumedad.style.width = '15%';
    tituloHumedad.style.display = 'flex';
    tituloHumedad.style.justifyContent = 'center';
    let tituloSalinidad = createElement('div', ['titleTableSalinidad'], ['Salinidad']);
    tituloSalinidad.style.width = '15%';
    tituloSalinidad.style.display = 'flex';
    tituloSalinidad.style.justifyContent = 'center';
    let tituloLuminosidad = createElement('div', ['titleTableLuminosidad'], ['Luminosidad']);
    tituloLuminosidad.style.width = '15%';
    tituloLuminosidad.style.display = 'flex';
    tituloLuminosidad.style.justifyContent = 'center';
    let tituloFecha = createElement('div', ['titleTableFecha'], ['Fecha']);
    tituloFecha.style.width = '25%';
    tituloFecha.style.display = 'flex';
    tituloFecha.style.justifyContent = 'center';

    let content_title = createElement('div', ['columnTitle'], [tituloTemperatura.outerHTML, tituloHumedad.outerHTML, tituloSalinidad.outerHTML, tituloLuminosidad.outerHTML, tituloFecha.outerHTML]);
    content_title.style.display = 'flex';
    content_title.style.height = '30px';
    content_title.style.alignItems = 'center';
    content_title.style.justifyContent = 'center';
    return content_title;
}

function generarTabla(id) {
    let divTabla = createElement('div', ['tabla-sensor-' + id], ['']);
    divTabla.style.marginLeft = '20px';
    divTabla.style.marginRight = '20px';
    divTabla.style.border = '1px solid black';
    divTabla.style.padding = '10px';
    divTabla.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    divTabla.style.marginBottom = '20px';
    divTabla.innerHTML += createColumnTitle().outerHTML;
    return divTabla;
}

function createColumnElement(dato, check){
    let columna = createElement('div', [], [dato]);
    columna.style.display = 'flex';
    columna.style.justifyContent = 'center';
    if (check == 0){
        columna.style.width = '15%';
    } else {
        columna.style.width = '25%';
    }
    return columna;
}

function crearTabla(datos) {
    let titulo = createElement('h2', ['text-title-table-sensor-' + datos[0][0]], ['Sensor ' + datos[0][0]]);
    titulo.marginTop = '30px';
    titulo.style.width = '100%';
    titulo.style.display = 'flex';
    titulo.style.alignItems = 'center';
    titulo.style.justifyContent = 'center';
    let tabla = generarTabla(datos[0][0]);
    let index = 0;
    for (let i = 0; i<datos[0].length; i++) {
        let content = document.createElement('div');
        content.style.display = 'flex';
        content.style.alignItems = 'center';
        content.style.justifyContent = 'center';
        for (let j = 1; j<datos.length; j++) {
            let column;
            if (j != datos.length -1){
                column = createColumnElement(datos[j][i], 0);
            } else {
                column = createColumnElement(datos[j][i], 1);
            }
            content.innerHTML += column.outerHTML;
        }
        tabla.innerHTML += content.outerHTML;
        index += 1;
    }

    let conjunto_tabla = createElement('div', ['general-sensor-table-' + datos[0][0]], [titulo.outerHTML, tabla.outerHTML]);
    conjunto_tabla.style.display = 'none';
    $(conjunto_tabla).appendTo('.data-table');
}

function getData(){
    let dataUrl = '../api/v1.0/JsonTemp/data.json';
    fetch(dataUrl).then(function (campos) {
        return campos.json();
    }).then(function (mediciones) {
        let medicionesData = [];
        let index = -1;
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
    getData();
    if(datosUsuario.id == 1){
        let idUser = document.URL.split("?")[1].replace("idUsuario=","");
        console.log("ID ->",idUser)
        cargarParcelas(idUser);
        // 1º coger la sesion del usuario
        // 2º coger todos sus ids campos
        //3º mostrar los ids q has sacado
        //4º meter esos ids en un array
        cargarPosiciones(idUser);
        //setTimeout(getData, 5000);
    }else{
        cargarParcelas(datosUsuario.id);
        // 1º coger la sesion del usuario
        // 2º coger todos sus ids campos
        //3º mostrar los ids q has sacado
        //4º meter esos ids en un array
        cargarPosiciones(datosUsuario.id);
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
    url = 'http://localhost/GitHub/Proyecto-WEB/src/api/v1.0/parcela?idUsuario='+idUsuario;

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


function showSensor(idSensor){
    $('.general-sensor-table-' + idSensor).css('display', 'block');
}


function cargarPosiciones(idUsuario = "") {
    url = 'http://localhost/GitHub/Proyecto-WEB/src/api/v1.0/posicion?idUsuario='+idUsuario;

    fetch(url).then(function (campos) {
        return campos.json();
    }).then(function (sensores) {

        sensores.forEach(function (sensor) {

            sensor.lat = parseFloat(sensor.lat);
            sensor.lng = parseFloat(sensor.lng);
            showSensor(sensor.idSensor);

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
    let stringContent = 'sensorContent';
    document.getElementById("exitGraphicSensor").style.display = 'none';
    for (let i = 1; i<6; i++){
        document.getElementById(stringContent+i).style.display = 'none';
    }
}

function verdatos(id) {
    let stringContent = 'sensorContent';
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