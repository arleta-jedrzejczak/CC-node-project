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

    it("posts endpoint testing", async (done) => {
        const resp = await request.get("/posts");
        expect(resp.status).toBe(200);

        expect(resp.body).toBeDefined();
        done();
    });

    it("creating post with existing title", async (done) => {
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

    it("adding new post", async (done) => {
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

    it("getting posts", async (done) => {
        const resp = await request.get("/posts");

        expect(resp.status).toBe(200);
        expect(resp.body).toBeDefined();
        done();
    });



    afterAll(async () => {
        await connection.close();
        await db.close();
    });



});