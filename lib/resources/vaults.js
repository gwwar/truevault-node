'use strict';

var Resource = require('../resource');
var util = require('util');
var querystring = require('querystring');

function Vaults() {
  Vaults.super_.apply(this, arguments);
}

util.inherits(Vaults, Resource);

// Retrieves all Vaults authorized for the User.
//
// page – int(optional, default: 1) - page number in paginated response
// per_page – int(optional, default: 100) - results per page in paginated response
// callback is optional, this method returns a q promise
Vaults.prototype.list = function(options, callback) {

  var query = querystring.stringify({
    page : options.page || 1,
    per_page : options.per_page || 100
  });

  var path = util.format("/%s/vaults?%s",
    this.truevault.getOption('api_version'),
    query
  );

  return this.httpsRequest({
    path : path,
    method : 'GET',
    callback : callback
  });
};

// Create a Vault. Name must be unique for the account.
//
// options.name – string(req'd) - new name for Vault
// callback is optional, this method returns a q promise
Vaults.prototype.create = function(options, callback) {
  var path = util.format("/%s/vaults",
    this.truevault.getOption('api_version')
  );

  var data = {
    name : options.name
  };

  return this.httpsRequest({
    path : path,
    method : 'POST',
    data : data,
    callback : callback
  });
};

// Retrieve a Vault by ID. This will attempt to list out all
// Documents and Schemas associated with the Vault.
//
// options.id – string(req'd) - Vault ID
// callback is optional, this method returns a q promise
Vaults.prototype.retrieve = function(options, callback) {
  var path = util.format("/%s/vaults/%s",
    this.truevault.getOption('api_version'),
    options.id
  );

  return this.httpsRequest({
    path : path,
    method : 'GET',
    callback : callback
  });
};

// Updates a Vault
//
// options.id – string(req’d) - Vault ID
// name – string(optional) - new Vault name
// callback is optional, this method returns a q promise
Vaults.prototype.update = function(options, callback) {
  var path = util.format("/%s/vaults/%s",
    this.truevault.getOption('api_version'),
    options.id
  );

  var data = {
    name : options.name
  };

  return this.httpsRequest({
    path : path,
    method : 'PUT',
    data : data,
    callback : callback
  });
};

// Deletes an empty Vault by ID.
//
// options.id – string(req’d) - Vault ID
// callback is optional, this method returns a q promise
Vaults.prototype.del = function(options, callback) {
  var path = util.format("/%s/vaults/%s",
    this.truevault.getOption('api_version'),
    options.id
  );

  return this.httpsRequest({
    path : path,
    method : 'DELETE',
    callback : callback
  });
};

module.exports = Vaults;
