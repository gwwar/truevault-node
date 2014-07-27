'use strict';

var util = require('util');

function TrueVaultError(message) {
  Error.call(this);
  this.message = message;
}

util.inherits(TrueVaultError, Error);

function TrueVaultMalformedError(message) {
  Error.call(this);
  this.message = message;
}

util.inherits(TrueVaultMalformedError, Error);

function TrueVaultUnauthorizedError(message) {
  Error.call(this);
  this.message = message;
}

util.inherits(TrueVaultUnauthorizedError, Error);

function TrueVaultRequestFailedError(message) {
  Error.call(this);
  this.message = message;
}

util.inherits(TrueVaultRequestFailedError, Error);


function TrueVaultNotFoundError(message) {
  Error.call(this);
  this.message = message;
}

util.inherits(TrueVaultNotFoundError, Error);


function TrueVaultServerError(message) {
  Error.call(this);
  this.message = message;
}

util.inherits(TrueVaultServerError, Error);


module.exports = {
  'default' : TrueVaultError,
  400 : TrueVaultMalformedError,
  401 : TrueVaultUnauthorizedError,
  402 : TrueVaultRequestFailedError,
  404 : TrueVaultNotFoundError,
  500 : TrueVaultServerError,
  502 : TrueVaultServerError,
  503 : TrueVaultServerError,
  504 : TrueVaultServerError
};