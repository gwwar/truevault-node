var should = require('chai').should();
var groups = require('../lib/truevault')('a-fake-key').groups;
var nock = require("nock");

describe('groups', function() {
  it('exists', function() {
    should.exist(groups);
  });

  it('creates a group', function() {
    nock('https://api.truevault.com').post('/v1/groups')
      .reply(200, {});

    groups.create({
      'name' : 'group-name',
      'policy' : {
        'Resources' : [
          'Vault::'
        ],
        'Activities' : 'CRUDA'
      },
      'user_ids' : '1,2,3'
    }).then(function(value) {
      should.exist(value);
    }, function(err) {
      should.not.exist(err);
    }).done();
  });
});
