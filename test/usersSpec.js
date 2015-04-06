var should = require('chai').should();
var users = require('../lib/truevault')('a-fake-key').users;
var nock = require("nock");

describe('users', function() {
  it('exists', function() {
    should.exist(users);
  });

  it('creates a user', function() {
    nock('https://api.truevault.com').post('/v1/users')
      .reply(200, {});

    users.create({
      username : 'username',
      password : 'password'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();
  });
});
