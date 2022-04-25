exports.unresolvedPathHandler = (_req, res, _next) => {
  return res.render('error');
};

exports.defaultErrorHandler = (err, _req, res, _next) => {
  return res.render('error', {
    status: err.status || 500,
    msg: err.msg || 'Something went wrong hehe :).',
  });
};
