import { range } from "lodash";
import * as React from "react";
import { animateScroll as scroller } from "react-scroll";

interface HeaderProps {
    examplesLength: number;
}

interface HeaderState {
    activeDot?: number;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
    public state: HeaderState = { };

    public scroll(index: number): void {
        const element = document.querySelectorAll("article")[index] as HTMLElement;
        const scrollTop = element.offsetTop - 60;
        scroller.scrollTo(scrollTop);

        this.setState({
            activeDot: index,
        });
    }

    public render(): JSX.Element {
        const { examplesLength } = this.props;
        const { activeDot } = this.state;

        console.log(activeDot);

        return (
            <header>
                <div className="container">
                    <p>Demos</p>

                    <ul id="nav">
                        { range(0, examplesLength).map((n) => (
                            <li
                                key={n}
                                className={`nav-bubble ${activeDot != null && n === activeDot ? 'active' : ''}`}
                                onClick={this.scroll.bind(this, n)}
                            />
                        ))}
                    </ul>
                </div>
            </header>
        );
    }
}