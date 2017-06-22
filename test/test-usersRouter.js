const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../usersRouter.js');
const should = chai.should();
const app = server.app;

chai.use(chaiHttp);

describe('POST endpoint', function() {
  it('should create new users', function() {
    
  })
})
