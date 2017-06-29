const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server.js')

// const server = require('../usersRouter.js');
const should = chai.should();
// const app = server.app;

chai.use(chaiHttp);

describe('User', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should create new users on POST', function() {
    const newUser = {username: 'dean', password: 'smith'};
    return chai.request(app)
    .post('/users')
    .send(newUser)
    .then(function(res) {
      res.should.be.json;
      res.body.should.include.keys('username', 'password');
    });
  });

  it('should get our users on GET', function() {
    return chai.request(app)
    .get('/users')
    .then(function(res) {
      res.should.be.json;
      res.body.length.should.be.at.least(1);
    });
  });

  it('should create new ideas on user schema', function() {
    const newIdea = {
      security: 'stockName',
      trade: 'trade',
      description: 'generic description'
    };
    return chai.request(app)
    .put('/users/ideas')
    .send(newIdea)
    .then(function(res) {
      res.should.be.json;
      res.body.should.include.keys('security', 'trade', 'description');
    });
  });

  it('should get all ideas on GET', function() {
    return chai.request(app)
    .get('/users/ideas')
    .then(function(res) {
      res.should.be.json;
    });
  });

  it('should get ideas for explore page', function() {
    return chai.request(app)
    .post('/users/ideas/explore')
    .then(function(res) {
      res.should.be.json;
      res.body.length.should.be.at.least(1);
    });
  });

});
