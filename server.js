const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');

mongoose.Promise = global.Promise;

const app = express();

mongoose.connect('mongodb://localhost:27017/open-source-trading');

const {User} = require('./models');

const usersRouter = require('./usersRouter');
const ideasRouter = require('./ideasRouter');

app.use(morgan('common'));
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/ideas', ideasRouter);
app.listen(process.env.PORT || 8080, () => console.log('Listening on Port 8080'));

exports.app = app;
