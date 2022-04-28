const router = require('express').Router();

const {
  updateIncome,
  deleteUser,
} = require('../controllers/settings.controller');
const { checkAuthenticated } = require('../middlewares/checkAuthenticated');
const { redirect, render } = require('../middlewares/util');
const {
  validateIncomeInput,
  validateDeleteInput,
} = require('../middlewares/validation');

router.get('/', checkAuthenticated(true, '/'), render('settings'));

router.post(
  '/income',
  checkAuthenticated(true, '/'),
  validateIncomeInput,
  updateIncome,
  redirect('/settings')
);

router.post(
  '/deleteUser',
  checkAuthenticated(true, '/'),
  validateDeleteInput,
  deleteUser,
  redirect('/')
);

module.exports = router;
