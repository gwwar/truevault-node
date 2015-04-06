var should = require('chai').should();
var users = require('../lib/truevault')('a-fake-key').users;

describe('users', function() {
  it('exists', function() {
    should.exist(users);
  });
});
