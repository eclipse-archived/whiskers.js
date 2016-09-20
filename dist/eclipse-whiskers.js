(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.Backend = require('./models/backend');
exports.Datastream = require('./models/datastream');
exports.Generic = require('./models/generic');
exports.Location = require('./models/location');
exports.Observation = require('./models/observation');
exports.ObservedProperty = require('./models/observed_property');
exports.Sensor = require('./models/sensor');
exports.Thing = require('./models/thing');

},{"./models/backend":2,"./models/datastream":3,"./models/generic":4,"./models/location":5,"./models/observation":6,"./models/observed_property":7,"./models/sensor":8,"./models/thing":9}],2:[function(require,module,exports){
(function (global){
var $ = typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null;
var Q = typeof window !== "undefined" ? window['Q'] : typeof global !== "undefined" ? global['Q'] : null;
var Thing = require('./thing');

// Backend instance to represent a connection to a remote instance of
// SensorThings. It is recommended way to retrieve entities as this model will
// follow navigation links instead of hard-coded URL paths.
class Backend {
  // Create a new instance for connections, at `url`.
  constructor(url) {
    this.baseURL = url;
    this.defaultAjaxOptions = {
      dataType: 'json',
      type: 'GET'
    };
    this.links = undefined;
  }

  // Retrieve the root SensorThings links from the server.
  // (See Specification Section 9.2.1.)
  // Once retrieved the links will be cached in `this.links` and the cached
  // version returned on subsequent calls.
  getLinks() {
    if (this.links !== undefined) {
      return this.links;
    } else {
      return this.getRoot().then(response => {
        var links = {};
        response.value.forEach(link => {
          links[link.name] = link.url;
        });
        this.links = links;
        return links;
      });
    }
  }

  // * Request Handling * //

  // Retrieve root resource for URLs
  getRoot(options = {}) {
    $.extend(options, this.defaultAjaxOptions);
    options.url = this.baseURL;
    return Q($.ajax(options));
  }

  getThing(id, options = {}) {
    return Q(this.getLinks()).then(links => {
      $.extend(options, this.defaultAjaxOptions);
      options.url = links['Things'] + `(${ id })`;
      return Q($.ajax(options)).then(response => {
        return new Thing(response);
      });
    });
  }

  getThings(options = {}) {
    return Q(this.getLinks()).then(links => {
      $.extend(options, this.defaultAjaxOptions);
      options.url = links['Things'];
      return Q($.ajax(options)).then(response => {
        return response.value.map(function (item) {
          return new Thing(item);
        });
      });
    });
  }
}

module.exports = Backend;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./thing":9}],3:[function(require,module,exports){
(function (global){
var $ = typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null;
var Generic = require('./generic');
var Observation = require('./observation');
var ObservedProperty = require('./observed_property');
var Q = typeof window !== "undefined" ? window['Q'] : typeof global !== "undefined" ? global['Q'] : null;
var Sensor = require('./sensor');

class Datastream extends Generic {
  constructor(data) {
    super(data);

    this.observedProperty = null;
    this.sensor = null;

    // Extract embedded ObservedProperty
    if (this.get('ObservedProperty')) {
      this.observedProperty = new ObservedProperty(this.get('ObservedProperty'));
      delete this.attributes['ObservedProperty'];
    }

    // Extract embedded Sensor
    if (this.get('Sensor')) {
      this.sensor = new Sensor(this.get('Sensor'));
      delete this.attributes['Sensor'];
    }
  }

  // * Request Handling * //

  // Return all observations until nextLink is not defined.
  getAllObservations(options = {}) {
    var opts = {
      url: this.get('Observations@iot.navigationLink')
    };
    $.extend(opts, this.defaultAjaxOptions, options);

    var observations = [];

    return Q($.ajax(opts)).then(response => {
      response.value.forEach(function (item) {
        observations.push(new Observation(item));
      });

      if (response['@iot.nextLink'] === undefined) {
        return observations;
      } else {
        opts.url = response['@iot.nextLink'];
        opts.data = {};

        return Q(this.getAllObservations(opts)).then(function (newObservations) {
          return observations.concat(newObservations);
        });
      }
    });
  }

  getObservations(options = {}) {
    $.extend(options, this.defaultAjaxOptions);
    options.url = this.get('Observations@iot.navigationLink');

    return Q($.ajax(options)).then(response => {
      return response.value.map(function (item) {
        return new Observation(item);
      });
    });
  }
}

module.exports = Datastream;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./generic":4,"./observation":6,"./observed_property":7,"./sensor":8}],4:[function(require,module,exports){
// Generic base class.
// Will store passed in object as `attributes` and provides get/set to access
// `attributes`.
class Generic {
  constructor(data) {
    // Copy properties to this instance
    this.attributes = data;
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    this.attributes[key] = value;
  }
}

module.exports = Generic;

},{}],5:[function(require,module,exports){
var Generic = require('./generic');

class Location extends Generic {
  constructor(data) {
    super(data);
  }
}

module.exports = Location;

},{"./generic":4}],6:[function(require,module,exports){
var Generic = require('./generic');

class Observation extends Generic {
  constructor(data) {
    super(data);
  }
}

module.exports = Observation;

},{"./generic":4}],7:[function(require,module,exports){
var Generic = require('./generic');

class ObservedProperty extends Generic {
  constructor(data) {
    super(data);
  }
}

module.exports = ObservedProperty;

},{"./generic":4}],8:[function(require,module,exports){
var Generic = require('./generic');

class Sensor extends Generic {
  constructor(data) {
    super(data);
  }
}

module.exports = Sensor;

},{"./generic":4}],9:[function(require,module,exports){
(function (global){
var $ = typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null;
var Datastream = require('./datastream');
var Generic = require('./generic');
var Location = require('./location');
var Q = typeof window !== "undefined" ? window['Q'] : typeof global !== "undefined" ? global['Q'] : null;

class Thing extends Generic {
  constructor(data) {
    super(data);

    this.datastreams = [];
    this.locations = [];

    // Extract embedded Datastreams
    if (this.get('Datastreams')) {
      this.datastreams = this.get('Datastreams').map(function (item) {
        return new Datastream(item);
      });
      delete this.attributes['Datastreams'];
    }

    // Extract embedded Locations
    if (this.get('Locations')) {
      this.locations = this.get('Locations').map(function (item) {
        return new Location(item);
      });
      delete this.attributes['Locations'];
    }
  }

  // * Request Handling * //

  getDatastreams(options = {}) {
    $.extend(options, this.defaultAjaxOptions);
    options.url = this.get('Datastreams@iot.navigationLink');

    return Q($.ajax(options)).then(response => {
      return response.value.map(function (item) {
        return new Datastream(item);
      });
    });
  }

  getLocations(options = {}) {
    $.extend(options, this.defaultAjaxOptions);
    options.url = this.get('Locations@iot.navigationLink');

    return Q($.ajax(options)).then(response => {
      return response.value.map(function (item) {
        return new Location(item);
      });
    });
  }
}

module.exports = Thing;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./datastream":3,"./generic":4,"./location":5}],10:[function(require,module,exports){
(function (global){
// This shim file will wrap all of the Eclipse Whiskers modules into a global
// variable, so that Browserify will expose a single global for web browsers.
global.EclipseWhiskers = require('./index.js');

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./index.js":1}]},{},[10])