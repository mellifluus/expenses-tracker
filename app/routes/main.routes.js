const router = require('express').Router();

router.get('/', (req, res, next) => {
  return res.render('homepage');
});

module.exports = router;
