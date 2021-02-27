const mongoose=require('mongoose')
const dbName='users'

beforeAll(async ()=>{
   const url=process.env.DB_CONNECTION
   await mongoose.connect(url, { useNewUrlParser: true })
})