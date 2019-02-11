var id;
var puntos = [];
var map, infoWindow;

$("#botonTracking").click(function () {
    puntos = [];
    initMap();
    getLocation();
});

$("#botonParar").click(function () {
    var nombre = $("#nombre").val();
    navigator.geolocation.clearWatch(id);
    var data = {
        nombre: nombre,
        puntos: puntos
    }
    var url = "/track/guardarRuta";
    $.post(url, data, function (data, status) {
        $(".alert").toggleClass('show');
        $("#botonGuardar").addClass("disabled");
    });
});

function getLocation() {
    if (navigator.geolocation) {
        id = navigator.geolocation.watchPosition(obtenerPosiciones);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function obtenerPosiciones(position) {
    var nuevoPunto = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }
    puntos.push(nuevoPunto);
    $("#botonGuardar").removeClass("disabled");
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 20
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Hello World!'
            });
            marker.setMap(map);
            map.setCenter(pos);
        });
    }
}