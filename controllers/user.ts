import { Request, Response, NextFunction } from "express";
const { User } = require("../models/user");

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

exports.editAvatar = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   const avatar = req.body.avatar;
 
   User.findOne({ _id: id })
     .exec()
     .then(async (user) => {
       const update = {
         avatar: avatar,
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
 