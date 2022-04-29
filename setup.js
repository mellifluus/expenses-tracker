const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const routes = require('./app/routes/main');
const { dbSetup } = require('./db/dbSetup');
const { flashMessages } = require('./app/util/messageManager');
const { retrieveUserInfo } = require('./app/middlewares/retrieveUserInfo');

require('dotenv').config();

exports.appSetup = async () => {
  const app = express();

  const session = await dbSetup();

  app.set('trust proxy', 1);
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, '/public')));

  app.use(express.urlencoded({ extended: false }));

  // Request logging
  app.use(morgan('tiny'));

  // Serve favicon
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  app.use(session);
  app.use(retrieveUserInfo);
  app.use(flashMessages);

  app.use(routes);

  app.listen(Number(process.env.PORT) || 3000, () =>
    console.log(`App is listening on port ${Number(process.env.PORT) || 3000}.`)
  );

  return app;
};
