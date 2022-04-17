const router = require('express').Router();
const {
  unresolvedPathHandler,
  defaultErrorHandler,
} = require('../middlewares/error.handlers');

router.get('/', (req, res, next) => res.send('Hello'));

router.use(unresolvedPathHandler);
router.use(defaultErrorHandler);

module.exports = router;
