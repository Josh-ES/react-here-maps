import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

// declare an interface containing the required and potential
// props that can be passed to the HEREMap Circle component
export interface CircleProps extends H.map.Circle.Options, H.geo.IPoint {
    strokeColor?: string;
    lineWidth?: number;
    fillColor?: string;
    radius?: number;
}

// declare an interface containing the potential state flags
interface CircleState {

}

// declare an interface containing the potential context parameters
interface CircleContext {
    map: H.Map;
}

// export the Circle React component from this module
export class Circle extends React.Component<CircleProps, CircleState> {
    // define the context types that are passed down from a <HEREMap> instance
    public static contextTypes = {
        map: React.PropTypes.object,
    };

    public context: CircleContext;

    public static defaultProps = {
        strokeColor: "black",
        lineWidth: 1,
        fillColor: "rgba(255, 255, 255, 0.5)",
        radius: 1000,
    };

    public render(): JSX.Element {
        const { map } = this.context;

        if (map) {
            this.addCircleToMap();
        }

        return null;
    }

    private addCircleToMap() {
        const {
            map,
        } = this.context;

        const {
            lat,
            lng,
            strokeColor,
            lineWidth,
            fillColor,
            radius,
        } = this.props;

        // create a circle at the provided location
        const circle = new H.map.Circle({
            lat,
            lng
        }, radius, {
            style: {
                strokeColor,
                lineWidth,
                fillColor,
            },
        });

        map.addObject(circle);
    }
}

// make the Circle component the default export
export default Circle;
