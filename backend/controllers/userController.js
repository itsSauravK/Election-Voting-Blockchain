const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const sendEmailProd = require('../utils/sendEmailProd');
const crypto = require('crypto');
const { send } = require('process');

//Access -> Admin
//Route -> /api/election/register
//Description -> Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
   const { name, email, eAddress } = req.body;
   if (!email) {
      res.status(200).json({
         success: false,
         message: `no email provided`,
      });
   }

   const user = await User.create({
      name,
      email,
      eAddress,
   });
   res.status(200).json({
      success: true,
      user,
   });
});

//Acess -> Everyone
//Route -> api/election/getUser
//Description -> Getting one user
exports.getUser = catchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.user._id);
   res.status(200).json({
      success: true,
      user,
   });
});

//Access -> Everyone
//Route -> /api/election/generateOtp
//Description -> Generating Otp to login
exports.generateOTP = catchAsyncError(async (req, res, next) => {
   const { email } = req.body;
   if (!email) {
      res.status(200).json({
         success: false,
         message: `no email provided`,
      });
   }

   //Finding user
   const user = await User.findOne({ email });

   if (!user) {
      return next(new ErrorHandler('Invalid Email', 404));
   }

   //Generating Otp
   const otp = user.getOtp();

   //saving otp in user
   await user.save({ validateBeforeSave: false });

   //Sending otp email
   const message = `Your otp to login is ${otp}. It will expire in 5 minutes`;
   try {
      if (process.env.NODE_ENV == 'production') {
         await sendEmailProd({
            to: user.email,
            subject: 'New Otp',
            html: `<p>${message}</p>`,
         });
      } else {
         await sendEmail({
            email: user.email,
            subject: 'New Otp',
            message,
         });
      }

      res.status(200).json({
         success: true,
         message: `Email sent to ${user.email}`,
      });
   } catch (error) {
      user.otp = undefined;
      user.otpExpire = undefined;
      await user.save({ validateBeforeSave: fasle });

      return next(new ErrorHandler('Internal Server Error', 500));
   }
});

//Login a user
//Access -> everyone
// api/election/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
   const { email, otp } = req.body;

   if (!email || !otp) {
      return next(new ErrorHandler('Please enter email and otp'));
   }

   //finding user in database
   const user = await User.findOne({
      email,
      otpExpire: { $gt: Date.now() },
   }).select('+otp');

   //console.log(user);
   // console.log(user.createdAt + "      " + user.otpExpire);
   if (!user) {
      return next(new ErrorHandler('Otp is invalid or expired or email id is wrong', 400));
   }

   //checking otp is correct or not
   const isOtpMatched = await user.compareOtp(otp);
   if (!isOtpMatched) {
      return next(new ErrorHandler('Invalid Email or otp', 401));
   }
   user.otp = null;
   sendToken(user, 200, res);
});

//Logout a user
//Access -> allusers
// api/election/logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
   res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
   });

   res.status(200).json({
      success: true,
      message: 'Logged out',
   });
});

//Get all users
//Access -> admin
// api/election/allUsers
exports.allUsers = catchAsyncError(async (req, res, next) => {
   const users = await User.find();

   res.status(200).json({
      success: true,
      users,
   });
});

//Vote a candidate
//Acess -> allusers
// api/election/vote
exports.vote = catchAsyncError(async (req, res, next) => {
   const userId = req.user._id;
   //  console.log(req.user._id);
   const newUserData = {
      hasVoted: true,
   };

   const user = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });

   res.status(200).json({
      success: true,
      user,
   });
});

//Delete a user
//Access -> admin
//api/election/delete/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.params.id);

   if (!user) {
      return next(new ErrorHandler(`User not found with id ${req.params.id}`));
   }

   await user.remove();

   res.status(200).json({
      success: true,
   });
});

//Edit user details
//Access -> user
//api/election/edit
exports.editUser = catchAsyncError(async (req, res, next) => {
   const userId = req.user._id;
   const { name, eAddress } = req.body;

   const newUserData = {
      name,
      eAddress,
   };
   const user = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });

   res.status(200).json({
      success: true,
      user,
   });
});
