const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const middleware = require("../middleware");
const wordsPerMinute = require("words-per-minute");
const getMinutesFromText = require('words-per-minute').getMinutesFromText;

router.get("/", (req, res) => {
    let name = "topic";
    let value = req.baseUrl.substr(1);
    let query = {};
    query[name] = value;
    Blog.find(query, (err, allBlogsFromCertainTopic)=> {
        if (err) {
            console.log(err);
        } else {
            res.render('blogs/topics', {
                blogs: allBlogsFromCertainTopic,
                page: req.baseUrl.substr(1)
            });
        }
    }).sort({
        created: "desc"
    });
});

//Add new Blog
router.get("/new",middleware.isLoggedIn,(req, res)=> {
  res.render("blogs/blogform", {
        page: req.baseUrl.substr(1)
    });


});

router.post("/", middleware.isLoggedIn,(req, res) => {

    let size = Object.keys(req.body).length;
    let keys = Object.keys(req.body);
    let blogcontent = new Object();
    let values = Object.values(req.body);
    let x=0;
    for (let i = 4, y=0; i < size; i++,y++) {
        if (values[i] !== "") {
            blogcontent[keys[i]] = values[i];
            let x=y;
        }
    }
    let mainimage = req.body.mainimage;
    let topic = req.body.topic;
    let title = req.body.title;
    let shortdescription = req.body.shortdescription;
    let author = {
        id: req.user._id,
        username: req.user.username,
        imageurl: req.user.imageurl,
        fullname: req.user.fullname
    }
    let newBlog = {
        x:x,
        topic: topic,
        title: title,
        shortdescription: shortdescription,
        blogcontent: blogcontent,
        mainimage: mainimage,
        author: author
    }
    console.log(newBlog);
      if(Object.keys(blogcontent).length == 0||Object.keys(mainimage).length==0){
        res.redirect("back");
    }
    else{

    Blog.create(newBlog, (err, newlyCreated) =>{
        let topic = req.baseUrl.substr(1);
        let name = "topic";
        let value = req.baseUrl.substr(1);
        let query = {};
        query[name] = value;
        if (err) {
            console.log(err);
        } else {
            res.redirect(req.baseUrl);
        }
    })}
});

router.get("/:id/edit",middleware.checkBlogOwnership, (req, res)=> {
    Blog.findById(req.params.id, (err, foundBlog)=> {
        res.render("blogs/blogedit", {
            blog: foundBlog,
            page: req.baseUrl.substr(1)
        });
    });
});

router.put("/:id",middleware.checkBlogOwnership,(req, res)=> {
    Blog.findByIdAndUpdate(req.params.id, req.body,(err, updatedBlog)=> {
        if (err) {
            res.redirect("/" + req.baseUrl.substr(1));
        } else {
            res.redirect("/" + req.baseUrl.substr(1) + "/" + req.params.id);
        }
    })
});

router.delete("/:id",middleware.checkBlogOwnership, (req, res)=> {
    Blog.findByIdAndRemove(req.params.id,(err)=> {
        if (err) {
            res.redirect("/" + req.baseUrl.substr(1));
        } else {
            res.redirect("/" + req.baseUrl.substr(1));
        }
    })
});


router.get("/:id", (req, res) =>{
    Blog.findById(req.params.id).populate("comments").exec((err, foundBlog)=> {
        if (err || !foundBlog) {
            res.redirect("back");
        } else {
            res.render("blogs/blog", {
                blog: foundBlog,
                page: req.baseUrl.substr(1)
            });
        }
    });
});

router.post("/:id", middleware.isLoggedIn,(req, res)=> {
    Blog.findById(req.params.id,(err, blog)=> {
        if (err) {
            console.log(err);
            res.redirect("/" + req.baseUrl.substr(1));
        } else {
            Comment.create(req.body.comment,(err, comment)=> {
                if (err) {
                    console.log(err);
                } else {
                    comment.text = req.body.text;
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.imageurl = req.user.imageurl;
                    comment.author.fullname=req.user.fullname;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect('back');
                }
            })
        }
    })
})

router.get("/:id/:comment_id/edit",middleware.checkCommentOwnership, (req, res)=> {
    console.log("edit1");
    Blog.findById(req.params.id).populate("comments").exec((err, foundBlog)=> {
        if (err || !foundBlog) {
            res.redirect("back");
        } else {
            console.log("edit1");
            Comment.findById(req.params.comment_id, (err, foundComment)=> {
                if (err) {
                    res.redirect("back");
                } else {
console.log("edit2");
                    res.render("blogs/blog", {
                        comment: foundComment,
                        blog: foundBlog,
                        page: req.baseUrl.substr(1)
                    });
                }

            })
        }
    })
});
router.put("/:id/:comment_id",middleware.checkCommentOwnership, (req, res)=> {
    Blog.findByIdAndUpdate(req.params.id).populate("comments").exec((err, foundBlog) =>{
        if (err || !foundBlog) {
            res.redirect("back");
        } else {
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.text, (err, updatedComment)=> {
                updatedComment.text = req.body.text;
                updatedComment.save();
                if (err) {
                    res.redirect("back");
                } else {
                    console.log("comment put")
                    res.redirect("/:topic/" + req.params.id);
                }
            })
        }
    })
});

router.delete("/:id/:comment_id",(req,res)=>{
    console.log("hey")
 Blog.findByIdAndUpdate(req.params.id).populate("comments").exec((err, foundBlog)=> {
        if (err || !foundBlog) {
            res.redirect("back");
            console.log("not deleted");
        } else {
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err){
            console.log("not deleted")
            res.redirect("back");
        }else{
            console.log("not deleted")
            res.redirect("/:topic/"+req.params.id);
        }
    })}
})});


module.exports = router;
