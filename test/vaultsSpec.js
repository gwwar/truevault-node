var should = require('chai').should();
var vaults = require('../lib/truevault')('a-fake-key').vaults;
var nock = require("nock");

describe('vaults', function() {
  it('exists', function() {
    should.exist(vaults);
  });

  it('lists vaults', function() {
    nock('https://api.truevault.com').get('/v1/vaults?page=1&per_page=50')
      .reply(200, {});

    vaults.list({
      page : '1',
      per_page : '50'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      should.not.exist(err);
    }).done();
  });

  it('creates a vault', function() {
    nock('https://api.truevault.com').post('/v1/vaults')
      .reply(200, {});

    vaults.create({
      name : 'vault-name'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      should.not.exist(err);
    }).done();
  });

  it('retrieves a vault', function() {
    nock('https://api.truevault.com').get('/v1/vaults/vault-id')
      .reply(200, {});

    vaults.retrieve({
      id : 'vault-id'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      should.not.exist(err);
    }).done();
  });

  it('updates a vault', function() {
    nock('https://api.truevault.com').put('/v1/vaults/vault-id')
      .reply(200, {});

    vaults.update({
      id : 'vault-id',
      name : 'vault-name',
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      should.not.exist(err);
    }).done();
  });

  it('deletes a vault', function() {
    nock('https://api.truevault.com').delete('/v1/vaults/vault-id')
      .reply(200, {});

    vaults.del({
      id: 'vault-id'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      should.not.exist(err);
    }).done();
  });
});
