const router = require("express").Router();
const tripController = require("../../controllers/tripController");

// Matches with "/api/trips"
router
  .route("/")
  .post(tripController.create)
  .get(tripController.findById)
  .delete(tripController.remove);

// Matches with "/api/trips/:id"
router
  .route("/:id")
  .get(tripController.findById)
  .put(tripController.update)
  .delete(tripController.remove);

module.exports = router;
