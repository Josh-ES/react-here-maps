import * as React from "react";

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

    private circle: H.map.Circle;

    public static defaultProps = {
        strokeColor: "black",
        lineWidth: 1,
        fillColor: "rgba(255, 255, 255, 0.5)",
        radius: 1000,
    };

    // change the position automatically if the props get changed
    public componentWillReceiveProps(nextProps: CircleProps) {
        if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng) {
            this.setCenter({
                lat: nextProps.lat,
                lng: nextProps.lng,
            });
        }

        if (nextProps.radius !== this.props.radius) {
            this.setRadius(nextProps.radius);
        }
    }

    public render(): JSX.Element {
        const { circle } = this;
        const { map } = this.context;

        if (map && !circle) {
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

        this.circle = circle;
    }

    private setCenter(point: H.geo.IPoint): void {
        const { circle } = this;
        circle.setCenter(point);
    }

    private setRadius(radius: number): void {
        const { circle } = this;
        circle.setRadius(radius);
    }
}

// make the Circle component the default export
export default Circle;
