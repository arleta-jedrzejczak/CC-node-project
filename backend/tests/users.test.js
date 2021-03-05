const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const {User} = require("../build/models/user");

describe("testing users", () => {
   beforeAll(async () => {
      const url = process.env.DB_CONNECTION;
      await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });
   });

   it("gets the users endpoint", async (done) => {
      const resp = await request.get("/users/");
      expect(resp.status).toBe(200);

      expect(resp.body).toBeDefined();
      done();
   });

   it("creating user with existing email", async (done) => {
      const resp = await request.post("/users/register").send({
         name: "ripper",
         email: "death@mail.com",
         password: "crypto-death",
      });

      expect(resp.status).toBe(409);
      expect(resp.body.message).toBe("email already exists");

      done();
   });

   it("creating user with existing name", async (done) => {
      const resp = await request.post("/users/register").send({
         name: "magnum",
         email: "opus@mail.com",
         password: "xyxxyyyxxyx",
      });

      expect(resp.status).toBe(409);
      expect(resp.body.message).toBe("such name already exists");

      done();
   });

   it("getting a valid user", async (done) => {
      const users=await request.get("/users/");
      const randomId=users.body[Math.floor(Math.random(users.body.length))]._id;

      console.log(randomId);

      const resp=await request.get(`/users/login/${randomId}`);

      expect(resp.status).toBe(200);
      expect(resp.body._id).toBeDefined();
      done();
   });

   it("getting invalid user", async (done) => {
      const resp = await request.get("/users/login/60376b73e415");

      expect(resp.status).toBe(400);
      expect(resp.body.message).toBe("no such user");
      done();
   });

   it("creating a new user", async (done) => {
      const resp = await request.post("/users/register").send({
         name: "new user",
         email: "user@mail.com",
         password: "somePassword@#!",
      });

      const user = await User.findOne({name: "new user"});

      expect(user._id).toBeTruthy();
      // await User.deleteMany({name: "jane01"})

      await User.findByIdAndDelete(user._id);
      done();
   });

   it('adding new post id to user and delete it', async done=>{
      const users=await request.get("/users/");
      const randomId=users.body[Math.floor(Math.random(users.body.length))]._id;

      const respAdd=await request.patch(`/users/addPost/${randomId}`).send({
         id: '2183728173'
      })

      await request.get(`/users/login/${randomId}`).then(resp=>{
         expect(resp.body.posts.indexOf('2183728173')).not.toBe(-1)
      })

      expect(respAdd.status).toBe(200)
      
      const respDelete=await request.patch(`/users/deletePost/${randomId}`).send({
         id: '2183728173'
      })

      await request.get(`/users/login/${randomId}`).then(resp=>{
         expect(resp.body.posts.indexOf('2183728173')).toBe(-1)
      })

      expect(respDelete.status).toBe(200)

      done()
   })

   afterAll(async () => {
      await connection.close();
      await db.close();
   });
});
