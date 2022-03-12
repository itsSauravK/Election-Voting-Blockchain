const express = require('express');
const app = express();
const connectDB = require('./config/database');

const dotenv = require('dotenv');
const User = require('./models/user');
const { deleteUser } = require('./controllers/userController');
const { emails } = require('./data/data');

const sendEmail = require('./utils/sendEmail');

//deleting all users
async function deleteUsers() {
   await User.deleteMany();
   console.log('all deleted');
   register();
}

//register new users
function register() {
   emails.forEach((email) => {
      registered(email);
   });
   console.log('users registered');
}

async function registered(email) {
   const user = await User.create(email);
   try {
      await sendEmail({
         email: user.email,
         subject: 'Election',
         message: 'Account has been registered',
      });
   } catch (error) {
      return next(new ErrorHandler('Internal Server Error', 500));
   }
}

//handle uncaught exceptions
process.on('uncaughtException', (err) => {
   console.log(`ERROR: ${err.stack}`);
   console.log('Server is being shutdown due to uncaught excpetion');
   process.exit(1);
});

//setting up config file
dotenv.config({ path: 'backend/config/config.env' });

//connecting to database

//Running functions

deleteUsers();

connectDB();

//Handling unhandled promise rejections
process.on('unhandledRejection', (err) => {
   console.log(`Error: ${err.message}`);
   console.log('Server is being shutdown due to unhandled promise rejection');
   server.close(() => {
      process.exit(1);
   });
});
