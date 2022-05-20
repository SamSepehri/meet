import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";


class Event extends Component {


    constructor(props) {
        super(props);
        // stting the values for the default states
        this.state = {
            collapsed: true,
            detailsButtonText: "More Details",
        };
    }

    // definding the event handler for the show/hide Details Button
    eventDetails = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            detailsButtonText: this.state.collapsed ? "Less Details" : "More Details",
        });
    };

    render() {
        const { event } = this.props;
        return (
            <div className="event">
                <CardGroup>
                    <Card>
                        <Card.Header as="h3" className="event__summary">
                            {event.summary}
                        </Card.Header>
                        <Card.Body>
                            {/* the by defauld showen informaiton */}
                            <Card.Title>Start time</Card.Title>
                            <Card.Text className="event__start">{event.start.dateTime}</Card.Text>
                            <Card.Title>Time zone</Card.Title>
                            <Card.Text className="event__timeZone">{event.start.timeZone}</Card.Text>
                            {/* the collapsed information */}
                            {!this.state.collapsed && (
                                <div className="event__moreDetails">
                                    <Card.Title>Description</Card.Title>
                                    <Card.Text className="event__description">{event.description}</Card.Text>
                                    <Card.Title>End time</Card.Title>
                                    <Card.Text className="event__end">{event.end.dateTime}</Card.Text>
                                    <Card.Title>Location</Card.Title>
                                    <Card.Text className="event__location">{event.location}</Card.Text>
                                    <Card.Title>Calendar Link</Card.Title>
                                    <Card.Link className="event__calendarLink" href={event.htmlLink}>
                                        See details in Google Calendar
                                    </Card.Link>
                                </div>
                            )}
                            <Button
                                className="event__detailsButton details-btn"
                                onClick={() => this.eventDetails()}
                            >
                                {this.state.detailsButtonText}{" "}
                            </Button>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
        );
    }
}
export default Event;