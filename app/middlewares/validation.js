const { body, validationResult } = require('express-validator');
const { storeMessages } = require('../util/messageManager');

exports.validateLoginInput = async (req, res, next) => {
  await body('username', 'Please input a valid username.')
    .trim()
    .isLength({ min: 4, max: 30 })
    .run(req);

  await body('password', 'Please input a valid password.')
    .isLength({ min: 8 })
    .run(req);

  const result = Object.fromEntries(
    Object.entries(validationResult(req).mapped()).map(([key, val]) => [
      key,
      val.msg,
    ])
  );

  if (Object.keys(result).length) {
    storeMessages(req, result);
    return res.redirect('/login');
  } else return next();
};

exports.validateRegisterInput = async (req, res, next) => {
  await body('username', 'Username length must be between 4 and 30 characters.')
    .trim()
    .isLength({ min: 4, max: 30 })
    .run(req);

  await body(
    'password',
    'At least 1x uppercase letter, 1x digit, 1x symbol, 8 characters long.'
  )
    .isStrongPassword()
    .run(req);

  await body('confirm_password', "Passwords don't match")
    .equals(req.body.password)
    .run(req);

  const result = Object.fromEntries(
    Object.entries(validationResult(req).mapped()).map(([key, val]) => [
      key,
      val.msg,
    ])
  );

  if (Object.keys(result).length) {
    storeMessages(req, result);
    return res.redirect('/register');
  } else return next();
};
