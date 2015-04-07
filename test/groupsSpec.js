var should = require('chai').should();
var groups = require('../lib/truevault')('a-fake-key').groups;

describe('groups', function() {
  it('exists', function() {
    should.exist(groups);
  });
});
