import {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const mailgun = require("mailgun-js");
const jwt = require("jsonwebtoken");
const mg = mailgun({
   apiKey: process.env.MG_API_KEY,
   domain: process.env.MG_DOMAIN,
});

exports.send = (name: string, email: string, password: string) => {
   const token = jwt.sign({name, email, password}, process.env.JWT_KEY, {
      expiresIn: "15m",
   });

   mg.messages().send(
      {
         from: "noreply@camp.project.com",
         to: "camp.project.aj@gmail.com", //later change to <email>
         subject: "Email confirmation",
         html: `
         <h2>PLease click the link below to confirm your email</h2>
         <p>localhost:3000/users/auth/${token}</p>
      `,
      },
      (err, body) => {
         if (err) return err;
      }
   );
};

exports.activateAccount = (req: Request, res: Response, next: NextFunction) => {
   const token = req.body.token;

   if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
         if (err) 
            return res.status(500).json({err: "incorrect or expired link"});

         const {name, email, password} = decodedToken;

         bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({error: err});
            else {
               const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  name: name,
                  email: email,
                  password: hash,
                  avatar: '',
                  favorites: [],
                  posts: [],
               });

               user.save().then(result => {
                     return res.status(200).json(user);
                  }).catch(err => {
                     return res.status(500).json({error: err});
                  });
            }
         });
      });
   } 
   else 
      return res.status(500).json({err: "lack of token!?"});
};
