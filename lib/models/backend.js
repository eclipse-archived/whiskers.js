var $ = require('jquery');
var Q = require('q');
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
      return this.getRoot()
      .then((response) => {
        var links = {};
        response.value.forEach((link) => { links[link.name] = link.url; });
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
    return Q(this.getLinks())
    .then((links) => {
      $.extend(options, this.defaultAjaxOptions);
      options.url = links['Things'] + `(${id})`;
      return Q($.ajax(options))
      .then((response) => {
        return new Thing(response);
      });
    });
  }

  getThings(options = {}) {
    return Q(this.getLinks())
    .then((links) => {
      $.extend(options, this.defaultAjaxOptions);
      options.url = links['Things'];
      return Q($.ajax(options))
      .then((response) => {
        return response.value.map(function(item) {
          return new Thing(item);
        });
      });
    });
  }
}

module.exports = Backend;
