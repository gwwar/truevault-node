'use strict';

var Resource = require('../resource');
var util = require('util');


function Blobs() {
  Blobs.super_.apply(this, arguments);
}

util.inherits(Blobs, Resource);


// Retrieves a blob from the specified vault
//
// options.vault_id - vault uuid
// options.id - blob uuid,
// callback is optional, this method returns a q promise
Blobs.prototype.retrieve = function(options, callback) {

  var blob = options.id;

  var decodeResponse = function(response) {
    return response;
  };

  var path = util.format("/%s/vaults/%s/blobs/%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    blob
  );

  return this.httpsRequest({
    path : path,
    method : 'GET',
    decodeResponse : decodeResponse,
    callback : callback
  });

};

//TODO: add support for streams

// Creates a blob in the specified vault
//
// options.vault_id - vault uuid
// options.blob - a Buffer or String
// callback is optional, this method returns a q promise
Blobs.prototype.create = function(options, callback) {
  var path = util.format("/%s/vaults/%s/blobs",
    this.truevault.getOption('api_version'),
    options.vault_id
  );

  var data = options.blob;

  //TODO: is blob_filename based off of file metadata or
  //can this also accept a multipart post?

  return this.httpsRequest({
    path : path,
    method : 'POST',
    contentType : 'application/octet-stream',
    data : data,
    callback : callback
  });

};

// Updates a blob in the specified vault
//
// options.vault_id - vault uuid
// options.id - blob uuid
// options.blob - a Buffer or String
// callback is optional, this method returns a q promise
Blobs.prototype.update = function(options, callback) {
  var path = util.format("/%s/vaults/%s/blobs/%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    options.id
  );

  var data = options.blob;

  return this.httpsRequest({
    path : path,
    method : 'PUT',
    contentType : 'application/octet-stream',
    data : data,
    callback : callback
  });

};

// Deletes a blob from the specified vault
//
// options.vault_id - vault uuid
// options.id - blob uuid
// callback is optional, this method returns a q promise
Blobs.prototype.del = function(options, callback) {

  var path = util.format("/%s/vaults/%s/blobs/%s",
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

module.exports = Blobs;