const express = require('express');
const morgan = require('morgan');
const connectDB = require('./database/db');
const debug = require('debug')('app:app');

const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(morgan('tiny'));

//open mongoDB connection 
connectDB();

//routes
//creating user for registering users -- authentication purpose
app.use('/api/user', require('./routes/user'));
//quiz route
app.use('/api/quiz', require('./routes/quiz'));
//question route
app.use('/api/question', require('./routes/question'));


//Port No.
const port = process.env.PORT || 3000;

//listen at port
const server = app.listen(port, () => debug(`Listening on port ${port}...`));

module.exports = server;