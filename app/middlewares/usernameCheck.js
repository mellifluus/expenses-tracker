const db = require('../../db/models');

const { User } = db;

exports.usernameCheck = (req, _res, next) => {
  const { username } = req.body;

  User.findByUsername(username)
    .then((user) =>
      user ? next({ status: 409, msg: 'Username already taken' }) : next()
    ) // flash message and redirect to register instead
    .catch(() => next({ status: 500, msg: 'Internal error' }));
};
