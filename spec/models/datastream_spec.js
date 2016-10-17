describe("Datastream", function() {
  var Datastream = require('../../lib/models/datastream');
  var datastream;

  beforeEach(function() {
    datastream = new Datastream({});
  });

  it("creates an ObservedProperty model from an embedded ObservedProperty", function() {
    datastream = new Datastream({
      ObservedProperty: {
        name: "PROPERTY"
      }
    });

    expect(datastream.observedProperty).toBeDefined();
    expect(datastream.observedProperty.get("name")).toBe("PROPERTY");
  });

  it("creates a Sensor model from an embedded Sensor", function() {
    datastream = new Datastream({
      Sensor: {
        name: "SENSOR TYPE"
      }
    });

    expect(datastream.sensor).toBeDefined();
    expect(datastream.sensor.get("name")).toBe("SENSOR TYPE");
  });
});
