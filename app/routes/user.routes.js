const router = require('express').Router();

const { usernameCheck } = require('../middlewares/usernameCheck');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { createUser, login, logout } = require('../controllers/user.controller');
const { redirect } = require('../middlewares/util');

router.get('/login', login, redirect('/home'));
router.get('/logout', isLoggedIn, logout, redirect('/'));
router.get('/create', usernameCheck, createUser, redirect('/home'));

module.exports = router;
