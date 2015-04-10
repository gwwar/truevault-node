var https = require('https');
var querystring = require('querystring');
var Q = require('q');

var createError = require('../error');

// Performs an https request
//
// TODO: update the wrapper to just use the request module if this
// gets more complicated
//
// o.path - the url path
// o.method - GET, PUT, POST, DELETE
// o.data - form data
// o.decodeResponse - function that decodes a successful response
// o.contentType - override content type
// o.callback - an optional callback
module.exports = function(o) {

  var options = {
    hostname : this.truevault.getOption('host'),
    port : this.truevault.getOption('port'),
    path : o.path,
    method : o.method,
    headers : {
      'Accept': 'application/json',
      'Authorization' : this.truevault.getOption('auth')
    }
  };

  var post_body = o.data;

  if(o.data && (!o.contentType || o.contentType === 'application/x-www-form-urlencoded')) {

    post_body = querystring.stringify(o.data);
    options.headers['Content-Length'] = Buffer.byteLength(post_body);
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  } else if(o.data && o.contentType === 'application/octet-stream') {

    post_body = o.data;
    if(post_body instanceof Buffer) {
      options.headers['Content-Length'] = post_body.length;
    } else {
      options.headers['Content-Length'] = Buffer.byteLength(post_body);
    }
    options.headers['Content-Type'] = 'application/octet-stream';

  }

  var deferred = Q.defer();

  var request = https.request(options, function trueVaultRequest(res) {
    var chunks = [];
    res.on('data', function trueVaultRequestSuccess(chunk) {
      chunks.push(chunk);
    });
    res.on('end', function trueVaultParseResponse() {
      //length of total buffers is optional, but it's suggested to provide it to avoid an additional loop
      var response = Buffer.concat(chunks, parseInt(res.headers && res.headers['content-length']) || undefined);
      if(res.statusCode === 200) {
        var decoded;
        if(o.decodeResponse) {
          decoded = o.decodeResponse(response);
        } else {
          response = response.toString('utf8');
          decoded = JSON.parse(response);
        }
        deferred.resolve(decoded);
      } else {
        var error = createError(res.statusCode, response.toString('utf8'));
        deferred.reject(error);
      }
    });
  });

  if(o.data) {
    request.write(post_body);
  }

  request.end();

  request.on('error', function trueVaultRequestError(e) {
    deferred.reject(e);
  });

  var promise = deferred.promise;

  if(o.callback) {
    promise.then(function callbackSuccess(value) {
      o.callback(null, value);
    }, function callbackError(e) {
      o.callback(e, null);
    });
  }

  return promise;
};
