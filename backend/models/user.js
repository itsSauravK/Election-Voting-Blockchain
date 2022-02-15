const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [30, 'Your name cannot exceed 30 characters'],
   },
   email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter valid email address'],
   },
   otp: {
      type: String,
      select: false,
   },
   otpExpire: String,
   role: {
      type: String,
      default: 'user',
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   hasVoted: {
      type: Boolean,
      default: false,
   },
   eAddress: {
      type: String,
      required: [true, 'Ethereum account address needed'],
      unique: true,
   },
   electionOngoing: {
      type: Boolean,
      default: false,
   },
});

//Encrypting otp

userSchema.pre('save', async function (next) {
   if (!this.isModified('otp')) {
      next();
   }

   this.otp = await bcrypt.hash(this.otp, 10);
});

//Compare user password
userSchema.methods.compareOtp = async function (enteredOtp) {
   // console.log(crypto.createHash('sha256').update(enteredOtp).digest('hex')+ "  "+ this.otp);
   return await bcrypt.compare(enteredOtp, this.otp);
   //return enteredOtp == this.otp;
};

// Return jsonwebtoken
userSchema.methods.getJwtToken = function () {
   return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
   }); //store id as paylod
};

//Generate OTP
userSchema.methods.getOtp = function () {
   //genereate otp
   this.otp = crypto.randomBytes(5).toString('hex');

   //hashing the otp
   //this.otp = crypto.createHash('sha256').update(newOtp).digest('hex');
   //this.otp = newOtp;
   //set otp expire time
   this.otpExpire = Date.now() + 5 * 60 * 1000; //5mins
   return this.otp;
};

module.exports = mongoose.model('User', userSchema);
