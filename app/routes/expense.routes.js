const router = require('express').Router();

const { checkAuthenticated } = require('../middlewares/checkAuthenticated');
const { redirect } = require('../middlewares/util');
const { addExpense } = require('../controllers/expense.controller');
const { validateExpenseInput } = require('../middlewares/validation');
const { retrieveUserInfo } = require('../middlewares/retrieveUserInfo');

router.post(
  '/create',
  checkAuthenticated(true, '/login'),
  retrieveUserInfo,
  validateExpenseInput,
  addExpense,
  redirect('/home')
);

module.exports = router;
