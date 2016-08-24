# Change Log

Every change, update, bug fix or new feature will be documented in this file as new releases are published. The entire project is written in TypeScript, so references to updates to type definitions, typings dependencies etc. will be included here.

<a name="Unreleased"></a>
### Unreleased

### 0.07 (2016-08-25)

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