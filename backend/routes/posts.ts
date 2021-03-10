import express, {Response, Request} from 'express';
import mongoose from 'mongoose';
const router = express.Router();
const Post = require("../models/posts");

router.post("/", (req: Request, res: Response) => {
    Post.find({title: req.body.title}).exec().then((posts) =>{
        if(posts.length > 0){
            return res.status(409).json({ message: "Title of this posts already exists" });
        }else{
            Post.find({image: req.body.image}).exec().then((posts) =>{
                if(posts.length > 0){
                    return res.status(409).json({message: "That image was already posted"});
                }else{
                    const post = new Post({
                        _id: new mongoose.Types.ObjectId(),
                        title: req.body.title,
                        tags: req.body.tags,
                        image: req.body.image,
                        author: req.body.author, //autorIdRead() from localstorage will be used here
                        likes: 0,
                        comments: []
                    });
                    
                    post.save().then((result) => {
                        return res.status(201).json(post);
                    }).catch((err) => {
                        return res.status(500).json({ error: err });
                    });
                }
            });
        }
    })
});

router.get("/", async (req, res) => {
    try {
      const posts = await Post.find();
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
});

router.put("/edit/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    Post.findOne({_id: id}, function(err, foundPost){
        if(err){
            console.log(err)
            res.status(500).send();
        } else {
            if(!foundPost) {
                res.status(404).send();
            } else {
                if(req.body.title) {
                    foundPost.title = req.body.title;
                }
                if(req.body.tags) {
                    foundPost.tags = req.body.tags;
                }
                foundPost.save(function(err, updatedPost) {
                    if(err) {
                        console.log(err);
                        res.status(500).send();
                    } else {
                        res.send(updatedPost);
                    }
                });
            }
        }
    });
  });

module.exports = router;