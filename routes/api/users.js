//require auth to be tied to the post
const passport = require("../../passport");

//backend routes
const router = require("express").Router();
const userController = require("../../controllers/userController");
const tripController = require("../../controllers/tripController");
const itemController = require("../../controllers/itemController");

//router.route("/").post(userController.create);
router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

//Matches with "/api/logout"
router.get("/logout", (req, res) => {
  console.log("REQ USER");
  console.log(req.user);
  if (req.user) {
    req.logout();
    //req.session.destroy();
    // res.send({ msg: "logging out" });
    console.log("LOGGED OUT");
    res.send(true);
    //res.redirect("/");
  } else {
    console.log("NO USER to LOG OUT");
    res.send({ msg: "no user to log out" });
    //res.redirect("/");
  }
});
router.post(
  "/login",
  //   function (req, res, next) {
  //     console.log(req.body);
  //     console.log("%%%%%%%%%%%%%");
  //     next();
  //   },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      id: req.user._id,
    };
    // req.login();
    res.send(userInfo);
  }
);

//Matches with "user/signup"
//router.route("/signup").post(userController.create);
router.post(
  "/signup",

  userController.create,
  (req, res) => {
    console.log("user created", req.user);
    var userInfo = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      id: req.user._id,
    };

    req.login();
    res.send(userInfo);
  }
);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// //Routes for creating a trip
// router
//   .route("/trips")
//   .post(tripController.create)
//   .get(tripController.findById)
//   .delete(tripController.remove);

// router
//   .route("/trips/:id")
//   .get(tripController.findByUserId)
//   .put(tripController.update)
//   .delete(tripController.remove);

// //routes for items
// router
//   .route("/items")
//   .post(itemController.create)
//   .delete(itemController.remove)
//   .get(itemController.findById);

// router
//   .route("/items/:id")
//   .get(itemController.findById)
//   .put(itemController.update)
//   .delete(itemController.remove);

module.exports = router;
