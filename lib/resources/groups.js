'use strict';

var Resource = require('../resource');
var util = require('util');

function Groups() {
  Groups.super_.apply(this, arguments);
}

util.inherits(Groups, Resource);

module.exports = Groups;
