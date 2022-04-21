exports.checkAuthenticated =
  (needsAuthentication, path) => (req, res, next) => {
    res.locals.isAuthenticated = typeof req.session.user !== 'undefined';

    if (
      (res.locals.isAuthenticated && !needsAuthentication) ||
      (!res.locals.isAuthenticated && needsAuthentication)
    ) {
      return res.redirect(path);
    }
    return next();
  };
