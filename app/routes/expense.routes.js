const router = require('express').Router();

const { checkAuthenticated } = require('../middlewares/checkAuthenticated');
const { redirect } = require('../middlewares/util');
const {
  addExpense,
  getExpenses,
} = require('../controllers/expense.controller');
const { validateExpenseInput } = require('../middlewares/validation');

router.post(
  '/create',
  checkAuthenticated(true, '/login'),
  validateExpenseInput,
  addExpense,
  redirect('/home')
);

router.post('/get', checkAuthenticated(true, '/login'), getExpenses);

module.exports = router;
