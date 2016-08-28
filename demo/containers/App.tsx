import HEREMap from "../../src/HEREMap";
import Example from "../components/Example";
import Header from "../components/Header";

// import all the examples
import BasicInteractiveMap from "../examples/BasicInteractiveMap";
import HighResolutionMap from "../examples/HighResolutionMap";

import * as React from "react";

export default class App extends React.Component<any, any> {
    public render(): JSX.Element {
        const examples = this.getExamples();

        const center = {
            lat: 55.17307,
            lng: 15.17594,
        };

        return (
            <div className="content">
                <Header
                    examplesLength={examples.length}
                />

                <section id="title-block">
                    <div className="container">
                        <div className="offset">
                            <h1>React HERE Maps</h1>
                            <h2>React wrapper for the HERE Maps API for JavaScript</h2>
                        </div>
                    </div>

                    <HEREMap
                        zoom={7}
                        center={center}
                        hidpi={true}
                        interactive={false}
                        appId="NoiW7CS2CC05ppu95hyL"
                        appCode="28L997fKdiJiY7TVVEsEGQ"
                    />
                </section>

                { examples.map((example, index) => (
                    <Example
                        key={index}
                        example={example}
                    />
                ))}
            </div>
        );
    }

    private getExamples(): Array<any> {
        const examples: Array<any> = [
            BasicInteractiveMap,
            HighResolutionMap,
        ];

        return examples;
    }
}
