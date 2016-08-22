/// <reference path="globals/bluebird/index.d.ts" />
/// <reference path="globals/lodash/index.d.ts" />
/// <reference path="globals/react-dom/index.d.ts" />
/// <reference path="globals/react/index.d.ts" />

/// <reference path="extensions/html-script-element.d.ts" />
/// <reference path="packages/heremaps/heremaps.d.ts" />

declare module 'react-here-maps' {
    export class HEREMap extends __React.Component<any, any> {
        changeMap(point: H.geo.IPoint): void;
    }
}