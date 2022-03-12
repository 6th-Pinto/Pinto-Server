export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const { message } = err;
  const timestamp = Date.now().toLocaleTimeString;
  const { path } = req;

  res.status(status).send({
    status,
    message,
    timestamp,
    path,
  });

  next();
};
