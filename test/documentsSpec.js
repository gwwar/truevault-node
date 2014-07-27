var should = require('chai').should();
var documents = require('../lib/truevault')('a-fake-key').documents;

describe('documents', function() {

  it('exists', function(){
    should.exist(documents);
  });

});