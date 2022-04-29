const db = require('../../db/models');
const { storeMessages } = require('../util/messageManager');
const { logout } = require('./user.controller');

const { User } = db;

exports.deleteUser = (req, res, next) => {
  User.destroy({
    where: { id: req.session.user.id },
  })
    .then((deleted) => {
      if (deleted) {
        return logout(req, res, next);
      } else {
        return next({ status: 500, msg: 'Internal error' });
      }
    })
    .catch(() => next({ status: 500, msg: 'Internal error' }));
};

exports.updateIncome = (req, _res, next) => {
  const { income } = req.body;

  User.findByPk(req.session.user.id)
    .then((user) => {
      if (user) {
        user.setIncome(parseFloat(income)).then(() => {
          storeMessages(req, { incomeSuccess: 'Income updated successfully.' });
          req.session.user.income = user.income;
          return next();
        });
      } else {
        return next({ status: 500, msg: 'Internal error' });
      }
    })
    .catch(() => next({ status: 500, msg: 'Internal error' }));
};
