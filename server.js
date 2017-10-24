const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');

mongoose.Promise = global.Promise;

const app = express();

mongoose.connect('mongodb://admin:admin@ds157631.mlab.com:57631/trading-ideas-database' || 'mongodb://localhost:27017/open-source-trading');

const {User} = require('./models');

const usersRouter = require('./usersRouter');
// const ideasRouter = require('./ideasRouter');

app.use(morgan('common'));
app.use(express.static('public'));
app.use('/users', usersRouter);
// app.use('/ideas', ideasRouter);
// app.listen(process.env.PORT || 8080, () => console.log('Listening on Port 8080'));

// function runServer() {
//   const port = process.env.PORT || 8080;
//   return new Promise((resolve, reject) => {
//     app.listen(port, () => {
//       console.log(`Your app is listening on port ${port}`);
//       resolve();
//     })
//     .on('error', err => {
//       reject(err);
//     });
//   });
// }

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

// get rid of app.listen and mongoose connect
