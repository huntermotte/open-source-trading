const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('bodyParser').json();
const passport = require('passport');

const User = require('./models')
const router = express.Router();

router.use(jsonParser);

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
  if (!req.body) {
    return res.status(400).json({message: "No request body"});
  }

  if (!('username' in request body)) {
    return res.status(422).json({message: 'Missing field: username'});
  }

  let {username, password, firstName, lastName} = req.body;

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
      password: hash,
      firstName: firstName,
      lastName: lastName
    })
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'})
  });
});

router.get('/me',
  passport.authenticate('basic', {session: false}),
  (req, res) => res.json({user: req.user})
);


module.exports = {router};
