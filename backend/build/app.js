var express = require("express");
var app = express();
var mongoose = require("mongoose");
var parser = require("body-parser");
require("dotenv/config");
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, function () { return console.log("connected"); });
app.use(parser.json());
var usersRouter = require("./routes/users");
app.use("/users", usersRouter);
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
