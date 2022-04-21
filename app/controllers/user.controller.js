const db = require('../../db/models');
const { storeMessages } = require('../util/messageManager');
const { sessionObject } = require('../util/sessionObject');

const { User } = db;

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  User.findByUsername(username)
    .then((user) => {
      if (user) {
        user.comparePassword(password).then((passwordMatches) => {
          if (passwordMatches) {
            req.session.user = sessionObject(user);
            return next();
          } else {
            storeMessages(req, { wrongLogin: 'Wrong username or password' });
            return res.redirect('/login');
          }
        });
      } else {
        storeMessages(req, { wrongLogin: 'Wrong username or password' });
        return res.redirect('/login');
      }
    })
    .catch(() => next({ status: 500, msg: 'Internal error' }));
};

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid', { path: '/' });
  return next();
};

exports.createUser = (req, _res, next) => {
  const { username, password } = req.body;
  const newUser = User.build({ ...{ username } });

  newUser
    .setPassword(password)
    .then(() =>
      newUser.save().then(() => {
        req.session.user = sessionObject(newUser);
        return next();
      })
    )
    .catch(() => next({ status: 500, msg: 'Internal error' }));
};
