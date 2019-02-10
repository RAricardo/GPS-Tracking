var mongoose = require("mongoose");

var rutaSchema = new mongoose.Schema({
    nombre: String,
    puntos: [{
        lat: String,
        lon: String
    }]
})

module.exports = mongoose.model("Ruta", rutaSchema);