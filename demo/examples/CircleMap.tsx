import HEREMap, { Circle } from "../../src/main";
import * as React from "react";

export default class CircleMap extends React.Component<any, any> {
    public static subtitle = "This example shows you how to create an interactive map" +
        " centred in London, England, with a circle of radius 1km displayed over the top of it.";

    public static title = "Circle Map";

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
        "           <HEREMap\n" +
        "               appId={your_app_id}\n" +
        "               appCode={your_app_code}\n" +
        "               center={center}\n" +
        "               zoom={8}\n" +
        "               hidpi={true}\n" +
        "           >\n" +
        "               <Circle\n" +
        "                   {...center}\n" +
        "                   strokeColor=\"#1275E8\"\n" +
        "                   fillColor=\"rgba(212, 92, 91, 0.2)\"\n" +
        "                   lineWidth={2}\n" +
        "                   radius={10000}\n" +
        "               />\n" +
        "           </HEREMap>\n" +
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
            <HEREMap
                center={center}
                zoom={8}
                hidpi={true}
                secure={true}
                appId="NoiW7CS2CC05ppu95hyL"
                appCode="28L997fKdiJiY7TVVEsEGQ"
            >
                <Circle
                    {...center}
                    strokeColor="#1275E8"
                    fillColor="rgba(18, 117, 232, 0.2)"
                    lineWidth={2}
                    radius={10000}
                />
            </HEREMap>
        );
    }
}
