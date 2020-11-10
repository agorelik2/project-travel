const router = require("express").Router();
const tripController = require("../../controllers/tripController");

// Matches with "/api/trips"
router.route("/").post(tripController.create).get(tripController.findAll);

// Matches with "/api/trips"
// router
//   .route("/")
//   .post(tripController.create)
//   .get(tripController.findById)
//   .delete(tripController.remove);

// Matches with "/api/trips/:id"

router
  .route("/user")
  .get(tripController.getUserTrips)
  .put(tripController.update)
  .delete(tripController.remove);

router
  .route("/:id")
  .get(tripController.findById)
  .put(tripController.update)
  .delete(tripController.remove);

//ALG /user (populate)
// router.get("/user", function (req, res) {
//   if (req.isAuthenticated()) {
//     tripController.getUserTrips(req, res);
//   } else {
//     res.status(401).send("Not authenticated");
//   }
//});

// router.get("/", function (req, res) {
//   if (req.isAuthenticated()) {
//     tripController.getUserTrips(req, res);
//   } else {
//     res.status(401).send("Not authenticated");
//   }
// });
module.exports = router;
