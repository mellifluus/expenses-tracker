const router = require('express').Router();

router.get('/', (req, res, next) => {
  return 'Hello';
});
module.exports = router;
