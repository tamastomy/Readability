var Blog=require("../models/blog");
var Comment=require("../models/comment");
var middlewareObj={};



middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!");
    res.redirect("/login");
};

middlewareObj.checkBlogOwnership=function(req,res,next){
      if(req.isAuthenticated()){
          Blog.findById(req.params.id, function(err,foundBlog){
    if(err || !foundBlog){
        res.redirect("back");
    } else {
        if(foundBlog.author.id.equals(req.user._id)){
            next();
        } else {
          res.redirect("back");
         }
        }
        });
    } else {
       res.redirect("back");
      }
};

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundComment){
    if(err || !foundComment){
        req.flash("error","Comment not found");
        res.redirect("back");
    } else {
        if(foundComment.author.id.equals(req.user._id)){
            next();
        } else {
          res.redirect("back");
         }
        }
        });
    } else {
       res.redirect("back");
      }
};

module.exports=middlewareObj;
