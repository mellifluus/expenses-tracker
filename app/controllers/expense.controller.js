const db = require('../../db/models');

const { Expense } = db;

exports.addExpense = (req, res, next) => {
  const { amount, categoryId, date } = req.body;

  Expense.create({
    ...{ amount },
    ...{ categoryId },
    ...{ date },
    userId: res.locals.user.id,
  })
    .then(() => next())
    .catch(() => next({ status: 500, msg: 'Internal error' }));
};
