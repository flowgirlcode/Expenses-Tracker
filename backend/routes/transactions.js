const { addExpense, getExpense, deleteExpense, queryEx } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, queryIn } = require('../controllers/income');
const { monthIncome } = require('../controllers/monthIncome');
const { monthExpense } = require('../controllers/monthexp');

//const { addIncome } = require('../controllers/income');

const router = require('express').Router();

// router.get('/',(req,res)=>{
//     res.send('hello world')
//})
router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .get('/query-expense/',queryEx )
    .get('/query-incomes/',queryIn )
    .get('/month-expense/',monthExpense )
    .get('/month-incomes/',monthIncome )

    



module.exports = router