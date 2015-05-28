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

  it('deletes a user', function() {
    nock('https://api.truevault.com').delete('/v1/users/user-id')
      .reply(200, {});

    users.del({
      id: 'user-id'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();
  });

  it('creates an access token', function() {
    nock('https://api.truevault.com').post('/v1/users/user-id/access_token')
      .reply(200, {});

    users.createAccessToken({
      id: 'user-id'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();
  });

  it("returns the list of users", function() {
    nock('https://api.truevault.com')
      .get('/v1/users?status=ACTIVATED&full=true&modified=')
      .reply(200, {});

    users.list({
      status: "ACTIVATED",
      full: true
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      should.not.exist(err);
    }).done();
  });
});
