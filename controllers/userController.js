const { User } = require("../models");
const db = require("../models");
const passport = require("../passport");

//Controllers for users
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .then((dbUserModel) => res.json(dbUserModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      // .populate("trip") //AG updated user controller
      .then((dbUserModel) => res.json(dbUserModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    const email = req.body.email;
    console.log("In USER CONTROLLER, EMAIL");
    console.log(email);
    console.log("//////////////////////");
    db.User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log("User.js post error: ", err);
      } else if (user) {
        res.json({
          error: `Sorry, already a user with the email: ${email}`,
        });
      } else {
        console.log("REQ.BODY");
        console.log(req.body);
        console.log("=============================");
        // const hashedPassword = generateHash(req.body.password);
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        db.User.create(newUser)
          .then((dbUserModel) => res.json(dbUserModel))
          // .catch((err) => res.status(422).json(err));
          .catch((err) => res.send(err));
      }
    });
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbUserModel) => res.json(dbUserModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbUserModel) => dbUserModel.remove())
      .then((dbUserModel) => res.json(dbUserModel))
      .catch((err) => res.status(422).json(err));
  },
};
