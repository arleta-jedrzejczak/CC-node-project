const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const User = require("../build/models/user");

describe("testing users", () => {
  beforeAll(async () => {
    const url = process.env.DB_CONNECTION;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  it("gets the users endpoint", async (done) => {
    const resp = await request.get("/users/");
    expect(resp.status).toBe(200);

    expect(resp.body).toBeDefined();
    done();
  });

  it("creating user with existing email", async (done) => {
    const resp = await request.post("/users/register").send({
      name: "janeV2",
      email: "jane@mail.com",
      password: "crypto-Jane123",
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

  it("getting valid user", async (done) => {
    const resp = await request.get("/users/login/6036f5fc2cea1e39884b2960");

    expect(resp.status).toBe(200);
    expect(resp.body.id).toBeDefined();
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

    const user = await User.findOne({ name: "new user" });

    expect(user.id).toBeTruthy();
    // await User.deleteMany({name: "jane01"})

    await User.findByIdAndDelete(user.id);
    done();
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });
});
