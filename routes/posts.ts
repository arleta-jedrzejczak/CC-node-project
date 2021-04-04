import express, { Response, Request } from "express";
import mongoose from "mongoose";
const router = express.Router();
const Post = require("../models/posts");

router.post("/", (req: Request, res: Response) => {
   //  Post.find({ image: req.body.image }).exec().then((posts) => {
      //   if (posts.length > 0) {
      //       return res.status(409).json({ message: "That image was already posted" });
      //   } else {
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
      //   }
   //  });
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.get("/:postId", async (req: Request, res: Response) => {
  if (mongoose.Types.ObjectId.isValid(req.params.postId)) {
    const post = await Post.findById(req.params.postId);
    if (!post)
      return res.status(404).send("The post with the given ID was not found.");
    res.send(post);
  } else res.status(404).send("Invalid ID");
});

router.delete("/:postId", async (req: Request, res: Response) => {
  if (mongoose.Types.ObjectId.isValid(req.params.postId)) {
    const post = await Post.findByIdAndRemove(req.params.postId);
    if (!post)
      return res.status(404).send("The post with the given ID was not found.");
    res.status(200).send(post);
  } else
    return res.status(404).send("Invalid ID");
});

router.patch("/addComment/:id", async (req: Request, res: Response) => {
   const id = req.params.id;
   const {text, author} = req.body;
 
   Post.findOne({ _id: id })
     .exec()
     .then(async (post) => {
        let date=new Date()

       const update = {
         comments: [...post.comments, {
            text: text,
            author: author,
            time: date
         }]
       };
 
       await Post.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
         .exec()
         .then(
           (post) => {
             return res.status(200).send(post);
           },
           (err) => {
             return res.status(404).json({ message: err });
           }
         );
     });
});

router.patch("/deleteComment/:id", async (req: Request, res: Response) => {
   const id = req.params.id;
   const {text} = req.body;
 
   Post.findOne({ _id: id })
     .exec()
     .then(async post => {
        let comments=post.comments.filter(_post=>_post.text!==text)

       const update = {
         comments: comments
       };
 
       await Post.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
         .exec()
         .then(
           (post) => {
             return res.status(200).send(post);
           },
           (err) => {
             return res.status(404).json({ message: err });
           }
         );
     });
});

router.put("/edit/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    Post.findOne({_id: id}, function(err, foundPost){
        if(err){
            res.status(404).send("Invalid ID");
        } else {
            if(!foundPost) {
                res.status(404).send("The post with the given ID was not found.");
            } else {
                if(req.body.title) {
                    foundPost.title = req.body.title;
                }
                if(req.body.tags) {
                    foundPost.tags = req.body.tags;
                }
                foundPost.save(function(err, updatedPost) {
                    if(err) {
                        res.status(500).send("Something went wrong");
                    } else {
                        res.status(200).send(updatedPost);
                    }
                });
            }
        }
    });
  });

module.exports = router;