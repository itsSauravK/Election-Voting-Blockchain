//Class error handler

class ErrorHandler extends Error {
   constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;

      //create stack property for object
      Error.captureStackTrace(this, this.constructor);
   }
}

module.exports = ErrorHandler;
