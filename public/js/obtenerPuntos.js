var id;
var puntos=[];

$("#botonTracking").click(function () { 
    getLocation();
});

$("#botonParar").click(function () { 
    var nombre = $("#nombre").val();
    navigator.geolocation.clearWatch(id);
    var data={
        nombre: nombre,
        puntos: puntos
    }
    var url="/track/guardarRuta";
    $.post(url, data, function(data, status){
        console.log('${data} and status is ${status}')
    });
});

function getLocation() {
    if (navigator.geolocation) {
        id = navigator.geolocation.watchPosition(obtenerPosiciones);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function obtenerPosiciones(position){
    var nuevoPunto = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }
    puntos.push(nuevoPunto);
}