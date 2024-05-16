// exports.notFound = (req, res, next) => {
//   const error = new Error(`Not Found-${req.originalUrl}`);
//   next(error);
// };

exports.errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "provide correct id";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🤖" : err.stack,
  });
};
