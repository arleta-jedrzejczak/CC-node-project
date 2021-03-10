import {Request, Response, NextFunction} from 'express'
const {User}=require('../models/user')

exports.addPost=(req: Request, res: Response, next: NextFunction)=>{
   const id=req.params.id;
   const postId=req.body.id;   
   
   User.find({_id: id}).exec().then(async users=>{
      const _posts=[...users[0].posts, postId];      
      
      const update={
         posts: _posts
      }

      await User.findOneAndUpdate({_id: id}, update, {returnOriginal: true}).exec().then(user=>{
         return res.status(200).send(user);
      },err=>{
         return res.status(404).json({message: err});
      }) 
   })  
}

exports.deletePost=(req: Request, res: Response, next: NextFunction)=>{
   const id=req.params.id;
   const postId=req.body.id;
   
   User.find({_id: id}).exec().then(async users=>{
      const _posts=users[0].posts.filter(id=>id!==postId)
      
      const update={
         posts: _posts
      }

      await User.findOneAndUpdate({_id: id}, update, {returnOriginal: true}).exec().then(user=>{
         return res.status(200).send(user);
      },err=>{
         return res.status(404).json({message: err});
      }) 
   })  
}

exports.editName=(req: Request, res: Response, next: NextFunction)=>{
   const id=req.params.id
   const newName=req.body.newName

   User.findOne({_id: id}).exec().then(async user=>{
      const update={
         name: newName
      }

      await User.findOneAndUpdate({_id: id}, update, {returnOriginal: true}).exec().then(user=>{
         return res.status(200).send(user);
      },err=>{
         return res.status(404).json({message: err});
      }) 
   })
}