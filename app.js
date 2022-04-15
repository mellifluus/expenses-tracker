const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const mainRoutes = require('./app/routes/main.routes');
const {
  unresolvedPathHandler,
  defaultErrorHandler,
} = require('./app/middlewares/error.handlers');

require('dotenv').config();

const app = express();

app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

// Request logging
app.use(morgan('tiny'));

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Routes
app.use(mainRoutes);
app.use(unresolvedPathHandler);
app.use(defaultErrorHandler);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App is listening on port ${process.env.PORT || 3000}.`)
);

module.exports = app;
