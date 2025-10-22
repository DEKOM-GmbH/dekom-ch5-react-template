import { Component } from "react";

interface Props {
    locale: string
}

interface State {
    date: Date;
}

class TimeOfTheDay extends Component<Props, State> {
    private timerID?: number;

    constructor(props: Props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = window.setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        if (this.timerID) {
            clearInterval(this.timerID);
        }
    }

    tick() {
        this.setState({ date: new Date() });
    }

    render() {
        return (
            <>
                {this.state.date.toLocaleDateString(this.props.locale, { weekday: 'long' })}, {this.state.date.toLocaleDateString(this.props.locale)} {this.state.date.toLocaleTimeString()}
            </>
        );
    }
}

export default TimeOfTheDay;
