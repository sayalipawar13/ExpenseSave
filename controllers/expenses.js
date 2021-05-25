const expense = require("../models/expense");
const user=require("../models/user");

exports.getExpenses = async (req, res, next) => {
  try {
    const allExpenses = await expense.find();
    return res.status(200).json({
      success: true,
      data: allExpenses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.createExpense = async (req, res, next) => {
  try {
    const n={
      type:req.body.expense.type,
      amount:req.body.expense.amount,
      date:req.body.expense.date,
      category:req.body.expense.category,
      desc:req.body.expense.desc,
      owner:req.body.username
    }
    const item = new expense(
      n
    );
    const x=req.body.username;
    
    user.findOneAndUpdate({username:x},
      { $push: { expenses:  n} }
      )
    const result = await item.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Adding expense failed.Try Again",
    });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const allExpenses = await expense.findById(req.params.id);
    if (!allExpenses) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    await allExpenses.remove();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Deleting expense failed.Try Again",
    });
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const allExpenses = await expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // await allExpenses.updateOne()
    return res.status(200).json({
      success: true,
      data: allExpenses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Updating expense failed.Try Again",
    });
  }
};
