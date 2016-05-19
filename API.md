# Eclipse Whiskers API

This document will explain the classes and methods in the Eclipse Whiskers client library.

## Models

There are currently 8 models in the client library.

* Backend
* Datastream
* Generic
* Location
* Observation
* ObservedProperty
* Sensor
* Thing

### Backend

This class represents a connection to a remote instance of SensorThings. Multiple instances of this class could be used to communicate with multiple SensorThings servers.

#### Constructor

Creating a new Backend is done with the URL of the instance.

````javascript
    var remote = new Backend('http://example.com/OGCSensorThings/v1.0/');
````

#### getLinks()

Returns an object containing key-value pairs for the SensorThings collections on the remote host. Will execute a GET request on the first call, and use a cached value on subsequent calls.

````javascript
    {
      "Things": "http://example.com/OGCSensorThings/v1.0/Things",
      "Locations": "http://example.com/OGCSensorThings/v1.0/Locations",
      "HistoricalLocations": "http://example.com/OGCSensorThings/v1.0/HistoricalLocations",
      "Datastreams": "http://example.com/OGCSensorThings/v1.0/Datastreams",
      "Sensors": "http://example.com/OGCSensorThings/v1.0/Sensors",
      "Observations": "http://example.com/OGCSensorThings/v1.0/Observations",
      "ObservedProperties": "http://example.com/OGCSensorThings/v1.0/ObservedProperties",
      "FeaturesOfInterest": "http://example.com/OGCSensorThings/v1.0/FeaturesOfInterest"
    }

````

This is used internally in the Backend class for accessing collections without having the paths hard-coded.

### getRoot()

Retrieves the response body from the SensorThings root collection path.

### getThing(id, options)

Retrieves the Thing resource from SensorThings with the corresponding `id` and returns a Thing instance. `options` is passed to JQuery's Ajax method.

### getThings(options)

Retrieves the Things collection resource from SensorThings and returns an array of Thing instances. `options` is passed to JQuery's Ajax method.

If the remote SensorThings server applies a limit to the response then only that many entities will be returned in the array.

