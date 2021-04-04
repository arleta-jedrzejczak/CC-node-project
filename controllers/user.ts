import { Request, Response, NextFunction } from "express";
const { User } = require("../models/user");
const bcrypt=require('bcrypt')

exports.addPost = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   const post = req.body.post;
 
   User.findOne({ _id: id })
     .exec()
     .then(async (user) => {
       const update = {
         posts: [...user.posts, post],
       };
 
       await User.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
         .exec()
         .then(
           (user) => {
             return res.status(200).send(user);
           },
           (err) => {
             return res.status(404).json({ message: err });
           }
         );
     });
};

exports.deletePost = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   const post = req.body.post;
 
   User.findOne({ _id: id })
     .exec()
     .then(async (user) => {
        const posts=user.posts.filter(_post=>_post!==post)

       const update = {
         posts: posts,
       };
 
       await User.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
         .exec()
         .then(
           (user) => {
             return res.status(200).send(user);
           },
           (err) => {
             return res.status(404).json({ message: err });
           }
         );
     });
};

exports.editName = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newName = req.body.newName;

  User.findOne({ _id: id })
    .exec()
    .then(async (user) => {
      const update = {
        name: newName,
      };

      await User.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
        .exec()
        .then(
          (user) => {
            return res.status(200).send(user);
          },
          (err) => {
            return res.status(404).json({ message: err });
          }
        );
    });
};

exports.editEmail = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   const email = req.body.email;
 
   User.findOne({ _id: id })
     .exec()
     .then(async (user) => {
       const update = {
         email: email
       };
 
       await User.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
         .exec()
         .then(
           (user) => {
             return res.status(200).send(user);
           },
           (err) => {
             return res.status(404).json({ message: err });
           }
         );
     });
};
 
exports.editPassword = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   const newPassword = req.body.newPassword;

   User.findOne({_id: id})
      .exec()
      .then(async user => {
         bcrypt.hash(newPassword, 10, async (err, hash) => {
            const update = {
               password: hash,
            };

            await User.findOneAndUpdate({_id: id}, update, {returnOriginal: true})
               .exec()
               .then(
                  user => {
                     return res.status(200).send(user);
                  },
                  err => {
                     return res.status(404).json({message: err});
                  }
               );
         });
      });
};

exports.editAvatar = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   const avatar = req.body.avatar;
 
   User.findOne({ _id: id })
     .exec()
     .then(async (user) => {
       const update = {
         avatar: avatar
       };
 
       await User.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
         .exec()
         .then(
           (user) => {
             return res.status(200).send(user);
           },
           (err) => {
             return res.status(404).json({ message: err });
           }
         );
     });
};

exports.addFavorite = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   const favorite = req.body.favorite;
 
   User.findOne({ _id: id })
     .exec()
     .then(async (user) => {
       const update = {
         favorites: [...user.favorites, favorite],
       };
 
       await User.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
         .exec()
         .then(
           (user) => {
             return res.status(200).send(user);
           },
           (err) => {
             return res.status(404).json({ message: err });
           }
         );
     });
};
