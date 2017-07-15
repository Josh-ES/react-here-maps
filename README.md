react-here-maps
==============

React Wrapper for the HERE Maps API for JavaScript (v3.0.12.4)

[![Version][npm-image]][npm-url] [![Gemnasium][gemnasium-image]][gemnasium-url] [![Travis][travis-ci-image]][travis-ci-url] [![Coveralls][coveralls-image]][coveralls-url]

Information
--------------

This module is still under active development. It is very basic in its current state and is subject to significant change at this time.

The documentation provided in this README is specific to the platform. Note that some features may be available in the code within the GitHub repo and will be documented here, but not yet available via the NPM package. If you are installing the package via NPM, please refer to the README provided there.

Dependencies
--------------

The module will automatically load the [HERE Maps API][here-maps-link] scripts and stylesheets for you. We follow this practice because the scripts themselves are split into multiple modules and we hope to conditionally load these scripts at some point in the future based on the features that the user of the module wishes to use.

Quick Start
--------------

Declare your HERE Maps component using the following React syntax:

```js
import React, { Component } from 'react';
import HEREMap from 'react-here-maps';

export default class Map extends Component {
    render() {
        return (
            <HEREMap 
                appId="{your app_id}"
                appCode="{your app_code}"
                center={{ lat: 0, lng: 0 }}
                zoom={14}
            />
        )
    }
}
```

If you would like to display a marker as well, you can do so as follows:

```js
import React, { Component } from 'react';
import HEREMap, { Marker } from 'react-here-maps';

export default class Map extends Component {
    render() {
        const center = { lat: 0, lng: 0 };
    
        return (
            <HEREMap 
                appId="{your app_id}"
                appCode="{your app_code}"
                center={center}
                zoom={14}
            >
                <Marker {...center}>
                    <div className="circle-marker"></div>
                </Marker>
            </HEREMap>
        )
    }
}
```

Examples
--------------

You can find a number of examples here: https://josh-es.github.io/react-here-maps/. This page is still under active development and not all features have example uses yet. 

You might wish to know that the 'secure' prop is set to true in all the examples since the site is served over HTTPS.

HEREMap Component Properties
--------------

| Property       | Type    | Optional | Description                                                                  |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| appId          | string  | false    | The app_id provided to you when you registered your HERE Maps Application.   |
| appCode        | string  | false    | The app_code provided to you when you registered your HERE Maps Application. |
| animateCenter  | boolean | true     | When the center property is changed, the center of the map itself is automatically changed. If this property is set to true the transition between center positions will be animated. |
| animateZoom    | boolean | true     | When the zoom property is changed, the zoom level of the map itself is automatically changed. If this property is set to true the transition between zoom levels will be animated. |
| hidpi          | boolean | true     | If set to true, this property raises the resolution of the map from the default 72 ppi to 320 ppi. This makes HERE Maps look much better on modern monitors and displays. Under the hood, this both raises the ppi to 320 and changes the pixelRatio to 2 (see HERE Maps API documentation for more details). |
| interactive    | boolean | true     | If set to false, the map will not be interactive. This means that user drag, scroll and other mouse events will not be listened to and used to trigger zoom and movement of the map. UI controls will also not be displayed. Defaults to true if not provided. |
| secure         | boolean | true     | If set to true, HTTPS is used by the component for all requests.             |

This entire project is written in TypeScript, so to carry with that theme the interfaces attached to the properties of the component are detailed below.

```js
interface H.geo.IPoint {
    lat: H.geo.Latitude;
    lng: Longitude;
    alt?: H.geo.Altitude;
    ctx?: H.geo.AltitudeContext;
}

interface H.Map.Options {
    center?: H.geo.IPoint;
    zoom?: number;
    bounds?: H.geo.Rect; // not implemented
    layers?: Array<H.map.layer.Layer>; // not implemented
    engineType?: EngineType; // not implemented
    pixelRatio?: number; // access abstracted via hidpi property, which changes this value from the default 1 to 2
    imprint?: H.map.Imprint.Options; // not implemented
    renderBaseBackground?: BackgroundRange; // not implemented
    autoColor?: boolean; // not implemented
    margin?: number; // not implemented
    padding?: H.map.ViewPort.Padding; // not implemented
    fixedCenter?: boolean; // not implemented
}
```

```js
interface HEREMapProps extends H.Map.Options {
    appId          : string;   // the app_id provided to you when you registered your HERE Maps Application
    appCode        : string;   // the app_code provided to you when you registered your HERE Maps Application
    animateCenter? : boolean;  // animate automatic transitions between center positions
    animateZoom?   : boolean;  // animate automatic transitions betweeen zoom positions
    hidpi?         : boolean;  // raise the display resolution and pixel ratio of the map (for modern displays) 
    interactive?   : boolean;  // whether you want the map to be interactive, responding to user input and displaying UI controls (defaults to true)
    secure?        : boolean;  // whether you want to use HTTPS
}
```

Marker Component Properties
--------------

| Property       | Type    | Optional | Description                                                                  |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| bitmap         | string  | false    | If you want to use an image as a marker, pass the path to that image as this property. Note you can also pass children to the Marker component and use the markup the children generate as a marker (which can be styled with CSS appropriately. |
| lat            | string  | false    | The latitude component of the marker's coorindates.                          |
| lng            | boolean | true     | The longitude component of the marker's coordinates.                         |

```js
interface H.geo.IPoint {
    lat: H.geo.Latitude;
    lng: Longitude;
    alt?: H.geo.Altitude;
    ctx?: H.geo.AltitudeContext;
}

interface Options {
    min?: number; // not implemented
    max?: number; // not implemented
    visibility?: boolean; // not implemented
    zIndex?: number; // not implemented
    provider?: H.map.provider.Provider; // not implemented
    icon?: H.map.Icon; // access abstracted via React children and/or bitmap property
    data?: any; // not implemented
}
```

```js
export interface MarkerProps extends H.map.Marker.Options, H.geo.IPoint {
    bitmap?: string;
}
```

If the Marker component has children, we generate that markup and use it as a DomMarker (see [HERE Maps API for JavaScript documentation][here-maps-link] for details). Every DomMarker can be styled using CSS, as you would expect. You might find it useful that you can pass multiple children to the component and it should work as intended - every such marker is wrapped in a div with a class of "dom-marker".

[here-maps-link]: https://developer.here.com/javascript-apis/documentation/v3/maps/topics/overview.html

[npm-image]: https://img.shields.io/npm/v/react-here-maps.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-here-maps

[gemnasium-image]: https://img.shields.io/gemnasium/Josh-ES/react-here-maps.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/Josh-ES/react-here-maps

[travis-ci-image]: https://img.shields.io/travis/Josh-ES/react-here-maps.svg?style=flat-square
[travis-ci-url]: https://travis-ci.org/Josh-ES/react-here-maps

[coveralls-image]: https://img.shields.io/coveralls/Josh-ES/react-here-maps.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/Josh-ES/react-here-maps
