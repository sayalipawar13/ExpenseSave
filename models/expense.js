const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Expense",
  },
  amount: {
    type: Number,
    required:[true,"Please add a positive number"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: [true,"Please mention a category.eg.salary,shopping"],
  },
  desc: {
    type: String,
  },
});

module.exports = mongoose.model('expense',expenseSchema);

