"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var User = require("../models/user").User;
var bcrypt = require("bcrypt");
var mailgun = require("mailgun-js");
var jwt = require("jsonwebtoken");
var mg = mailgun({
  apiKey: process.env.MG_API_KEY,
  domain: process.env.MG_DOMAIN,
});
exports.send = function (name, email, password) {
  var token = jwt.sign(
    { name: name, email: email, password: password },
    process.env.JWT_KEY,
    { expiresIn: "15m" }
  );
  mg.messages().send(
    {
      from: "noreply@camp.project.com",
      to: "camp.project.aj@gmail.com",
      subject: "Email confirmation",
      html:
        "\n         <h2>PLease click the link below to confirm your email</h2>\n         <p>localhost:3000/users/auth/" +
        token +
        "</p>\n      ",
    },
    function (err, body) {
      if (err) return err;
    }
  );
};
exports.activateAccount = function (req, res, next) {
  var token = req.body.token;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, function (err, decodedToken) {
      if (err)
        return res.status(500).json({ err: "incorrect or expired link" });
      var name = decodedToken.name,
        email = decodedToken.email,
        password = decodedToken.password;
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) return res.status(500).json({ error: err });
        else {
          var user_1 = new User({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: name,
            email: email,
            password: hash,
            favourites: [],
            posts: [],
          });
          user_1
            .save()
            .then(function (result) {
              return res.status(200).json(user_1);
            })
            .catch(function (err) {
              return res.status(500).json({ error: err });
            });
        }
      });
    });
  } else return res.status(500).json({ err: "lack of token!?" });
};
