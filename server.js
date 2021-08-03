// Must require npm express package
const express = require("express");
const mongoose = require("mongoose");

// Our port is either listening for incoming requests from 3000 OR the one Heroku gives it (process.env.PORT)
const PORT = process.env.PORT || 3000 

// every time we us "app" we are calling on the express npm application
const app = express();

// Sets up the Express app to handle data parsing. urlencoded is a method of express, and it returns middleware that only parses urlencoded content
// the extended allows us to parse either with the qs library when true (with the querystring library when false )
app.use(express.urlencoded({ extended: true }));
// *middleware happens right before your route gets hit, its a method that takes json the client sends it and parses it.
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_db", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view"));

// Here is where we start our server so it can begin listening to the client requests
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});