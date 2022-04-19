const db = require('../../db/models');
const { sessionObject } = require('../util/sessionObject');

const { User } = db;

exports.login = (req, _res, next) => {
  const { username, password } = req.body;

  User.findByUsername(username)
    .then((user) => {
      if (user) {
        user.comparePassword(password).then((passwordMatches) => {
          if (passwordMatches) {
            req.session.user = sessionObject(user);
            return next();
          } else
            return next({ status: 401, msg: 'Wrong username or password' });
        });
      } else return next({ status: 401, msg: 'Wrong username or password' });
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
