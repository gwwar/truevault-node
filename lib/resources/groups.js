'use strict';

var Resource = require('../resource');
var util = require('util');

function Groups() {
  Groups.super_.apply(this, arguments);
}

util.inherits(Groups, Resource);

// Create a Group with a name for the account with a policy.
//
// options.name – string(req'd) - new name for Group
// options.policy – object(optional) - new policy for Group, base64 encoded
// options.user_ids – string(optional) - comma separated list of user_id for
//                                       this update request
// callback is optional, this method returns a q promise
Groups.prototype.create = function(options, callback) {
  var path = util.format("/%s/groups",
    this.truevault.getOption('api_version')
  );

  var data = {
    name : options.name
  };

  data = buildGroupParams(data, options);

  return this.httpsRequest({
    path : path,
    method : 'POST',
    data : data,
    callback : callback
  });
};

// Updates a Group’s policy, name, and attached users
//
// options.name – string(optional) - new name for Group
// options.policy – object(optional) - new policy for Group, base64 encoded
// options.user_ids – string(optional) - comma separated list of user_id for
//                                       this update request
// options.operation – string(optional) - ‘APPEND’ or ‘REMOVE’ this group for
//                                        the provided list of user_id
// callback is optional, this method returns a q promise
Groups.prototype.update = function(options, callback) {
  var path = util.format("/%s/groups/%s",
    this.truevault.getOption('api_version'),
    options.id
  );

  var data = {
    name : options.name
  };

  data = buildGroupParams(data, options);

  return this.httpsRequest({
    path : path,
    method : 'PUT',
    data : data,
    callback : callback
  });
};

// Deletes a group and detaches the Group from all users.
//
// groupId - string(req’d)
// callback is optional, this method returns a q promise
Groups.prototype.delete = function(groupId, callback) {
  var path = util.format("/%s/groups/%s",
    this.truevault.getOption('api_version'),
    groupId
  );

  return this.httpsRequest({
    path : path,
    method : 'DELETE',
    callback : callback
  });
};

function buildGroupParams(data, options) {
  if (options.policy) {
    var policy = JSON.stringify(options.policy);
    data.policy = new Buffer(policy, 'utf8').toString('base64');
  }

  if (options.user_ids) {
    data.user_ids = options.user_ids.join(',');
  }

  if (options.operation) {
    data.operation = options.operation;
  }

  return data;
}
module.exports = Groups;
