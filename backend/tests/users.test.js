const app=require("../server");
const supertest=require("supertest");
const request=supertest(app);
const mongoose=require('mongoose')
const User=require('../models/user')

describe('testing users', ()=>{
   beforeAll(async ()=>{
      const url=process.env.DB_CONNECTION
      await mongoose.connect(url, { useNewUrlParser: true })
   })

   it('gets the users endpoint', async done=>{
      const resp=await request.get('/users/')
      expect(resp.status).toBe(200)

      expect(resp.body).toBeDefined()
   
      done()
   })

   it('creating user with existing email', async done=>{
      const resp=await request.post('/users/register').send({
         name: "janeV2",
         email: "jane@mail.com",
         password: "crypto-Jane123"
      })

      expect(resp.status).toBe(409)
      expect(resp.body.message).toBe('email already exists')

      done()      
   })

   it('getting valid user', async done=>{
      const resp=await request.get('/users/login/60376b6677b8b8478473e415')

      // expect(resp.body).toBeDefined()

      done()
   })
   
   it('getting invalid user', async done=>{
      const resp=await request.get('/users/login/60376b73e415')

      expect(resp.status).toBe(400)

      done()
   })

   // it('creating a new user', async done=>{
   //    const resp=await request.post('/users/register').send({
   //       name: "jane01",
   //       email: "jane@mail.com",
   //       password: "Jane123"
   //    })

   //    const user=await User.findOne({name: 'jane01'})

   //    expect(user.id).toBeTruthy()

   //    done()  
   // })

   afterAll(async () => {
      await connection.close();
      await db.close();
    });
})
