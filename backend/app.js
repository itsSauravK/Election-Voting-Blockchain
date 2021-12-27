const express = require('express');
const app = express();

const  cookieParser = require('cookie-parser');


const errorMiddleware = require('./middlewares/error');

app.use(express.json());  //instead of body-parser
app.use(cookieParser());

//Importing routes
const users = require('./routes/user')

app.use('/api/election', users )


//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
