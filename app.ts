import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
const app = express();
const parser = require("body-parser");
require("dotenv/config");

mongoose.connect(
  "mongodb+srv://Camp:devian@cluster0.6wpvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("connected")
);

app.use(parser.json());

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

app.use("/users", usersRouter);


app.use("/posts", postsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("Working!");
});

module.exports = app;
