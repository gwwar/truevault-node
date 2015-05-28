'use strict';

var Resource = require('../resource');
var util = require('util');
var querystring = require('querystring');

function Users() {
  Users.super_.apply(this, arguments);
}

util.inherits(Users, Resource);

// Creates a user
//
// options.username – string(req’d) - username for the User being created
// options.password – string(req’d) - password for the User being created
// options.attributes – b64 string(optional) - base64 encoded JSON document
//                                                describing the User attributes
// options.schema_id – uuid(optional) - UUID of the Schema to associate the
//                                         attributes Document with
// callback is optional, this method returns a q promise
Users.prototype.create = function(options, callback) {
  var path = util.format("/%s/users",
    this.truevault.getOption('api_version')
  );

  var data = {
    username: options.username,
    password: options.password
  };

  if (options.attributes) {
    var attributes = JSON.stringify(options.attributes);
    data.attributes = new Buffer(attributes, 'utf8').toString('base64');
  }

  if (options.schema_id) {
    data.schema_id = options.schema_id;
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
Users.prototype.del = function(options, callback) {
  var path = util.format("/%s/users/%s",
    this.truevault.getOption('api_version'),
    options.id
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
Users.prototype.createAccessToken = function(options, callback) {
  var path = util.format("/%s/users/%s/access_token",
    this.truevault.getOption('api_version'),
    options.id
  );

  return this.httpsRequest({
    path: path,
    method: 'POST',
    callback: callback
  });
};

// Retrieve list of all users
// See https://docs.truevault.com/Users#list-all-users
// options:
//   status (string): (optional) returns active/deactivated users
//   modified (string): (optional) ???
//   full (boolean): (optional) returns only user attributes vs all
// callback: is optional, this method returns a q promise
Users.prototype.list = function(options, callback) {
  options = options || {};

  var query = querystring.stringify({
    status : options.status || 'ACTIVATED',
    full : options.full || false,
    modified : options.modified || ''
  });

  var path = util.format('/%s/users?%s',
    this.truevault.getOption('api_version'),
    query
  );

  return this.httpsRequest({
    path: path,
    method: 'GET',
    callback: callback
  });
};

module.exports = Users;
