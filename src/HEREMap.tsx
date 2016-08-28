import HMapMethods from "./mixins/h-map-methods";
import cache, { getScriptStub } from "./utils/cache";
import getLink from "./utils/get-link";
import getPlatform from "./utils/get-platform";
import getScriptMap from "./utils/get-script-map";
import { assignIn, uniqueId } from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";

// declare a standard callback type
type Callback = (error: any, result?: any) => void;

// declare an interface for a single script tag object
interface ScriptTag {
    tag: HTMLScriptElement;
    onLoad(callback: Callback): void;
}

// declare an interface for the script tags object
// that stores info on each requested script
interface ScriptTags {
    [name: string]: ScriptTag;
}

// declare an interface containing the required and potential
// props that can be passed to the HEREMap component
export interface HEREMapProps extends H.Map.Options {
    appId: string;
    appCode: string;
    animateCenter?: boolean;
    animateZoom?: boolean;
    hidpi?: boolean;
    interactive?: boolean;
    secure?: boolean;
}

// declare an interface containing the potential state flags
interface HEREMapState {
    map?: H.Map;
    behavior?: H.mapevents.Behavior;
    ui?: H.ui.UI;
}

// declare an interface containing the context to be passed through the heirarchy
interface HEREMapChildContext {
    map: H.Map;
}

// export the HEREMap React Component from this module
@HMapMethods
export class HEREMap
extends React.Component<HEREMapProps, HEREMapState>
implements React.ChildContextProvider<HEREMapChildContext> {
    public static childContextTypes = {
        map: React.PropTypes.object,
    };

    // add typedefs for the HMapMethods mixin
    public componentWillReceiveProps: (nextProps: HEREMapProps) => void;
    public getElement: () => Element;
    public getMap: () => H.Map;
    public setCenter: (point: H.geo.IPoint) => void;
    public setZoom: (zoom: number) => void;

    // add the state property
    public state: HEREMapState = { };

    public getChildContext() {
        const { map } = this.state;
        return { map };
    }

    public componentDidMount() {
        getScriptStub("mapEventsScript").onLoad((err, tag) => {
            const {
                appId,
                appCode,
                center,
                hidpi,
                interactive,
                secure,
                zoom,
            } = this.props;

            // get the platform to base the maps on
            const platform = getPlatform({
                app_code: appCode,
                app_id: appId,
                useHTTPS: secure === true,
            });

            const defaultLayers = platform.createDefaultLayers({
                ppi: hidpi ? 320 : 72,
            });

            const hereMapEl = ReactDOM.findDOMNode(this);

            const map = new H.Map(
                hereMapEl.querySelector(".map-container"),
                defaultLayers.normal.map,
                {
                    zoom,
                    center,
                    pixelRatio: hidpi ? 2 : 1,
                }
            );

            const newState = { map };

            if (interactive !== false) {
                // make the map interactive
                // MapEvents enables the event system
                // Behavior implements default interactions for pan/zoom
                const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

                // create the default UI for the map
                const ui = H.ui.UI.createDefault(map, defaultLayers);

                assignIn(newState, { behavior, ui });
            } else {
                // make the map resize when the window gets resized
                window.addEventListener("resize", () => {
                    map.getViewPort().resize();
                });
            }

            // attach the map object to the component"s state
            this.setState(newState as HEREMapState);
        });
    }

    public componentWillMount() {
        cache(getScriptMap());
        const stylesheetUrl = "//js.api.here.com/v3/3.0/mapsjs-ui.css";
        getLink(stylesheetUrl, "HERE Maps UI");
    }

    public render() {
        const { children } = this.props;

        return (
            <div>
                <div
                    className="map-container"
                    id={`map-container-${uniqueId()}`}
                    style={{ height: "100%" }}
                >
                    { children }
                </div>
            </div>
        );
    }
}

// make the HEREMap component the default export
export default HEREMap;
