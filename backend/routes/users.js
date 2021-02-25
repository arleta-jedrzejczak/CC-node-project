const express=require("express")
const mongoose=require("mongoose")
const router=express.Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')

router.post('/register', (req, res)=>{
   User.find({email: req.body.email}).exec().then(users=>{
      if(users.length>0)
         return res.status(409).json({message: 'email already exists'})
   })

   User.find({name: req.body.name}).exec().then(users=>{
      if(users.length>0)
         return res.status(409).json({message: 'such name already exists'})
   })

   bcrypt.hash(req.body.password, 10, (err, hash)=>{
      if(err)
         return res.status(500).json({error: err})
      else{
         const user=new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            favourites: [],
            posts: []
         })

         user.save().then(result=>{
            res.status(201).json(user)
         }).catch(err=>{
            console.log(err);
            res.status(500).json({"error": err})
         })
      }
   })
})

router.get('/', async(req, res)=>{
   try{
      const users=await User.find()
      res.json(users)
   }catch(err){
      res.json({message: err})
   }
})

router.get('/login/:id', async (req, res)=>{
   try{
      const user=await User.findById(req.params.id)
      res.json(user)
      console.log(user.name);
   }catch(err){
      res.status(400).json({message: err})
   }
})

module.exports=router