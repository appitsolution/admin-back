const logger = (req, res, next) => {
  const { method, path } = req;
  console.log(`[${method}] path: ${path}`);
  next();
};
module.exports = logger;
