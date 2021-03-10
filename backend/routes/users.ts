import express, { Response, Request } from "express";
const router = express.Router();
const { User } = require("../models/user");
const UserControler = require("../controllers/user");
const Auth = require("../controllers/authentication");
const bcrypt = require("bcrypt");

router.post("/register", (req: Request, res: Response) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length > 0)
        return res.status(409).json({ message: "email already exists" });
      else {
        User.find({ name: req.body.name }).exec().then((users) => {
            if (users.length > 0)
              return res.status(409).json({ message: "such name already exists" });
            else {
              Auth.send(req.body.name, req.body.email, req.body.password);

              res.send("email sent");
            }
          });
      }
    });
});

router.post("/email-activation", Auth.activateAccount);

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.get("/login", async (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return res.status(400).json({ message: err });
        if (result) return res.status(200).json(user);
        return res.status(401).json({ message: "Auth failed" });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router.patch("/edit/:id", async (req: Request, res: Response) => {
  await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    returnOriginal: true,
  })
    .exec()
    .then(
      (user) => {
        res.status(200).json({ message: "updated" });
      },
      (err) => {
        res.status(404).send({ message: err });
      }
    );
});

router.patch("/addPost/:id", UserControler.addPost);

router.patch("/deletePost/:id", UserControler.deletePost);

router.patch("/editName/:id", UserControler.editName);

module.exports = router;
