import HEREMap, { Marker } from "../../src/main";
import * as React from "react";

export default class MovableMarkerMap extends React.Component<any, any> {
    public static subtitle = "This example shows you how to create an interactive map" +
        " centred in London, England, with map images displayed in high resolution. " +
        "A marker marking the center location is added by passing a Marker component" +
        " instance as a child of the HEREMap component. The marker's position can be " +
        "toggled between two possible locations by clicking a provided button.";

    public static title = "Marker Map";

    public static code = "import React, { Component } from \"react\";\n" +
        "import HEREMap from \"react-here-maps\";\n" +
        "\n" +
        "export default class Map extends Component {\n" +
        "   render() {\n" +
        "       // center the map somewhere in London\n" +
        "       const center = {\n" +
        "           lat: 51.5,\n" +
        "           lng: 0,\n" +
        "       };\n" +
        "       \n" +
        "       return (\n" +
        "           <div>\n" +
        "               <HEREMap\n" +
        "                   appId={your_app_id}\n" +
        "                   appCode={your_app_code}\n" +
        "                   center={center}\n" +
        "                   zoom={8}\n" +
        "                   hidpi={true}\n" +
        "               >\n" +
        "                   <Marker {...center}>\n" +
        "                       <div class='circle-marker' />\n" +
        "                   </Marker>\n" +
        "               </HEREMap>\n" +
        "               \n" +
        "               <button>\n" +
        "                   Change Position\n" +
        "               </button>\n" +
        "           </div>\n" +
        "       )\n" +
        "   }\n" +
        "}\n";

    public render() {
        // center the map somewhere in London
        const center = {
            lat: 51.5,
            lng: 0,
        };

        return (
            <div>
                <HEREMap
                    center={center}
                    zoom={8}
                    hidpi={true}
                    secure={true}
                    appId="NoiW7CS2CC05ppu95hyL"
                    appCode="28L997fKdiJiY7TVVEsEGQ"
                >
                    <Marker {...center}>
                        <div className="circle-marker" />
                    </Marker>
                </HEREMap>

                <button>
                    Change Position
                </button>
            </div>
        );
    }
}
