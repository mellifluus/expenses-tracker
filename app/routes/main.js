const router = require('express').Router();

const { render } = require('../middlewares/util');
const { checkAuthenticated } = require('../middlewares/checkAuthenticated');
const userRoutes = require('./user.routes');
const settingsRoutes = require('./settings.routes');
const expenseRoutes = require('./expense.routes');
const {
  unresolvedPathHandler,
  defaultErrorHandler,
} = require('../middlewares/error.handlers');

router.get('/', checkAuthenticated(false, '/home'), render('landing'));

router.get(
  '/home',
  checkAuthenticated(true, '/user/login'),
  render('homepage')
);

router.use('/user', userRoutes);
router.use('/settings', settingsRoutes);
router.use('/expense', expenseRoutes);

router.use(unresolvedPathHandler);
router.use(defaultErrorHandler);

module.exports = router;
