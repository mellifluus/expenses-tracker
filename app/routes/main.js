const router = require('express').Router();

const { render } = require('../middlewares/util');
const { checkAuthenticated } = require('../middlewares/checkAuthenticated');
const { retrieveUserInfo } = require('../middlewares/retrieveUserInfo');
const userRoutes = require('./user.routes');
const settingsRoutes = require('./settings.routes');
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

router.use('/user', userRoutes);
router.use('/settings', settingsRoutes);

router.use(unresolvedPathHandler);
router.use(defaultErrorHandler);

module.exports = router;
