module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;

  return res.status(statusCode).json({
    success: false,
    error: err.message || "Erro interno do servidor"
  });
};
