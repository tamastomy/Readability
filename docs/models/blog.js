var mongoose = require("mongoose");

//Schema setup
var blogSchema = new mongoose.Schema({
    x: Number,
    topic: String,
    title: String,
    mainimage: String,
    shortdescription: String,
    blogcontent: {},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        fullname:String,
        username: String,
        imageurl: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],


});

module.exports = mongoose.model("Blog", blogSchema);



