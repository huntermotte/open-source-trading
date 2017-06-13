const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {User} = require('./models')
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', (req, res) => {
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
      console.log(user)
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

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      console.log(user)
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	cookie: {}
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serializeUser being called', user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log('this is the user', user);
    done(err, user);
  });
});

router.get('/test', (req, res) => {
  console.log(req.user)
})

router.get('/me',
  passport.authenticate('local', { session: true }),
  function(req, res) {
    res.json(req.user);
  });

  router.get('/logout', function(req, res) {
  	req.session.destroy(function (err) {
  		if(err){
  			res.send(err);
  		}
  		res.json({loggedOut : true})
    	});
  })


module.exports = router;
