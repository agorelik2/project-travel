require("dotenv").config();
// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
const bodyParser = require("body-parser");

// Requiring passport as we've configured it
var passport = require("./passport");

const MongoStore = require("connect-mongo")(session);
const path = require("path");

// console.log(`my envs ${process.env.Example_MONGODB_URI}`);
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// We need to use sessions to keep track of our user's login status
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "adstravel", //pick a random string to make the hash that is generated secure
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

// Persistent login sessions. Session expires after 6 months or when deleted by user.
app.use(passport.session());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/utravel");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
