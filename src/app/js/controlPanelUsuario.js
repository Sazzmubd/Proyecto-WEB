function control_input(){
    let input_start = createElement2('input', ['date-input-start'], []);
    input_start.type = 'date';
    input_start.max = new Date().toISOString().split("T")[0];
    input_start.style.marginRight = '20px';
    input_start.name = 'date-input-start';
    let input_end = createElement('input', ['date-input-end'], []);
    input_end.type = 'date';
    input_end.max = new Date().toISOString().split("T")[0];
    input_end.style.marginRight = '20px';
    input_end.name = 'date-input-end';

    let submit_button = createElement2('input', ['submit-date-button'], []);
    submit_button.value = 'Filtrar';
    submit_button.type = 'button';
    submit_button.name = 'filtrar';
    
    let content = createElement2('div', ['content-date'], [input_start.outerHTML, input_end.outerHTML, submit_button.outerHTML]);
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.marginTop = '15px';

    $(content).appendTo('.content-date-form');
}

function createElement2(Type, ClassName, Content) {
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

function loadData2(){
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

function loadOptions2(idSensor){
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

function crearGrafica2(idElem, grafica){
    $("canvas#sensorContent" + idElem).remove();
    $('div#graphicDataContent').append('<canvas class="canvasGraphic" id="sensorContent' + idElem + '" style="display: none; height:500px;"></canvas>');
    let ctx = document.getElementById('sensorContent' + idElem);
    $('#sensorContent' + idElem).empty();
    ctx.style.backgroundColor = '#F1F1F1';
    ctx.style.maxWidth = '1200px';
    ctx.style.maxHeight = '600px';
    ctx.style.padding = '5px';
    ctx.style.paddingBottom = '10px';
    ctx.style.border = '5px solid black';
    opciones = loadOptions2(idElem);
    let miGrafica = new Chart(ctx, {
        type: 'line',
        data: grafica,
        options: opciones
    });
}

function procesarDatos2(idSensor, medidas, start_date, end_date){
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
        if(element.fecha >= start_date && element.fecha <= end_date){
            fechas.push(element.fecha);
            idSensorData.push(element.idSensor);
            humedades.push(parseFloat(element.humedad));
            temperaturas.push(parseFloat(element.temperatura));
            salinidades.push(parseFloat(element.salinidad));
            luminosidades.push(parseFloat(element.luminosidad));
        }
    });
    
    datos = loadData2();

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

    crearTabla2(idSensor, tablaDatos);

    crearGrafica2(idSensor, datos);
}

function getData2(start_date, end_date){
    let dataUrl = '../api/v1.0/JsonTemp/data.json';
    fetch(dataUrl).then(function (campos) {
        return campos.json();
    }).then(function (mediciones) {
        let medicionesData = [];
        let index = -1;
        mediciones.forEach(function (medicion){
            if (index != parseInt(medicion.idSensor)){
                if(index != -1){
                    procesarDatos2(medicionesData[0].idSensor, medicionesData, start_date, end_date);
                }
                medicionesData = [];
                index = parseInt(medicion.idSensor);
            }
            medicionesData.push(medicion);
            // Comprueba que la medición sea del sensor correcto
        })
        procesarDatos2(medicionesData[0].idSensor, medicionesData, start_date, end_date);
    })

}

function createColumnTitle2(){
    let tituloTemperatura = createElement2('div', ['titleTableTemperatura'], ['Temp. (ºC)']);
    tituloTemperatura.style.width = '18.75%';
    tituloTemperatura.style.display = 'flex';
    tituloTemperatura.style.justifyContent = 'center';
    let tituloHumedad = createElement2('div', ['titleTableHumedad'], ['Hum. (%)']);
    tituloHumedad.style.width = '18.75%';
    tituloHumedad.style.display = 'flex';
    tituloHumedad.style.justifyContent = 'center';
    let tituloSalinidad = createElement2('div', ['titleTableSalinidad'], ['Sal. (g/l)']);
    tituloSalinidad.style.width = '18.75%';
    tituloSalinidad.style.display = 'flex';
    tituloSalinidad.style.justifyContent = 'center';
    let tituloLuminosidad = createElement2('div', ['titleTableLuminosidad'], ['Lum. (lx)']);
    tituloLuminosidad.style.width = '18.75%';
    tituloLuminosidad.style.display = 'flex';
    tituloLuminosidad.style.justifyContent = 'center';
    let tituloFecha = createElement2('div', ['titleTableFecha'], ['Fecha']);
    tituloFecha.style.width = '25%';
    tituloFecha.style.display = 'flex';
    tituloFecha.style.justifyContent = 'center';

    let content_title = createElement2('div', ['columnTitle'], [tituloTemperatura.outerHTML, tituloHumedad.outerHTML, tituloSalinidad.outerHTML, tituloLuminosidad.outerHTML, tituloFecha.outerHTML]);
    content_title.style.display = 'flex';
    content_title.style.height = '30px';
    content_title.style.alignItems = 'center';
    content_title.style.justifyContent = 'center';
    return content_title;
}

function generarTabla2(id) {
    let divTabla = createElement2('div', ['tabla-sensor-' + id], ['']);
    divTabla.style.marginLeft = '20px';
    divTabla.style.marginRight = '20px';
    divTabla.style.border = '2px solid black';
    divTabla.style.padding = '10px';
    divTabla.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    divTabla.style.marginBottom = '20px';
    divTabla.innerHTML += createColumnTitle2().outerHTML;
    return divTabla;
}

function createColumnElement2(dato, check){
    let columna = createElement2('div', [], [dato]);
    columna.style.display = 'flex';
    columna.style.justifyContent = 'center';
    if (check == 0){
        columna.style.width = '18.75%';
    } else {
        columna.style.width = '25%';
    }
    return columna;
}

function crearTabla2(idSensor, datos) {
    $('.general-sensor-table-'+idSensor).empty();
    let titulo = createElement2('h2', ['text-title-table-sensor-' + datos[0][0]], ['Sensor ' + idSensor]);
    titulo.marginTop = '30px';
    titulo.style.width = '100%';
    titulo.style.display = 'flex';
    titulo.style.alignItems = 'center';
    titulo.style.justifyContent = 'center';
    let tabla = generarTabla2(datos[0][0]);
    let index = 0;
    for (let i = 0; i<datos[0].length; i++) {
        let content = document.createElement('div');
        content.style.display = 'flex';
        content.style.alignItems = 'center';
        content.style.justifyContent = 'center';
        for (let j = 1; j<datos.length; j++) {
            let column;
            if (j != datos.length -1){
                column = createColumnElement2(datos[j][i], 0);
            } else {
                column = createColumnElement2(datos[j][i], 1);
            }
            content.innerHTML += column.outerHTML;
        }
        tabla.innerHTML += content.outerHTML;
        index += 1;
    }

    $(titulo).appendTo('.general-sensor-table-'+idSensor);
    $(tabla).appendTo('.general-sensor-table-'+idSensor);
}


function getFilteredData(){
    let start_date = $('.date-input-start').first().val();
    let end_date = $('.date-input-end').first().val();

    if (start_date != '' && end_date != '') {
        if(start_date <= end_date){
            start_date += ' 00:00:00';
            end_date += ' 23:59:59';
            getData2(start_date, end_date);
        } else {
            alert('La fecha final debe ser mayor o igual a la inicial');
        }
    } else {
        alert('Por favor, rellene los espacios en blanco');
    }
}

function detectButtonSubmit(){
    $('.submit-date-button').click(function(){
        getFilteredData();
    });
}


control_input();
detectButtonSubmit();