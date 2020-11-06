const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    validate: [
      function (input) {
        return input.length >= 1;
      },
      "Title should be longer.",
    ],
  },
  location: {
    type: String,
    required: true,
  },

  description: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
