var passportLocalMongoose = require("passport-local-mongoose");
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    nombre: String,
    password: String,
    rutas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ruta"
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);