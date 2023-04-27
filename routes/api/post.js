const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const {check,validationResult} = require('express-validator');
const config = require('config');
const request = require('request');

// this section deals with the post method.
//post get delete update.. adding comment..
//@desc above
//@route POST/api/post
//access private
router.post('/',[auth,[
    check('text','Text is required.').not().isEmpty()
]],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({msg: error.array()});
    }
    // error doesn't exits..
    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = new Post({
            text: req.body.text,
            user: req.user.id,
            name: user.name,
            avatar: user.avatar
        });
        await post.save();
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Errror"});
    }
    // res.send('Post Deatial..');
});
//@desc getting all the posts..
//@route GET/api/post
//access private
router.get('/',auth,async (req,res)=>{
    try{
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Error"});
    }
});

//@desc getting all the posts by post id.
//@route GET/api/post/:post_id
//access private
router.get('/:post_id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            // if post is not found then erro 400.
            return res.status(400).json({msg: "Post not Found"});
        }
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Error"});
    }
});

//@desc delete  the post by post id.
//@route DELETE/api/post/:post_id
//access private
router.delete('/:post_id',auth,async (req,res)=>{
    try{
        console.log('Delete Button Worked From Backend Reachable');
        const post = await Post.findById(req.params.post_id);
        if(!post){
            // if post is not found then erro 400.
            return res.status(400).json({msg: "Post not Found"});
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: "user is not authorize"});
        }
        await post.deleteOne();
        res.json({msg: "Post Removed."});
    }
    catch(err){
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: "Post is not Found"});
        }
        res.status(500).json({msg: "Server Error"});
    }
});

//@desc liek  the post a specific of  post id.
//@route PUT/api/post/like/:param_id
//access public but user should be authorize...

router.put('/like/:post_id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            // if post is not found then erro 400.
            return res.status(400).json({msg: "Post not Found"});
        }
        // if found we need to check whether this post has been already like by this req.user.id
        if(post.likes.filter(like =>like.user.toString() === req.user.id).length >0){
            return res.status(401).json({msg: "This post has been liked already"});
        }
        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Error"});
    }
});
//@desc unliek  the post a specific of  post id.
//@route PUT/api/post/unlike/:post_id
//access public but user should be authorize...

router.put('/unlike/:post_id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            // if post is not found then erro 400.
            return res.status(400).json({msg: "Post not Found"});
        }
        // if found we need to check whether this post has been already like by this req.user.id
        if(post.likes.filter(like =>like.user.toString() === req.user.id).length ===0){
            return res.status(401).json({msg: "This post has not been liked"});
        }
        // if liked remove the index of the like from the like array 
        const indx = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(indx,1);
        
        await post.save();
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Error"});
    }
});

// commenting on a post with post_id
//@desc above
//@route POST/api/post
//access private
router.post('/comment/:id',[auth,[
    check('text','Text is required.').not().isEmpty()
]],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({msg: error.array()});
    }
    // error doesn't exits..
    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        if(!post){
            // if post not found..
            return res.status(400).json({msg: "post not found"});
        }
        const comment = {
            text: req.body.text,
            name:user.name,
            avatar:user.avatar,
             user: req.user.id,
        };
        post.comments.unshift(comment);
        await post.save();
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Errror"});
    }
    // res.send('Post Deatial..');
});
//@desc to remove the comment on a  post with post_id
//@route DELETE/comment/:post_id
//@pulic but deltion should be done by author.
router.delete('/comment/:post_id/:com_id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            // if post is not found then erro 400.
            return res.status(400).json({msg: "Post not Found"});
        }
        // if found we need to check whether this post has been already like by this req.user.id
        // another method 
        // first find the comment with com_id;
        const comment = post.comments.find(comment => comment.id === req.params.com_id);
        if(!comment){
            return res.status(400).json({msg: "Comment Does not exits"});
        }
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: "user is authorize to delete this post"});
        }
       
        // if liked remove the index of the like from the like array 
        const indx = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        // but make sure it was by the author.

        post.comments.splice(indx,1);
        
        await post.save();
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Error"});
    }
});
module.exports = router;