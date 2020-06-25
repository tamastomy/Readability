var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds"),
    wordsPerMinute=require("words-per-minute");

var User = require("./models/user"),
    Blog = require("./models/blog"),
    Comment = require("./models/comment");



//Requiring routes
var signRoutes = require("./routes/sign"),
    blogRoutes = require("./routes/blogs");


seedDB();

//Blog database added
mongoose.connect("mongodb://localhost/readability");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', "ejs");
app.use(methodOverride("_method"));
app.use(express.static('public'));

// PASSPORT CONFIG
var getMinutesFromText = require('words-per-minute').getMinutesFromText;
app.use(require("express-session")({
    secret: "This is the secret setup",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.message = req.flash("error");
    res.locals.message = req.flash("success");
    next();
});

app.use(signRoutes);
app.use("/:topic", blogRoutes);


app.listen(3000, function () {
    console.log("The server has started");
});
