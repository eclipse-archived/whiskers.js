var $ = require('jquery');
var Generic = require('./generic');
var Observation = require('./observation');
var ObservedProperty = require('./observed_property');
var Q = require('q');
var Sensor = require('./sensor');

class Datastream extends Generic {
  constructor(data) {
    super(data);

    this.observedProperty = null;
    this.sensor           = null;

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

    return Q($.ajax(opts))
    .then((response) => {
      response.value.forEach(function(item) {
        observations.push(new Observation(item));
      });

      if (response['@iot.nextLink'] === undefined) {
        return observations;
      } else {
        opts.url = response['@iot.nextLink'];
        opts.data = {};

        return Q(this.getAllObservations(opts))
        .then(function(newObservations) {
          return observations.concat(newObservations);
        });
      }
    });
  }

  getObservations(options = {}) {
    $.extend(options, this.defaultAjaxOptions);
    options.url = this.get('Observations@iot.navigationLink');

    return Q($.ajax(options))
    .then((response) => {
      return response.value.map(function(item) {
        return new Observation(item);
      });
    });
  }
}

module.exports = Datastream;
