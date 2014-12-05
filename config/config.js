/**
 * Module dependencies.
 */

var extend = require('util')._extend,
    path = require('path');

var local = require('./env/development');
var heroku = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + '/..'),
};

/**
 * Expose
 */

module.exports = {
  development: extend(local, defaults),
  production: extend(heroku, defaults)
}[process.env.NODE_ENV || 'development'];