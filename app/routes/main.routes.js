const router = require('express').Router();

router.get('/', (_req, res, _next) => {
  return res.redirect('/home');
});

router.get('/home', (_req, res, _next) => {
  return res.render('homepage');
});

module.exports = router;
