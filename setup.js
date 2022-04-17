const express = require('express');
const morgan = require('morgan');
const routes = require('./app/routes/main');
const { dbSetup } = require('./db/dbSetup');

exports.appSetup = async () => {
  const app = express();

  const session = await dbSetup();

  app.set('trust proxy', 1);

  app.use(session);
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('tiny'));

  app.use(routes);

  app.listen(process.env.PORT || 3000, () =>
    console.log(`App is listening on port ${process.env.PORT || 3000}.`)
  );

  return app;
};
