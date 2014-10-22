/*globals require */

var sylvester = require('sylvester'),
    Matrix = sylvester.Matrix,
    Vector = sylvester.Vector;

var LinearRegression = function(X, Y, options) {
  this.X = X || [];
  this.Y = Y || [];
  this.options = options || {};

  // verify that X is an array
  if (X && !Array.isArray(X)) {
    throw new Error('X must be an array');
  }

  // verify that Y is an array
  if (Y && !Array.isArray(Y)) {
    throw new Error('Y must be an array');
  }
};

LinearRegression.prototype.train = function(callback) {
  if (this.X.length === 0) {
    return callback(new Error('X is empty'));
  } else if (this.Y.length === 0) {
    return callback(new Error('Y is empty'));
  }

  // Normal Equation using sylvester:
  // The x matrix for the normal equation needs to
  // have a row of ones as its first row.
  // Let's first build the x matrix
  var zeros = Matrix.Zero(this.X.length,1)
  var ones = zeros.add(1);
  var x = ones.augment($M(this.X));
  // Then build the y matrix
  var y = $M(this.Y);

  // now we can apply the normal equation:
  // see formula at http://upload.wikimedia.org/math/2/c/e/2ce21b8e24ea7509a3295c3acd2ae0ea.png
  this.theta = x.transpose().x(x).inverse().x(x.transpose()).x(y);
  return callback();
};

LinearRegression.prototype.predict = function(input) {
  var xInput = $M([1, input]);
  var output = this.theta.transpose().x(xInput);
  return output.e(1,1);
};

exports.LinearRegression = LinearRegression;
