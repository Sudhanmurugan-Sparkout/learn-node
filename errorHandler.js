const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    Message: err.message || "Internal Server Error",
    Status: err.status || 500,
  });
};
