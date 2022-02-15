const ErrorHandler = require('../utils/errorHandler.js');

module.exports = (err, req, res, next) => {
   let statusCode = err.statusCode;
   statusCode = err.statusCode || 500;

   let error = { ...err };

   error.message = err.message || 'Internal server error';

   // Wrong mongoose object id error
   if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
   }

   //Handling validation error
   if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
   }

   //Handling duplicate key error. Registering with same email
   if (err.code == 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
   }

   //Handling wrong JWT token
   if (err.name === 'JsonWebTokenError') {
      const message = 'JSON Web Token is invalid. Try again';
      error = new ErrorHandler(message, 400);
   }

   //Expired JWT Token
   if (err.name === 'TokenExpiredError') {
      const message = 'JSON Web Token is expired. Try again';
      error = new ErrorHandler(message, 400);
   }

   res.status(statusCode).json({
      success: false,
      error: error,
      errMessage: error.message,
   });
};
