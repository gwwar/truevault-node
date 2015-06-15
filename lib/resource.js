'use strict';

function Resource(truevault) {
  this.truevault = truevault;
}

Resource.prototype.httpsRequest = require('./https_request');

module.exports = Resource;
