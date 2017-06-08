const {BasicStrategy} = require('passport-http');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {User} = require('./models')
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const basicStrategy = new BasicStrategy((username, password, callback) => {
  let user;
  User
    .findOne({username: username})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user)
      }
    });
});

passport.use(basicStrategy);
router.use(passport.initialize());

router.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.body.username);
  if (!req.body) {
    return res.status(400).json({message: "No request body"});
  }

  if (!('username' in req.body)) {
    return res.status(422).json({message: 'Missing field: username'});
  }

  let {username, password} = req.body;

  if (typeof username !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: username'});
  }

  username = username.trim();
  if (username === '') {
    return res.status(422).json({message: 'Incorrect field length: username'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }
  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  return User
  .find({username})
  .count()
  .exec()
  .then(count => {
    if (count > 0) {
      return res.status(422).json({message: 'Username already taken'});
    }

  return User.hashPassword(password)
  })
  .then(hash => {
     return User
    .create({
      username: username,
      password: hash
    })
  })
    .then(user => {
      res.json(user)
    })
});

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if(err) {
      res.send(err)
    }

    res.json(users)
  });
});

router.get('/me',
  // passport.authenticate('basic', {session: false}),
  (req, res) => res.json({user: req.user})
);


module.exports = router;
