const express = require('express');
const app = express();
const cors = require('cors');
const  cookieParser = require('cookie-parser');


const errorMiddleware = require('./middlewares/error');

app.use(cors({
    origin:['http://localhost:3000','http://127.0.0.1:3000'],
    credentials:true
}));
app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });
app.use(express.json());  //instead of body-parser
app.use(cookieParser());

//Importing routes
const users = require('./routes/user')
const routes = require('./routes/election')

app.use('/api/election', users )
app.use('/api/election', routes)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
