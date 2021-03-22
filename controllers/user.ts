import { Request, Response, NextFunction } from "express";
const { User } = require("../models/user");
const bcrypt=require('bcrypt')

exports.addPost = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const postId = req.body.id;

  User.find({ _id: id })
    .exec()
    .then(async (users) => {
      const _posts = [...users[0].posts, postId];

      const update = {
        posts: _posts,
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
  const postId = req.body.id;

  User.find({ _id: id })
    .exec()
    .then(async (users) => {
      const _posts = users[0].posts.filter((id) => id !== postId);

      const update = {
        posts: _posts,
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
   const newEmail = req.body.newEmail;
 
   User.findOne({ _id: id })
     .exec()
     .then(async (user) => {
       const update = {
         email: newEmail,
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