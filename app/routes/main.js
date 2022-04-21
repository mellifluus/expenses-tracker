const router = require('express').Router();

const { render } = require('../middlewares/util');
const { checkAuthenticated } = require('../middlewares/checkAuthenticated');
const { retrieveUserInfo } = require('../middlewares/retrieveUserInfo');
const userRoutes = require('./user.routes');
const {
  unresolvedPathHandler,
  defaultErrorHandler,
} = require('../middlewares/error.handlers');

router.get('/', checkAuthenticated(false, '/home'), render('landing'));

router.get(
  '/home',
  checkAuthenticated(true, '/login'),
  retrieveUserInfo,
  render('homepage')
);

router.use(userRoutes);

router.use(unresolvedPathHandler);
router.use(defaultErrorHandler);

module.exports = router;
