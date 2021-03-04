import {Request, Response, NextFunction} from 'express'
const {User}=require('../models/user')

interface Post{
   id: string
}

exports.addPost=(req: Request, res: Response, next: NextFunction)=>{
   const id=req.params.id;
   const post=req.body.post;
   
   User.find({_id: id}).exec().then(async users=>{
      const _posts: Post[]=[...users[0].posts, post];
      
      const update={
         posts: _posts
      }

      await User.findOneAndUpdate({_id: id}, update, {returnOriginal: true}).exec().then(user=>{            
         return res.status(200);
      },err=>{
         return res.status(404).json({message: err});
      }) 
   })  
}