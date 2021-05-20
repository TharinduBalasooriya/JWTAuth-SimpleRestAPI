const User = require("../models/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.singUP = function (req, res) {
  let newuser = new User();

  //check user name exist

  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.send({ messaege: user });
      return;
    } else if (user) {
      res.send({ messaege: "User name already exist" });
      return;
    }

    addUser();
  });

  function addUser() {
    newuser.username = req.body.username;
    newuser.password = bcrypt.hashSync(req.body.password, 8);

    newuser.save(function (err) {
      if (err) res.send(err);
      else
        res.send({
          message: "New user account created",
          data: newuser,
        });
    });
  }
};

exports.signIn = function (req, res) {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, "key", {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      accessToken: token,
    });
  });
};

exports.testRoute = function (req, res,next) {
  res.send({
      id:req.userId,
      messaege: req.body.msg
  });
};
