import * as React from "react";

// declare an interface containing the required and potential
// props that can be passed to the HEREMap Circle component
export interface CircleProps extends H.map.Circle.Options, H.geo.IPoint {
  strokeColor?: string;
  lineWidth?: number;
  fillColor?: string;
  radius?: number;
}

// declare an interface containing the potential context parameters
interface CircleContext {
  map: H.Map;
}

// export the Circle React component from this module
export class Circle extends React.Component<CircleProps, object> {
  // define the context types that are passed down from a <HEREMap> instance
  public static contextTypes = {
    map: React.PropTypes.object,
  };

  public static defaultProps = {
    fillColor: "rgba(255, 255, 255, 0.5)",
    lineWidth: 1,
    radius: 1000,
    strokeColor: "black",
  };

  public context: CircleContext;

  private circle: H.map.Circle;

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

  // remove the circle on unmount of the component
  public componentWillUnmount() {
    const {map} = this.context;

    if (this.circle) {
      map.removeObject(this.circle);
    }
  }

  public render(): JSX.Element {
    const {map} = this.context;

    if (map && !this.circle) {
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
      lng,
    }, radius, {
      style: {
        fillColor,
        lineWidth,
        strokeColor,
      },
    });

    map.addObject(circle);

    this.circle = circle;
  }

  private setCenter(point: H.geo.IPoint): void {
    this.circle.setCenter(point);
  }

  private setRadius(radius: number): void {
    this.circle.setRadius(radius);
  }
}

// make the Circle component the default export
export default Circle;
