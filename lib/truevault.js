'use strict';

var util = require('util');

TrueVault.DEFAULT_HOST = 'api.truevault.com';
TrueVault.DEFAULT_PORT = 443;
TrueVault.DEFAULT_API_VERSION = 'v1';

//A Simple Unofficial Client Library for TrueVault
function TrueVault(key) {

  //enable usage of TrueVault without new keyword
  if(!(this instanceof TrueVault)) {
    return new TrueVault(key);
  }

  //setup defaults
  this.options = {
    host : TrueVault.DEFAULT_HOST,
    port : TrueVault.DEFAULT_PORT,
    api_version : TrueVault.DEFAULT_API_VERSION,
    auth : null
  };

  this.setBasicAuth(key);
  this.loadResources();

}

TrueVault.prototype.setOption = function(key, value) {
  this.options[key] = value;
};

TrueVault.prototype.getOption = function(key) {
  return this.options[key];
};

TrueVault.prototype.getOptions = function() {
  return this.options;
};

TrueVault.prototype.setBasicAuth = function(key) {
  if(key) {
    //TrueVault only requires username (api key)
    var buffer = new Buffer(key + ':', 'utf8');
    this.setOption('auth', 'Basic ' + buffer.toString('base64'));
  }

};

var RESOURCES = require('./resources');

TrueVault.prototype.loadResources = function() {
  for(var resourceName in RESOURCES) {
    var ResourceClass = RESOURCES[resourceName];
    if(!this.hasOwnProperty(resourceName)) {
      this[resourceName] = new ResourceClass(this);
    }
  }
};

module.exports = TrueVault;
