# react-here-maps

React Wrapper for the HERE Maps API for JavaScript (v3.0.12.4)

[![Version][npm-image]][npm-url] [![Gemnasium][gemnasium-image]][gemnasium-url] [![Travis][travis-ci-image]][travis-ci-url]

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

[npm-image]: https://img.shields.io/npm/v/react-here-maps.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-here-maps

[gemnasium-image]: https://img.shields.io/gemnasium/Josh-ES/react-here-maps.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/Josh-ES/react-here-maps

[travis-ci-image]: https://img.shields.io/travis/Josh-ES/react-here-maps.svg?style=flat-square
[travis-ci-url]: https://travis-ci.org/Josh-ES/react-here-maps
