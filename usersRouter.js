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

// create users
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
      res.json(user)
    })
});

// get users
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
	saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const isAuthenticated = (req, res, next) => {
  if(req.user) {
    next()
  }
  else {
  res.redirect('/')
}
}

// create new ideas on user schema
router.put('/ideas', isAuthenticated, (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: "No request body"});
  }

  if (!('security' in req.body)) {
    return res.status(422).json({message: 'Missing field: security'});
  }

  let {security, trade, description, id, created} = req.body;

  if (!(trade)) {
    return res.status(422).json({message: 'Missing field: trade'});
  }

  if (!(description)) {
    return res.status(422).json({message: 'Missing field: description'});
  }

return User
.findByIdAndUpdate(
  req.user._id,
  {$push: {"ideas": req.body}},
  (err) => {
    if(err) {
      res.send(err)
    }
    User.findById(req.user._id, (err, user) => {
      if(err) {
        res.send(err)
      }
      res.json(user)
    })
  })
  res.json(user)
});

// get ideas
router.get('/ideas', isAuthenticated, (req, res) => {
  User.findById(req.user._id, (err, ideas) => {
    if(err) {
      res.send(err)
    }
    res.json(ideas)
  });
});

// delete ideas
router.post('/ideas/delete', isAuthenticated, (req, res) => {
  let {ideaID} = req.body;
  User.findByIdAndUpdate(req.user._id,
     {$pull: {"ideas": {id: req.body.ideaID}}},
     {new: true})
     .then(updatedIdea => res.json({user: updatedIdea}))
     .catch(err => res.send(err))
});

// get ideas from other users for explore page-header
router.get('/ideas/explore', (req, res) => {
  User.find({}).sort({ideas[0].created: 'desc'})
  .then(users => {
    res.json({users: users.map(
      (user) => user.createExample())
    });
  })
  .catch(err => {
    console.log(err)
    res.json({message: 'Internal server error'})
  });
});

// login endpoint
router.get('/me',
  passport.authenticate('local', { session: true }),
  function(req, res) {
    res.json(req.user);
  });

// logout endpoint
  router.get('/logout', function(req, res) {
  	req.session.destroy(function (err) {
  		if(err){
  			res.send(err);
  		}
  		res.json({loggedOut : true})
    	});
  })


module.exports = router;
