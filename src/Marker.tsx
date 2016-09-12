// a "normal" marker that uses a static image as an icon.
// large numbers of markers of this type can be added to the map
// very quickly and efficiently

import getDomMarkerIcon from "./utils/get-dom-marker-icon";
import getMarkerIcon from "./utils/get-marker-icon";
import { isEqual } from "lodash";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

// declare an interface containing the required and potential
// props that can be passed to the HEREMap Marker component
export interface MarkerProps extends H.map.Marker.Options, H.geo.IPoint {
    bitmap?: string;
}

// declare an interface containing the potential state flags
interface MarkerState {
    marker?: H.map.DomMarker | H.map.Marker;
}

// declare an interface containing the potential context parameters
interface MarkerContext {
    map: H.Map;
}

// export the Marker React component from this module
export class Marker extends React.Component<MarkerProps, MarkerState> {
    // define the context types that are passed down from a <HEREMap> instance
    public static contextTypes = {
        map: React.PropTypes.object,
    };

    public context: MarkerContext;

    public state: MarkerState = { };

    public componentDidUpdate() {
        const { marker } = this.state;
        const { map } = this.context;

        if (map && !marker) {
            this.addMarkerToMap();
        }
    }

    // change the position automatically if the props get changed
    public componentWillReceiveProps(nextProps: MarkerProps) {
        if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng) {
            this.setPosition({
                lat: nextProps.lat,
                lng: nextProps.lng,
            });
        }
    }

    public render(): JSX.Element {
        return null;
    }

    private addMarkerToMap() {
        const {
            map,
        } = this.context;

        const {
            children,
            bitmap,
            lat,
            lng,
        } = this.props;

        let marker: H.map.DomMarker | H.map.Marker;

        if (React.Children.count(children) > 0) {
            // if children are provided, we render the provided react
            // code to an html string
            const html = ReactDOMServer.renderToStaticMarkup(
                <div className="dom-marker">
                    { children }
                </div>
            );

            // we then get a dom icon object from the wrapper method
            const icon = getDomMarkerIcon(html);

            // then create a dom marker instance and attach it to the map,
            // provided via context
            marker = new H.map.DomMarker({ lat, lng }, { icon });
            map.addObject(marker);
        } else if (bitmap) {
            // if we have an image url and no react children, create a
            // regular icon instance
            const icon = getMarkerIcon(bitmap);

            // then create a normal marker instance and attach it to the map
            marker = new H.map.Marker({ lat, lng }, { icon });
            map.addObject(marker);
        } else {
            // create a default marker at the provided location
            marker = new H.map.Marker({ lat, lng });
            map.addObject(marker);
        }

        this.setState({
            marker,
        } as MarkerState);
    }

    private setPosition(point: H.geo.IPoint): void {
        const { marker } = this.state;
        marker.setPosition(point);
    }
}

// make the Marker component the default export
export default Marker;
