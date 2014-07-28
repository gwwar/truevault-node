var should = require('chai').should();
var truevault = require('../lib/truevault')('a-fake-key');
var nock = require("nock");

describe('documents', function() {

  it('exists', function(){
    should.exist(truevault.documents);
  });

  it('lists documents', function() {
    nock('https://api.truevault.com').get('/v1/vaults/my-vault-uuid/documents?page=1&full_document=false&per_page=50')
      .reply(200, '{}');

    truevault.documents.list({
      'vault_id':'my-vault-uuid',
      'per_page':50,
      'page':1,
      'full_document': false //true to return full documents vs uuids
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();
  });

  it('retrieves a document', function() {
    nock('https://api.truevault.com').get('/v1/vaults/vault-uuid/documents/document-uuid')
      .reply(200, 'eyJtZXNzYWdlIjoiV2UgbG92ZSB5b3VyIGN1cmlvc2l0eSEgIENvbWUgd29yayB3aXRoIHVzIGFuZCBsZXQncyBnbyBtYWtlIGluc2FuZWx5IGdyZWF0IHByb2R1Y3RzISIsImNvbnRhY3QiOiJoYWNrQHRydWV2YXVsdC5jb20ifQ==');

    truevault.documents.retrieve({
      vault_id : 'vault-uuid',
      id : 'document-uuid'
    }).then(function(value) {
      should.exist(value);
      value.message.should.equal("We love your curiosity!  Come work with us and let's go make insanely great products!");
      value.contact.should.equal("hack@truevault.com")
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('creates a document', function() {
    nock('https://api.truevault.com').post('/v1/vaults/vault-uuid/documents')
      .reply(200, '{}');

    truevault.documents.create({
      vault_id : 'vault-uuid',
      document : {"hello" : "world"}
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('updates a document', function() {
    nock('https://api.truevault.com').put('/v1/vaults/vault-uuid/documents/document-uuid')
      .reply(200, '{}');

    truevault.documents.update({
      vault_id : 'vault-uuid',
      id : 'document-uuid',
      document : {"hello" : "world"}
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('deletes a document', function() {
    nock('https://api.truevault.com').delete('/v1/vaults/vault-uuid/documents/document-uuid')
      .reply(200, '{}');

    truevault.documents.del({
      vault_id : 'vault-uuid',
      id : 'document-uuid'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('searches for documents', function() {

    nock('https://api.truevault.com').get('/v1/vaults/my-vault-uuid/?search_option=eyJmaWx0ZXIiOnsiZmlyc3QiOnsidHlwZSI6IndpbGRjYXJkIiwidmFsdWUiOiJIZWxsbyJ9fSwiY2FzZV9zZW5zaXRpdmUiOmZhbHNlLCJwYWdlIjoxLCJwZXJfcGFnZSI6MjAsImZpbHRlcl90eXBlIjoib3IiLCJmdWxsX2RvY3VtZW50IjpmYWxzZSwic2NoZW1hX2lkIjoibXktc2NoZW1hLXV1aWQifQ==')
      .reply(200, '{}');

    truevault.documents.search({
      'vault_id' : 'my-vault-uuid',
      'schema_id' : 'my-schema-uuid',
      'filter' : { 'first':
        {
          "type": "wildcard",
          "value": "Hello"
        }
      }
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });



});