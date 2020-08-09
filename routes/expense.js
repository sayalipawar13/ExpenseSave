const express = require('express');
const router =express.Router();
const {getExpenses,createExpense,deleteExpense,updateExpense}= require('../controllers/expenses');

router.get('/expenseList',getExpenses);

router.post('/createExpense',createExpense);

router.delete('/delete/:id',deleteExpense);

router.patch('/update/:id',updateExpense);



module.exports = router;