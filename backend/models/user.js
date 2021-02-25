const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
   id:{
      type: String,
      required: true
   },
   name:{
      type: String,
      required: true
   },
   email:{
      type: String,
      required: true
   },
   password: {
      type: String,
      require: true
   },
   favourites:{
      type: Array,
      default: []
   },
   posts:{
      type: Array,
      default: []
   }
})

module.exports=mongoose.model('Users', UserSchema)