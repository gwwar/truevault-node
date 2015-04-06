'use strict';

var Resource = require('../resource');
var util = require('util');

function Users() {
  Users.super_.apply(this, arguments);
}

util.inherits(Users, Resource);

module.exports = Users;
