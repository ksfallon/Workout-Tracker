const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Workout = new Schema({
  date: {
    type: Date,
    default: () => new Date()
  },
  exercises: [{
    type: {
        type: String,
        trim: true,
        required: "Must choose an exercise type",

    },
    name: {
        type: String,
        trim: true,
        required: "Must enter an exercise name",
    },
    duration: {
      type: Number,
      trim: true,
      required: "Must enter duration of the exercise",
    },
    weight: {
        type: Number,
    },
    reps: {
      type: Number,
    },
    sets: {
      type: Number,
    },
    sets: {
      distance: Number,
    },
    
  }],
});

const Workout = mongoose.model("Workout", workoutSchema); //is workout schema right here?

module.exports = Workout;
