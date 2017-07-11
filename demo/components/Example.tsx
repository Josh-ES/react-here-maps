import * as highlight from "highlight.js";
import * as React from "react";
import {findDOMNode} from "react-dom";

interface ExampleProps {
  example: any;
}

export default class Example extends React.Component<ExampleProps, any> {
  private code: HTMLElement;

  private refHandlers = {
    code: (ref: HTMLElement) => this.code = ref,
  };

  public componentDidMount(): void {
    highlight.highlightBlock(findDOMNode(this.code));
  }

  public componentDidUpdate(): void {
    (highlight.initHighlighting as any).called = false;
    highlight.highlightBlock(findDOMNode(this.code));
  }

  public render(): JSX.Element {
    const {example} = this.props;

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
              <pre>
                  <code
                    className="javascript"
                    ref={this.refHandlers.code}
                  >
                      {example.code}
                  </code>
              </pre>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
