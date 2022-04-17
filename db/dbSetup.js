const db = require('./models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

exports.dbSetup = async () => {
  const ses = await session({
    secret: process.env.COOKIE_SECRET,
    store: new SequelizeStore({
      db: db.sequelize,
      tableName: 'session',
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 1000 * 60 * 60, // 1 hr
    },
  });

  db.sequelize.sync({ force: false });

  return ses;
};
