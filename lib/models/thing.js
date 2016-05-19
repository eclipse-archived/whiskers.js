var $ = require('jquery');
var Datastream = require('./datastream');
var Generic = require('./generic');
var Location = require('./location');
var Q = require('q');

class Thing extends Generic {
  constructor(data) {
    super(data);

    this.datastreams = [];
    this.locations   = [];

    // Extract embedded Datastreams
    if (this.get('Datastreams')) {
      this.datastreams = this.get('Datastreams').map(function(item) {
        return new Datastream(item);
      });
      delete this.attributes['Datastreams'];
    }

    // Extract embedded Locations
    if (this.get('Locations')) {
      this.locations = this.get('Locations').map(function(item) {
        return new Location(item);
      });
      delete this.attributes['Locations'];
    }
  }

  // * Request Handling * //

  getDatastreams(options = {}) {
    $.extend(options, this.defaultAjaxOptions);
    options.url = this.get('Datastreams@iot.navigationLink');

    return Q($.ajax(options))
    .then((response) => {
      return response.value.map(function(item) {
        return new Datastream(item);
      });
    });
  }

  getLocations(options = {}) {
    $.extend(options, this.defaultAjaxOptions);
    options.url = this.get('Locations@iot.navigationLink');

    return Q($.ajax(options))
    .then((response) => {
      return response.value.map(function(item) {
        return new Location(item);
      });
    });
  }
}

module.exports = Thing;
