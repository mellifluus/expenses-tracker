const router = require('express').Router();

const { redirect, render } = require('../middlewares/util');
const userRoutes = require('./user.routes');
const {
  unresolvedPathHandler,
  defaultErrorHandler,
} = require('../middlewares/error.handlers');

router.get('/', redirect('/home'));
router.get('/home', render('homepage'));

router.use(userRoutes);

router.use(unresolvedPathHandler);
router.use(defaultErrorHandler);

module.exports = router;
