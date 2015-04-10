var should = require('chai').should();
var authorization = require('../lib/truevault')('a-fake-key').authorization;
var nock = require("nock");

describe('authorization', function() {
  it('exists', function() {
    should.exist(authorization);
  });

  it('logs in a user', function() {
    nock('https://api.truevault.com').post('/v1/auth/login')
      .reply(200, {});

    authorization.login({
      username : 'username',
      password : 'password',
      account_id: 'account_id'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();
  });
});