const db = require('../../db/models');
const { QueryTypes } = require('sequelize');
const { storeMessages } = require('../util/messageManager');

const { Expense, sequelize } = db;

exports.addExpense = (req, res, next) => {
  const { amount, categoryId, date } = req.body;

  Expense.create({
    ...{ amount },
    ...{ categoryId },
    ...{ date },
    userId: res.locals.user.id,
  })
    .then((newExpense) => {
      if (newExpense)
        storeMessages(req, { success: 'Successfully added expense' });
      else storeMessages(req, { error: 'Something went wrong' });
      return next();
    })
    .catch(() => next({ status: 500, msg: 'Internal error' }));
};

exports.getExpenses = (req, res, _next) => {
  const { year, month } = req.body;

  if (year === 'undefined' || month === 'undefined')
    return res.status(200).send({});

  sequelize
    .query(
      `SELECT "amount", "categoryId", "date" FROM expense WHERE "userId"='${
        res.locals.user.id
      }' AND date_part('year', "date")=${year} AND date_part('month', "date")${
        month == 13 ? ' BETWEEN 1 AND 12' : '=' + month
      }`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
};
