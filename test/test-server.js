const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const should = chai.should();
const app = server.app;

chai.use(chaiHttp);

describe('index file', function() {
  it('is working properly', function() {
    chai.request(app)
    .get('/')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.html;
    });
  });
});
