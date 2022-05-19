//src/NumberOfEvents.js

import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
    constructor() {
        super();
        // stting the values for the default states
        this.state = {
            numberOfEvents: 32,
            infoText: "",
        };
    }

    updateNumberOfEvents = (event) => {
        this.setState({
            numberOfEvents: event.target.value,
            infoText: "",
        });
        if (event.target.value > 0 && event.target.value < 33) {
            this.props.updateEventNumbers(event.target.value);
        } else {
            this.setState({ infoText: "Select a number between 1 and 32!" });
        }
    };

    render() {
        return (
            <div className="numberOfEvents">
                <ErrorAlert text={this.state.infoText} />
                <label className="numberOfEvents__lable">Number of Events</label>{" "}
                <input
                    type="number"
                    className="numberOfEvents__input"
                    value={this.state.numberOfEvents}
                    onChange={this.updateNumberOfEvents}
                ></input>
            </div>
        );
    }
}

export default NumberOfEvents;