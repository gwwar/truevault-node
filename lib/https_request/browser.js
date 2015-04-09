var reqwest = require('reqwest');

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

  var request = reqwest(options);

  request.then(function(response) {
    if (o.decodeResponse) {
      // TODO: fix this. response doesn't appear to have a content attribute
      return o.decodeResponse(response.content);
    } else {
      return response;
    }
  });
  //TODO: handle error and callback

  return request;
};

