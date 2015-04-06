'use strict';

var Resource = require('../resource');
var util = require('util');

function Users() {
  Users.super_.apply(this, arguments);
}

util.inherits(Users, Resource);

// Creates a user
//
// userParams.username – string(req’d) - username for the User being created
// userParams.password – string(req’d) - password for the User being created
// userParams.attributes – b64 string(optional) - base64 encoded JSON document
//                                                describing the User attributes
// userParams.schema_id – uuid(optional) - UUID of the Schema to associate the
//                                         attributes Document with
// callback is optional, this method returns a q promise
Users.prototype.create = function(userParams, callback) {
  var path = util.format("/%s/users",
    this.truevault.getOption('api_version')
  );

  var data = {
    username: userParams.username,
    password: userParams.password
  };

  if (userParams.attributes) {
    var attributes = JSON.stringify(userParams.attributes);
    data.attributes = new Buffer(attributes, 'utf8').toString('base64');
  }

  if (userParams.schema_id) {
    data.schema_id = userParams.schema_id;
  }

  return this.httpsRequest({
    path: path,
    method: 'POST',
    data: data,
    callback: callback
  });
};

// Deactivates a user: frees the associated username, all ACCESS_TOKENs,
// and removes user_id from all Groups.
//
// userId – string(req’d)
// callback is optional, this method returns a q promise
Users.prototype.delete = function(userId, callback) {
  var path = util.format("/%s/users/%s",
    this.truevault.getOption('api_version'),
    userId
  );

  return this.httpsRequest({
    path: path,
    method: 'DELETE',
    callback: callback
  });
};

// Vends a new ACCESS_TOKEN for user_id
//
// userId – string(req’d)
// callback is optional, this method returns a q promise
Users.prototype.createAccessToken = function(userId, callback) {
  var path = util.format("/%s/users/%s/access_token",
    this.truevault.getOption('api_version'),
    userId
  );

  return this.httpsRequest({
    path: path,
    method: 'POST',
    callback: callback
  });
};

module.exports = Users;
