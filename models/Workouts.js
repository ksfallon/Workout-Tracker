const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
  date: {
    type: Date,
    default: () => new Date()
    // default: Date.now
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

const Workouts = mongoose.model("Workouts", WorkoutsSchema); //is workout schema right here?

module.exports = Workouts;
