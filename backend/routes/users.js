const express=require("express")
const router=express.Router()
const { v4: uuidv4 } = require('uuid')
const User=require('../models/user')

router.post('/register', (req, res)=>{
   const user=new User({
      name: req.body.name,
      email: req.body.email,
      favourites: [],
      id: uuidv4(),
      password: req.body.password,
      posts: []
   })

   try {
      let saved=user.save()
      res.status(200).json(saved)
   }catch (error) {
      console.log(error);
   }
})

router.get('/login/:id', async (req, res)=>{
   try{
      const user=await User.findById(req.params.id)
      res.json(user)
   }catch(err){
      res.json({message: err})
   }
})

module.exports=router