const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workout = new Schema({
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
    weight: {
        type: Number,
    },
  }],
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
