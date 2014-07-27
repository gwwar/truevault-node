var should = require('chai').should();
var truevault = require('../lib/truevault')('a-fake-key');

// TODO: needs mocks + spies

describe('truevault', function() {

  it('handles basic auth ', function() {
    truevault.getOption('auth').should.equal('Basic YS1mYWtlLWtleTo=');
  });

  it('defaults to https', function() {
    truevault.getOption('port').should.equal(443);
  });

  it('defaults to v1', function() {
    truevault.getOption('api_version').should.equal('v1');
  });

  it('host defaults to truevault', function() {
    truevault.getOption('host').should.equal('api.truevault.com');
  });

});