'use strict';

var Resource = require('../resource');
var util = require('util');

function Authorization() {
  Authorization.super_.apply(this, arguments);
}

util.inherits(Authorization, Resource);

// Login a user
//
// options.username – string(req’d) - username of active user
// options.password – string(req’d) - password of active user
// options.account_id – string(req’d) - account_id
// callback is optional, this method returns a q promise
Authorization.prototype.login = function(options, callback) {
  var path = util.format("/%s/auth/login",
    this.truevault.getOption('api_version')
  );

  var data = {
    username: options.username,
    password: options.password,
    account_id: options.account_id
  };

  return this.httpsRequest({
    path: path,
    method: 'POST',
    data: data,
    callback: callback
  });
};

// Logout a user, deactivating the associated ACCESS_TOKEN
//
// callback is optional, this method returns a q promise
Authorization.prototype.logout = function(options, callback) {
  var path = util.format("/%s/auth/logout",
    this.truevault.getOption('api_version')
  );

  return this.httpsRequest({
    path: path,
    method: 'POST',
    callback: callback
  });
};

module.exports = Authorization;