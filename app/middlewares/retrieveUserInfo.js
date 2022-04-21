exports.retrieveUserInfo = (req, res, next) => {
  res.locals.user = req.session.user;
  return next();
};
