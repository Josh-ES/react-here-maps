# react-here-maps

React Wrapper for the HERE Maps API for JavaScript (v3.0.12.4)

[![Version][npm-image]][npm-url] [![Gemnasium][gemnasium-image]][gemnasium-url] [![Travis][travis-ci-image]][travis-ci-url] [![Coveralls][coveralls-image]][coveralls-url]

## Information

This module is still under active development. It is very basic in its current state and is subject to significant change at this time.

## Dependencies

The module will automatically load the HERE Maps API scripts and stylesheets for you. We follow this practice because the scripts themselves are split into multiple modules and we hope to conditionally load these scripts at some point in the future based on the features that the user of the module wishes to use.

## Quick Start

Declare your HERE Maps component using the following React syntax:

```js
import React, { Component } from 'react';
import { HEREMap } from 'react-here-maps';

export default class Map extends Component {
    render() {
        return (
            <HEREMap appId="{your app_id}"
                     appCode="{your app_code}"
                     center={{ lat: 0, lng: 0 }}
                     zoom={14} />
        )
    }
}
```

## Properties

This entire project is written in TypeScript, so to carry with that theme the interfaces attached to the properties of the component are detailed below. Scroll down to see a perhaps more readable table of the available component properties.

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
}
```

| Property       | Type    | Optional | Description                                                                  |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| appId          | string  | false    | The app_id provided to you when you registered your HERE Maps Application.   |
| appCode        | string  | false    | The app_code provided to you when you registered your HERE Maps Application. |
| animateCenter  | boolean | true     | When the center property is changed, the center of the map itself is automatically changed. If this property is set to true the transition between center positions will be animated. |
| animateZoom    | boolean | true     | When the zoom property is changed, the zoom level of the map itself is automatically changed. If this property is set to true the transition between zoom levels will be animated. |
| hidpi          | boolean | true     | If set to true, this property raises the resolution of the map from the default 72 ppi to 320 ppi. This makes HERE Maps look much better on modern monitors and displays. Under the hood, this both raises the ppi to 320 and changes the pixelRatio to 2 (see HERE Maps API documentation for more details). |

[npm-image]: https://img.shields.io/npm/v/react-here-maps.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-here-maps

[gemnasium-image]: https://img.shields.io/gemnasium/Josh-ES/react-here-maps.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/Josh-ES/react-here-maps

[travis-ci-image]: https://img.shields.io/travis/Josh-ES/react-here-maps.svg?style=flat-square
[travis-ci-url]: https://travis-ci.org/Josh-ES/react-here-maps

[coveralls-image]: https://img.shields.io/coveralls/Josh-ES/react-here-maps.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/Josh-ES/react-here-maps
