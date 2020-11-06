var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First Name is required.",
  },

  lastName: {
    type: String,
    trim: true,
    required: "Last Name is required.",
  },

  email: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } },
    },
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },

  password: {
    type: String,
    trim: true,
    required: "Password is required.",
    validate: [
      function (input) {
        return input.length >= 6;
      },
      "Password should be at least 6 characters long.",
    ],
  },

  userCreated: {
    type: Date,
    default: Date.now,
  },

  trip: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
