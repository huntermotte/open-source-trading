const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');

mongoose.Promise = global.Promise;

const app = express();

const {User} = require('./models');



const usersRouter = require('./usersRouter');

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.listen(process.env.PORT || 8080);

exports.app = app;
