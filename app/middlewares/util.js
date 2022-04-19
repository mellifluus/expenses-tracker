exports.redirect = (path) => (_req, res, _next) => res.redirect(path);

exports.render = (filename) => (_req, res, _next) => res.render(filename);
