var should = require('chai').should();
var blobs = require('../lib/truevault')('a-fake-key').blobs;
var nock = require("nock");

describe('blobs', function() {

  it('exists', function(){
    should.exist(blobs);
  });

  it('retrieves a blob', function() {
    nock('https://api.truevault.com').get('/v1/vaults/vault-uuid/blobs/blob-uuid')
      .reply(200, new Buffer('some fake blob', 'utf8'));

    blobs.retrieve({
      vault_id: 'vault-uuid',
      id: 'blob-uuid'
    }).then(function (value) {
      should.exist(value);
      value.toString('utf8').should.equal('some fake blob');
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();
  });

  it('creates a blob', function() {
    nock('https://api.truevault.com').post('/v1/vaults/vault-uuid/blobs')
      .reply(200, {});

    blobs.create({
      vault_id: 'vault-uuid',
      blob: new Buffer('some fake blob', 'utf8')
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('updates a blob', function() {
    nock('https://api.truevault.com').put('/v1/vaults/vault-uuid/blobs/blob-uuid')
      .reply(200, {});

    blobs.update({
      vault_id: 'vault-uuid',
      id : 'blob-uuid',
      blob: new Buffer('some fake blob', 'utf8')
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('deletes a blob', function() {
    nock('https://api.truevault.com').delete('/v1/vaults/vault-uuid/blobs/blob-uuid')
      .reply(200, {});

    blobs.del({
      vault_id: 'vault-uuid',
      id : 'blob-uuid'
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });


});