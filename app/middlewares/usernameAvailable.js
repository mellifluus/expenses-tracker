const db = require('../../db/models');
const { storeMessages } = require('../util/messageManager');

const { User } = db;

exports.usernameAvailable = (req, res, next) => {
  const { username } = req.body;

  User.findByUsername(username)
    .then((user) => {
      if (user) {
        storeMessages(req, { username: 'Username already taken' });
        return res.redirect('/register');
      } else return next();
    })
    .catch(() => {
      next({ status: 500, msg: 'Internal error' });
    });
};
