const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');

mongoose.Promise = global.Promise;

const {User} = require('./models')
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// router.get('/', (req, res) => {
//   User.find(err, ideas) => {
//     if(err) => {
//       res.send(err)
//     }
//     res.send(ideas)
//   }
// });

// function loggedIn(req, res, next) {
//   if (req.user) {
//     next()
//   }
//   else {
//     console.log('Not the user');
//   }
// }

// router.post('/', (req, res) => {
//   console.log(req.user);
//   console.log(req.body);
//   if (!req.body) {
//     return res.status(400).json({message: "No request body"});
//   }
//
//   if (!('security' in req.body)) {
//     return res.status(422).json({message: 'Missing field: security'});
//   }
//
//   let {security, trade, description} = req.body;
//
//   if (!(trade)) {
//     return res.status(422).json({message: 'Missing field: trade'});
//   }
//
//   if (!(description)) {
//     return res.status(422).json({message: 'Missing field: description'});
//   }
//
//   // if (req.user) {
//
// return User
// .create({
//     ideas: [{security: req.body.security, trade: req.body.trade, description: req.body.description}]
// })
// .then(idea => {
//   console.log(idea)
//   res.json(idea);
// })
// .catch(err => {
//   console.log(err)
// })
// // }
// // else {
// //   console.log("User not authenticated");
// // }
//
// });

module.exports = router;
