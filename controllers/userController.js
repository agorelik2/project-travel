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
      .then((dbUserModel) => res.json(dbUserModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    const email = req.body.email;

    db.User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log("User.js post error: ", err);
      } else if (user) {
        res.json({
          error: `Sorry, already a user with the email: ${email}`,
        });
      } else {
        console.log(req.body);
        db.User.create(req.body)
          .then((dbUserModel) => res.json(dbUserModel))
          .catch((err) => res.status(422).json(err));
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
