var $ = require('jquery');
var Q = require('q');

class Backend {
  constructor(url) {
    this.baseURL = url;
    this.defaultAjaxOptions = {
      dataType: 'json',
      type: 'GET'
    };
    this.links = undefined;
  }

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
}

module.exports = Backend;
