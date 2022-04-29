const db = require('../../db/models');
const { QueryTypes } = require('sequelize');

const { Expense, sequelize } = db;

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

exports.getExpenses = (req, res, _next) => {
  const { year, month } = req.body;

  if (!year || !month) return res.status(400).send();

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
