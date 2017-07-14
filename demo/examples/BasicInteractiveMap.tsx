import * as React from "react";

import HEREMap from "../../src/main";

export default class BasicInteractiveMap extends React.Component<any, any> {
  public static subtitle = "This example shows you how to create a basic," +
    " interactive map centred in London, England.";

  public static title = "Basic Interactive Map";

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
    "           />\n" +
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
        secure={true}
        appId="NoiW7CS2CC05ppu95hyL"
        appCode="28L997fKdiJiY7TVVEsEGQ"
      />
    );
  }
}
