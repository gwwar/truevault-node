'use strict';

var Resource = require('../resource');
var util = require('util');
var querystring = require('querystring');


function Documents() {
  Documents.super_.apply(this, arguments);
}

util.inherits(Documents, Resource);

// Lists the available document in a store
//
// options.vault_id - vault uuid
// options.page - which page (default 1)
// options.per_page - items per page (default 100)
// options.full - (default false)
// callback is options, this method retuns a q promise
Documents.prototype.list = function(options, callback) {

  var query = querystring.stringify({
    page : options.page || 1,
    full : options.full || false,
    per_page : options.per_page || 100
  });

  var path = util.format("/%s/vaults/%s/documents?%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    query
  );

  return this.httpsRequest({
    path : path,
    method : 'GET',
    callback : callback
  });
};

// Retrieves a document from the specified vault
//
// options.vault_id - vault uuid
// options.id - document uuid, or a list of ids (multi-get)
// callback is optional, this method returns a q promise
Documents.prototype.retrieve = function(options, callback) {

  var document = options.id;

  var decodeResponse = function(response) {
    response = response.toString('utf8');
    var decoded = new Buffer(response, 'base64').toString('utf8');
    return JSON.parse(decoded);
  };

  if(util.isArray(document)) {
    document = document.join(",");
    decodeResponse = function(response) {
      response = response.toString('utf8');
      var data = JSON.parse(response);
      for(var i=0; i<data.documents.length; i++) {
        var d = data.documents[i].document;
        d = new Buffer(d,'base64').toString('utf8');
        d = JSON.parse(d);
        data.documents[i].document = d;
      }
      return data;
    }
  }

  var path = util.format("/%s/vaults/%s/documents/%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    document
  );

  return this.httpsRequest({
    path : path,
    method : 'GET',
    decodeResponse : decodeResponse,
    callback : callback
  });

};

// Creates a document in the specified vault
//
// options.vault_id - vault uuid
// options.document - a javascript object
// options.schema_id - schema to index against
// callback is optional, this method returns a q promise
Documents.prototype.create = function(options, callback) {
  var path = util.format("/%s/vaults/%s/documents",
    this.truevault.getOption('api_version'),
    options.vault_id
  );
  var document = JSON.stringify(options.document);
  var encodedDocument = new Buffer(document, 'utf8').toString('base64');
  var data = {
    document : encodedDocument
  };

  if(options.schema_id) {
    data.schema_id = options.schema_id;
  }

  return this.httpsRequest({
    path : path,
    method : 'POST',
    data : data,
    callback : callback
  });

};

// Updates a document in the specified vault
//
// options.vault_id - vault uuid
// options.id - document uuid
// options.document - a javascript object
// options.schema_id - the schema uuid to index by (optional)
// callback is optional, this method returns a q promise
Documents.prototype.update = function(options, callback) {
  var path = util.format("/%s/vaults/%s/documents/%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    options.id
  );
  var document = JSON.stringify(options.document);
  var encodedDocument = new Buffer(document, 'utf8').toString('base64');
  var data = {
    document : encodedDocument
  };

  if(options.schema_id) {
    data.schema_id = options.schema_id;
  }

  return this.httpsRequest({
    path : path,
    method : 'PUT',
    data : data,
    callback : callback
  });

};

// Deletes a document from the specified vault
//
// options.vault_id - vault uuid
// options.id - document uuid
// callback is optional, this method returns a q promise
Documents.prototype.del = function(options, callback) {

  var path = util.format("/%s/vaults/%s/documents/%s",
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

// Searches a vault for a set of documents
//
// options.vault_id - the vault uuid
// options.schema_id - the schema uuid the document is indexed against
// option.filter - js object of field filters
// option.case_sensitive - true or false
// option.page - an integer of the page results you want
// option.per_page - an inter of the number of results you want from each page
// option.filter_type - a string specifying the filter type
// option.full_document - boolean (id vs full obj)
// option.sort - An object of field name and sort directions.
Documents.prototype.search = function(options, callback) {

  var searchOption = {
    filter : options.filter,
    case_sensitive : options.case_sensitive || false,
    page : options.page || 1,
    per_page : options.per_page || 20,
    filter_type : options.filter_type || 'or',
    full_document : options.full_document || false
  };

  if(options.schema_id) {
    searchOption.schema_id = options.schema_id;
  }

  if(options.sort) {
    searchOption.sort = options.sort;
  }

  var encoded = new Buffer(JSON.stringify(searchOption), 'utf8').toString('base64');

  var path = util.format("/%s/vaults/%s/?search_option=%s",
    this.truevault.getOption('api_version'),
    options.vault_id,
    encoded
  );

  return this.httpsRequest({
    path : path,
    method : 'GET',
    callback : callback
  });

};

module.exports = Documents;
