'use strict';

var Resource = require('../resource');
var util = require('util');

function Schemas() {
  Schemas.super_.apply(this, arguments);
}

util.inherits(Schemas, Resource);


// Retrieves all schemas from the specified vault
//
// options.vault_id - vault uuid
// callback is optional, this method returns a q promise
Schemas.prototype.list = function(options, callback) {

  var path = util.format("/%s/vaults/%s/schemas",
    this.truevault.getOption('api_version'),
    options.vault_id
  );

  return this.httpsRequest({
    path : path,
    method : 'GET',
    callback : callback
  });

};

// Retrieves a schema from the specified vault
//
// options.vault_id - vault uuid
// options.id - schema uuid
// callback is optional, this method returns a q promise
Schemas.prototype.retrieve = function(options, callback) {

  var path = util.format("/%s/vaults/%s/schemas/%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    options.id
  );

  return this.httpsRequest({
    path : path,
    method : 'GET',
    callback : callback
  });

};

// Creates a schema in the specified vault
//
// options.vault_id - vault uuid
// options.schema - a javascript object
// callback is optional, this method returns a q promise
Schemas.prototype.create = function(options, callback) {
  var path = util.format("/%s/vaults/%s/schemas",
    this.truevault.getOption('api_version'),
    options.vault_id
  );
  var schema = JSON.stringify(options.schema);
  var encodedSchema = new Buffer(schema, 'utf8').toString('base64');
  var data = {
    schema : encodedSchema
  };

  return this.httpsRequest({
    path : path,
    method : 'POST',
    data : data,
    callback : callback
  });

};

// Updates a schema in the specified
//
// options.vault_id - vault uuid
// options.id - schema uuid
// options.schema - a javascript object
// options.schema_id - the schema uuid to index by (optional)
// callback is optional, this method returns a q promise
Schemas.prototype.update = function(options, callback) {
  var path = util.format("/%s/vaults/%s/schemas/%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    options.id
  );
  var schema = JSON.stringify(options.schema);
  var encodedSchema = new Buffer(schema, 'utf8').toString('base64');
  var data = {
    schema : encodedSchema
  };

  if(options.schema_id) {
    data.schema_id = schema_id;
  }

  return this.httpsRequest({
    path : path,
    method : 'PUT',
    data : data,
    callback : callback
  });

};

// Deletes a schema from the specified vault
//
// options.vault_id - vault uuid
// options.id - schema uuid
// callback is optional, this method returns a q promise
Schemas.prototype.del = function(options, callback) {

  var path = util.format("/%s/vaults/%s/schemas/%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    options.id
  );

  return this.httpsRequest({
    path : path,
    method : 'DELETE',
    callback : callback
  });

};

module.exports = Schemas;