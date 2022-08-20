const app = require("../index");
const Post = require("../models/post.model");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
  mongoose.connect(
    "mongodb+srv://prathyu:HVIrzkwgyPvPvqsu@cluster0.legmdpo.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});
afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
describe("posts CRUD", () => {
  test("GET - all posts", async () => {
    const post = await Post.create({ title: "Post 1", body: "Lorem ipsum" });
    await supertest(app)
      .get("/posts")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.type).toEqual(expect.stringContaining("json"));
        expect(response.body.length).toEqual(1);

        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].body).toBe(post.body);
      });
  });

  test("POST - create post", async () => {
    const data = { title: "Post 1", body: "Lorem ipsum" };

    await supertest(app)
      .post("/posts")
      .send(data)
      .expect(201)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.title).toBe(data.title);
        expect(response.body.body).toBe(data.body);

        // Check data in the database
        const post = await Post.findOne({ _id: response.body._id });
        expect(post).toBeTruthy();
        expect(post.title).toBe(data.title);
        expect(post.body).toBe(data.body);
      });
  });

  test("GET - /posts/:id", async () => {
    const post = await Post.create({ title: "Post 1", body: "Lorem ipsum" });

    await supertest(app)
      .get("/posts/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(post.id);
        expect(response.body.title).toBe(post.title);
        expect(response.body.body).toBe(post.body);
      });
  });
  test("PATCH /posts/:id", async () => {
    const post = await Post.create({ title: "Post 1", body: "Lorem ipsum" });

    const data = { title: "New title", body: "dolor sit amet" };

    await supertest(app)
      .patch("/posts/" + post.id)
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBe(post.id);
        expect(response.body.title).toBe(data.title);
        expect(response.body.body).toBe(data.body);

        // Check the data in the database
        const newPost = await Post.findOne({ _id: response.body._id });
        expect(newPost).toBeTruthy();
        expect(newPost.title).toBe(data.title);
        expect(newPost.body).toBe(data.body);
      });
  });
  test("DELETE - posts/:id", async () => {
    const post = await Post.create({
      title: "Post 1",
      body: "Lorem ipsum",
    });
    await supertest(app)
      .delete("/posts/" + post.id)
      .expect(204)
      .then(async (res) => {
        expect(await Post.findOne({ _id: post.id })).toBeFalsy();
      });
  });
});
