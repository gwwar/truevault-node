'use strict';

var util = require('util');

function TrueVaultError(statusCode, message) {
  Error.call(this);
  this.status = statusCode;
  this.message = message;
}

util.inherits(TrueVaultError, Error);

function TrueVaultMalformedError(statusCode, message) {
  Error.call(this);
  this.status = statusCode;
  this.message = message;
}

util.inherits(TrueVaultMalformedError, Error);

function TrueVaultUnauthorizedError(statusCode, message) {
  Error.call(this);
  this.status = statusCode;
  this.message = message;
}

util.inherits(TrueVaultUnauthorizedError, Error);

function TrueVaultRequestFailedError(statusCode, message) {
  Error.call(this);
  this.status = statusCode;
  this.message = message;
}

util.inherits(TrueVaultRequestFailedError, Error);


function TrueVaultNotFoundError(statusCode, message) {
  Error.call(this);
  this.status = statusCode;
  this.message = message;
}

util.inherits(TrueVaultNotFoundError, Error);


function TrueVaultServerError(statusCode, message) {
  Error.call(this);
  this.status = statusCode;
  this.message = message;
}

util.inherits(TrueVaultServerError, Error);

var errorMap = {
  400 : TrueVaultMalformedError,
  401 : TrueVaultUnauthorizedError,
  402 : TrueVaultRequestFailedError,
  404 : TrueVaultNotFoundError,
  500 : TrueVaultServerError,
  502 : TrueVaultServerError,
  503 : TrueVaultServerError,
  504 : TrueVaultServerError
};

module.exports = function(statusCode, msg) {
  var ErrorClass = errorMap[statusCode] || TrueVaultError;
  return new ErrorClass(statusCode, msg);
};
