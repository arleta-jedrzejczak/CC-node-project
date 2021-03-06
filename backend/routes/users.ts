import express, {Response, Request} from "express";
import mongoose from "mongoose";
const router = express.Router();
const {User} = require("../models/user");
const UserControler=require('../controllers/user')
const bcrypt = require("bcrypt");

router.post("/register", (req: Request, res: Response) => {
   User.find({email: req.body.email}).exec().then(users => {
         if (users.length > 0) 
            return res.status(409).json({message: "email already exists"});
         else {
            User.find({name: req.body.name})
               .exec()
               .then(users => {
                  if (users.length > 0)
                     return res.status(409).json({message: "such name already exists"});
                  else {
                     bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) return res.status(500).json({error: err});
                        else {
                           const user = new User({
                              _id: new mongoose.Types.ObjectId(),
                              name: req.body.name,
                              email: req.body.email,
                              password: hash,
                              favourites: [],
                              posts: [],
                           });

                           user
                              .save()
                              .then(result => {
                                 return res.status(200).json(user);
                              })
                              .catch(err => {
                                 return res.status(500).json({error: err});
                              });
                        }
                     });
                  }
               });
         }
      });
});

router.get("/", async (req: Request, res: Response) => {
   try {
      const users = await User.find();
      return res.status(200).json(users);
   } catch (err) {
      return res.status(400).json({message: err});
   }
});

router.get("/login", async (req: Request, res: Response) => {
   User.findOne({email: req.body.email}).exec().then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result)=>{
         if(err)
            return res.status(400).json({message: err})
         if(result)
            return res.status(200).json(user);
         return res.status(401).json({message: 'Auth failed'})
      })
   }).catch(err=>{
      return res.status(400).send(err)
   })
})

router.patch("/edit/:id", async (req: Request, res: Response) => {
   await User.findOneAndUpdate({_id: req.params.id}, req.body, {returnOriginal: true}).exec().then(user=>{
            res.status(200).json({message: "updated"});
         }, err => {
            res.status(404).send({message: err});
         }
      );
});

router.patch("/addPost/:id", UserControler.addPost)

router.patch("/deletePost/:id", UserControler.deletePost)

router.patch("/editName/:id", UserControler.editName)

module.exports = router;
