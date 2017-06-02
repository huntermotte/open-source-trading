const express = require('express');
const jsonParser = require('bodyParser').json();

const Idea = require('./models')
const router = express.Router();

mongoose.Promise = global.Promise;

router.use(jsonParser);

router.get('/', (req, res) => {
  Idea.find(err, ideas) => {
    if(err) => {
      res.send(err)
    }
    res.send(ideas)
  }
});

router.post('/', (req, res) => {
  const requiredFields = ['security', 'trade', 'description'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(requiredFields in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.log(message);
      return res.status(400).send(message)
    }
  }
const newIdea = new Idea()

newIdea.security = req.body.security
newIdea.trade = req.body.trade
newIdea.description = req.body.description

newIdea.save((err, record) => {
  if(err) {
    res.send(err)
  }
  res.json(record)
});
});
