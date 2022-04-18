const Sequelize = require('sequelize');
const User = require('./user');
const Expense = require('./expense');
const Session = require('./session');

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: console.log,
    ssl: false,
  }
);

// To make sure the interface to generate UUID exists
sequelize
  .getQueryInterface()
  .sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

const db = {
  User: User(sequelize, Sequelize.DataTypes),
  Expense: Expense(sequelize, Sequelize.DataTypes),
  Session: Session(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((model) => {
  if ('associate' in db[model]) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
