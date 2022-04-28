const router = require('express').Router();

const { checkAuthenticated } = require('../middlewares/checkAuthenticated');
const { redirect } = require('../middlewares/util');
const { addExpense } = require('../controllers/expense.controller');
const { validateExpenseInput } = require('../middlewares/validation');

router.post(
  '/create',
  checkAuthenticated(true, '/login'),
  validateExpenseInput,
  addExpense,
  redirect('/home')
);

module.exports = router;
