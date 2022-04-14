const router = require('express').Router();

router.get('/', (req, res, next) => {
  return res.render('homepage', {
    user: 'Massi',
  });
});

module.exports = router;
