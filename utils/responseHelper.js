// utils/responseHelper.js
const successResponse = (res, message, data = null, statusCode = 200) => {
    res.status(statusCode).json({
      message,
      data,
    });
  };
  
  const errorResponse = (res, message, error = null, statusCode = 400) => {
    res.status(statusCode).json({
      message,
      error,
    });
  };
  
  module.exports = { successResponse, errorResponse };
  