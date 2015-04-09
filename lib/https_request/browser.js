var reqwest = require('reqwest');
var createError = require('../error');
var Q = require('q');

// Performs an https request
//
// o.path - the url path
// o.method - GET, PUT, POST, DELETE
// o.data - form data
// o.decodeResponse - function that decodes a successful response
// o.contentType - override content type
// o.callback - an optional callback
module.exports = function(o) {
  var url = 'https://' + this.truevault.getOption('host') + o.path;
  var headers = {
    'Authorization' : this.truevault.getOption('auth')
  };
  var options = {
    url: url,
    method: o.method,
    headers: headers,
    data: o.data,
    contentType: o.contentType || 'application/x-www-form-urlencoded'
  };

  var deferred = Q.defer();

  function handleResponse(response) {
    if (o.decodeResponse && response.response) {
      deferred.resolve(o.decodeResponse(response.response));
    } else {
      deferred.resolve(response);
    }
  }

  options.success = handleResponse;
  options.error = function(err) {
    var error = createError(err.status, err.responseText);
    deferred.reject(error);
  };

  reqwest(options);

  var promise = deferred.promise;
  if (o.callback) {
    promise.then(function success(result) {
      return o.callback(null, result);
    }, function error(e) {
      return o.callback(e);
    });
  }

  return promise;
};
