"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
var parser = require("body-parser");
require("dotenv/config");
var cors = require('cors');
mongoose_1.default.connect("mongodb+srv://Camp:devian@cluster0.6wpvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function () { return console.log("connected"); });
app.use(cors());
app.use(parser.json());
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});
app.use(function (req, res, next) {
    res.send("Working!");
});
module.exports = app;
