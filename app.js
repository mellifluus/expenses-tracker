const express = require('express');
const morgan = require('morgan');
const db = require('./db/models');
const mainRoutes = require('./app/routes/main.routes');
const {
  unresolvedPathHandler,
  defaultErrorHandler,
} = require('./app/middlewares/error.handlers');

require('dotenv').config();

db.sequelize.sync({ force: false });

const app = express();

app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.use(mainRoutes);
app.use(unresolvedPathHandler);
app.use(defaultErrorHandler);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App is listening on port ${process.env.PORT || 3000}.`)
);

module.exports = app;
