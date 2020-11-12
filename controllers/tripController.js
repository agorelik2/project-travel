const db = require("../models");
const passport = require("../passport");

//Controllers for Trips, references the models and is referenced by the routes
module.exports = {
  //Find All Trips
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
    console.log("++++++++++++++++++++++++");
    console.log(req.body);
    console.log("++++++++++++++++++++++++");
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
    const userId = req.user._id;
    //db.Trip.find({ user: req.params.id })
    db.Trip.find({ user: userId })
      .sort({ createdAt: -1 })
      .then((dbTripModel) => res.json(dbTripModel))
      .catch((err) => res.status(422).json(err));
  },

  //ALG Get Trips by User ID
  getUserTrips: function (req, res) {
    console.log("User Id:");
    console.log("////////////////");
    console.log(req.user._id);
    console.log(req.session.passport.user);

    db.User.find({
      // _id: req.session.passport.user,
      _id: req.user._id,
    })
      .populate("trips")

      // .sort({ createdAt: -1 })
      .exec(function (err, users) {
        if (err) {
          console.log(err);
        } else {
          console.log("################");
          console.log("Populated User: " + users);
          res.send(users);
        }

        //   //res.send(dbTripModel);
        //   res.json(dbTripModel);
        // })
        // .catch(function (err) {
        //   return err;
        // });
      });
  },

  //.then((dbTripModel) => res.json(dbTripModel))
  //ALG Populate
  // getUserTrips: function (req, res) {
  //   console.log("User Id:");
  //   console.log("////////////////");
  //   console.log(req.user._id);
  //   console.log(req.session.passport.user);
  //   db.User.find({
  //     // _id: req.session.passport.user,
  //     _id: req.user._id,
  //   })
  //     .populate("trips")
};
