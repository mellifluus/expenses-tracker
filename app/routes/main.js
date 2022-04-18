const router = require('express').Router();
const {
  unresolvedPathHandler,
  defaultErrorHandler,
} = require('../middlewares/error.handlers');

router.get('/', (_req, res, _next) => {
  return res.redirect('/home');
});

router.get('/home', (_req, res, _next) => {
  return res.render('homepage');
});

router.use(unresolvedPathHandler);
router.use(defaultErrorHandler);

module.exports = router;
