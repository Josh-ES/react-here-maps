import * as React from 'react';

import HEREMap from '../src/main';

export default class App extends React.Component<any, any> {
    render() {
        // center the map somewhere in London
        const center = {
            lat: 51.5,
            lng: 0,
        };

        return (
            <div className="content">
                <HEREMap center={center} zoom={8} appId='NoiW7CS2CC05ppu95hyL' appCode='28L997fKdiJiY7TVVEsEGQ' />
            </div>
        )
    }
}
