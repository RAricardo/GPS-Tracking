var express = require("express");
var router = express.Router();
var Ruta = require("../models/ruta");
var User = require("../models/user");

router.get("/", isLoggedIn, function (req, res) {
    res.render("track/index");
});

router.get("/ver", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("rutas").exec(function (err, user) {
        User.find({}, function (err, users) {
            if (err) {
                console.log(err);
            } else {
                res.render("track/visualizar", { user: user, users: users});
            }
        })
    })
});

router.get("/new", isLoggedIn, function (req, res) {
    res.render("track/new");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

router.post("/obtenerRuta", isLoggedIn, function (req, res) {
    Ruta.findOne({ nombre: req.body.option }, function (err, ruta) {
        if (err) {
            console.log(err);
        } else {
            res.send(ruta);
        }
    })
})

router.post("/compartir", isLoggedIn, function (req, res) {
    User.findOne({ username: req.body.user }).populate("rutas").exec(function (err, usuarioDestino) {
        User.findById(req.user._id).populate("rutas").exec(function (err, currentUser) {
            var currentUserRoutes = currentUser.rutas;
            var trueRoute;
            currentUserRoutes.forEach(ruta => {
                if (ruta.nombre === req.body.ruta) {
                    trueRoute = ruta;
                }
            })
            usuarioDestino.rutas.push(trueRoute);
            usuarioDestino.save();
            res.sendStatus(200);
        });
    })
})

router.post("/guardarRuta", isLoggedIn, function (req, res) {
    guardarRuta(req, res);
});

function guardarRuta(req, res) {
    User.findById(req.user._id, function (err, user) {
        encontrarUsuario(err, user, req, res);
    });
}

function encontrarUsuario(err, user, req, res) {
    if (err) {
        console.log(err)
    } else {
        Ruta.create({ nombre: req.body.nombre }, function (err, route) {
            crearRuta(err, route, user, req, res)
        })
    }
}

function crearRuta(err, route, user, req, res) {
    if (err) {
        console.log(err)
    } else {
        var puntos = req.body.puntos;
        route.puntos = puntos;
        route.save();
        user.rutas.push(route);
        user.save();
        res.redirect("/track");
    }
}

module.exports = router;