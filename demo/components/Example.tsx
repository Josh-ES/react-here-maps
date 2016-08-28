import * as React from "react";
import Highlight from "react-highlight.js";

interface ExampleProps {
    example: any;
}

export default class Example extends React.Component<ExampleProps, any> {
    public render(): JSX.Element {
        const { example } = this.props;

        return (
            <article>
                <div className="container">
                    <h3>
                        <span>{example.title}</span>
                    </h3>

                    <h4>{example.subtitle}</h4>

                    <div className="grid columns-2">
                        <div className="column">
                            { React.createElement(example) }
                        </div>

                        <div className="column">
                            <Highlight language="javascript">
                                {example.code}
                            </Highlight>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}