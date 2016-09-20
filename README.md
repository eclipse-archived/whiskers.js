# Eclipse Whiskers

Whiskers is an [OGC SensorThings API](https://en.wikipedia.org/wiki/SensorThings_API) framework consisting of a JavaScript client and a light-weight server for IoT gateways (e.g., Raspberry Pi). The SensorThings API is an OGC (Open Geospatial Consortium) standard that allows IoT (Internet of Things) devices and their data to be connected; a major goal is to foster a healthy and open IoT ecosystem, as opposed to one dominated by proprietary information silos.

In addition the a client library, Whiskers will also have a SensorThings server module for IoT gateways, such as Raspberry Pi. Developers will be able to deploy and configure IoT gateways, make them SensorThings API-compliant, and connect with spatial data servers around the world that implement the full array of [OGC Sensor Web Enablement (SWE) standards](http://www.opengeospatial.org/ogc/markets-technologies/swe).

Whiskers aims to make SensorThings development easy for the large and growing world of IoT developers.

More details can be found on the [Eclipse Whiskers Project](http://eclipse.org/whiskers) page.

## Using Eclipse Whiskers

Eclipse Whiskers is still in an early development stage, so some details may change as we stabilize the API before version 1.0.

### Using with Node.js

This library can be used with the Node.js version of CommonJS to include all the library sub-modules as a single namespaced object. First add eclipse-whiskers as a dependency from GitHub.

    $ npm install --save eclipse/whiskers#3df4601e98b9dc4c343d20d3e40d582ff021cc40

A module hosted by NPM will be coming at a later date. Instead of referencing the master branch, this command forces a specific commit to be used, which is highly recommended when referencing a Git repository as a new commit may come in that adds an unexpected behaviour. In the future this will be handled with the NPM module and by using semantic versioning.

Once Eclipse Whiskers is added to your `node_modules` directory, it can be used in your Node application:

    var EclipseWhiskers = require('eclipse-whiskers');
    var server = new EclipseWhiskers.Backend("http://example.com/v1.0/");
    var things = server.getThings(); // returns a Q.js promise object

At the moment, the following classes will be available:

* `Backend`
* `Datastream`
* `Generic`
* `Location`
* `Observation`
* `ObservedProperty`
* `Sensor`
* `Thing`

More classes will be added as the API matures. For more details on using these classes, please see the API documentation.

### Using with Web Browsers

The main Eclipse Whiskers library source files are written for Node.js and use `require` statements and ES2015 modules. These are not compatible with most browsers and requiring the files in an HTML script tag will not work.

If you are using Browserify or Webpack in your web application, you could use that to bundle Eclipse Whiskers into your application by requiring it in your code:

    var EclipseWhiskers = require('eclipse-whiskers');

This will bundle a self-contained version of Eclipse Whiskers **with** jQuery and Q inside. You will also have to run a ES2015 transpiler such as Babel to convert the code to be supported in most web browsers.

**Instead**, I recommend you use the web version of Eclipse Whiskers that is pre-compiled for ES5 (most semi-recent web browsers support ES5). This version does not include jQuery and Q inside, those must be available in the global namespace. The file is contained in `dist/eclipse-whiskers.js` and can be used in a script tag:

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/q.js/1.4.1/q.js"></script>
    <script src="vendor/eclipse-whiskers.js"></script>

Note that jQuery and Q must be included before Eclipse Whiskers. A global variable `EclipseWhiskers` will be made available that provides access to the API. The API documentation in `API.md` goes into more detail on its usage.

Note that Eclipse Whiskers has not been tested with Q version 2.0 or newer, nor with jQuery version 3.0 or newer.

## Versioning

Whiskers aims to follow [Semantic Versioning](http://semver.org). This means you can expect the library to be stable on Major version numbers, with only backwards-compatible changes on Minor and Patch version number changes. An exception is made for versions before 1.0.0, where the API is unstable while our development team focuses on a unified API — that means releases before 1.0.0 may introduce breaking changes between Minor versions.

## Issues

You can submit issues through GitHub, through Eclipse Bugzilla, or on the mailing list.

### GitHub (Account Required)

* [Whiskers Issues Page](https://github.com/eclipse/whiskers/issues)

### Eclipse Bugzilla (Account Required)

* [Eclipse Whiskers Issue List](https://bugs.eclipse.org/bugs/buglist.cgi?component=General&product=Whiskers&resolution=---)
* [File a new Eclipse Whiskers Bug/Issue](https://bugs.eclipse.org/bugs/enter_bug.cgi?product=Whiskers)

### Eclipse Mailing List

* [Whiskers Mailing List](https://dev.eclipse.org/mailman/listinfo/whiskers-dev)

## License

Whiskers is available under the Eclipse Public License Version 1.0.

## Building Web Versions

The web compatible version in `dist/eclipse-whiskers.js` can be built from the source in `lib` using Browserify. First install the development dependencies for Eclipse Whiskers:

    $ npm install
    $ npm install -g browserify

Then use Browserify to convert the require statements into globals (see `browserify-shim` section in `package.json` for that configuration) and to convert from ES2015 to ES5 using `babelify`.

    $ browserify --transform browserify-shim --transform babelify --presets es2015 lib/shim.js > dist/eclipse-whiskers.js

This code should be updated regularly, and must be updated for any versioned release of Eclipse Whiskers.

If any ES2016 or ES next features are used in the source, then preset packages for babelify will need to be added — please see the [babelify documentation](https://github.com/babel/babelify/blob/v7.3.0/README.md) for instructions.

### Why use browserify-shim?

Without it, Browserify will go ahead and include a copy of jQuery and Q inside the output file. This is nice, but if you already have jQuery or Q included in your application then you have two copies, which is a waste of bandwidth. So instead we use browserify-shim to replace those require statements with references to global variables.

An exception can be made though if you are using versions of jQuery or Q that are incompatible with Eclipse Whiskers, and in that case it would be better to not use the web version and to use Browserify and Babel on the Node.js version of Eclipse Whiskers instead.

## Contributing

If you want to submit feature requests, ideas, bugs, issues or other comments to the project, we would love to hear it. Our primary discussion medium is the [Whiskers Mailing List](https://dev.eclipse.org/mailman/listinfo/whiskers-dev), but you can use [Eclipse Bugzilla](https://bugs.eclipse.org/bugs/buglist.cgi?component=General&product=Whiskers&resolution=---) or [GitHub Issues](https://github.com/eclipse/whiskers/issues).

Very important: if you want to submit patches or code to the project, you will need to sign the [Eclipse Foundation Contributor License Agreement (CLA)](http://wiki.eclipse.org/Development_Resources/Contributing_via_Git#Eclipse_Foundation_Contributor_License_Agreement).

Whiskers follows the [Eclipse Community Code of Conduct](http://www.eclipse.org/org/documents/Community_Code_of_Conduct.php). We aim to make Whiskers a welcoming and respectful project.

## Whiskers Users

Are you using Eclipse Whiskers for your project? We would like to hear from you! If you would also like to be publicly linked to the project, let us know and we will list you below.

* GeoSensorWeb Lab (University of Calgary, Canada): Coming Soon!
