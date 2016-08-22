import mixin from '../utils/mixin';
import * as ReactDOM from 'react-dom';
import { isEqual } from 'lodash';

// declare an interface containing the required and potential
// props that can be passed to the HEREMap component
interface HEREMapProps extends H.Map.Options {
    appId: string;
    appCode: string;
    animateCenter: boolean;
    animateZoom: boolean;
}

export const HMapMethods = mixin({
    // return the HTMLElement representing this HEREMap component
    getElement(): Element {
        return ReactDOM.findDOMNode(this);
    },

    setCenter(point: H.geo.IPoint): void {
        const { animateCenter } = this.props;
        const { map } = this.state;
        map.setCenter(point, animateCenter === true);
    },

    setZoom(zoom: number): void {
        const { animateZoom } = this.props;
        const { map } = this.state;
        map.setZoom(zoom, animateZoom === true);
    },

    // change the zoom and center automatically if the props get changed
    componentWillReceiveProps(nextProps: HEREMapProps) {
        if (!isEqual(nextProps.center, this.props.center))
            this.setCenter(nextProps.center);

        if (nextProps.zoom !== this.props.zoom)
            this.setZoom(nextProps.zoom);
    },
});

export default HMapMethods;
