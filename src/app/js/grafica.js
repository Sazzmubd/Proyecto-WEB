function loadDataGlobal(){
    let datos = {
        labels:[],
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

function loadOptionsGlobal(){
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
                text: 'Medidas históricas'
            },
            tooltips: {
                backgroundColor: '#fff',
                titleColor: '#000',
                titleAlign: 'center',
                bodyColor: '#333',
                borderColor: '#666',
                borderWidth: 1,
            }
        }
    };
    return opciones;
}

function crearGraficaGlobal(datos){
    let ctx = document.getElementById('modal-textos');
    opciones = loadOptionsGlobal();
    console.log(datos);
    let miGrafica = new Chart(ctx, {
        type: 'line',
        data: datos,
        options: opciones
    });
}

function procesarDatosGlobal(medidas){
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
        let i = fechas.indexOf(element.fecha);
        fechas.push(element.fecha);
        humedades.push(parseFloat(element.humedad));
        temperaturas.push(parseFloat(element.temperatura));
        salinidades.push(parseFloat(element.salinidad));
        luminosidades.push(parseFloat(element.Luminosidad));

    });
    
    datos = loadDataGlobal();

    datos.labels = fechas;
    datos.datasets[0].data = humedades;
    datos.datasets[1].data = temperaturas;
    datos.datasets[2].data = salinidades;
    datos.datasets[3].data = luminosidades;

    console.log(datos.labels);

    crearGraficaGlobal(datos);
}

function getDataGlobal(){
    fetch('../api/v1.0/JsonTemp/data.json').then(function (r){
        return r.json();
    }).then(function (j) {
        procesarDatosGlobal(j);
    });
}


getDataGlobal();