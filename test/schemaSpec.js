var should = require('chai').should();
var schemas = require('../lib/truevault')('a-fake-key').schemas;
var nock = require("nock");

describe('schemas', function() {

  it('exists', function(){
    should.exist(schemas);
  });

  it('retrieves a schema', function() {
    nock('https://api.truevault.com').get('/v1/vaults/vault-uuid/schemas/schema-uuid')
      .reply(200, {});

    schemas.retrieve({
      vault_id: 'vault-uuid',
      id : 'schema-uuid'
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('lists schemas', function() {
    nock('https://api.truevault.com').get('/v1/vaults/vault-uuid/schemas')
      .reply(200, {});

    schemas.list({
      vault_id: 'vault-uuid',
      id : 'schema-uuid'
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('lists documents in schemas', function() {
    nock('https://api.truevault.com').get('/v1/vaults/vault-uuid/schemas/schema-uuid/documents?page=1&full=false&per_page=50')
      .reply(200, {});

    schemas.listDocuments({
      vault_id: 'vault-uuid',
      id : 'schema-uuid',
      per_page:50,
      page:1,
      full: false //true to return full documents vs uuids
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('creates a schema', function() {
    nock('https://api.truevault.com').post('/v1/vaults/vault-uuid/schemas')
      .reply(200, {});

    schemas.create({
      vault_id: 'vault-uuid',
      schema : {
        "name":"test",
        "fields":[
          {
            "name":"first",
            "index":true,
            "type" : "string"
          }
        ]
      }
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('updates a schema', function() {
    nock('https://api.truevault.com').put('/v1/vaults/vault-uuid/schemas/schema-uuid')
      .reply(200, {});

    schemas.update({
      vault_id: 'vault-uuid',
      id : 'schema-uuid',
      schema : {
        "name":"test",
        "fields":[
          {
            "name":"first",
            "index":true,
            "type" : "string"
          }
        ]
      }
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

  it('delete a schema', function() {
    nock('https://api.truevault.com').delete('/v1/vaults/vault-uuid/schemas/schema-uuid')
      .reply(200, {});

    schemas.del({
      vault_id: 'vault-uuid',
      id : 'schema-uuid'
    }).then(function (value) {
      should.exist(value);
    }, function (err) {
      //if we get here, this should fail
      should.not.exist(err);
    }).done();

  });

});
