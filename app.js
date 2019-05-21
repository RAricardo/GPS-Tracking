var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    trackRoutes = require("./routes/track");
    indexRoutes = require("./routes/index");
    app = express();

mongoose.connect('mongodb://db/trackingDB', { useNewUrlParser: true });
//mongoose.connect('mongodb://localhost/trackingDB', { useNewUrlParser: true });
mongoose.connect('', { useNewUrlParser: true });
process.env.PORT = process.env.PORT || 8000;
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "I should be working in my other project.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/track",trackRoutes);

app.listen(process.env.PORT, () => {
});