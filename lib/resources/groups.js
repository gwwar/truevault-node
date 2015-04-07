'use strict';

var Resource = require('../resource');
var util = require('util');

function Groups() {
  Groups.super_.apply(this, arguments);
}

util.inherits(Groups, Resource);

Groups.prototype.create = function(options, callback) {
  var path = util.format("/%s/groups",
    this.truevault.getOption('api_version')
  );

  var data = {
    name : options.name
  };

  if (options.policy) {
    var policy = JSON.stringify(options.policy);
    data.policy = new Buffer(policy, 'utf8').toString('base64');
  }

  if (options.user_ids) {
    data.user_ids = options.user_ids;
  }

  return this.httpsRequest({
    path : path,
    method : 'POST',
    data : data,
    callback : callback
  });

};

module.exports = Groups;
