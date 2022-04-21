const router = require('express').Router();

const { usernameAvailable } = require('../middlewares/usernameAvailable');
const { checkAuthenticated } = require('../middlewares/checkAuthenticated');
const { register, login, logout } = require('../controllers/user.controller');
const { redirect, render } = require('../middlewares/util');
const {
  validateLoginInput,
  validateRegisterInput,
} = require('../middlewares/validation');

router.get('/login', checkAuthenticated(false, '/home'), render('login'));

router.post(
  '/login',
  checkAuthenticated(false, '/home'),
  validateLoginInput,
  login,
  redirect('/home')
);

router.get('/register', checkAuthenticated(false, '/home'), render('register'));

router.post(
  '/register',
  checkAuthenticated(false, '/home'),
  usernameAvailable,
  validateRegisterInput,
  register,
  redirect('/home')
);

router.get('/logout', checkAuthenticated(true, '/'), logout, redirect('/'));

module.exports = router;
