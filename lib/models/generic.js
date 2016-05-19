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
