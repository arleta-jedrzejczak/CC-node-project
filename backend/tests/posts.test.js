const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const Post = require("../build/models/posts");

describe("testing posts", () => {
  beforeAll(async () => {
    const url = process.env.DB_CONNECTION;
    await mongoose.connect(url, {
      useNewUrlParser: true
    });
  });

  it("posts endpoint testing", async done => {
    const resp = await request.get("/posts");
    expect(resp.status).toBe(200);

    expect(resp.body).toBeDefined();
    done();
  });

  it("creating post with existing title", async done => {
    const resp = await request.post("/posts/").send({
      title: "dog",
      tags: "#dog",
      image: "im",
      author: 1, //tu będzie wykorzystanie metody localstorage typu autorIdRead() narazie statyczne dane :)
      likes: 0,
      comments: []
    });

    expect(resp.status).toBe(409);
    expect(resp.body.message).toBe("Title of this posts already exists");

    done();
  });

  it("adding new post", async done => {
    const resp = await request.post("/posts/").send({
      title: "cat",
      tags: "#dog",
      image: "cat",
      author: "2"
    });

    const post = await Post.findOne({ title: "cat" });

    expect(post.id).toBeTruthy();

    await Post.findByIdAndDelete(post.id);
    done();
  });

  it("getting posts", async done => {
    const resp = await request.get("/posts");

    expect(resp.status).toBe(200);
    expect(resp.body).toBeDefined();
    done();
  });

  /////// ULA //////
  it("should response with 404 for getting post with an invalid post ID", async done => {
    const invalidId = "123invalidID";
    const resp = await request.get(`/posts/${invalidId}`);
    expect(resp.status).toBe(404);
    done();
  });

  it("should get post with a valid ID", async done => {
    const resp = await request.get("/posts");
    console.log;
    if (resp) {
      const validId = resp.body[0]._id;
      const respOne = await request.get(`/posts/${validId}`);
      expect(respOne.status).toBe(200);
      expect(respOne.body).toBeDefined();
    }
    done();
  });

  it("should response with 404 for delete a post with invalid ID", async done => {
    const invalidId = "123invalidID";
    const resp = await request.delete(`/posts/${invalidId}`);
    expect(resp.status).toBe(404);
    done();
  });
/*
//delete without adding post first !!!! DELTE first post in database
  it("should response with deleted object for delete a post with a valid ID", async done => {
    const resp = await request.get("/posts");
    if (resp) {
      const validId = resp.body[0]._id;
      const respDel = await request.delete(`/posts/${validId}`);
      expect(respDel.status).toBe(200);
      expect(respDel.body).toBeDefined();
    }
    done();
  });
*/
  it("should add and delete new post", async done => {
    const resp = await request.post("/posts/").send({
      title: "testForDelete",
      tags: "#testForDelete",
      image: "testForDelete",
      author: "2"
    });
    const post = await Post.findOne({ title: "testForDelete" });
    const respDel = await request.delete(`/posts/${post._id}`);
    expect(respDel.status).toBe(200);
    expect(respDel.body).toBeDefined();
    done();
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });
});
