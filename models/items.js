const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  tripId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
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
  start: {
    type: Date,
  },

  description: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
