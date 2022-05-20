// src/EventList.js

import React, { Component } from "react";
import Event from "./Event";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";

class EventList extends Component {
    render() {
        const { events } = this.props;
        return (
            <Container>
                <Row className="EventList">
                    {events.map((event) => (
                        <Col key={event.id} sm={12} md={6} lg={4}>
                            <Event event={event} />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default EventList;