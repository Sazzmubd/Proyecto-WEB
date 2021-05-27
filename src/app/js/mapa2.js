function crearMapa() {

}


let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.0085631, lng: -4.0779268 },
        zoom: 5,
        mapTypeId: 'hybrid',
        styles: [
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                stylers: [{ visibility: 'off' }]
            }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        zoomControl: false,
    });

}