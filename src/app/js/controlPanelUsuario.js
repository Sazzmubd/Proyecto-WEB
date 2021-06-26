
/*
function getFilter(){
    let start_date = $('.date-input-start').first().val();
    let end_date = $('.date-input-end').first().val();

    if(start_date != '' && end_date != ''){

    } else {
        alert('Please fill all empty spaces');
    }
}

function detectSubmit(){
    $('.submit-date-button').click(function(){
        getFilter();
    });
}
*/

function control_input(){
    let input_start = createElement('input', ['date-input-start'], []);
    input_start.type = 'date';
    input_start.max = new Date().toISOString().split("T")[0];
    input_start.style.marginRight = '20px';
    input_start.name = 'date-input-start';
    let input_end = createElement('input', ['date-input-end'], []);
    input_end.type = 'date';
    input_end.max = new Date().toISOString().split("T")[0];
    input_end.style.marginRight = '40px';
    input_end.name = 'date-input-end';

    let submit_button = createElement('input', ['submit-date-button'], []);
    submit_button.value = 'Filtrar';
    submit_button.type = 'button';
    submit_button.name = 'filtrar';
    
    let content = createElement('div', ['content-date'], [input_start.outerHTML, input_end.outerHTML, submit_button.outerHTML]);
    content.style.display = 'flex';
    content.style.justifyContent = 'center';
    content.style.marginTop = '30px';

    $(content).appendTo('.content-date-form');
}
/*
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
    $('#contentSensor' + idElem).empty();
    ctx.height = 500;
    opciones = loadOptions(idElem);
    let miGrafica = new Chart(ctx, {
        type: 'line',
        data: grafica,
        options: opciones
    });
}

function procesarDatos(idSensor, medidas, start_date, end_date){
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
        }
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

function getData(start_date, end_date){
    let dataUrl = '../api/v1.0/JsonTemp/data.json';
    fetch(dataUrl).then(function (campos) {
        return campos.json();
    }).then(function (mediciones) {
        let medicionesData = [];
        let index = -1;
        mediciones.forEach(function (medicion){
            if (index != parseInt(medicion.idSensor)){
                if(index != -1){
                    procesarDatos(medicionesData[0].idSensor, medicionesData, start_date, end_date);
                }
                medicionesData = [];
                index = parseInt(medicion.idSensor);
            }
            medicionesData.push(medicion);
            // Comprueba que la medición sea del sensor correcto
        })
        procesarDatos(medicionesData[0].idSensor, medicionesData, start_date, end_date);
    })

}

function createColumnTitle(){
    let idTitle = createElement('div', ['titleTableId'], ['Id Sensor']);
    idTitle.style.width = '15%';
    idTitle.style.display = 'flex';
    idTitle.style.justifyContent = 'center';
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

    let content_title = createElement('div', ['columnTitle'], [idTitle.outerHTML, tituloTemperatura.outerHTML, tituloHumedad.outerHTML, tituloSalinidad.outerHTML, tituloLuminosidad.outerHTML, tituloFecha.outerHTML]);
    content_title.style.display = 'flex';
    content_title.style.height = '30px';
    content_title.style.alignItems = 'center';
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
    $('.data-table').empty();
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
        for (let j = 0; j<datos.length; j++) {
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

    console.log(datos[0][5]);
    console.log(tabla);
    $(titulo).appendTo('.data-table');
    $(tabla).appendTo('.data-table');
}


function getFilteredData(){
    let start_date = $('.date-input-start').first().val();
    let end_date = $('.date-input-end').first().val();
    alert('hola');

    if (start_date != '' && end_date != '') {
        if(start_date <= end_date){
            start_date += ' 00:00:00';
            end_date += ' 23:59:59';
            alert(start_date, end_date);
            getData(start_date, end_date);
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

*/
control_input();/*
detectButtonSubmit();*/