// Need to require mongoose here, need that npm
const mongoose = require("mongoose");
// have to start with const Schema because it maps to the MongoDb collection and defines the shape of the documents in the collection.
const Schema = mongoose.Schema;

// WorkoutsSchema is a NEW Schema
const WorkoutsSchema = new Schema({
  date: {
    type: Date, // for each key there is a type. This one is date
    default: () => new Date() // this returns the value of new Date() as the default value
  },
  exercises: [{
    type: {
        type: String, // this type is a string
        trim: true, // it'll be trimmed if there are extra spaces after
        required: "Must choose an exercise type", // it is required and if not filled in, then this message displays

    },
    name: {
        type: String,
        trim: true,
        required: "Must enter an exercise name",
    },
    duration: {
      type: Number, // this type is a number
      trim: true,
      required: "Must enter duration of the exercise",
    },
    weight: {
        type: Number,
        trim: true,

    },
    reps: {
      type: Number,
      trim: true,

    },
    sets: {
      type: Number,
      trim: true,

    },
    distance: {
      type: Number,
      trim: true,

    },
    
  }],
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema); 

module.exports = Workouts; // the data that is run through the WorkoutsSchema is exported as the module Workouts
// need the name Workouts here because the function inside seed.js called for it in order to run the seed data through this model