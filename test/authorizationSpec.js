var should = require('chai').should();
var authorization = require('../lib/truevault')('a-fake-key').authorization;
var nock = require("nock");

describe('authorization', function() {
  it('exists', function() {
    should.exist(authorization);
  });

  it('logs user in', function() {
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

  it('logs user out', function() {
    nock('https://api.truevault.com').post('/v1/auth/logout')
      .reply(200, {});

    authorization.logout().then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();
  });

  it('verifies user', function() {
    nock('https://api.truevault.com').get('/v1/auth/me')
      .reply(200, {});

    authorization.verify().then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();
  });
});