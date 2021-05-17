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

    map.panTo(marker.getPosition());

}

//funcion que añade un marcador en el mapa

function addMarker() {
    let lat = parseFloat(document.getElementById('lat').value);
    let lng = parseFloat(document.getElementById('lng').value);

    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        label: "1",
        animation: google.maps.Animation.DROP,
        map: map
    });

    //ademas añade un polígono, ya que aún no está ehcha la función que crea los polígonos

    let polygon = new google.maps.Polygon({
        paths: [
            {lat: 38.991515, lng: -0.185366},
            {lat: 38.99249062077208, lng: -0.18688949653162903},
            {lat: 38.99476706465003, lng: -0.18769415923104743},
            {lat: 38.99547583259788, lng: -0.18829497405080411},
            {lat: 38.994917157286714, lng: -0.18826278754388776},
            {lat: 38.99222378009704, lng: -0.187490311377894},
            {lat: 38.99081451093767, lng: -0.18624576644379298},
        ],
        strokeColor: "#73e76b",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#58a952",
        fillOpacity: 0.3,
        map: map
    });

    let bounds = new google.maps.LatLngBounds();
    polygon.getPath().getArray().forEach(function (v) {
        bounds.extend(v);
    })

    map.fitBounds(bounds);
}


// function addPolygon() {
//     let lat = parseFloat(document.getElementById('p-lat').value);
//     let lng = parseFloat(document.getElementById('p-lng').value);
//
//     let polygon2 = new google.maps.Polygon({
//         paths: [
//             {lat: 38.991515, lng: -0.185366},
//             {lat: 38.99249062077208, lng: -0.18688949653162903},
//             {lat: 38.99476706465003, lng: -0.18769415923104743},
//             {lat: 38.99547583259788, lng: -0.18829497405080411},
//             {lat: 38.994917157286714, lng: -0.18826278754388776},
//             {lat: 38.99222378009704, lng: -0.187490311377894},
//             {lat: 38.99081451093767, lng: -0.18624576644379298},
//         ],
//         strokeColor: "#73e76b",
//         strokeOpacity: 0.8,
//         strokeWeight: 1,
//         fillColor: "#58a952",
//         fillOpacity: 0.3,
//         map: map
//     });
//
//     let bounds = new google.maps.LatLngBounds();
//     polygon.getPath().getArray().forEach(function (v) {
//         bounds.extend(v);
//     })
//
//     map.fitBounds(bounds);
// }