const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const { User } = require("../build/models/user");

describe("testing users", () => {
  beforeAll(async () => {
    const url = process.env.DB_CONNECTION;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  });

  it("gets the users", async (done) => {
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
    const users = await request.get("/users/");
    const randomUserEmail =
      users.body[Math.floor(Math.random(users.body.length))].email;
    const randomUserPassword = randomUserEmail.split("@")[0];

    const resp = await request.get(`/users/login`).send({
      email: randomUserEmail,
      password: randomUserPassword,
    });

    expect(resp.status).toBe(200);
    expect(resp.body._id).toBeDefined();
    done();
  });

  it("getting a valid user with wrong password", async (done) => {
    const users = await request.get("/users/");
    const randomUserEmail =
      users.body[Math.floor(Math.random(users.body.length))].email;
    const randomUserPassword = randomUserEmail.split("@")[0];

    const resp = await request.get(`/users/login`).send({
      email: randomUserEmail,
      password: "radnomIvalidPassword",
    });

    expect(resp.status).toBe(401);
    expect(resp.body.message).toBe("Auth failed");
    done();
  });

  it("getting a invalid user", async (done) => {
    const resp = await request.get(`/users/login`).send({
      email: "wrongMail@mail.com",
      password: "radnomIvalidPassword",
    });

    expect(resp.status).toBe(400);
    done();
  });

//   it("creating a new user", async (done) => {
//     const resp = await request.post("/users/register").send({
//       name: "new user",
//       email: "user@mail.com",
//       password: "somePassword@#!",
//     });

//     const user = await User.findOne({ name: "new user" });

//     expect(user._id).toBeTruthy();
//     // await User.deleteMany({name: "jane01"})

//     await User.findByIdAndDelete(user._id);
//     done();
//   });

  it("send registration email", async (done) => {
    const resp = await request.post("/users/register").send({
      name: "new user",
      email: "user@mail.com",
      password: "somePassword@#!",
    });

    console.log(resp.body);

    expect(resp.body.message).toBe('email sent');
    done();
  });

  it("adding new post id to user and delete it", async (done) => {
    const users = await request.get("/users/");
    const randomUser = users.body[Math.floor(Math.random(users.body.length))];
    const randomUserPassword = randomUser.email.split("@")[0];

    const respAdd = await request
      .patch(`/users/addPost/${randomUser._id}`)
      .send({
        id: "2183728173",
      });

    await request
      .get(`/users/login/`)
      .send({
        email: randomUser.email,
        password: randomUserPassword,
      })
      .then((resp) => {
        expect(resp.body.posts.indexOf("2183728173")).not.toBe(-1);
      });

    expect(respAdd.status).toBe(200);

    const respDelete = await request
      .patch(`/users/deletePost/${randomUser._id}`)
      .send({
        id: "2183728173",
      });

    await request
      .get(`/users/login/`)
      .send({
        email: randomUser.email,
        password: randomUserPassword,
      })
      .then((resp) => {
        expect(resp.body.posts.indexOf("2183728173")).toBe(-1);
      });

    expect(respDelete.status).toBe(200);
    done();
  });

  it("editing user name", async (done) => {
    const users = await request.get("/users/");
    const randomUser = users.body[Math.floor(Math.random(users.body.length))];
    const randomUserPassword = randomUser.email.split("@")[0];
    const oldName = randomUser.name;

    const resp1 = await request
      .patch(`/users/editName/${randomUser._id}`)
      .send({
        newName: "new testing name",
      });

    await request
      .get(`/users/login/`)
      .send({
        email: randomUser.email,
        password: randomUserPassword,
      })
      .then((resp) => {
        expect(resp.body.name).toBe("new testing name");
      });

    expect(resp1.status).toBe(200);

    const resp2 = await request
      .patch(`/users/editName/${randomUser._id}`)
      .send({
        newName: oldName,
      });

    await request
      .get(`/users/login/`)
      .send({
        email: randomUser.email,
        password: randomUserPassword,
      })
      .then((resp) => {
        expect(resp.body.name).toBe(oldName);
      });

    expect(resp2.status).toBe(200);
    done();
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });
});
