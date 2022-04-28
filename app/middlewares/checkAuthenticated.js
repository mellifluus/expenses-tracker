exports.checkAuthenticated =
  (needsAuthentication, path) => (req, res, next) => {
    if (
      (res.locals.isAuthenticated && !needsAuthentication) ||
      (!res.locals.isAuthenticated && needsAuthentication)
    ) {
      return res.redirect(path);
    }
    return next();
  };
