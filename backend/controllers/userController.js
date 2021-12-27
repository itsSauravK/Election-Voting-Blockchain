const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const crypto = require('crypto');
const { send } = require('process');

exports.getUsers = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `this route will show all`
    })
}