import HEREMap from "../src/main";
import * as React from "react";

export default class App extends React.Component<any, any> {
    public render() {
        // center the map somewhere in London
        const center = {
            lat: 51.5,
            lng: 0,
        };

        return (
            <div className="content">
                <HEREMap
                    center={center}
                    zoom={8}
                    hidpi={true}
                    appId="NoiW7CS2CC05ppu95hyL"
                    appCode="28L997fKdiJiY7TVVEsEGQ"
                />
            </div>
        );
    }
}
