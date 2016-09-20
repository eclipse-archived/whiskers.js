// This shim file will wrap all of the Eclipse Whiskers modules into a global
// variable, so that Browserify will expose a single global for web browsers.
global.EclipseWhiskers = require('./index.js');
