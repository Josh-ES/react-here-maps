# Change Log

Every change, update, bug fix or new feature will be documented in this file as new releases are published. The entire project is written in TypeScript, so references to updates to type definitions, typings dependencies etc. will be included here.

<a name="Unreleased"></a>

### 0.4.0

#### New Features

*   Resizing
    *   Made the map resize on the window resize event, so the issue of blank tiles being rendered at the edge of an interactive map when the window is resized is no longer present.

#### Changes

*   Packages
    *   Removed use of the typings tool from the project, and swapped over to @types packages to provide type declarations.
    *   Updated all dependencies to their latest versions.

### 0.3.3

*   SSL Connections
    *   Force the use of HTTPS to load the HERE Maps UI stylesheet if the "secure" flag on the HEREMap instance is set to true.

### 0.3.2

*   SSL Connections
    *   Force the use of HTTPS to load the HERE Maps scripts if the "secure" flag on the HEREMap instance is set to true.

### 0.3.1

*   Type Definitions
    *   Source the type definitions for this project from DefinitelyTyped instead of directly bundling the files.

### 0.3.0

*   Circle
    *   Introduced a new React component, Circle, to create circles on maps provided by HERE Maps.
    *   Encapsulate the Circle behaviour from the HERE Maps API, but not that of the other provided Geoshapes.
    *   Component is used as a child of a HEREMap component.
    *   Component simply creates a circle of the given radius at the given location.
    
*   Automatic Position Changes of Circle and Marker instances
    *   When the lat/lng props of a Circle or Marker instance change, their position automatically changes.
    *   When the rad prop of a Circle instance changes, the radius automatically changes to the new value.
    
*   Removal of Map Children
    *   We now remove markers and circles when their wrapper component is unmounted.

### 0.2.1 (2016-08-29)

#### Bug Fixes

*   react-addons-test-utils
    *   The react-addons-test-utils package fits better as a development dependency.
    *   It's only use in this project is with the Karma/PhantomJS client testing, it is not used in runtime code.

### 0.2.0 (2016-08-28)

#### New Features

*   Marker
    *   Introduced a new React component, Marker, to create markers on maps provided by HERE Maps.
    *   Encapsulate both DomMarker and standard Marker behavior from the HERE Maps API.
    *   Component is used as a child of a HEREMap component.
    *   If the component has children, we convert the children to a string and use that string as a DomMarker.
    *   If an bitmap property is provided, use that to create a normal marker instance (usually a locally-available image).
    *   Otherwise, just create a default marker at the provided location.
    
*   Interactive Mode
    *   Added an interactive prop to the HEREMap component.
    *   Defaults to true.
    *   If set to false we do not attach the mouse event listeners or the UI components from the HERE Maps API.
    *   Basically renders a static map if interactive is set to false.
    
*   Secure Mode
    *   Added a secure prop to the HEREMap component.
    *   If set to true, the 'useHTTPS' flag on the Platform instance associated with this react component will be set to true.
    *   In other words, HTTPS will be used if secure is set to true.
    
#### Changes

*   Demo Site
    *   Vastly updated demo site with multiple examples and freshly-designed UI.

### 0.1.0 (2016-08-26)

#### New Features

*   new props
    *   Added a hidpi mode, enabled via the hidpi prop.
    *   This property enables a high ppi and doubles the pixel ratio for the map, making the map look much, much better on high resolution screens/devices.
    
#### Changes

*   Testing
    *   Isolated the tests, so that if the component is required to be mounted in the DOM by a test an individual component is both mounted and umnounted within that test, rather than mounting a component prior to the tests taking place.
    *   Testing the hidpi mode requires direct DOM manipulation not possible with cheerio.
    *   Replaced cheerio with jQuery throughout the testing framework.
    *   Added a SCSS file, along with the necessary preprocessor for Karma, to set the height of the container and ensure that height is propagated down.
    *   Implemented code coverage reporting and transmission to Coveralls.
    
*   Packages
    *   Updated the TypeScript nightly build to that from 2016-08-25.
    *   Added jquery. Removed cheerio.
    *   Added karma-scss-preprocessor. Peer dependency node-sass.

### 0.0.7 (2016-08-25)

#### New Features

*   componentWillReceiveProps
    *   When the component is receiving new props, we check to see if the zoom level has changed.
    *   If it has changed, we animate the change in zoom.
    
*   new props
    *   Added animateZoom and animateCenter properties to choose whether you want the animated changes of zoom and center to be enabled or not.
    
#### Changes
    
*   Testing
    *   Implemented testing infrastructure (as well as some basic tests) for the component.
    *   The testing system is based on Karma (using PhantomJS), Webpack and Mocha.
    
*   Demos
    *   Centred the demo map in London, England.

### 0.0.6 (2016-08-22)

#### New Features

*   componentWillReceiveProps
    *   When the component is receiving new props, we check to see if the center property has changed.
    *   If it has changed, an animated change of center is performed within the map.

### 0.0.5 (2016-08-22)

#### Updates

*   Add a 100% height style to the #mapContainer element, so it fills the height of its container.

### 0.0.4 (2016-08-22)

#### Changes

*   Created a dedicated application with the HERE Maps platform and incorporated the new app_id and app_code.

### 0.0.3 (2016-08-22)

#### Bug Fixes

*   Remove TypeScript extensions to the import statements so the code works in the modular form.

### 0.0.2 (2016-08-22)

#### Updates

*   Added a gulp task to compile the TypeScript source code into a modular form (rather than just a browserify generated individual file, found in the release directory - where the browserify file is located in the dist directory).

### 0.0.1 (2016-08-22)

#### Changes

*   Removed the included typings file referenced in the package.json as it was not working. Will be added back later.

## 0.0.0 (2016-08-22)

#### Features

*   HEREMap
    *   React Component
    *   Ensures the required scripts and CSS files from the HERE Maps API CDN are loaded.
    *   Renders a map with a center and zoom level specified as props of the component itself.
    *   Specify the app_id and the app_code from the HERE API as appId and appCode props for the component.
    *   Exposes changeCenter method on the component to change the center coordinates of the map after it has been rendered.
    
*   Utils
    *   Cache
        *   cache utility used internally for loading scripts to the DOM via 'script' tags.
        
    *   getLink
        *   getLink utility generates a 'link' tag pointing to a stylesheet (in this case, could be extended in the future) and appends it to the DOM.
        
    *   getPlatform
        *   getPlatform utility ensures that only one platform is generated, no matter how many maps are added. 
        *   Only one platform is required for any number of maps in a single application instance, so we've decided to take that approach here.
        *   Will be exposed from the module in the future.
        
    *   getScriptMap
        *   getScriptMap utility returns an object containing the names and URLs of each HERE Maps API script that needs to be loaded.
        *   This will be updated in the future to load/eliminate scripts depending on what features the user does and does not require from their map component.
        
*   Demos
    *   Includes a basic example of the use of the component.
    *   Centers the map at the coordinates { lat: 0, lng: 0 } and sets the zoom level to 14.
    *   Map is styled using SCSS.
    *   Map width is set to 540px, height to 360px, and the map is centred in the web page.
    
*   Typings
    *   Includes a copy of the type definitions I created for the HERE Maps API for JavaScript, for use in TypeScript packages.
    *   We're hoping to make those typings more available in the future. Details to follow.
