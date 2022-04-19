exports.isLoggedIn = (req, _res, next) =>
  req.session.user ? next() : next({ status: 401, msg: 'User not logged in' });
