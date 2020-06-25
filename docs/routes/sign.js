var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/",(req,res)=>{
    res.render("landing");
})

//SHOW REGISTER FORM
router.get("/signup",(req, res) =>{
    res.render("signup");
});

router.post("/signup", (req, res)=> {
    var newUser = new User({
        username: req.body.username,
        imageurl:req.body.imageurl,
        fullname:req.body.fullname
    });
    User.register(newUser, req.body.password,(err, user)=> {
        if (err) {
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res,()=> {
            res.redirect("/art");
        });
    });
});


// Show login form
router.get("/login", (req, res)=> {
    res.render('login');
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/art",
    failureRedirect: "/login"
    }), (req, res) =>{

});

// Logout route
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/art");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login");
}

module.exports = router;
