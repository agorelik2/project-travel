const db = require("../models");
const passport = require("../passport");

//Controllers for Trips, references the models and is referenced by the routes
module.exports = {
  findAll: function (req, res) {
    db.Trip.find(req.query)
      .sort({ date: -1 })
      .then((dbTripModel) => res.json(dbTripModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Trip.findById(req.params.id)
      .then((dbTripModel) => res.json(dbTripModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    //console.log(req.body);
    //console.log(req);

    //updated create route to save userId for the user who created the trip ALG
    db.Trip.create(req.body)
      .then((dbTripModel) => {
        //  console.log(dbTripModel);
        const tripId = dbTripModel._id;
        const userId = req.user._id;
        db.User.findOneAndUpdate({ _id: userId }, { $push: { trip: tripId } })
          .then((dbUserModel) => {
            res.json(dbUserModel);
          })
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbTripModel) => res.json(dbTripModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Trip.findById({ _id: req.params.id })
      .then((dbTripModel) => dbTripModel.remove())
      .then((dbTripModel) => res.json(dbTripModel))
      .catch((err) => res.status(422).json(err));
  },
  findByUserId: function (req, res) {
    //console.log(req);
    db.Trip.find({ userId: req.params.id })
      //db.Trip.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .then((dbTripModel) => res.json(dbTripModel))
      .catch((err) => res.status(422).json(err));
  },

  //ALG Populate
  getUserTrips: function (req, res) {
    console.log("User Id:");
    console.log("////////////////");
    console.log(req.user._id);
    console.log(req.session.passport.user);
    db.User.findById({
      //_id: req.session.passport.user,
      _id: req.user._id,
      //email: email,
    })
      .populate("trip")
      .then(function (dbTripModel) {
        res.send(dbTripModel);
      })
      .catch(function (err) {
        return err;
      });
  },
  //ALG Populate
  // getUserTrips: function (req, res) {
  //   console.log("User Id:");
  //   console.log(req.user._id);
  //   db.User
  //     .find({
  //       // _id: req.session.passport.user,
  //       _id: req.user._id,
  //     })
  //     .populate({

  //       path: "trip",
  //       populate: { path: "trip" },
  //     })
  //     .then(function (dbTripModel) {
  //       res.send(dbTripModel);
  //     })
  //     .catch(function (err) {
  //       return err;
  //     });
  // },
};
