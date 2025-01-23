const successResponse = (res, message, data = null, statusCode = 200) => {
  // ✅ Ensure statusCode is always a valid number between 100-599
  const validStatus = Number.isInteger(statusCode) && statusCode >= 100 && statusCode <= 599 ? statusCode : 200;
  
  res.status(validStatus).json({
    message,
    data,
  });
};

const errorResponse = (res, message, error = null, statusCode = 400) => {
  // ✅ Ensure statusCode is always a valid number between 100-599
  const validStatus = Number.isInteger(statusCode) && statusCode >= 100 && statusCode <= 599 ? statusCode : 400;

  res.status(validStatus).json({
    message,
    error,
  });
};
  
  module.exports = { successResponse, errorResponse };
  