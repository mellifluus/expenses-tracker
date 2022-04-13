exports.unresolvedPathHandler = (_req, res, _next) => {
  return res.status(404).send('Path not found');
};

exports.defaultErrorHandler = (err, _req, res, _next) => {
  if (!err.status) console.log(err);
  return res
    .status(err.status || 500)
    .send(err.msg || 'Something went wrong hehe :).');
};
