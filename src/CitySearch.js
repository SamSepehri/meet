import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: false,
        infoText: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        console.log("value", value);
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0 && value !== "all") {
            this.setState({
                query: value,
                infoText: "Please try another city!",
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: "",
            });
        }
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });

        this.props.updateEvents(suggestion);
    };

    componentDidMount() {
        document.addEventListener("mousedown", (event) => {
            if (event.target.closest(".CitySearch")) return;
            this.setState({
                showSuggestions: false,
                suggestions: [],
            });
        });
    }


    render() {
        const { query } = this.state;

        return (
            <div className="CitySearch">
                <InfoAlert text={this.state.infoText} />
                <label className="CitySearch__lable">Search for a city</label>{" "}
                <input
                    type="text"
                    className="city"
                    value={query}
                    onChange={this.handleInputChanged}
                    onFocus={() => {
                        this.setState({ showSuggestions: true });
                    }}
                    placeholder="e.g: London"
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: "none" }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                    <li key="all" onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;