var should = require('chai').should();
var blobs = require('../lib/truevault')('a-fake-key').blobs;

describe('blobs', function() {

  it('exists', function(){
    should.exist(blobs);
  });

});