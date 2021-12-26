const express = require('express');
const app = express();

app.use(express.json());

//Importing routes
const users = require('./routes/user')

app.use('/api/election', users )

module.exports = app;
