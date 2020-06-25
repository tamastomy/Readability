var mongoose=require("mongoose"),
    passportLocalMongoose=require("passport-local-mongoose");

//Schema setup
var UserSchema=new mongoose.Schema({
    username:String,
    fullname:String,
    password:String,
    imageurl:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",UserSchema);
