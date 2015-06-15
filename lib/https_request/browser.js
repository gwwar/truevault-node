var axios = require('axios');
var createError = require('../error');

// Performs an https request
//
// o.path - the url path
// o.method - GET, PUT, POST, DELETE
// o.data - form data
// o.decodeResponse - function that decodes a successful response
// o.contentType - override content type
module.exports = function(o) {
  function handleResponse(data) {
    if (o.decodeResponse && typeof data === 'string') {
      return o.decodeResponse(data);
    } else {
      return data.data || data;
    }
  }

  function handleError(response) {
    throw createError(response.status, JSON.stringify(response.data));
  }

  var url = 'https://' + this.truevault.getOption('host') + o.path;
  var headers = {
    'Authorization' : this.truevault.getOption('auth')
  };

  if (o.contentType) {
    headers['Content-Type'] = o.contentType;
  }

  var transformResponse = axios.defaults.transformResponse.concat([handleResponse]);

  var options = {
    url: url,
    method: o.method,
    headers: headers,
    data: o.data,
    transformResponse: transformResponse
  };

  return axios(options).catch(handleError);
};
