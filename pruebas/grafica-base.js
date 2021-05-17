let datos = { labels: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'],
    datasets: [

        label: 'ventas'
    ]
};

let opciones = {
    responsive: true,
    maintainAspectRatio: false,//modificar el espacio
};




let ctx = document.getElementById('chart');
let miGrafica = new Chart(ctx, {
    type: 'line',//tipo de grafica lineal de barras... (bar, radar, dougth, type char graficas )
    data: datos,
    options: opciones
});


(la clase de esto es la del dia     4/5)