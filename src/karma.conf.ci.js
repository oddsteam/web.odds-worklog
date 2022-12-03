// ref: https://stackoverflow.com/a/52148600/857931

var properties = null;
var originalConfigFn = require('./karma.conf.js');
originalConfigFn({ set: function(arg) { properties = arg; } });

properties.singleRun = true;
properties.reporters = ['progress','coverage-istanbul'];

module.exports = function (config) {
  config.set(properties);
};