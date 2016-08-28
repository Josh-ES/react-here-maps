// import all the examples
import BasicInteractiveMap from "../examples/BasicInteractiveMap";
import HighResolutionMap from "../examples/HighResolutionMap";

import Example from "../components/Example";
import Header from "../components/Header";
import * as React from "react";

export default class App extends React.Component<any, any> {
    private getExamples(): Array<any> {
        const examples: Array<any> = [
            BasicInteractiveMap,
            HighResolutionMap,
        ];

        return examples;
    }

    public render(): JSX.Element {
        const examples = this.getExamples();

        return (
            <div className="content">
                <Header
                    examplesLength={examples.length}
                />

                <section id="title-block">
                    <div className="container">
                        <h1>React HERE Maps</h1>
                        <h2>React wrapper for the HERE Maps API for JavaScript</h2>
                    </div>
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
}
