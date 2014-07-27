var should = require('chai').should();
var schemas = require('../lib/truevault')('a-fake-key').schemas;

describe('schemas', function() {

  it('exists', function(){
    should.exist(schemas);
  });

});