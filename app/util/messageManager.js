exports.storeMessages = (req, messages) => {
  for (const [id, value] of Object.entries(messages)) {
    (req.session.messages ??= {})[id] = value;
  }
};

exports.flashMessages = (req, res, next) => {
  if (req.session.messages) {
    for (const [id, value] of Object.entries(req.session.messages)) {
      (res.locals.messages ??= {})[id] = value;
    }
    delete req.session.messages;
  }
  return next();
};
